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
            <select class="form-control" v-model="masMonthlyExpense.year">
              <option :value="year.text" v-for="year in Years" :key="year.id">
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
              <label class="form-check-label" for="flexRadio-biweekly-1">
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
              <label class="form-check-label" for="flexRadio-biweekly-2">
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

export default {
  name: "MasMonthlyExpenses",
  components: {},
  data() {
    return {
      masMonthlyExpensesId: Number(this.globalMasMonthlyExpensesId),
    };
  },
  props: ["globalMasMonthlyExpensesId"],
  methods: {},
  mounted() {},
};
</script>

<style>
</style>