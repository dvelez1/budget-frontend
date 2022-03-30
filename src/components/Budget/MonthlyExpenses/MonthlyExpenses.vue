<template>
  <div class="card">
    <div class="card-body">
      <div class="row g-2">
        <div class="col-sm-11">
          <h5 class="card-title text-center">Budget</h5>
        </div>
      </div>
      <hr />

      <ul
        class="list-group"
        style="
          max-height: 300px;
          margin-bottom: 10px;
          overflow: scroll;
          -webkit-overflow-scrolling: touch;
        "
      >
        <li
          v-for="(monthlyExpense, index) of listMonthlyExpense"
          :key="index"
          class="list-group-item d-flex justify-content-between"
        >
          <div>
            {{ monthlyExpense.montlyExpensesId }} -
            {{ monthlyExpense.masExpensesDescription }}
          </div>
          <div class="d-flex justify-content-between">
            <div>
              <input
                type="number"
                class="form-control form-control-sm"
                placeholder="Budget"
                v-model="monthlyExpense.budget"
              />
            </div>
            &nbsp;
            <div>
              <input
                type="number"
                class="form-control form-control-sm"
                placeholder="Payment"
                v-model="monthlyExpense.payment"
              />
            </div>
            &nbsp;
            <div>
              <input
                class="btn btn-dark btn-sm"
                type="button"
                value="Save"
                v-on:click="
                  UpdateMonthlyExpenses(
                    monthlyExpense,
                    monthlyExpense.montlyExpensesId
                  )
                "
              />
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";
//  import store from './Budget/store.js';

export default {
  name: "MonthlyExpenses",
  components: {},
  data() {
    return {
      // shareState: store,
      masMonthlyExpensesId: Number(this.globalMasMonthlyExpensesId),
      monthlyExpense: {
        montlyExpensesId: "",
        masExpensesId: "",
        masMonthlyExpensesId: "",
        masExpensesDescription: "",
        payment: "",
        budget: "",
      },
      listMonthlyExpense: [],
    };
  },
  props: ["globalMasMonthlyExpensesId"],
  methods: {
    GetMonthlyExpenses(masMonthlyExpensesId) {
      console.log("Get Operation ID:", masMonthlyExpensesId)
      this.loading = true;
      axios
        .get("https://localhost:44359/api/MonthlyExpenses/", {
          params: {
            masMonthlyExpensesId: masMonthlyExpensesId,
          },
        })
        .then((response) => {
          this.loading = false;
          this.listMonthlyExpense = response.data;
          console.log("MonthlyExpenses Success")
        })
        .catch((error) => {
          console.error(error);
          this.loading = false;
        });
    },
    UpdateMonthlyExpenses(monthlyExpense, montlyExpensesId) {
      this.loading = true;
      axios
        .put(
          "https://localhost:44359/api/MonthlyExpenses/" + montlyExpensesId,
          monthlyExpense
        )
        .then((response) => {
          this.loading = false;
          this.monthlyExpense = response.data;
          alert("success");
        })
        .catch((error) => {
          console.error(error);
          this.loading = false;
        });
    },
  },
  mounted() {
    this.GetMonthlyExpenses(this.masMonthlyExpensesId);
  },
};
</script>

<style>
</style>