<!--
 * @Author: your name
 * @Date: 2020-07-09 21:47:22
 * @LastEditTime: 2020-07-18 12:57:42
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \vue-win10-admin\src\views\systemSetting\role\addModifyDialog.vue
--> 
<template>
  <div class="addModifyDialog-wrapper">
    <el-dialog 
      :title="title"
      :visible.sync="dialogVisible"
      :modal-append-to-body="false"
      width="500px">
      <el-form :model="ruleForm" :rules="roleRules" ref="ruleForm" label-width="120px">
        <el-form-item label="角色名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="ruleForm.desc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="confirm">确 定</el-button>
    </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      title:'新增角色',
      ruleForm:{
        name:''
      },
      roleRules:{
        name: [
            { required: true, message: '请输入角色名', trigger: 'blur' }
          ]
      }
    }
  },
  methods: {
    show(data,title) {
      this.title = title
      this.dialogVisible = true
      this.ruleForm = data ? JSON.parse(JSON.stringify(data)) : {}
    },
    confirm() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          if (this.title == '新增角色') {
            this.$emit('createdRole', this.ruleForm);
          } else {
            this.$emit('updateRole', this.ruleForm);
          }
        }
      })
    }
  }
}
</script>

<style lang="scss">
.addModifyDialog-wrapper {
  .el-dialog{
    .el-dialog__header{
      border-bottom: 1px solid rgba(0, 0, 0, 0.09);
    }
  }

.el-form-item__label{
  font-size: 14px;
  color: rgba(0, 0, 0, 0.55);
}
}
</style>