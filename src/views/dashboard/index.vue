<template>
  <div class="p-5">
    <span>Hi~ {{ name }}</span>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters(['name']),
  },
  mounted() {
    this.addMenuBadge({
      name: 'Dashboard',
      value: 10,
    })
  },
  methods: {
    ...mapActions('menuBadge', ['addMenuBadge']),
  },
}
</script>
