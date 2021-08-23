/*
 * @Author: LubLiu
 * @Date: 2020-11-23 11:49:02
 * @LastEditors: LubLiu
 * @LastEditTime: 2021-01-18 14:32:57
 * @Description: file content
 */
import { useEffect, useState } from "react"
import { createModel } from "hox"
import AppRouter from '../router'
import { translate } from '../util/translate'
import { getAuth } from '../service/RouterService'
import { message } from "antd"

function useRouterModel () {
  const [routerList,setRouterList] = useState([])
  const [activeMenuKey,setActiveMenuKey] = useState('')
  
  const getRouterKeyByPathName = (pathname) => {
    let key =  routerList.filter(item => item.path === pathname)[0].key
    if(key) {
      setActiveMenuKey(key)
    }
  }

  useEffect(() => {
    getAuth().then(res => {
      if(res.code === 0){
        setRouterList(translate(AppRouter,res.data))
      }else{
        message.error('获取权限失败,请联系管理员')
      }
    })
  },[])

  return {
    routerList,
    activeMenuKey,
    setActiveMenuKey,
    getRouterKeyByPathName,
  }
}

export default createModel(useRouterModel);
