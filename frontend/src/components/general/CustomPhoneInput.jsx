import React,{ forwardRef } from 'react'
import PhoneInput from 'react-phone-number-input'

import '../../styles/general/PhoneInput.css';

const CustomPhoneInput = forwardRef(({className="",setValue},ref) => {
  return (
    <PhoneInput
        ref={ref}
        className={className}
        onChange={(value) => {
            setValue(value);
        }}
    />
  )
});

export default CustomPhoneInput