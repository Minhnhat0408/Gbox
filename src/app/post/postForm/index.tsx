"use client"

import React from "react"
import Popup, { usePopupControl } from "@/components/ui/popup"

interface PostFormProps {

}


const PostForm =  React.forwardRef<HTMLAudioElement, PostFormProps>(({}, ref) => {
    const popupControl = usePopupControl(true)
    console.log(popupControl);
    
    return <div>
        <Popup title="Create your post" popupControl={popupControl}>
            <div className="w-[600px]">123</div>
        </Popup>
    </div>
})

PostForm.displayName = "PostForm"

export default PostForm
