<template>
    <div>
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Add Manual Monthly Credit Expenses</h5>
            <form>
              <div class="mb-3">
                <label  class="form-label">Credit Description</label>
                <input v-model="manualMonthlyCreditExpense.description" type="text" class="form-control"/>
              </div>
              <div class="mb-3">
                <label  class="form-label">Cost</label>
                <input v-model="manualMonthlyCreditExpense.cost" type="number" class="form-control"/>
              </div>
              <div class="mb-3">
                <label   class="form-label">Payment</label>
                <input v-model="manualMonthlyCreditExpense.payment" type="number" class="form-control"  />
              </div>
              <button type="submit" class="btn btn-primary" v-on:Click="CreateManualMonthlyCreditExpenses()">Submit</button>
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
  name: "ManualMonthlyCreditExpensesEditor",
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
      testModel:{
        booleanResult: false,
        year:2021,
        month:1,
        biweeklyNumber:1
      }
    };
  },
  props: ["globalMasMonthlyExpensesId"],
  methods: {
      CreateManualMonthlyCreditExpenses() {
      this.loading = true;
      this.manualMonthlyCreditExpense.manualMonthlyCreditExpensesId = Number(this.manualMonthlyCreditExpense.manualMonthlyCreditExpensesId);
      this.manualMonthlyCreditExpense.cost = Number(this.manualMonthlyCreditExpense.cost);
      this.manualMonthlyCreditExpense.payment = Number(this.manualMonthlyCreditExpense.payment);
      this.manualMonthlyCreditExpense.masMonthlyExpensesId = this.masMonthlyExpensesId;

      const manualMonthlyCreditExpense = this.manualMonthlyCreditExpense;

      axios
        .post("https://localhost:44359/api/ManualMonthlyCreditExpenses/", manualMonthlyCreditExpense)
        .then(() => {
          this.loading = false;
          // this.GetManualMonthlyCreditExpenses(this.manualMonthlyCreditExpense.masMonthlyExpensesId);
          alert("success!");
          //this.RedirectToBudget();
        })
        .catch((error) => {
          console.error(error);
          this.loading = false;
        });
    },
    RedirectToBudget() {
      this.$emit("SetManualMonthlyCreditExpensesEditorProperty",false); 
      // alert("voy a emit")
      // this.$emit("TestMethod",this.testModel); 
      //  alert("termine a emit")
    },
  },
  mounted() {
    console.log("ID",this.globalMasMonthlyExpensesId)
  },
};
</script>

<style>
</style>