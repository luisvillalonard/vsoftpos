import { useRef, useState } from "react";
import { Button, ListGroup, Overlay, Popover } from "react-bootstrap";
import { FiMoreVertical } from "react-icons/fi";
import { BiEditAlt } from "react-icons/bi";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineCancel } from "react-icons/md";

interface ActionListProps<TEntity> {
    item: TEntity,
    onInfo?: (item: TEntity) => void,
    onEdit?: (item: TEntity) => void,
    onCancel?: (item: TEntity) => void
}

export function ActionList<T extends unknown>(props: ActionListProps<T>) {
    const { item, onInfo, onEdit, onCancel } = props;
    const [show, setShow] = useState<boolean>(false);
    const [target, setTarget] = useState(null);
    const ref = useRef(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setShow(!show);
        setTarget(event.target as any);
    };

    return (
        <div ref={ref}>
            <Button type="button" variant="outline-secondary" size="sm" onClick={handleClick}>
                <FiMoreVertical className="fs-6" />
            </Button>

            <Overlay
                show={show}
                target={target}
                placement="bottom"
                container={ref}
                containerPadding={20}
                onHide={() => setShow(false)}
                rootClose={true}
            >
                <Popover id="popover-actionlist">
                    <Popover.Body className="p-1">
                        <ListGroup variant="flush">
                            {
                                !onInfo
                                    ? <></>
                                    :
                                    <ListGroup.Item
                                        action
                                        className="px-2"
                                        onClick={() => {
                                            if (onInfo) {
                                                onInfo(item);
                                                setShow(false);
                                            }
                                        }}>
                                        <BsInfoCircle className="fs-6 text-primary me-2" />
                                        Informaci&oacute;n
                                    </ListGroup.Item>
                            }
                            {
                                !onEdit
                                    ? <></>
                                    :
                                    <ListGroup.Item
                                        action
                                        className="px-2"
                                        onClick={() => {
                                            if (onEdit) {
                                                onEdit(item);
                                                setShow(false);
                                            }
                                        }}>
                                        <BiEditAlt className="fs-5 text-secondary me-2" />
                                        Editar
                                    </ListGroup.Item>
                            }
                            {
                                !onCancel
                                    ? <></>
                                    :
                                    <ListGroup.Item
                                        action
                                        className="px-2"
                                        onClick={() => {
                                            if (onCancel) {
                                                onCancel(item);
                                                setShow(false);
                                            }
                                        }}>
                                        <MdOutlineCancel className="fs-5 text-danger me-2" />
                                        Cancelar
                                    </ListGroup.Item>
                            }
                        </ListGroup>
                    </Popover.Body>
                </Popover>
            </Overlay>
        </div>
    );
}
export default ActionList;
