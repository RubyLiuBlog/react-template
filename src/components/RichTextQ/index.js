import React from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css'

const RichTextQ = ({value,setValue,readOnly }) => {
 
  const textModules = {
    toolbar: [
      [{ 'header': '1'}, {'header': '2'},{size: []}],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, 
       {'indent': '-1'}, {'indent': '+1'}],
      ['image'],
      ['clean']
    ],
  }
  
  return(
    <ReactQuill placeholder='input something...' modules={textModules} theme={readOnly ? "bubble" : "snow"} value={value} readOnly={readOnly} onChange={(v) => setValue(v)}/>
  )
}

export default RichTextQ