# VForm

> 配置化表单组件

## Props

| Prop name      | Description          | Type  | Values | Default                         |
| -------------- | -------------------- | ----- | ------ | ------------------------------- |
| fieldList      | 表单字段列表         | array | -      | []                                |
| transformModel | 表单数据提交转换函数 | func  | -      |                                 |

#### fieldList 数组项

| Param name    | Type   | Description    | Default                         |
| ----------    | ------ | -------------- | ------------------------------- |
| model         | String | 表单字段名       |           -                     |
| defaultValue  | -      | 字段初始值       |                -                |
| type  | String      | 字段类型       |                -                |
| label  | String      | 字段标签      |                -                |
| on  | Object      | 监听事件      |                -                |
| props  | Object      | 组件相关属性      |                -                |

## Methods

### setOptions(fieldName, options)

> 设置 radio/checkbox/select 组件的 options

#### Params

| Param name | Type   | Description    |
| ---------- | ------ | -------------- |
| fieldName  | String | 表单字段       |
| options    | Array  | 传入的 options |

### getTransformModel()

> 获取 form 转换后的提交数据

### submit()

> 表单提交，会默认进行表单校验

### reset()

> 表单重置

## Events

| Event name | Description        |
| ---------- | ------------------ |
| change     | 表单字段改变时触发 |

#### Params

| Param name | Type   | Description    |
| ---------- | ------ | -------------- |
| value      | -      | 当前改变的表单字段值 |
| fieldConfig| Object | 表单字段 |
| form       | Object | 表单数据 |

## Slots

| Name    | Description            | Bindings |
| ------- | ---------------------- | -------- |
| default | 额外插槽，可放置按钮等 |          |
