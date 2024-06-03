//引入 SFC 元件
import EmployeeLogin from './EmployeeLogin.vue';
import EmployeeLogOut from "./EmployeeLogOut.vue";

//設定 router 網址:
export default [
    {name: "employee-login-link", path: "/Employee/EmployeeLogin", component: EmployeeLogin},
    {name: "employee-logout-link", path: "/Employee/EmployeeLogout", component: EmployeeLogOut}
];