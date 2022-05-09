<template>
  <div class="navbar">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggle-click="toggleSideBar"
    />

    <breadcrumb class="float-left" />

    <div class="float-right h-full n-flex">
      <el-tooltip content="Screenfull" placement="bottom">
        <div v-screenfull.icon class="text-20px mx-5px"></div>
      </el-tooltip>
      <el-dropdown class="mx-5px cursor-pointer" trigger="click">
        <img :src="avatar" class="w-24px h-24px rounded-1/2" />
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
        <i
          class="el-icon-setting text-20px ml-5px mr-40px cursor-pointer"
          @click="setting = true"
        />
      </el-tooltip>
    </div>

    <el-drawer title="System Setting" append-to-body :visible.sync="setting" direction="rtl">
      <Settings />
    </el-drawer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import Settings from './Settings.vue'

export default {
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
