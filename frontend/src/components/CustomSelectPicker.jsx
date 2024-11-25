import { set } from 'date-fns';
import React,{forwardRef,useState,useEffect} from 'react'
import { SelectPicker } from "rsuite";

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