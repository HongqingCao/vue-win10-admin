<!--
 * @Author: your name
 * @Date: 2020-07-09 21:47:22
 * @LastEditTime: 2020-07-11 21:46:44
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \home-worlkf:\github\vue-win10-admin\src\views\systemSetting\user\setRoleDialog.vue
--> 
<template>
  <div class="setRoleDialog-wrapper">
    <el-dialog 
      :title="title"
      :visible.sync="dialogVisible"
      :modal-append-to-body="false"
      width="500px">
      <el-table ref="tableRef" :data="tableData">
        <el-table-column label="选项"  width="60">
          <template slot-scope="scope"><el-radio v-model="role_id" :label="scope.row.role_id" @change="changeRadio(scope.row)"></el-radio></template>
        </el-table-column>
        <el-table-column prop="name" label="角色名称"></el-table-column>
        <el-table-column prop="desc" label="角色描述"></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="confirm">确 定</el-button>
    </span>
    </el-dialog>
  </div>
</template>

<script>
import {sexType} from "@/dictionary"
  import { getAllRoleList } from "@/api/systemSetting"
export default {
  data() {
    return {
      sexType:sexType,
      dialogVisible: false,
      title:'设置角色',
      tableData:[],
      role_id:'',
      role_name:'',
      data:''
    }
  },
  methods: {
    show(data) {
      this.role_id = data.role_id?data.role_id:''
      this.data = data
      this.dialogVisible = true
      this.getRoleList()
    },
    getRoleList() {
      getAllRoleList().then(res => {
        if (res.code === 20000 && res.data) {
          this.tableData = res.data
        }
      })
    },
    changeRadio(data) {
      console.log(data)
        this.role_name = data.name
    },
    confirm() {
      let data = {
        role_id: this.role_id,
        role_name: this.role_name,
        user_id: this.data.user_id
      }
      this.$emit('addRole', data)
    }
  }
}
</script>

<style lang="scss">
.setRoleDialog-wrapper {
  .el-dialog{
    .el-dialog__header{
      border-bottom: 1px solid rgba(0, 0, 0, 0.09);
    }
  }
.el-radio__label {
  display: none;
}
.el-form-item__label{
  font-size: 14px;
  color: rgba(0, 0, 0, 0.55);
}
}
</style>