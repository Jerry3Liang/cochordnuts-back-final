<template>
    <h1>Home</h1>
    <div v-show="islogined">
      <h2>員工姓名： {{ empName }}</h2>
      <h2>上次登入時間: {{ loginTime }}
        <button type="button" class="btn btn-success" @click="logout()" style="margin-left: 5px">登出</button>
      </h2>
    </div>
    <div v-show="isGoogleLogined">
        <h2>員工姓名： {{ googleName }}</h2>
        <h2>Email: {{ googleEmail }}
          <button type="button" class="btn btn-success" @click="logout()" style="margin-left: 5px">登出</button>
        </h2>
    </div>
    <div v-show="isLineLogined">
      <span style="margin-right: 10px; font-size: 30px">員工姓名： {{ lineName }}</span>
      <img :src="lineImgPath" style="width: 70px; height: 70px; border-radius: 40px">
      <h2>
        <button type="button" class="btn btn-success" @click="logout()" style="margin-left: 5px">登出</button>
      </h2>
    </div>
    <div v-show="!islogined && !isGoogleLogined && !isLineLogined">
      <RouterLink type="button" class="btn btn-success" to="/Employee/EmployeeLogin">登入</RouterLink>
      <button type="button" class="btn btn-danger" @click="loginWithGoogle" v-show="!isGoogleLogined" style="margin-left: 5px">Google 登入</button>
      <button type="button" class="btn btn-success" @click="loginWithLine" v-show="!isLineLogined" style="margin-left: 5px">Line 登入</button>
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

//Google 第三方登入
const googleName = ref("");
const googleEmail = ref("");
const isGoogleLogined = ref("");

//LINE 第三方登入
const lineName = ref("");
const lineImgPath = ref("");
const isLineLogined = ref(false);

import {ref, onMounted} from 'vue';
const list = ref(false);

onMounted(function() {
  islogined.value = sessionStorage.getItem("isLoggedIn");
  empName.value = sessionStorage.getItem("empName");
  loginTime.value = sessionStorage.getItem("loginTime");
  googleName.value = sessionStorage.getItem("googleName");
  googleEmail.value = sessionStorage.getItem("googleEmail");
  isGoogleLogined.value = sessionStorage.getItem("verified_email");
  lineName.value = sessionStorage.getItem("displayName");
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
      let googleName = sessionStorage.getItem("name");
      let googleEmail = sessionStorage.getItem("email");
      let isGoogleLogined = sessionStorage.getItem("verified_email");
      let jsonData = {
        lastLoginTime: lastLoginTime,
        name: empName,
        employeeNo: employeeNo,
        googleName: googleName,
        googleEmail: googleEmail,
        isGoogleLogined: isGoogleLogined
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
                window.location.reload();
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

//Google 第三方登入相關方法
const loginWithGoogle = async () => {
  try {
    //從後端獲取 Google auth URL
    const authUrlResponse = await axiosApi.get("/google/buildAuthUrl");

    //將使用者跳轉到 Google 認證中心頁面
    window.location.href = authUrlResponse.data;
  } catch (error) {
    console.error('Error during Google login:', error);
  }
};

const handleGoogleCallback = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');

  if (code) {
    try {
      //拿 authorization code 換 access token
      const exchangeTokenResponse = await axiosApi.post('/google/exchangeToken', {
        code: code
      });
      const accessToken = exchangeTokenResponse.data.access_token;

      //使用 access token 來取得使用者的 Google 資料
      const userInfoResponse = await axiosApi.get('/google/getGoogleUser', {
        params: {
          accessToken: accessToken
        }
      });

      //將使用者資訊存於 Session
      console.log('User Info:', userInfoResponse.data);
      sessionStorage.setItem("googleName", userInfoResponse.data.name);
      sessionStorage.setItem("googleEmail", userInfoResponse.data.email);
      sessionStorage.setItem("verified_email", userInfoResponse.data.verified_email);
      googleName.value = userInfoResponse.data.name;
      googleEmail.value = userInfoResponse.data.email;
      isGoogleLogined.value = userInfoResponse.data.verified_email;
    } catch (error) {
      console.error('Error during token exchange or fetching user info:', error);
    }
  }
};

//頁面一跳回馬上處理第三方登入 access token
onMounted(() => {
  handleGoogleCallback();
});

//Line 第三方登入相關方法
const loginWithLine = async () => {
  try {
    //從後端獲取 Line auth URL
    const authUrlResponse = await axiosApi.get("/line/buildAuthUrl");

    //將使用者跳轉到 Line 認證中心頁面
    window.location.href = authUrlResponse.data;
  } catch (error) {
    console.error('Error during Google login:', error);
  }
};

const handleLineCallback = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');

  if (code) {
    try {
      //拿 authorization code 換 access token
      const exchangeTokenResponse = await axiosApi.post("/line/exchangeToken", {
        code: code
      });
      const accessToken = exchangeTokenResponse.data.access_token;

      //使用 access token 來取得使用者的 Line 資料
      const userInfoResponse = await axiosApi.get('/line/getLineUser', {
        params: {
          accessToken: accessToken
        }
      });

      //將使用者資訊存於 Session
      console.log('User Info:', userInfoResponse.data);
      sessionStorage.setItem("lineName", userInfoResponse.data.name);
      sessionStorage.setItem("lineImgPath", userInfoResponse.data.pictureUrl);
      sessionStorage.setItem("isLineLogined", true);
      lineName.value = userInfoResponse.data.displayName;
      lineImgPath.value = userInfoResponse.data.pictureUrl;
      isLineLogined.value = true;
    } catch (error) {
      console.error('Error during token exchange or fetching user info:', error);
    }
  }
};

//頁面一跳回馬上處理第三方登入 access token
onMounted(() => {
  handleLineCallback();
});

    
</script>
    
<style>
    
</style>