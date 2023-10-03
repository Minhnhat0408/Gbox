"use client"

import React from "react"
import ComboboxLoadData, {useComboboxLoadData} from "@/components/ui/comboboxLoadData"
import Popup, { PopupControl, usePopupControl } from "@/components/ui/popup"

interface PostFormProps {
    formControl: PopupControl
}

function getUrlLoadGamedata(page: number, textSearch: string): string {
    return ""
}

const PostForm =  React.forwardRef<HTMLAudioElement, PostFormProps>(({formControl}, ref) => {
    
    const comboboxLoadGameData = useComboboxLoadData("valueField", "displayField", getUrlLoadGamedata)    

    return <div>
        <Popup title="Create your post" popupControl={formControl}>
            <div className="w-[800px]">
                <ComboboxLoadData comboboxControl={comboboxLoadGameData}></ComboboxLoadData>
            </div>
        </Popup>
    </div>
})

PostForm.displayName = "PostForm"

export default PostForm
