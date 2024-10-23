import cookie from 'cookie';
import { decrypt, encrypt } from './useUtils';
import { UserApp } from '../interfaces/seguridad';

export type CookieOptions = {
        expire?: number | Date
        maxAge?: number
        domain?: string
        path?: string
        secure?: boolean
        httpOnly?: boolean
}

const cookieName = '_vsp.u';

export const setCookie = (user: UserApp, options: CookieOptions = { path: '/' }) => {
        if (!user) 
                return;

        const value = JSON.stringify(user);
        const encryptText: string = encrypt(value) as string;

        document.cookie = cookie.serialize(cookieName, encryptText, options)
}

export const getCookie = (): UserApp | null => {
        const cookies = cookie.parse(document.cookie)
        const value = cookies && cookies[cookieName]

        if (value === null || value === undefined || typeof value === 'undefined') {
                return null;
        }

        const decryptText: string | null = decrypt(value)
        if (!decryptText) {
                return null;
        }

        let jsonResult = JSON.parse(decryptText);
        if (typeof jsonResult === 'string') {
                jsonResult = JSON.parse(jsonResult)
        }
        return jsonResult as UserApp;
}

export const removeCookie = () => {
        const options:CookieOptions = { expires: new Date(1970, 1, 1, 0, 0, 1), maxAge: 0, path: '/' } as CookieOptions;
        document.cookie = cookie.serialize(cookieName, '', options);
}