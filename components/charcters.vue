<template>
  <div>
    <div>
      <search class="search" />
      <spinner v-if="loading" class="spinner" />
      <div v-else class="results-container">
        <div v-for="(item, index) in this.people" :key="index" class="results">
          {{ item.name }}
          {{ item.modified }}
        </div>
      </div>
    </div>
    <Pagination />
  </div>
</template>

<script>
import spinner from '../components/SpinnerComponent';
import Pagination from '../components/Pagination';
export default {
  computed: {
    pageNr() {
      return parseInt(this.$route.params.page);
    },
    characters() {
      return this.$store.state.characters;
    },
    amount() {
      return this.$store.state.length;
    },
    people() {
      return this.$store.getters.people;
    },
    loading() {
      return this.$store.getters.loading;
    },
  },
  components: {
    Pagination,
    spinner,
  },
};
</script>

<style></style>
