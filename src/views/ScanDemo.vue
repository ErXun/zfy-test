<template>
  <div class="scan-page">
    <!-- <button @click="clickCode">打开相机</button> -->

    <qrcode-reader
      :qrcode="qrcode"
      v-if="qrcode"
      :camera="camera"
      :torchActive="torchActive"
      @switchCamera="switchCamera"
      @ClickFlash="ClickFlash"
      @turnCameraOff="turnCameraOff"
      @onDecode="onDecode"
      @onInit="onInit"
    />

    <div v-else>{{ scanResult }}</div>
  </div>
</template>

<script>
export default {
  name: "ScanDemo",
  components: {
    // 注册
    QrcodeReader: () => import("@/components/QrcodeReader"),
  },
  data() {
    return {
      qrcode: false,
      torchActive: false,
      camera: "off",
      scanResult: "",
    };
  },
  mounted() {
    this.clickCode();
  },
  methods: {
    // 打开相机
    clickCode() {
      // camera:: 'rear'--前摄像头，'front'后摄像头，'off'关闭摄像头，会获取最后一帧显示，'auto'开始获取摄像头
      this.qrcode = true;
      this.camera = "rear";
    },
    // 扫码结果回调
    onDecode(result) {
      // result, 扫描结果，可以根据自己的需求来实现相应的功能
      this.scanResult = result;
      this.turnCameraOff();
    },
    // 相机反转
    switchCamera() {
      switch (this.camera) {
        case "front":
          this.camera = "rear";
          break;
        case "rear":
          this.camera = "front";
          break;
        default:
          this.$toast("错误");
      }
    },
    // 关闭相机
    turnCameraOff() {
      this.camera = "off";
      this.qrcode = false;
    },
    // 打开手电筒
    ClickFlash() {
      switch (this.torchActive) {
        case true:
          this.torchActive = false;
          break;
        case false:
          this.torchActive = true;
          break;
        default:
          this.$toast("错误");
      }
    },

    // 检查是否调用摄像头
    async onInit(promise) {
      try {
        await promise;
      } catch (error) {
        if (error.name === "StreamApiNotSupportedError") {
        } else if (error.name === "NotAllowedError") {
          this.errorMessage = "Hey! I need access to your camera";
        } else if (error.name === "NotFoundError") {
          this.errorMessage = "Do you even have a camera on your device?";
        } else if (error.name === "NotSupportedError") {
          this.errorMessage =
            "Seems like this page is served in non-secure context (HTTPS, localhost or file://)";
        } else if (error.name === "NotReadableError") {
          this.errorMessage =
            "Couldn't access your camera. Is it already in use?";
        } else if (error.name === "OverconstrainedError") {
          this.errorMessage =
            "Constraints don't match any installed camera. Did you asked for the front camera although there is none?";
        } else {
          this.errorMessage = "UNKNOWN ERROR: " + error.message;
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
.scan-page {
  height: 100%;
}
</style>
