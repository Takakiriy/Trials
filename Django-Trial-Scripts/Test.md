# Test of Django-Trial-Scripts

## A.InstallDjango

1. Download Windows x86-64 executable installer from https://www.python.org/downloads/release/python-372/
2. Move `python-3.7.2-amd64.exe` file to `A.InstallDjango` folder
3. Double click `A.InstallDjango\InstallAndRun.bat` file
4. __Check__ if the rocket image is shown in opened browser


## B.Application

1. If this test is first test, do the test of "A.InstallDjango"
2. Double click `B.Application\InstallAndRun.bat` file
3. __Check__ if "Hello, Django!!" text is shown in opened browser


## C.URL_Parameter

1. If this test is first test, do the test of "A.InstallDjango"
2. Double click `C.URL_Parameter\InstallAndRun.bat` file
3. __Check__ if [please send msg parameter!] text is shown in opened browser
4. Press "Enter" key in the pausing command prompt
5. __Check__ if [you typed: "hello".] text is shown in opened browser
6. Press "Enter" key in the pausing command prompt
7. __Check__ if [your id: 123, name: "taro".] text is shown in opened browser


## D.ApplicationTemplate

1. If this test is first test, do the test of "A.InstallDjango"
2. Double click `D.ApplicationTemplate\InstallAndRun.bat` file
3. __Check__ if [Hello/Index] text is shown in opened browser
4. __Check__ if "Jump" hyper-link jumps to `127.0.0.1:8000/hello/`


## E.Form

1. If this test is first test, do the test of "A.InstallDjango"
2. Double click `E.Form\InstallAndRun.bat` file
3. Input any keyword
4. __Check__ if input keyword was shown


## F.FormClass

1. If this test is first test, do the test of "A.InstallDjango"
2. Double click `F.FormClass\InstallAndRun.bat` file
3. Input name, mail address and age
4. __Check__ if input name, mail address and age were shown


## G.DataBase

1. If this test is first test, do the test of "A.InstallDjango"
2. Double click `G.DataBase\InstallAndRun.bat` file
3. __Check__ if Mario and Peach were shown in the table
4. __Check__ if admin (=user name) can log in at the page of Log in.
    The password is shown in the command prompt


H.DataBaseCRUD

1. If this test is first test, do the test of "A.InstallDjango"
2. Double click `H.DataBaseCRUD\InstallAndRun.bat` file
3. __Check__ if Mario and Peach were shown in the table
4. __Check__ if the table is filtered by user input ID
5. Click [ Create ] button at the left top of the page,
    input name, mail, age, birthday,
    __Check__ if new line was shown
6. Click any [ Update ] button, change any attribute,
    __Check__ if new attribute value was shown
7. Click any [ Delete ] button,
    __Check__ if the deleting attributes was shown,
    __Check__ if the line was deleted


