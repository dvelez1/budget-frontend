
//store.js
import { reactive } from 'vue'

const store = {
  debug: true,

  state: reactive({
    masMonthlyExpense: {
      masMonthlyExpensesId: "",
      year: "",
      month: "",
      income: "",
      biweeklyNumber: "",
    },
  }),

  setMasMonnthlyExpense(masMonthlyExpense) {
    this.state.masMonthlyExpense = masMonthlyExpense;
  }

}


export { store }







