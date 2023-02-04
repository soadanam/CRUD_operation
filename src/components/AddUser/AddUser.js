import React, { useState } from 'react';
import { useRef } from 'react';
import { useForm } from "react-hook-form";

const AddUser = () => {

    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
    // console.log(watch("example"));
    const onSubmit = newUser => {
        // console.log('N U:', newUser);

        fetch('https://server-soadanam7-gmailcom.vercel.app/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
            .then(res => res.json())
            .then(data => {
                if (data?.acknowledged) {
                    alert("Data submission successful!");
                    reset();
                }
            });
    };



    return (
        <div>
            <h2>This is AddUser!</h2>

            <form onSubmit={handleSubmit(onSubmit)}>

                <input {...register("name", { required: true })} placeholder={'New user name'} />
                <input {...register("email", { required: true })} placeholder={'Email ID'} />
                {/* errors will return when field validation fails  */}
                {errors.exampleRequired && <span>This field is required</span>}

                <input type="submit" />
            </form>

        </div>
    );
};

export default AddUser;