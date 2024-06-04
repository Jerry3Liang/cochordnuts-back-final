<template>
  <h1>顯示客服提問列表</h1>
  <div style="text-align: right; margin-bottom: 10px">
    <div v-show="islogined">
      <div style="margin-left: inherit">
        員工姓名： {{ empName }}<br>
        上次登入時間:{{ loginTime }}
      </div>
      <div>
        <button type="button" class="btn btn-success" @click="logout()">登出</button>
      </div>
    </div>
    <div v-show="!islogined">
      <RouterLink type="button" class="btn btn-success" to="/Employee/EmployeeLogin">登入</RouterLink>
    </div>
  </div>
  <table class="table">
    <thead>
    <tr>
      <th scope="col">客服案件編號</th>
      <th scope="col" v-show="islogined">客戶姓名</th>
      <th scope="col">問題</th>
      <th scope="col">最後回覆時間</th>
      <th scope="col" v-show="islogined">最後回覆員工姓名</th>
      <th scope="col">回覆狀態</th>
      <th scope="col" v-show="islogined">操作</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="cstCase in customerCases" :key="cstCase.id">
      <td>
<!--        <RouterLink to="/Customer/FinishCaseDetail" @click="callFinishFindMsgByCaseNo(cstCase.caseNo)">{{cstCase.caseNo}}</RouterLink>-->
<!--        <RouterView></RouterView>-->
<!--        <a @click="callFinishFindMsgByCaseNo(cstCase.caseNo)">{{cstCase.caseNo}}</a>-->
        <button type="button" class="btn btn-link" @click="callFinishFindMsgByCaseNo(cstCase.caseNo)" :disabled="isDisabled(cstCase.status)">{{cstCase.caseNo}}</button>
      </td>
      <td v-show="islogined">{{cstCase.customerName}}</td>
      <td>{{cstCase.subject}}</td>
      <td>{{cstCase.lastAnswerDate}}</td>
      <td v-show="islogined">{{cstCase.answerEmployee}}</td>
      <td>
        <div v-if="cstCase.status ===0">未回覆</div>
        <div v-else-if="cstCase.status ===1">回覆中</div>
        <div v-else>結案</div>
      </td>
      <td v-show="islogined">
        <div v-show="cstCase.status ===1"></div>
        <button type="button" class="btn btn-primary" @click="callFindMsgByCaseNo(cstCase.caseNo)" v-show="cstCase.status ===1 || cstCase.status === 0" style="margin: 3px">回覆</button>
        <button type="button" class="btn btn-success" @click="callModify(cstCase.caseNo)" v-show="cstCase.status ===1 || cstCase.status === 0" style="margin: 3px">結案</button>
      </td>
    </tr>
    </tbody>
  </table>

  <div class="col-4 justify-content-center">
    <Paginate :first-last-button="true" first-button-text="&lt;&lt;"
              last-button-text="&gt;&gt;" prev-text="&lt;" next-text="&gt;"
              :page-count="pages" :initial-page="current" v-model="current"
              :click-handler="callFind">
    </Paginate>
  </div>
</template>

<script setup>
import axiosApi from '@/plugins/axios.js';
import Swal from 'sweetalert2';
import Paginate from "vuejs-paginate-next"
import {ref, onMounted} from 'vue';
//跳轉用
import {RouterLink, useRouter} from 'vue-router';
const router = useRouter();

const islogined = ref("");
const empName = ref("");
const loginTime = ref("");





//顯示全部回覆訊息
const customerCases = ref(null);
// const router = userRouter();

//根據 caseNo 顯示全部訊息
const caseNo = ref(0);

//提交問題
const customerCase = ref({ });

//pagination start
const pages = ref(3);
const total = ref(0);
const current = ref(1);
const start = ref(1);
const rows = ref(8);
const lastPageRows = ref(0);
// //pagination end

onMounted(function(){
  islogined.value = sessionStorage.getItem("isLoggedIn");
  empName.value = sessionStorage.getItem("empName");
  loginTime.value = sessionStorage.getItem("loginTime");
  callFind();
});

function callFind(page) {
  // Swal.fire({
  //     text: "Loading......",
  //     showConfirmButton: false,
  //     allowOutsideClick: false,
  // });
  console.log("callFind", page)
  //計算分頁資訊
  if(page) {
    start.value = (page-1) * rows.value;
    current.value = page;
  } else {
    start.value = 0;
    current.value = 1;
  }

  axiosApi.get("/rest/allCase", {params: {offset: start.value, fetch:rows.value}}).then(function(response) {
    customerCases.value = response.data.results;
    console.log(response.data.results);

    //pagination start
    total.value =  response.data.total;
    pages.value = Math.ceil(response.data.total / rows.value)
    lastPageRows.value = response.data.total % rows.value;
    //pagination end
    setTimeout(function() {
      Swal.close();
    }, 500);
  }).catch(function(error) {
    console.log("callFind error", error);
    Swal.fire({
      text: '失敗：'+error.message,
      icon: 'error',
      allowOutsideClick: false,
      confirmButtonText: '確認',
    }).then(function() {
      if(error && error.response.status && error.response.status===403) {
        // router.push("/secure/login");
      }
    });
  });
}

function callModify(caseNo) {
  Swal.fire({
    text: "Loading......",
    showConfirmButton: false,
    allowOutsideClick: false,
  });
  if(customerCase.value.caseNo==="") {
    customerCase.value.caseNo = null;
  }
  if(customerCase.value.customerName==="") {
    customerCase.value.customerName = null;
  }
  if(customerCase.value.subject==="") {
    customerCase.value.subject = null;
  }
  if(customerCase.value.lastAnswerDate==="") {
    customerCase.value.lastAnswerDate = null;
  }
  if(customerCase.value.answerEmployee==="") {
    customerCase.value.answerEmployee = null;
  }
  if(customerCase.value.status==="") {
    customerCase.value.status = null;
  }

  let data = {
    "status": 2
  }


  axiosApi.put(`/rest/customerCase/${caseNo}`, data).then(function (response) {
    if(response.data) {
      Swal.fire({
        text: response.data.message,
        icon: 'success',
        allowOutsideClick: false,
        confirmButtonText: '確認',
      }).then(function() {
        callFind(current.value);
      });
    } else {
      Swal.fire({
        text: response.data.message,
        icon: 'warning',
        allowOutsideClick: false,
        confirmButtonText: '確認',
      });
    }
  }).catch(function(error) {
    console.log("callModify error", error);
    Swal.fire({
      text: '失敗：'+error.message,
      icon: 'error',
      allowOutsideClick: false,
      confirmButtonText: '確認',
    });
  });
}

function callFindMsgByCaseNo(caseNo) {
  axiosApi.get(`/rest/findCaseContent/${caseNo}`).then(function(response) {
    customerCase.value = response.data;
    console.log(response.data);
    setTimeout(function() {
      Swal.close();
    }, 500);
    router.push({path:"/Customer/CaseDetail", query:{caseNumber:caseNo, orderNumber:customerCase.value.orderNo}});//跳轉到根據 caseNo 的回覆畫面
  }).catch(function(error) {
    console.log("callFind error", error);
    Swal.fire({
      text: '失敗：'+error.message,
      icon: 'error',
      allowOutsideClick: false,
      confirmButtonText: '確認',
    }).then(function() {
      if(error && error.response.status && error.response.status===403) {
        // router.push("/secure/login");
      }
    });
  });
}

function callFinishFindMsgByCaseNo(caseNo) {
  axiosApi.get(`/rest/findCaseContent/${caseNo}`).then(function(response) {
    customerCase.value = response.data;
    console.log(response.data);
    setTimeout(function() {
      Swal.close();
    }, 500);
    router.push({path:"/Customer/FinishCaseDetail", query:{caseNumber:caseNo}});//跳轉到根據 caseNo 的回覆畫面
  }).catch(function(error) {
    console.log("callFind error", error);
    Swal.fire({
      text: '失敗：'+error.message,
      icon: 'error',
      allowOutsideClick: false,
      confirmButtonText: '確認',
    }).then(function() {
      if(error && error.response.status && error.response.status===403) {
        // router.push("/secure/login");
      }
    });
  });
}

function isDisabled(status) {
  // 你的條件判斷邏輯，例如：
  // 假設當 caseNo 為空時禁用按鈕
  return status === 1 || status === 0;
}

function logout(){
  Swal.fire({
    title: "Are you sure?",
    text: "You will be logged out!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, logout!"
  }).then(function (result) {
    if (result.isConfirmed) {
      let lastLoginTime = sessionStorage.getItem("lastLoginTime");
      let empName = sessionStorage.getItem("empName");
      let employeeNo = sessionStorage.getItem("employeeNo");
      let jsonData = {
        lastLoginTime: lastLoginTime,
        name: empName,
        employeeNo: employeeNo
      };
      console.log('last=' + lastLoginTime);
      axiosApi.post("/rest/employeeLogout", jsonData)
          .then(function (response) {
            if (response.data.success) {
              Swal.fire({
                title: "Logged out!",
                text: "You have been logged out.",
                icon: "success"
              }).then(function () {
                sessionStorage.clear();
                router.push("/");
              });
            } else {
              Swal.fire({
                text: response.data.message || 'Logout failed!',
                icon: 'error',
                allowOutsideClick: false,
                confirmButtonText: '確認',
              }); router.push({ name: "employee-login-link" });
            }
          })
          .catch(function (error) {
            console.error('Logout failed:', error);
            Swal.fire({
              text: '登出失敗：' + error.message,
              icon: 'error',
              allowOutsideClick: false,
              confirmButtonText: '確認',
            });
          });
    } else {
      router.push({ name: "home-link" });
    };
  });
}

</script>

<style scoped>
.table {
  border-collapse: collapse;
  /* 確保邊框不會重疊 */
  width: 100%;

}

.table th,
.table td
 {
  border-left: none;
  /* 移除左側邊框 */
  border-top: none;
  border-right: none;
  /* 移除右側邊框 */
  padding: 8px;

}

.table tr {

  border-bottom: 1px solid #c4bfbf;
  /* 設置行與行之間的邊框顏色 */

}

.table th {
  background-color: #f2f2f2;
  text-align: left;

}

.table tr:last-child {
  border-bottom: none;
  /* 移除最後一行的底部邊框 */

}

</style>