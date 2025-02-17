import React,{forwardRef} from 'react'
import { toast } from 'react-toastify';

import { Uploader, Button } from 'rsuite';

const CustomFilePicker = forwardRef(({action='',multiple,autoUpload,text="Selectionne un fichier",className,value,setValue,maxFileSize=1048576,errorSizeMessage="La taille maximale est de 1Mo",rest},ref) => {
    const handleFileChange = (fileList) => {
        let size = fileList.length-1
        
        const lastAdd = fileList[size];
        if(lastAdd) {
            if(lastAdd?.blobFile?.size < maxFileSize) { //1Mo par default
                setValue(lastAdd)
            } else {
                toast.error(errorSizeMessage)
                setValue(value)
            }
        } else {
            setValue(null)
        }
        
    }

    return (
        <Uploader  
            action={action}
            multiple={multiple}
            autoUpload={autoUpload}
            className={className}
            fileList={value ? [value] : [] }
            onChange={fileList => handleFileChange(fileList)}
            ref={ref}
            {...rest}>
            <Button>{text}</Button>
        </Uploader>
    )
});

export default CustomFilePicker