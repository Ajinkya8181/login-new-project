<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="login">
      <input v-model="username" type="text" placeholder="Username" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    async login() {
      try {
        await this.$store.dispatch('login', { username: this.username, password: this.password });
        this.$router.push('/tasks');
      } catch (error) {
        console.error('Login failed:', error);
      }
    },
  },
};
</script>
