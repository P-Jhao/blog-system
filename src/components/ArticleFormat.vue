<template>
  <div
    class="app-container"
    v-loading="listLoading"
    element-loading-text="加载数据中"
  >
    <div class="blogTitle">文章标题</div>
    <div style="margin-bottom: 15px">
      <el-input v-model="form.title" placeholder="请输入文章标题"></el-input>
    </div>

    <!-- 文章编辑 -->
    <div class="blogTitle">文章编辑</div>
    <Editor
      :initialValue="form.editorText"
      height="550px"
      ref="toastuiEditor"
      :options="editorOptions"
    />

    <!-- 文章描述 -->
    <div class="blogTitle">文章描述</div>
    <el-input
      v-model="form.description"
      placeholder="请输入文章描述"
      type="textarea"
      :rows="4"
    ></el-input>

    <!-- 文章头图 -->
    <Upload uploadTitle="文章头图" v-model="form.thumb" />

    <!-- 文章分类 -->
    <div class="blogTitle">文章分类</div>
    <el-select
      v-model="form.select"
      placeholder="请选择该文章分类"
      @change="handleBolgTypeChange"
    >
      <el-option
        v-for="item in blogTypes"
        :key="item.id"
        :value="item.id"
        :label="item.name"
      >
      </el-option>
    </el-select>

    <!-- 添加按钮 -->
    <el-button
      type="primary"
      style="margin-left: 15px"
      @click="handleAddArticle"
      >{{ this.mode === "edit" ? "确认修改" : "发布文章" }}</el-button
    >
  </div>
</template>

<script>
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/i18n/zh-cn";
import { Editor } from "@toast-ui/vue-editor";
import Upload from "@/components/Upload";
import { getBlogTypes, addBlog, editBlog, getBlogArtical } from "@/api/blog";
export default {
  components: {
    Editor,
    Upload,
  },
  props: ["mode"],
  data() {
    return {
      id: null, //获取传递来的id
      form: {
        title: "",
        description: "", //文章描述
        thumb: "", //头图地址
        select: "", //选择的分类
      },
      blogTypes: [],
      editorOptions: {
        language: "zh-CN",
      },
      listLoading: false,
    };
  },
  async created() {
    this.listLoading = true;
    const resp = await getBlogTypes();
    this.blogTypes = resp.data;
    if (this.mode === "edit") {
      //将文章内容回填至编辑表格
      this.id = this.$route.params.id;
      getBlogArtical(this.id).then(({ data }) => {
        this.form = data;
        this.form.select = data.category ? data.category.id : "";
        this.$refs.toastuiEditor.invoke("setHTML", data.htmlContent);
      });
    }
    this.listLoading = false;
  },
  methods: {
    async handleAddArticle() {
      const body = {
        title: this.form.title,
        description: this.form.description,
        thumb: this.form.thumb,
        categoryId: this.form.select,
        createDate: new Date().getTime(),
        markdownContent: this.$refs.toastuiEditor.invoke("getMarkdown"),
        htmlContent: this.$refs.toastuiEditor.invoke("getHTML"),
      };
      //提交前判断数据是否齐全
      if (
        body.title &&
        body.description &&
        body.categoryId &&
        body.htmlContent
      ) {
        if (this.mode === "edit") {
          await editBlog(this.id, body);
          this.$message.success("编辑文章成功");
        } else {
          await addBlog(body);
          this.$message.success("发布文章成功");
        }
        this.$router.push("/blogList");
      } else {
        this.$message.error("请填写所有内容");
      }
    },
    handleBolgTypeChange() {
      this.$forceUpdate();
    },
  },
};
</script>

<style lang="scss" scoped>
.blogTitle {
  margin: 15px 0;
  font-weight: 100;
}
</style>
