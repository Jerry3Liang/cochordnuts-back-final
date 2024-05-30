<template>
  <span style="font-size: 30px; font-weight: 500; margin: 30px" >案件編號：<span v-if="caseDetail.caseNo">{{caseDetail.caseNo}}</span></span>
  <div class="card">
    <div class="card-header">
      <span>時間：{{caseDetail.messageTime}}</span><span style="margin: 50px">{{caseDetail.employeeName}}</span>
    </div>
    <div class="card-body">
      <h3 class="card-text" v-text="caseDetail.message"></h3>
      <h5 class="card-text">
        <div class="form-floating card-text">
          <textarea class="form-control" id="floatingTextarea2" style="height: 70px" v-model="answerMessage"></textarea>
          <label for="floatingTextarea2">請輸入修改內容</label>
          <button type="button" class="btn btn-info" style="margin-top: 10px" @click="callModifyMsg(caseDetail.caseDetailNo)">修改</button>
        </div>
      </h5>
    </div>
  </div>
</template>

<script setup>
import axiosApi from '@/plugins/axios.js';
import Swal from 'sweetalert2';
import {ref, onMounted} from 'vue';

//跳轉用
import {useRouter} from 'vue-router';
const router = useRouter();

//從另一個頁面帶參數跳過來
import {useRoute} from 'vue-router';
const route = useRoute();
const id = ref(route.query.caseDetailNumber);

const answerMessage = ref("");

onMounted(function (){
  callFindMsgByCaseDetailNo(id.value);
})


//根據 caseDetailNo 修改回覆內容
const caseDetail = ref({});


function callModifyMsg(caseDetailNo) {
  Swal.fire({
    text: "Loading......",
    showConfirmButton: false,
    allowOutsideClick: false,
  });
  if(caseDetail.value.caseNo==="") {
    caseDetail.value.caseNo = null;
  }
  if(caseDetail.value.customerName==="") {
    caseDetail.value.customerName = null;
  }
  if(caseDetail.value.answerMessage==="") {
    caseDetail.value.answerMessage = null;
  }
  if(caseDetail.value.lastMessageDate==="") {
    caseDetail.value.lastMessageDate = null;
  }

  let data = {
    "answerMessage": answerMessage.value
  }


  axiosApi.put(`/rest/Answer/${caseDetailNo}`, data).then(function (response) {
    console.log(response.data);
    if(response.data) {
      Swal.fire({
        text: response.data.message,
        icon: 'success',
        allowOutsideClick: false,
        confirmButtonText: '確認',
      }).then(function() {
        callFindMsgByCaseNo(caseDetail.value.caseNo);
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

function callFindMsgByCaseDetailNo(caseDetailNo) {
  axiosApi.get(`/rest/findContent/${caseDetailNo}`).then(function(response) {
    caseDetail.value = response.data;
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

function callFindMsgByCaseNo(caseNo) {
  axiosApi.get(`/rest/findCaseContent/${caseNo}`).then(function(response) {
    console.log(response.data);
    setTimeout(function() {
      Swal.close();
    }, 500);
    router.push({path:"/Customer/CaseDetail", query:{caseNumber:caseNo}});//跳轉到根據 caseNo 的回覆畫面
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

</script>

<style scoped>
.card {
  width: 1000px;
  box-sizing: border-box;
  margin: 30px;
}
</style>