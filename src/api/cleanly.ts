import { request } from './instance';

export default class Cleanly {
  static async createIcons({ image }: { image: File | string }) {
    let file: File;
    if (typeof image === 'string') {
      file = new File([], 'dummy.jpg', { type: 'image/png' });
    } else {
      file = image;
    }
    
    const formData = new FormData();
    formData.append('file', file); // Use 'file' as the key for FormData
  
    try {
      const response = await request({
        method: 'post',
        url: "v1/cleanly", // Adjust the URL based on your API endpoint
        data: formData
      });

      console.log("Response from upload image API:", response.data.data.uri); // Log the response

      // Check if the response contains the URL of the uploaded image
      if (response.data && response.data.data.uri) {
        return response.data; // Use 'uri' property for the image URL
      } else {
        throw new Error("Image URL not found in response");
      }
    } catch (error) {
      throw error;
    }
}

  static addService(payload: {
    name?: string;
    category?: string;
    amount?: string;
    icon?: string;
  }) {
    return request({
      url: "v1/cleanly/add-service",
      method: "post",
      data: payload
    });
  }
}
