import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';  // Import your login component
import UserDashboard from './app/Userdashboard/page';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        {/* other routes */}
      </Routes>
    </Router>
  );
}

export default App; 