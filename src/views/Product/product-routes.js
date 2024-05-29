//引入 SFC 元件
import ProductCreate from "./ProductCreate.vue";
import TypesModify from "./TypesModify.vue";
import ProductModify from "./ProductModify.vue";
import ProductsList from "./ProductsList.vue";
import ProductDetailBack from "./ProductDetailBack.vue";

//設定 orderRoutes 網址:
export default [
    { name: "prodCreate-link", path: "/product/insert", component: ProductCreate },
    { name: "typesModify-link", path: "/types/modify", component: TypesModify },
    { name: "prodModify-link", path: "/product/modify", component: ProductModify },
    { name: "prodList-link", path: "/products/list", component: ProductsList },
    { name: "prodDetailBack-link", path: "/product/detailBack", component: ProductDetailBack }
]
