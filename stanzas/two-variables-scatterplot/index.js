import vegaEmbed from "vega-embed";

export default async function twoVariablesScatterplot(stanza, params) {
  function css(key) {
    return getComputedStyle(stanza.root.host).getPropertyValue(key);
  }

  // const vegaJson = await fetch(params["src-url"]).then((res) => res.json());

  //width,height,padding
  const width = Number(params["width"]);
  const height = Number(params["height"]);
  const padding = Number(params["padding"]);

  //data
  const xVariable = params["x-variable"];
  const yVariable = params["y-variable"];

  const data = [
    {
      name: "source",
      url: params["your-data"],
      transform: [
        {
          type: "filter",
          expr: `datum['${xVariable}'] != null && datum['${yVariable}'] != null`,
        },
      ],
    },
  ];

  // scales
  const scales = [
    {
      name: "x",
      type: "linear",
      round: true,
      nice: true,
      zero: true,
      domain: { data: "source", field: xVariable },
      range: "width",
    },
    {
      name: "y",
      type: "linear",
      round: true,
      nice: true,
      zero: true,
      domain: { data: "source", field: yVariable },
      range: "height",
    },
  ];

  //axes
  const axes = [
    {
      scale: "x",
      orient: params["xaxis-orient"],
      domain: true,
      domainColor: "var(--axis-color)",
      domainWidth: css("--axis-width"),
      grid: params["xgrid"] === "true",
      gridColor: "var(--grid-color)",
      gridDash: css("--grid-dash"),
      gridOpacity: css("--grid-opacity"),
      gridWidth: css("--grid-width"),
      ticks: params["xtick"] === "true",
      // tickCount: params["xtick-count"],
      tickColor: "var(--tick-color)",
      tickSize: css("--tick-size"),
      tickWidth: css("--tick-width"),
      title: xVariable,
      titleColor: "var(--title-color)",
      titleFont: css("--font-family"),
      titleFontSize: css("--title-size"),
      titleFontWeight: css("--title-weight"),
      titlePadding: Number(css("--title-padding")),
      zindex: 1,
      encode: {
        labels: {
          interactive: true,
          update: {
            angle: { value: params["xlabel-angle"] },
            dx: { value: params["xlabel-horizonal-offset"] },
            dy: { value: params["xlabel-vertical-offset"] },
            fill: { value: "var(--label-color)" },
            font: { value: css("--font-family") },
            fontSize: { value: css("--label-size") },
          },
        },
      },
    },
    {
      scale: "y",
      orient: params["yaxis-orient"],
      domain: true,
      domainColor: "var(--axis-color)",
      domainWidth: css("--axis-width"),
      grid: params["ygrid"] === "true",
      gridColor: "var(--grid-color)",
      gridDash: css("--grid-dash"),
      gridOpacity: css("--grid-opacity"),
      gridWidth: css("--grid-width"),
      ticks: params["ytick"] === "true",
      // tickCount: params["ytick-count"],
      tickColor: "var(--tick-color)",
      tickSize: css("--tick-size"),
      tickWidth: css("--tick-width"),
      title: yVariable,
      titleColor: "var(--title-color)",
      titleFont: css("--font-family"),
      titleFontSize: css("--title-size"),
      titleFontWeight: css("--title-weight"),
      titlePadding: Number(css("--title-padding")),
      zindex: 1,
      encode: {
        labels: {
          interactive: true,
          update: {
            angle: { value: params["ylabel-angle"] },
            dx: { value: params["ylabel-horizonal-offset"] },
            dy: { value: params["ylabel-vertical-offset"] },
            fill: { value: "var(--label-color)" },
            font: { value: css("--font-family") },
            fontSize: { value: css("--label-size") },
          },
        },
      },
    },
  ];

  //marks
  const marks = [
    {
      name: "marks",
      type: "symbol",
      // size: 2,
      from: { data: "source" },
      encode: {
        update: {
          x: { scale: "x", field: xVariable },
          y: { scale: "y", field: yVariable },
          shape: { value: params["symbol-shape"] },
          fill: { value: "var(--series-0-color)" },
          size: {
            value: Number(css("--plot-size")),
          },
          stroke: { value: "var(--stroke-color)" },
          strokeWidth: {
            value: css("--stroke-width"),
          },
          opacity: {
            value: css("--opacity"),
          },
        },
      },
    },
  ];

  const spec = {
    $schema: "https://vega.github.io/schema/vega/v5.json",
    width,
    height,
    padding,
    data,
    scales,
    axes,
    marks,
  };

  const el = stanza.root.querySelector("main");
  const opts = {
    renderer: "svg",
  };
  await vegaEmbed(el, spec, opts);
}
