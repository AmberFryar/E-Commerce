<template>
  <div id="login">
    <form v-on:submit.prevent="login">
      <h1>Please Sign In</h1>
      <div id="fields">
        <div id="username">
          <label for="username">Username</label>
          <input type="text" id="username" placeholder="Username" v-model="user.username" required autofocus />
        </div>
        <div id="password">
          <label for="password">Password</label>
          <input type="password" id="password" placeholder="Password" v-model="user.password" required />
        </div>
        <div>
          <button type="submit">Sign in</button>
        </div>
      </div>
      Need an account? <router-link v-bind:to="{ name: 'register' }">Register!</router-link>

    </form>
  </div>

</template>

<script>
import authService from "../services/AuthService";


export default {

  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      authService
        .login(this.user)
        .then((response) => {
          if (response.status == 200) {
            this.$store.commit("SET_AUTH_TOKEN", response.data.token);
            this.$store.commit("SET_USER", response.data.user);
            this.$router.push("/");
          }
        })
        .catch((error) => {
          const response = error.response;
          if (!response) {
            alert(error);
          } else if (response.status === 401) {
            alert("Invalid username and password!");
          } else {
            alert(response.message);
          }
        });
    },
  },
};
</script>

<style scoped>
* {
  background-color: rgb(153, 177, 188);
  color: rgb(7, 7, 39)
}

  #fields {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}

#username {
  margin: 10px;
}

#password {
  margin: 10px;
}

button {
  margin: 10px;
  background-color: rgb(7, 7, 39);
  color: rgb(153, 177, 188)

}</style>
