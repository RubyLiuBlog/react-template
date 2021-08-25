/*
 * @Author: LubLiu
 * @Date: 2020-11-16 14:34:18
 * @LastEditors: LubLiu
 * @LastEditTime: 2021-01-13 11:02:54
 * @Description: file content
 */
import React, { useEffect, useState,useImperativeHandle } from 'react'
import { Table } from 'antd'
import Style from './index.module.scss'
import { queryList } from './Store'
import _ from 'loadsh'

const orderMap = new Map()
orderMap.set('descend','desc')
orderMap.set('ascend','asc')

const CustomTable = ({
  columns,
  url,
  queryMethod = 'POST',
  rowKey,
  checkBox = true,
  scroll= {},
  initParam = { pageIndex: 1, pageSize: 10 },
  onSelected = (keys,records) => {},
  tableRef,
  noPage = false,
  getDdList,
  getTotal,
  size='default',
  prefix,
  ...props
}) => {
  const [selectedRowKeys, setSelectRowKeys] = useState([])
  const [totalCount, setTotalCount] = useState(0)
  const [tableDataSource, setTableDataSource] = useState([])
  const [param, setParam] = useState(initParam)
  const [loading, setLoading] = useState(false)
  const [pageObj, setPageObj ] = useState({current: initParam.pageIndex,pageSize: initParam.pageSize})

  useEffect(() => {
    query(param)
    getDdList && getDdList()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[param])

  useImperativeHandle(tableRef, () => ({
    // searchClick 就是暴露给父组件的方法
    searchClick: (par) => {
      let obj
      let tmp = {...param,...par,pageIndex: initParam.pageIndex}
      obj = _.omitBy(tmp, (val) => _.isEqual(val,'All') || _.isEqual(val,'') || _.isEqual(val,'0'))
      setPageObj({current: 1,pageSize: obj.pageSize})
      setParam(obj)
      setSelectRowKeys([])
    },
    resetClick: () => {
      setPageObj({current: initParam.pageIndex,pageSize: initParam.pageSize})
      setParam(initParam)
    },
    setSelectRowKeys: () => {
      setSelectRowKeys([])
    },
    jumpToIssue: (param) => {
      setSelectRowKeys([])
      let obj = {...initParam,...param}
      setParam(obj)
      setPageObj({current: initParam.pageIndex,pageSize: initParam.pageSize})
    }
  }))

  const query = (params) => {
    setLoading(true)
    let obj = _.omitBy(params, (val) => _.isEqual(val,'All') || _.isEqual(val,''))
    queryList(url,obj, queryMethod,prefix).then(
      (result) => {
        if (result.code === 0 && result.data !== null && result.data.records instanceof Array ){
          const content = result.data.records
          const {pageIndex,pageSize} = param
          content.forEach((item,index) => {
            item.numberer = (pageIndex - 1 ) * pageSize + index + 1
          })
          let totalCount = result.data.total ? result.data.total : result.data.length
          setTableDataSource(result.data.records)
          setTotalCount(totalCount)
          getTotal && getTotal(totalCount)
        }else{
          setTableDataSource([])
          setTotalCount(0)
          getTotal && getTotal(0)
        }
      }
    ).catch(
      (e) => console.log(e)
    ).finally(
      () =>setLoading(false)
    )
  }

  const tableChange = (pagination, filters, sorter, extra) => {
    setPageObj(pagination)
    let sort = []
    if(sorter instanceof Array){
      sorter.forEach(item => {
        let tmp = {}
        tmp.order = orderMap.get(item.order)
        tmp.field = item.field
        sort.push(tmp)
      })
    }else{
      if(sorter.order){
        sort.push({order: orderMap.get(sorter.order), field: sorter.field})
      }
    }
    const tmp = {
      ...param,
      pageIndex: pagination.current,
      pageSize: pagination.pageSize,
      sort
    }
    if (sort.length === 0 ) {
      delete tmp.sort
    }
    setParam(tmp)

  }
  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys,selectRowRecord) => {
      setSelectRowKeys(selectedRowKeys)
      onSelected (selectedRowKeys,selectRowRecord)
    },
  }
  const pagination = noPage ? false :{
    showSizeChanger: true,
    total: totalCount,
    pageSizeOptions: [10,50,100,200,500,1000],
    ...pageObj
  }
  return(
    <Table
      loading={loading}
      columns={columns}
      rowSelection={checkBox ? rowSelection : null}
      pagination={pagination}
      rowKey={rowKey}
      onChange={tableChange}
      className={Style.tableBlackHeader}
      dataSource={tableDataSource}
      scroll={scroll}
      size={size}
      {...props}
    />
  )
}
export default CustomTable
