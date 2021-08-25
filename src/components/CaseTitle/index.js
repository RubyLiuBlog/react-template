import React from "react";
import Style from './index.module.scss'

const CaseTitle = (
  {
    title = '',
    children,
    isShow= true
  }
) => {
  return (
    isShow ? <div className={Style.CaseTitle}>
      <div className={Style.header}>
        
        <div className={Style.line}></div>
        <div className={Style.title}>{title}</div>
      </div>
      { children && <div className={Style.content}>{children}</div>}
    </div> : null
  )
}


export default CaseTitle
