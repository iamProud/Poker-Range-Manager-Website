<!DOCTYPE html>
<html>
    <head>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
        <title> Ranges | Options </title>
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
            <div id="optionsContent">
                <ul>
                    <li> Game Type: <label> NLHE <input value="13" name="gameType" type="radio" checked> </label> &nbsp; <!-- <label> 6+ <input name="gameType" value="9" type="radio"> </label> --> </li> 
                    <li> tablesize: <!--<label> 9Max <input value="9" name="tablesize" type="radio" > </label> &nbsp; --> <label> 6Max <input value="6" name="tablesize" type="radio" checked> </label> </li>
                </ul>
            </div>
        </div>

        <footer></footer>
    </body>

</html>
