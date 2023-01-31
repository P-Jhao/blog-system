<template>
  <div>
    <!-- 上传组件标题 -->
    <div class="block">{{ uploadTitle }}</div>
    <!-- 上传控件 -->
    <el-upload
      class="avatar-uploader"
      action="/api/upload"
      :headers="headers"
      :on-success="handleAvatarSuccess"
      :show-file-list="false"
    >
      <img v-if="value" :src="value" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
// import { server_URL } from "@/urlConfig";
export default {
  props: ["uploadTitle", "value"],
  methods: {
    handleAvatarSuccess(res) {
      if (!res.code && res.data) {
        //图片上传成功
        this.$emit("input", res.data);
      }
    },
  },
  computed: {
    headers() {
      return {
        Authorization: "Bearer " + localStorage.getItem("adminToken"),
      };
    },
    // imgUrl() {
    //   return server_URL + this.value;
    // },
  },
};
</script>

<style lang="scss" scoped>
.avatar-uploader .el-upload {
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  object-fit: cover;
  display: block;
}
.block {
  color: #606266;
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 5px;
}
</style>
