<template>
  <div class="app-container">
    <el-input
      placeholder="请输入要添加的分类，左边选择该分类的等级"
      v-model="input"
      class="input-with-select addBlogType"
      @keyup.enter.native="handleAddBlogType"
    >
      <el-select
        style="width: 60px"
        v-model="select"
        slot="prepend"
        placeholder="等级"
      >
        <el-option label="1" value="1"></el-option>
        <el-option label="2" value="2"></el-option>
        <el-option label="3" value="3"></el-option>
        <el-option label="4" value="4"></el-option>
        <el-option label="5" value="5"></el-option>
      </el-select>
    </el-input>
    <el-button
      type="primary"
      style="margin-left: 10px"
      @click="handleAddBlogType"
      >添加</el-button
    >
    <el-table
      :data="data"
      style="width: 100%"
      border
      stripe
      v-loading="listLoading"
      element-loading-text="加载数据中"
    >
      <el-table-column prop="date" label="序号" width="60" align="center">
        <template slot-scope="scope">{{ scope.$index + 1 }}</template>
      </el-table-column>
      <el-table-column prop="date" label="文章等级" width="150" align="center">
        <template slot-scope="scope">{{ scope.row.order }}</template>
      </el-table-column>
      <el-table-column prop="title" label="博客类别" align="center">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column prop="title" label="文章数量" width="250" align="center">
        <template slot-scope="scope">{{ scope.row.articleCount }}</template>
      </el-table-column>
      <el-table-column label="操作" width="150" align="center">
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            content="编辑"
            placement="top"
            :hide-after="3000"
          >
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              size="mini"
              @click="handleEditBlogType(scope.row)"
            ></el-button>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="删除"
            placement="top"
            :hide-after="2000"
          >
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              size="mini"
              @click="handleDeleteBlogType(scope.row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 编辑弹出框 -->
    <el-dialog title="编辑文章分类" :visible.sync="dialogFormVisible" top="5vh">
      <el-form :model="form">
        <!-- 博客类别 -->
        <el-form-item label="博客类别">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <!-- 排列等级 -->
        <el-form-item label="排列等级">
          <el-select v-model="form.order" placeholder="请选择排列等级">
            <el-option label="1" value="1"></el-option>
            <el-option label="2" value="2"></el-option>
            <el-option label="3" value="3"></el-option>
            <el-option label="4" value="4"></el-option>
            <el-option label="5" value="5"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSetBlogType">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getBlogTypes,
  updateBlogType,
  deleteBlogType,
  addBlogType,
} from "@/api/blog";
export default {
  data() {
    return {
      input: "",
      select: "1",
      data: [],
      listLoading: false,
      dialogFormVisible: false,
      form: {},
    };
  },
  async created() {
    await this.fetchData();
  },
  methods: {
    async fetchData() {
      this.listLoading = true;
      const resp = await getBlogTypes();
      this.listLoading = false;
      this.data = resp.data;
    },
    handleEditBlogType(TypeInfo) {
      this.dialogFormVisible = true;
      this.form = { ...TypeInfo };
    },
    async handleDeleteBlogType({ id }) {
      this.$confirm(
        "删除该分类后，该分类下的所有文章将变为未分类状态, 是否继续?",
        "是否删除该文章分类",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          deleteBlogType(id).then(() => {
            this.fetchData();
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    async handleAddBlogType() {
      if (!this.input) {
        this.$message.error("分类名称不能为空");
        return;
      }
      for (const item of this.data) {
        if (this.input === item.name) {
          this.$message.error("不能添加已有的博客类别");
          return;
        }
      }
      await addBlogType({
        name: this.input,
        order: this.select,
      });
      this.input = "";
      this.$message.success("添加成功");
      this.fetchData();
    },
    async handleSetBlogType() {
      await updateBlogType(this.form.id, {
        name: this.form.name,
        order: this.form.order,
      });
      this.dialogFormVisible = false;
      this.$message.success("编辑成功");
      this.fetchData();
    },
  },
};
</script>

<style lang="scss" scoped>
.addBlogType {
  width: 400px;
  margin-bottom: 20px;
}
</style>
