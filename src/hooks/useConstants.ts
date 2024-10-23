export const secretKey = 'D7B9F2FD64B04F18B4D1EC4869FC52BA';

export const API_URL = {
    Base: 'http://www.factuvapi.somee.com',
    //Base: 'https://localhost/factuv.api',
    //Base: 'https://localhost:44340',

    ApiDefaultProps:  {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        //credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json; charset=UTF-8',
            mode: 'cors', // no-cors, *cors, same-origin,
            Authorization: '',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: undefined // body data type must match "Content-Type" header
    }
}

export const Colors = {
    Font: {
        Primary: '#85a5ff',
        Success: '#95de64',
        Warning: '#ffd666',
        Danger: '#ff4d4f',
    },
    Bg: {
        Primary: '#85a5ff',
        Success: '#95de64',
        Warning: '#ffd666',
        Danger: '#ff4d4f',
    },
    Border: {
        Secondary: "#969696e0"
    },
    White: "#FFFFFF",
}