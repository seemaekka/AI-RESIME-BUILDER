import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllTemplates } from './templateConfig';
import './Templates.css';

const Templates = () => {
  const navigate = useNavigate();
  const templates = getAllTemplates();

  const handleUseTemplate = (templateId) => {
    // Navigate to resume builder with selected template
    navigate('/builder', { state: { selectedTemplate: templateId } });
  };

  return (
    <div className="templates-container">
      <div className="templates-header">
        <h1 className="templates-title">
          <span className="templates-icon">🎨</span>
          Choose Your Resume Template
        </h1>
        <p className="templates-subtitle">
          Select from our collection of professionally designed templates to create your perfect resume
        </p>
      </div>

      <div className="templates-grid">
        {templates.map((template) => (
          <div key={template.id} className="template-card" style={{ '--template-color': template.color }}>
            <div className="template-preview">
              <div className="template-thumbnail" style={{ backgroundColor: template.color }}>
                <span className="template-preview-icon">{template.preview}</span>
              </div>
              <div className="template-category">{template.category}</div>
            </div>
            
            <div className="template-content">
              <h3 className="template-name">{template.name}</h3>
              <p className="template-description">{template.description}</p>
              <p className="template-focus">
                <strong>Focus:</strong> {template.focus}
              </p>
              
              <div className="template-features">
                {template.features.map((feature, index) => (
                  <span key={index} className="feature-tag">
                    {feature}
                  </span>
                ))}
              </div>
            </div>
            
            <button 
              className="use-template-btn"
              onClick={() => handleUseTemplate(template.id)}
            >
              <span className="btn-icon">✨</span>
              Use This Template
            </button>
          </div>
        ))}
      </div>

      <div className="templates-footer">
        <p className="templates-footer-text">
          Can't find the perfect template?{' '}
          <button 
            className="custom-template-link"
            onClick={() => navigate('/builder')}
          >
            Start with a blank canvas
          </button>
        </p>
      </div>
    </div>
  );
};

export default Templates; 