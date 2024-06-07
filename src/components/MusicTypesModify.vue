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
    import Swal from "sweetalert2";
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
        if(styleType.value == null || styleType.value == ""){
            Swal.fire({
            title: "欄位未填寫完整",
            text: "必填欄位請勿留白",
            icon: "warning",
            showConfirmButton: true,
            confirmButtonText: "確認",
            })
        } else {
            axios.post("/product/style/add", data).then(function(response){
                console.log("response=",response);
                callType();
            }).catch(function(error){
                
            }).finally(function(){
            })

        }
    }
</script>
    
<style>
    
</style>