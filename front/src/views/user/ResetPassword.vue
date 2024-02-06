<script>
import Capchat from "@/components/Capchat.vue";
import Password from "@/components/Password.vue";
export default {
  components: {
    Capchat,
    Password
  },
  data() {
    return {
      is_valid: false,
      pageClose: false,
      password: ""
    }
  },
  methods: {
    async check_token() {
      try {
        const request = await fetch("http://localhost:8800/api/auth/check-token", {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${this.$route.query.token}`
          }
        });
        if (request.status===200) {
          this.is_valid=true;
        }
      } catch (error) {
        console.error(error);
      }
    },
    async change_password() {
      if (!this.$refs.password.valid_passwords() || !this.$refs.capchat.is_valide) {
        return;
      }
      this.password = this.$refs.password.password_1;
      const request_body = {
        password: this.password
      };
      try {
        const request = await fetch("http://localhost:8800/api/users", {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.$route.query.token}`
          },
          body: JSON.stringify(request_body)
        });
        if (request.status===200) {
          this.pageClose=true;
        }
      } catch (error) {
        console.error(error)
      }
    }
  },
  mounted() {
    this.check_token();
  }
}
</script>

<template>
  <h1>Réinitialisation du mot de passe</h1>
  <form v-if="!pageClose && is_valid==true" @submit.prevent="change_password">
    <p>Veuillez remplir tous les champs</p>
    <Password ref="password"/>
    <hr>
    <Capchat ref="capchat"/>
    <button type="submit">Réinitialiser</button>
  </form>
  <div v-else-if="!is_valid">
    <p>Votre session a expirée. Demandez à nouveau la réinitialisation.</p>
    <RouterLink to="/login">Retour à la page de connexion</RouterLink>
  </div>
  <div v-else-if="pageClose">
    <p>Votre mot de passe a été réinitialisé. Vous pouvez à nouveau vous connecter.</p>
    <RouterLink to="/login">Retour à la page de connexion</RouterLink>
  </div>
</template>

<style scoped>

</style>