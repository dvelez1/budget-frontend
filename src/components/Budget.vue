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
                          <input
                            class="btn btn-dark btn-sm float-end"
                            type="button"
                            value="Add"
                          />
                        </div>
                      </div>
                      <hr />

                      <div class="form-group">
                        <label for="year"><h6>Year</h6></label>
                        <select
                          class="form-control"
                          v-model="masMonthlyExpense.year"
                        >
                          <option
                            :value="year.text"
                            v-for="year in Years"
                            :key="year.id"
                          >
                            {{ year.text }}
                          </option>
                        </select>
                      </div>

                      <div class="form-group mt-2">
                        <label for="month"><h6>Month</h6></label>
                        <input
                          v-model="masMonthlyExpense.month"
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
                            v-model="masMonthlyExpense.biweeklyNumber"
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
                            v-model="masMonthlyExpense.biweeklyNumber"
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
                          v-model="masMonthlyExpense.income"
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
                          v-on:click="resetControls()"
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
                <div v-if="masMonthlyExpense.masMonthlyExpensesId > 0">
                  <MonthlyExpenses
                    :globalMasMonthlyExpensesId="
                      masMonthlyExpense.masMonthlyExpensesId
                    "
                  />
                </div>
              </div>
              <!-- CREDIT EXPENSES Get/Edit/Delete: Done Pending Create-->
              <div class="row mt-2">
                <div v-if="masMonthlyExpense.masMonthlyExpensesId > 0">
                  <ManualMonthlyCreditExpenses
                    :globalMasMonthlyExpensesId="
                      masMonthlyExpense.masMonthlyExpensesId
                    "
                    @SetManualMonthlyCreditExpensesEditorProperty="
                      SetManualMonthlyCreditExpensesEditorProperty($event)
                    "
                  />
                </div>
              </div>
              <!-- ADDITIONAL Montlhy EXPENSES - Get/Edit/Delete: Done Pending Create -->
              <div class="row">
                <div v-if="masMonthlyExpense.masMonthlyExpensesId > 0">
                  <ManualMonthlyExpenses
                    :globalMasMonthlyExpensesId="
                      masMonthlyExpense.masMonthlyExpensesId
                    "
                    @SetManualMonthlyExpensesEditorProperty="
                      SetManualMonthlyExpensesEditorProperty($event)
                    "
                  />
                </div>
              </div>

            </div>

            <div v-if="ManualMonthlyExpensesEditor">
              <ManualMonthlyExpensesEditor
                :globalMasMonthlyExpensesId="
                  masMonthlyExpense.masMonthlyExpensesId
                "
                @SetManualMonthlyExpensesEditorProperty="
                  SetManualMonthlyExpensesEditorProperty($event)
                "
              />
            </div>
            <div v-if="ManualMonthlyCreditExpensesEditor">
              <ManualMonthlyCreditExpensesEditor
                :globalMasMonthlyExpensesId="
                  masMonthlyExpense.masMonthlyExpensesId
                "
                @SetManualMonthlyCreditExpensesEditorProperty="
                  SetManualMonthlyCreditExpensesEditorProperty($event)
                "
              />
            </div>
         
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
// import {store} from "./Budget/store.js";
import MonthlyExpenses from "./Budget/MonthlyExpenses/MonthlyExpenses";
import ManualMonthlyExpenses from "./Budget/ManualMonthlyExpenses/ManualMonthlyExpenses";
import ManualMonthlyExpensesEditor from "./Budget/ManualMonthlyExpenses/ManualMonthlyExpenseEditor.vue";
import ManualMonthlyCreditExpenses from "./Budget/ManualMonthlyCreditExpenses/ManualMonthlyCreditExpenses";
import ManualMonthlyCreditExpensesEditor from "./Budget/ManualMonthlyCreditExpenses/ManualMonthlyCreditExpensesEditor.vue";

// import { createApp } from 'vue'

// const Budget = createApp({})

export default {
  // name: "Budget",
  components: {
    ManualMonthlyExpenses,
    ManualMonthlyCreditExpenses,
    MonthlyExpenses,
    ManualMonthlyExpensesEditor,
    ManualMonthlyCreditExpensesEditor,
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
      // store
    };
  },
  computed: {
    DisplayMainScreen() {
      return (
        this.ManualMonthlyExpensesEditor == false &&
        this.ManualMonthlyCreditExpensesEditor == false
      );
    },
  },
  created() {
    this.FillYearsDropDownListModel();
  },
  mounted() {
    // console.log("Store Budget",store.count)
  },
  methods: {
    GetMasMonthlyExpensesByParameters() {
      this.loading = true;
      this.masMonthlyExpense.biweeklyNumber = Number(
        this.masMonthlyExpense.biweeklyNumber
      );
      this.masMonthlyExpense.masMonthlyExpensesId = Number(
        this.masMonthlyExpense.masMonthlyExpensesId
      );
      this.masMonthlyExpense.income = Number(this.masMonthlyExpense.income);
      const masMonthlyExpense = this.masMonthlyExpense;
      axios
        .post(
          "https://localhost:44359/api/MasMonthlyExpenses/GetMasMonthlyExpensesByParameters/",
          masMonthlyExpense
        )
        .then((response) => {
          this.loading = false;
          this.masMonthlyExpense = response.data;
        })
        .catch((error) => {
          console.error(error);
          this.loading = false;
        });
    },
    CreatetMasMonthlyExpenses() {
      this.loading = true;
      this.masMonthlyExpense.biweeklyNumber = Number(
        this.masMonthlyExpense.biweeklyNumber
      );
      this.masMonthlyExpense.masMonthlyExpensesId = Number(
        this.masMonthlyExpense.masMonthlyExpensesId
      );
      this.masMonthlyExpense.income = Number(this.masMonthlyExpense.income);
      const masMonthlyExpense = this.masMonthlyExpense;
      axios
        .post(
          "https://localhost:44359/api/MasMonthlyExpenses/CreatetMasMonthlyExpenses/",
          masMonthlyExpense
        )
        .then((response) => {
          this.loading = false;
          this.masMonthlyExpense = response.data;
          this.GetMonthlyExpenses(this.masMonthlyExpense.masMonthlyExpensesId);
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
          this.masMonthlyExpense = response.data;
          this.GetMonthlyExpenses(this.masMonthlyExpense.masMonthlyExpensesId);
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
            this.Years.push({
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
      this.ManualMonthlyExpensesEditor = value;
    },
    SetManualMonthlyCreditExpensesEditorProperty(value) {
      this.ManualMonthlyCreditExpensesEditor = value;
    },
    resetControls() {
      // TODO: Pending Implementation
    },
  },
};
</script>




<style >
</style>