@echo off
setlocal enabledelayedexpansion

set "ciclo=%~1"
if "%ciclo%"=="" set "ciclo=sin_numero"

:: Ejecutar el archivo tres.bat
call .\tres.bat > nul

:: Ejecutar el archivo cuatro.bat
call .\cuatro.bat > nul

:: Agregar todos los archivos al repositorio
git add .

:: Confirmar los cambios
git commit --allow-empty -m "punto de control ciclo %ciclo% - %DATE% %TIME%"

