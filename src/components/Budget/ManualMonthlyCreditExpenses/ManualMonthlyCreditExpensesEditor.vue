<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Add Manual Monthly Credit Expenses</h5>
            <form>
              <div class="mb-3">
                <label class="form-label">Credit Description</label>
                <input
                  v-model="manualMonthlyCreditExpense.description"
                  type="text"
                  class="form-control"
                />
              </div>
              <div class="mb-3">
                <label class="form-label">Cost</label>
                <input
                  v-model="manualMonthlyCreditExpense.cost"
                  type="number"
                  class="form-control"
                />
              </div>
              <div class="mb-3">
                <label class="form-label">Payment</label>
                <input
                  v-model="manualMonthlyCreditExpense.payment"
                  type="number"
                  class="form-control"
                />
              </div>
              <div class="mb-3">
                <button
                  type="submit"
                  class="btn btn-primary"
                  v-on:Click.prevent="CreateManualMonthlyCreditExpenses()"
                >
                  Submit
                </button>
                <button
                  type="submit"
                  class="btn btn-secondary"
                  v-on:Click="RedirectToBudget()"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
// Import budget store with pinia
import { useBudgetStore } from "/src/stores/budget.js";
// Required to use pinia store without setup()
import { mapStores } from "pinia";

export default {
  name: "ManualMonthlyCreditExpensesEditor",
  components: {},
  data() {
    return {
      masMonthlyExpensesId: 0,
      manualMonthlyCreditExpense: {
        manualMonthlyCreditExpensesId: "",
        description: "",
        masMonthlyExpensesId: "",
        cost: "",
        payment: "",
      },
    };
  },
  computed: {
    //Set budget Store without setup
    ...mapStores(useBudgetStore),
  },
  created() {
    this.masMonthlyExpensesId =
      this.budgetStore.masMonthlyExpense.masMonthlyExpensesId;
  },
  methods: {
    CreateManualMonthlyCreditExpenses() {
      this.loading = true;
      this.manualMonthlyCreditExpense.manualMonthlyCreditExpensesId = Number(
        this.manualMonthlyCreditExpense.manualMonthlyCreditExpensesId
      );
      this.manualMonthlyCreditExpense.cost = Number(
        this.manualMonthlyCreditExpense.cost
      );
      this.manualMonthlyCreditExpense.payment = Number(
        this.manualMonthlyCreditExpense.payment
      );
      this.manualMonthlyCreditExpense.masMonthlyExpensesId =
        this.masMonthlyExpensesId;

      const manualMonthlyCreditExpense = this.manualMonthlyCreditExpense;
      axios
        .post(
          "https://localhost:44359/api/ManualMonthlyCreditExpenses/",
          manualMonthlyCreditExpense
        )
        .then((response) => {
          console.log(response.data);
          alert("success Create!");
          this.RedirectToBudget();
        })
        .catch((error) => {
          console.error(error);
        });
    },
    RedirectToBudget() {
       this.budgetStore.ManualMonthlyCreditExpensesEditor = false;
    },
  },
  mounted() {},
};
</script>

<style></style>
