# Dreamy AI Resume Builder ✨

A beautiful, modern resume builder with AI assistance, built with React and Django. Create professional resumes with ease, featuring photo uploads, grammar correction, and multiple export options.

## 🌟 Features

### Frontend (React)
- **Beautiful UI/UX**: Modern, dreamy design with smooth animations
- **Theme Toggle**: Switch between light and dark themes
- **Photo Upload**: Add your professional photo to your resume
- **Responsive Design**: Works perfectly on all devices
- **Real-time Preview**: See your resume as you build it
- **PDF Export**: Download your resume as a professional PDF
- **Print Support**: Print-friendly resume layout
- **Grammar Correction**: Automatic basic grammar improvements

### Backend (Django)
- **REST API**: Full CRUD operations for resumes
- **File Upload**: Secure photo upload handling
- **User Authentication**: Save and manage multiple resumes
- **Admin Panel**: Easy resume management
- **CORS Support**: Seamless frontend-backend integration

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- Python (v3.8 or higher)
- pip (Python package manager)

### Frontend Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm start
   ```

3. **Open your browser**:
   Navigate to `http://localhost:3000`

### Backend Setup

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Create virtual environment**:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Run migrations**:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

5. **Create superuser** (optional):
   ```bash
   python manage.py createsuperuser
   ```

6. **Start the Django server**:
   ```bash
   python manage.py runserver
   ```

7. **Access admin panel**:
   Navigate to `http://localhost:8000/admin`

## 📁 Project Structure

```
dreamy-ai-resume-builder/
├── src/                          # React frontend
│   ├── components/               # React components
│   │   ├── Header.js            # Header with theme toggle
│   │   ├── ResumeForm.js        # Resume form with photo upload
│   │   └── ResumeOutput.js      # Resume display and export
│   ├── App.js                   # Main app component
│   └── index.js                 # React entry point
├── backend/                      # Django backend
│   ├── resume_builder/          # Django project settings
│   ├── resumes/                 # Resume app
│   │   ├── models.py           # Resume data model
│   │   ├── views.py            # API views
│   │   ├── serializers.py      # Data serialization
│   │   └── urls.py             # URL routing
│   └── manage.py               # Django management
├── public/                      # Static files
└── package.json                # Frontend dependencies
```

## 🎨 Features in Detail

### Theme System
- **Light Theme**: Soft pastel gradients with lavender accents
- **Dark Theme**: Deep blue gradients with purple highlights
- **Smooth Transitions**: CSS transitions for theme switching
- **Persistent Settings**: Theme preference saved in localStorage

### Photo Upload
- **Drag & Drop**: Easy photo upload interface
- **Preview**: Real-time photo preview
- **Validation**: File type and size validation (max 5MB)
- **Circular Display**: Professional circular photo display in resume

### Resume Sections
- **Personal Information**: Name and contact details
- **Professional Summary**: AI-corrected bio section
- **Skills**: Tag-based skill display
- **Work Experience**: Detailed experience section
- **Projects**: Project highlights and achievements

### Export Options
- **PDF Export**: Professional PDF generation using jsPDF
- **Print Support**: Print-optimized layout
- **Responsive**: Maintains formatting across devices

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the backend directory:

```env
SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
```

### API Endpoints

- `GET /api/resumes/` - List all resumes
- `POST /api/resumes/` - Create new resume
- `GET /api/resumes/{id}/` - Get specific resume
- `PUT /api/resumes/{id}/` - Update resume
- `DELETE /api/resumes/{id}/` - Delete resume
- `POST /api/resumes/{id}/rate_resume/` - Rate resume (future AI feature)
- `GET /api/resumes/templates/` - Get available templates

## 🚀 Deployment

### Frontend Deployment
```bash
npm run build
```

### Backend Deployment
```bash
python manage.py collectstatic
python manage.py migrate
gunicorn resume_builder.wsgi:application
```

## 🔮 Future Features

- **AI Grammar Correction**: Integration with LanguageTool or Grammarly APIs
- **Resume Templates**: Multiple professional templates
- **AI Resume Rating**: Intelligent resume scoring and feedback
- **User Authentication**: User accounts and resume management
- **Resume Sharing**: Share resumes via links
- **Advanced Analytics**: Resume performance tracking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Google Fonts for beautiful typography
- jsPDF for PDF generation
- React and Django communities for excellent documentation

---

**Made with ❤️ and ✨ by the Dreamy AI Resume Builder team** 