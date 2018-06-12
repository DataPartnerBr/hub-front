<template>
  <div id="container">
    <div class="row">
      <div class="col col-lg-12">

        <div class="py-5 text-center">
          <h2>All Clients PF</h2>
          <p class="lead">List of all clients PF</p>
        </div>

        <router-link :to="{ name: 'create_peoplepf' }" class="btn btn-success btn-sm float-right mb-4">New Client PF
        </router-link>
        <div>
          <table class="table table-striped">
            <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">CPF</th>
              <th scope="col">Name</th>
              <th scope="col">Born at</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="pf in peoplepfs">
              <td>{{pf.id}}</td>
              <td>{{pf.cpf}}</td>
              <td>{{pf.full_name}}</td>
              <td>{{pf.born_at}}</td>
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
        peoplepfs: [],
        errors: []
      }
    },
    created() {
      axios.get('http://localhost:3000/api/v1/peoplepfs')
        .then(response => {
          this.peoplepfs = response.data
        })
        .catch(e => {
          this.errors.push(e)
        })
    }
  }
</script>
