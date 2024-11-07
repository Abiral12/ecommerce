import React from 'react'
import Dashboard from '../Dasshboard/Dashboard.jsx'

const LoginForm = () => {
  return (
    <div>
    <div className='container min-vh-100 d-flex justify-content-center align-items-center'>
        <form>
            <div className="mb-3">
                <label className="form-label">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" style={{width:"50vw"}}/>
            </div>
            <div className="mb-3">
                <label className="form-label">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" style={{width:"50vw"}} />
            </div>
            <button type="submit" className="btn btn-primary" onClick={<Dashboard/>}>Submit</button>
        </form>
    </div>
    </div>
  )
}

export default LoginForm