<template>
  <div>
    <table class="table mt-4">
    <thead>
      <tr>
        <th width="120">購買時間</th>
        <th>Email</th>
        <th width="120">購買款項</th>
        <th width="120">應付金額</th>
        <th width="100">是否付款</th>
      </tr>
    </thead>
    <tbody>

    </tbody>
  </table>
  </div>
</template>

<script>
export default {
  data(){
    return {

    }
  },
  methods:{
    getOrders(){
      const vm = this ;
      const api =`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/orders`;
      this.$http.get(api).then((response) => {
          console.log(response.data);

    })
    }
  },
  created(){
    this.getOrders();
  }

}
</script>
