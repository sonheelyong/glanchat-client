import { TextField } from "@material-ui/core"
import axios from "axios";
import React from "react"
import { useState } from "react"

const UserName = ({ value, onChange }) => {
  
  const UserNameChangeInput = (event) => {
    onChange(event.target.value)

  }

  return (
    <div>
      <TextField
        variant="outlined"
        required
        fullWidth
        id="nickName"
        label="닉네임"
        name="nickName"
        autoComplete="nickName"
        style={{ width: '80%' }}
        value={value}
        onChange={(value) => UserNameChangeInput(value)} />
        
    </div>
  )
}

export default UserName