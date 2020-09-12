<!DOCTYPE html>
<html>
    <head>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
        <script src="../js/script.js" type="text/javascript"></script>
        <title> Ranges </title>
        <link rel="stylesheet" href="../css/style.css" type="text/css">
        <meta charset = "utf-8">
    </head>

    <body>
        <header>
            <h2>Poker - Range Manager</h2>
        </header>

        <?php
            include("./sidebar.php");
        ?>

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