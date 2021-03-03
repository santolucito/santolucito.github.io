'use strict'


// Initialise application
var dataArray = [];
Board.init('board');
Board.dataArray = dataArray;
drawSpiral(Board.ctx, Board.dom);
Pen.init(Board.ctx);
document.getElementById("doneButton").onclick = Board.clearMemory.bind(Board)
Pointer.onEmpty = _.debounce(Board.storeMemory.bind(Board), 1500);

// Attach event listener
var pointerDown = function pointerDown(e) {
  // Initialize pointer
  var pointer = new Pointer(e.pointerId);
  pointer.set(Board.getPointerPos(e));

  // Get function type
  Pen.setFuncType(e);
  if (Pen.funcType === Pen.funcTypes.menu) Board.clearMemory();
  else drawOnCanvas(e, pointer, Pen);
}
var pointerMove = function pointerMove(e) {
  if (Pen.funcType && (Pen.funcType.indexOf(Pen.funcTypes.draw) !== -1)) {

    var pointer = Pointer.get(e.pointerId);
    drawOnCanvas(e, pointer, Pen);
  }
}
var pointerCancel = function pointerLeave(e) {
  Pointer.destruct(e.pointerId);
}
Board.dom.addEventListener('pointerdown', pointerDown);
Board.dom.addEventListener('pointermove', pointerMove);
Board.dom.addEventListener('pointerup', pointerCancel);
Board.dom.addEventListener('pointerleave', pointerCancel);


// Draw method
function drawOnCanvas(e, pointerObj, Pen) {
  if (pointerObj) {
    pointerObj.set(Board.getPointerPos(e));
    Pen.setPen(Board.ctx, e);

    if (pointerObj.isFreshLine()) {
      pointerObj.pos0.x = pointerObj.pos1.x - 1;
      pointerObj.pos0.y = pointerObj.pos1.y - 1;
    }
    Board.ctx.beginPath();
    Board.ctx.moveTo(pointerObj.pos0.x, pointerObj.pos0.y)
    Board.ctx.lineTo(pointerObj.pos1.x, pointerObj.pos1.y);
    Board.ctx.closePath();
    Board.ctx.stroke();
    
    var drawData = {x: pointerObj.pos0.x, 
                y: pointerObj.pos0.y, 
                pressure: e.pressure, 
                timestamp: Date.now()};
    dataArray.push(drawData);

    pointerObj.pos0.x = pointerObj.pos1.x;
    pointerObj.pos0.y = pointerObj.pos1.y;
    
  }
}
