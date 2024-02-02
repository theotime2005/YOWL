<script>
export default {
  data() {
    return {
      password_1: "",
      password_2: "",
      is_visible_1: false,
      is_visible_2: false,
      passwordType_1: "password",
      passwordType_2: "password"
    }
  },
  methods: {
    toggle_hide_password_1() {
      this.is_visible_1 = !this.is_visible_1;
      this.passwordType_1 = this.is_visible_1 ? "text" : "password";
    },
    toggle_hide_password_2() {
      this.is_visible_2 = !this.is_visible_2;
      this.passwordType_2 = this.is_visible_2 ? "text" : "password";
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
    valid_passwords() {
      if (this.password_1 === this.password_2 && this.verifierMotDePasse(this.password_1)) {
        console.log("Mot de passe valide");
        return true;
      } else {
        console.log("Mot de passe invalide");
        return false;
      }
    }
  }
}
</script>

<template>
  <div>
    <label for="password">Mot de passe</label>
    <input :type="passwordType_1" id="password" v-model="password_1" required>
    <button type="button" @click="toggle_hide_password_1">
      {{ is_visible_1 ? 'Masquer' : 'Afficher' }} le mot de passe
    </button>
    <label for="confirm_password">Confirmer votre mot de passe</label>
    <input :type="passwordType_2" id="confirm_password" v-model="password_2" required>
    <button type="button" @click="toggle_hide_password_2">
      {{ is_visible_2 ? 'Masquer' : 'Afficher' }} le mot de passe
    </button>
    <p>{{ valid_passwords() ? 'Mot de passe valide' : 'Mot de passe invalide' }}</p>
    <p>Votre mot de passe doit comporter au moins 10 caractères dont une majuscule, une minuscule, un chiffre et un symbole.</p>
  </div>
</template>

<style scoped>
</style>
