<template>
  <div style="width: 20%; float: left; background-color: #d9b5b0; padding: 2.5%">
    <NavigationBar></NavigationBar>
  </div>
  <div style="width: 75%; float: right; margin-top: 8%; ">
  <RouterView></RouterView></div>
</template>

<script setup>
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import NavigationBar from "@/views/Navbar.vue";
</script>

<style>

</style>
