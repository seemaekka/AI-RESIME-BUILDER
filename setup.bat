@echo off
echo 🚀 Setting up Dreamy AI Resume Builder...

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python is not installed. Please install Python first.
    pause
    exit /b 1
)

echo ✅ Prerequisites check passed!

echo 📦 Installing frontend dependencies...
npm install

echo 🐍 Setting up backend...
cd backend

echo 🔧 Creating Python virtual environment...
python -m venv venv

echo 🔧 Activating virtual environment...
call venv\Scripts\activate.bat

echo 📦 Installing Python dependencies...
pip install -r requirements.txt

echo 🗄️ Running Django migrations...
python manage.py makemigrations
python manage.py migrate

if not exist .env (
    echo 📝 Creating .env file...
    echo SECRET_KEY=django-insecure-your-secret-key-here > .env
    echo DEBUG=True >> .env
    echo ALLOWED_HOSTS=localhost,127.0.0.1 >> .env
)

cd ..

echo 🎉 Setup complete!
echo.
echo To start the application:
echo 1. Frontend: npm start (in the root directory)
echo 2. Backend: cd backend ^&^& venv\Scripts\activate ^&^& python manage.py runserver
echo.
echo Frontend will be available at: http://localhost:3000
echo Backend API will be available at: http://localhost:8000
echo Admin panel will be available at: http://localhost:8000/admin
pause 