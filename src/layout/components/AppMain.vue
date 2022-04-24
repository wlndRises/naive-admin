<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.path
    },
  },
}
</script>

<style scoped>
.app-main {
  position: relative;
  width: 100%;

  /* navbar = 50 */
  min-height: calc(100vh - 50px);
  overflow: hidden;
}

.fixed-header + .app-main {
  min-height: 100vh;
  padding-top: 50px;
}
</style>

<style lang="scss">
// 修复了打开el-dialog时的CSS样式错误
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
