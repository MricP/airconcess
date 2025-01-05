import React, { forwardRef } from 'react'
import { SelectPicker } from "rsuite";

import '../../styles/general/Rsuite-custom.css'; 

const CustomSelectPicker = forwardRef(({className,setValue,data,value,searchable=false,placeholder=" ",rest},ref) => {

    return (
      <SelectPicker
          className={className}
          ref={ref}
          data={data}
          value={value}
          searchable={searchable}
          placeholder={placeholder}
          onChange={(val) => {
            setValue(val);
          }}
          {...rest}
      />
    )
});

export default CustomSelectPicker