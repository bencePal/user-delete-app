import axios from "axios";

export const handleAxios = async (url: string, type: string, email: string): Promise<any> => {
  if (type === 'POST') {
    return await axios.post(url, {email});
  } else {
    return await axios.get(url);
  }
}