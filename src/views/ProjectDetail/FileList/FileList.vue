<script setup lang=ts>

import {ref,reactive,watch,computed} from "vue";
import { ElTree,TreeNode} from 'element-plus'
import { FilterNodeMethodFunction, FilterValue } from "element-plus/es/components/tree/src/tree.type";
import { TreeNodeData } from "element-plus/es/components/tree-v2/src/types";
import {PiFile} from '@/types/File';

interface Tree {
  id: number
  label: string
  children?: Tree[]
}

const filterText = ref('')
const treeRef = ref<InstanceType<typeof ElTree>>()

const defaultProps = {
  children: 'children',
  label: 'label',
}

watch(filterText, (val) => {
  treeRef.value!.filter(val)
})

/**
 *  下面这个格式是代码定义的，不这样写就报错，我就这样写了
 */
const filterNode :FilterNodeMethodFunction= (value: FilterValue, data:TreeNodeData):boolean=> {
  if (!value) return true
  return data.label.includes(value)
}

const data: Tree[] = [
  {
    id: 1,
    label: 'Level one 1',
    children: [
      {
        id: 4,
        label: 'Level two 1-1',
        children: [
          {
            id: 9,
            label: 'Level three 1-1-1',
          },
          {
            id: 10,
            label: 'Level three 1-1-2',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    label: 'Level one 2',
    children: [
      {
        id: 5,
        label: 'Level two 2-1',
      },
      {
        id: 6,
        label: 'Level two 2-2',
      },
    ],
  },
  {
    id: 3,
    label: 'Level one 3',
    children: [
      {
        id: 7,
        label: 'Level two 3-1',
      },
      {
        id: 8,
        label: 'Level two 3-2',
      },
    ],
  },
]

const nodeClick = function (obj:TreeNode):void {
  if("children" in obj){
    console.log("有子元素，啥也不干，nodeClick",obj?.children);
  }else {
    console.log("no child，请求文件列表");
  }
} ;

const openRightMenu = function(obj:Object,data:TreeNode,node:TreeNode):void {
  console.log("openRightMenu",obj,"\ndata",data,"\nnode",node);
}

/**
 * file table
 */
const search = ref('')
const filterTableData = computed(() =>
  tableData.filter(
    (data) =>
      !search.value ||
      data.filename.toLowerCase().includes(search.value.toLowerCase())
  )
)
const handleEdit = (index: number, row: PiFile) => {
  console.log(index, row)
}
const handleDelete = (index: number, row: PiFile) => {
  console.log(index, row)
}

const tableData:PiFile[] = [
  {
    filename:'Abc.xxx',
    createTime: '2016-05-03',
    filePath: 'Markpi',
    fileId:1
  },
  {
    filename:'Abc.xxx',
    createTime: '2016-05-03',
    filePath: 'Markpi',
    fileId:1
  },
  {
    filename:'Abc.xxx',
    createTime: '2016-05-03',
    filePath: 'Markpi',
    fileId:1
  },
  {
    filename:'Abc.xxx',
    createTime: '2016-05-03',
    filePath: 'Markpi',
    fileId:1
  },
  {
    filename:'Abc.xxx',
    createTime: '2016-05-03',
    filePath: 'Markpi',
    fileId:1
  },
  {
    filename:'Abc.xxx',
    createTime: '2016-05-03',
    filePath: 'Markpi',
    fileId:1
  },
  {
    filename:'Abc.xxx',
    createTime: '2016-05-03',
    filePath: 'Markpi',
    fileId:1
  },
  {
    filename:'Abc.xxx',
    createTime: '2016-05-03',
    filePath: 'Markpi',
    fileId:1
  },
  {
    filename:'Abc.xxx',
    createTime: '2016-05-03',
    filePath: 'Markpi',
    fileId:3
  },
  {
    filename:'AbcGGG.xxx',
    createTime: '2016-05-03',
    filePath: 'Markpi',
    fileId:4
  },
  {
    filename:'Abc.xxx',
    createTime: '2016-05-03',
    filePath: 'Markpi',
    fileId:2
  },

,
  {
    filename:'Abc.xxx',
    createTime: '2016-05-03',
    filePath: 'Markpi',
    fileId:1
  },
  {
    filename:'Abc.xxx',
    createTime: '2016-05-03',
    filePath: 'Markpi',
    fileId:1
  },
  {
    filename:'Abc.xxx',
    createTime: '2016-05-03',
    filePath: 'Markpi',
    fileId:1
  },
  {
    filename:'Abc.xxx',
    createTime: '2016-05-03',
    filePath: 'Markpi',
    fileId:1
  },
  {
    filename:'Abc.xxx',
    createTime: '2016-05-03',
    filePath: 'Markpi',
    fileId:1
  },
  {
    filename:'Abc.xxx',
    createTime: '2016-05-03',
    filePath: 'Markpi',
    fileId:1
  },
  {
    filename:'Abc.xxx',
    createTime: '2016-05-03',
    filePath: 'Markpi',
    fileId:1
  },
  {
    filename:'Abc.xxx',
    createTime: '2016-05-03',
    filePath: 'Markpi',
    fileId:1
  },
  {
    filename:'Abc.xxx',
    createTime: '2016-05-03',
    filePath: 'Markpi',
    fileId:3
  },
  {
    filename:'AbcGGG.xxx',
    createTime: '2016-05-03',
    filePath: 'Markpi',
    fileId:4
  },
  {
    filename:'Abc.xxx',
    createTime: '2016-05-03',
    filePath: 'Markpi',
    fileId:2
  },
  {
    filename:'Abc.xxx',
    createTime: '2016-05-03',
    filePath: 'Markpi',
    fileId:1
  },
  {
    filename:'Abc.xxx',
    createTime: '2016-05-03',
    filePath: 'Markpi',
    fileId:1
  },
  {
    filename:'Abc.xxx',
    createTime: '2016-05-03',
    filePath: 'Markpi',
    fileId:1
  },
  {
    filename:'Abc.xxx',
    createTime: '2016-05-03',
    filePath: 'Markpi',
    fileId:1
  },
  {
    filename:'Abc.xxx',
    createTime: '2016-05-03',
    filePath: 'Markpi',
    fileId:1
  },
  {
    filename:'Abc.xxx',
    createTime: '2016-05-03',
    filePath: 'Markpi',
    fileId:1
  },
  {
    filename:'Abc.xxx',
    createTime: '2016-05-03',
    filePath: 'Markpi',
    fileId:1
  },
  {
    filename:'Abc.xxx',
    createTime: '2016-05-03',
    filePath: 'Markpi',
    fileId:1
  },
  {
    filename:'Abc.xxx',
    createTime: '2016-05-03',
    filePath: 'Markpi',
    fileId:3
  },
  {
    filename:'AbcGGG.xxx',
    createTime: '2016-05-03',
    filePath: 'Markpi',
    fileId:4
  },
  {
    filename:'Abc.xxx',
    createTime: '2016-05-03',
    filePath: 'Markpi',
    fileId:2
  },

] as PiFile[];
</script>

<template>
  <div class="file-list">
    <div class="side">
        <el-input v-model="filterText" placeholder="Filter keyword" />

        <el-tree
          ref="treeRef"
          class="filter-tree"
          :data="data"
          :props="defaultProps"
          default-expand-all
          @node-click="nodeClick"
          @node-contextmenu="openRightMenu"
          :filter-node-method="filterNode"
        >
        <template #default="{node,data}">
          <div>
              <el-dropdown trigger="contextmenu">
                  <span class="el-dropdown-link">
                    <span class="custom-tree-node">
                    <span>{{ node.label }}</span>
                  </span>
                    
                  </span>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item>重命名</el-dropdown-item>
                      <el-dropdown-item>删除</el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
              </el-dropdown>
          </div>
        </template>
      </el-tree>

    </div>
    <div class="list-main">
      <el-table :data="filterTableData" style="width: 100%">
          <el-table-column label="FileID" prop="fileId" />
          <el-table-column label="Filename" prop="filename" />
          <el-table-column align="right">
            <template #header>
              <el-input v-model="search" size="small" placeholder="搜索文件名" />
            </template>
            <template #default="scope">
              <el-button  size="small" @click="handleEdit(scope.$index, scope.row)"
                >下载</el-button
              >
              <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
                >重命名</el-button
              >
              <el-button
                size="small"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
    </div>
  </div>

</template>

<style scoped>

.file-list {
  margin-top: 10px;
  display: flex;
  height: calc(90%);
}

.file-list>div {
  margin-left: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-shadow: 0 0 5px rgba(0,0,0,0.12);
  padding:5px;
}

.side{
  overflow-x: auto;
  width: 260px;
}

.list-main {
  overflow-y: auto;
  width:calc(100% - 360px);
  min-height: 800px;
}


</style>