<template>
  <div class="authority-wrapper">
    <el-button type="primary" @click.stop="addNode('', '新增权限')">添加权限</el-button>
    <div class="authority-content">
      <el-tree :data="nodeData"  @node-click="handleNodeClick">
        <span class="tree-node" slot-scope="{ data }">
          <span class="node-name">{{ data.authority_name }}</span>
          <div class="operate-btn">
            <span @click.stop="addNode(data, '新增权限')">新增</span>
            <span @click.stop="addNode(data,'修改权限')">修改</span>
            <span>删除</span>
          </div>
        </span>
      </el-tree>
    </div>
    <addModify 
     ref="refaddModifyDialog"
     @createdAuth="createdAuth"
     @updateAuth="updateAuth"
    ></addModify>
  </div>
</template>

<script>
  const addModify = () => import('./addModifyDialog')
  import { getAllAuthList, createdAuth, updateAuth} from "@/api/systemSetting"
  export default {
    components:{
     addModify
    },
    data() {
      return {
        nodeData:[]
      };
    },
    methods: {
      handleNodeClick(data) {
        console.log(data);
      },
      addNode(data, title) {
        console.log(data)
        this.$refs.refaddModifyDialog.show(data,title)
      },
      createdAuth(data) {
        createdAuth(data).then(res => {
          if (res.code === 20000) {
            this.$message({
              message: res.message,
              type: 'success'
            })
            this.$refs.refaddModifyDialog.dialogVisible = false
            this.getData()
          }
        })
      },
      updateAuth(data) {
        updateAuth(data).then(res => {
          if (res.code === 20000) {
            this.$message({
              message: res.message,
              type: 'success'
            })
            this.$refs.refaddModifyDialog.dialogVisible = false
            this.getData()
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
        }
        if (nodeArr.children && nodeArr.children.length > 1) {
           nodeArr.children.sort((a, b) => a.authority_sort - b.authority_sort)
        }
        if (nodeArr.children && nodeArr.children.length === 0) {
          delete nodeArr.children
        }
        return nodeArr
      },
      getData() {
        getAllAuthList().then(res => {
          if (res.code === 20000 && res.data) {
            this.nodeData = this.getTreeNodeData(res.data,'0')
          }
        })
      }
    },
    mounted() {
      this.getData()
    }
  };
</script>
<style lang="scss">
.authority-wrapper {
  min-height: 80%;
  padding: 12px;
  background: #ffffff;
  .authority-content {
    padding-top:20px;
    .el-tree-node__content .operate-btn {
       display: none;
    }
    .el-tree-node__content:hover .operate-btn {
      display: inline-block;
    }
    .tree-node {
      display: inline-block;
      font-size: 14px;
      color: #1890ff;
      .node-name {
        color: rgba(0, 0, 0, 0.65);
        margin-right: 30px;
      }
      .functionLabel {
        color: rgba(0, 0, 0, 0.65);
      }
      .operate-btn {
        display: none;
        font-size: 0px;
        margin-right: 80px;
        span {
          display: inline-block;
          margin-left: 16px;
          font-size: 14px;
          color: #1890ff;
          cursor: pointer;
        }
      }
    }
  }
}
</style>