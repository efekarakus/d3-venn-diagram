# VennDiagram

Draw a Venn Diagram given the cardinality |A|, |B|, and |AnB|.

## Usage

```js
var vennDiagram = VennDiagram(15, 4, 1)
              .width(500)
              .height(250)
              .margin({top: 5, right: 10, bottom: 5, left: 10});

d3.select("body")
  .call(vennDiagram);
```

## API Reference

<a href="#venndiagram" name="venndiagram">#</a> VennDiagram([<i>A</i>], [<i>B</i>], [<i>AnB</i>])

Returns a function to build a Venn diagram given |A|, |B|, and |AnB|.

<a href="#width" name="width">#</a> VennDiagram(<i>A</i>, <i>B</i>, <i>AnB</i>).<b>width</b>([<i>width</i>])

If specified, <i>width</i> is the new width for the SVG. Otherwise, returns current width.

<a href="#height" name="height">#</a> VennDiagram(<i>A</i>, <i>B</i>, <i>AnB</i>).<b>height</b>([<i>height</i>])

If specified, <i>height</i> is the new height for the SVG. Otherwise, returns current height.

<a href="#threshold" name="threshold">#</a> VennDiagram(<i>A</i>, <i>B</i>, <i>AnB</i>).<b>threshold</b>([<i>threshold</i>])

If specified, <i>threshold</i> represents the percentage area that we are willing to sacrifice 
for convergence from the intersection of the two circles. Otherwise, returns current threshold. Default is 0.00001.