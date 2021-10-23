<!-- views/NotFound.vue -->

<template>
  <v-card class=" mx-auto" max-width="600" color="secondary">
    <v-card-text>
      <p class="text-h4 text--primary">
        Page not found.
      </p>
      <v-divider></v-divider>
      <div class="text--primary">
        The page you are trying to get to never existed in this reality, or has
        migrated to a parallel universe.
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn text color="teal accent-4" href="/">
        Go home?
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  name: 'NotFound',
  data: () => ({})
};
</script>
