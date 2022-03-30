<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Add Manual Monthly Expense</h5>
            <form>
              <div class="mb-3">
                <label class="form-label">Description</label>
                <input v-model="manualMonthlyExpense.description" type="text" class="form-control"  />
              </div>
              <div class="mb-3">
                <label class="form-label">Cost</label>
                <input  v-model="manualMonthlyExpense.budget"  type="number" class="form-control" />
              </div>
              <div class="mb-3">
                <label class="form-label">Payment</label>
                <input v-model="manualMonthlyExpense.payment" type="number" class="form-control"  />
              </div>
              <button type="submit" class="btn btn-primary" v-on:Click="CreatetManualMonthlyExpenses()">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import axios from "axios";
// import {store} from "./Budget/store.js";

export default {
  name: "ManualMonthlyExpenseEditor",
  components: {
    //  Budget
  },
  data() {
    return {
      masMonthlyExpensesId: Number(this.globalMasMonthlyExpensesId),
      manualMonthlyExpense: {
        manualMonthlyExpensesId: "",
        description: "",
        masMonthlyExpensesId: "",
        budget: "",
        payment: "",
        // store
      },
    };
  },
  props: ["globalMasMonthlyExpensesId"],
  methods: {
    CreatetManualMonthlyExpenses() {
      this.loading = true;
      this.manualMonthlyExpense.manualMonthlyExpensesId = Number(this.manualMonthlyExpense.manualMonthlyExpensesId);
      this.manualMonthlyExpense.budget = Number(this.manualMonthlyExpense.budget);
      this.manualMonthlyExpense.payment = Number(this.manualMonthlyExpense.payment);
      this.manualMonthlyExpense.masMonthlyExpensesId = this.masMonthlyExpensesId;
      const manualMonthlyExpense = this.manualMonthlyExpense;

      axios
        .post("https://localhost:44359/api/ManualMonthlyExpenses/",manualMonthlyExpense)
        .then(() => {
          this.loading = false;
          this.GetManualMonthlyExpensesByMasMonthlyExpensesId(this.masMonthlyExpensesId);
          alert("Success!");
          this.RedirectToBudget();
        })
        .catch((error) => {
          console.error(error);
          this.loading = false;
        });
    },
    RedirectToBudget() {
      this.$emit("SetManualMonthlyExpensesEditorProperty",false);
    },
  },
  mounted() {
    //  console.log("Second Store", store.count)
  },
};
</script>


<style  >
</style>