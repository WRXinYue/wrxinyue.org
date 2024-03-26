import { defineStore } from 'pinia'

export const usePerformanceStore = defineStore('performance', {
  state: () => ({
    actualCLS: null,
    actualFID: null,
    actualLCP: null,
  }),
  actions: {
    setLCP(actualCLS) {
      this.actualCLS = actualCLS
    },
    setFID(actualFID) {
      this.actualFID = actualFID
    },
    setCLS(actualLCP) {
      this.actualLCP = actualLCP
    },
  },
})
