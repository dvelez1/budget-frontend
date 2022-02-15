import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";
import About from "@/views/About.vue";
import Budget  from '@/components/Budget.vue';
// import ManualMonthlyExpensesEditor  from '@/components/Budget/ManualMonthlyExpenses/ManualMonthlyExpenseEditor.vue';
// import ManualMonthlyCreditExpensesEditor from '@/components/Budget/ManualMonthlyCreditExpenses/ManualMonthlyCreditExpensesEditor.vue';

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/budget",
    name: "Budget",
    component: Budget,
  },
  // {
  //   path: "/addManualEntry",
  //   name: "AddManualEntry",
  //   component: ManualMonthlyExpensesEditor,
  // },
  // {
  //   path: "/addManualCreditEntry",
  //   name: "AddManualCreditEntry",
  //   component: ManualMonthlyCreditExpensesEditor,
  // },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;