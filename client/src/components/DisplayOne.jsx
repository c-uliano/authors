import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import axios from 'axios';

const DisplayOne = () => {
    // * param for url to single product
    const { id } = useParams();

    const navigate = useNavigate();

    // * state
    const [author, setAuthor] = useState({
        name: "",
    });

    useEffect(() => {
        axios.get(`http://localhost:8000/api/author/${id}`)
            .then(res => {
                setAuthor(res.data)
                console.log(author)
            })
            .catch(err => console.log(err))
    }, [])

    // * delete functionality
    const deleteOneHandler = (id) => {
        axios.delete(`http://localhost:8000/api/author/${id}`)
            .then(res => {
                navigate("/");
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            <div className="mt-3 card p-4 mx-auto">
                <h4>{author.name}</h4>
                <p>I know there's nothing interesting on these detail pages for this assignment, but it's still good practice to make them.</p>
                <div><Link className="btn btn-primary me-3" to={`/edit/${author._id}`}>Edit</Link><button className="btn btn-danger" onClick={(e) => deleteOneHandler(author._id)}>Delete</button></div>
            </div>
        </>
    )
}

export default DisplayOne;