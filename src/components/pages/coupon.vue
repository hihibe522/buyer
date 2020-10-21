<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="text-right mt-4">
      <button class="btn btn-primary" @click="openCouponModal(true)">
        建立新的優惠券
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th>名稱</th>
          <th>折扣百分比</th>
          <th>到期日</th>
          <th>是否啟用</th>
          <th>編輯</th>
          <th>刪除</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, key) in coupons" :key="key">
          <td>{{ item.title }}</td>
          <td>{{ item.percent }}%</td>
          <td>{{ item.due_date }}</td>
          <td>
            <span v-if="item.is_enabled === 1" class="text-success">啟用</span>
            <span v-else class="text-muted">未啟用</span>
          </td>
          <td>
            <button class="btn btn-outline-primary btn-sm"
              @click="openCouponModal(false, item)"
            >編輯</button>
          </td>
          <td>
            <button class="btn btn-outline-danger btn-sm"
              @click="removeCoupon(item)"
            >刪除</button>
          </td>
        </tr>
      </tbody>
    </table>

    <pagination :pages="pagination" @checkpage="getCoupons"></pagination>

<!-- coupon midal -->
<div class="modal fade" id="couponModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="title">標題</label>
              <input type="text" class="form-control" id="title" v-model="tempCoupon.title"
                placeholder="請輸入標題">
            </div>
            <div class="form-group">
              <label for="coupon_code">優惠碼</label>
              <input type="text" class="form-control" id="coupon_code" v-model="tempCoupon.code"
                placeholder="請輸入優惠碼">
            </div>
            <div class="form-group">
              <label for="due_date">到期日</label>
              <input type="date" class="form-control" id="due_date"
                v-model="tempCoupon.due_date">
            </div>
            <div class="form-group">
              <label for="price">折扣百分比</label>
              <input type="number" class="form-control" id="price"
                v-model="tempCoupon.percent" placeholder="請輸入折扣百分比">
            </div>
            <div class="form-group">
              <div class="form-check">
                <input class="form-check-input" type="checkbox"
                  :true-value="1"
                  :false-value="0"
                  v-model="tempCoupon.is_enabled" id="is_enabled">
                <label class="form-check-label" for="is_enabled">
                  是否啟用
                </label>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary"
              @click="updateCoupon">更新優惠券</button>
          </div>
        </div>
      </div>
</div>


<!-- coupon midal -->




  </div>
</template>


<script>
import $ from 'jquery';
import pagination from './pagination';



export default {
data(){
  return{
    pagination:{},
    coupons:[],
    isLoading:false,
    tempCoupon:{
      // title:'',
      // code:'',
      // due_date:'',
      // percent:100,
      // is_enabled:0,

    },
    isNew:true,
  }
},
methods:{
  getCoupons(page=1){
        const vm = this ;
        const api =`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupons?page=${page}`;
        vm.isLoading = true;
        this.$http.get(api).then((response) => {
          console.log(response.data);
          vm.pagination = response.data.pagination;
          vm.coupons = response.data.coupons;
          vm.isLoading = false;
        })
    },
    openCouponModal(isNew,item){
      $('#couponModal').modal('show');
      if(isNew){
        this.tempCoupon = {};
        this.isNew = true;
      }
      else{
        this.tempCoupon = Object.assign({},item);
        this.isNew = false;
      }
    },
    updateCoupon(){
      const vm = this ;
      let api =`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon`;
      let httpMethod = 'post';

      if(!vm.isNew){
        api =`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`;
        httpMethod = 'put';
      }
      this.$http[httpMethod](api,{data:vm.tempCoupon}).then((response) => {
        if(response.data.success){
          $('#couponModal').modal('hide');
          vm.getCoupons();
        }
        else{
          $('#couponModal').modal('hide');
          vm.getCoupons();
          console.log('新增失敗');
        }
        })
    },
    removeCoupon(item){
      const vm = this ;
      vm.tempCoupon = item;
      let api =`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`;
       this.$http.delete(api,{data:vm.tempCoupon}).then((response) => {
          vm.getCoupons();
        })

    },
},
created(){
    this.getCoupons();
},
components:{
  pagination
},


}
</script>
