<template>
<div class="card">
   <div class="card-body">
      <div class="row g-2">
         <div class="col-sm-11">
            <h5 class="card-title text-center">Create Budget Master Rule</h5>
         </div>
      </div>
      <hr />
      <div class="mb-3">
         <label class="form-label">Year</label>
         <input type="number" v-model="masMonthlyExpense.year" class="form-control" id="html-input-year" placeholder="Add Year">
      </div>
      <div class="mt-3">
         <label class="form-label">Month</label>
         <input type="number" v-model="masMonthlyExpense.month" class="form-control" id="html-input-month" placeholder="Add Month">
      </div>
      <div class="mt-3">
         <label class="form-label">Biweekly</label>
         <input type="number" v-model="masMonthlyExpense.biweeklyNumber" class="form-control" id="html-input-biweekly" placeholder="Add Biweekly (1 or 2)">
      </div>
      <div class="mt-3">
         <label class="form-label">Budget</label>
         <input type="number" v-model="masMonthlyExpense.income" class="form-control" id="html-input-budget" placeholder="Add Budget">
      </div>
      <div class="mt-3">
          <button type="submit" class="btn btn-primary" v-on:Click.prevent="createMasterRule()">Submit</button>
          <button type="submit" class="btn btn-secondary" v-on:Click="redirectToBudget()">Reset</button>
      </div>

   </div>
</div>
  
</template>

<script>
import axios from "axios";

export default {
  name: "MasMonthlyExpensesEditor",
  components: {},
  data() {
    return {
      masMonthlyExpense: {
        masMonthlyExpensesId: 0,
        year: "",
        month: "",
        income: "",
        biweeklyNumber: "",
      },
    };
  },
  props: ["globalMasMonthlyExpensesId"],
  methods: {
    createMasterRule(){
     this.loading = true;
      const masMonthlyExpense = this.masMonthlyExpense;
      axios.post(
          "https://localhost:44359/api/MasMonthlyExpenses/CreateMasMonthlyExpenses/",
          masMonthlyExpense
        )
        .then((response) => {
          this.loading = false;
          console.log(response.data);
          alert("success Create!");
           this.redirectToBudget()
        })
        .catch((error) => {
          console.error(error);
          this.loading = false;
        });
    },
    redirectToBudget() {
      this.$emit("SetCreateBudgetMasterRulesProperty",false); 
    },
  
  },
  mounted() {
    
  },
};
</script>

<style>
</style>