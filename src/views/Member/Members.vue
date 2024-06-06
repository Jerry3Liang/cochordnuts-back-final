<template>
    <h1>會員列表</h1>
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
  </div>
    <table class="table">
        <thead>
            <tr>
                <th scope="col">會員編號</th>
                <th scope="col">姓名</th>
                <th scope="col">註冊日</th>
                <th scope="col">上次登入日</th>
                <th scope="col">Email</th>
                <th scope="col">電話</th>
                <th scope="col">狀態</th>

            </tr>
        </thead>
        <tbody>
            <tr v-for="member in members" :key="member.memberNo">
                <td>
                    <RouterLink style="margin-left: 10px" to="/member" @click="chMember(member.memberNo)">{{ member.memberNo }}</RouterLink>
                </td>
                <td>{{ member.name }}</td>
                <td>{{ member.registerTime }}</td>
                <td>{{ member.lastLoginTime }}</td>
                <td>{{ member.email }}</td>
                <td>{{ member.phone }}</td>
                <td v-show="member.memberStatus === 1">已啟用</td>
                <td v-show="member.memberStatus === 0">已刪除</td>
            </tr>
        </tbody>
    </table>


</template>
<script setup>
import axiosapi from '@/plugins/axios.js';
import { RouterLink, useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import Swal from "sweetalert2";
import axiosApi from "@/plugins/axios.js";

const router = useRouter();

const members = ref([]);
const count = ref(0);

//員工登入登出
const islogined = ref("");
const empName = ref("");
const loginTime = ref("");

onMounted(() => {
    islogined.value = sessionStorage.getItem("isLoggedIn");
    empName.value = sessionStorage.getItem("empName");
    loginTime.value = sessionStorage.getItem("loginTime");
    axiosapi.post('/members/find', {})
        .then(response => {
            members.value = response.data.list;
            count.value = response.data.count;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});

function chMember(memberNo) {
    sessionStorage.setItem("memberNo", memberNo);
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
.table td {
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
