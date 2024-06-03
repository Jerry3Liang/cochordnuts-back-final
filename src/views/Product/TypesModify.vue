<template>
    <div>
        <h1 style="margin-left: 35%;">音樂類型新增</h1>
        <hr>
    </div>
    <div class="block">
        <ArtistsModify></ArtistsModify>
    </div>
    <div class="block">
        <MusicTypesModify></MusicTypesModify>
    </div>
    <div class="block">
        <LanguageModify></LanguageModify>
    </div>
    <div class="block">
        <YearModify></YearModify>
    </div>

</template>
    
<script setup>
    import ArtistsModify from '@/components/ArtistsModify.vue';
    import MusicTypesModify from '@/components/MusicTypesModify.vue';
    import LanguageModify from '@/components/LanguageModify.vue';
    import YearModify from '@/components/YearModify.vue';

</script>
    
<style>
    .block{
        margin: 2%;
        padding: 2%;
        border: 3px solid gray;
        width: 40%;
        border-radius: 5%;
        float: left
    }
</style>