<template>
  <Form @submit="submitProject" :validation-schema="projectFormSchema">
    <div class="form-group">
      <label>Title: </label>
      <Field
        name="title"
        type="text"
        v-model="projectLocal.title"
      />
      <ErrorMessage name="title" class="error-feedback" />
    </div>
    <div class="form-group">
      <label>Details: </label>
      <textarea
        name="details"
        type="text"
        v-model="projectLocal.details"
      ></textarea>
      <ErrorMessage name="details" class="error-feedback" />
    </div>

    <div class="form-group">
      <button class="btn btn-primary">Lưu</button>
    </div>
  </Form>
</template>
<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  emits: ["submit:project"],
  props: {
    project: { type: Object, required: true },
  },
  data() {
    const projectFormSchema = yup.object().shape({
      title: yup
        .string()
        .required("Title phải có giá trị.")
        .min(2, "Title phải ít nhất 2 ký tự.")
        .max(50, "Title có nhiều nhất 50 ký tự."),
      details: yup.string()
    });
    return {
      // Chúng ta sẽ không muốn hiệu chỉnh props, nên tạo biến cục bộ
      // projectLocal để liên kết với các input trên form
      projectLocal: this.project,
      projectFormSchema,
    };
  },
  methods: {
    submitProject() {
      this.$emit("submit:project", this.projectLocal);
    },
  },
};
</script>
