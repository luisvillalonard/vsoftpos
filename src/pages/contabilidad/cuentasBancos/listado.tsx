import { useData } from "../../../hooks/useData";
import { useEffect } from "react";
import { CuentaBanco } from "../../../interfaces/contabilidad";
import { Table, Tooltip, Button, Tag, Flex } from "antd";
import { EditFilled } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import { ControlProps } from "../../../interfaces/globales";
import { FormatDate_DDMMYYYY, FormatNumber } from "../../../hooks/useUtils";

const CuentasBancosListado = (props: Pick<ControlProps, "filter">) => {
    const { contextCuentasBancos: { state, editar, todos } } = useData();
    const { datos, procesando, recargar } = state;
    const { filter } = props;
    const { Column } = Table;
    const url = useLocation();

    const cargar = async () => await todos();

    useEffect(() => {
        cargar();
    }, [url.pathname])

    useEffect(() => {
        if (recargar) {
            cargar();
        }
    }, [recargar])

    return (
        <Table<CuentaBanco>
            size="middle"
            bordered={false}
            loading={procesando}
            pagination={{ size: 'default' }}
            dataSource={
                procesando
                    ? []
                    :
                    datos && datos
                        .filter(item => (item.banco?.nombre || '').toLowerCase().indexOf((filter ?? '')) >= 0 ||
                            (item.numeroCuenta ?? '').toLowerCase().indexOf((filter ?? '')) >= 0)
                        .map((item, index) => { return { ...item, key: index + 1 } })
            }
            locale={{ emptyText: <Flex>0 cuentas de banco</Flex> }}
            scroll={{ x: 1300 }}>
            <Column title="#" dataIndex="key" key="key" align="center" fixed="left" width={60} />
            <Column title="Empresa" render={(record: CuentaBanco) => (record.empresa?.nombre)} />
            <Column title="Banco" render={(record: CuentaBanco) => (record.banco?.nombre)} />
            <Column title="N&uacute;mero de Cuenta" dataIndex="numeroCuenta" key="numeroCuenta" />
            <Column title="Monto RD$" render={(record: CuentaBanco) => (FormatNumber(record.monto, 2))} />
            <Column title="Fecha Apertura" render={(record: CuentaBanco) => (FormatDate_DDMMYYYY(record.fechaApertura))} />
            <Column title="Estado" render={(record: CuentaBanco) => (
                <Tag color={record.activa ? '#87d068' : 'red'}>{record.activa ? 'Activa' : 'Inactiva'}</Tag>
            )} />
            <Column title="Acci&oacute;n" align="center" fixed="right" width={80} render={(record: CuentaBanco) => (
                <Tooltip title={`Editar la cuenta de banco (${record.numeroCuenta})`}>
                    <Button type="text" icon={<EditFilled className="fs-4" />} onClick={() => editar(record)} />
                </Tooltip>
            )} />
        </Table>
    )
}
export default CuentasBancosListado;
