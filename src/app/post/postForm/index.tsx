"use client"

import React from "react"
import ComboboxLoadData, {useComboboxLoadData} from "@/components/ui/comboboxLoadData"
import Popup, { PopupControl, usePopupControl } from "@/components/ui/popup"
import { pagingGame } from "@/services/client/rawgClientService"
import { GameSearchDetail } from "@/types/gameSearchType"

interface PostFormProps {
    formControl: PopupControl
}

async function getCurrentGamedata(page: number, textSearch: string): Promise<Array<GameSearchDetail>> {
    const result = await pagingGame(textSearch, page, 10)
    return result.data
}

const PostForm =  React.forwardRef<HTMLAudioElement, PostFormProps>(({formControl}, ref) => {
    
    const comboboxLoadGameData = useComboboxLoadData("id", "name", getCurrentGamedata)    

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
