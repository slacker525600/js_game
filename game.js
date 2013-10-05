//note to self, nano needs replace. 

aacBoardCells = new Array(); 
nSquaresPerRow = 11;
nPixelsPerSquare = 20;
nBoardPix = nSquaresPerRow * nPixelsPerSquare; 
aeColorMap = { 
  castle:"black", 
  village:"LightSlateGray", 
  farm:"green", 
  desert:"BlanchedAlmond",
  forest:"ForestGreen", 
  water:"aqua", 
  mountain:"gray"
};

afBoardFuncs = {
 new_cell: function(x,y){ 
  //generates board cells for initialization
  cToReturn = {terrain:"", contents:"", x_loc:x, y_loc:y};
  //middle of all terrains are castles, so range 0-10 means 5 is middle, 
  s = 5;
  if (Math.abs(x) <= 1 && Math.abs(y) <= 1){
    if (x == 0 && y == 0){
      cToReturn.terrain = "castle";
    } else {
      cToReturn.terrain = "village";
    }
  } else if (Math.abs(x) + Math.abs(y) < (nSquaresPerRow-3) / 2) { 
    //basically... need fields to support the city population around the city.  
    cToReturn.terrain = "farm";
  } else {
    dRand = Math.random();
    //dont want to do random distribution, but ... not sure how to best do this, may just stick with certain set
    if (dRand < .35) {
      cToReturn.terrain = "mountain"; 
    } else if(dRand < .40){
      cToReturn.terrain = "desert";
    } else if(dRand < .95){
      cToReturn.terrain = "forest";
    } else {
      cToReturn.terrain = "water";
    }
  }
  return cToReturn;
 },

 init_board : function() {

  // should the board know where the cells are, laid out logically? does it matter? 
  // not every cell will change every turn, so ... why not
  nRange = (nSquaresPerRow -1)/2;
  for (x = 0-nRange; x <= nRange; x++){
    acToAppend = new Array();
    for (y = 0-nRange; y <= nRange; y++){
      acToAppend.push(afBoardFuncs.new_cell(x,y));
    }
    aacBoardCells.push(acToAppend);
  }
 }, 
 start_pixels_from_cell:function(cCell){
   
   nXPix = nPixelsPerSquare *(nSquaresPerRow -1) / 2 + cCell.x_loc * nPixelsPerSquare;
   nYPix = nPixelsPerSquare *(nSquaresPerRow -1) / 2 + cCell.y_loc * nPixelsPerSquare;

   return [nXPix, nYPix];
 },
 draw_cell : function (cCell){
  anPix = afBoardFuncs.start_pixels_from_cell(cCell); 
  nxPixel = anPix[0];
  nyPixel = anPix[1];

  board = document.getElementById("board");
  var ctx = board.getContext("2d");
  ctx.strokeStyle = aeColorMap[cCell.terrain]; 
  ctx.fillStyle = aeColorMap[cCell.terrain];
  console.log(ctx.strokeStyle , aeColorMap[cCell.terrain], cCell.terrain, nyPixel, nxPixel);

  //ctx.fillStyle="#FF0000";
  ctx.fillRect(nxPixel, nyPixel, nPixelsPerSquare, nPixelsPerSquare);
  ctx.stroke();
 }, 
 draw_board: function() {
  for (var nRow =0 ; nRow < aacBoardCells.length; nRow ++) { //
    acRow = aacBoardCells[nRow]; //){
    for (nCol = 0; nCol < acRow.length; nCol++) { 
      afBoardFuncs.draw_cell(acRow[nCol]);
    }
  }
 },

 create_board : function(){
  //create the board element
  var board = document.getElementById("board_div");
  var canvas = document.createElement('canvas');
  canvas.width = nBoardPix;
  canvas.height = nBoardPix;
  canvas.id = "board";
  board.appendChild(canvas);
  
  afBoardFuncs.init_board();
  afBoardFuncs.draw_board();
 } 

};

acCharacters = {};

afEvents = {
  start : function(){
    // you awaken in a bed, only option is examine. 
  }
};

//no impact on location, use senses to gather new knowledge
// if using memory, lose 1 less reinforced gain 3,
// using senses adds to the abilities, up to a certain point,
// new observations add more, smelling something new adds better than sitting there smelling the same thing.
// need to have a set of observable objects with which to interact.
// old plan involved list of things you could add to, but ... 
afActions = {
 examine : function(cCharacter) {
 }, 
 get_up : function(cCharacter) {
   //only available from seated or lying down.
 },
 sit : function (cCharacter) {
   //requires chair 
   // aids reading. regain strength slowly use less energy
 },
 lie_down:function(cCharacter){
   //can lie down anywhere ... impact varies by location.
 },
 init_fight: function(cCharacter){
   //requires other person / creature nearby
 },
 take: function(cCharacter){
   //requires something to take, must examine before this option opens up. 
 }, 
 move: function(cCharacter) {
 }
};



afPeople = {
  populate_board: function() {
    nTotalPopulation = 1000;
    fCityDist = .8; //city also includes working the fields, non adventurers
    
  }
};

//console.log("hello words");
base_character = { 
  is_player:false,
  location : [0,0],
  characteristics: { 
    age:0,
    sense:{
     vision:0,
     hearing:0,
     taste:0,
     touch:0,
     smell:0
    },
    knowledge:{ 
     map:{},
     skills:{},
     people:{},
     items:{},
     books:{} // all dat fancy book lernin better teach u sumtin
    },
    memory:0, // should go up 1 each turn, until you reach old age
    strength:0,
    dexterity:0,
    coordination:0,
    willpower:0,
    charisma:{
      //not the buffy character
      //want this to be more complicated than a simple number, 
      //talking to lots of farmers should not help you win over the king ..different strokes for different folks.
    },
    magic:0,
    speed:0,
  },
  items : {
  },
  color : "#000000",
  go : function(){
    //need to have preselected an action. can read programatic window for step to take. 
    // not there yet, first step ... define actions. how to select. 
    //base function for non play
    if(!is_player){
      go_about_day();
    }
  }
};

var player = base_character;
player.is_player = true;

afStep = {
  step : function(){
    //console.log(aacBoardCells);
    if (aacBoardCells.length == 0){
      
      var init = document.getElementById("init_qs");

      if (init && init.visibility != "None"){

        init.setAttribute("style", "display:none" );
        var output = document.getElementById("main_output");

        output.innerHTML = "You've taken your first step";

        color = document.getElementById("color_val");
        //style.color;
        player.color = color.value;
      }
      afBoardFuncs.create_board();
      
      afPeople.populate_board();
    }

    player.go();
    afToDraw.draw();
  }
};
