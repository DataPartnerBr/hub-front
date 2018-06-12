<!--suppress ALL -->
<template>
  <div id="container">
    <div class="row">
      <div class="col col-lg-8">
        <h1>Create Account</h1>

        <notification v-bind:notifications="notifications"></notification>
        <ul v-if="errors && errors.length" class="alert alert-danger">
          <li v-for="error of errors">{{error.message}}</li>
        </ul>
        <form v-on:submit.prevent="addAccount" class="was-validated">

          <div class="form-group">
            <label>Name</label>
            <input type="text" class="form-control" v-model="accountCreate.name" required>
          </div>
          <hr>
          <div class="form-group custom-control custom-checkbox">
            <input type="checkbox" class="custom-control-input" id="accountCreate.is_branch"
                   v-model="accountCreate.is_branch">
            <label class="custom-control-label" for="accountCreate.is_branch">{{ accountCreate.is_branch }} Please,
              check if this
              account is a Branch?</label>
          </div>
          <hr>
          <div class="form-group" v-if="accountCreate.is_branch === true">
            <label>Choice the Matrix</label><br>
            <select v-model="accountCreate.accounts_id" class="custom-select" required>
              <option disabled value="0">Escolha um item</option>
              <option v-for="acc in accounts" v-bind:value="acc.id">{{ acc.name }}</option>
            </select>
          </div>
          <label>Please, must be choice the type of Client</label><br>
          <div class="custom-control custom-radio">
            <input type="radio" class="custom-control-input" id="customControlValidation2" name="radio-stacked"
                   value="PF" required v-model="picked">
            <label class="custom-control-label" for="customControlValidation2">PF</label>
          </div>
          <div class="custom-control custom-radio mb-3">
            <input type="radio" class="custom-control-input" id="customControlValidation3" name="radio-stacked"
                   value="PJ" required v-model="picked">
            <label class="custom-control-label" for="customControlValidation3">PJ</label>
          </div>
          <div class="form-group" v-if="picked === 'PF' ">
            <select v-model="accountCreate.people_pfs_id" class="custom-select" required>
              <option disabled value="">Pick one</option>
              <option v-for="pf in peoplepfs" v-bind:value="pf.id">{{ pf.full_name }}</option>
            </select>
          </div>
          <div class="form-group" v-if="picked === 'PJ' ">
            <select v-model="accountCreate.people_pjs_id" class="custom-select" required>
              <option disabled value="">Pick one</option>
              <option v-for="pj in peoplepjs" v-bind:value="pj.id">{{ pj.bussiness_name }}</option>
            </select>
          </div>
          <hr>
          <div class="form-group">
            <label>Balance</label>
            <input type="text" class="form-control" v-model="accountCreate.balance" required placeholder="0.00">
          </div>
          <hr>
          <div class="form-group">
            <button class="btn btn-primary">Create</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import Notification from '@/components/notifications.vue'
  import axios from 'axios'

  export default {
    data: function () {
      return {
        accounts: [],
        accountCreate: {},
        peoplepfs: [],
        peoplepjs: [],
        notifications: [],
        type: 'A',
        is_branch: false,
        selected: '',
        selected2: '',
        selected3: '',
        picked: false,
        errors: []
      }
    },
    mounted() {
      axios.get('http://localhost:3000/api/v1/accounts')
        .then(response => {
          this.accounts = response.data
        })
        .catch(e => {
          this.errors.push(e)
        })
    },
    created() {
      axios.get('http://localhost:3000/api/v1/peoplepfs')
        .then(response => {
          this.peoplepfs = response.data

          return axios.get('http://localhost:3000/api/v1/peoplepjs');
        }).then(response => {
        this.peoplepjs = response.data
      })
        .catch(e => {
          this.errors.push(e)
        })
    },
    //   // Requests will be executed in parallel...
    //   axios.all([
    //   axios.get('https://api.github.com/users/codeheaven-io');
    // axios.get('https://api.github.com/users/codeheaven-io/repos')
    // ])
    // .then(axios.spread(function (userResponse, reposResponse) {
    //   //... but this callback will be executed only when both requests are complete.
    //   console.log('User', userResponse.data);
    //   console.log('Repositories', reposResponse.data);
    // }));
    methods: {
      addAccount: function () {
        axios.post('http://localhost:3000/api/v1/accounts/', this.accountCreate, {
          headers: {
            'Content-Type': 'application/json'
          }
        }).then((response) => {
          this.$router.replace(this.$route.query.redirect || '/account')
          this.notifications.push({
            type: 'success',
            message: 'Account created successfully'
          });
        }, (response) => {

          this.notifications.push({
            type: 'danger',
            message: 'Acccount not created'
          });
        });
      }
    },
    components: {
      'notification': Notification
    }
  }
</script>
