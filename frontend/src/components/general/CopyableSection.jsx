import React, { useEffect, useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard';
import { MdContentCopy } from 'react-icons/md';

import "../../styles/general/CopyableSection.css"

function CopyableSection({content,className}) {
  const [isCopied, setIsCopied] = useState(false); // Utilisé pour la copie de l'adresse de l'agence

  useEffect(() => {
    if(isCopied) {
        setTimeout(() => {
            setIsCopied(false)
        },1000)
    }
  },[isCopied])

  return (
    <section className={className +" copyable-section"} >
      <p>{content}</p>
      <p id="copy-addr-message" className={isCopied ? "" : "transparent"} >Copié !</p>
        <CopyToClipboard text={content} onCopy={() => setIsCopied(true) }>
          <MdContentCopy id="copy-addr-button" />
        </CopyToClipboard>
    </section>
  )
}

export default CopyableSection