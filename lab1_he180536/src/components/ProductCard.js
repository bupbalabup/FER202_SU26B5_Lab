import { Button, Card, ListGroup } from "react-bootstrap";

function ProductCard({ img, name, price, status, stock }) {
    return (
        <Card className="w-100">
            <Card.Img
                variant="top"
                src={img}
                alt={name}
                style={{ height: "280px", objectFit: "cover" }}
            />
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text className="text-end">{price}</Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroup.Item>Status: {status}</ListGroup.Item>
                <ListGroup.Item>Stock: {stock}</ListGroup.Item>
            </ListGroup>
            <Card.Body className='d-flex justify-content-center'>
                <Button variant={stock > 0 ? 'primary' : 'secondary'}
                    disabled={stock === 0}>{stock > 0 ? 'Add to cart' : 'Out of stock'}
                    </Button>
            </Card.Body>
        </Card>
    );
}

export default ProductCard;
