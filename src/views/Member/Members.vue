<template>
    <h1>會員列表</h1>
    <table class="table">
        <thead>
            <tr>
                <th scope="col">會員編號</th>
                <th scope="col">姓名</th>
                <th scope="col">註冊日</th>
                <th scope="col">上次登入日</th>
                <th scope="col">Email</th>
                <th scope="col">電話</th>
                <th scope="col">狀態</th>

            </tr>
        </thead>
        <tbody>
            <tr v-for="member in members" :key="member.memberNo">
                <td>
                    <RouterLink to="/member" @click="chMember(member.memberNo)">{{ member.memberNo }}</RouterLink>
                </td>
                <td>{{ member.name }}</td>
                <td>{{ member.registerTime }}</td>
                <td>{{ member.lastLoginTime }}</td>
                <td>{{ member.email }}</td>
                <td>{{ member.phone }}</td>
                <td v-show="member.memberStatus === 1">已啟用</td>
                <td v-show="member.memberStatus === 0">已刪除</td>
            </tr>
        </tbody>
    </table>


</template>
<script setup>
import axiosapi from '@/plugins/axios.js';
import { RouterLink, useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';

const members = ref([]);
const count = ref(0);


onMounted(() => {
    axiosapi.post('/members/find', {})
        .then(response => {
            members.value = response.data.list;
            count.value = response.data.count;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});

function chMember(memberNo) {
    sessionStorage.setItem("memberNo", memberNo);
}

</script>
<style scoped>
.table {
    border-collapse: collapse;
    /* 確保邊框不會重疊 */
    width: 100%;

}

.table th,
.table td {
    border-left: none;
    /* 移除左側邊框 */
    border-top: none;
    border-right: none;
    /* 移除右側邊框 */
    padding: 8px;

}

.table tr {

    border-bottom: 1px solid #c4bfbf;
    /* 設置行與行之間的邊框顏色 */

}

.table th {
    background-color: #f2f2f2;
    text-align: left;

}

.table tr:last-child {
    border-bottom: none;
    /* 移除最後一行的底部邊框 */

}
</style>
