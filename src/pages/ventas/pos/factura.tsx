import { useEffect } from "react"
import { Flex } from "antd"
import Cliente from "./cliente"
import Items from "./items"
import Footer from "./footer"
import { useData } from "../../../hooks/useData"
import { ControlProps } from "../../../interfaces/globales"


const PosFactura = (props: Pick<ControlProps, "onClick">) => {

    const { onClick } = props
    const {
        contextFacturasTipos: { todos: cargarTiposFactura },
        contextFormasPago: { todos: cargarFormasPago },
    } = useData()

    useEffect(() => {
        (async () => {
            await Promise.all([cargarTiposFactura(), cargarFormasPago()])
        })()
    }, [])

    return (
        <Flex
            gap={6}
            vertical
            style={{ position: 'relative', height: '100%', overflow: 'hidden', padding: 3 }}>
            <Cliente />
            <Flex style={{ position: 'relative', height: '100%', overflow: 'hidden' }}>
                <Items />
            </Flex>
            <Footer onClick={onClick} />
        </Flex>
    )
}
export default PosFactura;
