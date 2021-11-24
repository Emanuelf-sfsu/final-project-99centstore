import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import './ViewListing.css';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap'
const ViewListing = () => {
    // View Individual Listing based on ID
    // Change view based on whether user is Admin / user
    // User can send enquiries here
    // Admin can view all Enquiries here and respond to them.
    // Admin can Delete or Edit Listing here
    let params = useParams();
    console.log(params);
    const [currentListing, setCurrentListing] = useState(null)
    useEffect(() => {
        const { id } = params
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
    }, [params])

    return (
        <>{currentListing && <Card style={{ width: '18rem' }} className="mt-4">
            <Card.Img variant="top" src={currentListing.image500 || ''} />
            <Card.Body>
                <Card.Title>{currentListing.title || ''}</Card.Title>
                <Card.Text>
                    {currentListing.desc || ''}
                </Card.Text>
                <Button variant="primary">Contact Seller</Button>
            </Card.Body>
        </Card>}</>
    )
}

export default ViewListing
