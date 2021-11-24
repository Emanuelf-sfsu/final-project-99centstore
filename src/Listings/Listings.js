import React, { useEffect, useState } from 'react';
import ListingCard from './ListingCard';
import './Listings.css';
import { Row, Col } from 'react-bootstrap'
import axios from 'axios';

const Listings = () => {
    // View All Listings
    const [listingData, setListingData] = useState(null)
    useEffect(() => {
        axios.get('/listingService/getAllListing').then(data => {
            console.log(data);
            setListingData(data.data);
        })
    }, []);
    return (
        <div className="listingPage">
            <Row xs={1} md={4} lg={4} className="g-4">
                {listingData && listingData.map((data, index) => <Col key={index}><ListingCard {...data} /></Col>)}
            </Row>
        </div>
    )
}

export default Listings;
