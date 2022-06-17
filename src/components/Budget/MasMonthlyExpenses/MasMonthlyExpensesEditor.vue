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
        <input
          type="number"
          v-model="budgetStore.masMonthlyExpense.year"
          class="form-control"
          id="html-input-year"
          placeholder="Add Year"
        />
      </div>
      <div class="mt-3">
        <label class="form-label">Month</label>
        <input
          type="number"
          v-model="budgetStore.masMonthlyExpense.month"
          class="form-control"
          id="html-input-month"
          placeholder="Add Month"
        />
      </div>
      <div class="mt-3">
        <label class="form-label">Biweekly</label>
        <input
          type="number"
          v-model="budgetStore.masMonthlyExpense.biweeklyNumber"
          class="form-control"
          id="html-input-biweekly"
          placeholder="Add Biweekly (1 or 2)"
        />
      </div>
      <div class="mt-3">
        <label class="form-label">Budget</label>
        <input
          type="number"
          v-model="budgetStore.masMonthlyExpense.income"
          class="form-control"
          id="html-input-budget"
          placeholder="Add Budget"
        />
      </div>
      <div class="mt-3">
        <button
          type="submit"
          class="btn btn-primary"
          v-on:Click.prevent="createMasterRule()"
        >
          Submit
        </button>
        <button
          type="submit"
          class="btn btn-secondary"
          v-on:Click="redirectToBudget()"
        >
          Reset
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

// Import budget store with pinia
import { useBudgetStore } from "/src/stores/budget.js";

export default {
  name: "MasMonthlyExpensesEditor",

  setup() {
    // initialize  pinia store on const
    const budgetStore = useBudgetStore();

    function createMasterRule() {
      console.log(
        "budgetStore.masMonthlyExpense",
        budgetStore.masMonthlyExpense
      );
      const masMonthlyExpense = budgetStore.masMonthlyExpense;
      console.log("masMonthlyExpense", masMonthlyExpense);
      axios
        .post(
          "https://localhost:44359/api/MasMonthlyExpenses/CreateMasMonthlyExpenses/",
          masMonthlyExpense
        )
        .then((response) => {
          console.log(response.data);
          alert("success Create!");
          redirectToBudget();
        })
        .catch((error) => {
          console.error(error);
        });
    }

    function redirectToBudget() {
      budgetStore.CreateBudgetMasterRulesEditor = false;
    }

    return {
      budgetStore,
      redirectToBudget,
      createMasterRule,
    };
  },
};
</script>

<style></style>
