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
  }
}
</script>

<template>
<h1>Mot de passe oublié</h1>
  <div v-if="!pageClose">
    <p>Entrez votre email pour recevoir un lien afin de réinitialiser votre mot de passe</p>
    <form @submit.prevent="ask_reset">
      <label for="email">Email</label>
      <input type="email" id="email" class="editBox" v-model="email" required>
      <p class="error">{{message_email}}</p>
      <button type="submit">Demander la réinitialisation</button>
    </form>
  </div>
  <div v-else>
    <p>Votre demande a bien été prise en compte. Vous devriez recevoir un lien afin de poursuivre la réinitialisation. Ce lien sera valable durant une heure.</p>
    <RouterLink to="/">Retour à l'accueil</RouterLink>
  </div>
</template>

<style scoped>

</style>