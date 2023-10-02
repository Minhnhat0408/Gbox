'use client'

import React from "react"
import style from "./postDetail.module.css"
 
interface PostDetailProps {
}

const PostDetail = React.forwardRef<HTMLElement, PostDetailProps>(({}) => {
    return <div className={`w-[890px] rounded-[40px] flex items-stretch justify-center p-[24px] ${style.container}`}>
        <div className="w-[40%] pr-[16px] bg-transparent flex-shrink-0 flex flex-col justify-between items-start">
            <div className="flex flex-col gap-y-4">
                <div className="flex items-center justify-start gap-x-3">
                    <div className="w-[60px] h-[60px] rounded-full border-2 border-[#3DBDA7]"></div>
                    <div className="flex flex-col items-start justify-start gap-y-1">
                        <div className="bg-[#3DBDA7] px-1 py-[2px] min-w-[188px] rounded-[72px] flex items-center justify-start gap-x-2">
                            <div className="w-[30px] h-[30px] rounded-full overflow-hidden bg-red-500"></div>
                            <div className="text-[#393939] text-sm font-semibold">League of Legends</div>
                        </div>
                        <div className="text-sm text-white italic">10:34 pm</div>
                    </div>
                </div>
                <div className="flex items-center justify-start gap-x-5">
                    <div className="font-bold text-[28px] text-white">Title</div>
                    <div className="flex gap-x-2">
                        <div className="w-[30px] h-[30px] rounded-full overflow-hidden bg-red-300"></div>
                        <div className="w-[30px] h-[30px] rounded-full overflow-hidden bg-red-300"></div>
                    </div>
                </div>
                <div className="text-[#F4F5F6] font-medium text-sm">
                    Say what ever the fuck you want in here to describe your horrible game
                </div>
            </div>
            <div className="flex items-center justify-start gap-x-3">
                <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full border-2 border-[#3DBDA7] bg-red-400"></div>
                    <div className="w-10 h-10 rounded-full border-2 border-[#3DBDA7] bg-green-400 translate-x-[-20px]"></div>
                    <div className="w-10 h-10 rounded-full border-2 border-[#3DBDA7] bg-blue-400 translate-x-[-40px]" ></div>
                </div>
                <div className="h-10 bg-white rounded-[44px] px-4 py-2 flex items-center gap-x-3 translate-x-[-40px]">
                    <div className="w-6 h-6 overflow-hidden">
                        <img src="/svgs/react/1.svg" alt="like icon" />
                    </div>
                    <div className="text-[#00453F] font-medium text-sm">+98 Reviews</div>
                </div>
            </div>
        </div>
        <div className="flex-grow bg-red-800 rounded-[30px] overflow-hidden h-[300px]"></div>
    </div>
})
PostDetail.displayName = "PostDetail"

export default PostDetail


