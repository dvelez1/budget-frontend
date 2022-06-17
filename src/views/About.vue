<template>
  <h1>About Page:</h1>
  <h1>counter:{{budget.resetFlag}} </h1>
</template>

<script>

import {useCounterStore} from "../stores/counter.js";

import { useBudgetStore } from "../stores/budget.js";

export default {
  setup() {
    var counterStore = useCounterStore();
    counterStore.incrementBy(2);
    const budget = useBudgetStore();

     return {
      counterStore,
      budget
    }

  },
}



</script>
