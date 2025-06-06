import axios from "axios";

export const fetchNotifications = async (userId: string) => {
  const response = await axios.get(`http://localhost:5000/api/notifications/${userId}`);
  return response.data; // list of notifications
};
