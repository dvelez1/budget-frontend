<template>
  <div class="card">
    <div class="card-body">
      <div class="row g-2">
        <div class="col-sm-11">
          <h5 class="card-title text-center">Credit Expenses</h5>
        </div>
        <div class="col-sm-1">
          <h4><span role="button" class="badge rounded-pill bg-dark float-end"  v-on:click="Add()">Add </span></h4>
          <!-- <input
            class="btn btn-dark btn-sm float-end"
            type="button"
            value="Add"
            v-on:click="Add()"
          /> -->

        </div>
      </div>

      <hr />

      <ul class="list-group">
        <li
          v-for="(
            manualMonthlyCreditExpense, index
          ) of listmanualMonthlyCreditExpenses"
          :key="index" class="list-group-item d-flex justify-content-between">


          <div>
            {{ manualMonthlyCreditExpense.manualMonthlyCreditExpensesId }}
            -
            {{ manualMonthlyCreditExpense.description }}
          </div>
          <div class="d-flex justify-content-between">
            <div>
              <input
                type="number"
                class="form-control form-control-sm"
                placeholder="Cost"
                v-model="manualMonthlyCreditExpense.cost"
              />
            </div>
            &nbsp;
            <div>
              <input
                type="number"
                class="form-control form-control-sm"
                placeholder="Payment"
                v-model="manualMonthlyCreditExpense.payment"
              />
            </div>
            &nbsp;
            <div>
              Diferrence: ${{
                manualMonthlyCreditExpense.cost -
                manualMonthlyCreditExpense.payment
              }}
            </div>
            &nbsp;
            <div>
              <input
                class="btn btn-dark btn-sm"
                type="button"
                value="Save"
                v-on:click="
                  UpdateManualMonthlyCreditExpenses(
                    manualMonthlyCreditExpense.manualMonthlyCreditExpensesId,
                    manualMonthlyCreditExpense
                  )
                "
              />
              &nbsp;
              <input
                class="btn btn-secondary btn-sm"
                type="button"
                value="Delete"
                v-on:click="
                  DeleteManualMonthlyCreditExpenses(
                    manualMonthlyCreditExpense.manualMonthlyCreditExpensesId
                  )
                "
              />
            </div>
          </div>
        </li>
      </ul>
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
  name: "ManualMonthlyCreditExpenses",
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
      listmanualMonthlyCreditExpenses: [],
    };
  },
  created() {
    this.masMonthlyExpensesId = Number(
      this.budgetStore.masMonthlyExpense.masMonthlyExpensesId
    );
  },
  computed: {
    //Set budget Store without setup
    ...mapStores(useBudgetStore),
  },
  methods: {
    GetManualMonthlyCreditExpenses(masMonthlyExpensesId) {
      axios
        .get("https://localhost:44359/api/ManualMonthlyCreditExpenses/", {
          params: {
            masMonthlyExpensesId: masMonthlyExpensesId,
          },
        })
        .then((response) => {
          this.listmanualMonthlyCreditExpenses = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    UpdateManualMonthlyCreditExpenses(
      manualMonthlyCreditExpensesId,
      manualMonthlyCreditExpense
    ) {
      axios
        .put(
          "https://localhost:44359/api/ManualMonthlyCreditExpenses/" +
            manualMonthlyCreditExpensesId,
          manualMonthlyCreditExpense
        )
        .then((response) => {
          this.manualMonthlyCreditExpense = response.data;
          alert("success!");
        })
        .catch((error) => {
          console.error(error);
        });
    },
    DeleteManualMonthlyCreditExpenses(manualMonthlyCreditExpensesId) {
      axios
        .delete(
          "https://localhost:44359/api/ManualMonthlyCreditExpenses/" +
            manualMonthlyCreditExpensesId
        )
        .then((response) => {
          this.manualMonthlyCreditExpense = response.data;
          this.GetManualMonthlyCreditExpenses(this.masMonthlyExpensesId);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    Add() {
      this.budgetStore.ManualMonthlyCreditExpensesEditor = true;
    },
  },
  mounted() {
    this.GetManualMonthlyCreditExpenses(this.masMonthlyExpensesId);
  },
};
</script>

<style></style>
