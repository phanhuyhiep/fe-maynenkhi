import { useEffect, useState } from 'react';
import {jwtDecode, JwtPayload } from 'jwt-decode';
import { useGetUserById } from '../modules/admin/user/user.loader';

interface CustomJwtPayload extends JwtPayload {
    id?: string;
}
const useUserName = () => {
    const [idUser, setIdUser] = useState<string | null>(null);
    useEffect(() => {
        const token = localStorage.getItem('token');  
        if (token) {
            try {
                const decoded = jwtDecode<CustomJwtPayload>(token);
                setIdUser(decoded.id || null);
            } catch (error) {
                console.error('Invalid token:', error);
            }
        }
    }, []);
    const {data: dataUser} = useGetUserById({ id: idUser ?? '' });
    const userName = dataUser?.name
    return userName
};
export default useUserName; 