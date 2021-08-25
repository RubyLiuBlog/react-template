/**
 * 自定义上传，只支持单个文件上传
 * 出参是文件的key，入参是文件的url
 */
import React,{ useEffect, useState } from 'react'
import { Upload,Modal,message, Button } from 'antd'
import { PlusOutlined,ExclamationCircleOutlined,LoadingOutlined } from '@ant-design/icons'

const { confirm } = Modal
const acceptTypeMap = new Map()
acceptTypeMap.set('image',['image/jpeg','image/png'])
acceptTypeMap.set('file',['application/pdf','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','application/vnd.ms-excel','application/msword','application/vnd.ms-word.document.macroEnabled.12','application/zip'])

const IdCardUpload = ({onChange,value,disabled,type='image'}) => {
  const [previewVisible,setPreviewVisible] = useState(false)
  const [previewFileUrl,setPreviewFileUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [fileList,setFileList] = useState([])

  useEffect(() => {
    setFileList(value? value : [] )
  },[value])

  const uploadButton = (
    type === 'image' ?
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
    : 
    <Button>上传</Button>
  )

  const handlePreview = (file) => {
    setPreviewVisible(true)
    setPreviewFileUrl(file.url)
  }
  
  const handleCancel = () => {
    setPreviewVisible(false)
  }
  
  const props = {
    accept: type === 'image' ? '.jpg,.png,.jpeg' : '.xls,.xlsx,.pdf,.word,.zip',
    name: 'file',
    multiple: false,
    listType: type === 'image' ? "picture-card" : 'text',
    action: '/api/ahapi/document/upload',
    headers: {
      'SM_USER': sessionStorage.getItem('SM_USER')
    },
    beforeUpload (file) {
      console.log(file)
      if(acceptTypeMap.get(type).indexOf(file.type) > -1 ){
        if(file.size > 10485760){
          message.error(`[${file.name}]大于10M请重新上传`)
          return Upload.LIST_IGNORE
        }
        message.success(`[${file.name}]正在上传中`)
        return true
      }else{
        message.error('文件类型不支持')
        return Upload.LIST_IGNORE
      }
    },
    onRemove: file => {
      confirm({
        title: `是否删除${file.name} ?`,
        icon: <ExclamationCircleOutlined />,
        onOk () {
          console.log('直接删除')
          onChange && onChange([])
        },
        onCancel() {
          file.status = 'done'
          onChange && onChange([file])
          return false
        },
      })
    },
    onDownload: file => {
      window.open(file.url,'File Download')
    },
    onPreview:  handlePreview,
    onChange: (info) => {
      setFileList(info.fileList.slice())
      if (info.file.status === 'uploading') {
        setLoading(true)
      }
      if (info.file.status === 'done') {
        let file = info.file
        if(file.response.code === 0) {
          message.success('上传成功')
          let data = file.response.data
          let result = {}
          result.id = data.id
          result.name = data.docName
          result.url = data.presignUrl
          result.status = 'done'
          onChange([result])
        }
        setLoading(false)
      }
    },
    showUploadList: {
      showDownloadIcon: true,
      showRemoveIcon: true,
    },
    disabled,
    fileList
  }
  return(
    <>
      <Upload  {...props}>
        { fileList.length > 0 ? null : uploadButton}
      </Upload>
      {
        type === 'image' &&
        <Modal
          visible={previewVisible}
          title='预览'
          footer={null}
          onCancel={handleCancel}
          width={1000}
        >
          <img alt="example" style={{ width: '100%' }} src={previewFileUrl} />
        </Modal>
      }
    </>
  )
}

export default IdCardUpload