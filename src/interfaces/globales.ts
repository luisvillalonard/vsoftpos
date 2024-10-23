import { ButtonType } from 'antd/es/button';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import { Dayjs } from 'dayjs';
import { CSSProperties } from 'react';
import { IconType } from 'react-icons';

export interface ControlProps {
    children: JSX.Element | JSX.Element[],
    title?: string,
    icon?: React.ReactElement | JSX.Element | IconType,
    message?: string,

    item?: any,
    list?: any[],
    filter?: string,

    active?: boolean,
    isOpen: boolean,
    inside?: boolean,
    wait?: boolean,
    
    size?: SizeType,
    buttonType?: ButtonType;
    buttonCircle?: boolean,
    style?: CSSProperties | undefined,
    color?: string,
    onClick?: (value: any) => void,
    onChange?: (value: any) => void,
    onCancel?: (value: any) => void,
    onRemove?: (value: any) => void,
    setFocus?: () => void,
}

export interface MenuItems {
    key: string,
    label: string,
    element?: JSX.Element,
    icon?: JSX.Element,
    children?: MenuItems[]
}

export interface RequestFilter {
    pageSize: number,
    currentPage: number,
    filter: string
}

export interface PagingResult {
    totalRecords: number,
    totalPage: number,
    previousPage: number | null,
    nextPage: number | null,
    descripcion: string,
    pageSize: number,
    currentPage: number,
    filter: string
}

export interface ResponseResult<T> {
    ok: boolean,
    datos: T | null,
    mensaje: string | null,
    paginacion: PagingResult | null
}

export interface Anexo {
    id: number,
    imagen: string,
    extension: string
}

export type TimePickerCustomProps = {
    id?: string,
    name?: string,
    date: Dayjs, 
    dateString: string | string[]
}