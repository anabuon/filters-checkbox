import React, { useState } from 'react'
function Checkbox(props) {
  const [tick, setTick] = useState(false)

  const toggleCheckboxChange = () => {
    setTick(!tick)
    props.handleCheckboxChange(props.label)
  }

  return (
    <>
      <input
        id={props.label}
        type="checkbox"
        value={props.label}
        checked={tick}
        onChange={toggleCheckboxChange}
      />
      <label htmlFor={props.label}>{props.label}</label>
    </>
  )
}

export default Checkbox
