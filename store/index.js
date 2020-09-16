export const state = () => ({
  people: [],
  index: [],
});

export const actions = {
  async loadPeople({ commit }) {
    await this.$axios.get('https://swapi.dev/api/people/').then((response) => {
      commit('swapiPage', response.data);
    });
  },

  async changePage({ commit }, index) {
    await this.$axios
      .get('https://swapi.dev/api/people/?page=' + index)
      .then((response) => {
        commit('swapiPage', response.data);
      });
    commit('saveIndex', index);
  },

  async goBack({ commit }, index) {
    await this.$axios
      .get('https://swapi.dev/api/people/?page=' + index)
      .then((response) => {
        commit('swapiPage', response.data);
      });
    commit('deleteIndex');
  },
};

export const mutations = {
  swapiPage(state, response) {
    state.people = response;
  },
  saveIndex(state, index) {
    state.index.unshift(index);
  },
  deleteIndex(state) {
    state.index.shift(); // hier map gebruiken
  },
};

export const getters = {
  people: (state) => state.people,
};
