import { useEffect } from "react";
import { useData } from "../../../hooks/useData";
import { Alerta, Exito } from "../../../hooks/useMensaje";
import { Posicion } from "../../../interfaces/empresas";
import { Form, Input, InputNumber, Select, Switch } from "antd";
import { useForm } from "../../../hooks/useForm";
import TextArea from "antd/es/input/TextArea";
import FormDrawer from "../../../components/containters/form";

const PosicionFormulario = () => {
    const {
        contextPosiciones: { state: { modelo, procesando }, agregar, actualizar, cancelar },
        contextEmpresas: { state: { datos: empresas, procesando: cargandoEmpresas }, todos: cargarEmpresas }
    } = useData();
    const { entidad, editar, handleChangeInput } = useForm<Posicion | null | undefined>(modelo);

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
            Exito(`Posición ${esNuevo ? 'agregada' : 'actualizada'} exitosamente!`);
        } else {
            Alerta(res.mensaje || 'No fue posible guardar los datos de la posición.');
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
            name="formPosicion"
            title="Posici&oacute;n"
            placement="right"
            vertical
            open={true}
            loading={procesando}
            onClose={cancelar}
            onFinish={guardar}
            initialValues={{
                ...entidad,
                empresaId: entidad.empresa?.id
            }}>
            <Form.Item label="Nombre" name="nombre" rules={[{ required: true, message: 'Obligatorio' }]}>
                <Input name="nombre" value={entidad.nombre || ''} onChange={handleChangeInput} />
            </Form.Item>
            <Form.Item label="Descripci&oacute;n" name="descripcion" rules={[{ required: true, message: 'Obligatorio' }]}>
                <TextArea rows={3} name="descripcion" className="not-resize" value={entidad.descripcion || ''} onChange={handleChangeInput} />
            </Form.Item>
            <Form.Item label="Sueldo" name="sueldo" style={{ width: '100% ' }}>
                <InputNumber min={0} value={entidad.sueldo}
                    onChange={(value) => editar({ ...entidad, sueldo: value ?? 0 })} onFocus={(evt) => evt.currentTarget.select()} />
            </Form.Item>
            <Form.Item label="Empresa" name="empresaId" rules={[{ required: true, message: 'Obligatorio' }]}>
                <Select
                    loading={cargandoEmpresas}
                    value={entidad.empresa?.id}
                    labelRender={(item) => !item ? <></> : <label>{item.label}</label>}
                    options={empresas.map((emp) => ({ key: emp.id.toString(), value: emp.id, label: emp.nombre }))}
                    onChange={(value) => {
                        editar({ ...entidad, empresa: empresas.filter(emp => emp.id === value)[0] })
                    }}>
                </Select>
            </Form.Item>
            <Form.Item label={entidad?.activa ? 'Activa' : 'Inactiva'} valuePropName="checked">
                <Switch checked={entidad.activa} onChange={(checked) => editar({ ...entidad, activa: checked })} />
            </Form.Item>
        </FormDrawer>
    )
}
export default PosicionFormulario;
