import { ChangeEvent, useEffect, useRef, useState } from "react"
import { Input, Tooltip } from "antd"
import type { InputRef } from 'antd'
import { ControlProps } from "../interfaces/globales"
import { useIconos } from "../hooks/useIconos"

const Searcher = (props: Pick<ControlProps, "wait" | "onChange" | "style">) => {

    const { wait = true, style, onChange } = props
    const timeoutRef = useRef<ReturnType<typeof setTimeout>>()
    const inputRef = useRef<InputRef>(null)
    const [filter, setFilter] = useState<string>('')
    const { IconSearch } = useIconos()

    useEffect(() => {
        if (inputRef) {
            inputRef.current!.focus({
                cursor: 'end',
            })
        }
    }, [inputRef])

    useEffect(() => { onChange && onChange(filter) },[filter])

    return (
        <Tooltip title="Presione escape para limpiar la busqueda">
            <Input
                allowClear
                placeholder="escriba aqui para buscar"
                suffix={<IconSearch />}
                ref={inputRef}
                value={filter}
                style={style}
                onKeyUp={(evt) => {
                    if (evt.code.toLowerCase() === 'escape') setFilter('')
                }}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    if (timeoutRef.current) {
                        clearTimeout(timeoutRef.current)
                    }
                    if (!wait) {
                        setFilter(e.target.value)
                    } else {
                        timeoutRef.current = setTimeout(() => {
                            setFilter(e.target.value);
                        }, e.target.value.length === 0 ? 100 : 600);
                    }
                }} />
        </Tooltip>
    )
}
export default Searcher;
