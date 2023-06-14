import React,{useCallback,useState,useEffect} from 'react'
import useFetch from '../hooks/useFetch';

const Home = () => {

  const [user,setUser] = useState();
  const fetchData = useFetch();

  const fetchUser = useCallback(() => {
    const token = localStorage.getItem('token')
    const config = { url: "/profile", method: "get", headers: { Authorization: token } };
    fetchData(config, { showSuccessToast: false }).then(data => setUser(data.user));
  }, [fetchData]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);
  
  return (
    <div>
      <h1>Homepage</h1>
      {user && <h2>Welcome {user.lastName}</h2>}
    </div>
  )
}

export default Home