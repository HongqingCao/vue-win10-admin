<template>
  <div class="role-wrapper">
    <el-button type="primary" @click.stop="addNode('', '创建角色')">创建角色</el-button>
    <el-table
    class="role-table"
      :data="tableData"
      style="width: 100%">
      <el-table-column
        label="角色序号"
        type="index"
        width="120">
      </el-table-column>
      <el-table-column
        label="角色名称"
        width="200">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>角色名称: {{ scope.row.name }}</p>
            <p>角色描述: {{ scope.row.address }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.name }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        label="创建时间"
        prop="date" 
        width="200">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-edit"
            @click="handleEdit(scope.$index, scope.row)"></el-button>
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="handleDelete(scope.$index, scope.row)"></el-button>
          <el-button
            size="mini"
            type="success"
            @click="handleDelete(scope.$index, scope.row)">分配权限</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        tableData: []
      }
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
    }
  }
</script>
<style lang="scss">
.role-wrapper{
  .role-table {
    margin-top: 20px;
    .el-table__header-wrapper {
      background-color: #f1f3fa !important;
    }
  }
}
</style>