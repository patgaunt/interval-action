interval-action
===============

This plugin allows you to run a function on a specific interval (for example only once per day) and also allows you to set a maximum number of times to run.

Basic usage
```javascript
$(function() {
    $.intervalAction({
        cookieName: "MyAction", //the name of your cookie
        actionInterval: 1, //the interval in days
        actionCount: 3, //the maximum number of times to run
        functionToRun: myFunction //the function to run
    });
});

function myFunction(){
  alert("Hello World");
}
```
This will run myFunction once per day, a maximum of 3 times.
