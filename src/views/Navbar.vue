<template>
    <div style="display: flex;">
        <RouterLink to="/" class="dropdown-item" style="width: 80%; margin: 2%;">
            <img src="/logo.png" style="width: 100%;">
        </RouterLink>
        
    </div>
    <!-- <nav class="navbar navbar-expand-lg" style="background-color: #D1E9E9;">

        <div class="container-fluid">
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
    </nav> -->

    <div id="wrapper" style="margin-right: 2%;" >
        <div id="nav">
        <ul>
            <li class="color">
                <RouterLink class="nav-link active" aria-current="page" to="/members">
                    <div class="main">會員管理</div>
                </RouterLink>
                
            </li>
            <li class="color">
                <div class="main">商品管理</div>
                <ul class="subs">
                    <li><RouterLink to="/types/modify" class="dropdown-item">類型修改</RouterLink></li>
                    <li><RouterLink to="/product/insert" class="dropdown-item">商品新增</RouterLink></li>
                    <li><RouterLink to="/products/list" class="dropdown-item">商品列表</RouterLink></li>
                </ul>
            </li>
            <li class="color">
                <RouterLink class="nav-link active" aria-current="page" to="/order/back">
                <div class="main">訂單管理</div></RouterLink>
                
            </li>
            <li class="color">
                <RouterLink class="nav-link active" aria-current="page" to="/Customer/CustomerCase">
                <div class="main">客服回覆信息管理</div></RouterLink>
                
            </li>
        </ul>
        </div>
    </div>
    
</template>
    
<script setup>

</script>
    
<style>
    /* body{
        background:#6699CC;
        font-size:14px;
    } */

    body, ul, li, div {
        margin: 0;
        padding: 0;
    }

    img {
        border:0;
    }

    a {
        
        text-decoration:none;
    }

    /* ------- wrapper ------- */
    #wrapper {
        /* width: 800px; */
        height: 1000px;
        margin:  auto;
    }

    /* ------- nav ------- */
    #nav {
        /* margin-left: 2%; */
        width:190px;
    }

    #nav li {
        list-style: none;
    }

    div.main {
        font-size: larger;
        height: 60px;
        line-height: 60px;
        text-indent:25px;
        background-color:#6699CC;
        /* border-right:10px solid #0D9BE5; */
        cursor:pointer;
    }

    ul.subs li a {
        /* font-size: larger; */
        display:block;
        height: 40px;
        line-height: 40px;
        text-indent:25px;
        background-color:#F5F5F5;
        /* border-right:10px solid #0D9BE5; */
        font-size:large;
        color: #164158;
    }

    /* ------- color selection ------- */
    /* main menu*/
    li.color div.main {
        background-color:#6699CC;
        /* border-right:10px solid #0D9BE5; */
    }

    /* sub menu*/
    li.color ul.subs li a {
        /* border-right:10px solid #0D9BE5; */
        /* color: #0D9BE5; */
    }




    li.color ul.subs li a:hover {
        background-color: #CCCCCC;
        /* color: #FFF; */
    }
    /* div.main:hover {
        background-color: #CCCCCC;
    } */

    /* -------  sub menu open------- */
    /* li.color-blue div.open {
        background:url("images/arrow.png") no-repeat #0D9BE5 28px bottom;
    }

    li.color-red div.open {
        background:url("images/arrow.png") no-repeat #FD2621 28px bottom;
    }

    li.color-yellow div.open {
        background:url("images/arrow.png") no-repeat #FF8D00 28px bottom;
    }

    li.color-green div.open {
        background:url("images/arrow.png") no-repeat #15B59B 28px bottom;
    } */

    /* ------- mouseover ------- */
    /* li.color-blue div.rollover {
        background-color: #0D9BE5;
    }

    li.color-red div.rollover {
        background-color: #FD2621;
    }

    li.color-yellow div.rollover {
        background-color: #FF8D00;
    }

    li.color-green div.rollover {
        background-color: #15B59B;
    } */
</style>