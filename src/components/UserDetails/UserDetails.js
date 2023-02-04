import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const UserDetails = () => {
    const {id} = useParams();
    console.log("ID", id)
    const [user, setUser] = useState();

    useEffect(()=>{
        fetch(`https://server-soadanam7-gmailcom.vercel.app/user/${id}`)
        .then( res => res.json())
        .then( data => setUser(data))
    } ,[]);

    return (
        <div>
            <h2> This is user details! </h2>
            <h4>User Name: {user?.name} </h4>
            <h6>Email: {user?.email} </h6>
            <h4>User ID: {user?._id} </h4>
        </div>
    );
};

export default UserDetails;