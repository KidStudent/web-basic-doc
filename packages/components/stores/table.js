import { defineStore } from 'pinia';

export default defineStore('common', {
  namespaced: true,
  state: () => ({
    tipsShow: true, // table的tips显示
  }),
  getters: {},
  actions: {
    setTipsShow(tipsShow) {
      this.tipsShow = tipsShow;
    },
  },
});
