import React, { forwardRef } from 'react'

import '../../styles/general/Rsuite-custom.css'; 

import AsyncSelect from 'react-select/async';

const CustomSelectPicker = forwardRef(({className,setValue,data,value,isSearchable=false,placeholder=" ",rest},ref) => {  
  const loadOptions = (inputValue) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filteredData = data.filter((item) =>
          item.label.toLowerCase().includes(inputValue.toLowerCase())
        );
        resolve(filteredData);
      }, 500); // Simule un délai
    });
  };

  return (
    <AsyncSelect
      isSearchable={isSearchable}
      isClearable
      defaultOptions={data.slice(0, data.length > 300 ? 299 : data.length)} // Affiche les 300 premiers resulats seulement
      loadOptions={loadOptions}
      value={value}
      className={className}
      ref={ref}
      placeholder={placeholder}
      onChange={(val) => {
        setValue(val);    
      }}
      {...rest}
      />
    )
});

export default CustomSelectPicker