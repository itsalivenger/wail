import website from '../website/website.js';

export default function authCheck( setIsAuthenticated, setIsLoading) {
    let abrtctrl = new AbortController();
    fetch(`${website}/auth`, {
        headers :{'Content-Type': 'Application/json',
                    'Accept': 'Application/json'},
        credentials: 'include'})
    .then(res=> res.json())
    .then(res=>{ 
        console.log(res)
        setIsAuthenticated(res.approved);
        
        if(setIsLoading){
            setIsLoading(false);
        }
    })
    .catch((err)=> {
        console.log("this is the error", err)
    });
    
    return abrtctrl;
}
