/*
 * @Descripttion:
 * @version:
 * @FilePath: /vue-element-admin/src/router/modules/zdzd.js
 */
/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const zdzdRouter = [
  //   {
  //   path: '/table1',
  //   component: Layout,
  //   redirect: '/table1/vgrid',
  //   name: '动态表格',
  //   meta: {
  //     title: '动态表格',
  //     icon: 'table'
  //   },
  //   children: [
  //     {
  //       path: 'vgrid',
  //       component: () => import('@/views/zdzd/table/vgrid/index.vue'),
  //       name: 'vgrid表格',
  //       meta: { title: 'vgrid表格' }
  //     },
  //     {
  //       path: 'vtable',
  //       component: () => import('@/views/zdzd/table/vtable/index.vue'),
  //       name: 'vTable',
  //       meta: { title: 'vTable' }
  //     }
  //   ]
  // },
  {
    path: '/ywyy',
    component: Layout,
    redirect: '/table1/vgrid',
    name: '业务应用',
    meta: {
      title: '业务应用',
      icon: 'table'
    },
    children: [
      {
        path: 'zhcx',
        component: () => import('@/views/zdzd/ywyy/zhcx/index.vue'),
        name: '综合查询',
        meta: { title: '综合查询' }
      },
      {
        path: 'ajgl',
        component: () => import('@/views/zdzd/ywyy/ajgl/index.vue'),
        name: '案件管理',
        meta: { title: '案件管理' }
      },
      {
        path: 'ywbk',
        component: () => import('@/views/zdzd/ywyy/ywbk/index.vue'),
        name: '业务布控',
        meta: { title: '业务布控' }
      },
      {
        path: 'ywgk',
        component: () => import('@/views/zdzd/ywyy/ywgk/index.vue'),
        name: '业务管控',
        meta: { title: '业务管控' }
      }
    ]
  }]
export default zdzdRouter
