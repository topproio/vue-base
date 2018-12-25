<template class="home-page">
  <div>
    <!-- header -->
    <HeaderCom />
    <div class="content">
      Welcome to Your Vue.js App
    </div>
  </div>
</template>

<script>
import HeaderCom from 'components/header/index.vue';
export default {
  name: 'Home',
  components: {
    HeaderCom
  },
  data() {
    return {

    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .home-page{
    margin-top:50px;
  }

</style>
