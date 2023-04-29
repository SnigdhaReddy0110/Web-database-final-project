<template>
  <div class="student-list">
    <table v-if="student">
      <tr>
        <th>Name</th>
        <td>{{ student.student_name }}</td>
      </tr>
      <tr>
        <th>Age</th>
        <td>{{ student.student_age }}</td>
      </tr>
      <tr>
        <th>Major</th>
        <td>{{ student.major }}</td>
      </tr>
      <tr>
        <th>Gender</th>
        <td>{{ student.student_gender }}</td>
      </tr>
      <tr>
        <th>Subjects per semester</th>
        <td>{{ student.no_of_subjects_per_semester }}</td>
      </tr>
    </table>
    <p v-else>Select a student to view details.</p>
  </div>
</template>

<!-- ... -->

<!-- ... -->

<style>
  h3 {
    font-size: 24px;
    margin-bottom: 1rem;
  }
  p {
    margin-bottom: 0.5rem;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 1rem;
  }
  th, td {
    padding: 0.5rem;
    text-align: left;
    border-bottom: 1px solid #6DD5FA;
  }
  th {
    font-weight: bold;
  }
</style>



<script>
export default {
  name: 'StudentList',
  props: {
    student: {
      type: Object,
      default: null,
    },
  },
};
</script>
