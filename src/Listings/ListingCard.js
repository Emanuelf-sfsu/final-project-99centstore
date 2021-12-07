import React from 'react';
import { Card, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ListingCard = ({ _id, title, price, image100 }) => {
    let navigate = useNavigate();
    const onCardClick = () => {
        navigate(`/viewListing/${_id}`)
    };
    return (
        <>
            {image100 && <Card className="clickableCard" style={{ width: "10rem" }} onClick={onCardClick}>
                <Card.Img variant="top" src={image100} />
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                </Card.Body>
                <Card.Footer>
                    <small className="text-muted">Price : ${price}</small>
                </Card.Footer>
            </Card>}
            {!image100 && <Card style={{ width: "10rem" }}>
                <Card.Header style={{ height: "158px", display: "flex" }}>
                    <Spinner animation="grow" style={{ display: "flex", margin: "auto" }} />
                </Card.Header>
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                </Card.Body>
                <Card.Footer>
                    <small className="text-muted">Price : ${price}</small>
                </Card.Footer>
            </Card>}
        </>
    )
}

export default ListingCard;
