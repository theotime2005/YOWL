<template>
  <div class="posts-container">
    <h2>Liste des publications</h2>
    <div v-if="posts.length === 0">
      <p>Aucune publication trouvée.</p>
    </div>
    <div v-else>
      <div v-for="post in posts" :key="post._id" class="post">
        <div class="post-header">
          <p class="username">{{ post.username }}</p>
        </div>
        <div class="post-body">
          <p class="description">{{ post.description }}</p>
          <img v-if="post.image" :src="post.image" alt="Post image" class="post-image">
        </div>
      </div>
    </div>
    <button @click="openPostForm">Nouvelle publication</button>
    <div v-if="showPostForm" class="post-form-container">
      <form @submit.prevent="submitPost">
        <label>Description:</label>
        <textarea v-model="newPost.description" required></textarea>
        <label>Image (URL):</label>
        <input type="text" v-model="newPost.image">
        <button type="submit">Poster</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      posts: [],
      showPostForm: false,
      newPost: {
        description: '',
        image: ''
      },
      token: sessionStorage.getItem('user_token')
    };
  },
  mounted() {
    this.fetchPosts();
  },
  methods: {
    fetchPosts() {
      fetch('http://localhost:8800/api/posts', {
        headers: {
          'Authorization': `Bearer ${this.token}`
        }
      })
          .then(response => {
            if (!response.ok) {
              throw new Error('Erreur lors de la récupération des publications');
            }
            return response.json();
          })
          .then(data => {
            this.posts = data;
          })
          .catch(error => {
            console.error('Une erreur s\'est produite lors de la récupération des publications :', error);
          });
    },
    openPostForm() {
      this.showPostForm = true;
    },
    submitPost() {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`
        },
        body: JSON.stringify(this.newPost)
      };
      fetch('http://localhost:8800/api/posts', requestOptions)
          .then(response => {
            if (!response.ok) {
              throw new Error('Erreur lors de la création de la publication');
            }
            return response.json();
          })
          .then(data => {
            console.log('Publication créée avec succès:', data);
            this.fetchPosts();
            this.showPostForm = false;
            this.newPost.description = '';
            this.newPost.image = '';
          })
          .catch(error => {
            console.error('Erreur lors de la création de la publication :', error);
          });
    }
  }
};
</script>


<style scoped>
.posts-container {
  max-width: 600px;
  margin: 0 auto;
}

.post {
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 20px;
  padding: 15px;
}

.post-header {
  margin-bottom: 10px;
}

.username {
  font-weight: bold;
}

.description {
  margin-bottom: 10px;
}

.post-image {
  max-width: 100%;
  border-radius: 5px;
}

.post-form-container {
  margin-top: 20px;
}

.post-form-container form {
  display: flex;
  flex-direction: column;
}

.post-form-container label {
  margin-bottom: 5px;
}

.post-form-container textarea,
.post-form-container input[type="text"] {
  margin-bottom: 10px;
  padding: 5px;
}

.post-form-container button {
  padding: 8px 15px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
}

.post-form-container button:hover {
  background-color: #0056b3;
}
</style>
