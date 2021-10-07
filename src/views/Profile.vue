<template>
  <v-card class="mx-auto" max-width="1044" color="secondary">
    <v-img
      class="white--text align-end"
      height="200px"
      src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
    >
      <v-card-title
        ><strong>{{ currentUser.username }}</strong>
      </v-card-title>
    </v-img>
    <v-card-subtitle class="pb-0">
      <strong>Id:</strong>{{ currentUser.id }}
    </v-card-subtitle>
    <v-card-text class="text--primary">
      <v-divider></v-divider>
      <div><strong>Email:</strong>{{ currentUser.email }}</div>
      <div>
        <strong>Authorities:</strong>

        <v-list-item v-for="(role, index) in currentUser.roles" :key="index">
          <v-list-item-content>
            <v-list-item-title>{{ role }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </div>
    </v-card-text>
    <v-chip class="ma-2" x-small>
      <strong>Token:</strong>{{ currentUser.accessToken }}
    </v-chip>
  </v-card>
</template>

<script>
export default {
  name: 'Profile',
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  }
};
</script>
