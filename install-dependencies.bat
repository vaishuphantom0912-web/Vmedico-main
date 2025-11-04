@echo off
echo Installing VMedico Frontend Dependencies...
echo.

cd Vmedico-Frontend\vmedico

echo Installing npm packages...
npm install

echo.
echo Dependencies installed successfully!
echo.
echo To start the development server, run:
echo   cd Vmedico-Frontend\vmedico
echo   npm run dev
echo.
echo Make sure your backend is running on http://localhost:8080
echo.
pause