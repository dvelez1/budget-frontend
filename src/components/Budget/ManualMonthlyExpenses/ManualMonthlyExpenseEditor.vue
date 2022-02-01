<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body">
            <form>
              <div class="mb-3">
                <label for="txtDescription" class="form-label"
                  >Description</label
                >
                <input
                  type="email"
                  class="form-control"
                  id="txtDescription"
                  aria-describedby="emailHelp"
                />
              </div>
              <div class="mb-3">
                <label for="txtCost" class="form-label">Cost</label>
                <input type="number" class="form-control" id="txtCost" />
              </div>
              <div class="mb-3">
                <label for="txtPayment" class="form-label">Payment</label>
                <input type="number" class="form-control" id="txtPayment" />
              </div>
              <button type="submit" class="btn btn-primary" v-on:Click="RedirectToBudget()">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Budget from './components/Budget.vue'
import axios from "axios";

export default {
  name: "ManualMonthlyExpenseEditor",
  components: {
    //  Budget
  },
  data() {
    return {
      masMonthlyExpensesId: Number(this.globalMasMonthlyExpensesId),
      manualMonthlyCreditExpense: {
        manualMonthlyCreditExpensesId: "",
        description: "",
        masMonthlyExpensesId: "",
        cost: "",
        payment: "",
      },
    };
  },
  //props: ["masMonthlyExpensesId"],
  methods: {
    CreatetManualMonthlyExpenses() {
      this.loading = true;
      this.manualMonthlyExpense.manualMonthlyExpensesId = Number(
        this.manualMonthlyExpense.manualMonthlyExpensesId
      );
      this.manualMonthlyExpense.budget = Number(
        this.manualMonthlyExpense.budget
      );
      this.manualMonthlyExpense.payment = Number(
        this.manualMonthlyExpense.payment
      );

      const manualMonthlyExpense = this.manualMonthlyExpense;
      axios
        .post(
          "https://localhost:44359/api/ManualMonthlyExpenses/",
          manualMonthlyExpense
        )
        .then(() => {
          this.loading = false;
          this.GetManualMonthlyExpensesByMasMonthlyExpensesId(
            this.masMonthlyExpense.masMonthlyExpensesId
          );
          alert("Success!");
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
};
</script>


<style  >
</style>