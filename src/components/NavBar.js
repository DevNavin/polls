import {Link} from "react-router-dom";
import {connect} from "react-redux";
import { handleLogout } from "../Store/actions/authedUser";

const Nav = ({dispatch, authedUserId}) => {

    const logout = (e) => {
        e.preventDefault();
        dispatch(handleLogout());
    };

    return (
        <nav className="flex justify-between space-x-4 px-3 header-bot-border header-box-shadow">
            <div>
                <Link to="/"
                  className="font-medium px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900">Home</Link>
            <Link to="/leaderboard"
                  className="font-medium px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900">Leaderboard</Link>
            <Link to="/new"
                  className="font-medium px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900">New
                Poll</Link>
            </div>
            <div>
                <span
                className="font-medium px-3 py-2 text-slate-700"
                data-testid="user-information">User: {authedUserId}</span>
            <button onClick={logout}
                    className="font-medium px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900">Logout
            </button>
            </div>
                
                
            
        </nav>
    );
};

const mapStateToProps = ({authedUser}) => ({
    authedUserId: authedUser.id,
});


export default connect(mapStateToProps)(Nav);
