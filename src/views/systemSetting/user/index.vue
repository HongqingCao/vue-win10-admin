<template>
  <div class="user-wrapper">
    <el-button type="primary" @click.stop="addUser('', '新增用户')">新增用户</el-button>
    <el-table
    class="role-table"
      :data="tableData"
      style="width: 100%">
      <el-table-column
        label="序号"
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        label="账号"
        prop="account" 
        width="150">
      </el-table-column>
      <el-table-column
        label="昵称"
        prop="name" 
        width="150">
      </el-table-column>
      <el-table-column
        label="角色"
        prop="role_id" 
        width="100">
      </el-table-column>
      <el-table-column
        label="性别"
        prop="sex" 
        width="50">
      </el-table-column>
      <el-table-column
        label="手机号码"
        prop="phone" 
        width="150">
      </el-table-column>
       <el-table-column
        label="状态"
        prop="status" 
        width="100">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-edit"
            @click="addUser(scope.row,'修改角色')"></el-button>
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="delRole(scope.row)"></el-button>
          <el-button
            size="mini"
            type="success"
            @click="setRoleAuth(scope.row)">设置权限</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- <addModify 
      ref="refaddModifyDialog"
      @createdRole="createdRole"
      @updateRole="updateRole"
    ></addModify>
    <setRole
      ref="refSetRole"
      @addRole="addRole"
    ></setRole> -->
  </div>
</template>

<script>
  const addModify = () => import('./addModifyDialog')
  const setRole = () => import('./setRoleDialog')
  import { getUserList, createdUser, updateUser, deleteUser} from "@/api/user"
  export default {
    components:{
     addModify,
     setRole
    },
    data() {
      return {
        tableData: []
      }
    },
    methods: {
      addUser(data,title) {
        this.$refs.refaddModifyDialog.show(data,title)
      },
      delUser(data) {
         this.$confirm('此操作将删除该账户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteUser(data)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })        
        })
      },
      deleteUser(data) {
        deleteUser(data).then(res => {
          if (res.code === 20000) {
            this.$message({
              message: res.message,
              type: 'success'
            })
            this.getData()
          }
        })
      },
      createdUser(data) {
        createdUser(data).then(res => {
          if (res.code === 20000) {
            this.$message({
              message: res.message,
              type: 'success'
            })
            this.$refs.refaddModifyDialog.dialogVisible = false
            this.getData()
          }
        })
      },
      updateUser(data) {
        updateUser(data).then(res => {
          if (res.code === 20000) {
            this.$message({
              message: res.message,
              type: 'success'
            })
            this.$refs.refaddModifyDialog.dialogVisible = false
            this.getData()
          }
        })
      },
      // setRoleAuth(data) {
      //   console.log(data)
      //   this.$refs.refSetAuth.show(data)
      // },
      // addRoleAuth(data) {
      //   addRoleAuth(data).then(res => {
      //     if (res.code === 20000) {
      //       this.$message({
      //         message: res.message,
      //         type: 'success'
      //       })
      //       this.$refs.refSetAuth.dialogVisible = false
      //       this.getData()
      //     }
      //   })
      // },
      getData() {
        getUserList().then(res => {
          if (res.code === 20000 && res.data) {
            this.tableData = res.data.list
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
.user-wrapper{
  padding: 20px 12px 50px 12px;
  background: #ffffff;
  .role-table {
    margin-top: 20px;
    .el-table__header-wrapper {
      background-color: #f1f3fa !important;
    }
  }
.el-table .cell {
  display: flex;
}

}
</style>