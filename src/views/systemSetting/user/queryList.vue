<template>
  <div class="queryList-wrapper">
    <el-form :inline="true" :model="form" ref="form" :rules="formRules" class="queryList-form">
      <el-form-item label="账号：">
        <el-input v-model="form.account" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item label="手机号码：" prop="phone">
        <el-input v-model="form.phone" placeholder="请输入手机号码"></el-input>
      </el-form-item>
      <el-form-item label="状态：">
        <el-select v-model="form.status" placeholder="请选择状态">
          <el-option
            v-for="item in userStatusType"
            :key="item.value"
            :value="item.value"
            :label="item.label"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
   <div class="btn-right">
      <el-button  @click="form={}">重置</el-button>
      <el-button type="primary" @click="onSubmit">查询</el-button>
    </div>
  </div>
</template>

<script>
import {userStatusType} from "@/dictionary"
export default {
  data() {
    const validatePhone = (rule, value, callback) => {
        if (value && value.length < 11) {
          callback(new Error("请输入正确的手机号码"));
        } else {
          callback();
        }
      }
    return {
      userStatusType:userStatusType,
      form:{},
      formRules:{
        username: [
          {trigger: "blur", validator: validatePhone}
        ]
        }
    }
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(valid => {
        if(valid) {
          this.$emit("query",this.form)
        }
      })
    }
  }
}
</script>
<style lang="scss">
.queryList-wrapper {
  overflow: hidden;
  border-bottom: 1px solid #E8E8E8;
  padding-bottom: 20px;
  margin-bottom: 20px;
  .queryList-form{
    .el-form-item {
      width: calc(100% /3);
      margin-right: 0;
    }
  }
  .el-form-item__label{
    color: rgba(0, 0, 0, 0.45);
  }
  .btn-right {
    float: right;
  }
}
</style>