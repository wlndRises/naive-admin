<template>
  <div class="p-20px">
    <span>Hi~ {{ name }}</span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters(['name']),
  },
}
</script>
