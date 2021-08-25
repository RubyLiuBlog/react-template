/*
 * @Author: LubLiu
 * @Date: 2020-11-30 11:29:34
 * @LastEditors: LubLiu
 * @LastEditTime: 2021-01-18 16:09:18
 * @Description: file content
 */
import {Button, Row, Space} from "antd";
import React from "react";
import Style from './index.module.scss'
import { PlusOutlined, EditOutlined } from "@ant-design/icons";

const ListAction = (
  {
    isEditStatus = false,
    onAction = () => {},
    onAdd = () => {},
    onRecall = () => {},
    onManager = () => {},
    onDelete = () => {},
    onSubmit = () => {},
    onAttachment = () => {},
    onProceed = () => {},
    onRequired =() => {},
    renderRightBtn,
    outputBtn,
    showManage = false,
    showAddManage = false,
    showSubmit = false,
    showRecall = false,
    showDelete = false,
    showAudit = false,
    disabled = false,
    showAdd=false,
    proccedTitle='通过',
    rejectTitle='拒绝'
  }
) => {
  return (
    <Row className={Style.bodyAction}>
      {
        isEditStatus ? <Space>
          {showSubmit && <Button type='primary' disabled={disabled} onClick={onSubmit} >提交</Button> }
          {showRecall && <Button type='primary' disabled={disabled} onClick={onRecall} >撤销申请</Button> }
          {
            showManage && <Button type='primary' disabled={disabled} onClick={onManager} >上传附件</Button>
          }
          { showDelete && <Button type='primary' disabled={disabled} onClick={onDelete} >删除</Button>}
          { showAddManage && <Button type='primary' disabled={disabled}  onClick={onAttachment}>新增附件</Button> }
          { showAudit && ( <Button type='primary' disabled={disabled}  onClick={onProceed}>{proccedTitle}</Button>)}
          { showAudit && ( <Button type='primary' disabled={disabled}  onClick={onRequired}>{rejectTitle}</Button>)}
        </Space> : null
      }
      <Space className={Style.right}>
        {
          isEditStatus ? <Button  onClick={onAction} type='primary'>取消</Button> : <Space>
            {
              renderRightBtn ? renderRightBtn() :  showAdd && <Button onClick={onAdd}  icon={<PlusOutlined />} type='primary' name='Add'>增加</Button>
            }
            { outputBtn ? outputBtn() : null }
          <Button icon={<EditOutlined />} onClick={onAction} type='primary' name='Edit'>批处理</Button>
          </Space>
        }
      </Space>

    </Row>
  )
}

export default ListAction
