export const state = () => ({
  people: [],
});

export const actions = {
  async loadPeople({ commit }) {
    await this.$axios.get('https://swapi.dev/api/people/').then((response) => {
      commit('swapi', response.data);
    });
  },
};

export const mutations = {
  swapi(state, people) {
    state.people = people;
  },
};
