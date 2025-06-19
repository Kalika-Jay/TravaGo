import {useState} from 'react';

export default function useToken(){
    const [token, setTokenInternal] = useState(()=>{
        return localStorage.getItem('token');
    });

    const setToken = newToken => {
        localStorage.setItem('token', newToken);
        setTokenInternal(newToken);
    };
    return [token, setToken];
}