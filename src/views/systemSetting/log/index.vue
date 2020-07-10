<template>
  <div class="log-wrapper">
    <el-table class="role-table" :data="tableData" style="width: 100%">
      <el-table-column label="序号" type="index" width="50"></el-table-column>
      <el-table-column label="操作时间" prop="updatedAt" width="150"></el-table-column>
      <el-table-column label="账号" prop="create_name" width="120"></el-table-column>
      <el-table-column label="类型" prop="type"  width="80"></el-table-column>
      <el-table-column label="内容" prop="desc"  width="250"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="delLog(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      style="float:right"
      layout="total, prev, pager, next"
      :total="pageData.totals"
      :page-size="pageData.pageSize"
      :current-page.sync="pageData.page"
       @current-change="pageChanged"
      >
    </el-pagination>
  </div>
</template>

<script>
  import { getAllLogList, deleteLog} from "@/api/systemSetting"
  export default {
    data() {
      return {
        tableData: [],
        pageData:{}
      }
    },
    methods: {
      delLog(data) {
         this.$confirm('此操作将删除该条日志, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteLog(data)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })        
        })
      },
      deleteLog(data) {
        deleteLog(data).then(res => {
          if (res.code === 20000) {
            this.$message({
              message: res.message,
              type: 'success'
            })
            this.getData()
          }
        })
      },
      pageChanged(index){
        this.getData({page:index})
      },
      getData(data) {
        getAllLogList(data).then(res => {
          if (res.code === 20000 && res.data) {
            this.tableData = res.data.list
            this.pageData = res.data.pageData
          }
        })
      }
    },
    mounted() {
      this.getData()
    }
  }
</script>
<style lang="scss">
.log-wrapper{
  padding: 20px 12px 50px 12px;
  background: #ffffff;
  .role-table {
    margin: 20px 0 20px 0;
    .el-table__header-wrapper {
      background-color: #f1f3fa !important;
    }
  }
.el-table .cell {
  display: flex;
}

}
</style>