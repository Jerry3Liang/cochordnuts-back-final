<template>
  <span style="font-size: 30px; font-weight: 500" >客戶提問：<span v-if="subject">{{subject}}</span></span>
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
  <div class="card" v-for="msg in caseMessages" :key="msg.id" v-if="caseNo !== null">
    <div class="card-header">
      <span>時間：{{msg.messageTime}}</span><span style="margin: 50px" v-show="msg.employeeName != null">客服： {{msg.employeeName}}</span><span style="margin: 50px" v-show="msg.memberName != null">會員： {{msg.memberName}}</span>
    </div>
    <div class="card-body">
      <p class="card-text"><h3>{{msg.message}}</h3></p>
    </div>
  </div>

</template>

<script setup>
import axiosApi from '@/plugins/axios.js';
import Swal from 'sweetalert2';
import {ref, onMounted} from 'vue';
import {RouterLink, useRoute} from 'vue-router';
const route = useRoute();
const id = ref(route.query.caseNumber);

//
const employeeNo = ref("");
const islogined = ref("");
const empName = ref("");
const loginTime = ref("");

onMounted(function (){
  employeeNo.value = sessionStorage.getItem("employeeNo");
  islogined.value = sessionStorage.getItem("isLoggedIn");
  empName.value = sessionStorage.getItem("empName");
  loginTime.value = sessionStorage.getItem("loginTime");
  callFindMsgByCaseNo(id.value);
  callFindSubjectByCaseNo(id.value);
})


//顯示全部回覆訊息
const caseMessages = ref(null);

//根據 caseNo 顯示案件
const caseNoForCase = ref(null);
const subject = ref("");

//根據 caseNo 顯示全部訊息
const caseNo = ref(0);

function callFindMsgByCaseNo(caseNo) {
  axiosApi.get(`/rest/findCaseContent/${caseNo}`).then(function(response) {
    caseMessages.value = response.data;
    console.log(response.data);
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

function callFindSubjectByCaseNo(caseNo) {
  axiosApi.get(`/rest/findCase/${caseNo}`).then(function(response) {
    caseNoForCase.value = response.data;
    subject.value = response.data.subject;
    console.log(response.data);
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
                router.push({ name: "home-link" });
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
h3 {
  margin: 5px;
}

.card {
  width: 1000px;
  box-sizing: border-box;
  margin: 30px;
}

.card-header {
  font-size: 30px;
}
</style>