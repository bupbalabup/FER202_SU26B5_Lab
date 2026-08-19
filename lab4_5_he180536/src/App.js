import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Course from './Components/Course';
import CourseDetail from './Components/CouseDetail';

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/courses' element={<Course />} />
                <Route path='/detail/:id' element={<CourseDetail />} />
            </Routes>
        </Router>
    )
}

export default App;