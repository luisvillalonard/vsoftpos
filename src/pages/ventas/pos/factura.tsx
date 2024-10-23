import { useEffect, useState } from "react"
import { Divider, Flex } from "antd"
import Cliente from "./clientes"
import Clientes from "./clientes/list"
import Items from "./items"
import Footer from "./footer"
import PanelPago from "./pago"
import { useData } from "../../../hooks/useData"
import { useFactura } from "../../../hooks/useFactura"
import { Colors } from "../../../hooks/useConstants"


const PosFactura = () => {

    const {
        contextFacturasTipos: { todos: cargarTiposFactura },
        contextFormasPago: { todos: cargarFormasPago },
    } = useData()
    const [verClientes, setVerClientes] = useState<boolean>(false)
    const [verPago, setVerPago] = useState<boolean>(false)

    const cerrarClientes = () => setVerClientes(false);

    useEffect(() => {
        (async () => {
            await Promise.all([ cargarTiposFactura(), cargarFormasPago() ])
        })()
    },[])

    return (
        <Flex
            vertical
            className="h-100" style={{ position: 'relative', overflow: 'hidden' }}>
            <Divider orientation="left" className="my-2" style={{ borderColor: Colors.Bg.Primary }}>Cliente</Divider>
            <Cliente onClick={() => setVerClientes(true)} />
            <Clientes isOpen={verClientes} onClick={cerrarClientes} onCancel={cerrarClientes} />

            <Divider orientation="left" className="my-2" style={{ borderColor: Colors.Bg.Primary }}>Productos / Servicios</Divider>
            <Items />

            <Divider orientation="left" className="my-2" style={{ borderColor: Colors.Bg.Primary }}>Totales</Divider>
            <Footer onClick={() => setVerPago(true)} />
                
            <PanelPago isOpen={verPago} onCancel={() => setVerPago(false)} />
        </Flex>
    )
}
export default PosFactura;
