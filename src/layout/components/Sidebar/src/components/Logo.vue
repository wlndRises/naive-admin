<template>
  <div class="sidebar-logo-container" :class="{ collapse: collapse }">
    <transition name="sidebarLogoFade">
      <div v-if="collapse" key="collapse" class="h-full flex items-center justify-center">
        <svg-icon class="w-6 h-6 text-blue-300" :icon-class="logo" />
      </div>
      <div v-else key="expand" class="h-full flex items-center justify-between">
        <svg-icon class="w-6 h-6 text-blue-300" :icon-class="logo" />
        <h1 class="sidebar-title mr-8">{{ title }}</h1>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      title: 'Naive Admin',
      logo: 'logo',
    }
  },
}
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 80%;
  height: 50px;
  margin: 0 auto;
  overflow: hidden;

  & .sidebar-title {
    display: inline-block;
    color: #fff;
    font-size: 16px;
    font-family: Fira Code;
  }
}
</style>
