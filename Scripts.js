var list;
var tempMode = "F";
var selectedTemp;
var isCustomTime = false;
var timerSeconds = 0;
var displayedTime;

function btnStartClicked()
{
    var input = document.getElementById("customTime").value;
    if(input == 0 || input == "00:00" || input == " ")
    {
        var secondCount = parseInt(secondsHdn.innerText);
        startTimer(secondCount); 
    }else if(validateString(input) == false)
    {
        alert("Custom time format is not valid! Make sure it is in HH:MM format. ex '05:32'")
    }else{
        startTimer(timerSeconds); 
    }    
}

function validateString(input)
{

    if (input.match(/^\d{1,2}:\d{2}([ap]m)?$/)) {
        var arr = input.split(':');
        var seconds = (parseInt(arr[0]) * 60) + parseInt(arr[1]);
        timerSeconds = seconds;
        return true;
    }else{
        return false;
    }
}

function selectedTeaChanged()
{
    var index = document.getElementById("select").selectedIndex;
    if(document.getElementById("intervalID").textContent == 'go'){
        stopInterval();
    }
    teaDescription.innerText= list[index].teaDescription;
    steepTime.innerText= list[index].steepTime;
    displayedTime = list[index].steepTime;
    waterTemp.innerText = list[index].temp.toString() + "°F";
    if(list[index].temp == 0){
        waterTemp.innerText = "Can be brewed hot or cold";
    }
    secondsHdn.innerText= list[index].seconds;
    selectedTemp = list[index].temp;
    tempMode = "F";
    document.getElementById("btnStart").disabled = false;
}

function setLoadEvents()
{
    var jsonString = getJSON('https://teatime-6336b.firebaseio.com/.json');
    list = JSON.parse(jsonString);
    var i;
    var selectBox = document.getElementById("select");

    for(i = 0; i < Object.keys(list).length; i++){
        var option = document.createElement("option");
        option.text = list[i].teaName;
        selectBox.add(option);
    }

    teaDescription.innerText = "Welcome to TeaTime! Please select your type of tea to get started.";
    steepTime.innerText = "00:00";
    waterTemp.innerText = "0°F";

}

//https://stackoverflow.com/questions/12460378/how-to-get-json-from-url-in-javascript
function getJSON(url) {
    var resp ;
    var xmlHttp ;

    resp  = '' ;
    xmlHttp = new XMLHttpRequest();

    if(xmlHttp != null)
    {
        xmlHttp.open( "GET", url, false );
        xmlHttp.send( null );
        resp = xmlHttp.responseText;
    }

    return resp ;
}


function startTimer(duration) {
    document.getElementById('intervalID').textContent = 'go';
    if(duration === 0){

    }else{
        var timer = duration, minutes, seconds;
         var myTimer = setInterval(function () {

            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            steepTime.innerText = minutes + ":" + seconds;

            if(document.getElementById('intervalID').textContent == 'stop'){
                clearInterval(myTimer);
                steepTime.innerText = displayedTime;
                return;
            }

            if (--timer < 0) {
                playAudio();
                clearInterval(myTimer);
                steepTime.innerText = "Your tea is done!"
                document.getElementById("btnStart").disabled = false;
            }

        }, 1000);

    }

    //basis of the timer mechanics taken from https://stackoverflow.com/questions/20618355/the-simplest-possible-javascript-countdown-timer
} 
function temperatureToggle()
{
    if (tempMode === "F"){
       waterTemp.innerText = convertToCentigrade(selectedTemp) + "°C";
       tempMode = "C";
       btnConvert.innerText = "°F";
    }else{
        waterTemp.innerText = convertToFahrenheit(selectedTemp) + "°F";
        tempMode = "F";
        btnConvert.innerText = "°C";
    }
}

function convertToCentigrade(temp)
{
    var newTemp;
    newTemp = (5/9) * (temp -32);
    newTemp = Math.round(newTemp);
    selectedTemp = newTemp;
    return newTemp;
}

function convertToFahrenheit(temp)
{
    var newTemp;
    newTemp = temp * (9/5) + 32;
    newTemp = Math.round(newTemp);
    selectedTemp = newTemp;
    return newTemp;
}

function buttonHover(s)
{
    if(s === 'in'){
         document.getElementById('btnStart').style.backgroundColor = 'darkGray';
    }else{
        document.getElementById('btnStart').style.backgroundColor = 'transparent';
    }
}

function stopInterval(){
   document.getElementById('intervalID').textContent = 'stop';
}

function playAudio(){
    var soundDone = new Audio("alert.wav");
    soundDone.play();
}