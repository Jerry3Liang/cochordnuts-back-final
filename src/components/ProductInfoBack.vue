<template>
    <!-- <h3>InfoBack</h3> -->
        <figure class="card" style="width: 25rem; margin-right: 5%; float: left;">
            <img :src="`${path}${productObj.productNo}`" class="img-thumbnail" alt="無法載入">
        </figure>
        <div class="card" style="padding: 3%; height: 25rem;">
            <h2>{{ productObj.productName }}</h2>
            <p>演出者：{{ productObj.artistType }}</p>
            <p>發行日：{{ productObj.publishedDate }}</p>
            <p>NT.{{ productObj.unitPrice }}</p>
            <p>售價： {{ Math.round(productObj.unitPrice * productObj.discount) }}</p>
            <p>庫存：{{ productObj.stock }}</p>
            <p v-show="productObj.productStatus == 1">商品狀態：上架中</p>
            <p v-show="productObj.productStatus == 0">商品狀態：已下架</p>
            <div>
                <RouterLink :to="{path:'/product/modify', query: { id: productObj.productNo }}">
                    <button type="button" class="btn btn-outline-primary" style="margin: 5px;">編輯</button></RouterLink>
                <button type="button" class="btn btn-outline-danger" style="margin: 5px;" @click="callDelete">刪除</button>
            </div>
            
        </div>
        
    
    <nav style="margin: 2%;">
        <div class="nav nav-tabs" id="nav-tab" role="tablist">
            <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">商品描述</button>
            <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">購物說明</button>
        </div>
    </nav>
    <div class="tab-content" id="nav-tabContent">
        <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" tabindex="0" style="white-space: pre-wrap;">
            <h5>{{ productObj.describe }}</h5>
        </div>
        <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab" tabindex="0">
            <ShoppingGuide></ShoppingGuide>
        </div>
    </div>

</template>
    
<script setup>
    const path = import.meta.env.VITE_PHOTO_URL;
    import { ref, onMounted } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import Swal from 'sweetalert2';
    import axios from '@/plugins/axios';
    import ShoppingGuide from '@/components/ShoppingGuide.vue';
    const props = defineProps(["productObj"]);
    // console.log(props.productObj);
    // const pro = ref(props.productObj.productNo);

    const route = useRoute();
    const router = useRouter();

    const id = ref(route.query.id);
    
    function callDelete(){
        console.log(id);
        Swal.fire({
            title: "確認刪除?",
            text: "是否刪除此產品",
            icon: "warning",
            showConfirmButton: true,
            confirmButtonText: "確認刪除",
            showCancelButton: true,
            cancelButtonText: "返回頁面",
            }).then(function(result){
                if(result.isConfirmed){
                axios.delete(`/products/remove/${id.value}`).then(function(response){
                    console.log(response.data);
                    
                    Swal.fire({
                    title: "刪除成功",
                    text: "已刪除該商品",
                    icon: "success",
                    showConfirmButton: true,
                    confirmButtonText: "確認",
                    }).then(function(){
                        router.push({path: "/products/list"}); 
                    })
                }).catch(function(error){
                    console.log(error.data);
        
                })
                    
                } else {
                    
                };

            });

    }
    
</script>
    
<style>
    
    
</style>