import Vue from 'vue';
Vue.prototype.$bus = new Vue();


// this.$bus.$emit('message:push',res.data.message,'danger')
// 自定義名稱 'messsage:push'
// message: 傳入參數 訊息內容
// status: 樣式，預設值為 warning
