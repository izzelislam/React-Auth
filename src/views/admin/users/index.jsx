import React, { useEffect, useState } from 'react'
import SidebarMenu from '../../../components/SidebarMenu'
import { Link } from 'react-router-dom'
import api from '../../../services/api';
import Cookies from 'js-cookie';

export default function UserIndex() {

  const [users, setUsers]  = useState([]);

  const getUserData = async () => {
    const token = Cookies.get('token')
    
    if (token){
      try {
        api.defaults.headers.common['Authorization'] = token;
      
        const response = await api.get("/api/admin/users")
        setUsers(response.data.data)
      } catch (error) {
        console.error(error)
      }
    }else{
      alert('token not found')
    }
  }

  const handleDelete = async (id) => {
    const token = Cookies.get('token')

    if(token){
      try {
        api.defaults.headers.common['Authorization'] = token;
        const response = await api.delete(`/api/admin/users/${id}`)
        getUserData()
      } catch (error) {
        console.error(error)
      }
    }else{
      alert('token not found')
    }
  }

  useEffect(()=>{
    getUserData()
  },[])

  return (
    <div className='container mt-5 mb-5'>
      <div className='row'>
        <div className='col-md-3'>
          <SidebarMenu/>
        </div>
        <div className='col-md-9'>
          <div className='card border-0 rounded shadow-sm'>
            <div className='card-header d-flex justify-content-between align-items-center'>
              <span>USER</span>
              <Link to="/admin/users/create" className='btn btn-sm btn-primary'>ADD USER</Link>
            </div>
            <div className='card-body'>
              <table className='table'>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    users.length > 0 
                    ? users.map((item, index) => (
                      <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>
                          <Link to={`/admin/users/edit/${item.id}`} className='btn btn-sm btn-primary me-3'>EDIT</Link>
                          <button onClick={() => handleDelete(item.id)} className='btn btn-sm btn-danger'>DELETE</button>
                        </td>
                      </tr>
                    )) 
                    : <tr>
                      <td><div className='text-center'>Belum ada data</div></td>
                    </tr>
                  
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
