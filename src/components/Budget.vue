<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-md-12">
                <h1 class="display-4 text-center">Home Budget</h1>
              </div>
            </div>
            <hr />
            <div v-show="DisplayMainScreen">
              <!-- Master Selection TODO: Pending Create Child Component-->
             <MasMonthlyExpenses /> 
              <!-- Budget -> MonthlyExpenses Get/Edit: Done Pending Create -->
              <div class="row mt-2">
                <div
                  v-if="budgetStore.masMonthlyExpense.masMonthlyExpensesId > 0"
                >
                  <MonthlyExpenses />
                </div>
              </div>
              <!-- CREDIT EXPENSES Get/Edit/Delete: Done Pending Create-->
              <div class="row mt-2">
                <div
                  v-if="budgetStore.masMonthlyExpense.masMonthlyExpensesId > 0"
                >
                  <ManualMonthlyCreditExpenses
                    ref="ManualMonthlyCreditExpenses"
                  />
                </div>
              </div>
              <!-- ADDITIONAL Montlhy EXPENSES - Get/Edit/Delete: Done Pending Create -->
              <div class="row">
                <div
                  v-if="budgetStore.masMonthlyExpense.masMonthlyExpensesId > 0"
                >
                  <ManualMonthlyExpenses ref="ManualMonthlyExpenses" />
                </div>
              </div>
            </div>

            <!-- Add New Manual Credit Expense -->
            <ManualMonthlyCreditExpensesEditor
              v-if="budgetStore.ManualMonthlyCreditExpensesEditor"
            />

            <!-- Add New Manual Monthly Expense -->
            <div v-if="budgetStore.ManualMonthlyExpensesEditor">
              <ManualMonthlyExpensesEditor />
            </div>

            <!-- Create Budget Master Rules -->
            <MasMonthlyExpensesEditor
              v-if="budgetStore.CreateBudgetMasterRulesEditor"
              ref="MasMonthlyExpensesEditor"
            />

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import MasMonthlyExpenses from "./Budget/MasMonthlyExpenses/MasMonthlyExpenses.vue"; // Added
import MonthlyExpenses from "./Budget/MonthlyExpenses/MonthlyExpenses";
import ManualMonthlyExpenses from "./Budget/ManualMonthlyExpenses/ManualMonthlyExpenses";
import ManualMonthlyExpensesEditor from "./Budget/ManualMonthlyExpenses/ManualMonthlyExpenseEditor.vue";
import ManualMonthlyCreditExpenses from "./Budget/ManualMonthlyCreditExpenses/ManualMonthlyCreditExpenses";
import ManualMonthlyCreditExpensesEditor from "./Budget/ManualMonthlyCreditExpenses/ManualMonthlyCreditExpensesEditor.vue";
import MasMonthlyExpensesEditor from "./Budget/MasMonthlyExpenses/MasMonthlyExpensesEditor.vue";

// Import budget store with pinia
import { useBudgetStore } from "../stores/budget.js";
// Required to use pinia store without setup()
import { mapStores } from "pinia";

export default {
  name: "Budget",
  components: {
    MasMonthlyExpenses, 
    ManualMonthlyExpenses,
    ManualMonthlyCreditExpenses,
    MonthlyExpenses,
    ManualMonthlyExpensesEditor,
    ManualMonthlyCreditExpensesEditor,
    MasMonthlyExpensesEditor,
  },
  data() {
    return {
      Shared: this.$store, // Add Custom Store Example
    };
  },
  computed: {
    DisplayMainScreen() {
      let result =
        this.budgetStore.ManualMonthlyExpensesEditor == false &&
        this.budgetStore.ManualMonthlyCreditExpensesEditor == false &&
        this.budgetStore.CreateBudgetMasterRulesEditor == false;

      return result;
    },
    // Set budget Store without setup
    ...mapStores(useBudgetStore),
  },
  watch: {
    // whenever question changes, this function will run
    "budgetStore.ManualMonthlyCreditExpensesEditor"(newValue, oldValue) {
      if (!this.budgetStore.ManualMonthlyCreditExpensesEditor) {
        this.$refs.ManualMonthlyCreditExpenses.GetManualMonthlyCreditExpenses(
          Number(this.budgetStore.masMonthlyExpense.masMonthlyExpensesId)
        );
      }
    },
    "budgetStore.ManualMonthlyExpensesEditor"(newValue, oldValue) {
      if (!this.budgetStore.ManualMonthlyExpensesEditor) {
        this.$refs.ManualMonthlyExpenses.GetManualMonthlyExpenses(
          Number(this.budgetStore.masMonthlyExpense.masMonthlyExpensesId)
        );
      }
    },
  },
};
</script>

<style></style>
