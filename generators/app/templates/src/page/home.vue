<template class="home-page">
  <div>
    <!-- header -->
    <HeaderCom></HeaderCom>
    <div class="content">
        Welcome to Your Vue.js App
      </div>
  </div>
</template>

<script>
import HeaderCom from "components/header.vue";
export default {
  name: 'home',
  data () {
    return {
      
    }
  },
  components: {
      HeaderCom
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .home-page{
    margin-top:50px;
  }

</style>
