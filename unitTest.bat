@ECHO OFF
ECHO Unit test in jasmine
ECHO JASMINE url:
ECHO http://127.0.0.1:9999/test-jasmine/SpecRunner.html? 
ECHO ----------------------------------------------------
START http://127.0.0.1:9999/test-jasmine/SpecRunner.html? 
grunt unittest
