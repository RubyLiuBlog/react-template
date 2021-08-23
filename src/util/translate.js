/**
 * 取有权限的router
 * @param {*} sourceArr 源数组
 * @param {*} authArr 权限key数组
 * @returns 有权限的router
 */
export const translate = (sourceArr,authArr) => {
  let routerList = []
  const getRouterList = () => {
    const skb = (obj = {}) => {
      if(typeof obj !== 'object'){
        return obj
      }
      let result
      if ( obj instanceof Array ) {
        result = []
      }else{
        result = {}
      }
      for(let i in obj){
        let item = obj[i]
        if( (item.showMenu && authArr.indexOf((item.key)) > -1) || !item.auth){
          result[i] = skb(item)
        }
      }
      return result
    }
    sourceArr.forEach(element => {
      if(authArr.indexOf(element.key) > -1 || !element.auth){
        routerList.push(skb(element))
      }
    })
  }
  getRouterList()
  return routerList
}