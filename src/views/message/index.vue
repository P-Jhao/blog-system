<template>
  <div class="app-container">
    <el-table
      :data="data.rows"
      style="width: 100%"
      border
      stripe
      v-loading="listLoading"
      element-loading-text="加载数据中"
    >
      <el-table-column prop="date" label="序号" width="60" align="center">
        <template slot-scope="scope">{{
          scope.$index + (currentPage - 1) * limit + 1
        }}</template>
      </el-table-column>
      <el-table-column label="头像" align="center" width="50">
        <template slot-scope="scope">
          <el-image
            style="width: 25px; height: 25px"
            :src="scope.row.avatar"
            fit="contain"
          >
          </el-image>
        </template>
      </el-table-column>
      <el-table-column prop="nickname" label="昵称" width="100" align="center">
        <template slot-scope="scope">{{ scope.row.nickname }}</template>
      </el-table-column>
      <el-table-column prop="content" label="留言内容">
        <template slot-scope="scope">{{ scope.row.content }}</template>
      </el-table-column>
      <el-table-column prop="time" label="创建日期" width="200" align="center">
        <template slot-scope="scope">{{
          formatDate(scope.row.createDate)
        }}</template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="80">
        <template slot-scope="scope">
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
              @click="handleDeleteMessage(scope.row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="margin-top: 30px"
      background
      :page-size="limit"
      :page-sizes="[5, 10, 20]"
      layout="prev, pager, next, total, ->, sizes, jumper"
      :total="data.total"
      :current-page.sync="pagerCurrentPage"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      @prev-click="handlePrevClick"
      @next-click="handleNextClick"
    >
    </el-pagination>
  </div>
</template>

<script>
import { getMessages, deleteMessage } from "@/api/message";
import { formatDate } from "@/utils/tools";
// import { server_URL } from "@/urlConfig";

export default {
  data() {
    return {
      data: {},
      listLoading: false,
      limit: 5,
      currentPage: 1,
      pagerCurrentPage: 1,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    formatDate,
    async fetchData() {
      this.listLoading = true;
      const { data } = await getMessages(this.currentPage, this.limit);
      // for (const item of data.rows) {
      //   item.avatar2 = server_URL + item.avatar;
      // }
      this.data = data;
      this.listLoading = false;
    },
    handleDeleteMessage({ id }) {
      this.$confirm("是否确定删除此评论, 是否继续?", "是否删除该评论", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteMessage(id).then(() => {
            const maxPage = this.data.total / this.limit;
            if (maxPage < this.currentPage) {
              this.currentPage = maxPage;
            }
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
      this.limit = currentLimit;
      this.currentPage = 1;
      this.pagerCurrentPage = 1;
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
  },
};
</script>

<style></style>
