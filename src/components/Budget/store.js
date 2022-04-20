
//store.js
import { reactive, computed } from 'vue'

const store = {
  debug: true,

  state: reactive({
    message: 'Hello!',
    val: 1,
    message2: computed(() => store.state.val + 1),
  }),

  increment() {
    this.state.val++
  }

}

export {store}




// import { reactive } from "vue";

// export const store = reactive({
//   test: "666",
//   masMonthlyExpense: {
//     masMonthlyExpensesId: "",
//     year: "",
//     month: "",
//     income: "",
//     biweeklyNumber: "",
//   },

// });




