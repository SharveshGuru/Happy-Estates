import axiosInstance from "./AxiosService";

async function ProfileService(username) {
  try {
    const response = await axiosInstance.get(`/user/${username}`);
    console.log(response);
    return response.data;
  } catch (error) {
    window.alert("Something went wrong");
  }
}

export default ProfileService;
