<template>
  <div class="role-wrapper">
    <el-button type="primary" @click.stop="addRole('', '新增角色')">新增角色</el-button>
    <el-table
    class="role-table"
      :data="tableData"
      style="width: 100%">
      <el-table-column
        label="角色序号"
        type="index"
        width="120">
      </el-table-column>
      <el-table-column
        label="角色名称"
        width="200">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>角色名称: {{ scope.row.name }}</p>
            <p>角色描述: {{ scope.row.desc }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.name }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="创建时间"  width="200">
        <template slot-scope="scope"> {{ Date.parse(scope.row.createdAt) | date}}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-edit"
            @click="addRole(scope.row,'修改角色')"></el-button>
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
    <addModify 
      ref="refaddModifyDialog"
      @createdRole="createdRole"
      @updateRole="updateRole"
    ></addModify>
    <setAuth
      ref="refSetAuth"
      @addRoleAuth="addRoleAuth"
    ></setAuth>
  </div>
</template>

<script>
  const addModify = () => import('./addModifyDialog')
  const setAuth = () => import('./setRoleAuthDialog')
  import { getAllRoleList, createdRole, updateRole, deleteRole, addRoleAuth} from "@/api/systemSetting"
  export default {
    components:{
     addModify,
     setAuth
    },
    data() {
      return {
        tableData: []
      }
    },
    methods: {
      addRole(data,title) {
        this.$refs.refaddModifyDialog.show(data,title)
      },
      delRole(data) {
         this.$confirm('此操作将删除该权限, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteRole(data)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })        
        })
      },
      deleteRole(data) {
        deleteRole(data).then(res => {
          if (res.code === 20000) {
            this.$message({
              message: res.message,
              type: 'success'
            })
            this.getData()
          }
        })
      },
      createdRole(data) {
        createdRole(data).then(res => {
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
      updateRole(data) {
        updateRole(data).then(res => {
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
      setRoleAuth(data) {
        console.log(data)
        this.$refs.refSetAuth.show(data)
      },
      addRoleAuth(data) {
        addRoleAuth(data).then(res => {
          if (res.code === 20000) {
            this.$message({
              message: res.message,
              type: 'success'
            })
            this.$refs.refSetAuth.dialogVisible = false
            this.getData()
          }
        })
      },
      getData() {
        getAllRoleList().then(res => {
          if (res.code === 20000 && res.data) {
            this.tableData = res.data
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
.role-wrapper{
  padding: 20px 12px 50px 12px;
  background: #ffffff;
  .role-table {
    margin-top: 20px;
    .el-table__header-wrapper {
      background-color: #f1f3fa !important;
    }
  }
}
</style>