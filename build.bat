@echo off
echo Creating Netlify deployment package...

REM Create dist directory
if exist dist rmdir /s /q dist
mkdir dist

REM Copy main files
copy index.html dist\
copy style.css dist\
copy clickbyazmi-favicon.png dist\

REM Copy img directory
xcopy img dist\img\ /E /I

echo.
echo ✅ Deployment package created in 'dist' folder!
echo.
echo Next steps:
echo 1. Go to netlify.com
echo 2. Drag and drop the 'dist' folder
echo 3. Your site will be live!
echo.
pause