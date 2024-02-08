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
import axios from 'axios';

export default {
  data() {
    return {
      posts: [],
      profile: null
    };
  },
  created() {
    this.fetchTimeline();
    this.fetchUserProfile();
  },
  methods: {
    async fetchTimeline() {
      try {
        const response = await axios.get('http://localhost:8800/api/timeline');
        this.posts = response.data.posts;
      } catch (error) {
        console.error(error);
      }
    },
    async fetchUserProfile() {
      try {
        const response = await axios.get('http://localhost:8800/api/profile');
        this.profile = response.data.profile;
      } catch (error) {
        console.error(error);
      }
    },
    async likePost(postId) {
      try {
        await axios.put(`http://localhost:8800/api/posts/${postId}/like`);
        this.fetchTimeline();
      } catch (error) {
        console.error(error);
      }
    },
    async deletePost(postId) {
      try {
        await axios.delete(`http://localhost:8800/api/posts/${postId}`);
        this.fetchTimeline();
      } catch (error) {
        console.error(error);
      }
    },
    async updateProfile() {
    }
  }
}
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
