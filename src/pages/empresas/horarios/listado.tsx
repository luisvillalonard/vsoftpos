import { useEffect } from "react"
import { useLocation } from "react-router-dom";
import { Table, Tag, Flex } from "antd";
import { useData } from "../../../hooks/useData"
import { Horario } from "../../../interfaces/empresas"
import { GetTimeFromString } from "../../../hooks/useUtils"
import { ControlProps } from "../../../interfaces/globales";
import { useComponents } from "../../../components";

const HorariosListado = (props: Pick<ControlProps, "filter">) => {

    const { filter = '' } = props
    const { contextHorarios: { state, editar, todos } } = useData()
    const { datos, procesando, recargar } = state
    const { ButtonEdit } = useComponents()
    const { Column } = Table
    const url = useLocation()

    const cargar = async () => await todos();

    useEffect(() => { cargar() }, [url.pathname])

    useEffect(() => { if (recargar) cargar() }, [recargar])

    return (
        <Table
            size="middle"
            bordered={false}
            loading={procesando}
            pagination={{ size: 'default' }}
            dataSource={
                procesando
                    ? []
                    :
                    datos && datos
                        .filter(item => item.nombre.toLowerCase().indexOf(filter) >= 0 ||
                            (item.horaInicio ?? '').toLowerCase().indexOf(filter) >= 0 ||
                            (item.horaFin ?? '').toLowerCase().indexOf(filter) >= 0 ||
                            item.empresa.nombre.toLowerCase().indexOf(filter) >= 0)
                        .map((item, index) => { return { ...item, key: index + 1 } })
            }
            locale={{ emptyText: <Flex>0 horarios</Flex> }}>
            <Column title="#" dataIndex="key" key="key" align="center" width={60} />
            <Column title="Nombre" dataIndex="nombre" key="nombre" />
            <Column title="Hora Inicio" className="text-center"
                render={(record: Horario) => (
                    GetTimeFromString(record.horaInicio)?.toLocaleTimeString('es-DO', { hour: '2-digit', minute: '2-digit' })
                )} />
            <Column title="Hora Fin" className="text-center"
                render={(record: Horario) => (
                    GetTimeFromString(record.horaFin)?.toLocaleTimeString('es-DO', { hour: '2-digit', minute: '2-digit' })
                )} />
            <Column title="Estado"
                render={(record: Horario) => (
                    <Tag color={record.activo ? '#87d068' : 'red'}>{record.activo ? 'Activo' : 'Inactivo'}</Tag>
                )} />
            <Column title="Acci&oacute;n" align="center" width={80}
                render={(record: Horario) => (
                    <ButtonEdit title={`Editar horario (${record.nombre})`} onClick={() => editar(record)} />
                )} />
        </Table>
    )
}
export default HorariosListado;
