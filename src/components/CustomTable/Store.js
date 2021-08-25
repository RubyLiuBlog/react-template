/*
 * @Author: LubLiu
 * @Date: 2020-12-01 09:25:52
 * @LastEditors: LubLiu
 * @LastEditTime: 2020-12-24 14:20:59
 * @Description: file content
 */
import request from "util/request"

export const queryList = (url,data,method,prefix) => {
  if(prefix){
    return request(url, {
      data,
      method,
      requestType: 'json',
      prefix,
    })
  }
  return request(url, {
    data,
    method,
    requestType: 'json',
  })
}
