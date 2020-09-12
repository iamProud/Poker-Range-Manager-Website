<!DOCTYPE html>
<html>
    <head>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
        <script src="./js/script.js" type="text/javascript"></script>
        <title> Ranges </title>
        <link rel="stylesheet" href="./css/style.css" type="text/css">
        <meta charset = "utf-8">
    </head>

    <body>
        <header>
            <h2>Poker - Range Manager</h2>
        </header>

        <div id="sidebar">
            <button type="button" id="optionsButton" >Range Editor</button>    
            <div id="optionsContent">
                <ul>
                    <li> Game Type: <label> NLHE <input value="13" name="gameType" type="radio" checked> </label> &nbsp; <!-- <label> 6+ <input name="gameType" value="9" type="radio"> </label> --> </li> 
                    <li> tablesize: <!--<label> 9Max <input value="9" name="tablesize" type="radio" > </label> &nbsp; --> <label> 6Max <input value="6" name="tablesize" type="radio" checked> </label> </li>
                </ul>
            </div>
            <button type="button" id="optionsButton" >options</button>
        </div>

        <div class="mainContainer">
            <div class="interfaceViewbox">
                <div class="rangeHeader" >
                    <div id="rangeHeadline"></div>
                    <div id="handHeadline"></div>
                </div>
            </div>
            <div id="inputContainer">
                <div  class="frequencyContainer" >
                    <input type="range" min="1" max="100" value="100" step="1" class="slider" id="frequency" orient="vertical" >
                    <div id="frequencyLabel">  </div>
                </div>

                <div class="textfieldContainer">
                    <ul id="ulColorPicker">
                    </ul>
                </div>
            </div>
        </div>

        <footer></footer>
    </body>

</html>
