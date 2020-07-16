<template>
  <div class="addModifyDialog-wrapper">
    <el-dialog 
      :title="title"
      :visible.sync="dialogVisible"
      :modal-append-to-body="false"
      width="450px">
      <el-form :model="form" :rules="rules" ref="ruleForm" label-width="85px">
        <el-form-item label="账号" prop="account">
          <el-input v-model="form.account"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" v-if="title == '新增用户'">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
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
        <el-form-item label="冻结">
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
    const passwordValidator = (rule, value, callback) => {
      if (value) {
        if (value.length < 6 || value.length > 16) {
          callback(new Error('密码长度为6~16位'))
          return
        }
      } else {
        callback(new Error('请输入密码'))
      }
    } 
    return {
      sexType:sexType,
      dialogVisible: false,
      title:'新增用户',
      password:'',
      form:{},
      rules:{
        account: [
          {required: true, trigger: "blur", message: '请输入账号'}
        ],
        name: [
          {required: true, trigger: "blur", message: '请输入姓名'}
        ],
        password: [
          { required: true, validator: passwordValidator, trigger: 'blur' }
        ],
        phone: [
          {required: true, validator: this.formValid.phoneReg, trigger: "blur"}
        ],
        sex: [
          {required: true, trigger: "blur", message: '请选择性别'}
        ]
      }
    }
  },
  methods: {
    show(data,title) {
      this.title = title 
      this.dialogVisible = true
      this.form = data ? JSON.parse(JSON.stringify(data)) : {}
    },
    confirm() {
      this.form.status = +this.form.status
      let form = Object.assign({}, this.form),
          leng = 0,
          formValids = (this.title == '新增用户') ? ['account','name','password','phone','sex'] : ['account','name','phone','sex']
      this.$refs.ruleForm.validateField(formValids, errorMessage=> {
        if (!errorMessage) leng++
        if (leng === formValids.length -1) {
          if (this.title == '新增用户') {
            this.$emit('createdUser', form)
          } else {
            delete form.passwordConfirm
            this.$emit('updateUser', form)
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