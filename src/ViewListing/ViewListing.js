import React from 'react';
import { useParams } from "react-router-dom";
import './ViewListing.css';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import { MOCK_LISTING } from '../../src/Listings/mockListing';


const ViewListing = (image,title,price) => {
    let navigate = useNavigate();
    
    // View Individual Listing based on ID
    // Change view based on whether user is Admin / user
    // User can send enquiries here
    // Admin can view all Enquiries here and respond to them.
    // Admin can Delete or Edit Listing here
    let params = useParams();
    console.log(params);
    return (
        <div>
            View Listing Page
            <Card className="main">
            <Card.Img variant="top" src={MOCK_LISTING[0].image} />
            <Card.Body>
                <Card.Title>{MOCK_LISTING[0].title}</Card.Title>
            </Card.Body>
            <Card.Footer>
                <small className="text-muted">Price : ${MOCK_LISTING[0].price}</small>
            </Card.Footer>
        </Card>
        </div>
    )
}

export default ViewListing
