let dragScroll = function () {

  let module = {
    axis: 'x',
    drag: false,
    zoom: 1,
    time: 0.04,
    isIE: window.navigator.userAgent.toLowerCase().indexOf('msie') > -1,
    isFirefox: window.navigator.userAgent.toLowerCase().indexOf('firefox') > -1,
    /**
     * @method init
     */
    init: function (options) {
      let me = this;
      this.options = options;

      // find target element or fall back to body
      if (options && options.id) {
        this.el = document.getElementById(options.id);
      }
      if (!this.el) {
        if (this.isIE || this.isFirefox) {
          this.el = document.documentElement;
        } else {
          this.el = document.body;
        }
      }

      // if draggable option is enabled add events
      if (options.draggable === true) {
        if (this.isIE) {
          document.ondragstart = function () { return false; };
        }
        if (this.isIE || this.isFirefox) {
          this.body = document.documentElement;
        } else {
          this.body = document.body;
        }
        this.addEvent('mousedown', this.el, function (e) { me.onMouseDown(e); });
        this.addEvent('mousemove', this.el, function (e) { me.onMouseMove(e); });
        this.addEvent('mouseup', this.body, function (e) { me.onMouseUp(e); });
      }

    },
    /**
     * @method addEvent
     */
    addEvent: function (name, el, func) {
      if (el.addEventListener) {
        el.addEventListener(name, func, false);
      } else if (el.attachEvent) {
        el.attachEvent('on' + name, func);
      } else {
        el[name] = func;
      }
    },
    /**
     * @method cancelEvent
     */
    cancelEvent: function (e) {
      if (!e) { e = window.event; }
      if (e.target && e.target.nodeName === 'IMG') {
        e.preventDefault();
      } else if (e.srcElement && e.srcElement.nodeName === 'IMG') {
        e.returnValue = false;
      }
    },
    /**
     * @method onMouseDown
     */
    onMouseDown: function (e) {
      if (this.drag === false || this.options.wait === false) {
        this.drag = true;
        this.cancelEvent(e);
        this.startx = e.clientX + this.el.scrollLeft;
        this.starty = e.clientY + this.el.scrollTop;
        this.diffx = 0;
        this.diffy = 0;
      }
    },
    /**
     * @method onMouseMove
     */
    onMouseMove: function (e) {
      if (this.drag === true) {
        this.cancelEvent(e);
        this.diffx = (this.startx - (e.clientX + this.el.scrollLeft));
        this.diffy = (this.starty - (e.clientY + this.el.scrollTop));
        this.el.scrollLeft += this.diffx;
        this.el.scrollTop += this.diffy;
      }
    },
    /**
     * @method onMouseMove
     */
    onMouseUp: function (e) {
      if (this.drag === true) {
        if (!this.options.wait) {
          this.drag = null;
        }
        this.cancelEvent(e);
        let me = this,
          start = 1,
          animate = function () {
            let step = Math.sin(start);
            if (step <= 0) {
              me.diffx = 0;
              me.diffy = 0;
              window.cancelAnimationFrame(animate);
              me.drag = false;
            } else {
              me.el.scrollLeft += me.diffx * step;
              me.el.scrollTop += me.diffy * step;
              start -= me.time;
              window.requestAnimationFrame(animate);
            }
          };
        animate();
      }
    },
  };
  return module;
};

export default dragScroll;