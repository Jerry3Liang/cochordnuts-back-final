<template>
    <h3>語言編輯</h3>
    <div>
    <input type="text" v-model="languageType">
    <button @click="languageAdd" style="margin: 1%" class="btn btn-light">新增</button>
    <h3 style="font-weight: bold;">語言</h3>
    <select multiple size="6" class="col-5">
        <option v-for="language in languages" :key="language.languageNo" :value="language.languageNo">{{ language.languageType }}</option>
    </select>
    </div>
</template>
    
<script setup>
    import { ref, onMounted } from 'vue';
    import axios from '@/plugins/axios';
    const languages = ref(null);
    const languageType = ref(null);

    onMounted(function(){
        callLanguage();
    })

    function callLanguage(){
        axios.get("/product/language/find").then(function(response){
            languages.value = response.data;
        }).catch(function(error){
            
        }).finally(function(){
        })
    }

    function languageAdd(){
        let data = {
            "languageType" : languageType.value,
        }
        axios.post("/product/language/add", data).then(function(response){
            console.log("response=",response);
            callLanguage();
        }).catch(function(error){
            
        }).finally(function(){
        })
    }
</script>
    
<style>
    
</style>