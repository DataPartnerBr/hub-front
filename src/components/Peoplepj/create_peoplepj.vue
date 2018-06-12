<template>
  <div id="container">
    <h1>Create Client PJ</h1>

    <notification v-bind:notifications="notifications"></notification>

    <form v-on:submit.prevent="addPeople">

      <div class="form-group">
        <label name="peoplepj_cnpj">CNPJ</label>
        <input type="text" class="form-control" v-model="peoplepjs.cnpj" required>
      </div>

      <div class="form-group">
        <label name="peoplepj_bussiness_name">Bussiness Name</label>
        <input type="text" class="form-control" v-model="peoplepjs.bussiness_name" required>
      </div>
      <div class="form-group">
        <label name="peoplepj_fantasy_name">Fantasy Name</label>
        <input type="text" class="form-control" v-model="peoplepjs.fantasy_name" required>
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
        peoplepjs: {},
        notifications: []
      }
    },
    methods: {
      addPeople: function () {
        // Validation
        var cnpj = parseFloat(this.peoplepjs.cnpj);
        if (isNaN(cnpj)) {
          this.notifications.push({
            type: 'danger',
            message: 'CNPJ must be a number'
          });
          return false;
        } else {
          this.peoplepjs.cnpj = this.peoplepjs.cnpj;
        }
        axios.post('http://localhost:3000/api/v1/peoplepjs/', this.peoplepjs, {
          headers: {
            'Content-Type': 'application/json'
          }
        }).then((response) => {
          this.notifications.push({
            type: 'success',
            message: 'Client PJ created successfully'
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
