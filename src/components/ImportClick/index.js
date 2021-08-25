/*
 * @Author: LubLiu
 * @Date: 2020-12-08 16:33:34
 * @LastEditors: LubLiu
 * @LastEditTime: 2020-12-31 16:51:55
 * @Description: file content
 */
import React from 'react'
import { Button, message, Upload } from 'antd'

const ImportClick = ({children,action,type,icon}) => {
  const prop = {
    action,
    accept: '.xls,.xlsx',
    showUploadList: false,
    headers: {
      'SM_USER': sessionStorage.getItem('SM_USER')
    },
    onChange: ({file}) => {
      if(file.status === 'done'){
        if(file.response.code === 0){
          message.success(file.response.message,1.5)
        }else{
          message.error(file.response.message,1.5)
        }
      }else if (file.status === 'error'){
        message.error('Upload Error',1.5)
      }
      
    }
  }
  return ( 
  <Upload  {...prop} >
    <Button icon={icon} type={type}>{children}</Button>
  </Upload>
  )
}

export default ImportClick