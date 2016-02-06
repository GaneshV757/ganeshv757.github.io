var svgNS = "http://www.w3.org/2000/svg";
var svg = document.querySelector("svg");
console.log(svg);
var colors = ["#725269", "#1A2040", "#FFD06B", "#F39A6C", "#A46E63"];
var colors = ["#FFCC6E", "#FBA470", "#A4453F", "#90404C", "#AF4764"];
var amount = 12;
var ww = window.innerWidth;
var wh = window.innerHeight;
var mountains = [];
svg.setAttribute("viewBox", "0 0 " + ww + " " + wh);
svg.setAttribute("preserveAspectRatio", "xMidYMax meet");

for (var i = 0; i < amount; i++) {
  var x = Math.round(Math.random() * (ww * 2) - (ww * 1.5));
  var x2 = Math.round(Math.random() * (ww * 2) + (ww * 0.5));

  var x = Math.round(Math.random() * (ww * 2) - (ww));
  var x2 = x + Math.round(Math.random() * ww + ww * 0.3);

  var y = Math.round(Math.random() * (wh * 0.8 / (amount - i))) + wh * 0.1;
  var middle = ((x2 - x) / 2 + x);
  var group = document.createElementNS(svgNS, "g");
  mountains.push(group);

  var mountain = document.createElementNS(svgNS, "polygon");
  mountain.setAttributeNS(null, "points", x + "," + wh + " " + x2 + "," + wh + "" + " " + middle + "," + y);
  mountain.setAttributeNS(null, "fill", colors[i % 5]);

  var snow = document.createElementNS(svgNS, "polygon");
  snow.setAttributeNS(null, "r", "10");

  var height = Math.round(Math.random() * (wh - y) * 0.3 + (wh - y) * 0.2);
  var snowLeft = Math.round(middle - (middle - x) / ((wh - y) / height));
  var snowRight = Math.round(middle + (x2 - middle) / ((wh - y) / height));

  var snowKeysLength = Math.floor(Math.random() * 7) + 2;
  var dotsMiddle = "";
  for (var j = 0; j < snowKeysLength; j++) {
    var x1 = Math.round((snowRight - snowLeft) * (1 / (snowKeysLength + 1) * (j + 1)) + snowLeft);
    var y1 = Math.round((y + height) + (Math.random() - 0.5) * (height * 0.5));
    dotsMiddle += " " + x1 + "," + y1;
  }

  snow.setAttributeNS(null, "points",
    middle + "," + y + " " +
    (snowLeft) + "," + (y + height) + " " +
    dotsMiddle + " " +
    (snowRight) + "," + (y + height));

  snow.setAttributeNS(null, "class", "snow");
  group.setAttributeNS(null, "z", i / 2);

  group.appendChild(mountain);
  group.appendChild(snow);
  svg.appendChild(group);

  TweenMax.from(mountains[i], 3, {
    y: wh,
    ease: Power2.easeOut,
    delay: (i / 1.5)
  });
}

function onMouseMove(e) {
  var x = (e.clientX - ww / 2) / (ww / 2) * 30;
  for (var i = 0; i < amount; i++) {
    var z = mountains[i].getAttribute("z");
    TweenMax.to(mountains[i], 1, {
      x: (x * z),
      ease: Power1.easeOut
    });
  }
}

window.addEventListener("mousemove", onMouseMove);