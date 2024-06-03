<template>
  <h1>員工登入</h1>
  <form>
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">員工名稱：</label>
      <input type="text" name="empName" class="form-control" id="empName" v-model="empName">
      <span class="error">{{ message }}</span>
    </div>
    <div class="mb-3">
      <label for="exampleInputPassword1" class="form-label">密碼：</label>
      <input type="password" name="password" class="form-control" id="empPassword" v-model="password">
    </div>
    <button type="submit" class="btn btn-primary" @click="empLogin">登入</button>

  </form>
</template>

<script setup>
import axiosApi from '@/plugins/axios.js';
import {ref} from 'vue';
import Swal from 'sweetalert2';
import {useRouter} from 'vue-router';

const empName = ref("");
const password = ref("");
const message = ref("");
const router = useRouter();

function empLogin() {
  console.log("Call login");
  Swal.fire({
    text:"loading......",
    showConfirmButton: false,
    allowOutsideClick: false
  });
  if (empName.value === "") {
    empName.value = null
  }

  if (password.value === "") {
    password.value = null
  }

  let data = {
    "empName": empName.value,
    "password": password.value,
  }

  axiosApi.defaults.headers.authorization = "";
  sessionStorage.removeItem("user");
  axiosApi.post("/rest/employeeLogin", data)
      .then((response) => {
        if(response.data.message){
          console.log(response.data);
          Swal.fire({
            text: response.data.message,
            icon: 'success',
            allowOutsideClick: false,
            confirmButtonText: '確認'
          }).then(function (result) {
            if (result.isConfirmed) {
              console.log(response.data);
              axiosApi.defaults.headers.authorization = 'Bearer ' + response.data.token;
              sessionStorage.setItem("user", response.data.user);
              sessionStorage.setItem("empName", response.data.empName);
              sessionStorage.setItem("lastLoginTime", response.data.lastLoginTime);
              sessionStorage.setItem("employeeNo", response.data.employeeNo);
              sessionStorage.setItem("isLoggedIn", true);
              sessionStorage.setItem("loginTime", response.data.loginTime);
              router.push("/");
            }
          });
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
.mb-3 {
  width: 400px;
}
</style>