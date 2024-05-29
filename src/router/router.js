//引入 vue-orderRoutes 函式庫
import { createRouter, createWebHistory } from "vue-router";


//引入 SFC 元件
import Home from '../views/Home.vue';
// import Member from '../views/Member/member-routes.js';
import Product from '../views/Product/product-routes.js';
// import Order from '../views/Order/order-routes.js';
// import Customer from '../views/Customer/customer-routes.js';
import NotFound from '../views/NotFound.vue';

//設定 orderRoutes 網址:
const routes = [
    { name: "home-link", path: "/", component: Home },
    { name: "notfound-link", path: "/:pathMatch(.*)*", component: NotFound },
    // ...Member,
    ...Product,
    // ...Order,
    // ...Customer

];

//產生 orderRoutes 物件
export default createRouter({
    routes,
    history: createWebHistory()
});
