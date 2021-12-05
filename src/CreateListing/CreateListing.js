import React, { useState, useEffect } from 'react';
import './CreateListing.css';
import { Form, Button, InputGroup } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { toastError, toastSuccess } from '../ToastService';

const CreateListing = () => {
    // Only accessible by Admin
    // Create a Listing here
    let navigate = useNavigate();
    let params = useParams();

    const [value, setValue] = useState({});
    const [file, setFile] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [currentListing, setCurrentListing] = useState(null);

    const submitForm = () => {

        if (editMode) {
            axios.post('/listingService/editListing', { ...value, id: currentListing._id }).then(data => {
                // const imageService = '/imageService/process';
                // const formData = new FormData();
                // formData.append('imageFile', file);
                // formData.append('insertId', data.data.insertId)
                // const config = {
                //     headers: {
                //         'content-type': 'multipart/form-data'
                //     }
                // }
                // axios.post(imageService, formData, config).then(res => console.log(res))
                navigate('/');
                toastSuccess('Listing Edited Successfully');
            }).catch(err => {
                console.log(err);
                toastError('Error in editing listing');
            });
        } else {
            axios.post('/listingService/createListing', { ...value }).then(data => {
                const imageService = '/imageService/process';
                const formData = new FormData();
                formData.append('imageFile', file);
                formData.append('insertId', data.data.insertId)
                const config = {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                }
                axios.post(imageService, formData, config).then(res => console.log(res))
                navigate('/');
                toastSuccess('Listing Created Successfully');
            }).catch(err => {
                console.log(err);
                toastError('Error in creating listing');
            });
        }
    };

    function getBase64(file) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            console.log(reader.result);
            setFile(reader.result)
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    };

    useEffect(() => {
        const { id } = params;
        if (id) {
            setEditMode(true);
            axios.get('/listingService/getListing', {
                params: {
                    id: id
                }
            }).then(data => {
                console.log(data);
                setCurrentListing(data.data);
                const { title, desc, price } = data.data;
                setValue({ title, desc, price });
            });
        }

    }, [params]);

    useEffect(() => {
        console.log(value);
        console.log(editMode)
    }, [value, editMode])

    return (
        <Form>
            <h4 className="mt-4">Item for sale</h4>
            <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Enter title" value={value.title || ''} onChange={e => setValue({ ...value, title: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} value={value.desc || ''} onChange={e => setValue({ ...value, desc: e.target.value })} />
            </Form.Group>
            <InputGroup >
                <InputGroup.Text>$</InputGroup.Text>
                <Form.Control type="text" required placeholder={"Price"} value={value.price || ''} onChange={e => setValue({ ...value, price: e.target.value })} />
            </InputGroup>
            <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Image</Form.Label>
                <Form.Control type="file" onChange={e => getBase64(e.target.files[0])} />
            </Form.Group>
            <Button variant="primary" onClick={submitForm}>Submit</Button>
        </Form>
    )
};

export default CreateListing;
