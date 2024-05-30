<template>
    <h3>演出者/藝人編輯</h3>
    <div>
    <input type="text" v-model="artistName">
    <button @click="artistAdd" style="margin: 1%" class="btn btn-light">新增</button>
    <h3 style="font-weight: bold;">演出者/藝人</h3>
    <select multiple size="6" class="col-10">
        <option v-for="anart in artist" :key="anart.artistNo" :value="anart.artistNo">{{ anart.artistName }}</option>
    </select><br>
    </div>
</template>
    
<script setup>
    import { ref, onMounted } from 'vue';
    import axios from '@/plugins/axios';
    const artist = ref(null);
    const artistName = ref(null);

    onMounted(function(){
        callArtist();
    })

    function callArtist(){
        axios.get("/product/artist/find").then(function(response){
            artist.value = response.data;
        }).catch(function(error){
            
        }).finally(function(){
        })
    }

    function artistAdd(){
        let data = {
            "artistName" : artistName.value,
        }
        axios.post("/product/artist/add", data).then(function(response){
            console.log("response=",response);
            callArtist();
        }).catch(function(error){
            
        }).finally(function(){
        })
    }
</script>
    
<style>
    
</style>