import axios from "axios";

export const getChargesData = async (lat, lng) => {
  try {
    const { data } = await axios.get("https://api.openchargemap.io/v3/poi", {
      params: {
        latitude: Number(lat),
        longitude: Number(lng),
        key: process.env.REACT_APP_CHARGES_API_KEY,
      },
      headers: { "Content-Type": "application/json" },
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};
