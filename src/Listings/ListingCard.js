import React from 'react';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';

const ListingCard = ({ id, title, image, price }) => {
    let navigate = useNavigate();
    const onCardClick = () => {
        navigate(`/viewListing/${id}`)
    };
    return (
        <Card className="clickableCard" onClick={onCardClick}>
            <Card.Img variant="top" src={image} />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
            </Card.Body>
            <Card.Footer>
                <small className="text-muted">Price : ${price}</small>
            </Card.Footer>
        </Card>
    )
}

export default ListingCard;
