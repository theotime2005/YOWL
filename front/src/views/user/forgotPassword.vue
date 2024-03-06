<script>
export default {
  data() {
    return {
      pageClose: false,
      email: "",
      message_email: ""
    }
  }, methods: {
    async ask_reset() {
      const request_body = {
        email: this.email
      };
      try {
        const request = await fetch("http://localhost:8800/api/auth/resetpassword", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(request_body)
        });
        if (request.status===200) {
          this.pageClose = true
          return
        } else if (request.status===404) {
          this.message_email="Votre email n'est pas enregistré.";
        }
      } catch (error) {
        console.error(error)
        this.message_email="Erreur du serveur, veuillez réessayer ultérieurement"
      }
    }
  },
  mounted() {
    document.title="Mot de passe oublié | PETS";
  }
}
</script>

<template>
  <div>
    <h1>Mot de passe oublié</h1>
    <div v-if="!pageClose">
      <p>Entrez votre email pour recevoir un lien afin de réinitialiser votre mot de passe</p>
      <form @submit.prevent="ask_reset">
        <label for="email">Email</label>
        <input type="email" id="email" class="editBox" v-model="email" required>
        <p class="error">{{message_email}}</p>
          <button type="submit" class="reset-button">Demander la réinitialisation</button>
      </form>
    </div>
    <div v-else>
      <p>Votre demande a bien été prise en compte. Vous devriez recevoir un lien afin de poursuivre la réinitialisation. Ce lien sera valable durant une heure.</p>
      <router-link to="/" class="home-button">Retour à l'accueil</router-link>
    </div>
  </div>
</template>

<style scoped>
.reset-button {
  width: 100%;
  padding: 10px 20px;
  font-size: 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.3s ease;
}

.reset-button:hover {
  background-color: #0056b3;
}

.home-button {
  display: block;
  margin-top: 20px;
  text-align: center;
  color: #007bff;
  text-decoration: none;
}
</style>

