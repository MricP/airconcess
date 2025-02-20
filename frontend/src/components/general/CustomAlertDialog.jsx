import React from 'react'
import { Button, Modal } from 'rsuite'
import { TbAlertCircleFilled } from "react-icons/tb";



import "../../styles/general/CustomAlertDialog.css"

function CustomAlertDialog({onOk,onCancel,isOpen=false,okButtonText="Valider",cancelButtonText="Annuler",title="Attention",children}) {
  return (
    <Modal open={isOpen} className="alertdialog" backdrop="static" role="alertdialog" keyboard={true} size="xs">
        <Modal.Title className='alert-title'>
            <TbAlertCircleFilled className='alert-icon'/>
            {title}
        </Modal.Title>
        <Modal.Body className='alert-body'>
          {children}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => onOk()} className='ok-button' appearance="primary">{okButtonText}</Button>
          <Button onClick={() => onCancel()} className='cancel-button' appearance="subtle">{cancelButtonText}</Button>
        </Modal.Footer>
    </Modal>
  )
}

export default CustomAlertDialog