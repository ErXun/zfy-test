<!-- eslint-disable no-undef -->
<template>
  <div class="container">
    <div id="cesiumContainer"></div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
var viewer;
export default {
  name: "MapDemo",
  data() {
    return {};
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      // eslint-disable-next-line no-undef
      viewer = new Cesium.Viewer("cesiumContainer", {
        animation: false, // 隐藏动画控件
        baseLayerPicker: false, // 隐藏图层选择控件
        fullscreenButton: false, // 隐藏全屏按钮
        vrButton: false, // 隐藏VR按钮，默认false
        geocoder: true, // 隐藏地名查找控件
        homeButton: false, // 隐藏Home按钮
        infoBox: false, // 隐藏点击要素之后显示的信息窗口
        sceneModePicker: false, // 隐藏场景模式选择控件
        selectionIndicator: true, // 显示实体对象选择框，默认true
        timeline: false, // 隐藏时间线控件
        navigationHelpButton: false, // 隐藏帮助按钮
        scene3DOnly: true, // 每个几何实例将只在3D中呈现，以节省GPU内存
        shouldAnimate: true, // 开启动画自动播放
        sceneMode: 3, // 初始场景模式 1：2D 2：2D循环 3：3D，默认3
        requestRenderMode: true, // 减少Cesium渲染新帧总时间并减少Cesium在应用程序中总体CPU使用率
        // 如场景中的元素没有随仿真时间变化，请考虑将设置maximumRenderTimeChange为较高的值，例如Infinity
        maximumRenderTimeChange: Infinity,
      });
      viewer.cesiumWidget.creditContainer.style.display = "none";
      // viewer.imageryLayers.remove(viewer.imageryLayers.get(0));  // 去除默认影像

      /**
       * 加载天地图
       */
      // let tianditu = new Cesium.WebMapTileServiceImageryProvider({
      //   url: "http://t0.tianditu.com/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=ebf64362215c081f8317203220f133eb",
      //   layer: "tdtBasicLayer",
      //   style: "default",
      //   format: "image/jpeg",
      //   tileMatrixSetID: "GoogleMapsCompatible",
      //   show: false,
      // });
      // viewer.imageryLayers.addImageryProvider(tianditu);

      /**
       * 加载ArcGIS影像
       */
      // viewer.imageryLayers.addImageryProvider(
      //   new Cesium.ArcGisMapServerImageryProvider({
      //     url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer",
      //     baseLayerPicker: false,
      //   })
      // );

      console.log("viewer.imageryLayers", viewer.imageryLayers);
    },
  },
};
</script>

<style  scoped>
#cesiumContainer {
  width: 100%;
  height: 100vh;
}
</style>



