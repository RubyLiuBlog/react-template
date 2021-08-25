/*
 * @Author: LubLiu
 * @Date: 2020-11-27 10:09:04
 * @LastEditors: LubLiu
 * @LastEditTime: 2020-11-27 14:33:22
 * @Description: file content
 */
import React from 'react'
import Style from './index.module.scss'

const BlueHeaderTitle = ({children,rightRender}) => {
  return(
    <div className={Style.BlueHeaderTitle}>
      {children}
      <div className={Style.rightRender}> {rightRender} </div>
    </div>
  )
}
export default BlueHeaderTitle