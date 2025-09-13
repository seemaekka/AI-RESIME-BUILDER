const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Resume endpoints
  async getResumes() {
    return this.request('/resumes/');
  }

  async getResume(id) {
    return this.request(`/resumes/${id}/`);
  }

  async createResume(data) {
    const formData = new FormData();
    
    // Add all text fields
    Object.keys(data).forEach(key => {
      if (key !== 'photo' && data[key] !== null && data[key] !== undefined) {
        formData.append(key, data[key]);
      }
    });
    
    // Add photo if present
    if (data.photo && data.photo instanceof File) {
      formData.append('photo', data.photo);
    }

    const url = `${this.baseURL}/resumes/`;
    const config = {
      method: 'POST',
      body: formData,
      headers: {
        // Don't set Content-Type for FormData, let browser set it
      },
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  async updateResume(id, data) {
    const formData = new FormData();
    
    // Add all text fields
    Object.keys(data).forEach(key => {
      if (key !== 'photo' && data[key] !== null && data[key] !== undefined) {
        formData.append(key, data[key]);
      }
    });
    
    // Add photo if present
    if (data.photo && data.photo instanceof File) {
      formData.append('photo', data.photo);
    }

    const url = `${this.baseURL}/resumes/${id}/`;
    const config = {
      method: 'PUT',
      body: formData,
      headers: {
        // Don't set Content-Type for FormData, let browser set it
      },
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  async deleteResume(id) {
    return this.request(`/resumes/${id}/`, { method: 'DELETE' });
  }

  async rateResume(id, rating) {
    return this.request(`/resumes/${id}/rate_resume/`, {
      method: 'POST',
      body: JSON.stringify({ rating }),
    });
  }

  async getTemplates() {
    return this.request('/resumes/templates/');
  }
}

export default new ApiService();

