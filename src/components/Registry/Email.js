import { TextField } from "@material-ui/core"
import React from "react"

const Email = ({ value, onChange }) => {

  // let regex = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;

  const EmailChangeInput = (event) => {
    // if(regex.test(address) == false){
    //   alert("이메일 형식이올바르지 않습니다.")
    // }
    // console.log(regex.test(address))
    onChange(event.target.value)
  }

  return (
    <div>
      <TextField
        variant="outlined"
        required
        fullWidth
        id="email"
        label="이메일"
        name="email"
        autoComplete="email"
        style={{ width: '80%' }}
        value={value}
        onChange={(value) => EmailChangeInput(value)}
      />
    </div>
  )
}

export default Email