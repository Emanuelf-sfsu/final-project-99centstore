import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import './ViewListing.css';
import axios from 'axios';
import { Card, Button, Row, Col, Modal } from 'react-bootstrap'
import ChatBox from './ChatBox';
import { useSelector } from 'react-redux';
import { toastSuccess, toastError } from '../ToastService';
import { useNavigate } from "react-router-dom";

const ViewListing = () => {
    // View Individual Listing based on ID
    // Change view based on whether user is Admin / user
    // User can send enquiries here
    // Admin can view all Enquiries here and respond to them.
    // Admin can Delete or Edit Listing here
    let params = useParams();
    let navigate = useNavigate();

    console.log(params);
    const [currentListing, setCurrentListing] = useState(null);
    const [showChatBox, setShowChatBox] = useState(false);
    const [show, setShow] = useState(false);
    

    const { isAdmin, isLoggedIn } = useSelector(state => state.userReducer);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        const { id } = params;

        if (id) {
            axios.get('/listingService/getListing', {
                params: {
                    id: id
                }
            }).then(data => {
                console.log(data);
                setCurrentListing(data.data)
            });

        }

        if(isAdmin){
            setShowChatBox(true);
        }
    }, [params]);

    function deleteListing() {
        axios.get('/listingService/deleteListing', { params: { id: currentListing._id } }).then(data => {
            handleClose();
            toastSuccess('Listing Deleted Successfully');
            navigate('/');
        }).catch(err => {
            console.log(err);
            toastError('Error in deleting a listing');
        })
    }
    /*console.log('currentLlisting id', currentListing._id);
    console.log('current listing title', currentListing.title);*/
    useSelector(state => console.log('state',state));
    console.log('isLoggedIn', isLoggedIn);
    console.log('isAdmin',  isAdmin);
    console.log('showChatBox', showChatBox);

    return (
        <>
            <Row>{currentListing && <Col><Card style={{ width: '18rem' }} className="mt-4">
                <Card.Img variant="top" src={currentListing.image500 || ''} />
                <Card.Body>
                    <Card.Title>{currentListing.title || ''}</Card.Title>
                    <Card.Text>
                        {currentListing.desc || ''}
                    </Card.Text>
                    {!isAdmin && isLoggedIn && !showChatBox && <Button variant="primary" onClick={() => setShowChatBox(true)}>Contact Seller</Button>}
                    {!isAdmin && isLoggedIn && showChatBox && <Button variant="primary" onClick={() => setShowChatBox(false)}>Close Messages</Button>}
                    {isAdmin && <Button variant="primary" style={{marginRight:"8px"}} onClick={() => navigate(`/editListing/${currentListing._id}`)}>Edit</Button>}
                    {isAdmin && <Button variant="danger" onClick={() => handleShow()}>Delete</Button>}
                </Card.Body>
            </Card></Col>}
                {currentListing && showChatBox && isLoggedIn && <Col className="mt-4"><ChatBox productId={currentListing._id} productName={currentListing.title} /></Col>}
                               
            </Row>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Listing</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this listing ?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={deleteListing}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>

            { !isLoggedIn &&
                <Card.Body>
                        <Card.Title>{"join now or log in to contact seller"}</Card.Title>
                        <Card.Text>
                            {"join now or log in to contact seller"}
                        </Card.Text>
                        
                </Card.Body>    
            }   

        </>
    )
}

export default ViewListing
