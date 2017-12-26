$(document).ready(function () {
    var imageArray = ["Images\\test.jpg", "Images\\hamburger.jpg", "Images\\womenFace.jpg", "Images\\camera.jpg", "Images\\phone.jpg"];
    var textArray = ["Test Yourself!", "Food Facts!", "Fade Into You", "Take A Pic", "Watch Out"];

    var dropBoxDiv =$("#videoDropBox");
    var star = $("#onlyStar");

    var dropBoxHeader = $("#dropBoxHeader");
    var dropBoxFirstHeader = $("#firstElementHeader");
    var dropBoxBody = $("#dropBox");

    var videoPlayer = $("#videoPlayer");

    var isStarActive = false;
    var myTimer;

    setTimeout(function () {
        dropBoxDiv.click();
        star.animate({
            height: 'toggle'
        });
    },5000);

    //Set star menu elements.
    imageArray.forEach(function(entry, index) {
        //Create elements.
        var div = $("<div></div>");
        var floatDiv = $("<div></div>");
        var img = $("<img>");
        var text = $("<i></i>");
        var arrow = $("<i></i>");

        //Add attributes to div element.
        div.addClass("starMenuRow");
        div.css('display', 'table');

        div.hover(function(){
            $(this).css("background-color", "rgba(0, 0, 0, 0.3)");
            clearMenuFloatInfo();
            $(this).children(':last-child').css('display', 'block');
        }, function(){
            $(this).css("background-color", "rgba(50, 50, 50, 0.3)");
        });

        floatDiv = createFloatMenu(floatDiv, index);

        //Add attributes to text element.
        text.html(textArray[index]);
        text.addClass("starMenuText");
        text.css('display', 'table-cell');


        //Add attributes to image element.
        img.addClass("starMenuImg");
        img.attr('src', entry);

        //Add attributes to arrow element.
        arrow.addClass('fa fa-arrow-right');
        arrow.css('display', 'table-cell');
        arrow.css('font-size', '8px');

        //Add elements to Dom
        div.append(img);
        div.append(text);
        div.append(arrow);
        div.append(floatDiv);

        dropBoxBody.append(div);
    });

    //Clear floating info boxes.
    function clearMenuFloatInfo() {
        dropBoxBody.children().each(function(val, index){
            $(this).children(':last-child').css('display', 'none');
        });
    }

    //Div with info float right to star menu
    function createFloatMenu(floatDiv, index) {
        var headerText = $("<i></i>");
        var hr = $("<hr>");
        var img = $("<img>");
        var textDiv =$("<div></div>");
        var mainHeaderText = $("<i></i>");
        var mainText = $("<i></i>");
        var facebookButtom = $("<button></button>");
        var twitterButton = $("<button></button>");

        headerText.html(textArray[index]);
        headerText.css('font-size', '12px');
        headerText.css('color', 'white');

        hr.css('margin', '0');
        hr.css('background-color', 'rgba(255, 255, 255, 0.6)');
        hr.css('height', '0.5px');
        hr.css('border', '0');

        //Add attributes to image element.
        img.addClass("starMenuImg");
        img.css('margin', '0');
        img.attr('src', imageArray[index]);
        img.css('width', '35%');
        img.css('height', '100%');
        img.css('float', 'left');

        textDiv.addClass("floatMenuTextDiv")

        mainHeaderText.html("header");
        mainHeaderText.addClass("floatMenuMainHeader");
        mainHeaderText.css('font-size', '14px');

        mainText.html("text text text text text text text text text text text text text text text text text text text");
        mainText.addClass("floatMenuMainText");
        mainText.css('font-size', '12px');

        facebookButtom.addClass("facebookButtom");
        twitterButton.addClass("twitterButton");
        facebookButtom.append($("<i></i>").addClass("fa fa-facebook"));
        twitterButton.append($("<i></i>").addClass("fa fa-twitter"));

        textDiv.append(mainHeaderText);
        textDiv.append(mainText);
        textDiv.append(facebookButtom);
        textDiv.append(twitterButton);

        floatDiv.addClass("floatMenu");
        floatDiv.css('display', 'none');

        floatDiv.append(headerText);
        floatDiv.append(hr);
        floatDiv.append(img);
        floatDiv.append(textDiv);

        return floatDiv;
    }

    //open/close star menu.
    function movieOrStarClick(){
        $("#dropBox").animate({
            height: 'toggle'
        });

        dropBoxFirstHeader.animate({
            height: 'toggle'
        });

        dropBoxHeader.css("background-color") === "rgba(0, 0, 0, 0)" ?  dropBoxHeader.css("background-color", "rgba(0, 0, 0, 0.3)"): dropBoxHeader.css("background-color", "rgba(0, 0, 0, 0)");
        dropBoxBody.css("background-color") === "rgba(0, 0, 0, 0)" ?  dropBoxBody.css("background-color", "rgba(50, 50, 50, 0.3)"): dropBoxBody.css("background-color", "rgba(0, 0, 0, 0)");
    }

    //Play video
    function play() {
        videoPlayer.get(0).play();
    }

    //Stop video
    function stop() {
        videoPlayer.get(0).pause();
    }

    /////////////////////////////////////////Listeners//////////////////////////////////////////////
    //Click listener on star menu.
    dropBoxDiv.click(function () {
        if (dropBoxFirstHeader.css('display') === 'none') {
            stopTimer();
            stop();
            movieOrStarClick();
            isStarActive = true;
        }else{
            play();
            movieOrStarClick();
            isStarActive = false;
            clearMenuFloatInfo();
            startTimer();
        }
    });

    //Click listener on video player.
    videoPlayer.click(function () {
        if (star.css('display') !== 'none' && dropBoxFirstHeader.css('display') === 'none') {
            stopTimer();
            stop();
            movieOrStarClick();
            isStarActive = true;
        }
    });

    //Listen to control play button
    videoPlayer.on('play', function() {
        if (star.css('display') !== 'none' && dropBoxFirstHeader.css('display') !== 'none' && isStarActive) {
            play();
            movieOrStarClick();
            isStarActive = false;
            clearMenuFloatInfo();
            startTimer();
        }
    });

    //After 20 seconds without reaching the star will make an effect
    function startTimer() {
        myTimer = setTimeout(function(){
            for(var i = 0; i <= 1; i+=0.2) {
                star.animate({opacity: i});
            }
            startTimer();
        }, 20000);
    }

    //You star have been reached => stop timer
    function stopTimer() {
        clearTimeout(myTimer);
    }
});