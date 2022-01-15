<template>
  <div class="mb-3">
    <label for="exampleFormControlInput1" class="form-label"
      >Email address</label
    >
    <input type="budget" class="form-control" v-model="test" />
  </div>

</template>

<script>
// import Budget from './components/Budget.vue'

export default {
  name: "ManualMonthlyExpenseEditor",
  components: {
    //   Budget
  },
  data() {
    return {
      test: ""
    };
  },
};
</script>


<style  >
</style>