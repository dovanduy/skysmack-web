@echo off

rem This bat file removes the auto-generated files/folders in the whole skysmack project: node_modules, dist, package-lock.json

rem @ | turns off echo for one line.
rem RD | remove directory
rem %~dp0 | current folder path
rem "" | escapes whitespace
rem pause | prevents console from closing
rem /s | delete all files contained in the directory subfolders.
rem /q | "quiet mode" meaning you won’t be prompted Yes/No

rem framework
RD /s /q "%~dp0\..\framework\dist";
echo Deleted framework\dist;
RD /s /q "%~dp0\..\framework\node_modules";
echo Deleted framework\node_modules;
del /s /q "%~dp0\..\framework\package-lock.json";

rem redux
RD /s /q "%~dp0\..\redux\dist";
echo Deleted redux\dist;
RD /s /q "%~dp0\..\redux\node_modules";
echo Deleted redux\node_modules;
del /s /q "%~dp0\..\redux\package-lock.json";

rem packages-skysmack
RD /s /q "%~dp0\..\packages-authentication\dist";
echo Deleted packages-authentication\dist;
RD /s /q "%~dp0\..\packages-authentication\node_modules";
echo Deleted packages-authentication\node_modules;
del /s /q "%~dp0\..\packages-authentication\package-lock.json";

rem packages-skysmack
RD /s /q "%~dp0\..\packages-skysmack\dist";
echo Deleted packages-skysmack\dist;
RD /s /q "%~dp0\..\packages-skysmack\node_modules";
echo Deleted packages-skysmack\node_modules;
del /s /q "%~dp0\..\packages-skysmack\package-lock.json";

rem packages-persons
RD /s /q "%~dp0\..\packages-persons\dist";
echo Deleted packages-persons\dist;
RD /s /q "%~dp0\..\packages-persons\node_modules";
echo Deleted packages-persons\node_modules;
del /s /q "%~dp0\..\packages-persons\package-lock.json";

rem ng-skysmack
RD /s /q "%~dp0\node_modules";
echo Deleted ng-skysmack\node_modules;
del /s /q "%~dp0\package-lock.json";