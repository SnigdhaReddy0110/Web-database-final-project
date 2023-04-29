<template>

<div class="search-bar">
  <div>
    <select v-model="selectedStudent" @change="handleSelect">
      <option disabled value="">Please select a student</option>
      <option v-for="student in students" :key="student._id" :value="student">
        {{ student.student_name }}
      </option>
    </select>
  </div>

</div>

</template>

<!-- ... -->

<!-- ... -->

<style>
  select {
    width: 100%;
    padding: 8px 16px;
    font-size: 16px;
    border-radius: 4px;
    border: 1px solid #6DD5FA;
    background-color: #0F2027;
    color: #f5f5f5;
    appearance: none;
  }
</style>




<script>
export default {
  name: 'DropdownMenu',
  props: {
    students: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      selectedStudent: null,
    };
  },
  methods: {
    handleSelect() {
      this.$emit('select', this.selectedStudent);
    },
  },
};
</script>
