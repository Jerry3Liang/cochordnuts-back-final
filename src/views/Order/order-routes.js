//引入 SFC 元件
import orderBack from '@/views/Order/orderBack.vue';
import orderDetailBack from '@/views/Order/orderDetailBack.vue';

//設定 orderRoutes 網址:
export default [
    { name: "orderDetailBack-link", path: "/orderDetail/Back", component: orderDetailBack },
    { name: "orderBack-link", path: "/order/back", component: orderBack },
]
