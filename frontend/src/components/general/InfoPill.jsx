import React,{useState} from 'react'
import { CiCircleInfo } from "react-icons/ci";

import "../../styles/general/InfoPill.css"


function InfoPill({text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia erat et sem mollis, et iaculis odio tincidunt. Donec venenatis, orci in auctor dignissim, risus risus convallis lorem, in dapibus arcu libero sit amet ante. Nulla facilisi. Fusce tempus arcu non erat iaculis, ut scelerisque ante feugiat. Aenean ut ex a arcu laoreet scelerisque non non augue. Maecenas bibendum orci non ante suscipit, eget facilisis ipsum gravida. Aliquam erat volutpat. Sed euismod urna vel urna egestas, et vulputate nulla tincidunt. Suspendisse potenti. Donec at mollis lectus."}) {
    const msg = document.querySelector("p.msg")
    const [isMsgVisible,setMsgVisible] = useState(false)

    return (
        <div className='info-pill'>
            <CiCircleInfo/>
            <p className={"msg"}>{text}</p>
        </div>
        
    )
}

export default InfoPill