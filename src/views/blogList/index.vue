<template>
  <div class="app-container">
    <el-table
      :data="data"
      style="width: 100%"
      border
      stripe
      v-loading="listLoading"
      element-loading-text="加载数据中"
    >
      <el-table-column prop="date" label="序号" width="60" align="center">
        <template slot-scope="scope">{{
          scope.$index + (currentPage - 1) * eachPage + 1
        }}</template>
      </el-table-column>

      <el-table-column prop="title" label="文章名称" width="100" align="center">
        <template slot-scope="scope"
          ><el-popover
            placement="top-start"
            title="博客预览图"
            width="250"
            trigger="hover"
          >
            <el-image
              style="width: 200px"
              :src="scope.row.thumb"
              fit="cover"
              :preview-src-list="srcList"
            ></el-image>
            <a
              href="#"
              target="_blank"
              @click.prevent="handleGoToTitle(scope.row)"
              slot="reference"
              >{{ scope.row.title }}
            </a>
          </el-popover></template
        >
      </el-table-column>

      <el-table-column prop="title" label="文章描述" width="200" align="center">
        <template slot-scope="scope">{{ scope.row.description }}</template>
      </el-table-column>

      <el-table-column prop="title" label="浏览数" width="100" align="center">
        <template slot-scope="scope">{{ scope.row.scanNumber }}</template>
      </el-table-column>

      <el-table-column prop="title" label="评论量" width="100" align="center">
        <template slot-scope="scope">{{ scope.row.commentNumber }}</template>
      </el-table-column>

      <el-table-column prop="title" label="所属分类" width="100" align="center">
        <template slot-scope="scope">{{
          scope.row.category ? scope.row.category.name : "未分类"
        }}</template>
      </el-table-column>

      <el-table-column prop="title" label="创建日期" width="200" align="center">
        <template slot-scope="scope">{{
          formatDate(scope.row.createDate)
        }}</template>
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
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
              @click="handleEditClick(scope.row)"
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
              @click="handleDeleteBlog(scope.row.id)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="margin-top: 30px"
      background
      :page-size="eachPage"
      :page-sizes="[5, 10, 20]"
      layout="prev, pager, next, total, ->, sizes, jumper"
      :total="totalLimit"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      @prev-click="handlePrevClick"
      @next-click="handleNextClick"
    >
    </el-pagination>
  </div>
</template>

<script>
import { getBlogs, deleteBlog } from "@/api/blog";
import { formatDate } from "@/utils/tools";
import { client_URL } from "@/urlConfig";
export default {
  data() {
    return {
      data: [],
      srcList: [], //预览图链接
      eachPage: 10, //每页显示的页数
      currentPage: 1, //当前显示的页数
      totalPage: 0, //总页数
      totalLimit: 0, //总数据数
      listLoading: false,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    formatDate,
    async fetchData() {
      this.listLoading = true;
      const { data } = await getBlogs(this.currentPage, this.eachPage);
      this.data = data.rows;
      for (const item of this.data) {
        // item.thumb = server_URL + item.thumb;
        this.srcList.push(item.thumb);
      }
      this.totalLimit = data.total;
      this.totalPage = Math.ceil(this.totalLimit / this.eachPage);
      this.listLoading = false;
      if (this.currentPage > this.totalPage) {
        this.currentPage = this.totalPage;
        this.fetchData();
      }
    },
    handleGoToTitle(blogInfo) {
      window.open(`${client_URL}/article/${blogInfo.id}`);
    },
    handleDeleteBlog(blogId) {
      this.$confirm(
        "删除该文章会将该文章的评论一并删除, 是否继续?",
        "是否删除该文章",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          deleteBlog(blogId).then(() => {
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
    handleSizeChange(currentLimit) {
      this.eachPage = currentLimit;
      this.currentPage = 1;
      this.fetchData();
    },
    handleCurrentChange(pageNumber) {
      this.currentPage = parseInt(pageNumber);
      this.fetchData();
    },
    handlePrevClick() {
      this.currentPage--;
    },
    handleNextClick() {
      this.currentPage++;
    },
    handleEditClick(blogInfo) {
      this.$router.push(`/editblog/${blogInfo.id}`);
    },
  },
};
</script>

<style lang="scss" scoped></style>
