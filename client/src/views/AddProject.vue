<template>
  <ProjectForm :project="this.project" @submit:project="createProject" />
  <p>{{ message }}</p>
</template>

<script>

import ProjectService from "@/services/project.service";
import ProjectForm from "@/components/ProjectForm.vue";
export default {
  components: {
    ProjectForm,
  },
  data() {
    return {
      project: {},
      message: "",
    };
  },

  methods: {
    async createProject() {
      try {
        await ProjectService.create(this.project);
        // console.log(project)
        this.message = "Project được thêm thành công.";
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style>
form {
  background: #2f4765;
  padding: 20px;
  border-radius: 10px;
}
label {
  display: block;
  color: #bbb;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 1px;
  margin: 20px 0 10px 0;
}
input {
  font-family: "Open Sans", sans-serif;
  font-size: 16px;
  padding: 10px;
  border: 0;
  border-bottom: 2px solid #ddd;
  width: 100%;
  box-sizing: border-box;
  background-color: #2f4765;
  color: #bbb;
}
textarea {
  font-family: "Open Sans", sans-serif;
  font-size: 16px;
  background-color: #2f4765;
  border: 2px solid #ddd;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  height: 100px;
  color: #bbb;
}
form button {
  display: block;
  margin: 20px auto 0;
  background: #35df90;
  color: #fff;
  padding: 10px;
  border: 0;
  border-radius: 7px;
  font-size: 16px;
}
</style>
