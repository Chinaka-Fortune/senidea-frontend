const API_URL = process.env.REACT_APP_API_URL;

const ImageProxy = async (imageId) => {
  try {
    const response = await fetch(`${API_URL}/blog/image/${imageId}`, {
      method: 'GET',
      headers: {
        'bypass-tunnel-reminder': 'yes',
        'x-tunnel-password': '102.88.114.95'
      }
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch image ${imageId}: ${response.status} ${response.statusText}`);
    }
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.startsWith('image/')) {
      throw new Error(`Invalid image content type: ${contentType}`);
    }
    const blob = await response.blob();
    const base64 = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
    console.debug(`Image ${imageId} fetched successfully: ${base64.substring(0, 50)}...`);
    return base64;
  } catch (error) {
    console.error(`Error fetching image ${imageId}:`, error);
    return 'https://via.placeholder.com/150';
  }
};

export default ImageProxy;