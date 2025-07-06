import ImageProxy from './ImageProxy';

const API_URL = process.env.REACT_APP_API_URL || 'https://senidea-backend-7w797pixb-fortune-chinakas-projects.vercel.app/api';
const PAYMENT_API_URL = process.env.REACT_APP_PAYMENT_API_URL || 'https://senidea-backend-7w797pixb-fortune-chinakas-projects.vercel.app/api';

const getAuthToken = () => {
  return localStorage.getItem('access_token');
};

export async function postRequest(endpoint, data, requiresAuth = false, isFormData = false) {
  try {
    const headers = isFormData
      ? { 'User-Agent': 'MyApp/1.0 (Custom API Client)', 'bypass-tunnel-reminder': 'true' }
      : { 'Content-Type': 'application/json', 'User-Agent': 'MyApp/1.0 (Custom API Client)', 'bypass-tunnel-reminder': 'true' };
    if (requiresAuth) {
      const token = getAuthToken();
      if (!token) throw new Error('No auth token found');
      headers['Authorization'] = `Bearer ${token}`;
    }

    const baseUrl = endpoint.includes('payment') || endpoint.includes('donation') ? PAYMENT_API_URL : API_URL;
    const body = isFormData ? data : JSON.stringify(data);

    console.debug(`POST ${baseUrl}/${endpoint} with headers:`, headers);
    const response = await fetch(`${baseUrl}/${endpoint}`, {
      method: 'POST',
      headers,
      body,
    });

    const result = await response.json();
    if (!response.ok) {
      console.error(`POST ${endpoint} response:`, result);
      throw new Error(result.error || `Request failed with status ${response.status}`);
    }
    return result;
  } catch (error) {
    console.error(`POST ${endpoint} error:`, error);
    throw error;
  }
}

export async function putRequest(endpoint, id, data, requiresAuth = true, isFormData = false) {
  try {
    const headers = isFormData
      ? { 'User-Agent': 'MyApp/1.0 (Custom API Client)', 'bypass-tunnel-reminder': 'true' }
      : { 'Content-Type': 'application/json', 'User-Agent': 'MyApp/1.0 (Custom API Client)', 'bypass-tunnel-reminder': 'true' };
    if (requiresAuth) {
      const token = getAuthToken();
      if (!token) throw new Error('No auth token found');
      headers['Authorization'] = `Bearer ${token}`;
    }

    const baseUrl = endpoint.includes('payment') || endpoint.includes('donation') ? PAYMENT_API_URL : API_URL;
    const body = isFormData ? data : JSON.stringify(data);

    console.debug(`PUT ${baseUrl}/${endpoint}/${id} with headers:`, headers);
    const response = await fetch(`${baseUrl}/${endpoint}/${id}`, {
      method: 'PUT',
      headers,
      body,
    });

    const result = await response.json();
    if (!response.ok) {
      console.error(`PUT ${endpoint}/${id} response:`, result);
      throw new Error(result.error || `Request failed with status ${response.status}`);
    }
    return result;
  } catch (error) {
    console.error(`PUT ${endpoint}/${id} error:`, error);
    throw error;
  }
}

export async function getRequest(endpoint, requiresAuth = false) {
  try {
    const headers = {
      'User-Agent': 'MyApp/1.0 (Custom API Client)',
      'bypass-tunnel-reminder': 'true',
    };
    if (requiresAuth) {
      const token = getAuthToken();
      if (!token) {
        console.error(`No auth token for ${endpoint}`);
        throw new Error('No auth token found');
      }
      headers['Authorization'] = `Bearer ${token}`;
    } else {
      console.debug(`No auth required for ${endpoint}`);
    }

    const baseUrl = endpoint.includes('payment') || endpoint.includes('donation') ? PAYMENT_API_URL : API_URL;
    const fullUrl = `${baseUrl}/${endpoint}`;
    console.debug(`GET ${fullUrl} with headers:`, headers);
    if (!fullUrl.startsWith('http')) {
      console.error(`Invalid URL: ${fullUrl}`);
      throw new Error('Invalid API URL');
    }
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      const contentType = response.headers.get('content-type');
      let errorText = `Request failed with status ${response.status}`;
      const responseBody = await response.text();
      console.error(`Response headers for ${endpoint}:`, Object.fromEntries(response.headers));
      console.error(`Response body for ${endpoint}:`, responseBody);
      if (contentType && contentType.includes('application/json')) {
        const result = JSON.parse(responseBody);
        errorText = result.error || errorText;
      } else {
        errorText = `Non-JSON response: ${responseBody}`;
      }
      console.error(`GET ${fullUrl} failed: ${response.status}, ${errorText}`);
      throw new Error(errorText);
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const result = await response.json();
      console.debug(`GET ${fullUrl} raw response:`, result);
      
      if (endpoint === 'newsletter') {
        return { subscriptions: result.subscriptions || [] };
      } else if (endpoint === 'partnership/submissions') {
        return { partnerships: result.partnerships || [] };
      } else if (endpoint === 'donation') {
        return result || [];
      } else if (endpoint === 'contact') {
        return { contacts: result.contacts || [] };
      }
      return result;
    } else {
      throw new Error('Unexpected non-JSON response');
    }
  } catch (error) {
    console.error(`GET ${endpoint} error:`, {
      message: error.message,
      stack: error.stack,
      name: error.name,
    });
    throw error;
  }
}

export async function getByIdRequest(endpoint, id, requiresAuth = false) {
  try {
    const headers = {
      'User-Agent': 'MyApp/1.0 (Custom API Client)',
      'bypass-tunnel-reminder': 'true',
    };
    if (requiresAuth) {
      const token = getAuthToken();
      if (!token) throw new Error('No auth token found');
      headers['Authorization'] = `Bearer ${token}`;
    }

    const baseUrl = endpoint.includes('payment') || endpoint.includes('donation') ? PAYMENT_API_URL : API_URL;
    const fullUrl = `${baseUrl}/${endpoint}/${id}`;
    console.debug(`GET ${fullUrl} with headers:`, headers);
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers,
    });

    const result = await response.json();
    if (!response.ok) {
      console.error(`GET ${endpoint}/${id} response:`, result);
      throw new Error(result.error || `Request failed with status ${response.status}`);
    }
    return result;
  } catch (error) {
    console.error(`GET ${endpoint}/${id} error:`, error);
    throw error;
  }
}

export async function deleteRequest(endpoint, id, requiresAuth = true) {
  try {
    const headers = {
      'User-Agent': 'MyApp/1.0 (Custom API Client)',
      'bypass-tunnel-reminder': 'true',
    };
    if (requiresAuth) {
      const token = getAuthToken();
      if (!token) throw new Error('No auth token found');
      headers['Authorization'] = `Bearer ${token}`;
    }

    const baseUrl = endpoint.includes('payment') || endpoint.includes('donation') ? PAYMENT_API_URL : API_URL;
    const fullUrl = `${baseUrl}/${endpoint}/${id}`;
    console.debug(`DELETE ${fullUrl} with headers:`, headers);
    const response = await fetch(fullUrl, {
      method: 'DELETE',
      headers,
    });

    const result = await response.json();
    if (!response.ok) {
      console.error(`DELETE ${endpoint}/${id} response:`, result);
      throw new Error(result.error || `Request failed with status ${response.status}`);
    }
    return result;
  } catch (error) {
    console.error(`DELETE ${endpoint}/${id} error:`, error);
    throw error;
  }
}

export async function getUserProfile() {
  return getRequest('auth/validate', true);
}

export async function createBlogPost(data) {
  const formData = new FormData();
  formData.append('title', data.title);
  formData.append('content', data.content);
  formData.append('category', data.category);
  if (data.image) {
    console.debug('Image details:', {
      name: data.image.name,
      size: data.image.size,
      type: data.image.type
    });
    formData.append('image', data.image);
  }
  console.debug('Creating blog post with FormData:', {
    title: data.title,
    content: data.content,
    category: data.category,
    image: data.image ? data.image.name : null,
  });
  const result = await postRequest('blog', formData, true, true);
  localStorage.removeItem('blogPosts');
  localStorage.removeItem('blogPostsTimestamp');
  localStorage.removeItem('blogPostsTotal');
  localStorage.removeItem('blogPostsPage');
  return result;
}

export async function updateBlogPost(id, data) {
  const formData = new FormData();
  formData.append('title', data.title);
  formData.append('content', data.content);
  formData.append('category', data.category);
  if (data.image) {
    formData.append('image', data.image);
  }
  console.debug('Updating blog post with FormData:', {
    id,
    title: data.title,
    content: data.content,
    category: data.category,
    image: data.image ? data.image.name : null,
  });
  const result = await putRequest('blog', id, formData, true, true);
  localStorage.removeItem('blogPosts');
  localStorage.removeItem('blogPostsTimestamp');
  localStorage.removeItem('blogPostsTotal');
  localStorage.removeItem('blogPostsPage');
  return result;
}

export async function getBlogPosts(endpoint = 'blog?limit=3') {
  console.debug(`Calling getBlogPosts with endpoint: ${endpoint}`);
  return getRequest(endpoint, false);
}

export async function getBlogPostById(id) {
  return getByIdRequest('blog', id, false);
}

export async function deleteBlogPost(id) {
  const result = await deleteRequest('blog', id, true);
  localStorage.removeItem('blogPosts');
  localStorage.removeItem('blogPostsTimestamp');
  localStorage.removeItem('blogPostsTotal');
  localStorage.removeItem('blogPostsPage');
  return result;
}

export async function getComments(postId) {
  return getRequest(`blog/${postId}/comments`, false);
}

export async function addComment(postId, username, content) {
  const result = await postRequest(`blog/${postId}/comments`, { username, content }, false);
  localStorage.removeItem('blogPosts');
  localStorage.removeItem('blogPostsTimestamp');
  localStorage.removeItem('blogPostsTotal');
  localStorage.removeItem('blogPostsPage');
  return result;
}

export async function toggleLike(postId) {
  const result = await postRequest(`blog/${postId}/like`, {}, false);
  localStorage.removeItem('blogPosts');
  localStorage.removeItem('blogPostsTimestamp');
  localStorage.removeItem('blogPostsTotal');
  localStorage.removeItem('blogPostsPage');
  return result;
}

export async function getLikes(postId) {
  return getRequest(`blog/${postId}/likes`, false);
}

export async function loginUser(credentials) {
  return postRequest('auth/login', credentials, false);
}

export async function registerUser(data) {
  return postRequest('auth/register', data, false);
}

export async function validateToken() {
  return getRequest('auth/validate', true);
}

export async function getDonations() {
  const response = await getRequest('donation', true);
  console.log('Donations response:', response);
  return response || [];
}

export async function deleteDonation(id) {
  return deleteRequest('donation', id, true);
}

export async function getPartners() {
  try {
    const response = await getRequest('partnership/submissions', true);
    console.log('Partners response:', response);
    return { partnerships: response.partnerships || [] };
  } catch (error) {
    console.error('getPartners error:', {
      message: error.message,
      stack: error.stack,
      name: error.name,
    });
    throw error;
  }
}

export async function deletePartner(id) {
  return deleteRequest('partnership', id, true);
}

export async function getVolunteers() {
  const response = await getRequest('volunteer', true);
  console.log('Volunteers response:', response);
  return response || [];
}

export async function deleteVolunteer(id) {
  return deleteRequest('volunteer', id, true);
}

export async function getNewsletterSubscriptions() {
  try {
    const response = await getRequest('newsletter', true);
    console.log('Newsletter subscriptions response:', response);
    return response;
  } catch (error) {
    console.error('getNewsletterSubscriptions error:', {
      message: error.message,
      stack: error.stack,
      name: error.name,
    });
    throw error;
  }
}

export async function deleteNewsletterSubscription(id) {
  const result = await deleteRequest('newsletter', id, true);
  return result;
}

export async function createImpactPost(data) {
  const formData = new FormData();
  formData.append('title', data.title);
  formData.append('body', data.body);
  formData.append('category', 'impacts');
  if (data.image) {
    formData.append('image', data.image);
  }
  console.debug('Creating impact post with FormData:', {
    title: data.title,
    body: data.body,
    category: 'impacts',
    image: data.image ? data.image.name : null,
  });
  return postRequest('content', formData, true, true);
}

export async function getImpactPosts() {
  const response = await getRequest('content/impacts', true);
  console.log('Impact posts response:', response);
  return response.posts || [];
}

export async function getImage(endpoint) {
  try {
    const fullUrl = `${API_URL}/${endpoint}`;
    console.debug(`GET ${fullUrl} for image with headers:`, {
      'User-Agent': 'MyApp/1.0 (Custom API Client)',
      'bypass-tunnel-reminder': 'true',
    });
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'MyApp/1.0 (Custom API Client)',
        'bypass-tunnel-reminder': 'true',
      },
    });
    if (!response.ok) {
      console.error(`GET ${endpoint} response status:`, response.status);
      throw new Error(`Image request failed: ${response.status}`);
    }
    return URL.createObjectURL(await response.blob());
  } catch (error) {
    console.error(`GET ${endpoint} image error:`, error);
    throw error;
  }
}

export async function getContactMessages() {
  console.debug("Calling getContactMessages");
  return getRequest('contact', true);
}

export async function deleteContactMessage(id) {
  const result = await deleteRequest('contact', id, true);
  localStorage.removeItem('contactMessages');
  localStorage.removeItem('contactMessagesTimestamp');
  return result;
}

let preloaded = false;
async function preloadBlogData() {
  if (preloaded) {
    console.debug("Blog data already preloaded");
    return;
  }
  try {
    console.debug("Preloading blog posts");
    const cachedPosts = localStorage.getItem('blogPosts');
    const cachedTotal = localStorage.getItem('blogPostsTotal');
    const cachedPage = localStorage.getItem('blogPostsPage');

    if (cachedPosts && cachedTotal && cachedPage && parseInt(cachedPage) === 1) {
      console.debug("Blog posts already cached");
      preloaded = true;
      return;
    }

    const response = await getBlogPosts();
    console.log("Preload API Response:", response);
    const postsWithImages = await Promise.all(
      response.posts.map(async (post) => {
        const imageUrl = post.image_path
          ? await ImageProxy(post.id)
          : 'https://via.placeholder.com/150';
        console.log(`Post ${post.id} image_url:`, imageUrl);
        return { ...post, imageUrl };
      })
    );

    localStorage.setItem('blogPosts', JSON.stringify(postsWithImages));
    localStorage.setItem('blogPostsTimestamp', Date.now().toString());
    localStorage.setItem('blogPostsTotal', response.total.toString());
    localStorage.setItem('blogPostsPage', '1');
    preloaded = true;
  } catch (err) {
    console.error("Error preloading blog posts:", err);
  }
}

preloadBlogData();