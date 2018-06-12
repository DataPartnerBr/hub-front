<template>
  <div id="app">
    <NavbarBrand></NavbarBrand>
    <router-view></router-view>
  </div>
</template>

<script>
  import NavbarBrand  from '@/components/NavbarBrand'
  import 'bootstrap/dist/css/bootstrap.css'
  import 'bootstrap-vue/dist/bootstrap-vue.css'
  export default {
    name: 'app',
    components: {
      NavbarBrand
    }
  }
</script>
<style>
  #app {
    color: #2c3e50;
  }
</style>
