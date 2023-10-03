'use client'

import { log } from "console";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import uuid from 'react-uuid'
import {BsCaretDownFill } from "react-icons/bs";
import useClickOutSide from "@/hook/useClickOutSide";
interface ComboboxLoadDataProps {
    comboboxControl: ComboboxControl
}

interface ComboboxControl {
    valueField: string,
    displayField: string,
    value: any,
    setValue: (value: any) => void,
    getUrl: (currentPage: number, textSearch: string) => string
}

export function useComboboxLoadData(valueField: string, displayField: string, getUrl: (currentPage: number, textSearch: string) => string) : ComboboxControl {

    const [value, setValue] = useState<any>(null);
    return {
        valueField: valueField,
        displayField: displayField,
        value: value,
        setValue: setValue,
        getUrl: getUrl
    }
}

const comboboxLoadData = React.forwardRef<HTMLElement, ComboboxLoadDataProps>(({comboboxControl}, ref) => {
    const id = uuid()
    
    const [data, setData] = useState<Array<any>>([])
    const [page, setPage] = useState<number>(1)
    const [textSearch, setTextSearch] = useState<string>("")

    const refHeadCombo = useRef<HTMLDivElement>(null)
    const refBodyCombo = useRef<HTMLDivElement>(null)

    const [isOpenCombo, setIsOpenCombo] = useState<boolean>(false)

    useClickOutSide(() => setIsOpenCombo(false), refBodyCombo, refHeadCombo);

    function handleTypeSearch(e: ChangeEvent<HTMLInputElement>) {
        setTextSearch(e.target.value)
    }


    useEffect(() => {
        const urlGetData = comboboxControl.getUrl(page, textSearch)
        const dataFake = [
            {
                [comboboxControl.displayField]: "nguyễn quốc huy",
                [comboboxControl.valueField]: 1
            },
            {
                [comboboxControl.displayField]: "phạm thảo vân",
                [comboboxControl.valueField]: 2
            },
            {
                [comboboxControl.displayField]: "nguyễn văn sáng",
                [comboboxControl.valueField]: 1
            }
        ]
        setData(dataFake)
    }, [textSearch, page])

    return <div className="w-[500px] ml-5 relative">
        <div ref={refHeadCombo} className="w-ful flex items-stretch justify-start rounded-sm overflow-hidden">
            <input onFocus={() => setIsOpenCombo(true)} id={id} className="w-full h-10 px-3 text-black text-sm outline-none border-none" placeholder="Type to search" value={textSearch} onChange={handleTypeSearch}></input>
            <label htmlFor={id} className="w-10 cursor-pointer bg-slate-500 flex items-center justify-center">
                <BsCaretDownFill></BsCaretDownFill>
            </label>
        </div>
        <div ref={refBodyCombo} className={`${isOpenCombo? 'block': 'hidden'} absolute top-full left-0 w-full max-h-[200px] rounded-sm overflow-x-hidden overflow-y-auto`}>
            {data.map(i => {
                return <div className="flex px-2 py-1 justify-between items-center">
                    <span>{i[comboboxControl.displayField]}</span>
                </div>
            })}
            
        </div>
    </div>
});


comboboxLoadData.displayName = 'comboboxLoadData'

export default comboboxLoadData