<template>

        <label for="outputMember" class="form-label"><h2>購買商品明細</h2></label> 
        <table class="table table-striped table-hover">
        
                <thead>
                <tr>
                        <th scope="col"></th>
                        <th scope="col">商品名稱</th>
                        <th scope="col">單價</th>
                        <th scope="col">折扣</th>
                        <th scope="col">數量</th>
                        <th scope="col">小計</th>
                </tr>
                </thead>
                <tbody class="no-border-table td">
                <tr v-for="(anOrderDetail,index) in od" :key="index">
                        <th  scope="row" >{{index+1}}</th>
                        <td>{{anOrderDetail.productName}}</td>
                        <td>{{anOrderDetail.price}}</td>
                        <td>{{anOrderDetail.discount}}</td>
                        <td>{{anOrderDetail.count}}</td>
                        <td>{{anOrderDetail.total}}</td>
                </tr>
                </tbody>
        
        </table>
        
        

        
        <label for="outputMember" class="form-label"><h2>運送方式</h2></label> 
        <table class="table">
                <thead>     
                <tr>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                </tr>
                </thead>
                <tbody>
                <tr>
                        <th scope="row">運送方式</th>
                        <th>{{deliveryType}}</th>
                        <th></th>
                        <th></th>
                </tr>
                <tr>
                        <th scope="row">{{homeOrConvinientStore}}</th>
                        <th>{{address}}</th>
                        <th></th>
                        <th></th>
                </tr>
                </tbody>
                </table> 
        
        
        
        <!-- 收件人資料 -->
        <label for="outputMember" class="form-label"><h2>收件人資料</h2></label> 
        <table class="table">
                <thead>     
                <tr>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                </tr>
                </thead>
                <tbody>
                <tr>
                        <th scope="row">姓名</th>
                        <th>{{recipientName}}</th>
                        <th></th>
                        <th></th>
                </tr>
                <tr>
                        <th scope="row">電話</th>
                        <th>{{recipientPhone}}</th>
                        <th></th>
                        <th></th>
                </tr>
                </tbody>
                </table> 
        
        
        <!-- 訂單金額 -->
        
                <table class="table">
                <thead>
                        <tr>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        </tr>
                </thead>
                <thead>
                        <tr>
                        <th scope="col">運費</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col">60</th>
                        </tr>
                </thead>
                <thead>
                        <tr>
                        <th scope="col">訂單金額</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col">{{total}}</th>
                        </tr>
                </thead>
                </table>
        
        
        
        
        
        <label for="outputMember" class="form-label"><h2>付款方式</h2></label> 
        <table class="table">
                <thead>     
                <tr>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                </tr>
                </thead>
                <tbody>
                <tr>
                        <th scope="row">付款方式</th>
                        <th>{{payment}}</th>
                        <th>{{ isPayByCredit }}</th>
                        <th>{{ creditCardNo }}</th>
                </tr>
                <tr>
                        <th scope="row">付款狀態</th>
                        <th>{{paymentStatus}}</th>
                        <th></th>
                        <th></th>
                </tr>
                
                <tr>
                        <th scope="row">發票方式</th>
                        <th>{{receiptType}}</th>
                        <th></th>
                        <th></th>
                </tr>
                <tr>
                        <th scope="row">發票號碼</th>
                        <th>{{receipt}}</th>
                        <th></th>
                        <th></th>
                </tr>
                </tbody>
                </table> 
                <div class="form-floating">
                        <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style="height: 100px" disabled>{{ note }}</textarea>
                        <label for="floatingTextarea2">Comments</label>
                </div>
                <p></p>
                <div>

                        <button type="button" class="btn btn-primary button-spacing" @click="doAccept" v-show="isAccept">接收訂單</button><!-- 狀態改為備貨中 -->
                        <button type="button" class="btn btn-primary button-spacing" @click="doShip" v-show="isShip">出貨</button><!-- 狀態改為已出貨 -->
                        <button type="button" class="btn btn-primary button-spacing" @click="doComplete" v-show="isComplete">完成訂單</button><!-- 狀態改為完成訂單 -->
                        <button type="button" class="btn btn-primary button-spacing" @click="doCancel" v-show="isCancel">取消訂單</button><!-- 狀態改為取消訂單 -->
                        <RouterLink to="/order/back"> <button type="button" class="btn btn-primary button-spacing" >回上頁</button></RouterLink>


                </div> 
                
        </template>
        
        <script setup >
        import Swal from 'sweetalert2';
        import axiosapi from '@/plugins/axios.js';
        import { ref } from 'vue';       
        import { useRoute,useRouter } from 'vue-router';
        const route=useRoute();
        const router=useRouter()
        const id= ref(route.query.orderNumber)//orderNo
        console.log(id.value)


        //判斷button是否顯示
        const isAccept=ref(true)
        const isShip=ref(true)
        const isComplete=ref(true)
        const isCancel=ref(true)



        const od=ref([])//orderDetailDto陣列
        const deliveryType = ref('')//送貨方式
        const homeOrConvinientStore = ref('')//判斷送貨方式
        const address= ref('')//地址
        const recipientName=ref('')//收件人姓名
        const recipientPhone=ref('')//收件人電話
        const total = ref(0)//總金額
        const payment=ref('')//付款方式
        const isPayByCredit=ref('')
        const creditCardNo=ref('')//信用卡號
        const receiptType=ref()//發票方式
        const receipt=ref('')//發票號碼
        const note = ref('')//備註
        const preparationDate=ref(null)//備貨日
        const dispatchDate=ref(null)//出貨日
        const completeDate=ref(null)//完成日
        //將取得的order資料 存入下列變數 後續修改訂單可用
        const totalCount=ref(0)
        const createDate = ref('')
        const originAdress=ref('')
        const freight=ref(60)
        const receiptNo=ref('')
        const memberNo=ref(0)
        const status=ref('')
        const paymentStatus=ref('')

        //取得Order&orderDetail
        axiosapi.get(`/orders/findByOrderNo/${id.value}`).then(function(response){
                console.log("dofind")
                console.log(response.data)
                paymentStatus.value=response.data.order.paymentStatus
                for(let i =0 ;i<response.data.orderDetailDto.length;i++){//讀取後端傳入OrderDetailDto
                        od.value.push(response.data.orderDetailDto[i])//放入od陣列
                }
                if(response.data.order.createDate!=null){
                        createDate.value=new Date(response.data.order.createDate).toISOString();//傳換為Date物件 
                }
                if(response.data.order.preparationDate!=null){
                        preparationDate.value=new Date(response.data.order.preparationDate).toISOString();//傳換為Date物件
                }
                if(response.data.order.dispatchDate!=null){
                        dispatchDate.value=new Date(response.data.order.dispatchDate).toISOString();//傳換為Date物件
                }
                if(response.data.order.completeDate!=null){
                        completeDate.value=new Date(response.data.order.completeDate).toISOString();
                }
                originAdress.value=response.data.order.address
                receiptNo.value=response.data.order.receiptNo
                memberNo.value=response.data.order.memberNo
                totalCount.value=response.data.order.totalCount
                recipientName.value=response.data.order.recipient
                recipientPhone.value=response.data.order.recipientPhone
                deliveryType.value=response.data.order.deliverType
                total.value=response.data.order.totalPay
                payment.value=response.data.order.payment
                creditCardNo.value=response.data.order.creditCardNo
                receiptType.value=response.data.order.receiptType
                receipt.value=response.data.order.receiptNo
                note.value=response.data.order.note
                status.value=response.data.order.status
                if(preparationDate.value==null){
                        isAccept.value=true
                        console.log(isAccept.value)
                }else{
                        isAccept.value=false
                        console.log(isAccept.value)
                }
                if(dispatchDate.value==null){
                        isShip.value=true
                }else{
                        isShip.value=false                       
                }
                if(completeDate.value==null){
                        isComplete.value=true
                }else{
                        isComplete.value=false                       
                }
                if(status.value=='訂單取消'){
                        isAccept.value=false
                        isShip.value=false
                        isComplete.value=false
                }
                if(status.value=='訂單成立' || status.value=='備貨中'){
                        console.log(status.value)
                        isCancel.value=true
                }else{
                        isCancel.value=false
                }
                
                //判斷送貨方式
                if(deliveryType.value=='宅配'){
                        address.value=response.data.order.recipientAddress
                        homeOrConvinientStore.value='地址:'
                }else{
                        address.value=response.data.order.recipientAddress
                        homeOrConvinientStore.value='門市資訊:' 
                }
        
                //判斷付款方式
                if(payment.value=='信用卡'){
                        isPayByCredit.value='信用卡號'
                }
        
        }).catch(function (error) {
                console.log("callCreate error", error);
                        Swal.fire({
                                text: '失敗：'+error.message,
                                icon: 'error',
                                allowOutsideClick: false,
                                confirmButtonText: '確認',
                        });
        
        });

        

        function doCancel(){
                if(status.value=='訂單成立'|| status.value=='備貨中'){
                        let data ={
                "orderNo":id.value,
                "creditCardNo":creditCardNo.value,
                "receiptType":receiptType.value,
                "payment":payment.value,
                "totalCount":totalCount.value,
                "totalPay":total.value,
                "deliverType":deliveryType.value,
                "recipientAddress":address.value,
                "recipient":recipientName.value,
                "recipientPhone":recipientPhone.value,
                "note":note.value,
                "preparationDate":preparationDate.value,
                "createDate":createDate.value,
                "address":originAdress.value,
                "freight":freight.value,
                "receiptNo":receiptNo.value,
                "dispatchDate":dispatchDate.value,
                "completeDate":completeDate.value,
                "status":'訂單取消'
        }
                Swal.fire({
                title: "確認取消?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "確認"
                }).then((result) => {
                if (result.isConfirmed) {
                        axiosapi.put(`/orders/update/${memberNo.value}`,data).then(function(response){
                        Swal.fire({
                                title: "取消成功!",
                                icon: "success"
                        });
                        router.push({path: "/order/back"})
                        }).catch(function (error) {
                        Swal.fire({
                                text: '失敗：'+error.message,
                                icon: 'error',
                                allowOutsideClick: false,
                                confirmButtonText: '確認',
                                });
                        });
                }
                });
                }else{
                        Swal.fire({
                                text: '取消失敗',
                                icon: 'error',
                                allowOutsideClick: false,
                                confirmButtonText: '確認',
                                });
                }
        }






        function doComplete(){//訂單完成
                if(status.value=='已出貨'){
                completeDate.value=new Date().toISOString();
                let data ={
                "orderNo":id.value,
                "creditCardNo":creditCardNo.value,
                "receiptType":receiptType.value,
                "payment":payment.value,
                "totalCount":totalCount.value,
                "totalPay":total.value,
                "deliverType":deliveryType.value,
                "recipientAddress":address.value,
                "recipient":recipientName.value,
                "recipientPhone":recipientPhone.value,
                "note":note.value,
                "preparationDate":preparationDate.value,
                "createDate":createDate.value,
                "address":originAdress.value,
                "freight":freight.value,
                "receiptNo":receiptNo.value,
                "dispatchDate":dispatchDate.value,
                "completeDate":completeDate.value,
                "status":'完成訂單'
                }


                axiosapi.put(`/orders/update/${memberNo.value}`,data).then(function(response){
                        console.log(response)
                        Swal.fire({
                                text: "確認完成訂單",
                                icon: 'success',
                                allowOutsideClick: false,
                                confirmButtonText: '確認',
                        });
                        router.push({path: "/order/back"})

                }).catch(function (error) {

                        Swal.fire({
                        text: '失敗：'+error.message,
                        icon: 'error',
                        allowOutsideClick: false,
                        confirmButtonText: '確認',
                        });
                });
        }else{
                Swal.fire({
                        text: '訂單尚未出貨',
                        icon: 'error',
                        allowOutsideClick: false,
                        confirmButtonText: '確認',
                        });
        }
        }



        function doShip(){//出貨日
                if(status.value=='備貨中'){
                        dispatchDate.value=new Date().toISOString();
                        let data ={
                        "orderNo":id.value,
                        "creditCardNo":creditCardNo.value,
                        "receiptType":receiptType.value,
                        "payment":payment.value,
                        "totalCount":totalCount.value,
                        "totalPay":total.value,
                        "deliverType":deliveryType.value,
                        "recipientAddress":address.value,
                        "recipient":recipientName.value,
                        "recipientPhone":recipientPhone.value,
                        "note":note.value,
                        "preparationDate":preparationDate.value,
                        "createDate":createDate.value,
                        "address":originAdress.value,
                        "freight":freight.value,
                        "receiptNo":receiptNo.value,
                        "dispatchDate":dispatchDate.value,
                        "status":'已出貨'
                        }


                        axiosapi.put(`/orders/update/${memberNo.value}`,data).then(function(response){
                        console.log(response)
                        Swal.fire({
                                text: "確認出貨",
                                icon: 'success',
                                allowOutsideClick: false,
                                confirmButtonText: '確認',
                        });
                        router.push({path: "/order/back"})

                        }).catch(function (error) {

                        Swal.fire({
                        text: '失敗：'+error.message,
                        icon: 'error',
                        allowOutsideClick: false,
                        confirmButtonText: '確認',
                        });
                        });
                }else{
                        Swal.fire({
                        text: '請先確認訂單',
                        icon: 'error',
                        allowOutsideClick: false,
                        confirmButtonText: '確認',
                        });





                }



        }






        function doAccept(){//備貨中
        preparationDate.value=new Date().toISOString();

        let data ={
                "orderNo":id.value,
                "creditCardNo":creditCardNo.value,
                "receiptType":receiptType.value,
                "payment":payment.value,
                "totalCount":totalCount.value,
                "totalPay":total.value,
                "deliverType":deliveryType.value,
                "recipientAddress":address.value,
                "recipient":recipientName.value,
                "recipientPhone":recipientPhone.value,
                "note":note.value,
                "preparationDate":preparationDate.value,
                "createDate":createDate.value,
                "address":originAdress.value,
                "freight":freight.value,
                "receiptNo":receiptNo.value,
                "status":'備貨中'
                
        }

        axiosapi.put(`/orders/update/${memberNo.value}`,data).then(function(response){
                console.log(response)
                Swal.fire({
                        text: "確認訂單成功",
                        icon: 'success',
                        allowOutsideClick: false,
                        confirmButtonText: '確認',
                });
                router.push({path: "/order/back"})
        }).catch(function (error) {
                Swal.fire({
                        text: '失敗：'+error.message,
                        icon: 'error',
                        allowOutsideClick: false,
                        confirmButtonText: '確認',
                        });

        });
        }
        
        </script>
        
        <style>
        .no-border-table th,
        .no-border-table td {
                border: none !important;
        }

        .button-spacing {
                margin-bottom: 10px;
                margin-right: 5px; /* 設定按鈕間的右邊距為 10 像素 */
        }

        </style>