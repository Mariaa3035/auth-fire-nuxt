
<template>
  <div>
    <header class="navbar">
      <nav>
        <ul class="nav-list">
          <li>
            <nuxt-link to="/dashboard" class="nav-link">Dashboard</nuxt-link>
          </li>
          <li class="user-info">
            <span v-if="user" class="email">{{ user.email }}</span>
            <button @click="logout" class="logout-btn">Logout</button>
          </li>
        </ul>
      </nav>
    </header>
    <main>
      <!-- dashboard content -->
    </main>
  </div>
</template>
<style scoped>
.navbar {
  background-color: #f8f9fa;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
.nav-list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
}
.nav-link {
  text-decoration: none;
  color: #333;
  font-weight: bold;
}
.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.email {
  color: #666;
}
.logout-btn {
  padding: 0.5rem 1rem;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}
.logout-btn:hover {
  background-color: #c82333;
}
</style>
vue
<script>
export default {
  middleware: 'auth',
  meta: {
    protected: true
  },
  computed: {
    user() {
      return this.$store.state.auth.user
    }
  },
  methods: {
    async logout() {
      try {
        await this.$store.dispatch('auth/signOut')
        this.$router.push('/login')
      } catch (error) {
        console.error('Logout error:', error)
      }
    }

  }
}
</script>