<script>
export default {
  data() {
    return {
      isVisible: true,
      is_valide: false,
      number_1: Math.floor(Math.random()*9) + 1,
      number_2: Math.floor(Math.random()*9) + 1,
      result: 0,
      error: ""
    }
  },
  methods: {
    check_capchat() {
      this.error="";
      if (this.number_2+this.number_1===this.result) {
        this.is_valide=true;
        this.isVisible=false;
      } else {
        this.error="FAUX!!!";
        this.number_1=Math.floor(Math.random()*9) + 1;
        this.number_2=Math.floor(Math.random()*9) + 1;
      }
    }
  }
}
</script>

<template>
  <div v-if="isVisible">
    <label for="question">Combient font {{number_1}} + {{number_2}} ?</label>
    <input type="number" id="question" v-model="result" required>
    <p>{{error}}</p>
    <button type="button" @click="check_capchat">Valider</button>
  </div>
  <div v-else>
    <p>Capchat validé.</p>
  </div>
</template>

<style scoped>

</style>