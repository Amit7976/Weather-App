setTimeout(() => {
  ////  code for run UV INDEX Progress Bar

  var Dial = function (container) {
    this.container = container;
    this.size = this.container.dataset.size;
    this.strokeWidth = this.size / 8;
    this.radius = this.size / 2 - this.strokeWidth / 2;
    this.value = this.container.dataset.value;
    this.direction = this.container.dataset.arrow;
    this.svg;
    this.defs;
    this.slice;
    this.overlay;
    this.text;
    this.arrow;
    this.create();
  };

  Dial.prototype.create = function () {
    this.createSvg();
    this.createDefs();
    this.createSlice();
    this.createOverlay();
    this.createText();
    this.container.appendChild(this.svg);
  };

  Dial.prototype.createSvg = function () {
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", this.size + "px");
    svg.setAttribute("height", this.size + "px");
    this.svg = svg;
  };

  Dial.prototype.createDefs = function () {
    var defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    var linearGradient = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "linearGradient"
    );
    linearGradient.setAttribute("id", "gradient");
    var stop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    stop1.setAttribute("stop-color", "#006eff91");
    stop1.setAttribute("offset", "0%");
    linearGradient.appendChild(stop1);
    var stop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    stop2.setAttribute("stop-color", "#ff000091");
    stop2.setAttribute("offset", "100%");
    linearGradient.appendChild(stop2);
    var linearGradientBackground = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "linearGradient"
    );
    linearGradientBackground.setAttribute("id", "gradient-background");
    var stop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    stop1.setAttribute("stop-color", "#0000000d");
    stop1.setAttribute("offset", "0%");
    linearGradientBackground.appendChild(stop1);
    var stop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    stop2.setAttribute("stop-color", "#0000000d");
    stop2.setAttribute("offset", "100%");
    linearGradientBackground.appendChild(stop2);
    defs.appendChild(linearGradient);
    defs.appendChild(linearGradientBackground);
    this.svg.appendChild(defs);
    this.defs = defs;
  };

  Dial.prototype.createSlice = function () {
    var slice = document.createElementNS("http://www.w3.org/2000/svg", "path");
    slice.setAttribute("fill", "none");
    slice.setAttribute("stroke", "url(#gradient)");
    slice.setAttribute("stroke-width", this.strokeWidth);
    slice.setAttribute("stroke-linecap", "round");
    slice.setAttribute(
      "transform",
      "translate(" + this.strokeWidth / 2 + "," + this.strokeWidth / 2 + ")"
    );
    slice.setAttribute("class", "animate-draw");
    this.svg.appendChild(slice);
    this.slice = slice;
  };

  Dial.prototype.createOverlay = function () {
    var r = this.size - this.size / 2 - this.strokeWidth / 2;
    var circle = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );
    circle.setAttribute("cx", this.size / 2);
    circle.setAttribute("cy", this.size / 2);
    circle.setAttribute("r", r);
    circle.setAttribute("fill", "url(#gradient-background)");
    this.svg.appendChild(circle);
    this.overlay = circle;
  };

  Dial.prototype.createText = function () {
    var fontSize = this.size / 3.5;
    var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", this.size / 2 + fontSize / 7.5);
    text.setAttribute("y", this.size / 2 + fontSize / 2.5);
    text.setAttribute("font-size", "50px");
    text.setAttribute("fill", "#151515");
    text.setAttribute("text-anchor", "middle");
    var tspanSize = fontSize / 6;
    text.innerHTML =
      0 +
      '<tspan font-size="' +
      tspanSize +
      '" dy="' +
      -tspanSize * 1.2 +
      '">UV</tspan>';
    this.svg.appendChild(text);
    this.text = text;
  };

  Dial.prototype.animateStart = function () {
    var v = 0;
    var self = this;
    var intervalOne = setInterval(function () {
      var p = +(v / self.value).toFixed(0);
      var a = p < 0.2 ? 0.2 : 0.15;

      v += a;
      // Stop
      if (v >= +self.value) {
        v = self.value;
        clearInterval(intervalOne);
      }
      self.setValue(v);
    }, 0);
  };

  Dial.prototype.animateReset = function () {
    this.setValue(0);
  };

  Dial.prototype.polarToCartesian = function (
    centerX,
    centerY,
    radius,
    angleInDegrees
  ) {
    var angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  };

  Dial.prototype.describeArc = function (x, y, radius, startAngle, endAngle) {
    var start = this.polarToCartesian(x, y, radius, endAngle);
    var end = this.polarToCartesian(x, y, radius, startAngle);
    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    var d = [
      "M",
      start.x,
      start.y,
      "A",
      radius,
      radius,
      0,
      largeArcFlag,
      0,
      end.x,
      end.y,
    ].join(" ");
    return d;
  };

  Dial.prototype.setValue = function (value) {
    var parsedValue = parseFloat(value); // Parse the value as a float
    if (isNaN(parsedValue)) {
      return; // Return if the parsed value is NaN
    }
    var c = (parsedValue / 12) * 280;
    if (parsedValue >= 12) c = 280;
    if (c === 360) c = 359.99;
    var xy = this.size / 2 - this.strokeWidth / 2;
    var d = this.describeArc(xy, xy, xy, 180, 180 + c);
    this.slice.setAttribute("d", d);
    var tspanSize = this.size / 2.5 / 6;
    this.text.innerHTML =
      parsedValue.toFixed(1) +
      '<tspan font-size="' +
      tspanSize +
      '" dy="' +
      -tspanSize * 0 +
      '">UV</tspan>';
  };

  //
  // Usage
  //

  var containers = document.getElementsByClassName("chart");
  var dial = new Dial(containers[0]);
  dial.animateStart();
}, 1000);
