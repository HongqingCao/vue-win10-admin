<template>
  <div class="setRoleAuthDialog-wrapper">
    <el-dialog 
      :title="title"
      :visible.sync="dialogVisible"
      :modal-append-to-body="false"
      width="500px">
      <el-tree
        show-checkbox
        node-key="authority_id"
        @check="nodeChanged"
        :default-expanded-keys="defaultExpandedArr"
        :default-checked-keys="defaultCheckedArr"
        :data="nodeData"
        :props="defaultProps"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="confirm">确 定</el-button>
    </span>
    </el-dialog>
  </div>
</template>

<script>
import { getAllAuthList } from "@/api/systemSetting"

export default {
  data() {
    return {
      dialogVisible: false,
      title:'设置权限',
      defaultExpandedArr:[],
      defaultCheckedArr:[],
      halfCheckedKeys:[],
      nodeData:[],
      role_id:'',
      checkedData:[],
      defaultProps: {
          children: 'children',
          label: 'authority_name'
        }
    }
  },
  methods: {
    show(data) {
      this.dialogVisible = true
      this.defaultCheckedArr = []
      this.role_id = data.role_id
      this.getAllAuthList()
      let halfCheckedKeys = data.half_checked ? data.half_checked.split(',')  : []
      let defaultCheckedArr = data.auth_ids ? data.auth_ids.split(',') : []
      // 过滤掉 【父节点的子节点未全部选中的父节点】
      this.defaultCheckedArr = defaultCheckedArr.filter(item=> halfCheckedKeys.indexOf(item)==-1)
    },
    getAllAuthList() {
      getAllAuthList().then(res => {
          if (res.code === 20000 && res.data) {
            this.nodeData = this.getTreeNodeData(res.data,'0')
           // this.selectedNodeIds = this.defaultExpandedArr
          }
        })
    },
    getTreeNodeData(tempList, pid) {
      if (tempList.length === 0) return []
      let nodeArr = []
      for (let i in tempList) {
        if (tempList[i].parent_id === pid) {
          tempList[i].children =  this.getTreeNodeData(tempList, tempList[i].authority_id)
          nodeArr.push(tempList[i])
        }
        this.defaultExpandedArr.push(tempList[i].authority_id)
      }
      return nodeArr
    },
    nodeChanged(data, checkedData) {
      let checkedKeys = checkedData.checkedKeys
      // 【子节点选中，父节点必选中】
      this.halfCheckedKeys = checkedData.halfCheckedKeys
      this.selectedNodeIds = checkedKeys.concat(this.halfCheckedKeys)
     
    },
    confirm() {
      this.selectedNodeIds = Array.from(new Set(this.selectedNodeIds)) 
      let data = {
        role_id: this.role_id,
        half_checked: this.halfCheckedKeys ? this.halfCheckedKeys.join():'',
        auth_ids: this.selectedNodeIds.join()
      }
      console.log(data)
      this.$emit('addRoleAuth', data);
    }
  }
}
</script>

<style lang="scss">
.setRoleAuthDialog-wrapper {
  .el-dialog__wrapper{
    padding-bottom: 100px;
  }
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