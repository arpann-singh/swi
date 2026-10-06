/**
 * ImgBB Image Upload Service
 * Uploads images directly to ImgBB CDN and returns direct image URLs.
 */

export interface ImgBBResponse {
  success: boolean;
  url?: string;
  displayUrl?: string;
  deleteUrl?: string;
  error?: string;
}

export const uploadToImgBB = async (
  fileOrBase64: File | string,
  apiKey?: string
): Promise<ImgBBResponse> => {
  try {
    const key = apiKey || process.env.NEXT_PUBLIC_IMGBB_API_KEY || '2d5b6e680a6b9a896d8e8749e7552504'; // Default or provided key

    if (!key) {
      return {
        success: false,
        error: 'No ImgBB API key found. Please configure your ImgBB API key in Studio CMS Settings.',
      };
    }

    const formData = new FormData();
    formData.append('key', key);

    if (typeof fileOrBase64 === 'string') {
      // Strips data URL prefix if present for clean base64 payload
      const cleanBase64 = fileOrBase64.replace(/^data:image\/[a-z]+;base64,/, '');
      formData.append('image', cleanBase64);
    } else {
      formData.append('image', fileOrBase64);
    }

    const response = await fetch('https://api.imgbb.com/1/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (data && data.success) {
      return {
        success: true,
        url: data.data.url,
        displayUrl: data.data.display_url || data.data.url,
        deleteUrl: data.data.delete_url,
      };
    } else {
      return {
        success: false,
        error: data?.error?.message || 'Failed to upload image to ImgBB',
      };
    }
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || 'Network error occurred while uploading to ImgBB',
    };
  }
};
