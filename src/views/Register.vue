<template>
  <v-card v-if="!successful" class=" mx-auto" max-width="400" color="secondary">
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
          v-model="user.email"
          :rules="emailRules"
          label="E-mail"
          prepend-icon="mdi-email"
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
        @click="handleRegister"
        color="primary"
      >
        Sign Up
      </v-btn>
      <v-btn color="primary" @click="reset">Clear</v-btn>
    </v-card-actions>
  </v-card>
  <v-card v-else class=" mx-auto" max-width="400" color="secondary">
    <v-card-title>
      Sign up successful!!
    </v-card-title>
    <v-card-subtitle v-if="message">
      <v-alert dense type="success">
        {{ message }}
      </v-alert>
    </v-card-subtitle>
    <v-card-actions>
      <v-btn plain color="primary" href="/login">click here to login</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import User from '../models/user';

export default {
  name: 'Register',
  data() {
    return {
      user: new User('', '', ''),
      message: '',
      successful: false,
      valid: true,
      loading: false,

      usernameRules: [v => !!v || 'Name is required'],

      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length > 6) || 'Name must be atleast 6 characters'
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ]
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push('/profile');
    }
  },
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.message = '';
      this.loading = false;
      this.successful = false;
      this.$refs.form.reset();
      this.resetValidation();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    handleRegister() {
      this.message = '';
      this.loading = true;

      if (!this.$refs.form.validate()) {
        this.loading = false;
        return;
      }

      if (this.user.username && this.user.password && this.user.email) {
        this.$store.dispatch('auth/register', this.user).then(
          data => {
            this.message = data.message;
            this.successful = true;
          },
          error => {
            this.message =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
            this.successful = false;
            this.loading = false;
          }
        );
      }
    }
  }
};
</script>
