import { TextField } from "@material-ui/core"
import React from "react"

const Passwd = ({ value, onChange }) => {
  const passwdChangeInput = (event) => {
    onChange(event.target.value)
  }

  return (
    <div>
      <TextField
        variant="outlined"
        required
        fullWidth
        id="password"
        type="password"
        label="비밀번호"
        name="password"
        autoComplete="password"
        style={{ width: '80%' }}
        value={value}
        onChange={(value) => passwdChangeInput(value)}
      />
    </div>
  )
}

export default Passwd