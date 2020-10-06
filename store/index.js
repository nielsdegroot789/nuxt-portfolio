export const state = () => ({
  people: [],
  index: [],
  pageNumber: [],
  limit: [],
  loading: false,
  totalPages: 0,
  limitt: 20,
  searchTerm: '',
  comics: '',
  batchComic: [],
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
      commit('saveSearchTerm', name);
      commit('swapiPage', characters.data);
      commit('loadingChange', false);
      commit('totalItems', characters.data.data.total);
    } catch (error) {
      console.log(error);
    }
  },

  async getComics({ commit }, title) {
    const params = {
      apikey: 'a61f920be89f461f8fa05c8bd75e5327',
      limit: 10,
    };
    params.titleStartsWith = title;
    try {
      const comics = await this.$axios({
        method: 'GET',
        url: 'https://gateway.marvel.com/v1/public/comics',
        params,
      });
      commit('filteredComics', comics.data.data.results);
    } catch (error) {
      console.log(error);
    }
  },
  addComicBatch({ commit }, payload) {
    console.log(payload);
    commit('saveComic', payload);
  },
};

export const mutations = {
  saveComic(state, payload) {
    state.batchComic.push({ ...payload });
  },
  filteredComics(state, comics) {
    state.comics = comics;
  },
  saveSearchTerm(state, search) {
    state.searchTerm = search;
  },

  FilterPeople(state, people) {
    state.filterResults = people.data.results;
  },

  swapiPage(state, results) {
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
  searchTerm: (state) => state.searchTerm,
  comics: (state) => state.comics,
};
