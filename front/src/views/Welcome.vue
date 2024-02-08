<script>
export default {
  mounted() {
    document.title="Bienvenu sur le site | PETS";
  }
}
</script>

<template>
  <div class="container">
    <h1>Bienvenue sur le site Pets</h1>
    <p>Pour utiliser le site, connectez-vous ou créez un compte.</p>
    <button @click="$router.push('/login')">Se connecter</button>
    <button @click="$router.push('/register')">Créer un compte</button>
  </div>
</template>

<style scoped>

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}


.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}


h1 {
  color: #333;
  font-size: 2.5rem;
  margin-bottom: 20px;
}


p {
  color: #666;
  font-size: 1.2rem;
  margin-bottom: 20px;
  text-align: center;
}


button {
  padding: 10px 20px;
  font-size: 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}
</style>
