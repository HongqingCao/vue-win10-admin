<template>
  <div class="authority-wrapper">
    <el-button type="primary">添加权限</el-button>
    <div class="authority-content">
      <el-tree :data="nodeData"  @node-click="handleNodeClick">
        <span class="tree-node" slot-scope="{ data }">
          <span class="node-name">{{ data.authority_name }}</span>
          <div class="operate-btn">
            <span @click.stop="addNode(data)">新增</span>
            <span>修改</span>
            <span>删除</span>
          </div>
        </span>
      </el-tree>
    </div>
    <addModify 
     ref="refaddModifyDialog"
    ></addModify>
  </div>
</template>

<script>
  const addModify = () => import('./addModifyDialog')
  import { getAllAuthList } from "@/api/systemSetting"
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
      addNode(data) {
        this.$refs.refaddModifyDialog.show(data,'新增权限')
      },
      getTreeNodeData(data, pid) {
        if (data.length === 0) return []
        let nodeArr = [], tempList = data.concat()
        for (let i in tempList) {
          if (tempList[i].parent_id == pid) {
            tempList[i].children =  this.getTreeNodeData(tempList, tempList[i].authority_id)
            nodeArr.push(tempList[i])
          }
        }

        return nodeArr
      },
      getData() {
        getAllAuthList().then(res => {
          if (res.code === 20000 && res.data) {
            this.nodeData = this.getTreeNodeData(res.data,'')
            console.log("222222")
            console.log(this.nodeData)
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