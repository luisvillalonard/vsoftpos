import { useEffect } from "react";
import { useData } from "../../../hooks/useData";
import { Alerta, Exito } from "../../../hooks/useMensaje";
import { Form, InputNumber, Select } from "antd";
import { useForm } from "../../../hooks/useForm";
import FormDrawer from "../../../components/containters/form";
import TextArea from "antd/es/input/TextArea";
import { Gasto } from "../../../interfaces/compras";
import { Empleado } from "../../../interfaces/empresas";

const GastoFormulario = () => {
    const {
        contextGastos: { state: { modelo }, agregar, actualizar, cancelar },
        contextGastosTipos: { state: { datos: tipos, procesando: cargandoTipos }, todos: cargarTipos },
        contextEmpleados: { state: { datos: empleados, procesando: cargandoEmpleados }, todos: cargarEmpleados },
        contextEmpresas: { state: { datos: empresas, procesando: cargandoEmpresas }, todos: cargarEmpresas },
    } = useData();
    const { entidad, editar, handleChangeInput } = useForm<Gasto | null | undefined>(modelo);

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
            Exito(`Gasto ${esNuevo ? 'agregado' : 'actualizado'} exitosamente!`);
        } else {
            Alerta(res.mensaje || 'No fue posible guardar los datos del gasto.');
        }

    };

    useEffect(() => {
        editar(modelo);
        (async () => {
            await cargarTipos();
            await cargarEmpleados();
            await cargarEmpresas();
        })()
    }, [modelo])

    if (!entidad) {
        return <></>
    }

    return (
        <FormDrawer
            name="formGasto"
            title="Gasto"
            placement="right"
            vertical
            open={true}
            onClose={cancelar}
            onFinish={guardar}
            initialValues={{
                ...entidad,
                tipoId: entidad.tipo.id,
                empleadoId: entidad.empleado?.id,
                empresaId: entidad.empresa.id
            }}>
            <Form.Item label="Tipo" name="tipoId" rules={[{ required: true, message: 'Obligatorio' }]}>
                <Select
                    loading={cargandoTipos}
                    value={entidad.tipo.id}
                    labelRender={(item) => !item ? <></> : <label>{item.label}</label>}
                    options={tipos.map(item => ({ key: item.id, value: item.id, label: item.nombre }))}
                    onChange={(value) => {
                        editar({ ...entidad, tipo: tipos.filter(item => item.id === value)[0] })
                    }}>
                </Select>
            </Form.Item>
            <Form.Item label="Monto RD$" name="monto" style={{ width: '100% ' }}>
                <InputNumber min={1} value={entidad.monto}
                    onChange={(value) => editar({ ...entidad, monto: value ?? 0 })}
                    onFocus={(evt) => evt.currentTarget.select()} />
            </Form.Item>
            <Form.Item label="Empleado" name="empleadoId">
                <Select 
                    allowClear
                    loading={cargandoEmpleados}
                    value={entidad.empleado?.id}
                    labelRender={(item) => !item ? <></> : <label>{item.label}</label>}
                    options={empleados.map((item, index) => ({ key: index, value: item.id, label: item.nombre }))}
                    onChange={(value) => {
                        editar({ ...entidad, empleado: empleados.filter(emp => emp.id === value)[0] })
                    }}>
                </Select>
            </Form.Item>
            <Form.Item label="Empresa" name="empresaId" rules={[{ required: true, message: 'Obligatorio' }]}>
                <Select
                    loading={cargandoEmpresas}
                    value={entidad.empresa?.id}
                    labelRender={(item) => !item ? <></> : <label>{item.label}</label>}
                    options={empresas.map(item => ({ key: item.id, value: item.id, label: item.nombre }))}
                    onChange={(value) => {
                        editar({ ...entidad, empresa: empresas.filter(item => item.id === value)[0] })
                    }}>
                </Select>
            </Form.Item>
            <Form.Item label="Comentario" name="comentario" rules={[{ required: true, message: 'Obligatorio' }]}>
                <TextArea rows={3} name="comentario" className="not-resize" value={entidad.comentario || ''} onChange={handleChangeInput} />
            </Form.Item>
        </FormDrawer>
    )
}
export default GastoFormulario;
