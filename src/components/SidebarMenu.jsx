//import Link from react router dom
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contex/Authcontex";
import Cookies from "js-cookie";

export default function SidebarMenu() {

    const navigation           = useNavigate()
    const {setIsAuthenticated} = useContext(AuthContext)

    const logout = () => {
        Cookies.remove('token')
        Cookies.remove('user')
        
        setIsAuthenticated(false)

        navigation('/login', {replace: true})
    }

    return (
        <div className="card border-0 rounded shadow-sm">
            <div className="card-header">
                MAIN MENU
            </div>
            <div className="card-body">
                <div className="list-group">
                    <Link to="/admin/dashboard" className="list-group-item list-group-item-action">Dashboard</Link>

                    <Link to="/admin/users" className="list-group-item list-group-item-action">Users</Link>
                    <button onClick={logout} className="list-group-item list-group-item-action" style={{ cursor: 'pointer' }}>Logout</button>
                </div>
            </div>
        </div>
    )
}