<template>
  <el-tabs v-model="tabsValue" type="card">
    <el-tab-pane v-for="item in tabs" :key="item.name" lazy :label="item.title" :name="item.name">
      <component :is="item.components"></component>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
export default {
  name: 'Form',
  components: {
    tab1: () => import('./components/tab1.vue'),
    tab2: () => import('./components/tab2.vue'),
  },
  data() {
    return {
      tabsValue: '1',
      tabs: [
        {
          title: 'Tab 1',
          name: '1',
          components: 'tab1',
        },
        {
          title: 'Tab 2',
          name: '2',
          components: 'tab2',
        },
      ],
    }
  },
}
</script>
