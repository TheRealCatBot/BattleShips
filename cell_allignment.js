var sheet = new Array(11);
var enemySheet = new Array(11);

for (var i = 0; i < 12; i++) {
  sheet[i] = new Array(11);
  enemySheet[i] = new Array(11);
}

var basePosTop = 100;
const baseValueForSquare = 50;
for (let i = 0; i < 12; i++){
    var basePosLeft = 5;
    for (let j = 0; j < 12; j++) {
        var creatingElement = document.createElement("img");
        creatingElement.src = "cell.png";
        creatingElement.className = "droppable";
        creatingElement.style.background = 'cyan';
        creatingElement.setAttribute('draggable', false);
        creatingElement.style.maxHeight = baseValueForSquare + "px";
        creatingElement.style.left = basePosLeft + "px";
        creatingElement.style.position = "absolute";
        creatingElement.id = "x=" + j + " " +"y=" + i ;
        basePosLeft += baseValueForSquare;
        creatingElement.style.top = basePosTop + "px";
        document.body.appendChild(creatingElement);
        sheet[i][j] = creatingElement;
    }
    basePosTop += baseValueForSquare;
}

var enemyBasePosTop = 100;
const baseValueForEnemySquare = 20;

for (let i = 0; i < 12; i++){
  var basePosLeft = 700;
  for (let j = 0; j < 12; j++) {
      var creatingElement = document.createElement("button");
      creatingElement.src = "cell.png";
      creatingElement.className = "clickable";
      creatingElement.style.background = 'grey';
      creatingElement.setAttribute('draggable', false);
      creatingElement.style.height = baseValueForEnemySquare + "px";
      creatingElement.style.width = baseValueForEnemySquare + "px";
      creatingElement.style.left = basePosLeft + "px";
      creatingElement.style.position = "absolute";
      creatingElement.id = "x=" + j + " " +"y=" + i ;
      var tempElement = creatingElement;
      creatingElement.onclick = function(event){enemyCoords("x=" + j + " " +"y=" + i, i*12+j)};
      basePosLeft += baseValueForEnemySquare;
      creatingElement.style.top = enemyBasePosTop + "px";
      document.body.appendChild(creatingElement);
      sheet[i][j] = creatingElement;
  }
  enemyBasePosTop += baseValueForEnemySquare;
}

