//引入 SFC 元件
import Members from './Members.vue';
import Member from './Member.vue';

//設定路由網址
export default [
    { name: "members-link", path: "/members", component: Members },
    { name: "member-link", path: "/member", component: Member }
];
