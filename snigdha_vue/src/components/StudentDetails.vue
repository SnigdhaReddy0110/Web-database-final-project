<template>
  <div>
    <p>Age: {{ person.age }}</p>
    <p>Email: {{ person.email }}</p>
    <!-- Add other data points here -->
  </div>
</template>

<script>
export default {
  name: 'StudentDetails',
  props: {
    person: {
      type: Object,
      default: null,
    },
  },
};
</script>

<!-- Add styles as needed -->
