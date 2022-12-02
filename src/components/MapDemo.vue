<!-- eslint-disable no-undef -->
<template>
  <div class="container">
    <div id="cesiumContainer"></div>
    <div id="info"></div>
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
      viewer = new Cesium.Viewer(
        "cesiumContainer",
        // {
        //   terrainProvider: Cesium.createWorldTerrain(), //可以把Cesium.createWorldTerrain()替换成自己发布的地形文件URL
        // }
        {
          animation: false, // 隐藏动画控件
          baseLayerPicker: false, // 隐藏图层选择控件
          fullscreenButton: true, // 隐藏全屏按钮
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
        }
      );
      viewer.cesiumWidget.creditContainer.style.display = "none";
      // viewer.imageryLayers.remove(viewer.imageryLayers.get(0)); // 去除默认影像

      /**
       * 定位
       */
      // viewer.scene.camera.setView({
      //   destination: new Cesium.Cartesian3.fromDegrees(
      //     118.653455,
      //     32.078028,
      //     1000
      //   ),
      //   orientation: {
      //     heading: Cesium.Math.toRadians(0),
      //     pitch: Cesium.Math.toRadians(-90.0), //从上往下看为-90
      //     roll: 0,
      //   },
      // });

      viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(118.641, 32.072, 1000),
      });

      var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
      //鼠标左键点击事件
      handler.setInputAction(function (click) {
        console.log("click", click);
        var click_position = viewer.camera.pickEllipsoid(click.position); //click换成movement也可实现，但是position不是endposition

        // console.log("movement", movement);
        // let click_position = viewer.scene.camera.pickEllipsoid(
        //   movement.endPosition
        // );

        var carto_position = Cesium.Cartographic.fromCartesian(click_position);

        var longitude_x = Cesium.Math.toDegrees(
          carto_position.longitude
        ).toFixed(3);
        var longitude_y = Cesium.Math.toDegrees(
          carto_position.latitude
        ).toFixed(3);

        const info = document.querySelector("#info");
        info.innerHTML =
          "点击坐标的位置为" + longitude_x + "经度，" + longitude_y + "纬度";
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

      /**
       * 加载天地图
       */
      let tianditu = new Cesium.WebMapTileServiceImageryProvider({
        url: "http://t0.tianditu.com/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=ebf64362215c081f8317203220f133eb",
        layer: "tdtBasicLayer",
        style: "default",
        format: "image/jpeg",
        tileMatrixSetID: "GoogleMapsCompatible",
        show: true,
      });
      viewer.imageryLayers.addImageryProvider(tianditu);

      /**
       * 加载ArcGIS影像
       */
      // viewer.imageryLayers.addImageryProvider(
      //   new Cesium.ArcGisMapServerImageryProvider({
      //     url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer",
      //     baseLayerPicker: false,
      //   })
      // );
      // console.log("viewer.imageryLayers", viewer.imageryLayers);
    },
  },
};
</script>

<style scoped lang="less">
.container {
  position: relative;
}
#cesiumContainer {
  width: 100%;
  height: 100vh;
}
#info {
  position: absolute;
  bottom: 5%;
  left: 40%;
  color: #fff;
}
</style>
