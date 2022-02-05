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
                      <!--<h6>Year</h6>
                     <select class="form-select">
                      <option selected>Select Year</option>
                      <option value="1">2021</option>
                      <option value="2">2022</option>
                    </select> -->
                      <div class="form-group">
                        <label for="year"><h6>Year</h6></label>
                        <select
                          class="form-control"
                          v-model="sharedState.masMonthlyExpense.year"
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
                          v-model="sharedState.masMonthlyExpense.month"
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
                            v-model="sharedState.masMonthlyExpense.biweeklyNumber"
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
                            v-model="sharedState.masMonthlyExpense.biweeklyNumber"
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
                          v-model="sharedState.masMonthlyExpense.income"
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

              <div class="row">
                <!-- Budget -> MonthlyExpenses Get/Edit: Done Pending Create -->
                <div class="col-md-6 mt-2">
                  <div v-if="sharedState.masMonthlyExpense.masMonthlyExpensesId > 0">
                    <MonthlyExpenses
                      :globalMasMonthlyExpensesId="
                        sharedState.masMonthlyExpense.masMonthlyExpensesId
                      "
                    />
                  </div>
                </div>
                <!-- CREDIT EXPENSES Get/Edit/Delete: Done Pending Create-->
                <div class="col-md-6 mt-2">
                  <div v-if="sharedState.masMonthlyExpense.masMonthlyExpensesId > 0">
                    <ManualMonthlyCreditExpenses
                      :globalMasMonthlyExpensesId="sharedState.masMonthlyExpense.masMonthlyExpensesId"
                      @SetManualMonthlyCreditExpensesEditorProperty="SetManualMonthlyCreditExpensesEditorProperty($event)"/>
                  </div>
                </div>
              </div>
              <!-- ADDITIONAL Montlhy EXPENSES - Get/Edit/Delete: Done Pending Create -->
              <div class="row">
                <div v-if="sharedState.masMonthlyExpense.masMonthlyExpensesId > 0">
                  <ManualMonthlyExpenses :globalMasMonthlyExpensesId="sharedState.masMonthlyExpense.masMonthlyExpensesId"
                   @SetManualMonthlyExpensesEditorProperty="SetManualMonthlyExpensesEditorProperty($event)"/>
                </div>
              </div>
            </div>
            <div v-show="ManualMonthlyExpensesEditor">
              <ManualMonthlyExpensesEditor :globalMasMonthlyExpensesId="sharedState.masMonthlyExpense.masMonthlyExpensesId"
               @SetManualMonthlyExpensesEditorProperty="SetManualMonthlyExpensesEditorProperty($event)"/>
            </div>
            <div v-show="ManualMonthlyCreditExpensesEditor">
              <ManualMonthlyCreditExpensesEditor :globalMasMonthlyExpensesId="sharedState.masMonthlyExpense.masMonthlyExpensesId"
               @SetManualMonthlyCreditExpensesEditorProperty="SetManualMonthlyCreditExpensesEditorProperty($event)"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <br />
</template>

<script>
import axios from "axios";
import ManualMonthlyExpenses from "./Budget/ManualMonthlyExpenses/ManualMonthlyExpenses";
import ManualMonthlyCreditExpenses from "./Budget/ManualMonthlyCreditExpenses/ManualMonthlyCreditExpenses";
import MonthlyExpenses from "./Budget/MonthlyExpenses/MonthlyExpenses";
import ManualMonthlyExpensesEditor from "./Budget/ManualMonthlyExpenses/ManualMonthlyExpenseEditor.vue";
import ManualMonthlyCreditExpensesEditor from "./Budget/ManualMonthlyCreditExpenses/ManualMonthlyCreditExpensesEditor.vue";
import store from "./Budget/store.vue";

export default {
  name: "Budget",
  components: {
    ManualMonthlyExpenses,
    ManualMonthlyCreditExpenses,
    MonthlyExpenses,
    ManualMonthlyExpensesEditor,
    ManualMonthlyCreditExpensesEditor,
  },
  data() {
    return {
      sharedState:store.state,
      // masMonthlyExpense: {
      //   masMonthlyExpensesId: "",
      //   year: "",
      //   month: "",
      //   income: "",
      //   biweeklyNumber: "",
      // },
      resetFlag: false,
      Years: [],
      ManualMonthlyExpensesEditor: false,
      ManualMonthlyCreditExpensesEditor: false,
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
  created(){
   this.FillYearsDropDownListModel();
  },
  mounted() {
    console.log("store",this.sharedState.masMonthlyExpense)
  },
  methods: {
    GetMasMonthlyExpensesByParameters() {
      this.loading = true;
      this.sharedState.masMonthlyExpense.biweeklyNumber = Number(this.sharedState.masMonthlyExpense.biweeklyNumber);
      this.sharedState.masMonthlyExpense.masMonthlyExpensesId = Number(this.sharedState.masMonthlyExpense.masMonthlyExpensesId);
      this.sharedState.masMonthlyExpense.income = Number(this.sharedState.masMonthlyExpense.income);
      const masMonthlyExpense = this.sharedState.masMonthlyExpense;
      axios
        .post(
          "https://localhost:44359/api/MasMonthlyExpenses/GetMasMonthlyExpensesByParameters/",
          masMonthlyExpense
        )
        .then((response) => {
          this.loading = false;
          this.sharedState.masMonthlyExpense = response.data;
        })
        .catch((error) => {
          console.error(error);
          this.loading = false;
        });
    },
    CreatetMasMonthlyExpenses() {
      this.loading = true;
      this.sharedState.masMonthlyExpense.biweeklyNumber = Number(this.sharedState.masMonthlyExpense.biweeklyNumber);
      this.sharedState.masMonthlyExpense.masMonthlyExpensesId = Number(this.sharedState.masMonthlyExpense.masMonthlyExpensesId);
      this.sharedState.masMonthlyExpense.income = Number(this.sharedState.masMonthlyExpense.income);
      const masMonthlyExpense = this.sharedState.masMonthlyExpense;
      axios
        .post(
          "https://localhost:44359/api/MasMonthlyExpenses/CreatetMasMonthlyExpenses/",
          masMonthlyExpense
        )
        .then((response) => {
          this.loading = false;
          this.sharedState.masMonthlyExpense = response.data;
          this.GetMonthlyExpenses(this.sharedState.masMonthlyExpense.masMonthlyExpensesId);
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
          this.sharedState.masMonthlyExpense = response.data;
          this.GetMonthlyExpenses(this.sharedState.masMonthlyExpense.masMonthlyExpensesId);
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
    resetControls(){
      // TODO: Pending Implementation
    }
  },
};
</script>




<style >
</style>