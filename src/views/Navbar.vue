<template>
    <div style="display: flex;">
        <RouterLink to="/" class="dropdown-item" style="width: 80%; margin: 2%;">
            <img src="/logo.png" style="width: 100%;">
        </RouterLink>
        
    </div>


    <div id="wrapper" style="" >
        <div id="nav">
        <ul>
            <li class="color">
                <RouterLink class="nav-link active" aria-current="page" to="/members">
                    <div class="main">會員管理</div>
                </RouterLink>
                
            </li>
            <li class="color">
                <div class="main" @click="showList">商品管理
                    <img src="/down.png" style="width: 10%;">
                </div>

                <ul class="subs" v-if="list">
                    <li><RouterLink to="/types/modify" class="dropdown-item">類型新增</RouterLink></li>
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
    import { ref } from 'vue';
    const list = ref(false);
    function showList(){
        if(list.value == false){
            list.value = true;
        }else{
            list.value = false;

        }
    }



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
        font-weight: bold;
        height: 60px;
        line-height: 60px;
        text-indent:25px;
        background-color:#d6d0c9;
        cursor:pointer;
    }


    ul.subs li a {
        /* font-size: larger; */
        padding-left: 10%;
        display:block;
        height: 40px;
        line-height: 40px;
        text-indent:25px;
        background-color:#d9b5b0;
        /* border-right:10px solid #0D9BE5; */
        font-size:large;
        color: #164158;
    }

    /* ------- color selection ------- */
    /* main menu*/
    li.color div.main {
        background-color:#d9b5b0;
        /* border-right:10px solid #0D9BE5; */
    }
    li.color div.main:hover {
        background-color:#d0a59f;
        /* border-right:10px solid #0D9BE5; */
    }

    

    li.color ul.subs li a:hover {
        background-color: #d0a59f;
        /* color: #FFF; */
    }
    


</style>