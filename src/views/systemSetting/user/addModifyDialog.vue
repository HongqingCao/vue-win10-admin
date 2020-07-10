<template>
  <div class="addModifyDialog-wrapper">
    <el-dialog 
      :title="title"
      :visible.sync="dialogVisible"
      :modal-append-to-body="false"
      width="450px">
      <el-form :model="form" :rules="rules" ref="ruleForm" label-width="85px">
        <el-form-item label="* 账号">
          <el-input v-model="form.account"></el-input>
        </el-form-item>
        <el-form-item label="* 姓名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="* 密码">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="* 重复密码">
          <el-input v-model="password"></el-input>
        </el-form-item>
        <el-form-item label="* 手机号码">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="* 性别">
          <el-select v-model="form.sex" placeholder="请选择" size="small">
            <el-option 
              v-for="item in sexType"
              :key="item.value"
              :value="item.value"
              :label="item.label"
              >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="* 冻结">
          <el-switch
            v-model="form.status"
            active-value="0"
            inactive-value="1">
          </el-switch>
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
import {sexType} from "@/dictionary"
export default {
  data() {
    return {
      sexType:sexType,
      dialogVisible: false,
      title:'新增用户',
      password:'',
      form:{type:1},
      rules:{}
    }
  },
  methods: {
    show(data,title) {
      this.title = title
      this.dialogVisible = true
      this.form = data ? JSON.parse(JSON.stringify(data)) : {type:1}
    },
    confirm() {
      this.form.status = +this.form.status
      console.log()
      if (this.title == '新增用户') {
        this.$emit('createdUser', this.form);
      } else {
        this.$emit('updateUser', this.form);
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