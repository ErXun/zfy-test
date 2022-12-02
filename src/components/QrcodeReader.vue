<template>
  <div class="qrcode">
    <div class="code">
      <!-- decode是扫描结果的函数，torch用于是否需要打开手电筒，init用于检查该设备是否能够调用摄像头的权限，camera可用于打开前面或者后面摄像头  -->
      <qrcode-drop-zone @decode="onDecode" style="height: 100%">
        <qrcode-stream
          @decode="onDecode"
          :torch="torchActive"
          @init="onInit"
          :camera="camera"
        >
          <div>
            <div class="qr-scanner">
              <div class="box">
                <div class="line"></div>
                <div class="angle"></div>
              </div>
            </div>
          </div>
        </qrcode-stream>
      </qrcode-drop-zone>

      <!-- <div class="code-button">
        <button @click="switchCamera">相机反转</button>
        <button @click="ClickFlash">打开手电筒</button>
        <button @click="turnCameraOff">关闭相机</button>
      </div> -->
    </div>
  </div>
</template>

<script>
// 引用vue-qrcode-reader插件
import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from "vue-qrcode-reader";

export default {
  name: "QrcodeReader",
  props: {
    camera: {
      type: String,
      default: "rear",
    },
    torchActive: {
      type: Boolean,
      default: false,
    },
    qrcode: {
      type: Boolean,
      default: false,
    },
    noStreamApiSupport: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    // 注册组件
    QrcodeStream,
    QrcodeDropZone,
    QrcodeCapture,
  },
  data() {
    return {};
  },
  created() {},

  methods: {
    // 扫码结果回调
    onDecode(result) {
      this.$emit("onDecode", result);
    },
    // 相机反转
    switchCamera() {
      this.$emit("switchCamera");
    },
    // 关闭相机
    turnCameraOff() {
      this.$emit("turnCameraOff");
    },
    // 打开手电筒
    ClickFlash() {
      this.$emit("ClickFlash");
    },
    // 检查是否调用摄像头
    onInit(promise) {
      this.$emit("onInit", promise);
    },
  },
};
</script>

<style lang="less" scoped>
.qrcode {
  height: 100%;
  .code {
    height: 100%;
  }
}
.qr-scanner {
  background-size: 3rem 3rem;
  background-position: -1rem -1rem;
  width: 100%;
  height: 100vh;
  position: relative;
  background-color: #1110;
}

.qr-scanner .box {
  width: 213px;
  height: 213px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
  border: 0.1rem solid rgba(255, 255, 255, 0.2);
  // /* background: url('http://resource.beige.world/imgs/gongconghao.png') no-repeat center center; */
}

.qr-scanner .line {
  height: calc(100% - 2px);
  width: 100%;
  background: linear-gradient(180deg, rgba(0, 255, 51, 0) 43%, #ccc 211%);
  border-bottom: 3px solid #ccc;
  transform: translateY(-100%);
  animation: radar-beam 2s infinite alternate;
  animation-timing-function: cubic-bezier(0.53, 0, 0.43, 0.99);
  animation-delay: 1.4s;
}

.qr-scanner .box:after,
.qr-scanner .box:before,
.qr-scanner .angle:after,
.qr-scanner .angle:before {
  content: "";
  display: block;
  position: absolute;
  width: 3vw;
  height: 3vw;
  border: 0.2rem solid transparent;
}

.qr-scanner .box:after,
.qr-scanner .box:before {
  top: 0;
  border-top-color: #ccc;
}

.qr-scanner .angle:after,
.qr-scanner .angle:before {
  bottom: 0;
  border-bottom-color: #ccc;
}

.qr-scanner .box:before,
.qr-scanner .angle:before {
  left: 0;
  border-left-color: #ccc;
}

.qr-scanner .box:after,
.qr-scanner .angle:after {
  right: 0;
  border-right-color: #ccc;
}

@keyframes radar-beam {
  0% {
    transform: translateY(-100%);
  }

  100% {
    transform: translateY(0);
  }
}
</style>
