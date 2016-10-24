import React from 'react';
import Select from 'react-select'

const WrappedSelect = ({input, ...props}) => {
  const {name, value} = input
  return (
    <Select
      name={name}
      value={value}
      {...props}
      onChange={(newValue) => {
        if (!!newValue) {
          input.onChange(newValue.value)
          if (typeof props.onChange === "function") {
            props.onChange(newValue.value)
          }
        } else {
          input.onChange(newValue)
        }
      }
      }
    />
  )
}

export default WrappedSelect
