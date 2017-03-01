function VennDiagram(A, B, AnB) {
  var width = 720,
      height = 80,
      margin = {top: 0, right: 0, bottom: 0, left: 0},
      threshold = 1;

  function chart(selection) {
    selection.each(function() {
      var svg = d3.select(this).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);

      var graphic = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
      var diagram = graphic.append("g")
                .attr("transform", "translate(" + maxRadius() + ", " + maxRadius() + ")");

      var circleA = getCircle(A)
                .attr("class", "A");
      var circleB = getCircle(B)
                .attr("class", "B")
                .attr("transform", "translate(" + getDistanceBetweenCircles() + ", 0)");

      function getCircle(cardinality) {
        var g = diagram.append("g");
        var r = radius(cardinality);

        g.append("circle")
          .attr("x", r)
          .attr("y", r)
          .attr("r", r);

        return g;
      }
    });
  }

  chart.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    return chart;
  }

  chart.height = function(_) {
    if (!arguments.length) return height;
    height = _;
    return chart;
  }

  chart.margin = function(_) {
    if (!arguments.length) return margin;
    margin = _;
    return chart;
  }

  chart.threshold = function(_) {
    if (!arguments.length) return threshold;
    threshold = _;
    return chart;
  }

  function maxRadius() {
    return height < width ? height / 2 : width / 4;
  }

  function maxCardinality() {
    return Math.max(A, B);
  }

  function radius(cardinality) {
    if (cardinality === maxCardinality()) return maxRadius();

    var maxArea = Math.PI * maxRadius() * maxRadius();
    return Math.sqrt( (cardinality * maxArea) / (maxCardinality() * Math.PI) );
  }

  function getDistanceBetweenCircles() {
    var r = Math.min(radius(A), radius(B));
    var R = maxRadius();
    var intersectionArea = AnB * (Math.PI * R * R) / maxCardinality();

    var left = 0,
        right = (R + r);

    while (left <= right) {
      var distance = left + (right - left)/2;
      var lensArea = getLensArea(r, R, distance)

      if ( Math.abs(intersectionArea - lensArea) < 1 ) {
        return distance;
      }

      if (lensArea < intersectionArea) {
        right = distance;
      } else {
        left = distance;
      }
    }
  }

  function getLensArea(r, R, d) {
    var smallLensArea = r * r * Math.acos( ((d*d) + (r*r) - (R*R))/(2*d*r) );
    var bigLensArea = R * R * Math.acos( ((d*d) + (R*R) - (r*r))/(2*d*R) );
    var overlap = 0.5 * Math.sqrt( (-d + r + R) * (d + r - R) * (d - r + R) * (d + r + R) );

    return smallLensArea + bigLensArea  - overlap;
  }

  return chart;
}