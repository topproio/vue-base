<template>
    <el-header class="header" height="101px">
        <div id="header">
            <div class="header__logo">
                <img src="../assets/logo.png" alt=""/>
            </div>
            <div class="header__menu">
                <span>
                    <span>注册</span>
                    <em>|</em>
                    <span>登录</span>
                </span>
            </div>
        </div>
    </el-header>
</template>
<script >

export default {
    name: "HomeHeader",
    data() {
        return {
            
        };
    },
    computed: {
       
    },
    created() {
        
    },
    methods: {
        
    }
};

</script>
<style lang="scss">
.el-header{
  height: 101px;
  overflow: hidden;
  padding: 0;
  font-size: 16px;
}
#header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid $border_default;
    font-size: 16px;
    .header__logo{
        img{
            max-height:80px;
        }
    }
}


</style>
