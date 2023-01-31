<template>
  <div class="app-container">
    <Upload
      uploadTitle="需要上传的图片"
      @input="handleRespUrl"
      v-model="imgUrl"
    />
    <el-input
      class="urlInput"
      placeholder="该图片返回的地址"
      v-model="input"
      :disabled="true"
    >
    </el-input>
  </div>
</template>

<script>
import Upload from "@/components/Upload";
import { server_URL } from "@/urlConfig.js";
export default {
  components: {
    Upload,
  },
  data() {
    return {
      input: "",
      imgUrl: null,
    };
  },
  methods: {
    handleRespUrl(respUrl) {
      console.log(respUrl);
      this.imgUrl = respUrl;
      this.input = server_URL + respUrl;
    },
  },
};
</script>

<style scoped>
.urlInput {
  margin-top: 20px;
}
</style>
