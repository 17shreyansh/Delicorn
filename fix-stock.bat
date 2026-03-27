@echo off
echo ========================================
echo   Delicorn E-commerce - Stock Fix
echo ========================================
echo.

cd /d "d:\Office\Ecom\New folder\Delicorn\be"

echo Step 1: Running stock migration...
echo.
node scripts/fixProductStock.js

echo.
echo ========================================
echo   Stock Fix Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Restart your backend server
echo 2. Refresh your frontend
echo 3. Check product pages
echo.
echo To verify stock status, visit:
echo http://localhost:3001/api/debug/products-stock-status
echo.
pause
