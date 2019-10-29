var list = [
    {
        teaName: "black",
        teaDescription : "Black tea is a type of tea that is more oxidized than oolong, green, and white teas. Black tea is generally stronger in flavour than the less oxidized teas. All four types are made from leaves of the shrub (or small tree) Camellia sinensis. Two principal varieties of the species are used – the small-leaved Chinese variety plant (C. sinensis var. sinensis), used for most other types of teas, and the large-leaved Assamese plant (C. sinensis var. assamica), which was traditionally mainly used for black tea, although in recent years some green and white teas have been produced. In China, where black tea was discovered, the beverage is called red tea due to the color of the oxidized leaves when processed appropriately."    ,
        steepTime : "03:45",
        temp : 210,
        seconds: 225
    },
    {
        teaName: "green",
        teaDescription : "Green tea is a type of tea that is made from Camellia sinensis leaves and buds that have not undergone the same withering and oxidation process used to make oolong teas and black teas. Green tea originated in China, but its production and manufacture has spread to many other countries in Asia. Several varieties of green tea exist, which differ substantially based on the variety of C. sinensis used, growing conditions, horticultural methods, production processing, and time of harvest. Although there has been considerable research on the possible health effects of consuming green tea regularly, there is little evidence that drinking green tea has any effects on health.",
        steepTime : "00:05",
        temp : 170,
        seconds: 5
    },
    {
        teaName: "puerh",
        teaDescription : "Pu'er traditionally begins as a raw product known as 'rough' máochá (毛茶, literally 'fuzzy/furry tea') and can be sold in this form or pressed into a number of shapes and sold as 'raw' shēngchá (生茶, literally 'raw tea'). Both of these forms then undergo the complex process of gradual fermentation and maturation with time. The wòduī (渥堆) fermentation process developed in 1973 by the Kunming Tea Factory created a new type of pu'er tea. This process involves an accelerated fermentation into 'ripe' shóuchá (熟茶, literally 'ripe tea') which is then stored loose or pressed into various shapes. The fermentation process was adopted at the Menghai Tea Factory shortly after and technically developed there.[5] The legitimacy of shóuchá is disputed by some traditionalists in contrast to aged teas. All types of pu'er can be stored to mature before consumption, which is why it is commonly labeled with the year and region of production.",
        steepTime : "03:00",
        temp : 200,
        seconds: 180
    },
    {
        teaName:  "white",
        teaDescription : "White tea may refer to one of several styles of tea which generally feature young or minimally processed leaves of the Camellia sinensis plant.Currently there is no generally accepted definition of white tea and very little international agreement; some sources use the term to refer to tea that is merely dried with no additional processing,[1] some to tea made from the buds and immature tea leaves picked shortly before the buds have fully opened and allowed to wither and dry in natural sun,[citation needed] while others include tea buds and very young leaves which have been steamed or fired before drying.[2] Most definitions agree, however, that white tea is not rolled or oxidized, resulting in a flavour characterized as 'lighter' than most green or traditional black teas",
        steepTime : "02:30",
        temp : 180,
        seconds: 150
    }
];

var tempMode = "F";
var selectedTemp;

function btnStartClicked()
{
    var secondCount = parseInt(secondsHdn.innerText)
    startTimer(secondCount);  
    document.getElementById("btnStart").disabled = true;
    
}

function selectedTeaChanged(index)
{
    teaDescription.innerText= list[index].teaDescription;
    steepTime.innerText= list[index].steepTime;
    waterTemp.innerText = list[index].temp.toString() + "°F";
    secondsHdn.innerText= list[index].seconds;
    selectedTemp = list[index].temp;
    tempMode = "F";
}

function setLoadEvents()
{
    teaDescription.innerText = "Welcome to TeaTime! Please select your type of tea to get started."
    steepTime.innerText = "00:00";
    waterTemp.innerText = "0°F";
}

function startTimer(duration) {

    var timer = duration, minutes, seconds;
    var myTimer = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        steepTime.innerText = minutes + ":" + seconds;

        if (--timer < 0) {
            clearInterval(myTimer);
            steepTime.innerText = "Your tea is done!"
            window.alert("Your tea is done!");
            document.getElementById("btnStart").disabled = false;
            
        }

    }, 1000);

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