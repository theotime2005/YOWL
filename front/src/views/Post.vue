<template>
  <div id="app">
    <div v-if="posts.length > 0">
      <h2>Timeline</h2>
      <div class="post-container">
        <div v-for="post in posts" :key="post._id" class="post">
          <div class="post-content">{{ post.description }}</div>
          <div class="post-actions">
            <button @click="likePost(post._id)">Like</button>
            <button @click="deletePost(post._id)">Delete</button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="profile">
      <h2>User Profile</h2>
      <div>{{ profile.username }}</div>
      <div>{{ profile.email }}</div>
      <button @click="updateProfile">Update Profile</button>
    </div>

    <div>
      <h2>Test Functions</h2>
      <button @click="testCreatePost">Test Create Post</button>
      <button @click="testUpdatePost">Test Update Post</button>
      <button @click="testToggleLike">Test Toggle Like</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      posts: [],
      profile: null
    };
  },
  methods: {
    async fetchPosts() {
      try {
        const response = await fetch('http://localhost:8800/api/posts');
        const data = await response.json();
        this.posts = data;
        console.log('Posts fetched:', data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    },
    async createPost(description) {
      try {
        const response = await fetch('http://localhost:8800/api/posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem("user_token")}`
          },
          body: JSON.stringify({
            description: description,
            image: 'image.png'
          })
        });
        const data = await response.json();
        console.log('Post created:', data);
        this.fetchPosts();
      } catch (error) {
        console.error('Error creating post:', error);
      }
    },
    async updatePost(id, description) {
      try {
        const response = await fetch(`http://localhost:8800/api/posts/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem("user_token")}`
          },
          body: JSON.stringify({
            description: description
          })
        });
        const data = await response.json();
        console.log('Post updated:', data);
        this.fetchPosts();
      } catch (error) {
        console.error('Error updating post:', error);
      }
    },
    async deletePost(id) {
      try {
        const response = await fetch(`http://localhost:8800/api/posts/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem("user_token")}`
          },
        });
        const data = await response.json();
        console.log('Post deleted:', data);
        this.fetchPosts();
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    },
    async toggleLike(id) {
      try {
        const response = await fetch(`http://localhost:8800/api/posts/${id}/like`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem("user_token")}`
          },
          body: JSON.stringify({
            userId: '65b68009a2f88c8fd91636f4'
          })
        });
        const data = await response.json();
        console.log('Like toggled:', data);
        this.fetchPosts();
      } catch (error) {
        console.error('Error toggling like:', error);
      }
    },

    testCreatePost() {
      this.createPost("Ceci est un nouveau post de test.");
    },
    testUpdatePost() {
      const postId = this.posts.length > 0 ? this.posts[0]._id : null;
      if (postId) {
        this.updatePost(postId, "Nouveau contenu du post.");
      }
    },
    testToggleLike() {
      const postId = this.posts.length > 0 ? this.posts[0]._id : null;
      if (postId) {
        this.toggleLike(postId);
      }
    }
  },
  mounted() {
    this.fetchPosts();
  }
};
</script>



<style>
#app {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

h2 {
  color: #333;
  font-size: 1.5rem;
  margin-bottom: 20px;
}

.post-container {
  display: flex;
  flex-direction: column;
}

.post {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 20px;
  padding: 15px;
}

.post-content {
  margin-bottom: 10px;
}

.post-actions button {
  padding: 5px 10px;
  font-size: 0.9rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-right: 10px;
}

.post-actions button:hover {
  background-color: #0056b3;
}
</style>
