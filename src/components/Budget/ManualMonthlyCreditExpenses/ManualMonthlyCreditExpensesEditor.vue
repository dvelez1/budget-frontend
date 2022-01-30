<template>
    <div>
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body">
            <form>
              <div class="mb-3">
                <label for="txtDescription" class="form-label"
                  >Credit Description</label
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
import axios from "axios";

export default {
  name: "ManualMonthlyExpenses",
  components: {},
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
      listmanualMonthlyCreditExpenses: [],
    };
  },
  props: ["globalMasMonthlyExpensesId"],
  methods: {
      CreateManualMonthlyCreditExpenses() {
      this.loading = true;
      this.manualMonthlyCreditExpense.manualMonthlyCreditExpensesId = Number(
        this.manualMonthlyExpense.manualMonthlyCreditExpensesId
      );
      this.manualMonthlyCreditExpense.cost = Number(
        this.manualMonthlyCreditExpense.cost
      );
      this.manualMonthlyCreditExpense.payment = Number(
        this.manualMonthlyCreditExpense.payment
      );

      const manualMonthlyCreditExpense = this.manualMonthlyCreditExpense;
      axios
        .post(
          "https://localhost:44359/api/ManualMonthlyCreditExpenses/",
          manualMonthlyCreditExpense
        )
        .then(() => {
          this.loading = false;
          this.GetManualMonthlyCreditExpenses(
            this.manualMonthlyCreditExpense.masMonthlyExpensesId
          );
          alert("success!");
        })
        .catch((error) => {
          console.error(error);
          this.loading = false;
        });
    },
    RedirectToBudget() {
      this.$router.push("/budget");
    },
  },
  mounted() {
    
  },
};
</script>

<style>
</style>