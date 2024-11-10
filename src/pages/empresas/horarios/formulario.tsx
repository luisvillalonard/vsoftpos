import { useEffect } from "react";
import { useData } from "../../../hooks/useData";
import { Alerta, Exito } from "../../../hooks/useMensaje";
import { Horario } from "../../../interfaces/empresas";
import { Form, Input, Select, Switch } from "antd";
import { useForm } from "../../../hooks/useForm";
import FormDrawer from "../../../components/containers/form";

const HorariosFormulario = () => {

    const {
        contextHorarios: { state: { modelo }, agregar, actualizar, cancelar },
        contextEmpresas: { state: { datos: empresas, procesando: cargandoEmpresas }, todos: cargarEmpresas }
    } = useData();
    const { entidad, editar, handleChangeInput } = useForm<Horario | null | undefined>(modelo);

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
            Exito(`Horario laboral ${esNuevo ? 'agregado' : 'actualizado'} exitosamente!`);
        } else {
            Alerta(res.mensaje || 'No fue posible guardar los datos del horario laboral.');
        }

    };

    useEffect(() => {
        editar(modelo);
        if (modelo) {
            (async () => {
                await cargarEmpresas()
            })()
        }
    }, [modelo])

    if (!entidad) {
        return <></>
    }

    return (
        <FormDrawer
            name="formHorario"
            title="Horario"
            placement="right"
            vertical
            open={true}
            onClose={cancelar}
            onFinish={guardar}
            initialValues={{
                ...entidad,
                empresaId: entidad.empresa?.id
            }}>
            <Form.Item label="Nombre" name="nombre" rules={[{ required: true, message: 'Obligatorio' }]}>
                <Input name="nombre" value={entidad.nombre || ''} onChange={handleChangeInput} />
            </Form.Item>
            <Form.Item label="Hora Inicio" name="horaInicio" rules={[{ required: true, message: 'Obligatorio' }]}>
                <Input type="time" name="horaInicio" value={entidad.horaInicio || ''} onChange={handleChangeInput} />
            </Form.Item>
            <Form.Item label="Hora Fin" name="horaFin" rules={[{ required: true, message: 'Obligatorio' }]}>
                <Input type="time" name="horaFin" value={entidad.horaFin || ''} onChange={handleChangeInput} />
            </Form.Item>
            <Form.Item label="Empresa" name="empresaId" rules={[{ required: true, message: 'Obligatorio' }]}>
                <Select
                    allowClear
                    showSearch
                    loading={cargandoEmpresas}
                    value={entidad.empresa?.id}
                    labelRender={(item) => !item ? <></> : <label>{item.label}</label>}
                    options={empresas.map((emp) => ({ key: emp.id.toString(), value: emp.id, label: emp.nombre }))}
                    onChange={(value) => {
                        editar({ ...entidad, empresa: empresas.filter(emp => emp.id === value)[0] })
                    }}>
                </Select>
            </Form.Item>
            <Form.Item label={entidad?.activo ? 'Activo' : 'Inactivo'} valuePropName="checked">
                <Switch checked={entidad.activo} onChange={(checked) => editar({ ...entidad, activo: checked })} />
            </Form.Item>
        </FormDrawer>
    )
}
export default HorariosFormulario;
