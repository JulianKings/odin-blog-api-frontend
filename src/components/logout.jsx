/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
    const navigate = useNavigate();

    if(localStorage.getItem('sso_token'))
    {
        localStorage.removeItem('sso_token');
        navigate(0);
    } else {
        navigate('/');
    }

    useEffect(() => {
        if(!localStorage.getItem('sso_token'))
        {
            navigate('/');
        }
    }, []);

    return <>
        <div className="redirectCaption">Redirecting...</div>
    </>
}

export default Logout