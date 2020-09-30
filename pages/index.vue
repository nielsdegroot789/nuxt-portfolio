<template>
  <div>
    <search class="search" />
    <spinner v-if="loading" class="spinner" />
    <div v-else class="results-container">
      <div v-for="(item, index) in people" :key="index" class="results">
        {{ item.name }}
        {{ item.modified }}
      </div>
    </div>
    <div class="container-2">
      <li>Back</li>
      <li
        v-for="item in items"
        :key="item.id"
        :class="{ active: selected == item.id }"
        @click="getValue(item.id)"
      >
        {{ item.id }}
      </li>
      <li>Next</li>
    </div>
    <input type="button" value="Go Back" class="back" @click="Back" />
  </div>
</template>

<script>
import search from '../components/Search';
import spinner from '../components/SpinnerComponent';
export default {
  components: {
    spinner,
    search,
  },
  data() {
    return {
      isActive: false,
      selected: [],
      items: [],
      goBack: true,
    };
  },
  computed: {
    people() {
      return this.$store.getters.people;
    },
    secondIndex() {
      return this.$store.state.index[1];
    },
    loading() {
      return this.$store.getters.loading;
    },
  },
  mounted() {
    this.$store.dispatch('loadPeople');
    this.generateLinks();
  },

  methods: {
    generateLinks() {
      for (let i = 1; i < 10; i++) {
        this.items.push({
          id: i,
        });
      }
    },

    getValue(id) {
      this.selected = id;
      this.$store.dispatch('changePage', id);
    },
    Back() {
      const index = this.secondIndex;
      this.selected = index;
      this.$store.dispatch('goBack', index);
      this.isLoading = true;
    },
  },
};
</script>

<style>
.spinner {
  position: absolute;
  top: 9%;
  right: 50%;
}
.search {
  text-align: center;
}
.results-container {
  position: relative;
  height: auto;
}
input[type='button'] {
  background-color: rgb(149, 201, 149);
  border-radius: 3px;
  width: 5rem;
  height: 2rem;
  display: block;
  margin: auto;
  width: 50%;
}
.results {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  list-style: none;
}

.container-2 {
  margin-top: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  list-style: none;
}

li {
  padding: 1rem;
  cursor: pointer;
  border-radius: 3px;
}
.active {
  border: 5px solid goldenrod;
}
.navigation {
  text-align: center;
  cursor: pointer;
}
.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
