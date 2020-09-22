export const state = () => ({
  people: [],
  index: [],
  pageNumber: [],
  limit: [],
  loading: false,
  totalPages: 0,
  limitt: 20,
});

export const actions = {
  async loadPeople({ commit, state }, payload) {
    commit('loadingChange', true);
    const { pageNr, name } = payload;
    const params = {
      apikey: 'a61f920be89f461f8fa05c8bd75e5327',
      limit: state.limitt,
      offset: (pageNr - 1) * state.limitt,
    };
    if (name) {
      params.nameStartsWith = name;
    }
    try {
      const characters = await this.$axios({
        method: 'GET',
        url: 'https://gateway.marvel.com/v1/public/characters',
        params,
      });
      commit('swapiPage', characters.data);
      commit('loadingChange', false);
      commit('totalItems', characters.data.data.total);
    } catch (error) {
      console.log(error);
    }
  },
};

export const mutations = {
  FilterPeople(state, people) {
    state.filterResults = people.data.results;
  },

  swapiPage(state, results) {
    console.log(results.data.results);
    state.people = results.data.results;
  },

  loadingChange(state, newLoadingStatus) {
    state.loading = newLoadingStatus;
  },
  totalItems(state, total) {
    state.totalPages = total;
  },
};

export const getters = {
  people: (state) => state.people,
  loading: (state) => state.loading,
  totalPages: (state) => Math.ceil(state.totalPages / state.limitt),
};
