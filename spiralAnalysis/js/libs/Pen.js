'use strict'

var Pen = (function() {
  var pen = {
    colors: {
      fg: '#555',
      bg: '#FFF'
    },
    lineWidth: 4,
    type: 'mouse',
    lineJoin: 'round',
    funcType: null,
    funcTypes: {
      draw: 'draw',
      erase: 'draw erase',
      menu: 'menu'
    },
    init: function init(context) {
      context.lineJoin = this.lineJoin;
      context.lineWidth = this.lineWidth;
      context.strokeStyle = this.color;
    },
    set: function set(context, config) {
      context.lineWidth = config.lineWidth;
      context.strokeStyle = config.color;
      context.lineJoin = this.lineJoin;
    },
    setFuncType: function setFuncType(pointerEvent) {
      this.funcType = this.funcTypes.draw;
      return this.funcType;
    },
    setPen: function setPen(context, pointerEvent) {
      switch(this.funcType) {
        case this.funcTypes.erase: {
          this.set(context, {
            color: this.colors.bg,
            lineWidth: 25
          });
          break;
        }
        case this.funcTypes.draw: {
          this.set(context, {
            color: this.colors.fg,
            lineWidth: getLineWidth(pointerEvent)
          });
          break;
        }
      }
    },
    release: function release() {
      this.funcType = null;
    }
  }

  var getLineWidth = function getLineWidth(e) {
    return 4;
  }

  return pen;
})();
