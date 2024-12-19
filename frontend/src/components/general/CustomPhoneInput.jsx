import React,{ forwardRef } from 'react'
import PhoneInput from 'react-phone-number-input'

import '../../styles/general/PhoneInput.css';

const CustomPhoneInput = forwardRef(({className="",setValue,value, rest},ref) => {
  return (
    <PhoneInput
        ref={ref}
        className={className}
        value={value}
        onChange={(value) => {
            setValue(value);
        }}
        {...rest}
    />
  )
});

export default CustomPhoneInput