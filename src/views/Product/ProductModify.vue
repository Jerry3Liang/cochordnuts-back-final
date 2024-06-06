<template>
    <div style="text-align: center; margin-bottom: 1%;">
        <h1>商品修改</h1>
        <hr>
    </div>
    <div v-if="product">
        <div style="float: left; margin-right: 5%;">
            <div v-if="!imagePreviewUrl">
                <figure class="card" style="width: 25rem;">
                    <img :src="`${path}${product.productNo}`" class="img-thumbnail" alt="無法載入">
                </figure>
            </div>
            <div v-if="imagePreviewUrl">
                <figure class="card" style="width: 25rem;">
                    <img :src="imagePreviewUrl" class="img-thumbnail" alt="無法載入">
                </figure>
            </div>
            <input type="file" @change="handleFileUpload">
        </div>
        <div class="card" style="padding-left: 5%; padding-right: 5%; padding-top: 5%; width: 60%;">
            商品名稱：<input type="text" v-model="product.productName" class="col-6">
            發行日：<input type="date" class="col-6" :value="product.publishedDate" id="dateSelect" @change="checkSelected('date')">
            原價：<input type="text" v-model="product.unitPrice" class="col-6">
            
            <div style="display: flex; margin-top: 2%">
            <fieldset style="border: 1px solid #ababab; padding: 5%; border-radius: 15px; width: 48%; margin: 1%">
            <legend style="margin-top: -50px; background-color: aliceblue; width: 60%;">音樂類型填寫</legend>
            <p>演出者：</p>
            <select class="form-select" @change="checkSelected('artist')" id="artistSelect">
                <option value="0" hidden>{{ product.artistType }}</option>
                <option v-for="anart in artist" :key="anart.artistNo" :value="anart.artistNo">{{ anart.artistName }}</option>
            </select>
            <p>商品類型：</p>
            <select class="form-select" @change="checkSelected('type')" id="typeSelect">
                <option value="0" hidden>{{ product.styleType }}</option>
                <option v-for="atype in musicType" :key="atype.styleNo" :value="atype.styleNo"> {{ atype.styleType }}</option>
            </select>
            <p>語言：</p>
                <select class="form-select" @change="checkSelected('language')" id="languageSelect">
                    <option value="0" hidden>{{ product.languageType }}</option>
                    <option v-for="lan in languages" :key="lan.languageNo" :value="lan.languageNo">{{ lan.languageType }}</option>
                </select>
            <p>音樂年份：</p>
            <select class="form-select" @change="checkSelected('year')" id="yearSelect">
                <option value="0" hidden>{{ product.musicYear }}</option>
                <option v-for="year in years" :key="year.musicYearNo" :value="year.musicYearNo">{{ year.generation }}</option>
            </select>
            </fieldset>
            
            <fieldset style="border: 1px solid #ababab; padding: 5%; border-radius: 15px; width: 48%; margin: 1%">
            <legend style="margin-top: -50px; background-color: aliceblue; width: 60%;">商品類型填寫</legend>
            <div class="form-check">
                <input v-show="isBest ===1" class="form-check-input" type="checkbox" checked @change="checkType('bestChange')">
                <input v-show="isBest ===0" class="form-check-input" type="checkbox" @change="checkType('bestChange')">
                <label class="form-check-label">暢銷商品</label>
            </div>

            <div class="form-check">
                <input v-show="isDiscount ===1" class="form-check-input" type="checkbox" checked @change="checkType('discountChange')">
                <input v-show="isDiscount ===0" class="form-check-input" type="checkbox" @change="checkType('discountChange')">
                <label class="form-check-label">折扣商品</label>
            </div>

            <div class="form-check">
                <input v-show="isPreorder ===1" class="form-check-input" type="checkbox" checked @change="checkType('preorderChange')">
                <input v-show="isPreorder ===0" class="form-check-input" type="checkbox" @change="checkType('preorderChange')">
                <label class="form-check-label">預購商品</label>
            </div>

            折數：<input v-show="isDiscount ===1" type="text" v-model="product.discount" class="col-6">
            <input v-show="isDiscount ===0" type="text" v-model="product.discount" class="col-6" disabled>
            </fieldset>
            </div>

            <p>售價：{{ Math.round(product.unitPrice * product.discount) }}</p>
            <p>庫存：<input type="number" v-model="product.stock"></p>
            商品狀態：
            <select class="col-6" id="status" @change="checkSelected('status')">
                <option value="2" hidden>{{ productSta }}</option>
                <option value="1">上架中</option>
                <option value="0">已下架</option>
            </select>
            商品描述：<textarea v-model="product.describe" style="width: 100%; height: 200px; resize: none;"></textarea>
            <div style="text-align: center; margin: 5%">
                <button type="button" class="btn btn-outline-primary" @click="checkForm">送出</button>
            </div>
            
        </div>

        
    </div>
</template>
    
<script setup>
    import axiosApi from "@/plugins/axios.js";

    const path = import.meta.env.VITE_PHOTO_URL;
    import { ref, onMounted } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    
    import axios from '@/plugins/axios.js';
    import Swal from 'sweetalert2';

    

    const route = useRoute();
    const router = useRouter();
    const id = ref(route.query.id);
    const imagePreviewUrl = ref("");
    const byteArray = ref(null);

    
    // const unitPrice = ref(null);
    // const discount = ref(null);

    const isBest = ref(null);
    const isDiscount = ref(null);
    const isPreorder = ref(null);

    const dateSelected = ref(null);
    const artist = ref(null);
    const artistSelected = ref(null);
    const musicType = ref(null);
    const typeSelected = ref(null);
    const languages = ref(null);
    const languageSelected = ref(null);
    const years = ref(null);
    const yearSelected = ref(null);
    const productSta = ref(null);
    const statusSelected = ref(null);
    
    const product = ref(null);
    
    onMounted(function(){
        callFindById(id);
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

    function checkForm(){ 
        if(document.getElementById("artistSelect").value == 0){
            artistSelected.value = product.value.artistType;
            for (let anart of artist.value){
                if(artistSelected.value === anart.artistName){
                    artistSelected.value = anart;
                }
            }
        }
        if(document.getElementById("typeSelect").value == 0){
            typeSelected.value = product.value.styleType;
            for (let type of musicType.value){
                if(typeSelected.value === type.styleType){
                    typeSelected.value = type;
                }
            }
        }
        if(document.getElementById("languageSelect").value == 0){
            languageSelected.value = product.value.languageType;
            for (let language of languages.value){
                if(languageSelected.value === language.languageType){
                    languageSelected.value = language;
                }
            }
        }
        if(document.getElementById("yearSelect").value == 0){
            yearSelected.value = product.value.musicYear;
            for (let year of years.value){
                if(yearSelected.value === year.generation){
                    yearSelected.value = year;
                }
            }
        }
        if(dateSelected.value == null){
            dateSelected.value = product.value.publishedDate;
        }
        if(document.getElementById("status").value == 2){
            statusSelected.value = product.value.productStatus;
        }
        if(byteArray.value == null){
            byteArray.value = product.value.photo;
        }

        let data = {
            "productNo" : id.value,
            "discount" : product.value.discount,
            "photo" : byteArray.value,
            "productName": product.value.productName,
            "unitPrice" : product.value.unitPrice,
            "publishedDate" : dateSelected.value,
            "isBest" : isBest.value,
            "isDiscount" : isDiscount.value,
            "isPreorder" : isPreorder.value,
            "artist": artistSelected.value,
            "productStyle" : typeSelected.value,
            "language" : languageSelected.value,
            "musicYear" : yearSelected.value,
            "stock" : product.value.stock,
            "describe" : product.value.describe,
            "productStatus" : statusSelected.value,
        }
        // console.log(data);

        axios.put(`/products/modify/${id.value}`,data).then(function(response){
            console.log("response=",response.data);
            Swal.fire({
            icon: "success",
            title: "已成功修改商品",
            showConfirmButton: true,
            confirmButtonText: "確認",
            }).then(function(result){
                if(result.isConfirmed){
                    router.push({path: "/products/list"});
                } 
            })

        }).catch(function(error){
            console.log("error=",error.data);

        })

    }

    function callFindById(id){
        axios.get(`/products/detail/${id.value}`).then(function(response){
            product.value = response.data;
            console.log("response=",response.data);
            if(product.value.productStatus === 1){
                productSta.value = "上架中";
            } else if(product.value.productStatus === 0){
                productSta.value = "已下架";
            }
            isBest.value = product.value.isBest;
            isDiscount.value = product.value.isDiscount;
            isPreorder.value = product.value.isPreorder;
            // console.log(typeof(isBest.value));
            // if(product.value.isBest == 1){
            //     isBest.value = true;
            // }else if(product.value.isBest == 0){
            //     isBest.value = false;
            // }
        }).catch(function(error){
            console.log("error=",error);
        })
    }
    function callTypes(){
        axios.get("/product/artist/find").then(function(response){
            artist.value = response.data;
        }).catch(function(error){
            
        }).finally(function(){
        })

        axios.get("/product/style/find").then(function(response){
            musicType.value = response.data;
            // console.log("musicType=", musicType.value[0]);r
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

    function checkType(changeTypes){
        if(changeTypes === 'bestChange'){
            
            if(isBest.value === 0){
                isBest.value = 1;
                console.log("isBest=",isBest.value);
            } else if(isBest.value === 1){
                isBest.value = 0;
                console.log("isBest=",isBest.value);
            }
        }
        if(changeTypes === 'discountChange'){
            
            if(isDiscount.value === 0){
                isDiscount.value = 1;
                console.log("isDiscount=",isDiscount.value);
            } else if(isDiscount.value === 1){
                isDiscount.value = 0;
                console.log("isDiscount=",isDiscount.value);
            }
        }
        if (changeTypes === 'preorderChange'){
            
            if(isPreorder.value = null || isPreorder.value == 0 ){
                isPreorder.value = 1;
            } else {
                isPreorder.value = 0;
            }
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
        } else if(selectedType === 'date'){
            dateSelected.value = document.getElementById("dateSelect").value;
            console.log("dateSelected=",dateSelected.value);
        } else if(selectedType === 'status'){
            statusSelected.value = document.getElementById("status").value;
            console.log("statusSelected=",statusSelected.value);
        }

    }

    

</script>
    
<style>
    
</style>