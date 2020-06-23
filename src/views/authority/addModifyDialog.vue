<template>
  <div class="addModifyDialog-wrapper">
    <el-dialog 
      title="提示"
      :visible.sync="dialogVisible"
      :modal-append-to-body="false"
      width="40%">
      <el-form :model="form" :rules="rules" ref="ruleForm" label-width="120px">
        <el-form-item label="父权限名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="权限名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="权限类型">
          <el-select v-model="form.type" :placeholder="请选择权限类型">
            <el-option label="基础菜单" value="1"></el-option>
            <el-option label="操作功能" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="* 菜单唯一标识" v-if="form.type==1">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="* 功能URL/标识" v-if="form.type==2">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      form:{
        type:1
      }
    }
  },
  methods: {
    show() {
      this.dialogVisible = true
    }
  }
}
</script>

<style lang="scss">
.addModifyDialog-wrapper {

}
</style>