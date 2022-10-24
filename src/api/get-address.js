import axios from "axios";

async function getAddressOfCoordinates(lat, lng) {
  const response = await axios.get(
    "https://api.opencagedata.com/geocode/v1/json? ",
    {
      params: {
        key: "", // ubaci svoj ključ sa opencagedata.com
        q: `${lat}+${lng}`,
        language: "en"
      }
    }
  );

  return response;
}

export default getAddressOfCoordinates;
