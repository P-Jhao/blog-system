<template>
  <div class="app-container">
    <el-form :model="data">
      <!-- 项目名称 -->
      <el-form-item label="项目名称">
        <el-input v-model="data.name" placeholder="请输入项目名称"></el-input>
      </el-form-item>
      <!-- 项目描述1 -->
      <el-form-item label="项目描述第一段">
        <el-input
          v-model="data.description1"
          placeholder="请输入项目描述第一段"
        ></el-input>
      </el-form-item>
      <!-- 项目描述2 -->
      <el-form-item
        label="项目描述第二段 (非必填)"
        v-show="!!data.description1"
      >
        <el-input
          v-model="data.description2"
          placeholder="请输入项目描述第二段"
        ></el-input>
      </el-form-item>
      <!-- 项目描述3 -->
      <el-form-item
        label="项目描述第三段 (非必填)"
        v-show="!!data.description2"
      >
        <el-input
          v-model="data.description3"
          placeholder="请输入项目描述第三段"
        ></el-input>
      </el-form-item>
      <!-- 链接地址 -->
      <el-form-item label="链接地址">
        <el-input
          v-model="data.url"
          placeholder="请输入项目链接地址"
        ></el-input>
      </el-form-item>
      <!-- github地址 -->
      <el-form-item label="Github地址">
        <el-input
          v-model="data.github"
          placeholder="请输入项目Github地址"
        ></el-input>
      </el-form-item>
      <!-- 图片预览 -->
      <el-form-item>
        <Upload uploadTitle="图片预览" v-model="data.thumb" />
      </el-form-item>

      <!-- 排列等级 -->
      <el-form-item>
        <div class="labelTitle">排列等级</div>
        <el-select v-model="data.order" placeholder="请选择排列等级">
          <el-option label="1" value="1"></el-option>
          <el-option label="2" value="2"></el-option>
          <el-option label="3" value="3"></el-option>
          <el-option label="4" value="4"></el-option>
          <el-option label="5" value="5"></el-option>
        </el-select>
      </el-form-item>
    </el-form>

    <el-button type="primary" @click="handleAddArticle"> 发布此项目 </el-button>
  </div>
</template>

<script>
import Upload from "@/components/Upload";
import { addProject } from "@/api/project";
export default {
  components: {
    Upload,
  },
  data() {
    return {
      data: {
        name: "",
        description: [],
        description1: "",
        description2: "",
        description3: "",
        url: "",
        github: "",
        thumb: "",
        order: 1,
      },
    };
  },
  methods: {
    handleAddArticle() {
      if (
        this.data.description1 &&
        this.data.name &&
        this.data.url &&
        this.data.github
      ) {
        this.data.description.push(this.data.description1);
        if (this.data.description2) {
          this.data.description.push(this.data.description2);
        }
        if (this.data.description3) {
          this.data.description.push(this.data.description3);
        }
        this.data.order = parseInt(this.data.order);
        addProject(this.data).then(() => {
          this.$message.success("项目发布成功");
          this.$router.push("/projectList");
        });
      } else {
        this.$message.error("请将必填的内容填写完整");
      }
    },
  },
};
</script>

<style>
.labelTitle {
  font-size: 14px;
  font-weight: 700;
  color: #606266;
}
</style>
