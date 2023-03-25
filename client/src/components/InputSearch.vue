<script>
export default {
  props: {
    modelValue: { type: String, default: "" },
  },
  emits: ["submit", "update:modelValue"],
  methods: {
    updateModelValue(e) {
      this.$emit("update:modelValue", e.target.value);
    },
    submit() {
      this.$emit("submit");
    },
  },
};
</script>

<template>
  <div>
    <input
      type="text"
      placeholder="Nhập thông tin cần tìm"
      :value="modelValue"
      @input="updateModelValue"
      @keyup.enter="submit"
    />
    <!-- <div class="input-group-append">
      <button class="btn btn-outline-secondary" type="button" @click="submit">
        <i class="fas fa-search"></i> Tìm kiếm
      </button>
    </div> -->
  </div>
</template>

<style>
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
.form-control {
  background-color: #2f4765;
}
</style>
