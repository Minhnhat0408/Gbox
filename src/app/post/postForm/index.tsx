'use client'

import React from "react"

interface PostFormProps {

}


const PostForm =  React.forwardRef<HTMLAudioElement, PostFormProps>(({}, ref) => {
    return <div>post form</div>
})

PostForm.displayName = "PostForm"

export default PostForm
