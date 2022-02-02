<template>
  <div class="card">
    <div class="card-body">
      <div class="row g-2">
        <div class="col-sm-11">
          <h5 class="card-title text-center">Credit Expenses</h5>
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
          v-for="(
            manualMonthlyCreditExpense, index
          ) of listmanualMonthlyCreditExpenses"
          :key="index"
          class="list-group-item d-flex justify-content-between"
        >
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

export default {
  name: "ManualMonthlyExpenses",
  components: {},
  data() {
    return {
      masMonthlyExpensesId: Number(this.globalMasMonthlyExpensesId),
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
  props: ["globalMasMonthlyExpensesId"],
  methods: {
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
          this.listmanualMonthlyCreditExpenses = response.data;
          console.log("Success!");
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
          "https://localhost:44359/api/ManualMonthlyCreditExpenses/" +
            manualMonthlyCreditExpensesId,
          manualMonthlyCreditExpense
        )
        .then((response) => {
          this.loading = false;
          this.manualMonthlyCreditExpense = response.data;
          alert("success!");
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
          "https://localhost:44359/api/ManualMonthlyCreditExpenses/" +
            manualMonthlyCreditExpensesId
        )
        .then((response) => {
          this.loading = false;
          this.manualMonthlyCreditExpense = response.data;
          alert("success!");
        })
        .catch((error) => {
          console.log(error);
          this.loading = false;
        });
    },
    Add(){
      this.$emit("SetManualMonthlyCreditExpensesEditorProperty",true);
    }
  },
  mounted() {
    this.GetManualMonthlyCreditExpenses(this.masMonthlyExpensesId);
  },
};
</script>

<style>
</style>