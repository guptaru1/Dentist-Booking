import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignIn from './SignIn';
import Dashboard from './Dashboard';
import { NavigateBefore } from '@mui/icons-material';
import Calendar from './Calendar';
import XRay from './XRay';

function App() {
  return (
   <Router>
    <Routes>
      <Route path="/" element={<Navigate to="/signin" />} />
      <Route path="/signin"  element={<SignIn />} />
      <Route path="/dashboard/*" element={<Dashboard/>}/>
      <Route path="/dashboard/xrays" element={<XRay />} />
      <Route path="/dashboard/calendar" element={<Calendar />} />
    </Routes>
   </Router>
  );
}

export default App;
