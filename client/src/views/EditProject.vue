<template>
  <ProjectForm :project="this.project" @submit:project="updateProject" />
  <p>{{ message }}</p>
</template>
<script>
import ProjectForm from "@/components/ProjectForm.vue";
import ProjectService from "@/services/project.service";
export default {
  props: {
    id: { type: String, required: true },
  },
  components: {
    ProjectForm,
  },
  data() {
    return {
      project: null,
      message: "",
    };
  },
  mounted() {
    fetch(this.uri)
      .then((res) => res.json())
      .then((data) => {
        (this.title = data.title), (this.details = data.details);
      });
  },
  methods: {
    async getProject(id) {
      try {
        this.project = await ProjectService.get(id);
      } catch (error) {
        console.log(error);
        // Chuyển sang trang NotFound đồng thời giữ cho URL không đổi
        this.$router.push({
          name: "notfound",
          params: {
            pathMatch: this.$route.path.split("/").slice(1),
          },
          query: this.$route.query,
          hash: this.$route.hash,
        });
      }
    },
    async updateProject(data) {
      try {
        await ProjectService.update(this.project._id, data);
        this.message = "Project được cập nhật thành công.";
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.getProject(this.id);
    this.message = "";
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
  padding: 10px;
  font-family: "Open Sans", sans-serif;
  font-size: 16px;
  background-color: #2f4765;
  color: #bbb;
  border: 0;
  border-bottom: 2px solid #ddd;
  width: 100%;
  box-sizing: border-box;
}
textarea {
  font-family: "Open Sans", sans-serif;
  font-size: 16px;
  border-style: none;
  background-color: #2f4765;
  border-bottom: 2px solid #ddd;
  color: #bbb;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  height: 100px;
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
