export default {
  view: {
    tag: 'span'
  },
  input: {
    tag: 'el-input',
    defaultValue: '',
    props: {
      clearable: true, // 默认属性
      maxlength: 30 // 默认最大
      // showWordLimit: true
    }
  },
  number: {
    tag: 'el-input-number',
    defaultValue: 0,
    props: {
      clearable: true
    }
  },
  textarea: {
    tag: 'el-input',
    defaultValue: '',
    props: {
      type: 'textarea', // 类型为多行文本
      rows: 2, // 默认两行
      maxlength: 200, // 最大 1000
      showWordLimit: true
    }
  },

  select: {
    tag: 'v-select',
    props: {
      clearable: true,
      filterable: true,
      collapseTags: true
    }
  },

  radio: {
    tag: 'v-radio',
    props: {
      clearable: true
    }
  },
  autocomplete: {
    tag: 'el-autocomplete',
    props: {
      clearable: true
    }
  },
  switch: {
    tag: 'el-switch',
    props: {}
  },
  checkbox: {
    tag: 'v-checkbox',
    defaultValue: [],
    props: {
      clearable: true
    }
  },

  time: {
    tag: 'el-time-picker',
    defaultValue: '',
    props: {
      valueFormat: 'HH:mm',
      format: 'HH:mm'
    }
  },
  timeSelect: {
    tag: 'el-time-select',
    defaultValue: '',
    props: {
      valueFormat: 'HH:mm',
      format: 'HH:mm'
    }
  },
  datetimerange: {
    tag: 'el-date-picker',
    defaultValue: '',
    props: {
      type: 'datetimerange',
      clearable: true,
      unlinkPanels: true,
      rangeSeparator: '-',
      startPlaceholder: '开始日期',
      endPlaceholder: '结束日期',
      valueFormat: 'yyyy-MM-dd HH:mm:ss',
      format: 'yyyy-MM-dd HH:mm:ss'
    }
  },

  daterange: {
    tag: 'el-date-picker',
    defaultValue: '',
    props: {
      type: 'daterange',
      clearable: true,
      unlinkPanels: true,
      rangeSeparator: '-',
      startPlaceholder: '开始日期',
      endPlaceholder: '结束日期',
      valueFormat: 'yyyy-MM-dd',
      format: 'yyyy-MM-dd'
    }
  },

  date: {
    tag: 'el-date-picker',
    defaultValue: '',
    props: {
      type: 'date',
      clearable: true,
      valueFormat: 'yyyy-MM-dd',
      format: 'yyyy-MM-dd'
    }
  },
  monthrange: {
    tag: 'el-date-picker',
    defaultValue: '',
    props: {
      type: 'monthrange',
      clearable: true,
      unlinkPanels: true,
      rangeSeparator: '-',
      startPlaceholder: '开始日期',
      endPlaceholder: '结束日期',
      valueFormat: 'yyyy-MM',
      format: 'yyyy-MM'
    }
  },
  datetime: {
    tag: 'el-date-picker',
    defaultValue: '',
    props: {
      type: 'datetime',
      clearable: true,
      valueFormat: 'yyyy-MM-dd HH:mm:ss',
      format: 'yyyy-MM-dd HH:mm:ss'
    }
  },
  year: {
    tag: 'el-date-picker',
    defaultValue: '',
    props: {
      clearable: true,
      type: 'year',
      valueFormat: 'yyyy',
      format: 'yyyy'
    }
  },

  month: {
    tag: 'el-date-picker',
    defaultValue: '',
    props: {
      clearable: true,
      type: 'month',
      valueFormat: 'yyyy-MM',
      format: 'yyyy-MM'
    }
  },

  week: {
    tag: 'el-date-picker',
    defaultValue: '',
    props: {
      clearable: true,
      type: 'week'
    }
  },

  cascader: {
    tag: 'v-cascader',
    props: {
      clearable: true
    }
  },

  upload: {
    tag: 'v-upload',
    defaultValue: []
  }
};
