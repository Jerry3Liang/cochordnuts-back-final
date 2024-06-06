<template>
      <div class="row mt-5" style="margin-bottom: 20px;">
        <div class="col-md-5 mx-auto">
            <div class="input-group">
                <input class="form-control border rounded-pill" type="text" placeholder="輸入訂單編號" v-model="orderSearch" @input="doSearch">
            </div>
        </div>
    </div>
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

<table class="table table-striped table-hover no-border-table" style="text-align: center; margin-bottom: 30px;">
  <thead>
    <tr>
      <th scope="col" style="width: 85px;">訂單編號</th>
      <th scope="col" style="width: 85px;">客戶編號</th>
      <th scope="col" style="width: 90px;">金額</th>
      <th scope="col" style="width: 200px;">更新時間</th>
      <th scope="col" style="width: 100px;">付款狀態</th>
      <th scope="col" style="width: 100px;">狀態</th>
      <th scope="col" style="width: 150px;">檢視</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(anOrder,index) in orders" :key="index">
  
      <td>{{ anOrder.orderNo  }}</td>
      <td>{{ anOrder.memberNo }}</td>
      <td>$ {{ anOrder.totalPay }}</td>
      <td>{{ anOrder.lastModifiedDate }}</td>
      <td>{{ anOrder.paymentStatus }}</td>
      <td>{{ anOrder.status }}</td>
      <td><button style="padding :0 2px;height: 35px;" type="button" class="btn btn-outline-success" @click="seeDetail(anOrder.orderNo)">查看詳細內容</button></td>
      
    </tr>
  </tbody>
</table>
<Paginate class="justify-content-center"
        first-button-text="&lt;&lt;"
        last-button-text="&gt;&gt;"
        prev-text="&lt;"
        next-text="&gt;"
        :page-count="pages"
        :initial-page="current"
        v-model="current"
        :click-handler="doChangePage"
        :first-last-button="true"
      
        ></Paginate>
</template>
    
<script setup>
import moment from 'moment';
import Swal from 'sweetalert2';
import axiosapi from '@/plugins/axios.js';
import {RouterLink, useRouter} from 'vue-router';
import Paginate from "vuejs-paginate-next"

import {ref, onMounted} from 'vue';
//跳轉用
const router = useRouter();

const islogined = ref("");
const empName = ref("");
const loginTime = ref("");

const route=useRouter();
const orders = ref([])
const current=ref(1)
const pages=ref(100)
const start=ref(0)
const rows=ref(10)
const orderSearch=ref('')
import axiosApi from "@/plugins/axios.js";
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
  doChangePage();
})
function doSearch(){
  current.value=1
  console.log(current.value)
  let data={
      "start":0,
      "rows":rows.value,
      "num":orderSearch.value
    }
    axiosapi.post("/orders/findAll",data).then(function(response){
      orders.value=[]
      console.log(response.data)
      pages.value=Math.ceil(response.data.count/rows.value)//算出頁數
      console.log('頁數',pages.value)
      for(let i = 0 ; i<response.data.list.length;i++){
        
          orders.value.push(response.data.list[i]);
          orders.value[i].lastModifiedDate=moment(orders.value[i].lastModifiedDate).format('YYYY-MM-DD HH:mm:ss')
      }
  
      
    // newPreparationDate.value=moment(preparationDate.value).format('YYYY-MM-DD')//轉換格式顯示網頁
      
    }).catch(function (error) {
        console.log("error", error);
                    Swal.fire({
                        text: '查無資料',
                        icon: 'error',
                        allowOutsideClick: false,
                        confirmButtonText: '確認',
                    });
    });




}

function doChangePage(page){
  console.log(page)
    if(page){
          start.value=(page-1)*rows.value
          current.value=page
      }else{
          start.value=0
          current.value=1
      }    
      
      
      let data={
      "start":start.value,
      "rows":rows.value,
      "num":orderSearch.value
    }
    axiosapi.post("/orders/findAll",data).then(function(response){
      orders.value=[]
      console.log(response.data)
      console.log(response.data.list.length)
      pages.value=Math.ceil(response.data.count/rows.value)//算出頁數
      for(let i = 0 ; i<response.data.list.length;i++){
          orders.value.push(response.data.list[i]);
          orders.value[i].lastModifiedDate=moment(orders.value[i].lastModifiedDate).format('YYYY-MM-DD HH:mm:ss')
      }
  
      
    // newPreparationDate.value=moment(preparationDate.value).format('YYYY-MM-DD')//轉換格式顯示網頁
      
    }).catch(function (error) {
        console.log("error", error);
                    Swal.fire({
                        text: '失敗：'+error.message,
                        icon: 'error',
                        allowOutsideClick: false,
                        confirmButtonText: '確認',
                    });
    });

}




function seeDetail(orderNo){
  console.log(orderNo)
  route.push({path: "/orderDetail/Back", query:{orderNumber:orderNo}})//跳頁 將orderNo帶到下一頁

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
    
<style>
  .no-border-table,
  .no-border-table th,
  .no-border-table td {
    border: none !important;
  }

</style>