<template>
    <h3>歌曲年代編輯</h3>
    <input type="text" v-model="generation">
    <button @click="yearAdd" class="btn btn-light" style="margin: 1%">新增</button>
    <h3 style="font-weight: bold;">歌曲年代</h3>
    <select multiple size="6" class="col-5">
        <option v-for="year in years" :key="year.musicYearNo" :value="year.musicYearNo">{{ year.generation }}</option>
    </select>
    
</template>
    
<script setup>
    import { ref, onMounted } from 'vue';
    import axios from '@/plugins/axios';
    const years = ref(null);
    const generation = ref(null);

    onMounted(function(){
        callYears();
    })

    function callYears(){
        axios.get("/product/musicYear/find").then(function(response){
            years.value = response.data;
        }).catch(function(error){
            
        }).finally(function(){
        })
    }

    function yearAdd(){
        let data = {
            "generation" : generation.value,
        }
        axios.post("/product/musicYear/add", data).then(function(response){
            console.log("response=",response);
            callYears();
        }).catch(function(error){
            
        }).finally(function(){
        })
    }
</script>
    
<style>
    
</style>