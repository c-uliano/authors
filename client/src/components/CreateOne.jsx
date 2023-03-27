import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

const Form = () => {
    // * states
    const [author, setAuthor] = useState({
        name: "",
        book: ""
    });

    const [errors, setErrors] = useState({
        name: "",
        book: ""
    });
    // const [nameError, setNameError] = useState();
    // const [bookError, setBookError] = useState();

    useEffect(() => {
        console.log(errors);
    }, [errors])
    

    const navigate = useNavigate();

    // * form event handlers & functions
    const onChangeHandler = (e) => {
        setAuthor({
            ...author,
            [e.target.name]: e.target.value
        });
    }

    // ! can't get this to work
    const formValidator = () => {
        let isValid = true;
        if (author.name.length < 3) {
            isValid = false;
            setErrors({
                ...errors,
                name: ">> Name must be at least 3 characters <<"
            });
        } else {
            setErrors({
                ...errors,
                name: ""
            });
        }
        if (author.book.length < 3) {
            isValid = false;
            setErrors({
                ...errors,
                book: ">> Book title must be at least 3 characters <<"
            });
        } else {
            setErrors({
                ...errors,
                book: ""
            });
        }
        return isValid;
    }

    // const formValidator = () => {
    //     let isValid = true
    //     if (author.name.length < 3) {
    //         isValid = false;
    //         setNameError("Name must be at least 3 characters");
    //     } else {
    //         setNameError("");
    //     }
    //     if (author.book.length < 3) {
    //         isValid = false;
    //         setBookError("Book title must be at least 3 characters");
    //     } else {
    //         setBookError("");
    //     }
    //     return isValid
    // }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        if (formValidator()) {
            axios.post('http://localhost:8000/api/author', author)
            .then(res => {
                console.log(res);
                navigate("/");
            })
            .catch(err => {
                console.log(err);
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
                    {/* {nameError ? <p className='text-danger'>{nameError}</p> : ""} */}
                    {errors.name ? <p className='text-danger'>{errors.name}</p> : ""}
                    <label htmlFor="name" className="form-label">Author name</label>
                    <input type="text" className="form-control" id="name" name='name' onChange={onChangeHandler} />
                </div>
                <div className="mb-3">
                    {/* {bookError ? <p className='text-danger'>{bookError}</p> : ""} */}
                    {errors.book ? <p className='text-danger'>{errors.book}</p> : ""}
                    <label htmlFor="book" className="form-label">Favorite book by this author</label>
                    <input type="text" className="form-control" id="book" name='book' onChange={onChangeHandler} />
                </div>
                <button type="cancel" onClick={cancelBtn} className="btn btn-secondary me-2">Cancel</button>
                <button type="submit" className="btn btn-primary">Add</button>
            </form>
        </div>
    )
}

export default Form;