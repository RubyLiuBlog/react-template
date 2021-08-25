/*
 * @Author: LubLiu
 * @Date: 2020-11-23 13:58:33
 * @LastEditors: LubLiu
 * @LastEditTime: 2021-01-18 14:34:01
 * @Description: 权限组件 {children: 正常渲染的元素，权限判断通过时展示｜ReactNode}, {currentAuthority: 当前权限}, 
 * {authority: 准入权限｜string},{noMatch: 未通过权限判断时展示},{allowStatus: 准入流程状态，可为空}，{currentStatus： 当前流程状态}
 */


/**
 * 普通权限验证
 * @param {*} props 
 */
const Authorized = ({children,allowStatus,currentStatus}) => {
  if(allowStatus){
    const _allowStatus = Array.isArray(allowStatus) ? allowStatus : [allowStatus]
    if(intersection(_allowStatus,currentStatus)) return children
  }
  return null
}
export const showByAuth = () => {
  return true
}
/**
 * 判断两个数组有没有交集
 * @param {*} nums1 数组1
 * @param {*} nums2 数组2
 */
const intersection = (nums1, nums2) => {
  return [ ...new Set(nums1) ].filter(n => nums2.includes(n)).length !== 0
}

export default Authorized