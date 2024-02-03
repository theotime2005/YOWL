<script>
import Password from "@/components/Password.vue";

export default {
  components: {
    Password
  },
  data() {
    return {
      username: "",
      email: "",
      password: ""
    }
  },
  methods: {
    async confirm_registration() {
      const isValid = this.$refs.password.valid_passwords(); // Accès au composant Password via $refs
      if (!isValid) {
        return;
      }
      this.password=this.$refs.password.password_1;
      console.log("Password: ", this.password);
      try {
        const request_body = {
          email: this.email,
          username: this.username,
          password: this.password
        };
        const request = await fetch("http://localhost:8800/api/auth/register", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(request_body)
        });
        if (request.status === 200) {
          console.log("Inscription réussie.");
          this.$router.push('/login');
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
}
</script>

<template>
  <div>
    <h1>Créer un compte</h1>
    <p>Renseignez les champs suivants:</p>
    <form @submit.prevent="confirm_registration">
      <label for="username">Nom d'utilisateur</label>
      <input type="text" id="username" class="editBox" v-model="username" required>
      <label for="email">Email</label>
      <input type="email" class="editBox" id="email" v-model="email" required>
      <Password ref="password"/>
      <button type="submit">Créer mon compte</button>
    </form>
  </div>
</template>

<style scoped>
</style>
