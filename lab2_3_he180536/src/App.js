import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import useLocalStorage from "./hooks/useLocalStorage";
import { initialAttendances } from "./data";

function attendanceReducer(state, action) {
    switch (action.type) {
        case "TOGGLE_STATUS":
            return state.map((attendance) =>
                attendance.id === action.payload.id ? {
                    ...attendance,
                    status:
                        attendance.status === "PRESENT"
                            ? "ABSENT"
                            : "PRESENT",
                } : attendance
            );

        case "DELETE_RECORD":
            return state.filter(
                (attendance) => attendance.id !== action.payload.id
            );

        case "RESET":
            return initialAttendances;

        default:
            return state;
    }
}

function App() {
    const [savedAttendances, setSavedAttendances] = useLocalStorage("attendances", initialAttendances);
    const [attendances, dispatch] = useReducer(attendanceReducer, savedAttendances);

    const [darkMode, setDarkMode] = useState(false);
    const [searchName, setSearchName] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");

    const studentNameRef = useRef(null);
    const statusRef = useRef(null);

    useEffect(() => {
        setSavedAttendances(attendances);
    }, [attendances, setSavedAttendances]);

    const filteredAttendances = useMemo(() => {
        return attendances.filter((attendance) => {
            const matchesName = attendance.name.toLowerCase().includes(searchName.toLowerCase());

            const matchesStatus = statusFilter === "ALL" || attendance.status === statusFilter;

            return matchesName && matchesStatus;
        });
    }, [attendances, searchName, statusFilter]);

    const summary = useMemo(() => {
        const total = attendances.length;
        const present = attendances.filter(
            (attendance) => attendance.status === "PRESENT"
        ).length;
        const absent = total - present;
        const rate = present;

        return { total, present, absent, rate };
    }, [attendances]);

    const handleChangeStatus = useCallback((id) => {
        dispatch({
            type: "TOGGLE_STATUS",
            payload: { id },
        });
    }, []);

    const handleDelete = useCallback((id) => {
        if (window.confirm("Bạn muốn xoá record này không?")) {
            dispatch({
                type: "DELETE_RECORD",
                payload: { id },
            });
        }
    }, []);

    const handleResetFilter = () => {
        studentNameRef.current.value = "";
        statusRef.current.value = "ALL";

        setSearchName("");
        setStatusFilter("ALL");
    };

    return (
        <div
            style={{
                backgroundColor: darkMode ? "#000" : "#fff",
                color: darkMode ? "#fff" : "#000",
                minHeight: "100vh",
                padding: "20px",
            }}
        >
            <div className="d-flex justify-content-between align-items-center p-3">
                <h1 className="mb-0">
                    Hệ thống quản lý điểm danh lớp học
                </h1>

                <Button
                    variant={darkMode ? "light" : "outline-dark"}
                    onClick={() => setDarkMode((value) => !value)}
                >
                    {darkMode ? "Light" : "Dark"}
                </Button>
            </div>

            <div className="p-3">
                <Row className="g-3">
                    <Col md={4}>
                        <Form.Control
                            ref={studentNameRef}
                            placeholder="Tìm kiếm theo tên sinh viên"
                            onChange={(e) => setSearchName(e.target.value)}
                        />
                    </Col>

                    <Col md={4}>
                        <Form.Select ref={statusRef}
                            defaultValue="ALL"
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="ALL">Tất cả trạng thái</option>
                            <option value="PRESENT">Có mặt (PRESENT)</option>
                            <option value="ABSENT">Vắng mặt (ABSENT)</option>
                        </Form.Select>
                    </Col>

                    <Col md={2}>
                        <Button variant={darkMode ? "light" : "dark"} onClick={handleResetFilter}>
                            Reset bộ lọc
                        </Button>
                    </Col>
                </Row>
            </div>

            <div className="p-3">
                <p>
                    Tổng số bản ghi: {summary.total} Có mặt:{" "} {summary.present} Vắng mặt:{" "} {summary.absent} Tỷ lệ đi học:{" "}{summary.present}/{summary.total}
                </p>
            </div>

            <div className="p-3">
                <Table variant={darkMode ? "dark" : ""}>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Mã lớp</th>
                            <th>Tên sinh viên</th>
                            <th>Ngày</th>
                            <th>Trạng thái</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredAttendances.map((attendance, index) => (
                            <tr key={attendance.id}>
                                <td>{index + 1}</td>
                                <td>{attendance.classId}</td>
                                <td>{attendance.name}</td>
                                <td>
                                    {new Date(attendance.date).toLocaleString("vi-VN",
                                        {
                                            dateStyle: "short",
                                            timeStyle: "short"
                                        }
                                    )}
                                </td>
                                <td>
                                    <Button variant={attendance.status === "PRESENT" ? "success" : "danger"} onClick={() => handleChangeStatus(attendance.id)}>
                                        {attendance.status}
                                    </Button>
                                </td>
                                <td>
                                    <Button variant="danger" onClick={() => handleDelete(attendance.id)}>Xoá</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

export default App;