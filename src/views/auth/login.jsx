import React, { useContext, useState } from 'react'
import { json, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contex/Authcontex';
import Cookies from 'js-cookie';
import api from '../../services/api';

export default function login() {


  const navigation = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [validation, setValidation] = useState(null);
  const [alert , setAlert] = useState(null);


  const handleLogin = async (e) => {
    e.preventDefault()
    
    try {
      
      const response = await api.post('/api/login', {
        email: email,
        password: password
      })


      Cookies.set('token', response.data.data.token)
      Cookies.set('user', JSON.stringify(response.data.data.user))

      setIsAuthenticated(true)

      navigation('/admin/dashboard', {replace: true})

    } catch (error) {
      setValidation(error.response.data)
      setAlert(error.response.data)
    }
  }

  return (
    <div className="row">
        <div className='p-5 mb-4 bg-light rounded-3 shadow-sm col-lg-4 col-md-6 col-sm-12 m-auto'>
          {
            validation?.errors && (
                <div className="alert alert-danger mt-2 pb-0">
                    {
                        validation.errors.map((error, index) => (
                            <p key={index}>{error.path} : {error.msg}</p>
                        ))
                    }
                </div>
            )
          }
          {
            alert?.message && (
              <div className="alert alert-danger" role="alert">
                {alert.message}
              </div>
            )
          }
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
              <input value={email} onChange={e => setEmail(e.target.value)} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
              <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="form-control" id="exampleInputPassword1"/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
    </div>
  )
}
