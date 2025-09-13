import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getTemplateConfig } from './templateConfig';
import apiService from '../services/api';
import './ResumeForm.css';

const ResumeForm = ({ onGenerate, isGenerating }) => {
  const location = useLocation();
  const selectedTemplate = location.state?.selectedTemplate || 'modernProfessional';
  const templateConfig = getTemplateConfig(selectedTemplate);
  
  // Initialize form data based on template fields
  const initializeFormData = () => {
    const initialData = {
      photo: null,
      templateId: selectedTemplate
    };
    
    // Add all template fields with empty values
    Object.keys(templateConfig.fields).forEach(fieldKey => {
      initialData[fieldKey] = '';
    });
    
    return initialData;
  };

  const [formData, setFormData] = useState(initializeFormData);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  // Update form data when template changes
  useEffect(() => {
    setFormData(initializeFormData());
  }, [selectedTemplate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file (JPG, PNG, GIF, etc.)');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB. Please choose a smaller image.');
        return;
      }

      // Validate image dimensions (optional)
      const img = new Image();
      img.onload = () => {
        if (img.width < 100 || img.height < 100) {
          alert('Image should be at least 100x100 pixels for better quality.');
        }
      };
      img.src = URL.createObjectURL(file);

      setFormData(prev => ({
        ...prev,
        photo: file
      }));

      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e.target.result);
      };
      reader.onerror = () => {
        alert('Error reading the image file. Please try again.');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setFormData(prev => ({
      ...prev,
      photo: null
    }));
    setPhotoPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    
    try {
      // Validate required fields based on template
      const requiredFields = Object.entries(templateConfig.fields)
        .filter(([key, config]) => config.required)
        .map(([key, config]) => ({ key, label: config.label }));

      for (const field of requiredFields) {
        if (!formData[field.key]?.trim()) {
          throw new Error(`Please enter your ${field.label.toLowerCase()}`);
        }
      }

      // Prepare data for API - map frontend fields to backend fields
      const apiData = {
        name: formData.fullName || formData.name || 'Untitled Resume',
        skills: formData.keySkills || formData.skillsList || formData.skills || '',
        experience: formData.workExperience || formData.experience || '',
        projects: formData.topProjects || formData.projects || '',
        bio: formData.profileSummary || formData.personalBio || formData.executiveSummary || formData.summary || formData.bio || 'Professional summary',
        photo: formData.photo
      };

      // Create resume via API
      const createdResume = await apiService.createResume(apiData);
      
      // Call the onGenerate callback with the created resume data
      onGenerate({
        ...formData,
        id: createdResume.id,
        photo_url: createdResume.photo_url,
        created_at: createdResume.created_at,
        updated_at: createdResume.updated_at
      });

    } catch (error) {
      console.error('Error creating resume:', error);
      setError(error.message || 'Failed to create resume. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderField = (fieldKey, fieldConfig) => {
    const { label, type, required } = fieldConfig;
    
    if (type === 'textarea') {
      return (
        <textarea
          key={fieldKey}
          name={fieldKey}
          placeholder={`${label}${required ? ' *' : ''}`}
          value={formData[fieldKey] || ''}
          onChange={handleInputChange}
          className="form-textarea"
          rows={4}
          required={required}
        />
      );
    } else {
      return (
        <input
          key={fieldKey}
          type="text"
          name={fieldKey}
          placeholder={`${label}${required ? ' *' : ''}`}
          value={formData[fieldKey] || ''}
          onChange={handleInputChange}
          className="form-input"
          required={required}
        />
      );
    }
  };

  return (
    <div className="resume-form-container dreamy-slide-up" data-template={selectedTemplate}>
      <form className="resume-form" onSubmit={handleSubmit}>
        <div className="template-info">
          <h2 className="form-title">Create Your {templateConfig.name} Resume</h2>
          <p className="template-description">{templateConfig.description}</p>
          <p className="template-focus"><strong>Focus:</strong> {templateConfig.focus}</p>
        </div>
        
        {/* Error Display */}
        {error && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            {error}
          </div>
        )}
        
        {/* Photo Upload Section - Only for templates that support it */}
        {selectedTemplate !== 'minimalist' && (
          <div className="photo-upload-section">
            <label className="photo-label" htmlFor="photo-upload">
              <span className="photo-icon">📷</span>
              {photoPreview ? 'Change Photo' : 'Add Your Photo'}
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="photo-input"
              id="photo-upload"
            />
            {photoPreview && (
              <div className="photo-preview">
                <img src={photoPreview} alt="Preview" />
                <button 
                  type="button" 
                  onClick={handleRemovePhoto}
                  className="remove-photo-btn"
                  title="Remove photo"
                >
                  ✕
                </button>
              </div>
            )}
            {!photoPreview && (
              <p className="photo-hint">
                Click to upload a professional photo (JPG, PNG, max 5MB)
              </p>
            )}
          </div>
        )}

        {/* Dynamic Fields Based on Template */}
        <div className="form-sections">
          {Object.entries(templateConfig.fields).map(([fieldKey, fieldConfig]) => (
            <div key={fieldKey} className="form-section">
              <h3 className="section-title">{fieldConfig.label}</h3>
              {renderField(fieldKey, fieldConfig)}
            </div>
          ))}
        </div>

        {/* Generate Button */}
        <button 
          type="submit" 
          className={`generate-btn glow ${isSubmitting || isGenerating ? 'generating' : ''}`}
          disabled={isSubmitting || isGenerating}
        >
          {isSubmitting || isGenerating ? (
            <>
              <span className="loading-spinner"></span>
              {isSubmitting ? 'Creating Resume...' : `Generating Your ${templateConfig.name} Resume...`}
            </>
          ) : (
            <>
              <span className="btn-icon">✨</span>
              Generate {templateConfig.name} Resume
              <span className="btn-icon">✨</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ResumeForm;