<template>
  <div style="overflow: auto; height: 100%">
    <VForm
      ref="form"
      v-model="formData"
      class="full_page_header"
      :field-list="fieldList"
      label-width="80px"
    >
      <div>
        <el-button
          type="primary"
          icon="el-icon-search"
          style="margin-left: 10px"
          @click="searchClick"
        >
          查询
        </el-button>
        <!-- <el-button type="info" @click="clearClick">重置</el-button> -->
        <!-- <el-button @click="addBk">新增</el-button> -->
      </div>
    </VForm>
    <div style="display: flex; justify-content: space-between">
      <el-table :data="tableDataBk" border style="margin-right: 10px" :height="400">
        <el-table-column prop="date" label="布控区域" />
        <el-table-column prop="name" label="数量统计" />
      </el-table>
      <el-table :data="tableDataMg" border style="" :height="400">
        <el-table-column prop="date" label="敏感信息" />
        <el-table-column prop="name" label="信息类型" />
        <el-table-column prop="address" label="出现次数" />
      </el-table>
    </div>
    <div>
      <el-table :data="tableDataLt" border style="margin-top: 10px" :height="400">
        <el-table-column prop="date" label="联系人" />
        <el-table-column prop="name" label="最后对话时间" />
        <el-table-column prop="name" label="信息条数" />
      </el-table>
    </div>
  </div>
</template>

<script>
import VForm from '@/components/VForm/index.vue';

export default {
  components: { VForm },
  data() {
    return {
      tableDataMg: [],
      tableDataBk: [],
      tableDataLt: [],
      formData: {},
      fieldList: [
        {
          label: '时间范围',
          model: 'time',
          type: 'datetimerange',
          // defaultValue: () => {
          //   return dayjs().format('YYYY-MM-DD');
          // },
          props: {
            // clearable: false
            // disabled: this.dialogTitle !== '创建任务'
          },
          col: {
            span: 8
          }
        },

        {
          type: 'select', // 类型
          label: '资源', // 标签
          model: 'zy', // 字段名
          defaultValue: () => {
            return 1;
          },
          props: {
            placeholder: '请选择', // 占位提示
            // labelKey: 'description',
            // valueKey: 'code',
            options: [
              { label: '群聊', value: 1 },
              { label: '私聊', value: 2 }
            ],
            clearable: false
          },
          col: {
            span: 4
          } // 栅格
        },
        {
          type: 'input',
          label: '联系人',
          model: 'lxr',
          props: {
            placeholder: '搜索联系人'
          },
          col: {
            span: 4
          }
        },
        {
          type: 'input',
          label: '会话内容',
          model: 'hhnr',
          props: {
            placeholder: '搜索会话内容'
          },
          col: {
            span: 4
          }
        }
      ]
    };
  }
};
</script>
