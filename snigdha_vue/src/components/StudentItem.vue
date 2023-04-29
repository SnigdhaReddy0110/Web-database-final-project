<template>
  <div>
    <h3>{{ person.name }}</h3>
    <StudentDetails :person="person" />
  </div>
</template>

<script>
import StudentDetails from './StudentDetails.vue';

export default {
  name: 'StudentItem',
  components: {
    StudentDetails,
  },
  props: {
    person: {
      type: Object,
      default: null,
    },
  },
};
</script>

<!-- Add styles as needed -->
