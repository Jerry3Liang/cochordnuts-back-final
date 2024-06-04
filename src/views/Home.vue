<template>
    <h1>Home</h1>
    <div v-show="islogined">
      <h2>員工姓名： {{ empName }}</h2>
      <h2>上次登入時間: {{ loginTime }}
        <button type="button" class="btn btn-success" @click="logout()" style="margin-left: 5px">登出</button>
      </h2>
    </div>
    <div v-show="!islogined">
      <RouterLink type="button" class="btn btn-success" to="/Employee/EmployeeLogin">登入</RouterLink>
    </div>

</template>
    
<script setup>

import Swal from 'sweetalert2'
import axiosApi from '@/plugins/axios.js'
import {useRouter} from 'vue-router';
const router = useRouter();

const islogined = ref("");
const lastLoginTime = ref("");
const empName = ref("");
const employeeNo = ref("");
const loginTime = ref("");

import {ref, onMounted} from 'vue';
const list = ref(false);

onMounted(function() {
  islogined.value = sessionStorage.getItem("isLoggedIn");
  empName.value = sessionStorage.getItem("empName");
  loginTime.value = sessionStorage.getItem("loginTime");
})


function showList(){
  if(list.value == false){
    list.value = true;
  }else{
    list.value = false;

  }
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
    
<style>
    
</style>