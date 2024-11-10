import { ChangeEvent, useEffect, useRef, useState } from "react"
import { Input, Tooltip } from "antd"
import type { InputProps, InputRef } from 'antd'
import { ControlProps } from "../../interfaces/globales"
import { useIconos } from "../../hooks/useIconos"
import { useConstants } from "../../hooks/useConstants"

const Searcher = (props: Pick<ControlProps, Required<"onChange"> | "wait" | "style"> & Pick<InputProps, "variant">) => {

    const { wait = true, variant, style, onChange } = props
    const timeoutRef = useRef<ReturnType<typeof setTimeout>>()
    const inputRef = useRef<InputRef>(null)
    const [filter, setFilter] = useState<string>('')
    const { IconSearch } = useIconos()
    const { Colors } = useConstants()
    const noBorder = variant && variant === "borderless"

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
                style={{
                    ...style,
                    borderBottomStyle: noBorder ? 'solid' : 'initial',
                    borderBottomWidth: noBorder ? 1 : 'initial',
                    borderBottomColor: noBorder ? Colors.Border.Secondary : 'inherit',
                    borderRadius: noBorder ? 0 : 6,
                }}
                variant={variant}
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
