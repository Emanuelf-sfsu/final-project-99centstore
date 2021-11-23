import React, { useState } from 'react';
import './CreateListing.css';
import { Form, Button, InputGroup } from 'react-bootstrap';
import axios from 'axios';
const CreateListing = () => {
    // Only accessible by Admin
    // Create a Listing here
    const [value, setValue] = useState({});
    const [file, setFile] = useState(null);
    const submitForm = () => {

        axios.post('listingService/createListing', value).then(data => {
            const imageService = '/imageService/process';
            const formData = new FormData();
            console.log(data.data)
            formData.append('imageFile', file);
            formData.append('insertId', data.data.insertId)
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }
            axios.post(imageService, formData, config).then(res=>console.log(res))
        }).catch(err => console.log(err))
    };

    return (
        <Form>
            <h4 className="mt-4">Item for sale</h4>
            <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Enter title" onChange={e => setValue({ ...value, title: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} onChange={e => setValue({ ...value, desc: e.target.value })} />
            </Form.Group>
            <InputGroup >
                <InputGroup.Text>$</InputGroup.Text>
                <Form.Control type="text" required placeholder={"Price"} onChange={e => setValue({ ...value, price: e.target.value })} />
            </InputGroup>
            <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Image</Form.Label>
                <Form.Control type="file" onChange={e => setFile(e.target.files[0])} />
            </Form.Group>
            <Button variant="primary" onClick={submitForm}>Submit</Button>

        </Form>
    )
};

export default CreateListing;
