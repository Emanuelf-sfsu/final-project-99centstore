import React from 'react';
import ListingCard from './ListingCard';
import './Listings.css';
import { MOCK_LISTING } from './mockListing';
import { Row, Col } from 'react-bootstrap'
const Listings = () => {
    // View All Listings
    return (
        <div className="listingPage">
            <Row xs={1} md={2} lg={5} className="g-4">
                {MOCK_LISTING.map((data,index) => <Col key={index}><ListingCard {...data} /></Col>)}
            </Row>
        </div>
    )
}

export default Listings
