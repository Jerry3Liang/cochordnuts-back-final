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

                <td>{{ member.memberNo }}</td>
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

import { ref, onMounted } from 'vue';

// 使用 ref 创建响应式变量
const members = ref([]);
const count = ref(0);

// 在组件挂载后发送请求获取数据
onMounted(() => {
    axiosapi.post('/members/find', {})
        .then(response => {
            // 更新响应式变量的值
            members.value = response.data.list;
            count.value = response.data.count;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});
const formatBirthday = (dateString) => {
    // 检查日期字符串是否以 'T' 分隔
    if (dateString.includes('T')) {
        // 如果是以 'T' 分隔的，提取 yyyy-MM-dd 部分并返回
        return dateString.split('T')[0];
    } else {
        // 如果不是以 'T' 分隔的，直接返回日期字符串
        return dateString;
    }
};
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