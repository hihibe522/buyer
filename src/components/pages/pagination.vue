<template>
  <div>
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item" :class="{'disable':!pages.has_pre}">
          <a class="page-link" href="#" aria-label="Previous" @click.prevent="changepage(pages.current_page-1)">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li class="page-item" v-for="page in pages.total_pages"
        :key="page" :class="{'active':pages.current_page === page}">
          <a class="page-link" href="#" @click.prevent="changepage(page)">{{page}}</a></li>
        <li class="page-item" :class="{'disable':!pages.has_next}">
          <a class="page-link" href="#" aria-label="Next"  @click.prevent="changepage(pages.current_page+1)">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>


  </div>
</template>

<script>

export default {
  name:'pagination',
  props:["pages"],
  data(){
    return{

    }
  },
  methods:{
    changepage(page){
    this.$emit('checkpage',page);
    }
  }
}
</script>
