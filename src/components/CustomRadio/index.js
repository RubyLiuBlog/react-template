import { Radio } from "antd"

const CustomRadio = ({valuekey='value',namekey='name',value='',dataSource=[],onChange}) => {
  const handleChange = (e) => {
    let tmp = e.target.value
    let name = dataSource.filter(item => item[valuekey] === tmp)[0][namekey]
    onChange(tmp,name)
  }
  return(
    <Radio.Group onChange={handleChange} value={value}>
      { dataSource.map(item => 
          (<Radio.Button key={item[valuekey]} value={item[valuekey]}> {item[namekey]} </Radio.Button> )
      )}
    </Radio.Group>
  )
}

export default CustomRadio