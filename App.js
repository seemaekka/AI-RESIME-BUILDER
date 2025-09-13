import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import ResumeForm from './components/ResumeForm';
import ResumeOutput from './components/ResumeOutput';
import Login from './components/Login';
import Signup from './components/Signup';
import Templates from './components/Templates';
import './App.css';

function App() {
  const [theme, setTheme] = useState('light');
  const [resumeData, setResumeData] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Set theme on body element
    document.body.setAttribute('data-theme', theme);
    
    // Save theme preference to localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    // Load theme preference from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }

    // Check for saved user session
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setIsAuthenticated(true);
        setUser(userData);
      } catch (error) {
        console.error('Error parsing saved user data:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  const handleThemeToggle = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleLogin = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleSignup = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('user');
  };

  const handleGenerateResume = async (formData) => {
    setIsGenerating(true);
    
    try {
      // The formData now contains the API response with id, photo_url, etc.
      const processedData = {
        ...formData,
        generatedAt: new Date().toLocaleDateString()
      };
      
      setResumeData(processedData);
      
      // Scroll to resume output
      setTimeout(() => {
        const resumeOutput = document.getElementById('resume-output');
        if (resumeOutput) {
          resumeOutput.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
          });
        }
      }, 100);
    } catch (error) {
      console.error('Error generating resume:', error);
      // Error is already handled in ResumeForm component
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Router>
      <div className="app">
        <Navbar 
          isAuthenticated={isAuthenticated} 
          onLogout={handleLogout}
        />
        
        <Routes>
          {/* Homepage Route */}
          <Route 
            path="/" 
            element={
              <HomePage 
                theme={theme} 
                onThemeToggle={handleThemeToggle}
                isAuthenticated={isAuthenticated}
              />
            } 
          />
          
          {/* Resume Builder Route */}
          <Route 
            path="/builder" 
            element={
              isAuthenticated ? (
                <>
                  <main className="main-content">
                    <ResumeForm 
                      onGenerate={handleGenerateResume} 
                      isGenerating={isGenerating}
                    />
                    {resumeData && (
                      <ResumeOutput 
                        data={resumeData} 
                        theme={theme}
                      />
                    )}
                  </main>
                </>
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />
          
          {/* Templates Route */}
          <Route path="/templates" element={<Templates />} />
          
          {/* Authentication Routes */}
          <Route 
            path="/login" 
            element={
              isAuthenticated ? (
                <Navigate to="/" replace />
              ) : (
                <Login onLogin={handleLogin} />
              )
            } 
          />
          
          <Route 
            path="/signup" 
            element={
              isAuthenticated ? (
                <Navigate to="/" replace />
              ) : (
                <Signup onSignup={handleSignup} />
              )
            } 
          />
          
          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 