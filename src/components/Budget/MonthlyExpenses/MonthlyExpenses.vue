<template>
  <div class="card">
    <div class="card-body">
      <div class="row g-2">
        <div class="col-sm-11">
          <h5 class="card-title text-center">Budget</h5>
        </div>
      </div>
      <hr />

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
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref, onMounted } from "vue";

// Import budget store with pinia
import { useBudgetStore } from "/src/stores/budget.js";

export default {
  name: "MonthlyExpenses",

  setup() {
    // initialize  pinia store on const
    const budgetStore = useBudgetStore();
    // Declare variable
    const listMonthlyExpense = ref([]);

    function GetMonthlyExpenses(masMonthlyExpensesId) {
      axios
        .get("https://localhost:44359/api/MonthlyExpenses/", {
          params: {
            masMonthlyExpensesId: masMonthlyExpensesId,
          },
        })
        .then((response) => {
          listMonthlyExpense.value = response.data;
          console.log("Get Operation for MonthlyExpenses Success");
        })
        .catch((error) => {
          console.error(error);
        });
    }

    function UpdateMonthlyExpenses(monthlyExpense, montlyExpensesId) {
      axios
        .put(
          "https://localhost:44359/api/MonthlyExpenses/" + montlyExpensesId,
          monthlyExpense
        )
        .then((response) => {
          budgetStore.monthlyExpense = response.data;
          alert("success");
        })
        .catch((error) => {
          console.error(error);
        });
    }

    onMounted(() => {
      GetMonthlyExpenses(
        budgetStore.masMonthlyExpense.masMonthlyExpensesId
      );
    });

    return {
      budgetStore,
      listMonthlyExpense,
      UpdateMonthlyExpenses
    };
  }

};
</script>

<style></style>
