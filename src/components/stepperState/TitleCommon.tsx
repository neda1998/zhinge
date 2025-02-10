import React from 'react'

interface TitleCommonProps {
    text: string
}

const TitleCommon = ({ text }: TitleCommonProps) => {
    return (
        <div className="flex lg:hidden items-center justify-center flex-col">
            <span className="text-black text-lg">{text}</span>
            <span className="bg-main-color w-32 h-[2px] mt-3 mb-6"></span>
        </div>
    )
}

export default TitleCommon