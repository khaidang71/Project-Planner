<script>
import ProjectService from "@/services/project.service";

export default {
  props: {
    projects: { type: Array, default: [] },
    activeIndex: { type: Number, default: -1 },
    showDetails: true,
    id: "",
  },
  emits: ["update: activeIndex"],

  methods: {
    updateActiveIndex(index) {
      this.$emit("update:activeIndex", index);
    },
    async deleteProject(project) {
      try {
        await ProjectService.delete(project._id);
        location.reload();
      } catch (error) {
        console.log(error);
      }
    },
    async toggleComplete(project) {
      const data = {
        title: project.title,
        details: project.details,
        complete: !project.complete,
      };
      try {
        await ProjectService.update(project._id, data);
        location.reload();
        // console.log(project)
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<template>
  <ul class="list-group">
    <li
      class="list-group-item project"
      v-for="(project, index) in projects"
      :key="project._id"
      :class="
        ({ active: index === activeIndex }, { complete: project.complete })
      "
      @click="updateActiveIndex(index)"
    >
      <div class="actions">
        <h3 @click="(showDetails = !showDetails), (id = project._id)">
          {{ project.title }}
        </h3>
        <div class="icons">
          <router-link
            :to="{ name: 'EditProject', params: { id: project._id } }"
            ><span class="material-symbols-outlined">edit</span></router-link
          >
          <span
            @click="toggleComplete(project)"
            class="material-symbols-outlined tick"
            >done</span
          >
          <span
            @click="deleteProject(project)"
            class="material-symbols-outlined delete"
            >delete</span
          >
        </div>
      </div>
      <div v-if="showDetails && id === project._id" class="details">
        <p>{{ project.details }}</p>
      </div>
    </li>
  </ul>
</template>

<style>
.project {
  margin-top: 20px;
  margin-bottom: 20px;
  background: #2f4765;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  box-shadow: 0 0px 5px 4px #ea4f30;
}
h3 {
  cursor: pointer;
}
.actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.material-symbols-outlined {
  font-size: 24px;
  margin-left: 10px;
  color: #bbb;
  cursor: pointer;
}
.material-symbols-outlined:hover {
  color: #777;
}
.delete:hover {
  color: #ea4f30;
}
.project.complete {
  box-shadow: 0 0px 5px 4px rgb(43, 206, 135);
}
.project.complete .tick {
  color: #35df90;
}
</style>
