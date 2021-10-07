<template>
  <v-app-bar
    :clipped-left="$vuetify.breakpoint.lgAndUp"
    app="app"
    color="primary"
    dark="dark"
  >
    <v-app-bar-nav-icon @click.stop="hideMenues" />
    <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
      <span class="hidden-sm-and-down">Stock manager</span>
    </v-toolbar-title>
    <v-spacer />
    <v-menu left bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on">
          <v-icon>$profile</v-icon>
        </v-btn>
      </template>

      <v-list v-if="currentUser">
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          link
          :to="item.link"
          @click.prevent="item.method"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ item.text }}</v-list-item-title>
        </v-list-item>
      </v-list>

      <v-list v-else>
        <v-list-item
          v-for="(item, i) in notLoggedinItems"
          :key="i"
          link
          :to="item.link"
          @click.prevent="item.method"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ item.text }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>
<script>
export default {
  name: 'Header',
  methods: {
    logout() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    },
    profile() {
      alert('profile');
    }
  },
  data() {
    return {
      items: [
        {
          icon: '$user',
          text: 'Profile',
          link: '/profile',
          method: ''
        },
        {
          icon: '$signout',
          text: 'Logout',
          link: '/logout',
          method: this.logout
        }
      ],
      notLoggedinItems: [
        {
          icon: '$register',
          text: 'Register',
          link: '/register',
          method: ''
        },
        {
          icon: '$signin',
          text: 'Login',
          link: '/signup',
          method: ''
        }
      ]
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  }
};
</script>
