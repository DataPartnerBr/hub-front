<template>
  <div id="container">
    <div class="row">
      <div class="col col-lg-12">

        <div class="py-5 text-center">
          <h2>All Clients PJ</h2>
          <p class="lead">List of all clients PJ</p>
        </div>
        <router-link :to="{ name: 'create_peoplepj' }" class="btn btn-success btn-sm float-right mb-4">New Client PJ
        </router-link>
        <div>
          <table class="table table-striped">
            <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">CNP</th>
              <th scope="col">Name</th>
              <th scope="col">Fantasy Name</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="pj in peoplepjs">
              <td>{{pj.id}}</td>
              <td>{{pj.cnpj}}</td>
              <td>{{pj.bussiness_name}}</td>
              <td>{{pj.fantasy_name}}</td>
            </tr>
            </tbody>
          </table>
        </div>
        <ul v-if="errors && errors.length">
          <li v-for="error of errors">
            {{error.message}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'

  export default {
    data() {
      return {
        peoplepjs: [],
        errors: []
      }
    },
    created() {
      axios.get('http://localhost:3000/api/v1/peoplepjs')
        .then(response => {
          this.peoplepjs = response.data
        })
        .catch(e => {
          this.errors.push(e)
        })
    }
  }
</script>
