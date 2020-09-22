<template>
  <div>
    <input
      id="searchBar"
      v-model="searchTerm"
      type="text"
      placeholder="search"
      @keyup="search"
    />
  </div>
</template>

<script>
export default {
  name: 'Search',
  data() {
    return {
      searchTerm: '',
      filterTimeout: 0,
      timeoutId: null,
    };
  },
  computed: {
    pageNr() {
      return parseInt(this.$route.params.page);
    },
  },
  watch: {
    $route: {
      immediate: true,
      handler(route) {
        this.searchTerm = route.query.name;
        this.$store.dispatch('loadPeople', {
          pageNr: this.pageNr,
          name: this.searchTerm,
        });
        console.log(route);
      },
    },
  },
  methods: {
    search() {
      console.log('ba');
      clearTimeout(this.filterTimeout);
      this.filterTimeout = setTimeout(() => {
        this.$router.push({
          path: '',
          query: { name: this.searchTerm },
        });
      }, 1000);
    },
  },
};
</script>

<style></style>
