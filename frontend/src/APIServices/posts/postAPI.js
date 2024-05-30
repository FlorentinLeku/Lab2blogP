import axios from "axios";

const BASE_URL = "";

export const createPostAPI = async (postData) =>{
    console.log(postData);
const response = await axios.post(BASE_URL, {
    title: postData.title,
    description: postData.description,
});
return response.data;
};