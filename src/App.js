import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route,Switch } from 'react-router-dom'
import { Layout,ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN';
import Style from './app.module.scss'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { IntlProvider } from 'react-intl';
import Lang from './lang';
import CustomSlider from './layout/CustomSlider'
import useRouterModel from './model/useRouterModel'
addLocaleData()
const { Header, Content, Sider } = Layout;

const App = () => {
  const [list, setList ] = useState([])
  const [collapsed,setCollapsed] = useState(false)
  const { routerList } = useRouterModel()
  useEffect(() => {
    initRouter(routerList)
  },[routerList])

  const initRouter = (arr) => {
    let result = []
    const subsequent = (menuList) => {
      menuList.forEach((route) => {
        if(route.children){
          subsequent(route.children)
        }
        if(route.path){
          console.log(route.path)
          let tmp = <Route 
            exact={route.exact}
            key={route.key}
            path={route.path}
            component={route.components}
          />
          result.push(tmp)
        }
      })
    }
    subsequent(arr)
    setList(result)
  }
  return (
    <Router>
      <Layout className={Style.app}>
        <Sider className={Style.left} width={225} trigger={null} collapsible collapsed={collapsed} collapsedWidth={0}>
          <div className={Style.content}>
            <div className={Style.menu}>
              <CustomSlider />
            </div>
          </div>
        </Sider>
        <Layout className={Style.right}>
          <Header className={Style.header}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: () => {setCollapsed(!collapsed)},
            })}
          </Header>
          <Content style={{ margin: '16px 16px '}}>
            <ConfigProvider locale={zhCN}>
              <Switch>
                { list }
              </Switch>
            </ConfigProvider>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;
