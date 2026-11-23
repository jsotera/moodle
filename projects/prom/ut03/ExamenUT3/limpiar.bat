@echo off
setlocal enabledelayedexpansion

rem Ruta a la carpeta Descargas
set "downloads=%USERPROFILE%\Downloads"

rem Obtener la ruta completa del script
set "scriptPath=%~dp0"

rem Eliminar barra invertida final si existe
if "%scriptPath:~-1%"=="\" set "scriptPath=%scriptPath:~0,-1%"

rem Obtener solo el nombre de la carpeta donde se encuentra el script
for %%I in ("%scriptPath%") do set "excludeFolder=%%~nxI"

rem Verificación
if not exist "%downloads%" (
    echo La carpeta Descargas no existe.
    goto :eof
)

echo Protegiendo la carpeta: %excludeFolder%

rem Quitar atributos ocultos y de sistema
attrib -h -s "%downloads%\*" /s /d

rem Borrar todos los archivos directamente en Downloads
for %%F in ("%downloads%\*.*") do (
    del /q /f "%%F"
)

rem Borrar todas las carpetas excepto excludeFolder
for /d %%D in ("%downloads%\*") do (
    if /I not "%%~nxD"=="%excludeFolder%" (
        rd /s /q "%%D"
    )
)

echo Se han eliminado todos los archivos y carpetas en %downloads% excepto la carpeta "%excludeFolder%".
