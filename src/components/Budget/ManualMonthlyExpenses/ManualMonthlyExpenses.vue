<template>
  <div class="col-md-12 mt-2">
    <div class="card">
      <div class="card-body">
        <div class="row g-2">
          <div class="col-sm-11">
            <h5 class="card-title text-center">Additional Expenses</h5>
          </div>
          <div class="col-sm-1">
            <input
              class="btn btn-dark btn-sm float-end"
              type="button"
              value="Add"
              v-on:click="Add()"
            />
          </div>
        </div>
        <hr />

        <ul class="list-group">
          <li
            v-for="(manualMonthlyExpense, index) of listmanualMonthlyExpense"
            :key="index"
            class="list-group-item d-flex justify-content-between"
          >
            <div>
              {{ manualMonthlyExpense.manualMonthlyExpensesId }} -
              {{ manualMonthlyExpense.description }}
            </div>
            <div class="d-flex justify-content-between">
              <div>
                <input
                  type="number"
                  class="form-control form-control-sm"
                  placeholder="Budget"
                  v-model="manualMonthlyExpense.budget"
                />
              </div>
              &nbsp;
              <div>
                <input
                  type="number"
                  class="form-control form-control-sm"
                  placeholder="Payment"
                  v-model="manualMonthlyExpense.payment"
                />
              </div>
              &nbsp;
              <div>
                <input
                  class="btn btn-dark btn-sm"
                  type="button"
                  value="Save"
                  v-on:click="
                    UpdateManualMonthlyExpenses(
                      manualMonthlyExpense.manualMonthlyExpensesId,
                      manualMonthlyExpense
                    )
                  "
                />
                &nbsp;
                <input
                  class="btn btn-secondary btn-sm"
                  type="button"
                  value="Delete"
                  v-on:click="
                    DeleteManualMonthlyExpenses(
                      manualMonthlyExpense.manualMonthlyExpensesId
                    )
                  "
                />
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
// Import budget store with pinia
import { useBudgetStore } from "/src/stores/budget.js";
// Required to use pinia store without setup()
import { mapStores } from "pinia";

export default {
  name: "ManualMonthlyExpenses",
  components: {},
  data() {
    return {
      masMonthlyExpensesId: 0,
      manualMonthlyCreditExpense: {
        manualMonthlyCreditExpensesId: "",
        description: "",
        masMonthlyExpensesId: "",
        cost: "",
        payment: "",
      },
      listmanualMonthlyExpense: [],
    };
  },
  created() {
    this.masMonthlyExpensesId = this.budgetStore.masMonthlyExpense.masMonthlyExpensesId;
  },
  computed: {
    //Set budget Store without setup
    ...mapStores(useBudgetStore),
  },
  methods: {
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
          console.log("Success!");
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
          alert("Success!");
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
          alert("Success!");
          this.GetManualMonthlyExpenses(this.masMonthlyExpensesId);
        })
        .catch((error) => {
          console.log(error);
          this.loading = false;
        });
    },
    Add() {
      this.$emit("SetManualMonthlyExpensesEditorProperty", true);
    },
  },
  mounted() {
    this.GetManualMonthlyExpenses(this.masMonthlyExpensesId);
  },
};
</script>

<style>
</style>