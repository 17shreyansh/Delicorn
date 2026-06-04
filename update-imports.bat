@echo off
echo Updating all API imports to use unified apiService...

cd /d "d:\Office\Ecom\New folder\Delicorn\frontend\src"

:: Replace 'services/api' with 'services/apiService'
powershell -Command "(Get-Content 'context\UserContext.jsx') -replace \"from '../services/api'\", \"from '../services/apiService'\" | Set-Content 'context\UserContext.jsx'"
powershell -Command "(Get-Content 'admin\pages\Dashboard.jsx') -replace \"from '../../services/api'\", \"from '../../services/apiService'\" | Set-Content 'admin\pages\Dashboard.jsx'"
powershell -Command "(Get-Content 'pages\Login.jsx') -replace \"from '../services/api'\", \"from '../services/apiService'\" | Set-Content 'pages\Login.jsx'"
powershell -Command "(Get-Content 'pages\Signup.jsx') -replace \"from '../services/api'\", \"from '../services/apiService'\" | Set-Content 'pages\Signup.jsx'"

:: Replace 'services/apiClient' with 'services/apiService'
powershell -Command "(Get-Content 'admin\pages\Order.jsx') -replace \"from '../../services/adminApi'\", \"from '../../services/apiService'\" | Set-Content 'admin\pages\Order.jsx'"

echo Done! All imports updated.
pause
