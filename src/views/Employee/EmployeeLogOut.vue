<template>

</template>

<script setup>
import Swal from 'sweetalert2'
import axiosApi from '@/plugins/axios.js'
import { useRouter } from 'vue-router';

const router = useRouter();


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
            }); router.push({ name: "login-link" });
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

</script>

<style></style>
