<template>
  <div class="jumbotron">
  <h1 class="display-4">{{ msg }}</h1>
    <div v-if="errors.length === 0" class="alert alert-success" role="alert">
    Estado do servidor: {{ApiUp.message}}
    </div>
  <hr class="my-4">
    <div v-if="errors && errors.length" class="alert alert-danger" role="alert">
      <ul>
        <li v-for="error of errors">
          {{error.message}}
        </li>
      </ul>
    </div>
</div>

</template>
<script>
  import axios from 'axios'

  export default {
    name: 'home',
    data() {
      return {
        ApiUp: [],
        errors: [],
        msg: 'Welcome to HUB API ACCOUNT'
      }
    },
    created() {
      axios.get('http://localhost:3000/api/v1/pages')
        .then(response => {
          this.ApiUp = response.data
        })
        .catch(e => {
          this.errors.push(e)
        })
    }
  }
</script>
