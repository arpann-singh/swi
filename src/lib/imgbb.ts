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
  fileOrBase64: File | Blob | string,
  apiKey?: string
): Promise<ImgBBResponse> => {
  try {
    const key = apiKey || process.env.NEXT_PUBLIC_IMGBB_API_KEY || '07afc547f88e09e5ced81621fd89ddea';

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
    } else if (fileOrBase64 instanceof File) {
      formData.append('image', fileOrBase64);
    } else {
      formData.append('image', fileOrBase64, 'upload.jpg');
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

/**
 * Syncs any image (local URL, relative path, or Base64 data URL) to ImgBB CDN.
 * If the image is already hosted on ImgBB CDN (e.g. ibb.co), returns original URL.
 */
export const syncImageToImgBB = async (
  imageUrl: string,
  apiKey?: string
): Promise<{ url: string; uploaded: boolean; error?: string }> => {
  if (!imageUrl || imageUrl.trim() === '') {
    return { url: '', uploaded: false };
  }

  // Already hosted on ImgBB CDN
  if (imageUrl.includes('ibb.co') || imageUrl.includes('imgbb.com')) {
    return { url: imageUrl, uploaded: false };
  }

  try {
    // If it's a Base64 Data URL
    if (imageUrl.startsWith('data:image/')) {
      const res = await uploadToImgBB(imageUrl, apiKey);
      if (res.success && (res.displayUrl || res.url)) {
        return { url: res.displayUrl || res.url || imageUrl, uploaded: true };
      }
      return { url: imageUrl, uploaded: false, error: res.error };
    }

    // If it's a relative URL or accessible image URL, fetch as blob in browser
    if (typeof window !== 'undefined') {
      const response = await fetch(imageUrl);
      if (!response.ok) {
        return { url: imageUrl, uploaded: false, error: `Failed to fetch image: ${response.statusText}` };
      }
      const blob = await response.blob();
      const res = await uploadToImgBB(blob, apiKey);
      if (res.success && (res.displayUrl || res.url)) {
        return { url: res.displayUrl || res.url || imageUrl, uploaded: true };
      }
      return { url: imageUrl, uploaded: false, error: res.error };
    }

    return { url: imageUrl, uploaded: false };
  } catch (err: any) {
    console.warn('Error syncing image to ImgBB:', err);
    return { url: imageUrl, uploaded: false, error: err?.message };
  }
};

