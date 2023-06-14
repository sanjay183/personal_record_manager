import { useCallback } from "react"
import { toast } from "react-toastify";
import api from "../api";

const useFetch = () => {

  const fetchData = useCallback(async (config, otherOptions) => {

    const { showSuccessToast = true, showErrorToast = true } = otherOptions || {};
    console.log(otherOptions)
    
    try {
      const { data } = await api.request(config);
      if (showSuccessToast) toast.success(data.msg);
      return Promise.resolve(data);   
    }
    catch (error) {
      console.log(error);
      const msg = "404 error occured"
      if (showErrorToast) toast.error(msg);
      return Promise.reject(error);
    }
  }, []);

  return fetchData;
}

export default useFetch