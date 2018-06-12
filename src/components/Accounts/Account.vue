<template>
  <div class="container">
    <div class="py-5 text-center">
      <h2>All Accounts</h2>
      <p class="lead">Below is an example form built entirely with Bootstrap's form controls. Each required form group
        has a validation state that can be triggered by attempting to submit the form without completing it.</p>
    </div>
    <notification v-bind:notifications="notifications"></notification>

    <router-link :to="{ name: 'AccountCreate' }" class="btn btn-success btn-sm float-right mb-4"><i class="fa fa-user"></i>Create
      Account
    </router-link>

    <table class="table table-striped">
      <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Owner</th>
        <th>Balance</th>
        <th>Status</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="ac in accounts">
        <td>{{ac.id}}</td>
        <td>{{ac.name}}</td>
        <td>{{ac.accounts_id}}</td>
        <td>{{ac.balance}}</td>
        <td>{{ac.status}}</td>
      </tr>
      </tbody>
    </table>
    <ul v-if="errors && errors.length">
      <li v-for="error of errors">{{error.message}}</li>
    </ul>
  </div>

</template>

<script>
  import axios from 'axios'
  import Notification from '@/components/notifications.vue'

  export default {
    data() {
      return {
        accounts: [],
        errors: []
      }
    },
    created() {
      axios.get('http://localhost:3000/api/v1/accounts')
        .then(response => {
          this.accounts = response.data
        })
        .catch(e => {
          this.errors.push(e)
        })
    },
    components: {
      'notification': Notification
    }
  }
</script>
