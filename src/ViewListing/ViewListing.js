import React from 'react';
import { useParams } from "react-router-dom";
import './ViewListing.css';

const ViewListing = () => {
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
        </div>
    )
}

export default ViewListing
