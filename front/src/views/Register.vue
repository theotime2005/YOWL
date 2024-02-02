<script>
export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
      is_visible: false,
      passwordType: "password" // Ajout d'une variable pour stocker le type de mot de passe
    }
  },
  methods: {
    toggle_hide_password() {
      this.is_visible = !this.is_visible;
      this.passwordType = this.is_visible ? "text" : "password";
    }
  }
}
</script>

<template>
  <h1>Créer un compte</h1>
  <p>Renseignez les champs suivants:</p>
  <form @submit.prevent>
    <label for="username">Nom d'utilisateur</label>
    <input type="text" id="username" class="editBox" v-model="username" required>
    <label for="email">Email</label>
    <input type="email" class="editBox" id="email" v-model="email" required>
    <label for="password">Mot de passe</label>
    <input :type="passwordType" class="editBox" id="password" v-model="password" required>
    <button @click="toggle_hide_password">
      {{ is_visible ? 'Masquer' : 'Afficher' }} le mot de passe
    </button>
    <p>Votre mot de passe doit comporter au moins 10 caractères dont une majuscule, une minuscule, un chiffre et un symbole.</p>
  </form>
</template>

<style scoped>

</style>
