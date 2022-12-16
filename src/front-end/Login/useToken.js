import {useState} from 'react';
import { setTokenLocal } from '../../back-end/services/services';
import { LOCAL_STORAGE_TOKEN } from '../App/App';

export default function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem(LOCAL_STORAGE_TOKEN);
    const userToken = JSON.parse(tokenString);
    return  userToken;
  };
  
  const [token, setToken] = useState(getToken());
  setTokenLocal(token);
    
      const saveToken = userToken => {
        localStorage.setItem(LOCAL_STORAGE_TOKEN, JSON.stringify(userToken));
        setToken(userToken.token);
        setTokenLocal(token);
      };

      const deleteToken = () => {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN);
        setToken(null);
      }

      return {
        setToken: saveToken,
        token,
        deleteToken: deleteToken
      }
}
