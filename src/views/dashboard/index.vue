<template>
  <div class="p-20px">
    <span>Hi~ {{ name }}</span>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters(['name']),
  },
  mounted() {
    this.SET_ROUTES_BADGE({
      name: 'Dashboard',
      value: 1987,
    })
  },
  methods: {
    ...mapMutations('permission', ['SET_ROUTES_BADGE']),
  },
}
</script>
