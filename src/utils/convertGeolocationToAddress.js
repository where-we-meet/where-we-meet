import { convertToAddress } from '@/apis/getAddressFromGeolocation';

async function convertGeolocationToAddress(location) {
  if (location === null) return;
  const { lng, lat } = location;
  const address = await convertToAddress.get('', {
    params: {
      x: lng,
      y: lat
    }
  });
  return address.data.documents;
}

export default convertGeolocationToAddress;
