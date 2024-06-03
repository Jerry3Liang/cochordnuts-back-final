<template>
      <div class="row mt-5" style="margin-bottom: 20px;">
        <div class="col-md-5 mx-auto">
            <div class="input-group">
                <input class="form-control border rounded-pill" type="text" placeholder="輸入訂單編號" v-model="orderSearch" @input="doSearch">
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
      <td><button style="padding :0 5px;" type="button" class="btn btn-outline-dark" @click="seeDetail(anOrder.orderNo)">查看詳細內容</button></td>

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
import { useRouter } from 'vue-router'; 
import Paginate from "vuejs-paginate-next"

const route=useRouter();
const orders = ref([])
const current=ref(1)
const pages=ref(100)
const start=ref(0)
const rows=ref(10)
const orderSearch=ref('')
import { ref ,onMounted} from 'vue';
onMounted(function(){
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

    
</script>
    
<style>
  .no-border-table,
  .no-border-table th,
  .no-border-table td {
    border: none !important;
  }

</style>