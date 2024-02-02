<script>
export default {
  data() {
    return {
      identifier: "",
      password: "",
      message_identifier: "",
      message_password: "",
      passwordType: "password",
      is_visible: false
    }
  },
  methods: {
    toggle_hide_password() {
      this.is_visible = !this.is_visible;
      this.passwordType = this.is_visible ? "text" : "password";
    },
    get_request() {
      if (this.identifier.includes("@")) {
        const request_body = {
          email: this.identifier,
          password: this.password
        }
        return request_body;
      } else {
        const request_body = {
          username: this.identifier,
          password: this.password
        }
        return request_body;
      }
    },
    async login() {
      // check if it's the username or the email
      const request_body = this.get_request();
    try {
      const request = await fetch("http://localhost:8800/api/auth/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(request_body)
      });
      if (request.status===404) {
        this.message_identifier="Nom d'utilisateur ou Email incorrecte";
        return
      }
      else if (request.status===403) {
        this.message_password="Mot de passe incorrecte.";
        return;
      }
      const response = await request.json();
      sessionStorage.setItem("user_token", response.token);
      sessionStorage.setItem("username", response.username);
      this.$router.push('/home');
    } catch (error) {
      console.error(error);
    }
  }
  }
}

</script>

<template>
  <h1>Connexion</h1>
  <p>Identifiez-vous</p>
  <form @submit.prevent="login">
    <label for="identifier" class="editBox">Email / nom d'utilisateur</label>
    <input type="text" id="identifier" v-model="identifier" required>
    <p>{{message_identifier}}</p>
    <label for="password">Mot de passe</label>
    <input :type="passwordType" id="password" v-model="password" required>
    <button type="button" @click="toggle_hide_password">
      {{ is_visible ? 'Masquer' : 'Afficher' }} le mot de passe
    </button>
    <p>{{message_password}}</p>
    <button type="submit">Connexion</button>
  </form>
</template>

<style scoped>

</style>