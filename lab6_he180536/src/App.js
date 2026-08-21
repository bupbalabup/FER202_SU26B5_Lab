import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import SyllabusList from './components/SyllabusList';
import SubjectDetail from './components/SubjectDetail';

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/' element={<Navigate to='/login' replace />} />
                <Route path='*' element={<Navigate to='/login' replace />} />
                <Route path='/syllabus' element={<SyllabusList />}/>
                <Route path='/subject/:id' element={<SubjectDetail />}/>
            </Routes>
        </Router>
    )
}

export default App;
