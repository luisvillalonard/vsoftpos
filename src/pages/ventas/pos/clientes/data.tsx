import { Button, Flex } from "antd"
import { ControlProps } from "../../../../interfaces/globales"
import { useEffect, useState } from "react"
import { Cliente } from "../../../../interfaces/ventas"
import { Colors } from "../../../../hooks/useConstants"

const PosCliente = (props: Pick<ControlProps, "item" | "onClick">) => {

    const { item, onClick } = props
    const [cliente, setCliente] = useState<Cliente | null>(null)

    useEffect(() => { setCliente(item) }, [item])

    return (
        <Flex vertical>
            <Button
                size="small"
                type="link"
                className="p-0"
                style={{ textAlign: 'start' }}
                onClick={onClick}>
                <Flex
                    align="start"
                    className="w-100"
                    style={{
                        width: '100%',
                        color: !cliente ? Colors.Font.Primary : 'initial',
                        fontWeight: 500,
                        opacity: 0.8
                    }}>
                    {cliente?.nombre ?? "Agregar Cliente"}
                </Flex>
            </Button>
            {
                !cliente
                    ? <></>
                    : cliente?.telefono || cliente?.correo
                        ? <div>{cliente.telefono ?? cliente.correo}</div>
                        : <></>
            }
        </Flex>
    )
}
export default PosCliente;
