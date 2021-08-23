import request from "../util/request";

/**
 * 获取权限接口
 * @returns 
 */
export async function getAuth() {
  return request.get('/auth')
}