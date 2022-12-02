<template>
  <div class="home">
    <!-- <map-demo></map-demo> -->
    <!-- <flat-map-demo></flat-map-demo> -->
    <!-- <scan-demo></scan-demo> -->
    <router-link :to="{ path: 'ant-design-demo' }">AntDesignDemo</router-link>
  </div>
</template>

<script>
// import ScanDemo from "./ScanDemo.vue";
// import MapDemo from "@/components/MapDemo.vue";
// import FlatMapDemo from "@/components/FlatMapDemo.vue";
export default {
  name: "HomeView",
  components: {
    // MapDemo,
    // FlatMapDemo,
    // ScanDemo,
  },
};
</script>
