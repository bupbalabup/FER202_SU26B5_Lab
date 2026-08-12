import { Container, Row, Col } from "react-bootstrap";
import ProductCard from "./ProductCard";

function ProductList() {
    const products = [
        { img: "/images/nam1.jpg", name: "so mi", price: "500000", status: "In stock", stock: 12 },
        { img: "/images/nam2.jpg", name: "so mi1", price: "400000", status: "In stock", stock: 8 },
        { img: "/images/nam3.jpg", name: "so mi2", price: "250000", status: "In stock", stock: 20 },
        { img: "/images/Nu1.jpg", name: "so mi1", price: "499000", status: "In stock", stock: 10 },
        { img: "/images/Nu2.jpg", name: "so mi2", price: "200000", status: "In stock", stock: 6 },
        { img: "/images/Nu3.jpg", name: "so mi3", price: "350000", status: "Out of stock", stock: 0 },
    ];

    return (
        <Container className="py-5">
            <Row className="g-4">
                {products.map((product) => (
                    <Col key={product.name} xs={4} md={4} lg={4} className="d-flex">
                        <ProductCard {...product} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default ProductList;
