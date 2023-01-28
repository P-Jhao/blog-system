<template>
  <div class="app-container">
    <el-form>
      <!-- 关于我 -->
      <el-form-item label="关于我">
        <el-input
          v-model="url"
          :disabled="isDisable"
          palceholder="请输入关于我页面展示的地址"
          @keyup.enter.native="handleAboutUrl"
        ></el-input>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="handleAboutUrl">{{
      isDisable ? "编辑" : "完成"
    }}</el-button>
  </div>
</template>

<script>
import { getAbout, setAbout } from "@/api/about";
export default {
  data() {
    return {
      data: "",
      url: "",
      isDisable: false,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      getAbout().then(({ data }) => {
        if (data) {
          this.isDisable = true;
          this.url = data;
          this.data = data;
        }
      });
    },
    handleAboutUrl() {
      if (!this.isDisable) {
        //用户正在编辑地址
        if (!this.url) {
          this.$message.warning("输入框不能为空");
          return;
        }
        if (this.url !== this.data) {
          //用户修改了地址
          setAbout({ url: this.url }).then(() => {
            this.$message.success("修改地址成功");
          });
        }
      }
      //更改输入框与按钮状态
      this.isDisable = !this.isDisable;
    },
  },
};
</script>

<style></style>
