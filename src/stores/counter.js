import { defineStore } from "pinia";

export const useCounterStore = defineStore('counter', {
    // other options...
    state: () => ({
        counter: 0,
        numberOfChanges: 0
    }),

    getters: {
        // Pending Implementation
    },

    actions: {
        // Pending Implementation (Modify State)
        incrementBy(value) {
            this.counter += value;
            this.numberOfChanges +=1;
        }
    }



})
