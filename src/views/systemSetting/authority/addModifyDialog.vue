<template>
  <div class="addModifyDialog-wrapper">
    <el-dialog 
      :title="title"
      :visible.sync="dialogVisible"
      :modal-append-to-body="false"
      width="500px">
      <el-form :model="form" :rules="rules" ref="ruleForm" label-width="120px">
        <el-form-item label="父权限名称">
          <el-input v-model="form.parent_name" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="* 权限名称">
          <el-input v-model="form.authority_name"></el-input>
        </el-form-item>
        <el-form-item label="* 权限类型">
          <el-select v-model="form.authority_type" placeholder="请选择权限类型">
            <el-option 
              v-for="item in authorityType"
              :key="item.value"
              :value="item.value"
              :label="item.label"
              >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="* 菜单唯一标识" v-if="form.authority_type==0">
          <el-input v-model="form.authority_url"></el-input>
        </el-form-item>
        <el-form-item label="* 功能URL/标识" v-if="form.authority_type==1">
          <el-input v-model="form.authority_url"></el-input>
        </el-form-item>
        <el-form-item label="* 排序">
          <el-input v-model="form.authority_sort"></el-input>
        </el-form-item>
        <el-form-item label="* 权限描述">
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
import {authorityType} from "@/dictionary"
export default {
  data() {
    return {
      dialogVisible: false,
      title:'新增权限',
      authorityType:authorityType,
      form:{
        authority_type:authorityType[0].value,
        status:true,
        parent_name:'',
        parent_id:"0"
      },
      rules:{}
    }
  },
  methods: {
    show(data,title) {
      this.title = title
      this.dialogVisible = true
      this.form = {
        authority_type:authorityType[0].value,
        status:true,
        parent_name:'',
        parent_id:"0"
      }
      if(this.title == '新增权限') {
        this.form.parent_name = data.authority_name ? data.authority_name : ""
        this.form.parent_id = data.authority_id ? data.authority_id : "0"
      } else this.form = data
    },
    confirm() {
      if (this.title == '新增权限') {
        this.$emit('createdAuth', this.form);
      } else {
        this.$emit('updateAuth', this.form);
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