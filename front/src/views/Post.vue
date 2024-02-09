<template>
  <div id="app">
    <div v-if="posts.length > 0">
      <h2>Timeline</h2>
      <ul>
        <li v-for="post in posts" :key="post._id">
          <div>{{ post.description }}</div>
          <button @click="likePost(post._id)">Like</button>
          <button @click="deletePost(post._id)">Delete</button>
        </li>
      </ul>
    </div>
    <div v-if="profile">
      <h2>User Profile</h2>
      <div>{{ profile.username }}</div>
      <div>{{ profile.email }}</div>
      <button @click="updateProfile">Update Profile</button>
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
      } catch (error) {
        console.error('Error toggling like:', error);
      }
    }
  },
  mounted() {
    // Fetch posts and profile data when component is mounted
    // Assuming you have methods to fetch posts and profile data
    // For example:
    // this.fetchPosts();
    // this.fetchProfile();
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
ul {
  list-style-type: none;
  padding: 0;
}
li {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  margin-bottom: 10px;
  padding: 10px;
}
button {
  padding: 8px 16px;
  font-size: 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-right: 10px;
}
button:hover {
  background-color: #0056b3;
}
</style>
