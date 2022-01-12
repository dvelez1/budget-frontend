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
            <!-- Master Selection -->
            <div class="row">
              <div class="col-md-12">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title text-center">Biweekly Selection</h5>
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
                        v-model="masMonthlyExpense.Year"
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
                        v-model="masMonthlyExpense.Month"
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
                          v-model="masMonthlyExpense.BiweeklyNumber"
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
                          v-model="masMonthlyExpense.BiweeklyNumber"
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
                        v-model="masMonthlyExpense.Budget"
                        type="number"
                        class="form-control"
                        placeholder="Enter Budget"
                      />
                    </div>

                    <div>
                      <button
                        class="btn btn-success btn-sm mt-2"
                        v-on:click="GetMasMonthlyExpensesByParameters()"
                        type="button"
                      >
                        Search
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6 mt-2">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title text-center">Budget</h5>
                    <hr />
                    <!--  -->
                    <ul class="list-group">
                      <li
                        v-for="(monthlyExpense, index) of listMonthlyExpense"
                        :key="index"
                        class="list-group-item d-flex justify-content-between"
                      >
                        <!--  -->

                        <div>
                          {{ monthlyExpense.montlyExpensesId }} -
                          {{ monthlyExpense.masExpensesDescription }}
                        </div>
                        <div class="d-flex justify-content-between">
                          <div>
                            <input
                              type="text"
                              class="form-control form-control-sm"
                              placeholder="Budget"
                            />
                          </div>
                          <div>
                            <input
                              type="text"
                              class="form-control form-control-sm"
                              placeholder="Payment"
                              v-model="monthlyExpense.payment"
                            />
                          </div>
                          <div>
                            <input
                              class="btn btn-success btn-sm"
                              type="button"
                              value="Save"
                              v-on:click="
                                UpdateMonthlyExpenses(
                                  monthlyExpense,
                                  monthlyExpense.montlyExpensesId
                                )
                              "
                            />
                          </div>
                        </div>
                        <!--  -->
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <!-- CREDIT EXPENSES -->
              <div class="col-md-6 mt-2">
                <div class="card">
                  <div class="card-body">
                    <div class="row g-2">
                      <div class="col-sm-11">
                        <h5 class="card-title text-center">Credit Expenses</h5>
                      </div>
                      <div class="col-sm-1">
                        <input
                          class="btn btn-primary btn-sm float-end"
                          type="button"
                          value="Add"
                        />
                      </div>
                    </div>
                    <hr />

                    <div class="row">
                      <div class="col md-8">
                        <div>
                          <label>Description of the item.</label>
                        </div>
                      </div>
                      <div class="col md-4">
                        <div class="d-flex justify-content-between">
                          <div>
                            <input
                              type="text"
                              class="form-control form-control-sm"
                              placeholder="Cost"
                            />
                          </div>
                          <div>
                            <input
                              type="text"
                              class="form-control form-control-sm"
                              placeholder="Payment"
                            />
                          </div>
                          <div>
                            <input
                              type="text"
                              class="form-control form-control-sm"
                              placeholder="difference"
                            />
                          </div>
                          <div>
                            <input
                              class="btn btn-success btn-sm"
                              type="button"
                              value="Save"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- ADDITIONAL EXPENSES -->
            <div class="row">
              <div class="col-md-6 mt-2">
                <div class="card">
                  <div class="card-body">
                    <div class="row g-2">
                      <div class="col-sm-11">
                        <h5 class="card-title text-center">
                          Additional Expenses
                        </h5>
                      </div>
                      <div class="col-sm-1">
                        <input
                          class="btn btn-primary btn-sm float-end"
                          type="button"
                          value="Add"
                        />
                      </div>
                    </div>
                    <hr />
                    <div class="row">
                      <div class="col md-10">
                        <div>
                          <label>Description of the item.</label>
                        </div>
                      </div>
                      <div class="col md-2">
                        <div class="d-flex justify-content-between">
                          <div>
                            <input
                              type="text"
                              class="form-control form-control-sm"
                              placeholder="Budget"
                            />
                          </div>
                          <div>
                            <input
                              class="btn btn-success btn-sm"
                              type="button"
                              value="Save"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Budget",
  data() {
    return {
      masMonthlyExpense: {
        MasMonthlyExpensesId: "",
        Year: "",
        Month: "",
        Income: "",
        BiweeklyNumber: "",
      },
      monthlyExpense: {
        MontlyExpensesId: "",
        MasExpensesId: "",
        MasMonthlyExpensesId: "",
        MasExpensesDescription: "",
        Payment: "",
        Budget: "",
      },
      listMonthlyExpense: [],
      loading: false,
      Years: [],
    };
  },
  methods: {
    GetMasMonthlyExpenses() {
      // this.loading = true;
      // axios
      //   .get(
      //     "https://localhost:44359/api/MasMonthlyExpenses/GetMasMonthlyExpeses/"
      //   )
      //   .then((response) => {
      //     this.loading = false;
      //     return response.data
      //   })
      //   .catch((error) => {
      //     console.error(error);
      //     this.loading = false;
      //   });
    },
    GetMasMonthlyExpensesByParameters() {
      // TODO: In progress
      this.loading = true;
      this.masMonthlyExpense.BiweeklyNumber = Number(this.masMonthlyExpense.BiweeklyNumber);
      const masMonthlyExpense = this.masMonthlyExpense;
      console.log(masMonthlyExpense)
      axios
        .post(
          "https://localhost:44359/api/MasMonthlyExpenses/GetMasMonthlyExpensesByParameters/",{
          params: {
            masMonthlyExpense: masMonthlyExpense,
          },
        }).then((response) => {
          this.loading = false;
          this.masMonthlyExpense = response.data;
          this.GetMonthlyExpenses(this.masMonthlyExpense.MasMonthlyExpensesId)
        })
        .catch((error) => {
          console.error(error);
          this.loading = false;
        });
    },
    GetMonthlyExpenses(masMonthlyExpensesId) {
      this.loading = true;
      axios
        .get("https://localhost:44359/api/MonthlyExpenses/", {
          params: {
            masMonthlyExpensesId: masMonthlyExpensesId,
          },
        })
        .then((response) => {
          this.loading = false;
          this.listMonthlyExpense = response.data;
        })
        .catch((error) => {
          console.error(error);
          this.loading = false;
        });
    },
    UpdateMonthlyExpenses(monthlyExpense, montlyExpensesId) {
      console.log(monthlyExpense);
      console.log(montlyExpensesId);

      this.loading = true;
      axios
        .put(
          "https://localhost:44359/api/MonthlyExpenses/" + montlyExpensesId,
          monthlyExpense
        )
        .then((response) => {
          console.log(response);
          this.loading = false;
          this.GetMonthlyExpenses(this.masMonthlyExpense.MasMonthlyExpensesId);
        })
        .catch((error) => {
          console.error(error);
          this.loading = false;
        });
    },
    fillYearsDropDownListModel() {
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
    clearControls() {
      this.masMonthlyExpense = null;
    },
  },
  computed: {
    
  },
  mounted() {
    this.fillYearsDropDownListModel();
  },
};
</script>

<style  scoped>
</style>