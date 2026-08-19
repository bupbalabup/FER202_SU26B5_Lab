import { useEffect, useState } from "react";
import CourseCard from "./Card";
import Header from "./Header";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

function Course() {
    const [courses, setCourses] = useState([]);
    const [searchCourses, setSearchCourses] = useState("");
    const [semester, setSemester] = useState("");

    const fetchCourses = () => {
        return fetch("http://localhost:9000/courses")
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setCourses(data);
            });
    };

    useEffect(() => {
        fetchCourses()
            .catch((error) => {
                setCourses([]);
                console.error("Lỗi lấy danh sách course:", error);
            });
    }, []);

    const semesterCourses = courses.filter((c) => !semester || c.semester === semester);

    const filteredCourses = semesterCourses.filter((c) => {
        const value = searchCourses.toLowerCase();
        const matchCode = c.code.toLowerCase().includes(value);
        const matchNameEn = c.nameEn.toLowerCase().includes(value);
        const matchNameVi = c.nameVi.toLowerCase().includes(value);

        return matchCode || matchNameEn || matchNameVi;
    });

    const semesters = [...new Set(courses.map((course) => course.semester))];

    return (
        <>
            <Header />
            <Container>
                <Row>
                    <Col md={9}>
                        <div className="py-5">
                            <p>Welcome back, Lecturer</p>
                            <h1>My Course</h1>
                            <Col md={4}>
                                <Form.Control
                                    type="text"
                                    placeholder="Search courses"
                                    value={searchCourses}
                                    onChange={(e) => setSearchCourses(e.target.value)}
                                />
                            </Col>
                        </div>
                    </Col>
                    <Col md={3}>
                        <div className="py-5">
                            <Form className="d-flex justify-content-center align-items-end gap-2">
                                <div>
                                    <Form.Label>Semester</Form.Label>
                                    <Form.Select
                                        value={semester}
                                        onChange={(e) => setSemester(e.target.value)}
                                    >
                                        <option value="">Select Semester</option>
                                        {semesters.map((item) => (
                                            <option value={item} key={item}>{item}</option>
                                        ))}
                                    </Form.Select>
                                </div>
                                <Button type="button" onClick={fetchCourses}>
                                    Refresh
                                </Button>
                            </Form>
                        </div>
                        <div className="text-end">
                            <p><strong>{filteredCourses.length}</strong> courses</p>
                        </div>
                        
                    </Col>
                </Row>
                <Row className="g-4">
                    {filteredCourses.map((course) => (
                        <Col md={3} key={course.id}>
                            <CourseCard
                                id={course.id}
                                badge={course.badge}
                                category={course.category}
                                code={course.code}
                                nameEn={course.nameEn}
                                nameVi={course.nameVi}
                            />
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
}

export default Course;
