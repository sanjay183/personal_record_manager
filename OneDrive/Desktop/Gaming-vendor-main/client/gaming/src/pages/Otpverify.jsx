import React, { useState } from 'react'
import { Link, useNavigate} from 'react-router-dom';
import useFetch from '../hooks/useFetch';

const Otpverify = () => {
  const [formData, setFormData] = useState({
       otp : ""
  });

  const fetchData = useFetch();
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({
      ...formData, [e.target.name]: e.target.value
    });
  }

  // const handleNumericInputChange = (e) => {
  //   const value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
  //   setFormData({
  //     ...formData,
  //     otp: value
  //   });
  // };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const val = localStorage.getItem('userId');
    const config = { url: `/auth/otpverify`, method: "post", data: {formData} };
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
                <input type="number" className="form-control" name="otp" value={formData.otp} autoComplete='off' onChange={handleChange} autoFocus />         
                <button type="submit" className="btn btn-primary btn-lg" onClick={handleSubmit} >Verify</button>
          </form>
        </div>
      </div >
    </div>
  )
}

export default Otpverify