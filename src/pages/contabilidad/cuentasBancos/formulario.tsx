import { useEffect } from "react";
import { useData } from "../../../hooks/useData";
import { Alerta, Exito } from "../../../hooks/useMensaje";
import { CuentaBanco } from "../../../interfaces/contabilidad";
import { Form, Input, InputNumber, Select } from "antd";
import { useForm } from "../../../hooks/useForm";
import FormDrawer from "../../../components/containers/form";

const CuentaBancoFormulario = () => {
    const {
        contextCuentasBancos: { state: { modelo }, agregar, actualizar, cancelar },
        contextEmpresas: { state: { datos: empresas, procesando: cargandoEmpresas }, todos: cargarEmpresas },
        contextBancos: { state: { datos: bancos, procesando: cargandoBancos }, todos: cargarBancos },
    } = useData();
    const { entidad, editar, handleChangeInput } = useForm<CuentaBanco | null | undefined>(modelo);

    const guardar = async () => {

        if (!entidad) {
            return;
        }

        let res;
        let esNuevo: boolean = entidad.id && entidad.id > 0 ? false : true;

        if (esNuevo)
            res = await agregar(entidad);
        else {
            res = await actualizar(entidad);
        }

        if (res.ok) {
            Exito(`Cuenta de banco ${esNuevo ? 'agregada' : 'actualizada'} exitosamente!`);
        } else {
            Alerta(res.mensaje || 'No fue posible guardar los datos de la cuenta de banco.');
        }

    };

    useEffect(() => {
        editar(modelo);
        if (modelo) {
            (async () => {
                await cargarEmpresas();
                await cargarBancos();
            })()
        }
    }, [modelo])

    if (!entidad) {
        return <></>
    }

    return (
        <FormDrawer
            name="formCuentaBanco"
            title="Cuenta de Banco"
            placement="right"
            vertical
            open={true}
            onClose={cancelar}
            onFinish={guardar}
            initialValues={{
                ...entidad,
                bancoId: entidad.banco?.id,
                empresaId: entidad.empresa?.id,
            }}>
            <Form.Item label="N&uacute;mero de Cuenta" name="numeroCuenta" rules={[{ required: true, message: 'Obligatorio' }]}>
                <Input name="numeroCuenta" value={entidad.numeroCuenta || ''} onChange={handleChangeInput} />
            </Form.Item>
            <Form.Item label="Banco" name="bancoId" rules={[{ required: true, message: 'Obligatorio' }]}>
                <Select
                    loading={cargandoBancos}
                    value={entidad.banco?.id}
                    labelRender={(item) => !item ? <></> : <label>{item.label}</label>}
                    options={bancos.map(item => ({ key: item.id, value: item.id, label: item.nombre }))}
                    onChange={(value) => editar({ ...entidad, banco: bancos.filter(item => item.id === value)[0] })}>
                </Select>
            </Form.Item>
            <Form.Item label="Empresa" name="empresaId" rules={[{ required: true, message: 'Obligatorio' }]}>
                <Select
                    loading={cargandoEmpresas}
                    value={entidad.empresa?.id}
                    labelRender={(item) => !item ? <></> : <label>{item.label}</label>}
                    options={empresas.map(item => ({ key: item, value: item.id, label: item.nombre }))}
                    onChange={(value) => editar({ ...entidad, empresa: empresas.filter(item => item.id === value)[0] })}>
                </Select>
            </Form.Item>
            <Form.Item label="Monto RD$" name="monto" rules={[{ required: true, message: 'Obligatorio' }]}>
                <InputNumber value={entidad.monto} onChange={(value) => editar({ ...entidad, monto: value ?? 0 })} />
            </Form.Item>
            <Form.Item label="Fecha Apertura" name="fechaApertura">
                <Input type="date" name="fechaApertura" value={entidad.fechaApertura || ''} onChange={handleChangeInput} />
            </Form.Item>
        </FormDrawer>
    )
}
export default CuentaBancoFormulario;
