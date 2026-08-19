import { Card, Badge } from "react-bootstrap";

function CourseCard({ id, badge, category, code, nameEn, nameVi }) {
    return (
        <Card className="h-100">
            <Card.Header>
                <Badge bg="primary">{badge}</Badge>
                <Badge bg="secondary" className="float-end">{category}</Badge>
            </Card.Header>
            <Card.Body>
                <Card.Subtitle className="mb-2 text-muted">{code}</Card.Subtitle>
                <Card.Title>{nameEn}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{nameVi}</Card.Subtitle>
            </Card.Body>
            <Card.Footer>
                <Card.Link href={`/detail/${id}`}>-&gt; Get started</Card.Link>
            </Card.Footer>
        </Card>
    );
}

export default CourseCard;
