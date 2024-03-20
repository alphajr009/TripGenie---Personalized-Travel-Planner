import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './pages/user/Signup';
import Login from './pages/user/Login';
import Home from './pages/user/home';
import Admin from './pages/admin/admin';
import Account from './pages/Account';
import PlanTrip from './pages/PlanTrip';
import Place from './pages/user/Place';
import Trips from './pages/user/Trips';
import Location from './pages/user/Location';
import TripPage from './pages/user/TripPage';

// Custom component to validate admin access
const AdminRouteGuard = () => {
  const user = JSON.parse(localStorage.getItem('currentUser'));

  if (user && user.isAdmin) {
    return <Admin />;
  } else {
    // Redirect to homepage or any other page
    return <Navigate to="/home" />;
  }
};

// Custom component to validate user access
const UserRouteGuard = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('currentUser'));

  if (user) {
    return children;
  } else {
    // Redirect to login page if the user is not logged in
    return <Navigate to="/login" />;
  }
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} exact />
          <Route path="/signup" element={<SignUp />} exact />
          <Route path="/login" element={<Login />} exact />
          <Route path="/home" element={<Home />} exact />

          {/* Protected Routes */}
          <Route
            path="/account"
            element={
              <UserRouteGuard>
                <Account />
              </UserRouteGuard>
            }
          />
          <Route
            path="/plantrip"
            element={
              <UserRouteGuard>
                <PlanTrip />
              </UserRouteGuard>
            }
          />
          <Route
            path="/place/:placeid"
            element={
              <UserRouteGuard>
                <Place />
              </UserRouteGuard>
            }
          />
          <Route
            path="/trips"
            element={
              <UserRouteGuard>
                <Trips />
              </UserRouteGuard>
            }
          />
          <Route
            path="/trip/:tripid"
            element={
              <UserRouteGuard>
                <TripPage />
              </UserRouteGuard>
            }
          />
          <Route
            path="/locations"
            element={
              <UserRouteGuard>
                <Location />
              </UserRouteGuard>
            }
          />

          <Route path="/admin/*" element={<AdminRouteGuard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
