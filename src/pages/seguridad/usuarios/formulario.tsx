import { useEffect } from "react"
import { useData } from "../../../hooks/useData"
import { Alerta, Exito } from "../../../hooks/useMensaje"
import { Form, Input, Select, Space, Switch } from "antd"
import { useForm } from "../../../hooks/useForm"
import FormDrawer from "../../../components/containters/form"
import { Usuario } from "../../../interfaces/seguridad"

const UsuarioFormulario = () => {

    const {
        contextUsuarios: { state: { modelo }, agregar, actualizar, cancelar },
        contextEmpresas: { state: { datos: empresas, procesando: cargandoEmpresas }, todos: cargarEmpresas },
        contextRoles: { state: { datos: roles, procesando: cargandoRoles }, todos: cargarRoles },
        contextEmpleados: { state: { datos: empleados, procesando: cargandoEmpleados }, todos: cargarEmpleados },
    } = useData()
    const { entidad, editar, handleChangeInput } = useForm<Usuario | null | undefined>(modelo)

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
            Exito(`Usuario ${esNuevo ? 'agregado' : 'actualizado'} exitosamente!`);
        } else {
            Alerta(res.mensaje || 'No fue posible guardar los datos del usuario.');
        }

    };

    useEffect(() => {
        editar(modelo);
        if (modelo) {
            (async () => { await Promise.all([cargarEmpresas(), cargarRoles(), cargarEmpleados()]); })()
        }
    }, [modelo])

    if (!entidad) {
        return <></>
    }

    return (
        <FormDrawer
            name="formUsuario"
            title="Usuario"
            placement="right"
            vertical
            open={true}
            onClose={cancelar}
            onFinish={guardar}
            initialValues={{
                ...entidad,
                empleadoId: entidad.empleado?.id,
                rolId: entidad.rol?.id,
                empresaId: entidad.empresa?.id
            }}>
            <Form.Item label="Acceso" name="acceso" rules={[{ required: true, message: 'Obligatorio' }]}>
                <Input name="acceso" value={entidad.acceso || ''} onChange={handleChangeInput} />
            </Form.Item>
            <Form.Item label="Empleado" name="empleadoId">
                <Select
                    loading={cargandoEmpleados}
                    value={entidad.empleado?.id}
                    labelRender={(item) => !item ? <></> : <label>{item.label}</label>}
                    options={empleados.map(item => ({ key: item.id, value: item.id, label: item.nombre }))}
                    onChange={(value) => {
                        if (entidad) {
                            editar({ ...entidad, empleado: empleados.filter(item => item.id === value)[0] })
                        }
                    }}>
                </Select>
            </Form.Item>
            <Form.Item label="Perfíl" name="rolId" rules={[{ required: true, message: 'Obligatorio' }]}>
                <Select
                    loading={cargandoRoles}
                    value={entidad.rol?.id}
                    labelRender={(item) => !item ? <></> : <label>{item.label}</label>}
                    options={roles.map(item => ({ key: item.id, value: item.id, label: item.nombre }))}
                    onChange={(value) => {
                        if (entidad) {
                            editar({ ...entidad, rol: roles.filter(item => item.id === value)[0] })
                        }
                    }}>
                </Select>
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
            <Form.Item label="Correo Electr&oacute;nico" name="correo">
                <Input name="correo" value={entidad.correo || ''} onChange={handleChangeInput} />
            </Form.Item>
            {
                entidad.id > 0
                    ? <></>
                    : <Form.Item valuePropName="checked">
                        <Space>
                            <Switch checked={entidad.activo} onChange={(checked) => editar({ ...entidad, activo: checked })} />
                            <span>{modelo?.activo ? 'Activo' : 'Inactivo'}</span>
                        </Space>
                    </Form.Item>
            }
        </FormDrawer>
    )
}
export default UsuarioFormulario;
