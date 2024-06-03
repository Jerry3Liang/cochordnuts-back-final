<template>
    <h3>商品新增</h3>
    <div style="float: left; margin-right: 0;">
        <div v-if="imagePreviewUrl">
            <figure class="card" style="width: 25rem;">
                <img :src="imagePreviewUrl" class="img-thumbnail" alt="無法載入">
            </figure>
        </div>
        <input type="file" @change="handleFileUpload">
    </div>
    <div class="card" style="width: 60%; margin-right: 5%;" >
        <div class="input-group mb-3 col-4">
            <span class="input-group-text" id="basic-addon1">商品名稱</span>
            <input type="text" v-model="productName" class="form-control" placeholder="請輸入產品名稱(必填)" aria-label="Username" aria-describedby="basic-addon1">
        </div>
        <div class="input-group mb-3">
            <span class="input-group-text">原價</span>
            <input type="text" v-model="unitPrice" placeholder="請輸入商品價格(必填)" class="form-control" aria-label="Amount (to the nearest dollar)">
        </div>
        <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">庫存數量</span>
            <input type="number" v-model="stock" class="form-control" placeholder="請輸入商品庫存數量(必填)" aria-label="Username" aria-describedby="basic-addon1">
        </div>

        <div class="form-check">
            <input class="form-check-input" type="checkbox" :value="isBest" id="flexCheckDefault" @change="show('bestChange')">
            <label class="form-check-label" for="flexCheckDefault">暢銷商品</label>
        </div>
        <div class="form-check">
            <input class="form-check-input" type="checkbox" :value="discount" id="flexCheckDefault" v-model="discount" @change="checkDis">
            <label class="form-check-label" for="flexCheckDefault">折扣商品</label>
            <div class="col-5" v-if="discount">
                <div class="input-group mb-3" style="float: left;">
                    <span class="input-group-text" id="basic-addon1">折數</span>
                    <input type="text" v-model="prodiscount" class="form-control" placeholder="請輸入產品折數" aria-label="Username" aria-describedby="basic-addon1" @blur="checkDis">
                </div>
                <span v-show="showDisErr == 1" style="color: red;">請輸入商品折數</span>
                <span v-show="showDisErr == 2" style="color: red;">請輸入正確的商品折數</span>
            </div>
            <div class="col-6" v-if="!discount">
                <div class="input-group mb-3" >
                    <span class="input-group-text" id="basic-addon1">折數</span>
                    <input type="text" class="form-control" placeholder="請先勾選為折扣商品" aria-label="Username" aria-describedby="basic-addon1" disabled>
                </div>
            </div>
        </div>
        <div class="form-check">
            <input class="form-check-input" type="checkbox" :value="isPreOrder" id="flexCheckDefault" @change="show('preOrder')">
            <label class="form-check-label" for="flexCheckDefault">預購商品</label>
        </div>

        <div class="input-group mb-3">
            <span>發行日期：</span>
            <input class="input-group-text" v-model="date" type="date" placeholder="Select Date"></input>
        </div>

        <div class="col-4" v-if="artist">
            <p>歌唱者/藝人(必填)：</p>
            <select class="form-select" @change="checkSelected('artist')" id="artistSelect">
                <option selected hidden>請選擇藝人</option>
                <option v-for="anart in artist" :key="anart.artistNo" :value="anart.artistNo">{{ anart.artistName }}</option>
            </select>
        </div>
        <div>
            <p>商品類型(必填)：</p>
            <select class="form-select" @change="checkSelected('type')" id="typeSelect">
                <option selected hidden>請選擇商品類型</option>
                <option v-for="atype in musicType" :key="atype.styleNo" :value="atype.styleNo"> {{ atype.styleType }}</option>
            </select>
        </div>
        <div>
            <p>語言(必填)：</p>
            <select class="form-select" @change="checkSelected('language')" id="languageSelect">
                <option selected hidden>請選擇語言</option>
                <option v-for="lan in languages" :key="lan.languageNo" :value="lan.languageNo">{{ lan.languageType }}</option>
            </select>
        </div>
        <div>
            <p>音樂年份(必填)：</p>
            <select class="form-select" @change="checkSelected('year')" id="yearSelect">
                <option selected hidden>請選擇音樂年份</option>
                <option v-for="year in years" :key="year.musicYearNo" :value="year.musicYearNo">{{ year.generation }}</option>
            </select>
        </div>

        <div>
            <div>
                <span>商品描述(必填)：</span>
                <textarea class="form-control" aria-label="With textarea" v-model="describe" style="width: 100%; height: 200px; resize: none; white-space: pre-wrap;"></textarea>
            </div>
        </div>
        <div style="text-align: center;">
        <button type="button" class="btn btn-outline-primary" @click="callCreate">新增商品</button> 
        </div>
            
    </div>


</template>
    
<script setup>
    import axios from '@/plugins/axios';
    import Swal from 'sweetalert2';
    // import VueDatePicker from '@vuepic/vue-datepicker';
    // import '@vuepic/vue-datepicker/dist/main.css'
    const discount = ref(false);
    const date = ref();
    const dateFormat = 'yyyy-MM-dd'
    const artist = ref(null);
    const artistSelected = ref(null);
    const musicType = ref(null);
    const typeSelected = ref(null);
    const languages = ref(null);
    const languageSelected = ref(null);
    const years = ref(null);
    const yearSelected = ref(null);
    const stock = ref();

    import { ref, onMounted } from 'vue';
    import { useRouter } from 'vue-router';
    const router= useRouter();

    const imagePreviewUrl = ref("");
    const uploadedImage = ref("");
    const byteArray = ref(null);
    const isBest = ref(0);
    const isPreOrder = ref(0);
    const showDisErr = ref();
    const describe = ref(null);
    const productName = ref(null);
    const prodiscount = ref(null);
    const unitPrice = ref(null);
    
    onMounted(function(){
        callTypes();
    })


    function handleFileUpload(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            imagePreviewUrl.value = reader.result;
        };
        reader.readAsDataURL(file);
        convertImageToByteArray(file);
    }

    function convertImageToByteArray(file){
        const reader = new FileReader();
        reader.onload = () => {
            const arrayBuffer = reader.result;
            byteArray.value = Array.from(new Uint8Array(arrayBuffer));
        };
        reader.readAsArrayBuffer(file);
    }
    
    function callTypes(){
        axios.get("/product/artist/find").then(function(response){
            artist.value = response.data;
            // console.log("artist=", artist.value
        }).catch(function(error){
            
        }).finally(function(){
        })

        axios.get("/product/style/find").then(function(response){
            musicType.value = response.data;
            // console.log("musicType=", musicType.value[0]);
        }).catch(function(error){

        })

        axios.get("/product/language/find").then(function(response){
            languages.value = response.data;
        }).catch(function(error){

        })
        
        axios.get("/product/musicYear/find").then(function(response){
            years.value = response.data;
        }).catch(function(error){

        })
    }
    function checkDis(){
        console.log(prodiscount.value);
        if(prodiscount.value == null){
            showDisErr.value = 1;
        } else if (prodiscount.value >= 1 || prodiscount.value <= 0 ){
            showDisErr.value = 2;
        } else {
            showDisErr.value = 0;
        }
    }
    function checkSelected(selectedType){
        if(selectedType === 'artist'){
            artistSelected.value = artist.value[document.getElementById("artistSelect").value-1];
            console.log("artistSelected=",artistSelected.value);
        } else if(selectedType === 'type'){
            typeSelected.value = musicType.value[document.getElementById("typeSelect").value-1];
            console.log("typeSelected=",typeSelected.value);
        } else if(selectedType === 'language'){
            languageSelected.value = languages.value[document.getElementById("languageSelect").value-1];
            console.log("languageSelected=",languageSelected.value);
        } else if(selectedType === 'year'){
            yearSelected.value = years.value[document.getElementById("yearSelect").value-1];
            console.log("yearSelected=",yearSelected.value);
        }

    }

    function show(changeTypes){
        if(changeTypes === 'bestChange'){
            
            if(isBest.value = null || isBest.value == 0 ){
                isBest.value = 1;
            } else {
                isBest.value = 0;
            }
        }
        if (changeTypes === 'preOrder'){
            
            if(isPreOrder.value = null || isPreOrder.value == 0 ){
                isPreOrder.value = 1;
            } else {
                isPreOrder.value = 0;
            }
        }
    }

    function callCreate(){
        if(discount.value == false){
            prodiscount.value = 1;
            discount.value = 0;
        }
        if(discount.value == true){
            discount.value = 1;
        }
    
        
        let data = {
            "photo" : byteArray.value,
            "productName": productName.value,
            "unitPrice" : unitPrice.value,
            "discount" : prodiscount.value,
            "publishedDate" : date.value,
            "isBest" : isBest.value,
            "isDiscount" : discount.value,
            "isPreorder" : isPreOrder.value,
            "artist": artistSelected.value,
            "productStyle" : typeSelected.value,
            "language" : languageSelected.value,
            "musicYear" : yearSelected.value,
            "stock" : stock.value,
            "describe" : describe.value,
            "productStatus" : 1,

        }
        console.log(data);

        if(productName.value == null || unitPrice.value == null || date.value == null ||
        artistSelected.value == null || typeSelected.value == null || languageSelected.value == null ||
        stock.value == null || describe.value == null){
            Swal.fire({
            title: "欄位未填寫完整",
            text: "必填欄位請勿留白",
            icon: "warning",
            showConfirmButton: true,
            confirmButtonText: "確認",
            })

        } else if(byteArray.value == null){
            Swal.fire({
            title: "未上傳商品圖片",
            text: "是否要新增沒有圖片的產品?",
            icon: "question",
            showConfirmButton: true,
            confirmButtonText: "確認新增",
            showCancelButton: true,
            cancelButtonText: "回去修改",
            }).then(function(result){
                if(result.isConfirmed){
                    axios.post("/products/create", data).then(function(response){
                        console.log("response=", response);
                        router.push({path: "/products/list"});
            
                    }).catch(function(error){
                        console.log("error=", error);
                    })
                }

            });
        } else {

            axios.post("/products/create", data).then(function(response){
                console.log("response=", response);
                router.push({path: "/products/list"});
    
            }).catch(function(error){
                console.log("error=", error);
    
            })
        }
        

    }



</script>
    
<style>
p{
    margin: 1%
}
    
</style>