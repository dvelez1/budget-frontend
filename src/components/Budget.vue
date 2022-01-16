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
                        v-on:click="clearControls()"
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
              <!-- Budget -> MonthlyExpenses -->
              <div class="col-md-6 mt-2">
                <div class="card">
                  <div class="card-body">
                    <div class="row g-2">
                      <div class="col-sm-11">
                        <h5 class="card-title text-center">Budget</h5>
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
                    <!--  -->
                    <ul
                      class="list-group"
                      style="
                        max-height: 300px;
                        margin-bottom: 10px;
                        overflow: scroll;
                        -webkit-overflow-scrolling: touch;
                      "
                    >
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
                              type="number"
                              class="form-control form-control-sm"
                              placeholder="Budget"
                              v-model="monthlyExpense.budget"
                            />
                          </div>
                          &nbsp;
                          <div>
                            <input
                              type="number"
                              class="form-control form-control-sm"
                              placeholder="Payment"
                              v-model="monthlyExpense.payment"
                            />
                          </div>
                          &nbsp;
                          <div>
                            <input
                              class="btn btn-dark btn-sm"
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

                        <!--  -->
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <!-- CREDIT EXPENSES Get/Edit/Delete: Done Pending Create-->
              <div class="col-md-6 mt-2">
                <div v-if="masMonthlyExpense.masMonthlyExpensesId > 0">
                  <ManualMonthlyCreditExpenses
                    :globalMasMonthlyExpensesId="
                      masMonthlyExpense.masMonthlyExpensesId
                    "
                  />
                </div>
              </div>
            </div>
            <!-- ADDITIONAL Montlhy EXPENSES - Get/Edit/Delete: Done Pending Create -->
            <div class="row">
              <!-- Load after masMonthlyExpense.masMonthlyExpensesId > 0  -->
              <div v-if="masMonthlyExpense.masMonthlyExpensesId > 0">
                <ManualMonthlyExpenses
                  :globalMasMonthlyExpensesId="
                    masMonthlyExpense.masMonthlyExpensesId
                  "
                />
              </div>
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
import ManualMonthlyExpenses from "./ManualMonthlyExpenses/ManualMonthlyExpenses";
import ManualMonthlyCreditExpenses from "./ManualMonthlyCreditExpenses/ManualMonthlyCreditExpenses";

export default {
  name: "Budget",
  components: {
    ManualMonthlyExpenses,
    ManualMonthlyCreditExpenses,
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
      monthlyExpense: {
        montlyExpensesId: "",
        masExpensesId: "",
        masMonthlyExpensesId: "",
        masExpensesDescription: "",
        payment: "",
        budget: "",
      },
      listMonthlyExpense: [],
      manualMonthlyExpense: {
        manualMonthlyExpensesId: "",
        description: "",
        masMonthlyExpensesId: "",
        budget: "",
        payment: "",
      },
      listmanualMonthlyExpense: [],
      manualMonthlyCreditExpense: {
        manualMonthlyCreditExpensesId: "",
        description: "",
        masMonthlyExpensesId: "",
        cost: "",
        payment: "",
      },
      listmanualMonthlyCreditExpense: [],
      loading: false,
      Years: [],
    };
  },
  computed: {},
  mounted() {
    this.fillYearsDropDownListModel();
  },
  methods: {
    // MasMonthlyExpenses
    GetMasMonthlyExpenses() {},
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
          this.GetMonthlyExpenses(this.masMonthlyExpense.masMonthlyExpensesId);
          this.GetManualMonthlyExpenses(
            this.masMonthlyExpense.masMonthlyExpensesId
          );
          this.GetManualMonthlyCreditExpenses(
            this.masMonthlyExpense.masMonthlyExpensesId
          );
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
      console.log(masMonthlyExpensesId);
      console.log(masMonthlyExpense);

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

    // MonthlyExpenses
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
      this.loading = true;
      axios
        .put(
          "https://localhost:44359/api/MonthlyExpenses/" + montlyExpensesId,
          monthlyExpense
        )
        .then((response) => {
          this.loading = false;
          this.monthlyExpense = response.data;
        })
        .catch((error) => {
          console.error(error);
          this.loading = false;
        });
    },
    // Manual Montlhy Expenses
    GetManualMonthlyExpenses(masMonthlyExpensesId) {
      this.loading = true;
      axios
        .get("https://localhost:44359/api/ManualMonthlyExpenses/", {
          params: {
            masMonthlyExpensesId: masMonthlyExpensesId,
          },
        })
        .then((response) => {
          this.loading = false;
          this.listmanualMonthlyExpense = response.data;
        })
        .catch((error) => {
          console.error(error);
          this.loading = false;
        });
    },
    CreatetManualMonthlyExpenses() {
      this.loading = true;
      this.manualMonthlyExpense.manualMonthlyExpensesId = Number(
        this.manualMonthlyExpense.manualMonthlyExpensesId
      );
      this.manualMonthlyExpense.budget = Number(
        this.manualMonthlyExpense.budget
      );
      this.manualMonthlyExpense.payment = Number(
        this.manualMonthlyExpense.payment
      );

      const manualMonthlyExpense = this.manualMonthlyExpense;
      axios
        .post(
          "https://localhost:44359/api/ManualMonthlyExpenses/",
          manualMonthlyExpense
        )
        .then(() => {
          this.loading = false;
          this.GetManualMonthlyExpensesByMasMonthlyExpensesId(
            this.masMonthlyExpense.masMonthlyExpensesId
          );
        })
        .catch((error) => {
          console.error(error);
          this.loading = false;
        });
    },
    UpdateManualMonthlyExpenses(manualMonthlyExpensesId, manualMonthlyExpense) {
      this.loading = true;
      axios
        .put(
          "https://localhost:44359/api/ManualMonthlyExpenses/" +
            manualMonthlyExpensesId,
          manualMonthlyExpense
        )
        .then((response) => {
          this.loading = false;
          this.manualMonthlyExpense = response.data;
        })
        .catch((error) => {
          console.error(error);
          this.loading = false;
        });
    },
    DeleteManualMonthlyExpenses(manualMonthlyExpensesId) {
      this.loading = true;
      axios
        .delete(
          "https://localhost:44359/api/ManualMonthlyExpenses/" +
            manualMonthlyExpensesId
        )
        .then((response) => {
          this.loading = false;
          this.manualMonthlyExpense = response.data;
        })
        .catch((error) => {
          console.log(error);
          this.loading = false;
        });
    },
    // Manual Montlhy Credit Expenses
    GetManualMonthlyCreditExpenses(masMonthlyExpensesId) {
      this.loading = true;
      axios
        .get("https://localhost:44359/api/ManualMonthlyCreditExpenses/", {
          params: {
            masMonthlyExpensesId: masMonthlyExpensesId,
          },
        })
        .then((response) => {
          this.loading = false;
          this.listmanualMonthlyCreditExpense = response.data;
        })
        .catch((error) => {
          console.error(error);
          this.loading = false;
        });
    },
    CreateManualMonthlyCreditExpenses() {
      this.loading = true;
      this.manualMonthlyCreditExpense.manualMonthlyCreditExpensesId = Number(
        this.manualMonthlyExpense.manualMonthlyCreditExpensesId
      );
      this.manualMonthlyCreditExpense.cost = Number(
        this.manualMonthlyCreditExpense.cost
      );
      this.manualMonthlyCreditExpense.payment = Number(
        this.manualMonthlyCreditExpense.payment
      );

      const manualMonthlyCreditExpense = this.manualMonthlyCreditExpense;
      axios
        .post(
          "https://localhost:44359/api/ManualMonthlyCreditExpenses/",
          manualMonthlyCreditExpense
        )
        .then(() => {
          this.loading = false;
          this.GetManualMonthlyCreditExpenses(
            this.manualMonthlyCreditExpense.masMonthlyExpensesId
          );
        })
        .catch((error) => {
          console.error(error);
          this.loading = false;
        });
    },
    UpdateManualMonthlyCreditExpenses(
      manualMonthlyCreditExpensesId,
      manualMonthlyCreditExpense
    ) {
      this.loading = true;
      axios
        .put(
          "https://localhost:44359/api/manualMonthlyCreditExpensesId/" +
            manualMonthlyCreditExpensesId,
          manualMonthlyCreditExpense
        )
        .then((response) => {
          this.loading = false;
          this.manualMonthlyCreditExpense = response.data;
        })
        .catch((error) => {
          console.error(error);
          this.loading = false;
        });
    },
    DeleteManualMonthlyCreditExpenses(manualMonthlyCreditExpensesId) {
      this.loading = true;
      axios
        .delete(
          "https://localhost:44359/api/manualMonthlyCreditExpensesId/" +
            manualMonthlyCreditExpensesId
        )
        .then((response) => {
          this.loading = false;
          this.manualMonthlyCreditExpense = response.data;
        })
        .catch((error) => {
          console.log(error);
          this.loading = false;
        });
    },
    // Helpers
    clearControls() {
      // masMonthlyExpense
      this.masMonthlyExpense.masMonthlyExpensesId = "";
      this.masMonthlyExpense.year = "";
      this.masMonthlyExpense.month = "";
      this.masMonthlyExpense.income = "";
      this.masMonthlyExpense.biweeklyNumber = "";
      // monthlyExpense
      this.monthlyExpense.montlyExpensesId = "";
      this.monthlyExpense.masExpensesId = "";
      this.monthlyExpense.masMonthlyExpensesId = "";
      this.monthlyExpense.masExpensesDescription = "";
      this.monthlyExpense.payment = "";
      this.monthlyExpense.budget = "";
      // manualMonthlyExpense
      this.manualMonthlyExpense.manualMonthlyExpensesId = "";
      this.manualMonthlyExpense.description = "";
      this.manualMonthlyExpense.masMonthlyExpensesId = "";
      this.manualMonthlyExpense.budget = "";
      this.manualMonthlyExpense.payment = "";
      // manualMonthlyCreditExpense
      this.manualMonthlyCreditExpense.manualMonthlyCreditExpensesId = "";
      this.manualMonthlyCreditExpense.description = "";
      this.manualMonthlyCreditExpense.masMonthlyExpensesId = "";
      this.manualMonthlyCreditExpense.cost = "";
      this.manualMonthlyCreditExpense.payment = "";
      //List
      this.listMonthlyExpense = null;
      this.listmanualMonthlyExpense = null;
      this.listmanualMonthlyCreditExpense = null;
    },
  },
};
</script>




<style >
</style>