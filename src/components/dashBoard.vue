 <template>
 <div>
  <navbar></navbar>
  <alertmsg></alertmsg>
  <div class="container-fluid">
    <div class="row">

      <sidebar></sidebar>
      <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
        <router-view></router-view>
      </main>
    </div>
  </div>
</div>
</template>

<script>
import navbar from './navbar';
import sidebar from './sidebar';
import alertmsg from './alertMsg';

export default {
  components:{
    navbar,
    sidebar,
    alertmsg,
  }
}
</script>
