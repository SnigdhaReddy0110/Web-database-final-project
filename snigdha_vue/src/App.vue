<template>
  <div id="app">
    <h1>Student Information</h1>
    <DropdownMenu :students="students" @select="selectStudent" />
    <StudentList :student="selectedStudent" />
  </div>
</template>

<!-- ... -->

<style>
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600&display=swap');

  #app {
    font-family: 'Orbitron', sans-serif;
    background: linear-gradient(145deg, #0f2027, #203a43, #2c5364);
    color: #f5f5f5;
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
  }
  h1 {
    margin-bottom: 2rem;
  }
</style>



<!-- ... -->

<script>
import DropdownMenu from './components/DropdownMenu.vue';
import StudentList from './components/StudentList.vue';

export default {
  name: 'App',
  components: {
    DropdownMenu,
    StudentList,
  },
  data() {
    return {
      students: [],
      selectedStudent: null,
    };
  },
  async created() {
    await this.fetchStudents();
  },
  methods: {
    async fetchStudents() {
      const apiUrl = 'https://snigdha-node.onrender.com/api';

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        this.students = data;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    selectStudent(student) {
      this.selectedStudent = student;
    },
  },
};
</script>
