import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const DisplayAll = (props) => {
    // * state
    const [list, setList] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/author')
            .then(res => {
                setList(res.data)
                console.log(list)
            })
            .catch(err => console.log(err))
    }, [])

    // * delete functionality
    const deleteOneHandler = (id) => {
        axios.delete(`http://localhost:8000/api/author/${id}`)
            .then(res => {
                const filteredList = list.filter(item => item._id !== id)
                setList(filteredList)
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            <h1 className="text-center">Favorite Authors</h1>
            <div className="text-center">
                <Link className="text-center" to="/new">Add an Author</Link>
            </div>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Author</th>
                        <th scope="col">Actions available</th>
                    </tr>
                </thead>
                <tbody>
                {list.map((author) => {
                return (
                    // <div key={author._id} className="mt-3 card p-4 mx-auto">
                    //     <h4><Link to={`/${author._id}`}>{author.name}</Link></h4>
                    //     <div><Link className="btn btn-primary me-3" to={`/edit/${product._id}`}>Edit</Link><button className="btn btn-danger" onClick={(e) => deleteOneHandler(product._id)}>Delete</button></div>
                    // </div>
                    <tr key={author._id}>
                        <td><h4><Link to={`/${author._id}`}>{author.name}</Link></h4></td>
                        <td><Link className="btn btn-primary me-3" to={`/edit/${author._id}`}>Edit</Link><button className="btn btn-danger" onClick={(e) => deleteOneHandler(author._id)}>Delete</button></td>
                    </tr>
                    )
                })}
                </tbody>
            </table>
        </>
    )
}

export default DisplayAll;