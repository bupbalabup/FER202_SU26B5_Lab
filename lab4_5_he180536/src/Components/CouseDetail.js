import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Breadcrumb, Button, Col, Container, Row } from "react-bootstrap";


function CourseDetail() {
    const { id } = useParams();
    const [course, setCourse] = useState(null);

    const fetchCourseDetail = (courseId) => {
        return fetch("http://localhost:9000/courses")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Không thể lấy danh sách course");
                }
                return response.json();
            })
            .then((courses) => {
                const foundCourse = courses.find(
                    (course) => course.id === courseId
                );

                if (!foundCourse) {
                    throw new Error("Không tìm thấy course");
                }

                return foundCourse;
            });
    };

    useEffect(() => {
            fetchCourseDetail(id)
                .then((data) => setCourse(data))
                .catch((error) => {
                    setCourse(null);
                    console.error("Lỗi lấy chi tiết course:", error);
                });
    }, [id]);

    if (!course) {
        return null;
    }

    return (
        <Container className="py-4">
            <Breadcrumb>
                <Breadcrumb.Item href="/courses">
                    My Courses
                </Breadcrumb.Item>
                <Breadcrumb.Item active>{course.nameEn}</Breadcrumb.Item>
            </Breadcrumb>

            <h3>{course.nameEn}_{course.nameVi}</h3>
            <p><strong>{course.code}</strong></p>

            <Link to="/courses" className="btn btn-secondary mb-4">
                &larr; Back
            </Link>
            <Button className="mb-4 ms-2" variant="danger">Delete questions</Button>
            <Button className="mb-4 ms-2" variant="primary">OPEN</Button>

            <Row>
                <Col md={4}>
                    <div className="mb-3">
                        <strong>Classes</strong>
                        <div>{course.classes.length} class</div>
                    </div>
                    <div className="mb-3">
                        <strong>Slots</strong>
                        <div>
                            slots
                        </div>
                    </div>
                </Col>
                <Col md={8}>

                </Col>
            </Row>
        </Container>
    );
}

export default CourseDetail;
