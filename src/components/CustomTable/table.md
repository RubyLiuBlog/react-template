<!--
 * @Author: LubLiu
 * @Date: 2020-12-01 14:17:52
 * @LastEditors: LubLiu
 * @LastEditTime: 2020-12-01 14:52:01
 * @Description: file content
-->
# CustomTable 
> 对antd tabel 做了封装

## API
### CustomTable API
|  属性        | 值类型  |  是否必输   |  默认值  | 说明 |
|  :----      | ----:  |  ----:  |  :----:   |  ---- |
| url         | String  |  是  |      |    请求地址    |
| columns     | Array   | 是  | []   | 表格的列|
| checkbox    | Boolean | 否  | true | 是否显示多选|
| rowKey      | String | 否  |   | rowId |
| scroll      | Object | 否  | {x: 2300} | 滚动宽度|
| initParam   | Object | 否  | { pageIndex: 0, pageSize: 10 } | 查询参数 |
| initPage    | Object | 否  | { defaultCurrent: 1, defaultPageSize: 10 } | 分页参数 |
| onSelected  | function  | (keys,rows)=> viod  | true | 回调函数 keys：[] 选中的ids,rows:[] 选中的行数据|
| tableRef  | Boolean | 否  |  |传入的ref |

### TabelRef API

| 属性 | 值类型 | 说明 |
| :-----| ----: | :----: |
| searchClick(param) | function | 调用查询方法 |
| setSelectRowKeys   | function | 重置选中项 |



## 示例

```javascript
import React, { useState,useRef } from 'react'

expost default {
  const colums = []
  const tableRef = useRef()
  const [selectedRowKeys,setSelectRowKeys] = useState([])

  return (
    <>
      <CustomTable 
        columns={columns}
        rowKey='guid'
        url='/issue'
        checkBox={editStatus}
        tableRef={tableRef}
        onSelected={(keys,records) => {setSelectRowKeys(keys)}}
      />
      <button onClick={() => {tableRef.current.searchClick(params)}}>search</button>
    </>
  )
}

```