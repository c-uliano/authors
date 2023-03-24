import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditOne = () => {
    // * param for url to single product edit page
    const { id } = useParams();

    // * state
    const [author, setAuthor] = useState({});

        // * getting the data for the item
    useEffect(() => {
        axios.get(`http://localhost:8000/api/author/${id}`)
            .then(res => {
                setAuthor(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    const navigate = useNavigate();

    // * form event handlers & functions
    const onChangeHandler = (e) => {
        setAuthor({
            ...author,
            [e.target.name]: e.target.value
        });
    }

    const [errors, setErrors] = useState({});

    const formValidator = () => {
        let isValid = true
        if (author.name.length < 2) {
            isValid = false;
        }
        return isValid
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        if (formValidator()) {
            axios.patch(`http://localhost:8000/api/author/${id}`, author)
                .then(res => {
                    navigate('/')
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
            <h1>Edit Author</h1>
            <form action="" onSubmit={onSubmitHandler}>
                <div className="mb-3">
                    {errors.name ? <p className='text-danger'>{errors.name}</p> : ''}
                    <label htmlFor="title" className="form-label">Author name</label>
                    <input type="text" className="form-control" id="title" value={author.name} name='name' onChange={onChangeHandler} />
                </div>
                <button type="cancel" onClick={cancelBtn} className="btn btn-secondary me-2">Cancel</button>
                <button type="submit" className="btn btn-primary">Update</button>
            </form>
        </div>
    )
}

export default EditOne;