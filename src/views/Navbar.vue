<template>
    <div style="display: flex;">
        <RouterLink to="/" class="dropdown-item" style="width: 20%;">
            <img src="/logo.jpeg" style="width: 100%;">
        </RouterLink>
        
    </div>
    <!-- <nav class="navbar navbar-expand-lg" style="background-color: white"> -->
    <nav class="navbar navbar-expand-lg" style="background-color: #D1E9E9;">

        <div class="container-fluid">
            <!-- <a class="navbar-brand" href="#">CoChordNuts</a> -->
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span   span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavDropdown">
                <ul class="navbar-nav">
                    <li class="nav-item" v-if="!isLoggedIn">
                      <RouterLink class="nav-link active" aria-current="page" to="/members">會員管理</RouterLink>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        商品管理
                        </a>
                        <ul class="dropdown-menu">
                            <li><RouterLink to="/types/modify" class="dropdown-item">TypesModify</RouterLink></li>
                            <li><RouterLink to="/product/insert" class="dropdown-item">ProductInsert</RouterLink></li>
                            <li><RouterLink to="/product/modify" class="dropdown-item">ProductModify</RouterLink></li>
                            <li><RouterLink to="/products/list" class="dropdown-item">ProductsList</RouterLink></li>
                            <li><RouterLink to="/product/search" class="dropdown-item">Search</RouterLink></li>
                        </ul>
                    </li>
                    <li class="nav-item" v-if="!isLoggedIn">
                      <RouterLink class="nav-link active" aria-current="page" to="/order/back">訂單管理</RouterLink>
                    </li>
                    <li class="nav-item" v-if="!isLoggedIn">
                      <RouterLink class="nav-link active" aria-current="page" to="/Customer/CustomerCase">客服回覆信息管理</RouterLink>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
        
</template>
    
<script setup>

</script>
    
<style>
    
</style>