import { d as defineStanzaElement } from './stanza-element-b0afeab3.js';
import { e as embed } from './vega-embed.module-f7442d54.js';
import './vega.module-4fe8ac55.js';
import './vega-event-selector.module-5ae5c063.js';
import './timer-be811b16.js';
import './compile-b0eab824.js';

async function piechart(stanza, params) {
  const spec = await fetch("https://vega.github.io/vega/examples/pie-chart.vg.json").then((res) => res.json());

  //width・height・padding
  // spec.width = params["width"]
  // spec.height = params["height"]
  // spec.autosize = params["autosize"]
  spec.padding = { left: 5, top: 5, right: 150, bottom: 30 };

  //delete default controller
  for (const signal of spec.signals) {
    delete signal.bind;
  }

  //innerpadding
  spec.signals[2].value = params["inner-padding-angle"];
  spec.signals[3].value = params["inner-radius"];

  //data
  const labelVariable = params["label-variable"];
  const valueVariable = params["value-variable"];

  spec.data = [
    {
      name: "table",
      url: params["your-data"],
      // values: [
      //   { id: 1, field: 4 },
      //   { id: 2, field: 6 },
      //   { id: 3, field: 10 },
      //   { id: 4, field: 3 },
      //   { id: 5, field: 7 },
      //   { id: 6, field: 8 },
      // ],
      transform: [
        {
          type: "pie",
          field: valueVariable,
          startAngle: { signal: "startAngle" },
          endAngle: { signal: "endAngle" },
          sort: { signal: "sort" },
        },
      ],
    },
  ];

  // scales(color scheme)
  spec.scales = [
    {
      name: "color",
      type: "ordinal",
      domain: { data: "table", field: labelVariable },
      range: [
        "var(--series-0-color)",
        "var(--series-1-color)",
        "var(--series-2-color)",
        "var(--series-3-color)",
        "var(--series-4-color)",
        "var(--series-5-color)",
      ],
    },
  ];

  //legend
  spec.legends = [
    {
      fill: "color",
      orient: "none",
      legendX: "220",
      legendY: "5",
      title: labelVariable,
      titleColor: "var(--legendtitle-color)",
      titleFont: getComputedStyle(stanza.root.host).getPropertyValue(
        "--font-family"
      ),
      titleFontSize: getComputedStyle(stanza.root.host).getPropertyValue(
        "--legendtitle-size"
      ),
      titleFontWeight: getComputedStyle(stanza.root.host).getPropertyValue(
        "--legendtitle-weight"
      ),
      labelColor: "var(--legendlabel-color)",
      labelFont: getComputedStyle(stanza.root.host).getPropertyValue(
        "--font-family"
      ),
      labelFontSize: getComputedStyle(stanza.root.host).getPropertyValue(
        "--legendlabel-size"
      ),
      symbolType: params["symbol-shape"],
      symbolStrokeColor: getComputedStyle(stanza.root.host).getPropertyValue(
        "--stroke-color"
      ),
      symbolStrokeWidth: getComputedStyle(stanza.root.host).getPropertyValue(
        "--stroke-width"
      ),
    },
  ];

  //marks
  spec.marks = [
    {
      type: "arc",
      from: { data: "table" },
      encode: {
        enter: {
          fill: { scale: "color", field: labelVariable },
          x: { signal: "width / 2" },
          y: { signal: "height / 2" },
        },
        update: {
          startAngle: { field: "startAngle" },
          endAngle: { field: "endAngle" },
          padAngle: { signal: "padAngle" },
          innerRadius: { signal: "innerRadius" },
          outerRadius: { signal: "width / 2" },
          cornerRadius: { signal: "cornerRadius" },
          fill: { scale: "color", field: labelVariable },
          stroke: { value: "var(--stroke-color)" },
          strokeWidth: { value: "var(--stroke-width)" },
        },
      },
    },
  ];

  const el = stanza.root.querySelector("main");
  const opts = {
    renderer: "svg",
  };
  await embed(el, spec, opts);
}

var metadata = {
	"@context": {
	stanza: "http://togostanza.org/resource/stanza#"
},
	"@id": "piechart",
	"stanza:label": "piechart",
	"stanza:definition": "Vega wrapped piechart for MetaStanza",
	"stanza:type": "Stanza",
	"stanza:context": "Environment",
	"stanza:display": "Chart",
	"stanza:provider": "TogoStanza",
	"stanza:license": "MIT",
	"stanza:author": "TogoStanza",
	"stanza:address": "admin@biohackathon.org",
	"stanza:contributor": [
],
	"stanza:created": "2020-11-05",
	"stanza:updated": "2020-11-05",
	"stanza:parameter": [
	{
		"stanza:key": "your-data",
		"stanza:example": "http://togostanza.org/sparqlist/api/metastanza_chart?chromosome=1",
		"stanza:description": "Source url of your data.",
		"stanza:required": true
	},
	{
		"stanza:key": "label-variable",
		"stanza:example": "category",
		"stanza:description": "Variable to be assigned as label",
		"stanza:required": true
	},
	{
		"stanza:key": "value-variable",
		"stanza:example": "count",
		"stanza:description": "Variable to be assigned as value",
		"stanza:required": true
	},
	{
		"stanza:key": "width",
		"stanza:example": "400",
		"stanza:description": "Width of your stanza"
	},
	{
		"stanza:key": "height",
		"stanza:example": "200",
		"stanza:description": "Height of your stanza"
	},
	{
		"stanza:key": "padding",
		"stanza:example": "50",
		"stanza:description": "Padding around your stanza"
	},
	{
		"stanza:key": "autosize",
		"stanza:type": "number",
		"stanza:example": "none",
		"stanza:description": ""
	},
	{
		"stanza:key": "inner-padding-angle",
		"stanza:example": "0",
		"stanza:description": "Angle of inner padding.(0-0.1)",
		"stanza:required": false
	},
	{
		"stanza:key": "inner-radius",
		"stanza:example": "0",
		"stanza:description": "Inner radius of your pie.(0-99)",
		"stanza:required": false
	},
	{
		"stanza:key": "symbol-shape",
		"stanza:example": "circle",
		"stanza:description": "Shape of plot.(circle, square, cross, diamond, triangle-up, triangle-down, triangle-right, triangle-left, stroke, arrow, wedge, or triangle)"
	}
],
	"stanza:about-link-placement": "bottom-right",
	"stanza:style": [
	{
		"stanza:key": "--series-0-color",
		"stanza:type": "color",
		"stanza:default": "#6590e6",
		"stanza:description": "Color 1"
	},
	{
		"stanza:key": "--series-1-color",
		"stanza:type": "color",
		"stanza:default": "#3ac9b6",
		"stanza:description": "Color 2"
	},
	{
		"stanza:key": "--series-2-color",
		"stanza:type": "color",
		"stanza:default": "#9ede2f",
		"stanza:description": "Color 3"
	},
	{
		"stanza:key": "--series-3-color",
		"stanza:type": "color",
		"stanza:default": "#f5da64",
		"stanza:description": "Color 4"
	},
	{
		"stanza:key": "--series-4-color",
		"stanza:type": "color",
		"stanza:default": "#f57f5b",
		"stanza:description": "Color 5"
	},
	{
		"stanza:key": "--series-5-color",
		"stanza:type": "color",
		"stanza:default": "#f75976",
		"stanza:description": "Color 6"
	},
	{
		"stanza:key": "--emphasized-color",
		"stanza:type": "color",
		"stanza:default": "#fa8c84",
		"stanza:description": "Emphasized color when you hover on labels and rects"
	},
	{
		"stanza:key": "--font-family",
		"stanza:type": "text",
		"stanza:default": "Helvetica Neue",
		"stanza:description": "Font family."
	},
	{
		"stanza:key": "--legendtitle-color",
		"stanza:type": "color",
		"stanza:default": "#333333",
		"stanza:description": "font color of the legend title"
	},
	{
		"stanza:key": "--legendtitle-size",
		"stanza:type": "number",
		"stanza:default": "12",
		"stanza:description": "Font size of the legend title"
	},
	{
		"stanza:key": "--legendtitle-weight",
		"stanza:type": "number",
		"stanza:default": "400",
		"stanza:description": "Font weight of the legend title"
	},
	{
		"stanza:key": "--legendlabel-color",
		"stanza:type": "color",
		"stanza:default": "#333333",
		"stanza:description": "Font color of the legend label"
	},
	{
		"stanza:key": "--legendlabel-size",
		"stanza:type": "number",
		"stanza:default": "10",
		"stanza:description": "Font size of the legend label"
	},
	{
		"stanza:key": "--stroke-color",
		"stanza:type": "color",
		"stanza:default": "#4e5059",
		"stanza:description": "Stroke color."
	},
	{
		"stanza:key": "--stroke-width",
		"stanza:type": "number",
		"stanza:default": "0.5",
		"stanza:description": "Stroke width."
	}
]
};

var templates = [
  ["stanza.html.hbs", {"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<p class=\"greeting\">\n  "
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"greeting") || (depth0 != null ? lookupProperty(depth0,"greeting") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"greeting","hash":{},"data":data,"loc":{"start":{"line":2,"column":2},"end":{"line":2,"column":14}}}) : helper)))
    + "\n</p>";
},"useData":true}]
];

var css = "/*\n\nYou can set up a global style here that is commonly used in each stanza.\n\nExample:\n\nh1 {\n  font-size: 24px;\n}\n\n*/\nmain {\n  padding: 1rem 2rem;\n}\n\np.greeting {\n  margin: 0;\n  font-size: 24px;\n  color: var(--greeting-color);\n  text-align: var(--greeting-align);\n}\n\nsummary {\n  display: none;\n}";

defineStanzaElement(piechart, {metadata, templates, css, url: import.meta.url});
//# sourceMappingURL=piechart.js.map
