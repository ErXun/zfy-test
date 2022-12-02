<!-- eslint-disable no-undef -->
<template>
  <div>
    <div id="FlatMapDemo"></div>
    <div id="html-widget"></div>
  </div>
</template>

<script>
var map;
export default {
  name: "FlatMapDemo",
  data() {
    return {
      layerId: "",
      marker: "",
      fullScreen: "",
    };
  },
  created() {},
  mounted() {
    // this.autoHeight();
    // this.changeBaseMap();
    this.initMap();
    // this.addMarkLine();
    this.addMarkArea();
    // this.addMark();
    // this.marker.on("dragend", this.onDragEnd); //mark拖拽事件
    // this.addFullscreen();
  },
  methods: {
    initMap() {
      // 构造地图对象实例
      map = new GeoGlobe.Map({
        container: "FlatMapDemo", // 绑定容器
        mapCRS: "4490", // 定义坐标系
        zoom: 15, // 当前缩放级别
        center: [118.778, 32.043], // 定位中心点
        maxZoom: 20, // 最大缩放级别
        minZoom: 8, // 最小缩放级别
        // pitch: 45, //如需设置倾斜，角度设置为45
      });
      map.on("load", () => {
        // 南京电子地图底图
        const njdt_layer = new GeoGlobe.NJLayer("geo_tile_dt");
        // 南京电子地图注记
        const njzj_layer = new GeoGlobe.NJLayer("geo_tile_zj");
        // 添加图层
        map.addLayer(njdt_layer);
        map.addLayer(njzj_layer);
      });
    },

    // 切换底图
    changeBaseMap() {
      // 构造地图对象实例
      map = new GeoGlobe.Map({
        container: "FlatMapDemo", // 绑定容器
        mapCRS: "4490", // 定义坐标系
        zoom: 15, // 当前缩放级别
        center: [118.778, 32.043], // 定位中心点
        maxZoom: 20, // 最大缩放级别
        minZoom: 8, // 最小缩放级别
        // pitch: 45, //如需设置倾斜，角度设置为45
      });

      // 南京电子地图底图和注记
      const tile_sl_dt = new GeoGlobe.NJLayer("geo_tile_dt");
      const tile_sl_zj = new GeoGlobe.NJLayer("geo_tile_zj");

      // 南京影像地图和注记
      const tile_yx_dt = new GeoGlobe.NJLayer("geo_tile_dom_dt");
      const tile_yx_zj = new GeoGlobe.NJLayer("geo_tile_dom_zj");

      const baseMap = [
        {
          layers: [tile_sl_dt, tile_sl_zj],
          icon: "http://mapservices.njghzy.com.cn:84/njapis/resource/image/basemap/南京底图.png",
          text: "矢量地图",
        },
        {
          layers: [tile_yx_dt, tile_yx_zj],
          icon: "http://mapservices.njghzy.com.cn:84/njapis/resource/image/basemap/南京影像.png",
          text: "影像地图",
        },
      ];
      map.on("load", function () {
        const widget = new GeoGlobe.Widget.MapSwitch("html-widget", baseMap);
        map.addWidget(widget, {
          right: 10,
          bottom: 10,
        });
      });
    },

    // 自动拔高地面
    autoHeight() {
      // 构造地图对象实例,并添加到id为map的div容器中
      map = new GeoGlobe.Map({
        container: "FlatMapDemo", //绑定容器
        mapCRS: "4490", //定义坐标系
        zoom: 16, //当前缩放级别
        center: [118.778, 32.043], //定位中心点
        maxZoom: 20, //最大缩放级别
        minZoom: 9, //最小缩放级别
        pitch: 50,
      });

      var view = new layergl.View({
        map: layergl.map.getMapBoxGLMap(map), // 同步用的地图对象
      });

      var shapeLayer = new layergl.ShapeLayer({
        // 贴图
        texture:
          "http://mapservices.njghzy.com.cn:84/njapis/resource/image/wall2.png",
        // 是否为整面贴图
        isTextureFull: true,
        // 高度
        height: function (data) {
          return data.properties.ROOFELEV;
        },
        riseTime: 2000,
      });
      view.addLayer(shapeLayer);
      shapeLayer.setData(polygon);

      map.on("load", function () {
        // 加载底图
        const dt_layer = new GeoGlobe.NJLayer("esri_vec_dt_controlcabin");
        map.loadSprite(dt_layer.sprite);
        map.style.setGlyphs(dt_layer.glyphs);
        map.addLayer(dt_layer);

        // 加载注记
        const zj_layer = new GeoGlobe.NJLayer("esri_vec_zj_controlcabin");
        map.loadSprite(zj_layer.sprite);
        map.style.setGlyphs(zj_layer.glyphs);
        map.addLayer(zj_layer);
      });
    },

    // 添加全屏控件
    addFullscreen() {
      if (!this.fullScreen) {
        this.fullScreen = new GeoGlobe.Control.Fullscreen();
        map.addControl(this.fullScreen, "bottom-right");
      }
    },

    // 鼠标点击覆盖物地图居中
    backCenter() {
      const ob = this.marker.getElement();
      ob.onclick = () => {
        map.flyTo({
          center: this.marker.getLngLat(),
        });
      };
    },

    // 信息窗体
    popInfo() {
      // 定义一个点的坐标
      const monument = [118.778, 32.043];
      // 直接显示信息框
      const popup1 = new GeoGlobe.Popup({
        closeOnClick: false,
      })
        .setLngLat(monument)
        .setHTML("<h1>您好！我是信息框!</h1>")
        .addTo(map);

      // 添加点图层
      map.on("load", function () {
        var geoJSONUtil = new GeoGlobe.Format.GeoJSONUtil();
        var pointjson = geoJSONUtil.point(monument);

        map.addLayer({
          id: "point", //图层ID
          type: "circle", //图层类型
          source: pointjson, //数据源
          paint: {
            "circle-radius": 20, //圆半径
            "circle-color": "#1791fc", //圆颜色
            "circle-opacity": 0.8, //圆透明度
            "circle-stroke-color": "#FF33FF", //描边颜色
            "circle-stroke-opacity": 0.2, //描边透明度
            "circle-stroke-width": 2, //描边宽度
          },
        });
      });
    },

    // 添加标记点
    addMarkPoint() {
      // 定义一个点的坐标
      const monument = [118.778, 32.043];
      this.marker = new GeoGlobe.Marker().setLngLat(monument).addTo(map);
    },
    // 移除mark
    removeMark() {
      this.marker.remove();
    },

    // 添加标记线
    addMarkLine() {
      map.on("load", () => {
        // 对于大数据全部通过外部引入，方便阅读
        const polyline = new GeoGlobe.Format.GeoJSONUtil().line([
          [118.75825894165195, 32.04780651855442],
          [118.75851643371732, 32.005790222167634],
        ]);
        // 添加线数据源
        map.addSource("line-source", polyline);
        // 添加线图层
        map.addLayer({
          id: "point2-layer", //图层ID
          type: "line", //类型
          source: "line-source", //数据源red
          paint: {
            "line-width": 5, //线宽
            "line-color": "blue", //线颜色
          },
        });
      });
    },

    // 添加标记面
    addMarkArea() {
      map.on("load", () => {
        // 对于大数据全部通过外部引入，方便阅读
        var polygon = new GeoGlobe.Format.GeoJSONUtil().polygon([
          [
            [118.77022344970728, 32.048621910094894],
            [118.78340733337419, 32.048621910094894],
            [118.78340733337419, 32.02943802642798],
            [118.77022344970728, 32.02943802642798],
            [118.77022344970728, 32.048621910094894],
          ],
        ]);
        // 添加面数据源
        map.addSource("polygon-source", polygon);

        // 添加面图层
        map.addLayer({
          id: "point3-layer", //图层ID
          type: "fill", //图层类型
          source: "polygon-source", //数据源
          paint: {
            "fill-color": "blue", //面的填充颜色
            "fill-opacity": 0.1, //透明度
          },
        });
      });
    },

    // 拖拽事件的回调函数
    onDragEnd() {
      const lngLat = this.marker.getLngLat();
      console.log("lngLa--------t", lngLat);
      // document.getElementById("context").innerHTML =
      //   "经度: " + lngLat.lng + "<br />纬度: " + lngLat.lat;
    },
    // 添加背景图层
    addBackLayer() {
      if (!this.layerId) {
        const backLayer = new GeoGlobe.Layer.BackgroundLayer({
          id: "background", //图层ID
          type: "background", //图层类型
          paint: {
            "background-color": "#41afa5", //图层颜色
            "background-opacity": 0.3, //图层透明度
          },
        });
        map.addLayer(backLayer); //添加图层
        // 获取图层id
        this.layerId = backLayer.id;
      }
    },
    // 移除背景图层
    removeBackLayer() {
      if (this.layerId) {
        map.removeLayer(this.layerId); //根据图层id，移除图层
        this.layerId = undefined;
      }
    },
    // 其他配置
    otherConfig() {
      /**
       *  GeoGlobe.TDTLayer天地图图层类。
       */
      var token = "b53e756d10fd4737237d035f9eec858f";
      var layer_vec = new GeoGlobe.TDTLayer("vec_c", token);
      var layer_cva = new GeoGlobe.TDTLayer("cva_c", token);
      map.on("styledata", function () {
        map.addLayer(layer_vec);
        map.addLayer(layer_cva);
      });
      /**
       * 添加比例尺
       */
      var Sca_control = new GeoGlobe.Control.Scale({
        position: "top-left",
        maxWidth: 80,
        unit: "metric",
      });
      map.addControl(Sca_control);
    },
  },
};
</script>

<style scoped less>
#FlatMapDemo {
  width: 100%;
  height: 100vh;
}
</style>
