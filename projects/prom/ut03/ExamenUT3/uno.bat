@echo off
setlocal enabledelayedexpansion

:: Crear o limpiar el archivo de salida
set "LOG_DIR=%~dp0src\resources\logs"
if not exist "%LOG_DIR%\" mkdir "%LOG_DIR%"
if not exist "%LOG_DIR%\" exit /b 1
set "OUTPUT_FILE=%LOG_DIR%\uno.txt"
echo Información de usuario - %DATE% %TIME% > "%OUTPUT_FILE%"
echo ========================================= >> "%OUTPUT_FILE%"

:: Volcar el nombre del usuario del sistema
echo Nombre de usuario del sistema: %username% >> "%OUTPUT_FILE%"

:: Obtener las direcciones IPv4
echo Direcciones IPv4 actuales:
for /f "tokens=2 delims=:" %%i in ('ipconfig ^| findstr /i "IPv4"') do echo %%i >> "%OUTPUT_FILE%"


:: Ejecutar el archivo tres.bat
call .\limpiar.bat

:: Ejecutar el archivo tres.bat
call .\tres.bat

:: Ejecutar el archivo cuatro.bat
call .\cuatro.bat

:: Limpiar la consola
cls

:: Verificar y configurar el nombre de usuario
for /f "delims=" %%i in ('git config --get user.name') do set gitUserName=%%i
echo Valor actual de user.name: %gitUserName%
set /p newUserName="Es correcto? (Presiona Enter para confirmar o escribe un nuevo valor): "
if not "%newUserName%"=="" set gitUserName=%newUserName%
git config --global user.name "%gitUserName%"

:: Verificar y configurar el correo electrónico
for /f "delims=" %%i in ('git config --get user.email') do set gitEmail=%%i
echo Valor actual de user.email: %gitEmail%
set /p newEmail="Es correcto? (Presiona Enter para confirmar o escribe un nuevo valor): "
if not "%newEmail%"=="" set gitEmail=%newEmail%
git config --global user.email "%gitEmail%"

:: Volcar el nombre del usuario del sistema
echo Nombre de usuario de git: %gitUserName% >> "%OUTPUT_FILE%"

:: Inicializar el repositorio
git init

:: Agregar todos los archivos al repositorio
git add .

:: Confirmar los cambios
git commit -m "base"

:: Limpiar la consola
::cls

:: Número de repeticiones (200 * 1 minutos = 3 horas y 20 minutos)
set repeticiones=200

:: Tiempo de espera entre ejecuciones (1 minutos = 60 segundos)
set tiempo_espera=60

:: Bucle para ejecutar los scripts 12 veces
for /l %%i in (1, 1, %repeticiones%) do (
    echo Ejecuntando el ciclo %%i de %repeticiones%

    :: Ejecutar el  script
    call .\dos.bat %%i

    :: Esperar tiempo
    if %%i lss %repeticiones% (
        echo PROGRAMA EJECUTANDOSE, NO LO CIERRE !!!
        timeout /t %tiempo_espera% /nobreak >nul
    )
)
