import {useState} from 'react';
import { LOCAL_STORAGE_TOKEN } from './App';

export default function useToken() {
    const getToken = () => {
        const tokenString = localStorage.getItem(LOCAL_STORAGE_TOKEN);
        const userToken = JSON.parse(tokenString);
        return  userToken;
    };
    
      const [token, setToken] = useState(getToken());
    
      const saveToken = userToken => {
        localStorage.setItem(LOCAL_STORAGE_TOKEN, JSON.stringify(userToken));
        setToken(userToken.token);
      };

      return {
        setToken: saveToken,
        token
      }
}
