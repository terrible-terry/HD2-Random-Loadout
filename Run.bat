@echo off
setlocal
start "" code .
set PATH=C:\ProgramData\Applications\nodejs;%PATH%
start cmd /k "npm start"
