import React, { forwardRef } from 'react'
import { SelectPicker } from "rsuite";

import '../../styles/general/Rsuite-custom.css'; 

const CustomSelectPicker = forwardRef(({className,setValue,data,searchable=false,placeholder=" "},ref) => {

    return (
      <SelectPicker
          className={className}
          ref={ref}
          data={data}
          searchable={searchable}
          placeholder={placeholder}
          onChange={(value) => {
              setValue(value);
          }}
      />
    )
});

export default CustomSelectPicker