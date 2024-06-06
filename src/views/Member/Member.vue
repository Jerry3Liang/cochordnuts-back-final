<template>
    <div class="container">
        <div class="row justify-content-center align-items-center vh-100">
            <div class="col-md-8 col-lg-6">
                <div class="panel panel-info" v-if="member">
                    <div class="panel-heading">
                        <h3 class="panel-title">會員編號: {{ member.memberNo }}</h3>
                    </div>
                    <div class="panel-body">
                        <div class="row">
                            <div class="col-md-12">
                                <table class="table table-user-information">
                                    <tbody>
                                        <tr>
                                            <td>會員姓名:</td>
                                            <td>{{ member.name }}</td>
                                        </tr>
                                        <tr>
                                            <td>生日:</td>
                                            <td>{{ formatBirthday(member.birthday) }}</td>
                                        </tr>
                                        <tr>
                                            <td>註冊日:</td>
                                            <td>{{ member.registerTime }}</td>
                                        </tr>
                                        <tr>
                                            <td>上次登入日:</td>
                                            <td>{{ member.lastLoginTime }}</td>
                                        </tr>
                                        <tr>
                                            <td>Email:</td>
                                            <td>{{ member.email }}</td>
                                        </tr>
                                        <tr>
                                            <td>地址:</td>
                                            <td>{{ member.address }}</td>
                                        </tr>
                                        <tr>
                                            <td>電話:</td>
                                            <td>{{ member.phone }}</td>
                                        </tr>
                                        <tr>
                                            <td>常用收件人:</td>
                                            <td>{{ member.recipient }}</td>
                                        </tr>
                                        <tr>
                                            <td>常用收件人地址:</td>
                                            <td>{{ member.recipientAddress }}</td>
                                        </tr>
                                        <tr>
                                            <td>常用收件人電話:</td>
                                            <td>{{ member.recipientPhone }}</td>
                                        </tr>
                                        <tr>
                                            <td>狀態:</td>
                                            <td v-show="member.memberStatus === 1">已啟用</td>
                                            <td v-show="member.memberStatus === 0">已刪除</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <button type="button" class="btn btn-primary" @click="changeStatus()"
                                    :disabled="member.memberStatus == 1"
                                    :class="{ 'btn-disabled': member.memberStatus === 1 }">恢復帳號狀態</button>
                                <RouterLink to="/members"> <button type="button" class="btn btn-primary"
                                        style="margin-left: 10px;">回上頁</button>
                                </RouterLink>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Swal from 'sweetalert2'
import { ref, onMounted } from 'vue';
import axiosapi from '@/plugins/axios.js';
import axiosApi from "@/plugins/axios.js";

const member = ref(null);

//員工登入登出
const islogined = ref("");
const empName = ref("");
const loginTime = ref("");

onMounted(() => {
    islogined.value = sessionStorage.getItem("isLoggedIn");
    empName.value = sessionStorage.getItem("empName");
    loginTime.value = sessionStorage.getItem("loginTime");
    const memberNo = sessionStorage.getItem('memberNo');
    if (memberNo) {
        axiosapi.get(`/members/${memberNo}`)
            .then(response => {
                if (response.data && response.data.list.length > 0) {
                    member.value = response.data.list[0];
                }
            })
            .catch(error => {
                console.error('Error fetching member data:', error);
            });
    } else {
        console.error('No memberNo found in sessionStorage');
    }
});

const formatBirthday = (dateString) => {
    if (dateString.includes('T')) {
        return dateString.split('T')[0];
    } else {
        return dateString;
    }
};

function changeStatus() {
    const memberNo = member.value.memberNo;
    axiosapi.put(`/member/changeStatus/${memberNo}`)
        .then(response => {
            if (response.data.success) {
                Swal.fire({
                    title: "修改成功!",
                    icon: "success"
                }).then(() => {
                    // 成功提示框關閉後重新獲取會員資料
                    fetchMemberData(memberNo);
                });
            } else {
                alert('修改失敗: ' + response.data.message);
            }
        })
        .catch(error => {
            console.error('Error changing status:', error);
            alert('修改失敗');
        });
}

function fetchMemberData(memberNo) {
    axiosapi.get(`/members/${memberNo}`)
        .then(response => {
            if (response.data && response.data.list.length > 0) {
                member.value = response.data.list[0];
            }
        })
        .catch(error => {
            console.error('Error fetching member data:', error);
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
.container {
    height: 100vh;
    /* 使容器佔滿整個視口高度 */
}

.row {
    height: 100%;
    /* 使row佔滿容器高度 */
}

.panel {
    width: 100%;
}

/* 新增btn-disabled樣式 */
.btn-disabled {
    background-color: grey !important;
    border-color: grey !important;
    cursor: not-allowed !important;
}
</style>
