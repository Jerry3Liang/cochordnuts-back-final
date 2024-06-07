<template>
    <!-- <h1>Home</h1> -->
    <div v-show="islogined">
      <h2>員工姓名： {{ empName }}</h2>
      <h2>上次登入時間: {{ loginTime }}
        <button type="button" class="btn btn-success" @click="logout()" style="margin-left: 5px">登出</button>
      </h2>
    </div>
    <!-- <div v-show="isGoogleLogined">
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
    </div> -->
    <div v-show="!islogined">
      <RouterLink type="button" class="btn btn-danger" to="/Employee/EmployeeLogin">登入</RouterLink>
      <!-- <button type="button" class="btn btn-warning" @click="loginWithGoogle" v-show="!isGoogleLogined" style="margin-left: 5px">Google 登入</button>
      <button type="button" class="btn btn-success" @click="loginWithLine" v-show="!isLineLogined" style="margin-left: 5px">Line 登入</button> -->
    </div>

    <div style="margin: auto; margin-top: 3%; line-height: 30px; background-color: azure; padding: 1%; border-radius: 15px; box-shadow: 3px 3px 3px 3px gray; width: 80%;">
    <h3 style="text-align: center; font-weight: bold;">員工守則</h3>
    <ol>
      <li>總則
        <ol>
          <li>本守則旨在規範公司員工的行為，確保工作環境和諧、公平、專業。</li>
          <li>所有員工應遵守本守則，並在工作中表現出專業和誠信。</li>
        </ol>
      </li>
      
      <li>工作態度與紀律
        <ol>
          <li>準時上班，不遲到、不早退、不曠工。</li>
          <li>工作時間內應全心投入工作，不得從事與工作無關的活動。</li>
          <li>遵守公司的各項規章制度，服從上級的合理指示。</li>
        </ol>
      </li>

      <li>職業道德
        <ol>
          <li>保持誠信，杜絕欺詐行為。</li>
          <li>嚴格保密公司機密和客戶資料，不得洩露或濫用。</li>
          <li>尊重同事和客戶，保持良好的職業禮儀。</li>
        </ol>
      </li>

      <li>工作環境與安全
        <ol>
          <li>保持工作場所整潔有序，愛護公司財物。</li>
          <li>積極參加公司組織的安全培訓，遵守安全操作規程。</li>
          <li>發現安全隱患應及時報告，防止事故發生。</li>
        </ol>
      </li>

      <li>行為規範
        <ol>
          <li>禁止任何形式的歧視、騷擾和暴力行為。</li>
          <li>嚴禁在工作場所吸煙、飲酒或使用違禁藥物。</li>
          <li>保持儀容儀表整潔，穿著符合公司要求。</li>
        </ol>
      </li>

      <li>獎懲制度
        <ol>
          <li>對於工作表現優異的員工，公司將給予適當的獎勵。</li>
          <li>對於違反本守則的行為，公司將根據情節輕重給予相應的處罰，包括但不限於警告、罰款、降職、開除等。</li>
        </ol>
      </li>

      <li>培訓與發展
        <ol>
          <li>公司為員工提供必要的培訓和發展機會，以提升員工的專業技能和職業素養。</li>
          <li>員工應積極參加公司組織的各類培訓，並將所學應用於實際工作中。</li>
        </ol>
      </li>
    
      <li>員工福利
        <ol>
          <li>公司依法為員工繳納社會保險和住房公積金。</li>
          <li>員工享有法定節假日、帶薪年假、病假、產假等假期權利。</li>
        </ol>
      </li>

      <li>意見與建議
        <ol>
          <li>員工對於公司管理和運營提出合理化建議，公司將予以重視並適當採納。</li>
          <li>公司設有意見反饋渠道，員工可以匿名或署名提出意見和建議。</li>
        </ol>
      </li>
      
    </ol>
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
<!-- const googleName = ref("");
const googleEmail = ref("");
const isGoogleLogined = ref("");-->

//LINE 第三方登入
<!-- const lineName = ref("");
const lineImgPath = ref("");
const isLineLogined = ref(false); -->

import {ref, onMounted} from 'vue';
const list = ref(false);

onMounted(function() {
  islogined.value = sessionStorage.getItem("isLoggedIn");
  empName.value = sessionStorage.getItem("empName");
  loginTime.value = sessionStorage.getItem("loginTime");
  <!-- googleName.value = sessionStorage.getItem("googleName");
  googleEmail.value = sessionStorage.getItem("googleEmail");
  isGoogleLogined.value = sessionStorage.getItem("verified_email");
  lineName.value = sessionStorage.getItem("displayName"); -->
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

    
</script>
    
<style>
    
</style>
