TICK = 'O';
CROSS = 'X';

var model = [];
var cells = [];

var flag; // 用于表示轮到谁了
var mode = "2P";

var clearText = function(parent){
      while(true){
      if(parent.firstChild){
        parent.removeChild(parent.firstChild);
      }
      else{
          break;
      }
  }
}

var newGame = function(){
    for (i=0; i<3; i++)
        for (j=0; j<3; j++){
            model[i][j] = 0;
            clearText(cells[i][j]);
        }
    flag = 1;
}

var freshView = function(){
    var i, j;
    var TICK = document.createElement("img");
    TICK.setAttribute("src","img/tick.png");
    var CROSS = document.createElement("img");
    CROSS.setAttribute("src","img/cross.png");
    for (i=0; i<3; i++)
        for (j=0; j<3; j++)
            if (model[i][j] == 1 && cells[i][j].childNodes.length <= 1){
                cells[i][j].appendChild(CROSS);
            }
            else if (model[i][j] == 2 && cells[i][j].childNodes.length <= 1){
                cells[i][j].appendChild(TICK);
            }
}

var checkWin = function(x, y){

    // 检查 X 方向
    if (model[x][y] != 0 && model[0][y] == model[1][y] && model[0][y] == model[2][y])
        return 1;

    // 检查 Y 方向
    if (model[x][y] != 0 && model[x][0] == model[x][1] && model[x][0] == model[x][2])
        return 1;

    // 如果在 \ 方向
    if (x == y)
        // 检查 \ 方向
        if (model[0][0] != 0 && model[0][0] == model[1][1] && model[0][0] == model[2][2])
            return 1;

    // 如果在 / 方向
    if ( ( x == 2 && y == 0 ) || ( x == 0 && y == 2 ) || ( x == 1 && y == 1 ) ) 
        // 检查 / 方向
        if (model[2][0] != 0 && model[2][0] == model[1][1] && model[2][0] == model[0][2])
            return 1;

    return 0;
}

var checkFull = function(){
    for (i=0; i<3; i++)
        for (j=0; j<3; j++){
            if(model[i][j] == 0){
                return false;
            }
        }
    return true;
}

var computePos = function(){
    for(var i=0; i < 3; i++){
        for(var j=0; j < 3; j++){
            if(model[i][j] == 0){
                model[i][j] = 1;
                if(checkWin(i,j)){
                    return [i,j];
                }
                else{
                    model[i][j] = 0;
                }
            }
        }
    }
    for(var i=0; i < 3; i++){
        for(var j=0; j < 3; j++){
            if(model[i][j] == 0){
                model[i][j] = 2;
                if(checkWin(i,j)){
                    model[i][j] = 1;
                    return [i,j];
                }
                else{
                    model[i][j] = 0;
                }
            }
        }
    }
    
    do{
        var i = Math.floor(Math.random()*3);
        var j = Math.floor(Math.random()*3);
    }while(model[i][j] != 0);
    console.log("in compute i:"+i+" j:"+j);
    model[i][j] = 1;
    return [i,j];
}

var autoPlay = function(){
    var pos = computePos();
    console.log("out the compute i:"+pos[0]+" j:"+pos[1]);
    freshView();
    if (checkWin(pos[0], pos[1])){
        alert("电脑胜利！");
        newGame();
    }
    if (checkFull()){
        alert("平局！");
        newGame();
    }
}



window.onload = function(){
    var i, j;
    // 初始化二维数组
    for (i=0; i<3; i++){
        model[i] = [];
        cells[i] = [];
    }
    var singlePlayer = document.getElementById("1P");
    singlePlayer.onclick = function(){
        mode = "1P";
        newGame();
        console.log("1 player");
    }

    var twoPlayer = document.getElementById("2P");
    twoPlayer.onclick = function(){
        mode = "2P";
        newGame();
        console.log("2 players");
    }

    for (i=0; i<3; i++)
        for (j=0; j<3; j++){
            cells[j][i] = document.getElementById('cell-' + i + '-' + j);

            (function(j, i){
                cells[i][j].onclick = function(){
                    if(mode == "2P"){
                        if (model[i][j] == 0){
                            model[i][j] = flag + 1;    
                        }
                        else{
                            return;
                        }

                        if (flag)
                            flag = 0;

                        else
                            flag = 1;

                        freshView();

                        if (checkWin(i, j)){
                            if (flag)
                                alert("用 " + CROSS + " 的选手胜利！");
                            else
                                alert("用 " + TICK + " 的选手胜利！");
                            newGame();
                        }

                        if (checkFull()){
                            alert("平局！");
                            newGame();
                        }
                    }
                    else{
                        if (model[i][j] == 0){
                            model[i][j] = 2;    
                        }
                        else{
                            return;
                        }
                        freshView();
                        if (checkWin(i, j)){
                            alert("玩家胜利！");
                            newGame();
                        }
                        if (checkFull()){
                            alert("平局！");
                            newGame();
                        }
                        autoPlay();
                    }
                    
                }
            })(i, j);

        }

    newGame();

}