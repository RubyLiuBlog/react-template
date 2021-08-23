import React, { useEffect, useState } from 'react'
import { Menu } from 'antd'
import { Link } from 'react-router-dom';
import { PlusCircleOutlined, FileOutlined, UsergroupAddOutlined, EditOutlined, UsergroupDeleteOutlined,AppstoreOutlined,ApartmentOutlined } from '@ant-design/icons';
import Style from './index.module.scss'
import useRouterModel from '../model/useRouterModel'

const { SubMenu, Item } = Menu


const CustomSlider = () => {
  const { routerList, activeMenuKey,setActiveMenuKey } = useRouterModel()
  const [dataSource,setDataSource] = useState([])
  
  useEffect(() => {
    setDataSource(routerList)
  },[routerList])
  
  const getIcon = (str) => {
    if(!str){
      return null
    }
    if(str === 'icon-add'){
      return <PlusCircleOutlined className={Style.icon} />
    }else if (str === 'icon-file') {
      return <FileOutlined className={Style.icon} />
    }else if (str === 'icon-user') {
      return <UsergroupAddOutlined className={Style.icon} />
    }else if (str === 'icon-apply') {
      return <EditOutlined className={Style.icon} />
    }else if (str === 'icon-black') {
      return <UsergroupDeleteOutlined className={Style.icon} />
    }else if (str === 'icon-ywfl-type') {
      return <AppstoreOutlined className={Style.icon} />
    }else if (str === 'icon-process-type') {
      return <ApartmentOutlined className={Style.icon} />
    }
  }

  const menuChange = (item) => {
    const { key } = item
    setActiveMenuKey(key)
  }
  
  
  const createMenu = (menuList) => {
    return(
      menuList.map((menu,index) => {
        if(!menu.parent){
          return(
          menu.showMenu && <Item className='menu-item' key={menu.key}>
            <Link className={Style.menuItem} to={menu.path}>
              {
                menu.icon && getIcon(menu.icon)
              }
              {menu.name}
            </Link>
          </Item>)
        }else{
          return(
            <SubMenu icon={getIcon(menu.icon)} className={Style.parentItem}  key={menu.key} title={menu.name} >
              { createMenu (menu.children)}
            </SubMenu>
          )
        }
      })
    )
  }
  return(
    <Menu className={Style.customMenu} theme="dark" mode="inline"  onSelect={(item) => {menuChange(item)}} selectedKeys={[activeMenuKey]} >
      {createMenu(dataSource)}
    </Menu>
  )
}

export default CustomSlider