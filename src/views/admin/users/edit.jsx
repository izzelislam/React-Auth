import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import SidebarMenu from '../../../components/SidebarMenu'
import api from '../../../services/api'

export default function UserEdit() {
  const token = Cookies.get('token')
  const navigate = useNavigate()

  const { id } = useParams()

  const [name, setName]         = useState('')
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')

  const [validation, setValidation] = useState([]);

  const getUserById = async () => {
    try {
      api.defaults.headers.common['Authorization'] = token;
      const response = await api.get(`/api/admin/users/${id}`)
      setName(response.data.data.name)
      setEmail(response.data.data.email)
    } catch (error) {
      console.log(error)
    }
  }

  const updateUser =  async (e) => {
    e.preventDefault()

    api.defaults.headers.common['Authorization'] = token;
    const response = await api.put(`/api/admin/users/${id}`, {
      name: name,
      email: email,
      password: password
    }).then((response) => {
      navigate('/admin/users')
    }).catch(error => {
      setValidation(error.response.data)
    })
  }

  useEffect(() => {
    getUserById()
  }, [])

  return (
    <div className='container mt-5 mb-5'>
      <div className='row'>
        <div className='col-md-3'>
          <SidebarMenu/>
        </div>
        <div className='col-md-9'>
          <div className='card border-0 rounded shadow-sm'>
            <div className='card-header d-flex justify-content-between align-items-center'>
              <span>BUAT USER</span>
              {/* <Link to="/admin/users" className='btn btn-sm btn-primary'>KEMBALI</Link> */}
            </div>
            <div className='card-body'>
              {
                validation.errors && (
                  <div className="alert alert-danger mt-2 pb-0">
                    {
                      validation.errors.map((error, index) => (
                        <p key={index}>{error.path} : {error.msg}</p>
                      ))
                    }
                  </div>
                )
              }
              <form onSubmit={updateUser}>
                <div className="form-group mb-3">
                    <label className="mb-1 fw-bold">Full Name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" placeholder="Full Name" />
                </div>
                <div className="form-group mb-3">
                    <label className="mb-1 fw-bold">Email</label>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="Email" />
                </div>
                <div className="form-group mb-3">
                    <label className="mb-1 fw-bold">Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="Password" />
                </div>

                <button type="submit" className="btn btn-sm btn-primary">SAVE</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
