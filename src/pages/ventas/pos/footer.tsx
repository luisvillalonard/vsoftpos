import { useRef, useState } from "react"
import { Button, Divider, Flex, Input, InputNumber, Space, Tooltip } from "antd"
import type { InputRef } from 'antd'
import { FormatNumber } from "../../../hooks/useUtils"
import { useData } from "../../../hooks/useData"
import { ControlProps } from "../../../interfaces/globales"
import { useIconos } from "../../../hooks/useIconos"

const FooterFactura = (props: Pick<ControlProps, "onClick">) => {

    const { onClick } = props
    const { contextFacturas: { state: { modelo: factura }, nuevo, editar } } = useData()
    const [verDescuento, setVerDescuento] = useState<boolean>(false)
    const { IconTrash, IconEdit } = useIconos()
    const inputRef = useRef<InputRef>(null);

    const pagoDeshabilitado = () => !(factura?.cliente && factura?.items && factura.items.length > 0 && factura.total > 0)

    const editarDescuento = () => {
        setVerDescuento(true);
        if (inputRef) {
            inputRef.current?.focus({ cursor: 'all' });
        }
    }

    return (
        <Space direction="vertical" size="small" style={{ width: '100%' }}>
            <Flex justify="space-between" style={{ paddingLeft: 6, paddingRight: 6 }}>
                <span>Subtotal</span>
                <span style={{ fontWeight: 'bold', opacity: 0.8 }}>{FormatNumber(factura?.subTotal, 2)}</span>
            </Flex>
            <Divider className="m-0" />
            <Flex justify="space-between" style={{ paddingLeft: 6, paddingRight: 6 }}>
                <span>Itbis</span>
                <span style={{ fontWeight: 'bold', opacity: 0.8 }}>{FormatNumber(factura?.itbis, 2)}</span>
            </Flex>
            <Divider className="m-0" />
            <Flex justify="space-between" style={{ paddingLeft: 6, paddingRight: 6 }}>
                <span>Descuento</span>
                {
                    !verDescuento
                        ?
                        <Space>
                            <Button size="small" type="text" shape="circle" icon={<IconEdit />} onClick={editarDescuento} />
                            <span style={{ fontWeight: 'bold', opacity: 0.8 }}>{FormatNumber(factura?.descuento, 2)}</span>
                        </Space>
                        :
                        <div>
                            <Input
                                ref={inputRef}
                                type="number"
                                size="small"
                                variant="borderless"
                                min={0}
                                value={factura?.descuento}
                                style={{ textAlign: 'end' }}
                                onFocus={(evt) => evt.currentTarget.select()}
                                onBlur={() => setVerDescuento(false)}
                                onKeyUp={(evt) => {
                                    if (evt.key === 'Enter') {
                                        setVerDescuento(false)
                                    }
                                }}
                                onChange={(evt) => {
                                    if (factura) {
                                        editar({
                                            ...factura,
                                            descuento: evt.target.valueAsNumber,
                                            total: Number(((factura.subTotal + factura.itbis) - Number(evt.target.valueAsNumber.toFixed(2))).toFixed(2))
                                        })
                                    }
                                }} />
                        </div>
                }

            </Flex>
            <Space.Compact className="w-100">
                <Tooltip title="Cancelar la factura actual">
                    <Button
                        danger
                        size="large"
                        type="text"
                        className="p-4"
                        style={{ borderRadius: 0 }}
                        onClick={nuevo}>
                        <IconTrash className="fs-3" />
                    </Button>
                </Tooltip>
                <Button
                    block
                    size="large"
                    type={pagoDeshabilitado() ? "text" : "primary"}
                    className="fs-3 p-4"
                    disabled={pagoDeshabilitado()}
                    style={{ borderRadius: 0 }}
                    onClick={onClick}>
                    {
                        factura && factura.total > 0
                            ? `Pagar ${FormatNumber(factura.total, 2)}`
                            : '0.00'
                    }
                </Button>
            </Space.Compact>
        </Space>
    )
}
export default FooterFactura;
