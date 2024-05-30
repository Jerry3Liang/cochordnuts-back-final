<template>
  <div class="card">
    <div class="card-header">
      客服提問
    </div>
    <div class="card-body">
      <span style="font-size: 30px; font-weight: 500; margin-bottom: 30px" class="card-text">訂單編號：</span>
      <div class="form-floating card-text">
        <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style="height: 100px" v-model="subject"></textarea>
        <label for="floatingTextarea2">請輸入問題</label>
      </div>
      <br>
      <a href="#" class="btn btn-primary" @click="callCreateMessage()">提交問題</a>
    </div>
  </div>
</template>

<script setup>
import axiosApi from '@/plugins/axios.js';
import Swal from 'sweetalert2';
import {ref} from 'vue';
import {useRouter} from 'vue-router';
const customerCase = ref({ });
const memberNo = sessionStorage.getItem("memberNo");
const subject = ref("");
const router = useRouter();


//
function callCreateMessage() {

  console.log("Call create message");
  Swal.fire({
    text:"loading......",
    showConfirmButton: false,
    allowOutsideClick: false
  });

  if(customerCase.value.memberNo === ""){
    customerCase.value.memberNo = null;
  }

  if(customerCase.value.orderNo === ""){
    customerCase.value.orderNo = null;
  }

  let data = {
    "subject": subject.value,
    "status": 0,
    "memberNo": memberNo,
    // "orderNo":
  }

  axiosApi.post("/rest/createCustomerCase", data)
      .then(function(response) {
        console.log(response.data);
        if(response.data){
          Swal.fire({
            text: response.data.message,
            icon: 'success',
            allowOutsideClick: false,
            confirmButtonText: '確認'
          });
          router.push("/");
        } else {
          Swal.fire({
            text: response.data.message,
            icon: 'warning',
            allowOutsideClick: false,
            confirmButtonText: '確認'
          });
        }
      }).catch(function(error) {
          console.log("callCreate error", error);
          Swal.fire({
            text: '失敗' + error.message,
            icon: 'error',
            allowOutsideClick: false,
            confirmButtonText: '確認'
          });
      });
}

</script>

<style scoped>

.card {
  width: 1000px;
  box-sizing: border-box;
  margin: 30px;
  float: left;
}

.card-header {
  font-size: 30px;
}

</style>