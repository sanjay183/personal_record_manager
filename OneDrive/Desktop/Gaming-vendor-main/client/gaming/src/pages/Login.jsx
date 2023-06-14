import React, { useState  } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

const Login = () => {
  const navigate = useNavigate();
  const fetchData = useFetch();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = e => {
    setFormData({
      ...formData, [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    const config = { url: `/auth/login`, method: "post", data: formData };
    fetchData(config).then((data) => {
      // localStorage.setItem('token', data.token);
      navigate("/");
    })
    .catch(error => {
      // Handle the error here, e.g., log the error or display an error message
      console.error('Error fetching tasks:', error);
    });
  }


  return (
    <div className='container shadow'>
      <div className='form-wrapper'>
        <form className='shadow p-5'>
          <h1 className='mb-5'>Login</h1>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input type="email"  className="form-control" name='email' value={formData.email} id="exampleInputEmail1" aria-describedby="emailHelp" autoComplete='off' autoFocus onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" name='password' value={formData.password} id="exampleInputPassword1" autoComplete='off' onChange={handleChange} />
          </div>
          <button type="submit" className="btn btn-primary btn-lg" onClick={handleSubmit} >Login</button>
        
          <div className='pt-4'>
              <Link to="/signup" className='text-blue-400'>Don't have an account? Signup here</Link>
          </div>

        </form>
      </div>
    </div >
  )
}

export default Login