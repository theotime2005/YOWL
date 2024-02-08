<template>
  <div>
    <h1>Créer un compte</h1>
    <p>Renseignez les champs suivants:</p>
    <form @submit.prevent="confirm_registration" class="register-form">
      <label for="username">Nom d'utilisateur</label>
      <input type="text" id="username" class="editBox" v-model="username" required>
      <label for="email">Email</label>
      <input type="email" class="editBox" id="email" v-model="email" required>
      <label for="password">Mot de passe</label>
      <div class="password-input">
        <input type="password" class="editBox" id="password" v-model="password" required>
        <button type="button" @click="togglePasswordVisibility">Afficher/Masquer</button>
      </div>
      <label for="confirmPassword">Confirmer mot de passe</label>
      <div class="password-input">
        <input type="password" class="editBox" id="confirmPassword" v-model="confirmPassword" required>
        <button type="button" @click="toggleConfirmPasswordVisibility">Afficher/Masquer</button>
      </div>
      <hr>
      <Capchat ref="capchat"/>
      <hr>
      <button type="submit">Créer mon compte</button>
    </form>
    <router-link to="/">Retour à la page d'accueil</router-link>
  </div>
</template>

<script>
import { RouterLink } from "vue-router";
import Capchat from "@/components/Capchat.vue";
import Password from "@/components/Password.vue";

export default {
  components: {
    Capchat,
    Password
  },
  data() {
    return {
      username: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  },
  methods: {
    async confirm_registration() {
      const isValid = this.$refs.password.valid_passwords();
      if (!isValid) {
        return;
      } else if (!this.$refs.capchat.is_valide) {
        return;
      }
      this.password = this.$refs.password.password_1;
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

<style scoped>
.register-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
}

h1 {
  color: #333;
  font-size: 2rem;
  margin-bottom: 20px;
}

p {
  color: #666;
  font-size: 1.2rem;
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #333;
}

.editBox {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}

.password-input button {
  padding: 5px 10px;
  font-size: 0.8rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-bottom: 10px;
}

.password-input button:hover {
  background-color: #0056b3;
}

button[type="submit"] {
  padding: 10px 20px;
  font-size: 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button[type="submit"]:hover {
  background-color: #0056b3;
  margin-bottom: 50px;
}

hr {
  border: 0;
  border-top: 1px solid #ccc;
  margin: 20px 0;
}


router-link {
  display: block;
  margin-top: 20px;
  text-align: center;
  color: #007bff;
}
</style>
