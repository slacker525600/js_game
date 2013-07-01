//console.log("hello words");
player = { 
  location : 0,
  items : {},
  color : "#000000"
};
afToDraw = {
  init_draw : function (){
    board = document.getElementById("board");
    var ctx = board.getContext("2d");
    ctx.strokeStyle = "#000000";
    //want to draw hash marks every 5 steps, 
    for (nStep = 0; nStep < 20; nStep++){
      ctx.moveTo(nStep*10, 5);
      ctx.lineTo(nStep*10, 15);
      ctx.stroke();
    }
  },
  draw : function(){
    //console.log(player.color);
    board = document.getElementById("board");
    var ctx = board.getContext("2d");
    ctx.strokeStyle = player.color;
    ctx.moveTo(player.location, 5);
    ctx.lineTo(player.location, 15);
    ctx.stroke();
    //ctx.fillStyle="#FF0000";
    //ctx.fillRect(0,0,150,75);

  }
};

afStep = {
  step : function(){
    var init = document.getElementById("init_qs");
    //console.log(init.innerHTML);
    if (init && init.visibility != "None"){
      init.setAttribute("style", "display:none" );
      var output = document.getElementById("main_output");
      //console.log(output.innerHTML);
      output.innerHTML = "You've taken your first step";
      afToDraw.init_draw();
      color = document.getElementById("color_val");
      //style.color;
      console.log(color.value);
      console.log(color.style);
      player.color = color.value;
    }
    //console.log("got here");
    player.location++;
    afToDraw.draw();
  }
};

//document.addEventListener("click", 
//  afToRun.step(), false);
