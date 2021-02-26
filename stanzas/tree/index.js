import vegaEmbed from "vega-embed";

export default async function tree(stanza, params) {
  function css(key) {
    return getComputedStyle(stanza.root.host).getPropertyValue(key);
  }

  const vegaJson = await fetch(
    "https://vega.github.io/vega/examples/tree-layout.vg.json"
  ).then((res) => res.json());

  //width,height,padding
  const width = Number(params["width"]);
  const height = Number(params["height"]);
  const padding = Number(params["padding"]);

  //data
  const labelVariable = params["label-variable"]; //"name"
  const parentVariable = params["parent-variable"]; //"parent"
  const idVariable = params["id-variable"]; //"id-variable"

  const data = [
    {
      name: "tree",
      url: params["your-data"],
      transform: [
        {
          type: "stratify",
          key: idVariable,
          parentKey: parentVariable,
        },
        {
          type: "tree",
          method: { signal: "layout" },
          size: [{ signal: "height" }, { signal: "width - 100" }],
          separation: { signal: "separation" },
          as: ["y", "x", "depth", "children"],
        },
      ],
    },
    {
      name: "links",
      source: "tree",
      transform: [
        { type: "treelinks" },
        {
          type: "linkpath",
          orient: "horizontal",
          shape: { signal: "links" },
        },
      ],
    },
  ];

  //scales
  const scales = [
    {
      name: "color",
      type: "ordinal",
      range: [
        "var(--series-0-color)",
        "var(--series-1-color)",
        "var(--series-2-color)",
        "var(--series-3-color)",
        "var(--series-4-color)",
        "var(--series-5-color)",
      ],
      domain: { data: "tree", field: "depth" },
      zero: true,
    },
  ];

  //legend
  const legends = [
    {
      fill: "color",
      title: params["legend-title"],
      titleColor: "var(--legendtitle-color)",
      labelColor: "var(--legendlabel-color)",
      orient: "top-left",
      encode: {
        title: {
          update: {
            font: { value: css("--legend-font") },
            fontSize: { value: css("--legendtitle-size") },
            fontWeight: { value: css("--legendtitle-weight") },
          },
        },
        labels: {
          interactive: true,
          update: {
            font: { value: css("--legend-font") },
            fontSize: { value: css("--legendlabel-size") },
          },
          text: { field: "value" },
        },
        symbols: {
          update: {
            shape: { value: params["symbol-shape"] },
            stroke: { value: "var(--stroke-color)" },
            strokeWidth: { value: css("--stroke-width") },
          },
        },
      },
    },
  ];

  //marks
  const marks = [
    {
      type: "path",
      from: { data: "links" },
      encode: {
        update: {
          path: { field: "path" },
          stroke: { value: "var(--branch-color)" },
        },
      },
    },
    {
      type: "symbol",
      from: { data: "tree" },
      encode: {
        enter: {
          size: {
            value: css("--node-size"),
          },
          stroke: { value: "var(--stroke-color)" },
        },
        update: {
          x: { field: "x" },
          y: { field: "y" },
          fill: { scale: "color", field: "depth" },
          stroke: { value: "var(--stroke-color)" },
          strokeWidth: { value: css("--stroke-width") },
        },
      },
    },
    {
      type: "text",
      from: { data: "tree" },
      encode: {
        enter: {
          text: { field: labelVariable },
          font: { value: css("--font-family") },
          fontSize: { value: css("--label-size") },
          baseline: { value: "middle" },
        },
        update: {
          x: { field: "x" },
          y: { field: "y" },
          dx: { signal: "datum.children ? -7 : 7" },
          align: { signal: "datum.children ? 'right' : 'left'" },
          opacity: { signal: "labels ? 1 : 0" },
          fill: { value: "var(--label-color)" },
        },
      },
    },
  ];

  const spec = {
    $schema: "https://vega.github.io/schema/vega/v5.json",
    width,
    height,
    padding,
    signals: vegaJson.signals,
    data,
    scales,
    legends,
    marks,
  };

  //delete default controller
  for (const signal of vegaJson.signals) {
    delete signal.bind;
  }

  const el = stanza.root.querySelector("main");
  const opts = {
    renderer: "svg",
  };
  await vegaEmbed(el, spec, opts);
}
