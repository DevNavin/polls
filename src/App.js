import React, { useEffect } from 'react';
import './App.css';
import Nav from "./components/NavBar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/UserDashboard";
import NewPoll from "./components/NewUserPoll";
import PollPage from "./components/PollPage";
import { connect } from "react-redux";
import Login from "./components/UserLogin";
import Leaderboard from "./components/Leaderboard";
import Error404 from "./components/404";
import PrivateRoute from "./components/PrivateRoute";
import { handleInitialData } from './Store/actions/shared';

function App({ dispatch, loggedIn }) {
    useEffect(() => {
        dispatch(handleInitialData());
    });

    return (
        <div className="mx-auto py-4">
            {loggedIn && <Nav />}
            <div className='px-3'>
                <Routes>
                    <Route path="/login" exact element={<Login />} />
                    <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                    <Route path="/leaderboard" exact element={<PrivateRoute><Leaderboard /></PrivateRoute>} />
                    <Route path="/questions/:id" element={<PrivateRoute><PollPage /></PrivateRoute>} />
                    <Route path="/new" exact element={<PrivateRoute><NewPoll /></PrivateRoute>} />
                    <Route path="/404" exact element={<Error404 />} />
                </Routes>
            </div>

        </div>
    );
}

const mapStateToProps = ({ authedUser }) => ({
    loggedIn: !!authedUser,
});

export default connect(mapStateToProps)(App);
