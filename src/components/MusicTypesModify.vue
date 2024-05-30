<template>
    <h3>音樂類型編輯</h3>
    <input type="text" v-model="styleType">
    <button @click="typeAdd" style="margin: 1%" class="btn btn-light">新增</button>
    <h3 style="font-weight: bold;">音樂類型</h3>
    <select multiple size="6" class="col-5">
        <option v-for="atype in types" :key="atype.styleNo" :value="atype.styleNo">{{ atype.styleType }}</option>
    </select>
    
</template>
    
<script setup>
    import { ref, onMounted } from 'vue';
    import axios from '@/plugins/axios';
    const types = ref(null);
    const styleType = ref(null);

    onMounted(function(){
        callType();
    })

    function callType(){
        axios.get("/product/style/find").then(function(response){
            types.value = response.data;
        }).catch(function(error){
            
        }).finally(function(){
        })
    }

    function typeAdd(){
        let data = {
            "styleType" : styleType.value,
        }
        axios.post("/product/style/add", data).then(function(response){
            console.log("response=",response);
            callType();
        }).catch(function(error){
            
        }).finally(function(){
        })
    }
</script>
    
<style>
    
</style>