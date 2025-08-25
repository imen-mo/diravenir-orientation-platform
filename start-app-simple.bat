@echo off
echo Starting Diravenir Application on port 8084...
echo.

REM Compile the application
echo Compiling application...
call mvn clean compile

REM Start the application
echo Starting application...
call mvn exec:java -Dexec.mainClass="com.dira.diravenir1.Diravenir1Application" -Dexec.args="--server.port=8084"

pause
