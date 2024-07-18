import React, { useState } from 'react'
import SidebarMenu from '../../../components/SidebarMenu'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import api from '../../../services/api'

export default function UserCreate() {

  const token = Cookies.get('token')
  const navigate = useNavigate()


  const [name, setName]         = useState('')
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')

  const [validation, setValidation] = useState([]);

  const storeUser =  async (e) => {
    e.preventDefault()

    api.defaults.headers.common['Authorization'] = token;
    const response = await api.post('/api/admin/users', {
      name: name,
      email: email,
      password: password
    }).then((response) => {
      navigate('/admin/users')
    }).catch(error => {
      setValidation(error.response.data)
    })
  }

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
              <Link to="/admin/users" className='btn btn-sm btn-primary'>KEMBALI</Link>
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
              <form onSubmit={storeUser}>
                <div class="form-group mb-3">
                    <label class="mb-1 fw-bold">Full Name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} class="form-control" placeholder="Full Name" />
                </div>
                <div class="form-group mb-3">
                    <label class="mb-1 fw-bold">Email</label>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} class="form-control" placeholder="Email" />
                </div>
                <div class="form-group mb-3">
                    <label class="mb-1 fw-bold">Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} class="form-control" placeholder="Password" />
                </div>

                <button type="submit" class="btn btn-sm btn-primary">SAVE</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
