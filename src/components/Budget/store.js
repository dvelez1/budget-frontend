
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

// const store = {
//   debug: true,

//   state: reactive({
//     message: 'Hello!',
//     val: 1,
//     message2: computed(() => store.state.val + 1),
//   }),

//   increment() {
//     this.state.val++
//   }

// }

export { store }







