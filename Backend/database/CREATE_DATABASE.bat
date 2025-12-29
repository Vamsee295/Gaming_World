@echo off
echo ========================================
echo Creating Gaming World Database
echo ========================================
echo.

cd /d "%~dp0"

echo Running database schema...
mysql -u root -pVamsee_29 < COMPLETE_DATABASE_SCHEMA.sql

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo SUCCESS! Database created!
    echo ========================================
    echo.
    echo Loading sample data...
    mysql -u root -pVamsee_29 < SAMPLE_DATA.sql
    
    if %errorlevel% equ 0 (
        echo.
        echo ========================================
        echo COMPLETE! Database ready with test data!
        echo ========================================
        echo.
        echo Test users created:
        echo - Username: Vamsee05
        echo - Email: vamseek505@gmail.com
        echo - Password: password123
        echo.
        echo Database: gaming_world
        echo Tables: 40+ tables created
        echo.
    ) else (
        echo.
        echo Sample data failed, but database is created!
    )
) else (
    echo.
    echo ========================================
    echo ERROR! Failed to create database
    echo ========================================
    echo.
    echo Make sure MySQL is running!
)

echo.
pause
