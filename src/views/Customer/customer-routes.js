//引入 SFC 元件
import CustomerCase from './CustomerCase.vue';
import CaseDetail from './CaseDetail.vue';
import UpdateContent from './UpdateContent.vue';
import FinishCaseDetail from "./FinishCaseDetail.vue";

//設定 orderRoutes 網址:
export default [
    {name: "customer-customerCase-link", path: "/Customer/CustomerCase", component: CustomerCase},
    {name: "customer-caseDetail-link", path: "/Customer/CaseDetail", component: CaseDetail},
    {name: "customer-updateContent-link", path: "/Customer/UpdateContent", component: UpdateContent},
    {name: "customer-finishCaseDetail-link", path: "/Customer/FinishCaseDetail", component: FinishCaseDetail}
];