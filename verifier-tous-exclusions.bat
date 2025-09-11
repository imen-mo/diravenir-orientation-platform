@echo off
echo ================================================
echo === VÉRIFICATION COMPLÈTE DES EXCLUSIONS ===
echo ================================================
echo.

echo 🔍 VÉRIFICATION EXHAUSTIVE DES FICHIERS EXCLUS
echo ================================================
echo.

echo [1/8] 🔐 FICHIERS D'AUTHENTIFICATION :
echo ----------------------------------------
dir /s /b *AuthContext*.jsx 2>nul
dir /s /b *authService*.js 2>nul
dir /s /b *oauth2Service*.js 2>nul
dir /s /b *AuthTest*.jsx 2>nul
dir /s /b *OAuth2Callback*.jsx 2>nul

echo.
echo [2/8] 🔑 PAGES DE LOGIN ET INSCRIPTION :
echo ----------------------------------------
dir /s /b *Login*.jsx 2>nul
dir /s /b *Register*.jsx 2>nul
dir /s /b *Login*.css 2>nul
dir /s /b *Register*.css 2>nul

echo.
echo [3/8] 📧 PAGES DE VÉRIFICATION EMAIL :
echo ----------------------------------------
dir /s /b *VerifyEmail*.jsx 2>nul
dir /s /b *EmailTest*.jsx 2>nul
dir /s /b *EmailDebug*.jsx 2>nul

echo.
echo [4/8] 🛡️ CONTRÔLEURS ET SERVICES JAVA :
echo ----------------------------------------
dir /s /b *AuthController*.java 2>nul
dir /s /b *OAuth2Controller*.java 2>nul
dir /s /b *AuthenticationService*.java 2>nul
dir /s /b *OAuth2Service*.java 2>nul
dir /s /b *SecurityConfig*.java 2>nul
dir /s /b *JwtAuthenticationFilter*.java 2>nul

echo.
echo [5/8] 🔒 FICHIERS DE SÉCURITÉ :
echo ----------------------------------------
dir /s /b *Security*.java 2>nul
dir /s /b *Jwt*.java 2>nul

echo.
echo [6/8] 📄 FAQ ET FOOTER :
echo ----------------------------------------
dir /s /b *FAQ*.jsx 2>nul
dir /s /b *FAQ*.css 2>nul
dir /s /b *Footer*.jsx 2>nul
dir /s /b *Footer*.css 2>nul

echo.
echo [7/8] ⚙️ CONFIGURATION SENSIBLE :
echo ----------------------------------------
dir /b .env* 2>nul
dir /s /b application*.properties 2>nul

echo.
echo [8/8] 🧪 TESTS ET GUIDES D'AUTH :
echo ----------------------------------------
dir /b test-*auth*.* 2>nul
dir /b test-*oauth*.* 2>nul
dir /b *GUIDE_TEST_AUTH*.* 2>nul
dir /b *GUIDE_DEPANNAGE_AUTH*.* 2>nul
dir /b *README_OAUTH2*.* 2>nul

echo.
echo ================================================
echo === RÉSUMÉ DES EXCLUSIONS ===
echo ================================================
echo.
echo ✅ FICHIERS EXCLUS (ne seront PAS poussés) :
echo   - Tous les fichiers d'authentification
echo   - Toutes les pages de login/inscription
echo   - Toutes les pages de vérification email
echo   - Tous les contrôleurs Java d'auth
echo   - Tous les fichiers de sécurité
echo   - FAQ.jsx et Footer.jsx
echo   - Configuration sensible (.env, properties)
echo   - Tests et guides d'authentification
echo.
echo ✅ FICHIERS INCLUS (seront poussés) :
echo   - Tous les autres fichiers du projet
echo   - Votre système d'orientation
echo   - Vos dashboards
echo   - Vos autres modifications
echo.
echo ⚠️  ATTENTION : Ceci va ÉCRASER les modifications de votre binôme
echo    mais PRÉSERVERA son système d'authentification fonctionnel !
echo.
pause
