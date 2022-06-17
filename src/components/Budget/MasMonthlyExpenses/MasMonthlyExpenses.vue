<template>
  <!-- Master Selection TODO: Pending Create Child Component-->
  <div class="row">
    <div class="col-md-12">
      <div class="card">
        <div class="card-body">
          <div class="row g-2">
            <div class="col-sm-11">
              <h5 class="card-title text-center">Biweekly Selection</h5>
            </div>
            <div class="col-sm-1">
              <button
                class="btn btn-dark btn-sm mt-2"
                v-on:click="SetCreateBudgetMasterRulesProperty(true)"
                type="button"
              >
                Add Master Rule
              </button>
            </div>
          </div>
          <hr />

          <div class="form-group">
            <label for="year"><h6>Year</h6></label>
            <select
              class="form-control"
              v-model="budgetStore.masMonthlyExpense.year"
            >
              <option
                :value="year.text"
                v-for="year in budgetStore.Years"
                :key="year.id"
              >
                {{ year.text }}
              </option>
            </select>
          </div>

          <div class="form-group mt-2">
            <label for="month"><h6>Month</h6></label>
            <input
              v-model="budgetStore.masMonthlyExpense.month"
              type="number"
              class="form-control"
              placeholder="Enter Month"
            />
          </div>

          <h6 class="mt-2">Biweekly</h6>
          <div class="mt-2">
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                name="flexRadio-biweekly"
                v-model="budgetStore.masMonthlyExpense.biweeklyNumber"
                value="1"
              />
              <label class="form-check-label" for="flexRadio-biweekly-1">
                1
              </label>
            </div>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                name="flexRadio-biweekly"
                v-model="budgetStore.masMonthlyExpense.biweeklyNumber"
                value="2"
              />
              <label class="form-check-label" for="flexRadio-biweekly-2">
                2
              </label>
            </div>
          </div>

          <div class="form-group mt-2">
            <label for="budget"><h6>Budget</h6></label>
            <input
              v-model="budgetStore.masMonthlyExpense.income"
              type="number"
              class="form-control"
              placeholder="Enter Budget"
            />
          </div>

          <div class="float-end">
            <button
              class="btn btn-dark btn-sm mt-2"
              v-on:click="GetMasMonthlyExpensesByParameters()"
              type="button"
            >
              Search
            </button>
            &nbsp;
            <button
              class="btn btn-secondary btn-sm mt-2"
              v-on:click="ResetControls()"
              type="button"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref, onMounted } from "vue";

// Import budget store with pinia
import { useBudgetStore } from "/src/stores/budget.js";

export default {
  name: "MasMonthlyExpenses",
  setup() {
    // initialize  pinia store on const
    const budgetStore = useBudgetStore();
    // Declare variable
    const listMonthlyExpense = ref([]);
    

    function GetMasMonthlyExpensesByParameters() {
      this.loading = true;
      this.budgetStore.masMonthlyExpense.biweeklyNumber = Number(
        this.budgetStore.masMonthlyExpense.biweeklyNumber
      );
      this.budgetStore.masMonthlyExpense.masMonthlyExpensesId = Number(
        this.budgetStore.masMonthlyExpense.masMonthlyExpensesId
      );
      this.budgetStore.masMonthlyExpense.income = Number(
        this.budgetStore.masMonthlyExpense.income
      );
      const masMonthlyExpense = this.budgetStore.masMonthlyExpense;
      axios
        .post(
          "https://localhost:44359/api/MasMonthlyExpenses/GetMasMonthlyExpensesByParameters/",
          masMonthlyExpense
        )
        .then((response) => {
          this.loading = false;
          this.budgetStore.masMonthlyExpense = response.data;
        })
        .catch((error) => {
          console.error(error);
          this.loading = false;
        });
    };

    function CreatetMasMonthlyExpenses() {
      this.loading = true;
      this.budgetStore.masMonthlyExpense.biweeklyNumber = Number(
        this.budgetStore.masMonthlyExpense.biweeklyNumber
      );
      this.budgetStore.masMonthlyExpense.masMonthlyExpensesId = Number(
        this.budgetStore.masMonthlyExpense.masMonthlyExpensesId
      );
      this.budgetStore.masMonthlyExpense.income = Number(
        this.budgetStore.masMonthlyExpense.income
      );
      const masMonthlyExpense = this.budgetStore.masMonthlyExpense;
      axios
        .post(
          "https://localhost:44359/api/MasMonthlyExpenses/CreatetMasMonthlyExpenses/",
          masMonthlyExpense
        )
        .then((response) => {
          this.loading = false;
          this.budgetStore.masMonthlyExpense = response.data;
          this.GetMonthlyExpenses(
            this.budgetStore.masMonthlyExpense.masMonthlyExpensesId
          );
        })
        .catch((error) => {
          console.error(error);
          this.loading = false;
        });
    };

    function UpdatetMasMonthlyExpenses(masMonthlyExpensesId, masMonthlyExpense) {
      this.loading = true;
      axios
        .put(
          "https://localhost:44359/api/MasMonthlyExpenses/" +
            masMonthlyExpensesId,
          masMonthlyExpense
        )
        .then((response) => {
          this.loading = false;
          this.budgetStore.masMonthlyExpense = response.data;
          this.GetMonthlyExpenses(
            this.budgetStore.masMonthlyExpense.masMonthlyExpensesId
          );
        })
        .catch((error) => {
          console.error(error);
          this.loading = false;
        });
    };

    function FillYearsDropDownListModel() {
      this.loading = true;
      axios
        .get(
          "https://localhost:44359/api/MasMonthlyExpenses/GetYearWithBudget/"
        )
        .then((response) => {
          this.loading = false;
          response.data.forEach((item) => {
            this.budgetStore.Years.push({
              id: item.year,
              text: item.year,
            });
          });
        })
        .catch((error) => {
          console.error(error);
          this.loading = false;
        });
    };

    function  SetCreateBudgetMasterRulesProperty(value) {
      this.budgetStore.CreateBudgetMasterRulesEditor = value;
      //Access by ref Master Rules, to refresh or trigger my page
    };

    function ResetControls() {
      // Refresh Budget Page
      this.$router.go();
    };



    onMounted(() => {
      GetMonthlyExpenses(budgetStore.masMonthlyExpense.masMonthlyExpensesId);
    });

    return {
      listMonthlyExpense,
      UpdateMonthlyExpenses,
    };
  },
};
</script>

<style></style>
