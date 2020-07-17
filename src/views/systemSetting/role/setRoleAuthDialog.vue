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
      this.getAllAuthList()
      //console.log(data)
      this.role_id = data.role_id
      this.defaultCheckedArr = data.auth_ids ? data.auth_ids.split(',') : []
    },
    getAllAuthList() {
      getAllAuthList().then(res => {
          if (res.code === 20000 && res.data) {
            this.nodeData = this.getTreeNodeData(res.data,'0')
            this.selectedNodeIds = this.defaultExpandedArr
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
      this.selectedNodeIds = checkedData.checkedKeys
      console.log(checkedData.checkedKeys)
      //this.selectedNodeIds = Array.from(new Set(this.selectedNodeIds)) 
    },
    confirm() {
      this.selectedNodeIds = Array.from(new Set(this.selectedNodeIds)) 
      let data = {
        role_id: this.role_id,
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