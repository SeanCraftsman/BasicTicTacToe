var TICK = '○';
var CROSS = '×';

var model = [];
var cells = [];

var flag; // 用于表示轮到谁了

var newGame = function(){
    for (i=0; i<3; i++)
        for (j=0; j<3; j++){
            model[i][j] = 0;
            cells[i][j].text = ' ';
        }
    flag = 1;
}

var freshView = function(){
    var i, j;

    for (i=0; i<3; i++)
        for (j=0; j<3; j++)
            if (model[i][j] == 1)
                cells[i][j].text = CROSS;
            else if (model[i][j] == 2)
                cells[i][j].text = TICK;
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



window.onload = function(){
    var i, j;
    
    // 初始化二维数组
    for (i=0; i<3; i++){
        model[i] = [];
        cells[i] = [];
    }

    for (i=0; i<3; i++)
        for (j=0; j<3; j++){
            cells[j][i] = document.getElementById('cell-' + i + '-' + j);

            (function(j, i){
                cells[i][j].onclick = function(){
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
                        newGame();
                    }
                    
                }
            })(i, j);

        }

    newGame();

}