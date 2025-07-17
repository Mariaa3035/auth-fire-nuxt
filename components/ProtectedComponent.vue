// components/ProtectedComponent.vue
<template>
  <div>
    <h1>Protected Route</h1>
    <p>This route is only accessible if you are authenticated.</p>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  meta: {
    protected: true
  }
}
</script>