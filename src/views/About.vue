<template>
  <h1>About Page:</h1>
  <h1>counter:{{counterStore.counter}} </h1>
</template>

<script>

import {useCounterStore} from "../stores/counter.js";

export default {
  setup() {
    var counterStore = useCounterStore();
    counterStore.incrementBy(2);

     return {
      counterStore
    }

  },
}



</script>
