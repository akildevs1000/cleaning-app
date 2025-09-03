// holds your root state
export const state = () => ({
  floor_no: null,
  progress: null,

});

// contains your mutations
export const mutations = {
  setFloorNo(state, number) {
    state.floor_no = number
  },
  setProgress(state, progressObject) {
    state.progress = progressObject
  },
};
