import './App.css';
import { Link, Route, Routes } from 'react-router-dom';
import React, {useState} from 'react';
import DisplayAll from './components/DisplayAll';
import CreateOne from './components/CreateOne';
import DisplayOne from './components/DisplayOne';
import EditOne from './components/EditOne';

function App() {
    // * states

    return (
        <div className="w-50 mx-auto mt-4">
            <div className='text-center pb-3'>
                <Link to="/">Go Home</Link>
            </div>
            <Routes>
                <Route element={<DisplayAll />} path="/" default />
                <Route element={<CreateOne />} path="/new" />
                <Route element={<DisplayOne />} path="/:id" />
                <Route element={<EditOne />} path="/edit/:id" />
            </Routes>
        </div>
    );
}

export default App;
