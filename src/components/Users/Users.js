import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { set } from 'react-hook-form';
import { Link } from 'react-router-dom';

const Users = () => {
    const [users, setUsers] = useState({});

    //fetch for GET API
    useEffect(() => {
        fetch('https://users-data-with-vercel.vercel.app/users')
            .then(res => res.json())
            .then(data => setUsers(data))
    }, []);


    //To DELETE (Operation)
    const handleDelete = id => {
        const proceed = window.confirm("Are you sure you want to Delete??")
        if (proceed) {

            fetch(`https://users-data-with-vercel.vercel.app/user/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount === 1) {
                        alert("User is Deleted!");

                        const reamingUser = users?.filter(x => x._id !== id)
                        setUsers(reamingUser);
                    }
                });
        };
    };



    if (!Array.isArray(users)) {
        return <p>Error getting users!</p>;
    };

    return (
        <div>
            <h2>These are all users! </h2>
            <ol>
                {
                    users?.map(x => <li key={x._id}> Name: {x.name} || Email: {x.email}
                        <Link to={`/userDetails/${x._id}`}>
                            <button>Details</button>
                        </Link>
                        <Link to={`/user/update/${x._id}`}>
                            <button> Update </button>
                        </Link>
                        <button onClick={() => handleDelete(x._id)}> X </button>
                    </li>)
                }
            </ol>

        </div>
    );
};

export default Users;