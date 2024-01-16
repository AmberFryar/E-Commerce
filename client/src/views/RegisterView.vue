<template>
  <div id="register">
    <form id="form" v-on:submit.prevent="register">
      <h1>Create Account</h1>
      <div id="fields">
        <div id="username">
          <label for="username">Username</label>
          <input type="text" id="username" placeholder="Username" v-model="user.username" required autofocus />
        </div>
        <div id="name">
          <label for="name">Name</label>
          <input type="text" id="name" placeholder="Name" v-model="user.name" required />
        </div>
        <div id="password">
          <label for="password">Password</label>
          <input type="password" id="password" placeholder="Password" v-model="user.password" required />
        </div>
        <div id="confirmPassword">
          <label for="confirmPassword">Confirm password</label>
          <input type="password" id="confirmPassword" placeholder="Confirm Password" v-model="user.confirmPassword"
            required />
        </div>
        <div id="address">
          <label for="address">Address</label>
          <input type="text" id="address" placeholder="Address" v-model="user.address" />
        </div>
        <div id="city">
          <label for="city">City</label>
          <input type="text" id="city" placeholder="City" v-model="user.city" />
        </div>
        <div id="state">
          <label for="state">State</label>
          <input type="text" id="state" placeholder="State" v-model="user.stateCode" maxlength="2" required />
        </div>
        <div id="zip">
          <label for="zip">ZIP</label>
          <input type="number" id="zip" placeholder="ZIP" v-model="user.zip" required minlength="5" maxlength="5" />
        </div>
      </div>
      <div></div>
      <div id="createBtn">
        <button type="submit">Create Account</button>
      </div>
      <div id="account">
        Have an account?
        <router-link v-bind:to="{ name: 'login' }">Sign in!</router-link>
      </div>
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
        name: "",
        password: "",
        confirmPassword: "",
        address: "",
        city: "",
        stateCode: "",
        zip: "",
        role: "user",
      },
    };
  },
  methods: {
    error(msg) {
      alert(msg);
    },
    success(msg) {
      alert(msg);
    },
    register() {
      if (this.user.password != this.user.confirmPassword) {
        this.error("Password & Confirm Password do not match");
      } else {
        authService
          .register(this.user)
          .then((response) => {
            if (response.status == 201) {
              this.success("Thank you for registering, please sign in.");
              this.$router.push({
                path: "/login",
              });
            }
          })
          .catch((error) => {
            const response = error.response;
            if (!response) {
              this.error(error);
            } else if (response.status === 400) {
              if (response.data.errors) {
                // Show the validation errors
                let msg = "Validation error: ";
                for (let err of response.data.errors) {
                  msg += `'${err.field}':${err.defaultMessage}. `;
                }
                this.error(msg);
              } else {
                this.error(response.data.message);
              }
            } else {
              this.error(response.data.message);
            }
          });
      }
    },
  },
};
</script>

<style scoped>
* {
  color: rgb(7, 7, 39);

}

#register {
  padding: 15px
}

label {
  padding: 15px
}

input {
  margin: 5px;

}

#form {
  display: grid;
  grid-template-columns: .5fr .75fr 1fr;
  grid-template-rows: auto;
  grid-template-areas:
    "create fields account"
    "  .     btn      .   "
}

h1 {
  grid-area: create;

}

#fields {
  display: flex;
  flex-direction: column;
  grid-area: fields;
  align-content: flex-end;
  align-items: flex-end;
  justify-content: space-between;
  padding: 10px;
}

#createBtn {
  display: flex;
  justify-content: center;
  grid-area: btn;

  padding: 15px;
}

#account {
  grid-area: account;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
