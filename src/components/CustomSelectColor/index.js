/*
 * @Author: LubLiu
 * @Date: 2020-11-23 16:05:30
 * @LastEditors: LubLiu
 * @LastEditTime: 2021-01-07 16:53:56
 * @Description: file content
 */
import React, { useEffect, useState } from 'react'
import { Select } from 'antd';
import Request from '../../util/request'
import Style from './index.module.scss'

const { Option } = Select;

const CustomSelectColor = ({ onChange, dataSource, onSearch,searchParams,fileterOption=true,remote=false,...props }) => {

  const [dataSources,setDataSources] = useState([])
  useEffect(() => {
    setDataSources(dataSource)
  },[dataSource])

  const handleChange = (value,option) =>{
    if(onChange){
      onChange(value,option)
    }
  }
  let timeout
  const fetch = (v,callback) => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
    function query () {
      const { searchUrl,params,searchNameKey,searchValueKey }  = searchParams
      params.targetName = v
      Request.get(searchUrl,{ params } ).then(result => {
        if(result.code === 0){
          let tmp = result.data
          tmp.forEach(element => {
            element.value = element[searchValueKey]
            element.name = element[searchNameKey]
          })
          callback(tmp)
        }
      })
    }
    timeout = setTimeout(query, 300);
  }
  const handleSearch = (v) => {
    if (v) {
      fetch(v,tmp => setDataSources(tmp))
    }else{
      setDataSources([])
    }
  }
  const filterOption =  (input, option) => {
    console.log(option)
    return option.children.props.children[1].props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
  }
  const searhProp = onSearch ? {
    showSearch: onSearch ? true : false,
    onSearch: remote ? handleSearch : onSearch,
  } : null
  return(
    <Select onChange={handleChange} {...searhProp} {...props} filterOption={fileterOption ? filterOption : null}>
      {

        dataSources && dataSources.map((item,key) => {
          return(
            <Option disabled={item.disabled} label={item.name} record={item} value={item.value} key={key}>
              <div className={Style.item}>
                <div className={Style.circle} style={{ background: item.color}}>{item.level}</div>
                <div>{item.name}</div>
              </div>
            </Option>
          )
      })}
    </Select>
  )
}
export default CustomSelectColor
