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
        this.$router.push('/post');
      } catch (error) {
        console.error(error);
      }
    }
  },
  mounted() {
    document.title="Connexion | PETS";
  }
}
</script>

<template>
  <div>
    <h1>Connexion</h1>
    <p>Identifiez-vous</p>
    <form @submit.prevent="login" class="login-form">
      <label for="identifier" class="editBox">Email / Nom d'utilisateur</label>
      <input type="text" id="identifier" v-model="identifier" required>
      <p class="error">{{message_identifier}}</p>
      <label for="password">Mot de passe</label>
      <div class="password-input">
        <input :type="passwordType" id="password" v-model="password" required>
      </div>
      <button type="button" @click="toggle_hide_password" class="password-toggle">
        {{ is_visible ? 'Masquer' : 'Afficher' }} le mot de passe
      </button>
      <p class="error">{{message_password}}</p>
      <button type="button" @click="$router.push('/forgotpassword')">Mot de passe oublié?</button>
      <button type="submit">Connexion</button>
    </form>
    <router-link to="/" class="back-button">Retour à la page d'accueil</router-link>
  </div>
</template>



<style scoped>
.login-form {
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
  margin-bottom: 10px;
}

.error {
  color: #ff0000;
  font-size: 0.9rem;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #333;
}

.editBox {
  width: 100%;
  box-sizing: border-box;
}

button[type="button"] {
  padding: 10px 20px;
  font-size: 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 10px;
  transition: background-color 0.3s ease;
}

button[type="button"]:hover {
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
}

.password-input {
  position: relative;
}

.password-input input {
  width: calc(100% - 40px);
}

.password-input button {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  padding: 5px 10px;
  font-size: 0.8rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.password-input button:hover {
  background-color: #0056b3;
}

.password-toggle {
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

.password-toggle:hover {
  background-color: #0056b3;
}

router-link {
  display: block;
  margin-top: 20px;
  text-align: center;
  color: #007bff;
  text-decoration: none;
}

.back-button {
  margin-top: 40px;
}
</style>
