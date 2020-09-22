<template>
  <div>
    <h1>Pagination</h1>
    <nuxt-link v-if="!first == false" :to="'/characters/' + first"
      >First</nuxt-link
    >
    <nuxt-link
      v-if="!previous == false"
      :to="{ path: '/characters/' + previous }"
      >previous</nuxt-link
    >
    <nuxt-link
      v-for="page in this.pageButtons"
      :key="page"
      :to="'/characters/' + page"
    >
      {{ page }}
    </nuxt-link>
    <nuxt-link v-if="!next == false" :to="'/characters/' + next"
      >next</nuxt-link
    >
    <nuxt-link v-if="!last == false" :to="'/characters/' + last"
      >Last</nuxt-link
    >
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  computed: {
    pageNr() {
      return parseInt(this.$route.params.page);
    },
    totalPages() {
      return this.$store.getters.totalPages;
    },
    first() {
      if (this.pageNr === 1) {
        return false;
      }
      return 1;
    },
    next() {
      if (this.pageNr === this.totalPages) {
        return false;
      }
      return this.pageNr + 1;
    },
    previous() {
      if (this.pageNr === 1) {
        return false;
      }
      return this.pageNr - 1;
    },
    last() {
      if (this.pageNr === this.totalPages) {
        return false;
      }
      return this.totalPages;
    },

    pageButtons() {
      const start = Math.min(this.totalPages - 4, Math.max(1, this.pageNr - 2));
      const array = [];
      for (let i = start; i <= start + 5; i++) {
        array.push(i + 1);
      }
      return array;
    },
  },
};
</script>

<style></style>
