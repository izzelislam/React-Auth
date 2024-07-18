import React, { useState } from 'react'
import api from '../../services/api';

export default function register() {

  const [name, seName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [validation, setValidation] = useState(null);

  const [alert , setAlert] = useState(null);


  const handleSubmit = async (e) => {
    e.preventDefault()

    console.log(name, email, password)
    try {
      const res = await api.post('/api/register', {
        name: name,
        email: email,
        password: password
      })

      setAlert("berhasil mendaftar")
      setTimeout(() => {
        setAlert(null)
      }, 1500);

    } catch (error) {
      setValidation(error.response.data)
    }
  }

  return (
    <div className='row'>
      <div className='col-6 m-auto bg-white p-4 rounded'>
        
        {
          alert &&
          <div class="alert alert-success" role="alert">
            A simple danger alert—check it out!
          </div>
        }
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

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Nama</label>
            <input type="text" value={name} onChange={e => seName(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label  htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="form-control" id="exampleInputPassword1"/>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  )
}
