<script>
export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
      error_password: "",
      is_visible: false,
      passwordType: "password" // Ajout d'une variable pour stocker le type de mot de passe
    }
  },
  methods: {
    toggle_hide_password() {
      this.is_visible = !this.is_visible;
      this.passwordType = this.is_visible ? "text" : "password";
    },
    verifierMotDePasse(chaine) {
      // Vérifier la longueur minimale
      if (chaine.length < 10) {
        return false;
      }

      // Vérifier la présence d'au moins une majuscule et une minuscule
      let contientMajuscule = false;
      let contientMinuscule = false;
      for (let i = 0; i < chaine.length; i++) {
        if (chaine[i] >= 'A' && chaine[i] <= 'Z') {
          contientMajuscule = true;
        } else if (chaine[i] >= 'a' && chaine[i] <= 'z') {
          contientMinuscule = true;
        }
      }
      if (!contientMajuscule || !contientMinuscule) {
        return false;
      }

      // Vérifier la présence d'au moins un chiffre
      let contientChiffre = /\d/.test(chaine);
      if (!contientChiffre) {
        return false;
      }

      // Vérifier la présence d'au moins un symbole
      let contientSymbole = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(chaine);
      if (!contientSymbole) {
        return false;
      }

      // Si tous les critères sont respectés, retourner true
      return true;
    },
    async confirm_registration() {
      // On vide tous les messages
      this.error_password="";
      if (!this.verifierMotDePasse(this.password)) {
        this.error_password="Votre mot de passe ne respecte pas les caractéristiques demandés.";
        return
      }
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
        if (request.status===200) {
          console.log("Registration sucessfull.");
          this.$router.push('/login');
        }
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>

<template>
  <h1>Créer un compte</h1>
  <p>Renseignez les champs suivants:</p>
  <form @submit.prevent="confirm_registration">
    <label for="username">Nom d'utilisateur</label>
    <input type="text" id="username" class="editBox" v-model="username" required>
    <label for="email">Email</label>
    <input type="email" class="editBox" id="email" v-model="email" required>
    <label for="password">Mot de passe</label>
    <input :type="passwordType" class="editBox" id="password" v-model="password" required>
    <button type="button" @click="toggle_hide_password">
      {{ is_visible ? 'Masquer' : 'Afficher' }} le mot de passe
    </button>
    <p class="error">{{error_password}}</p>
    <hr>
    <p>Votre mot de passe doit comporter au moins 10 caractères dont une majuscule, une minuscule, un chiffre et un symbole.</p>
    <button type="submit">Créer mon compte</button>
  </form>
</template>

<style scoped>

</style>
