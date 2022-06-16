<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Add Manual Monthly Expense</h5>
            <form>
              <div class="mb-3">
                <label class="form-label">Description</label>
                <input
                  v-model="manualMonthlyExpense.description"
                  type="text"
                  class="form-control"
                />
              </div>
              <div class="mb-3">
                <label class="form-label">Cost</label>
                <input
                  v-model="manualMonthlyExpense.budget"
                  type="number"
                  class="form-control"
                />
              </div>
              <div class="mb-3">
                <label class="form-label">Payment</label>
                <input
                  v-model="manualMonthlyExpense.payment"
                  type="number"
                  class="form-control"
                />
              </div>
              <button
                type="submit"
                class="btn btn-primary"
                v-on:Click.prevent="CreatetManualMonthlyExpenses()"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
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
  name: "ManualMonthlyExpenseEditor",
  components: {},
  data() {
    return {
      masMonthlyExpensesId: Number(this.globalMasMonthlyExpensesId),
      manualMonthlyExpense: {
        manualMonthlyExpensesId: "",
        description: "",
        masMonthlyExpensesId: "",
        budget: "",
        payment: "",
      },
    };
  },
  props: ["globalMasMonthlyExpensesId"],
  computed: {
    //Set budget Store without setup
    ...mapStores(useBudgetStore),
  },
  created() {
    this.masMonthlyExpensesId =
      this.budgetStore.masMonthlyExpense.masMonthlyExpensesId;
  },
  methods: {
    GetManualMonthlyExpenses(masMonthlyExpensesId) {
      this.loading = true;
      axios
        .get("https://localhost:44359/api/ManualMonthlyExpenses/", {
          params: {
            masMonthlyExpensesId: masMonthlyExpensesId,
          },
        })
        .then((response) => {
          this.listmanualMonthlyExpense = response.data;
          console.log("Success!");
        })
        .catch((error) => {
          console.error(error);
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
      this.manualMonthlyExpense.masMonthlyExpensesId =
        this.masMonthlyExpensesId;
      const manualMonthlyExpense = this.manualMonthlyExpense;
      axios
        .post(
          "https://localhost:44359/api/ManualMonthlyExpenses/",
          manualMonthlyExpense
        )
        .then((response) => {
          console.log(response.data);
          alert("success!");
          this.RedirectToBudget();
        })
        .catch((error) => {
          console.error(error);
        });
    },
    RedirectToBudget() {
      this.$emit("SetManualMonthlyExpensesEditorProperty", false);
    },
  },
  mounted() {},
};
</script>

<style></style>
