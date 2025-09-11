@echo off
echo Starting DirAvenir Application...
echo.

echo Setting environment variables...
set SPRING_PROFILES_ACTIVE=dev
set SPRING_FLYWAY_ENABLED=true
set SPRING_JPA_HIBERNATE_DDL_AUTO=validate

echo.
echo Starting Spring Boot application...
echo.

mvn spring-boot:run

pause
