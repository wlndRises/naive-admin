<template>
  <div class="navbar">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggle-click="toggleSideBar"
    />

    <breadcrumb class="float-left" />

    <div class="float-right h-full n-flex mr-5">
      <el-tooltip content="Screenfull" placement="bottom">
        <div v-screenfull.icon class="text-24px mx-1"></div>
      </el-tooltip>
      <el-dropdown class="mx-1 cursor-pointer" trigger="click">
        <img :src="avatar" class="w-6 h-6 rounded-1/2" />
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>Home</el-dropdown-item>
          </router-link>
          <a target="_blank" href="https://github.com/wlndRises/naive-admin/">
            <el-dropdown-item>Github</el-dropdown-item>
          </a>
          <el-dropdown-item divided @click.native="logout">
            <span class="block">Log Out</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-tooltip content="System Setting" placement="bottom">
        <i class="el-icon-setting text-24px mx-1 cursor-pointer" @click="setting = true" />
      </el-tooltip>
    </div>

    <el-drawer title="System Setting" append-to-body :visible.sync="setting" direction="rtl">
      <Settings />
    </el-drawer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import screenfull from '@/directives/screenfull'
import Breadcrumb from './components/Breadcrumb.vue'
import Hamburger from './components/Hamburger.vue'
import Settings from './components/Settings.vue'

export default {
  directives: {
    screenfull,
  },
  components: {
    Breadcrumb,
    Hamburger,
    Settings,
  },
  data() {
    return {
      setting: false,
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'avatar']),
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
  },
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }
}
</style>
