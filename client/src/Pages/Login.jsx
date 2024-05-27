import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios'

const Login = () => {
    const navigate = useNavigate()
    const authContext = useContext(AuthContext);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const handleForm = async (e) => {
        e.preventDefault()
        const response = await axios.post('http://localhost:3000/api/auth/login', { data: formData })
        if (response.data.message === 'User logged in successfully') {
            const { token, userId, isAdmin } = response.data.data;
            authContext.login(token, userId, isAdmin)
            if (isAdmin) {
                navigate('/admin-dashboard')
            } else {
                navigate('/')
            }
        }
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    }
    return (
        <div className="container">
            <div className="row">
                <h1>Login</h1>
                <form onSubmit={handleForm}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" value={formData.email} onChange={handleChange} />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" name="password" value={formData.password} onChange={handleChange} />
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                    </div>
                    <p className='text-muted'>New user? <Link to='/register'>Register here</Link></p>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Login