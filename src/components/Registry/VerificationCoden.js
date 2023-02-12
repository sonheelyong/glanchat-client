import { TextField } from "@material-ui/core"
import React from "react"

const VerificationCoden = ({ value, onChange }) => {

  const verificationCodenInput = (event) => {
    onChange(event.target.value)
  }

  return (
    <>
      <TextField
       variant="outlined"
       required
       fullWidth
       id="verification-coden"
       label="인증번호"
       name="verification-coden"
       autoComplete="verification-coden"
       style={{ width: '55%' }}
       value={value}
       onChange={(value) => verificationCodenInput(value)}/>       
      </>
    
  )
}

export default VerificationCoden