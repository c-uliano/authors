import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

const Form = () => {
    // * states
    const [author, setAuthor] = useState({
        name: "",
    });

    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    // * form event handlers & functions
    const onChangeHandler = (e) => {
        setAuthor({
            ...author,
            [e.target.name]: e.target.value
        });
    }

    // const formValidator = () => {
    //     let isValid = true;
    //     if (product.title.length < 3) {
    //         setErrors({
    //             ...errors,
    //             title: "Title must be at least 3 characters"
    //         });
    //         isValid = false;
    //     } else if (product.price < 1) {
    //         setErrors({
    //             ...errors,
    //             price: "Price must be greater than 1"
    //         });
    //         isValid = false;
    //     } else if (product.description.length < 3) {
    //         setErrors({
    //             ...errors,
    //             description: "Description must be at least 10 characters long"
    //         });
    //     }
    //     return isValid;
    // }

    const formValidator = () => {
        let isValid = true
        if (author.name.length < 3) {
            isValid = false;
        }
        return isValid
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        if (formValidator()) {
            axios.post('http://localhost:8000/api/author', author)
                .then(res => {
                    console.log(res)
                    navigate("/");
                })
                .catch(err => console.log(err))
        } else {
            setErrors({
                name: "Name must be at least 3 characters",
            })
        }
    }

    const cancelBtn = (e) => {
        navigate("/");
    }

    return (
        <div className='card p-4'>
            <h1>Add Author</h1>
            <form action="" onSubmit={onSubmitHandler}>
                <div className="mb-3">
                    {errors.name ? <p className='text-danger'>{errors.name}</p> : ''}
                    <label htmlFor="title" className="form-label">Author name</label>
                    <input type="text" className="form-control" id="title" name='name' onChange={onChangeHandler} />
                </div>
                <button type="cancel" onClick={cancelBtn} className="btn btn-secondary me-2">Cancel</button>
                <button type="submit" className="btn btn-primary">Add</button>
            </form>
        </div>
    )
}

export default Form;