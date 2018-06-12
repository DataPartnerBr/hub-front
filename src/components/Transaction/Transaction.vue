<template>
  <div id="container">
    <div class="row">
      <div class="col col-lg-12">

        <div class="py-5 text-center">
          <h2>Transaction</h2>
          <p class="lead">Below is an example form for transactions. Each required form
            group has a validation state that can be triggered by attempting to submit the form without completing
            it.</p>
        </div>
        <notification v-bind:notifications="notifications"></notification>
        <div class="col-md-8 order-md-1">
          <form v-on:submit.prevent="addTransaction" class="needs-validation" novalidate="">

            <hr class="mb-4">
            <h4 class="mb-3">Type of Transaction</h4>
            <div class="row">
              <div class="d-block my-3">
                <div class="custom-control custom-radio">
                  <input id="deposit" value="transfer" name="transaction" type="radio" class="custom-control-input"
                         checked="" required="" v-model="transactionCreate.category">
                  <label class="custom-control-label" for="deposit">Transfer</label>
                </div>
                <div class="custom-control custom-radio">
                  <input id="income" value="income" name="transaction" type="radio" class="custom-control-input"
                         required="" v-model="transactionCreate.category">
                  <label class="custom-control-label" for="income">Income</label>
                </div>
              </div>
            </div>

            <hr class="mb-4">

            <div class="row">
              <div class="col-md-5 mb-3">
                <div class="custom-control custom-checkbox">
                  <input type="checkbox" class="custom-control-input" id="reverse" v-model="transactionCreate.reverse">
                  <label class="custom-control-label" for="reverse">Is Reverse?</label>
                </div>

              </div>
            </div>

            <div class="row">
              <div class="col-md-5 mb-3">
                <label for="sender">Account Sender</label>
                <select v-model="selectedOption" @change="loadData" class="custom-select d-block w-100" id="sender"
                        required="">
                  <option value="" selected disabled>Choose...</option>
                  <option v-for="matrix in matrixs" :value="matrix.id">{{ matrix.name}}</option>
                </select>
                <div v-if="selectedOption && !items.length" class="mb-3"><i>Loading...</i></div>
                <div class="invalid-feedback">
                  Please select a valid Matrix.
                </div>

              </div>
              <div class="col-md-4 mb-3" v-if="items.length">
                <label for="recipient">Recepient Account</label>
                <select class="custom-select d-block w-100" id="recipient" required=""
                        v-model="transactionCreate.account_id">
                  <option value="" selected disabled>Choose...</option>
                  <option v-for="item in items" :value="item.id">{{ item.name }}</option>
                </select>
                <div class="invalid-feedback">
                  Please provide a valid Branch.
                </div>

              </div>
            </div>
            <hr class="mb-4">
            <h4 class="mb-3">Amount</h4>
            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="amount">Amount</label>
                <input type="text" class="form-control" id="amount" placeholder="" required=""
                       v-model="transactionCreate.amount">
                <small class="text-muted">Type amount to transaction</small>
                <div class="invalid-feedback">
                  Amount is required
                </div>
              </div>
            </div>
            <hr class="mb-4">
            <button class="btn btn-primary" type="submit">Send Transaction</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import Notification from '@/components/notifications.vue'

  export default {
    data: function () {
      return {
        transactionCreate: {},
        matrixs: [],
        items: [],
        selectedOption: ''
      }
    },
    mounted() {
      axios.get('http://localhost:3000/api/v1/matrix')
        .then(response => {
          this.matrixs = response.data
        })
        .catch(e => {
          this.errors.push(e)
        })
    },
    methods: {
      loadData: function () {
        this.items = [];
        let key = 'id';
        console.log(this.selectedOption);
        axios.get('http://localhost:3000/api/v1/branch/' + this.selectedOption)
          .then(response => {
            this.items = response.data
          })
          .catch(e => {
            this.errors.push(e)
          })
      },
      addTransaction: function () {
        this.transactionCreate.account_transfer_id = this.selectedOption
        axios.post('http://localhost:3000/api/v1/transfers/', this.transactionCreate, {
          headers: {
            'Content-Type': 'application/json'
          }
        }).then((response) => {
          this.$router.push('/account');
          this.notifications.push({
            type: 'success',
            message: 'Transaction successfully'
          });
        }, (response) => {

          this.notifications.push({
            type: 'danger',
            message: 'Acccount not created'
          });
        });
      },
      beforeDestroy: function () {
        this.transactionCreate.destroy()
      }
    },
    components: {
      'notification': Notification
    }
  }
  'use strict';
  window.addEventListener('load', function () {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function (form) {
      form.addEventListener('submit', function (event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, false);
</script>
