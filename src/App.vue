<template>
  <div style="width: 20%; float: left;">
    <NavigationBar></NavigationBar>
  </div>
  <div style="width: 80%; float: right; margin-top: 8%;">
  <RouterView></RouterView></div>
</template>

<script setup>
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import NavigationBar from "@/views/Navbar.vue";
</script>

<style>

</style>
