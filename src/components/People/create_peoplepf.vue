<template>
  <div id="container">
    <h1>Create Client PF</h1>

    <notification v-bind:notifications="notifications"></notification>

    <form v-on:submit.prevent="addPeople">

      <div class="form-group">
        <label name="peoplepf_cpf">CPF</label>
        <input type="text" class="form-control" v-model="peoplepf.cpf" required>
      </div>

      <div class="form-group">
        <label name="peoplepf_name">Name</label>
        <input type="text" class="form-control" v-model="peoplepf.full_name" required>
      </div>
      <div class="form-group">
        <label name="peoplepf_born">Born at</label>
        <input type="text" class="form-control" v-model="peoplepf.born_at" required>
      </div>


      <div class="form-group">
        <button class="btn btn-primary">Create</button>
      </div>
    </form>
  </div>
</template>

<script>
  import Notification from '@/components/notifications.vue'
  import axios from 'axios'

  export default {
    data() {
      return {
        peoplepf: {},
        notifications: []
      }
    },
    methods: {
      addPeople: function () {
        // Validation
        var cpf = parseFloat(this.peoplepf.cpf)
        if (isNaN(cpf)) {
          this.notifications.push({
            type: 'danger',
            message: 'CPF must be a number'
          });
          return false;
        } else {
          this.peoplepf.cpf = this.peoplepf.cpf;
        }
        axios.post('http://localhost:3000/api/v1/peoplepfs', this.peoplepf, {

          header: {
            'Content-Type': 'application/json'
          },

        }).then((response) => {
          this.notifications.push({
            type: 'success',
            message: 'Client PF created successfully'
          });
        }, (response) => {
          this.notifications.push({
            type: 'error',
            message: 'Client PF not created'
          });
        });
      }
    },
    components: {
      'notification': Notification
    }
  }
</script>
