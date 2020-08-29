$(document).ready(function(){
//Hand Object
function Hand(card, freq, color){
  this.card = card;
  this.frequency = freq;
  this.color = color;
}

//HELP FUNCTIONS
function optionsExpand(){
  optionsButton = document.getElementById("optionsButton");
  optionsButton.addEventListener("click", function() {
    this.classList.toggle("active");
    optionsContent = this.nextElementSibling;

    if(optionsContent.style.display === "block") {
      optionsContent.style.display = "none";
    } else {
      optionsContent.style.display = "block";
    }
  });
}

function displayRadioValue(radioName){
  ele = document.getElementsByName(radioName);
  for(i = 0; i < ele.length; i++){
    if(ele[i].checked == true){
      return Number(ele[i].value);
    }
  }
}

function clearRange(){
  rangeHeadline.innerHTML = "";
  for(i = 0; i < cardsButtonHTMLcollection.length; i++){
    cardsButtonHTMLcollection[i].style.backgroundColor = colorFoldHand;
  }
}

function getColor(){
  // Farbe aus ColorPicker auslesen
  colorNumber = displayRadioValue("colorNumber");
  color = document.getElementsByClassName("colorSelector")[colorNumber];

  return color.value;
}

function loadColorPicker(actionID){
  if(!actionID){
    //load actionID failed
    addNewColor();
  }else{
    for(i = 0; i < actionID.length; i++){
      addNewColor(actionID, i);
    }
  }
  document.getElementById("radioButtonColor0").checked = true;
  createButton("addNewColor", "");
}

function addNewColor(actionID, colorNumber){
  if(!(actionID || colorNumber)){
    colorListItemLength = document.getElementsByClassName("colorListItem").length;
    colorNumber = colorListItemLength;
    color = "#FFFFFF";
  }else{
    colorListItemLength = actionID.length;
    color = actionID[colorNumber].color;
  }

  if(colorListItemLength < 5){
    listItem = document.createElement("li");
    listItem.className = "colorListItem";
    document.getElementById("ulColorPicker").appendChild(listItem);

    radioButton = document.createElement("input");
    radioButton.type = "radio";
    radioButton.id = "radioButtonColor" + colorNumber.toString();
    radioButton.name = "colorNumber";
    radioButton.value = (colorNumber).toString();
    listItem.appendChild(radioButton);

    colorPicker = document.createElement("input");
    colorPicker.type = "color";
    colorPicker.className = "colorSelector";
    colorPicker.value = color;
    colorsArray.push(color);
  
    listItem.appendChild(colorPicker);
  }
}

function rangeSlider(){
  slider = document.getElementById("frequency");
  output = document.getElementById("frequencyLabel");
  output.innerHTML = slider.value;

  slider.oninput = function(){
    output.innerHTML = this.value;
  }
}

function pageLoad(){
  optionsExpand();
  frequency.value = "100";
  rangeSlider();
}

function getBrowser(){ 
  usedBrowser = '';
  if((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1 ){
    usedBrowser = '-o-';
  }
  else if(navigator.userAgent.indexOf("Chrome") != -1 ){
    usedBrowser = '-webkit-';
  }
  else if(navigator.userAgent.indexOf("Safari") != -1){
    usedBrowser = '-webkit-';
  }
  else if(navigator.userAgent.indexOf("Firefox") != -1 ){
    usedBrowser = '-moz-';
  }
  else if((navigator.userAgent.indexOf("MSIE") != -1 ) || (!!document.documentMode == true )){ //IF IE > 10
    usedBrowser = '-ms-';
  }  
  return usedBrowser;
}

//CREATE FUNCTIONS
function createButton(buttonType, name){
  button = document.createElement("button");

  if(buttonType == "positionButton"){
    button.name = name;
    button.className = buttonType;
    interfaceViewbox.appendChild(button);
  }else if(buttonType == "cardsButton"){
    button.className = buttonType;
    button.style.display = "none";
    interfaceViewbox.appendChild(button);
  }else if(buttonType == "addNewColor"){
    button.id = buttonType;
    button.innerHTML = "+";
    textfieldContainer.appendChild(button);
    button.onclick = function() {
      addNewColor();
    }
  }else{
    console.log("ERROR: createButton does not exist!")
  }
}

function mouseOverHand(ii){
  document.getElementById("handHeadline").innerHTML = convertNumberToHand(ii);
}
function mouseOutHand(ii){
  document.getElementById("handHeadline").innerHTML = "";
}

function createLabel(labelType, labelText){
  label = document.createElement("div");
  if(labelType == "positionLabel"){
    label.className = labelType;
    label.innerHTML = labelText;
  }else {
    label.className = labelType;
    label.style.display = "none";
    label.innerHTML = labelText;
  }
  interfaceViewbox.appendChild(label);
}

function createPositionInterface(numPlayer){
  offset = 8 - numPlayer;
  positionArray = [ "UTG", "UTG+1", "UTG+2",  "MP", "HJ", "CO", "BTN", "SB", "BB" ];

  for(i = 0; i <= numPlayer+1; i++){ //row
    for(j = 0; j <= numPlayer; j++){ //column
      try{throw i}
      catch(row) {
        try{throw j}
        catch(col) {
          if (row == 1 && col == 0) {
            //RFI text
            createLabel("positionLabel", "RFI");
            continue;
          }
          if((row == 0 && col == 0) || row == col+1 || (col == numPlayer && row == 1)){
            //BLANK
            createLabel("positionLabel", "");
            continue;
          }
          if(row == 0) {
            //row Pos.
            createLabel("positionLabel", positionArray[col+offset]);
            continue;
          }
          if(col == 0) {
            //column Pos.
            createLabel("positionLabel", positionArray[row+offset-1]);
            continue;
          }else{
            if( row == 1 ){
              createButton("positionButton", "RFI " + positionArray[col+offset]);
            }else{
              if (col >= row) {
                createButton("positionButton", positionArray[col+offset] + " vs " + positionArray[row+offset-1] + " RFI");
              }else {
                createButton("positionButton", positionArray[col+offset] + " vs " + positionArray[row+offset-1] + " 3Bet");
              }
            }
          }
        }
      }
    }
  }
}

function createRanges(cards){
  for(i = 0; i <= cards; i++){
    for(j = 0; j <= cards; j++){
      try{throw i}
      catch(row) {
        try{throw j}
        catch(col) {
          switch((row==0) + (col==0)){
            case 1:
              createLabel("cardsLabel", cardsArray[row+col-1]);
              break;
            case 2: 
              createLabel("cardsLabel", "");
              break;
            default:
              createButton("cardsButton", "");
              break;
          }
        }
      }
    }
  }
}

//+++++++++++++++++++++++++++//
//++++++ajax funktions+++++++//
//+++++++++++++++++++++++++++//
function getActionID_getRange_ajax(userID, rangeName, stacksize, rangeTitle){
  $.ajax({
    url: "getactionid.php",
    data: {userID: userID, rangeName: rangeName, stacksize: stacksize, action:rangeTitle},
    dataType: 'JSON',
    type: "POST",
    success: function(actionID) {
      loadColorPicker(actionID);
      getRange_ajax(actionID);
    },
    error: function(e) {
      console.log(e);
      loadColorPicker();
      newHandsArray = new Array(numOfCards*numOfCards);
      newHandsArray.fill(null);
      colorRange(newHandsArray);
      newHandsArray = selectHand(newHandsArray);

      changeViewBackButton(newHandsArray);
    }
  });
}

function getRange_ajax(actionID){
  $.ajax({
    url: "getData.php",
    data: {actionID:JSON.stringify(actionID)},
    dataType: 'JSON',
    type: "POST",
    success: function(loadedRange) {
      newHandsArray = new Array(numOfCards*numOfCards);
      newHandsArray.fill(null);

      for(i = 0; i < loadedRange.length; i++) {
        for(j = 0; j < loadedRange[i].length; j++) {
          newHand = new Hand(Number(loadedRange[i][j].card), Number(loadedRange[i][j].frequency), loadedRange[i][j].color);
          newHandsArray[newHand.card] = [newHand];
        }
      }
      colorRange(newHandsArray);
      newHandsArray = selectHand(newHandsArray);

      changeViewBackButton(newHandsArray);
    },
  });
}

function getActionID_sendRange_ajax(userID, rangeName, stacksize, rangeTitle, handsArray){
  $.ajax({
    url: "getactionid.php",
    data: {userID: userID, rangeName: rangeName, stacksize: stacksize, action:rangeTitle},
    dataType: 'JSON',
    type: "POST",
    success: function(actionID) {
      sendRange_ajax(actionID, handsArray);
      },
    error: function() {
      console.log("ERROR: getActionID to sendRange() faild!");
    }
  });
}

function sendRange_ajax(actionID, handsArray){
  $.ajax({
    url: "sendData.php",
    data: {handsArray:JSON.stringify(handsArray), actionID:JSON.stringify(actionID)},
    datatype: "json",
    type: "POST",
  });
}


//+++++++++++++++++++++++++++//
//+++CHANGE VIEW FUNCTIONS+++//
//+++++++++++++++++++++++++++//

//switch to Range view: Position -> Range
function showRange(numCards, rangeTitle) {
  positionHTMLcollection = document.querySelectorAll(".positionLabel, .positionButton");
  numberOfCardColumns = numCards + 1;
  numberOfCardRows = numCards + 2;
  rangeButtonsArray = document.getElementsByClassName("cardsButton");
  rangeLabelsArray = document.getElementsByClassName("cardsLabel");
  rangeHeadline = document.getElementById("rangeHeadline");
  currentRange = rangeTitle;

  // switch Templates
  interfaceViewbox.style.gridTemplateColumns = "repeat(" + numberOfCardColumns.toString() + ", 1fr)";
  interfaceViewbox.style.gridTemplateRows = "repeat(" + numberOfCardRows.toString() + ", 1fr)";

  //Show rangeHeadline
  rangeHeadline.innerHTML = rangeTitle;

  // hide positionLabel and positionButton
  for(i = 0; i < positionHTMLcollection.length; i++){
    positionHTMLcollection[i].style.display = "none";
  }

  // show Range
  for(j = 0; j < rangeLabelsArray.length; j++){
    rangeLabelsArray[j].style.display = "block";
  }

  for(j = 0; j < rangeButtonsArray.length; j++){
    rangeButtonsArray[j].style.display = "block";
  }

  getActionID_getRange_ajax(userID, rangeName, stacksize, rangeTitle);
}

//switch to Position view: Range -> Positons
function hideRange(numPlayer, handsArray) {
    positionHTMLcollection = document.querySelectorAll(".positionLabel, .positionButton");
    numberOfPlayerColumns = numPlayer + 1;
    numberOfPlayerRows = numPlayer + 3;
    rangeButtonsArray = document.getElementsByClassName("cardsButton");
    rangeLabelsArray = document.getElementsByClassName("cardsLabel");
    rangeHeadline = document.getElementById("rangeHeadline");

    // switch Templates
    interfaceViewbox.style.gridTemplateColumns = "repeat(" + numberOfPlayerColumns.toString() + ", 1fr)";
    interfaceViewbox.style.gridTemplateRows = "repeat(" + numberOfPlayerRows.toString() + ", 1fr)";
    rangeTitle = rangeHeadline.innerHTML; 


    // show  positionLabel and positionButton
    for(i = 0; i < positionHTMLcollection.length; i++){
      positionHTMLcollection[i].style.display = "block";
    }

    // hide Range
    for(i = 0; i < rangeLabelsArray.length; i++){
      rangeLabelsArray[i].style.display = "none";
    }
    for(i = 0; i < rangeButtonsArray.length; i++){
      rangeButtonsArray[i].style.display = "none";
    }

    // send Data to Server
    getActionID_sendRange_ajax(userID, rangeName, stacksize, rangeTitle, handsArray);

    clearRange();
}

function changeViewPositionButton(){
  for(i = 0; i < positionButtonHTMLcollection.length; i++){
    try{throw i}
    catch(ii) {
      positionButtonHTMLcollection[ii].onclick =
      function() {
        showRange(numOfCards, positionButtonHTMLcollection[ii].name);
      };
    }
  }
}

function changeViewBackButton(handsArray){
  document.getElementsByClassName("rangeHeader")[0].onclick =
    function() {
      hideRange(numOfPlayers, handsArray);
      $('.colorListItem').remove();
      $('#addNewColor').remove();
    };
}

//+++++++++++++++++++++//
//+++selecting Hands+++//
//+++++++++++++++++++++//

function selectHand(handsArray){
  for( i = 0; i < cardsButtonHTMLcollection.length; i++){
    try{throw i}
    catch(ii) {
      $(document).mousedown(function() {
        $(cardsButtonHTMLcollection[ii]).bind('mouseover',function(){
          insertHandIntoArray(handsArray, ii);
        });
      })
      .mouseup(function() {
        $(cardsButtonHTMLcollection[ii]).unbind('mouseover');
      });
      $(cardsButtonHTMLcollection[ii]).mousedown(function() {
        insertHandIntoArray(handsArray, ii);
      });

      cardsButtonHTMLcollection[ii].onmouseover = function() {
        mouseOverHand(ii);
      }
      cardsButtonHTMLcollection[ii].onmouseout = function(){
        mouseOutHand(ii);
      }
    }
  }
  return handsArray;
}

function getHandIndex(hand, color){
  handIndex = -1;
  for(i = 0; i < hand.length; i++){
    if(hand[i].color == color){
      handIndex = i;
      break;
    }
  }
  return handIndex;
}

function insertHandIntoArray(handsArray, ii){
  color = getColor();
  if(handsArray[ii] == null){
    //add hand
    handsArray[ii] = [new Hand(ii, frequency.value, color)];
    cardsButtonHTMLcollection[ii].style.background = getColorString(handsArray[ii]);
  }else{
    handIndex = getHandIndex(handsArray[ii], color);
    if(handIndex != -1){
      if(handsArray[ii][handIndex].frequency == frequency.value){
        //delete hand from array
        if(handsArray[ii].length > 1){
          handsArray[ii].splice(handIndex, 1);
          cardsButtonHTMLcollection[ii].style.background = getColorString(handsArray[ii]);
        }else{
          handsArray[ii] = null;
          cardsButtonHTMLcollection[ii].style.background = colorFoldHand;
        }
      }else{
        //just change frequency
        handsArray[ii][handIndex].frequency = frequency.value;
        cardsButtonHTMLcollection[ii].style.background = getColorString(handsArray[ii]);
      }
    }else{
      //different color
      handsUnsorted = handsArray[ii];
      newHand = new Hand(ii, frequency.value, color)
      handsUnsorted.push(newHand);
      
      sumFrequencys = 0;
      handsSorted = new Array();

      for(k = 0; k < handsUnsorted.length; k++){
        sumFrequencys += Number(handsUnsorted[k].frequency);
      }

      if(sumFrequencys > 100){
        frequencyBalance = 100 - newHand.frequency;

        for(i = 0; i < handsUnsorted.length-1; i++){
          if(frequencyBalance == 0){
            handsUnsorted.splice(i, 1);
            continue;
          }

          if(frequencyBalance > handsUnsorted[i].frequency){
            frequencyBalance -= handsUnsorted;
          }else{
            handsUnsorted[i].frequency = frequencyBalance;
            frequencyBalance = 0;
          }
        }
      }
      handsArray[ii] = sortHandsArray(colorsArray, handsUnsorted);
      cardsButtonHTMLcollection[ii].style.background = getColorString(handsArray[ii]);
    }
  }
}

function sortHandsArray(colorsArray, handsUnsorted){
  for(i = 0; i < colorsArray.length; i++){
    for(j = 0; j < handsUnsorted.length; j++){
      if(colorsArray[i] == handsUnsorted[j].color){
        handsSorted.push(handsUnsorted[j]);
      }
    }
  }
  return handsSorted;
}

function getColorString(handsSubArray){
  if(handsSubArray.length == 1){
    colorString = getBrowser() + 'linear-gradient(0deg, ' + handsSubArray[0].color + ' ' + handsSubArray[0].frequency + '%' + ', ' + colorFoldHand + ' ' + handsSubArray[0].frequency + '%)';
    return colorString;
  }

  colorString = getBrowser() + 'linear-gradient(0deg';
  gradientWidth = Number(handsSubArray[0].frequency);

  for(i = 0; i < handsSubArray.length-1; i++){
    colorString += ', ' + handsSubArray[i].color + ' ' + gradientWidth + '%, '+ handsSubArray[i+1].color + ' ' + gradientWidth + '%';
    gradientWidth += Number(handsSubArray[i+1].frequency);
  }
  colorString += ', ' + handsSubArray[handsSubArray.length-1].color + ' ' + gradientWidth + '%, ' + colorFoldHand + ' ' + gradientWidth + '%)';
  return colorString;
}

function colorRange(handsArray){
  for(i = 0; i < cardsButtonHTMLcollection.length; i++){
    try{throw i}
    catch(ii) {
      if(handsArray[ii] == null){
        cardsButtonHTMLcollection[ii].style.background = colorFoldHand;
      }else{
        cardsButtonHTMLcollection[ii].style.background = getColorString(handsArray[ii]);
      }
    }
  }
}

function convertNumberToHand(hand){
  firstCard = (hand) % numOfCards ;
  secondCard = Math.floor(hand / numOfCards);
  if(firstCard == secondCard){
      return cardsArray[firstCard] + cardsArray[secondCard];
  }else if(firstCard < secondCard){
      return cardsArray[firstCard] + cardsArray[secondCard] + "o";
  }
  else{
      return cardsArray[secondCard] + cardsArray[firstCard] + "s";
  }
}
/*/////////////////
// END FUNCTIONS //
*//////////////////

var numOfCards = displayRadioValue("gameType");
var numOfPlayers = displayRadioValue("tablesize") ;
const cardsArray = [ "A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2", "A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2" ];
var colorsArray = Array();
var colorFoldHand = "#2a2a2e"
var interfaceViewbox = document.getElementsByClassName("interfaceViewbox")[0];
var textfieldContainer = document.getElementsByClassName("textfieldContainer")[0];
var currentRange = "";

var frequency = document.getElementById("frequency");
var userID = 10;
var rangeName = "6max_Range"
var stacksize = "100BB+";

pageLoad();

interfaceViewbox.style.gridTemplateColumns = "repeat(7, 1fr)";
interfaceViewbox.style.gridTemplateRows = "repeat(9, 1fr)"

createPositionInterface(numOfPlayers);
createRanges(numOfCards);

var positionButtonHTMLcollection = document.getElementsByClassName("positionButton");
var cardsButtonHTMLcollection = document.getElementsByClassName("cardsButton");
changeViewPositionButton();

});  //document.ready FUNCTIONS ENDS