<template>
        <div class="input-group mb-3" style="width: 80%;;">
            <input type="text" class="form-control" v-model="productName" placeholder="商品名稱" aria-label="Recipient's username" aria-describedby="button-addon2">
            <RouterLink :to="{path:'/product/search', query: { productName: productName }}">
                <button class="btn btn-outline-secondary" type="button" style="border-radius: 0%; height: 100%;" id="button-addon2">搜尋</button>
            </RouterLink>
            <button class="btn btn-outline-secondary" style="width: 20%;" @click="showModal = true">
                <img src="/down.png" style="width: 100%;">
            </button>
        </div>

    <!-- Modal -->
    <div class="modalSet" v-show="showModal" style="width: 23%; filter: opacity(95%);">
    <div class="modal-content">
        <div class="modal-header" style="text-align: center;">
            <h5>請輸入詳細條件</h5>
        </div>
        <div class="modal-body">
            <table>
                <tr><td style="width: 15%;">商品名稱：</td><td style="width: 50%;"><input type="text" v-model="productName"></td></tr>
                <tr><td>演唱者：</td><td><input type="text" v-model="artistName"></td></tr>
                <tr><td>價格：</td><td><input type="text" size="8" v-model="startPrice">~<input type="text" size="8" v-model="endPrice" :min="priceMin" @blur="updatePriceMin"></td></tr>
                <tr><td>發行日：</td><td style="width: fit-content;"><input type="date" v-model="startDate"  @change="updateEndDateMin">~<input type="date" v-model="endDate" :min="endDateMin"></td></tr>
            </table>
        </div>

        <div class="modal-footer" style="display: flex; justify-content: center;">
            <button style="margin: 1%;" class="btn btn-outline-secondary" @click="showModal = false">取消</button>
            <RouterLink 
            :to="{path:'/product/search', query: { 
                productName: productName, 
                artistName: artistName,
                startPrice: startPrice,
                endPrice: endPrice,
                startDate: startDate,
                endDate, endDate,
                }}" style="margin: 1%;">
                <button class="btn btn-outline-secondary" @click="showModal = false">送出</button>
            </RouterLink>
        </div>
    </div>
    </div>


</template>
    
<script setup>
    import { ref } from 'vue';
    import axios from '@/plugins/axios.js';
    
    const showModal = ref(false);
    const productName = ref(null);
    const artistName = ref(null);
    const startPrice = ref(null);
    const endPrice = ref(null);
    const startDate = ref(null);
    const endDate = ref(null);
    const endDateMin = ref(null);
    const priceMin = ref(null);
    
    const emits = defineEmits(["searchcons"]);

    function updateEndDateMin(){
        endDateMin.value = startDate.value;
        if(endDate.value < endDateMin.value){
            endDate.value = endDateMin.value;
        }
    }

    function updatePriceMin(){
        priceMin.value = startPrice.value;
        if(endPrice.value < priceMin.value){
            endPrice.value = priceMin.value;
        }
    }

    
    
</script>
    
<style>
    tr,td{
        border: none !important;
    }
    
    .modalSet{
        position: fixed;
        padding: 1%;
        position: fixed;
        width: 32%; 
        overflow: hidden; 
        background-color: 	#FCFCFC; 
        transition: opacity 0.15s linear;
        border: 2px solid gray;
        border-radius: 10px;
        z-index: 10000;
    }
</style>