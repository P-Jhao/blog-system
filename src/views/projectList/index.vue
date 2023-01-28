<template>
  <div class="app-container">
    <!-- 数据表格 -->
    <el-table
      :data="data"
      style="width: 100%"
      border
      stripe
      v-loading="listLoading"
      element-loading-text="加载数据中"
    >
      <el-table-column prop="date" label="序号" width="50" align="center">
        <template slot-scope="scope">{{ scope.$index + 1 }}</template>
      </el-table-column>
      <el-table-column prop="title" label="排序等级" width="80" align="center">
        <template slot-scope="scope">{{ scope.row.order }}</template>
      </el-table-column>
      <el-table-column prop="title" label="项目名称" width="150" align="center">
        <template slot-scope="scope"
          ><a :href="scope.row.url" target="_blank">{{
            scope.row.name
          }}</a></template
        >
      </el-table-column>
      <el-table-column prop="description" label="项目描述" align="center">
        <template slot-scope="scope">{{
          scope.row.description.toString()
        }}</template>
      </el-table-column>
      <el-table-column label="项目预览" align="center" width="250">
        <template slot-scope="scope">
          <el-image
            style="width: 150px"
            :src="scope.row.thumb"
            fit="cover"
            :preview-src-list="srcList"
          >
          </el-image>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="150">
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            content="Github"
            placement="top"
            :hide-after="2000"
          >
            <el-button
              type="info"
              icon="iconfont icon-github"
              circle
              size="mini"
              @click="handleOpenGithub(scope.row)"
            ></el-button>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="编辑"
            placement="top"
            :hide-after="2000"
          >
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              size="mini"
              @click="handleEditProject(scope.row)"
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
              @click="handleDeleteProject(scope.row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑对话框 -->
    <el-dialog
      title="请编辑该项目信息"
      :visible.sync="dialogFormVisible"
      fullscreen
    >
      <el-form :model="form">
        <!-- 项目名称 -->
        <el-form-item label="项目名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <!-- 项目描述1 -->
        <el-form-item label="项目描述第一段">
          <el-input v-model="form.description1"></el-input>
        </el-form-item>
        <!-- 项目描述2 -->
        <el-form-item label="项目描述第二段">
          <el-input v-model="form.description2"></el-input>
        </el-form-item>
        <!-- 项目描述3 -->
        <el-form-item label="项目描述第三段">
          <el-input v-model="form.description3"></el-input>
        </el-form-item>
        <!-- 链接地址 -->
        <el-form-item label="链接地址">
          <el-input v-model="form.url"></el-input>
        </el-form-item>
        <!-- github地址 -->
        <el-form-item label="Github地址">
          <el-input v-model="form.github"></el-input>
        </el-form-item>
        <!-- 图片预览 -->
        <el-form-item label="图片预览">
          <Upload v-model="form.thumb" />
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
        <el-button type="primary" @click="handleSetProject">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getProjects, editProject, deleteProject } from "@/api/project";
// import { server_URL } from "@/urlConfig";
import Upload from "@/components/Upload";
export default {
  components: {
    Upload,
  },
  data() {
    return {
      data: [],
      listLoading: false,
      srcList: [],
      dialogFormVisible: false,
      form: {
        name: "",
        description: "",
        url: "",
        github: "",
        thumb: "",
        order: 1,
      },
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      this.listLoading = true;
      const { data } = await getProjects();
      this.listLoading = false;
      for (const item of data) {
        // item.imgUrl = server_URL + item.thumb;
        this.srcList.push(item.thumb);
        item.description1 = item.description[0];
        item.description2 = item.description[1];
        item.description3 = item.description[2];
      }
      this.data = data;
    },
    handleEditProject(projectInfo) {
      this.dialogFormVisible = true;
      this.form = { ...projectInfo };
    },
    handleDeleteProject({ id }) {
      this.$confirm("确定要删除该项目吗, 是否继续?", "是否删除该项目", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteProject(id).then(() => {
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
    handleOpenGithub({ github }) {
      window.open(github);
    },
    async handleSetProject() {
      const body = { ...this.form, order: parseInt(this.form.order) };
      body.description = [
        body.description1,
        body.description2,
        body.description3,
      ];
      const res = await editProject(body.id, body);
      this.$message.success("修改项目成功");
      this.fetchData();
      this.dialogFormVisible = false;
    },
  },
};
</script>

<style></style>
