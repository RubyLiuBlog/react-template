/*
 * @Author: LubLiu
 * @Date: 2020-11-24 18:35:16
 * @LastEditors: LubLiu
 * @LastEditTime: 2020-12-02 11:45:35
 * @Description: file content
 */
import React from 'react'
import { Modal } from 'antd'
import './index.module.scss'

const CustomModal = ({ onCancel, visible, title, children, width,closable=true}) => {

  const handleCancel = () => {
    onCancel && onCancel()
  }

  return(
    <Modal
      width={width}
      centered
      visible={visible}
      title={title}
      cancelButtonProps={{ style: { display: 'none' } }}
      destroyOnClose={true}
      maskClosable={false}
      onCancel={handleCancel}
      footer={null}
      closable={closable}
    >
      {children}
    </Modal>
  )
}
export default CustomModal
