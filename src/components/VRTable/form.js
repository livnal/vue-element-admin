import printJS from 'print-js';
import checkPermission from '@/utils/permission';
export default {
  computed: {
    fieldList() {
      return this.formConfig.fieldList || [];
    },
    formBtns() {
      let {
        formConfig: { btns }
      } = this;
      // console.log(btns, 'btns123');
      btns = btns.filter(item => checkPermission(item.permissionCode));

      // console.log(btns, 'btns');
      return btns.map(item => {
        const defaultConfig = {
          submit: {
            icon: 'el-icon-search'
          },
          reset: {
            icon: 'el-icon-refresh'
          },
          colFilter: {
            icon: 'fa fa-filter'
          }
        };
        return {
          type: 'primary',
          size: 'mini',
          ...defaultConfig[item.key],
          ...item
        };
      });
    },

    exportBtn() {
      return typeof this.formConfig.exportBtn === 'undefined' ? true : this.formConfig.exportBtn;
    },

    printBtn() {
      return typeof this.formConfig.printBtn === 'undefined' ? true : this.formConfig.printBtn;
    },
    transformModel() {
      return this.formConfig.transformModel;
    },

    layout() {
      return this.formConfig.layout || { inline: true, size: 'small' };
    },

    beforeSubmit() {
      return this.formConfig.beforeSubmit;
    }
  },

  methods: {
    handleFormChange(val, fieldConfig) {
      if (fieldConfig.isChangeToSubmit) {
        this.handleFormBtnClick('submit');
      }
    },
    handleFormBtnClick(key) {
      const params = this.$refs.form.getTransformModel();
      // 默认按钮的处理
      const handlers = {
        submit: () => {
          this.$refs.form.submit().then(searchParams => {
            if (!this.beforeSubmit || (this.beforeSubmit && this.beforeSubmit(searchParams))) {
              this.searchTableData(searchParams);
            }
          });
        },
        reset: () => {
          this.$refs.form.reset().then(searchParams => {
            this.searchTableData(searchParams);
          });
        },

        colFilter: () => {
          this.$refs.table.showColFilterDialog();
        },

        batchDelete: () => {
          this.handleBatchDelete();
        }
      };

      if (handlers[key]) {
        handlers[key]();
      }
      this.$emit('handleFormBtnClick', key, params);
    },

    handleExport2Excel() {
      // 只支持二级表头
      const { colConfigs, tableData, title } = this;
      const firstHeader = [];
      const header = [];
      colConfigs.forEach(item => {
        console.log(item, 'itemmmm');
        if (!item.type) {
          if (item.children) {
            firstHeader.push(item.label);
            header.push(...item.children);
          } else {
            header.push(item);
            firstHeader.push('');
          }
        }
      });

      const data = tableData.map(item =>
        header.map(col => {
          const { prop, formatter } = col;
          const cellValue = item[prop];
          if (formatter) {
            return formatter(item, col, cellValue);
          }

          return cellValue;
        })
      );
      import('@/libs/export2Excel').then(excel => {
        excel.export_json_to_excel({
          header: header.map(item => item.label),
          data, // Specific data Required
          filename: title, // Optional
          autoWidth: true, // Optional
          bookType: 'xlsx' // Optional
        });
      });
    },

    handlePrintTable() {
      printJS({
        printable: this.id,
        type: 'html',
        header: ''
      });
    }
  }
};
