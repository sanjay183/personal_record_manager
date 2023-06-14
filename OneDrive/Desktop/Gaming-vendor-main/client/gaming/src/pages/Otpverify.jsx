import React, { useState } from 'react'
import { Link, useNavigate} from 'react-router-dom';
import useFetch from '../hooks/useFetch';

const Otpverify = () => {
  const [formData, setFormData] = useState({
       otp :" "
  });

  const fetchData = useFetch();
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({
      ...formData, [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    const val = localStorage.getItem('userId');
    const config = { url: `/auth/otpverify`, method: "post", data: {formData,val} };
    fetchData(config).then(() => {
      navigate("/login");
    })
    .catch(error => {
      // Handle the error here, e.g., log the error or display an error message
      console.error('Error fetching tasks:', error);
    });


  }


  return (
    <div>
      <div className='container shadow'>
        <div className='form-wrapper'>
          <form className='shadow p-5'>
            <h1 className='mb-5'>Otpverify </h1>
                <label>Otp</label>
                <input type='text' value={formData.otp} autoComplete='off' onChange={handleChange} />         
                <button type="submit" className="btn btn-primary btn-lg" onClick={handleSubmit} >Login</button>
          </form>
        </div>
      </div >
    </div>
  )
}

export default Otpverify