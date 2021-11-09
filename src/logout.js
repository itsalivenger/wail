import { Redirect } from "react-router";
import { useEffect, useState } from "react/cjs/react.development";
import authCheck from "./authService/authCheck";
import Loader from "./Loader/loader";
import website from './website/website.js';

let Logout = ({ setLinks, setIsAuthenticated }) =>{
    let [ isLoadin, setIsLoading ] = useState(true);
    let abortCtr = new AbortController();
    useEffect(async ()=>{
        fetch(`${website}/logout`, {
            headers :{'Content-Type': 'Application/json',
            'Accept': 'Application/json'},
            withCredentials: true,
            credentials: 'include',
            signal: abortCtr.signal})
        .then(res=>{ 
            setIsAuthenticated(false);
            setIsLoading(false);
        })
        .catch(err=> <Redirect to='/profile'/>)

        return ()=> {
            abortCtr.abort();
        }
    })


    if(isLoadin){
        return <Loader />
    }else{
        return (
                <Redirect to='/login' />
    )}
}
export default Logout;