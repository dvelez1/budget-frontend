import { defineStore } from "pinia";

export const useStore = defineStore('budgetStore', {
    // other options...
    state: () => ({
        masMonthlyExpense: {
            masMonthlyExpensesId: "",
            year: "",
            month: "",
            income: "",
            biweeklyNumber: "",
        },
        ManualMonthlyExpensesEditor: false,
        ManualMonthlyCreditExpensesEditor: false,
        CreateBudgetMasterRulesEditor:false,

    }),

    getters: {
        // Pending Implementation
    },

    actions: {
    // Pending Implementation
    }



})
