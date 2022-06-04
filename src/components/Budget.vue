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
              <div class="row">
                <div class="col-md-12">
                  <div class="card">
                    <div class="card-body">
                      <div class="row g-2">
                        <div class="col-sm-11">
                          <h5 class="card-title text-center">
                            Biweekly Selection
                          </h5>
                        </div>
                        <div class="col-sm-1">
                          <button
                            class="btn btn-dark btn-sm mt-2"
                            v-on:click="
                              SetCreateBudgetMasterRulesProperty(true)
                            "
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
                          <label
                            class="form-check-label"
                            for="flexRadio-biweekly-1"
                          >
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
                          <label
                            class="form-check-label"
                            for="flexRadio-biweekly-2"
                          >
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
              <!-- Budget -> MonthlyExpenses Get/Edit: Done Pending Create -->
              <div class="row mt-2">
                <div v-if="budgetStore.masMonthlyExpense.masMonthlyExpensesId > 0">
                  <MonthlyExpenses/>
                </div>
              </div>
              <!-- CREDIT EXPENSES Get/Edit/Delete: Done Pending Create-->
              <div class="row mt-2">
                <div v-if="budgetStore.masMonthlyExpense.masMonthlyExpensesId > 0">
                  <ManualMonthlyCreditExpenses
                    @SetManualMonthlyCreditExpensesEditorProperty="SetManualMonthlyCreditExpensesEditorProperty($event)"
                    ref="ManualMonthlyCreditExpenses"/>
                </div>
              </div>
              <!-- ADDITIONAL Montlhy EXPENSES - Get/Edit/Delete: Done Pending Create -->
              <div class="row">
                <div v-if="budgetStore.masMonthlyExpense.masMonthlyExpensesId > 0">
                  <ManualMonthlyExpenses
                    @SetManualMonthlyExpensesEditorProperty="SetManualMonthlyExpensesEditorProperty($event)"
                    ref="ManualMonthlyExpenses"/>
                </div>
              </div>
            </div>

            <!-- Add New Manual Credit Expense -->
            <ManualMonthlyCreditExpensesEditor
              :globalMasMonthlyExpensesId="
                budgetStore.masMonthlyExpense.masMonthlyExpensesId
              "
              @SetManualMonthlyCreditExpensesEditorProperty="
                SetManualMonthlyCreditExpensesEditorProperty($event)
              "
              v-if="budgetStore.ManualMonthlyCreditExpensesEditor"
            />

            <!-- Add New Manual Monthly Expense -->
            <div v-if="budgetStore.ManualMonthlyExpensesEditor">
              <ManualMonthlyExpensesEditor
                :globalMasMonthlyExpensesId="
                  budgetStore.masMonthlyExpense.masMonthlyExpensesId
                "
                @SetManualMonthlyExpensesEditorProperty="
                  SetManualMonthlyExpensesEditorProperty($event)
                "
              />
            </div>

            <!-- Create Budget Master Rules -->
            <MasMonthlyExpensesEditor
              @SetCreateBudgetMasterRulesProperty="
                SetCreateBudgetMasterRulesProperty($event)
              "
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
import MonthlyExpenses from "./Budget/MonthlyExpenses/MonthlyExpenses";
import ManualMonthlyExpenses from "./Budget/ManualMonthlyExpenses/ManualMonthlyExpenses";
import ManualMonthlyExpensesEditor from "./Budget/ManualMonthlyExpenses/ManualMonthlyExpenseEditor.vue";
import ManualMonthlyCreditExpenses from "./Budget/ManualMonthlyCreditExpenses/ManualMonthlyCreditExpenses";
import ManualMonthlyCreditExpensesEditor from "./Budget/ManualMonthlyCreditExpenses/ManualMonthlyCreditExpensesEditor.vue";
import MasMonthlyExpensesEditor from "./Budget/MasMonthlyExpenses/MasMonthlyExpensesEditor.vue";

// Import budget store with pinia
import {useBudgetStore} from "../stores/budget.js";
// Required to use pinia store without setup()
import { mapStores } from 'pinia'

export default {
  name:"Budget",
  components: {
    ManualMonthlyExpenses,
    ManualMonthlyCreditExpenses,
    MonthlyExpenses,
    ManualMonthlyExpensesEditor,
    ManualMonthlyCreditExpensesEditor,
    MasMonthlyExpensesEditor
  },
  data() {
    return {
      masMonthlyExpense: {
        masMonthlyExpensesId: "",
        year: "",
        month: "",
        income: "",
        biweeklyNumber: "",
      },
      resetFlag: false,
      Years: [],
      ManualMonthlyExpensesEditor: false,
      ManualMonthlyCreditExpensesEditor: false,
      CreateBudgetMasterRulesEditor:false,
      Shared: this.$store, // Add Custom Store Example
    };
  },
  computed: {
    DisplayMainScreen() {
      let result = this.budgetStore.ManualMonthlyExpensesEditor == false &&
       this.budgetStore.ManualMonthlyCreditExpensesEditor == false &&
      this.budgetStore.CreateBudgetMasterRulesEditor == false;

      return result;
    },
    // Set budget Store without setup
     ...mapStores(useBudgetStore)
  },
  created() {
    this.FillYearsDropDownListModel();
  },
  mounted() {
    console.log("useBudgetStore",this.budgetStore.resetFlag)
    this.budgetStore.setresetFlag(true)
    console.log("set to true",this.budgetStore.resetFlag )
  },
  methods: {
    GetMasMonthlyExpensesByParameters() {
      this.loading = true;
      this.budgetStore.masMonthlyExpense.biweeklyNumber = Number(
        this.budgetStore.masMonthlyExpense.biweeklyNumber
      );
      this.budgetStore.masMonthlyExpense.masMonthlyExpensesId = Number(
        this.budgetStore.masMonthlyExpense.masMonthlyExpensesId
      );
      this.budgetStore.masMonthlyExpense.income = Number(this.budgetStore.masMonthlyExpense.income);
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
    },
    CreatetMasMonthlyExpenses() {
      this.loading = true;
      this.budgetStore.masMonthlyExpense.biweeklyNumber = Number(
        this.budgetStore.masMonthlyExpense.biweeklyNumber
      );
      this.budgetStore.masMonthlyExpense.masMonthlyExpensesId = Number(
        this.budgetStore.masMonthlyExpense.masMonthlyExpensesId
      );
      this.budgetStore.masMonthlyExpense.income = Number(this.budgetStore.masMonthlyExpense.income);
      const masMonthlyExpense = this.budgetStore.masMonthlyExpense;
      axios
        .post(
          "https://localhost:44359/api/MasMonthlyExpenses/CreatetMasMonthlyExpenses/",
          masMonthlyExpense
        )
        .then((response) => {
          this.loading = false;
          this.budgetStore.masMonthlyExpense = response.data;
          this.GetMonthlyExpenses(this.budgetStore.masMonthlyExpense.masMonthlyExpensesId);
        })
        .catch((error) => {
          console.error(error);
          this.loading = false;
        });
    },
    UpdatetMasMonthlyExpenses(masMonthlyExpensesId, masMonthlyExpense) {
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
          this.GetMonthlyExpenses(this.budgetStore.masMonthlyExpense.masMonthlyExpensesId);
        })
        .catch((error) => {
          console.error(error);
          this.loading = false;
        });
    },
    FillYearsDropDownListModel() {
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
    },
    SetManualMonthlyExpensesEditorProperty(value) {
      this.budgetStore.ManualMonthlyExpensesEditor = value;
      if (value == false) {
        this.$refs.ManualMonthlyExpenses.GetManualMonthlyExpenses(
          Number(this.budgetStore.masMonthlyExpense.masMonthlyExpensesId)
        );
      }
    },
    SetManualMonthlyCreditExpensesEditorProperty(value) {
      // Method Pending to remove
      this.budgetStore.ManualMonthlyCreditExpensesEditor = value;
      if (value == false) {
        this.$refs.ManualMonthlyCreditExpenses.GetManualMonthlyCreditExpenses(
          Number(this.budgetStore.masMonthlyExpense.masMonthlyExpensesId)
        );
      }
    },
    SetCreateBudgetMasterRulesProperty(value) {
       this.budgetStore.CreateBudgetMasterRulesEditor = value;
       //Access by ref Master Rules, to refresh or trigger my page
    },
    ResetControls() {
      // Refresh Budget Page
      this.$router.go();
    },
  },

};
</script>




<style >
</style>