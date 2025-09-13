import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = ({ theme, onThemeToggle, isAuthenticated }) => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/builder');
    } else {
      navigate('/signup');
    }
  };

  const handleTemplateSelect = () => {
    navigate('/templates');
  };

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="title-icon">✨</span>
            Dreamy AI Resume Builder
            <span className="title-icon">✨</span>
          </h1>
          <p className="hero-subtitle">
            Create beautiful, professional resumes with AI assistance. 
            Stand out from the crowd with our intelligent resume builder.
          </p>
          <div className="hero-buttons">
            <button 
              className="cta-button primary"
              onClick={handleGetStarted}
            >
              {isAuthenticated ? 'Start Building' : 'Get Started Free'}
            </button>
            <button 
              className="cta-button secondary"
              onClick={handleTemplateSelect}
            >
              Browse Templates
            </button>
          </div>
        </div>
        <button 
          className="theme-toggle glow"
          onClick={onThemeToggle}
          aria-label="Toggle theme"
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </section>

      {/* Modern AI Section */}
      <section className="modern-ai-section">
        <div className="container">
          {/* Section 1 */}
          <div className="ai-section-block">
            <div className="ai-section-illustration">
              <div className="cartoon-woman">
                <div className="woman-avatar">👩‍💼</div>
                <div className="floating-keywords">
                  <span className="keyword-bubble">React</span>
                  <span className="keyword-bubble">JavaScript</span>
                  <span className="keyword-bubble">Python</span>
                  <span className="keyword-bubble">AWS</span>
                </div>
                <div className="ai-interface">
                  <div className="interface-window">
                    <div className="window-header">
                      <div className="window-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                    <div className="interface-content">
                      <div className="add-keywords-btn">Add Keywords</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="ai-section-content">
              <h2 className="ai-section-title">Smart Keyword Optimization</h2>
              <p className="ai-section-description">
                Our AI instantly analyzes job descriptions and automatically suggests relevant keywords 
                that will help your resume pass through Applicant Tracking Systems (ATS). 
                No more guessing what recruiters are looking for.
              </p>
              <ul className="ai-section-features">
                <li>🔍 Industry-specific keyword detection</li>
                <li>📊 ATS compatibility scoring</li>
                <li>⚡ Real-time optimization suggestions</li>
                <li>🎯 Targeted keyword placement</li>
              </ul>
            </div>
          </div>

          {/* Section 2 */}
          <div className="ai-section-block reverse">
            <div className="ai-section-content">
              <h2 className="ai-section-title">AI-Powered Content Enhancement</h2>
              <p className="ai-section-description">
                Transform bland bullet points into compelling achievements that showcase your impact. 
                Our AI rewrites your experience using powerful action verbs and quantifiable results 
                that grab recruiters' attention.
              </p>
              <ul className="ai-section-features">
                <li>📈 Impact-driven bullet rewriting</li>
                <li>💰 Quantifiable achievement highlighting</li>
                <li>🚀 Action verb optimization</li>
                <li>✨ Professional tone enhancement</li>
              </ul>
            </div>
            <div className="ai-section-illustration">
              <div className="content-enhancement">
                <div className="enhancement-before">
                  <div className="before-title">Before</div>
                  <div className="before-content">
                    <p>• Worked on team projects</p>
                    <p>• Helped with customer service</p>
                    <p>• Used various software tools</p>
                  </div>
                </div>
                <div className="enhancement-arrow">→</div>
                <div className="enhancement-after">
                  <div className="after-title">After AI Enhancement</div>
                  <div className="after-content">
                    <p>• Led cross-functional team of 8 to deliver project 2 weeks early</p>
                    <p>• Improved customer satisfaction scores by 25% through process optimization</p>
                    <p>• Mastered 5+ software platforms, increasing team productivity by 30%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Background Decorative Elements */}
        <div className="background-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
      </section>

      {/* Grammar Check Section */}
      <section className="grammar-check-section">
        <div className="container">
          <div className="grammar-check-content">
            <div className="grammar-check-left">
              <h2 className="grammar-check-title">
                <span className="grammar-check-icon">🔍</span>
                Let AI Fix Your Resume Grammar!
              </h2>
              <p className="grammar-check-description">
                Struggling with grammar mistakes in your resume? Our powerful AI grammar checker helps you spot and fix spelling, punctuation, and sentence structure issues instantly. Paste your text below and let the AI do the rest!
              </p>
              <div className="grammar-check-form">
                <textarea 
                  className="grammar-check-textarea" 
                  placeholder="Paste your resume content here to check for grammar, spelling, and punctuation errors..."
                  rows="6"
                ></textarea>
                <button className="grammar-check-btn">
                  <span className="btn-icon">✨</span>
                  Check Now
                </button>
              </div>
            </div>
            <div className="grammar-check-right">
              <div className="grammar-check-illustration">
                <div className="ai-assistant">
                  <div className="assistant-avatar">🤖</div>
                  <div className="assistant-bubble">
                    <div className="bubble-content">
                      <div className="bubble-text">Checking grammar...</div>
                      <div className="bubble-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="floating-elements">
                  <div className="floating-element element-1">📝</div>
                  <div className="floating-element element-2">✨</div>
                  <div className="floating-element element-3">🎯</div>
                  <div className="floating-element element-4">🚀</div>
                </div>
                <div className="grammar-check-stats">
                  <div className="stat-item">
                    <span className="stat-number">99%</span>
                    <span className="stat-label">Accuracy</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">50+</span>
                    <span className="stat-label">Languages</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">1M+</span>
                    <span className="stat-label">Checks</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3 className="footer-title">
                <span className="footer-icon">✨</span>
                Dreamy AI Resume Builder
              </h3>
              <p className="footer-description">
                Create professional resumes with AI assistance. 
                Stand out in your job search with our intelligent tools.
              </p>
            </div>
            <div className="footer-section">
              <h4 className="footer-heading">Features</h4>
              <ul className="footer-links">
                <li><span className="link-icon">🎨</span> Professional Templates</li>
                <li><span className="link-icon">🤖</span> AI-Powered Writing</li>
                <li><span className="link-icon">📝</span> Grammar Check</li>
                <li><span className="link-icon">📱</span> Mobile Responsive</li>
              </ul>
            </div>
            <div className="footer-section">
              <h4 className="footer-heading">Support</h4>
              <ul className="footer-links">
                <li><span className="link-icon">📧</span> Contact Us</li>
                <li><span className="link-icon">❓</span> FAQ</li>
                <li><span className="link-icon">📖</span> Help Center</li>
                <li><span className="link-icon">🔒</span> Privacy Policy</li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 Dreamy AI Resume Builder. All Copyrights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage; 