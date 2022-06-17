import { defineStore } from "pinia";

export const useBudgetStore = defineStore("budget", {
  // other options...
  state: () => ({
    masMonthlyExpense: {
      masMonthlyExpensesId: 0,
      year: "",
      month: "",
      income: "",
      biweeklyNumber: "",
    },
    resetFlag: false,
    Years: [],
    ManualMonthlyExpensesEditor: false,
    ManualMonthlyCreditExpensesEditor: false,
    CreateBudgetMasterRulesEditor: false,
  }),

  getters: {
    // Pending Implementation
  },

  actions: {
    // Pending Implementation (Modify State)
    setresetFlag(value) {
      this.resetFlag = value;
    },

    resetMasMonthlyExpenseModel() {
      this.masMonthlyExpense.masMonthlyExpensesId = 0;
      this.masMonthlyExpense.year = "";
      this.masMonthlyExpense.month = "";
      this.masMonthlyExpense.income = "";
      this.masMonthlyExpense.biweeklyNumber = "";
    },
  },
});
