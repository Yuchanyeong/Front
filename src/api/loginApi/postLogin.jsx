import axios from 'axios';
const BASE_URL ='https://luckymozzi.store';


export const postLogin = async (id,password) => {
    console.log("전송 데이터",id,password);
    try {
        const response = await axios.post(`${BASE_URL}/auth/login/self`,{selfId:id , password:password},{
           
          }); 
          console.log(response.data);
            return response.data;
           
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        console.error('Error response:', status, data);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error setting up request:', error.message);
      }
      throw error;
    }
  };
  