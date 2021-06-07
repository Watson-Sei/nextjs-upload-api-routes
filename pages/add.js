import React from 'react';
import axios, { post } from 'axios';

export default function Add() {

    const [file, setFile] = React.useState(null)

    function onChange(e) {
        setFile(e.target.files[0])
    }

    function fileUpload(file) {
        const url = '/api/upload';
        const formData = new FormData();
        formData.append('file', file)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return post(url, formData, config)
    }

    function onFormSubmit(e) {
        e.preventDefault()
        fileUpload(file).then((response) => {
            console.log(response.data)
        })
    }

    // function fileUpload2(file) {
    //     const url = 'http://localhost:5000/upload';
    //     const formData = new FormData();
    //     formData.append('file', file)
    //     const config = {
    //         headers: {
    //             'content-type': 'multipart/form-data'
    //         }
    //     }
    //     return post(url, formData, config)
    // }

    // function onFormSubmit2(e) {
    //     e.preventDefault()
    //     fileUpload2(file).then((response) => {
    //         console.log(response.data)
    //     })
    // }

    return (
        <>
        <form onSubmit={onFormSubmit}>
            <h1>File Upload</h1>
            <input type="file" onChange={onChange} />
            <button type="submit">Upload</button>
        </form>

        {/* <form onSubmit={onFormSubmit2}>
            <h1>File Uupload2</h1>
            <input type="file" onChange={onChange} />
            <button type="submit">Upload2</button>
        </form> */}
        </>
    )
}