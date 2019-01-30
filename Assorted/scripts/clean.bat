@echo off

rem This bat file removes auto-generated files/folders in the whole skysmack project: node_modules, lib, dist, package-lock.json

rem @     | turns off echo for one line.
rem echo  | print line
rem del   | remve file
rem RD    | remove directory
rem mkdir | make directory
rem %~dp0 | current folder path
rem ""    | escapes whitespace
rem pause | prevents console from closing
rem /s    | delete all files contained in the directory subfolders.
rem /q    | "quiet mode" meaning you won’t be prompted Yes/No

rem === ROOT ===
RD /s /q "%~dp0\..\..\node_modules";
echo Deleted root node_modules;
del /s /q "%~dp0\..\..\package-lock.json";

rem === NPM PACKAGES ===
rem framework
RD /s /q "%~dp0\..\..\packages\framework\lib";
mkdir "%~dp0\..\..\packages\framework\lib";
echo Deleted framework\lib;
RD /s /q "%~dp0\..\..\packages\framework\node_modules";
echo Deleted framework\node_modules;
del /s /q "%~dp0\..\..\packages\framework\package-lock.json";

rem packages-identities
RD /s /q "%~dp0\..\..\packages\packages-identities\lib";
mkdir "%~dp0\..\..\packages\packages-identities\lib";
echo Deleted packages-identities\lib;
RD /s /q "%~dp0\..\..\packages\packages-identities\node_modules";
echo Deleted packages-identities\node_modules;
del /s /q "%~dp0\..\..\packages\packages-identities\package-lock.json";

rem packages-lodging-reservations
RD /s /q "%~dp0\..\..\packages\packages-lodging-reservations\lib";
mkdir "%~dp0\..\..\packages\packages-lodging-reservations\lib";
echo Deleted packages-lodging-reservations\lib;
RD /s /q "%~dp0\..\..\packages\packages-lodging-reservations\node_modules";
echo Deleted packages-lodging-reservations\node_modules;
del /s /q "%~dp0\..\..\packages\packages-lodging-reservations\package-lock.json";

rem packages-lodgings
RD /s /q "%~dp0\..\..\packages\packages-lodgings\lib";
mkdir "%~dp0\..\..\packages\packages-lodgings\lib";
echo Deleted packages-lodgings\lib;
RD /s /q "%~dp0\..\..\packages\packages-lodgings\node_modules";
echo Deleted packages-lodgings\node_modules;
del /s /q "%~dp0\..\..\packages\packages-lodgings\package-lock.json";

rem packages-maintenance
RD /s /q "%~dp0\..\..\packages\packages-maintenance\lib";
mkdir "%~dp0\..\..\packages\packages-maintenance\lib";
echo Deleted packages-maintenance\lib;
RD /s /q "%~dp0\..\..\packages\packages-maintenance\node_modules";
echo Deleted packages-maintenance\node_modules;
del /s /q "%~dp0\..\..\packages\packages-maintenance\package-lock.json";

rem packages-oauth2
RD /s /q "%~dp0\..\..\packages\packages-oauth2\lib";
mkdir "%~dp0\..\..\packages\packages-oauth2\lib";
echo Deleted packages-oauth2\lib;
RD /s /q "%~dp0\..\..\packages\packages-oauth2\node_modules";
echo Deleted packages-oauth2\node_modules;
del /s /q "%~dp0\..\..\packages\packages-oauth2\package-lock.json";

rem packages-persons
RD /s /q "%~dp0\..\..\packages\packages-persons\lib";
mkdir "%~dp0\..\..\packages\packages-persons\lib";
echo Deleted packages-persons\lib;
RD /s /q "%~dp0\..\..\packages\packages-persons\node_modules";
echo Deleted packages-persons\node_modules;
del /s /q "%~dp0\..\..\packages\packages-persons\package-lock.json";

rem packages-baskets
RD /s /q "%~dp0\..\..\packages\packages-baskets\lib";
mkdir "%~dp0\..\..\packages\packages-baskets\lib";
echo Deleted packages-baskets\lib;
RD /s /q "%~dp0\..\..\packages\packages-baskets\node_modules";
echo Deleted packages-baskets\node_modules;
del /s /q "%~dp0\..\..\packages\packages-baskets\package-lock.json";

rem packages-products
RD /s /q "%~dp0\..\..\packages\packages-products\lib";
mkdir "%~dp0\..\..\packages\packages-products\lib";
echo Deleted packages-products\lib;
RD /s /q "%~dp0\..\..\packages\packages-products\node_modules";
echo Deleted packages-products\node_modules;
del /s /q "%~dp0\..\..\packages\packages-products\package-lock.json";

rem packages-maintenance
RD /s /q "%~dp0\..\..\packages\packages-skysmack-core\lib";
mkdir "%~dp0\..\..\packages\packages-skysmack-core\lib";
echo Deleted packages-skysmack-core\lib;
RD /s /q "%~dp0\..\..\packages\packages-skysmack-core\node_modules";
echo Deleted packages-skysmack-core\node_modules;
del /s /q "%~dp0\..\..\packages\packages-skysmack-core\package-lock.json";

REM rem === ANGULAR PACKAGES / LIBRARIES ===
rem ng-skysmack
RD /s /q "%~dp0\..\..\ng-skysmack\node_modules";
echo Deleted ng-skysmack\node_modules;
RD /s /q "%~dp0\..\..\ng-skysmack\dist";

rem ng-packages
RD /s /q "%~dp0\..\..\ng-skysmack\projects\ng-packages\lib";
mkdir "%~dp0\..\..\ng-skysmack\projects\ng-packages\lib";
echo Deleted ng-skysmack\projects\ng-packages\lib;
RD /s /q "%~dp0\..\..\ng-skysmack\projects\ng-packages\node_modules";
echo Deleted ng-skysmack\projects\ng-packages\node_modules;

rem ng-redux
RD /s /q "%~dp0\..\..\ng-skysmack\projects\ng-redux\lib";
mkdir "%~dp0\..\..\ng-skysmack\projects\ng-redux\lib";
echo Deleted ng-skysmack\projects\ng-redux\lib;
RD /s /q "%~dp0\..\..\ng-skysmack\projects\ng-redux\node_modules";
echo Deleted ng-skysmack\projects\ng-redux\node_modules;

rem ng-ui
RD /s /q "%~dp0\..\..\ng-skysmack\projects\ng-ui\lib";
mkdir "%~dp0\..\..\ng-skysmack\projects\ng-ui\lib";
echo Deleted ng-skysmack\projects\ng-ui\lib;
RD /s /q "%~dp0\..\..\ng-skysmack\projects\ng-ui\node_modules";
echo Deleted ng-skysmack\projects\ng-ui\node_modules;

rem portal-packages
RD /s /q "%~dp0\..\..\ng-skysmack\projects\portal-packages\lib";
mkdir "%~dp0\..\..\ng-skysmack\projects\portal-packages\lib";
echo Deleted ng-skysmack\projects\portal-packages\lib;
RD /s /q "%~dp0\..\..\ng-skysmack\projects\portal-packages\node_modules";
echo Deleted ng-skysmack\projects\portal-packages\node_modules;

rem portal-ui
RD /s /q "%~dp0\..\..\ng-skysmack\projects\portal-ui\lib";
mkdir "%~dp0\..\..\ng-skysmack\projects\portal-ui\lib";
echo Deleted ng-skysmack\projects\portal-ui\lib;
RD /s /q "%~dp0\..\..\ng-skysmack\projects\portal-ui\node_modules";
echo Deleted ng-skysmack\projects\portal-ui\node_modules;