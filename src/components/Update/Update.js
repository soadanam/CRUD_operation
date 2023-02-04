import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";

import axios from 'axios';




const Update = () => {
    const { id } = useParams();
    const [user, setUser] = useState();
    // console.log("UpUser:", user)


    //fetch to GET the data to Display.
    useEffect(() => {
        fetch(`https://users-data-with-vercel.vercel.app/user/update/${id}`)
            .then(res => res.json())
            .then(data => {
                // console.log('Up user id:', id)
                setUser(data)
            })
    }, []);



    // React hook form
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();

    const onSubmit = myData => {
        fetch(`https://users-data-with-vercel.vercel.app/user/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(myData)
        })
            .then(res => res.json())
            .then(data => {
                alert('Successfully Updated!');
                // reset();
            })


       // API call by AXIOS //so simple
        // axios({
        //     method: 'POST',
        //     url: `https://users-data-with-vercel.vercel.app/user/update/${id}`,
        //     data: myData
        // })
        // .then(function (response) {
        //     alert('Successfully done by axios!!');
        // });



    };

    //destructuring data for react hook form
    const name = user?.name;
    const email = user?.email;
    const userId = user?._id;

    //function to enable the disabled input's attribute to Submit the Form data
    const handleDisable = () => document.getElementById("myInput").disabled = false;



    return (
        <div>
            <h4>This is Update component!!</h4>

            <h4>Current:</h4>
            <p>Name: {user?.name}</p>
            <p>Email: {user?.email}</p>
            <h6>ID: {user?._id} (can not be changed)</h6>


            <form onSubmit={handleSubmit(onSubmit)}>
                <input defaultValue={name || ''} {...register("name", { required: true })} placeholder={'Name'} disable />
                {errors.name && <span>This field is required</span>}

                <input defaultValue={email || ''} {...register("email", { required: true })} placeholder={'Email'} />
                {errors.email && <span>This field is required</span>}

                <input defaultValue={1 || ''} {...register('quantity')} placeholder={"Quantity"} />

                <input defaultValue={userId || ''} {...register("id", { required: true })} placeholder={'ID'} id='myInput' disabled={true} readOnly />

                <input onClick={handleDisable} type="submit" value={'Update'} />
            </form>


        </div>
    );
};

export default Update;