<template>
  <v-card class=" mx-auto" max-width="400" color="secondary">
    <v-card-title>
      Login
    </v-card-title>
    <v-card-subtitle v-if="message">
      <v-alert dense dismissible type="error">
        {{ message }}
      </v-alert>
    </v-card-subtitle>
    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="user.username"
          :rules="usernameRules"
          label="User name"
          type="text"
          prepend-icon="mdi-account"
          required
        >
        </v-text-field>

        <v-text-field
          v-model="user.password"
          :rules="passwordRules"
          type="password"
          label="password"
          prepend-icon="mdi-lock"
          required
        >
        </v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        :loading="loading"
        :disabled="loading"
        @click="handleLogin"
        color="primary"
      >
        Login
      </v-btn>
      <v-btn color="primary" @click="reset">Clear</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import User from '../models/user';

export default {
  name: 'Login',
  data: () => ({
    user: new User('', ''),
    message: '',
    valid: true,
    loading: false,
    //username: '',
    usernameRules: [v => !!v || 'Name is required'],
    //password: '',
    passwordRules: [v => !!v || 'Password is required']
  }),

  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  created() {
    if (this.loggedIn) {
      this.$router.push('/profile');
    }
  },

  methods: {
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.message = ''
      this.loading = false;
      this.$refs.form.reset();
      this.resetValidation();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    handleLogin() {
      
      this.loading = true;

      if (!this.$refs.form.validate()) {
        this.loading = false;
        return;
      }

      if (this.user.username && this.user.password) {
        this.$store.dispatch('auth/login', this.user).then(
          () => {
            this.$router.push('/profile');
          },
          error => {
            this.loading = false;
            this.message =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
          }
        );
      }
    }
  }
};
</script>
