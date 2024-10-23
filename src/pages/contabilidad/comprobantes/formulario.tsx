import { useEffect } from "react";
import { useData } from "../../../hooks/useData";
import { Alerta, Exito } from "../../../hooks/useMensaje";
import { Form, Input, InputNumber, Select, Switch } from "antd";
import { useForm } from "../../../hooks/useForm";
import FormDrawer from "../../../components/containters/form";
import { ComprobanteSecuencia } from "../../../interfaces/contabilidad";

const ComprobanteFormulario = () => {
    const {
        contextComprobantesSecuencias: { state: { modelo }, agregar, actualizar, cancelar },
        contextComprobantes: { state: { datos: comprobantes, procesando: cargandoComprobantes }, todos: cargarComprobantes },
        contextEmpresas: { state: { datos: empresas, procesando: cargandoEmpresas }, todos: cargarEmpresas },
    } = useData();
    const { entidad, editar, handleChangeInput } = useForm<ComprobanteSecuencia | null | undefined>(modelo);

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
            Exito(`Comprobante fiscal ${esNuevo ? 'agregado' : 'actualizado'} exitosamente!`);
        } else {
            Alerta(res.mensaje || 'No fue posible guardar los datos del comprobante fiscal.');
        }

    };

    useEffect(() => {
        editar(modelo);
        if (modelo) {
            (async () => {
                await cargarComprobantes();
                await cargarEmpresas();
            })()
        }
    }, [modelo])

    if (!entidad) {
        return <></>
    }

    return (
        <FormDrawer
            name="formComprobante"
            title="Comprobante Fiscal"
            placement="right"
            vertical
            open={true}
            onClose={cancelar}
            onFinish={guardar}
            initialValues={{
                ...entidad,
                comprobanteId: entidad.comprobante?.id,
                empresaId: entidad.empresa?.id,
            }}>
            <Form.Item label="Empresa" name="comprobanteId" rules={[{ required: true, message: 'Obligatorio' }]}>
                <Select
                    loading={cargandoComprobantes}
                    value={entidad.comprobante?.id}
                    labelRender={(item) => !item ? <></> : <label>{item.label}</label>}
                    options={comprobantes.map(item => ({ key: item.id, value: item.id, label: item.nombre }))}
                    onChange={(value) => editar({ ...entidad, comprobante: comprobantes.filter(emp => emp.id === value)[0] })}>
                </Select>
            </Form.Item>
            <Form.Item label="Desde" name="desde" rules={[{ required: true, message: 'Obligatorio' }]}>
                <InputNumber value={entidad.desde} onChange={(value) => editar({ ...entidad, desde: value ?? 0 })} />
            </Form.Item>
            <Form.Item label="Hasta" name="hasta" rules={[{ required: true, message: 'Obligatorio' }]}>
                <InputNumber value={entidad.hasta} onChange={(value) => editar({ ...entidad, hasta: value ?? 0 })} />
            </Form.Item>
            <Form.Item label="Ultimo" name="ultimo" rules={[{ required: true, message: 'Obligatorio' }]}>
                <InputNumber value={entidad.ultimo} onChange={(value) => editar({ ...entidad, ultimo: value ?? 0 })} />
            </Form.Item>
            <Form.Item label="Fecha Vencimiento" name="fechaVence">
                <Input type="date" name="fechaVence" value={entidad.fechaVence || ''} onChange={handleChangeInput} />
            </Form.Item>
            <Form.Item label="Empresa" name="empresaId" rules={[{ required: true, message: 'Obligatorio' }]}>
                <Select
                    loading={cargandoEmpresas}
                    value={entidad.empresa?.id}
                    labelRender={(item) => !item ? <></> : <label>{item.label}</label>}
                    options={empresas.map((emp) => ({ key: emp.id.toString(), value: emp.id, label: emp.nombre }))}
                    onChange={(value) => editar({ ...entidad, empresa: empresas.filter(emp => emp.id === value)[0] })}>
                </Select>
            </Form.Item>
        </FormDrawer>
    )
}
export default ComprobanteFormulario;
