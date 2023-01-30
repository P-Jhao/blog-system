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
      <el-table-column prop="date" label="序号" width="60" align="center">
        <template slot-scope="scope">{{ scope.$index + 1 }}</template>
      </el-table-column>
      <el-table-column prop="title" label="标题" width="100" align="center">
        <template slot-scope="scope">{{ scope.row.title }}</template>
      </el-table-column>
      <el-table-column prop="description" label="描述" width="250">
        <template slot-scope="scope">{{ scope.row.description }}</template>
      </el-table-column>
      <el-table-column label="中图预览" align="center" width="250">
        <template slot-scope="scope">
          <el-image style="width: 100px" :src="scope.row.midImg" fit="cover">
          </el-image>
        </template>
      </el-table-column>
      <el-table-column label="大图预览" align="center" width="250">
        <template slot-scope="scope"
          ><el-image
            style="width: 100px"
            :src="scope.row.bigImg"
            fit="cover"
          ></el-image
        ></template>
      </el-table-column>
      <el-table-column label="操作" align="center">
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
              @click="handleEditClick(scope.row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 编辑弹出框 -->
    <el-dialog title="请编辑信息" :visible.sync="dialogFormVisible" top="5vh">
      <el-form :model="form">
        <!-- 标语 -->
        <el-form-item label="标语">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <!-- 描述 -->
        <el-form-item label="描述">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="首页中图">
              <Upload v-model="form.midImg" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="首页大图">
              <Upload v-model="form.bigImg" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSetBannerClick"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getBanners, setBanner } from "@/api/banner";
import Upload from "@/components/Upload";
// import { server_URL } from "@/urlConfig";
export default {
  components: {
    Upload,
  },
  data() {
    return {
      data: null,
      dialogFormVisible: false, //是否显示编辑对话框
      form: {
        id: "",
        bigImg: "",
        description: "",
        midImg: "",
        title: "",
      },
      listLoading: false,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      this.listLoading = true;
      const resp = await getBanners();
      this.listLoading = false;
      this.data = resp.data;
      // for (const item of this.data) {
      //   item.midImg2 = server_URL + item.midImg;
      //   item.bigImg2 = server_URL + item.bigImg;
      // }
    },
    handleEditClick(bannerInfo) {
      this.dialogFormVisible = true;
      this.form = { ...bannerInfo };
    },
    async handleSetBannerClick() {
      let arr = [...this.data];
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].id === this.form.id) {
          arr[i] = this.form;
        }
      }
      setBanner(arr).then(() => {
        this.dialogFormVisible = false;
        this.$message({
          message: "修改成功",
          type: "success",
        });
        this.fetchData();
      });
    },
  },
};
</script>

<style></style>
