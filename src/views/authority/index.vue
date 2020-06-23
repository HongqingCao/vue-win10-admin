<template>
  <div class="authority-wrapper">
    <el-button type="primary">添加权限</el-button>
    <div class="authority-content">
      <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick">
        <span class="tree-node" slot-scope="{ node }">
          <span class="node-name">{{ node.label }}</span>
          <div class="operate-btn">
            <span @click.stop="addNode()">新增</span>
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
  import addModify from './addModifyDialog';
  export default {
    components:{
     addModify
    },
    data() {
      return {
        data: [{
          label: '仪表台',
          children: [{
            label: '二级 1-1',
            children: [{
              label: '三级 1-1-1'
            }]
          }]
        }, {
          label: '平台管理',
          children: [{
            label: '二级 2-1',
            children: [{
              label: '三级 2-1-1'
            }]
          }, {
            label: '二级 2-2',
            children: [{
              label: '三级 2-2-1'
            }]
          }]
        }, {
          label: '一级 3',
          children: [{
            label: '二级 3-1',
            children: [{
              label: '三级 3-1-1'
            }]
          }, {
            label: '二级 3-2',
            children: [{
              label: '三级 3-2-1'
            }]
          }]
        }, {
          label: '一级 3',
          children: [{
            label: '二级 3-1',
            children: [{
              label: '三级 3-1-1'
            }]
          }, {
            label: '二级 3-2',
            children: [{
              label: '三级 3-2-1'
            }]
          }]
        }, {
          label: '一级 3',
          children: [{
            label: '二级 3-1',
            children: [{
              label: '三级 3-1-1'
            }]
          }, {
            label: '二级 3-2',
            children: [{
              label: '三级 3-2-1'
            }]
          },{
            label: '二级 3-1',
            children: [{
              label: '三级 3-1-1'
            }]
          }, {
            label: '二级 3-2',
            children: [{
              label: '三级 3-2-1'
            }]
          },{
            label: '二级 3-1',
            children: [{
              label: '三级 3-1-1'
            }]
          }, {
            label: '二级 3-2',
            children: [{
              label: '三级 3-2-1'
            }]
          },{
            label: '二级 3-1',
            children: [{
              label: '三级 3-1-1'
            }]
          }, {
            label: '二级 3-2',
            children: [{
              label: '三级 3-2-1'
            }]
          },{
            label: '二级 3-1',
            children: [{
              label: '三级 3-1-1'
            }]
          }, {
            label: '二级 3-2',
            children: [{
              label: '三级 3-2-1'
            }]
          },{
            label: '二级 3-1',
            children: [{
              label: '三级 3-1-1'
            }]
          }, {
            label: '二级 3-2',
            children: [{
              label: '三级 3-2-1'
            }]
          },{
            label: '二级 3-1',
            children: [{
              label: '三级 3-1-1'
            }]
          }, {
            label: '二级 3-2',
            children: [{
              label: '三级 3-2-1'
            }]
          }]
        }, {
          label: '一级 3',
          children: [{
            label: '二级 3-1',
            children: [{
              label: '三级 3-1-1'
            }]
          }, {
            label: '二级 3-2',
            children: [{
              label: '三级 3-2-1'
            }]
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    },
    methods: {
      handleNodeClick(data) {
        console.log(data);
      },
      addNode() {
        console.log("222")
         this.$refs.refaddModifyDialog.show()
      }
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