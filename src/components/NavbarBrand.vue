<template>
  <navbar-brand class="navbar navbar-darken bg-hubapi">
      <img src="../assets/hub.jpg" alt="HUB">
    <menu>
      <router-link to="/" class="btn btn-info btn-sm">Home</router-link>
      <router-link to="/peoplepf" class="btn btn-info btn-sm">Clients PF</router-link>
      <router-link to="/peoplepj" class="btn btn-info btn-sm">Clients PJ</router-link>
      <router-link to="/account" class="btn btn-info btn-sm">Accounts</router-link>
      <router-link :to="{ name: 'Transaction' }" class="btn btn-outline-success btn-sm"> New Transaction</router-link>
    </menu>
  </navbar-brand>
</template>

<script>
  export default {
    name: 'Navbar-brand'
  }
</script>

<style>
  .bg-hubapi {
    background: #605B56 !important;
  }
</style>
