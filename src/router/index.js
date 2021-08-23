/*
 * @Author: LubLiu
 * @Date: 2020-11-23 16:05:30
 * @LastEditors: LubLiu
 * @LastEditTime: 2021-01-18 11:50:09
 * @Description: file content
 * key：权限key
 * showMenu 是否展示
 * auth 是否需要权限验证
 * parent 是否是父级菜单
 * exact 路由匹配是否为严格模式
 */
import Example from '../pages/Example'
import ChildA from '../pages/Example/ChildA'
import ChildB from '../pages/Example/ChildB'
const AppRouter = [
  {
    key: 'page1',
    name: 'page1',
    showMenu: true,
    auth: false,
    parent: true,
    children: [
      {
        components: ChildA,
        key: 'children1',
        name: '新建1',
        icon: 'icon-add',
        showMenu: true,
        auth: false,
        path: '/approvalhub/create1',
        parent: false,
        exact: true
      },
      {
        components: ChildB,
        key: 'children2',
        name: '新建2',
        icon: 'icon-add',
        showMenu: true,
        auth: false,
        path: '/approvalhub/create2',
        parent: false,
        exact: true
      },
    ]
  },
  {
    components: Example,
    key: 'page2',
    name: 'page2',
    showMenu: true,
    auth: true,
    path: '/page2/index',
    parent: false,
    exact: true
  }
 
]

export default AppRouter
