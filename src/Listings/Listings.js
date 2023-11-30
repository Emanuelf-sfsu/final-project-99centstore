import React, { useEffect } from 'react';
import ListingCard from './ListingCard';
import './Listings.css';
import { Row, Col } from 'react-bootstrap'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { updateListing } from '../redux/actions/listingActions';
// import ChatBox from '../ViewListing/ChatBox';
const Listings = () => {
    // View All Listings
    const listingData = useSelector(state => state.listingReducer.listing);
    // const isAdmin = useSelector(state => state.userReducer.isAdmin);
    const dispatch = useDispatch();
    useEffect(() => {
        axios.get('/listingService/getAllListing').then(data => {
            dispatch(updateListing(data.data));
        })
    }, []);
    return (
        <div className="listingPage">
            <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>

            <Row xs={1} md={4} lg={4} className="g-4" style="background:black;">
                {listingData && listingData.map((data, index) => <Col key={index}><ListingCard {...data} /></Col>)}
            </Row>
        </div>
    )
}

export default Listings;
