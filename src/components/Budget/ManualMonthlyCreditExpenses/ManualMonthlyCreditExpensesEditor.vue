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
              <button type="submit" class="btn btn-primary" v-on:Click="RedirectToBudget()">reset</button>
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
      Shared: this.$store, // Add store
    };
  },
  props:{ 
    globalMasMonthlyExpensesId:Number,

  },
  methods: {
      CreateManualMonthlyCreditExpenses() {
      this.loading = true;
      this.manualMonthlyCreditExpense.manualMonthlyCreditExpensesId = Number(this.manualMonthlyCreditExpense.manualMonthlyCreditExpensesId);
      this.manualMonthlyCreditExpense.cost = Number(this.manualMonthlyCreditExpense.cost);
      this.manualMonthlyCreditExpense.payment = Number(this.manualMonthlyCreditExpense.payment);
      this.manualMonthlyCreditExpense.masMonthlyExpensesId = this.masMonthlyExpensesId;

      const manualMonthlyCreditExpense = this.manualMonthlyCreditExpense;
       alert("antes axios!");
      console.log("antes axios", this.Shared.state.masMonthlyExpense)
          alert("registrar axios!");
      axios
        .post("https://localhost:44359/api/ManualMonthlyCreditExpenses/", manualMonthlyCreditExpense)
        .then(() => {
          this.loading = false;
          // this.GetManualMonthlyCreditExpenses(this.manualMonthlyCreditExpense.masMonthlyExpensesId);
          alert("success Create!");
          //this.RedirectToBudget();
          console.log("despues axios", this.Shared.state.masMonthlyExpense)
           alert("despues axios!");
        })
        .catch((error) => {
          console.error(error);
          this.loading = false;
        });
    },
    RedirectToBudget() {
      this.$emit("SetManualMonthlyCreditExpensesEditorProperty",false); 
    },
  },
  mounted() {
    
  },
    watch: {
    "this.Shared.state.masMonthlyExpense": {
      handler(newValue, oldValue) {
        if (newValue != oldValue) {
          this.Shared.setMasMonnthlyExpense(this.Shared.state.masMonthlyExpense);
          alert("watch2")
        }
      },
      deep: true,
    },
  },
};
</script>

<style>
</style>