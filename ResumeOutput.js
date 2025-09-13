import React, { useState } from 'react';
import { getTemplateConfig } from './templateConfig';
import './ResumeOutput.css';

const ResumeOutput = ({ data, theme }) => {
  const [isExporting, setIsExporting] = useState(false);
  const templateConfig = getTemplateConfig(data.templateId || 'modernProfessional');

  const handleExportPDF = async () => {
    setIsExporting(true);
    
    try {
      // Import jsPDF dynamically to avoid SSR issues
      const { jsPDF } = await import('jspdf');
      const doc = new jsPDF();
      
      // Set font
      doc.setFont('helvetica');
      doc.setFontSize(24);
      
      // Add title
      doc.text('RESUME', 105, 20, { align: 'center' });
      
      // Add photo if available and template supports it
      if (data.photo || data.photo_url) {
        try {
          let imageData;
          if (data.photo instanceof File) {
            // Convert File to base64
            const reader = new FileReader();
            imageData = await new Promise((resolve, reject) => {
              reader.onload = () => resolve(reader.result);
              reader.onerror = reject;
              reader.readAsDataURL(data.photo);
            });
          } else if (typeof data.photo === 'string') {
            imageData = data.photo;
          } else if (data.photo_url) {
            imageData = `http://localhost:8000${data.photo_url}`;
          }
          
          if (imageData) {
            // Determine image format from data URL
            let format = 'JPEG';
            if (imageData.startsWith('data:image/png')) {
              format = 'PNG';
            } else if (imageData.startsWith('data:image/jpeg') || imageData.startsWith('data:image/jpg')) {
              format = 'JPEG';
            } else if (imageData.startsWith('data:image/gif')) {
              format = 'GIF';
            }
            
            // Add photo to PDF (positioned on the right side, top)
            doc.addImage(imageData, format, 150, 25, 35, 35, undefined, 'FAST');
          }
        } catch (imageError) {
          console.warn('Could not add image to PDF:', imageError);
        }
      }
      
      // Add name (adjusted position based on photo presence)
      doc.setFontSize(18);
      const nameY = (data.photo || data.photo_url) ? 35 : 35;
      const nameField = data.fullName || data.name;
      doc.text(nameField, 105, nameY, { align: 'center' });
      
      // Add content based on template
      let yPos = (data.photo || data.photo_url) ? 75 : 65;
      
      // Add template-specific content
      Object.entries(templateConfig.fields).forEach(([fieldKey, fieldConfig]) => {
        if (data[fieldKey] && fieldKey !== 'fullName' && fieldKey !== 'name') {
          doc.setFontSize(14);
          doc.text(fieldConfig.label, 20, yPos);
          doc.setFontSize(11);
          const contentWidth = (data.photo || data.photo_url) ? 120 : 170;
          const contentLines = doc.splitTextToSize(data[fieldKey], contentWidth);
          doc.text(contentLines, 20, yPos + 10);
          yPos += 10 + (contentLines.length * 5) + 15;
        }
      });
      
      // Save the PDF
      const fileName = `${nameField.replace(/\s+/g, '_')}_${templateConfig.name.replace(/\s+/g, '_')}_Resume.pdf`;
      doc.save(fileName);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const formatSkills = (skills) => {
    if (!skills) return [];
    return skills.split(',').map(skill => skill.trim()).filter(skill => skill);
  };

  const renderModernProfessional = () => (
    <div className="resume-card modern-professional" id="resume-output">
      <div className="resume-header">
        <div className="resume-photo-section">
          {data.photo || data.photo_url ? (
            <div className="resume-photo">
              <img 
                src={
                  data.photo instanceof File 
                    ? URL.createObjectURL(data.photo) 
                    : data.photo_url 
                    ? `http://localhost:8000${data.photo_url}`
                    : typeof data.photo === 'string' 
                    ? data.photo 
                    : null
                } 
                alt={data.fullName || data.name}
                onError={(e) => {
                  console.error('Error loading image:', e);
                  e.target.style.display = 'none';
                }}
              />
            </div>
          ) : (
            <div className="resume-photo-placeholder">
              <span className="placeholder-icon">👤</span>
            </div>
          )}
        </div>
        <div className="resume-title-section">
          <h1 className="resume-name">{data.fullName}</h1>
          <h2 className="resume-title">{data.professionalTitle}</h2>
        </div>
      </div>

      <div className="resume-content">
        {/* New Personal Information Section */}
        <div className="resume-section personal-info-section">
          <h2 className="section-heading">
            <span className="section-icon">📋</span>
            Personal Information
          </h2>
          <div className="personal-info-grid">
            {data.phoneNumber && (
              <div className="info-item">
                <span className="info-label">📞 Phone:</span>
                <span className="info-value">{data.phoneNumber}</span>
              </div>
            )}
            {data.address && (
              <div className="info-item">
                <span className="info-label">📍 Address:</span>
                <span className="info-value">{data.address}</span>
              </div>
            )}
            {data.dateOfBirth && (
              <div className="info-item">
                <span className="info-label">🎂 Date of Birth:</span>
                <span className="info-value">{data.dateOfBirth}</span>
              </div>
            )}
            {data.linkedinUrl && (
              <div className="info-item">
                <span className="info-label">💼 LinkedIn:</span>
                <span className="info-value">
                  <a href={data.linkedinUrl} target="_blank" rel="noopener noreferrer" className="social-link">
                    {data.linkedinUrl}
                  </a>
                </span>
              </div>
            )}
            {data.githubUrl && (
              <div className="info-item">
                <span className="info-label">🐙 GitHub:</span>
                <span className="info-value">
                  <a href={data.githubUrl} target="_blank" rel="noopener noreferrer" className="social-link">
                    {data.githubUrl}
                  </a>
                </span>
              </div>
            )}
          </div>
        </div>

        {data.profileSummary && (
          <div className="resume-section">
            <h2 className="section-heading">
              <span className="section-icon">✨</span>
              Profile Summary
            </h2>
            <p className="section-content">{data.profileSummary}</p>
          </div>
        )}

        {data.keySkills && (
          <div className="resume-section">
            <h2 className="section-heading">
              <span className="section-icon">🛠️</span>
              Key Skills
            </h2>
            <div className="skills-container">
              {formatSkills(data.keySkills).map((skill, index) => (
                <span key={index} className="skill-tag">{skill}</span>
              ))}
            </div>
          </div>
        )}

        {data.workExperience && (
          <div className="resume-section">
            <h2 className="section-heading">
              <span className="section-icon">💼</span>
              Work Experience
            </h2>
            <div className="section-content">
              {data.workExperience.split('\n').map((line, index) => (
                <p key={index} className="experience-line">{line}</p>
              ))}
            </div>
          </div>
        )}

        {data.education && (
          <div className="resume-section">
            <h2 className="section-heading">
              <span className="section-icon">🎓</span>
              Education
            </h2>
            <div className="section-content">
              {data.education.split('\n').map((line, index) => (
                <p key={index} className="education-line">{line}</p>
              ))}
            </div>
          </div>
        )}

        {data.certifications && (
          <div className="resume-section">
            <h2 className="section-heading">
              <span className="section-icon">🏆</span>
              Certifications
            </h2>
            <div className="section-content">
              {data.certifications.split('\n').map((line, index) => (
                <p key={index} className="certification-line">{line}</p>
              ))}
            </div>
          </div>
        )}

        {data.languages && (
          <div className="resume-section">
            <h2 className="section-heading">
              <span className="section-icon">🌍</span>
              Languages
            </h2>
            <div className="section-content">
              {data.languages.split('\n').map((line, index) => (
                <p key={index} className="language-line">{line}</p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderCreativePortfolio = () => (
    <div className="resume-card creative-portfolio" id="resume-output">
      <div className="resume-header creative-header">
        <div className="resume-photo-section">
          {data.photo ? (
            <div className="resume-photo">
              <img 
                src={data.photo instanceof File ? URL.createObjectURL(data.photo) : (typeof data.photo === 'string' ? data.photo : null)} 
                alt={data.fullName}
                onError={(e) => {
                  console.error('Error loading image:', e);
                  e.target.style.display = 'none';
                }}
              />
            </div>
          ) : (
            <div className="resume-photo-placeholder">
              <span className="placeholder-icon">🎨</span>
            </div>
          )}
        </div>
        <div className="resume-title-section">
          <h1 className="resume-name">{data.fullName}</h1>
          <h2 className="resume-title">{data.creativeTitle}</h2>
        </div>
      </div>

      <div className="resume-content">
        {/* New Personal Information Section */}
        <div className="resume-section personal-info-section">
          <h2 className="section-heading">
            <span className="section-icon">📋</span>
            Personal Information
          </h2>
          <div className="personal-info-grid">
            {data.phoneNumber && (
              <div className="info-item">
                <span className="info-label">📞 Phone:</span>
                <span className="info-value">{data.phoneNumber}</span>
              </div>
            )}
            {data.address && (
              <div className="info-item">
                <span className="info-label">📍 Address:</span>
                <span className="info-value">{data.address}</span>
              </div>
            )}
            {data.dateOfBirth && (
              <div className="info-item">
                <span className="info-label">🎂 Date of Birth:</span>
                <span className="info-value">{data.dateOfBirth}</span>
              </div>
            )}
            {data.linkedinUrl && (
              <div className="info-item">
                <span className="info-label">💼 LinkedIn:</span>
                <span className="info-value">
                  <a href={data.linkedinUrl} target="_blank" rel="noopener noreferrer" className="social-link">
                    {data.linkedinUrl}
                  </a>
                </span>
              </div>
            )}
            {data.githubUrl && (
              <div className="info-item">
                <span className="info-label">🐙 GitHub:</span>
                <span className="info-value">
                  <a href={data.githubUrl} target="_blank" rel="noopener noreferrer" className="social-link">
                    {data.githubUrl}
                  </a>
                </span>
              </div>
            )}
          </div>
        </div>

        {data.personalBio && (
          <div className="resume-section">
            <h2 className="section-heading">
              <span className="section-icon">🎭</span>
              Creative Bio
            </h2>
            <p className="section-content">{data.personalBio}</p>
          </div>
        )}

        {data.toolsSkills && (
          <div className="resume-section">
            <h2 className="section-heading">
              <span className="section-icon">🛠️</span>
              Tools & Skills
            </h2>
            <div className="skills-container">
              {formatSkills(data.toolsSkills).map((skill, index) => (
                <span key={index} className="skill-tag creative-skill">{skill}</span>
              ))}
            </div>
          </div>
        )}

        {data.topProjects && (
          <div className="resume-section">
            <h2 className="section-heading">
              <span className="section-icon">🚀</span>
              Top Projects
            </h2>
            <div className="section-content">
              {data.topProjects.split('\n').map((line, index) => (
                <p key={index} className="project-line">{line}</p>
              ))}
            </div>
          </div>
        )}

        {data.awardsExhibitions && (
          <div className="resume-section">
            <h2 className="section-heading">
              <span className="section-icon">🏆</span>
              Awards & Exhibitions
            </h2>
            <div className="section-content">
              {data.awardsExhibitions.split('\n').map((line, index) => (
                <p key={index} className="award-line">{line}</p>
              ))}
            </div>
          </div>
        )}

        {data.education && (
          <div className="resume-section">
            <h2 className="section-heading">
              <span className="section-icon">🎓</span>
              Education
            </h2>
            <div className="section-content">
              {data.education.split('\n').map((line, index) => (
                <p key={index} className="education-line">{line}</p>
              ))}
            </div>
          </div>
        )}

        {data.socialMedia && (
          <div className="resume-section">
            <h2 className="section-heading">
              <span className="section-icon">📱</span>
              Social Media
            </h2>
            <div className="section-content">
              {data.socialMedia.split('\n').map((line, index) => (
                <p key={index} className="social-line">{line}</p>
              ))}
            </div>
          </div>
        )}

        {data.hobbiesPassions && (
          <div className="resume-section">
            <h2 className="section-heading">
              <span className="section-icon">💫</span>
              Hobbies & Passions
            </h2>
            <div className="section-content">
              {data.hobbiesPassions.split('\n').map((line, index) => (
                <p key={index} className="hobby-line">{line}</p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderMinimalist = () => (
    <div className="resume-card minimalist" id="resume-output">
      <div className="resume-header minimalist-header">
        <div className="resume-title-section">
          <h1 className="resume-name">{data.name}</h1>
          <h2 className="resume-title">{data.title}</h2>
        </div>
      </div>

      <div className="resume-content">
        {/* New Personal Information Section */}
        <div className="resume-section personal-info-section">
          <h2 className="section-heading">Personal Information</h2>
          <div className="personal-info-grid">
            {data.phoneNumber && (
              <div className="info-item">
                <span className="info-label">Phone:</span>
                <span className="info-value">{data.phoneNumber}</span>
              </div>
            )}
            {data.address && (
              <div className="info-item">
                <span className="info-label">Address:</span>
                <span className="info-value">{data.address}</span>
              </div>
            )}
            {data.dateOfBirth && (
              <div className="info-item">
                <span className="info-label">Date of Birth:</span>
                <span className="info-value">{data.dateOfBirth}</span>
              </div>
            )}
            {data.linkedinUrl && (
              <div className="info-item">
                <span className="info-label">LinkedIn:</span>
                <span className="info-value">
                  <a href={data.linkedinUrl} target="_blank" rel="noopener noreferrer" className="social-link">
                    {data.linkedinUrl}
                  </a>
                </span>
              </div>
            )}
            {data.githubUrl && (
              <div className="info-item">
                <span className="info-label">GitHub:</span>
                <span className="info-value">
                  <a href={data.githubUrl} target="_blank" rel="noopener noreferrer" className="social-link">
                    {data.githubUrl}
                  </a>
                </span>
              </div>
            )}
          </div>
        </div>

        {data.summary && (
          <div className="resume-section">
            <h2 className="section-heading">Summary</h2>
            <p className="section-content">{data.summary}</p>
          </div>
        )}

        {data.skillsList && (
          <div className="resume-section">
            <h2 className="section-heading">Skills</h2>
            <div className="skills-container">
              {formatSkills(data.skillsList).map((skill, index) => (
                <span key={index} className="skill-tag minimal-skill">{skill}</span>
              ))}
            </div>
          </div>
        )}

        {data.workExperience && (
          <div className="resume-section">
            <h2 className="section-heading">Experience</h2>
            <div className="section-content">
              {data.workExperience.split('\n').map((line, index) => (
                <p key={index} className="experience-line">{line}</p>
              ))}
            </div>
          </div>
        )}

        {data.education && (
          <div className="resume-section">
            <h2 className="section-heading">Education</h2>
            <div className="section-content">
              {data.education.split('\n').map((line, index) => (
                <p key={index} className="education-line">{line}</p>
              ))}
            </div>
          </div>
        )}

        {data.projectsCertifications && (
          <div className="resume-section">
            <h2 className="section-heading">Projects & Certifications</h2>
            <div className="section-content">
              {data.projectsCertifications.split('\n').map((line, index) => (
                <p key={index} className="project-line">{line}</p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderExecutive = () => (
    <div className="resume-card executive" id="resume-output">
      <div className="resume-header executive-header">
        <div className="resume-photo-section">
          {data.photo ? (
            <div className="resume-photo">
              <img 
                src={data.photo instanceof File ? URL.createObjectURL(data.photo) : (typeof data.photo === 'string' ? data.photo : null)} 
                alt={data.fullName}
                onError={(e) => {
                  console.error('Error loading image:', e);
                  e.target.style.display = 'none';
                }}
              />
            </div>
          ) : (
            <div className="resume-photo-placeholder">
              <span className="placeholder-icon">👔</span>
            </div>
          )}
        </div>
        <div className="resume-title-section">
          <h1 className="resume-name">{data.fullName}</h1>
          <h2 className="resume-title">{data.designation}</h2>
        </div>
      </div>

      <div className="resume-content">
        {/* New Personal Information Section */}
        <div className="resume-section personal-info-section">
          <h2 className="section-heading">
            <span className="section-icon">📋</span>
            Personal Information
          </h2>
          <div className="personal-info-grid">
            {data.phoneNumber && (
              <div className="info-item">
                <span className="info-label">📞 Phone:</span>
                <span className="info-value">{data.phoneNumber}</span>
              </div>
            )}
            {data.address && (
              <div className="info-item">
                <span className="info-label">📍 Address:</span>
                <span className="info-value">{data.address}</span>
              </div>
            )}
            {data.dateOfBirth && (
              <div className="info-item">
                <span className="info-label">🎂 Date of Birth:</span>
                <span className="info-value">{data.dateOfBirth}</span>
              </div>
            )}
            {data.linkedinUrl && (
              <div className="info-item">
                <span className="info-label">💼 LinkedIn:</span>
                <span className="info-value">
                  <a href={data.linkedinUrl} target="_blank" rel="noopener noreferrer" className="social-link">
                    {data.linkedinUrl}
                  </a>
                </span>
              </div>
            )}
            {data.githubUrl && (
              <div className="info-item">
                <span className="info-label">🐙 GitHub:</span>
                <span className="info-value">
                  <a href={data.githubUrl} target="_blank" rel="noopener noreferrer" className="social-link">
                    {data.githubUrl}
                  </a>
                </span>
              </div>
            )}
          </div>
        </div>

        {data.executiveSummary && (
          <div className="resume-section">
            <h2 className="section-heading">
              <span className="section-icon">🎯</span>
              Executive Summary
            </h2>
            <p className="section-content">{data.executiveSummary}</p>
          </div>
        )}

        {data.keyAchievements && (
          <div className="resume-section">
            <h2 className="section-heading">
              <span className="section-icon">🏆</span>
              Key Achievements
            </h2>
            <div className="section-content">
              {data.keyAchievements.split('\n').map((line, index) => (
                <p key={index} className="achievement-line">{line}</p>
              ))}
            </div>
          </div>
        )}

        {data.experience && (
          <div className="resume-section">
            <h2 className="section-heading">
              <span className="section-icon">💼</span>
              Leadership Experience
            </h2>
            <div className="section-content">
              {data.experience.split('\n').map((line, index) => (
                <p key={index} className="experience-line">{line}</p>
              ))}
            </div>
          </div>
        )}

        {data.education && (
          <div className="resume-section">
            <h2 className="section-heading">
              <span className="section-icon">🎓</span>
              Education
            </h2>
            <div className="section-content">
              {data.education.split('\n').map((line, index) => (
                <p key={index} className="education-line">{line}</p>
              ))}
            </div>
          </div>
        )}

        {data.certifications && (
          <div className="resume-section">
            <h2 className="section-heading">
              <span className="section-icon">📜</span>
              Certifications
            </h2>
            <div className="section-content">
              {data.certifications.split('\n').map((line, index) => (
                <p key={index} className="certification-line">{line}</p>
              ))}
            </div>
          </div>
        )}

        {data.languages && (
          <div className="resume-section">
            <h2 className="section-heading">
              <span className="section-icon">🌍</span>
              Languages
            </h2>
            <div className="section-content">
              {data.languages.split('\n').map((line, index) => (
                <p key={index} className="language-line">{line}</p>
              ))}
            </div>
          </div>
        )}

        {data.boardsCommittees && (
          <div className="resume-section">
            <h2 className="section-heading">
              <span className="section-icon">🏛️</span>
              Boards & Committees
            </h2>
            <div className="section-content">
              {data.boardsCommittees.split('\n').map((line, index) => (
                <p key={index} className="board-line">{line}</p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderTechSavvy = () => (
    <div className="resume-card tech-savvy" id="resume-output">
      <div className="resume-header tech-header">
        <div className="resume-photo-section">
          {data.photo ? (
            <div className="resume-photo">
              <img 
                src={data.photo instanceof File ? URL.createObjectURL(data.photo) : (typeof data.photo === 'string' ? data.photo : null)} 
                alt={data.fullName}
                onError={(e) => {
                  console.error('Error loading image:', e);
                  e.target.style.display = 'none';
                }}
              />
            </div>
          ) : (
            <div className="resume-photo-placeholder">
              <span className="placeholder-icon">💻</span>
            </div>
          )}
        </div>
        <div className="resume-title-section">
          <h1 className="resume-name">{data.fullName}</h1>
          <h2 className="resume-title">{data.role}</h2>
        </div>
      </div>

      <div className="resume-content">
        {/* New Personal Information Section */}
        <div className="resume-section personal-info-section">
          <h2 className="section-heading">
            <span className="section-icon">📋</span>
            Personal Information
          </h2>
          <div className="personal-info-grid">
            {data.phoneNumber && (
              <div className="info-item">
                <span className="info-label">📞 Phone:</span>
                <span className="info-value">{data.phoneNumber}</span>
              </div>
            )}
            {data.address && (
              <div className="info-item">
                <span className="info-label">📍 Address:</span>
                <span className="info-value">{data.address}</span>
              </div>
            )}
            {data.dateOfBirth && (
              <div className="info-item">
                <span className="info-label">🎂 Date of Birth:</span>
                <span className="info-value">{data.dateOfBirth}</span>
              </div>
            )}
            {data.linkedinUrl && (
              <div className="info-item">
                <span className="info-label">💼 LinkedIn:</span>
                <span className="info-value">
                  <a href={data.linkedinUrl} target="_blank" rel="noopener noreferrer" className="social-link">
                    {data.linkedinUrl}
                  </a>
                </span>
              </div>
            )}
            {data.githubUrl && (
              <div className="info-item">
                <span className="info-label">🐙 GitHub:</span>
                <span className="info-value">
                  <a href={data.githubUrl} target="_blank" rel="noopener noreferrer" className="social-link">
                    {data.githubUrl}
                  </a>
                </span>
              </div>
            )}
          </div>
        </div>

        {data.summary && (
          <div className="resume-section">
            <h2 className="section-heading">
              <span className="section-icon">💻</span>
              Summary
            </h2>
            <p className="section-content">{data.summary}</p>
          </div>
        )}

        {data.techStack && (
          <div className="resume-section">
            <h2 className="section-heading">
              <span className="section-icon">⚡</span>
              Tech Stack
            </h2>
            <div className="skills-container">
              {formatSkills(data.techStack).map((skill, index) => (
                <span key={index} className="skill-tag tech-skill">{skill}</span>
              ))}
            </div>
          </div>
        )}

        {data.projects && (
          <div className="resume-section">
            <h2 className="section-heading">
              <span className="section-icon">🚀</span>
              Projects
            </h2>
            <div className="section-content">
              {data.projects.split('\n').map((line, index) => (
                <p key={index} className="project-line">{line}</p>
              ))}
            </div>
          </div>
        )}

        {data.workExperience && (
          <div className="resume-section">
            <h2 className="section-heading">
              <span className="section-icon">💼</span>
              Work Experience
            </h2>
            <div className="section-content">
              {data.workExperience.split('\n').map((line, index) => (
                <p key={index} className="experience-line">{line}</p>
              ))}
            </div>
          </div>
        )}

        {data.education && (
          <div className="resume-section">
            <h2 className="section-heading">
              <span className="section-icon">🎓</span>
              Education
            </h2>
            <div className="section-content">
              {data.education.split('\n').map((line, index) => (
                <p key={index} className="education-line">{line}</p>
              ))}
            </div>
          </div>
        )}

        {data.certifications && (
          <div className="resume-section">
            <h2 className="section-heading">
              <span className="section-icon">🏆</span>
              Certifications
            </h2>
            <div className="section-content">
              {data.certifications.split('\n').map((line, index) => (
                <p key={index} className="certification-line">{line}</p>
              ))}
            </div>
          </div>
        )}

        {data.openSourceContributions && (
          <div className="resume-section">
            <h2 className="section-heading">
              <span className="section-icon">🌟</span>
              Open Source Contributions
            </h2>
            <div className="section-content">
              {data.openSourceContributions.split('\n').map((line, index) => (
                <p key={index} className="contribution-line">{line}</p>
              ))}
            </div>
          </div>
        )}

        {data.portfolioUrls && (
          <div className="resume-section">
            <h2 className="section-heading">
              <span className="section-icon">🔗</span>
              Portfolio & Links
            </h2>
            <div className="section-content">
              {data.portfolioUrls.split('\n').map((line, index) => (
                <p key={index} className="portfolio-line">{line}</p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderAcademic = () => (
    <div className="resume-card academic" id="resume-output">
      <div className="resume-header academic-header">
        <div className="resume-photo-section">
          {data.photo ? (
            <div className="resume-photo">
              <img 
                src={data.photo instanceof File ? URL.createObjectURL(data.photo) : (typeof data.photo === 'string' ? data.photo : null)} 
                alt={data.fullName}
                onError={(e) => {
                  console.error('Error loading image:', e);
                  e.target.style.display = 'none';
                }}
              />
            </div>
          ) : (
            <div className="resume-photo-placeholder">
              <span className="placeholder-icon">🎓</span>
            </div>
          )}
        </div>
        <div className="resume-title-section">
          <h1 className="resume-name">{data.fullName}</h1>
          <h2 className="resume-title">{data.academicTitle}</h2>
        </div>
      </div>

      <div className="resume-content">
        {/* New Personal Information Section */}
        <div className="resume-section personal-info-section">
          <h2 className="section-heading">
            <span className="section-icon">📋</span>
            Personal Information
          </h2>
          <div className="personal-info-grid">
            {data.phoneNumber && (
              <div className="info-item">
                <span className="info-label">📞 Phone:</span>
                <span className="info-value">{data.phoneNumber}</span>
              </div>
            )}
            {data.address && (
              <div className="info-item">
                <span className="info-label">📍 Address:</span>
                <span className="info-value">{data.address}</span>
              </div>
            )}
            {data.dateOfBirth && (
              <div className="info-item">
                <span className="info-label">🎂 Date of Birth:</span>
                <span className="info-value">{data.dateOfBirth}</span>
              </div>
            )}
            {data.linkedinUrl && (
              <div className="info-item">
                <span className="info-label">💼 LinkedIn:</span>
                <span className="info-value">
                  <a href={data.linkedinUrl} target="_blank" rel="noopener noreferrer" className="social-link">
                    {data.linkedinUrl}
                  </a>
                </span>
              </div>
            )}
            {data.githubUrl && (
              <div className="info-item">
                <span className="info-label">🐙 GitHub:</span>
                <span className="info-value">
                  <a href={data.githubUrl} target="_blank" rel="noopener noreferrer" className="social-link">
                    {data.githubUrl}
                  </a>
                </span>
              </div>
            )}
          </div>
        </div>

        {data.researchSummary && (
          <div className="resume-section">
            <h2 className="section-heading">
              <span className="section-icon">🔬</span>
              Research Summary
            </h2>
            <p className="section-content">{data.researchSummary}</p>
          </div>
        )}

        {data.education && (
          <div className="resume-section">
            <h2 className="section-heading">
              <span className="section-icon">🎓</span>
              Education
            </h2>
            <div className="section-content">
              {data.education.split('\n').map((line, index) => (
                <p key={index} className="education-line">{line}</p>
              ))}
            </div>
          </div>
        )}

        {data.publications && (
          <div className="resume-section">
            <h2 className="section-heading">
              <span className="section-icon">📚</span>
              Publications
            </h2>
            <div className="section-content">
              {data.publications.split('\n').map((line, index) => (
                <p key={index} className="publication-line">{line}</p>
              ))}
            </div>
          </div>
        )}

        {data.researchProjects && (
          <div className="resume-section">
            <h2 className="section-heading">
              <span className="section-icon">🔬</span>
              Research Projects
            </h2>
            <div className="section-content">
              {data.researchProjects.split('\n').map((line, index) => (
                <p key={index} className="project-line">{line}</p>
              ))}
            </div>
          </div>
        )}

        {data.teachingExperience && (
          <div className="resume-section">
            <h2 className="section-heading">
              <span className="section-icon">👨‍🏫</span>
              Teaching Experience
            </h2>
            <div className="section-content">
              {data.teachingExperience.split('\n').map((line, index) => (
                <p key={index} className="teaching-line">{line}</p>
              ))}
            </div>
          </div>
        )}

        {data.conferencesAttended && (
          <div className="resume-section">
            <h2 className="section-heading">
              <span className="section-icon">🎤</span>
              Conferences & Presentations
            </h2>
            <div className="section-content">
              {data.conferencesAttended.split('\n').map((line, index) => (
                <p key={index} className="conference-line">{line}</p>
              ))}
            </div>
          </div>
        )}

        {data.certificationsAchievements && (
          <div className="resume-section">
            <h2 className="section-heading">
              <span className="section-icon">🏆</span>
              Certifications & Achievements
            </h2>
            <div className="section-content">
              {data.certificationsAchievements.split('\n').map((line, index) => (
                <p key={index} className="achievement-line">{line}</p>
              ))}
            </div>
          </div>
        )}

        {data.skills && (
          <div className="resume-section">
            <h2 className="section-heading">
              <span className="section-icon">🛠️</span>
              Skills
            </h2>
            <div className="skills-container">
              {formatSkills(data.skills).map((skill, index) => (
                <span key={index} className="skill-tag academic-skill">{skill}</span>
              ))}
            </div>
          </div>
        )}

        {data.languages && (
          <div className="resume-section">
            <h2 className="section-heading">
              <span className="section-icon">🌍</span>
              Languages
            </h2>
            <div className="section-content">
              {data.languages.split('\n').map((line, index) => (
                <p key={index} className="language-line">{line}</p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderResume = () => {
    switch (data.templateId) {
      case 'modernProfessional':
        return renderModernProfessional();
      case 'creativePortfolio':
        return renderCreativePortfolio();
      case 'minimalist':
        return renderMinimalist();
      case 'executive':
        return renderExecutive();
      case 'techSavvy':
        return renderTechSavvy();
      case 'academic':
        return renderAcademic();
      default:
        return renderModernProfessional();
    }
  };

  return (
    <div className="resume-output-container dreamy-scale-in">
      {renderResume()}

      {/* Action Buttons */}
      <div className="resume-actions">
        <button 
          className="action-btn export-btn glow"
          onClick={handleExportPDF}
          disabled={isExporting}
        >
          {isExporting ? (
            <>
              <span className="loading-spinner"></span>
              Exporting PDF...
            </>
          ) : (
            <>
              <span className="btn-icon">📄</span>
              Export as PDF
            </>
          )}
        </button>
        
        <button 
          className="action-btn print-btn"
          onClick={() => window.print()}
        >
          <span className="btn-icon">🖨️</span>
          Print Resume
        </button>
      </div>
    </div>
  );
};

export default ResumeOutput; 