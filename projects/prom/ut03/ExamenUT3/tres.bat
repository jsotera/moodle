@echo off
setlocal enabledelayedexpansion

:: Obtener el usuario actual
set "USER_PROFILE=%USERPROFILE%"

:: Definir la ruta base
set "JETBRAINS_PATH=%USER_PROFILE%\AppData\Roaming\JetBrains"

:: Verificar si la carpeta JetBrains existe
if not exist "%JETBRAINS_PATH%" (
    echo No se encontró la carpeta JetBrains en %JETBRAINS_PATH%.
    pause
    exit /b
)

:: Crear o limpiar el archivo de salida
set "LOG_DIR=%~dp0src\resources\logs"
if not exist "%LOG_DIR%\" mkdir "%LOG_DIR%"
if not exist "%LOG_DIR%\" exit /b 1
set "OUTPUT_FILE=%LOG_DIR%\tres.txt"
echo Listado de Plugins - %DATE% %TIME% > "%OUTPUT_FILE%"
echo ========================================= >> "%OUTPUT_FILE%"

:: Buscar carpetas que contengan "idea"
set "found=0"
for /d %%F in ("%JETBRAINS_PATH%\*") do (
    echo %%~nxF | find /I "idea" >nul
    if not errorlevel 1 (
        set /a found+=1
        echo. >> "%OUTPUT_FILE%"
        echo IntelliJ IDEA encontrado: %%~nxF >> "%OUTPUT_FILE%"
        echo ---------------------------------------- >> "%OUTPUT_FILE%"

        set "PLUGINS_PATH=%JETBRAINS_PATH%\%%~nxF\plugins"

        :: Verificar si la carpeta de plugins existe
        if exist "!PLUGINS_PATH!\" (
            for /d %%P in ("!PLUGINS_PATH!\*") do echo %%~nxP >> "%OUTPUT_FILE%"
        ) else (
            echo No se encontró la carpeta de plugins en "!PLUGINS_PATH!" >> "%OUTPUT_FILE%"
        )
    )
)

:: Si no se encontraron carpetas con "idea"
if %found%==0 (
    echo No se encontraron carpetas con "idea" en el nombre dentro de %JETBRAINS_PATH%. >> "%OUTPUT_FILE%"
)

:: Mostrar el archivo de salida
type "%OUTPUT_FILE%"

echo.
echo Listado guardado en "%OUTPUT_FILE%"
::pause
