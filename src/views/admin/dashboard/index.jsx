
import React, { useEffect, useState } from 'react'
import SidebarMenu from '../../../components/SidebarMenu'
import api from '../../../services/api'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
    const [user, setUser] = useState([])

    const navigation = useNavigate();

    useEffect(() => {
            const useRdata = Cookies.get('user')

            if (useRdata) {
                setUser(JSON.parse(useRdata))
            }
    }, [])

    return (
        <div className="container mt-5 mb-5">
            <div className="row">
                <div className="col-md-3">
                    <SidebarMenu />
                </div>
                <div className="col-md-9">
                    <div className="card border-0 rounded shadow-sm">
                        <div className="card-header">
                            DASHBOARD
                        </div>
                        <div className="card-body">
                            Selamat Datang, <strong>{ user.name }</strong>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
