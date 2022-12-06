import axios from "axios";
import {backendDomain} from "./backendDomain";

const authToken = (token) => {
    if (token) {
        axios.defaults.headers.common["Authorization"] = `${token}`;
    } else {
        delete axios.defaults.headers.common["Authorization"];
    }
};

const validateJWT = () => {
    if (localStorage.jwtToken) {
        authToken(localStorage.jwtToken);
        //header = Authorization: Bearer ${localStorage.jwtToken}
        fetch(backendDomain+"/api/auth/validateJWT", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: localStorage.jwtToken
        }).then((res)=>{
            if(res.status === 401) {
                localStorage.removeItem('jwtToken');
                return false;
            }
        })
        return true;
    }
    return false;
}

//Export validateJWT
export {validateJWT};
