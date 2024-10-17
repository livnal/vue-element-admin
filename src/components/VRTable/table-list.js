/*
 * @Descripttion:
 * @version:
 * @FilePath: /vue-element-admin/src/components/VRTable/table-list.js
 */
export default {
  data() {
    return {
      tableLoading: false,
      tableData: [],
      page: {
        curPage: 1,
        pageRows: 80,
        total: 0
      },

      _searchParamsCache: {},
      _sortParamsCache: {}
    };
  },

  methods: {
    handleCurrentChange(val) {
      this.getTableData({
        curPage: val[0]
      });
    },

    handleSizeChange(val) {
      this.getTableData({
        curPage: 1,
        pageRows: val[0]
      });
    },

    searchTableData(params) {
      this._searchParamsCache = { ...this._searchParamsCache, ...params };

      this.getTableData({
        curPage: 1
      });
    },

    getSearchParams() {
      const { formatSearchParams, _searchParamsCache } = this;

      return formatSearchParams ? formatSearchParams(_searchParamsCache) : _searchParamsCache;
    },

    getSortParams() {
      const { formatSortParams, _sortParamsCache } = this;

      return formatSortParams ? formatSortParams(_sortParamsCache) : _sortParamsCache;
    },

    setSortParams(params) {
      this._sortParamsCache = params;
    },

    getTableData(params = {}, callback) {
      this.tableLoading = true;
      let {
        tableApi: { list, defaultParams = {} }
      } = this;

      if (typeof list === 'function') {
        list = {
          api: list
        };
      }

      const { api, resultKey = 'data', params: apiParams = {}, afterData } = list;
      const filterParams = this.getSearchParams();
      const sortParams = this.getSortParams();

      callback = callback || afterData;
      params = {
        ...defaultParams,
        ...filterParams,
        ...sortParams,
        ...apiParams,
        curPage: this.page.curPage,
        pageRows: this.page.pageRows,
        ...params
      };

      // 认为无需分页
      if (!resultKey) {
        delete params.curPage;
        delete params.pageRows;
      }

      api(params, { showLoading: false })
        .then(({ data }) => {
          this.tableData = resultKey ? data[resultKey] : data;
          const { pageNo, pageSize, total, total } = data;

          if (resultKey) {
            this.page = {
              ...this.page,
              curPage: pageNo || params.curPage,
              pageRows: pageSize || params.pageRows,
              total: total || total || 0
            };
          }

          if (callback) {
            this._callback = callback;
            callback(data);
          }
        })
        .finally(() => {
          // 计算高度
          this.getTableHeight && this.getTableHeight('data');
          setTimeout(() => {
            this.tableLoading = false;
          }, 1000);
        });
    },

    /**
     * 清空筛选条件，重新加载
     */
    reloadTableData() {
      this._searchParamsCache = {};
      this.getTableData({ curPage: 1 }, this._callback);
    },

    refreshTableData() {
      this.getTableData({}, this._callback);
    },

    getSelectedRows() {
      return this.selectedRows;
    },

    handleSelectionChange(selection) {
      this.selectedRows = selection;
    },

    // 处理排序
    handleSortChange({ column, prop, order }) {
      // sorable 不是 custom， 是前台排序
      if (column.sortable !== 'custom') {
        return;
      }
      if (!order) {
        this.setSortParams({});
      } else {
        const orderMap = {
          ascending: 'asc',
          descending: 'desc'
        };
        this.setSortParams({ sort: prop, orderType: orderMap[order] });
      }

      this.getTableData({});
    },

    // 处理删除及批量删除
    handleBatchDelete() {
      const selectedRows = this.getSelectedRows();

      if (!selectedRows.length) {
        this.$message.error('请至少选择一条记录！');
        return;
      }

      this.$confirm('确认要删除么?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.handleDelete(selectedRows);
      });
    },

    // 处理删除
    handleDelete(rows) {
      let {
        tableApi: { batchDelete, delete: singleDelete }
      } = this;
      let deleteApi = null;

      if (typeof batchDelete === 'function') {
        batchDelete = {
          api: batchDelete,
          transformParams(rowsData) {
            return {
              ids: rowsData.map(item => item.id)
            };
          }
        };
      }

      if (typeof singleDelete === 'function') {
        singleDelete = {
          api: singleDelete,
          transformParams(row) {
            return {
              id: row.id
            };
          }
        };
      }

      deleteApi = batchDelete;
      // 批量删除和单独删除
      if (!rows.length && singleDelete) {
        deleteApi = singleDelete;
      } else {
        rows = Array.isArray(rows) ? rows : [rows];
      }

      const { api, transformParams } = deleteApi;
      const params = transformParams(rows);

      api(params).then(() => {
        this.refreshTableData(); // 刷新当前页数据
        this.$message.success('删除成功！');
      });
    }
  },

  created() { }
};
