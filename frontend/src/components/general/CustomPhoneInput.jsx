import React,{ forwardRef } from 'react'
import PhoneInput from 'react-phone-number-input'

import '../../styles/general/PhoneInput.css';

const CustomPhoneInput = forwardRef(({className="",setValue, ...rest},ref) => {
  return (
    <PhoneInput
        ref={ref}
        className={className}
        onChange={(value) => {
            setValue(value);
        }}
        {...rest}
    />
  )
});

export default CustomPhoneInput