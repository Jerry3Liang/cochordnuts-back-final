<template>
    <div>
        <h1 style="margin-left: 35%;">音樂類型新增</h1>
        <div style="text-align: right">
        <div v-show="islogined">
          <div>員工姓名： {{ empName }}</div>
          <div>上次登入時間:{{ loginTime }}
            <button type="button" class="btn btn-success" @click="logout()">登出</button>
          </div>
        </div>
      </div>
        <hr>
    </div>
    <div class="block">
        <ArtistsModify></ArtistsModify>
    </div>
    <div class="block">
        <MusicTypesModify></MusicTypesModify>
    </div>
    <div class="block">
        <LanguageModify></LanguageModify>
    </div>
    <div class="block">
        <YearModify></YearModify>
    </div>

</template>
    
<script setup>
    import ArtistsModify from '@/components/ArtistsModify.vue';
    import MusicTypesModify from '@/components/MusicTypesModify.vue';
    import LanguageModify from '@/components/LanguageModify.vue';
    import YearModify from '@/components/YearModify.vue';
    import Swal from "sweetalert2";
    import axiosApi from "@/plugins/axios.js";
    import { ref ,onMounted } from "vue";
    import { useRouter } from 'vue-router';
    const router= useRouter();

    //員工登入登出
    const islogined = ref("");
    const empName = ref("");
    const loginTime = ref("");

      onMounted(function(){
        islogined.value = sessionStorage.getItem("isLoggedIn");
        empName.value = sessionStorage.getItem("empName");
        loginTime.value = sessionStorage.getItem("loginTime");
        if(empName.value==null || empName.value==""){
            Swal.fire({
                text: '請先登入員工帳號',
                icon: 'warning',
                allowOutsideClick: false,
                confirmButtonText: '確認',
            });
            router.push({path:"/Employee/EmployeeLogin"})
        }
      })


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
    
<style>
    .block{
        margin: 2%;
        padding: 2%;
        border: 3px solid gray;
        width: 40%;
        border-radius: 5%;
        float: left
    }
</style>