<template>
  <div class="mb-3">
    Crear Manual Monthly Expense para: {{masMonthlyExpensesId}}
  </div>
</template>

<script>
// import Budget from './components/Budget.vue'

export default {
  name: "ManualMonthlyExpenseEditor",
  components: {
    //  Budget
  },
  data() {
    return {
    //     manualMonthlyCreditExpense: {
    //         manualMonthlyCreditExpensesId: "",
    //         description: "",
    //         masMonthlyExpensesId: "",
    //         cost: "",
    //         payment: "",
    //   },
      listmanualMonthlyCreditExpense: [],
    };
  },
  props: ['masMonthlyExpensesId']
};
</script>


<style  >
</style>