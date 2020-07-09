<template>
  <div class="addModifyDialog-wrapper">
    <el-dialog 
      :title="title"
      :visible.sync="dialogVisible"
      :modal-append-to-body="false"
      width="500px">
      <el-form :model="form" :rules="rules" ref="ruleForm" label-width="120px">
        <el-form-item label="* 角色名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="* 角色描述">
          <el-input v-model="form.desc"></el-input>
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
      form:{},
      rules:{}
    }
  },
  methods: {
    show(data,title) {
      this.title = title
      this.dialogVisible = true
      this.form = data ? data : {}
    },
    confirm() {
      if (this.title == '新增角色') {
        this.$emit('createdRole', this.form);
      } else {
        this.$emit('updateRole', this.form);
      }
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