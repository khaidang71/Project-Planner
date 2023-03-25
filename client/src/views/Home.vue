<template>
  <div>
    <InputSearch v-model="searchText" />
  </div>
  <div class="home">
    <FilterNav @filterChange="current = $event" :current="current"></FilterNav>
    <!-- <div v-if="projects.length"> -->
    <!-- <div v-for="project in filterProjects" :key="project.id"> -->
    <ProjectList
      v-if="filteredProjectsCount > 0"
      :projects="filteredProjects"
      @delete="handleDelete"
      @complete="handleComplete"
      v-model:activeIndex="activeIndex"
    />
    <p v-else>Không có Project nào.</p>
    <!-- </div> -->
    <!-- </div> -->
  </div>
</template>

<script>
// import SingleProject from "@/components/SingleProject.vue";
import InputSearch from "@/components/InputSearch.vue";
import FilterNav from "@/components/FilterNav.vue";
import ProjectService from "@/services/project.service";
import ProjectList from "@/components/ProjectList.vue";

export default {
  name: "Home",
  components: {
    // SingleProject,
    ProjectList,
    FilterNav,
    InputSearch,
  },
  data() {
    return {
      projects: [],
      current: "all",
      activeIndex: -1,
      searchText: "",
    };
  },
  watch: {
    searchText() {
      this.activeIndex = -1;
    },
  },
  computed: {
    projectString() {
      return this.projects.map((project) => {
        const { title, details } = project;
        return [title, details].join("");
      });
    },
    filteredProjects() {
      if (this.current === "completed") {
        return this.projects.filter((project) => project.complete);
      }
      if (this.current === "ongoing") {
        return this.projects.filter((project) => !project.complete);
      }

      if (!this.searchText) return this.projects;

      return this.projects.filter((_project, index) =>
        this.projectString[index].includes(this.searchText)
      );
    },

    activeProject() {
      if (this.activeIndex < 0) return null;
      return this.filteredProjects[this.activeIndex];
    },
    filteredProjectsCount() {
      return this.filteredProjects.length;
    },
  },
  methods: {
    async retrieveProjects() {
      try {
        this.projects = await ProjectService.getAll();
      } catch (error) {
        console.log(error);
      }
    },
    handleDelete(id) {
      this.projects = this.projects.filter((project) => project._id !== id);
    },
    handleComplete(id) {
      let p = this.projects.find((project) => project._id === id);
      p.complete = !p.complete;
    },
    refreshList() {
      this.retrieveProjects();
      this.activeIndex = -1;
    },
  },
  mounted() {
    this.refreshList();
  },
};
</script>
