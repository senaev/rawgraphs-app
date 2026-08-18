/*
  Vendored from @rawgraphs/rawgraphs-charts@1.0.1 (Apache-2.0), file lib/index.es.js.
  The prebuilt bundle is vendored, not the upstream source: that source needs a
  custom .css.raw loader and SVG pipeline that CRA cannot run.

  Local changes:
   - '@rawgraphs/rawgraphs-core' -> '../rawgraphs-core'
   - lint/correctness fixes marked in the commit message
*/
import * as d3 from 'd3';
import { rollups, selection, transition, select, ascending, descending, max, scaleBand, groups, sum, scaleSqrt, scaleLinear, timeFormat, extent, axisBottom, axisLeft, rollup, stack, scaleTime, forceSimulation, forceX, forceY, forceCollide, scalePoint, quantile, line, min, area, maxIndex, hierarchy, pack, arc, cluster, tree, linkRadial, lab, geoPath, range, scan, polygonHull, linkHorizontal, greatest, axisTop, pie, lineRadial, curveLinearClosed, curveBasisClosed, curveCardinalClosed, curveCatmullRomClosed, partition, treemap as treemap$1, selectAll, bin, randomNormal, randomLcg, Delaunay, chordDirected, ribbonArrow, ribbon } from 'd3';
import { getDimensionAggregator, dateFormats as dateFormats$1, legend, labelsOcclusion } from '../rawgraphs-core';
import { sankey, sankeyLinkHorizontal } from 'd3-sankey';
import { jLouvain } from 'louvain';
import { gridding } from 'd3-gridding';
import { contourDensity } from 'd3-contour';
import { hexbin } from 'd3-hexbin';
import * as d3Sankey from 'd3-sankey-circular';
import { sankeyCircular } from 'd3-sankey-circular';
import { voronoiTreemap } from 'd3-voronoi-treemap';

var img = "data:image/svg+xml,%3csvg id='rawgraphs-icons' xmlns='http://www.w3.org/2000/svg' width='56' height='56' viewBox='0 0 56 56'%3e %3cdefs%3e %3cstyle%3e .cls-1 %7b fill: %2395e5c0%3b %7d .cls-2 %7b fill: %2306c26c%3b %7d %3c/style%3e %3c/defs%3e %3cg id='secundary'%3e %3cpath class='cls-1' d='M11%2c22V10a20.9062%2c20.9062%2c0%2c0%2c0%2c6.5132-.8467A28.83%2c28.83%2c0%2c0%2c1%2c26%2c8V20a17.3874%2c17.3874%2c0%2c0%2c0-5.3887.7461A32.6927%2c32.6927%2c0%2c0%2c1%2c11%2c22Z'/%3e %3cpath class='cls-1' d='M26%2c31c-3.7344%2c0-5.6812-1.5605-7.563-3.0693C16.5571%2c26.4238%2c14.7822%2c25%2c11%2c25V23a12.3663%2c12.3663%2c0%2c0%2c1%2c8.688%2c3.37C21.4482%2c27.7812%2c22.9683%2c29%2c26%2c29Z'/%3e %3cpath class='cls-1' d='M26%2c48a23.5%2c23.5%2c0%2c0%2c1-7.0669-.9668A26.3491%2c26.3491%2c0%2c0%2c0%2c11%2c46V45a27.1771%2c27.1771%2c0%2c0%2c1%2c8.1914%2c1.0674A22.6573%2c22.6573%2c0%2c0%2c0%2c26%2c47Z'/%3e %3cpath class='cls-1' d='M21.2993%2c35.2588C19.2412%2c31.1338%2c16.68%2c26%2c11%2c26v5c2.4126%2c0%2c3.81%2c2.4521%2c5.8252%2c6.4912C18.8149%2c41.48%2c21.07%2c46%2c26%2c46V41C24.291%2c41%2c23.0293%2c38.7266%2c21.2993%2c35.2588Z'/%3e %3cpath class='cls-1' d='M12.5836%2c37.842c.1-.0185.198-.0409.296-.0628a6.124%2c6.124%2c0%2c0%2c0%2c2.342-1.2278%2c20.3684%2c20.3684%2c0%2c0%2c0-1.9436-3.2A4.2569%2c4.2569%2c0%2c0%2c1%2c11%2c34v4a8.8714%2c8.8714%2c0%2c0%2c0%2c1.108-.0754C12.2734%2c37.9028%2c12.43%2c37.8738%2c12.5836%2c37.842Z'/%3e %3cpath class='cls-1' d='M12.5836%2c37.842c-.1534.0318-.31.0608-.4756.0826C12.2714%2c37.9042%2c12.4261%2c37.8712%2c12.5836%2c37.842Z'/%3e %3cpath class='cls-1' d='M20.2266%2c31.1521q.1554-.2645.3068-.5248c-.38-.2127-.7429-.4356-1.0826-.6712C19.7243%2c30.347%2c19.98%2c30.7478%2c20.2266%2c31.1521Z'/%3e %3cpath class='cls-1' d='M22.6331%2c27.217C23.6544%2c25.8058%2c24.6485%2c25%2c26%2c25V21c-3.049%2c0-5.0381%2c1.722-6.6038%2c3.8708.3185.2433.626.4855.9177.7194A14.7276%2c14.7276%2c0%2c0%2c0%2c22.6331%2c27.217Z'/%3e %3cpath class='cls-1' d='M15.6867%2c37.4536A7.0944%2c7.0944%2c0%2c0%2c1%2c11%2c39v5a11.9758%2c11.9758%2c0%2c0%2c0%2c7.0875-2.1011A43.2363%2c43.2363%2c0%2c0%2c1%2c15.93%2c37.9376C15.8469%2c37.77%2c15.7673%2c37.6132%2c15.6867%2c37.4536Z'/%3e %3cpath class='cls-1' d='M22.1942%2c34.8124c.488.9783.9567%2c1.8891%2c1.4092%2c2.6751A5.5643%2c5.5643%2c0%2c0%2c1%2c26%2c37V32a10.382%2c10.382%2c0%2c0%2c0-4.6966%2c1.0617C21.6182%2c33.6611%2c21.9141%2c34.2512%2c22.1942%2c34.8124Z'/%3e %3cpath class='cls-1' d='M45%2c21a32.2725%2c32.2725%2c0%2c0%2c1-9.4824-1.2363A17.7621%2c17.7621%2c0%2c0%2c0%2c30%2c19V8a28.3864%2c28.3864%2c0%2c0%2c1%2c8.3574%2c1.1367A21.5746%2c21.5746%2c0%2c0%2c0%2c45%2c10Z'/%3e %3cpath class='cls-1' d='M30%2c33V29c2.5938%2c0%2c3.8428-1.168%2c5.5713-2.7852C37.5791%2c24.3369%2c40.0771%2c22%2c45%2c22v4c-3.3438%2c0-4.8232%2c1.3838-6.6963%2c3.1357C36.3672%2c30.9473%2c34.1729%2c33%2c30%2c33Z'/%3e %3cpath class='cls-1' d='M32.9%2c27.1582a15.8624%2c15.8624%2c0%2c0%2c0%2c1.9886-1.6743c.5388-.5039%2c1.1334-1.0568%2c1.8121-1.5978C35.1165%2c21.7252%2c33.05%2c20%2c30%2c20v5C31.0908%2c25%2c31.9682%2c25.7776%2c32.9%2c27.1582Z'/%3e %3cpath class='cls-1' d='M39.8439%2c37.2858A8.31%2c8.31%2c0%2c0%2c0%2c45%2c39V34a3.5994%2c3.5994%2c0%2c0%2c1-2.3789-.918A18.517%2c18.517%2c0%2c0%2c0%2c39.8439%2c37.2858Z'/%3e %3cpath class='cls-1' d='M30%2c48V46a22.2335%2c22.2335%2c0%2c0%2c0%2c6.68-.916A27.6268%2c27.6268%2c0%2c0%2c1%2c45%2c44v2a25.8976%2c25.8976%2c0%2c0%2c0-7.8037%2c1.0166A24.2237%2c24.2237%2c0%2c0%2c1%2c30%2c48Z'/%3e %3cpath class='cls-1' d='M30%2c45V41c2.0371%2c0%2c3.3135-2.1133%2c5.1738-5.5928C37.1758%2c31.6621%2c39.668%2c27%2c45%2c27v4c-2.7373%2c0-4.2051%2c2.3779-6.2988%2c6.293C36.7705%2c40.9053%2c34.582%2c45%2c30%2c45Z'/%3e %3cpath class='cls-1' d='M37.8054%2c40.8811A11.9848%2c11.9848%2c0%2c0%2c0%2c45%2c43V40a9.0475%2c9.0475%2c0%2c0%2c1-5.6929-1.721C38.8468%2c39.1355%2c38.3541%2c40.0225%2c37.8054%2c40.8811Z'/%3e %3cpath class='cls-1' d='M34.2919%2c34.9358l.0362-.0675A10.4945%2c10.4945%2c0%2c0%2c0%2c30%2c34v3a7.7192%2c7.7192%2c0%2c0%2c1%2c2.842.4883C33.2766%2c36.7889%2c33.7477%2c35.9537%2c34.2919%2c34.9358Z'/%3e %3c/g%3e %3cg id='primary'%3e %3crect class='cls-2' x='8' y='10' width='2' height='21'/%3e %3crect class='cls-2' x='8' y='34' width='2' height='12'/%3e %3crect class='cls-2' x='46' y='10' width='2' height='21'/%3e %3crect class='cls-2' x='46' y='34' width='2' height='12'/%3e %3crect class='cls-2' x='27' y='8' width='2' height='17'/%3e %3crect class='cls-2' x='27' y='29' width='2' height='8'/%3e %3crect class='cls-2' x='27' y='41' width='2' height='7'/%3e %3c/g%3e%3c/svg%3e";

var img$1 = "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='320' height='160' viewBox='0 0 320 160'%3e %3cdefs%3e %3cstyle%3e .cls-1%2c .cls-15%2c .cls-16%2c .cls-17 %7b isolation: isolate%3b %7d .cls-2 %7b fill: white%3b %7d .cls-3 %7b fill: %23666%3b %7d .cls-4 %7b mix-blend-mode: multiply%3b %7d .cls-10%2c .cls-11%2c .cls-12%2c .cls-13%2c .cls-14%2c .cls-5%2c .cls-6%2c .cls-7%2c .cls-8%2c .cls-9 %7b fill: none%3b stroke: %23ccc%3b %7d .cls-5 %7b stroke-width: 9.2219px%3b %7d .cls-6 %7b stroke-width: 5.6715px%3b %7d .cls-7 %7b stroke-width: 14.5706px%3b %7d .cls-8 %7b stroke-width: 10.9741px%3b %7d .cls-9 %7b stroke-width: 73.0374px%3b %7d .cls-10 %7b stroke-width: 25.0374px%3b %7d .cls-11 %7b stroke-width: 29.7406px%3b %7d .cls-12 %7b stroke-width: 15.4928px%3b %7d .cls-13 %7b stroke-width: 16.5533px%3b %7d .cls-14 %7b stroke-width: 76.7261px%3b %7d .cls-15%2c .cls-16 %7b font-size: 9.4872px%3b font-family: Helvetica%3b %7d .cls-16 %7b letter-spacing: -0.0547em%3b %7d .cls-17 %7b font-size: 10px%3b font-family: Helvetica-Bold%2c Helvetica%3b font-weight: 700%3b %7d %3c/style%3e %3c/defs%3e %3cg class='cls-1'%3e %3cg id='Layer_1' data-name='Layer 1'%3e %3crect class='cls-2' x='0.5' y='0.5' width='320' height='160'/%3e %3cg%3e %3crect class='cls-3' x='308' y='14.3718' width='10' height='46.2939'/%3e %3crect class='cls-3' x='308' y='65.4093' width='10' height='92.2189'/%3e %3c/g%3e %3cg%3e %3crect class='cls-3' x='155' y='14.3718' width='10' height='45.2334'/%3e %3crect class='cls-3' x='155' y='64.3488' width='10' height='93.2794'/%3e %3c/g%3e %3cg%3e %3crect class='cls-3' x='2' y='10' width='10' height='14.8934'/%3e %3crect class='cls-3' x='2' y='29.6369' width='10' height='25.5446'/%3e %3crect class='cls-3' x='2' y='59.9252' width='10' height='98.0748'/%3e %3c/g%3e %3cg class='cls-4'%3e %3cpath class='cls-5' d='M12%2c14.6109c71.5%2c0%2c71.5%2c4.3718%2c143%2c4.3718'/%3e %3c/g%3e %3cg class='cls-4'%3e %3cpath class='cls-6' d='M12%2c22.0576c71.5%2c0%2c71.5%2c45.1269%2c143%2c45.1269'/%3e %3c/g%3e %3cg class='cls-4'%3e %3cpath class='cls-7' d='M12%2c36.9222c71.5%2c0%2c71.5%2c40.3833%2c143%2c40.3833'/%3e %3c/g%3e %3cg class='cls-4'%3e %3cpath class='cls-8' d='M12%2c49.6946c71.5%2c0%2c71.5-20.6139%2c143-20.6139'/%3e %3c/g%3e %3cpath class='cls-9' d='M12%2c96.4439c71.5%2c0%2c71.5%2c24.6656%2c143%2c24.6656'/%3e %3cg class='cls-4'%3e %3cpath class='cls-10' d='M12%2c145.4813c71.5%2c0%2c71.5-98.3948%2c143-98.3948'/%3e %3c/g%3e %3cg class='cls-4'%3e %3cpath class='cls-11' d='M165%2c29.2421H308'/%3e %3c/g%3e %3cg class='cls-4'%3e %3cpath class='cls-12' d='M165%2c51.8588c71.5%2c0%2c71.5%2c21.2969%2c143%2c21.2969'/%3e %3c/g%3e %3cg class='cls-4'%3e %3cpath class='cls-13' d='M165%2c72.6254c71.5%2c0%2c71.5-20.2364%2c143-20.2364'/%3e %3c/g%3e %3cg class='cls-4'%3e %3cpath class='cls-14' d='M165%2c119.2651H308'/%3e %3c/g%3e %3cg%3e %3ctext class='cls-15' transform='translate(298.8916 40.8394) scale(1.0541 1)'%3eF%3c/text%3e %3ctext class='cls-15' transform='translate(297.2217 114.8389) scale(1.0541 1)'%3eG%3c/text%3e %3c/g%3e %3cg%3e %3ctext class='cls-15' transform='translate(168 40.3091) scale(1.0541 1)'%3eD%3c/text%3e %3ctext class='cls-15' transform='translate(168 114.3086) scale(1.0541 1)'%3eE%3c/text%3e %3c/g%3e %3cg%3e %3ctext class='cls-16' transform='translate(15 20.7671) scale(1.0541 1)'%3eA%3c/text%3e %3ctext class='cls-15' transform='translate(15 45.73) scale(1.0541 1)'%3eB%3c/text%3e %3ctext class='cls-15' transform='translate(15 112.2832) scale(1.0541 1)'%3eC%3c/text%3e %3c/g%3e %3ctext class='cls-17' transform='translate(3.9409 8)'%3e%ce%b1%3c/text%3e %3ctext class='cls-17' transform='translate(156.98 8)'%3e%ce%b2%3c/text%3e %3ctext class='cls-17' transform='translate(310.2192 8)'%3e%ce%b3%3c/text%3e %3c/g%3e %3c/g%3e%3c/svg%3e";

const metadata = {
  name: 'Alluvial Diagram',
  id: 'rawgraphs.alluvialdiagram',
  thumbnail: img$1,
  icon: img,
  code: 'https://github.com/rawgraphs/rawgraphs-charts/tree/master/src/alluvialdiagram',
  tutorial: 'https://rawgraphs.io/learning/how-to-make-an-alluvial-diagram/',
  categories: ['correlations', 'proportions'],
  description: 'It shows correlations between categorical dimensions representing them as flows, visually linking categories with shared items. Each rectangle represents a unique value in the selected dimension, its height is proportional to its value. Correlations are represented with curved lines whose width is proportional to their value.'
};

const dimensions = [{
  id: 'steps',
  name: 'Steps',
  validTypes: ['number', 'date', 'string'],
  required: true,
  multiple: true,
  minValues: 2
}, {
  id: 'size',
  name: 'Size',
  validTypes: ['number'],
  required: false,
  aggregation: true,
  aggregationDefault: 'sum'
}];

const mapData = function (data, mapping, dataTypes, dimensions) {
  const sizeAggregator = getDimensionAggregator('size', mapping, dataTypes, dimensions);
  const results = []; // compute the rollup for each couple of steps
  // @TODO move this as grouping function

  mapping.steps.value.slice(0, -1).forEach((step1, index) => {
    //get the second step
    const step2 = mapping.steps.value[index + 1];
    rollups(data, v => {
      const item = {
        sourceName: v[0][step1],
        sourceStep: step1,
        source: step1 + ' - ' + v[0][step1],
        targetName: v[0][step2],
        targetStep: step2,
        target: step2 + ' - ' + v[0][step2],
        value: mapping.size.value ? sizeAggregator(v.map(d => d[mapping.size.value])) : v.length
      };
      results.push(item);
      return item;
    }, d => d[step1] + '_' + d[step2]);
  });
  return results;
};

selection.prototype.styles = styles;
transition.prototype.styles = styles; //other approach
// export const multiStyles = function (styles) {
//   return function (selection) {
//     for (const property in styles) {
//       selection.style(property, styles[property])
//     }
//   }
// }
//adapted from https://github.com/gka/d3-jetpack/blob/master/src/st.js

function styles(name, value) {
  if (typeof name == 'object') {
    for (var key in name) {
      addStyle(this, key, name[key]);
    }

    return this;
  } else if (typeof name === 'function') {
    return this.each(styleFunction(name));
  } else {
    return arguments.length == 1 ? this.style(name) : addStyle(this, name, value);
  }

  function addStyle(sel, style, value) {
    style = style.replace(/([a-z\d])([A-Z])/g, '$1-$2').toLowerCase();
    var pxStyles = 'top left bottom right padding-top padding-left padding-bottom padding-right border-top b-width border-left-width border-botto-width m border-right-width margin-top margin-left margin-bottom margin-right font-size width stroke-width line-height margin padding border border-radius max-width min-width max-height min-height';

    if (~pxStyles.indexOf(style)) {
      sel.style(style, typeof value == 'function' ? wrapPx(value) : addPx(value));
    } else {
      sel.style(style, value);
    }

    return sel;
  }

  function addPx(d) {
    return d.match ? d : d + 'px';
  }

  function wrapPx(fn) {
    return function () {
      var val = fn.apply(this, arguments);
      return addPx(val);
    };
  }

  function styleFunction(value) {
    return function () {
      var v = value.apply(this, arguments);

      for (var key in v) {
        addStyle(select(this), key, v[key]);
      }
    };
  }
}

function render(svgNode, data, visualOptions, mapping, originalData, styles) {
  const {
    // artboard
    width,
    height,
    background,
    // margins
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    // chart options
    nodesWidth,
    nodesPadding,
    linksOpacity,
    sortNodesBy,
    verticalAlignment,
    linksBlendMode,
    // color
    colorScale,
    // Labels
    showValues
  } = visualOptions;
  const margin = {
    top: marginTop,
    right: marginRight,
    bottom: marginBottom,
    left: marginLeft
  };
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom; // links are a deep copy of the dataset, to avoid modification of origina data variable

  const links = data.map(d => Object.assign({}, d)); //get unique nodes from links. @TODO: probably it could be improved

  let nodes = links.flatMap(l => [{
    id: l.source,
    name: l.sourceName,
    step: l.sourceStep
  }, {
    id: l.target,
    name: l.targetName,
    step: l.targetStep
  }]).reduce((map, obj) => {
    map.set(obj.id, obj);
    return map;
  }, new Map());
  nodes = Array.from(nodes).map(d => d[1]); // convert option with alignment function names
  const sankey$1 = sankey().nodeId(d => d.id).nodeWidth(nodesWidth).nodePadding(nodesPadding).extent([[0, 0], [chartWidth, chartHeight]]).iterations(0); // no iterations since we compute all the positions
  // compute the sankey network (calculate size, define x and y positions.)

  const network = sankey$1({
    nodes,
    links
  }); // sort nodes according to options

  switch (sortNodesBy) {
    case 'sizeDescending':
      network.nodes.sort((a, b) => descending(a.value, b.value));
      break;

    case 'sizeAscending':
      network.nodes.sort((a, b) => ascending(a.value, b.value));
      break;

    case 'name':
      network.nodes //first sort by type
      .sort((a, b) => ascending(typeof a.name, typeof b.name)) // then by actual value
      .sort((a, b) => ascending(a.name, b.name));
      break;
  } //check the amount of space required


  let verticalSize = rollups(network.nodes, v => v.length - 1, d => d.step);
  let maxItemsAmount = max(verticalSize, d => d[1]);

  if (maxItemsAmount * nodesPadding > chartHeight) {
    throw new Error('Padding is too high for artboard height. To represent all the ' + maxItemsAmount + ' items, increase artbort height above ' + (maxItemsAmount * nodesPadding + margin.top + margin.bottom) + 'px OR decrase padding below ' + Math.floor(chartHeight / maxItemsAmount) + 'px in the panel "chart" > "Padding"');
  } // compute x positions of groups
  // get the first node for each category
  // we don't use the sankey.nodeSort() and sankey.linkSort()
  // d3 functions since it doens't allow to center vertically the nodes


  const xScale = scaleBand().range([0, chartWidth - nodesWidth]).domain(mapping.steps.value).align(0).paddingInner(1); // update nodes vertical position

  groups(network.nodes, d => d.step) // for each group, compute position
  .forEach(group => {
    // compute the starting point.
    let yPos0 = 0;
    const totalSize = sum(group[1], d => d.y1 - d.y0) + (group[1].length - 1) * nodesPadding; // if top, do nothing.
    // if bottom, sum the size of nodes and required padding.
    // if center, the hal of the previous

    switch (verticalAlignment) {
      case 'Bottom':
        yPos0 = chartHeight - totalSize;
        break;

      case 'Center':
        yPos0 = (chartHeight - totalSize) / 2;
        break;
    } // take the list of nodes in the group, and recompute positions


    group[1].reduce((ypos, node) => {
      const nodeSize = node.y1 - node.y0;
      node.y0 = ypos;
      node.y1 = ypos + nodeSize;
      node.x0 = xScale(node.step);
      node.x1 = node.x0 + nodesWidth;
      return ypos + nodeSize + nodesPadding;
    }, yPos0);
  }); // sort edges to avoid overlaps

  network.nodes.forEach(node => {
    node.sourceLinks.sort((a, b) => ascending(a.target.y0, b.target.y0));
    node.targetLinks.sort((a, b) => ascending(a.source.y0, b.source.y0));
  }); // updates link position

  sankey$1.update(network); // draw background

  select(svgNode).append('rect').attr('width', width).attr('height', height).attr('x', 0).attr('y', 0).attr('fill', background).attr('id', 'background');
  const svg = select(svgNode).append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')').attr('id', 'visualization');
  svg.append('g').selectAll('rect').data(network.nodes).join('rect').attr('x', d => d.x0).attr('y', d => d.y0).attr('height', d => d.y1 - d.y0).attr('width', d => d.x1 - d.x0).attr('fill', 'black').append('title').text(d => `${d.name}: ${d.value}`);
  const link = svg.append('g').attr('fill', 'none').attr('stroke-opacity', linksOpacity).selectAll('g').data(network.links).join('g').style('mix-blend-mode', linksBlendMode);
  link.append('path').attr('d', sankeyLinkHorizontal()).attr('stroke', d => colorScale(d.source.id)).attr('stroke-width', d => Math.max(1, d.width));
  link.append('title').text(d => `${d.source.name} → ${d.target.name}: ${d.value}`);
  const nodesLabels = svg.append('g').selectAll('text').data(network.nodes).join('text').attr('x', d => d.x0 < width / 2 ? d.x1 + 4 : d.x0 - 4).attr('y', d => d.y0 + (d.y1 - d.y0) / 2).attr('text-anchor', d => d.x0 < width / 2 ? 'start' : 'end');
  nodesLabels.append('tspan').attr('alignment-baseline', 'middle').attr('x', d => d.x0 < width / 2 ? d.x1 + 4 : d.x0 - 4).text(d => d.name).styles(styles.labelPrimary);

  if (showValues) {
    nodesLabels.append('tspan').attr('alignment-baseline', 'middle').attr('x', d => d.x0 < width / 2 ? d.x1 + 4 : d.x0 - 4).attr('dy', parseFloat(styles.labelPrimary.fontSize) + 2).text(d => d.value).styles(styles.labelSecondary);
    nodesLabels.attr('transform', `translate(0,${-parseFloat(styles.labelSecondary.fontSize) / 2})`);
  } // add steps titles


  const firstNodes = groups(network.nodes, d => d.step).map(d => d[1][0]);
  svg.append('g').selectAll('text').data(firstNodes).join('text').attr('x', d => d.x0 + nodesWidth / 2).attr('y', d => d.y0 - 4).attr('text-anchor', 'middle').text(d => d.step).styles(styles.axisLabel);
}

const visualOptions = {
  marginTop: {
    type: 'number',
    label: 'Margin (top)',
    default: 10,
    group: 'artboard'
  },
  marginRight: {
    type: 'number',
    label: 'Margin (right)',
    default: 10,
    group: 'artboard'
  },
  marginBottom: {
    type: 'number',
    label: 'Margin (bottom)',
    default: 10,
    group: 'artboard'
  },
  marginLeft: {
    type: 'number',
    label: 'Margin (left)',
    default: 10,
    group: 'artboard'
  },
  nodesWidth: {
    type: 'number',
    label: 'Nodes width',
    default: 5,
    group: 'chart'
  },
  nodesPadding: {
    type: 'number',
    label: 'Padding',
    default: 5,
    group: 'chart'
  },
  linksOpacity: {
    type: 'number',
    label: 'Links opacity (0-1)',
    default: 1,
    step: 0.1,
    min: 0,
    max: 1,
    group: 'chart'
  },
  linksBlendMode: {
    type: 'text',
    label: 'Links blend mode',
    group: 'chart',
    options: ['normal', 'multiply'],
    default: 'multiply'
  },
  sortNodesBy: {
    type: 'text',
    label: 'Sort nodes by',
    group: 'chart',
    options: [{
      label: 'Size (descending)',
      value: 'sizeDescending'
    }, {
      label: 'Size (ascending)',
      value: 'sizeAscending'
    }, {
      label: 'Name',
      value: 'name'
    }, {
      label: 'Minimize Overlaps',
      value: 'auto'
    }],
    default: 'sizeAscending'
  },
  verticalAlignment: {
    type: 'text',
    label: 'Flows alignment',
    group: 'chart',
    options: ['Top', 'Center', 'Bottom'],
    default: 'Center'
  },
  colorScale: {
    type: 'colorScale',
    label: 'Color scale',
    dimension: 'source',
    default: {
      scaleType: 'ordinal',
      interpolator: 'interpolateSpectral'
    },
    group: 'colors'
  },
  showValues: {
    type: 'boolean',
    label: 'Show nodes values',
    default: false,
    group: 'Labels'
  }
};

var styles$1 = {"axisLabel":{"fontFamily":"Arial, sans-serif","fontSize":"12px","fill":"#7b7b7b","fontWeight":"bold"},"axisLine":{"stroke":"#ccc"},"labelPrimary":{"fontFamily":"Arial, sans-serif","fontSize":"10px","fill":"black","fontWeight":"bold"},"labelSecondary":{"fontFamily":"Arial, sans-serif","fontSize":"10px","fill":"black","fontWeight":"normal"},"labelItalic":{"fontFamily":"Arial, sans-serif","fontSize":"10px","fill":"black","fontWeight":"normal","fontStyle":"italic"},"seriesLabel":{"fontFamily":"Arial, sans-serif","fontSize":"12px","fill":"black","fontWeight":"bold","dominantBaseline":"hanging"},"labelOutline":{"strokeWidth":"2px","paintOrder":"stroke","stroke":"white","strokeLinecap":"round","strokeLinejoin":"round"}};

var alluvialdiagram = {
  metadata,
  dimensions,
  mapData,
  render,
  visualOptions,
  styles: styles$1
};

var img$2 = "data:image/svg+xml,%3csvg id='rawgraphs-icons' xmlns='http://www.w3.org/2000/svg' width='56' height='56' viewBox='0 0 56 56'%3e %3cdefs%3e %3cstyle%3e .cls-1 %7b fill: %2395e5c0%3b %7d .cls-2 %7b fill: %2306c26c%3b %7d %3c/style%3e %3c/defs%3e %3cg id='secundary'%3e %3cpath class='cls-1' d='M46%2c36.5a12.5819%2c12.5819%2c0%2c0%2c0-.0647-1.2765A18.4765%2c18.4765%2c0%2c0%2c0%2c9.0491%2c35.53%2c9.5958%2c9.5958%2c0%2c0%2c0%2c9%2c36.5h1a2.5%2c2.5%2c0%2c0%2c1%2c5%2c0h1a5.4595%2c5.4595%2c0%2c0%2c1%2c6.2635-5.4406A12.4026%2c12.4026%2c0%2c0%2c0%2c21%2c36.5h1a11.4147%2c11.4147%2c0%2c0%2c1%2c1.2594-5.2061A5.5067%2c5.5067%2c0%2c0%2c1%2c27%2c36.5h1a9.4809%2c9.4809%2c0%2c0%2c0-3.3994-7.2723%2c11.4824%2c11.4824%2c0%2c0%2c1%2c19.39%2c2.5843A6.4914%2c6.4914%2c0%2c0%2c0%2c33%2c36.5h1a2.5%2c2.5%2c0%2c0%2c1%2c5%2c0h1A3.5042%2c3.5042%2c0%2c0%2c0%2c36.5%2c33a3.4586%2c3.4586%2c0%2c0%2c0-1.5038.3531%2c5.4954%2c5.4954%2c0%2c0%2c1%2c9.9754%2c2.5853c.0091.1873.0284.372.0284.5616ZM21.5%2c30a6.5082%2c6.5082%2c0%2c0%2c0-6.1676%2c4.4611%2c3.4741%2c3.4741%2c0%2c0%2c0-4.8217-.8345%2c8.4807%2c8.4807%2c0%2c0%2c1%2c12.6938-4.2c-.1559.2262-.2967.4627-.4378.6993A6.4973%2c6.4973%2c0%2c0%2c0%2c21.5%2c30Zm3.4943%2c1.0281a6.48%2c6.48%2c0%2c0%2c0-1.2336-.6144c.08-.1275.1542-.2587.2389-.3828A8.5707%2c8.5707%2c0%2c0%2c1%2c24.9943%2c31.0281ZM33.5%2c24a12.4777%2c12.4777%2c0%2c0%2c0-9.6944%2c4.6233A9.4733%2c9.4733%2c0%2c0%2c0%2c11.024%2c30.6584a17.4738%2c17.4738%2c0%2c0%2c1%2c31.9686-2.27A12.469%2c12.469%2c0%2c0%2c0%2c33.5%2c24Z'/%3e %3c/g%3e %3cg id='primary'%3e %3ccircle class='cls-2' cx='9.5' cy='36.5' r='1.5'/%3e %3ccircle class='cls-2' cx='15.5' cy='36.5' r='1.5'/%3e %3ccircle class='cls-2' cx='21.5' cy='36.5' r='1.5'/%3e %3ccircle class='cls-2' cx='27.5' cy='36.5' r='1.5'/%3e %3ccircle class='cls-2' cx='33.5' cy='36.5' r='1.5'/%3e %3ccircle class='cls-2' cx='39.5' cy='36.5' r='1.5'/%3e %3ccircle class='cls-2' cx='45.5' cy='36.5' r='1.5'/%3e %3c/g%3e%3c/svg%3e";

var img$3 = "data:image/svg+xml,%3csvg id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' width='320' height='160' viewBox='0 0 320 160'%3e %3cdefs%3e %3cstyle%3e .cls-1 %7b fill: none%3b stroke: %23ccc%3b %7d .cls-2 %7b fill: %239e0142%3b %7d .cls-3 %7b fill: %235e4fa2%3b %7d .cls-4 %7b fill: %23e0f3a1%3b %7d .cls-5 %7b fill: %23fedd8d%3b %7d .cls-6 %7b fill: %2369bda9%3b %7d .cls-7 %7b fill: %23f0704a%3b %7d %3c/style%3e %3c/defs%3e %3cg%3e %3cpath class='cls-1' d='M165.23547%2c152.97288a11.48737%2c11.48737%2c0%2c0%2c0-22.97475%2c0'/%3e %3cpath class='cls-1' d='M38.87432%2c152.97288a28.71845%2c28.71845%2c0%2c0%2c1%2c57.43689%2c0'/%3e %3cpath class='cls-1' d='M4.41219%2c152.97288a11.48738%2c11.48738%2c0%2c0%2c1%2c22.97476%2c0'/%3e %3cpath class='cls-1' d='M188.21023%2c152.97288a22.97475%2c22.97475%2c0%2c1%2c1%2c45.94951%2c0'/%3e %3cpath class='cls-1' d='M245.64712%2c152.97288a120.61747%2c120.61747%2c0%2c0%2c0-241.23493%2c0'/%3e %3cpath class='cls-1' d='M50.3617%2c152.97288a22.97476%2c22.97476%2c0%2c1%2c0-45.94951%2c0'/%3e %3cpath class='cls-1' d='M188.21023%2c152.97288a5.74369%2c5.74369%2c0%2c1%2c0-11.48738%2c0'/%3e %3cpath class='cls-1' d='M291.59663%2c152.97288a143.59222%2c143.59222%2c0%2c1%2c0-287.18444%2c0'/%3e %3cpath class='cls-1' d='M153.74809%2c152.97288a11.48738%2c11.48738%2c0%2c0%2c1%2c22.97476%2c0'/%3e %3cpath class='cls-1' d='M119.286%2c152.97288a5.74369%2c5.74369%2c0%2c1%2c1%2c11.48738%2c0'/%3e %3cpath class='cls-1' d='M38.87432%2c152.97288a5.74369%2c5.74369%2c0%2c1%2c1%2c11.48738%2c0'/%3e %3cpath class='cls-1' d='M165.23547%2c152.97288a5.74369%2c5.74369%2c0%2c1%2c1%2c11.48738%2c0'/%3e %3cpath class='cls-1' d='M257.1345%2c152.97288a91.899%2c91.899%2c0%2c1%2c0-183.798%2c0'/%3e %3cpath class='cls-1' d='M176.72285%2c152.97288a17.23107%2c17.23107%2c0%2c0%2c0-34.46213%2c0h0'/%3e %3cpath class='cls-1' d='M234.15974%2c152.97288a11.48737%2c11.48737%2c0%2c0%2c0-22.97475%2c0'/%3e %3cpath class='cls-1' d='M303.084%2c152.97288a132.10485%2c132.10485%2c0%2c0%2c0-264.20968%2c0'/%3e %3cpath class='cls-1' d='M234.15974%2c152.97288a17.23107%2c17.23107%2c0%2c0%2c0-34.46213%2c0h0'/%3e %3cpath class='cls-1' d='M165.23547%2c152.97288a28.71844%2c28.71844%2c0%2c0%2c0-57.43688%2c0'/%3e %3cpath class='cls-1' d='M73.33645%2c152.97288a34.46213%2c34.46213%2c0%2c0%2c0-68.92426%2c0'/%3e %3cpath class='cls-1' d='M211.185%2c152.97288a5.74369%2c5.74369%2c0%2c1%2c0-11.48738%2c0'/%3e %3cpath class='cls-1' d='M15.89957%2c152.97288a17.23107%2c17.23107%2c0%2c0%2c1%2c34.46213%2c0h0'/%3e %3cpath class='cls-1' d='M38.87432%2c152.97288a86.15534%2c86.15534%2c0%2c0%2c1%2c172.31067%2c0'/%3e %3cpath class='cls-1' d='M188.21023%2c152.97288a5.74369%2c5.74369%2c0%2c1%2c1%2c11.48738%2c0'/%3e %3cpath class='cls-1' d='M107.79859%2c152.97288a11.48738%2c11.48738%2c0%2c0%2c1%2c22.97476%2c0'/%3e %3cpath class='cls-1' d='M15.89957%2c152.97288a5.74369%2c5.74369%2c0%2c1%2c0-11.48738%2c0'/%3e %3cpath class='cls-1' d='M188.21023%2c152.97288a11.48738%2c11.48738%2c0%2c0%2c1%2c22.97476%2c0'/%3e %3cpath class='cls-1' d='M165.23547%2c152.97288a5.74369%2c5.74369%2c0%2c1%2c0-11.48738%2c0'/%3e %3cpath class='cls-1' d='M107.79859%2c152.97288a5.74369%2c5.74369%2c0%2c1%2c1%2c11.48738%2c0'/%3e %3cpath class='cls-1' d='M107.79859%2c152.97288a34.46213%2c34.46213%2c0%2c0%2c1%2c68.92426%2c0'/%3e %3cpath class='cls-1' d='M314.57139%2c152.97288a103.3864%2c103.3864%2c0%2c1%2c0-206.77281%2c0h0'/%3e %3cpath class='cls-1' d='M38.87432%2c152.97288a114.87378%2c114.87378%2c0%2c1%2c1%2c229.74756%2c0'/%3e %3cpath class='cls-1' d='M38.87432%2c152.97288a17.23107%2c17.23107%2c0%2c0%2c0-34.46213%2c0'/%3e %3cpath class='cls-1' d='M38.87432%2c152.97288a11.48738%2c11.48738%2c0%2c0%2c0-22.97475%2c0'/%3e %3cpath class='cls-1' d='M61.84908%2c152.97288a28.71845%2c28.71845%2c0%2c0%2c0-57.43689%2c0'/%3e %3cpath class='cls-1' d='M291.59663%2c152.97288a97.64271%2c97.64271%2c0%2c0%2c0-195.28542%2c0'/%3e %3cpath class='cls-1' d='M314.57139%2c152.97288a68.92427%2c68.92427%2c0%2c0%2c0-137.84854%2c0h0'/%3e %3cpath class='cls-1' d='M84.82383%2c152.97288a22.97476%2c22.97476%2c0%2c1%2c0-45.94951%2c0'/%3e %3cpath class='cls-1' d='M222.67236%2c152.97288a109.13009%2c109.13009%2c0%2c0%2c0-218.26017%2c0'/%3e %3cpath class='cls-1' d='M176.72285%2c152.97288a28.71844%2c28.71844%2c0%2c0%2c0-57.43688%2c0'/%3e %3cpath class='cls-1' d='M107.79859%2c152.97288a63.18058%2c63.18058%2c0%2c0%2c1%2c126.36115%2c0'/%3e %3cpath class='cls-1' d='M107.79859%2c152.97288a34.46214%2c34.46214%2c0%2c0%2c0-68.92427%2c0'/%3e %3cpath class='cls-1' d='M153.74809%2c152.97288a5.74369%2c5.74369%2c0%2c1%2c0-11.48737%2c0'/%3e %3cpath class='cls-1' d='M188.21023%2c152.97288a74.668%2c74.668%2c0%2c1%2c0-149.3359%2c0h0'/%3e %3cpath class='cls-1' d='M130.77332%2c152.97288a74.668%2c74.668%2c0%2c1%2c1%2c149.33592%2c0'/%3e %3cpath class='cls-1' d='M107.79859%2c152.97288a51.6932%2c51.6932%2c0%2c1%2c1%2c103.3864%2c0'/%3e %3ccircle class='cls-2' cx='4.41219' cy='152.97288' r='4.4122'/%3e %3ccircle class='cls-3' cx='15.89957' cy='152.97288' r='3.84557'/%3e %3ccircle class='cls-4' cx='27.38695' cy='152.97288' r='3.61601'/%3e %3ccircle class='cls-2' cx='38.87432' cy='152.97288' r='7.02712'/%3e %3ccircle class='cls-2' cx='50.3617' cy='152.97288' r='3.91323'/%3e %3ccircle class='cls-5' cx='61.84908' cy='152.97288' r='3.01162'/%3e %3ccircle class='cls-2' cx='73.33645' cy='152.97288' r='3.01162'/%3e %3ccircle class='cls-2' cx='84.82383' cy='152.97288' r='3.01162'/%3e %3ccircle class='cls-3' cx='96.31121' cy='152.97288' r='3.01162'/%3e %3ccircle class='cls-3' cx='107.79859' cy='152.97288' r='4.36371'/%3e %3ccircle class='cls-3' cx='119.28597' cy='152.97288' r='3.52703'/%3e %3ccircle class='cls-6' cx='130.77335' cy='152.97288' r='3.4286' transform='translate(-14.43719 13.6306) rotate(-5.65498)'/%3e %3ccircle class='cls-4' cx='142.26072' cy='152.97288' r='3.4286'/%3e %3ccircle class='cls-4' cx='153.74809' cy='152.97288' r='3.52703'/%3e %3ccircle class='cls-4' cx='165.23547' cy='152.97288' r='3.52703'/%3e %3ccircle class='cls-6' cx='176.72285' cy='152.97288' r='3.61602'/%3e %3ccircle class='cls-7' cx='188.21023' cy='152.97288' r='5.687'/%3e %3ccircle class='cls-7' cx='199.69761' cy='152.97288' r='4.26255'/%3e %3ccircle class='cls-7' cx='211.18499' cy='152.97288' r='4.7613'/%3e %3ccircle class='cls-6' cx='222.67236' cy='152.97288' r='3.01162'/%3e %3ccircle class='cls-6' cx='234.15974' cy='152.97288' r='4.63738'/%3e %3ccircle class='cls-6' cx='245.64712' cy='152.97288' r='3.01162'/%3e %3ccircle class='cls-6' cx='257.1345' cy='152.97288' r='3.01162'/%3e %3ccircle class='cls-5' cx='268.62188' cy='152.97288' r='3.31688'/%3e %3ccircle class='cls-5' cx='280.10924' cy='152.97288' r='3.18435'/%3e %3ccircle class='cls-5' cx='291.59663' cy='152.97288' r='3.01162'/%3e %3ccircle class='cls-7' cx='303.084' cy='152.97288' r='3.01162'/%3e %3ccircle class='cls-7' cx='314.57139' cy='152.97288' r='3.42861'/%3e %3c/g%3e%3c/svg%3e";

const metadata$1 = {
  name: 'Arc Diagram',
  id: 'rawgraphs.arcdiagram',
  thumbnail: img$3,
  icon: img$2,
  categories: ['networks'],
  description: 'A particular kind of network graph, allows seeing relationships among nodes. Nodes are displayed on the horizontal axis, and links as clockwise arcs. An arc above the nodes means a connection from the left to the right, while below means a connection from the right node to the left one.',
  code: 'https://github.com/rawgraphs/rawgraphs-charts/tree/master/src/arcdiagram',
  tutorial: 'https://rawgraphs.io/learning/how-to-make-an-arc-diagram/'
};

const dimensions$1 = [{
  id: 'source',
  name: 'Source node',
  validTypes: ['number', 'date', 'string'],
  required: true
}, {
  id: 'target',
  name: 'Target node',
  validTypes: ['number', 'date', 'string'],
  required: true
}, {
  id: 'size',
  name: 'Size',
  validTypes: ['number'],
  required: false,
  aggregation: true,
  aggregationDefault: 'sum'
}];

const mapData$1 = function (data, mapping, dataTypes, dimensions) {
  const sizeAggregator = getDimensionAggregator('size', mapping, dataTypes, dimensions);
  const results = [];
  rollups(data, v => {
    const item = {
      source: v[0][mapping.source.value],
      target: v[0][mapping.target.value],
      value: mapping.size.value ? sizeAggregator(v.map(d => d[mapping.size.value])) : 1
    };
    results.push(item);
    return item;
  }, d => d[mapping.source.value] + d[mapping.target.value] // crossgrup functions. aggregate links among same source and target
  );
  return results;
};

/*
Credits:
Inspired by https://observablehq.com/@d3/arc-diagram
*/

function render$1(svgNode, data, visualOptions, mapping, originalData) {
  const {
    // artboard
    width,
    height,
    background,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    //chart
    minDiameter,
    maxDiameter,
    nodeSize,
    orderNodesBy,
    linkOpacity,
    sameSide
  } = visualOptions;
  const margin = {
    top: marginTop,
    right: marginRight,
    bottom: marginBottom,
    left: marginLeft
  };
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom; // create a graph data file from the incoming data

  let graph = graphFromEdgesTable(data); //compute nodes modularity

  if (orderNodesBy == 'Minimize overlaps') {
    let community = jLouvain().nodes(graph.nodes.map(d => d.id)).edges(graph.links.map(d => ({
      source: d.source.id,
      target: d.target.id,
      weight: d.value
    })));
    let results = community();
    graph.nodes.forEach(n => n.community = results[n.id]);
  } // sort nodes
  // 'Name', 'Links count (degree)', 'Total value'


  graph.nodes.sort((a, b) => {
    switch (orderNodesBy) {
      case 'Total value':
        return descending(a.totalValue, b.totalValue);

      case 'Links count (degree)':
        return ascending(a.degree, b.degree);

      case 'Name':
        return ascending(a.id, b.id);

      case 'Minimize overlaps':
        return ascending(a.community, b.community);

      default:
        return 0;
    }
  }); // size scale

  const sizeScale = scaleSqrt().domain([0, max(graph.nodes, d => d[nodeSize])]).range([minDiameter, maxDiameter]); // widthScale (for nodes)

  const widthScale = scaleLinear().domain([0, max(graph.links, d => d.value)]).range([0, maxDiameter]); // get the total size

  const totalValue = sum(graph.nodes, d => sizeScale(d[nodeSize]) * 2); // compute padding

  const padding = (chartWidth - totalValue) / (graph.nodes.length - 1); // compute x positions. @TODO could be improved

  let xPos = 0;
  graph.nodes.forEach((d, i) => {
    d.x = xPos + sizeScale(d[nodeSize]);
    d.y = sameSide ? chartHeight - maxDiameter : chartHeight / 2;
    xPos += padding + sizeScale(d[nodeSize]) * 2;
  }); // add background

  select(svgNode).append('rect').attr('width', width).attr('height', height).attr('x', 0).attr('y', 0).attr('fill', background).attr('id', 'background');
  const svg = select(svgNode).append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')').attr('id', 'viz'); // draw links

  const arcs = svg.append('g').attr('id', 'arcs');
  arcs.selectAll('path').data(graph.links).enter().append('path').attr('d', d => {
    const r = Math.abs(d.source.x - d.target.x) / 2;
    const sweep = sameSide ? d.source.x < d.target.x ? 1 : 0 : 1;
    return `M${d.source.x},${d.source.y}A${r},${r} 0,0,${sweep} ${d.target.x},${d.target.y}`;
  }).attr('fill', 'none').attr('stroke', 'gray').attr('stroke-width', d => widthScale(d.value)).attr('opacity', linkOpacity); // draw nodes

  const nodes = svg.append('g').attr('id', 'nodes').selectAll('g').data(graph.nodes).enter().append('g'); // add circles

  nodes.append('circle').attr('cx', d => d.x).attr('cy', d => d.y).attr('r', d => sizeScale(d[nodeSize])); // add labels

  nodes.append('text') // .attr('x', (d) => d.x)
  // .attr('y', (d) => d.y + sizeScale(d[nodeSize]))
  .text(d => d.id).attr('transform', d => `translate(${d.x},${d.y + sizeScale(d[nodeSize]) + 5}) rotate(-90)`).attr('alignment-baseline', 'middle').attr('font-family', 'Helvetica, Arial, sans-serif').attr('font-size', 12).attr('text-anchor', 'end');
}
/*
 helper function to create a graph js object
 */

function graphFromEdgesTable(_edgesTable) {
  // links are a deep copy of the dataset, to avoid modification of origina data variable
  let links = _edgesTable.map(d => Object.assign({}, d));

  const nodes = Array.from(new Set(links.flatMap(l => [l.source, l.target])), id => ({
    id,
    outLinks: [],
    inLinks: [],
    totalValue: 0,
    inValue: 0,
    outValue: 0,
    degree: 0,
    inDegree: 0,
    outDegree: 0,
    default: 1
  }));
  const nodeById = new Map(nodes.map(d => [d.id, d])); //links are now re-populated ank linked to nodes objects

  links = links.map(({
    source,
    target,
    value
  }) => ({
    source: nodeById.get(source),
    target: nodeById.get(target),
    value
  })); // links added to nodes objects

  for (const link of links) {
    const {
      source,
      target,
      value
    } = link; //update source

    source.outLinks.push(link);
    source.totalValue += link.value;
    source.outValue += link.value;
    source.degree++;
    source.outDegree++; //update target

    target.inLinks.push(link);
    target.degree++;
    target.inDegree++;
    target.totalValue += link.value;
    target.inValue += link.value;
  }

  return {
    nodes,
    links
  };
}

const visualOptions$1 = {
  marginTop: {
    type: 'number',
    label: 'Margin (top)',
    default: 10,
    group: 'artboard'
  },
  marginRight: {
    type: 'number',
    label: 'Margin (right)',
    default: 10,
    group: 'artboard'
  },
  marginBottom: {
    type: 'number',
    label: 'Margin (bottom)',
    default: 10,
    group: 'artboard'
  },
  marginLeft: {
    type: 'number',
    label: 'Margin (left)',
    default: 10,
    group: 'artboard'
  },
  minDiameter: {
    type: 'number',
    label: 'Min diameter',
    default: 2,
    group: 'chart'
  },
  maxDiameter: {
    type: 'number',
    label: 'Max diameter',
    default: 30,
    group: 'chart'
  },
  linkOpacity: {
    type: 'number',
    label: 'Links opacity (0-1)',
    default: 0.5,
    step: 0.1,
    min: 0,
    max: 1,
    group: 'chart'
  },
  sameSide: {
    type: 'boolean',
    label: 'Arcs only on the top',
    default: false,
    group: 'chart'
  },
  nodeSize: {
    type: 'text',
    label: 'Nodes diameter',
    group: 'chart',
    options: [{
      label: 'Same size',
      value: 'default'
    }, {
      label: 'Weighted degree',
      value: 'totalValue'
    }, {
      label: 'Weighted inDegree',
      value: 'inValue'
    }, {
      label: 'Weighted outDegree',
      value: 'outValue'
    }, {
      label: 'Links count',
      value: 'degree'
    }, {
      label: 'OutDegree',
      value: 'outDegree'
    }, {
      label: 'InDegree',
      value: 'inDegree'
    }],
    default: 'totalValue'
  },
  orderNodesBy: {
    type: 'text',
    label: 'Sort nodes by',
    group: 'chart',
    options: ['Name', 'Links count (degree)', 'Size', 'Minimize overlaps'],
    default: 'Minimize overlaps'
  }
};

var arcdiagram = {
  metadata: metadata$1,
  dimensions: dimensions$1,
  mapData: mapData$1,
  render: render$1,
  visualOptions: visualOptions$1
};

var img$4 = "data:image/svg+xml,%3csvg id='rawgraphs-icons' xmlns='http://www.w3.org/2000/svg' width='56' height='56' viewBox='0 0 56 56'%3e %3cdefs%3e %3cstyle%3e .cls-1 %7b fill: %2395e5c0%3b %7d .cls-2 %7b fill: %2306c26c%3b %7d %3c/style%3e %3c/defs%3e %3cg id='secundary'%3e %3crect class='cls-1' x='21' y='29' width='7' height='19'/%3e %3crect class='cls-1' x='41' y='34' width='7' height='14'/%3e %3c/g%3e %3cg id='primary'%3e %3cpolygon class='cls-2' points='9.185 9.685 7.5 8 5.815 9.685 5.815 11.115 7.003 9.927 7.003 48 7.997 48 7.997 9.927 9.185 11.115 9.185 9.685'/%3e %3crect class='cls-2' x='31' y='22.9517' width='7' height='25.0483'/%3e %3crect class='cls-2' x='11' y='36' width='7' height='12'/%3e %3c/g%3e%3c/svg%3e";

var img$5 = "data:image/svg+xml,%3csvg id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' width='320' height='160' viewBox='0 0 320 160'%3e %3cdefs%3e %3cstyle%3e .cls-1 %7b fill: white%3b %7d .cls-2 %7b fill: %23bee5a0%3b %7d .cls-3 %7b fill: %235e4fa2%3b %7d .cls-4 %7b fill: %23fdbe70%3b %7d .cls-5 %7b fill: %239e0142%3b %7d .cls-6 %7b fill: none%3b stroke: black%3b %7d .cls-7%2c .cls-8 %7b isolation: isolate%3b font-family: Helvetica%3b %7d .cls-7 %7b font-size: 12px%3b %7d .cls-8 %7b font-size: 10px%3b %7d %3c/style%3e %3c/defs%3e %3crect id='background' class='cls-1' width='320' height='160'/%3e %3cg id='viz'%3e %3cg%3e %3cg%3e %3crect id='undefined_-_a' data-name='undefined - a' class='cls-2' x='28.9863' y='18.3333' width='46.1826' height='70'/%3e %3crect id='undefined_-_b' data-name='undefined - b' class='cls-3' x='77.1553' y='78.3333' width='46.1826' height='10'/%3e %3crect id='undefined_-_c' data-name='undefined - c' class='cls-4' x='125.3242' y='88.3333' width='46.1826' height='10'/%3e %3crect id='undefined_-_d' data-name='undefined - d' class='cls-5' x='173.4932' y='88.3333' width='46.1826' height='56.6667'/%3e %3crect id='undefined_-_e' data-name='undefined - e' class='cls-4' x='221.6621' y='88.3333' width='46.1826' height='40'/%3e %3crect id='undefined_-_f' data-name='undefined - f' class='cls-3' x='269.8311' y='58.3333' width='46.1826' height='30'/%3e %3c/g%3e %3cg id='xAxis'%3e %3cpath class='cls-6' d='M27.5%2c88.8333h291'/%3e %3cg%3e %3cline class='cls-6' x1='52.0776' y1='88.3333' x2='52.0776' y2='94.3333'/%3e %3ctext class='cls-7' transform='translate(49.2969 104.4333)'%3ea%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-6' x1='100.2466' y1='88.3333' x2='100.2466' y2='94.3333'/%3e %3ctext class='cls-7' transform='translate(97.4658 104.4333)'%3eb%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-6' x1='148.4155' y1='88.3333' x2='148.4155' y2='94.3333'/%3e %3ctext class='cls-7' transform='translate(145.9155 104.4333)'%3ec%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-6' x1='196.5845' y1='88.3333' x2='196.5845' y2='94.3333'/%3e %3ctext class='cls-7' transform='translate(193.8037 104.4333)'%3ed%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-6' x1='244.7534' y1='88.3333' x2='244.7534' y2='94.3333'/%3e %3ctext class='cls-7' transform='translate(241.9727 104.4333)'%3ee%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-6' x1='292.9224' y1='88.3333' x2='292.9224' y2='94.3333'/%3e %3ctext class='cls-7' transform='translate(291.5332 104.4333)'%3ef%3c/text%3e %3c/g%3e %3c/g%3e %3cg id='yAxis'%3e %3cpath class='cls-6' d='M27.5%2c155.5V5.5'/%3e %3cg%3e %3cline class='cls-6' x1='27' y1='155.5' x2='21' y2='155.5'/%3e %3ctext class='cls-8' transform='translate(1.0371 158.7)'%3e%e2%88%9220%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-6' x1='27' y1='138.8333' x2='21' y2='138.8333'/%3e %3ctext class='cls-8' transform='translate(1.0371 142.0333)'%3e%e2%88%9215%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-6' x1='27' y1='122.1667' x2='21' y2='122.1667'/%3e %3ctext class='cls-8' transform='translate(1.0371 125.3667)'%3e%e2%88%9210%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-6' x1='27' y1='105.5' x2='21' y2='105.5'/%3e %3ctext class='cls-8' transform='translate(6.5986 108.7)'%3e%e2%88%925%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-6' x1='27' y1='88.8333' x2='21' y2='88.8333'/%3e %3ctext class='cls-8' transform='translate(12.4385 92.0333)'%3e0%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-6' x1='27' y1='72.1667' x2='21' y2='72.1667'/%3e %3ctext class='cls-8' transform='translate(12.4385 75.3667)'%3e5%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-6' x1='27' y1='55.5' x2='21' y2='55.5'/%3e %3ctext class='cls-8' transform='translate(6.877 58.7)'%3e10%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-6' x1='27' y1='38.8333' x2='21' y2='38.8333'/%3e %3ctext class='cls-8' transform='translate(6.877 42.0333)'%3e15%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-6' x1='27' y1='22.1667' x2='21' y2='22.1667'/%3e %3ctext class='cls-8' transform='translate(6.877 25.3666)'%3e20%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-6' x1='27' y1='5.5' x2='21' y2='5.5'/%3e %3ctext class='cls-8' transform='translate(6.877 8.7)'%3e25%3c/text%3e %3c/g%3e %3c/g%3e %3c/g%3e %3c/g%3e%3c/svg%3e";

const metadata$2 = {
  name: 'Bar chart',
  thumbnail: img$5,
  icon: img$4,
  id: 'rawgraphs.barchart',
  categories: ['correlations'],
  description: 'It displays a categorical dimension and related amounts. Each bar represents a category, width is proportional to the quantitative dimension.',
  code: 'https://github.com/rawgraphs/rawgraphs-charts/tree/master/src/barchart',
  tutorial: 'https://rawgraphs.io/learning/how-to-make-a-barchart/'
};

const dimensions$2 = [{
  id: 'bars',
  name: 'Bars',
  validTypes: ['number', 'string', 'date'],
  required: true,
  operation: 'get'
}, {
  id: 'size',
  name: 'Size',
  operation: 'get',
  validTypes: ['number'],
  required: false,
  aggregation: true,
  aggregationDefault: 'sum'
}, {
  id: 'color',
  name: 'Color',
  operation: 'get',
  validTypes: ['number', 'string', 'date'],
  required: false,
  aggregation: true,
  aggregationDefault: {
    number: 'sum',
    string: 'csvDistinct',
    date: 'csvDistinct'
  }
}, {
  id: 'series',
  name: 'Series',
  validTypes: ['number', 'string', 'date'],
  required: false,
  operation: 'get'
}];

const mapData$2 = function (data, mapping, dataTypes, dimensions) {
  // define aggregators
  const colorAggregator = getDimensionAggregator('color', mapping, dataTypes, dimensions);
  const sizeAggregator = getDimensionAggregator('size', mapping, dataTypes, dimensions); // add the non-compulsory dimensions.

  if (!('color' in mapping)) mapping.color = {
    value: undefined
  };
  if (!('series' in mapping)) mapping.series = {
    value: undefined
  };
  if (!('size' in mapping)) mapping.size = {
    value: undefined
  };
  let results = [];
  rollups(data, v => {
    const item = {
      series: v[0][mapping.series.value],
      // get the first one since it's grouped
      bars: v[0][mapping.bars.value],
      // get the first one since it's grouped
      size: mapping.size.value ? sizeAggregator(v.map(d => d[mapping.size.value])) : v.length,
      // aggregate. If not mapped, give 1 as size
      color: mapping.color.value ? colorAggregator(v.map(d => d[mapping.color.value])) : 'default' // aggregate, by default single color.

    };
    results.push(item);
    return item;
  }, d => d[mapping.series.value], // series grouping
  d => d[mapping.bars.value].toString() // bars grouping. toString() to enable grouping on dates
  );
  return results;
};

function render$2(svgNode, data, visualOptions, mapping, originalData, styles) {
  const {
    // artboard options
    width,
    height,
    background,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    // chart options
    padding,
    barsOrientation,
    sortBarsBy,
    // series options
    columnsNumber,
    useSameScale,
    sortSeriesBy,
    showSeriesLabels,
    repeatAxesLabels,
    showGrid,
    // color options
    colorScale,
    // legend
    showLegend,
    legendWidth
  } = visualOptions;
  const margin = {
    top: marginTop,
    right: marginRight,
    bottom: marginBottom,
    left: marginLeft
  };
  const horizontalBars = {
    horizontal: true,
    vertical: false
  }[barsOrientation];

  if (mapping.bars.dataType.type === 'date') {
    // set date format  from input data
    const timeFormat$1 = timeFormat(dateFormats$1[mapping.bars.dataType.dateFormat]); // use it to format date

    data.forEach(d => {
      d.bars = timeFormat$1(Date.parse(d.bars));
    });
  } // create nest structure


  const nestedData = groups(data, d => d.series).map(d => ({
    data: d,
    totalSize: sum(d[1], d => d.size)
  }));
  console.log(nestedData); // series sorting functions

  const seriesSortings = {
    totalDescending: function (a, b) {
      return descending(a.totalSize, b.totalSize);
    },
    totalAscending: function (a, b) {
      return ascending(a.totalSize, b.totalSize);
    },
    name: function (a, b) {
      return ascending(a.data[0], b.data[0]);
    }
  }; // sort series

  nestedData.sort(seriesSortings[sortSeriesBy]); // add background

  select(svgNode).append('rect').attr('width', showLegend ? width + legendWidth : width).attr('height', height).attr('x', 0).attr('y', 0).attr('fill', background).attr('id', 'background'); // set up grid

  const gridding$1 = gridding().size([width, height]).mode('grid').padding(0) // no padding, margins will be applied inside
  .cols(mapping.series.value ? columnsNumber : 1);
  const griddingData = gridding$1(nestedData);
  const svg = select(svgNode).append('g').attr('id', 'viz');
  const series = svg.selectAll('g').data(griddingData).join('g').attr('id', d => d.data[0]).attr('transform', d => 'translate(' + d.x + ',' + d.y + ')'); // value domain

  let originalDomain = extent(data, d => d.size);
  let sizeDomain = originalDomain[0] > 0 ? [0, originalDomain[1]] : originalDomain; // bars sorting functions

  const barsSortings = {
    totalDescending: function (a, b) {
      return descending(a[1], b[1]);
    },
    totalAscending: function (a, b) {
      return ascending(a[1], b[1]);
    },
    name: function (a, b) {
      return ascending(a[0], b[0]);
    },
    original: function (a, b) {
      return true;
    }
  }; // bars domain

  const barsDomain = rollups(data, v => sum(v, d => d.size), d => d.bars).sort(barsSortings[sortBarsBy]).map(d => d[0]); // add grid

  if (showGrid) {
    svg.append('g').attr('id', 'grid').selectAll('rect').data(griddingData).enter().append('rect').attr('x', d => d.x).attr('y', d => d.y).attr('width', d => d.width).attr('height', d => d.height).attr('fill', 'none').attr('stroke', '#ccc');
  }

  series.each(function (d, seriesIndex) {
    // make a local selection for each serie
    const selection = select(this).append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')'); // compute each serie width and height

    const seriesWidth = d.width - margin.right - margin.left;
    const seriesHeight = d.height - margin.top - margin.bottom; // check if padding is too high and leave no space for bars

    if (padding * barsDomain.length > (horizontalBars ? seriesHeight : seriesWidth)) {
      throw new Error('Padding is too high, decrase it in the panel "chart" > "Padding"');
    } // scales


    const barScale = scaleBand().range([0, horizontalBars ? seriesHeight : seriesWidth]).domain(barsDomain) //convert padding from px to percentage
    .padding(padding / ((horizontalBars ? seriesHeight : seriesWidth) / barsDomain.length));
    const seriesDomain = extent(d.data[1], d => d.size);
    const sizeScale = scaleLinear().domain(useSameScale ? sizeDomain : seriesDomain).nice().range(horizontalBars ? [0, seriesWidth] : [seriesHeight, 0]);
    selection.append('g').attr('class', 'bars').selectAll('rect').data(d => d.data[1]).join('rect').attr('id', d => d.series + ' - ' + d.bars).attr('x', d => {
      return horizontalBars ? sizeScale(Math.min(0, d.size)) : barScale(d.bars);
    }).attr('y', d => {
      return horizontalBars ? barScale(d.bars) : sizeScale(Math.max(0, d.size));
    }).attr('height', d => {
      return horizontalBars ? barScale.bandwidth() : Math.abs(sizeScale(d.size) - sizeScale(0));
    }).attr('width', d => {
      return horizontalBars ? Math.abs(sizeScale(d.size) - sizeScale(0)) : barScale.bandwidth();
    }).attr('fill', d => colorScale(d.color));

    if (horizontalBars) {
      selection.append('g').attr('id', 'xAxis').attr('transform', 'translate(0,' + seriesHeight + ')').call(axisBottom(sizeScale)).call(g => g.append('text').attr('font-family', 'Arial, sans-serif').attr('font-size', 10).attr('x', seriesWidth).attr('dy', -5).attr('fill', 'black').attr('font-weight', 'bold').attr('text-anchor', 'end').attr('display', seriesIndex === 0 || repeatAxesLabels ? null : 'none').text(d => {
        return mapping['size'].value ? `${mapping['size'].value} [${mapping.size.config.aggregation}]` : '';
      }));
      selection.append('g').attr('id', 'yAxis').attr('transform', 'translate(' + sizeScale(0) + ',0)').call(axisLeft(barScale).tickSizeOuter(0)).call(g => g.append('text').attr('font-family', 'Arial, sans-serif').attr('font-size', 10).attr('x', 4).attr('fill', 'black').attr('font-weight', 'bold').attr('text-anchor', 'start').attr('dominant-baseline', 'hanging').attr('display', seriesIndex === 0 || repeatAxesLabels ? null : 'none').text(mapping['bars'].value));
    } else {
      selection.append('g').attr('id', 'xAxis').attr('transform', 'translate(0,' + sizeScale(0) + ')').call(axisBottom(barScale).tickSizeOuter(0)).call(g => g.append('text').attr('x', seriesWidth).attr('y', -4).attr('text-anchor', 'end').attr('display', seriesIndex === 0 || repeatAxesLabels ? null : 'none').text(mapping['bars'].value).styles(styles.axisLabel));
      selection.append('g').attr('id', 'yAxis').call(axisLeft(sizeScale)).call(g => g.append('text').attr('x', 4).attr('text-anchor', 'start').attr('dominant-baseline', 'hanging').attr('display', seriesIndex === 0 || repeatAxesLabels ? null : 'none').text(d => {
        return mapping['size'].value ? `${mapping['size'].value} [${mapping.size.config.aggregation}]` : '';
      }).styles(styles.axisLabel));
    }

    if (showSeriesLabels) {
      select(this).append('text').text(d => d.data[0]).attr('y', 4).attr('x', 4).styles(styles.seriesLabel);
    }
  }); // add legend

  if (showLegend) {
    const legendLayer = select(svgNode).append('g').attr('id', 'legend').attr('transform', `translate(${width},${marginTop})`);
    const chartLegend = legend().legendWidth(legendWidth);

    if (mapping.color.value) {
      chartLegend.addColor(mapping.color.value, colorScale);
    }

    legendLayer.call(chartLegend);
  }
} // auto format time scale if used as axis:

const visualOptions$2 = {
  marginTop: {
    type: 'number',
    label: 'Margin (top)',
    default: 20,
    group: 'artboard'
  },
  marginRight: {
    type: 'number',
    label: 'Margin (right)',
    default: 10,
    group: 'artboard'
  },
  marginBottom: {
    type: 'number',
    label: 'Margin (bottom)',
    default: 20,
    group: 'artboard'
  },
  marginLeft: {
    type: 'number',
    label: 'Margin (left)',
    default: 50,
    group: 'artboard'
  },
  showLegend: {
    type: 'boolean',
    label: 'Show legend',
    default: false,
    group: 'artboard'
  },
  legendWidth: {
    type: 'number',
    label: 'Legend width',
    default: 200,
    group: 'artboard',
    disabled: {
      showLegend: false
    },
    container: 'width',
    containerCondition: {
      showLegend: true
    }
  },
  padding: {
    type: 'number',
    label: 'Padding',
    default: 1,
    group: 'chart'
  },
  barsOrientation: {
    type: 'text',
    label: 'Bars orientation',
    group: 'chart',
    options: [{
      label: 'Vertically',
      value: 'vertical'
    }, {
      label: 'Horizontally',
      value: 'horizontal'
    }],
    default: 'vertical'
  },
  sortBarsBy: {
    type: 'text',
    label: 'Sort bars by',
    group: 'chart',
    options: [{
      label: 'Size (descending)',
      value: 'totalDescending'
    }, {
      label: 'Size (ascending)',
      value: 'totalAscending'
    }, {
      label: 'Name',
      value: 'name'
    }, {
      label: 'Original',
      value: 'original'
    }],
    default: 'name'
  },
  useSameScale: {
    type: 'boolean',
    label: 'Use same scale',
    default: true,
    group: 'series'
  },
  columnsNumber: {
    type: 'number',
    label: 'Number of columns',
    default: 0,
    group: 'series'
  },
  sortSeriesBy: {
    type: 'text',
    label: 'Sort series by',
    group: 'series',
    options: ['Total value (descending)', 'Total value (ascending)', 'Name', 'Original'],
    default: 'Total value (descending)'
  },
  showSeriesLabels: {
    type: 'boolean',
    label: 'Show series titles',
    default: true,
    group: 'series'
  },
  repeatAxesLabels: {
    type: 'boolean',
    label: 'Repeat axis labels for each series',
    default: false,
    group: 'series'
  },
  showGrid: {
    type: 'boolean',
    label: 'Show series grid',
    default: false,
    group: 'series'
  },
  colorScale: {
    type: 'colorScale',
    label: 'Color scale',
    dimension: 'color',
    default: {
      scaleType: 'ordinal',
      interpolator: 'interpolateSpectral'
    },
    group: 'colors'
  }
};

var barchart = {
  metadata: metadata$2,
  dimensions: dimensions$2,
  mapData: mapData$2,
  render: render$2,
  visualOptions: visualOptions$2,
  styles: styles$1
};

var img$6 = "data:image/svg+xml,%3csvg id='rawgraphs-icons' xmlns='http://www.w3.org/2000/svg' width='56' height='56' viewBox='0 0 56 56'%3e %3cdefs%3e %3cstyle%3e .cls-1 %7b fill: %2306c26c%3b %7d .cls-2 %7b fill: %2395e5c0%3b %7d %3c/style%3e %3c/defs%3e %3cpolygon class='cls-1' points='9.185 9.685 7.5 8 5.815 9.685 5.815 11.115 7.003 9.927 7.003 48 7.997 48 7.997 9.927 9.185 11.115 9.185 9.685'/%3e %3crect class='cls-2' x='21' y='29' width='3' height='19'/%3e %3crect class='cls-2' x='31' y='22.9521' width='3' height='25.0479'/%3e %3crect class='cls-2' x='41' y='34' width='3' height='14'/%3e %3crect class='cls-2' x='11' y='36' width='3' height='12'/%3e %3crect class='cls-1' x='15' y='31' width='3' height='17'/%3e %3crect class='cls-1' x='24.9219' y='35.9219' width='3.1563' height='12.1563'/%3e %3crect class='cls-1' x='34.9219' y='20.9219' width='3.1563' height='27.1563'/%3e %3crect class='cls-1' x='44.9219' y='30.9219' width='3.1563' height='17.1563'/%3e%3c/svg%3e";

var img$7 = "data:image/svg+xml,%3csvg id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' width='320' height='160' viewBox='0 0 320 160'%3e %3cdefs%3e %3cstyle%3e .cls-1 %7b fill: white%3b %7d .cls-2 %7b fill: %234696b3%3b %7d .cls-3 %7b fill: %23f88e53%3b %7d .cls-4 %7b fill: %23d5ee9f%3b %7d .cls-5 %7b fill: none%3b stroke: black%3b %7d .cls-6 %7b isolation: isolate%3b font-size: 10px%3b font-family: Helvetica%3b %7d .cls-7 %7b letter-spacing: -0.0737em%3b %7d %3c/style%3e %3c/defs%3e %3crect id='background' class='cls-1' width='320' height='160'/%3e %3cg id='viz'%3e %3cg%3e %3cg%3e %3crect id='undefined_-_Czech' data-name='undefined - Czech' class='cls-2' x='25.9251' y='53.6185' width='13.6608' height='89.3815'/%3e %3crect id='undefined_-_English' data-name='undefined - English' class='cls-3' x='40.5641' y='56.2723' width='13.6608' height='86.7277'/%3e %3crect id='undefined_-_Italian' data-name='undefined - Italian' class='cls-4' x='55.2031' y='18.2692' width='13.6608' height='124.7308'/%3e %3crect id='undefined_-_Czech-2' data-name='undefined - Czech' class='cls-2' x='74.7672' y='62.7477' width='13.6608' height='80.2523'/%3e %3crect id='undefined_-_English-2' data-name='undefined - English' class='cls-3' x='89.4063' y='8.1846' width='13.6608' height='134.8154'/%3e %3crect id='undefined_-_Italian-2' data-name='undefined - Italian' class='cls-4' x='104.0453' y='17.8446' width='13.6608' height='125.1554'/%3e %3crect id='undefined_-_Czech-3' data-name='undefined - Czech' class='cls-2' x='123.6094' y='106.0585' width='13.6608' height='36.9415'/%3e %3crect id='undefined_-_English-3' data-name='undefined - English' class='cls-3' x='138.2485' y='97.8846' width='13.6608' height='45.1154'/%3e %3crect id='undefined_-_Italian-3' data-name='undefined - Italian' class='cls-4' x='152.8875' y='103.2985' width='13.6608' height='39.7015'/%3e %3crect id='undefined_-_Czech-4' data-name='undefined - Czech' class='cls-2' x='172.4516' y='134.2954' width='13.6608' height='8.7046'/%3e %3crect id='undefined_-_English-4' data-name='undefined - English' class='cls-3' x='187.0907' y='127.1831' width='13.6608' height='15.8169'/%3e %3crect id='undefined_-_Italian-4' data-name='undefined - Italian' class='cls-4' x='201.7297' y='133.1277' width='13.6608' height='9.8723'/%3e %3crect id='undefined_-_Czech-5' data-name='undefined - Czech' class='cls-2' x='221.2938' y='135.1446' width='13.6608' height='7.8554'/%3e %3crect id='undefined_-_English-5' data-name='undefined - English' class='cls-3' x='235.9329' y='113.4892' width='13.6608' height='29.5108'/%3e %3crect id='undefined_-_Italian-5' data-name='undefined - Italian' class='cls-4' x='250.5719' y='95.2308' width='13.6608' height='47.7692'/%3e %3crect id='undefined_-_Czech-6' data-name='undefined - Czech' class='cls-2' x='270.136' y='142.1508' width='13.6608' height='0.8492'/%3e %3crect id='undefined_-_English-6' data-name='undefined - English' class='cls-3' x='284.7751' y='119.3277' width='13.6608' height='23.6723'/%3e %3crect id='undefined_-_Italian-6' data-name='undefined - Italian' class='cls-4' x='299.4141' y='130.7923' width='13.6608' height='12.2077'/%3e %3c/g%3e %3cg id='xAxis'%3e %3cpath class='cls-5' d='M21.5%2c143.5h297'/%3e %3cg%3e %3cline class='cls-5' x1='47.3945' y1='143' x2='47.3945' y2='149'/%3e %3ctext class='cls-6' transform='translate(44.6138 159.1)'%3ea%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-5' x1='96.2367' y1='143' x2='96.2367' y2='149'/%3e %3ctext class='cls-6' transform='translate(93.4559 159.1)'%3ee%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-5' x1='145.0789' y1='143' x2='145.0789' y2='149'/%3e %3ctext class='cls-6' transform='translate(142.2982 159.1)'%3ed%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-5' x1='193.9211' y1='143' x2='193.9211' y2='149'/%3e %3ctext class='cls-6' transform='translate(191.1403 159.1)'%3eb%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-5' x1='242.7633' y1='143' x2='242.7633' y2='149'/%3e %3ctext class='cls-6' transform='translate(240.2633 159.1)'%3ec%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-5' x1='291.6055' y1='143' x2='291.6055' y2='149'/%3e %3ctext class='cls-6' transform='translate(290.2163 159.1)'%3ef%3c/text%3e %3c/g%3e %3c/g%3e %3cg id='yAxis'%3e %3cpath class='cls-5' d='M21.5%2c143.5V5.5'/%3e %3cg%3e %3cline class='cls-5' x1='21' y1='143.5' x2='15' y2='143.5'/%3e %3ctext class='cls-6' transform='translate(6.4385 146.7)'%3e0%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-5' x1='21' y1='132.8846' x2='15' y2='132.8846'/%3e %3ctext class='cls-6' transform='translate(6.4385 136.0846)'%3e1%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-5' x1='21' y1='111.6538' x2='15' y2='111.6538'/%3e %3ctext class='cls-6' transform='translate(6.4385 114.8539)'%3e3%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-5' x1='21' y1='90.4231' x2='15' y2='90.4231'/%3e %3ctext class='cls-6' transform='translate(6.4385 93.6231)'%3e5%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-5' x1='21' y1='69.1923' x2='15' y2='69.1923'/%3e %3ctext class='cls-6' transform='translate(6.4385 72.3923)'%3e7%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-5' x1='21' y1='47.9615' x2='15' y2='47.9615'/%3e %3ctext class='cls-6' transform='translate(6.4385 51.1615)'%3e9%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-5' x1='21' y1='26.7308' x2='15' y2='26.7308'/%3e %3ctext class='cls-6' transform='translate(1.6143 29.9308)'%3e%3ctspan class='cls-7'%3e1%3c/tspan%3e%3ctspan x='4.8242' y='0'%3e1%3c/tspan%3e%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-5' x1='21' y1='5.5' x2='15' y2='5.5'/%3e %3ctext class='cls-6' transform='translate(0.877 8.7)'%3e13%3c/text%3e %3c/g%3e %3c/g%3e %3c/g%3e %3c/g%3e%3c/svg%3e";

const metadata$3 = {
  name: 'Multi-set bar chart',
  thumbnail: img$7,
  icon: img$6,
  id: 'rawgraphs.barchartmultiset',
  categories: ['correlations', 'proportions'],
  description: 'It displays multiple quantitative dimensions related to categories. bars are visually grouped in sets according to the categorical dimension, each bar represents a quantitative dimension, mapped on its height.',
  code: 'https://github.com/rawgraphs/rawgraphs-charts/tree/master/src/barchartmultiset',
  tutorial: 'https://rawgraphs.io/learning/how-to-make-a-multiset-barchart/'
};

const dimensions$3 = [{
  id: 'groups',
  name: 'Sets',
  validTypes: ['number', 'string', 'date'],
  required: true,
  operation: 'get'
}, {
  id: 'bars',
  name: 'Size',
  validTypes: ['number'],
  required: true,
  multiple: true,
  operation: 'get',
  aggregation: true,
  aggregationDefault: {
    number: 'sum'
  }
}, {
  id: 'series',
  name: 'Series',
  validTypes: ['number', 'string', 'date'],
  required: false,
  operation: 'get'
}];

const mapData$3 = function (data, mapping, dataTypes, dimensions) {
  // as we are working on a multiple dimension (bars), `getDimensionAggregator` will return an array of aggregator functions
  // the order of aggregators is the same as the value of the mapping
  const barsAggregators = getDimensionAggregator('bars', mapping, dataTypes, dimensions);
  let results = [];
  rollups(data, v => {
    // @TODO use the spread operator to creat groups on mapping values
    // for every dimension in the bars field, create an item
    mapping.bars.value.forEach((barName, i) => {
      //getting values for aggregation
      const valuesForSize = v.map(x => x[barName]); //getting i-th aggregator

      const aggregator = barsAggregators[i]; // create the item

      const item = {
        series: v[0][mapping.series.value],
        // get the first one since it's grouped
        groups: v[0][mapping.groups.value],
        // get the first one since it's grouped
        bars: barName,
        size: aggregator(valuesForSize)
      };
      results.push(item);
    });
  }, d => d[mapping.series.value], // series grouping
  d => d[mapping.groups.value].toString() // stacks grouping. toString() to enable grouping on dates
  );
  return results;
};

function render$3(svgNode, data, visualOptions, mapping, originalData, styles) {
  const {
    // artboard options
    width,
    height,
    background,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    // chart options
    barsPadding,
    setsPadding,
    SortXAxisBy,
    // series options
    columnsNumber,
    useSameScale,
    sortSeriesBy,
    showSeriesLabels,
    repeatAxesLabels,
    showGrid,
    // color options
    colorScale,
    // legend
    showLegend,
    legendWidth
  } = visualOptions;
  const margin = {
    top: marginTop,
    right: marginRight,
    bottom: marginBottom,
    left: marginLeft
  }; // parse eventual dates

  if (mapping.groups.dataType.type === 'date') {
    // set date format  from input data
    const timeFormat$1 = timeFormat(dateFormats$1[mapping.groups.dataType.dateFormat]); // use it to format date

    data.forEach(d => {
      d.groups = timeFormat$1(Date.parse(d.groups));
    });
  } // create nest structure


  const nestedData = rollups(data, v => v, d => d.series).map(d => ({
    data: d,
    totalSize: sum(d[1], d => d.size)
  })); // sort series

  nestedData.sort((a, b) => {
    return {
      valueDescending: descending(a.totalSize, b.totalSize),
      valueAscending: ascending(a.totalSize, b.totalSize),
      name: ascending(a.data[0], b.data[0])
    }[sortSeriesBy];
  }); // add background

  select(svgNode).append('rect').attr('width', showLegend ? width + legendWidth : width).attr('height', height).attr('x', 0).attr('y', 0).attr('fill', background).attr('id', 'background'); // set up grid

  const gridding$1 = gridding().size([width, height]).mode('grid').padding(0) // no padding, margins will be applied inside
  .cols(columnsNumber);
  const griddingData = gridding$1(nestedData);
  const svg = select(svgNode).append('g').attr('id', 'viz');
  const series = svg.selectAll('g').data(griddingData).join('g').attr('id', d => d[0]).attr('transform', d => 'translate(' + d.x + ',' + d.y + ')'); // domains

  let originalDomain = extent(data, d => d.size);
  let sizeDomain = originalDomain[0] > 0 ? [0, originalDomain[1]] : originalDomain; // sets (x axis) sorting functions

  const stacksSortings = {
    'Total value (descending)': function (a, b) {
      return descending(a[1], b[1]);
    },
    'Total value (ascending)': function (a, b) {
      return ascending(a[1], b[1]);
    },
    Name: function (a, b) {
      return ascending(a[0], b[0]);
    },
    Original: function (a, b) {
      return true;
    }
  }; // sets (x axis) domain

  const setsDomain = rollups(data, v => sum(v, d => d.size), d => d.groups).sort(stacksSortings[SortXAxisBy]).map(d => d[0]);
  const barsDomain = [...new Set(data.map(d => d.bars))]; // add grid

  if (showGrid) {
    svg.append('g').attr('id', 'grid').selectAll('rect').data(griddingData).enter().append('rect').attr('x', d => d.x).attr('y', d => d.y).attr('width', d => d.width).attr('height', d => d.height).attr('fill', 'none').attr('stroke', '#ccc');
  }

  series.each(function (d, serieIndex) {
    // make a local selection for each serie
    const selection = select(this).append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')'); // compute each serie width and height

    const serieWidth = d.width - margin.right - margin.left;
    const serieHeight = d.height - margin.top - margin.bottom; // scales

    const setScale = scaleBand().range([0, serieWidth]).domain(setsDomain).padding(setsPadding / (serieWidth / setsDomain.length) //convert padding from px to percentage
    );
    const barScale = scaleBand().range([0, setScale.bandwidth()]).domain(barsDomain).padding(barsPadding / (setScale.bandwidth() / barsDomain.length) //convert padding from px to percentage
    );
    const localDomain = extent(d.data[1], e => e.size);
    const sizeScale = scaleLinear().domain(useSameScale ? sizeDomain : localDomain).nice().range([serieHeight, 0]); // check if padding is too high and leave no space for bars

    if (setsPadding * setsDomain.length + barsPadding * barsDomain.length * setsDomain.length >= serieWidth) {
      throw new Error('Paddings are too high, decrase them in the "chart" options panel');
    }


    selection.append('g').attr('class', 'bars').selectAll('rect').data(d => d.data[1]).join('rect').attr('id', d => d.series + ' - ' + d.bars).attr('x', d => setScale(d.groups) + barScale(d.bars)).attr('y', d => sizeScale(Math.max(0, d.size))).attr('height', d => Math.abs(sizeScale(d.size) - sizeScale(0))).attr('width', barScale.bandwidth()).attr('fill', d => colorScale(d.bars));
    selection.append('g').attr('id', 'xAxis').attr('transform', 'translate(0,' + sizeScale(0) + ')').call(axisBottom(setScale).tickSizeOuter(0));
    selection.append('g').attr('id', 'yAxis').call(axisLeft(sizeScale).tickSizeOuter(0));

    if (showSeriesLabels) {
      select(this).append('text').attr('x', 4).attr('y', 4).text(d => d.data[0]).styles(styles.seriesLabel);
    } // add the x axis titles


    selection.append('text').attr('y', sizeScale(0) - 4).attr('x', serieWidth).attr('text-anchor', 'end').attr('display', serieIndex == 0 || repeatAxesLabels ? null : 'none').styles(styles.axisLabel).text('Sets'); // add the y axis titles

    selection.append('text').attr('y', 0).attr('x', 4).attr('dominant-baseline', 'hanging').attr('text-anchor', 'start').attr('display', serieIndex == 0 || repeatAxesLabels ? null : 'none').styles(styles.axisLabel).text('Value');
  }); // add legend

  if (showLegend) {
    const legendLayer = select(svgNode).append('g').attr('id', 'legend').attr('transform', `translate(${width},${marginTop})`);
    const chartLegend = legend().legendWidth(legendWidth);
    chartLegend.addColor('Colors', colorScale);
    legendLayer.call(chartLegend);
  }
}

const visualOptions$3 = {
  marginTop: {
    type: 'number',
    label: 'Margin (top)',
    default: 20,
    group: 'artboard'
  },
  marginRight: {
    type: 'number',
    label: 'Margin (right)',
    default: 10,
    group: 'artboard'
  },
  marginBottom: {
    type: 'number',
    label: 'Margin (bottom)',
    default: 20,
    group: 'artboard'
  },
  marginLeft: {
    type: 'number',
    label: 'Margin (left)',
    default: 50,
    group: 'artboard'
  },
  showLegend: {
    type: 'boolean',
    label: 'Show legend',
    default: false,
    group: 'artboard'
  },
  legendWidth: {
    type: 'number',
    label: 'Legend width',
    default: 200,
    group: 'artboard',
    disabled: {
      showLegend: false
    },
    container: 'width',
    containerCondition: {
      showLegend: true
    }
  },
  setsPadding: {
    type: 'number',
    label: 'Padding between sets',
    default: 4,
    group: 'chart'
  },
  barsPadding: {
    type: 'number',
    label: 'Padding between bars',
    default: 1,
    group: 'chart'
  },
  SortXAxisBy: {
    type: 'text',
    label: 'Sort X axis by',
    group: 'chart',
    options: ['Total value (descending)', 'Total value (ascending)', 'Name', 'Original'],
    default: 'Name'
  },
  useSameScale: {
    type: 'boolean',
    label: 'Use same scale',
    default: true,
    group: 'series'
  },
  columnsNumber: {
    type: 'number',
    label: 'Number of columns',
    default: 0,
    group: 'series'
  },
  sortSeriesBy: {
    type: 'text',
    label: 'Sort series by',
    group: 'series',
    options: [{
      label: 'Total value (descending)',
      value: 'valueDescending'
    }, {
      label: 'Total value (ascending)',
      value: 'valueAscending'
    }, {
      label: 'Name',
      value: 'name'
    }, {
      label: 'Original',
      value: 'none'
    }],
    default: 'valueDescending'
  },
  showSeriesLabels: {
    type: 'boolean',
    label: 'Show series titles',
    default: true,
    group: 'series'
  },
  repeatAxesLabels: {
    type: 'boolean',
    label: 'Repeat axis labels for each series',
    default: false,
    group: 'series'
  },
  showGrid: {
    type: 'boolean',
    label: 'Show series grid',
    default: true,
    group: 'series'
  },
  colorScale: {
    type: 'colorScale',
    label: 'Color scale',
    dimension: 'bars',
    default: {
      scaleType: 'ordinal',
      interpolator: 'interpolateSpectral'
    },
    group: 'colors'
  }
};

var barchartmultiset = {
  metadata: metadata$3,
  dimensions: dimensions$3,
  mapData: mapData$3,
  render: render$3,
  visualOptions: visualOptions$3,
  styles: styles$1
};

var img$8 = "data:image/svg+xml,%3csvg id='rawgraphs-icons' xmlns='http://www.w3.org/2000/svg' width='56' height='56' viewBox='0 0 56 56'%3e %3cdefs%3e %3cstyle%3e .cls-1 %7b fill: %2306c26c%3b %7d .cls-2 %7b fill: %2395e5c0%3b %7d %3c/style%3e %3c/defs%3e %3cg%3e %3crect class='cls-1' x='7.0029' y='9.1357' width='0.9941' height='38.8643'/%3e %3cpolygon class='cls-1' points='5.815 11.115 7.5 9.43 9.185 11.115 9.185 9.685 7.5 8 5.815 9.685 5.815 11.115'/%3e %3c/g%3e %3crect class='cls-1' x='21' y='36' width='7' height='12'/%3e %3crect class='cls-1' x='31' y='38' width='7' height='10'/%3e %3crect class='cls-1' x='41' y='36' width='7' height='12'/%3e %3crect class='cls-1' x='11' y='40' width='7' height='8'/%3e %3crect class='cls-2' x='11' y='34' width='7' height='5'/%3e %3crect class='cls-2' x='21' y='27' width='7' height='8'/%3e %3crect class='cls-2' x='31' y='22' width='7' height='15'/%3e %3crect class='cls-2' x='41' y='32' width='7' height='3'/%3e%3c/svg%3e";

var img$9 = "data:image/svg+xml,%3csvg id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 160'%3e%3cdefs%3e%3cstyle%3e.cls-1%7bfill:white%3b%7d.cls-2%7bfill:%2369bda9%3b%7d.cls-3%7bfill:%235e4fa2%3b%7d.cls-4%7bfill:%239e0142%3b%7d.cls-5%7bfill:%23fedd8d%3b%7d.cls-6%7bfill:%23f0704a%3b%7d.cls-7%7bfill:%23e0f3a1%3b%7d.cls-8%7bfill:none%3bstroke:black%3b%7d.cls-9%7bisolation:isolate%3bfont-size:10px%3bfont-family:Helvetica%3b%7d%3c/style%3e%3c/defs%3e%3crect id='background' class='cls-1' width='320' height='160'/%3e%3cg id='viz'%3e%3cg id='Tape'%3e%3crect class='cls-2' x='29' y='119.6' width='31.11' height='20.4'/%3e%3crect class='cls-2' x='61.11' y='116.51' width='31.11' height='23.49'/%3e%3crect class='cls-2' x='93.22' y='104.76' width='31.11' height='35.24'/%3e%3crect class='cls-2' x='125.33' y='94.87' width='31.11' height='45.13'/%3e%3crect class='cls-2' x='157.44' y='113.42' width='31.11' height='26.58'/%3e%3crect class='cls-2' x='189.55' y='134.44' width='31.11' height='5.56'/%3e%3c/g%3e%3cg id='Vinyl'%3e%3crect class='cls-3' x='29' y='69.53' width='31.11' height='50.07'/%3e%3crect class='cls-3' x='61.11' y='69.53' width='31.11' height='46.98'/%3e%3crect class='cls-3' x='93.22' y='81.89' width='31.11' height='22.87'/%3e%3crect class='cls-3' x='125.33' y='92.4' width='31.11' height='2.47'/%3e%3crect class='cls-3' x='157.44' y='112.8' width='31.11' height='0.62'/%3e%3crect class='cls-3' x='253.78' y='139.38' width='31.11' height='0.62'/%3e%3crect class='cls-3' x='285.89' y='137.53' width='31.11' height='2.47'/%3e%3c/g%3e%3cg id='Disc'%3e%3crect class='cls-4' x='93.22' y='76.33' width='31.11' height='5.56'/%3e%3crect class='cls-4' x='125.33' y='50.36' width='31.11' height='42.04'/%3e%3crect class='cls-4' x='157.44' y='14.51' width='31.11' height='98.29'/%3e%3crect class='cls-4' x='189.55' y='12.04' width='31.11' height='122.4'/%3e%3crect class='cls-4' x='221.67' y='54.69' width='31.11' height='85.31'/%3e%3crect class='cls-4' x='253.78' y='114.65' width='31.11' height='24.73'/%3e%3crect class='cls-4' x='285.89' y='127.64' width='31.11' height='9.89'/%3e%3c/g%3e%3cg id='Other'%3e%3crect class='cls-5' x='125.33' y='48.51' width='31.11' height='1.85'/%3e%3crect class='cls-5' x='157.44' y='12.04' width='31.11' height='2.47'/%3e%3crect class='cls-5' x='189.55' y='9.56' width='31.11' height='2.47'/%3e%3crect class='cls-5' x='221.67' y='49.75' width='31.11' height='4.95'/%3e%3crect class='cls-5' x='253.78' y='112.18' width='31.11' height='2.47'/%3e%3crect class='cls-5' x='285.89' y='125.78' width='31.11' height='1.85'/%3e%3c/g%3e%3cg id='Download'%3e%3crect class='cls-6' x='221.67' y='41.71' width='31.11' height='8.04'/%3e%3crect class='cls-6' x='253.78' y='93.02' width='31.11' height='19.16'/%3e%3crect class='cls-6' x='285.89' y='110.33' width='31.11' height='15.45'/%3e%3c/g%3e%3cg id='Streaming'%3e%3crect class='cls-7' x='221.67' y='40.47' width='31.11' height='1.24'/%3e%3crect class='cls-7' x='253.78' y='89.93' width='31.11' height='3.09'/%3e%3crect class='cls-7' x='285.89' y='94.87' width='31.11' height='15.45'/%3e%3c/g%3e%3cg id='xAxis'%3e%3cpath class='cls-8' d='M28.5%2c140.5h290'/%3e%3cline class='cls-8' x1='44.55' y1='140' x2='44.55' y2='146'/%3e%3ctext class='cls-9' transform='translate(41.77 156.1)'%3ea%3c/text%3e%3cline class='cls-8' x1='76.67' y1='140' x2='76.67' y2='146'/%3e%3ctext class='cls-9' transform='translate(73.88 156.1)'%3eb%3c/text%3e%3cline class='cls-8' x1='108.78' y1='140' x2='108.78' y2='146'/%3e%3ctext class='cls-9' transform='translate(106.28 156.1)'%3ec%3c/text%3e%3cline class='cls-8' x1='140.89' y1='140' x2='140.89' y2='146'/%3e%3ctext class='cls-9' transform='translate(138.11 156.1)'%3ed%3c/text%3e%3cline class='cls-8' x1='173' y1='140' x2='173' y2='146'/%3e%3ctext class='cls-9' transform='translate(170.22 156.1)'%3ee%3c/text%3e%3cline class='cls-8' x1='205.11' y1='140' x2='205.11' y2='146'/%3e%3ctext class='cls-9' transform='translate(203.72 156.1)'%3ef%3c/text%3e%3cline class='cls-8' x1='237.22' y1='140' x2='237.22' y2='146'/%3e%3ctext class='cls-9' transform='translate(234.44 156.1)'%3eg%3c/text%3e%3cline class='cls-8' x1='269.33' y1='140' x2='269.33' y2='146'/%3e%3ctext class='cls-9' transform='translate(266.55 156.1)'%3eh%3c/text%3e%3cline class='cls-8' x1='301.45' y1='140' x2='301.45' y2='146'/%3e%3ctext class='cls-9' transform='translate(300.34 156.1)'%3ei%3c/text%3e%3c/g%3e%3cg id='yAxis'%3e%3cpath class='cls-8' d='M28.5%2c140.5V4.5'/%3e%3cline class='cls-8' x1='28' y1='140.5' x2='22' y2='140.5'/%3e%3ctext class='cls-9' transform='translate(13.44 143.7)'%3e0%3c/text%3e%3cline class='cls-8' x1='28' y1='128.14' x2='22' y2='128.14'/%3e%3ctext class='cls-9' transform='translate(7.88 131.34)'%3e20%3c/text%3e%3cline class='cls-8' x1='28' y1='115.77' x2='22' y2='115.77'/%3e%3ctext class='cls-9' transform='translate(7.88 118.97)'%3e40%3c/text%3e%3cline class='cls-8' x1='28' y1='103.41' x2='22' y2='103.41'/%3e%3ctext class='cls-9' transform='translate(7.88 106.61)'%3e60%3c/text%3e%3cline class='cls-8' x1='28' y1='91.05' x2='22' y2='91.05'/%3e%3ctext class='cls-9' transform='translate(7.88 94.25)'%3e80%3c/text%3e%3cline class='cls-8' x1='28' y1='78.68' x2='22' y2='78.68'/%3e%3ctext class='cls-9' transform='translate(2.32 81.88)'%3e100%3c/text%3e%3cline class='cls-8' x1='28' y1='66.32' x2='22' y2='66.32'/%3e%3ctext class='cls-9' transform='translate(2.32 69.52)'%3e120%3c/text%3e%3cline class='cls-8' x1='28' y1='53.95' x2='22' y2='53.95'/%3e%3ctext class='cls-9' transform='translate(2.32 57.15)'%3e140%3c/text%3e%3cline class='cls-8' x1='28' y1='41.59' x2='22' y2='41.59'/%3e%3ctext class='cls-9' transform='translate(2.32 44.79)'%3e160%3c/text%3e%3cline class='cls-8' x1='28' y1='29.23' x2='22' y2='29.23'/%3e%3ctext class='cls-9' transform='translate(2.32 32.43)'%3e180%3c/text%3e%3cline class='cls-8' x1='28' y1='16.86' x2='22' y2='16.86'/%3e%3ctext class='cls-9' transform='translate(2.32 20.06)'%3e200%3c/text%3e%3cline class='cls-8' x1='28' y1='4.5' x2='22' y2='4.5'/%3e%3ctext class='cls-9' transform='translate(2.32 7.7)'%3e220%3c/text%3e%3c/g%3e%3c/g%3e%3c/svg%3e";

const metadata$4 = {
  name: 'Stacked bar chart',
  id: 'rawgraphs.barchartstacked',
  thumbnail: img$9,
  icon: img$8,
  categories: ['correlations', 'proportions'],
  description: 'It displays multiple quantitative dimensions related to categories. bars are visually stacked according to the categorical dimension, each bar represents a quantitative dimension, mapped on its height.',
  code: 'https://github.com/rawgraphs/rawgraphs-charts/tree/master/src/barchartstacked',
  tutorial: 'https://rawgraphs.io/learning/how-to-make-a-stacked-barchart/'
};

const dimensions$4 = [{
  id: 'stacks',
  name: 'X Axis',
  validTypes: ['number', 'string', 'date'],
  required: true,
  operation: 'get'
}, {
  id: 'bars',
  name: 'Size',
  validTypes: ['number'],
  required: true,
  multiple: true,
  operation: 'get',
  aggregation: true,
  aggregationDefault: {
    number: 'sum'
  }
}, {
  id: 'series',
  name: 'Series',
  validTypes: ['number', 'string', 'date'],
  required: false,
  operation: 'get'
}];

const mapData$4 = function (data, mapping, dataTypes, dimensions) {
  // as we are working on a multiple dimension (bars), `getDimensionAggregator` will return an array of aggregator functions
  // the order of aggregators is the same as the value of the mapping
  const barsAggregators = getDimensionAggregator('bars', mapping, dataTypes, dimensions);
  let results = [];
  rollups(data, v => {
    // @TODO use the spread operator to creat groups on mapping values
    // for every dimension in the bars field, create an item
    mapping.bars.value.forEach((barName, i) => {
      //getting values for aggregation
      const valuesForSize = v.map(x => x[barName]); //getting i-th aggregator

      const aggregator = barsAggregators[i]; // create the item

      const item = {
        series: v[0][mapping.series.value],
        // get the first one since it's grouped
        stacks: v[0][mapping.stacks.value],
        // get the first one since it's grouped
        bars: barName,
        size: aggregator(valuesForSize)
      };
      results.push(item);
    });
  }, d => d[mapping.series.value], // series grouping
  d => d[mapping.stacks.value].toString() // stacks grouping. toString() to enable grouping on dates
  );
  return results;
};

function render$4(svgNode, data, visualOptions, mapping, originalData, styles) {
  const {
    // artboard options
    width,
    height,
    background,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    // chart options
    stacksOrder,
    stacksPadding,
    SortXAxisBy,
    // series options
    columnsNumber,
    useSameScale,
    sortSeriesBy,
    showSeriesLabels,
    repeatAxesLabels,
    showGrid = true,
    // color options
    colorScale,
    // legend
    showLegend,
    legendWidth
  } = visualOptions;
  const margin = {
    top: marginTop,
    right: marginRight,
    bottom: marginBottom,
    left: marginLeft
  }; //check if there are negative values, in case throw error

  data.forEach(d => {
    if (d.size < 0) {
      throw new Error('Values cannot be negative');
    }
  }); // parse eventual dates

  if (mapping.stacks.dataType.type === 'date') {
    // set date format  from input data
    const timeFormat$1 = timeFormat(dateFormats$1[mapping.stacks.dataType.dateFormat]); // use it to format date

    data.forEach(d => {
      d.stacks = timeFormat$1(Date.parse(d.stacks));
    });
  } // create nest structure


  const nestedData = rollups(data, v => v, d => d.series).map(d => ({
    data: d,
    totalSize: sum(d[1], d => d.size)
  })); // sort series

  nestedData.sort((a, b) => {
    return {
      valueDescending: descending(a.totalSize, b.totalSize),
      valueAscending: ascending(a.totalSize, b.totalSize),
      name: ascending(a.data[0], b.data[0])
    }[sortSeriesBy];
  }); // add background

  select(svgNode).append('rect').attr('width', showLegend ? width + legendWidth : width).attr('height', height).attr('x', 0).attr('y', 0).attr('fill', background).attr('id', 'background'); // set up grid

  const gridding$1 = gridding().size([width, height]).mode('grid').padding(0) // no padding, margins will be applied inside
  .cols(columnsNumber);
  const griddingData = gridding$1(nestedData);
  const svg = select(svgNode).append('g').attr('id', 'viz');
  const series = svg.selectAll('g').data(griddingData).join('g').attr('id', d => d[0]).attr('transform', d => 'translate(' + d.x + ',' + d.y + ')'); // domains
  // sum all values for each serie / stack

  const scaleRollup = rollups(data, v => sum(v, d => d.size), d => d.stacks + '_' + d.series).map(d => d[1]);
  let sizeDomain = [0, max(scaleRollup)]; // stacks (x axis) sorting functions

  const stacksSortings = {
    'Total value (descending)': function (a, b) {
      return descending(a[1], b[1]);
    },
    'Total value (ascending)': function (a, b) {
      return ascending(a[1], b[1]);
    },
    Name: function (a, b) {
      return ascending(a[0], b[0]);
    },
    Original: function (a, b) {
      return true;
    }
  }; // stacks (x axis) domain

  const stacksDomain = rollups(data, v => sum(v, d => d.size), d => d.stacks).sort(stacksSortings[SortXAxisBy]).map(d => d[0]);
  const barsDomain = [...new Set(data.map(d => d.bars))]; // add grid

  if (showGrid) {
    svg.append('g').attr('id', 'grid').selectAll('rect').data(griddingData).enter().append('rect').attr('x', d => d.x).attr('y', d => d.y).attr('width', d => d.width).attr('height', d => d.height).attr('fill', 'none').attr('stroke', '#ccc');
  }

  series.each(function (d, serieIndex) {
    // make a local selection for each serie
    const selection = select(this).append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')'); // compute each serie width and height

    const serieWidth = d.width - margin.right - margin.left;
    const serieHeight = d.height - margin.top - margin.bottom; //prepare data for stack

    let localStack = Array.from(rollup(d.data[1], ([e]) => e, e => e.stacks, e => e.bars)); // creaet an object with ordering methods

    const orderings = {
      Earliest: 'stackOrderAppearance',
      Ascending: 'stackOrderAscending',
      Descending: 'stackOrderDescending',
      'Inside out': 'stackOrderInsideOut',
      None: 'stackOrderNone',
      Reverse: 'stackOrderReverse'
    }; // create the stack
    // define the funciton to retrieve the value
    // inspired by https://observablehq.com/@stevndegwa/stack-chart

    let stack$1 = stack().keys(barsDomain).value((data, key) => data[1].has(key) ? data[1].get(key).size : 0).order(d3[orderings[stacksOrder]]);
    let stackedData = stack$1(localStack); // check if padding is too high and leave no space for bars

    if (stacksPadding * stacksDomain.length > serieWidth) {
      throw new Error('Padding is too high, decrase it in the panel "chart" > "Padding"');
    } // scales


    const stacksScale = scaleBand().range([0, serieWidth]).domain(stacksDomain).padding(stacksPadding / (serieWidth / stacksDomain.length) //convert padding from px to percentage
    );
    let localDomain = [0, max(rollups(d.data[1], v => sum(v, d => d.size), d => d.stacks).map(d => d[1]))];
    const sizeScale = scaleLinear().domain(useSameScale ? sizeDomain : localDomain).nice().range([serieHeight, 0]);
    selection.selectAll('g').data(stackedData).join('g').attr('id', d => d.key).attr('fill', d => colorScale(d.key)).selectAll('rect').data(d => d).join('rect').attr('x', d => stacksScale(d.data[0])).attr('y', d => sizeScale(d[1])).attr('width', stacksScale.bandwidth()).attr('height', d => serieHeight - sizeScale(d[1] - d[0]));
    selection.append('g').attr('id', 'xAxis').attr('transform', 'translate(0,' + sizeScale(0) + ')').call(axisBottom(stacksScale).tickSizeOuter(0));
    selection.append('g').attr('id', 'yAxis').call(axisLeft(sizeScale).tickSizeOuter(0));

    if (showSeriesLabels) {
      select(this).append('text').attr('x', 4).attr('y', 4).text(d => d.data[0]).styles(styles.seriesLabel);
    } // add the x axis titles


    selection.append('text').attr('y', serieHeight - 4).attr('x', serieWidth).attr('text-anchor', 'end').attr('display', serieIndex == 0 || repeatAxesLabels ? null : 'none').text(mapping.stacks.value).styles(styles.axisLabel);
  }); // add legend

  if (showLegend) {
    const legendLayer = select(svgNode).append('g').attr('id', 'legend').attr('transform', `translate(${width},${marginTop})`);
    const chartLegend = legend().legendWidth(legendWidth);
    chartLegend.addColor('Colors', colorScale);
    legendLayer.call(chartLegend);
  }
}

const visualOptions$4 = {
  marginTop: {
    type: 'number',
    label: 'Margin (top)',
    default: 20,
    group: 'artboard'
  },
  marginRight: {
    type: 'number',
    label: 'Margin (right)',
    default: 10,
    group: 'artboard'
  },
  marginBottom: {
    type: 'number',
    label: 'Margin (bottom)',
    default: 20,
    group: 'artboard'
  },
  marginLeft: {
    type: 'number',
    label: 'Margin (left)',
    default: 50,
    group: 'artboard'
  },
  showLegend: {
    type: 'boolean',
    label: 'Show legend',
    default: false,
    group: 'artboard'
  },
  legendWidth: {
    type: 'number',
    label: 'Legend width',
    default: 200,
    group: 'artboard',
    disabled: {
      showLegend: false
    },
    container: 'width',
    containerCondition: {
      showLegend: true
    }
  },
  stacksPadding: {
    type: 'number',
    label: 'Padding',
    default: 1,
    group: 'chart'
  },
  stacksOrder: {
    type: 'text',
    label: 'Sort stacks by',
    group: 'chart',
    options: ['Earliest', 'Ascending', 'Descending', 'None', 'Reverse'],
    default: 'None'
  },
  SortXAxisBy: {
    type: 'text',
    label: 'Sort X axis by',
    group: 'chart',
    options: ['Total value (descending)', 'Total value (ascending)', 'Name', 'Original'],
    default: 'Name'
  },
  useSameScale: {
    type: 'boolean',
    label: 'Use same scale',
    default: true,
    group: 'series'
  },
  columnsNumber: {
    type: 'number',
    label: 'Number of columns',
    default: 0,
    group: 'series'
  },
  sortSeriesBy: {
    type: 'text',
    label: 'Sort series by',
    group: 'series',
    options: [{
      label: 'Total value (descending)',
      value: 'valueDescending'
    }, {
      label: 'Total value (ascending)',
      value: 'valueAscending'
    }, {
      label: 'Name',
      value: 'name'
    }, {
      label: 'Original',
      value: 'none'
    }],
    default: 'valueDescending'
  },
  showSeriesLabels: {
    type: 'boolean',
    label: 'Show series titles',
    default: true,
    group: 'series'
  },
  repeatAxesLabels: {
    type: 'boolean',
    label: 'Repeat axis labels for each series',
    default: false,
    group: 'series'
  },
  showGrid: {
    type: 'boolean',
    label: 'Show series grid',
    default: true,
    group: 'series'
  },
  colorScale: {
    type: 'colorScale',
    label: 'Color scale',
    dimension: 'bars',
    default: {
      scaleType: 'ordinal',
      interpolator: 'interpolateSpectral'
    },
    group: 'colors'
  }
};

var barchartstacked = {
  metadata: metadata$4,
  dimensions: dimensions$4,
  mapData: mapData$4,
  render: render$4,
  visualOptions: visualOptions$4,
  styles: styles$1
};

var img$a = "data:image/svg+xml,%3csvg id='rawgraphs-icons' xmlns='http://www.w3.org/2000/svg' width='56' height='56' viewBox='0 0 56 56'%3e %3cdefs%3e %3cstyle%3e .cls-1 %7b fill: %2395e5c0%3b %7d .cls-2 %7b fill: %2306c26c%3b %7d %3c/style%3e %3c/defs%3e %3cg id='secundary'%3e %3ccircle class='cls-1' cx='37.5' cy='18' r='2'/%3e %3ccircle class='cls-1' cx='27.5' cy='37.5' r='2'/%3e %3ccircle class='cls-1' cx='13' cy='40' r='1.5'/%3e %3ccircle class='cls-1' cx='22.5' cy='42.5' r='1.4142'/%3e %3ccircle class='cls-1' cx='41.5' cy='13.5' r='2'/%3e %3ccircle class='cls-1' cx='44.5' cy='18' r='1.4142'/%3e %3ccircle class='cls-1' cx='46.4999' cy='14.5' r='1'/%3e %3ccircle class='cls-1' cx='31.9999' cy='38.5' r='1'/%3e %3ccircle class='cls-1' cx='22.4999' cy='46.5' r='1'/%3e %3ccircle class='cls-1' cx='26.4999' cy='42' r='1'/%3e %3ccircle class='cls-1' cx='46.4999' cy='45.9483' r='1'/%3e %3ccircle class='cls-1' cx='17' cy='44.5' r='3'/%3e %3c/g%3e %3cg id='primary'%3e %3ccircle class='cls-2' cx='31' cy='15.5' r='3'/%3e %3ccircle class='cls-2' cx='33.5' cy='10' r='1'/%3e %3ccircle class='cls-2' cx='41.5' cy='45.5' r='2'/%3e %3ccircle class='cls-2' cx='33.5' cy='21.5' r='1.4142'/%3e %3ccircle class='cls-2' cx='17.5' cy='30' r='1.5'/%3e %3ccircle class='cls-2' cx='37.4999' cy='23' r='1'/%3e %3ccircle class='cls-2' cx='19.5' cy='36.5' r='4'/%3e %3ccircle class='cls-2' cx='41.5' cy='21' r='1.4142'/%3e %3ccircle class='cls-2' cx='36.5' cy='13' r='1'/%3e %3ccircle class='cls-2' cx='38.5' cy='9.5' r='1'/%3e %3ccircle class='cls-2' cx='26' cy='18.5' r='1'/%3e %3ccircle class='cls-2' cx='28.9999' cy='21' r='1'/%3e %3ccircle class='cls-2' cx='13.9999' cy='32' r='1'/%3e %3ccircle class='cls-2' cx='27.9999' cy='30.5' r='1'/%3e %3ccircle class='cls-2' cx='30.4999' cy='34' r='1'/%3e %3ccircle class='cls-2' cx='34.4999' cy='35.5' r='1'/%3e %3ccircle class='cls-2' cx='12.4999' cy='35' r='1'/%3e %3ccircle class='cls-2' cx='9.4999' cy='37.5' r='1'/%3e %3ccircle class='cls-2' cx='25.4999' cy='33' r='1'/%3e %3ccircle class='cls-2' cx='36.4999' cy='45.9483' r='1'/%3e %3ccircle class='cls-2' cx='25' cy='15' r='1'/%3e %3ccircle class='cls-2' cx='22' cy='17.5' r='1'/%3e %3ccircle class='cls-2' cx='23' cy='28' r='3'/%3e %3c/g%3e%3c/svg%3e";

var img$b = "data:image/svg+xml,%3csvg id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' width='320' height='160' viewBox='0 0 320 160'%3e %3cdefs%3e %3cstyle%3e .cls-1 %7b fill: white%3b %7d .cls-2%2c .cls-3 %7b fill: none%3b %7d .cls-2 %7b stroke: black%3b %7d .cls-3 %7b stroke: %23ccc%3b %7d .cls-4 %7b isolation: isolate%3b font-size: 10px%3b font-family: Helvetica%3b %7d .cls-5 %7b fill: %23d5ee9f%3b %7d .cls-6 %7b fill: %234696b3%3b %7d .cls-7 %7b fill: %239e0142%3b %7d .cls-8 %7b fill: %23fed281%3b %7d .cls-9 %7b fill: %2389cfa5%3b %7d .cls-10 %7b fill: %23db494a%3b %7d .cls-11 %7b fill: %235e4fa2%3b %7d .cls-12 %7b fill: %23f88e53%3b %7d .cls-13 %7b fill: %23fbf8b0%3b %7d %3c/style%3e %3c/defs%3e %3crect id='background' class='cls-1' width='320' height='160'/%3e %3cg id='visualization'%3e %3cg id='axis'%3e %3cg id='y_axis' data-name='y axis'%3e %3cpath class='cls-2' d='M10.5%2c10.5v131'/%3e %3cline class='cls-3' x1='10' y1='75.5' x2='293' y2='75.5'/%3e %3c/g%3e %3cg id='y_axis-2' data-name='y axis'%3e %3cpath class='cls-2' d='M10.5%2c141.5h283'/%3e %3cg%3e %3cline class='cls-2' x1='10.5' y1='141' x2='10.5' y2='147'/%3e %3ctext class='cls-4' transform='translate(-0.623 157.1)'%3e1930%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-2' x1='41.9406' y1='141' x2='41.9406' y2='147'/%3e %3ctext class='cls-4' transform='translate(30.8176 157.1)'%3e1940%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-2' x1='73.3898' y1='141' x2='73.3898' y2='147'/%3e %3ctext class='cls-4' transform='translate(62.2668 157.1)'%3e1950%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-2' x1='104.8305' y1='141' x2='104.8305' y2='147'/%3e %3ctext class='cls-4' transform='translate(93.7074 157.1)'%3e1960%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-2' x1='136.2797' y1='141' x2='136.2797' y2='147'/%3e %3ctext class='cls-4' transform='translate(125.1566 157.1)'%3e1970%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-2' x1='167.7203' y1='141' x2='167.7203' y2='147'/%3e %3ctext class='cls-4' transform='translate(156.5973 157.1)'%3e1980%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-2' x1='199.1695' y1='141' x2='199.1695' y2='147'/%3e %3ctext class='cls-4' transform='translate(188.0465 157.1)'%3e1990%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-2' x1='230.6102' y1='141' x2='230.6102' y2='147'/%3e %3ctext class='cls-4' transform='translate(219.4871 157.1)'%3e2000%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-2' x1='262.0594' y1='141' x2='262.0594' y2='147'/%3e %3ctext class='cls-4' transform='translate(250.9363 157.1)'%3e2010%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-2' x1='293.5' y1='141' x2='293.5' y2='147'/%3e %3ctext class='cls-4' transform='translate(282.377 157.1)'%3e2020%3c/text%3e %3c/g%3e %3c/g%3e %3c/g%3e %3cg id='viz'%3e %3ccircle class='cls-5' cx='42.2916' cy='76.0171' r='20'/%3e %3ccircle class='cls-6' cx='255.9086' cy='66.0735' r='17.3635'/%3e %3ccircle class='cls-5' cx='218.6223' cy='73.6218' r='16.6801'/%3e %3ccircle class='cls-7' cx='159.5505' cy='72.4357' r='14.5643'/%3e %3ccircle class='cls-6' cx='304.9922' cy='76.8797' r='14.2014'/%3e %3ccircle class='cls-8' cx='117.7509' cy='68.2744' r='10.7828'/%3e %3ccircle class='cls-9' cx='186.8852' cy='80.6577' r='9.9814'/%3e %3ccircle class='cls-10' cx='85.281' cy='70.8409' r='9.1628'/%3e %3ccircle class='cls-5' cx='117.2841' cy='91.7992' r='8.7467'/%3e %3ccircle class='cls-11' cx='243.3986' cy='101.7473' r='8.7467'/%3e %3ccircle class='cls-12' cx='9.7796' cy='74.7469' r='8.5368'/%3e %3ccircle class='cls-7' cx='193.3878' cy='59.3197' r='8.3258'/%3e %3ccircle class='cls-10' cx='138.1248' cy='88.6834' r='8.3258'/%3e %3ccircle class='cls-7' cx='278.1806' cy='47.3301' r='7.4691'/%3e %3ccircle class='cls-6' cx='137.5524' cy='60.2391' r='6.5912'/%3e %3ccircle class='cls-12' cx='101.4878' cy='81.4409' r='6.1439'/%3e %3ccircle class='cls-12' cx='201.6382' cy='94.6733' r='6.3683'/%3e %3ccircle class='cls-7' cx='281.1236' cy='75.8669' r='5.6905'/%3e %3ccircle class='cls-12' cx='150.1707' cy='50.3159' r='5.4616'/%3e %3ccircle class='cls-7' cx='259.1883' cy='92.6951' r='5.4616'/%3e %3ccircle class='cls-10' cx='87.9873' cy='89.2682' r='5.4616'/%3e %3ccircle class='cls-5' cx='291.813' cy='56.2823' r='4.7652'/%3e %3ccircle class='cls-10' cx='271.7587' cy='86.5523' r='4.5297'/%3e %3ccircle class='cls-7' cx='172.1142' cy='91.8134' r='4.5297'/%3e %3ccircle class='cls-7' cx='215.9835' cy='98.6933' r='4.5297'/%3e %3ccircle class='cls-12' cx='292.5688' cy='96.2223' r='4.5297'/%3e %3ccircle class='cls-5' cx='280.8091' cy='62.3755' r='3.813'/%3e %3ccircle class='cls-10' cx='239.2588' cy='47.5134' r='3.5704'/%3e %3ccircle class='cls-12' cx='70.4205' cy='77.9837' r='3.326'/%3e %3ccircle class='cls-10' cx='268.693' cy='100.8809' r='3.0797'/%3e %3ccircle class='cls-7' cx='134.7873' cy='73.6438' r='3.0797'/%3e %3ccircle class='cls-12' cx='68.1062' cy='67.8386' r='3.0797'/%3e %3ccircle class='cls-7' cx='234.0771' cy='56.243' r='2.5811'/%3e %3ccircle class='cls-7' cx='286.7199' cy='86.7768' r='2.5811'/%3e %3ccircle class='cls-7' cx='100.6623' cy='68.9963' r='2.3288'/%3e %3ccircle class='cls-11' cx='172.2784' cy='55.8678' r='2.3288'/%3e %3ccircle class='cls-5' cx='206.832' cy='54.1606' r='2.0743'/%3e %3ccircle class='cls-10' cx='232.7108' cy='91.4813' r='2.0743'/%3e %3ccircle class='cls-7' cx='225.646' cy='94.9954' r='1.8177'/%3e %3ccircle class='cls-12' cx='276.2464' cy='95.9923' r='1.9206'/%3e %3ccircle class='cls-12' cx='302.8993' cy='96.7888' r='1.8177'/%3e %3ccircle class='cls-12' cx='245.4185' cy='86.4539' r='1.5588'/%3e %3ccircle class='cls-10' cx='239.2818' cy='81.8512' r='1.5588'/%3e %3ccircle class='cls-12' cx='239.1319' cy='88.4425' r='1.0342'/%3e %3ccircle class='cls-7' cx='299.5432' cy='102.7626' r='1.0342'/%3e %3ccircle class='cls-7' cx='280.2787' cy='90.5216' r='0.875'/%3e %3ccircle class='cls-7' cx='162.8217' cy='91.4895' r='0.7684'/%3e %3ccircle class='cls-7' cx='287.7314' cy='67.6255' r='0.875'/%3e %3ccircle class='cls-7' cx='283.3192' cy='95.2758' r='0.7683'/%3e %3ccircle class='cls-13' cx='150.9283' cy='89.4385' r='0.5'/%3e %3c/g%3e %3c/g%3e%3c/svg%3e";

const metadata$5 = {
  name: 'Beeswarm plot',
  id: 'rawgraphs.beeswarm',
  thumbnail: img$b,
  icon: img$a,
  categories: ['distributions', 'time series', 'proportions'],
  description: 'It displays the distribution of items over a continuous dimensions. Each (line) is represented with a dot placed on the horizontal axis. The vertical dimension is used to avoid overlaps among circles, showing their distribution. The area of dots can be used to encode a further quantitative dimension and a quantitative or categorical dimension with color.',
  code: 'https://github.com/rawgraphs/rawgraphs-charts/tree/master/src/beeswarm',
  tutorial: 'https://rawgraphs.io/learning/how-to-make-a-beeswarm-plot/'
};

const dimensions$5 = [{
  id: 'xValue',
  name: 'X Axis',
  operation: 'get',
  validTypes: ['number', 'date'],
  required: true
}, {
  id: 'size',
  name: 'Size',
  operation: 'get',
  validTypes: ['number', 'date'],
  required: false
}, {
  id: 'color',
  name: 'Color',
  operation: 'get',
  validTypes: ['number', 'string', 'date'],
  required: false
}, {
  id: 'label',
  name: 'Label',
  validTypes: ['number', 'date', 'string'],
  required: false,
  multiple: true
}, {
  id: 'series',
  name: 'Groups',
  validTypes: ['number', 'string', 'date'],
  required: false,
  operation: 'get'
}];

const mapData$5 = function (data, mapping, dataTypes, dimensions) {
  // add the non-compulsory dimensions.
  if (!('series' in mapping)) mapping.series = {
    value: undefined
  };
  if (!('color' in mapping)) mapping.color = {
    value: undefined
  };
  if (!('size' in mapping)) mapping.size = {
    value: undefined
  };
  if (!('label' in mapping)) mapping.label = {
    value: undefined
  };
  return data.map(d => ({
    xValue: d[mapping.xValue.value],
    series: d[mapping.series.value],
    color: d[mapping.color.value],
    size: mapping.size.value ? d[mapping.size.value] : 1,
    label: mapping.label.value ? mapping.label.value.map(l => d[l]) : null
  }));
};

function render$5(svgNode, data, visualOptions, mapping, originalData, styles) {
  const {
    // artboard options
    width,
    height,
    background,
    // margins
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    // legends
    showLegend,
    legendWidth,
    // chart options
    minDiameter,
    maxDiameter,
    simulationStrength,
    nodePadding,
    sortSeriesBy,
    // colors
    colorScale,
    showLabelsOutline,
    autoHideLabels,
    //TODO add labels legends
    labelStyles
  } = visualOptions;
  const margin = {
    top: marginTop,
    right: marginRight,
    bottom: marginBottom,
    left: marginLeft
  }; //check if there are negative values, in case throw error

  data.forEach(d => {
    if (d.size < 0) {
      throw new Error('"Size" values cannot be negative');
    }
  }); // create nest structure

  const grouped = groups(data, d => d.series); // reduce them for sorting

  const reduced = grouped.reduce((map, d) => {
    map[d[0]] = sum(d[1], e => e.size);
    return map;
  }, {}); // define chart dimension

  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom; // sort series

  switch (sortSeriesBy) {
    case 'Total value (descending)':
      grouped.sort((a, b) => descending(reduced[a[0]], reduced[b[0]]));
      break;

    case 'Total value (ascending)':
      grouped.sort((a, b) => ascending(reduced[a[0]], reduced[b[0]]));
      break;

    case 'Name':
      grouped.sort((a, b) => ascending(a[0], b[0]));
  }

  if (mapping.xValue.dataType === 'number') mapping.xValue.dataType = {
    type: 'number'
  }; // @TODO it should be better to have always the same kind of object in mapping

  let xScale;
  const xDomain = extent(data, d => d.xValue);

  switch (mapping.xValue.dataType.type) {
    case 'number':
      xScale = scaleLinear().domain(xDomain).nice().range([0, chartWidth]);
      break;

    case 'date':
      xScale = scaleTime().domain(xDomain).nice().range([0, chartWidth]);
      break;
  } // create scale for sizes


  const sizeScale = scaleSqrt().domain(extent(data, d => d.size)).range([minDiameter / 2, maxDiameter / 2]); // create y scale

  const yScale = scaleBand().rangeRound([0, chartHeight]).domain(grouped.map(d => d[0])).align(0.5).padding(0); // prepare data with initial vales, so the simulation won't start from 0,0

  data.forEach(d => {
    d.x = xScale(d.xValue);
    d.y = yScale(d.series) + yScale.bandwidth() / 2;
  }); // initialise simulation

  let simulation = forceSimulation(data).force('x', forceX().x(d => xScale(d.xValue))).force('y', forceY(d => yScale(d.series) + yScale.bandwidth() / 2)).force('collision', forceCollide().radius(d => sizeScale(d.size) + nodePadding)); // add background

  select(svgNode).append('rect').attr('width', showLegend ? width + legendWidth : width).attr('height', height).attr('x', 0).attr('y', 0).attr('fill', background).attr('id', 'background'); // get svg node

  const svg = select(svgNode).append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')').attr('id', 'viz');

  const xAxis = g => {
    return g.attr('transform', `translate(0,${chartHeight})`).call(axisBottom(xScale)).call(g => g.append('text').attr('x', chartWidth).attr('dy', -5).attr('text-anchor', 'end').text(mapping['xValue'].value).styles(styles.axisLabel));
  };

  const yAxis = g => {
    return g.call(axisLeft(yScale).tickSize(Math.round(-chartWidth)).tickSizeOuter(0)).call(g => g.selectAll('line').styles(styles.axisLine)).call(g => g.append('text').attr('x', 4).attr('text-anchor', 'start').attr('dominant-baseline', 'hanging').text(mapping['series'].value).styles(styles.axisLabel));
  }; // draw the scale and axes


  const axisLayer = svg.append('g').attr('id', 'axis');
  axisLayer.append('g').call(xAxis);
  axisLayer.append('g').call(yAxis); // // draw y axis
  // axisLayer
  //   .append('g')
  //   .attr('id', 'y axis')
  //   .call(
  //     d3.axisLeft(yScale).tickSize(Math.round(-chartWidth)).tickSizeOuter(0)
  //   )
  // // draw x axis
  // axisLayer
  //   .append('g')
  //   .attr('id', 'y axis')
  //   .attr('transform', `translate(0,${chartHeight})`)
  //   .call(d3.axisBottom(xScale).tickSizeOuter(0))
  // draw the viz

  const vizLayer = svg.append('g').attr('id', 'visualization').selectAll('g').data(grouped).join('g').attr('id', d => d[0]); // let the simulation run in background
  // @TODO move this to a web worker
  //console.log("---------------new simulation---------------")

  for (var i = 0, n = Math.ceil(Math.log(simulation.alphaMin()) / Math.log(1 - simulation.alphaDecay())); i < n; ++i) {
    //console.log(i+"/"+n+"("+ (i/n*100) + ")")
    simulation.tick();
  } //console.log("---------------end of simulation---------------")
  //add all the circles


  vizLayer.append('g').attr('id', 'circles').selectAll('circle').data(d => d[1]).join('circle').attr('id', d => Array.isArray(d.label) ? d.label.toString() : d.label).attr('cx', d => d.x).attr('cy', d => d.y).attr('r', d => sizeScale(d.size)).style('fill', d => colorScale(d.color));
  const labelsLayer = vizLayer.append('g').attr('id', 'labels');
  labelsLayer.selectAll('g').data(d => mapping.label.value ? d[1] : []).join('g').attr('id', d => Array.isArray(d.label) ? d.label.toString() : d.label).attr('transform', d => `translate(${d.x},${d.y})`).append('text').attr('x', 0).attr('y', 0).attr('text-anchor', 'middle').attr('dominant-baseline', 'text-before-edge').selectAll('tspan').data(d => Array.isArray(d.label) ? d.label : [d.label]).join('tspan').attr('x', 0).attr('y', 0).attr('dy', (d, i) => i * 12).text((d, i) => {
    if (d && mapping.label.dataType[i].type === 'date') {
      return timeFormat(dateFormats$1[mapping.label.dataType[i].dateFormat])(d);
    } else {
      return d;
    }
  }).styles((d, i) => styles[labelStyles[i]]);
  labelsLayer.selectAll('text').call(sel => {
    return sel.attr('transform', function (d) {
      const height = sel.node().getBBox().height;
      return `translate(0,${-height / 2})`;
    });
  });

  if (showLabelsOutline) {
    // NOTE: Adobe Illustrator does not support paint-order attr
    labelsLayer.selectAll('text').styles(styles.labelOutline);
  }

  if (autoHideLabels) {
    labelsOcclusion(labelsLayer.selectAll('text'), d => d.size);
  }

  if (showLegend) {
    // svg width is adjusted automatically because of the "container:height" annotation in legendWidth visual option
    const legendLayer = select(svgNode).append('g').attr('id', 'legend').attr('transform', `translate(${width},${marginTop})`);
    const chartLegend = legend().legendWidth(legendWidth);

    if (mapping.color.value) {
      chartLegend.addColor(mapping.color.value, colorScale);
    }

    chartLegend.addSize(mapping.size.value ? mapping.size.value : 'Number of records', sizeScale, 'circle');
    legendLayer.call(chartLegend);
  }
}

const visualOptions$5 = {
  marginTop: {
    type: 'number',
    label: 'Margin (top)',
    default: 10,
    group: 'artboard'
  },
  marginRight: {
    type: 'number',
    label: 'Margin (right)',
    default: 50,
    group: 'artboard'
  },
  marginBottom: {
    type: 'number',
    label: 'Margin (bottom)',
    default: 50,
    group: 'artboard'
  },
  marginLeft: {
    type: 'number',
    label: 'Margin (left)',
    default: 50,
    group: 'artboard'
  },
  showLegend: {
    type: 'boolean',
    label: 'Show legend',
    default: false,
    group: 'artboard'
  },
  legendWidth: {
    type: 'number',
    label: 'Legend width',
    default: 200,
    group: 'artboard',
    disabled: {
      showLegend: false
    },
    container: 'width',
    containerCondition: {
      showLegend: true
    }
  },
  minDiameter: {
    type: 'number',
    label: 'Min diameter',
    default: 1,
    group: 'chart'
  },
  maxDiameter: {
    type: 'number',
    label: 'Max diameter',
    default: 20,
    group: 'chart'
  },
  nodePadding: {
    type: 'number',
    label: 'Padding',
    default: 1,
    group: 'chart'
  },
  sortSeriesBy: {
    type: 'text',
    label: 'Sort groups by',
    group: 'series',
    options: ['Total value (descending)', 'Total value (ascending)', 'Name', 'Original'],
    default: 'Original'
  },
  colorScale: {
    type: 'colorScale',
    label: 'Color scale',
    dimension: 'color',
    default: {
      scaleType: 'ordinal',
      interpolator: 'interpolateSpectral'
    },
    group: 'colors'
  },
  labelStyles: {
    type: 'text',
    label: 'Label',
    group: 'labels',
    options: [{
      label: 'Primary',
      value: 'labelPrimary'
    }, {
      label: 'Secondary',
      value: 'labelSecondary'
    }, {
      label: 'Italic',
      value: 'labelItalic'
    }],
    default: 'labelPrimary',
    repeatFor: 'label',
    repeatDefault: ['labelPrimary', 'labelSecondary', 'labelItalic']
  },
  showLabelsOutline: {
    type: 'boolean',
    label: 'Show outline',
    default: false,
    group: 'labels'
  },
  autoHideLabels: {
    type: 'boolean',
    label: 'Auto hide labels',
    default: false,
    group: 'labels'
  }
}; // showLegend,
// legendWidth,

var beeswarm = {
  metadata: metadata$5,
  dimensions: dimensions$5,
  mapData: mapData$5,
  render: render$5,
  visualOptions: visualOptions$5,
  styles: styles$1
};

var img$c = "data:image/svg+xml,%3csvg id='rawgraphs-icons' xmlns='http://www.w3.org/2000/svg' width='56' height='56' viewBox='0 0 56 56'%3e %3cdefs%3e %3cstyle%3e .cls-1 %7b fill: %2395e5c0%3b %7d .cls-2 %7b fill: %2306c26c%3b %7d %3c/style%3e %3c/defs%3e %3cg id='secundary'%3e %3cpolygon class='cls-1' points='41 31 44 31 44 41 42 41 42 42 44 42 45 42 47 42 47 41 45 41 45 31 48 31 48 29 41 29 41 31'/%3e %3cpolygon class='cls-1' points='45 17 45 14 47 14 47 13 42 13 42 14 44 14 44 17 41 17 41 28 48 28 48 17 45 17'/%3e %3cpolygon class='cls-1' points='17 21 19 21 19 20 14 20 14 21 16 21 16 24 13 24 13 29 20 29 20 24 17 24 17 21'/%3e %3cpolygon class='cls-1' points='13 36 16 36 16 40 14 40 14 41 19 41 19 40 17 40 17 36 20 36 20 30 13 30 13 36'/%3e %3c/g%3e %3cg id='primary'%3e %3cpolygon class='cls-2' points='9.195 9.695 7.5 8 5.805 9.695 5.805 11.135 7 9.939 7 48.5 8 48.5 8 9.939 9.195 11.135 9.195 9.695'/%3e %3cpolygon class='cls-2' points='31 13 33 13 33 12 28 12 28 13 30 13 30 17 27 17 27 29 34 29 34 17 31 17 31 13'/%3e %3cpolygon class='cls-2' points='27 36 30 36 30 42 28 42 28 43 30 43 31 43 33 43 33 42 31 42 31 36 34 36 34 30 27 30 27 36'/%3e %3c/g%3e%3c/svg%3e";

var img$d = "data:image/svg+xml,%3csvg id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' width='320' height='160' viewBox='0 0 320 160'%3e %3cdefs%3e %3cstyle%3e .cls-1%2c .cls-2%2c .cls-4%2c .cls-5 %7b fill: none%3b %7d .cls-1 %7b stroke: black%3b %7d .cls-2%2c .cls-5 %7b stroke: %23ccc%3b %7d .cls-2 %7b stroke-dasharray: 3 3%3b %7d .cls-3 %7b fill: %239e0142%3b %7d .cls-4 %7b stroke: white%3b %7d .cls-6 %7b fill: %235e4fa2%3b %7d .cls-7 %7b fill: %2369bda9%3b %7d .cls-8 %7b fill: %23e0f3a1%3b %7d .cls-9 %7b fill: %23fedd8d%3b %7d .cls-10%2c .cls-11 %7b font-size: 12px%3b font-family: Helvetica%3b %7d .cls-11 %7b letter-spacing: -0.05469em%3b %7d %3c/style%3e %3c/defs%3e %3cg%3e %3cpath class='cls-1' d='M21.70371%2c144.46069v-6.13431H318.5039v6.13431'/%3e %3cline class='cls-1' x1='51.38372' y1='137.76872' x2='51.38372' y2='144.46069'/%3e %3cline class='cls-1' x1='110.74376' y1='137.76872' x2='110.74376' y2='144.46069'/%3e %3cline class='cls-1' x1='170.1038' y1='137.76872' x2='170.1038' y2='144.46069'/%3e %3cline class='cls-1' x1='229.46384' y1='137.76872' x2='229.46384' y2='144.46069'/%3e %3cline class='cls-1' x1='288.82388' y1='137.76872' x2='288.82388' y2='144.46069'/%3e %3cpath class='cls-1' d='M14.8137%2c138.32638h6.89V6.00177h-6.89'/%3e %3cline class='cls-1' x1='21.17371' y1='135.77482' x2='14.8137' y2='135.77482'/%3e %3cline class='cls-1' x1='21.17371' y1='123.97727' x2='14.8137' y2='123.97727'/%3e %3cline class='cls-1' x1='21.17371' y1='112.17972' x2='14.8137' y2='112.17972'/%3e %3cline class='cls-1' x1='21.17371' y1='100.38217' x2='14.8137' y2='100.38217'/%3e %3cline class='cls-1' x1='21.17371' y1='88.58462' x2='14.8137' y2='88.58462'/%3e %3cline class='cls-1' x1='21.17371' y1='76.78707' x2='14.8137' y2='76.78707'/%3e %3cline class='cls-1' x1='21.17371' y1='64.98952' x2='14.8137' y2='64.98952'/%3e %3cline class='cls-1' x1='21.17371' y1='53.19197' x2='14.8137' y2='53.19197'/%3e %3cline class='cls-1' x1='21.17371' y1='41.39442' x2='14.8137' y2='41.39442'/%3e %3cline class='cls-1' x1='21.17371' y1='29.59687' x2='14.8137' y2='29.59687'/%3e %3cline class='cls-1' x1='21.17371' y1='17.79932' x2='14.8137' y2='17.79932'/%3e %3cline class='cls-2' x1='50.85372' y1='125.3662' x2='50.85372' y2='82.12228'/%3e %3crect class='cls-3' x='40.25372' y='98.92789' width='21.20001' height='22.30825'/%3e %3cline class='cls-4' x1='40.25372' y1='117.686' x2='61.45373' y2='117.686'/%3e %3cline class='cls-5' x1='40.25372' y1='125.3662' x2='61.45373' y2='125.3662'/%3e %3cline class='cls-5' x1='40.25372' y1='82.12228' x2='61.45373' y2='82.12228'/%3e %3cline class='cls-2' x1='110.21376' y1='87.58272' x2='110.21376' y2='3.9293'/%3e %3crect class='cls-6' x='99.61376' y='27.0691' width='21.20001' height='45.6098'/%3e %3cline class='cls-4' x1='99.61376' y1='62.32678' x2='120.81377' y2='62.32678'/%3e %3cline class='cls-5' x1='99.61376' y1='87.58272' x2='120.81377' y2='87.58272'/%3e %3cline class='cls-5' x1='99.61376' y1='3.9293' x2='120.81377' y2='3.9293'/%3e %3cline class='cls-2' x1='169.5738' y1='135.51563' x2='169.5738' y2='64.28058'/%3e %3crect class='cls-7' x='158.9738' y='100.93521' width='21.20001' height='29.07392'/%3e %3cline class='cls-4' x1='158.9738' y1='127.173' x2='180.17381' y2='127.173'/%3e %3cline class='cls-5' x1='158.9738' y1='135.51563' x2='180.17381' y2='135.51563'/%3e %3cline class='cls-5' x1='158.9738' y1='64.28058' x2='180.17381' y2='64.28058'/%3e %3cline class='cls-2' x1='228.93384' y1='135.76859' x2='228.93384' y2='121.58534'/%3e %3crect class='cls-8' x='218.33383' y='123.27443' width='21.20001' height='10.86174'/%3e %3cline class='cls-4' x1='218.33383' y1='130.21818' x2='239.53385' y2='130.21818'/%3e %3cline class='cls-5' x1='218.33383' y1='135.76859' x2='239.53385' y2='135.76859'/%3e %3cline class='cls-5' x1='218.33383' y1='121.58534' x2='239.53385' y2='121.58534'/%3e %3cline class='cls-2' x1='288.29388' y1='131.72987' x2='288.29388' y2='76.4192'/%3e %3crect class='cls-9' x='277.69387' y='102.68031' width='21.20001' height='26.90716'/%3e %3cline class='cls-4' x1='277.69387' y1='121.06845' x2='298.89389' y2='121.06845'/%3e %3cline class='cls-5' x1='277.69387' y1='131.72987' x2='298.89389' y2='131.72987'/%3e %3cline class='cls-5' x1='277.69387' y1='76.4192' x2='298.89389' y2='76.4192'/%3e %3ctext class='cls-10' transform='translate(6.67382 139.31954)'%3e2%3c/text%3e %3ctext class='cls-10' transform='translate(6.67382 127.52169)'%3e4%3c/text%3e %3ctext class='cls-10' transform='translate(6.67382 115.72384)'%3e6%3c/text%3e %3ctext class='cls-10' transform='translate(6.67382 103.92696)'%3e8%3c/text%3e %3ctext class='cls-10' transform='translate(0 92.12911)'%3e10%3c/text%3e %3ctext class='cls-10' transform='translate(0 80.33223)'%3e12%3c/text%3e %3ctext class='cls-10' transform='translate(0 68.53438)'%3e14%3c/text%3e %3ctext class='cls-10' transform='translate(0 56.73653)'%3e16%3c/text%3e %3ctext class='cls-10' transform='translate(0 44.93966)'%3e18%3c/text%3e %3ctext class='cls-10' transform='translate(0 33.1418)'%3e20%3c/text%3e %3ctext class='cls-10' transform='translate(0 21.34395)'%3e22%3c/text%3e %3ctext class='cls-10' transform='translate(0 9.54708)'%3e24%3c/text%3e %3ctext class='cls-11' transform='translate(47.70996 155.70137)'%3eA%3c/text%3e %3ctext class='cls-10' transform='translate(106.74219 155.7004)'%3eB%3c/text%3e %3ctext class='cls-10' transform='translate(165.77051 155.7004)'%3eC%3c/text%3e %3ctext class='cls-10' transform='translate(225.13086 155.7004)'%3eD%3c/text%3e %3ctext class='cls-10' transform='translate(284.82227 155.7004)'%3eE%3c/text%3e %3c/g%3e %3ccircle class='cls-5' cx='50.85371' cy='43.32604' r='5'/%3e %3ccircle class='cls-5' cx='228.9338' cy='96.57779' r='5'/%3e %3ccircle class='cls-5' cx='228.9338' cy='94.40557' r='5'/%3e%3c/svg%3e";

const metadata$6 = {
  name: 'Box plot',
  id: 'rawgraphs.boxplot',
  thumbnail: img$d,
  icon: img$c,
  categories: ['distributions'],
  description: 'It summarize a quantitative distribution with five standard statistics: the smallest value, lower quartile, median, upper quartile, and largest value.',
  code: 'https://github.com/rawgraphs/rawgraphs-charts/tree/master/src/boxplot',
  tutorial: 'https://rawgraphs.io/learning/how-to-make-a-boxplot/'
};

const dimensions$6 = [{
  id: 'value',
  name: 'Y Axis',
  validTypes: ['number'],
  required: true
}, {
  id: 'group',
  name: 'Groups',
  validTypes: ['number', 'date', 'string'],
  required: false
}, {
  id: 'color',
  name: 'Color',
  operation: 'get',
  validTypes: ['number', 'string', 'date'],
  required: false,
  aggregation: true,
  aggregationDefault: {
    number: 'sum',
    string: 'csvDistinct',
    date: 'csvDistinct'
  }
}];

const mapData$6 = function (data, mapping, dataTypes, dimensions) {
  // define aggregators
  // you should provide the dimension name (defined in dimensions.js)
  // and pass mapping, dataTypes, and dimensions.
  const colorAggregator = getDimensionAggregator('color', mapping, dataTypes, dimensions); // add the non-compulsory dimensions.

  if (!('group' in mapping)) mapping.group = {
    value: undefined
  };
  if (!('color' in mapping)) mapping.color = {
    value: undefined
  }; // we will use rollup to populate a flat array of objects
  // that will be passed to the render

  let results = [];
  rollups(data, v => {
    v.map(d => {
      const item = {
        group: d[mapping.group.value],
        value: d[mapping.value.value],
        color: colorAggregator(v.map(e => e[mapping.color.value]))
      };
      results.push(item);
      return item;
    });
    return v;
  }, d => d[mapping.group.value] // groups grouping
  );
  return results;
};

/*
Credits:
Inspired by https://observablehq.com/@d3/box-plot
*/

function render$6(svgNode, data, visualOptions, mapping, originalData, styles) {
  let {
    // artboard options
    width,
    height,
    background,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    // charts options
    barsWidth,
    iqrMultiplier,
    // to compute otuliers
    dotsDiameter,
    yOrigin,
    //legend
    showLegend,
    legendWidth,
    // color
    colorScale,
    // labels
    showValues
  } = visualOptions; // Margin convention

  const margin = {
    top: marginTop,
    right: marginRight,
    bottom: marginBottom,
    left: marginLeft
  };
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom; // add background

  select(svgNode).append('rect').attr('width', showLegend ? width + legendWidth : width).attr('height', height).attr('x', 0).attr('y', 0).attr('fill', background).attr('id', 'background');
  const svg = select(svgNode).append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')').attr('id', 'viz');
  const yDomain = yOrigin ? [0, max(data, d => d.value)] : extent(data, d => d.value);
  const yScale = scaleLinear().domain(yDomain).nice().range([chartHeight, 0]);
  const groupsDomain = [...new Set(data.map(d => d.group))];
  const xScale = scalePoint().rangeRound([0, chartWidth]).domain(groupsDomain).padding(0.5); // if series is exposed, recreate the nested structure

  const nestedData = rollups(data, v => {
    const values = v.map(d => d.value).sort(ascending);
    const min = values[0];
    const max = values[values.length - 1];
    const q1 = quantile(values, 0.25);
    const q2 = quantile(values, 0.5);
    const q3 = quantile(values, 0.75);
    const iqr = q3 - q1; // interquartile range

    const r0 = Math.max(min, q1 - iqr * iqrMultiplier);
    const r1 = Math.min(max, q3 + iqr * iqrMultiplier);
    return {
      group: v[0].group,
      color: v[0].color,
      values: v,
      quartiles: [q1, q2, q3],
      range: [r0, r1],
      outliers: v.filter(d => d.value < r0 || d.value > r1)
    };
  }, d => d.group); // append scales

  svg.append('g').attr('id', 'y axis').call(axisLeft(yScale)).append('text').styles(styles.axisLabel).attr('x', 4).attr('text-anchor', 'start').attr('dominant-baseline', 'hanging').text(mapping['value'].value);
  svg.append('g').attr('id', 'x axis').attr('transform', 'translate(0,' + chartHeight + ')').call(axisBottom(xScale)); //append boxplots

  const boxplots = svg.append('g').attr('id', 'boxplots').selectAll('g').data(nestedData).join('g'); // add the line between quartiles

  boxplots.append('line').attr('x1', d => xScale(d[1].group)).attr('x2', d => xScale(d[1].group)).attr('y1', d => yScale(d[1].range[1])).attr('y2', d => yScale(d[1].range[0])).attr('stroke', d => colorScale(d[1].color)).attr('stroke-dasharray', 4); // add lines at top and bottom

  boxplots.append('line').attr('x1', d => xScale(d[1].group) - barsWidth / 2).attr('x2', d => xScale(d[1].group) + barsWidth / 2).attr('y1', d => yScale(d[1].range[1])).attr('y2', d => yScale(d[1].range[1])).attr('stroke', d => colorScale(d[1].color));
  boxplots.append('line').attr('x1', d => xScale(d[1].group) - barsWidth / 2).attr('x2', d => xScale(d[1].group) + barsWidth / 2).attr('y1', d => yScale(d[1].range[0])).attr('y2', d => yScale(d[1].range[0])).attr('stroke', d => colorScale(d[1].color)); // add the boxes

  boxplots.append('rect').attr('x', d => xScale(d[1].group) - barsWidth / 2).attr('y', d => yScale(d[1].quartiles[2])).attr('width', barsWidth).attr('height', d => yScale(d[1].quartiles[0]) - yScale(d[1].quartiles[2])).attr('fill', d => colorScale(d[1].color)); //add the half line

  boxplots.append('line').attr('x1', d => xScale(d[1].group) - barsWidth / 2).attr('y1', d => yScale(d[1].quartiles[1])).attr('x2', d => xScale(d[1].group) + barsWidth / 2).attr('y2', d => yScale(d[1].quartiles[1])).attr('stroke', background);
  boxplots.selectAll('circle').data(d => d[1].outliers).join('circle').attr('r', dotsDiameter / 2).attr('cx', d => xScale(d.group)).attr('cy', d => yScale(d.value)).attr('fill', background).attr('stroke', d => colorScale(d.color));

  if (showValues) {
    const valuesLabels = svg.append('g').attr('id', 'boxplots').selectAll('g').data(nestedData).join('g');
    valuesLabels.append('text').styles(styles.labelSecondary).attr('x', d => xScale(d[1].group) + barsWidth / 2 + 4).attr('y', d => yScale(d[1].range[1])).attr('dominant-baseline', 'middle').text(d => d[1].range[1]);
    valuesLabels.append('text').styles(styles.labelSecondary).attr('x', d => xScale(d[1].group) + barsWidth / 2 + 4).attr('y', d => yScale(d[1].range[0])).attr('dominant-baseline', 'middle').text(d => d[1].range[0]);
    valuesLabels.append('text').styles(styles.labelSecondary).attr('x', d => xScale(d[1].group) + barsWidth / 2 + 4).attr('y', d => yScale(d[1].quartiles[1])).attr('dominant-baseline', 'middle').text(d => d[1].quartiles[1]);
    valuesLabels.append('text').styles(styles.labelSecondary).attr('x', d => xScale(d[1].group) - barsWidth / 2 - 4).attr('y', d => yScale(d[1].quartiles[0])).attr('dominant-baseline', 'middle').attr('text-anchor', 'end').text(d => d[1].quartiles[0]);
    valuesLabels.append('text').styles(styles.labelSecondary).attr('x', d => xScale(d[1].group) - 4).attr('y', d => yScale(d[1].quartiles[2])).attr('dominant-baseline', 'middle').attr('text-anchor', 'end').text(d => d[1].quartiles[2]);
  }

  if (showLegend) {
    // svg width is adjusted automatically because of the "container:height" annotation in legendWidth visual option
    const legendLayer = select(svgNode).append('g').attr('id', 'legend').attr('transform', `translate(${width},${marginTop})`);
    const chartLegend = legend().legendWidth(legendWidth);

    if (mapping.color.value) {
      chartLegend.addColor(mapping.color.value, colorScale);
    }

    legendLayer.call(chartLegend);
  }
}

const visualOptions$6 = {
  marginTop: {
    type: 'number',
    label: 'Margin (top)',
    default: 10,
    group: 'artboard'
  },
  marginRight: {
    type: 'number',
    label: 'Margin (right)',
    default: 10,
    group: 'artboard'
  },
  marginBottom: {
    type: 'number',
    label: 'Margin (bottom)',
    default: 30,
    group: 'artboard'
  },
  marginLeft: {
    type: 'number',
    label: 'Margin (left)',
    default: 50,
    group: 'artboard'
  },
  barsWidth: {
    type: 'number',
    label: 'Bars width',
    default: 20,
    group: 'chart'
  },
  iqrMultiplier: {
    type: 'number',
    label: 'Interquartile range multiplier',
    default: 1.5,
    group: 'chart'
  },
  dotsDiameter: {
    type: 'number',
    label: 'Dots diameter',
    default: 2,
    group: 'chart'
  },
  yOrigin: {
    type: 'boolean',
    label: 'Set Y origin to 0',
    default: false,
    group: 'chart'
  },
  showLegend: {
    type: 'boolean',
    label: 'Show legend',
    default: false,
    group: 'artboard'
  },
  legendWidth: {
    type: 'number',
    label: 'Legend width',
    default: 200,
    group: 'artboard',
    disabled: {
      showLegend: false
    },
    container: 'width',
    containerCondition: {
      showLegend: true
    }
  },
  colorScale: {
    type: 'colorScale',
    label: 'Color scale',
    dimension: 'color',
    default: {
      scaleType: 'ordinal',
      interpolator: 'schemeCategory10'
    },
    group: 'colors'
  },
  showValues: {
    type: 'boolean',
    label: 'Show boxpot values',
    default: true,
    group: 'labels'
  }
};

var boxplot = {
  metadata: metadata$6,
  dimensions: dimensions$6,
  mapData: mapData$6,
  render: render$6,
  visualOptions: visualOptions$6,
  styles: styles$1
};

var img$e = "data:image/svg+xml,%3csvg id='rawgraphs-icons' xmlns='http://www.w3.org/2000/svg' width='56' height='56' viewBox='0 0 56 56'%3e %3cdefs%3e %3cstyle%3e .cls-1 %7b fill: %2395e5c0%3b %7d .cls-2 %7b fill: %2306c26c%3b %7d %3c/style%3e %3c/defs%3e %3cg id='secundary'%3e %3ccircle class='cls-1' cx='22.5' cy='39.5' r='3.5'/%3e %3ccircle class='cls-1' cx='17' cy='20' r='6'/%3e %3ccircle class='cls-1' cx='41.5' cy='37.5' r='2.5'/%3e %3c/g%3e %3cg id='primary'%3e %3cpolygon class='cls-2' points='46.305 46.805 44.865 46.805 46.061 48 8 48 8 9.939 9.195 11.135 9.195 9.695 7.5 8 5.805 9.695 5.805 11.135 7 9.939 7 49 46.061 49 44.865 50.195 46.305 50.195 48 48.5 46.305 46.805'/%3e %3ccircle class='cls-2' cx='31.5' cy='28.5' r='6.5'/%3e %3ccircle class='cls-2' cx='37.5' cy='15.5' r='3.5'/%3e %3c/g%3e%3c/svg%3e";

var img$f = "data:image/svg+xml,%3csvg id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' width='320' height='160' viewBox='0 0 320 160'%3e %3cdefs%3e %3cstyle%3e .cls-1 %7b fill: white%3b %7d .cls-2 %7b fill: none%3b stroke: black%3b %7d .cls-3 %7b isolation: isolate%3b font-size: 10px%3b font-family: Helvetica%3b %7d .cls-4 %7b fill: %239e0142%3b %7d .cls-5 %7b fill: %234696b3%3b %7d .cls-6 %7b fill: %235e4fa2%3b %7d .cls-7 %7b fill: %23d5ee9f%3b %7d .cls-8 %7b fill: %2389cfa5%3b %7d .cls-9 %7b fill: %23fed281%3b %7d .cls-10 %7b fill: %23db494a%3b %7d .cls-11 %7b fill: %23f88e53%3b %7d .cls-12 %7b fill: %23fbf8b0%3b %7d %3c/style%3e %3c/defs%3e %3crect id='background' class='cls-1' width='320' height='160'/%3e %3cg id='visualization'%3e %3cg id='axis'%3e %3cg%3e %3cpath class='cls-2' d='M26.5%2c150v-5.5h284V150'/%3e %3cg%3e %3cline class='cls-2' x1='26.5' y1='144' x2='26.5' y2='150'/%3e %3ctext class='cls-3' transform='translate(19.5493 160.1)'%3e6.2%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-2' x1='45.5' y1='144' x2='45.5' y2='150'/%3e %3ctext class='cls-3' transform='translate(38.5493 160.1)'%3e6.4%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-2' x1='64.5' y1='144' x2='64.5' y2='150'/%3e %3ctext class='cls-3' transform='translate(57.5493 160.1)'%3e6.6%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-2' x1='83.5' y1='144' x2='83.5' y2='150'/%3e %3ctext class='cls-3' transform='translate(76.5493 160.1)'%3e6.8%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-2' x1='102.5' y1='144' x2='102.5' y2='150'/%3e %3ctext class='cls-3' transform='translate(95.5493 160.1)'%3e7.0%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-2' x1='121.5' y1='144' x2='121.5' y2='150'/%3e %3ctext class='cls-3' transform='translate(114.5493 160.1)'%3e7.2%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-2' x1='140.5' y1='144' x2='140.5' y2='150'/%3e %3ctext class='cls-3' transform='translate(133.5493 160.1)'%3e7.4%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-2' x1='159.5' y1='144' x2='159.5' y2='150'/%3e %3ctext class='cls-3' transform='translate(152.5493 160.1)'%3e7.6%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-2' x1='177.5' y1='144' x2='177.5' y2='150'/%3e %3ctext class='cls-3' transform='translate(170.5488 160.1)'%3e7.8%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-2' x1='196.5' y1='144' x2='196.5' y2='150'/%3e %3ctext class='cls-3' transform='translate(189.5488 160.1)'%3e8.0%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-2' x1='215.5' y1='144' x2='215.5' y2='150'/%3e %3ctext class='cls-3' transform='translate(208.5488 160.1)'%3e8.2%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-2' x1='234.5' y1='144' x2='234.5' y2='150'/%3e %3ctext class='cls-3' transform='translate(227.5488 160.1)'%3e8.4%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-2' x1='253.5' y1='144' x2='253.5' y2='150'/%3e %3ctext class='cls-3' transform='translate(246.5488 160.1)'%3e8.6%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-2' x1='272.5' y1='144' x2='272.5' y2='150'/%3e %3ctext class='cls-3' transform='translate(265.5488 160.1)'%3e8.8%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-2' x1='291.5' y1='144' x2='291.5' y2='150'/%3e %3ctext class='cls-3' transform='translate(284.5488 160.1)'%3e9.0%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-2' x1='310.5' y1='144' x2='310.5' y2='150'/%3e %3ctext class='cls-3' transform='translate(303.5488 160.1)'%3e9.2%3c/text%3e %3c/g%3e %3c/g%3e %3cg%3e %3cpath class='cls-2' d='M20%2c144.5h6.5V10.5H20'/%3e %3cg%3e %3cline class='cls-2' x1='26' y1='129.5' x2='20' y2='129.5'/%3e %3ctext class='cls-3' transform='translate(5.877 132.7)'%3e50%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-2' x1='26' y1='112.5' x2='20' y2='112.5'/%3e %3ctext class='cls-3' transform='translate(0.3154 115.7)'%3e100%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-2' x1='26' y1='94.5' x2='20' y2='94.5'/%3e %3ctext class='cls-3' transform='translate(0.3154 97.7)'%3e150%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-2' x1='26' y1='77.5' x2='20' y2='77.5'/%3e %3ctext class='cls-3' transform='translate(0.3154 80.7)'%3e200%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-2' x1='26' y1='60.5' x2='20' y2='60.5'/%3e %3ctext class='cls-3' transform='translate(0.3154 63.7)'%3e250%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-2' x1='26' y1='43.5' x2='20' y2='43.5'/%3e %3ctext class='cls-3' transform='translate(0.3154 46.7)'%3e300%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-2' x1='26' y1='26.5' x2='20' y2='26.5'/%3e %3ctext class='cls-3' transform='translate(0.3154 29.7)'%3e350%3c/text%3e %3c/g%3e %3c/g%3e %3c/g%3e %3cg id='viz'%3e %3ccircle class='cls-4' cx='177' cy='48' r='10'/%3e %3ccircle class='cls-4' cx='253' cy='132' r='5'/%3e %3ccircle class='cls-4' cx='234' cy='20' r='10'/%3e %3ccircle class='cls-5' cx='187' cy='52' r='9'/%3e %3ccircle class='cls-4' cx='206' cy='101' r='6'/%3e %3ccircle class='cls-6' cx='244' cy='23' r='9'/%3e %3ccircle class='cls-7' cx='102' cy='89' r='8'/%3e %3ccircle class='cls-4' cx='54' cy='76' r='6'/%3e %3ccircle class='cls-4' cx='196' cy='59' r='7'/%3e %3ccircle class='cls-6' cx='263' cy='121' r='4'/%3e %3ccircle class='cls-8' cx='102' cy='92' r='5'/%3e %3ccircle class='cls-4' cx='111' cy='75' r='7'/%3e %3ccircle class='cls-4' cx='102' cy='108' r='2'/%3e %3ccircle class='cls-7' cx='130' cy='36' r='6'/%3e %3ccircle class='cls-4' cx='130' cy='10' r='7'/%3e %3ccircle class='cls-4' cx='168' cy='131' r='2'/%3e %3ccircle class='cls-4' cx='272' cy='94' r='6'/%3e %3ccircle class='cls-6' cx='130' cy='76' r='7'/%3e %3ccircle class='cls-4' cx='102' cy='56' r='7'/%3e %3ccircle class='cls-4' cx='225' cy='114' r='4'/%3e %3ccircle class='cls-4' cx='121' cy='69' r='7'/%3e %3ccircle class='cls-7' cx='26' cy='83' r='7'/%3e %3ccircle class='cls-7' cx='206' cy='134' r='4'/%3e %3ccircle class='cls-7' cx='177' cy='44' r='9'/%3e %3ccircle class='cls-9' cx='196' cy='122' r='3'/%3e %3ccircle class='cls-8' cx='177' cy='135' r='5'/%3e %3ccircle class='cls-10' cx='177' cy='64' r='2'/%3e %3ccircle class='cls-7' cx='196' cy='112' r='3'/%3e %3ccircle class='cls-11' cx='159' cy='143' r='4'/%3e %3ccircle class='cls-10' cx='196' cy='132' r='4'/%3e %3ccircle class='cls-5' cx='196' cy='128' r='4'/%3e %3ccircle class='cls-11' cx='121' cy='137' r='3'/%3e %3ccircle class='cls-11' cx='244' cy='115' r='6'/%3e %3ccircle class='cls-11' cx='159' cy='139' r='4'/%3e %3ccircle class='cls-10' cx='206' cy='81' r='2'/%3e %3ccircle class='cls-10' cx='282' cy='97' r='6'/%3e %3ccircle class='cls-11' cx='92' cy='55' r='8'/%3e %3ccircle class='cls-10' cx='159' cy='75' r='6'/%3e %3ccircle class='cls-11' cx='130' cy='140' r='3'/%3e %3ccircle class='cls-10' cx='206' cy='76' r='7'/%3e %3ccircle class='cls-11' cx='130' cy='144' r='3'/%3e %3ccircle class='cls-7' cx='272' cy='105' r='5'/%3e %3ccircle class='cls-10' cx='263' cy='96' r='6'/%3e %3ccircle class='cls-11' cx='140' cy='87' r='7'/%3e %3ccircle class='cls-11' cx='92' cy='94' r='7'/%3e %3ccircle class='cls-11' cx='206' cy='97' r='6'/%3e %3ccircle class='cls-10' cx='140' cy='90' r='6'/%3e %3ccircle class='cls-11' cx='121' cy='70' r='6'/%3e %3ccircle class='cls-12' cx='310' cy='135' r='3'/%3e %3ccircle class='cls-6' cx='121' cy='138' r='4'/%3e %3c/g%3e %3c/g%3e%3c/svg%3e";

const metadata$7 = {
  name: 'Bubble chart',
  id: 'rawgraphs.bubblechart',
  thumbnail: img$f,
  icon: img$e,
  categories: ['correlations', 'proportions'],
  description: 'The basic layout is a scatter plot, which allows to see correlations among two continuous dimensions. A further quantitative dimension with size and a quantitative or categorical dimension with color.',
  code: 'https://github.com/rawgraphs/rawgraphs-charts/tree/master/src/bubblechart',
  tutorial: 'https://rawgraphs.io/learning/how-to-make-a-scatterplot/'
};

const dimensions$7 = [{
  id: 'x',
  name: 'X Axis',
  validTypes: ['number', 'date'],
  required: true
}, {
  id: 'y',
  name: 'Y Axis',
  validTypes: ['number', 'date'],
  required: true
}, {
  id: 'size',
  name: 'Size',
  validTypes: ['number'],
  required: false
}, {
  id: 'color',
  name: 'Color',
  validTypes: ['number', 'date', 'string'],
  required: false
}, {
  id: 'connectedBy',
  name: 'Connection by',
  validTypes: ['number', 'date'],
  required: false
}, {
  id: 'label',
  name: 'Label',
  validTypes: ['number', 'date', 'string'],
  required: false,
  multiple: true
}, {
  id: 'series',
  name: 'Series',
  validTypes: ['number', 'date', 'string'],
  required: false,
  multiple: false
}];

const mapData$7 = {
  x: 'get',
  y: 'get',
  size: 'get',
  color: 'get',
  label: 'get',
  connectedBy: 'get',
  series: 'get'
};

function render$7(svgNode, data, visualOptions, mapping, originalData, styles) {
  const {
    width,
    height,
    background,
    xOrigin,
    yOrigin,
    maxDiameter,
    showStroke,
    showPoints,
    dotsDiameter,
    showLegend,
    legendWidth,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    colorScale,
    showLabelsOutline,
    autoHideLabels,
    labelStyles,
    columnsNumber,
    showGrid,
    showSeriesLabels,
    sortSeriesBy,
    useSameYScale,
    useSameXScale
  } = visualOptions;
  const margin = {
    top: marginTop,
    right: marginRight,
    bottom: marginBottom,
    left: marginLeft
  }; //check if there are negative values, in case throw error

  data.forEach(d => {
    if (d.size < 0) {
      throw new Error('"Size" values cannot be negative');
    }
  }); // if series is exposed, recreate the nested structure

  const nestedData = groups(data, d => d.series); // comupte max values for series
  // will add it as property to each series.

  nestedData.forEach(function (serie) {
    serie.totalValue = data.filter(item => item.series == serie[0]).reduce((result, item) => result + mapping.size.value ? item.size : 1, 0);
  }); // series sorting functions

  const seriesSortings = {
    totalDescending: function (a, b) {
      return descending(a.totalValue, b.totalValue);
    },
    totalAscending: function (a, b) {
      return ascending(a.totalValue, b.totalValue);
    },
    name: function (a, b) {
      return ascending(a[0], b[0]);
    }
  }; // sort series

  nestedData.sort(seriesSortings[sortSeriesBy]); // select the SVG element

  const svg = select(svgNode); // add background

  svg.append('rect').attr('width', showLegend ? width + legendWidth : width).attr('height', height).attr('x', 0).attr('y', 0).attr('fill', background).attr('id', 'background'); // add the visualization layer

  const seriesLayer = svg.append('g').attr('id', 'series'); // set up grid

  const gridding$1 = gridding().size([width, height]).mode('grid').padding(0) // no padding, margins will be applied inside
  .cols(columnsNumber);
  const griddingData = gridding$1(nestedData); // draw the grid if asked

  if (showGrid) {
    svg.append('g').attr('id', 'grid').selectAll('rect').data(griddingData).enter().append('rect').attr('x', d => d.x).attr('y', d => d.y).attr('width', d => d.width).attr('height', d => d.height).attr('fill', 'none').attr('stroke', '#ccc');
  } // create the clip path


  svg.append('clipPath').attr('id', 'serieClipPath').append('rect').attr('x', -margin.left).attr('y', -margin.top).attr('width', griddingData[0].width).attr('height', griddingData[0].height); // create the grid

  const series = seriesLayer.selectAll('g').data(griddingData).join('g').attr('id', d => d[0]).attr('transform', d => 'translate(' + d.x + ',' + d.y + ')'); // compute the size scale, common to all the charts

  const maxRadius = maxDiameter / 2;
  const sizeScale = scaleSqrt().domain([0, max(data, d => d.size)]).rangeRound([0, maxRadius]);
  /*
    YOU CAN PUT HERE CODE THAT APPLIES TO ALL THE SERIES
  */
  // do stuff for each serie

  series.each(function (serie, seriesIndex) {
    // make a local selection for each serie
    const selection = select(this).append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')'); // add the clip path

    selection.attr('clip-path', 'url(#serieClipPath)'); // add series titles

    if (showSeriesLabels) {
      select(this).append('text').attr('y', 4).attr('x', 4).text(d => d[0]).styles(styles.seriesLabel);
    } // compute each serie width and height


    const seriesWidth = serie.width - margin.right - margin.left;
    const seriesHeight = serie.height - margin.top - margin.bottom; // get series data

    const serieData = serie[1]; // calculate domains
    // y domain

    const yDomain = useSameYScale ? // compute extent of the whole dataset
    extent(data, e => e.y) : // compute extent of the single serie
    extent(serieData, d => d.y);

    if (yOrigin) {
      yDomain[0] = 0;
    } // x domain


    const xDomain = useSameXScale ? // compute extent of the whole dataset
    extent(data, e => e.x) : // compute extent of the single serie
    extent(serieData, d => d.x);

    if (xOrigin) {
      xDomain[0] = 0;
    } // create scales
    // x scale


    const xScale = mapping.x.dataType.type === 'date' ? scaleTime() : scaleLinear();
    xScale.domain(xDomain).rangeRound([0, seriesWidth]).nice(); // y scale

    const yScale = mapping.y.dataType.type === 'date' ? scaleTime() : scaleLinear();
    yScale.domain(yDomain).rangeRound([seriesHeight, 0]).nice(); // create axis functions
    // x axis

    const xAxis = g => {
      return g.attr('transform', `translate(0,${seriesHeight})`).call(axisBottom(xScale)).call(g => g.append('text').attr('x', seriesWidth).attr('dy', -5).attr('text-anchor', 'end').text(mapping['x'].value).styles(styles.axisLabel));
    }; // y axis


    const yAxis = g => {
      return g.call(axisLeft(yScale)).call(g => g.append('text').attr('x', 4).attr('text-anchor', 'start').attr('dominant-baseline', 'hanging').text(mapping['y'].value).styles(styles.axisLabel));
    }; // append axes to the svg


    const axisLayer = selection.append('g').attr('id', 'axis');
    axisLayer.append('g').call(xAxis);
    axisLayer.append('g').call(yAxis); //create a group for visualization

    const vizLayer = selection.append('g').attr('id', 'viz'); // add connection line

    if (mapping.connectedBy.value) {
      const line$1 = line().x(d => xScale(d.x)).y(d => yScale(d.y));
      vizLayer.append('path').attr('d', () => line$1(serieData.sort((a, b) => {
        return ascending(a.connectedBy, b.connectedBy);
      }))).attr('stroke', 'grey').attr('stroke-width', 0.5).attr('fill', 'none');
    } // create circles


    const bubbles = vizLayer.selectAll('g').data(serieData.sort((a, b) => {
      console.log(a, b);
      const sortValueA = mapping.size.value ? sizeScale(a.size) : maxRadius;
      const sortValueB = mapping.size.value ? sizeScale(b.size) : maxRadius;
      return sortValueB - sortValueA;
    })).join('g');
    bubbles.append('circle').attr('cx', d => xScale(d.x)).attr('cy', d => yScale(d.y)).attr('fill', d => {
      return colorScale(d.color);
    }).attr('r', d => {
      return mapping.size.value ? sizeScale(d.size) : maxRadius;
    }).attr('stroke', showStroke ? 'white' : 'none'); // add dots on the center

    if (showPoints) {
      bubbles.append('circle').attr('cx', d => xScale(d.x)).attr('cy', d => yScale(d.y)).attr('fill', 'black').attr('r', dotsDiameter / 2);
    } //create a group for labels


    const labelsLayer = vizLayer.append('g').attr('id', 'labels'); // add labels

    labelsLayer.selectAll('g').data(mapping.label.value ? serieData : []).join('g').attr('transform', d => `translate(${xScale(d.x)},${yScale(d.y)})`).append('text').attr('x', 0).attr('y', 0).attr('text-anchor', 'middle').attr('dominant-baseline', 'text-before-edge').selectAll('tspan').data(d => Array.isArray(d.label) ? d.label : [d.label]).join('tspan').attr('x', 0).attr('y', 0).attr('dy', (d, i) => i * 12) //@TODO fix magic number
    .text((d, i) => {
      if (d && mapping.label.dataType[i].type === 'date') {
        return timeFormat(dateFormats$1[mapping.label.dataType[i].dateFormat])(d);
      } else {
        return d;
      }
    }).styles((d, i) => styles[labelStyles[i]]); // center labels position

    labelsLayer.selectAll('text').call(sel => {
      return sel.attr('transform', function (d) {
        const height = sel.node().getBBox().height;
        return `translate(0,${-height / 2})`;
      });
    }); // add outline

    if (showLabelsOutline) {
      // NOTE: Adobe Illustrator does not support paint-order attr
      labelsLayer.selectAll('text').styles(styles.labelOutline);
    } // auto hide labels


    if (autoHideLabels) {
      labelsOcclusion(labelsLayer.selectAll('text'), d => d.size);
    }
    /*
      END OF THE CHART CODE
    */

  }); // add legend

  if (showLegend) {
    const legendLayer = select(svgNode).append('g').attr('id', 'legend').attr('transform', `translate(${width},${marginTop})`);
    const chartLegend = legend().legendWidth(legendWidth);

    if (mapping.color.value) {
      chartLegend.addColor(mapping.color.value, colorScale);
    }

    if (mapping.size.value) {
      const legendSizeScale = sizeScale.copy();
      legendSizeScale.domain(extent(data, d => d.size)).rangeRound([sizeScale(min(data, d => d.size)), maxRadius]);
      chartLegend.addSize(mapping.size.value, legendSizeScale, 'circle');
    }

    legendLayer.call(chartLegend);
  }
}

const visualOptions$7 = {
  marginTop: {
    type: 'number',
    label: 'Margin (top)',
    default: 50,
    group: 'artboard'
  },
  marginRight: {
    type: 'number',
    label: 'Margin (right)',
    default: 50,
    group: 'artboard'
  },
  marginBottom: {
    type: 'number',
    label: 'Margin (bottom)',
    default: 50,
    group: 'artboard'
  },
  marginLeft: {
    type: 'number',
    label: 'Margin (left)',
    default: 50,
    group: 'artboard'
  },
  showLegend: {
    type: 'boolean',
    label: 'Show legend',
    default: false,
    group: 'artboard'
  },
  legendWidth: {
    type: 'number',
    label: 'Legend width',
    default: 200,
    group: 'artboard',
    disabled: {
      showLegend: false
    },
    container: 'width',
    containerCondition: {
      showLegend: true
    }
  },
  xOrigin: {
    type: 'boolean',
    label: 'Set X origin to 0',
    default: false,
    group: 'chart',
    requiredDimensions: ['x', 'y']
  },
  yOrigin: {
    type: 'boolean',
    label: 'Set Y origin to 0',
    default: false,
    group: 'chart',
    requiredDimensions: ['x', 'y']
  },
  maxDiameter: {
    type: 'number',
    label: 'Max diameter',
    default: 15,
    step: 1,
    group: 'chart',
    requiredDimensions: ['x', 'y']
  },
  showStroke: {
    type: 'boolean',
    label: 'Show stroke',
    default: false,
    group: 'chart',
    requiredDimensions: ['x', 'y']
  },
  showPoints: {
    type: 'boolean',
    label: 'Show dots on data values',
    default: false,
    group: 'chart',
    requiredDimensions: ['x', 'y']
  },
  dotsDiameter: {
    type: 'number',
    label: 'Dots diameter',
    default: 2,
    group: 'chart',
    disabled: {
      showPoints: false
    },
    requiredDimensions: ['x', 'y']
  },
  colorScale: {
    type: 'colorScale',
    label: 'Color scale',
    dimension: 'color',
    default: {
      scaleType: 'ordinal',
      interpolator: 'interpolateSpectral'
    },
    group: 'colors'
  },
  labelStyles: {
    type: 'text',
    label: 'Label',
    group: 'labels',
    options: [{
      label: 'Primary',
      value: 'labelPrimary'
    }, {
      label: 'Secondary',
      value: 'labelSecondary'
    }, {
      label: 'Italic',
      value: 'labelItalic'
    }],
    default: 'labelPrimary',
    repeatFor: 'label',
    repeatDefault: ['labelPrimary', 'labelSecondary', 'labelItalic']
  },
  showLabelsOutline: {
    type: 'boolean',
    label: 'Show outline',
    default: false,
    group: 'labels'
  },
  autoHideLabels: {
    type: 'boolean',
    label: 'Auto hide labels',
    default: false,
    group: 'labels'
  },
  //series
  columnsNumber: {
    type: 'number',
    label: 'Number of columns',
    default: 0,
    group: 'series'
  },
  showGrid: {
    type: 'boolean',
    label: 'Show series grid',
    default: true,
    group: 'series'
  },
  showSeriesLabels: {
    type: 'boolean',
    label: 'Show series titles',
    default: true,
    group: 'series'
  },
  sortSeriesBy: {
    type: 'text',
    label: 'Sort series by',
    group: 'series',
    options: [{
      label: 'Total size (descending)',
      value: 'totalDescending'
    }, {
      label: 'Total size (ascending)',
      value: 'totalAscending'
    }, {
      label: 'Name',
      value: 'name'
    }, {
      label: 'Original',
      value: 'original'
    }],
    default: 'totalDescending'
  },
  useSameYScale: {
    type: 'boolean',
    label: 'Use same Y scale',
    default: true,
    group: 'series'
  },
  useSameXScale: {
    type: 'boolean',
    label: 'Use same X scale',
    default: true,
    group: 'series'
  }
};

var bubblechart = {
  metadata: metadata$7,
  dimensions: dimensions$7,
  mapData: mapData$7,
  render: render$7,
  visualOptions: visualOptions$7,
  styles: styles$1
};

var img$g = "data:image/svg+xml,%3csvg id='rawgraphs-icons' xmlns='http://www.w3.org/2000/svg' width='56' height='56' viewBox='0 0 56 56'%3e %3cdefs%3e %3cstyle%3e .cls-1 %7b fill: %2395e5c0%3b %7d .cls-2 %7b fill: %2306c26c%3b %7d %3c/style%3e %3c/defs%3e %3cg id='secundary'%3e %3cpath class='cls-1' d='M23.5286%2c24.4514c1.2226-.9042%2c2.1708-2.8385%2c3.027-5.0461C25.4194%2c16.268%2c24.0343%2c14%2c22%2c14c-6.6416%2c0-7.3584%2c3-14%2c3v8c6.6416%2c0%2c7.3584-1%2c14-1A2.8974%2c2.8974%2c0%2c0%2c1%2c23.5286%2c24.4514Z'/%3e %3cpath class='cls-1' d='M35%2c38a11.8359%2c11.8359%2c0%2c0%2c0-5.2772%2c1.04C30.9988%2c42.9069%2c32.5164%2c46%2c35%2c46c4.7651%2c0%2c5.9744-5.1755%2c8.7442-8.08a17.9385%2c17.9385%2c0%2c0%2c1-2.57-4.2376C39.9042%2c35.8521%2c38.3113%2c38%2c35%2c38Z'/%3e %3cpath class='cls-1' d='M48%2c36V28a7.1682%2c7.1682%2c0%2c0%2c0-.9037.0736%2c5.4882%2c5.4882%2c0%2c0%2c0-2.8935%2c1.4053C45.2312%2c33.1176%2c46.457%2c36%2c48%2c36Z'/%3e %3c/g%3e %3cg id='primary'%3e %3cpath class='cls-2' d='M8%2c33c6.6416%2c0%2c7.3584%2c7%2c14%2c7%2c6.6235%2c0%2c6.3765-3%2c13-3s5-10%2c13-10V15c-6.6235%2c0-6.3765%2c11-13%2c11s-6.3765%2c9-13%2c9c-6.6416%2c0-7.3584-9-14-9Z'/%3e %3cpath class='cls-2' d='M15.7742%2c29.867C17.5874%2c32.0847%2c19.1533%2c34%2c22%2c34a6.2%2c6.2%2c0%2c0%2c0%2c.9881-.0869c2.1463-.3934%2c3.3405-2.0781%2c4.6959-3.9912q.1486-.21.3-.4224c1.29-2.0409%2c2.7418-4.0632%2c5.9826-4.4244A7.6248%2c7.6248%2c0%2c0%2c1%2c35%2c25c2.7355%2c0%2c4.0791-2.3177%2c5.6349-5.0015.0734-.1267.1479-.2547.2224-.3825C39.4494%2c13.4455%2c37.87%2c8%2c35%2c8c-6.6235%2c0-6.3765%2c18-13%2c18-2.9321%2c0-4.7091%2c1.7546-6.3513%2c3.714Z'/%3e %3cpath class='cls-2' d='M43.3555%2c30.1727A17.9405%2c17.9405%2c0%2c0%2c0%2c41.7832%2c32.62C43.2888%2c35.9017%2c44.8841%2c39%2c48%2c39V37C45.9127%2c37%2c44.5082%2c34.1176%2c43.3555%2c30.1727Z'/%3e %3cpath class='cls-2' d='M10.5426%2c34.4705A6.2893%2c6.2893%2c0%2c0%2c1%2c8%2c35v4a10.3825%2c10.3825%2c0%2c0%2c0%2c6.1459-1.931A11.4313%2c11.4313%2c0%2c0%2c0%2c10.5426%2c34.4705Z'/%3e %3cpolygon class='cls-2' points='46.305 46.805 44.865 46.805 46.061 48 7.5 48 7.5 49 46.061 49 44.865 50.195 46.305 50.195 48 48.5 46.305 46.805'/%3e %3c/g%3e%3c/svg%3e";

var img$h = "data:image/svg+xml,%3csvg id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' width='320' height='160' viewBox='0 0 320 160'%3e %3cdefs%3e %3cstyle%3e .cls-1 %7b fill: %239e0142%3b %7d .cls-2 %7b fill: %23e0f3a1%3b %7d .cls-3 %7b fill: %23f0704a%3b %7d .cls-4 %7b fill: %23fedd8d%3b %7d .cls-5 %7b fill: %235e4fa2%3b %7d .cls-6 %7b fill: %2369bda9%3b %7d .cls-7 %7b fill: none%3b stroke: black%3b %7d .cls-8 %7b font-size: 10px%3b font-family: Helvetica%3b %7d %3c/style%3e %3c/defs%3e %3cg%3e %3cpath class='cls-1' d='M49.30307%2c104.9359c17.26325%2c0%2c17.26325-3.334%2c34.5265-3.334%2c17.2538%2c0%2c17.2538%2c8.46788%2c34.5076%2c8.46788s17.25379-7.92986%2c34.5076-7.92986%2c17.25379%2c22.76886%2c34.50759%2c22.76886c17.26324%2c0%2c17.26324-21.68757%2c34.5265-21.68757%2c17.25379%2c0%2c17.25379-37.08151%2c34.50758-37.08151S273.64023%2c87.5315%2c290.89405%2c87.5315c13.80493%2c0%2c13.80493%2c11.3125%2c27.60985%2c11.3125V94.96949c-13.80492%2c0-13.80492-17.27063-27.60985-17.27063-17.25382%2c0-17.25382-36.62338-34.50761-36.62338s-17.25379-24.7692-34.50758-24.7692C204.6156%2c16.30628%2c204.6156%2c0%2c187.35236%2c0c-17.2538%2c0-17.2538%2c1.88305-34.50759%2c1.88305S135.591%2c67.46977%2c118.33717%2c67.46977s-17.2538%2c28.303-34.5076%2c28.303C66.56632%2c95.77276%2c66.56632%2c104.9359%2c49.30307%2c104.9359Z'/%3e %3cpath class='cls-2' d='M187.35236%2c137.91575c17.26324%2c0%2c17.26324-26.08116%2c34.5265-26.08116%2c17.25379%2c0%2c17.25379-24.81226%2c34.50758-24.81226s17.25379-10.31567%2c34.50761-10.31567c13.80493%2c0%2c13.80493%2c17.27063%2c27.60985%2c17.27063v-5.38c-13.80492%2c0-13.80492-27.58951-27.60985-27.58951-17.25382%2c0-17.25382%2c6.12414-34.50761%2c6.12414s-17.25379%2c37.0815-34.50758%2c37.0815c-17.26326%2c0-17.26326%2c33.70233-34.5265%2c33.70233'/%3e %3cpath class='cls-3' d='M83.82957%2c103.58632c17.2538%2c0%2c17.2538%2c12.81955%2c34.5076%2c12.81955s17.25379%2c16.88376%2c34.5076%2c16.88376%2c17.25379%2c2.13675%2c34.50759%2c2.13675c17.26324%2c0%2c17.26324-17.53365%2c34.5265-17.53365%2c17.25379%2c0%2c17.25379-22.71816%2c34.50758-22.71816s17.25379-1.43534%2c34.50761-1.43534c13.80493%2c0%2c13.80493%2c12.19748%2c27.60985%2c12.19748v-1.93133C304.699%2c104.00538%2c304.699%2c91.82%2c290.89405%2c91.82c-17.25382%2c0-17.25382.59558-34.50761.59558s-17.25379%2c20.41121-34.50758%2c20.41121c-17.26326%2c0-17.26326%2c19.96343-34.5265%2c19.96343-17.2538%2c0-17.2538-1.82836-34.50759-1.82836S135.591%2c114.283%2c118.33717%2c114.283%2c101.08337%2c103.58632%2c83.82957%2c103.58632Z'/%3e %3cpath class='cls-4' d='M187.35236%2c138.908c17.26324%2c0%2c17.26324-18.62461%2c34.5265-18.62461%2c17.25379%2c0%2c17.25379-28.86%2c34.50758-28.86s17.25379-31.4078%2c34.50761-31.4078c13.80493%2c0%2c13.80493%2c27.58951%2c27.60985%2c27.58951V31.979c-13.80492%2c0-13.80492%2c12.19748-27.60985%2c12.19748-17.25382%2c0-17.25382%2c43.838-34.50761%2c43.838s-17.25379%2c30.8704-34.50758%2c30.8704c-17.26326%2c0-17.26326%2c20.023-34.5265%2c20.023'/%3e %3cpath class='cls-5' d='M221.87886%2c122.49366c-17.26326%2c0-17.26326%2c3.40734-34.5265%2c3.40734-17.2538%2c0-17.2538-22.76886-34.50759-22.76886S135.591%2c20.51768%2c118.33717%2c20.51768s-17.2538%2c13.81175-34.5076%2c13.81175c-17.26325%2c0-17.26325%2c45.53772-34.5265%2c45.53772-17.25379%2c0-17.25379%2c3.13162-34.50759%2c3.13162-6.89774%2c0-6.89774.47888-13.79548.47888v21.0574c6.89774%2c0%2c6.89774-.82368%2c13.79548-.82368%2c17.2538%2c0%2c17.2538.23233%2c34.50759.23233%2c17.26325%2c0%2c17.26325-33.52436%2c34.5265-33.52436%2c17.2538%2c0%2c17.2538-3.94177%2c34.5076-3.94177s17.25379%2c63.49209%2c34.5076%2c63.49209%2c17.25379%2c1.82836%2c34.50759%2c1.82836C204.6156%2c131.798%2c204.6156%2c122.49366%2c221.87886%2c122.49366Z'/%3e %3cpath class='cls-6' d='M1%2c82.48545c6.89774%2c0%2c6.89774-.47887%2c13.79548-.47887%2c17.2538%2c0%2c17.2538-3.13163%2c34.50759-3.13163%2c17.26325%2c0%2c17.26325%2c15.90561%2c34.5265%2c15.90561%2c17.2538%2c0%2c17.2538%2c18.51026%2c34.5076%2c18.51026s17.25379%2c21.74968%2c34.5076%2c21.74968%2c17.25379%2c1.883%2c34.50759%2c1.883c17.26324%2c0%2c17.26324-15.42209%2c34.5265-15.42209%2c17.25379%2c0%2c17.25379-24.66119%2c34.50758-24.66119s17.25379-6.01247%2c34.50761-6.01247c13.80493%2c0%2c13.80493%2c12.18538%2c27.60985%2c12.18538v-3.177c-13.80492%2c0-13.80492-11.3125-27.60985-11.3125-17.25382%2c0-17.25382%2c7.64307-34.50761%2c7.64307s-17.25379%2c25.10877-34.50758%2c25.10877c-17.26326%2c0-17.26326%2c15.143-34.5265%2c15.143-17.2538%2c0-17.2538-2.13675-34.50759-2.13675S135.591%2c111.062%2c118.33717%2c111.062s-17.2538-39.65046-34.5076-39.65046c-17.26325%2c0-17.26325-40.41609-34.5265-40.41609-17.25379%2c0-17.25379.23233-34.50759.23233-6.89774%2c0-6.89774-.82368-13.79548-.82368Z'/%3e %3cg%3e %3cpath class='cls-7' d='M1.4961%2c144.86115v-5.4571H319v5.4571'/%3e %3cg%3e %3cline class='cls-7' x1='15.29079' y1='138.90795' x2='15.29079' y2='144.86115'/%3e %3ctext class='cls-8' transform='translate(4.25488 154.88281)'%3e1975%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-7' x1='49.79839' y1='138.90795' x2='49.79839' y2='144.86115'/%3e %3ctext class='cls-8' transform='translate(38.7627 154.88281)'%3e1980%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-7' x1='84.32488' y1='138.90795' x2='84.32488' y2='144.86115'/%3e %3ctext class='cls-8' transform='translate(73.28809 154.88281)'%3e1985%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-7' x1='118.83248' y1='138.90795' x2='118.83248' y2='144.86115'/%3e %3ctext class='cls-8' transform='translate(107.7959 154.88281)'%3e1990%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-7' x1='153.34008' y1='138.90795' x2='153.34008' y2='144.86115'/%3e %3ctext class='cls-8' transform='translate(142.30371 154.88281)'%3e1995%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-7' x1='187.84768' y1='138.90795' x2='187.84768' y2='144.86115'/%3e %3ctext class='cls-8' transform='translate(176.81152 154.88281)'%3e2000%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-7' x1='222.37417' y1='138.90795' x2='222.37417' y2='144.86115'/%3e %3ctext class='cls-8' transform='translate(211.33691 154.88281)'%3e2005%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-7' x1='256.88175' y1='138.90795' x2='256.88175' y2='144.86115'/%3e %3ctext class='cls-8' transform='translate(245.84473 154.88281)'%3e2010%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-7' x1='291.38937' y1='138.90795' x2='291.38937' y2='144.86115'/%3e %3ctext class='cls-8' transform='translate(280.35352 154.88281)'%3e2015%3c/text%3e %3c/g%3e %3c/g%3e %3c/g%3e%3c/svg%3e";

const metadata$8 = {
  name: 'Bumpchart',
  id: 'rawgraphs.bumpchart',
  thumbnail: img$h,
  icon: img$g,
  categories: ['time series', 'correlations', 'proportions'],
  description: 'It allows the comparison of multiple categories over a continuous dimension and the evolution of its sorting. By default, sorting is based on the stream size.',
  code: 'https://github.com/rawgraphs/rawgraphs-charts/tree/master/src/bumpchart',
  tutorial: 'https://rawgraphs.io/learning/how-to-make-a-bump-chart/'
};

const dimensions$8 = [{
  id: 'x',
  name: 'X Axis',
  operation: 'get',
  validTypes: ['number', 'date'],
  required: true
}, {
  id: 'size',
  name: 'Size',
  operation: 'get',
  validTypes: ['number'],
  aggregation: true,
  aggregationDefault: 'sum'
}, {
  id: 'rank',
  name: 'Ranking',
  operation: 'get',
  validTypes: ['number'],
  aggregation: true,
  aggregationDefault: 'sum'
}, {
  id: 'streams',
  name: 'Streams',
  validTypes: ['number', 'string', 'date'],
  required: false,
  operation: 'get'
}, {
  id: 'series',
  name: 'Series',
  validTypes: ['number', 'string', 'date'],
  required: false,
  operation: 'get'
}];

const mapData$8 = function (data, mapping, dataTypes, dimensions) {
  const sizeAggregator = getDimensionAggregator('size', mapping, dataTypes, dimensions);
  const rankAggregator = getDimensionAggregator('rank', mapping, dataTypes, dimensions);
  let results = [];
  rollups(data, v => rollups(v, vv => {
    const item = {
      x: vv[0][mapping.x.value],
      //get the first one since it's grouped
      size: sizeAggregator(vv.map(d => d[mapping.size.value])),
      // aggregate
      rank: rankAggregator(vv.map(d => d[mapping.rank.value])),
      // aggregate
      series: vv[0][mapping.series.value],
      //get the first one since it's grouped
      streams: vv[0][mapping.streams.value] //get the first one since it's grouped

    };
    results.push(item);
  }, d => d[mapping.x.value].toString() // sub-group functions. toString() to enable grouping on dates
  ), d => d[mapping.series.value], // series grouping
  d => d[mapping.streams.value] // group functions
  );
  return results;
};

function render$8(svgNode, data, visualOptions, mapping, originalData, styles) {
  const {
    // artboard options
    width,
    height,
    background,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    // chart options
    streamsOrder,
    streamsPadding,
    //@TODO: fix padding for different sortings
    streamsOffset,
    interpolation,
    showYAxis,
    // series options
    columnsNumber,
    useSameScale,
    sortSeriesBy,
    showSeriesLabels,
    repeatAxesLabels,
    showGrid = true,
    // color options
    colorScale,
    // legend
    showLegend,
    legendWidth,
    // labels
    showLabels,
    labelsType,
    showLabelsOutline
  } = visualOptions;
  const margin = {
    top: marginTop,
    right: marginRight,
    bottom: marginBottom,
    left: marginLeft
  }; //check if there are negative values, in case throw error

  data.forEach(d => {
    if (d.size < 0) {
      throw new Error('Values cannot be negative');
    }
  });
  const streamsDomain = [...new Set(data.map(d => d.streams))]; // create the stack function
  // define the function to retrieve the value
  // inspired by https://observablehq.com/@stevndegwa/stack-chart

  let stack$1 = stack().keys(streamsDomain).value((data, key) => data[1].has(key) ? data[1].get(key).size : 0).order(d3[streamsOrder]).offset(d3[streamsOffset]); // create nest structure

  const nestedData = rollups(data, v => {
    let localStack = Array.from(rollup(v.sort((a, b) => ascending(a.x, b.x)), // check that x axis is properly sorted
    ([e]) => e, e => e.x, e => e.streams));
    let stackedData = stack$1(localStack); // re-sort streams

    stackedData[0].map((row, rowIndex) => {
      // get the value for each vertical stack
      let vStack = stackedData.map(d => d[rowIndex]); // get min value (depending from stack function)

      let minValue = min(vStack, d => d[0]); // keep original order

      vStack.forEach((d, i) => {
        d.originalIndex = i;
      });

      if (mapping.rank.value) {
        let rankedKeys = stackedData.map(d => d.key);
        vStack.forEach((d, i) => {
          if (d.data[1].has(rankedKeys[i])) {
            d.rank = d.data[1].get(rankedKeys[i]).rank;
          } else {
            d.rank = Infinity;
          }
        }); // sort by ranking value

        vStack.sort((a, b) => descending(a.rank, b.rank));
      } else {
        //sort by size
        vStack.sort((a, b) => ascending(a[1] - a[0], b[1] - b[0]));
      } // re-calculate positions


      vStack.forEach((d, i) => {
        const delta = d[1] - d[0];
        d[0] = minValue;
        d[1] = minValue + delta;
        d.rankIndex = i;
        minValue += delta;
      });
    });
    return stackedData;
  }, d => d.series).map(d => ({
    data: d,
    totalSize: sum(d[1].flat(), e => e[1] - e[0]),
    // compute the total size (in pixels) for each stream
    name: d[0]
  })); // series sorting functions

  const seriesSortings = {
    totalDescending: function (a, b) {
      return descending(a.totalSize, b.totalSize);
    },
    totalAscending: function (a, b) {
      return ascending(a.totalSize, b.totalSize);
    },
    name: function (a, b) {
      return ascending(a.name, b.name);
    },
    original: function (a, b) {
      return 1;
    }
  }; // sort series

  nestedData.sort(seriesSortings[sortSeriesBy]); // add background

  select(svgNode).append('rect').attr('width', showLegend ? width + legendWidth : width).attr('height', height).attr('x', 0).attr('y', 0).attr('fill', background).attr('id', 'background'); // set up grid

  const gridding$1 = gridding().size([width, height]).mode('grid').padding(0) // no padding, margins will be applied inside
  .cols(columnsNumber);
  const griddingData = gridding$1(nestedData);
  const svg = select(svgNode).append('g').attr('id', 'viz');
  const series = svg.selectAll('g').data(griddingData).join('g').attr('id', d => d[0]).attr('transform', d => 'translate(' + d.x + ',' + d.y + ')'); // calculate global stacks value

  const stacksValues = nestedData.map(d => d.data[1]).flat(2);
  const globalDomain = [min(stacksValues, d => d[0]), max(stacksValues, d => d[1])]; // x scale

  const xDomain = extent(data, e => e.x);
  const xScale = mapping.x.dataType.type === 'date' ? scaleTime() : scaleLinear();
  xScale.domain(xDomain).range([0, griddingData[0].width - margin.right - margin.left]); // add grid

  if (showGrid) {
    svg.append('g').attr('id', 'grid').selectAll('rect').data(griddingData).enter().append('rect').attr('x', d => d.x).attr('y', d => d.y).attr('width', d => d.width).attr('height', d => d.height).attr('fill', 'none').attr('stroke', '#ccc');
  }
  /*
      YOU CAN PUT HERE CODE THAT APPLIES TO ALL THE SERIES
    */


  series.each(function (d, serieIndex) {
    // make a local selection for each serie
    const selection = select(this).append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')'); // compute each serie width and height

    const serieWidth = d.width - margin.right - margin.left;
    const serieHeight = d.height - margin.top - margin.bottom;
    const stackedData = d.data[1]; //add padding to data

    stackedData[0].map((row, rowIndex) => {
      // get the values for each vertical stack
      let vStack = stackedData.map(d => d[rowIndex]);
      let index = 0;
      vStack.sort((a, b) => ascending(a.rankIndex, b.rankIndex)).forEach(e => {
        // get next value in the horizontal stack.
        // if is the last one, it is equal to itself.
        const nv = rowIndex < stackedData[0].length - 1 ? stackedData[e.originalIndex][rowIndex + 1] : e;
        e.padding = index * streamsPadding; // if the bar size is more than one or the next value is more than one,
        // increase the padding

        if (e[0] != e[1] || nv[0] != nv[1]) {
          index++;
        }
      });
    });
    console.log(stackedData);
    let localDomain = [min(stackedData, d => min(d, d => d[0])), max(stackedData, d => max(d, d => d[1]))];
    const sizeScale = scaleLinear().domain(useSameScale ? globalDomain : localDomain).nice().range([serieHeight, 0]);
    selection.append('g').selectAll('path').data(stackedData).join('path').attr('fill', ({
      key
    }) => {
      return colorScale(key);
    }).attr('d', area().curve(d3[interpolation]).x(d => xScale(d.data[0])).y0(d => sizeScale(d[0]) - d.padding).y1(d => sizeScale(d[1]) - d.padding)).append('title').text(({
      key
    }) => key);
    selection.append('g').attr('id', 'xAxis').attr('transform', 'translate(0,' + serieHeight + ')').call(axisBottom(xScale).tickSizeOuter(0));

    if (showYAxis) {
      selection.append('g').attr('id', 'yAxis') //.attr('transform', 'translate(0,' + serieHeight + ')')
      .call(axisLeft(sizeScale).tickSizeOuter(0));
    }

    if (showSeriesLabels) {
      select(this).append('text').attr('x', 4).attr('y', 4).text(d => d.data[0]).styles(styles.seriesLabel);
    } // add the axes titles


    selection.append('text').styles(styles.axisLabel).attr('y', serieHeight - 4).attr('x', serieWidth).attr('text-anchor', 'end').attr('display', serieIndex == 0 || repeatAxesLabels ? null : 'none').text(mapping.x.value);
    selection.append('text').styles(styles.axisLabel).attr('x', 4).attr('text-anchor', 'start').attr('dominant-baseline', 'hanging').attr('display', serieIndex == 0 || repeatAxesLabels ? null : 'none').text(mapping['size'].value);

    if (showLabels) {
      // if is on path, add paths to defs and then add texts
      if (labelsType == 'On path') {
        let defs = select(svgNode).append('defs');
        defs.selectAll('path').data(stackedData.filter(d => sum(d, e => e[1] - e[0]) > 0)).join('path').attr('id', (d, i) => 'path-' + serieIndex + '-' + i).attr('d', line().curve(d3[interpolation]).x(d => xScale(d.data[0])).y(d => sizeScale((d[0] + d[1]) / 2) - d.padding));
        let labels = selection.append('g').attr('id', 'labels').selectAll('text').data(stackedData.filter(d => sum(d, e => e[1] - e[0]) > 0)).join('text').attr('dy', '0.5ex').attr('class', 'label').append('textPath').attr('xlink:xlink:href', (d, i) => '#path-' + serieIndex + '-' + i).attr('startOffset', d => {
          // find max value
          const maxIndex$1 = maxIndex(d, e => e[1] - e[0]); // get x position

          d.offset = Math.round(maxIndex$1 / d.length * 100); //clamp offset between 5% and 95%, return it

          return Math.min(95, Math.max(5, d.offset)) + '%';
        }).attr('alignment-baseline', 'middle').attr('text-anchor', d => d.offset > 90 ? 'end' : d.offset < 10 ? 'start' : 'middle').text(d => d.key).styles(styles.labelPrimary);

        if (showLabelsOutline) {
          labels.styles(styles.labelOutline);
        }
      } // if it is on point, find the maximum point


      if (labelsType == 'On point') {
        let labels = selection.append('g').attr('id', 'labels').selectAll('text').data(stackedData.filter(d => sum(d, e => e[1] - e[0]) > 0)).join('text').attr('x', d => {
          // find max value index
          const maxIndex$1 = maxIndex(d, e => e[1] - e[0]);
          d.maxElement = d[maxIndex$1]; // get x position

          return xScale(d.maxElement.data[0]);
        }).attr('y', d => sizeScale((d.maxElement[0] + d.maxElement[1]) / 2) - d.maxElement.padding).attr('text-anchor', d => xScale(d.maxElement.data[0]) > serieWidth - 10 ? 'end' : xScale(d.maxElement.data[0]) < 10 ? 'start' : 'middle').attr('alignment-baseline', 'middle').text(d => d.key).styles(styles.labelPrimary);

        if (showLabelsOutline) {
          labels.styles(styles.labelOutline);
        }
      }
    }
  }); // add legend

  if (showLegend) {
    const legendLayer = select(svgNode).append('g').attr('id', 'legend').attr('transform', `translate(${width},${marginTop})`);
    const chartLegend = legend().legendWidth(legendWidth);
    chartLegend.addColor('Colors', colorScale);
    legendLayer.call(chartLegend);
  }
}

const visualOptions$8 = {
  marginTop: {
    type: 'number',
    label: 'Margin (top)',
    default: 20,
    group: 'artboard'
  },
  marginRight: {
    type: 'number',
    label: 'Margin (right)',
    default: 10,
    group: 'artboard'
  },
  marginBottom: {
    type: 'number',
    label: 'Margin (bottom)',
    default: 20,
    group: 'artboard'
  },
  marginLeft: {
    type: 'number',
    label: 'Margin (left)',
    default: 10,
    group: 'artboard'
  },
  showLegend: {
    type: 'boolean',
    label: 'Show legend',
    default: false,
    group: 'artboard'
  },
  legendWidth: {
    type: 'number',
    label: 'Legend width',
    default: 200,
    group: 'artboard',
    disabled: {
      showLegend: false
    },
    container: 'width',
    containerCondition: {
      showLegend: true
    }
  },
  interpolation: {
    type: 'text',
    label: 'Curves type',
    default: 'curveBumpX',
    options: [{
      label: 'Basis',
      value: 'curveBasis'
    }, {
      label: 'Bump',
      value: 'curveBumpX'
    }, {
      label: 'Cardinal',
      value: 'curveCardinal'
    }, {
      label: 'Catmull–Rom',
      value: 'curveCatmullRom'
    }, {
      label: 'Linear',
      value: 'curveLinear'
    }, {
      label: 'Monotone X',
      value: 'curveMonotoneX'
    }, {
      label: 'Natural',
      value: 'curveNatural'
    }, {
      label: 'Step',
      value: 'curveStep'
    }, {
      label: 'Step After',
      value: 'curveStepAfter'
    }, {
      label: 'Step Before',
      value: 'curveStepBefore'
    }],
    group: 'chart'
  },
  streamsOffset: {
    type: 'text',
    label: 'Streams vertical alignment',
    group: 'chart',
    options: [{
      label: 'Expand',
      value: 'stackOffsetExpand'
    }, {
      label: 'Silhouette',
      value: 'stackOffsetSilhouette'
    }, {
      label: 'None',
      value: 'stackOffsetNone'
    }],
    default: 'stackOffsetNone'
  },
  streamsPadding: {
    type: 'number',
    label: 'Padding',
    default: 1,
    group: 'chart'
  },
  showYAxis: {
    type: 'boolean',
    label: 'Show Y axis',
    default: false,
    group: 'chart',
    disabled: {
      streamsOffset: 'stackOffsetSilhouette'
    }
  },
  useSameScale: {
    type: 'boolean',
    label: 'Use same scale',
    default: true,
    group: 'series'
  },
  columnsNumber: {
    type: 'number',
    label: 'Number of columns',
    default: 0,
    group: 'series'
  },
  sortSeriesBy: {
    type: 'text',
    label: 'Sort series by',
    group: 'series',
    options: [{
      label: 'Total value (descending)',
      value: 'totalAscending'
    }, {
      label: 'Total value (ascending)',
      value: 'totalDescending'
    }, {
      label: 'Name',
      value: 'name'
    }, {
      label: 'Original',
      value: 'original'
    }],
    default: 'totalDescending'
  },
  showSeriesLabels: {
    type: 'boolean',
    label: 'Show series titles',
    default: true,
    group: 'series'
  },
  showGrid: {
    type: 'boolean',
    label: 'Show series grid',
    default: false,
    group: 'series'
  },
  colorScale: {
    type: 'colorScale',
    label: 'Color scale',
    dimension: 'streams',
    default: {
      scaleType: 'ordinal',
      interpolator: 'interpolateSpectral'
    },
    group: 'colors'
  },
  showLabels: {
    type: 'boolean',
    label: 'Show streams labels',
    default: true,
    group: 'Labels'
  },
  labelsType: {
    type: 'text',
    label: 'Labels position',
    group: 'Labels',
    options: ['On path', 'On point'],
    default: 'On point',
    disabled: {
      showLabels: false
    }
  },
  showLabelsOutline: {
    type: 'boolean',
    label: 'Show outline',
    default: false,
    group: 'Labels',
    disabled: {
      showLabels: false
    }
  }
};

var bumpchart = {
  metadata: metadata$8,
  dimensions: dimensions$8,
  mapData: mapData$8,
  render: render$8,
  visualOptions: visualOptions$8,
  styles: styles$1
};

var img$i = "data:image/svg+xml,%3csvg id='rawgraphs-icons' xmlns='http://www.w3.org/2000/svg' width='56' height='56' viewBox='0 0 56 56'%3e %3cdefs%3e %3cstyle%3e .cls-1 %7b fill: %2395e5c0%3b %7d .cls-2 %7b fill: %2306c26c%3b %7d %3c/style%3e %3c/defs%3e %3cg id='secundary'%3e %3cpath class='cls-1' d='M20.5%2c34.5A8.5%2c8.5%2c0%2c1%2c1%2c29%2c26%2c8.51%2c8.51%2c0%2c0%2c1%2c20.5%2c34.5Zm0-16A7.5%2c7.5%2c0%2c1%2c0%2c28%2c26%2c7.5083%2c7.5083%2c0%2c0%2c0%2c20.5%2c18.5Z'/%3e %3cpath class='cls-1' d='M34.5%2c30A4.5%2c4.5%2c0%2c1%2c1%2c39%2c25.5%2c4.505%2c4.505%2c0%2c0%2c1%2c34.5%2c30Zm0-8A3.5%2c3.5%2c0%2c1%2c0%2c38%2c25.5%2c3.5042%2c3.5042%2c0%2c0%2c0%2c34.5%2c22Z'/%3e %3cpath class='cls-1' d='M31.5%2c46A7.5%2c7.5%2c0%2c1%2c1%2c39%2c38.5%2c7.5083%2c7.5083%2c0%2c0%2c1%2c31.5%2c46Zm0-14A6.5%2c6.5%2c0%2c1%2c0%2c38%2c38.5%2c6.5075%2c6.5075%2c0%2c0%2c0%2c31.5%2c32Z'/%3e %3cpath class='cls-1' d='M31.5%2c21A4.5%2c4.5%2c0%2c1%2c1%2c36%2c16.5%2c4.505%2c4.505%2c0%2c0%2c1%2c31.5%2c21Zm0-8A3.5%2c3.5%2c0%2c1%2c0%2c35%2c16.5%2c3.5042%2c3.5042%2c0%2c0%2c0%2c31.5%2c13Z'/%3e %3cpath class='cls-1' d='M22.5%2c17A3.5%2c3.5%2c0%2c1%2c1%2c26%2c13.5%2c3.5042%2c3.5042%2c0%2c0%2c1%2c22.5%2c17Zm0-6A2.5%2c2.5%2c0%2c1%2c0%2c25%2c13.5%2c2.5026%2c2.5026%2c0%2c0%2c0%2c22.5%2c11Z'/%3e %3c/g%3e %3cg id='primary'%3e %3cpath class='cls-2' d='M28.0933%2c47.9844a20.5%2c20.5%2c0%2c1%2c1%2c20.5-20.5A20.5233%2c20.5233%2c0%2c0%2c1%2c28.0933%2c47.9844Zm0-40a19.5%2c19.5%2c0%2c1%2c0%2c19.5%2c19.5A19.5222%2c19.5222%2c0%2c0%2c0%2c28.0933%2c7.9844Z'/%3e %3ccircle class='cls-2' cx='17.5' cy='25.5' r='3.5'/%3e %3ccircle class='cls-2' cx='24.5' cy='25.5' r='2.5'/%3e %3ccircle class='cls-2' cx='32.5' cy='25.5' r='0.5'/%3e %3ccircle class='cls-2' cx='35.5' cy='25.5' r='1.5'/%3e %3ccircle class='cls-2' cx='28' cy='38' r='2'/%3e %3ccircle class='cls-2' cx='34' cy='38' r='3'/%3e %3ccircle class='cls-2' cx='31.5' cy='16.5' r='2.5'/%3e %3ccircle class='cls-2' cx='22.5' cy='13.5' r='1.5'/%3e %3c/g%3e%3c/svg%3e";

var img$j = "data:image/svg+xml,%3csvg id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='320' height='160' viewBox='0 0 320 160'%3e %3cdefs%3e %3cstyle%3e .cls-1%2c .cls-4 %7b fill: none%3b %7d .cls-2 %7b fill: white%3b %7d .cls-3 %7b clip-path: url(%23clip-path)%3b %7d .cls-4 %7b stroke: %23ccc%3b %7d .cls-5 %7b fill: %23e1524a%3b %7d .cls-6 %7b fill: %23fba35e%3b %7d .cls-7 %7b fill: %239e0142%3b %7d .cls-8 %7b fill: %234ba0b1%3b %7d .cls-9 %7b fill: %23a0d9a3%3b %7d .cls-10 %7b fill: %235e4fa2%3b %7d .cls-11 %7b fill: %23ebf7a6%3b %7d .cls-12 %7b fill: %23fee89a%3b %7d %3c/style%3e %3cclipPath id='clip-path'%3e %3crect class='cls-1' width='320' height='160'/%3e %3c/clipPath%3e %3c/defs%3e %3crect id='background' class='cls-2' width='320' height='160'/%3e %3cg class='cls-3'%3e %3cg id='viz'%3e %3cg id='nodes'%3e %3ccircle class='cls-4' cx='160' cy='80' r='98'/%3e %3cg id='B'%3e %3ccircle class='cls-4' cx='119.8768' cy='53.5941' r='48.3404'/%3e %3c/g%3e %3cg id='A'%3e %3ccircle class='cls-4' cx='209.8263' cy='53.5941' r='39.9823'/%3e %3c/g%3e %3cg id='C'%3e %3ccircle class='cls-4' cx='173.1827' cy='130.8209' r='43.8703'/%3e %3c/g%3e %3cg id='E'%3e %3ccircle class='cls-4' cx='99.9155' cy='51.8186' r='26.6734'/%3e %3c/g%3e %3cg id='F'%3e %3ccircle class='cls-4' cx='147.3744' cy='51.8186' r='19.1587'/%3e %3c/g%3e %3cg id='D'%3e %3ccircle class='cls-4' cx='129.9488' cy='83.3822' r='15.2688'/%3e %3c/g%3e %3cg id='L'%3e %3ccircle class='cls-4' cx='197.544' cy='37.8428' r='18.3815'/%3e %3c/g%3e %3cg id='I'%3e %3ccircle class='cls-4' cx='228.3828' cy='37.8428' r='10.8305'/%3e %3c/g%3e %3cg id='M'%3e %3ccircle class='cls-4' cx='221.6296' cy='68.731' r='19.1605'/%3e %3c/g%3e %3cg id='H'%3e %3ccircle class='cls-4' cx='151.5217' cy='130.8209' r='20.5825'/%3e %3c/g%3e %3cg id='G'%3e %3ccircle class='cls-4' cx='194.5786' cy='130.8209' r='20.8476'/%3e %3c/g%3e %3ccircle id='path0' class='cls-5' cx='89.8984' cy='51.8186' r='15.0295'/%3e %3cg id='O'%3e %3ccircle id='path1' class='cls-5' cx='115.7584' cy='51.8186' r='9.2037'/%3e %3c/g%3e %3ccircle id='path2' class='cls-6' cx='139.0462' cy='51.8186' r='9.2037'/%3e %3cg id='P'%3e %3ccircle id='path3' class='cls-6' cx='157.3915' cy='51.8186' r='7.5148'/%3e %3c/g%3e %3ccircle id='path4' class='cls-7' cx='123.8217' cy='83.3822' r='7.5148'/%3e %3cg id='N'%3e %3ccircle id='path5' class='cls-7' cx='138.277' cy='83.3822' r='5.3137'/%3e %3c/g%3e %3ccircle id='path6' class='cls-8' cx='191.4168' cy='37.8428' r='10.6275'/%3e %3cg id='F-2' data-name='F'%3e %3ccircle id='path7' class='cls-8' cx='208.9849' cy='37.8428' r='5.3137'/%3e %3c/g%3e %3ccircle id='path8' class='cls-9' cx='228.3828' cy='37.8428' r='9.2037'/%3e %3ccircle id='path9' class='cls-10' cx='213.3016' cy='68.5482' r='9.2037'/%3e %3cg id='U'%3e %3ccircle id='path10' class='cls-10' cx='231.6468' cy='68.5482' r='7.5148'/%3e %3c/g%3e %3cg id='V'%3e %3ccircle id='path11' class='cls-10' cx='223.8827' cy='80.7414' r='5.3137'/%3e %3c/g%3e %3ccircle id='path12' class='cls-11' cx='143.1935' cy='130.8209' r='10.6275'/%3e %3cg id='S'%3e %3ccircle id='path13' class='cls-11' cx='162.9626' cy='130.8209' r='7.5148'/%3e %3c/g%3e %3cg id='R'%3e %3ccircle id='path14' class='cls-11' cx='155.5991' cy='143.2602' r='5.3137'/%3e %3c/g%3e %3cg id='Q'%3e %3ccircle id='path15' class='cls-12' cx='184.5615' cy='130.8209' r='9.2037'/%3e %3c/g%3e %3ccircle id='path16' class='cls-12' cx='204.5957' cy='130.8209' r='9.2037'/%3e %3c/g%3e %3c/g%3e %3c/g%3e%3c/svg%3e";

const metadata$9 = {
  name: 'Circle Packing',
  id: 'rawgraphs.circlepacking',
  thumbnail: img$j,
  icon: img$i,
  categories: ['hierarchies', 'proportions'],
  description: 'It displays values of leaf nodes of a hierarchical structure by using circles areas. The hierarchical structure is depicted using nested circles. A further quantitative dimension with size and a quantitative or categorical dimension with color.',
  code: 'https://github.com/rawgraphs/rawgraphs-charts/tree/master/src/circlepacking',
  tutorial: 'https://rawgraphs.io/learning/how-to-make-a-circle-packing'
};

const dimensions$9 = [{
  id: 'hierarchy',
  name: 'Hierarchy',
  validTypes: ['number', 'date', 'string'],
  required: true,
  multiple: true
}, {
  id: 'size',
  name: 'Size',
  validTypes: ['number'],
  required: false,
  aggregation: true,
  aggregationDefault: 'sum'
}, {
  id: 'color',
  name: 'Color',
  validTypes: ['number', 'date', 'string'],
  required: false,
  aggregation: true,
  aggregationDefault: {
    number: 'sum',
    string: 'csvDistinct',
    date: 'csvDistinct'
  }
}, {
  id: 'label',
  name: 'Label',
  validTypes: ['number', 'date', 'string'],
  required: false,
  multiple: true,
  aggregation: true,
  aggregationDefault: 'csvDistinct'
}];

const mapData$9 = function (data, mapping, dataTypes, dimensions) {
  const colorAggregator = getDimensionAggregator('color', mapping, dataTypes, dimensions);
  const sizeAggregator = getDimensionAggregator('size', mapping, dataTypes, dimensions);
  const labelAggregators = getDimensionAggregator('label', mapping, dataTypes, dimensions); // add the non-compulsory dimensions.

  if (!('color' in mapping)) mapping.color = {
    value: undefined
  };
  if (!('size' in mapping)) mapping.size = {
    value: undefined
  };
  if (!('label' in mapping)) mapping.label = {
    value: undefined
  };
  const results = [];
  rollups(data, v => {
    const item = {
      hierarchy: new Map(mapping.hierarchy.value.map(d => [d, v[0][d]])),
      //get the first one since it's grouped
      size: mapping.size.value ? sizeAggregator(v.map(d => d[mapping.size.value])) : v.length,
      color: mapping.color.value ? colorAggregator(v.map(d => d[mapping.color.value])) : 'cells color',
      label: mapping.label.value ? mapping.label.value.map((label, i) => {
        return labelAggregators[i](v.map(d => d[label]));
      }) : undefined // create array of strings

    };
    results.push(item);
    return item;
  }, ...mapping.hierarchy.value.map(level => d => d[level]) // create a grouping for each level of the hierarchy
  );
  return results;
};

/*
Credits:
Inspired by https://observablehq.com/@d3/circle-packing
*/

function render$9(svgNode, data, visualOptions, mapping, originalData, styles) {
  const {
    // artboard
    width,
    height,
    background,
    // margin
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    // legend
    showLegend,
    legendWidth,
    // chart options
    padding,
    sortCirclesBy,
    // color
    colorScale,
    // labels
    showLabelsOutline,
    showHierarchyLabels,
    hierarchyLabelsStyle,
    autoHideLabels,
    labelStyles
  } = visualOptions;
  const margin = {
    top: marginTop,
    right: marginRight,
    bottom: marginBottom,
    left: marginLeft
  }; //check if there are negative values, in case throw error

  data.forEach(d => {
    if (d.size < 0) {
      throw new Error('"Size" values cannot be negative');
    }
  });
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom; // create the hierarchical structure

  const nest = rollup(data, v => v[0], ...mapping.hierarchy.value.map(level => d => d.hierarchy.get(level)));
  const hierarchy$1 = hierarchy(nest).sum(d => d[1] instanceof Map ? 0 : d[1].size) // since maps have a .size porperty in native javascript, sum only values for leaves, and not for Maps
  .sort((a, b) => {
    if (sortCirclesBy !== 'original') {
      return d3[sortCirclesBy](a.value, b.value);
    }
  });

  const pack$1 = data => pack().size([chartWidth, chartHeight]).padding(showHierarchyLabels ? padding + 4 : padding)(hierarchy$1);

  const root = pack$1();
  const circle = arc().innerRadius(0).outerRadius(d => d).startAngle(-Math.PI).endAngle(Math.PI); // add background

  select(svgNode).append('rect').attr('width', showLegend ? width + legendWidth : width).attr('height', height).attr('x', 0).attr('y', 0).attr('fill', background).attr('id', 'background');
  const svg = select(svgNode).append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')').attr('id', 'viz');
  const node = svg.append('g').attr('id', 'nodes').selectAll('g').data(root.descendants()).join('g').attr('transform', d => `translate(${d.x + 1},${d.y + 1})`).attr('id', d => d.data[0]);
  node.append('path').attr('id', d => 'p_' + (d.x + d.y + d.r + d.depth + d.height)).attr('d', d => circle(d.r)).attr('fill', d => d.children ? 'none' : colorScale(d.data[1].color)).attr('stroke', d => d.children ? '#ccc' : 'none');
  node.filter(d => !d.children);

  if (showHierarchyLabels) {
    const parents = node.filter(d => d.children);

    if (hierarchyLabelsStyle === 'onPath') {
      parents.append('text').attr('fill', 'black').attr('text-anchor', 'middle').attr('font-family', "'Arial', sans-serif").attr('font-size', 8).attr('dominant-baseline', 'middle').append('textPath').attr('href', d => '#p_' + (d.x + d.y + d.r + d.depth + d.height)).attr('startOffset', '50%').text(d => d.data[0]);
    }

    if (hierarchyLabelsStyle === 'onPoint') {
      parents.append('text').attr('fill', 'black').attr('text-anchor', 'middle').attr('font-family', "'Arial', sans-serif").attr('font-size', 8).attr('dominant-baseline', 'middle').attr('x', d => 0).attr('y', d => -d.r).text(d => d.data[0]);
    }
  }

  const labelsLayer = svg.append('g').attr('id', 'labels');
  labelsLayer.selectAll('g').data(mapping.label.value ? root.leaves() : []).join('g').attr('transform', d => `translate(${d.x + 1},${d.y + 1})`).append('text').attr('text-anchor', 'middle').attr('dominant-baseline', 'text-before-edge').selectAll('tspan').data((d, i, a) => {
    return Array.isArray(d.data[1].label) ? d.data[1].label : [d.data[1].label];
  }).join('tspan').attr('x', 0).attr('y', 0).attr('dy', (d, i) => i * 12).text((d, i) => {
    if (d && mapping.label.dataType[i].type === 'date') {
      return timeFormat(dateFormats$1[mapping.label.dataType[i].dateFormat])(d);
    } else {
      return d;
    }
  }).styles((d, i) => styles[labelStyles[i]]);
  labelsLayer.selectAll('text').call(sel => {
    return sel.attr('transform', function (d) {
      const height = sel.node().getBBox().height;
      return `translate(0,${-height / 2})`;
    });
  });

  if (showLabelsOutline) {
    // NOTE: Adobe Illustrator does not support paint-order attr
    labelsLayer.selectAll('text').styles(styles.labelOutline);
  }

  if (autoHideLabels) {
    //labelsOcclusion(texts, (d) => d.r)
    labelsOcclusion(labelsLayer.selectAll('text'), d => d.r);
  }

  if (showLegend) {
    // svg width is adjusted automatically because of the "container:height" annotation in legendWidth visual option
    const legendLayer = select(svgNode).append('g').attr('id', 'legend').attr('transform', `translate(${width},${marginTop})`);
    const chartLegend = legend().legendWidth(legendWidth);

    if (mapping.color.value) {
      chartLegend.addColor(mapping.color.value + ` [${mapping.color.config.aggregation}]`, colorScale);
    } // calculate the scale


    let sizeScale = scaleSqrt().domain(extent(hierarchy$1.leaves(), d => d.value)).rangeRound(extent(hierarchy$1.leaves(), d => d.r)); // if the maximum radius is bigger than a quarter of the legend width,
    // we must rescale it to fit in it. In this way, the maximum diameter in the legend
    // will be the half of legend width

    if (sizeScale.range()[1] > legendWidth / 4) {
      sizeScale.domain([sizeScale.invert(legendWidth / 8), sizeScale.invert(legendWidth / 4)]).rangeRound([legendWidth / 8, legendWidth / 4]);
    }

    chartLegend.addSize(mapping.size.value ? mapping.size.value + ` [${mapping.size.config.aggregation}]` : 'Number of records', sizeScale, 'circle');
    legendLayer.call(chartLegend);
  }
}

const visualOptions$9 = {
  marginTop: {
    type: 'number',
    label: 'Margin (top)',
    default: 20,
    group: 'artboard'
  },
  marginRight: {
    type: 'number',
    label: 'Margin (right)',
    default: 20,
    group: 'artboard'
  },
  marginBottom: {
    type: 'number',
    label: 'Margin (bottom)',
    default: 20,
    group: 'artboard'
  },
  marginLeft: {
    type: 'number',
    label: 'Margin (left)',
    default: 20,
    group: 'artboard'
  },
  showLegend: {
    type: 'boolean',
    label: 'Show legend',
    default: false,
    group: 'artboard'
  },
  legendWidth: {
    type: 'number',
    label: 'Legend width',
    default: 200,
    group: 'artboard',
    disabled: {
      showLegend: false
    },
    container: 'width',
    containerCondition: {
      showLegend: true
    }
  },
  padding: {
    type: 'number',
    label: 'Padding',
    default: 2,
    group: 'chart'
  },
  sortCirclesBy: {
    type: 'text',
    label: 'Sort circles by',
    group: 'chart',
    options: [{
      label: 'Size (descending)',
      value: 'descending'
    }, {
      label: 'Size (ascending)',
      value: 'ascending'
    }, {
      label: 'Original',
      value: 'original'
    }],
    default: 'descending'
  },
  colorScale: {
    type: 'colorScale',
    label: 'Color scale',
    dimension: 'color',
    default: {
      scaleType: 'ordinal',
      interpolator: 'interpolateSpectral'
    },
    group: 'colors'
  },
  labelStyles: {
    type: 'text',
    label: 'Label',
    group: 'labels',
    options: [{
      label: 'Primary',
      value: 'labelPrimary'
    }, {
      label: 'Secondary',
      value: 'labelSecondary'
    }, {
      label: 'Italic',
      value: 'labelItalic'
    }],
    default: 'labelPrimary',
    repeatFor: 'label',
    repeatDefault: ['labelPrimary', 'labelSecondary', 'labelItalic']
  },
  showLabelsOutline: {
    type: 'boolean',
    label: 'Show outline',
    default: false,
    group: 'labels'
  },
  showHierarchyLabels: {
    type: 'boolean',
    label: 'Show hierarchy labels',
    default: false,
    group: 'labels'
  },
  hierarchyLabelsStyle: {
    type: 'text',
    label: 'Hierarchy labels position',
    group: 'labels',
    options: [{
      label: 'On path',
      value: 'onPath'
    }, {
      label: 'On point',
      value: 'onPoint'
    }],
    default: 'onPoint',
    disabled: {
      showHierarchyLabels: false
    }
  },
  autoHideLabels: {
    type: 'boolean',
    label: 'Auto hide labels',
    default: false,
    group: 'labels'
  }
};

var circlepacking = {
  metadata: metadata$9,
  dimensions: dimensions$9,
  mapData: mapData$9,
  render: render$9,
  visualOptions: visualOptions$9,
  styles: styles$1
};

var img$k = "data:image/svg+xml,%3csvg id='rawgraphs-icons' xmlns='http://www.w3.org/2000/svg' width='56' height='56' viewBox='0 0 56 56'%3e %3cdefs%3e %3cstyle%3e .cls-1 %7b fill: %2395e5c0%3b %7d .cls-2 %7b fill: %2306c26c%3b %7d %3c/style%3e %3c/defs%3e %3cg id='secundary'%3e %3cpath class='cls-1' d='M41.6516%2c28.2064a14.3768%2c14.3768%2c0%2c0%2c0%2c1.8318-.5658%2c13.8021%2c13.8021%2c0%2c0%2c1%2c3.9648-.9111l-.0918-.9961a14.8546%2c14.8546%2c0%2c0%2c0-4.2148.9673%2c11.1656%2c11.1656%2c0%2c0%2c1-4.5439.7993H28.9244l5.2383-8.0153c1.3173-2.0138%2c2.9708-2.1361%2c4.8861-2.2772A8.6119%2c8.6119%2c0%2c0%2c0%2c43.2666%2c16.13l-.5332-.8467a7.7182%2c7.7182%2c0%2c0%2c1-3.7578.9267%2c10.4839%2c10.4839%2c0%2c0%2c0-3.0164.5256l3.1238-4.78-.8379-.5469-3.0542%2c4.6734a10.2981%2c10.2981%2c0%2c0%2c0-.4975-2.4483%2c9.2067%2c9.2067%2c0%2c0%2c1-.4922-4.21l-.99-.1435a10.1532%2c10.1532%2c0%2c0%2c0%2c.5235%2c4.6352c.497%2c1.6958.89%2c3.0347-.4112%2c5.0244l0%2c0-5.1576%2c7.8916L22.7725%2c9.2065l-.9571.293%2c5.2226%2c17.067L13.2354%2c15.2651l-.6329.7735L26.4212%2c27.3531l-17.68-1.62-.0918.9961%2c17.6881%2c1.62L10.7061%2c37.0161l.4843.875%2c15.6851-8.6959L19.1494%2c45.3813l.9024.4307%2c7.7036-16.139%2c2.7632%2c17.6708.9882-.1543L28.7445%2c29.5241%2c40.9707%2c42.5557l.7285-.6846L29.1545%2c28.5H38.5a5.5617%2c5.5617%2c0%2c0%2c1%2c4.2354%2c1.7256%2c8.5877%2c8.5877%2c0%2c0%2c0%2c4.2519%2c2.2495l.2051-.9785a7.6392%2c7.6392%2c0%2c0%2c1-3.8037-2.0283A9.3688%2c9.3688%2c0%2c0%2c0%2c41.6516%2c28.2064Z'/%3e %3c/g%3e %3cg id='primary'%3e %3ccircle class='cls-2' cx='28' cy='28' r='1.5'/%3e %3ccircle class='cls-2' cx='38.5' cy='28' r='1.5'/%3e %3ccircle class='cls-2' cx='47.305' cy='26.2314' r='1.5'/%3e %3ccircle class='cls-2' cx='47.0898' cy='31.986' r='1.5'/%3e %3ccircle class='cls-2' cx='43.1356' cy='15.6079' r='1.5'/%3e %3ccircle class='cls-2' cx='38.6642' cy='11.6828' r='1.5'/%3e %3ccircle class='cls-2' cx='33.7062' cy='9.352' r='1.5'/%3e %3ccircle class='cls-2' cx='22.2938' cy='9.353' r='1.5'/%3e %3ccircle class='cls-2' cx='12.9193' cy='15.6517' r='1.5'/%3e %3ccircle class='cls-2' cx='8.6949' cy='26.2314' r='1.5'/%3e %3ccircle class='cls-2' cx='10.9487' cy='37.4537' r='1.5'/%3e %3ccircle class='cls-2' cx='19.6004' cy='45.5965' r='1.5'/%3e %3ccircle class='cls-2' cx='31.0127' cy='47.2664' r='1.5'/%3e %3ccircle class='cls-2' cx='41.3348' cy='42.2132' r='1.5'/%3e %3ccircle class='cls-2' cx='33.7624' cy='19.2262' r='1.5'/%3e %3ccircle class='cls-2' cx='29.6124' cy='38.376' r='1.5'/%3e %3ccircle class='cls-2' cx='35.2974' cy='35.5428' r='1.5'/%3e %3ccircle class='cls-2' cx='23.4611' cy='37.5086' r='1.5'/%3e %3ccircle class='cls-2' cx='18.7725' cy='33.0056' r='1.5'/%3e %3ccircle class='cls-2' cx='17.5583' cy='27.0434' r='1.5'/%3e %3ccircle class='cls-2' cx='19.8824' cy='21.3532' r='1.5'/%3e %3ccircle class='cls-2' cx='24.9211' cy='17.9385' r='1.5'/%3e %3c/g%3e%3c/svg%3e";

var img$l = "data:image/svg+xml,%3csvg id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='320' height='160' viewBox='0 0 320 160'%3e %3cdefs%3e %3cstyle%3e .cls-1%2c .cls-4 %7b fill: none%3b %7d .cls-2 %7b fill: white%3b %7d .cls-3 %7b clip-path: url(%23clip-path)%3b %7d .cls-4 %7b stroke: %23ccc%3b %7d .cls-5 %7b fill: %23ccc%3b %7d .cls-6 %7b fill: %23e1524a%3b %7d .cls-7 %7b fill: %23fba35e%3b %7d .cls-8 %7b fill: %239e0142%3b %7d .cls-9 %7b fill: %234ba0b1%3b %7d .cls-10 %7b fill: %235e4fa2%3b %7d .cls-11 %7b fill: %23a0d9a3%3b %7d .cls-12 %7b fill: %23ebf7a6%3b %7d .cls-13 %7b fill: %23fee89a%3b %7d .cls-14%2c .cls-15%2c .cls-16%2c .cls-17 %7b isolation: isolate%3b font-size: 12px%3b font-family: Helvetica%3b %7d .cls-15 %7b letter-spacing: -0.0547em%3b %7d .cls-16 %7b letter-spacing: -0.0366em%3b %7d .cls-17 %7b letter-spacing: -0.0176em%3b %7d %3c/style%3e %3cclipPath id='clip-path'%3e %3crect class='cls-1' width='320' height='160'/%3e %3c/clipPath%3e %3c/defs%3e %3crect class='cls-2' width='320' height='160'/%3e %3cg class='cls-3'%3e %3cg id='viz'%3e %3cg id='links'%3e %3cpath class='cls-4' d='M160.6626%2c79.527c-2.0278%2c12.3344%2c11.7336-4.31%2c23.4672-8.6193'/%3e %3cpath class='cls-4' d='M160.6626%2c79.527c-2.0278%2c12.3344-3.76%2c11.9213-7.519%2c23.8425'/%3e %3cpath class='cls-4' d='M160.6626%2c79.527c-2.0278%2c12.3344-9.7362-7.8393-19.4725-15.6787'/%3e %3cpath class='cls-4' d='M184.13%2c70.9077c11.7336-4.31-7.21-25.1733-1.79-36.4375'/%3e %3cpath class='cls-4' d='M184.13%2c70.9077c11.7336-4.31%2c12.8965-.5422%2c25.0177-3.5961'/%3e %3cpath class='cls-4' d='M184.13%2c70.9077c11.7336-4.31%2c10.7982%2c23.8553%2c22.22%2c28.934'/%3e %3cpath class='cls-4' d='M153.1436%2c103.37c-3.76%2c11.9213%2c24.5%2c9.5923%2c30.1607%2c20.7373'/%3e %3cpath class='cls-4' d='M153.1436%2c103.37c-3.76%2c11.9213-6.5889%2c10.9025-11.2915%2c22.4842'/%3e %3cpath class='cls-4' d='M153.1436%2c103.37c-3.76%2c11.9213-25.5707-6.1981-36.6006-.3167'/%3e %3cpath class='cls-4' d='M141.19%2c63.8483c-9.7362-7.8393-17.0108%2c7.0059-29.1719%2c4.1149'/%3e %3cpath class='cls-4' d='M141.19%2c63.8483c-9.7362-7.8393%2c3.2149-18.1139-2.2043-29.3781'/%3e %3cpath class='cls-4' d='M182.3394%2c34.47l10.8384-22.5284'/%3e %3cpath class='cls-4' d='M209.1475%2c67.3116%2c233.39%2c61.2039'/%3e %3cpath class='cls-4' d='M206.35%2c99.8417l22.8435%2c10.1574'/%3e %3cpath class='cls-4' d='M183.3043%2c124.1068l11.3208%2c22.29'/%3e %3cpath class='cls-4' d='M141.8521%2c125.8537c-4.7027%2c11.5817%2c12.54%2c15.858%2c11.2865%2c28.295'/%3e %3cpath class='cls-4' d='M141.8521%2c125.8537c-4.7027%2c11.5817-20.0461%2c2.6265-27.8174%2c12.4172'/%3e %3cpath class='cls-4' d='M112.0182%2c67.9632c-12.1611-2.8909-13.7717%2c14.8015-26.2549%2c15.449'/%3e %3cpath class='cls-4' d='M112.0182%2c67.9632c-12.1611-2.8909-5.6376-19.4154-16.494-25.6113'/%3e %3cpath class='cls-4' d='M138.9858%2c34.47c-5.4191-11.2642-5.4191-11.2642-10.8383-22.5284'/%3e %3c/g%3e %3cg%3e %3ccircle class='cls-5' cx='160.6626' cy='79.527' r='5'/%3e %3ccircle class='cls-5' cx='184.1298' cy='70.9077' r='5'/%3e %3ccircle class='cls-5' cx='153.1436' cy='103.3695' r='5'/%3e %3ccircle class='cls-5' cx='141.1901' cy='63.8483' r='5'/%3e %3ccircle class='cls-6' cx='182.3394' cy='34.4702' r='5'/%3e %3ccircle class='cls-7' cx='209.1475' cy='67.3116' r='5'/%3e %3ccircle class='cls-8' cx='206.3498' cy='99.8417' r='5'/%3e %3ccircle class='cls-9' cx='183.3043' cy='124.1068' r='5'/%3e %3ccircle class='cls-10' cx='141.8521' cy='125.8537' r='5'/%3e %3ccircle class='cls-11' cx='116.543' cy='103.0528' r='20'/%3e %3ccircle class='cls-12' cx='112.0182' cy='67.9632' r='5'/%3e %3ccircle class='cls-13' cx='138.9858' cy='34.4702' r='5'/%3e %3ccircle class='cls-6' cx='193.1778' cy='11.9418' r='20'/%3e %3ccircle class='cls-7' cx='233.39' cy='61.2039' r='13.3333'/%3e %3ccircle class='cls-8' cx='229.1933' cy='109.9991' r='6.6667'/%3e %3ccircle class='cls-9' cx='194.6251' cy='146.3967' r='6.6667'/%3e %3ccircle class='cls-10' cx='153.1386' cy='154.1487' r='13.3333'/%3e %3ccircle class='cls-10' cx='114.0347' cy='138.2709' r='6.6667'/%3e %3ccircle class='cls-12' cx='85.7633' cy='83.4122' r='13.3333'/%3e %3ccircle class='cls-12' cx='95.5242' cy='42.352' r='6.6667'/%3e %3ccircle class='cls-13' cx='128.1474' cy='11.9418' r='20'/%3e %3c/g%3e %3cg%3e %3ctext class='cls-14' transform='translate(172.3809 79.5233) rotate(-20.1677)'%3eB%3c/text%3e %3ctext class='cls-15' transform='matrix(0.3008%2c -0.9537%2c 0.9537%2c 0.3008%2c 158.7581%2c 98.8386)'%3eA%3c/text%3e %3ctext class='cls-14' transform='matrix(0.7789%2c 0.6272%2c -0.6272%2c 0.7789%2c 143.3358%2c 70.7422)'%3eC%3c/text%3e %3ctext class='cls-14' transform='translate(179.9372 48.8317) rotate(-64.3077)'%3eE%3c/text%3e %3ctext class='cls-14' transform='translate(197.2319 74.452) rotate(-14.141)'%3eF%3c/text%3e %3ctext class='cls-14' transform='matrix(0.9137%2c 0.4063%2c -0.4063%2c 0.9137%2c 191.3355%2c 97.4866)'%3eD%3c/text%3e %3ctext class='cls-16' transform='translate(173.9365 114.6304) rotate(63.0747)'%3eL%3c/text%3e %3ctext class='cls-14' transform='translate(147.7733 121.8223) rotate(-67.9008)'%3eM%3c/text%3e %3ctext class='cls-14' transform='matrix(0.8824%2c -0.4705%2c 0.4705%2c 0.8824%2c 93.446%2c 119.8627)'%3eI%3c/text%3e %3ctext class='cls-14' transform='translate(116.9062 73.2923) rotate(13.3724)'%3eH%3c/text%3e %3ctext class='cls-14' transform='translate(137.9879 41.6753) rotate(64.3077)'%3eG%3c/text%3e %3ctext class='cls-17' transform='translate(252.1783 60.6085) rotate(-14.141)'%3eP%3c/text%3e %3ctext class='cls-14' transform='matrix(0.9137%2c 0.4063%2c -0.4063%2c 0.9137%2c 238.2403%2c 118.3428)'%3eN%3c/text%3e %3ctext class='cls-14' transform='translate(196.2792 158.6221) rotate(63.0747)'%3eF%3c/text%3e %3ctext class='cls-14' transform='matrix(0.6217%2c -0.7833%2c 0.7833%2c 0.6217%2c 104.9654%2c 156.2111)'%3eV%3c/text%3e %3ctext class='cls-14' transform='matrix(0.9987%2c -0.0518%2c 0.0518%2c 0.9987%2c 59.6675%2c 88.8149)'%3eS%3c/text%3e %3ctext class='cls-14' transform='matrix(0.8685%2c 0.4957%2c -0.4957%2c 0.8685%2c 75.843%2c 35.7488)'%3eR%3c/text%3e %3c/g%3e %3c/g%3e %3c/g%3e%3c/svg%3e";

const metadata$a = {
  name: 'Circular dendrogram',
  id: 'rawgraphs.circulardendrogram',
  thumbnail: img$l,
  icon: img$k,
  categories: ['hierarchies', 'proportions'],
  description: 'It displays hierarchically structured data with a radial tree structure, where the root node is in the center with the hierarchies moving outward. The area of nodes can be used to encode a further quantitative dimension and a quantitative or categorical dimension with color.',
  code: 'https://github.com/rawgraphs/rawgraphs-charts/tree/master/src/circularDendrogram',
  tutorial: 'https://rawgraphs.io/learning/how-to-make-a-circular-dendrogram/'
};

const dimensions$a = [{
  id: 'hierarchy',
  name: 'Hierarchy',
  validTypes: ['number', 'date', 'string'],
  required: true,
  multiple: true
}, {
  id: 'size',
  name: 'Size',
  validTypes: ['number'],
  required: false,
  aggregation: true,
  aggregationDefault: 'sum'
}, {
  id: 'color',
  name: 'Color',
  validTypes: ['number', 'date', 'string'],
  required: false,
  aggregation: true,
  aggregationDefault: {
    number: 'sum',
    string: 'csvDistinct',
    date: 'csvDistinct'
  }
}, {
  id: 'label',
  name: 'Label',
  validTypes: ['number', 'date', 'string'],
  required: false,
  multiple: true,
  aggregation: true,
  aggregationDefault: {
    number: 'sum',
    string: 'csvDistinct',
    date: 'csvDistinct'
  }
}];

const mapData$a = function (data, mapping, dataTypes, dimensions) {
  const colorAggregator = getDimensionAggregator('color', mapping, dataTypes, dimensions);
  const sizeAggregator = getDimensionAggregator('size', mapping, dataTypes, dimensions);
  const labelAggregators = getDimensionAggregator('label', mapping, dataTypes, dimensions);
  const results = [];
  rollups(data, v => {
    const item = {
      hierarchy: new Map(mapping.hierarchy.value.map(d => [d, v[0][d]])),
      //get the first one since it's grouped
      size: mapping.size.value ? sizeAggregator(v.map(d => d[mapping.size.value])) : v.length,
      color: mapping.color.value ? colorAggregator(v.map(d => d[mapping.color.value])) : 'cells color',
      label: mapping.label.value ? mapping.label.value.map((label, i) => {
        return labelAggregators[i](v.map(d => d[label]));
      }) : undefined // create array of strings

    };
    results.push(item);
    return item;
  }, ...mapping.hierarchy.value.map(level => d => d[level]) // create a grouping for each level of the hierarchy
  );
  return results;
};

/*
Credits:
Inspired by https://observablehq.com/@d3/radial-dendrogram
*/

function render$a(svgNode, data, visualOptions, mapping, originalData, styles) {
  const {
    width,
    height,
    background,
    // margins
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    // legend
    showLegend,
    legendWidth,
    // colors
    colorScale,
    maxDiameter,
    layout,
    sizeOnlyLeaves,
    label1Style,
    label2Style,
    label3Style,
    sortBy,
    // labels
    showHierarchyLabels,
    hierarchyStyle,
    labelStyles,
    showLabelsOutline
  } = visualOptions;
  const margin = {
    top: marginTop,
    right: marginRight,
    bottom: marginBottom,
    left: marginLeft
  }; //check if there are negative values, in case throw error

  data.forEach(d => {
    if (d.size < 0) {
      throw new Error('"Size" values cannot be negative');
    }
  });
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;
  const radius = min([chartWidth, chartHeight]) / 2;
  const circumference = radius * 2 * Math.PI; // create the hierarchical structure

  const nest = rollup(data, v => v[0], ...mapping.hierarchy.value.map(level => d => d.hierarchy.get(level)));
  const hierarchy$1 = hierarchy(nest) // since maps have also a .size porperty, sum only values for leaves, and not for Maps
  .sum(d => d[1] instanceof Map ? 0 : d[1].size) // sort nodes according to options
  .sort((a, b) => {
    switch (sortBy) {
      case 'Size (descending)':
        return descending(a.value, b.value);

      case 'Size (ascending)':
        return ascending(a.value, b.value);

      case 'Name':
        return ascending(a.data[0], b.data[0]);

      default:
        return 0;
    }
  }); // filter nodes with empty values in the hierarchy
  // @TODO check if this works also with empty values in non-leaf nodes

  hierarchy$1.descendants().filter(d => d.data[0] === '') // select nodes with empty key
  .forEach(d => {
    const index = d.parent.children.indexOf(d); // get its index in parent's children array

    d.parent.children.splice(index, 1); // remove it

    if (d.parent.children.length == 0) {
      // if it was the only children
      d.parent.data[1] = d.data[1]; // move its values to parent

      delete d.parent.children; // and remove the empty children array
    }
  }); // size scale

  const sizeScale = scaleSqrt().domain([0, max(hierarchy$1.leaves(), d => d.value)]).range([0, maxDiameter / 2]); // get the total size

  const totalValue = sum(hierarchy$1.leaves(), d => sizeScale(d.value) * 2); // compute padding

  const padding = (circumference - totalValue) / (hierarchy$1.leaves().length - 1); // dictionary to choose algorithm according to options

  const layouts = {
    'Cluster Dendogram': cluster(),
    Tree: tree()
  }; // compute the layout

  const tree$1 = nest => {
    return layouts[layout] // compute according to the options
    .size([2 * Math.PI, radius - 100]).separation((a, b) => sizeScale(a.value) + sizeScale(b.value) + padding)(hierarchy$1);
  };

  const root = tree$1(); // add background

  select(svgNode).append('rect').attr('width', showLegend ? width + legendWidth : width).attr('height', height).attr('x', 0).attr('y', 0).attr('fill', background).attr('id', 'background');
  const svg = select(svgNode).append('g').attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')').attr('id', 'viz');
  svg.append('g').attr('id', 'links').selectAll('path').data(root.links()).join('path').attr('d', linkRadial().angle(d => d.x).radius(d => d.y)).attr('fill', 'none').attr('stroke', '#ccc');
  svg.append('g').selectAll('circle').data(root.descendants()).join('circle').attr('transform', d => `
	        rotate(${d.x * 180 / Math.PI - 90})
	        translate(${d.y},0)
	      `).attr('fill', function (d) {
    if ('children' in d) {
      // if not leaf, check if leaves has the same value
      const childrenColors = [...new Set(d.leaves().map(l => l.data[1].color))];
      return childrenColors.length == 1 ? colorScale(childrenColors[0]) : '#ccc';
    } else {
      // otherwise, if it's a leaf use its own color
      return colorScale(d.data[1].color);
    }
  }).attr('r', d => {
    if (sizeOnlyLeaves) {
      return d.children ? 5 : sizeScale(d.value);
    } else {
      return sizeScale(d.value);
    }
  }); // add labels

  const textGroups = svg.append('g').attr('id', 'labels');
  textGroups.selectAll('g').data(root.descendants()).join('g').filter(d => showHierarchyLabels ? true : !d.children) // if showHierarchyLabels is false, hide non-leaf nodes
  .attr('transform', d => `
	        rotate(${d.x * 180 / Math.PI - 90})
	        translate(${d.y},0)
	        rotate(${d.x >= Math.PI ? 180 : 0})
	      `).append('text').attr('x', 0).attr('y', 0).attr('text-anchor', 'middle').attr('dominant-baseline', 'text-before-edge').selectAll('tspan').data(d => {
    // if the node has children
    // pass just its name in hierarhcy
    if (d.children) {
      return [{
        string: d.data[0],
        x: d.x < Math.PI === !d.children ? 6 : -6,
        align: d.x < Math.PI === !d.children ? 'start' : 'end',
        style: styles['labelSecondary'],
        hierarchy: true
      }];
    } // else pass the mapped labels
    else {
        const xpos = sizeScale(d.value) + 5;
        return d.data[1].label.map((e, i) => ({
          string: e,
          x: d.x < Math.PI === !d.children ? xpos : -xpos,
          align: d.x < Math.PI === !d.children ? 'start' : 'end',
          style: styles[labelStyles[i]]
        }));
      }
  }).join('tspan').attr('x', d => d.x).attr('y', 0).attr('dy', (d, i) => i * 12).attr('text-anchor', d => d.align) // .styles((d, i) => styles[labelStyles[i]])
  .styles(d => d.style).text(d => d.string);
  textGroups.selectAll('text').each(function () {
    const sel = select(this);
    sel.attr('transform', function (d) {
      const height = sel.node().getBBox().height;
      return `translate(0,${-height / 2})`;
    });
  });

  if (showLabelsOutline) {
    // NOTE: Adobe Illustrator does not support paint-order attr
    textGroups.selectAll('text').styles(styles.labelOutline);
  }

  if (showLegend) {
    // svg width is adjusted automatically because of the "container:height" annotation in legendWidth visual option
    const legendLayer = select(svgNode).append('g').attr('id', 'legend').attr('transform', `translate(${width},${marginTop})`);
    const chartLegend = legend().legendWidth(legendWidth);

    if (mapping.color.value) {
      chartLegend.addColor(mapping.color.value, colorScale);
    }

    chartLegend.addSize(mapping.size.value ? mapping.size.value : 'Number of records', sizeScale, 'circle');
    legendLayer.call(chartLegend);
  }
}

const visualOptions$a = {
  marginTop: {
    type: 'number',
    label: 'Margin (top)',
    default: 10,
    group: 'artboard'
  },
  marginRight: {
    type: 'number',
    label: 'Margin (right)',
    default: 10,
    group: 'artboard'
  },
  marginBottom: {
    type: 'number',
    label: 'Margin (bottom)',
    default: 10,
    group: 'artboard'
  },
  marginLeft: {
    type: 'number',
    label: 'Margin (left)',
    default: 10,
    group: 'artboard'
  },
  maxDiameter: {
    type: 'number',
    label: 'Maximum diameter',
    default: 20,
    group: 'chart'
  },
  showLegend: {
    type: 'boolean',
    label: 'Show legend',
    default: false,
    group: 'artboard'
  },
  legendWidth: {
    type: 'number',
    label: 'Legend width',
    default: 200,
    group: 'artboard',
    disabled: {
      showLegend: false
    },
    container: 'width',
    containerCondition: {
      showLegend: true
    }
  },
  layout: {
    type: 'text',
    label: 'Layout algorithm',
    group: 'chart',
    options: ['Cluster Dendogram', 'Tree'],
    default: 'Tree'
  },
  sortBy: {
    type: 'text',
    label: 'Sort nodes by',
    group: 'chart',
    options: ['Size (descending)', 'Size (ascending)', 'Name', 'Original'],
    default: 'Size (descending)'
  },
  sizeOnlyLeaves: {
    type: 'boolean',
    label: 'Size only leaf nodes',
    default: true,
    group: 'chart'
  },
  colorScale: {
    type: 'colorScale',
    label: 'Color scale',
    dimension: 'color',
    default: {
      scaleType: 'ordinal',
      interpolator: 'interpolateSpectral'
    },
    group: 'color'
  },
  showHierarchyLabels: {
    type: 'boolean',
    label: 'Show hierarchy labels',
    default: true,
    group: 'labels'
  },
  hierarchyStyle: {
    type: 'text',
    label: 'Hierarchy labels',
    group: 'labels',
    options: [{
      label: 'Primary',
      value: 'labelPrimary'
    }, {
      label: 'Secondary',
      value: 'labelSecondary'
    }, {
      label: 'Italic',
      value: 'labelItalic'
    }],
    default: 'labelPrimary'
  },
  labelStyles: {
    type: 'text',
    label: 'Label',
    group: 'labels',
    options: [{
      label: 'Primary',
      value: 'labelPrimary'
    }, {
      label: 'Secondary',
      value: 'labelSecondary'
    }, {
      label: 'Italic',
      value: 'labelItalic'
    }],
    default: 'labelPrimary',
    repeatFor: 'label',
    repeatDefault: ['labelPrimary', 'labelSecondary', 'labelItalic']
  },
  showLabelsOutline: {
    type: 'boolean',
    label: 'Show outline',
    default: false,
    group: 'labels'
  }
};

var circularDendrogram = {
  metadata: metadata$a,
  dimensions: dimensions$a,
  mapData: mapData$a,
  render: render$a,
  visualOptions: visualOptions$a,
  styles: styles$1
};

const metadata$b = {
  name: 'Color test',
  // thumbnail,
  // icon,
  category: 'Test and Debugging',
  description: 'A test for color scales',
  code: 'https://github.com/rawgraphs/raw',
  tutorial: 'https://rawgraphs.io/learning/'
};

const dimensions$b = [{
  id: 'color',
  name: 'color',
  validTypes: ['number', 'date', 'string'],
  required: true
}];

const mapData$b = {
  color: 'get'
};

// import { categoryLegend } from 'rawgraphs-core'

function render$b(svgNode, data, visualOptions, mapping, originalData) {
  const {
    width = 500,
    height = 500,
    background = '#ffffff',
    colorScale
  } = visualOptions;
  const samples = colorScale.ticks ? colorScale.ticks() : colorScale.domain();
  const sampleHeight = height / samples.length;
  const svg = select(svgNode);
  const vizLayer = svg.append('g').attr('id', 'viz');
  vizLayer.selectAll('rect').data(samples).join('rect').attr('width', width).attr('height', sampleHeight).attr('y', (d, i) => i * sampleHeight).attr('stroke', '#222').attr('fill', d => {
    const col = colorScale(d);
    return col;
  });
}

const visualOptions$b = {
  colorScale: {
    type: 'colorScale',
    label: 'Color scale',
    dimension: 'color',
    default: {
      scaleType: 'ordinal',
      interpolator: 'schemeCategory10'
    },
    group: 'chart'
  }
};

var colortest = {
  metadata: metadata$b,
  dimensions: dimensions$b,
  mapData: mapData$b,
  render: render$b,
  visualOptions: visualOptions$b
};

var img$m = "data:image/svg+xml,%3csvg id='rawgraphs-icons' xmlns='http://www.w3.org/2000/svg' width='56' height='56' viewBox='0 0 56 56'%3e %3cdefs%3e %3cstyle%3e .cls-1 %7b fill: %2395e5c0%3b %7d .cls-2 %7b fill: %2306c26c%3b %7d %3c/style%3e %3c/defs%3e %3cg id='secundary'%3e %3cpath class='cls-1' d='M28.0254%2c19.15a5.3777%2c5.3777%2c0%2c0%2c0-1.1025-.1138%2c4.7429%2c4.7429%2c0%2c0%2c0-4.4849%2c2.9287c-.8335%2c1.8345-1.3682%2c2.5152-4.0947%2c2.9581-5.1436.1757-7.3677%2c4.0483-7.3189%2c7.811.0532%2c4.0791%2c2.811%2c8.2285%2c7.979%2c8.2661a8.2277%2c8.2277%2c0%2c0%2c0%2c8.0943-7.8311c.07-3.1079.562-3.7363%2c2.47-4.8789A5.0592%2c5.0592%2c0%2c0%2c0%2c32%2c24.0029%2c4.8548%2c4.8548%2c0%2c0%2c0%2c28.0254%2c19.15ZM24.9912%2c33.0933C24.3091%2c36.6816%2c21.9575%2c39%2c19%2c39a6.0377%2c6.0377%2c0%2c0%2c1-6-5.9873%2c6.3225%2c6.3225%2c0%2c0%2c1%2c1.9824-4.9409%2c4.8185%2c4.8185%2c0%2c0%2c1%2c4.1016-1.0645c2.6738.4566%2c4.4116%2c1.31%2c5.313%2c2.6074A4.4407%2c4.4407%2c0%2c0%2c1%2c24.9912%2c33.0933ZM27%2c27a3%2c3%2c0%2c1%2c1%2c3-3A3.0033%2c3.0033%2c0%2c0%2c1%2c27%2c27Z'/%3e %3cpath class='cls-1' d='M18.916%2c27.9927a4.7526%2c4.7526%2c0%2c0%2c0-.7978-.0694%2c3.7068%2c3.7068%2c0%2c0%2c0-2.4815.9048A5.3167%2c5.3167%2c0%2c0%2c0%2c14%2c32.9873%2c5.0429%2c5.0429%2c0%2c0%2c0%2c19%2c38c2.979%2c0%2c4.5405-2.6309%2c5.0088-5.0933a3.4386%2c3.4386%2c0%2c0%2c0-.4336-2.7216C22.8354%2c29.1191%2c21.311%2c28.4019%2c18.916%2c27.9927ZM19%2c36a3%2c3%2c0%2c1%2c1%2c3-3A3.0033%2c3.0033%2c0%2c0%2c1%2c19%2c36Z'/%3e %3cpath class='cls-1' d='M39%2c33a5%2c5%2c0%2c1%2c0%2c5%2c5A5.0059%2c5.0059%2c0%2c0%2c0%2c39%2c33Zm0%2c8a3%2c3%2c0%2c1%2c1%2c3-3A3.0033%2c3.0033%2c0%2c0%2c1%2c39%2c41Z'/%3e %3c/g%3e %3cg id='primary'%3e %3cpolygon class='cls-2' points='46.305 46.805 44.865 46.805 46.061 48 8 48 8 9.939 9.195 11.135 9.195 9.695 7.5 8 5.805 9.695 5.805 11.135 7 9.939 7 49 46.061 49 44.865 50.195 46.305 50.195 48 48.5 46.305 46.805'/%3e %3ccircle class='cls-2' cx='19' cy='33' r='2'/%3e %3ccircle class='cls-2' cx='27' cy='24' r='2'/%3e %3ccircle class='cls-2' cx='39' cy='38' r='2'/%3e %3c/g%3e%3c/svg%3e";

var img$n = "data:image/svg+xml,%3csvg id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='320' height='160' viewBox='0 0 320 160'%3e %3cdefs%3e %3cstyle%3e .cls-1%2c .cls-18 %7b fill: none%3b %7d .cls-2 %7b clip-path: url(%23clip-path)%3b %7d .cls-3 %7b fill: %23fee89a%3b %7d .cls-4 %7b fill: %23f8da93%3b %7d .cls-5 %7b fill: %23f2cb8d%3b %7d .cls-6 %7b fill: %23ecbd86%3b %7d .cls-7 %7b fill: %23e6af80%3b %7d .cls-8 %7b fill: %23dfa179%3b %7d .cls-9 %7b fill: %23d99273%3b %7d .cls-10 %7b fill: %23d2846d%3b %7d .cls-11 %7b fill: %23cb7666%3b %7d .cls-12 %7b fill: %23c46760%3b %7d .cls-13 %7b fill: %23bd585a%3b %7d .cls-14 %7b fill: %23b54954%3b %7d .cls-15 %7b fill: %23ae384e%3b %7d .cls-16 %7b fill: %23a62448%3b %7d .cls-17 %7b fill: %239e0142%3b %7d .cls-18 %7b stroke: black%3b %7d .cls-19 %7b isolation: isolate%3b font-size: 9.93099px%3b font-family: ArialMT%2c Arial%3b %7d %3c/style%3e %3cclipPath id='clip-path'%3e %3crect class='cls-1' x='19.98424' y='2.36511' width='297.93069' height='139.03432'/%3e %3c/clipPath%3e %3c/defs%3e %3cg%3e %3cg class='cls-2'%3e %3cg%3e %3cpath class='cls-3' d='M187.2012%2c132.46151l3.59664-.58367%2c3.97241-1.39208%2c3.35721-1.99666.6152-.3862%2c3.97241-3.53965.04549-.04656%2c3.92692-3.81056.17763-.16184%2c3.79478-2.13132%2c3.97241-1.7273.54621-.11379%2c3.4262-.44353%2c3.97241.04206%2c3.05983.40147.91258.22068%2c3.97241%2c1.39722%2c3.9724%2c1.7889%2c1.85668.56561%2c2.11573.7373%2c3.97241.64%2c3.97241.03083%2c3.97241-.45412%2c3.56349-.954.40892-.11035%2c3.97241-1.15506%2c3.97241-1.30011%2c3.44546-1.40689.52695-.25565%2c3.97241-2.521%2c1.30205-1.19577%2c2.67036-2.40331%2c1.72429-1.5691%2c2.24812-1.74854%2c2.45466-2.22387%2c1.51775-1.07975%2c3.84827-2.89266.12414-.09207%2c3.9724-3.5028.46146-.37754%2c3.511-3.21838.87564-.754%2c3.09677-1.94594%2c2.99916-2.02647.97325-.60828%2c3.5412-3.36413.43121-.40211%2c3.59233-3.5703.38008-.35972%2c3.2571-3.61269.71531-.84025%2c2.93612-3.13216%2c1.03629-1.28988%2c3.59057-2.68252.38184-.29447%2c3.97241-1.88325%2c1.9862-1.79469V41.0961l-1.9862-.12338-3.97241.108-3.97241-.24027-3.97241-.95519-3.97241-1.81967-1.69159-.94195-2.28082-1.57064-2.56216-2.40177-1.41025-1.34635-2.28821-2.62606-1.6842-2-1.79763-1.97241-2.17478-2.3375-1.50208-1.63491-2.47033-2.20812-2.14834-1.76429L286.13567%2c15.656l-3.56084-2.36679-.41157-.35413-3.97241-2.59434-2.0607-1.02394-1.91171-.93255L270.246%2c7.603l-3.97241.00967-3.97241.56367L258.3288%2c9.19094l-.34377.12589-3.62864.92494-3.97241.19916-3.97241-.25334L242.43916%2c9.966l-3.97241-.00385-3.97241-.06043-3.9724.04484-3.97241.08182-3.97241-.22608-1.734-.48551-2.23842-.89822L214.6323%2c6.801l-2.76243-1.45655-1.21-.86286L206.68748%2c1.3863l-.016-.01429-3.95639-3.86294-.12195-.10947-3.85046-3.204-1.75448-.76838-2.21793-.8813-3.97241-.52866-3.97241.2732-3.544%2c1.13676-.42839.141-3.9724%2c2.63662-1.4994%2c1.19483-2.473%2c1.6274-3.82606%2c2.345-.14635.072-3.97241%2c1.53309-3.97241.59211-3.97241.38206-3.97241.70985-1.98621.68326-1.9862%2c1.095L148.0812%2c9.31683l-.97986%2c1.67021-1.25058%2c2.3022-2.72183%2c2.75586-3.97241-.24616-3.97241-1.54764-1.84717-.96206L131.2117%2c12.0317l-3.97241-2.32591-.88906-.389-3.08334-1.704-3.97241-1.43079-3.97241-.784-.92691-.05368-3.0455-.25521-3.04552.25521-.92689.05473L103.40484%2c5.86l-3.97241.79287L95.46%2c7.75161%2c91.48761%2c9.07646l-.712.24037L87.5152%2c10.236l-3.97241%2c1.65508L81.2819%2c13.28924%2c79.57038%2c14.369%2c75.598%2c17.17529l-.22068.08635L71.62556%2c18.967l-3.9724.39658-3.97241-1.54216-.68414-.55975-3.28827-2.14452L55.8864%2c13.28924l-.15047-.07524-3.97241-1.48924-3.97241-1.19622-3.97241-.20588-3.97241.7774-3.97241%2c1.57938-.92689.6098-3.04552%2c3.80689-.08275.16551-.72083%2c3.97241.35358%2c3.97241.45%2c1.2%2c1.3442%2c2.77241%2c2.62821%2c2.40919%2c1.89694%2c1.56322%2c2.07547%2c1.45446%2c3.97241%2c2.50471.03009.01324L47.79111%2c39.051l3.97241%2c1.5047%2c1.28929.54036%2c2.68312%2c1.08466%2c3.97241.50712%2c3.97241-.32366%2c3.97241-.073%2c3.9724.43714L75.598%2c44.01092l.60772%2c1.05759%2c1.28454%2c3.97241.00315%2c3.97241-.57449%2c3.97241-1.20126%2c3.97241-.11966.34643-1.72284%2c3.626L71.73266%2c68.903l-.1071.18515-3.69335%2c3.78725-.279.23948-3.97241%2c2.10929L59.70834%2c76.549l-1.0232.29881-2.94921%2c1.47461-2.22777%2c2.4978L52.33427%2c84.7926l.44394%2c3.97241L54.687%2c92.73742l1.0489%2c1.11133%2c2.93086%2c2.86108%2c1.04155%2c1.22009%2c1.66087%2c2.75232%2c1.89073%2c3.97241.42081%2c1.05649.80616%2c2.91592%2c1.12812%2c3.97241%2c1.40192%2c3.97241.63621%2c1.05758%2c2.91482%2c2.91483%2c1.05758.696%2c3.97241%2c1.51558%2c3.97241.70564%2c3.97241-.28122%2c3.97241-1.38085%2c2.61949-1.25516%2c1.35292-.59084%2c3.97241-2.381%2c1.1374-1.00056%2c2.835-2.69672%2c1.42646-1.27569%2c2.54595-1.87956%2c3.97241-.95592%2c3.97241%2c1.33078%2c2.05186%2c1.5047%2c1.92055%2c1.44339%2c3.15637%2c2.529.816.6156%2c3.97241%2c2.33087%2c3.31034%2c1.02594.66206.27586%2c3.97241.88275%2c3.97241.26279%2c3.97241.142%2c3.97241.184%2c3.97241.56184%2c3.97241%2c1.2842.74805.37894%2c3.22436%2c2.08635%2c3.97241%2c1.8703.04053.01576%2c3.93188%2c1.3961%2c3.97241%2c1.04555%2c3.97241.76083%2c3.97241.54266%2c2.28413.22727%2c1.68828.22214%2c3.9724.17752%2c3.97241-.31539Z'/%3e %3cpath class='cls-4' d='M60.3704%2c29.17887l-.66206-1.85378-.963-2.11863-3.0094-2.283-3.34044-1.68942-.632-.25987-3.97241-1.61954-3.97241.979-.7421.90041-.33453%2c3.97241%2c1.07663%2c1.92%2c1.95468%2c2.05241%2c2.01773%2c1.03347%2c3.97241.89131%2c3.97241%2c1.47192L59.70834%2c30.503Zm134.67125%2c95.33782%2c3.701-2.54641%2c1.55927-1.426%2c2.41314-1.91975%2c2.74709-2.05266%2c1.22532-.72226%2c3.97241-1.70724%2c3.97241-1.24378%2c1.57635-.29913%2c2.39606-.32816%2c3.97241-.23254%2c3.97241.04813%2c3.97241.22794%2c2.3427.28463%2c1.6297.31939%2c3.97241.38162%2c3.97241-.1695%2c2.09656-.53151%2c1.87585-.603%2c3.97241-2.38925%2c1.42407-.9802%2c2.54834-3.97241h0l3.97241-3.0486%2c3.97241%2c1.00871%2c3.97241.36346%2c3.97241-.29645%2c3.97241-1.60461.71843-.39492%2c3.254-1.68992%2c2.95094-2.28249%2c1.02147-.88276%2c3.60087-3.08965.37154-.26347%2c3.9724-3.26988.59163-.43906%2c3.38078-2.13762%2c2.86126-1.83479%2c1.11115-.60188%2c3.97241-2.62342.7868-.74711%2c3.18561-2.80306%2c1.21677-1.16935%2c2.75564-2.69311%2c1.14015-1.2793%2c2.73049-3.9724.10177-.19771%2c2.67084-3.7747%2c1.30157-2.06819%2c2.54019-1.90422%2c1.43222-2.09536%2c2.94333-1.877%2c1.02908-2.76636%2c1.9862-1.206-1.9862-.46294-3.97241-1.72213-2.59811-1.78734-1.3743-.4369-3.97241-2.28537L312.331%2c45.06851l-2.36092-1.30135-3.97241-2.306-.49319-.36505-3.47922-2.89717-1.04765-1.07524-2.92476-3.44161-.44457-.5308-3.52784-3.59269-.38975-.37972-3.58266-3.76748-.19269-.20493-3.77971-3.95689-.01892-.01552-3.95349-2.7954-2.55162-1.177-1.42079-.80433-3.97241-1.85916L270.246%2c13.898l-3.97241.18246-3.97241.61077-3.97241.429-3.97241.31324-3.97241-.47168-3.97241-.72585-3.97241-.47838-3.97241-.07364-3.97241.02568-3.9724.22946-3.97241.42042-3.97241.27332-3.97241-.56445-3.97241-.7369-.1589-.04225-3.81351-1.52135-3.97241-2.42742-.02684-.02364-3.94557-3.29912-.80521-.67329-3.1672-2.7412L196.81112%2c1.372%2c194.77025.09353%2c190.79784-.895l-3.97241.1616L182.853.772l-.91428.6-3.05812%2c1.705L175.194%2c5.34442l-.28578.16148L170.9358%2c7.46879l-3.57183%2c1.848-.40058.22379L162.991%2c10.96447l-3.97241%2c2.17429-.18916.15048-3.65832%2c3.9724-.12493.24223-2.095%2c3.73018-1.87737%2c2.56165-3.97241%2c1.38513-3.97241-1.304-3.97241-1.81571-1.68886-.8271-2.28355-1.45-3.83463-2.52241-.13778-.08994-3.97241-2.7674L124.942%2c13.28924l-1.67511-.92382-3.97241-1.566L115.32207%2c9.905l-3.97241-.25371-3.97241.333-3.97241.59437-3.97241.96533L95.46%2c12.91448l-.94582.37476-3.02659%2c1.16835L87.5152%2c16.11705l-2.04639%2c1.14459-1.926%2c1.65088-2.03134%2c2.32153L79.57038%2c25.1608l-.02942.04566-.9994%2c3.97241.56148%2c3.97241.46734.89519.97975%2c3.07722L81.9757%2c41.0961l1.17165%2c3.97241.39544%2c3.12118.09768.85123-.09768.62722-.50244%2c3.34519-.98721%2c3.97241L80.449%2c60.95815l-.87864%2c2.27452-.73358%2c1.69789L77.00436%2c68.903%2c75.598%2c72.38646l-.29425.48891-2.645%2c3.97241-1.03319%2c2.00348-1.84087%2c1.96893-2.13153%2c2.9131L66.8717%2c84.7926l-.921%2c3.97241.48019%2c3.97241%2c1.22228%2c3.17792.2998.79449%2c1.27013%2c3.97241%2c1.34317%2c3.97241%2c1.0593%2c2.57038.681%2c1.402%2c2.77329%2c3.97241.51813.53681%2c3.97241%2c2.6354%2c3.97241.208%2c3.97241-1.64683%2c3.17793-1.73341.79448-.36669%2c3.97241-2.385%2c1.50238-1.22068%2c2.47-1.68264%2c3.10271-2.28977.8697-.60987%2c3.97241-1.02583%2c3.97241%2c1.06276.59586.57294%2c3.37655%2c3.24668.53339.72573%2c3.439%2c3.2659.87.70651%2c3.10243%2c2.33163%2c3.9724%2c1.63054.04845.01024%2c3.924.96337%2c3.97241.24815%2c3.97241-.14059%2c3.97241-.43765%2c3.97241-.29664%2c3.97241.14244%2c3.97241%2c1.0309%2c3.97241%2c1.25007%2c3.06071%2c1.21236.9117.3889%2c3.97241%2c1.82945%2c3.97241%2c1.73148.05441.02257%2c3.918%2c1.46674%2c3.97241%2c1.15262%2c3.9724.55242%2c3.97241-.12626%2c3.97241-.876%2c3.97241-1.97789Z'/%3e %3cpath class='cls-5' d='M194.19731%2c120.54429l.57294-.302%2c3.97241-2.84977%2c1.01441-.82068%2c2.958-2.14709%2c3.23719-1.82532.73522-.28993%2c3.97241-1.15717%2c3.97241-.89321%2c3.97241-.6865%2c3.97241-.50369%2c3.97241-.31911%2c1.757-.1228%2c2.21539-.15079%2c3.9724-.26083%2c3.97241-.82328%2c3.97241-2.059.75339-.67851%2c3.219-3.73407.15848-.23834%2c2.67149-3.97241%2c1.14244-1.50441%2c2.5566-2.468%2c1.41581-1.227%2c3.97241-1.28345%2c3.97241.87666%2c3.97241%2c1.4008.54883.233%2c3.42358%2c1.63643%2c3.97241-.38377%2c2.44966-1.25266%2c1.52275-.71009%2c3.97241-3.14852.16184-.1138%2c3.81057-2.17058%2c2.65238-1.80183%2c1.32-.72782%2c3.97241-2.1419%2c1.8922-1.10269%2c2.08021-.98476%2c3.97241-2.59832.42964-.38933%2c3.54277-3.17336.81308-.799%2c3.12045-3.9724.03888-.0707%2c2.189-3.90171%2c1.593-3.97241.19039-1.8584.377-2.114-.377-1.10606-.7508-2.86635-3.07065-3.97241-.151-.12545-3.97241-3.3033-.599-.54366-3.37342-2.61974-1.54339-1.35267-2.429-2.48609-1.40164-1.48632-2.57077-2.99763-.83071-.97478-3.1417-3.074-.924-.89838-3.04843-3.211-.91-.76138-3.0624-2.58808-2.52237-1.38433-1.45-.73176-3.97241-1.6053L270.246%2c18.38l-3.97241.40591-3.97241.65434-3.97241.029-3.97241-.22139-3.97241-.916-3.97241-1.05047-.10565-.01975-3.86676-.79361-3.97241-.1596-3.97241.08237-3.9724.40862-2.47662.46222-1.49579.2404-3.97241.532-3.97241-.16538-3.97241-.2464-3.59665-.36064-.37576-.057-3.97241-1.096-3.97241-2.31676-.79838-.50268-3.174-2.9702-.79738-1.00221-3.175-2.51433L191.2668%2c5.34442l-.469-.15927-3.97241-.21532-1.12377.37459-2.84864.94129-3.9724%2c2.02187-1.78617%2c1.00925-2.18624%2c1.28766-3.97241%2c2.1423-.89655.54245-3.07586%2c1.7788-3.7931%2c2.1936-.17931.16447-3.13009%2c3.80794-.84232%2c1.562-1.20522%2c2.41044-2.76719%2c2.75382-2.80275%2c1.21859-1.16966.26855-3.50895-.26855-.46346-.04414L143.12893%2c27.444l-3.97241-1.90516-.6753-.33234-3.29711-1.944-3.59843-2.02837-.374-.27167-3.97241-3.011-1.223-.68973-2.74942-1.515-3.97241-1.58046-3.4023-.877-.57011-.15993-3.97241-.31129-3.55225.47122-.42016.05573-3.97241.82037-3.97241%2c1.19721L95.46%2c16.938l-.69381.32363-3.2786%2c2.0812L88.819%2c21.23405%2c87.5152%2c22.6897l-1.819%2c2.51676-1.1864%2c3.97241.193%2c3.97241%2c1.23171%2c3.97241%2c1.4047%2c3.97241.176.65172.84671%2c3.32069.39675%2c3.97241-1.08687%2c3.97241-.15659.37-1.22482%2c3.60243L84.273%2c60.95815l-.73022%2c1.58137-1.06043%2c2.391L80.66858%2c68.903l-1.0982%2c2.82392-.498%2c1.14848-1.79551%2c3.97241L76.0295%2c80.82019l-.43153%2c1.576L74.56775%2c84.7926%2c73.85282%2c88.765l.13011%2c3.97241%2c1.13962%2c3.97241L75.598%2c98.3349l.67242%2c2.34734%2c1.93062%2c3.97241%2c1.36937%2c1.76375%2c3.97241%2c1.988%2c3.97241-.85477%2c3.97241-1.26481%2c3.41266-1.63214.55975-.23682%2c3.97241-2.46891%2c1.73922-1.26668%2c2.23319-1.75206%2c3.97241-1.5888%2c3.97241.42125%2c2.59363%2c2.91961%2c1.37878%2c1.32723%2c1.66982%2c2.64518%2c2.30259%2c2.95673.77051%2c1.01568%2c3.2019%2c2.75807%2c2.47774%2c1.21434%2c1.49466.76274%2c3.97241%2c1.061%2c3.97241.24022%2c3.97241-.32423%2c3.97241-.85%2c3.97241-.7776.93793-.11217%2c3.03448-.38465%2c3.97241.13126%2c2.05241.25339%2c1.92.26181%2c3.97241%2c1.02338%2c3.97241%2c1.31145%2c2.96947%2c1.37577%2c1.00294.62145%2c3.97241%2c2.64931%2c1.067.70165%2c2.90544%2c1.40623%2c3.9724%2c1.09721%2c3.97241.10385%2c3.97241-.86283Z'/%3e %3cpath class='cls-6' d='M193.73049%2c116.57188l1.03976-.59817%2c3.97241-2.84368.75944-.53056%2c3.213-1.64686%2c3.97241-1.3476%2c3.93756-.97795.03485-.00657%2c3.97241-.72761%2c3.97241-.68056%2c3.97241-.637%2c3.97241-.59944%2c3.97241-.74925%2c2.29982-.572%2c1.67258-.4226%2c3.97241-1.71639%2c2.4164-1.83342%2c1.556-1.29867%2c2.3328-2.67374%2c1.63961-1.75128%2c1.8067-2.22113%2c2.16571-2.653%2c1.47774-1.3194%2c2.49467-1.85065%2c3.97241-1.18559%2c3.97241.29339%2c3.97241.62424L270.246%2c87.744l3.97241-.02521%2c3.97241-1.57931%2c2.02463-1.34687%2c1.94778-1.30131%2c3.97241-1.76013%2c1.79493-.911%2c2.17747-.75567%2c3.97241-1.61348%2c3.10284-1.60326.86957-.39544%2c3.97241-2.57861%2c1.08991-.99836%2c2.8825-3.40928.46112-.56312%2c2.30765-3.97241%2c1.20364-3.366.24346-.60644.10265-3.97241-.34611-.8701-1.2769-3.10231L305.99771%2c49.869l-.67318-.828-3.29923-3.04365-.98128-.92876-2.99113-2.65177-1.48965-1.32064-2.48276-2.62329L292.837%2c37.12369l-2.72888-3.15927-.675-.81314-3.29744-3.21679-.99665-.75562-2.97576-2.5312-2.67072-1.44121-1.30169-.74083-3.97241-1.76872-3.97241-.444-3.97241.70293-3.97241.74568-3.97241-.385-3.97241-.69581L250.384%2c21.252l-.04181-.01794-3.9306-1.48471-3.97241-.94209-3.97241-.20576-3.97241.10032-3.9724.43848-3.97241.8248-3.97241.82758-3.97241.11116-3.97241.08262-3.97241.14735-3.97241-.05079-3.97241-.49155-3.97241-.0288-3.97241-2.1302-1.14667-1.17082L190.79784%2c14.037l-.94864-.74774-3.02377-1.58276-3.97241.92876-1.53222.654-2.44018.7908-3.97241%2c1.5468-3.66421%2c1.6348-.3082.1744-3.97241%2c3.44629-.37727.35172-2.88165%2c3.97241-.71349.8496-2.71482%2c3.12281-1.25759.98918L155.04616%2c32.319l-3.97241.29522-3.97241-.8834-3.97241-1.641-1.84731-.91092-2.1251-1.19641-3.97241-2.05561-1.39033-.72039-2.58208-1.59715-3.91835-2.37526-.05406-.04148-3.9724-2.33215-3.65821-1.59878-.3142-.13273-3.97241-1.10231-3.97241-.24524-3.97241.73039-2.882.74989-1.09046.34119-3.97241%2c1.58679-3.736%2c2.04443-.23646.16483-3.73019%2c3.80758-.24222.51368-1.66478%2c3.45873-.099%2c3.97241.99591%2c3.97241.7679%2c2.321.46809%2c1.65145%2c1.12365%2c3.97241.69354%2c3.97241-.96657%2c3.97241-1.31871%2c3.00715-.41985.96526-3.02391%2c3.97241-.52865.7435-1.63191%2c3.22891-1.936%2c3.97241-.4045%2c1.03282-1.15731%2c2.93958L80.7338%2c76.84778l-1.01795%2c3.97241-.14547.73774-.7211%2c3.23467-.157%2c3.97241.51982%2c3.97241.35829.98242%2c1.38343%2c2.99%2c2.56319%2c3.97241.02579.02613%2c3.97241.64269%2c3.97241-.36584.83144-.303%2c3.141-1.047%2c3.97241-2.35793.70869-.56748%2c3.26372-2.63323%2c2.42153-1.33918%2c1.55088-1.31644%2c3.97241-2.10805%2c3.2296%2c3.42449.74281.85389.93207%2c3.11852%2c1.66943%2c3.97241%2c1.37091%2c2.07612%2c1.05687%2c1.89629%2c2.91554%2c3.61128.46393.36113%2c3.50847%2c2.00276%2c3.97241%2c1.09193%2c3.97241.22317%2c3.97241-.46167%2c3.97241-1.19446%2c3.97241-1.24112%2c1.55442-.42061%2c2.418-.827%2c3.97241-.5683%2c3.97241.23936L162.991%2c108.481l.60188.146%2c3.37053.98431%2c3.97241%2c1.608%2c2.42941%2c1.38009%2c1.543.89761%2c3.97241%2c2.9004.286.1744%2c3.6864%2c1.86558%2c3.97241.48573%2c3.97241-.83932Z'/%3e %3cpath class='cls-7' d='M191.62967%2c112.59947l3.14058-1.50594%2c3.97241-1.87865%2c1.48575-.58782%2c2.48666-.6525%2c3.97241-.75513%2c3.97241-.65081%2c3.97241-.72421%2c3.97241-.81%2c1.83471-.37981%2c2.1377-.41832%2c3.97241-.78376%2c3.97241-.9977%2c3.9724-1.52436.45761-.24827%2c3.5148-2.1027%2c2.1395-1.86971%2c1.83291-1.60177%2c2.24552-2.37064%2c1.72689-1.79677%2c1.84052-2.17564%2c2.13189-2.319%2c2.15115-1.65341%2c1.82126-1.49106%2c3.97241-1.38863%2c3.97241-.144%2c3.97241.02426%2c3.97241.52876%2c3.97241-.22131%2c2.71233-1.28045%2c1.26008-.44055%2c3.97241-1.57136%2c3.97241-.81029%2c3.9724-1.12467.06286-.02554%2c3.90955-1.28958%2c3.97241-1.9144%2c1.12094-.76843%2c2.85147-2.46857%2c1.30445-1.50383%2c2.32758-3.97241.34038-1.05377%2c1.05514-2.91864-.158-3.97241-.89718-1.78463-1.0686-2.18778-2.90381-3.46489-.44321-.50752-3.5292-3.35367-.6753-.61874-3.29711-2.93635-1.18021-1.03606-2.7922-3.02928-.80192-.94313-3.17048-3.78838-.1933-.184-3.77911-2.91-2.37656-1.06239-1.59585-.8521-3.97241-1.65168-3.97241-.30885-3.97241%2c1.06144-3.97241.9055-3.97241-.97442-3.97241-1.37351-1.32757-.77879L250.384%2c24.0542l-3.97241-1.85983-3.11047-.96032-.86194-.24128-3.97241-.28725-3.97241.12925-2.94158.39928-1.03082.14017-3.97241.97226-3.97241%2c1.007-3.97241.37228-3.97241.38333-3.97241.65149-2.88563.44588-1.08678.17669-3.97241.54233-3.97241%2c1.12006-3.97241.51829-3.97241-.76086-2.4975-1.59651-1.47491-1.55172L182.853%2c21.43268l-.94993-.19863-3.02247-.44278-2.31725.44278-1.65516.32668-3.97241%2c2.56573-.92407%2c1.08-3.04834%2c3.434-.44914.53843L162.991%2c32.66708l-.66208.4842-3.31033%2c1.64956-3.97241.82317-3.97241-.42741-3.97241-1.12735-2.02954-.918-1.94287-.92119-3.97241-2.09556-1.97382-.95566-1.99859-1.108-3.97241-2.10543-1.46778-.759-2.50463-1.56477-3.9724-1.8361-1.61882-.57154-2.35359-1.01539-3.97241-1.14815-3.97241-.18522-3.97241%2c1.08327L103.862%2c21.23405l-.45714.19659L99.43243%2c23.474l-2.36171%2c1.73249L95.46%2c27.22991l-1.07529%2c1.949-.37445%2c3.97241.691%2c3.97241L95.46%2c39.64228l.56635%2c1.45382%2c1.83936%2c3.97241%2c1.44315%2c3.97241-.67306%2c3.97241-1.69259%2c3.97241L95.46%2c58.17539l-2.43967%2c2.78276-1.53274%2c1.6374-1.70347%2c2.335L87.5152%2c68.25124l-.32671.65173-1.46466%2c3.9724-1.66567%2c3.97241-.51537%2c2.38881-.3301%2c1.5836L82.703%2c84.7926l.2969%2c3.97241.54294%2c1.98621%2c1.14534%2c1.9862%2c2.82707%2c1.95611%2c3.97241.95226L95.46%2c94.99638l3.97241-2.11261.17825-.14635%2c3.57164-3.97241.22252-.26948%2c3.55982-3.70293.41259-.62341%2c2.99878-3.349.97363-1.25181%2c3.97241-1.56789%2c2.10538%2c2.8197L118.629%2c84.7926l.54583%2c3.97241-.17859%2c3.97241.29825%2c1.50567.29754%2c2.46674%2c1.17918%2c3.97241%2c2.42735%2c3.97241.06834.08464%2c3.9724%2c3.22413%2c1.677.66364%2c2.29544.73016%2c3.97241.23661%2c3.97241-.67541.78783-.29136%2c3.18458-1.508%2c3.97241-1.95686%2c1.14917-.50751%2c2.82324-1.56227%2c3.97241-.91849%2c3.97241.4509%2c3.97241%2c1.403%2c2.30582.6269%2c1.66659.49485%2c3.97241%2c1.1333%2c3.97241%2c1.31889%2c2.23643%2c1.02537%2c1.736%2c1.28179%2c3.76248%2c2.69062.20992.1272%2c3.97241.93786%2c3.97241-.63632Z'/%3e %3cpath class='cls-8' d='M209.50126%2c104.65465l1.15863-.12526%2c3.97241-.64%2c3.97241-.80182%2c3.97241-.90989%2c3.97241-1.03678%2c1.47478-.45864%2c2.49763-.87627%2c3.9724-1.89674%2c1.79261-1.1994%2c2.1798-1.52862%2c2.74232-2.44379%2c1.23009-1.12174%2c2.7509-2.85067%2c1.22151-1.19756%2c2.56721-2.77485%2c1.4052-1.67485%2c2.77808-2.29756%2c1.19433-1.128%2c3.97241-1.56889%2c3.97241-.44742%2c3.97241-.49589%2c3.97241-.24948%2c1.80563-.08276%2c2.16678-.08247%2c3.97241-.82143%2c3.97241-.71749%2c3.97241-.26595%2c3.9724-.6943%2c3.97241-1.29954.1836-.09123%2c3.78881-2.26567%2c1.93529-1.70673%2c2.03712-2.61917.833-1.35324%2c1.315-3.97241-.30811-3.97241-1.83985-3.36127-.37932-.61114-3.48365-3.97241-.10944-.104-3.97241-3.639-.26088-.22938-3.71153-3.24638-.77889-.726-3.19351-3.78765-.186-.18476-3.78641-3.60553-.72452-.36688-3.24789-1.38448-3.97241-1.20166-3.97241.06545-3.97241%2c1.6537-2.12119.867-1.85122%2c1.3334-3.34517-1.3334-.62724-.18817-3.97241-2.713-.79448-1.07121L250.384%2c27.15041l-2.78978-1.944-1.18263-.60164-3.97241-1.45353-3.97241-.36541-3.97241.14111-3.9724.58385-3.97241%2c1.13024-1.91173.56538-2.06068.70451-3.97241.64722-3.97241.64436-3.97241%2c1.00237-3.92827.97395-.04414.012-3.97241%2c1.06788-3.97241%2c1.31409-3.97241.86257-3.97241.23534-3.97241-.5566L182.853%2c31.3393l-3.9724-.606-3.97241-.08079-3.97241%2c2.23-.26881.26881-3.7036%2c3.42069-.77891.55172-3.1935%2c1.147-3.97241.27539-3.97241-.15522-3.97241-.84174-1.21131-.42539-2.7611-1.0127-3.97241-1.94378-1.91622-1.01593-2.05619-1.14439-3.97241-1.97234-1.78522-.85568-2.18719-1.19495-3.97241-2.02971-2.03155-.74775-1.94085-.86744-3.97241-1.20473-3.97241-.89955-3.97241-.00758-3.97241%2c1.49429-3.09538%2c1.485-.877.66533-3.83621%2c3.30708-.1362.55429-.6228%2c3.41812.6228%2c3.58486.08635.38755%2c1.95131%2c3.97241%2c1.93475%2c2.82884.541%2c1.14357%2c1.65906%2c3.97241.40507%2c3.97241.79587%2c3.97241-.15826%2c3.97241-3.24278%2c1.485-3.97241.21388L95.46%2c64.51136l-.39164.4192-3.58077%2c3.79453-.12328.17788-1.74861%2c3.9724-1.88825%2c3.97241-.21227%2c2.05978-.17446%2c1.91263.17446%2c3.44274.04318.52967%2c2.458%2c3.97241%2c1.47126%2c1.11585%2c3.97241.01375%2c1.64376-1.1296%2c2.32865-1.796%2c1.779-2.17638%2c2.19346-3.45545.34942-.517%2c1.9286-3.97241.85317-3.97241.84122-1.93252%2c3.97241-1.02132%2c3.97241.87139%2c2.71676%2c2.08245%2c1.25565%2c1.109%2c1.9451%2c2.86336%2c1.19647%2c3.97241-.08588%2c3.97241-.2116%2c3.97241-.477%2c3.97241.34561%2c3.97241%2c1.25177%2c3.97241.008.013%2c3.522%2c3.95942.45036.36712%2c3.97241%2c1.77578%2c3.97241.30357%2c3.97241-.93022%2c2.728-1.51625%2c1.24436-.94754%2c3.97241-2.92521.16751-.09966%2c3.8049-2.871%2c3.97241-.55406%2c3.97241%2c1.13866%2c3.97241%2c1.84154%2c1.42345.44483%2c2.549.8665%2c3.97241.95138%2c3.97241.85865%2c3.97241%2c1.14093.66207.15495L182.853%2c105.695l3.97241.72057%2c3.97241.29682%2c3.97241-.27563%2c3.97241-.52986%2c3.97241-.49721%2c3.97241-.39524ZM250.384%2c58.32l-3.97241.73949-3.97241.25819-3.97241-.49739-3.97241-1.55819-.5341-.27634-.20152-3.97241.73562-.59886%2c3.97241-3.28527.13242-.08828%2c3.84-1.23871%2c3.97241-1.631%2c2.59614-1.10271%2c1.37627-.7375%2c3.97241-.6253%2c1.58224%2c1.3628%2c1.49881%2c3.97241-1.52163%2c3.97241-1.55942%2c2.71495-1.32413%2c1.25746ZM198.74266%2c69.44343l-3.97241.69162L192.0274%2c68.903l-1.22956-1.94873-.50591-2.02368.50591-1.32414%2c3.97241-.38621%2c3.62191%2c1.71035.3505.91671L199.34%2c68.903Z'/%3e %3cpath class='cls-9' d='M96.22109%2c80.82019l2.61806-3.97241L95.46%2c73.6747l-2.00149%2c3.17308%2c1.11633%2c3.97241.88516.81435Zm124.34632%2c19.862%2c2.00971-.6232%2c3.97241-1.31277%2c3.97241-1.54823.94465-.48821%2c3.02775-1.74842%2c3.076-2.224.89637-.67173L242.0651%2c88.765l.37406-.344%2c3.70066-3.62846.27175-.30429%2c3.06246-3.66812.91-1.29136%2c2.85038-2.681%2c1.122-1.49429%2c3.97241-1.76371%2c3.97241-.45306%2c1.73793-.26135%2c2.23448-.36185%2c3.97241-.32066%2c3.97241.2742%2c3.97241-.25988%2c3.97241-.20313%2c3.97241.07387%2c3.9724-.56572%2c3.97241-1.4549%2c1.85131-1.15433%2c2.1211-1.81322%2c1.72514-2.15919%2c1.57539-3.97241-.46806-3.97241-2.53215-3.97241-.30032-.342-3.44312-3.63037-.52929-.48482L290.114%2c45.06851l-.00594-.00519-3.9724-3.67945-.36836-.28777-3.60405-3.578-.75862-.39437-3.21379-1.54778-3.97241-1.09313-3.97241.72232-2.533%2c1.91859-1.43943%2c1.85667-1.39034%2c2.11574-1.60676%2c3.97241-.77922%2c3.97241-.19609.5131-1.53748%2c3.45931-1.78093%2c3.97241-.654%2c1.12505L255.876%2c60.95815l-1.51957%2c1.31379-3.97241.60991-3.97241-.05209-3.97241.02071-3.97241-.27884-3.97241-.5296-3.9724-.38162-3.02515-.70226-.94726-.72438-1.36675-3.248%2c1.16328-3.97241.20347-.22546%2c3.97241-3.22175.63884-.5252%2c3.33356-1.55325%2c3.97241-1.59711%2c2.33415-.822%2c1.63826-.56821%2c3.97241-2.18608L248.236%2c41.0961l2.148-2.85965.98254-1.11276-.082-3.97241-.90053-1.2214-1.50526-2.751-2.46715-1.81609-3.97241-2.03607-.8597-.12025-3.11271-.34816-3.97241.15154-1.24666.19662-2.72574.5024-3.97241%2c1.399-3.97241%2c1.4556-2.88.61538-1.09242.30345-3.97241.959-3.97241%2c1.33359-3.97241%2c1.16638-.66207.21-3.31034%2c1.1863L198.74266%2c35.626l-3.97241.92-3.15665.57769-.81576.18956-3.97241.65038-3.97241.60976-3.9724%2c1.57891-2.89295.9438-1.07946.39724-3.97241.79-3.97241.07392-3.97241-.03508-3.97241-.7118L156.5%2c41.0961l-1.45381-.276L151.07375%2c39.504l-3.97241-1.53938-1.72356-.84094-2.24885-1.17289-3.97241-2.15513-1.34442-.64439-2.628-1.34586-3.97241-1.88716-1.6996-.73939-2.27281-1.13831-3.9724-1.29385-3.97241-.77421-3.97241-.55425-3.97241.43373-3.97241%2c2.60848-.90768.71841-1.20032%2c3.97241.31056%2c3.97241.99281%2c3.97241.80463%2c1.736.73965%2c2.23643%2c1.24655%2c3.97241.59532%2c3.97241%2c1.15383%2c3.97241.23706.639%2c1.35935%2c3.33337%2c2.61306%2c3.818.09579.15437%2c3.43619%2c3.97241.44043.35794%2c3.11858%2c3.61446.85383%2c1.19172%2c1.7757%2c2.78069.9437%2c3.97241-.36786%2c3.97241-.48705%2c3.97241-.77044%2c3.97241.30991%2c3.97241%2c1.70509%2c3.97241.86335.95448%2c3.97241%2c2.42107%2c3.97241.42563%2c3.97241-1.29257%2c3.14807-2.50861.82434-1.16782%2c2.39444-2.80459%2c1.578-3.533.38493-.43942%2c3.58748-3.95543%2c3.97241%2c1.27782%2c2.83933%2c2.67761%2c1.13308.75707%2c3.43071%2c3.21534.5417.29483%2c3.97241%2c1.55626%2c3.97241.81025%2c3.97241.46774%2c3.97241.40136%2c3.9724.07539%2c3.97241-.017%2c1.6864.3836%2c2.286.5314%2c3.97241%2c1.04569%2c3.97241.52682%2c3.97241.171%2c3.97241-.00541%2c3.97241-.28626%2c3.97241-.60164%2c3.97241-.8744Zm-17.85234-25.905-3.97241%2c1.16846-3.97241-.25592-3.97241-1.95494-.75755-.85949-3.21486-3.843-.08214-.12936-1.34859-3.97241L184.68%2c60.95815l1.49156-3.97241.65384-.67916%2c3.97241-.382%2c3.46845%2c1.06113.504.14127%2c3.97241%2c1.60087%2c3.20941%2c2.23027.763.699%2c2.30681%2c3.27336.82558%2c3.97241-1.35618%2c3.9724Z'/%3e %3cpath class='cls-10' d='M216.72684%2c60.95815l1.26357-3.97241.6143-.91672%2c1.18226-3.05569%2c2.79015-3.32443.56748-.648%2c3.40493-2.17537%2c3.97241-1.29744%2c1.25283-.4996%2c2.71957-.9848%2c3.97241-1.325%2c3.97241-1.40116.4358-.26148%2c3.53661-3.47792.40262-.49449.46147-3.97241-.86409-1.52948-1.711-2.44293-2.26146-1.26055-3.97241-.65033-3.97241.15145-3.9724.72349-2.79541%2c1.03594-1.177.65045-3.97241%2c1.97594-3.97241%2c1.12533-.87306.22069-3.09935%2c1.18009-3.97241%2c1.728-3.52552%2c1.0643-.44689.1824L202.71507%2c39.047l-3.97241%2c1.15415-3.65205.895-.32036.1564L190.79784%2c44.149l-1.07946.91954.81464%2c3.97241.26482.12651%2c3.97241%2c2.24725%2c3.40493%2c1.59865.56748.19862%2c3.97241%2c2.04279%2c1.84434%2c1.731%2c2.12807%2c2.44874%2c2.26995%2c1.52367%2c1.70246%2c1.53065%2c3.97241.45555ZM286.89231%2c68.903l3.21576-.39608%2c3.97241-1.84507%2c1.99991-1.73126%2c1.9725-3.40492.2354-.56749-.2354-1.83343-.34329-2.139-3.06507-3.97241-.564-.5965-3.48734-3.37591-.48507-.42114-3.80181-3.55127-.17059-.158-3.97241-3.0174-2.12086-.797-1.85155-.87045-3.97241-.6446-3.16252%2c1.51505-.80989.4485-2.45488%2c3.52391-1.32172%2c3.97241-.19581.59163-1.10345%2c3.38078-1.0679%2c3.97241-.99089%2c3.97241L264.56%2c64.93056l1.71359.79448%2c3.97241.81856%2c3.97241%2c1.35253%2c3.97241.37184%2c3.97241.304%2c3.0377.331.93471.07925Zm-75.40483%2c31.77927%2c3.14482-.55294%2c3.97241-1.08613%2c3.97241-1.26188%2c2.9793-1.07146.99311-.47245%2c3.97241-1.85779%2c2.81052-1.64217%2c1.16188-.73124%2c3.97241-2.96088.30558-.28029%2c3.66683-3.3717.61266-.60071%2c3.35975-3.76217.17553-.21024%2c2.65284-3.97241%2c1.144-2.82249.7838-1.14992.8633-3.9724L250.384%2c67.965l-3.97241-1.57225-3.97241-.44927-3.97241-.35546-3.97241-.1789-3.9724.45742-3.97241%2c1.05018-3.97241-.40261-3.97241-.127L216.24609%2c68.903l-1.61379%2c1.16048-2.5279%2c2.81192-1.44451.7901-3.97241%2c3.16118-.01956.02113-3.95285%2c2.83544-3.97241.8779-3.97241-.03575-3.97241-1.99495-1.21937-1.68264-2.753-3.11812-.5648-.85429L183.7229%2c68.903l-.86988-2.03135-1.2795-1.94106-2.405-3.97241-.28785-.85124-1.27768-3.12117-2.2975-3.97241-.39723-.34377-3.97241-2.9085-1.00938-.72014-2.963-1.61379L162.991%2c45.9292l-1.55547-.86069-2.41694-.84466-3.97241-1.25957L151.07375%2c41.43l-.694-.33391-3.27844-1.463-3.97241-1.99236-1.00722-.51709-2.96519-1.67064-3.97241-1.90347-.931-.3983-3.04138-1.42079-3.97241-1.61616-3.66286-.93546-.30954-.08994-3.97241-.2495-3.97241.15628-.67616.18316-3.29625%2c2.64827-.64822%2c1.32414-.51444%2c3.97241.1239%2c3.97241%2c1.03876%2c3.97241h0l.956%2c3.97241.64338%2c3.97241%2c1.34982%2c3.97241%2c1.0232%2c1.76937%2c1.23348%2c2.203%2c2.73893%2c3.84955.07623.12286%2c2.87734%2c3.97241%2c1.01884%2c1.15328%2c2.33331%2c2.81912%2c1.63909%2c2.42047%2c1.4579%2c1.55194%2c1.32138%2c3.97241-.6339%2c3.97241-.82582%2c3.97241-1.23533%2c3.97241.48535%2c3.97241%2c3.02148%2c3.97241.38135.24075%2c3.97241.50286%2c2.06784-.74361%2c1.90457-1.209%2c1.98621-2.76341%2c1.32852-3.97241.65768-3.54679.10592-.42562L145.448%2c84.7926l1.65337-1.7088%2c3.97241-.76676%2c3.97241%2c1.59488.86437.88068%2c3.108%2c2.85675.81931%2c1.11566%2c3.09511%2c3.97241.058.05517%2c3.97241%2c2.73326%2c3.97241%2c1.1148.81786.06918%2c3.15455.24885%2c3.97241-.0465%2c1.23731-.20235%2c2.73509-.49655%2c3.97241-.97685%2c3.97241.13161%2c2.76975%2c1.34179%2c1.20266.58%2c3.97241%2c2.01677%2c3.97241%2c1.187%2c1.27417.18863%2c2.69824.23444%2c3.97241-.11515Z'/%3e %3cpath class='cls-11' d='M232.08252%2c41.0961l2.41182-.70936%2c3.97241-1.34753%2c3.95781-1.91552.0146-.03894.68937-3.93347-.68937-.95074-3.97241-1.83327-3.97241.08481-3.9724%2c1.0049-3.31448%2c1.6943-.65793.816-3.77011%2c3.15637%2c1.86666%2c3.97241%2c1.90345.21754%2c3.97241.14782Zm57.40132%2c23.83446.62423-.10115%2c3.97241-3.36171.31095-.50955-.31095-2.37376-.30628-1.59865-3.66613-3.75384-.24169-.21857-3.73071-3.77061-.2207-.2018L282.16326%2c46.164l-2.87418-1.09553-1.09823-.33221-3.97241.25614-.11759.07607-2.94225%2c3.97241-.91257%2c2.91081-.24828%2c1.0616-.11553%2c3.97241.36381.93025%2c1.613%2c3.04216%2c2.35944%2c1.47095%2c3.97241%2c1.23351%2c3.97241.88515%2c1.87979.3828%2c2.09262.35085ZM137.10241%2c92.73742%2c135.5695%2c88.765l-.38539-.99311-.20492.99311-2.23465%2c3.97241%2c2.43957%2c3.34986Zm81.8019%2c3.97241%2c3.67281-1.656%2c3.97241-1.8295%2c1.09025-.48691%2c2.88216-1.48548%2c3.9724-2.33376.20593-.15317%2c3.76648-2.88025%2c1.19283-1.09216%2c2.77958-3.10965.76056-.86276%2c2.5886-3.97241.62325-3.06346.19018-.90895-.19018-.4469-3.97241-3.27064L241.553%2c68.903l-3.08626-.46117-3.97241-.04137-2.10656.50254-1.86584.59015-3.97241%2c2.37747-2.669%2c1.00478-1.30344.61641-3.97241%2c2.50477-1.562.85123-2.41044.96606-3.97241%2c1.53537-2.815%2c1.471-1.15743.47319-3.97241%2c2.2001-3.97241%2c1.175-.61866.12414-3.35375%2c2.22369-3.97241.62607-.36014-2.84976L188.2%2c80.82019%2c186.82543%2c78.813l-.91709-1.96519L183.319%2c72.87537l-.466-.72292L179.92633%2c68.903l-1.04571-1.49672-2.00912-2.47569L174.90821%2c62.258l-1.07947-1.29987L170.9358%2c57.021l-.027-.03526-3.73811-3.97241-.20734-.16337L162.991%2c50.13263l-1.17058-1.09171-2.80183-1.85613-3.97241-2.11228-.00621-.004-3.9662-1.8394-3.97241-1.93018-.34679-.20283L143.12893%2c39.151l-3.94887-2.02728-.02354-.01326-3.97241-1.90125-3.97241-1.66929-1.24137-.38861-2.731-.97828-3.9724-.50723-3.97241.82946-1.48286.65605-2.48955%2c2.61493-.68366%2c1.35748L113.641%2c41.0961l.43095%2c3.97241.80916%2c3.97241.44093%2c2.2852.28738%2c1.68721%2c1.375%2c3.97241%2c2.31%2c3.5973.21368.37511%2c2.50941%2c3.97241%2c1.24932%2c1.62307%2c1.85177%2c2.34934%2c2.12063%2c2.50969%2c1.69991%2c1.46271%2c2.2725%2c2.40236%2c2.04366%2c1.57%2c1.92875%2c3.15377%2c2.24368.81864%2c1.72873%2c1.72873%2c1.0147-1.72873%2c2.95771-.95813%2c3.97241-1.748%2c3.97241-.37841%2c3.97241.81349%2c2.95924%2c2.271%2c1.01317%2c1.03406L160.778%2c84.7926l2.213%2c3.00008.74008.97233%2c3.23233%2c3.21187%2c1.68063.76054%2c2.29178.81523%2c3.97241.37063%2c3.97241-.27356%2c3.27911-.9123.69329-.2363%2c3.97241-2.05358%2c3.97241-1.53064%2c3.97241%2c1.24709%2c1.885%2c2.57343%2c2.08741%2c1.5606%2c3.24668%2c2.41181.72573.31624%2c3.97241%2c1.16553%2c3.97241.19433%2c3.97241-.53021%2c3.97241-1.04926Z'/%3e %3cpath class='cls-12' d='M286.2692%2c56.98574l-.13353-.11432-3.97241-1.47466-2.45912%2c1.589%2c2.45912%2c1.14759%2c3.97241-.72944ZM182.28554%2c88.765l.56748-.54791%2c1.82557-3.4245-.24764-3.97241L182.853%2c76.87537l-.0151-.02759-3.61247-3.97241-.34483-.38492L175.47778%2c68.903l-.56957-.69473-3.35286-3.27768-.61955-.75454-2.69159-3.21787-1.28082-1.692-1.72632-2.28045-2.24609-2.099-1.312-1.87345L159.01857%2c50.499l-1.6274-1.45808-2.345-1.46563-3.88552-2.50678-.08689-.0403-3.97241-2.08289-3.16171-1.84922-.8107-.43494-3.97241-2.08529-3.43979-1.45218-.53262-.25491L131.2117%2c35.339l-3.97241-1.04477-3.9724.09727-3.97241%2c2.584-.14445.14822-2.38169%2c3.97241-.12992%2c3.97241.53078%2c3.97241.71384%2c3.97241%2c1.41144%2c3.60115.123.37126%2c2.28008%2c3.97241%2c1.56935%2c2.28745%2c1.27519%2c1.685%2c2.69721%2c3.32463.74621.64778%2c3.2262%2c2.80742%2c1.654%2c1.165%2c2.31837%2c1.856%2c3.97241%2c1.42963%2c3.97241-.12782%2c3.97241-.97881%2c3.97241-.42856%2c3.97241-.02568%2c3.97241.87905%2c1.75128%2c1.36864%2c1.8751%2c3.97241.346.63255%2c1.56059%2c3.33986%2c2.41182%2c3.10487%2c1.21734.86754%2c2.75507%2c1.42741%2c3.97241.472%2c3.97241-.51767Zm38.16069%2c3.97241%2c2.13089-1.44939%2c3.97241-2.24128.72888-.28174%2c3.24353-1.43135%2c3.9724-2.0592.66208-.48186%2c3.31033-3.12009.744-.85232%2c2.00058-3.97241-1.61765-3.97241-1.12693-.52614-3.97241-.29741-2.36951.82355-1.60289.90015-3.23145%2c3.07226-.741.97284-3.97241%2c1.9444-2.13256%2c1.05517-1.83985.80547-3.97241.845-3.97241.98137-3.54913%2c1.34053-.42328.28219L203.01731%2c88.765l.95456%2c3.97241%2c2.71561%2c1.78685%2c3.97241.90456%2c3.97241-.51936%2c3.97241-1.41847Z'/%3e %3cpath class='cls-13' d='M145.30349%2c72.87537l1.79785-.42648%2c3.97241-.65484%2c3.97241-.73217%2c3.97241-1.03826L161.6455%2c68.903l.56747-3.97241-.02278-3.97241-1.36033-3.97241-1.81129-2.51013-1.00113-1.46228-2.97128-2.70846-1.309-1.264-2.66343-1.8396-3.06458-2.13281-.90783-.4768L143.12893%2c42.244%2c141.156%2c41.0961l-1.99951-1.05634-3.97241-1.62369-3.97241-1.27864-.10345-.01374-3.869-.65161-3.2869.65161-.6855.18576-3.52463%2c3.78665-.44778%2c2.53932-.222%2c1.43309.222%2c2.63288.0882%2c1.33953.6186%2c3.97241%2c1.33782%2c3.97241%2c1.92779%2c3.09788.60823.87453%2c3.08209%2c3.97241.28208.3477%2c3.97241%2c3.461.22543.16368%2c3.747%2c2.72052%2c3.07156%2c1.25188.90085.38518%2c3.97241.14812ZM178.93288%2c84.7926l1.10289-3.97241-1.15515-2.30069-1.09621-1.67172-2.8762-2.82981-1.6867-1.1426L170.9358%2c70.993l-3.97241-1.46937-1.07256%2c3.35172.23745%2c3.97241.334%2c3.97241.50108%2c1.099L169.22%2c84.7926l1.71584%2c1.23205%2c3.97241.474%2c3.97241-1.65507Z'/%3e %3cpath class='cls-14' d='M151.28441%2c68.903l3.76175-2.113%2c1.762-1.85942L158.31%2c60.95815l-.83968-3.97241-2.42419-3.46313-.33026-.50928-3.64215-3.525-.46017-.44746-3.51224-2.49275-1.9297-1.47966-2.04271-1.21236-3.97241-2.284-1.07-.476L135.18411%2c39.943l-3.97241-1.08857-3.97241-.23079-3.9724%2c1.66276-.7537.80972-1.2601%2c3.97241.03064%2c3.97241.58148%2c3.97241%2c1.39552%2c3.97241.00616.00988%2c2.75594%2c3.96253%2c1.21646%2c1.55213%2c2.78271%2c2.42028%2c1.1897%2c1.044%2c3.97241%2c2.88572.08988.04272%2c3.88253%2c1.76188%2c3.97241.24406%2c3.97241-.99863%2c3.97241-.944Z'/%3e %3cpath class='cls-15' d='M151.652%2c64.93056l3.02061-3.97241-.35181-3.97241-2.55354-3.97241-.69352-.6712-3.39486-3.30121-.57755-.40991-3.97241-3.028-.762-.53448L139.15652%2c43.282l-3.97241-1.70508-1.76679-.48084-2.20562-.52471-3.97241.19254-.698.33217-3.08185%2c3.97241-.19251%2c2.39514-.08213%2c1.57727.08213.5893.52716%2c3.38311%2c1.49474%2c3.97241%2c1.9505%2c2.73786%2c1.246%2c1.23455L131.2117%2c63.357l2.25917%2c1.5736%2c1.71324%2c1.26006%2c3.97241%2c1.9019%2c3.97241.29745%2c3.97241-1.30007%2c3.97241-1.75626Z'/%3e %3cpath class='cls-16' d='M145.045%2c64.93056l2.0563-.98749%2c3.84241-2.98492.13-1.19171.20447-2.7807-.20447-.32085-2.327-3.65156-1.64543-1.59842-2.28164-2.374-1.69077-1.28276-3.83475-2.68965-.13766-.07661-3.97241-1.45076-3.97241-.72788-3.97241%2c1.24532-.84518%2c1.00993-.882%2c3.97241.40753%2c3.97241%2c1.3196%2c3.741.10984.2314%2c3.86257%2c3.8273.1853.14511%2c3.78711%2c2.64019%2c2.86222%2c1.33222%2c1.11019.53749%2c3.97241.18157Z'/%3e %3cpath class='cls-17' d='M146.30514%2c60.95815l.7962-1.5654.78245-2.407-.78245-1.32106-1.47679-2.65135-2.49562-2.6106-1.52275-1.36181-2.44966-1.61033-3.97241-1.64684-3.97241-.28852-2.91863%2c3.54569.1689%2c3.97241%2c1.74748%2c3.97241%2c1.00225.9931%2c3.80448%2c2.97931.16793.11707%2c3.97241%2c1.74154%2c3.97241-.08726Z'/%3e %3c/g%3e %3c/g%3e %3ccircle cx='38.18089' cy='22.8132' r='0.9931'/%3e %3ccircle cx='52.25586' cy='24.61986' r='0.9931'/%3e %3ccircle cx='60.15102' cy='84.1939' r='0.9931'/%3e %3ccircle cx='65.27969' cy='32.28887' r='0.9931'/%3e %3ccircle cx='74.2095' cy='112.45883' r='0.9931'/%3e %3ccircle cx='77.35435' cy='91.68731' r='0.9931'/%3e %3ccircle cx='86.14471' cy='75.11478' r='0.9931'/%3e %3ccircle cx='86.19557' cy='84.50099' r='0.9931'/%3e %3ccircle cx='86.94219' cy='109.97293' r='0.9931'/%3e %3ccircle cx='88.43286' cy='25.6804' r='0.9931'/%3e %3ccircle cx='89.89499' cy='67.7429' r='0.9931'/%3e %3ccircle cx='91.4689' cy='43.60803' r='0.9931'/%3e %3ccircle cx='91.9551' cy='27.06827' r='0.9931'/%3e %3ccircle cx='92.09832' cy='89.22466' r='0.9931'/%3e %3ccircle cx='92.5046' cy='95.54871' r='0.9931'/%3e %3ccircle cx='93.70207' cy='68.448' r='0.9931'/%3e %3ccircle cx='96.4004' cy='59.43294' r='0.9931'/%3e %3ccircle cx='99.85806' cy='83.28565' r='0.9931'/%3e %3ccircle cx='101.93814' cy='36.24864' r='0.9931'/%3e %3ccircle cx='102.65901' cy='39.32426' r='0.9931'/%3e %3ccircle cx='102.76997' cy='76.06515' r='0.9931'/%3e %3ccircle cx='103.18911' cy='61.27976' r='0.9931'/%3e %3ccircle cx='104.73486' cy='34.02334' r='0.9931'/%3e %3ccircle cx='106.46707' cy='92.58216' r='0.9931'/%3e %3ccircle cx='107.87419' cy='23.17589' r='0.9931'/%3e %3ccircle cx='112.3566' cy='74.74978' r='0.9931'/%3e %3ccircle cx='112.75267' cy='20.91379' r='0.9931'/%3e %3ccircle cx='113.52484' cy='46.98448' r='0.9931'/%3e %3ccircle cx='118.07262' cy='25.15226' r='0.9931'/%3e %3ccircle cx='118.72996' cy='61.08147' r='0.9931'/%3e %3ccircle cx='119.07343' cy='26.64484' r='0.9931'/%3e %3ccircle cx='120.49252' cy='58.10851' r='0.9931'/%3e %3ccircle cx='122.76485' cy='37.90155' r='0.9931'/%3e %3ccircle cx='122.9646' cy='47.05883' r='0.9931'/%3e %3ccircle cx='123.26346' cy='50.23662' r='0.9931'/%3e %3ccircle cx='123.87099' cy='37.26342' r='0.9931'/%3e %3ccircle cx='125.33568' cy='77.20316' r='0.9931'/%3e %3ccircle cx='125.47181' cy='98.77111' r='0.9931'/%3e %3ccircle cx='129.32038' cy='100.873' r='0.9931'/%3e %3ccircle cx='130.08977' cy='90.95205' r='0.9931'/%3e %3ccircle cx='130.30451' cy='67.76746' r='0.9931'/%3e %3ccircle cx='130.43034' cy='40.07523' r='0.9931'/%3e %3ccircle cx='131.14653' cy='63.41513' r='0.9931'/%3e %3ccircle cx='131.52809' cy='43.96809' r='0.9931'/%3e %3ccircle cx='131.53907' cy='50.70142' r='0.9931'/%3e %3ccircle cx='132.47602' cy='55.61116' r='0.9931'/%3e %3ccircle cx='132.97203' cy='90.82994' r='0.9931'/%3e %3ccircle cx='133.0027' cy='33.83347' r='0.9931'/%3e %3ccircle cx='133.12332' cy='102.08097' r='0.9931'/%3e %3ccircle cx='133.91647' cy='106.73506' r='0.9931'/%3e %3ccircle cx='134.5593' cy='65.13652' r='0.9931'/%3e %3ccircle cx='135.34789' cy='41.50554' r='0.9931'/%3e %3ccircle cx='135.58979' cy='62.44736' r='0.9931'/%3e %3ccircle cx='135.85969' cy='87.38032' r='0.9931'/%3e %3ccircle cx='136.04817' cy='50.74019' r='0.9931'/%3e %3ccircle cx='136.91503' cy='81.19321' r='0.9931'/%3e %3ccircle cx='139.48931' cy='97.8843' r='0.9931'/%3e %3ccircle cx='140.02556' cy='51.72618' r='0.9931'/%3e %3ccircle cx='140.72526' cy='49.56914' r='0.9931'/%3e %3ccircle cx='141.17325' cy='48.20778' r='0.9931'/%3e %3ccircle cx='143.62606' cy='52.86419' r='0.9931'/%3e %3ccircle cx='144.54101' cy='77.94635' r='0.9931'/%3e %3ccircle cx='145.20448' cy='62.53546' r='0.9931'/%3e %3ccircle cx='146.05155' cy='83.63808' r='0.9931'/%3e %3ccircle cx='146.44984' cy='64.16139' r='0.9931'/%3e %3ccircle cx='148.35143' cy='63.15197' r='0.9931'/%3e %3ccircle cx='149.85251' cy='63.75145' r='0.9931'/%3e %3ccircle cx='151.05481' cy='43.44292' r='0.9931'/%3e %3ccircle cx='151.89107' cy='70.28554' r='0.9931'/%3e %3ccircle cx='152.29309' cy='51.87091' r='0.9931'/%3e %3ccircle cx='153.65623' cy='106.07278' r='0.9931'/%3e %3ccircle cx='153.82791' cy='58.04902' r='0.9931'/%3e %3ccircle cx='153.87256' cy='13.8911' r='0.9931'/%3e %3ccircle cx='156.92424' cy='101.86469' r='0.9931'/%3e %3ccircle cx='159.13178' cy='88.17874' r='0.9931'/%3e %3ccircle cx='160.48031' cy='62.55904' r='0.9931'/%3e %3ccircle cx='160.72393' cy='41.05825' r='0.9931'/%3e %3ccircle cx='164.63173' cy='78.55137' r='0.9931'/%3e %3ccircle cx='164.70215' cy='122.06457' r='0.9931'/%3e %3ccircle cx='165.32121' cy='78.22372' r='0.9931'/%3e %3ccircle cx='165.9529' cy='53.13856' r='0.9931'/%3e %3ccircle cx='166.16687' cy='53.69688' r='0.9931'/%3e %3ccircle cx='167.90744' cy='68.46841' r='0.9931'/%3e %3ccircle cx='168.09699' cy='36.62369' r='0.9931'/%3e %3ccircle cx='168.68731' cy='88.62242' r='0.9931'/%3e %3ccircle cx='168.73814' cy='25.85086' r='0.9931'/%3e %3ccircle cx='169.64935' cy='87.97181' r='0.9931'/%3e %3ccircle cx='172.00598' cy='90.03507' r='0.9931'/%3e %3ccircle cx='173.25885' cy='25.26018' r='0.9931'/%3e %3ccircle cx='173.56715' cy='74.8266' r='0.9931'/%3e %3ccircle cx='173.62273' cy='50.62623' r='0.9931'/%3e %3ccircle cx='173.78839' cy='78.86548' r='0.9931'/%3e %3ccircle cx='174.43254' cy='59.89589' r='0.9931'/%3e %3ccircle cx='174.61846' cy='69.8568' r='0.9931'/%3e %3ccircle cx='175.89173' cy='104.18086' r='0.9931'/%3e %3ccircle cx='176.44052' cy='95.30617' r='0.9931'/%3e %3ccircle cx='177.80456' cy='85.37491' r='0.9931'/%3e %3ccircle cx='178.1422' cy='72.84292' r='0.9931'/%3e %3ccircle cx='178.8606' cy='32.52189' r='0.9931'/%3e %3ccircle cx='180.74432' cy='15.42438' r='0.9931'/%3e %3ccircle cx='181.73845' cy='118.98539' r='0.9931'/%3e %3ccircle cx='185.34433' cy='113.91707' r='0.9931'/%3e %3ccircle cx='185.65437' cy='55.88621' r='0.9931'/%3e %3ccircle cx='186.5971' cy='45.28672' r='0.9931'/%3e %3ccircle cx='187.41826' cy='85.28533' r='0.9931'/%3e %3ccircle cx='187.64315' cy='13.87477' r='0.9931'/%3e %3ccircle cx='188.63396' cy='93.60942' r='0.9931'/%3e %3ccircle cx='188.63624' cy='42.5448' r='0.9931'/%3e %3ccircle cx='190.07166' cy='82.01256' r='0.9931'/%3e %3ccircle cx='190.58456' cy='1.37201' r='0.9931'/%3e %3ccircle cx='191.39804' cy='114.53631' r='0.9931'/%3e %3ccircle cx='192.0982' cy='79.6504' r='0.9931'/%3e %3ccircle cx='192.34119' cy='50.32086' r='0.9931'/%3e %3ccircle cx='195.20534' cy='38.40848' r='0.9931'/%3e %3ccircle cx='195.75423' cy='107.91547' r='0.9931'/%3e %3ccircle cx='196.46208' cy='17.90103' r='0.9931'/%3e %3ccircle cx='199.87387' cy='49.20781' r='0.9931'/%3e %3ccircle cx='200.4733' cy='91.23637' r='0.9931'/%3e %3ccircle cx='203.27468' cy='92.70239' r='0.9931'/%3e %3ccircle cx='203.64859' cy='63.79395' r='0.9931'/%3e %3ccircle cx='204.25384' cy='43.60966' r='0.9931'/%3e %3ccircle cx='205.18396' cy='86.75995' r='0.9931'/%3e %3ccircle cx='205.6464' cy='38.92268' r='0.9931'/%3e %3ccircle cx='205.66753' cy='95.59415' r='0.9931'/%3e %3ccircle cx='206.03642' cy='94.55009' r='0.9931'/%3e %3ccircle cx='206.66167' cy='51.29419' r='0.9931'/%3e %3ccircle cx='209.01803' cy='94.46355' r='0.9931'/%3e %3ccircle cx='209.68115' cy='16.39382' r='0.9931'/%3e %3ccircle cx='209.87916' cy='61.37972' r='0.9931'/%3e %3ccircle cx='210.0274' cy='31.00561' r='0.9931'/%3e %3ccircle cx='213.15013' cy='98.90674' r='0.9931'/%3e %3ccircle cx='213.29565' cy='71.73208' r='0.9931'/%3e %3ccircle cx='213.82258' cy='81.93446' r='0.9931'/%3e %3ccircle cx='215.06667' cy='36.81449' r='0.9931'/%3e %3ccircle cx='215.0993' cy='57.89118' r='0.9931'/%3e %3ccircle cx='215.65366' cy='68.0232' r='0.9931'/%3e %3ccircle cx='216.04405' cy='42.36954' r='0.9931'/%3e %3ccircle cx='217.69503' cy='60.82093' r='0.9931'/%3e %3ccircle cx='218.90396' cy='88.02485' r='0.9931'/%3e %3ccircle cx='220.00937' cy='91.41524' r='0.9931'/%3e %3ccircle cx='220.66663' cy='34.05206' r='0.9931'/%3e %3ccircle cx='222.6152' cy='39.77462' r='0.9931'/%3e %3ccircle cx='224.29363' cy='90.74323' r='0.9931'/%3e %3ccircle cx='226.38138' cy='52.33777' r='0.9931'/%3e %3ccircle cx='226.7197' cy='91.14194' r='0.9931'/%3e %3ccircle cx='228.55823' cy='36.20612' r='0.9931'/%3e %3ccircle cx='230.93308' cy='81.90603' r='0.9931'/%3e %3ccircle cx='232.5965' cy='99.59966' r='0.9931'/%3e %3ccircle cx='233.57916' cy='33.69144' r='0.9931'/%3e %3ccircle cx='233.79124' cy='73.64263' r='0.9931'/%3e %3ccircle cx='235.57726' cy='29.65945' r='0.9931'/%3e %3ccircle cx='236.16849' cy='44.66779' r='0.9931'/%3e %3ccircle cx='236.67777' cy='36.30567' r='0.9931'/%3e %3ccircle cx='236.97422' cy='85.94241' r='0.9931'/%3e %3ccircle cx='237.80063' cy='81.8687' r='0.9931'/%3e %3ccircle cx='237.99369' cy='73.57564' r='0.9931'/%3e %3ccircle cx='238.48185' cy='24.4579' r='0.9931'/%3e %3ccircle cx='239.76137' cy='92.67165' r='0.9931'/%3e %3ccircle cx='239.78519' cy='63.9526' r='0.9931'/%3e %3ccircle cx='239.94992' cy='78.46231' r='0.9931'/%3e %3ccircle cx='240.15348' cy='68.19464' r='0.9931'/%3e %3ccircle cx='241.84543' cy='75.95655' r='0.9931'/%3e %3ccircle cx='243.11216' cy='29.82888' r='0.9931'/%3e %3ccircle cx='243.14762' cy='112.22214' r='0.9931'/%3e %3ccircle cx='247.62172' cy='32.59968' r='0.9931'/%3e %3ccircle cx='248.85987' cy='37.67702' r='0.9931'/%3e %3ccircle cx='249.81909' cy='37.19037' r='0.9931'/%3e %3ccircle cx='253.61967' cy='61.07196' r='0.9931'/%3e %3ccircle cx='257.8257' cy='62.86431' r='0.9931'/%3e %3ccircle cx='258.96973' cy='71.63517' r='0.9931'/%3e %3ccircle cx='259.44137' cy='67.2132' r='0.9931'/%3e %3ccircle cx='261.92849' cy='108.63085' r='0.9931'/%3e %3ccircle cx='264.97542' cy='34.56487' r='0.9931'/%3e %3ccircle cx='266.33051' cy='39.16219' r='0.9931'/%3e %3ccircle cx='266.3956' cy='76.44448' r='0.9931'/%3e %3ccircle cx='266.69777' cy='15.71306' r='0.9931'/%3e %3ccircle cx='267.87026' cy='61.44244' r='0.9931'/%3e %3ccircle cx='268.89054' cy='51.94134' r='0.9931'/%3e %3ccircle cx='270.25994' cy='91.77431' r='0.9931'/%3e %3ccircle cx='271.97183' cy='77.53072' r='0.9931'/%3e %3ccircle cx='273.67973' cy='54.92682' r='0.9931'/%3e %3ccircle cx='274.91214' cy='29.74608' r='0.9931'/%3e %3ccircle cx='276.11854' cy='50.54379' r='0.9931'/%3e %3ccircle cx='276.35978' cy='27.53719' r='0.9931'/%3e %3ccircle cx='277.61041' cy='88.22951' r='0.9931'/%3e %3ccircle cx='279.33015' cy='54.95093' r='0.9931'/%3e %3ccircle cx='279.55045' cy='40.45763' r='0.9931'/%3e %3ccircle cx='281.12509' cy='70.05012' r='0.9931'/%3e %3ccircle cx='281.50244' cy='59.41894' r='0.9931'/%3e %3ccircle cx='286.24256' cy='64.36686' r='0.9931'/%3e %3ccircle cx='287.22599' cy='42.41605' r='0.9931'/%3e %3ccircle cx='288.70316' cy='40.39828' r='0.9931'/%3e %3ccircle cx='289.70881' cy='66.02374' r='0.9931'/%3e %3ccircle cx='293.23543' cy='80.7131' r='0.9931'/%3e %3ccircle cx='294.50272' cy='57.09806' r='0.9931'/%3e %3ccircle cx='294.9629' cy='61.50212' r='0.9931'/%3e %3ccircle cx='296.23917' cy='53.01796' r='0.9931'/%3e %3ccircle cx='300.97265' cy='65.92786' r='0.9931'/%3e %3ccircle cx='303.72777' cy='60.661' r='0.9931'/%3e %3ccircle cx='317.91494' cy='54.38808' r='0.9931'/%3e %3cg%3e %3cpath class='cls-18' d='M14.02563%2c140.90288H20.4808V1.86856H14.02563'/%3e %3cg%3e %3cline class='cls-18' x1='19.98424' y1='140.90288' x2='14.02563' y2='140.90288'/%3e %3ctext class='cls-19' transform='translate(5.49328 144.05646)'%3e0%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-18' x1='19.98424' y1='124.19965' x2='14.02563' y2='124.19965'/%3e %3ctext class='cls-19' transform='translate(-0.03016 127.35334)'%3e10%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-18' x1='19.98424' y1='107.49643' x2='14.02563' y2='107.49643'/%3e %3ctext class='cls-19' transform='translate(-0.03016 110.65021)'%3e20%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-18' x1='19.98424' y1='90.7932' x2='14.02563' y2='90.7932'/%3e %3ctext class='cls-19' transform='translate(-0.03016 93.94709)'%3e30%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-18' x1='19.98424' y1='74.08998' x2='14.02563' y2='74.08998'/%3e %3ctext class='cls-19' transform='translate(-0.03016 77.24445)'%3e40%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-18' x1='19.98424' y1='57.38675' x2='14.02563' y2='57.38675'/%3e %3ctext class='cls-19' transform='translate(-0.03016 60.54132)'%3e50%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-18' x1='19.98424' y1='40.68352' x2='14.02563' y2='40.68352'/%3e %3ctext class='cls-19' transform='translate(-0.03016 43.8382)'%3e60%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-18' x1='19.98424' y1='23.98029' x2='14.02563' y2='23.98029'/%3e %3ctext class='cls-19' transform='translate(-0.03016 27.13507)'%3e70%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-18' x1='19.98424' y1='7.27707' x2='14.02563' y2='7.27707'/%3e %3ctext class='cls-19' transform='translate(-0.03016 10.43146)'%3e80%3c/text%3e %3c/g%3e %3c/g%3e %3cg%3e %3cpath class='cls-18' d='M20.4808%2c146.365v-5.46207H318.41149V146.365'/%3e %3cg%3e %3cline class='cls-18' x1='20.4808' y1='140.40633' x2='20.4808' y2='146.36495'/%3e %3ctext class='cls-19' transform='translate(17.68859 156.3714)'%3e0%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-18' x1='57.23035' y1='140.40633' x2='57.23035' y2='146.36495'/%3e %3ctext class='cls-19' transform='translate(51.67687 156.3714)'%3e10%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-18' x1='93.97991' y1='140.40633' x2='93.97991' y2='146.36495'/%3e %3ctext class='cls-19' transform='translate(88.42687 156.3714)'%3e20%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-18' x1='130.72946' y1='140.40633' x2='130.72946' y2='146.36495'/%3e %3ctext class='cls-19' transform='translate(125.1759 156.3714)'%3e30%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-18' x1='167.47902' y1='140.40633' x2='167.47902' y2='146.36495'/%3e %3ctext class='cls-19' transform='translate(161.92492 156.3714)'%3e40%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-18' x1='204.22856' y1='140.40633' x2='204.22856' y2='146.36495'/%3e %3ctext class='cls-19' transform='translate(198.67492 156.3714)'%3e50%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-18' x1='240.97812' y1='140.40633' x2='240.97812' y2='146.36495'/%3e %3ctext class='cls-19' transform='translate(235.42394 156.3714)'%3e60%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-18' x1='277.72766' y1='140.40633' x2='277.72766' y2='146.36495'/%3e %3ctext class='cls-19' transform='translate(272.17394 156.3714)'%3e70%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-18' x1='314.47724' y1='140.40633' x2='314.47724' y2='146.36495'/%3e %3ctext class='cls-19' transform='translate(308.92297 156.3714)'%3e80%3c/text%3e %3c/g%3e %3c/g%3e %3c/g%3e%3c/svg%3e";

const metadata$c = {
  name: 'Contour plot',
  id: 'rawgraphs.contourplot',
  thumbnail: img$n,
  icon: img$m,
  categories: ['correlations', 'distributions'],
  description: 'It shows the estimated density of point clouds, which is especially useful to avoid overplotting in large datasets.',
  code: 'https://github.com/rawgraphs/rawgraphs-charts/tree/master/src/contourPlot',
  tutorial: 'https://rawgraphs.io/learning/how-to-make-a-contour-plot/'
};

const dimensions$c = [{
  id: 'x',
  name: 'X Axis',
  validTypes: ['number', 'date'],
  required: true
}, {
  id: 'y',
  name: 'Y Axis',
  validTypes: ['number', 'date'],
  required: true
} // {
//   id: 'weight',
//   name: 'Density weight',
//   validTypes: ['number'],
//   required: false,
// },
];

const mapData$c = {
  x: 'get',
  y: 'get',
  weight: 'get'
};

function colorDomain(data, mapping, visualOptions) {
  const {
    width,
    height,
    bandwidth,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    xOrigin,
    yOrigin
  } = visualOptions;
  const margin = {
    top: marginTop,
    right: marginRight,
    bottom: marginBottom,
    left: marginLeft
  };
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;

  if (!data) {
    return {
      domain: [],
      type: 'number'
    };
  } // x scale


  const xDomain = xOrigin ? [0, max(data, d => d.x)] : extent(data, d => d.x);
  const x = mapping.x.dataType === 'date' ? scaleTime() : scaleLinear();
  x.domain(xDomain).rangeRound([0, chartWidth]).nice(); // y scale

  const yDomain = yOrigin ? [0, max(data, d => d.y)] : extent(data, d => d.y);
  const y = mapping.y.dataType === 'date' ? scaleTime() : scaleLinear();
  y.domain(yDomain).rangeRound([chartHeight, 0]).nice();
  const contours = contourDensity().x(d => x(d.x)).y(d => y(d.y)).size([chartWidth, chartHeight]).bandwidth(bandwidth)(data);
  const domain = contours.map(d => d.value);
  return {
    domain,
    type: 'number'
  };
}
function render$c(svgNode, data, visualOptions, mapping, originalData, styles) {
  const {
    width,
    height,
    background,
    xOrigin,
    yOrigin,
    showPoints,
    dotsDiameter,
    bandwidth,
    showLegend,
    legendWidth,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    colorScale,
    showBandLabels,
    labelThresholds,
    showLabelsOutline,
    autoHideLabels
  } = visualOptions;
  const margin = {
    top: marginTop,
    right: marginRight,
    bottom: marginBottom,
    left: marginLeft
  };
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom; // x scale

  const xDomain = xOrigin ? [0, max(data, d => d.x)] : extent(data, d => d.x);
  const x = mapping.x.dataType.type === 'date' ? scaleTime() : scaleLinear();
  x.domain(xDomain).rangeRound([0, chartWidth]).nice(); // y scale

  const yDomain = yOrigin ? [0, max(data, d => d.y)] : extent(data, d => d.y);
  const y = mapping.y.dataType.type === 'date' ? scaleTime() : scaleLinear();
  y.domain(yDomain).rangeRound([chartHeight, 0]).nice();

  const xAxis = g => {
    return g.attr('transform', `translate(0,${chartHeight})`).call(axisBottom(x)).call(g => g.append('text').attr('x', chartWidth).attr('dy', -5).attr('text-anchor', 'end').text(mapping['x'].value).styles(styles.axisLabel));
  };

  const yAxis = g => {
    return g.call(axisLeft(y)).call(g => g.append('text').attr('x', 4).attr('text-anchor', 'start').attr('dominant-baseline', 'hanging').text(mapping['y'].value).styles(styles.axisLabel));
  };

  select(svgNode).append('rect').attr('width', showLegend ? width + legendWidth : width).attr('height', height).attr('x', 0).attr('y', 0).attr('fill', background).attr('id', 'background');
  const svg = select(svgNode).append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')').attr('id', 'visualization');
  svg.append('clipPath').attr('id', 'plotClipPath').append('rect').attr('x', 0).attr('y', 0).attr('width', chartWidth).attr('height', chartHeight);
  const vizLayer = svg.append('g').attr('id', 'viz').attr('clip-path', 'url(#plotClipPath)');
  const contours = contourDensity().x(d => x(d.x)).y(d => y(d.y)).size([chartWidth, chartHeight]).bandwidth(bandwidth)(data);
  const contourBand = vizLayer.selectAll('g').data(contours).join('g');
  contourBand.append('path').attr('fill', d => colorScale(d.value)).attr('stroke', d => lab(colorScale(d.value)).darker(1)).attr('stroke-opacity', (d, i) => i % labelThresholds === 0 ? 1 : 0.3).attr('d', geoPath());

  if (showPoints) {
    vizLayer.selectAll('circle').data(data).join('circle').attr('cx', d => x(d.x)).attr('cy', d => y(d.y)).attr('fill', 'black').attr('r', dotsDiameter / 2);
  }

  const labelsLayer = svg.append('g').attr('id', 'labels');
  const axisLayer = svg.append('g').attr('id', 'axis');
  axisLayer.append('g').call(xAxis);
  axisLayer.append('g').call(yAxis);
  const steps = 40;

  if (showBandLabels) {
    // adapted from https://observablehq.com/@fil/contour-labels-svg
    contours.forEach((cont, index) => {
      if (index % labelThresholds === 0) {
        cont.coordinates.forEach(polygon => {
          polygon.forEach((ring, j) => {
            const p = ring.slice(1, Infinity),
                  // best number of steps to divide ring.length
            possibilities = range(steps, steps * 1.4),
                  scores = possibilities.map(d => -((p.length - 1) % d)),
                  n = possibilities[scan(scores)],
                  // best starting point: bottom for first rings, top for holes
            start = 1 + scan(p.map(xy => (j === 0 ? -1 : 1) * xy[1])) % n,
                  margin = 2;
            p.forEach((xy, i) => {
              if (i % n === start && xy[0] > margin && xy[0] < chartWidth - margin && xy[1] > margin && xy[1] < chartHeight - margin) {
                const a = (i - 2 + p.length) % p.length,
                      b = (i + 2) % p.length,
                      dx = p[b][0] - p[a][0],
                      dy = p[b][1] - p[a][1];
                if (dx === 0 && dy === 0) return;
                const angle = (Math.cos(Math.atan2(dy, dx)) < 0 ? Math.PI : 0) + Math.atan2(dy, dx);
                labelsLayer.append('text').attr('stroke', 'none').attr('text-anchor', 'middle').attr('dy', '0.3em').attr('transform', `translate(${xy})rotate(${angle * 180 / Math.PI})`).text(cont.value).styles(styles.labelSecondary); //.styles(styles.labelOutline)
              }
            });
          });
        });
      }
    });
  }

  if (showLabelsOutline) {
    // NOTE: Adobe Illustrator does not support paint-order attr
    labelsLayer.selectAll('text').styles(styles.labelOutline);
  }

  if (autoHideLabels) {
    labelsOcclusion(labelsLayer.selectAll('text'), (d, i) => i);
  }

  if (showLegend) {
    const legendLayer = select(svgNode).append('g').attr('id', 'legend').attr('transform', `translate(${width},${marginTop})`);
    const chartLegend = legend().legendWidth(legendWidth);

    if (colorScale.domain().length) {
      chartLegend.addColor('density', colorScale);
    }

    legendLayer.call(chartLegend);
  }
}

const visualOptions$c = {
  marginTop: {
    type: 'number',
    label: 'Margin (top)',
    default: 50,
    group: 'artboard'
  },
  marginRight: {
    type: 'number',
    label: 'Margin (right)',
    default: 50,
    group: 'artboard'
  },
  marginBottom: {
    type: 'number',
    label: 'Margin (bottom)',
    default: 50,
    group: 'artboard'
  },
  marginLeft: {
    type: 'number',
    label: 'Margin (left)',
    default: 50,
    group: 'artboard'
  },
  showLegend: {
    type: 'boolean',
    label: 'Show legend',
    default: false,
    group: 'artboard'
  },
  legendWidth: {
    type: 'number',
    label: 'Legend width',
    default: 200,
    group: 'artboard',
    disabled: {
      showLegend: false
    },
    container: 'width',
    containerCondition: {
      showLegend: true
    }
  },
  xOrigin: {
    type: 'boolean',
    label: 'Set X origin to 0',
    default: false,
    group: 'chart',
    requiredDimensions: ['x', 'y']
  },
  yOrigin: {
    type: 'boolean',
    label: 'Set Y origin to 0',
    default: false,
    group: 'chart',
    requiredDimensions: ['x', 'y']
  },
  bandwidth: {
    type: 'number',
    label: 'Bandwidth',
    default: 20,
    step: 1,
    min: 1,
    group: 'chart',
    requiredDimensions: ['x', 'y']
  },
  showPoints: {
    type: 'boolean',
    label: 'Show dots on data values',
    default: false,
    group: 'chart',
    requiredDimensions: ['x', 'y']
  },
  dotsDiameter: {
    type: 'number',
    label: 'Dots diameter',
    default: 2,
    group: 'chart',
    disabled: {
      showPoints: false
    },
    requiredDimensions: ['x', 'y']
  },
  colorScale: {
    type: 'colorScale',
    label: 'Color scale',
    domain: 'colorDomain',
    default: {
      scaleType: 'sequential',
      interpolator: 'interpolateBlues'
    },
    group: 'colors',
    requiredDimensions: ['x', 'y']
  },
  showBandLabels: {
    type: 'boolean',
    label: 'Show band labels',
    default: false,
    group: 'labels',
    requiredDimensions: ['x', 'y']
  },
  labelThresholds: {
    type: 'number',
    label: 'Labels threshold steps',
    default: 5,
    step: 1,
    min: 1,
    group: 'labels',
    disabled: {
      showBandLabels: false
    },
    requiredDimensions: ['x', 'y']
  },
  showLabelsOutline: {
    type: 'boolean',
    label: 'Show outline',
    default: false,
    group: 'labels',
    disabled: {
      showBandLabels: false
    },
    requiredDimensions: ['x', 'y']
  },
  autoHideLabels: {
    type: 'boolean',
    label: 'Auto hide labels',
    default: false,
    group: 'labels',
    disabled: {
      showBandLabels: false
    },
    requiredDimensions: ['x', 'y']
  }
};

var contourPlot = {
  metadata: metadata$c,
  dimensions: dimensions$c,
  mapData: mapData$c,
  render: render$c,
  visualOptions: visualOptions$c,
  styles: styles$1,
  colorDomain
};

var img$o = "data:image/svg+xml,%3csvg id='rawgraphs-icons' xmlns='http://www.w3.org/2000/svg' width='56' height='56' viewBox='0 0 56 56'%3e %3cdefs%3e %3cstyle%3e .cls-1 %7b fill: %2395e5c0%3b %7d .cls-2 %7b fill: %2306c26c%3b %7d %3c/style%3e %3c/defs%3e %3cg id='secundary'%3e %3cpath class='cls-1' d='M44.7314%2c23.7588l-5-11a3%2c3%2c0%2c0%2c0-5.7275%2c1.0835l-1%2c19A3%2c3%2c0%2c0%2c0%2c38.4%2c34.8l6-8A3.0018%2c3.0018%2c0%2c0%2c0%2c44.7314%2c23.7588ZM36%2c34a1%2c1%2c0%2c1%2c1%2c1-1A1.0013%2c1.0013%2c0%2c0%2c1%2c36%2c34Zm1-19a1%2c1%2c0%2c1%2c1%2c1-1A1.0013%2c1.0013%2c0%2c0%2c1%2c37%2c15Zm5%2c11a1%2c1%2c0%2c1%2c1%2c1-1A1.0013%2c1.0013%2c0%2c0%2c1%2c42%2c26Z'/%3e %3c/g%3e %3cg id='primary'%3e %3cpolygon class='cls-2' points='46.305 46.805 44.865 46.805 46.061 48 8 48 8 9.939 9.195 11.135 9.195 9.695 7.5 8 5.805 9.695 5.805 11.135 7 9.939 7 49 46.061 49 44.865 50.195 46.305 50.195 48 48.5 46.305 46.805'/%3e %3cpath class='cls-2' d='M27.8066%2c24.605a3.0043%2c3.0043%2c0%2c0%2c0-2.6308-.49l-7%2c2a3.0008%2c3.0008%2c0%2c0%2c0-2.168%2c2.6709l-1%2c14A3%2c3%2c0%2c0%2c0%2c19.8%2c45.4l8-6A2.9984%2c2.9984%2c0%2c0%2c0%2c29%2c37V27A2.9986%2c2.9986%2c0%2c0%2c0%2c27.8066%2c24.605ZM18%2c44a1%2c1%2c0%2c1%2c1%2c1-1A1.0013%2c1.0013%2c0%2c0%2c1%2c18%2c44Zm1-14a1%2c1%2c0%2c1%2c1%2c1-1A1.0013%2c1.0013%2c0%2c0%2c1%2c19%2c30Zm7%2c8a1%2c1%2c0%2c1%2c1%2c1-1A1.0013%2c1.0013%2c0%2c0%2c1%2c26%2c38Zm0-10a1%2c1%2c0%2c1%2c1%2c1-1A1.0013%2c1.0013%2c0%2c0%2c1%2c26%2c28Z'/%3e %3c/g%3e%3c/svg%3e";

var img$p = "data:image/svg+xml,%3c%3fxml version='1.0' encoding='utf-8'%3f%3e%3c!-- Generator: Adobe Illustrator 25.1.0%2c SVG Export Plug-In . SVG Version: 6.00 Build 0) --%3e%3csvg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 320 160' style='enable-background:new 0 0 320 160%3b' xml:space='preserve'%3e%3cstyle type='text/css'%3e .st0%7bopacity:0.5%3bfill:%231F77B4%3bstroke:%231F77B4%3bstroke-width:10%3bstroke-linejoin:round%3benable-background:new %3b%7d .st1%7bfill:%231F77B4%3b%7d .st2%7bopacity:0.5%3bfill:%23FF7F0E%3bstroke:%23FF7F0E%3bstroke-width:10%3bstroke-linejoin:round%3benable-background:new %3b%7d .st3%7bfill:%23FF7F0E%3b%7d .st4%7bfill:none%3bstroke:black%3b%7d .st5%7bfont-family:'Helvetica'%3b%7d .st6%7bfont-size:15.0329px%3b%7d%3c/style%3e%3cg id='visualization' transform='translate(100%2c50)'%3e %3cg id='viz'%3e %3cg%3e %3cpath class='st0' d='M184.2%2c40l-6-45.1H103L92.5%2c35.5l3%2c15L184.2%2c40z'/%3e %3cg%3e %3ccircle class='st1' cx='103' cy='-5.1' r='3'/%3e %3ccircle class='st1' cx='178.1' cy='-5.1' r='3'/%3e %3ccircle class='st1' cx='116.5' cy='18.9' r='3'/%3e %3ccircle class='st1' cx='179.6' cy='18.9' r='3'/%3e %3ccircle class='st1' cx='92.5' cy='35.5' r='3'/%3e %3ccircle class='st1' cx='95.5' cy='50.5' r='3'/%3e %3ccircle class='st1' cx='184.2' cy='40' r='3'/%3e %3ccircle class='st1' cx='116.5' cy='41.5' r='3'/%3e %3c/g%3e %3c/g%3e %3cg%3e %3cpath class='st2' d='M66.9%2c39.2L15.8%2c16.7l-54.1%2c51.1l3%2c10.5L66.9%2c39.2z'/%3e %3cg%3e %3ccircle class='st3' cx='-35.3' cy='78.3' r='3'/%3e %3ccircle class='st3' cx='-38.3' cy='67.8' r='3'/%3e %3ccircle class='st3' cx='-35.3' cy='78.3' r='3'/%3e %3ccircle class='st3' cx='15.8' cy='16.6' r='3'/%3e %3ccircle class='st3' cx='35.3' cy='51.3' r='3'/%3e %3ccircle class='st3' cx='66.9' cy='39.2' r='3'/%3e %3ccircle class='st3' cx='5.5' cy='47.5' r='3'/%3e %3ccircle class='st3' cx='20.3' cy='54.3' r='3'/%3e %3c/g%3e %3c/g%3e %3c/g%3e %3cg id='labels'%3e %3cg transform='translate(2%2c51)'%3e %3c/g%3e %3cg transform='translate(101%2c0)'%3e %3c/g%3e %3cg transform='translate(85%2c13)'%3e %3c/g%3e %3cg transform='translate(5%2c43)'%3e %3c/g%3e %3cg transform='translate(151%2c0)'%3e %3c/g%3e %3cg transform='translate(3%2c54)'%3e %3c/g%3e %3cg transform='translate(4%2c43)'%3e %3c/g%3e %3cg transform='translate(6%2c57)'%3e %3c/g%3e %3cg transform='translate(5%2c55)'%3e %3c/g%3e %3cg transform='translate(110%2c16)'%3e %3c/g%3e %3cg transform='translate(1%2c51)'%3e %3c/g%3e %3cg transform='translate(27%2c38)'%3e %3c/g%3e %3cg transform='translate(4%2c50)'%3e %3c/g%3e %3cg transform='translate(152%2c16)'%3e %3c/g%3e %3cg transform='translate(5%2c51)'%3e %3c/g%3e %3cg transform='translate(2%2c54)'%3e %3c/g%3e %3cg transform='translate(19%2c39)'%3e %3c/g%3e %3cg transform='translate(64%2c24)'%3e %3c/g%3e %3cg transform='translate(2%2c52)'%3e %3c/g%3e %3cg transform='translate(49%2c38)'%3e %3c/g%3e %3cg transform='translate(6%2c57)'%3e %3c/g%3e %3cg transform='translate(94%2c27)'%3e %3c/g%3e %3cg transform='translate(40%2c36)'%3e %3c/g%3e %3cg transform='translate(10%2c48)'%3e %3c/g%3e %3cg transform='translate(32%2c42)'%3e %3c/g%3e %3cg transform='translate(108%2c24)'%3e %3c/g%3e %3cg transform='translate(81%2c28)'%3e %3c/g%3e %3cg transform='translate(53%2c39)'%3e %3c/g%3e %3cg transform='translate(1%2c54)'%3e %3c/g%3e %3cg transform='translate(74%2c31)'%3e %3c/g%3e %3cg transform='translate(4%2c57)'%3e %3c/g%3e %3cg transform='translate(0%2c54)'%3e %3c/g%3e %3cg transform='translate(96%2c37)'%3e %3c/g%3e %3cg transform='translate(155%2c30)'%3e %3c/g%3e %3cg transform='translate(1%2c57)'%3e %3c/g%3e %3cg transform='translate(3%2c51)'%3e %3c/g%3e %3cg transform='translate(23%2c45)'%3e %3c/g%3e %3cg transform='translate(40%2c40)'%3e %3c/g%3e %3cg transform='translate(40%2c41)'%3e %3c/g%3e %3cg transform='translate(64%2c33)'%3e %3c/g%3e %3cg transform='translate(64%2c29)'%3e %3c/g%3e %3cg transform='translate(40%2c40)'%3e %3c/g%3e %3cg transform='translate(43%2c41)'%3e %3c/g%3e %3cg transform='translate(64%2c40)'%3e %3c/g%3e %3cg transform='translate(85%2c31)'%3e %3c/g%3e %3cg transform='translate(110%2c31)'%3e %3c/g%3e %3cg transform='translate(14%2c50)'%3e %3c/g%3e %3cg transform='translate(85%2c34)'%3e %3c/g%3e %3cg transform='translate(76%2c32)'%3e %3c/g%3e %3cg transform='translate(2%2c55)'%3e %3c/g%3e %3c/g%3e %3cg id='axis'%3e %3cg transform='translate(0%2c60)'%3e %3cpath class='st4' d='M-48.1%2c34.1v-8.3h255.6v8.3'/%3e %3cg transform='translate(0.5%2c0)'%3e %3cline class='st4' x1='-48.6' y1='25.1' x2='-48.6' y2='34.1'/%3e %3ctext transform='matrix(1 0 0 1 -52.7808 49.2707)' class='st5 st6'%3e0%3c/text%3e %3c/g%3e %3cg transform='translate(21.5%2c0)'%3e %3cline class='st4' x1='-38' y1='25.1' x2='-38' y2='34.1'/%3e %3ctext transform='matrix(1 0 0 1 -46.3911 49.2707)' class='st5 st6'%3e50%3c/text%3e %3c/g%3e %3cg transform='translate(43.5%2c0)'%3e %3cline class='st4' x1='-27' y1='25.1' x2='-27' y2='34.1'/%3e %3ctext transform='matrix(1 0 0 1 -39.4995 49.2707)' class='st5 st6'%3e100%3c/text%3e %3c/g%3e %3cg transform='translate(64.5%2c0)'%3e %3cline class='st4' x1='-16.4' y1='25.1' x2='-16.4' y2='34.1'/%3e %3ctext transform='matrix(1 0 0 1 -28.9302 49.2707)' class='st5 st6'%3e150%3c/text%3e %3c/g%3e %3cg transform='translate(85.5%2c0)'%3e %3cline class='st4' x1='-5.8' y1='25.1' x2='-5.8' y2='34.1'/%3e %3ctext transform='matrix(1 0 0 1 -18.3613 49.2707)' class='st5 st6'%3e200%3c/text%3e %3c/g%3e %3cg transform='translate(106.5%2c0)'%3e %3cline class='st4' x1='4.7' y1='25.1' x2='4.7' y2='34.1'/%3e %3ctext transform='matrix(1 0 0 1 -7.793 49.2707)' class='st5 st6'%3e250%3c/text%3e %3c/g%3e %3cg transform='translate(128.5%2c0)'%3e %3cline class='st4' x1='15.8' y1='25.1' x2='15.8' y2='34.1'/%3e %3ctext transform='matrix(1 0 0 1 3.2793 49.2707)' class='st5 st6'%3e300%3c/text%3e %3c/g%3e %3cg transform='translate(149.5%2c0)'%3e %3cline class='st4' x1='26.4' y1='25.1' x2='26.4' y2='34.1'/%3e %3ctext transform='matrix(1 0 0 1 13.8496 49.2707)' class='st5 st6'%3e350%3c/text%3e %3c/g%3e %3cg transform='translate(170.5%2c0)'%3e %3cline class='st4' x1='37' y1='25.1' x2='37' y2='34.1'/%3e %3ctext transform='matrix(1 0 0 1 24.418 49.2707)' class='st5 st6'%3e400%3c/text%3e %3c/g%3e %3c/g%3e %3cpath class='st4' d='M-57.9%2c85.8h9.8V-39.8h-9.8'/%3e %3cline class='st4' x1='-48.9' y1='85.8' x2='-57.9' y2='85.8'/%3e %3ctext transform='matrix(1 0 0 1 -70.7417 90.6301)' class='st5 st6'%3e0%3c/text%3e %3cline class='st4' x1='-48.9' y1='67' x2='-57.9' y2='67'/%3e %3ctext transform='matrix(1 0 0 1 -87.4624 72.694)' class='st5 st6'%3e400%3c/text%3e %3cline class='st4' x1='-48.9' y1='50.2' x2='-57.9' y2='50.2'/%3e %3ctext transform='matrix(1 0 0 1 -87.4624 54.758)' class='st5 st6'%3e800%3c/text%3e %3cline class='st4' x1='-48.9' y1='31.4' x2='-57.9' y2='31.4'/%3e %3ctext transform='matrix(1 0 0 1 -100.0005 36.822)' class='st5 st6'%3e1%2c200%3c/text%3e %3cline class='st4' x1='-48.9' y1='14.6' x2='-57.9' y2='14.6'/%3e %3ctext transform='matrix(1 0 0 1 -100.0005 18.8857)' class='st5 st6'%3e1%2c600%3c/text%3e %3cline class='st4' x1='-48.9' y1='-4.2' x2='-57.9' y2='-4.2'/%3e %3ctext transform='matrix(1 0 0 1 -100.0005 0.9496)' class='st5 st6'%3e2%2c000%3c/text%3e %3cline class='st4' x1='-48.9' y1='-21' x2='-57.9' y2='-21'/%3e %3ctext transform='matrix(1 0 0 1 -100.0005 -16.9861)' class='st5 st6'%3e2%2c400%3c/text%3e %3cline class='st4' x1='-48.9' y1='-39.8' x2='-57.9' y2='-39.8'/%3e %3ctext transform='matrix(1 0 0 1 -100.0005 -34.922)' class='st5 st6'%3e2%2c800%3c/text%3e %3c/g%3e%3c/g%3e%3c/svg%3e";

const metadata$d = {
  name: 'Convex hull',
  id: 'rawgraphs.convexhull',
  thumbnail: img$p,
  icon: img$o,
  categories: ['correlations', 'proportions'],
  description: 'In mathematics, the convex hull is the smallest convex shape containing a set of points. Applied to a scatterplot, it is useful to identify points belonging to the same category.',
  code: 'https://github.com/rawgraphs/rawgraphs-charts/tree/master/src/convexHull',
  tutorial: 'https://rawgraphs.io/learning/how-to-make-a-convex-hulls-chart/'
};

const dimensions$d = [{
  id: 'x',
  name: 'X Axis',
  validTypes: ['number', 'date'],
  required: true
}, {
  id: 'y',
  name: 'Y Axis',
  validTypes: ['number', 'date'],
  required: true
}, {
  id: 'group',
  name: 'Groups',
  validTypes: ['string'],
  required: false
}, {
  id: 'label',
  name: 'Label',
  validTypes: ['number', 'date', 'string'],
  required: false,
  multiple: true
}];

const mapData$d = {
  x: 'get',
  y: 'get',
  group: 'get',
  label: 'get'
};

function render$d(svgNode, data, visualOptions, mapping, originalData, styles) {
  const {
    width,
    height,
    background,
    xOrigin,
    yOrigin,
    showPoints,
    dotsDiameter,
    groupStrokeWidth,
    groupOpacity,
    showLegend,
    legendWidth,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    colorScale,
    showLabelsOutline,
    autoHideLabels,
    labelStyles
  } = visualOptions;
  const margin = {
    top: marginTop,
    right: marginRight,
    bottom: marginBottom,
    left: marginLeft
  };
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom; // x scale

  const xDomain = xOrigin ? [0, max(data, d => d.x)] : extent(data, d => d.x);
  const x = mapping.x.dataType.type === 'date' ? scaleTime() : scaleLinear();
  x.domain(xDomain).rangeRound([0, chartWidth]).nice(); // y scale

  const yDomain = yOrigin ? [0, max(data, d => d.y)] : extent(data, d => d.y);
  const y = mapping.y.dataType.type === 'date' ? scaleTime() : scaleLinear();
  y.domain(yDomain).rangeRound([chartHeight, 0]).nice();

  const xAxis = g => {
    return g.attr('transform', `translate(0,${chartHeight})`).call(axisBottom(x)).call(g => g.append('text').attr('x', chartWidth).attr('dy', -5).attr('text-anchor', 'end').text(mapping['x'].value).styles(styles.axisLabel));
  };

  const yAxis = g => {
    return g.call(axisLeft(y)).call(g => g.append('text').attr('x', 4).attr('text-anchor', 'start').attr('dominant-baseline', 'hanging').text(mapping['y'].value).styles(styles.axisLabel));
  };

  select(svgNode).append('rect').attr('width', showLegend ? width + legendWidth : width).attr('height', height).attr('x', 0).attr('y', 0).attr('fill', background).attr('id', 'background');
  const svg = select(svgNode).append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')').attr('id', 'visualization');
  const vizLayer = svg.append('g').attr('id', 'viz');
  const hullsData = groups(data, d => d.group && d.group.length ? d.group : null);
  const hulls = vizLayer.selectAll('g.hulls').data(hullsData).join('g').attr('class', 'hulls');
  hulls.append('path').attr('d', d => {
    const points = d[1].map(p => [x(p.x), y(p.y)]);

    if (points.length === 1) {
      return arc()({
        innerRadius: 0,
        outerRadius: groupStrokeWidth / 2,
        startAngle: 0,
        endAngle: 360
      });
    } else if (points.length === 2) {
      return `M${points.join('L')}Z`;
    } else {
      const hull = polygonHull(points);
      return `M${hull.join('L')}Z`;
    }
  }).attr('fill', d => colorScale(d[0])).attr('stroke', d => colorScale(d[0])).attr('stroke-width', d => d[1].length === 1 ? 0 : groupStrokeWidth).attr('stroke-linejoin', 'round').attr('opacity', groupOpacity).filter(d => d[1].length === 1).attr('transform', d => `translate(${x(d[1][0].x)}, ${y(d[1][0].y)})`);
  const points = hulls.append('g').selectAll('cirlce').data(d => d[1]).join('circle');

  if (showPoints) {
    points.attr('cx', d => x(d.x)).attr('cy', d => y(d.y)).attr('fill', d => {
      return colorScale(d.group);
    }).attr('r', dotsDiameter / 2);
  }

  const labelsLayer = svg.append('g').attr('id', 'labels');
  labelsLayer.selectAll('g').data(mapping.label.value ? data : []).join('g').attr('transform', d => `translate(${x(d.x)},${y(d.y)})`).append('text').attr('x', 0).attr('y', 0).attr('text-anchor', 'middle').attr('dominant-baseline', 'text-before-edge').selectAll('tspan').data(d => Array.isArray(d.label) ? d.label : [d.label]).join('tspan').attr('x', 0).attr('y', 0).attr('dy', (d, i) => i * 12).text((d, i) => {
    if (d && mapping.label.dataType[i].type === 'date') {
      return timeFormat(dateFormats$1[mapping.label.dataType[i].dateFormat])(d);
    } else {
      return d;
    }
  }).styles((d, i) => styles[labelStyles[i]]);
  labelsLayer.selectAll('text').call(sel => {
    return sel.attr('transform', function (d) {
      const height = sel.node().getBBox().height;
      return `translate(0,${-height / 2})`;
    });
  });
  const axisLayer = svg.append('g').attr('id', 'axis');
  axisLayer.append('g').call(xAxis);
  axisLayer.append('g').call(yAxis);

  if (showLabelsOutline) {
    // NOTE: Adobe Illustrator does not support paint-order attr
    labelsLayer.selectAll('text').styles(styles.labelOutline);
  }

  if (autoHideLabels) {
    labelsOcclusion(labelsLayer.selectAll('text'), d => d.size);
  }

  if (showLegend) {
    const legendLayer = select(svgNode).append('g').attr('id', 'legend').attr('transform', `translate(${width},${marginTop})`);
    const chartLegend = legend().legendWidth(legendWidth);

    if (mapping.group.value) {
      chartLegend.addColor(mapping.group.value, colorScale);
    }

    legendLayer.call(chartLegend);
  }
}

const visualOptions$d = {
  marginTop: {
    type: 'number',
    label: 'Margin (top)',
    default: 50,
    group: 'artboard'
  },
  marginRight: {
    type: 'number',
    label: 'Margin (right)',
    default: 50,
    group: 'artboard'
  },
  marginBottom: {
    type: 'number',
    label: 'Margin (bottom)',
    default: 50,
    group: 'artboard'
  },
  marginLeft: {
    type: 'number',
    label: 'Margin (left)',
    default: 50,
    group: 'artboard'
  },
  showLegend: {
    type: 'boolean',
    label: 'Show legend',
    default: false,
    group: 'artboard',
    requiredDimensions: ['x', 'y', 'group']
  },
  legendWidth: {
    type: 'number',
    label: 'Legend width',
    default: 200,
    group: 'artboard',
    disabled: {
      showLegend: false
    },
    container: 'width',
    containerCondition: {
      showLegend: true
    }
  },
  xOrigin: {
    type: 'boolean',
    label: 'Set X origin to 0',
    default: false,
    group: 'chart',
    requiredDimensions: ['x', 'y']
  },
  yOrigin: {
    type: 'boolean',
    label: 'Set Y origin to 0',
    default: false,
    group: 'chart',
    requiredDimensions: ['x', 'y']
  },
  groupStrokeWidth: {
    type: 'number',
    label: 'Groups stroke width',
    default: 10,
    step: 1,
    min: 1,
    group: 'chart',
    requiredDimensions: ['x', 'y']
  },
  groupOpacity: {
    type: 'number',
    label: 'Fill opacity',
    default: 0.5,
    step: 0.1,
    min: 0,
    max: 1,
    group: 'chart',
    requiredDimensions: ['x', 'y']
  },
  showPoints: {
    type: 'boolean',
    label: 'Show dots on data values',
    default: true,
    group: 'chart',
    requiredDimensions: ['x', 'y']
  },
  dotsDiameter: {
    type: 'number',
    label: 'Dots diameter',
    default: 2,
    group: 'chart',
    disabled: {
      showPoints: false
    },
    requiredDimensions: ['x', 'y']
  },
  colorScale: {
    type: 'colorScale',
    label: 'Color scale',
    dimension: 'group',
    default: {
      scaleType: 'ordinal',
      interpolator: 'interpolateSpectral'
    },
    group: 'colors',
    requiredDimensions: ['x', 'y']
  },
  labelStyles: {
    type: 'text',
    label: 'Label',
    group: 'labels',
    options: [{
      label: 'Primary',
      value: 'labelPrimary'
    }, {
      label: 'Secondary',
      value: 'labelSecondary'
    }, {
      label: 'Italic',
      value: 'labelItalic'
    }],
    default: 'labelPrimary',
    repeatFor: 'label',
    repeatDefault: ['labelPrimary', 'labelSecondary', 'labelItalic'],
    requiredDimensions: ['x', 'y', 'label']
  },
  showLabelsOutline: {
    type: 'boolean',
    label: 'Show outline',
    default: false,
    group: 'labels',
    requiredDimensions: ['x', 'y', 'label']
  },
  autoHideLabels: {
    type: 'boolean',
    label: 'Auto hide labels',
    default: false,
    group: 'labels',
    requiredDimensions: ['x', 'y', 'label']
  }
};

var convexHull = {
  metadata: metadata$d,
  dimensions: dimensions$d,
  mapData: mapData$d,
  render: render$d,
  visualOptions: visualOptions$d,
  styles: styles$1
};

var img$q = "data:image/svg+xml,%3csvg id='rawgraphs-icons' xmlns='http://www.w3.org/2000/svg' width='56' height='56' viewBox='0 0 56 56'%3e %3cdefs%3e %3cstyle%3e .cls-1 %7b fill: %2395e5c0%3b %7d .cls-2 %7b fill: %2306c26c%3b %7d %3c/style%3e %3c/defs%3e %3cg id='secundary'%3e %3cpath class='cls-1' d='M46.5%2c11V10a16.5921%2c16.5921%2c0%2c0%2c0-9.2656%2c2.5674A15.49%2c15.49%2c0%2c0%2c1%2c28.5%2c15v.5l-.0107-.5c-4.7373.1006-7.0948%2c3.48-9.3741%2c6.75C16.873%2c24.9639%2c14.7559%2c28%2c10.5%2c28v1c4.1914%2c0%2c6.31%2c4.2373%2c8.5527%2c8.7236C21.333%2c42.2842%2c23.6914%2c47%2c28.5%2c47h18V46h-18c-4.1914%2c0-6.31-4.2373-8.5527-8.7236C18.6091%2c34.6%2c17.24%2c31.8778%2c15.3685%2c30.079a17.68%2c17.68%2c0%2c0%2c1%2c3.8%2c2.7945C21.45%2c34.9023%2c23.81%2c37%2c28.5%2c37a23.7614%2c23.7614%2c0%2c0%2c1%2c8.8193%2c1.4717A25.01%2c25.01%2c0%2c0%2c0%2c46.5%2c40V39a23.88%2c23.88%2c0%2c0%2c1-8.8643-1.4766%2c31.9956%2c31.9956%2c0%2c0%2c0-3.1731-.9251c1.1684-.1783%2c2.159-.3938%2c3.1233-.6086A35.3274%2c35.3274%2c0%2c0%2c1%2c46.5%2c35V34a36.1757%2c36.1757%2c0%2c0%2c0-9.1309%2c1.0137A34.7618%2c34.7618%2c0%2c0%2c1%2c28.5%2c36c-4.31%2c0-6.4268-1.8818-8.668-3.8735A16.691%2c16.691%2c0%2c0%2c0%2c15.13%2c28.8706c1.6782-.1031%2c2.9668-.2536%2c4.2171-.4028A57.2912%2c57.2912%2c0%2c0%2c1%2c28.4922%2c28l.0078-.5V28h18V27H28.5078a59.012%2c59.012%2c0%2c0%2c0-9.28.4746c-1.3172.1573-2.6679.317-4.4952.4185%2c2.1915-1.266%2c3.7161-3.4392%2c5.2032-5.5713C22.1693%2c19.1177%2c24.28%2c16.0919%2c28.507%2c16a15.4916%2c15.4916%2c0%2c0%2c1%2c8.7274%2c2.4324A16.5921%2c16.5921%2c0%2c0%2c0%2c46.5%2c21V20a15.5584%2c15.5584%2c0%2c0%2c1-8.7793-2.4409A23.5%2c23.5%2c0%2c0%2c0%2c34.5081%2c16H46.5V15H34.5081a23.5%2c23.5%2c0%2c0%2c0%2c3.2126-1.5591A15.5584%2c15.5584%2c0%2c0%2c1%2c46.5%2c11Z'/%3e %3c/g%3e %3cg id='primary'%3e %3ccircle class='cls-2' cx='10.5' cy='28.5' r='1.5'/%3e %3ccircle class='cls-2' cx='46.5' cy='10.5' r='1.5'/%3e %3ccircle class='cls-2' cx='46.5' cy='15.5' r='1.5'/%3e %3ccircle class='cls-2' cx='46.5' cy='20.5' r='1.5'/%3e %3ccircle class='cls-2' cx='46.5' cy='27.5' r='1.5'/%3e %3ccircle class='cls-2' cx='28.5' cy='27.5' r='1.5'/%3e %3ccircle class='cls-2' cx='28.5' cy='36.5' r='1.5'/%3e %3ccircle class='cls-2' cx='28.5' cy='46.5' r='1.5'/%3e %3ccircle class='cls-2' cx='28.5' cy='15.5' r='1.5'/%3e %3ccircle class='cls-2' cx='46.5' cy='34.5' r='1.5'/%3e %3ccircle class='cls-2' cx='46.5' cy='39.5' r='1.5'/%3e %3ccircle class='cls-2' cx='46.5' cy='46.5' r='1.5'/%3e %3c/g%3e%3c/svg%3e";

var img$r = "data:image/svg+xml,%3csvg id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' width='320' height='160' viewBox='0 0 320 160'%3e %3cdefs%3e %3cstyle%3e .cls-1 %7b fill: white%3b %7d .cls-2 %7b fill: none%3b stroke: %23ccc%3b %7d .cls-3 %7b fill: %23ccc%3b %7d .cls-11%2c .cls-16%2c .cls-4%2c .cls-5%2c .cls-6 %7b isolation: isolate%3b %7d .cls-11%2c .cls-16%2c .cls-5%2c .cls-6 %7b font-size: 12px%3b font-family: Helvetica%3b %7d .cls-6 %7b letter-spacing: -0.0547em%3b %7d .cls-7 %7b fill: %23fee89a%3b %7d .cls-8 %7b fill: %23ebf7a6%3b %7d .cls-9 %7b fill: %23a0d9a3%3b %7d .cls-10 %7b fill: %234ba0b1%3b %7d .cls-11 %7b letter-spacing: -0.0366em%3b %7d .cls-12 %7b fill: %235e4fa2%3b %7d .cls-13 %7b fill: %239e0142%3b %7d .cls-14 %7b fill: %23fba35e%3b %7d .cls-15 %7b fill: %23e1524a%3b %7d .cls-16 %7b letter-spacing: -0.0176em%3b %7d %3c/style%3e %3c/defs%3e %3crect id='background' class='cls-1' width='320' height='160'/%3e %3cg id='viz'%3e %3cg id='links'%3e %3cpath class='cls-2' d='M5%2c77.1025c48.6667%2c0%2c48.6667-55.1349%2c97.3333-55.1349'/%3e %3cpath class='cls-2' d='M5%2c77.1025c48.6667%2c0%2c48.6667-.2946%2c97.3333-.2946'/%3e %3cpath class='cls-2' d='M5%2c77.1025c48.6667%2c0%2c48.6667%2c55.43%2c97.3333%2c55.43'/%3e %3cpath class='cls-2' d='M102.3333%2c21.9676c48.6667%2c0%2c48.6667-11.734%2c97.3334-11.734'/%3e %3cpath class='cls-2' d='M102.3333%2c21.9676C151%2c21.9676%2c151%2c33.7015%2c199.6667%2c33.7015'/%3e %3cpath class='cls-2' d='M102.3333%2c76.8079C151%2c76.8079%2c151%2c59.5528%2c199.6667%2c59.5528'/%3e %3cpath class='cls-2' d='M102.3333%2c76.8079c48.6667%2c0%2c48.6667-1%2c97.3334-1'/%3e %3cpath class='cls-2' d='M102.3333%2c76.8079C151%2c76.8079%2c151%2c95.0631%2c199.6667%2c95.0631'/%3e %3cpath class='cls-2' d='M102.3333%2c132.5322c48.6667%2c0%2c48.6667-15.83%2c97.3334-15.83'/%3e %3cpath class='cls-2' d='M102.3333%2c132.5322c48.6667%2c0%2c48.6667-1.4042%2c97.3334-1.4042'/%3e %3cpath class='cls-2' d='M102.3333%2c132.5322c48.6667%2c0%2c48.6667%2c17.2342%2c97.3334%2c17.2342'/%3e %3cpath class='cls-2' d='M199.6667%2c10.2336H297'/%3e %3cpath class='cls-2' d='M199.6667%2c33.7015c48.6666%2c0%2c48.6666-7.213%2c97.3333-7.213'/%3e %3cpath class='cls-2' d='M199.6667%2c33.7015c48.6666%2c0%2c48.6666%2c7.213%2c97.3333%2c7.213'/%3e %3cpath class='cls-2' d='M199.6667%2c75.8077H297'/%3e %3cpath class='cls-2' d='M199.6667%2c95.0631c48.6666%2c0%2c48.6666-7.2129%2c97.3333-7.2129'/%3e %3cpath class='cls-2' d='M199.6667%2c95.0631c48.6666%2c0%2c48.6666%2c7.213%2c97.3333%2c7.213'/%3e %3cpath class='cls-2' d='M199.6667%2c116.7021H297'/%3e %3cpath class='cls-2' d='M199.6667%2c131.128H297'/%3e %3cpath class='cls-2' d='M199.6667%2c149.7664H297'/%3e %3c/g%3e %3cg id='nodes'%3e %3ccircle class='cls-3' cx='5' cy='77.1025' r='5'/%3e %3cg id='C'%3e %3ccircle class='cls-3' cx='102.3333' cy='21.9676' r='5'/%3e %3cg class='cls-4'%3e %3ctext class='cls-5' transform='translate(85.3344 25.9676)'%3eC%3c/text%3e %3c/g%3e %3c/g%3e %3cg id='A'%3e %3ccircle class='cls-3' cx='102.3333' cy='76.8079' r='5'/%3e %3cg class='cls-4'%3e %3ctext class='cls-6' transform='translate(85.9935 80.8079)'%3eA%3c/text%3e %3c/g%3e %3c/g%3e %3cg id='B'%3e %3ccircle class='cls-3' cx='102.3333' cy='132.5322' r='5'/%3e %3cg class='cls-4'%3e %3ctext class='cls-5' transform='translate(85.6654 136.5322)'%3eB%3c/text%3e %3c/g%3e %3c/g%3e %3cg id='G'%3e %3ccircle class='cls-7' cx='199.6667' cy='10.2336' r='5'/%3e %3cg class='cls-4'%3e %3ctext class='cls-5' transform='translate(182.1656 14.2336)'%3eG%3c/text%3e %3c/g%3e %3c/g%3e %3cg id='H'%3e %3ccircle class='cls-8' cx='199.6667' cy='33.7015' r='5'/%3e %3cg class='cls-4'%3e %3ctext class='cls-5' transform='translate(182.4996 37.7015)'%3eH%3c/text%3e %3c/g%3e %3c/g%3e %3cg id='I'%3e %3ccircle class='cls-9' cx='199.6667' cy='59.5528' r='10'/%3e %3cg class='cls-4'%3e %3ctext class='cls-5' transform='translate(212.6664 63.5528)'%3eI%3c/text%3e %3c/g%3e %3c/g%3e %3cg id='L'%3e %3ccircle class='cls-10' cx='199.6667' cy='75.8077' r='5'/%3e %3cg class='cls-4'%3e %3ctext class='cls-11' transform='translate(183.7155 79.8077)'%3eL%3c/text%3e %3c/g%3e %3c/g%3e %3cg id='M'%3e %3ccircle class='cls-12' cx='199.6667' cy='95.0631' r='5'/%3e %3cg class='cls-4'%3e %3ctext class='cls-5' transform='translate(181.8346 99.0631)'%3eM%3c/text%3e %3c/g%3e %3c/g%3e %3cg id='D'%3e %3ccircle class='cls-13' cx='199.6667' cy='116.7021' r='5'/%3e %3cg class='cls-4'%3e %3ctext class='cls-5' transform='translate(182.4996 120.7021)'%3eD%3c/text%3e %3c/g%3e %3c/g%3e %3cg id='F'%3e %3ccircle class='cls-14' cx='199.6667' cy='131.128' r='5'/%3e %3cg class='cls-4'%3e %3ctext class='cls-5' transform='translate(183.1676 135.128)'%3eF%3c/text%3e %3c/g%3e %3c/g%3e %3cg id='E'%3e %3ccircle class='cls-15' cx='199.6667' cy='149.7664' r='5'/%3e %3cg class='cls-4'%3e %3ctext class='cls-5' transform='translate(182.8307 153.7664)'%3eE%3c/text%3e %3c/g%3e %3c/g%3e %3cg id='Q'%3e %3ccircle class='cls-7' cx='297' cy='10.2336' r='10'/%3e %3cg class='cls-4'%3e %3ctext class='cls-5' transform='translate(308.333 14.2336)'%3eQ%3c/text%3e %3c/g%3e %3c/g%3e %3cg id='R'%3e %3ccircle class='cls-8' cx='297' cy='26.4885' r='5.7735'/%3e %3cg class='cls-4'%3e %3ctext class='cls-5' transform='translate(308.667 30.4885)'%3eR%3c/text%3e %3c/g%3e %3c/g%3e %3cg id='S'%3e %3ccircle class='cls-8' cx='297' cy='40.9145' r='8.165'/%3e %3cg class='cls-4'%3e %3ctext class='cls-5' transform='translate(308.998 44.9145)'%3eS%3c/text%3e %3c/g%3e %3c/g%3e %3cg id='F-2' data-name='F'%3e %3ccircle class='cls-10' cx='297' cy='75.8077' r='5.7735'/%3e %3cg class='cls-4'%3e %3ctext class='cls-5' transform='translate(309.335 79.8077)'%3eF%3c/text%3e %3c/g%3e %3c/g%3e %3cg id='V'%3e %3ccircle class='cls-12' cx='297' cy='87.8502' r='5.7735'/%3e %3cg class='cls-4'%3e %3ctext class='cls-5' transform='translate(308.998 91.8502)'%3eV%3c/text%3e %3c/g%3e %3c/g%3e %3cg id='U'%3e %3ccircle class='cls-12' cx='297' cy='102.2761' r='8.165'/%3e %3cg class='cls-4'%3e %3ctext class='cls-5' transform='translate(308.667 106.2761)'%3eU%3c/text%3e %3c/g%3e %3c/g%3e %3cg id='N'%3e %3ccircle class='cls-13' cx='297' cy='116.7021' r='5.7735'/%3e %3cg class='cls-4'%3e %3ctext class='cls-5' transform='translate(308.667 120.7021)'%3eN%3c/text%3e %3c/g%3e %3c/g%3e %3cg id='P'%3e %3ccircle class='cls-14' cx='297' cy='131.128' r='8.165'/%3e %3cg class='cls-4'%3e %3ctext class='cls-16' transform='translate(309.1035 135.128)'%3eP%3c/text%3e %3c/g%3e %3c/g%3e %3cg id='O'%3e %3ccircle class='cls-15' cx='297' cy='149.7664' r='10'/%3e %3cg class='cls-4'%3e %3ctext class='cls-5' transform='translate(308.333 153.7664)'%3eO%3c/text%3e %3c/g%3e %3c/g%3e %3c/g%3e %3c/g%3e%3c/svg%3e";

const metadata$e = {
  name: 'Linear dendrogram',
  id: 'rawgraphs.lineardendrogram',
  thumbnail: img$r,
  icon: img$q,
  categories: ['hierarchies', 'proportions'],
  description: 'It displays hierarchically structured data with a tree structure, where the root node is on the left and leaves are on the right. The size of nodes can be used to encode a further quantitative dimension with size and a quantitative or categorical dimension with color.',
  code: 'https://github.com/rawgraphs/rawgraphs-charts/tree/master/src/dendrogram',
  tutorial: 'https://rawgraphs.io/learning/how-to-make-a-linear-dendrogram/'
};

const dimensions$e = [{
  id: 'hierarchy',
  name: 'Hierarchy',
  validTypes: ['number', 'date', 'string'],
  required: true,
  multiple: true
}, {
  id: 'size',
  name: 'Size',
  validTypes: ['number'],
  required: false,
  aggregation: true,
  aggregationDefault: 'sum'
}, {
  id: 'color',
  name: 'Color',
  validTypes: ['number', 'date', 'string'],
  required: false,
  aggregation: true,
  aggregationDefault: {
    number: 'sum',
    string: 'csvDistinct',
    date: 'csvDistinct'
  }
}, {
  id: 'label',
  name: 'Label',
  validTypes: ['number', 'date', 'string'],
  required: false,
  multiple: true,
  aggregation: true,
  aggregationDefault: 'csvDistinct'
}];

const mapData$e = function (data, mapping, dataTypes, dimensions) {
  const colorAggregator = getDimensionAggregator('color', mapping, dataTypes, dimensions);
  const sizeAggregator = getDimensionAggregator('size', mapping, dataTypes, dimensions);
  const labelAggregators = getDimensionAggregator('label', mapping, dataTypes, dimensions); // add the non-compulsory dimensions.

  if (!('color' in mapping)) mapping.color = {
    value: undefined
  };
  if (!('size' in mapping)) mapping.size = {
    value: undefined
  };
  if (!('label' in mapping)) mapping.label = {
    value: undefined
  };
  const results = [];
  rollups(data, v => {
    const item = {
      hierarchy: new Map(mapping.hierarchy.value.map(d => [d, v[0][d]])),
      //get the first one since it's grouped
      size: mapping.size.value ? sizeAggregator(v.map(d => d[mapping.size.value])) : v.length,
      color: mapping.color.value ? colorAggregator(v.map(d => d[mapping.color.value])) : 'cells color',
      label: mapping.label.value ? mapping.label.value.map((label, i) => {
        return labelAggregators[i](v.map(d => d[label]));
      }) : undefined // create array of strings

    };
    results.push(item);
    return item;
  }, ...mapping.hierarchy.value.map(level => d => d[level]) // create a grouping for each level of the hierarchy
  );
  return results;
};

function render$e(svgNode, data, visualOptions, mapping, originalData, styles) {
  const {
    width,
    height,
    background,
    // margins
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    // legend
    showLegend,
    legendWidth,
    // colors
    colorScale,
    maxDiameter,
    layout,
    sizeOnlyLeaves,
    sortBy,
    // labels
    showHierarchyLabels,
    showLabelsOutline,
    labelStyles
  } = visualOptions;
  const margin = {
    top: marginTop,
    right: marginRight,
    bottom: marginBottom,
    left: marginLeft
  }; //check if there are negative values, in case throw error

  data.forEach(d => {
    if (d.size < 0) {
      throw new Error('"Size" values cannot be negative');
    }
  });
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom; // create the hierarchical structure

  const nest = rollup(data, v => v[0], ...mapping.hierarchy.value.map(level => d => d.hierarchy.get(level)));
  const hierarchy$1 = hierarchy(nest) // since maps have also a .size porperty, sum only values for leaves, and not for Maps
  .sum(d => d[1] instanceof Map ? 0 : d[1].size) // sort nodes according to options
  .sort((a, b) => {
    switch (sortBy) {
      case 'Size (descending)':
        return descending(a.value, b.value);

      case 'Size (ascending)':
        return ascending(a.value, b.value);

      case 'Name':
        return ascending(a.data[0], b.data[0]);

      default:
        return 0;
    }
  }); // filter nodes with empty values in the hierarchy
  // @TODO check if this works also with empty values in non-leaf nodes

  hierarchy$1.descendants().filter(d => d.data[0] === '') // select nodes with empty key
  .forEach(d => {
    const index = d.parent.children.indexOf(d); // get its index in parent's children array

    d.parent.children.splice(index, 1); // remove it

    if (d.parent.children.length == 0) {
      // if it was the only children
      d.parent.data[1] = d.data[1]; // move its values to parent

      delete d.parent.children; // and remove the empty children array
    }
  }); // size scale

  const sizeScale = scaleSqrt().domain([0, max(hierarchy$1.leaves(), d => d.value)]).range([0, maxDiameter / 2]); // get the total size

  const totalValue = sum(hierarchy$1.leaves(), d => sizeScale(d.value) * 2); // compute padding

  const padding = (chartHeight - totalValue) / (hierarchy$1.leaves().length - 1); // dictionary to choose algorithm according to options

  const layouts = {
    'Cluster Dendogram': cluster(),
    Tree: tree()
  }; // compute the layout

  const tree$1 = nest => {
    return layouts[layout] // compute according to the options
    .size([chartHeight, chartWidth]).separation((a, b) => sizeScale(a.value) + sizeScale(b.value) + padding)(hierarchy$1);
  };

  const root = tree$1(); // add background

  select(svgNode).append('rect').attr('width', showLegend ? width + legendWidth : width).attr('height', height).attr('x', 0).attr('y', 0).attr('fill', background).attr('id', 'background');
  const svg = select(svgNode).append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')').attr('id', 'viz');
  svg.append('g').attr('id', 'links').selectAll('path').data(root.links()).join('path').attr('d', linkHorizontal().x(d => d.y).y(d => d.x)).attr('fill', 'none').attr('stroke', '#ccc');
  const node = svg.append('g').attr('id', 'nodes').selectAll('g').data(root.descendants()).join('g').attr('id', d => d.data[0]).attr('transform', d => `translate(${d.y},${d.x})`);
  node.append('circle').attr('fill', function (d) {
    if ('children' in d) {
      // if not leaf, check if leaves has the same value
      const childrenColors = [...new Set(d.leaves().map(l => l.data[1].color))];
      return childrenColors.length == 1 ? colorScale(childrenColors[0]) : '#ccc';
    } else {
      // otherwise, if it's a leaf use its own color
      return colorScale(d.data[1].color);
    }
  }).attr('r', d => {
    if (sizeOnlyLeaves) {
      return d.children ? 5 : sizeScale(d.value);
    } else {
      return sizeScale(d.value);
    }
  });
  node.filter(d => showHierarchyLabels ? true : !d.children).append('text').attr('text-anchor', d => d.children ? 'end' : 'start').attr('dominant-baseline', 'text-before-edge').selectAll('tspan').data(d => {
    if (d.children) {
      return [{
        string: d.data[0],
        x: sizeOnlyLeaves ? -6 - 2 : -sizeScale(d.value) - 2,
        children: true
      }];
    } else {
      const xpos = sizeScale(d.value); // [d.data[0]]
      // .concat(d.data[1].label)
      // .map((d) => ({ string: d, x: xpos }))

      return d.data[1].label.map(d => ({
        string: d,
        x: xpos + 2
      }));
    }
  }).join('tspan').attr('x', d => d.x).attr('y', 0).attr('dy', (d, i) => i * 12).text(d => d.string).styles((d, i) => {
    if (d.children) {
      return styles['labelSecondary'];
    } else {
      return styles[labelStyles[i]];
    }
  });
  node.selectAll('text').each(function () {
    const sel = select(this);
    sel.attr('transform', function (d) {
      const height = sel.node().getBBox().height;
      return `translate(0,${-height / 2})`;
    });
  });

  if (showLabelsOutline) {
    // NOTE: Adobe Illustrator does not support paint-order attr
    node.selectAll('text').styles(styles.labelOutline);
  }

  if (showLegend) {
    // svg width is adjusted automatically because of the "container:height" annotation in legendWidth visual option
    const legendLayer = select(svgNode).append('g').attr('id', 'legend').attr('transform', `translate(${width},${marginTop})`);
    const chartLegend = legend().legendWidth(legendWidth);

    if (mapping.color.value) {
      chartLegend.addColor(mapping.color.value, colorScale);
    }

    chartLegend.addSize(mapping.size.value ? mapping.size.value : 'Number of records', sizeScale, 'circle');
    legendLayer.call(chartLegend);
  }
}

const visualOptions$e = {
  marginTop: {
    type: 'number',
    label: 'Margin (top)',
    default: 10,
    group: 'artboard'
  },
  marginRight: {
    type: 'number',
    label: 'Margin (right)',
    default: 150,
    group: 'artboard'
  },
  marginBottom: {
    type: 'number',
    label: 'Margin (bottom)',
    default: 10,
    group: 'artboard'
  },
  marginLeft: {
    type: 'number',
    label: 'Margin (left)',
    default: 10,
    group: 'artboard'
  },
  maxDiameter: {
    type: 'number',
    label: 'Max diameter',
    default: 20,
    group: 'chart'
  },
  showLegend: {
    type: 'boolean',
    label: 'Show legend',
    default: false,
    group: 'artboard'
  },
  legendWidth: {
    type: 'number',
    label: 'Legend width',
    default: 200,
    group: 'artboard',
    disabled: {
      showLegend: false
    },
    container: 'width',
    containerCondition: {
      showLegend: true
    }
  },
  layout: {
    type: 'text',
    label: 'Layout algorithm',
    group: 'chart',
    options: ['Cluster Dendogram', 'Tree'],
    default: 'Tree'
  },
  sortBy: {
    type: 'text',
    label: 'Sort nodes by',
    group: 'chart',
    options: ['Size (descending)', 'Size (ascending)', 'Name', 'Original'],
    default: 'Size (descending)'
  },
  sizeOnlyLeaves: {
    type: 'boolean',
    label: 'Size only leaf nodes',
    default: true,
    group: 'chart'
  },
  colorScale: {
    type: 'colorScale',
    label: 'Color scale',
    dimension: 'color',
    default: {
      scaleType: 'ordinal',
      interpolator: 'interpolateSpectral'
    },
    group: 'color'
  },
  labelStyles: {
    type: 'text',
    label: 'Label',
    group: 'labels',
    options: [{
      label: 'Primary',
      value: 'labelPrimary'
    }, {
      label: 'Secondary',
      value: 'labelSecondary'
    }, {
      label: 'Italic',
      value: 'labelItalic'
    }],
    default: 'labelPrimary',
    repeatFor: 'label',
    repeatDefault: ['labelPrimary', 'labelSecondary', 'labelItalic']
  },
  showHierarchyLabels: {
    type: 'boolean',
    label: 'Show hierarchy labels',
    default: true,
    group: 'labels'
  },
  showLabelsOutline: {
    type: 'boolean',
    label: 'Show outline',
    default: false,
    group: 'labels'
  }
};

var dendrogram = {
  metadata: metadata$e,
  dimensions: dimensions$e,
  mapData: mapData$e,
  render: render$e,
  visualOptions: visualOptions$e,
  styles: styles$1
};

var img$s = "data:image/svg+xml,%3csvg id='rawgraphs-icons' xmlns='http://www.w3.org/2000/svg' width='56' height='56' viewBox='0 0 56 56'%3e %3cdefs%3e %3cstyle%3e .cls-1 %7b fill: %2395e5c0%3b %7d .cls-2 %7b fill: %2306c26c%3b %7d %3c/style%3e %3c/defs%3e %3cg id='secundary'%3e %3crect class='cls-1' x='34' y='20' width='8' height='4'/%3e %3crect class='cls-1' x='14' y='30' width='22' height='4'/%3e %3crect class='cls-1' x='22' y='35' width='10' height='4'/%3e %3crect class='cls-1' x='28' y='40' width='17' height='4'/%3e %3c/g%3e %3cg id='primary'%3e %3cpolygon class='cls-2' points='46.305 46.805 44.865 46.805 46.061 48 7.5 48 7.5 49 46.061 49 44.865 50.195 46.305 50.195 48 48.5 46.305 46.805'/%3e %3crect class='cls-2' x='8' y='10' width='10' height='4'/%3e %3crect class='cls-2' x='8' y='25' width='6' height='4'/%3e %3crect class='cls-2' x='18' y='15' width='18' height='4'/%3e %3crect class='cls-2' x='30' y='20' width='3' height='4'/%3e %3crect class='cls-2' x='33' y='35' width='7' height='4'/%3e %3c/g%3e%3c/svg%3e";

var img$t = "data:image/svg+xml,%3c%3fxml version='1.0' encoding='utf-8'%3f%3e%3c!-- Generator: Adobe Illustrator 25.1.0%2c SVG Export Plug-In . SVG Version: 6.00 Build 0) --%3e%3csvg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 320 160' style='enable-background:new 0 0 320 160%3b' xml:space='preserve'%3e%3cstyle type='text/css'%3e .st0%7bfill:white%3b%7d .st1%7bfill:none%3bstroke:black%3b%7d .st2%7bfont-family:'Helvetica'%3b%7d .st3%7bfont-size:10px%3b%7d .st4%7bfont-family:'ArialMT'%3b%7d .st5%7bfill:%23D5EE9F%3b%7d .st6%7bfill:none%3bstroke:%23CCCCCC%3b%7d .st7%7bfill:%239E0142%3b%7d%3c/style%3e%3crect id='background' y='0' class='st0' width='320' height='160'/%3e%3cpath class='st1' d='M10.5%2c146v-5.5h297v5.5'/%3e%3cline class='st1' x1='30.5' y1='140' x2='30.5' y2='146'/%3e%3ctext transform='matrix(1 0 0 1 19.377 156.1)' class='st2 st3'%3e1950%3c/text%3e%3cline class='st1' x1='69.5' y1='140' x2='69.5' y2='146'/%3e%3ctext transform='matrix(1 0 0 1 58.377 156.1)' class='st2 st3'%3e1960%3c/text%3e%3cline class='st1' x1='109.5' y1='140' x2='109.5' y2='146'/%3e%3ctext transform='matrix(1 0 0 1 98.377 156.1)' class='st2 st3'%3e1970%3c/text%3e%3cline class='st1' x1='149.5' y1='140' x2='149.5' y2='146'/%3e%3ctext transform='matrix(1 0 0 1 138.377 156.1)' class='st2 st3'%3e1980%3c/text%3e%3cline class='st1' x1='188.5' y1='140' x2='188.5' y2='146'/%3e%3ctext transform='matrix(1 0 0 1 177.377 156.1)' class='st2 st3'%3e1990%3c/text%3e%3cline class='st1' x1='228.5' y1='140' x2='228.5' y2='146'/%3e%3ctext transform='matrix(1 0 0 1 217.377 156.1)' class='st2 st3'%3e2000%3c/text%3e%3cline class='st1' x1='267.5' y1='140' x2='267.5' y2='146'/%3e%3ctext transform='matrix(1 0 0 1 256.377 156.1)' class='st2 st3'%3e2010%3c/text%3e%3cline class='st1' x1='307.5' y1='140' x2='307.5' y2='146'/%3e%3ctext transform='matrix(1 0 0 1 296.377 156.1)' class='st2 st3'%3e2020%3c/text%3e%3ctext transform='matrix(1 0 0 1 1.8893 14.1364)' class='st4 st3'%3eA%3c/text%3e%3crect x='79' y='5' class='st5' width='10' height='12.3'/%3e%3cline class='st6' x1='10' y1='5' x2='307' y2='5'/%3e%3ctext transform='matrix(1 0 0 1 1.9083 26.4091)' class='st4 st3'%3eB%3c/text%3e%3crect x='225' y='17.3' class='st7' width='28' height='12.3'/%3e%3cline class='st6' x1='10' y1='17.3' x2='307' y2='17.3'/%3e%3ctext transform='matrix(1 0 0 1 1.3566 38.6818)' class='st4 st3'%3eC%3c/text%3e%3crect x='22' y='29.5' class='st5' width='1' height='12.3'/%3e%3cline class='st6' x1='10' y1='29.5' x2='307' y2='29.5'/%3e%3ctext transform='matrix(1 0 0 1 1.3566 50.9545)' class='st4 st3'%3eD%3c/text%3e%3crect x='170' y='41.8' class='st7' width='27' height='12.3'/%3e%3crect x='103.5' y='41.8' class='st5' width='11' height='12.3'/%3e%3cline class='st6' x1='10' y1='41.8' x2='307' y2='41.8'/%3e%3ctext transform='matrix(1 0 0 1 1.9083 63.2273)' class='st4 st3'%3eE%3c/text%3e%3crect x='253' y='54.1' class='st5' width='34' height='12.3'/%3e%3cline class='st6' x1='10' y1='54.1' x2='307' y2='54.1'/%3e%3ctext transform='matrix(1 0 0 1 2.4698 75.5)' class='st4 st3'%3eF%3c/text%3e%3crect x='51' y='66.4' class='st7' width='28' height='12.3'/%3e%3cline class='st6' x1='10' y1='66.4' x2='307' y2='66.4'/%3e%3ctext transform='matrix(1 0 0 1 0.7999 87.7727)' class='st4 st3'%3eG%3c/text%3e%3crect x='117' y='78.6' class='st7' width='25' height='12.3'/%3e%3crect x='296.4' y='78.6' class='st5' width='10.6' height='12.3'/%3e%3cline class='st6' x1='10' y1='78.6' x2='307' y2='78.6'/%3e%3ctext transform='matrix(1 0 0 1 1.3566 100.0455)' class='st4 st3'%3eH%3c/text%3e%3crect x='89' y='90.9' class='st7' width='28' height='12.3'/%3e%3cline class='st6' x1='10' y1='90.9' x2='307' y2='90.9'/%3e%3ctext transform='matrix(1 0 0 1 5.7999 112.3182)' class='st4 st3'%3eI%3c/text%3e%3crect x='23' y='103.2' class='st7' width='28' height='12.3'/%3e%3cline class='st6' x1='10' y1='103.2' x2='307' y2='103.2'/%3e%3ctext transform='matrix(1 0 0 1 3.3785 124.5909)' class='st4 st3'%3eL%3c/text%3e%3crect x='198' y='115.5' class='st5' width='27' height='12.3'/%3e%3cline class='st6' x1='10' y1='115.5' x2='307' y2='115.5'/%3e%3ctext transform='matrix(1 0 0 1 0.2482 136.8636)' class='st4 st3'%3eM%3c/text%3e%3crect x='143' y='127.7' class='st5' width='27' height='12.3'/%3e%3cline class='st6' x1='10' y1='127.7' x2='307' y2='127.7'/%3e%3c/svg%3e";

const metadata$f = {
  name: 'Gantt chart',
  thumbnail: img$t,
  icon: img$s,
  categories: ['time series', 'correlations'],
  description: 'A Gantt chart is a type of bar chart, developed by Henry Gantt in the 1910s, that illustrates a project schedule. Gantt charts illustrate the start and finish dates of the terminal elements and summary elements of a project.',
  code: 'https://github.com/rawgraphs/rawgraphs-charts/tree/master/src/ganttChart',
  tutorial: 'https://rawgraphs.io/learning/how-to-make-a-gantt-chart/'
};

const dimensions$f = [{
  id: 'startDate',
  name: 'Start date',
  validTypes: ['number', 'date'],
  required: true
}, {
  id: 'endDate',
  name: 'End Date',
  validTypes: ['number', 'date'],
  required: true
}, {
  id: 'group',
  name: 'Groups',
  validTypes: ['string'],
  required: false
}, {
  id: 'color',
  name: 'Color',
  validTypes: ['string'],
  required: false
}];

const mapData$f = {
  startDate: 'get',
  endDate: 'get',
  group: 'get',
  color: 'get'
};

function render$f(svgNode, data, visualOptions, mapping, originalData, styles) {
  const {
    width,
    height,
    background,
    sortGroupsBy,
    showLegend,
    legendWidth,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    barPadding,
    colorScale,
    alignLabels
  } = visualOptions;
  const margin = {
    top: marginTop,
    right: marginRight,
    bottom: marginBottom,
    left: marginLeft
  };
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;

  if (mapping.startDate.dataType.type != mapping.endDate.dataType.type) {
    throw new Error('startDate and endDate must have the same data type');
  }

  const groups = rollups(data, v => {
    v.sort((a, b) => ascending(a.startDate, b.startDate));
    let levels = [],
        level = 0;
    v.forEach(function (item) {
      let l = 0;

      while (overlap(item, levels[l], mapping.startDate.dataType.type)) l++;

      if (!levels[l]) levels[l] = [];
      levels[l].push({
        level: l + level,
        ...item
      });
    });
    level++;
    return levels.flat();
  }, d => d.group && d.group.length ? d.group : null);
  groups.sort((a, b) => {
    if (!sortGroupsBy) return;

    if (sortGroupsBy === 'group') {
      return ascending(a[0], b[0]);
    } else {
      return d3[sortGroupsBy](a[1][0].startDate, b[1][0].startDate);
    }
  }); // x scale

  const xMin = min(data, d => d.startDate);
  const xMax = max(data, d => d.endDate);
  const x = mapping.startDate.dataType.type === 'date' ? scaleTime() : scaleLinear();
  x.domain([xMin, xMax]).rangeRound([0, chartWidth]).nice();
  const lines = sum(groups, g => max(g[1], d => d.level + 1));
  const heightScale = scaleBand().domain(range(lines)).range([0, chartHeight]).paddingInner(barPadding).paddingOuter(barPadding / 2).align(1);
  const lineHeight = heightScale.bandwidth();
  const lineStep = heightScale.step();

  const xAxis = g => {
    return g.attr('transform', `translate(0,${chartHeight})`).call(axisBottom(x));
  };

  select(svgNode).append('rect').attr('width', showLegend ? width + legendWidth : width).attr('height', height).attr('x', 0).attr('y', 0).attr('fill', background).attr('id', 'background');
  const svg = select(svgNode).append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')').attr('id', 'visualization');
  const axisLayer = svg.append('g').attr('id', 'axis');
  axisLayer.append('g').call(xAxis);
  let stack$1 = stack().keys(groups.map(d => d[0])).value((d, key) => {
    const a = d.filter(f => f[0] === key)[0];
    return max(a[1].map(c => c.level)) + 1;
  });
  const vizLayer = svg.append('g').attr('id', 'viz');
  const groupsG = vizLayer.selectAll('g').data(stack$1([groups])).join('g').attr('id', d => d.key).attr('transform', d => `translate(0,${d[0][0] * lineStep})`);
  groupsG.append('text').attr('x', d => alignLabels ? x(d[0].data[d.index][1][0].startDate) - 4 : -4).attr('y', lineStep / 2).attr('text-anchor', 'end').attr('dominant-baseline', 'middle').text(d => d.key).styles(styles.labelSecondary);
  groupsG.selectAll('rect').data((d, i) => d[0].data[d.index][1]).join('rect').attr('x', d => x(d.startDate)).attr('y', d => lineStep * d.level + (lineStep - lineHeight) / 2).attr('width', d => max([1, x(d.endDate) - x(d.startDate)])).attr('height', lineHeight).attr('fill', d => colorScale(d.color));
  groupsG.append('line').attr('x1', 0).attr('y1', 0).attr('x2', chartWidth).attr('y2', 0).styles(styles.axisLine);

  if (showLegend) {
    const legendLayer = select(svgNode).append('g').attr('id', 'legend').attr('transform', `translate(${width},${marginTop})`);
    const chartLegend = legend().legendWidth(legendWidth);

    if (mapping.color.value) {
      chartLegend.addColor(mapping.color.value, colorScale);
    }

    legendLayer.call(chartLegend);
  }
}

function overlap(item, g, type) {
  if (!g) return false;

  for (const i in g) {
    if (type === 'date') {
      // get time and compare it
      if (item.startDate.getTime() > g[i].startDate.getTime() && item.startDate.getTime() < g[i].endDate.getTime() || item.endDate.getTime() > g[i].startDate.getTime() && item.endDate.getTime() < g[i].endDate.getTime() || item.startDate.getTime() < g[i].startDate.getTime() && item.endDate.getTime() > g[i].endDate.getTime()) {
        return true;
      }
    } else if (type === 'number') {
      // if it's a number, just compare values
      if (item.startDate > g[i].startDate && item.startDate < g[i].endDate || item.endDate > g[i].startDate && item.endDate < g[i].endDate || item.startDate < g[i].startDate && item.endDate > g[i].endDate) {
        return true;
      }
    } else {
      throw new Error('startDate and endDate must be numbers or dates');
    }
  }

  return false;
}

const visualOptions$f = {
  marginTop: {
    type: 'number',
    label: 'Margin (top)',
    default: 50,
    group: 'artboard'
  },
  marginRight: {
    type: 'number',
    label: 'Margin (right)',
    default: 50,
    group: 'artboard'
  },
  marginBottom: {
    type: 'number',
    label: 'Margin (bottom)',
    default: 50,
    group: 'artboard'
  },
  marginLeft: {
    type: 'number',
    label: 'Margin (left)',
    default: 50,
    group: 'artboard'
  },
  showLegend: {
    type: 'boolean',
    label: 'Show legend',
    default: false,
    group: 'artboard'
  },
  legendWidth: {
    type: 'number',
    label: 'Legend width',
    default: 200,
    group: 'artboard',
    disabled: {
      showLegend: false
    },
    container: 'width',
    containerCondition: {
      showLegend: true
    }
  },
  sortGroupsBy: {
    type: 'text',
    label: 'Sort groups by',
    group: 'chart',
    options: [{
      label: 'Original',
      value: ''
    }, {
      label: 'Start date (ascending)',
      value: 'ascending'
    }, {
      label: 'Start date (descending)',
      value: 'descending'
    }, {
      label: 'Name',
      value: 'group'
    }],
    default: ''
  },
  barPadding: {
    type: 'number',
    label: 'Padding (%)',
    default: 0,
    group: 'chart',
    step: 0.1,
    min: 0,
    max: 1
  },
  colorScale: {
    type: 'colorScale',
    label: 'Color scale',
    dimension: 'color',
    default: {
      scaleType: 'ordinal',
      interpolator: 'interpolateSpectral'
    },
    group: 'colors'
  },
  alignLabels: {
    type: 'boolean',
    label: 'Labels position',
    default: false,
    group: 'labels'
  }
};

var ganttChart = {
  metadata: metadata$f,
  dimensions: dimensions$f,
  mapData: mapData$f,
  render: render$f,
  visualOptions: visualOptions$f,
  styles: styles$1
};

var img$u = "data:image/svg+xml,%3csvg id='rawgraphs-icons' xmlns='http://www.w3.org/2000/svg' width='56' height='56' viewBox='0 0 56 56'%3e %3cdefs%3e %3cstyle%3e .cls-1 %7b fill: %2395e5c0%3b %7d .cls-2 %7b fill: %2306c26c%3b %7d %3c/style%3e %3c/defs%3e %3cg id='secundary'%3e %3cpath class='cls-1' d='M25%2c19.79l-6.5-3.7143L12%2c19.79v7.42l6.5%2c3.7143L25%2c27.21ZM17%2c20a1%2c1%2c0%2c1%2c1%2c1-1A1%2c1%2c0%2c0%2c1%2c17%2c20Z'/%3e %3cpath class='cls-1' d='M9%2c29.5043V41.4957l2.5%2c1.4286L18%2c39.21V31.79l-6.5-3.7143ZM16%2c35a1%2c1%2c0%2c1%2c1-1%2c1A1%2c1%2c0%2c0%2c1%2c16%2c35Z'/%3e %3cpath class='cls-1' d='M26%2c43.79V47H39V43.79l-6.5-3.7143ZM34%2c43a1%2c1%2c0%2c1%2c1-1%2c1A1%2c1%2c0%2c0%2c1%2c34%2c43Z'/%3e %3c/g%3e %3cg id='primary'%3e %3cpolygon class='cls-2' points='46.305 46.805 44.865 46.805 46.061 48 8 48 8 9.939 9.195 11.135 9.195 9.695 7.5 8 5.805 9.695 5.805 11.135 7 9.939 7 49 46.061 49 44.865 50.195 46.305 50.195 48 48.5 46.305 46.805'/%3e %3cpath class='cls-2' d='M32%2c31.79l-6.5-3.7143L19%2c31.79v7.42l6.5%2c3.7143L32%2c39.21ZM21%2c33a1%2c1%2c0%2c1%2c1%2c1%2c1A1%2c1%2c0%2c0%2c1%2c21%2c33Zm2%2c6a1%2c1%2c0%2c1%2c1%2c1-1A1%2c1%2c0%2c0%2c1%2c23%2c39Zm3-5a1%2c1%2c0%2c1%2c1%2c1%2c1A1%2c1%2c0%2c0%2c1%2c26%2c34Zm2%2c6a1%2c1%2c0%2c1%2c1%2c1-1A1%2c1%2c0%2c0%2c1%2c28%2c40Z'/%3e %3cpath class='cls-2' d='M32.5%2c16.0757%2c26%2c19.79v7.42l6.5%2c3.7143L39%2c27.21V19.79ZM28%2c22a1%2c1%2c0%2c1%2c1%2c1-1A1%2c1%2c0%2c0%2c1%2c28%2c22Zm5%2c0a1%2c1%2c0%2c1%2c1%2c1-1A1%2c1%2c0%2c0%2c1%2c33%2c22Zm3%2c5a1%2c1%2c0%2c1%2c1%2c1-1A1%2c1%2c0%2c0%2c1%2c36%2c27Z'/%3e %3c/g%3e%3c/svg%3e";

var img$v = "data:image/svg+xml,%3csvg id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='320' height='160' viewBox='0 0 320 160'%3e %3cdefs%3e %3cstyle%3e .cls-1%2c .cls-19 %7b fill: none%3b %7d .cls-2 %7b clip-path: url(%23clip-path)%3b %7d .cls-3 %7b fill: %2369bda9%3b %7d .cls-3%2c .cls-4 %7b opacity: 0.25%3b %7d .cls-20%2c .cls-3%2c .cls-4%2c .cls-5%2c .cls-6 %7b isolation: isolate%3b %7d .cls-16%2c .cls-4%2c .cls-5%2c .cls-6 %7b fill: %239e0142%3b %7d .cls-5 %7b opacity: 0.5%3b %7d .cls-6 %7b opacity: 0.75%3b %7d .cls-7 %7b clip-path: url(%23clip-path-5)%3b %7d .cls-8 %7b clip-path: url(%23clip-path-7)%3b %7d .cls-9 %7b fill: %23f6cc86%3b %7d .cls-10 %7b fill: %23fedd8d%3b %7d .cls-11 %7b fill: %23e6a978%3b %7d .cls-12 %7b fill: %23cd7663%3b %7d .cls-13 %7b fill: %23de9871%3b %7d .cls-14 %7b fill: %23d6876a%3b %7d .cls-15 %7b fill: %23c4645d%3b %7d .cls-17 %7b fill: %23bb5256%3b %7d .cls-18 %7b fill: %23eeba7f%3b %7d .cls-19 %7b stroke: black%3b %7d .cls-20 %7b font-size: 10px%3b font-family: ArialMT%2c Arial%3b %7d %3c/style%3e %3cclipPath id='clip-path'%3e %3crect class='cls-1' y='211.00006' width='320' height='21.66667'/%3e %3c/clipPath%3e %3cclipPath id='clip-path-5'%3e %3crect class='cls-1' y='235.66692' width='320' height='21.66667'/%3e %3c/clipPath%3e %3cclipPath id='clip-path-7'%3e %3crect class='cls-1' x='20' y='1' width='300' height='140'/%3e %3c/clipPath%3e %3c/defs%3e %3cg%3e %3cg%3e %3cg class='cls-2'%3e %3cpath class='cls-3' d='M0%2c160.39739c15.99124%2c0%2c15.99124%2c123.4529%2c31.98248%2c123.4529S47.97371%2c189.02235%2c63.965%2c189.02235c16.035%2c0%2c16.035%2c93.1051%2c32.0701%2c93.1051%2c15.99123%2c0%2c15.99123-118.83865%2c31.98247-118.83865s15.99124-.06693%2c31.98248-.06693%2c15.99124%2c46.58451%2c31.98248%2c46.58451c16.035%2c0%2c16.035-14.0354%2c32.07009-14.0354%2c15.99124%2c0%2c15.99124%2c6.891%2c31.98246%2c6.891s15.99125-56.66193%2c31.98249-56.66193S304.00876%2c170.74812%2c320%2c170.74812v61.91861H0Z'/%3e %3c/g%3e %3cg class='cls-2'%3e %3cpath class='cls-4' d='M0%2c138.73073c15.99124%2c0%2c15.99124%2c123.45289%2c31.98248%2c123.45289S47.97371%2c167.35569%2c63.965%2c167.35569c16.035%2c0%2c16.035%2c93.10509%2c32.0701%2c93.10509%2c15.99123%2c0%2c15.99123-118.83865%2c31.98247-118.83865S144.00876%2c141.5552%2c160%2c141.5552s15.99124%2c46.58451%2c31.98248%2c46.58451c16.035%2c0%2c16.035-14.0354%2c32.07009-14.0354%2c15.99124%2c0%2c15.99124%2c6.891%2c31.98246%2c6.891s15.99125-56.66193%2c31.98249-56.66193S304.00876%2c149.08145%2c320%2c149.08145v61.91861H0Z'/%3e %3c/g%3e %3cg class='cls-2'%3e %3cpath class='cls-5' d='M0%2c117.06406c15.99124%2c0%2c15.99124%2c123.4529%2c31.98248%2c123.4529S47.97371%2c145.689%2c63.965%2c145.689c16.035%2c0%2c16.035%2c93.1051%2c32.0701%2c93.1051%2c15.99123%2c0%2c15.99123-118.83865%2c31.98247-118.83865s15.99124-.06693%2c31.98248-.06693%2c15.99124%2c46.5845%2c31.98248%2c46.5845c16.035%2c0%2c16.035-14.03539%2c32.07009-14.03539%2c15.99124%2c0%2c15.99124%2c6.891%2c31.98246%2c6.891s15.99125-56.66192%2c31.98249-56.66192S304.00876%2c127.41479%2c320%2c127.41479v61.9186H0Z'/%3e %3c/g%3e %3cg class='cls-2'%3e %3cpath class='cls-6' d='M0%2c95.39739c15.99124%2c0%2c15.99124%2c123.4529%2c31.98248%2c123.4529S47.97371%2c124.02235%2c63.965%2c124.02235c16.035%2c0%2c16.035%2c93.1051%2c32.0701%2c93.1051%2c15.99123%2c0%2c15.99123-118.83865%2c31.98247-118.83865S144.00876%2c98.22187%2c160%2c98.22187s15.99124%2c46.58451%2c31.98248%2c46.58451c16.035%2c0%2c16.035-14.0354%2c32.07009-14.0354%2c15.99124%2c0%2c15.99124%2c6.891%2c31.98246%2c6.891s15.99125-56.66192%2c31.98249-56.66192S304.00876%2c105.74812%2c320%2c105.74812v61.91861H0Z'/%3e %3c/g%3e %3c/g%3e %3cg%3e %3cg class='cls-7'%3e %3cpath class='cls-4' d='M0%2c153.53923c15.99124%2c0%2c15.99124%2c7.81562%2c31.98248%2c7.81562s15.99123%2c80.513%2c31.98247%2c80.513c16.035%2c0%2c16.035-40.4657%2c32.0701-40.4657%2c15.99123%2c0%2c15.99123%2c22.22969%2c31.98247%2c22.22969S144.00876%2c213.53575%2c160%2c213.53575s15.99124-54.05453%2c31.98248-54.05453c16.035%2c0%2c16.035%2c69.90757%2c32.07009%2c69.90757%2c15.99124%2c0%2c15.99124%2c33.73491%2c31.98246%2c33.73491s15.99125-49.05008%2c31.98249-49.05008S304.00876%2c149.00025%2c320%2c149.00025v86.66667H0Z'/%3e %3c/g%3e %3cg class='cls-7'%3e %3cpath class='cls-5' d='M0%2c131.87257c15.99124%2c0%2c15.99124%2c7.81562%2c31.98248%2c7.81562s15.99123%2c80.513%2c31.98247%2c80.513c16.035%2c0%2c16.035-40.4657%2c32.0701-40.4657%2c15.99123%2c0%2c15.99123%2c22.2297%2c31.98247%2c22.2297S144.00876%2c191.86908%2c160%2c191.86908s15.99124-54.05452%2c31.98248-54.05452c16.035%2c0%2c16.035%2c69.90757%2c32.07009%2c69.90757%2c15.99124%2c0%2c15.99124%2c33.7349%2c31.98246%2c33.7349S272.02628%2c192.407%2c288.01752%2c192.407%2c304.00876%2c127.33359%2c320%2c127.33359v86.66666H0Z'/%3e %3c/g%3e %3c/g%3e %3c/g%3e %3cg%3e %3cg class='cls-8'%3e %3cg%3e %3cpath class='cls-9' d='M41.56922%2c8l13.8564%2c8V32l-13.8564%2c8L27.71281%2c32V16Z'/%3e %3cpath class='cls-10' d='M55.42562%2c80%2c69.282%2c88v16l-13.85641%2c8-13.8564-8V88Z'/%3e %3cpath class='cls-10' d='M69.282%2c8l13.8564%2c8V32L69.282%2c40%2c55.42563%2c32V16Z'/%3e %3cpath class='cls-10' d='M69.282%2c104l13.8564%2c8v16L69.282%2c136l-13.85641-8V112Z'/%3e %3cpath class='cls-11' d='M83.13844%2c80l13.8564%2c8v16l-13.8564%2c8L69.282%2c104V88Z'/%3e %3cpath class='cls-12' d='M96.99484%2c56l13.85641%2c8V80L96.99484%2c88l-13.8564-8V64Z'/%3e %3cpath class='cls-10' d='M96.99484%2c104l13.85641%2c8v16l-13.85641%2c8-13.8564-8V112Z'/%3e %3cpath class='cls-13' d='M96.99484%2c8l13.85641%2c8V32L96.99484%2c40l-13.8564-8V16Z'/%3e %3cpath class='cls-10' d='M83.13844%2c32l13.8564%2c8V56l-13.8564%2c8L69.282%2c56V40Z'/%3e %3cpath class='cls-13' d='M110.85125%2c32l13.85641%2c8V56l-13.85641%2c8L96.99484%2c56V40Z'/%3e %3cpath class='cls-10' d='M110.85125%2c80l13.85641%2c8v16l-13.85641%2c8-13.85641-8V88Z'/%3e %3cpath class='cls-12' d='M124.70766%2c56l13.8564%2c8V80l-13.8564%2c8-13.85641-8V64Z'/%3e %3cpath class='cls-14' d='M124.70766%2c8l13.8564%2c8V32l-13.8564%2c8-13.85641-8V16Z'/%3e %3cpath class='cls-15' d='M138.56407%2c80l13.85641%2c8v16l-13.85641%2c8-13.8564-8V88Z'/%3e %3cpath class='cls-16' d='M138.56407%2c32l13.85641%2c8V56l-13.85641%2c8-13.8564-8V40Z'/%3e %3cpath class='cls-17' d='M152.42047%2c56l13.85641%2c8V80l-13.85641%2c8-13.85641-8V64Z'/%3e %3cpath class='cls-15' d='M166.27687%2c32l13.85641%2c8V56l-13.85641%2c8-13.85641-8V40Z'/%3e %3cpath class='cls-15' d='M166.27687%2c80l13.85641%2c8v16l-13.85641%2c8-13.85641-8V88Z'/%3e %3cpath class='cls-10' d='M152.42047%2c8l13.85641%2c8V32l-13.85641%2c8-13.85641-8V16Z'/%3e %3cpath class='cls-10' d='M152.42047%2c104l13.85641%2c8v16l-13.85641%2c8-13.85641-8V112Z'/%3e %3cpath class='cls-17' d='M180.13329%2c56l13.8564%2c8V80l-13.8564%2c8-13.85641-8V64Z'/%3e %3cpath class='cls-11' d='M180.13329%2c8l13.8564%2c8V32l-13.8564%2c8-13.85641-8V16Z'/%3e %3cpath class='cls-18' d='M180.13329%2c104l13.8564%2c8v16l-13.8564%2c8-13.85641-8V112Z'/%3e %3cpath class='cls-12' d='M193.98969%2c32l13.8564%2c8V56l-13.8564%2c8-13.85641-8V40Z'/%3e %3cpath class='cls-12' d='M193.98969%2c80l13.8564%2c8v16l-13.8564%2c8-13.85641-8V88Z'/%3e %3cpath class='cls-9' d='M193.98969-16l13.8564%2c8V8l-13.8564%2c8L180.13328%2c8V-8Z'/%3e %3cpath class='cls-11' d='M207.8461%2c8l13.85641%2c8V32L207.8461%2c40l-13.85641-8V16Z'/%3e %3cpath class='cls-14' d='M207.8461%2c56l13.85641%2c8V80L207.8461%2c88l-13.85641-8V64Z'/%3e %3cpath class='cls-12' d='M221.7025%2c32l13.85641%2c8V56L221.7025%2c64l-13.85641-8V40Z'/%3e %3cpath class='cls-12' d='M221.7025%2c80l13.85641%2c8v16l-13.85641%2c8-13.85641-8V88Z'/%3e %3cpath class='cls-15' d='M235.55891%2c8l13.85641%2c8V32l-13.85641%2c8-13.8564-8V16Z'/%3e %3cpath class='cls-17' d='M235.55891%2c56l13.85641%2c8V80l-13.85641%2c8-13.8564-8V64Z'/%3e %3cpath class='cls-11' d='M249.41531%2c32l13.85641%2c8V56l-13.85641%2c8-13.8564-8V40Z'/%3e %3cpath class='cls-10' d='M249.41531%2c80l13.85641%2c8v16l-13.85641%2c8-13.8564-8V88Z'/%3e %3cpath class='cls-10' d='M235.55891%2c104l13.85641%2c8v16l-13.85641%2c8-13.8564-8V112Z'/%3e %3cpath class='cls-14' d='M263.27173%2c56l13.8564%2c8V80l-13.8564%2c8-13.85641-8V64Z'/%3e %3cpath class='cls-10' d='M263.27173%2c104l13.8564%2c8v16l-13.8564%2c8-13.85641-8V112Z'/%3e %3cpath class='cls-18' d='M263.27173%2c8l13.8564%2c8V32l-13.8564%2c8-13.85641-8V16Z'/%3e %3cpath class='cls-17' d='M277.12814%2c32l13.85641%2c8V56l-13.85641%2c8-13.8564-8V40Z'/%3e %3cpath class='cls-9' d='M277.12814%2c80l13.85641%2c8v16l-13.85641%2c8-13.8564-8V88Z'/%3e %3cpath class='cls-10' d='M290.98453%2c8l13.8564%2c8V32l-13.8564%2c8-13.85641-8V16Z'/%3e %3cpath class='cls-14' d='M290.98453%2c56l13.8564%2c8V80l-13.8564%2c8-13.85641-8V64Z'/%3e %3cpath class='cls-18' d='M304.84094%2c32l13.85641%2c8V56l-13.85641%2c8-13.8564-8V40Z'/%3e %3cpath class='cls-10' d='M332.55374%2c32l13.85641%2c8V56l-13.85641%2c8-13.8564-8V40Z'/%3e %3c/g%3e %3c/g%3e %3ccircle cx='38.32304' cy='21.59011' r='1'/%3e %3ccircle cx='52.49576' cy='23.40932' r='1'/%3e %3ccircle cx='60.44576' cy='83.39714' r='1'/%3e %3ccircle cx='65.61005' cy='31.1316' r='1'/%3e %3ccircle cx='74.60188' cy='111.85838' r='1'/%3e %3ccircle cx='77.76858' cy='90.94259' r='1'/%3e %3ccircle cx='86.61999' cy='74.25496' r='1'/%3e %3ccircle cx='86.6712' cy='83.70636' r='1'/%3e %3ccircle cx='87.42301' cy='109.35522' r='1'/%3e %3ccircle cx='88.92403' cy='24.47722' r='1'/%3e %3ccircle cx='90.39632' cy='66.83188' r='1'/%3e %3ccircle cx='91.98116' cy='42.52938' r='1'/%3e %3ccircle cx='92.47073' cy='25.87473' r='1'/%3e %3ccircle cx='92.61495' cy='88.46284' r='1'/%3e %3ccircle cx='93.02405' cy='94.83081' r='1'/%3e %3ccircle cx='94.22984' cy='67.54187' r='1'/%3e %3ccircle cx='96.94691' cy='58.4642' r='1'/%3e %3ccircle cx='100.42859' cy='82.48258' r='1'/%3e %3ccircle cx='102.52311' cy='35.11887' r='1'/%3e %3ccircle cx='103.24899' cy='38.21585' r='1'/%3e %3ccircle cx='103.36072' cy='75.21193' r='1'/%3e %3ccircle cx='103.78277' cy='60.32384' r='1'/%3e %3ccircle cx='105.33926' cy='32.87811' r='1'/%3e %3ccircle cx='107.0835' cy='91.84366' r='1'/%3e %3ccircle cx='108.5004' cy='21.95532' r='1'/%3e %3ccircle cx='113.01394' cy='73.88742' r='1'/%3e %3ccircle cx='113.41276' cy='19.67751' r='1'/%3e %3ccircle cx='114.19029' cy='45.92928' r='1'/%3e %3ccircle cx='118.76965' cy='23.94542' r='1'/%3e %3ccircle cx='119.43156' cy='60.12417' r='1'/%3e %3ccircle cx='119.77742' cy='25.44837' r='1'/%3e %3ccircle cx='121.20637' cy='57.13057' r='1'/%3e %3ccircle cx='123.49448' cy='36.78326' r='1'/%3e %3ccircle cx='123.69561' cy='46.00414' r='1'/%3e %3ccircle cx='123.99655' cy='49.204' r='1'/%3e %3ccircle cx='124.6083' cy='36.1407' r='1'/%3e %3ccircle cx='126.08316' cy='76.35784' r='1'/%3e %3ccircle cx='126.22024' cy='98.07559' r='1'/%3e %3ccircle cx='130.09554' cy='100.19208' r='1'/%3e %3ccircle cx='130.87027' cy='90.20223' r='1'/%3e %3ccircle cx='131.0865' cy='66.85661' r='1'/%3e %3ccircle cx='131.21321' cy='38.97204' r='1'/%3e %3ccircle cx='131.93437' cy='62.47405' r='1'/%3e %3ccircle cx='132.31859' cy='42.89193' r='1'/%3e %3ccircle cx='132.32964' cy='49.67204' r='1'/%3e %3ccircle cx='133.2731' cy='54.61587' r='1'/%3e %3ccircle cx='133.77255' cy='90.07927' r='1'/%3e %3ccircle cx='133.80344' cy='32.68693' r='1'/%3e %3ccircle cx='133.9249' cy='101.40845' r='1'/%3e %3ccircle cx='134.72356' cy='106.09485' r='1'/%3e %3ccircle cx='135.37085' cy='64.2074' r='1'/%3e %3ccircle cx='136.16492' cy='40.41228' r='1'/%3e %3ccircle cx='136.40849' cy='61.49956' r='1'/%3e %3ccircle cx='136.68027' cy='86.60569' r='1'/%3e %3ccircle cx='136.87006' cy='49.71107' r='1'/%3e %3ccircle cx='137.74294' cy='80.37561' r='1'/%3e %3ccircle cx='140.3351' cy='97.18262' r='1'/%3e %3ccircle cx='140.87508' cy='50.70391' r='1'/%3e %3ccircle cx='141.57964' cy='48.53189' r='1'/%3e %3ccircle cx='142.03073' cy='47.16108' r='1'/%3e %3ccircle cx='144.50058' cy='51.84983' r='1'/%3e %3ccircle cx='145.42189' cy='77.10619' r='1'/%3e %3ccircle cx='146.08997' cy='61.58826' r='1'/%3e %3ccircle cx='146.94292' cy='82.83745' r='1'/%3e %3ccircle cx='147.34398' cy='63.22549' r='1'/%3e %3ccircle cx='149.25877' cy='62.20906' r='1'/%3e %3ccircle cx='150.77028' cy='62.8127' r='1'/%3e %3ccircle cx='151.98093' cy='42.36312' r='1'/%3e %3ccircle cx='152.823' cy='69.39218' r='1'/%3e %3ccircle cx='153.22781' cy='50.84964' r='1'/%3e %3ccircle cx='154.60042' cy='105.42798' r='1'/%3e %3ccircle cx='154.77328' cy='57.07066' r='1'/%3e %3ccircle cx='154.81825' cy='12.60605' r='1'/%3e %3ccircle cx='157.89113' cy='101.19066' r='1'/%3e %3ccircle cx='160.114' cy='87.40966' r='1'/%3e %3ccircle cx='161.47189' cy='61.61201' r='1'/%3e %3ccircle cx='161.71721' cy='39.96188' r='1'/%3e %3ccircle cx='165.65215' cy='77.71542' r='1'/%3e %3ccircle cx='165.72305' cy='121.53084' r='1'/%3e %3ccircle cx='166.34642' cy='77.38549' r='1'/%3e %3ccircle cx='166.9825' cy='52.1261' r='1'/%3e %3ccircle cx='167.19795' cy='52.6883' r='1'/%3e %3ccircle cx='168.95061' cy='67.56242' r='1'/%3e %3ccircle cx='169.14148' cy='35.49652' r='1'/%3e %3ccircle cx='169.7359' cy='87.85641' r='1'/%3e %3ccircle cx='169.78708' cy='24.64887' r='1'/%3e %3ccircle cx='170.70462' cy='87.20129' r='1'/%3e %3ccircle cx='173.07762' cy='89.27888' r='1'/%3e %3ccircle cx='174.33919' cy='24.05409' r='1'/%3e %3ccircle cx='174.64963' cy='73.96477' r='1'/%3e %3ccircle cx='174.7056' cy='49.59632' r='1'/%3e %3ccircle cx='174.87241' cy='78.03171' r='1'/%3e %3ccircle cx='175.52103' cy='58.93037' r='1'/%3e %3ccircle cx='175.70824' cy='68.96045' r='1'/%3e %3ccircle cx='176.99036' cy='103.52292' r='1'/%3e %3ccircle cx='177.54295' cy='94.58658' r='1'/%3e %3ccircle cx='178.91647' cy='84.58635' r='1'/%3e %3ccircle cx='179.25645' cy='71.96732' r='1'/%3e %3ccircle cx='179.97984' cy='31.36624' r='1'/%3e %3ccircle cx='181.87665' cy='14.14998' r='1'/%3e %3ccircle cx='182.87769' cy='118.43027' r='1'/%3e %3ccircle cx='186.50861' cy='113.32676' r='1'/%3e %3ccircle cx='186.8208' cy='54.89283' r='1'/%3e %3ccircle cx='187.77008' cy='44.21973' r='1'/%3e %3ccircle cx='188.59694' cy='84.49614' r='1'/%3e %3ccircle cx='188.82339' cy='12.5896' r='1'/%3e %3ccircle cx='189.82109' cy='92.87805' r='1'/%3e %3ccircle cx='189.82338' cy='41.45876' r='1'/%3e %3ccircle cx='191.26877' cy='81.20064' r='1'/%3e %3ccircle cx='191.78523' r='1'/%3e %3ccircle cx='192.60437' cy='113.95029' r='1'/%3e %3ccircle cx='193.30939' cy='78.82208' r='1'/%3e %3ccircle cx='193.55406' cy='49.28883' r='1'/%3e %3ccircle cx='196.43811' cy='37.29371' r='1'/%3e %3ccircle cx='196.99081' cy='107.28347' r='1'/%3e %3ccircle cx='197.70358' cy='16.64383' r='1'/%3e %3ccircle cx='201.13907' cy='48.16805' r='1'/%3e %3ccircle cx='201.74266' cy='90.48852' r='1'/%3e %3ccircle cx='204.56349' cy='91.96473' r='1'/%3e %3ccircle cx='204.94' cy='62.8555' r='1'/%3e %3ccircle cx='205.54945' cy='42.53102' r='1'/%3e %3ccircle cx='206.48604' cy='85.98101' r='1'/%3e %3ccircle cx='206.95169' cy='37.81148' r='1'/%3e %3ccircle cx='206.97296' cy='94.87657' r='1'/%3e %3ccircle cx='207.34442' cy='93.82526' r='1'/%3e %3ccircle cx='207.97401' cy='50.26892' r='1'/%3e %3ccircle cx='210.34674' cy='93.73812' r='1'/%3e %3ccircle cx='211.01447' cy='15.12615' r='1'/%3e %3ccircle cx='211.21385' cy='60.4245' r='1'/%3e %3ccircle cx='211.36311' cy='29.83943' r='1'/%3e %3ccircle cx='214.50754' cy='98.21217' r='1'/%3e %3ccircle cx='214.65407' cy='70.84876' r='1'/%3e %3ccircle cx='215.18466' cy='81.12201' r='1'/%3e %3ccircle cx='216.43739' cy='35.68865' r='1'/%3e %3ccircle cx='216.47025' cy='56.91173' r='1'/%3e %3ccircle cx='217.02846' cy='67.11412' r='1'/%3e %3ccircle cx='217.42155' cy='41.28229' r='1'/%3e %3ccircle cx='219.084' cy='59.86183' r='1'/%3e %3ccircle cx='220.30133' cy='87.2547' r='1'/%3e %3ccircle cx='221.41441' cy='90.66864' r='1'/%3e %3ccircle cx='222.07625' cy='32.90704' r='1'/%3e %3ccircle cx='224.03835' cy='38.66934' r='1'/%3e %3ccircle cx='225.72844' cy='89.99196' r='1'/%3e %3ccircle cx='227.83069' cy='51.31975' r='1'/%3e %3ccircle cx='228.17136' cy='90.39344' r='1'/%3e %3ccircle cx='230.02266' cy='35.07605' r='1'/%3e %3ccircle cx='232.414' cy='81.09338' r='1'/%3e %3ccircle cx='234.08897' cy='98.90989' r='1'/%3e %3ccircle cx='235.07846' cy='32.54391' r='1'/%3e %3ccircle cx='235.29201' cy='72.77258' r='1'/%3e %3ccircle cx='237.09044' cy='28.48392' r='1'/%3e %3ccircle cx='237.68578' cy='43.5965' r='1'/%3e %3ccircle cx='238.19859' cy='35.17629' r='1'/%3e %3ccircle cx='238.4971' cy='85.15779' r='1'/%3e %3ccircle cx='239.32925' cy='81.05579' r='1'/%3e %3ccircle cx='239.52365' cy='72.70513' r='1'/%3e %3ccircle cx='240.0152' cy='23.24623' r='1'/%3e %3ccircle cx='241.3036' cy='91.93377' r='1'/%3e %3ccircle cx='241.32759' cy='63.01525' r='1'/%3e %3ccircle cx='241.49347' cy='77.62574' r='1'/%3e %3ccircle cx='241.69844' cy='67.28675' r='1'/%3e %3ccircle cx='243.40215' cy='75.10258' r='1'/%3e %3ccircle cx='244.67767' cy='28.65452' r='1'/%3e %3ccircle cx='244.71338' cy='111.62005' r='1'/%3e %3ccircle cx='249.21855' cy='31.44456' r='1'/%3e %3ccircle cx='250.4653' cy='36.55717' r='1'/%3e %3ccircle cx='251.43118' cy='36.06714' r='1'/%3e %3ccircle cx='255.25816' cy='60.1146' r='1'/%3e %3ccircle cx='259.49341' cy='61.9194' r='1'/%3e %3ccircle cx='260.64539' cy='70.75118' r='1'/%3e %3ccircle cx='261.1203' cy='66.2985' r='1'/%3e %3ccircle cx='263.62469' cy='108.00381' r='1'/%3e %3ccircle cx='266.69278' cy='33.42341' r='1'/%3e %3ccircle cx='268.05728' cy='38.05266' r='1'/%3e %3ccircle cx='268.12283' cy='75.59389' r='1'/%3e %3ccircle cx='268.42709' cy='14.44066' r='1'/%3e %3ccircle cx='269.60773' cy='60.48765' r='1'/%3e %3ccircle cx='270.6351' cy='50.92056' r='1'/%3e %3ccircle cx='272.01401' cy='91.03019' r='1'/%3e %3ccircle cx='273.73779' cy='76.68768' r='1'/%3e %3ccircle cx='275.45755' cy='53.92678' r='1'/%3e %3ccircle cx='276.69852' cy='28.57115' r='1'/%3e %3ccircle cx='277.9133' cy='49.51331' r='1'/%3e %3ccircle cx='278.15622' cy='26.34691' r='1'/%3e %3ccircle cx='279.41553' cy='87.46078' r='1'/%3e %3ccircle cx='281.14722' cy='53.95106' r='1'/%3e %3ccircle cx='281.36905' cy='39.35709' r='1'/%3e %3ccircle cx='282.95462' cy='69.15512' r='1'/%3e %3ccircle cx='283.33459' cy='58.45011' r='1'/%3e %3ccircle cx='288.10764' cy='63.43238' r='1'/%3e %3ccircle cx='289.0979' cy='41.32912' r='1'/%3e %3ccircle cx='290.58533' cy='39.29733' r='1'/%3e %3ccircle cx='291.59796' cy='65.10077' r='1'/%3e %3ccircle cx='295.14908' cy='79.89216' r='1'/%3e %3ccircle cx='296.42517' cy='56.1131' r='1'/%3e %3ccircle cx='296.88855' cy='60.54775' r='1'/%3e %3ccircle cx='298.17368' cy='52.00466' r='1'/%3e %3ccircle cx='302.94003' cy='65.00423' r='1'/%3e %3ccircle cx='305.71429' cy='59.70079' r='1'/%3e %3ccircle cx='320' cy='53.3843' r='1'/%3e %3cg%3e %3cpath class='cls-19' d='M14%2c140.5h6.5V.5H14'/%3e %3cg%3e %3cline class='cls-19' x1='20' y1='140.5' x2='14' y2='140.5'/%3e %3ctext class='cls-20' transform='translate(5.43848 143.69998)'%3e0%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-19' x1='20' y1='123.68075' x2='14' y2='123.68075'/%3e %3ctext class='cls-20' transform='translate(-0.12305 126.88074)'%3e10%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-19' x1='20' y1='106.86152' x2='14' y2='106.86152'/%3e %3ctext class='cls-20' transform='translate(-0.12305 110.06152)'%3e20%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-19' x1='20' y1='90.04227' x2='14' y2='90.04227'/%3e %3ctext class='cls-20' transform='translate(-0.12305 93.24228)'%3e30%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-19' x1='20' y1='73.22304' x2='14' y2='73.22304'/%3e %3ctext class='cls-20' transform='translate(-0.12305 76.42303)'%3e40%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-19' x1='20' y1='56.40379' x2='14' y2='56.40379'/%3e %3ctext class='cls-20' transform='translate(-0.12305 59.60379)'%3e50%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-19' x1='20' y1='39.58455' x2='14' y2='39.58455'/%3e %3ctext class='cls-20' transform='translate(-0.12305 42.78455)'%3e60%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-19' x1='20' y1='22.76531' x2='14' y2='22.76531'/%3e %3ctext class='cls-20' transform='translate(-0.12305 25.9653)'%3e70%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-19' x1='20' y1='5.94607' x2='14' y2='5.94607'/%3e %3ctext class='cls-20' transform='translate(-0.12305 9.14609)'%3e80%3c/text%3e %3c/g%3e %3c/g%3e %3cg%3e %3cpath class='cls-19' d='M20.5%2c146v-5.5h300V146'/%3e %3cg%3e %3cline class='cls-19' x1='20.5' y1='140' x2='20.5' y2='146'/%3e %3ctext class='cls-20' transform='translate(17.71924 156.10001)'%3e0%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-19' x1='57.5048' y1='140' x2='57.5048' y2='146'/%3e %3ctext class='cls-20' transform='translate(51.94324 156.10001)'%3e10%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-19' x1='94.50961' y1='140' x2='94.50961' y2='146'/%3e %3ctext class='cls-20' transform='translate(88.94812 156.10001)'%3e20%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-19' x1='131.5144' y1='140' x2='131.5144' y2='146'/%3e %3ctext class='cls-20' transform='translate(125.95288 156.10001)'%3e30%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-19' x1='168.51921' y1='140' x2='168.51921' y2='146'/%3e %3ctext class='cls-20' transform='translate(162.95764 156.10001)'%3e40%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-19' x1='205.524' y1='140' x2='205.524' y2='146'/%3e %3ctext class='cls-20' transform='translate(199.96252 156.10001)'%3e50%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-19' x1='242.52881' y1='140' x2='242.52881' y2='146'/%3e %3ctext class='cls-20' transform='translate(236.96729 156.10001)'%3e60%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-19' x1='279.5336' y1='140' x2='279.5336' y2='146'/%3e %3ctext class='cls-20' transform='translate(273.97205 156.10001)'%3e70%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-19' x1='316.53842' y1='140' x2='316.53842' y2='146'/%3e %3ctext class='cls-20' transform='translate(310.97693 156.10001)'%3e80%3c/text%3e %3c/g%3e %3c/g%3e %3c/g%3e%3c/svg%3e";

const metadata$g = {
  name: 'Hexagonal binning',
  id: 'rawgraphs.hexagonalbinning',
  thumbnail: img$v,
  icon: img$u,
  categories: ['correlations', 'distributions'],
  description: 'Hexagonal Binning is a way to manage the problem of having too many points that start to overlap. Hexagonal binning plots density, rather than points. Points are binned into gridded hexagons and distribution (the number of points per hexagon) is displayed using either the color or the area of the hexagons.',
  code: 'https://github.com/rawgraphs/rawgraphs-charts/tree/master/src/hexagonalBinning',
  tutorial: 'https://rawgraphs.io/learning/how-to-make-an-hexagonal-binning/'
};

const dimensions$g = [{
  id: 'x',
  name: 'X Axis',
  validTypes: ['number', 'date'],
  required: true
}, {
  id: 'y',
  name: 'Y Axis',
  validTypes: ['number', 'date'],
  required: true
}];

const mapData$g = {
  x: 'get',
  y: 'get'
};

function colorDomain$1(data, mapping, visualOptions) {
  const {
    width,
    height,
    diameter,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    xOrigin,
    yOrigin
  } = visualOptions;
  const margin = {
    top: marginTop,
    right: marginRight,
    bottom: marginBottom,
    left: marginLeft
  };
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;

  if (!data) {
    return {
      domain: [],
      type: 'number'
    };
  } // x scale


  const xDomain = xOrigin ? [0, max(data, d => d.x)] : extent(data, d => d.x);
  const x = mapping.x.dataType === 'date' ? scaleTime() : scaleLinear();
  x.domain(xDomain).rangeRound([0, chartWidth]).nice(); // y scale

  const yDomain = yOrigin ? [0, max(data, d => d.y)] : extent(data, d => d.y);
  const y = mapping.y.dataType === 'date' ? scaleTime() : scaleLinear();
  y.domain(yDomain).rangeRound([chartHeight, 0]).nice();
  const hexbin$1 = hexbin().x(d => x(d.x)).y(d => y(d.y)).radius(diameter / 2).extent([[margin.left, margin.top], [chartWidth, chartHeight]]);
  const bins = hexbin$1(data);
  const domain = bins.map(d => d.length);
  return {
    domain,
    type: 'number'
  };
}
function render$g(svgNode, data, visualOptions, mapping, originalData, styles) {
  const {
    width,
    height,
    background,
    xOrigin,
    yOrigin,
    diameter,
    weightSize,
    showPoints,
    dotsDiameter,
    showLegend,
    legendWidth,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    colorScale,
    showCountLabels,
    showLabelsOutline,
    autoHideLabels
  } = visualOptions;
  const margin = {
    top: marginTop,
    right: marginRight,
    bottom: marginBottom,
    left: marginLeft
  };
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom; // x scale

  const xDomain = xOrigin ? [0, max(data, d => d.x)] : extent(data, d => d.x);
  const x = mapping.x.dataType.type === 'date' ? scaleTime() : scaleLinear();
  x.domain(xDomain).rangeRound([0, chartWidth]).nice(); // y scale

  const yDomain = yOrigin ? [0, max(data, d => d.y)] : extent(data, d => d.y);
  const y = mapping.y.dataType.type === 'date' ? scaleTime() : scaleLinear();
  y.domain(yDomain).rangeRound([chartHeight, 0]).nice();

  const xAxis = g => {
    return g.attr('transform', `translate(0,${chartHeight})`).call(axisBottom(x)).call(g => g.append('text').attr('x', chartWidth).attr('dy', -5).attr('text-anchor', 'end').text(mapping['x'].value).styles(styles.axisLabel));
  };

  const yAxis = g => {
    return g.call(axisLeft(y)).call(g => g.append('text').attr('x', 4).attr('text-anchor', 'start').attr('dominant-baseline', 'hanging').text(mapping['y'].value).styles(styles.axisLabel));
  };

  select(svgNode).append('rect').attr('width', showLegend ? width + legendWidth : width).attr('height', height).attr('x', 0).attr('y', 0).attr('fill', background).attr('id', 'background');
  const svg = select(svgNode).append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')').attr('id', 'visualization');
  const axisLayer = svg.append('g').attr('id', 'axis');
  axisLayer.append('g').call(xAxis);
  axisLayer.append('g').call(yAxis);
  const vizLayer = svg.append('g').attr('id', 'viz');
  const hexbin$1 = hexbin().x(d => x(d.x)).y(d => y(d.y)).radius(diameter / 2).extent([[margin.left, margin.top], [chartWidth, chartHeight]]);
  const bins = hexbin$1(data);
  const size = scaleSqrt().domain([0, max(bins, d => d.length)]).rangeRound([weightSize ? 0 : diameter / 2, diameter / 2]);
  const hex = vizLayer.selectAll('g').data(bins).join('g');
  hex.append('path').attr('d', d => hexbin$1.hexagon(size(d.length))).attr('transform', d => `translate(${d.x},${d.y})`).attr('fill', d => colorScale(d.length)).attr('stroke', 'white');

  if (showPoints) {
    hex.selectAll('circle').data(d => d).join('circle').attr('cx', d => x(d.x)).attr('cy', d => y(d.y)).attr('fill', 'black').attr('r', dotsDiameter / 2);
  }

  if (showCountLabels) {
    hex.append('text').attr('text-anchor', 'middle').attr('dominant-baseline', 'middle').attr('x', d => d.x).attr('y', d => d.y).text(d => d.length).styles(styles.labelSecondary);
  }

  if (showLabelsOutline) {
    // NOTE: Adobe Illustrator does not support paint-order attr
    hex.selectAll('text').styles(styles.labelOutline);
  }

  if (autoHideLabels) {
    labelsOcclusion(hex.selectAll('text'), d => d.length);
  }

  if (showLegend) {
    const legendLayer = select(svgNode).append('g').attr('id', 'legend').attr('transform', `translate(${width},${marginTop})`);
    const chartLegend = legend().legendWidth(legendWidth);

    if (colorScale.domain().length) {
      chartLegend.addColor('count', colorScale);
    }

    legendLayer.call(chartLegend);
  }
}

const visualOptions$g = {
  marginTop: {
    type: 'number',
    label: 'Margin (top)',
    default: 50,
    group: 'artboard'
  },
  marginRight: {
    type: 'number',
    label: 'Margin (right)',
    default: 50,
    group: 'artboard'
  },
  marginBottom: {
    type: 'number',
    label: 'Margin (bottom)',
    default: 50,
    group: 'artboard'
  },
  marginLeft: {
    type: 'number',
    label: 'Margin (left)',
    default: 50,
    group: 'artboard'
  },
  showLegend: {
    type: 'boolean',
    label: 'Show legend',
    default: false,
    group: 'artboard'
  },
  legendWidth: {
    type: 'number',
    label: 'Legend width',
    default: 200,
    group: 'artboard',
    disabled: {
      showLegend: false
    },
    container: 'width',
    containerCondition: {
      showLegend: true
    },
    requiredDimensions: ['x', 'y']
  },
  xOrigin: {
    type: 'boolean',
    label: 'Set X origin to 0',
    default: false,
    group: 'chart',
    requiredDimensions: ['x', 'y']
  },
  yOrigin: {
    type: 'boolean',
    label: 'Set Y origin to 0',
    default: false,
    group: 'chart',
    requiredDimensions: ['x', 'y']
  },
  diameter: {
    type: 'number',
    label: 'Bin diameter',
    default: 8,
    step: 1,
    group: 'chart',
    requiredDimensions: ['x', 'y']
  },
  weightSize: {
    type: 'boolean',
    label: 'Scale hexagons area',
    default: false,
    group: 'chart',
    requiredDimensions: ['x', 'y']
  },
  showPoints: {
    type: 'boolean',
    label: 'Show dots on data values',
    default: false,
    group: 'chart',
    requiredDimensions: ['x', 'y']
  },
  dotsDiameter: {
    type: 'number',
    label: 'Dots diameter',
    default: 2,
    group: 'chart',
    disabled: {
      showPoints: false
    },
    requiredDimensions: ['x', 'y']
  },
  colorScale: {
    type: 'colorScale',
    label: 'Color scale',
    //dimension: 'color',
    domain: 'colorDomain',
    default: {
      scaleType: 'sequential',
      interpolator: 'interpolateBlues'
    },
    group: 'colors',
    requiredDimensions: ['x', 'y']
  },
  showCountLabels: {
    type: 'boolean',
    label: 'Show count labels',
    default: false,
    group: 'labels',
    requiredDimensions: ['x', 'y']
  },
  showLabelsOutline: {
    type: 'boolean',
    label: 'Show outline',
    default: false,
    group: 'labels',
    requiredDimensions: ['x', 'y']
  },
  autoHideLabels: {
    type: 'boolean',
    label: 'Auto hide labels',
    default: false,
    group: 'labels',
    requiredDimensions: ['x', 'y']
  }
};

var hexagonalBinning = {
  metadata: metadata$g,
  dimensions: dimensions$g,
  mapData: mapData$g,
  render: render$g,
  visualOptions: visualOptions$g,
  styles: styles$1,
  colorDomain: colorDomain$1
};

var img$w = "data:image/svg+xml,%3csvg id='rawgraphs-icons' xmlns='http://www.w3.org/2000/svg' width='56' height='56' viewBox='0 0 56 56'%3e %3cdefs%3e %3cstyle%3e .cls-1 %7b fill: %2395e5c0%3b %7d .cls-2 %7b fill: %2306c26c%3b %7d %3c/style%3e %3c/defs%3e %3cg id='secundary'%3e %3cpath class='cls-1' d='M48%2c18V12c-4%2c0-4-3-8-3s-4%2c6-8%2c6-4%2c3-8%2c3Z'/%3e %3cpath class='cls-1' d='M11.2476%2c30.78C12.3657%2c25.8057%2c13.4258%2c22%2c16%2c22c2.7388%2c0%2c3.8662%2c3.6631%2c4.9565%2c7.2061.1539.5.3077.999.4649%2c1.4863L21.5206%2c31H32c-4%2c0-4-5-8-5-1.6895%2c0-2.665-2.3207-3.53-5H12.2233C11.1431%2c25.8076%2c10.1485%2c31%2c8%2c31h3.1982Z'/%3e %3cpath class='cls-1' d='M40%2c41c2.0234%2c0%2c3.1045%2c2.0664%2c3.7412%2c3.6211L43.8966%2c45H48c-2.7537%2c0-3.6119-6.1607-5.1843-10h-5.73C35.5755%2c38.5543%2c34.6954%2c44%2c32%2c44c-2.0786%2c0-3.0771-4.59-4.118-9H18.6439c-.6781%2c1.1745-1.496%2c2-2.6439%2c2-4%2c0-4%2c8-8%2c8h9.4893l.2885-.5A23.6038%2c23.6038%2c0%2c0%2c0%2c19.07%2c41.6289C20.126%2c38.99%2c21.3228%2c36%2c24%2c36c2.7861%2c0%2c3.8379%2c4.459%2c4.855%2c8.77l.0541.23h7.09l.1664-.3916C36.8242%2c43.06%2c37.938%2c41%2c40%2c41Z'/%3e %3c/g%3e %3cg id='primary'%3e %3cpath class='cls-2' d='M24%2c37c-2.8521%2c0-3.6713%2c5.082-5.3561%2c8H27.882C26.92%2c40.9232%2c25.9214%2c37%2c24%2c37Z'/%3e %3cpath class='cls-2' d='M40%2c42c-1.3046%2c0-2.1827%2c1.28-2.9139%2c3h5.73C42.1041%2c43.2624%2c41.2463%2c42%2c40%2c42Z'/%3e %3cpath class='cls-2' d='M16%2c23c-1.8515%2c0-2.8458%2c3.8572-3.7767%2c8H20.47C19.2868%2c27.3359%2c18.3105%2c23%2c16%2c23Z'/%3e %3cpolygon class='cls-2' points='46.305 46.805 44.865 46.805 46.061 48 7.5 48 7.5 49 46.061 49 44.865 50.195 46.305 50.195 48 48.5 46.305 46.805'/%3e %3c/g%3e%3c/svg%3e";

var img$x = "data:image/svg+xml,%3csvg id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='320' height='160' viewBox='0 0 320 160'%3e %3cdefs%3e %3cstyle%3e .cls-1%2c .cls-11 %7b fill: none%3b %7d .cls-2 %7b fill: white%3b %7d .cls-3 %7b clip-path: url(%23clip-path)%3b %7d .cls-4 %7b fill: %2369bda9%3b %7d .cls-4%2c .cls-5 %7b opacity: 0.5%3b %7d .cls-12%2c .cls-4%2c .cls-5 %7b isolation: isolate%3b %7d .cls-5 %7b fill: %239e0142%3b %7d .cls-6 %7b clip-path: url(%23clip-path-2)%3b %7d .cls-7 %7b clip-path: url(%23clip-path-3)%3b %7d .cls-8 %7b clip-path: url(%23clip-path-4)%3b %7d .cls-9 %7b clip-path: url(%23clip-path-5)%3b %7d .cls-10 %7b clip-path: url(%23clip-path-6)%3b %7d .cls-11 %7b stroke: black%3b %7d .cls-12 %7b font-size: 10px%3b font-family: Helvetica%3b %7d %3c/style%3e %3cclipPath id='clip-path'%3e %3crect class='cls-1' x='15' width='304' height='23.0441'/%3e %3c/clipPath%3e %3cclipPath id='clip-path-2'%3e %3crect class='cls-1' x='15' y='23.9912' width='304' height='23.0441'/%3e %3c/clipPath%3e %3cclipPath id='clip-path-3'%3e %3crect class='cls-1' x='15' y='47.9823' width='304' height='23.0441'/%3e %3c/clipPath%3e %3cclipPath id='clip-path-4'%3e %3crect class='cls-1' x='15' y='71.9735' width='304' height='23.0441'/%3e %3c/clipPath%3e %3cclipPath id='clip-path-5'%3e %3crect class='cls-1' x='15' y='95.9647' width='304' height='23.0441'/%3e %3c/clipPath%3e %3cclipPath id='clip-path-6'%3e %3crect class='cls-1' x='15' y='119.9558' width='304' height='23.0441'/%3e %3c/clipPath%3e %3c/defs%3e %3crect id='background' class='cls-2' width='320' height='160'/%3e %3cg id='areas'%3e %3cg class='cls-3'%3e %3cg id='a'%3e %3cg id='positive'%3e %3cpath class='cls-4' d='M15-23.0441C25.1333-10.7495%2c35.2667%2c1.5452%2c45.4%2c6.7235s20.2667%2c3.24%2c30.4%2c2.404%2c20.2667-.5707%2c30.4-1.8546S126.4667%2c3.1553%2c136.6.922%2c156.8667-2.9446%2c167%2c.9006s20.2667%2c13.1687%2c30.4%2c14.8542%2c20.2667-4.2671%2c30.4-4.4754%2c20.2667%2c5.3277%2c30.4%2c2.1973S278.4667-1.45%2c288.6-4.5908%2c308.8667-2.2154%2c319%2c3.3005V23.0441H15Z'/%3e %3cpath class='cls-4' d='M15%2c0C25.1333%2c12.2947%2c35.2667%2c24.5894%2c45.4%2c29.7677s20.2667%2c3.24%2c30.4%2c2.4039%2c20.2667-.5706%2c30.4-1.8546%2c20.2667-4.1175%2c30.4-6.3509S156.8667%2c20.1%2c167%2c23.9448s20.2667%2c13.1687%2c30.4%2c14.8541%2c20.2667-4.2671%2c30.4-4.4754%2c20.2667%2c5.3277%2c30.4%2c2.1973%2c20.2667-14.927%2c30.4-18.0675%2c20.2667%2c2.3755%2c30.4%2c7.8913V46.0883H15Z'/%3e %3c/g%3e %3cg id='negative'%3e %3cpath class='cls-5' d='M15-46.0883C25.1333-33.7936%2c35.2667-21.4989%2c45.4-16.3206s20.2667%2c3.24%2c30.4%2c2.4039%2c20.2667-.5706%2c30.4-1.8546%2c20.2667-4.1175%2c30.4-6.3509%2c20.2667-3.8665%2c30.4-.0213S187.2667-8.9748%2c197.4-7.2894s20.2667-4.2671%2c30.4-4.4754%2c20.2667%2c5.3277%2c30.4%2c2.1973%2c20.2667-14.927%2c30.4-18.0675%2c20.2667%2c2.3755%2c30.4%2c7.8913V0H15Z'/%3e %3c/g%3e %3c/g%3e %3c/g%3e %3cg class='cls-6'%3e %3cg id='b'%3e %3cg id='positive-2' data-name='positive'%3e %3cpath class='cls-4' d='M15%2c23.3378C25.1333%2c21.2589%2c35.2667%2c19.18%2c45.4%2c25.593S65.6667%2c46.9106%2c75.8%2c48.8246s20.2667-9.1628%2c30.4-11.6762%2c20.2667%2c3.5367%2c30.4%2c6.4143S156.8667%2c46.1452%2c167%2c40.65s20.2667-16.1922%2c30.4-15.5971%2c20.2667%2c12.4815%2c30.4%2c20.1714%2c20.2667%2c11.1833%2c30.4%2c9.734%2c20.2667-7.8411%2c30.4-14.1531S308.8667%2c28.26%2c319%2c22.0281V47.0353H15Z'/%3e %3cpath class='cls-4' d='M15%2c46.382c10.1333-2.0789%2c20.2667-4.1578%2c30.4%2c2.2551S65.6667%2c69.9548%2c75.8%2c71.8687s20.2667-9.1628%2c30.4-11.6761%2c20.2667%2c3.5367%2c30.4%2c6.4142%2c20.2667%2c2.5826%2c30.4-2.9132%2c20.2667-16.1921%2c30.4-15.5971S217.6667%2c60.578%2c227.8%2c68.268s20.2667%2c11.1832%2c30.4%2c9.734%2c20.2667-7.8411%2c30.4-14.1532S308.8667%2c51.3045%2c319%2c45.0723V70.08H15Z'/%3e %3c/g%3e %3cg id='negative-2' data-name='negative'%3e %3cpath class='cls-5' d='M15%2c.2937C25.1333-1.7852%2c35.2667-3.8641%2c45.4%2c2.5488S65.6667%2c23.8665%2c75.8%2c25.78s20.2667-9.1628%2c30.4-11.6761%2c20.2667%2c3.5367%2c30.4%2c6.4142%2c20.2667%2c2.5826%2c30.4-2.9132S187.2667%2c1.4132%2c197.4%2c2.0082%2c217.6667%2c14.49%2c227.8%2c22.18s20.2667%2c11.1832%2c30.4%2c9.734%2c20.2667-7.8411%2c30.4-14.1532S308.8667%2c5.2162%2c319-1.016V23.9912H15Z'/%3e %3cpath class='cls-5' d='M15-22.75c10.1333-2.0789%2c20.2667-4.1577%2c30.4%2c2.2552S65.6667.8223%2c75.8%2c2.7363%2c96.0667-6.4265%2c106.2-8.94s20.2667%2c3.5367%2c30.4%2c6.4143S156.8667.0569%2c167-5.4388s20.2667-16.1922%2c30.4-15.5971S217.6667-8.5544%2c227.8-.8645s20.2667%2c11.1833%2c30.4%2c9.734%2c20.2667-7.8411%2c30.4-14.1531S308.8667-17.8279%2c319-24.06V.947H15Z'/%3e %3c/g%3e %3c/g%3e %3c/g%3e %3cg class='cls-7'%3e %3cg id='c'%3e %3cg id='positive-3' data-name='positive'%3e %3cpath class='cls-4' d='M15%2c38.9249C25.1333%2c56.7657%2c35.2667%2c74.6065%2c45.4%2c78.6433s20.2667-5.73%2c30.4-9.0552%2c20.2667-.2074%2c30.4-4.4695S126.4667%2c49.215%2c136.6%2c48.08s20.2667%2c8.2371%2c30.4%2c9.2625%2c20.2667-6.2956%2c30.4-10.4326%2c20.2667-5.09%2c30.4%2c2.3365S248.0667%2c72.48%2c258.2%2c76.0882s20.2667-4.9824%2c30.4-10.0493%2c20.2667-6.61%2c30.4-8.154V71.0265H15Z'/%3e %3cpath class='cls-4' d='M15%2c61.9691C25.1333%2c79.81%2c35.2667%2c97.6506%2c45.4%2c101.6875s20.2667-5.73%2c30.4-9.0552%2c20.2667-.2075%2c30.4-4.47%2c20.2667-15.9036%2c30.4-17.0384%2c20.2667%2c8.2372%2c30.4%2c9.2626%2c20.2667-6.2956%2c30.4-10.4327%2c20.2667-5.09%2c30.4%2c2.3366%2c20.2667%2c23.2334%2c30.4%2c26.8415S278.4667%2c94.15%2c288.6%2c89.083s20.2667-6.61%2c30.4-8.1539V94.0706H15Z'/%3e %3c/g%3e %3cg id='negative-3' data-name='negative'%3e %3cpath class='cls-5' d='M15%2c15.8808C25.1333%2c33.7216%2c35.2667%2c51.5623%2c45.4%2c55.5992s20.2667-5.73%2c30.4-9.0552%2c20.2667-.2075%2c30.4-4.47%2c20.2667-15.9036%2c30.4-17.0384%2c20.2667%2c8.2372%2c30.4%2c9.2626%2c20.2667-6.2956%2c30.4-10.4327%2c20.2667-5.09%2c30.4%2c2.3366%2c20.2667%2c23.2334%2c30.4%2c26.8415%2c20.2667-4.9823%2c30.4-10.0493%2c20.2667-6.61%2c30.4-8.1539V47.9823H15Z'/%3e %3cpath class='cls-5' d='M15-7.1634C25.1333%2c10.6774%2c35.2667%2c28.5182%2c45.4%2c32.555s20.2667-5.73%2c30.4-9.0552%2c20.2667-.2074%2c30.4-4.4695S126.4667%2c3.1267%2c136.6%2c1.9919s20.2667%2c8.2371%2c30.4%2c9.2625S187.2667%2c4.9588%2c197.4.8218s20.2667-5.09%2c30.4%2c2.3365S248.0667%2c26.3918%2c258.2%2c30s20.2667-4.9824%2c30.4-10.0493%2c20.2667-6.6105%2c30.4-8.154V24.9382H15Z'/%3e %3c/g%3e %3c/g%3e %3c/g%3e %3cg class='cls-8'%3e %3cg id='d'%3e %3cg id='positive-4' data-name='positive'%3e %3cpath class='cls-4' d='M15%2c105.0326C25.1333%2c94.9538%2c35.2667%2c84.875%2c45.4%2c80.0953s20.2667-4.26%2c30.4-6.6391%2c20.2667-7.6555%2c30.4-4.022%2c20.2667%2c16.1776%2c30.4%2c22.2983S156.8667%2c97.5506%2c167%2c97.37s20.2667-.2376%2c30.4-1.78a99.8407%2c99.8407%2c0%2c0%2c0%2c30.4-9.7c10.1333-5.1313%2c20.2667-12.3673%2c30.4-11.66s20.2667%2c9.3586%2c30.4%2c7.32S308.8667%2c66.7851%2c319%2c54.0576v40.96H15Z'/%3e %3cpath class='cls-4' d='M15%2c128.0767c10.1333-10.0788%2c20.2667-20.1575%2c30.4-24.9372s20.2667-4.26%2c30.4-6.6392%2c20.2667-7.6555%2c30.4-4.0219%2c20.2667%2c16.1776%2c30.4%2c22.2983%2c20.2667%2c5.818%2c30.4%2c5.6379%2c20.2667-.2377%2c30.4-1.78a99.8409%2c99.8409%2c0%2c0%2c0%2c30.4-9.7c10.1333-5.1313%2c20.2667-12.3672%2c30.4-11.66s20.2667%2c9.3585%2c30.4%2c7.32S308.8667%2c89.8293%2c319%2c77.1018v40.96H15Z'/%3e %3c/g%3e %3cg id='negative-4' data-name='negative'%3e %3cpath class='cls-5' d='M15%2c81.9884C25.1333%2c71.91%2c35.2667%2c61.8309%2c45.4%2c57.0512s20.2667-4.26%2c30.4-6.6391%2c20.2667-7.6556%2c30.4-4.022%2c20.2667%2c16.1776%2c30.4%2c22.2983%2c20.2667%2c5.818%2c30.4%2c5.6379%2c20.2667-.2377%2c30.4-1.78a99.8409%2c99.8409%2c0%2c0%2c0%2c30.4-9.7c10.1333-5.1313%2c20.2667-12.3672%2c30.4-11.66s20.2667%2c9.3585%2c30.4%2c7.32S308.8667%2c43.741%2c319%2c31.0135v40.96H15Z'/%3e %3cpath class='cls-5' d='M15%2c58.9443C25.1333%2c48.8655%2c35.2667%2c38.7867%2c45.4%2c34.007s20.2667-4.26%2c30.4-6.6391%2c20.2667-7.6555%2c30.4-4.0219%2c20.2667%2c16.1775%2c30.4%2c22.2982%2c20.2667%2c5.8181%2c30.4%2c5.638%2c20.2667-.2377%2c30.4-1.78a99.8407%2c99.8407%2c0%2c0%2c0%2c30.4-9.7c10.1333-5.1313%2c20.2667-12.3673%2c30.4-11.66s20.2667%2c9.3586%2c30.4%2c7.32S308.8667%2c20.6969%2c319%2c7.9693v40.96H15Z'/%3e %3c/g%3e %3c/g%3e %3c/g%3e %3cg class='cls-9'%3e %3cg id='e'%3e %3cg id='positive-5' data-name='positive'%3e %3cpath class='cls-4' d='M15%2c100.075c10.1333.3285%2c20.2667.6571%2c30.4%2c3.0845s20.2667%2c6.9536%2c30.4%2c8.0448%2c20.2667-1.2526%2c30.4%2c3.015%2c20.2667%2c15.1466%2c30.4%2c13.1642%2c20.2667-16.8262%2c30.4-17.4265%2c20.2667%2c13.0427%2c30.4%2c17.9%2c20.2667.9277%2c30.4-4.7273%2c20.2667-13.0358%2c30.4-10.231%2c20.2667%2c15.7953%2c30.4%2c13.4734%2c20.2667-19.9559%2c30.4-37.59v30.227H15Z'/%3e %3cpath class='cls-4' d='M15%2c123.1191c10.1333.3286%2c20.2667.6571%2c30.4%2c3.0845s20.2667%2c6.9537%2c30.4%2c8.0449%2c20.2667-1.2527%2c30.4%2c3.0149%2c20.2667%2c15.1466%2c30.4%2c13.1642%2c20.2667-16.8261%2c30.4-17.4265%2c20.2667%2c13.0428%2c30.4%2c17.9%2c20.2667.9277%2c30.4-4.7273%2c20.2667-13.0358%2c30.4-10.231%2c20.2667%2c15.7953%2c30.4%2c13.4735%2c20.2667-19.956%2c30.4-37.59v30.227H15Z'/%3e %3c/g%3e %3cg id='negative-5' data-name='negative'%3e %3cpath class='cls-5' d='M15%2c77.0308c10.1333.3286%2c20.2667.6571%2c30.4%2c3.0845S65.6667%2c87.069%2c75.8%2c88.16s20.2667-1.2527%2c30.4%2c3.0149%2c20.2667%2c15.1466%2c30.4%2c13.1642S156.8667%2c87.5132%2c167%2c86.9128s20.2667%2c13.0428%2c30.4%2c17.9%2c20.2667.9277%2c30.4-4.7273%2c20.2667-13.0358%2c30.4-10.231%2c20.2667%2c15.7953%2c30.4%2c13.4735%2c20.2667-19.956%2c30.4-37.59v30.227H15Z'/%3e %3cpath class='cls-5' d='M15%2c53.9867c10.1333.3285%2c20.2667.6571%2c30.4%2c3.0845s20.2667%2c6.9536%2c30.4%2c8.0448%2c20.2667-1.2526%2c30.4%2c3.015%2c20.2667%2c15.1466%2c30.4%2c13.1642S156.8667%2c64.469%2c167%2c63.8687s20.2667%2c13.0427%2c30.4%2c17.9%2c20.2667.9277%2c30.4-4.7273%2c20.2667-13.0358%2c30.4-10.231%2c20.2667%2c15.7953%2c30.4%2c13.4734%2c20.2667-19.9559%2c30.4-37.59v30.227H15Z'/%3e %3c/g%3e %3c/g%3e %3c/g%3e %3cg class='cls-10'%3e %3cg id='f'%3e %3cg id='positive-6' data-name='positive'%3e %3cpath class='cls-4' d='M15%2c167.2834c10.1333%2c9.3126%2c20.2667%2c18.6252%2c30.4%2c14.9864s20.2667-20.2291%2c30.4-29.5753%2c20.2667-11.4483%2c30.4-7.6977%2c20.2667%2c13.3537%2c30.4%2c12.28%2c20.2667-12.8235%2c30.4-12.1255%2c20.2667%2c13.8442%2c30.4%2c16.2806%2c20.2667-5.8367%2c30.4-6.8938%2c20.2667%2c5.1019%2c30.4%2c5.0833%2c20.2667-6.2148%2c30.4-7.7862%2c20.2667%2c1.482%2c30.4%2c4.5354V143H15Z'/%3e %3c/g%3e %3cg id='negative-6' data-name='negative'%3e %3cpath class='cls-5' d='M15%2c144.2393c10.1333%2c9.3126%2c20.2667%2c18.6252%2c30.4%2c14.9863S65.6667%2c138.9965%2c75.8%2c129.65s20.2667-11.4482%2c30.4-7.6977%2c20.2667%2c13.3538%2c30.4%2c12.28%2c20.2667-12.8235%2c30.4-12.1254%2c20.2667%2c13.8441%2c30.4%2c16.2806%2c20.2667-5.8367%2c30.4-6.8938%2c20.2667%2c5.1018%2c30.4%2c5.0833%2c20.2667-6.2148%2c30.4-7.7862%2c20.2667%2c1.482%2c30.4%2c4.5354v-13.371H15Z'/%3e %3cpath class='cls-5' d='M15%2c121.1951c10.1333%2c9.3126%2c20.2667%2c18.6252%2c30.4%2c14.9864s20.2667-20.2291%2c30.4-29.5753%2c20.2667-11.4483%2c30.4-7.6977%2c20.2667%2c13.3537%2c30.4%2c12.28S156.8667%2c98.3653%2c167%2c99.0633s20.2667%2c13.8442%2c30.4%2c16.2806%2c20.2667-5.8367%2c30.4-6.8938%2c20.2667%2c5.1019%2c30.4%2c5.0833%2c20.2667-6.2148%2c30.4-7.7862%2c20.2667%2c1.482%2c30.4%2c4.5354V96.9117H15Z'/%3e %3c/g%3e %3c/g%3e %3c/g%3e %3cg id='axis'%3e %3cg%3e %3cpath class='cls-11' d='M15.5.5v143'/%3e %3cg%3e %3cline class='cls-11' x1='15' y1='11.5221' x2='9' y2='11.5221'/%3e %3ctext class='cls-12' transform='translate(0.4385 14.722)'%3ea%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-11' x1='15' y1='35.5132' x2='9' y2='35.5132'/%3e %3ctext class='cls-12' transform='translate(0.4385 38.7133)'%3eb%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-11' x1='15' y1='59.5044' x2='9' y2='59.5044'/%3e %3ctext class='cls-12' transform='translate(1 62.7044)'%3ec%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-11' x1='15' y1='83.4956' x2='9' y2='83.4956'/%3e %3ctext class='cls-12' transform='translate(0.4385 86.6956)'%3ed%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-11' x1='15' y1='107.4868' x2='9' y2='107.4868'/%3e %3ctext class='cls-12' transform='translate(0.4385 110.6868)'%3ee%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-11' x1='15' y1='131.4779' x2='9' y2='131.4779'/%3e %3ctext class='cls-12' transform='translate(3.2217 134.6779)'%3ef%3c/text%3e %3c/g%3e %3c/g%3e %3cg%3e %3cpath class='cls-11' d='M15.5%2c143.5h304'/%3e %3cg%3e %3cline class='cls-11' x1='15.5' y1='143' x2='15.5' y2='149'/%3e %3ctext class='cls-12' transform='translate(12.7192 159.1)'%3e0%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-11' x1='45.9' y1='143' x2='45.9' y2='149'/%3e %3ctext class='cls-12' transform='translate(43.1192 159.1)'%3e1%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-11' x1='76.3' y1='143' x2='76.3' y2='149'/%3e %3ctext class='cls-12' transform='translate(73.5192 159.1)'%3e2%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-11' x1='106.7' y1='143' x2='106.7' y2='149'/%3e %3ctext class='cls-12' transform='translate(103.9192 159.1)'%3e3%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-11' x1='137.1' y1='143' x2='137.1' y2='149'/%3e %3ctext class='cls-12' transform='translate(134.3192 159.1)'%3e4%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-11' x1='167.5' y1='143' x2='167.5' y2='149'/%3e %3ctext class='cls-12' transform='translate(164.7192 159.1)'%3e5%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-11' x1='197.9' y1='143' x2='197.9' y2='149'/%3e %3ctext class='cls-12' transform='translate(195.1192 159.1)'%3e6%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-11' x1='228.3' y1='143' x2='228.3' y2='149'/%3e %3ctext class='cls-12' transform='translate(225.5192 159.1)'%3e7%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-11' x1='258.7' y1='143' x2='258.7' y2='149'/%3e %3ctext class='cls-12' transform='translate(255.9193 159.1)'%3e8%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-11' x1='289.1' y1='143' x2='289.1' y2='149'/%3e %3ctext class='cls-12' transform='translate(286.3192 159.1)'%3e9%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-11' x1='319.5' y1='143' x2='319.5' y2='149'/%3e %3ctext class='cls-12' transform='translate(307.8159 159.1)'%3e10%3c/text%3e %3c/g%3e %3c/g%3e %3c/g%3e %3c/g%3e%3c/svg%3e";

const metadata$h = {
  name: 'Horizon graph',
  id: 'rawgraphs.horizongraph',
  thumbnail: img$x,
  icon: img$w,
  categories: ['time series', 'correlations'],
  description: 'It displays a quantitative dimension over a continuous interval or time period. Horizon graphs combine position and color to reduce vertical space.',
  code: 'https://github.com/rawgraphs/rawgraphs-charts/tree/master/src/horizongraph',
  tutorial: 'https://rawgraphs.io/learning/how-to-make-a-horizon-graph/'
};

const dimensions$h = [{
  id: 'x',
  name: 'x axis',
  validTypes: ['number', 'date'],
  required: true
}, {
  id: 'y',
  name: 'y axis',
  validTypes: ['number'],
  aggregation: true,
  aggregationDefault: 'sum',
  required: false
}, {
  id: 'group',
  name: 'Groups',
  validTypes: ['number', 'date', 'string'],
  required: false
}];

const mapData$h = function (data, mapping, dataTypes, dimensions) {
  const yAggregator = getDimensionAggregator('y', mapping, dataTypes, dimensions);
  let results = [];
  rollups(data, v => {
    const item = {
      group: v[0][mapping.group.value],
      x: v[0][mapping.x.value],
      y: yAggregator(v.map(d => d[mapping.y.value])),
      color: yAggregator(v.map(d => d[mapping.y.value])) < 0 ? 'negative' : 'positive'
    };
    results.push(item);
  }, d => d[mapping.group.value], // series grouping
  d => d[mapping.x.value] // group functions
  );
  return results;
};

function render$h(node, data, visualOptions, mapping, originalData, styles) {
  // destructurate visual visualOptions
  const {
    // default options
    width,
    height,
    background,
    showLegend = false,
    legendWidth = 0,
    //margins
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    // chart options
    padding,
    interpolation,
    bands,
    negativeStyle,
    // color
    colorScale
  } = visualOptions; // Margin convention

  const margin = {
    top: marginTop,
    right: marginRight,
    bottom: marginBottom,
    left: marginLeft
  }; // select the SVG element

  const svg = select(node); // nest data

  let nestedData = groups(data, d => d.group);
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;
  const groupsDomain = nestedData.map(d => d[0]);
  const groupsScale = scaleBand().range([0, chartHeight]).domain(groupsDomain).paddingOuter(0).paddingInner(padding / (chartWidth / groupsDomain.length)); // x scale

  const xDomain = extent(data, e => e.x);
  const xScale = mapping.x.dataType.type === 'date' ? scaleTime() : scaleLinear();
  xScale.domain(xDomain).range([0, chartWidth]); // y scale

  const yDomain = [0, max([-min(data, e => e.y), max(data, e => e.y)]) / bands];
  const yScale = scaleLinear().domain(yDomain).range([groupsScale.bandwidth(), 0]); // area function

  let area$1 = area().curve(d3[interpolation]).x(d => xScale(d.x)).y0(groupsScale.bandwidth()).y1(d => yScale(d.y)); // create the clip path

  svg.append('clipPath').attr('id', 'groupClipPath').append('rect').attr('x', 0).attr('y', 0).attr('width', chartWidth).attr('height', groupsScale.bandwidth()); // add background

  svg.append('rect').attr('width', showLegend ? width + legendWidth : width).attr('height', height).attr('x', 0).attr('y', 0).attr('fill', background).attr('id', 'background'); // append areas

  let viz = svg.append('g').attr('transform', d => 'translate(' + margin.left + ',' + margin.top + ')');
  let horizons = viz.attr('id', 'areas').selectAll('g').data(nestedData).join('g').attr('transform', d => 'translate(0,' + groupsScale(d[0]) + ')').attr('id', d => d[0]).attr('clip-path', 'url(#groupClipPath)'); //draw the positive areas

  horizons.append('g').attr('id', 'positive').selectAll('path') // create an array corresponding to the amount of required bands
  .data(d => [...Array(bands).keys()].map((e, i) => ({
    index: i,
    data: d
  }))).join('path').attr('d', d => area$1(d.data[1])).attr('fill', colorScale('positive')).attr('opacity', 1 / bands).attr('transform', d => `translate(0, ${groupsScale.bandwidth() * d.index})`); // draw the negative areas

  horizons.append('g').attr('id', 'negative').selectAll('path').data(d => [...Array(bands).keys()].map((e, i) => ({
    index: i,
    data: d
  }))).join('path').attr('d', d => area$1(d.data[1])).attr('fill', colorScale('negative')).attr('opacity', 1 / bands) // if negative style is "top", just translate it.
  // otherwise, flip it and move to bottm.
  .attr('transform', d => {
    if (negativeStyle == 'top') {
      return `translate(0, ${-groupsScale.bandwidth() - groupsScale.bandwidth() * d.index})`;
    } else if (negativeStyle == 'mirrored') {
      return `scale(1,-1) translate(0, ${-2 * groupsScale.bandwidth() - groupsScale.bandwidth() * d.index})`;
    }
  });

  const yAxis = g => {
    return g.call(axisLeft(groupsScale).tickSizeOuter(0));
  };

  const xAxis = g => {
    return g.attr('transform', `translate(0,${chartHeight})`).call(axisBottom(xScale).tickSizeOuter(0)).call(g => g.append('text').attr('x', chartWidth).attr('dy', -5).attr('text-anchor', 'end').text(mapping['x'].value).styles(styles.axisLabel));
  };

  const axisLayer = viz.append('g').attr('id', 'axis');
  axisLayer.append('g').call(yAxis);
  axisLayer.append('g').call(xAxis);
}

const visualOptions$h = {
  marginTop: {
    type: 'number',
    label: 'Margin (top)',
    default: 20,
    group: 'artboard'
  },
  marginRight: {
    type: 'number',
    label: 'Margin (right)',
    default: 20,
    group: 'artboard'
  },
  marginBottom: {
    type: 'number',
    label: 'Margin (bottom)',
    default: 20,
    group: 'artboard'
  },
  marginLeft: {
    type: 'number',
    label: 'Margin (left)',
    default: 20,
    group: 'artboard'
  },
  bands: {
    type: 'number',
    label: 'Number of bands',
    default: 4,
    group: 'chart'
  },
  padding: {
    type: 'number',
    label: 'Padding',
    default: 1,
    group: 'chart'
  },
  interpolation: {
    type: 'text',
    label: 'Curve type',
    default: 'curveBumpX',
    options: [{
      label: 'Basis',
      value: 'curveBasis'
    }, {
      label: 'Bump',
      value: 'curveBumpX'
    }, {
      label: 'Cardinal',
      value: 'curveCardinal'
    }, {
      label: 'Catmull–Rom',
      value: 'curveCatmullRom'
    }, {
      label: 'Linear',
      value: 'curveLinear'
    }, {
      label: 'Monotone X',
      value: 'curveMonotoneX'
    }, {
      label: 'Natural',
      value: 'curveNatural'
    }, {
      label: 'Step',
      value: 'curveStep'
    }, {
      label: 'Step After',
      value: 'curveStepAfter'
    }, {
      label: 'Step Before',
      value: 'curveStepBefore'
    }],
    group: 'chart'
  },
  negativeStyle: {
    type: 'text',
    label: 'Show negative values as',
    group: 'chart',
    options: [{
      label: 'Mirrored',
      value: 'mirrored'
    }, {
      label: 'Offset',
      value: 'top'
    }],
    default: 'mirrored'
  },
  colorScale: {
    type: 'colorScale',
    label: 'Color scale',
    dimension: 'color',
    default: {
      scaleType: 'ordinal',
      interpolator: 'interpolateSpectral'
    },
    group: 'colors'
  }
};

var horizongraph = {
  metadata: metadata$h,
  dimensions: dimensions$h,
  mapData: mapData$h,
  render: render$h,
  visualOptions: visualOptions$h,
  styles: styles$1
};

var img$y = "data:image/svg+xml,%3csvg id='rawgraphs-icons' xmlns='http://www.w3.org/2000/svg' width='56' height='56' viewBox='0 0 56 56'%3e %3cdefs%3e %3cstyle%3e .cls-1 %7b fill: %2395e5c0%3b %7d .cls-2 %7b fill: %2306c26c%3b %7d %3c/style%3e %3c/defs%3e %3cg id='secundary'%3e %3cpolygon class='cls-1' points='24.671 41.145 16.489 37.054 7.706 41.026 7.294 40.114 16.511 35.946 24.329 39.855 32.235 28.076 40.156 23.125 46.1 15.2 46.9 15.8 40.765 23.924 32.856 28.867 24.671 41.145'/%3e %3c/g%3e %3cg id='primary'%3e %3cpolygon class='cls-2' points='46.305 46.805 44.865 46.805 46.061 48 8 48 8 9.939 9.195 11.135 9.195 9.695 7.5 8 5.805 9.695 5.805 11.135 7 9.939 7 49 46.061 49 44.865 50.195 46.305 50.195 48 48.5 46.305 46.805'/%3e %3cpolygon class='cls-2' points='40.639 35 32.312 35 24.34 28.024 16.562 28.996 7.613 31.084 7.387 30.109 16.387 28.013 24.66 26.976 32.687 34 40.361 34 45.243 31.071 45.757 31.929 40.639 35'/%3e %3c/g%3e%3c/svg%3e";

var img$z = "data:image/svg+xml,%3csvg id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' width='320' height='160' viewBox='0 0 320 160'%3e %3cdefs%3e %3cstyle%3e .cls-1 %7b fill: white%3b %7d .cls-10%2c .cls-11%2c .cls-2%2c .cls-5%2c .cls-7%2c .cls-8%2c .cls-9 %7b fill: none%3b stroke-linejoin: round%3b stroke-width: 1.5px%3b %7d .cls-2 %7b stroke: %23161616%3b %7d .cls-3%2c .cls-4 %7b font-size: 10px%3b %7d .cls-12%2c .cls-3%2c .cls-4%2c .cls-6 %7b font-family: Helvetica%3b %7d .cls-12%2c .cls-4%2c .cls-6 %7b isolation: isolate%3b %7d .cls-5 %7b stroke: %2369bda9%3b %7d .cls-10%2c .cls-11%2c .cls-5%2c .cls-7%2c .cls-8%2c .cls-9 %7b stroke-linecap: round%3b %7d .cls-12%2c .cls-6 %7b font-size: 12px%3b fill: %23161616%3b %7d .cls-7 %7b stroke: %239e0142%3b %7d .cls-8 %7b stroke: %23f0704a%3b %7d .cls-9 %7b stroke: %23fedd8d%3b %7d .cls-10 %7b stroke: %23e0f3a1%3b %7d .cls-11 %7b stroke: %235e4fa2%3b %7d .cls-12 %7b letter-spacing: -0.0547em%3b %7d %3c/style%3e %3c/defs%3e %3crect id='background' class='cls-1' width='320' height='160'/%3e %3cg id='viz'%3e %3cg%3e %3cg id='axes'%3e %3cg%3e %3cpath class='cls-2' d='M30.5%2c150v-5.5h280V150'/%3e %3cg%3e %3cline class='cls-2' x1='30' y1='144' x2='30' y2='150'/%3e %3ctext class='cls-3' transform='translate(18.7539 160.1)'%3e1970%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-2' x1='86.4939' y1='144' x2='86.4939' y2='150'/%3e %3ctext class='cls-4' transform='translate(75.3708 160.1)'%3e1980%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-2' x1='142.5031' y1='144' x2='142.5031' y2='150'/%3e %3ctext class='cls-4' transform='translate(131.38 160.1)'%3e1990%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-2' x1='198.4969' y1='144' x2='198.4969' y2='150'/%3e %3ctext class='cls-4' transform='translate(187.3739 160.1)'%3e2000%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-2' x1='254.5061' y1='144' x2='254.5061' y2='150'/%3e %3ctext class='cls-4' transform='translate(243.3831 160.1)'%3e2010%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-2' x1='310.5' y1='144' x2='310.5' y2='150'/%3e %3ctext class='cls-4' transform='translate(299.377 160.1)'%3e2020%3c/text%3e %3c/g%3e %3c/g%3e %3cg%3e %3cpath class='cls-2' d='M24%2c144.5h6.5V7.5H24'/%3e %3cg%3e %3cline class='cls-2' x1='30' y1='144.5' x2='24' y2='144.5'/%3e %3ctext class='cls-3' transform='translate(15.4385 147.7)'%3e0%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-2' x1='30' y1='132.0455' x2='24' y2='132.0455'/%3e %3ctext class='cls-3' transform='translate(9.877 135.2455)'%3e20%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-2' x1='30' y1='119.5909' x2='24' y2='119.5909'/%3e %3ctext class='cls-3' transform='translate(9.877 122.7909)'%3e40%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-2' x1='30' y1='107.1364' x2='24' y2='107.1364'/%3e %3ctext class='cls-3' transform='translate(9.877 110.3364)'%3e60%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-2' x1='30' y1='94.6818' x2='24' y2='94.6818'/%3e %3ctext class='cls-3' transform='translate(9.877 97.8818)'%3e80%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-2' x1='30' y1='82.2273' x2='24' y2='82.2273'/%3e %3ctext class='cls-3' transform='translate(4.3154 85.4273)'%3e100%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-2' x1='30' y1='69.7727' x2='24' y2='69.7727'/%3e %3ctext class='cls-3' transform='translate(4.3154 72.9727)'%3e120%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-2' x1='30' y1='57.3182' x2='24' y2='57.3182'/%3e %3ctext class='cls-3' transform='translate(4.3154 60.5182)'%3e140%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-2' x1='30' y1='44.8636' x2='24' y2='44.8636'/%3e %3ctext class='cls-3' transform='translate(4.3154 48.0636)'%3e160%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-2' x1='30' y1='32.4091' x2='24' y2='32.4091'/%3e %3ctext class='cls-3' transform='translate(4.3154 35.6091)'%3e180%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-2' x1='30' y1='19.9545' x2='24' y2='19.9545'/%3e %3ctext class='cls-3' transform='translate(4.3154 23.1545)'%3e200%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-2' x1='30' y1='7.5' x2='24' y2='7.5'/%3e %3ctext class='cls-3' transform='translate(4.3154 10.7)'%3e220%3c/text%3e %3c/g%3e %3c/g%3e %3c/g%3e %3cg id='viz-2' data-name='viz'%3e %3cg id='Tape'%3e %3cpath class='cls-5' d='M46.8043%2c123.1815s3.7309-.2191%2c5.5963-.1623%2c3.7309.8722%2c5.5963.5032a16.7749%2c16.7749%2c0%2c0%2c0%2c5.5964-2.7176%2c39.0713%2c39.0713%2c0%2c0%2c0%2c5.6116-4.6682c1.868-1.8227%2c3.7309-6.2888%2c5.5963-6.2679s3.7309%2c4.672%2c5.5963%2c6.3933%2c3.7284%2c3.3276%2c5.5964%2c3.9346%2c3.7436-.3541%2c5.6116-.2927%2c3.7309%2c1.4692%2c5.5963.6609%2c3.7309-3.3288%2c5.5964-5.5109%2c3.7283-6.46%2c5.5963-7.5821%2c3.7436.811%2c5.6116.8477%2c3.7309.3726%2c5.5964-.6272%2c3.7308-3.7015%2c5.5963-5.3714%2c3.7283-4.0183%2c5.5963-4.6477%2c3.7436.7233%2c5.6116.8713%2c3.7309-1.2273%2c5.5964.017%2c3.7308%2c6.3348%2c5.5963%2c7.4492%2c3.7283-1.1926%2c5.5963-.7633%2c3.7437%2c2.7011%2c5.6117%2c3.3387%2c3.7308-.9935%2c5.5963.4866%2c3.7309%2c6.1153%2c5.5963%2c8.3942a45.4179%2c45.4179%2c0%2c0%2c0%2c5.5963%2c5.2794c1.868%2c1.6842%2c3.7437%2c3.7482%2c5.6117%2c4.8254s3.7309.6671%2c5.5963%2c1.6379a38.9481%2c38.9481%2c0%2c0%2c1%2c5.5963%2c4.187c1.8655%2c1.4933%2c3.7283%2c3.55%2c5.5963%2c4.7733a24.9565%2c24.9565%2c0%2c0%2c0%2c5.6117%2c2.5633%2c41.9942%2c41.9942%2c0%2c0%2c0%2c5.5963%2c1.41c1.8654.3885%2c3.7309.6451%2c5.5963.9213s3.7284.5975%2c5.5964.7356%2c3.7436.0645%2c5.6116.0929%2c3.7309.0636%2c5.5963.0776%2c3.7309.0024%2c5.5963.0062%2c5.5964.0163%2c5.5964.0163'/%3e %3ctext class='cls-6' transform='translate(127.13 91.6732)'%3eB%3c/text%3e %3c/g%3e %3cg id='Disc'%3e %3cpath class='cls-7' d='M102.7982%2c143.7251a22.0942%2c22.0942%2c0%2c0%2c0%2c5.5963-1.308%2c19.035%2c19.035%2c0%2c0%2c0%2c5.6116-4.18%2c66.8337%2c66.8337%2c0%2c0%2c0%2c5.5964-7.7476c1.8654-2.7617%2c3.7308-6.3651%2c5.5963-8.8229a49.9309%2c49.9309%2c0%2c0%2c1%2c5.5963-5.9236c1.868-1.8151%2c3.7436-2.6566%2c5.6116-4.9666s3.7309-5.9114%2c5.5964-8.893%2c3.7308-5.8576%2c5.5963-8.9971%2c3.7283-6.3183%2c5.5963-9.84%2c3.7437-6.1943%2c5.6117-11.2908%2c3.7308-14.8091%2c5.5963-19.2883%2c3.7309-5.73%2c5.5963-7.5865%2c3.7283-3.2321%2c5.5963-3.5548%2c3.7437%2c3.4369%2c5.6117%2c1.6186%2c3.7309-8.6046%2c5.5963-12.5285%2c3.7309-9.3636%2c5.5963-11.0149%2c3.7283-.1986%2c5.5963%2c1.1074%2c3.7437%2c3.94%2c5.6117%2c6.7285%2c3.7309%2c6.832%2c5.5963%2c10.0041%2c3.7309%2c7.3579%2c5.5963%2c9.0282%2c3.7284-.9733%2c5.5964.9937%2c3.7436%2c7.0388%2c5.6116%2c10.8083%2c3.7309%2c7.0463%2c5.5963%2c11.8087%2c3.7309%2c11.1635%2c5.5963%2c16.7658%2c3.7284%2c12.6376%2c5.5964%2c16.8484%2c3.7436%2c5.795%2c5.6116%2c8.416%2c3.7309%2c5.6253%2c5.5963%2c7.31%2c3.7309%2c1.5467%2c5.5963%2c2.7988%2c3.7284%2c3.4926%2c5.5964%2c4.7137a41.6052%2c41.6052%2c0%2c0%2c0%2c5.6116%2c2.6128c1.868.8821%2c3.7309%2c1.8576%2c5.5964%2c2.68s3.7308%2c1.51%2c5.5963%2c2.2536a47.7586%2c47.7586%2c0%2c0%2c0%2c5.5963%2c2.2106c1.868.4731%2c3.7436.1154%2c5.6116.6281s3.7309%2c1.9395%2c5.5964%2c2.4481a32.3769%2c32.3769%2c0%2c0%2c0%2c5.5963.6037'/%3e %3ctext class='cls-6' transform='translate(188.0676 13.4009)'%3eC%3c/text%3e %3c/g%3e %3cg id='Download'%3e %3cpath class='cls-8' d='M220.3976%2c142.4535s3.7436-4.0743%2c5.6116-5.9882%2c3.7309-3.689%2c5.5963-5.4954%2c3.7309-4.2049%2c5.5963-5.3433a12.8413%2c12.8413%2c0%2c0%2c1%2c5.5964-1.4873%2c40.3869%2c40.3869%2c0%2c0%2c1%2c5.6116.1213c1.868.0326%2c3.7309.2077%2c5.5963.0747s3.7309-.6649%2c5.5963-.8733a34.4892%2c34.4892%2c0%2c0%2c1%2c5.5964-.3771%2c20.8728%2c20.8728%2c0%2c0%2c1%2c5.6116.9575c1.868.6243%2c3.7309%2c2.0485%2c5.5964%2c2.7879s3.7308.8287%2c5.5963%2c1.6489%2c3.7283%2c2.2034%2c5.5963%2c3.2723%2c3.7436%2c2.1957%2c5.6116%2c3.1412a44.15%2c44.15%2c0%2c0%2c0%2c5.5964%2c2.532%2c49.43%2c49.43%2c0%2c0%2c0%2c5.5963%2c1.2563'/%3e %3ctext class='cls-6' transform='translate(260.8657 117.0849)'%3eE%3c/text%3e %3c/g%3e %3cg id='Other'%3e %3cpath class='cls-9' d='M136.4067%2c142.5184a44.91%2c44.91%2c0%2c0%2c1%2c5.5964-.6172c1.8654.0169%2c3.7308.6662%2c5.5963.7183a49.32%2c49.32%2c0%2c0%2c0%2c5.5963-.4056c1.868-.1616%2c3.7437-.4479%2c5.6117-.564s3.7308-.1406%2c5.5963-.1325%2c3.7309.1667%2c5.5963.1812%2c3.7283.0576%2c5.5963-.0943a39.3276%2c39.3276%2c0%2c0%2c0%2c5.6117-.8172c1.868-.4276%2c3.7309-1.6843%2c5.5963-1.7488s3.7309.9693%2c5.5963%2c1.3619a37.0841%2c37.0841%2c0%2c0%2c0%2c5.5963.9935c1.868.0978%2c3.7437-.4035%2c5.6117-.407s3.7309.4719%2c5.5963.3858a32.1484%2c32.1484%2c0%2c0%2c0%2c5.5963-.9018c1.8655-.4242%2c3.7284-1.3964%2c5.5964-1.643a20.74%2c20.74%2c0%2c0%2c1%2c5.6116.1638c1.868.2627%2c3.7309%2c1.205%2c5.5963%2c1.4122s3.7309-.4837%2c5.5963-.1692%2c3.7284%2c1.9469%2c5.5964%2c2.0566%2c3.7436-1.2284%2c5.6116-1.3982a38.362%2c38.362%2c0%2c0%2c1%2c5.5963.3794c1.8655.1044%2c3.7309.1518%2c5.5963.247s3.7284.2545%2c5.5964.3238%2c3.7436.051%2c5.6116.092%2c3.7309.1261%2c5.5964.1541%2c3.7308.0017%2c5.5963.0133%2c3.7283.0385%2c5.5963.0565%2c3.7436.0808%2c5.6116.0512%2c3.7309-.2087%2c5.5964-.2286%2c5.5963.109%2c5.5963.109'/%3e %3ctext class='cls-6' transform='translate(215.7306 132.8277)'%3eD%3c/text%3e %3c/g%3e %3cg id='Streaming'%3e %3cpath class='cls-10' d='M220.3976%2c143.9418s3.7436-1.0195%2c5.6116-1.3243a55.8679%2c55.8679%2c0%2c0%2c1%2c5.5963-.5049c1.8655-.1154%2c3.7309-.1062%2c5.5963-.1877s3.7284-.2%2c5.5964-.3015%2c3.7436-.1419%2c5.6116-.3075%2c3.7309-.3624%2c5.5963-.6861a36.49%2c36.49%2c0%2c0%2c0%2c5.5963-1.2558%2c54.687%2c54.687%2c0%2c0%2c0%2c5.5964-2.5357c1.868-.8859%2c3.7436-1.9245%2c5.6116-2.7791s3.7309-1.3958%2c5.5964-2.3489%2c3.7308-1.0377%2c5.5963-3.37%2c3.7283-7.1%2c5.5963-10.6222%2c3.7436-7.1053%2c5.6116-10.5094%2c3.7309-6.8811%2c5.5964-9.9151%2c5.5963-8.2889%2c5.5963-8.2889'/%3e %3ctext class='cls-6' transform='translate(300.4017 83.005)'%3eF%3c/text%3e %3c/g%3e %3cg id='Vinyl'%3e %3cpath class='cls-11' d='M46.8043%2c92.51a41.0066%2c41.0066%2c0%2c0%2c0%2c5.5963%2c1.4363%2c13.7111%2c13.7111%2c0%2c0%2c0%2c5.5963-.1485c1.8655-.5557%2c3.7284-.8679%2c5.5964-3.1854s3.7436-8.4926%2c5.6116-10.7193%2c3.7309-4.5155%2c5.5963-2.6413%2c3.7309%2c10.6512%2c5.5963%2c13.8866a14.4226%2c14.4226%2c0%2c0%2c0%2c5.5964%2c5.5258c1.868%2c1.2264%2c3.7436.0146%2c5.6116%2c1.8325s3.7309%2c6.7079%2c5.5963%2c9.0748a25.7173%2c25.7173%2c0%2c0%2c0%2c5.5964%2c5.1268c1.8654%2c1.3533%2c3.7283%2c1.6268%2c5.5963%2c2.9932a63.47%2c63.47%2c0%2c0%2c1%2c5.6116%2c5.2051c1.868%2c1.7861%2c3.7309%2c3.9882%2c5.5964%2c5.5115s3.7308%2c2.2946%2c5.5963%2c3.6284%2c3.7283%2c2.7672%2c5.5963%2c4.374%2c3.7436%2c4.036%2c5.6116%2c5.2671a18.5641%2c18.5641%2c0%2c0%2c0%2c5.5964%2c2.1194%2c34.354%2c34.354%2c0%2c0%2c0%2c5.5963%2c1.1129c1.8654.2162%2c3.7283.1157%2c5.5963.1839s3.7437.1911%2c5.6117.2258%2c3.7308-.0058%2c5.5963-.0174%2c3.7309-.0256%2c5.5963-.0518%2c3.7283-.1164%2c5.5963-.1053%2c3.7437.1266%2c5.6117.172%2c3.7309.0815%2c5.5963.1%2c3.7309-.0014%2c5.5963.0126%2c3.7283.0643%2c5.5963.0712%2c3.7437-.0455%2c5.6117-.0293%2c3.7309.101%2c5.5963.1268%2c3.7309.0161%2c5.5963.028%2c3.7284.0183%2c5.5964.0434%2c3.7436.0857%2c5.6116.107%2c3.7309.0184%2c5.5963.0212%2c3.7309.0354%2c5.5963-.0044%2c3.7284-.1865%2c5.5964-.2341%2c3.7436-.0138%2c5.6116-.0513%2c3.7309-.11%2c5.5963-.1739%2c3.7309-.1315%2c5.5963-.2117%2c3.7284-.1726%2c5.5964-.27%2c3.7436-.2249%2c5.6116-.3132%2c3.7309-.08%2c5.5964-.2162%2c3.7308-.4823%2c5.5963-.6012%2c3.7283-.0646%2c5.5963-.1121%2c3.7436-.1225%2c5.6116-.1728%2c3.7309-.0322%2c5.5964-.1286%2c5.5963-.4494%2c5.5963-.4494'/%3e %3ctext class='cls-12' transform='translate(70.7993 71.2513)'%3eA%3c/text%3e %3c/g%3e %3c/g%3e %3c/g%3e %3c/g%3e%3c/svg%3e";

const metadata$i = {
  name: 'Line chart',
  id: 'rawgraphs.linechart',
  thumbnail: img$z,
  icon: img$y,
  categories: ['time series', 'correlations'],
  description: 'It displays a quantitative dimension over a continuous interval or time period. Colour can be optionally used to encode an additional quantitative or categorical dimension.',
  code: 'https://github.com/rawgraphs/rawgraphs-charts/tree/master/src/linechart',
  tutorial: 'https://rawgraphs.io/learning/how-to-make-a-line-chart/'
};

const dimensions$i = [{
  id: 'x',
  name: 'X Axis',
  operation: 'get',
  validTypes: ['number', 'date'],
  required: true
}, {
  id: 'y',
  name: 'Y Axis',
  operation: 'get',
  validTypes: ['number', 'date'],
  required: true,
  aggregation: true,
  aggregationDefault: 'sum'
}, {
  id: 'lines',
  name: 'Lines',
  validTypes: ['number', 'string', 'date'],
  required: false,
  operation: 'get'
}, {
  id: 'color',
  name: 'Color',
  operation: 'get',
  validTypes: ['number', 'string', 'date'],
  required: false,
  aggregation: true,
  aggregationDefault: {
    number: 'sum',
    string: 'csvDistinct',
    date: 'csvDistinct'
  }
}, {
  id: 'series',
  name: 'Series',
  validTypes: ['number', 'string', 'date'],
  required: false,
  operation: 'get'
}];

const mapData$i = function (data, mapping, dataTypes, dimensions) {
  const colorAggregator = getDimensionAggregator('color', mapping, dataTypes, dimensions);
  const yAggregator = getDimensionAggregator('y', mapping, dataTypes, dimensions); // add the non-compulsory dimensions.

  if (!('color' in mapping)) mapping.color = {
    value: undefined
  };
  if (!('series' in mapping)) mapping.series = {
    value: undefined
  };
  if (!('lines' in mapping)) mapping.lines = {
    value: undefined
  };
  let results = [];
  rollups(data, v => rollups(v, vv => {
    const item = {
      x: vv[0][mapping.x.value],
      //get the first one since it's grouped
      y: yAggregator(vv.map(d => d[mapping.y.value])),
      // aggregate
      color: colorAggregator(v.map(d => d[mapping.color.value])),
      // aggregate
      series: vv[0][mapping.series.value],
      //get the first one since it's grouped
      lines: vv[0][mapping.lines.value] //get the first one since it's grouped

    };
    results.push(item);
  }, d => d[mapping.x.value].toString() // sub-group functions. toString() to enable grouping on dates
  ), d => d[mapping.series.value], // series grouping
  d => d[mapping.lines.value] // group functions
  );
  return results;
};

function render$i(svgNode, data, visualOptions, mapping, originalData, styles) {
  const {
    // artboard options
    width,
    height,
    background,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    // chart options
    interpolation,
    showPoints,
    dotsDiameter,
    yOrigin,
    // ticks options
    xTicksAuto,
    xTicksAmount,
    xTicksOuter,
    // series options
    columnsNumber,
    useSameScale,
    // @TODO: add
    sortSeriesBy,
    showSeriesLabels,
    repeatAxesLabels,
    showGrid,
    // labels options
    showLabels,
    labelsPosition,
    // color options
    colorScale,
    // legend
    showLegend,
    legendWidth
  } = visualOptions;
  const margin = {
    top: marginTop,
    right: marginRight,
    bottom: marginBottom,
    left: marginLeft
  }; // create nest structure

  const nestedData = rollups(data, v => v.sort((a, b) => ascending(a.x, b.x)), d => d.series, d => d.lines); // comupte max values for series
  // will add it as property to each series.

  nestedData.forEach(function (serie) {
    serie.totalValue = data.filter(item => item.series == serie[0]).reduce((result, item) => result + item.y, 0);
  }); // series sorting functions

  const seriesSortings = {
    'Total value (descending)': function (a, b) {
      return descending(a.totalValue, b.totalValue);
    },
    'Total value (ascending)': function (a, b) {
      return ascending(a.totalValue, b.totalValue);
    },
    Name: function (a, b) {
      return ascending(a[0], b[0]);
    }
  }; // sort series

  nestedData.sort(seriesSortings[sortSeriesBy]); // add background

  select(svgNode).append('rect').attr('width', showLegend ? width + legendWidth : width).attr('height', height).attr('x', 0).attr('y', 0).attr('fill', background).attr('id', 'background'); // set up grid

  const gridding$1 = gridding().size([width, height]).mode('grid').padding(0) // no padding, margins will be applied inside
  .cols(mapping.series.value ? columnsNumber : 1);
  const griddingData = gridding$1(nestedData);
  const svg = select(svgNode).append('g').attr('id', 'viz'); // create the clip path

  svg.append('clipPath').attr('id', 'serieClipPath').append('rect').attr('x', -margin.left).attr('y', -margin.top).attr('width', griddingData[0].width).attr('height', griddingData[0].height);
  const series = svg.selectAll('g').data(griddingData).join('g').attr('id', d => d[0]).attr('transform', d => 'translate(' + d.x + ',' + d.y + ')');
  if (mapping.x.dataType === 'number') mapping.x.dataType = {
    type: 'number'
  }; // @TODO it should be better to have always the same kind of object in mapping
  // add grid

  if (showGrid) {
    svg.append('g').attr('id', 'grid').selectAll('rect').data(griddingData).enter().append('rect').attr('x', d => d.x).attr('y', d => d.y).attr('width', d => d.width).attr('height', d => d.height).attr('fill', 'none').attr('stroke', '#ccc');
  } // now add everything to each series


  series.each(function (d, serieIndex) {
    // load the single selection
    const selection = select(this).append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')'); // add the clip path
    // clip-path: url(#clipPath);

    selection.attr('clip-path', 'url(#serieClipPath)'); // compute each serie width and height

    const serieWidth = d.width - margin.right - margin.left;
    const serieHeight = d.height - margin.top - margin.bottom; // get domains

    const xDomain = extent(data, e => e.x);
    const yDomain = useSameScale ? // compute extent of the whole dataset
    extent(data, e => e.y) : // compute extent of the single serie
    extent(d[1].map(e => e[1]).flat(2), e => e.y);

    if (yOrigin) {
      yDomain[0] = 0;
    } // define the x scale


    let xScale;

    switch (mapping.x.dataType.type) {
      case 'number':
        xScale = scaleLinear().domain(xDomain).nice().range([0, serieWidth]);
        break;

      case 'date':
        xScale = scaleTime().domain(xDomain).nice().range([0, serieWidth]);
        break;
    } // define the y scale


    const yScale = scaleLinear().domain(yDomain).nice().range([serieHeight, 0]); // define the line path function

    const line$1 = line().x(function (d) {
      return xScale(d.x);
    }).y(function (d) {
      return yScale(d.y);
    }).curve(d3[interpolation]);

    const xAxis = g => {
      return g.attr('transform', d => 'translate(0,' + (yDomain[0] >= 0 ? serieHeight : yScale(0)) + ')').call(axisBottom(xScale).tickValues(xTicksAuto ? xScale.ticks() : xTicksOuter ? xScale.ticks(xTicksAmount).concat(xScale.domain()) : xScale.ticks(xTicksAmount))).call(g => g.append('text').attr('x', serieWidth).attr('dy', -5).attr('text-anchor', 'end').attr('display', serieIndex == 0 || repeatAxesLabels ? null : 'none').text(mapping['x'].value).styles(styles.axisLabel));
    };

    const yAxis = g => {
      return g.attr('transform', d => 'translate(' + (mapping.x.dataType.type === 'date' || xDomain[0] >= 0 ? 0 : xScale(0)) + ',0)').call(axisLeft(yScale).tickSizeOuter(0)).call(g => g.append('text').attr('x', 4).attr('text-anchor', 'start').attr('dominant-baseline', 'hanging').attr('display', serieIndex == 0 || repeatAxesLabels ? null : 'none').text(mapping['y'].value).styles(styles.axisLabel));
    };

    const axisLayer = selection.append('g').attr('id', 'axis');
    axisLayer.append('g').call(xAxis);
    axisLayer.append('g').call(yAxis); // create a group for each line.
    // the group will contain the line and the dots.

    const groups = selection.append('g').attr('id', 'viz').selectAll('g').data(d => d[1]) // pass the single line
    .join('g').attr('id', d => d[0]);
    groups.append('path').attr('d', d => line$1(d[1])).attr('stroke', d => colorScale(d[1][0].color)).attr('fill', 'none');

    if (showPoints) {
      groups.append('g').selectAll('circle').data(d => d[1]).join('circle').attr('class', 'dot').attr('cx', d => xScale(d.x)).attr('cy', d => yScale(d.y)).attr('r', dotsDiameter / 2).attr('fill', d => colorScale(d.color));
    } // add lines labels


    if (showLabels) {
      let labels = groups.append('text').attr('font-family', 'sans-serif').attr('font-size', 10).attr('class', 'labels').text(d => d[0]);

      if (labelsPosition == 'side') {
        labels.attr('x', d => xScale(d[1].slice(-1)[0].x)) // get last x
        .attr('y', d => yScale(d[1].slice(-1)[0].y)) // get last y
        .attr('dx', 5).attr('dy', 4).attr('text-anchor', 'start');
      } else if (labelsPosition == 'inline') {
        labels.attr('x', d => {
          const maxPos = greatest(d[1], e => e.y);
          return xScale(maxPos.x);
        }).attr('y', d => {
          const maxPos = greatest(d[1], e => e.y);
          return yScale(maxPos.y);
        }).attr('dx', 0).attr('dy', -4).attr('text-anchor', 'middle');
      }
    } // add series titles


    if (showSeriesLabels) {
      select(this).append('text').attr('y', 4).attr('x', 4).text(d => d[0]).styles(styles.seriesLabel);
    }
  });

  if (showLegend) {
    // svg width is adjusted automatically because of the "container:height" annotation in legendWidth visual option
    const legendLayer = select(svgNode).append('g').attr('id', 'legend').attr('transform', `translate(${width},${marginTop})`);
    const chartLegend = legend().legendWidth(legendWidth);

    if (mapping.color.value) {
      chartLegend.addColor(mapping.color.value, colorScale);
    }

    legendLayer.call(chartLegend);
  }
}

const visualOptions$i = {
  marginTop: {
    type: 'number',
    label: 'Margin (top)',
    default: 10,
    group: 'artboard'
  },
  marginRight: {
    type: 'number',
    label: 'Margin (right)',
    default: 15,
    group: 'artboard'
  },
  marginBottom: {
    type: 'number',
    label: 'Margin (bottom)',
    default: 20,
    group: 'artboard'
  },
  marginLeft: {
    type: 'number',
    label: 'Margin (left)',
    default: 50,
    group: 'artboard'
  },
  showLegend: {
    type: 'boolean',
    label: 'Show legend',
    default: false,
    group: 'artboard'
  },
  legendWidth: {
    type: 'number',
    label: 'Legend width',
    default: 200,
    group: 'artboard',
    disabled: {
      showLegend: false
    },
    container: 'width',
    containerCondition: {
      showLegend: true
    }
  },
  showPoints: {
    type: 'boolean',
    label: 'Show dots on data values',
    default: false,
    group: 'chart'
  },
  dotsDiameter: {
    type: 'number',
    label: 'Dots diameter',
    default: 2,
    group: 'chart',
    disabled: {
      showPoints: false
    }
  },
  interpolation: {
    type: 'text',
    label: 'Curve type',
    default: 'curveBumpX',
    options: [{
      label: 'Basis',
      value: 'curveBasis'
    }, {
      label: 'Bundle',
      value: 'curveBundle'
    }, {
      label: 'Bump',
      value: 'curveBumpX'
    }, {
      label: 'Cardinal',
      value: 'curveCardinal'
    }, {
      label: 'Catmull–Rom',
      value: 'curveCatmullRom'
    }, {
      label: 'Linear',
      value: 'curveLinear'
    }, {
      label: 'Monotone X',
      value: 'curveMonotoneX'
    }, {
      label: 'Natural',
      value: 'curveNatural'
    }, {
      label: 'Step',
      value: 'curveStep'
    }, {
      label: 'Step After',
      value: 'curveStepAfter'
    }, {
      label: 'Step Before',
      value: 'curveStepBefore'
    }],
    group: 'chart'
  },
  yOrigin: {
    type: 'boolean',
    label: 'Set Y origin to 0',
    default: false,
    group: 'chart',
    requiredDimensions: ['y']
  },
  columnsNumber: {
    type: 'number',
    label: 'Number of columns',
    default: 0,
    group: 'series'
  },
  xTicksAuto: {
    type: 'boolean',
    label: 'Auto-place ticks on x axis',
    default: true,
    group: 'axes'
  },
  xTicksAmount: {
    type: 'number',
    label: 'Max. ticks on x axis',
    default: 1,
    group: 'axes',
    disabled: {
      xTicksAuto: true
    }
  },
  xTicksOuter: {
    type: 'boolean',
    label: 'Show min/max on x axis',
    default: false,
    group: 'axes',
    disabled: {
      xTicksAuto: true
    }
  },
  sortSeriesBy: {
    type: 'text',
    label: 'Sort series by',
    group: 'series',
    options: ['Total value (descending)', 'Total value (ascending)', 'Name', 'Original'],
    default: 'Total value (descending)'
  },
  useSameScale: {
    type: 'boolean',
    label: 'Use same scale',
    default: true,
    group: 'series'
  },
  showSeriesLabels: {
    type: 'boolean',
    label: 'Show series titles',
    default: true,
    group: 'series'
  },
  repeatAxesLabels: {
    type: 'boolean',
    label: 'Repeat axis labels for each series',
    default: false,
    group: 'series'
  },
  showLabels: {
    type: 'boolean',
    label: 'Show labels',
    default: true,
    group: 'labels'
  },
  labelsPosition: {
    type: 'text',
    label: 'Labels position',
    options: ['inline', 'side'],
    default: 'inline',
    group: 'labels',
    disabled: {
      showLabels: false
    }
  },
  showGrid: {
    type: 'boolean',
    label: 'Show series grid',
    default: true,
    group: 'series'
  },
  colorScale: {
    type: 'colorScale',
    label: 'Color scale',
    dimension: 'color',
    default: {
      scaleType: 'ordinal',
      interpolator: 'interpolateSpectral'
    },
    group: 'colors'
  }
};

var linechart = {
  metadata: metadata$i,
  dimensions: dimensions$i,
  mapData: mapData$i,
  render: render$i,
  visualOptions: visualOptions$i,
  styles: styles$1
};

var img$A = "data:image/svg+xml,%3csvg id='rawgraphs-icons' xmlns='http://www.w3.org/2000/svg' width='56' height='56' viewBox='0 0 56 56'%3e %3cdefs%3e %3cstyle%3e .cls-1 %7b fill: %2395e5c0%3b %7d .cls-2 %7b fill: %2306c26c%3b %7d %3c/style%3e %3c/defs%3e %3cg id='secundary'%3e %3crect class='cls-1' x='34' y='10' width='4' height='4'/%3e %3crect class='cls-1' x='27' y='19' width='2' height='2'/%3e %3crect class='cls-1' x='26' y='26' width='4' height='4'/%3e %3crect class='cls-1' x='32' y='24' width='8' height='8'/%3e %3crect class='cls-1' x='42' y='26' width='4' height='4'/%3e %3crect class='cls-1' x='19' y='35' width='2' height='2'/%3e %3crect class='cls-1' x='8' y='40' width='8' height='8'/%3e %3crect class='cls-1' x='32' y='40' width='8' height='8'/%3e %3c/g%3e %3cg id='primary'%3e %3crect class='cls-2' x='8' y='8' width='8' height='8'/%3e %3crect class='cls-2' x='18' y='10' width='4' height='4'/%3e %3crect class='cls-2' x='24' y='8' width='8' height='8'/%3e %3crect class='cls-2' x='43' y='11' width='2' height='2'/%3e %3crect class='cls-2' x='10' y='18' width='4' height='4'/%3e %3crect class='cls-2' x='19' y='19' width='2' height='2'/%3e %3crect class='cls-2' x='42' y='18' width='4' height='4'/%3e %3crect class='cls-2' x='34' y='18' width='4' height='4'/%3e %3crect class='cls-2' x='9' y='25' width='6' height='6'/%3e %3crect class='cls-2' x='17' y='25' width='6' height='6'/%3e %3crect class='cls-2' x='10' y='34' width='4' height='4'/%3e %3crect class='cls-2' x='27' y='35' width='2' height='2'/%3e %3crect class='cls-2' x='34' y='34' width='4' height='4'/%3e %3crect class='cls-2' x='43' y='35' width='2' height='2'/%3e %3crect class='cls-2' x='19' y='43' width='2' height='2'/%3e %3crect class='cls-2' x='26' y='42' width='4' height='4'/%3e %3crect class='cls-2' x='42' y='42' width='4' height='4'/%3e %3c/g%3e%3c/svg%3e";

var img$B = "data:image/svg+xml,%3csvg id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' width='320' height='160' viewBox='0 0 320 160'%3e %3cdefs%3e %3cstyle%3e .cls-1 %7b fill: white%3b %7d .cls-2%2c .cls-3 %7b fill: none%3b %7d .cls-2 %7b stroke: black%3b %7d .cls-3 %7b stroke: %23e5e5e5%3b %7d .cls-4 %7b isolation: isolate%3b font-size: 10px%3b font-family: Helvetica%3b %7d .cls-5 %7b fill: %23feea9e%3b %7d .cls-6 %7b fill: %23d5ee9f%3b %7d .cls-7 %7b fill: %2389cfa5%3b %7d .cls-8 %7b fill: %23fdc374%3b %7d .cls-9 %7b fill: %23f6faae%3b %7d .cls-10 %7b fill: %23ce384b%3b %7d .cls-11 %7b fill: %23eef8a8%3b %7d .cls-12 %7b fill: %23fdf3aa%3b %7d .cls-13 %7b fill: %23fed281%3b %7d .cls-14 %7b fill: %23ee6949%3b %7d .cls-15 %7b fill: %2361b7ab%3b %7d .cls-16 %7b fill: %23af1446%3b %7d .cls-17 %7b fill: %23b1e0a1%3b %7d .cls-18 %7b fill: %23fba05c%3b %7d .cls-19 %7b fill: %234285b4%3b %7d .cls-20 %7b fill: %23e3f4a1%3b %7d .cls-21 %7b fill: %23f47b4c%3b %7d .cls-22 %7b fill: %23f88e53%3b %7d .cls-23 %7b fill: %235e4fa2%3b %7d .cls-24 %7b fill: %2374c4a7%3b %7d .cls-25 %7b fill: %234673b1%3b %7d .cls-26 %7b fill: %23e55949%3b %7d .cls-27 %7b fill: %23c4e79f%3b %7d .cls-28 %7b fill: %23bf2749%3b %7d .cls-29 %7b fill: %23db494a%3b %7d .cls-30 %7b fill: %235161aa%3b %7d .cls-31 %7b fill: %23fedf90%3b %7d .cls-32 %7b fill: %239dd8a3%3b %7d .cls-33 %7b fill: %2351a8af%3b %7d .cls-34 %7b fill: %239e0142%3b %7d .cls-35 %7b fill: %23fbf8b0%3b %7d .cls-36 %7b fill: %234696b3%3b %7d .cls-37 %7b fill: %23fcb368%3b %7d %3c/style%3e %3c/defs%3e %3crect id='background' class='cls-1' width='320' height='160'/%3e %3cg id='viz'%3e %3cg%3e %3cpath class='cls-2' d='M20.5%2c20.5h290'/%3e %3cg%3e %3cline class='cls-3' x1='37.0519' y1='20' x2='37.0519' y2='14'/%3e %3ctext class='cls-4' transform='translate(35.6404 13.6366) rotate(-45)'%3ea%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-3' x1='69.0389' y1='20' x2='69.0389' y2='14'/%3e %3ctext class='cls-4' transform='translate(67.6275 13.6366) rotate(-45)'%3eb%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-3' x1='101.026' y1='20' x2='101.026' y2='14'/%3e %3ctext class='cls-4' transform='translate(99.6143 13.6366) rotate(-45)'%3ec%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-3' x1='133.013' y1='20' x2='133.013' y2='14'/%3e %3ctext class='cls-4' transform='translate(131.6014 13.6366) rotate(-45)'%3ed%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-3' x1='165' y1='20' x2='165' y2='14'/%3e %3ctext class='cls-4' transform='translate(163.5884 13.6366) rotate(-45)'%3ee%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-3' x1='196.987' y1='20' x2='196.987' y2='14'/%3e %3ctext class='cls-4' transform='translate(195.5755 13.6366) rotate(-45)'%3ef%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-3' x1='228.974' y1='20' x2='228.974' y2='14'/%3e %3ctext class='cls-4' transform='translate(227.5625 13.6366) rotate(-45)'%3eg%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-3' x1='260.9611' y1='20' x2='260.9611' y2='14'/%3e %3ctext class='cls-4' transform='translate(259.5496 13.6366) rotate(-45)'%3eh%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-3' x1='292.9481' y1='20' x2='292.9481' y2='14'/%3e %3ctext class='cls-4' transform='translate(291.5367 13.6366) rotate(-45)'%3ei%3c/text%3e %3c/g%3e %3c/g%3e %3cg%3e %3cpath class='cls-2' d='M20.5%2c20.5V149.3889'/%3e %3cg%3e %3cline class='cls-3' x1='20' y1='36.8977' x2='14' y2='36.8977'/%3e %3ctext class='cls-4' transform='translate(4.8916 40.0977)'%3e%ce%b1%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-3' x1='20' y1='68.5955' x2='14' y2='68.5955'/%3e %3ctext class='cls-4' transform='translate(4.8916 71.7955)'%3e%ce%b2%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-3' x1='20' y1='100.2934' x2='14' y2='100.2934'/%3e %3ctext class='cls-4' transform='translate(5.4385 103.4933)'%3e%ce%b3%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-3' x1='20' y1='131.9912' x2='14' y2='131.9912'/%3e %3ctext class='cls-4' transform='translate(4.8916 135.1912)'%3e%ce%b4%3c/text%3e %3c/g%3e %3c/g%3e %3crect class='cls-5' x='22.1168' y='22.0976' width='30.2222' height='30.2222'/%3e %3crect class='cls-6' x='54.8144' y='22.8082' width='28.8011' height='28.8011'/%3e %3crect class='cls-7' x='91.6693' y='27.6761' width='19.0654' height='19.0654'/%3e %3crect class='cls-8' x='128.3619' y='32.3817' width='9.6541' height='9.6541'/%3e %3crect class='cls-9' x='158.1809' y='30.2137' width='13.9902' height='13.9902'/%3e %3crect class='cls-10' x='188.2623' y='28.3081' width='17.8013' height='17.8013'/%3e %3crect class='cls-11' x='222.4964' y='30.5551' width='13.3073' height='13.3073'/%3e %3crect class='cls-12' x='256.5577' y='32.6294' width='9.1587' height='9.1587'/%3e %3crect class='cls-13' x='285.0468' y='29.1315' width='16.1544' height='16.1545'/%3e %3crect class='cls-14' x='23.3213' y='54.9999' width='27.8133' height='27.8133'/%3e %3crect class='cls-15' x='59.9299' y='59.6215' width='18.5701' height='18.5701'/%3e %3crect class='cls-16' x='94.9082' y='62.6128' width='12.5874' height='12.5875'/%3e %3crect class='cls-17' x='120.0579' y='55.7755' width='26.2621' height='26.2621'/%3e %3crect class='cls-16' x='153.3521' y='57.0827' width='23.6477' height='23.6477'/%3e %3crect class='cls-18' x='193.7498' y='65.4933' width='6.8265' height='6.8265'/%3e %3crect class='cls-19' x='224.323' y='64.0795' width='9.6541' height='9.6541'/%3e %3crect class='cls-20' x='250.5615' y='58.331' width='21.1512' height='21.1511'/%3e %3crect class='cls-21' x='283.1145' y='58.8969' width='20.0192' height='20.0192'/%3e %3crect class='cls-22' x='31.5164' y='94.8929' width='11.4229' height='11.4229'/%3e %3crect class='cls-23' x='56.5353' y='87.9247' width='25.3593' height='25.3593'/%3e %3crect class='cls-24' x='87.8074' y='87.2098' width='26.7891' height='26.7891'/%3e %3crect class='cls-18' x='126.8952' y='94.3107' width='12.5875' height='12.5874'/%3e %3crect class='cls-25' x='160.5966' y='96.025' width='9.1587' height='9.1587'/%3e %3crect class='cls-14' x='192.8456' y='96.2869' width='8.6349' height='8.6349'/%3e %3crect class='cls-26' x='219.1404' y='90.5948' width='20.0192' height='20.0192'/%3e %3crect class='cls-27' x='249.3132' y='88.7805' width='23.6477' height='23.6477'/%3e %3crect class='cls-28' x='278.2461' y='85.7264' width='29.756' height='29.756'/%3e %3crect class='cls-29' x='30.2328' y='125.3071' width='13.9902' height='13.9902'/%3e %3crect class='cls-30' x='54.6535' y='117.7408' width='29.1229' height='29.1229'/%3e %3crect class='cls-31' x='91.9169' y='123.0171' width='18.5701' height='18.5701'/%3e %3crect class='cls-32' x='126.8952' y='126.0085' width='12.5875' height='12.5875'/%3e %3crect class='cls-33' x='154.0632' y='121.1894' width='22.2255' height='22.2255'/%3e %3crect class='cls-34' x='195.6366' y='130.7757' width='3.0529' height='3.0529'/%3e %3crect class='cls-35' x='220.3812' y='123.5334' width='17.5376' height='17.5376'/%3e %3crect class='cls-36' x='250.236' y='121.4011' width='21.8021' height='21.8021'/%3e %3crect class='cls-37' x='279.1339' y='118.312' width='27.9803' height='27.9803'/%3e %3c/g%3e%3c/svg%3e";

const metadata$j = {
  name: 'Matrix Plot',
  id: 'rawgraphs.matrixplot',
  thumbnail: img$B,
  icon: img$A,
  categories: ['correlations', 'time series', 'proportions'],
  description: 'It allows comparison of two categorical dimensions, disposing them on the horizontal and vertical axes. Each glyph (square or circle) represents a possible correlation among the two dimensions. Associated quantitative variables can be represented with size and/or color.',
  code: 'https://github.com/rawgraphs/rawgraphs-charts/tree/master/src/matrixplot',
  tutorial: 'https://rawgraphs.io/learning/how-to-make-a-matrix-plot/'
};

const dimensions$j = [{
  id: 'x',
  name: 'X Axis',
  validTypes: ['number', 'date', 'string'],
  required: true
}, {
  id: 'y',
  name: 'Y Axis',
  validTypes: ['number', 'date', 'string'],
  required: true
}, {
  id: 'size',
  name: 'Size',
  validTypes: ['number'],
  required: false,
  aggregation: true,
  aggregationDefault: 'sum'
}, {
  id: 'color',
  name: 'Color',
  validTypes: ['number', 'date', 'string'],
  required: false,
  aggregation: true,
  aggregationDefault: {
    number: 'sum',
    string: 'csvDistinct',
    date: 'csvDistinct'
  }
}, {
  id: 'label',
  name: 'Label',
  validTypes: ['number', 'date', 'string'],
  required: false,
  multiple: true,
  aggregation: true,
  aggregationDefault: 'csvDistinct'
}];

const mapData$j = function (data, mapping, dataTypes, dimensions) {
  const colorAggregator = getDimensionAggregator('color', mapping, dataTypes, dimensions);
  const sizeAggregator = getDimensionAggregator('size', mapping, dataTypes, dimensions);
  const labelAggregators = getDimensionAggregator('label', mapping, dataTypes, dimensions); // add the non-compulsory dimensions.

  if (!('color' in mapping)) mapping.color = {
    value: undefined
  };
  if (!('size' in mapping)) mapping.size = {
    value: undefined
  };
  if (!('label' in mapping)) mapping.label = {
    value: undefined
  };
  const result = rollups(data, v => {
    return {
      x: v[0][mapping.x.value],
      // get the first one since it's grouped
      y: v[0][mapping.y.value],
      // get the first one since it's grouped
      size: mapping.size.value ? sizeAggregator(v.map(d => d[mapping.size.value])) : v.length,
      // aggregate. If not mapped, give 1 as size
      color: mapping.color.value ? colorAggregator(v.map(d => d[mapping.color.value])) : undefined,
      // aggregate, by default single color.
      label: mapping.label.value ? mapping.label.value.map((label, i) => {
        return labelAggregators[i](v.map(d => d[label]));
      }) : undefined // create array of strings

    };
  }, d => d[mapping.x.value] + '_' + d[mapping.y.value] // crossgrup functions
  );
  return result.map(d => d[1]);
};

function render$j(svgNode, data, visualOptions, mapping, originalData, styles) {
  const {
    width,
    height,
    background,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    padding,
    rounding,
    sortXAxisBy,
    sortYAxisBy,
    showGrid,
    colorScale,
    labelStyles,
    showLabelsOutline,
    // legend
    showLegend,
    legendWidth
  } = visualOptions;
  const margin = {
    top: marginTop,
    right: marginRight,
    bottom: marginBottom,
    left: marginLeft
  };
  let chartWidth = width - margin.left - margin.right;
  let chartHeight = height - margin.top - margin.bottom; //check if there are negative values, in case throw error

  data.forEach(d => {
    if (d.size < 0) {
      throw new Error('Values cannot be negative');
    }
  }); // sort data

  let rowsValues = rollups(data, v => sum(v, d => d.size), d => d.y).map(d => ({
    key: d[0],
    value: d[1]
  }));
  const colsValues = rollups(data, v => sum(v, d => d.size), d => d.x).map(d => ({
    key: d[0],
    value: d[1]
  }));

  switch (sortXAxisBy) {
    case 'Total value (descending)':
      colsValues.sort((a, b) => descending(a.value, b.value));
      break;

    case 'Total value (ascending)':
      colsValues.sort((a, b) => ascending(a.value, b.value));
      break;

    case 'Name':
      colsValues.sort((a, b) => ascending(a.key, b.key));
  }

  switch (sortYAxisBy) {
    case 'Total value (descending)':
      rowsValues.sort((a, b) => descending(a.value, b.value));
      break;

    case 'Total value (ascending)':
      rowsValues.sort((a, b) => ascending(a.value, b.value));
      break;

    case 'Name':
      rowsValues.sort((a, b) => ascending(a.key, b.key));
  } // first thing, understand if there are more rows or lines


  const rows = [...new Set(rowsValues.map(d => d.key))];
  const cols = [...new Set(colsValues.map(d => d.key))];
  let cellSize;

  if (rows.length > cols.length) {
    cellSize = (chartHeight - rows.length * padding) / rows.length;
    chartWidth = (cellSize + padding) * cols.length;
  } else {
    cellSize = (chartWidth - cols.length * padding) / cols.length;
    chartHeight = (cellSize + padding) * rows.length;
  }

  const x = scaleBand().range([0, chartWidth]).domain(cols).padding(padding / cellSize); // d3 expects padding expressed in % (0-1)

  const y = scaleBand().range([0, chartHeight]).domain(rows).padding(padding / cellSize); // d3 expects padding expressed in % (0-1)

  const sizeScale = scaleSqrt().domain([0, max(data, d => d.size)]).range([0, cellSize]);
  const roundingScale = scaleLinear().domain([0, 100]).rangeRound([0, 50]); // add background

  select(svgNode).append('rect').attr('width', showLegend ? width + legendWidth : width).attr('height', height).attr('x', 0).attr('y', 0).attr('fill', background).attr('id', 'background');
  const svg = select(svgNode).append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')').attr('id', 'viz');

  if (showGrid) {
    // add the X gridlines
    svg.append('g').attr('class', 'grid').attr('transform', 'translate(' + (cellSize / 2 + 1) + ',0)') // not clear why there is an offset of 2px
    .call(axisTop(x).tickSize(Math.round(-chartHeight + 1)).tickSizeOuter(0)); // add the Y gridlines

    svg.append('g').attr('class', 'grid').attr('transform', 'translate(0,' + (cellSize / 2 + 1) + ')') // not clear why there is an offset of 2px
    .call(axisLeft(y).tickSize(Math.round(-chartWidth + 1)).tickSizeOuter(0));
  } // add top x axis


  svg.append('g').call(axisTop(x).tickSizeOuter(0)).selectAll('text').attr('dx', Math.sqrt(12)) // proportional to text size. @TODO we should use a variable.
  .attr('dy', Math.sqrt(12)) // proportional to text size. @TODO we should use a variable
  .attr('text-anchor', 'start').attr('transform', 'rotate(-45)'); // add left y axis

  svg.append('g').call(axisLeft(y).tickSizeOuter(0)).selectAll('text'); // add y axis title

  svg.append('text').attr('dx', -9) // proportional to tick lines
  .attr('dy', -9) // proportional to tick lines
  .style('text-anchor', 'end').text(mapping.y.value).styles(styles.axisLabel); // add x axis title

  svg.append('text').attr('x', (chartWidth + 9) / Math.sqrt(2)) // proportional to tick lines
  .attr('y', (chartWidth + 9) / Math.sqrt(2)) // proportional to tick lines
  .attr('dx', Math.sqrt(12)) // proportional to text size. @TODO we should use a variable.
  .attr('dy', -Math.sqrt(12)) // proportional to text size. @TODO we should use a variable.
  .attr('transform', 'rotate(-45)').style('text-anchor', 'start').text(mapping.x.value).styles(styles.axisLabel); // draw squares or circles for each value

  svg.selectAll().data(data).enter().append('rect').attr('x', d => x(d.x) + (cellSize - sizeScale(d.size)) / 2).attr('y', d => y(d.y) + (cellSize - sizeScale(d.size)) / 2).attr('rx', d => roundingScale(rounding) * sizeScale(d.size) / 100).attr('ry', d => roundingScale(rounding) * sizeScale(d.size) / 100).attr('width', d => sizeScale(d.size)).attr('height', d => sizeScale(d.size)).style('fill', d => colorScale(d.color));
  const labelsLayer = svg.append('g').attr('id', 'labels');
  labelsLayer.selectAll('g').data(mapping.label.value ? data : []).join('g').attr('transform', d => `translate(${x(d.x) + cellSize / 2},${y(d.y) + cellSize / 2})`).append('text').attr('x', 0).attr('y', 0).attr('text-anchor', 'middle').attr('dominant-baseline', 'text-before-edge').selectAll('tspan').data(d => Array.isArray(d.label) ? d.label : [d.label]).join('tspan').attr('x', 0).attr('y', 0).attr('dy', (d, i) => i * (+styles[labelStyles[i]].fontSize.replace('px', '') + 2)).text((d, i) => {
    if (d && mapping.label.dataType[i].type === 'date') {
      return timeFormat(dateFormats$1[mapping.label.dataType[i].dateFormat])(d);
    } else {
      return d;
    }
  }).styles((d, i) => styles[labelStyles[i]]);
  labelsLayer.selectAll('text').call(sel => {
    return sel.attr('transform', function (d) {
      const height = sel.node().getBBox().height;
      return `translate(0,${-height / 2})`;
    });
  });

  if (showLabelsOutline) {
    // NOTE: Adobe Illustrator does not support paint-order attr
    labelsLayer.selectAll('text').styles(styles.labelOutline);
  }

  if (showLegend) {
    // svg width is adjusted automatically because of the "container:height" annotation in legendWidth visual option
    const legendLayer = select(svgNode).append('g').attr('id', 'legend').attr('transform', `translate(${width},${marginTop})`);
    const chartLegend = legend().legendWidth(legendWidth);

    if (mapping.color.value) {
      chartLegend.addColor(mapping.color.value, colorScale);
    }

    if (mapping.size.value) {
      const legendSizeScale = sizeScale.copy();
      const maxSize = sizeScale(max(data, d => d.size)) > legendWidth * 0.66 ? legendWidth * 0.66 : sizeScale(max(data, d => d.size));
      const shape = rounding >= 100 ? 'circle' : 'square';
      legendSizeScale.domain(extent(data, d => d.size)).rangeRound([sizeScale(min(data, d => d.size)), maxSize]);

      if (shape === 'circle') {
        legendSizeScale.rangeRound(legendSizeScale.range().map(d => d / 2));
      }

      chartLegend.addSize(mapping.size.value, legendSizeScale, shape);
    }

    legendLayer.call(chartLegend);
  }
}

const visualOptions$j = {
  marginTop: {
    type: 'number',
    label: 'Margin (top)',
    default: 100,
    group: 'artboard'
  },
  marginRight: {
    type: 'number',
    label: 'Margin (right)',
    default: 50,
    group: 'artboard'
  },
  marginBottom: {
    type: 'number',
    label: 'Margin (bottom)',
    default: 50,
    group: 'artboard'
  },
  marginLeft: {
    type: 'number',
    label: 'Margin (left)',
    default: 50,
    group: 'artboard'
  },
  showLegend: {
    type: 'boolean',
    label: 'Show legend',
    default: false,
    group: 'artboard'
  },
  legendWidth: {
    type: 'number',
    label: 'Legend width',
    default: 200,
    group: 'artboard',
    disabled: {
      showLegend: false
    },
    container: 'width',
    containerCondition: {
      showLegend: true
    }
  },
  rounding: {
    type: 'number',
    label: 'Round Corners (%)',
    default: 0,
    min: 0,
    max: 100,
    step: 1,
    group: 'chart'
  },
  padding: {
    type: 'number',
    label: 'Padding',
    default: 2,
    group: 'chart'
  },
  sortXAxisBy: {
    type: 'text',
    label: 'Sort X axis by',
    group: 'chart',
    options: ['Total value (descending)', 'Total value (ascending)', 'Name', 'Original'],
    default: 'Original'
  },
  sortYAxisBy: {
    type: 'text',
    label: 'Sort Y axis by',
    group: 'chart',
    options: ['Total value (descending)', 'Total value (ascending)', 'Name', 'Original'],
    default: 'Original'
  },
  showGrid: {
    type: 'boolean',
    label: 'Show grid',
    default: false,
    group: 'chart'
  },
  labelStyles: {
    type: 'text',
    label: 'Label',
    group: 'labels',
    options: [{
      label: 'Primary',
      value: 'labelPrimary'
    }, {
      label: 'Secondary',
      value: 'labelSecondary'
    }, {
      label: 'Italic',
      value: 'labelItalic'
    }],
    default: 'labelPrimary',
    repeatFor: 'label',
    repeatDefault: ['labelPrimary', 'labelSecondary', 'labelItalic']
  },
  showLabelsOutline: {
    type: 'boolean',
    label: 'Show outline',
    default: false,
    group: 'labels'
  },
  colorScale: {
    type: 'colorScale',
    label: 'Color scale',
    dimension: 'color',
    default: {
      scaleType: 'ordinal',
      interpolator: 'interpolateSpectral'
    },
    group: 'colors'
  }
};

var matrixplot = {
  metadata: metadata$j,
  dimensions: dimensions$j,
  mapData: mapData$j,
  render: render$j,
  visualOptions: visualOptions$j,
  styles: styles$1
};

var img$C = "data:image/svg+xml,%3csvg id='rawgraphs-icons' xmlns='http://www.w3.org/2000/svg' width='56' height='56' viewBox='0 0 56 56'%3e %3cdefs%3e %3cstyle%3e .cls-1 %7b fill: %2395e5c0%3b %7d .cls-2 %7b fill: %2306c26c%3b %7d %3c/style%3e %3c/defs%3e %3cg id='secundary'%3e %3crect class='cls-1' x='8' y='8' width='1' height='40'/%3e %3crect class='cls-1' x='47' y='8' width='1' height='40'/%3e %3crect class='cls-1' x='21' y='8' width='1' height='40'/%3e %3crect class='cls-1' x='34' y='8' width='1' height='40'/%3e %3c/g%3e %3cg id='primary'%3e %3cpolygon class='cls-2' points='34.34 30.518 21.356 17.91 8.148 21.497 7.886 20.532 21.644 16.796 34.66 29.435 47.894 26.822 48.087 27.803 34.34 30.518'/%3e %3cpolygon class='cls-2' points='8.567 42.77 7.796 42.132 21.115 26.021 34.419 14.916 48.161 21.059 47.752 21.972 34.581 16.084 21.82 26.723 8.567 42.77'/%3e %3cpolygon class='cls-2' points='8.2 45.594 7.86 44.654 21.455 39.732 34.585 42.007 48.064 43.886 47.926 44.876 34.431 42.995 21.545 40.762 8.2 45.594'/%3e %3c/g%3e%3c/svg%3e";

var img$D = "data:image/svg+xml,%3csvg id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' width='320' height='160' viewBox='0 0 320 160'%3e %3cdefs%3e %3cstyle%3e .cls-1%2c .cls-2%2c .cls-3%2c .cls-4%2c .cls-5%2c .cls-6%2c .cls-7 %7b fill: none%3b %7d .cls-1 %7b stroke: %235e4fa2%3b %7d .cls-1%2c .cls-2%2c .cls-3%2c .cls-4%2c .cls-5%2c .cls-6 %7b stroke-miterlimit: 10%3b stroke-width: 0.5px%3b %7d .cls-2 %7b stroke: %239e0142%3b %7d .cls-3 %7b stroke: %2369bda9%3b %7d .cls-4 %7b stroke: %23e0f3a1%3b %7d .cls-5 %7b stroke: %23fedd8d%3b %7d .cls-6 %7b stroke: %23f0704a%3b %7d .cls-7 %7b stroke: black%3b %7d .cls-8 %7b isolation: isolate%3b font-size: 12.0609px%3b font-family: ArialMT%2c Arial%3b %7d %3c/style%3e %3c/defs%3e %3cg%3e %3cpath class='cls-1' d='M28.65%2c150.6186l96.5822-60.3047%2c96.5822%2c57.8516%2c96.5821%2c2.4531'/%3e %3cpath class='cls-1' d='M28.65%2c146.5983l96.5822-50.2539%2c96.5822%2c44.4619%2c96.5821%2c3.7818'/%3e %3cpath class='cls-1' d='M28.65%2c146.5983l96.5822-56.2844%2c96.5822%2c52.9455%2c96.5821%2c1.3287'/%3e %3cpath class='cls-1' d='M28.65%2c146.5983l96.5822-68.3454%2c96.5822%2c65.0065%2c96.5821%2c1.3287'/%3e %3cpath class='cls-1' d='M28.65%2c142.578l96.5822-10.0508%2c96.5822%2c10.7322%2c96.5821-4.7018'/%3e %3cpath class='cls-1' d='M28.65%2c138.5576l96.5822-54.2742%2c96.5822%2c54.07%2c96.5821%2c6.2349'/%3e %3cpath class='cls-1' d='M28.65%2c138.5576%2c125.2325%2c66.192l96.5822%2c74.6143%2c96.5821-2.2487'/%3e %3cpath class='cls-2' d='M28.65%2c138.5576l96.5822-84.4265%2c96.5822%2c96.4875%2c96.5821-6.03'/%3e %3cpath class='cls-1' d='M28.65%2c138.5576l96.5822-60.3047%2c96.5822%2c62.5534%2c96.5821%2c3.7818'/%3e %3cpath class='cls-1' d='M28.65%2c134.5373l96.5822-56.2844%2c96.5822%2c65.0065%2c96.5821%2c1.3287'/%3e %3cpath class='cls-1' d='M28.65%2c134.5373l96.5822-56.2844L221.8147%2c135.9l96.5821%2c8.688'/%3e %3cpath class='cls-2' d='M28.65%2c130.517l96.5822-64.325L221.8147%2c135.9l96.5821%2c8.688'/%3e %3cpath class='cls-1' d='M28.65%2c130.517l96.5822-40.2031%2c96.5822%2c50.4924%2c96.5821%2c9.8123'/%3e %3cpath class='cls-2' d='M28.65%2c130.517l96.5822-64.325%2c96.5822%2c62.3489%2c96.5821%2c16.0472'/%3e %3cpath class='cls-2' d='M28.65%2c130.517l96.5822-46.2336L221.8147%2c135.9l96.5821%2c8.688'/%3e %3cpath class='cls-1' d='M28.65%2c130.517l96.5822-40.2031%2c96.5822%2c50.4924%2c96.5821-2.2487'/%3e %3cpath class='cls-2' d='M28.65%2c126.4967l96.5822-36.1828%2c96.5822%2c50.4924%2c96.5821%2c3.7818'/%3e %3cpath class='cls-2' d='M28.65%2c126.4967l96.5822-42.2133%2c96.5822%2c54.07%2c96.5821%2c12.2654'/%3e %3cpath class='cls-2' d='M28.65%2c126.4967l96.5822-42.2133%2c96.5822%2c54.07%2c96.5821%2c12.2654'/%3e %3cpath class='cls-2' d='M28.65%2c126.4967l96.5822-42.2133%2c96.5822%2c54.07%2c96.5821%2c12.2654'/%3e %3cpath class='cls-1' d='M28.65%2c126.4967h96.5822l96.5822-32.2988%2c96.5821%2c2.1465'/%3e %3cpath class='cls-1' d='M28.65%2c126.4967l96.5822-6.0305L221.8147%2c64.761l96.5821-10.63'/%3e %3cpath class='cls-2' d='M28.65%2c122.4764l96.5822-68.3453%2c96.5822%2c86.6752%2c96.5821%2c3.7818'/%3e %3cpath class='cls-2' d='M28.65%2c122.4764%2c125.2325%2c66.192l96.5822%2c72.1612%2c96.5821%2c6.2349'/%3e %3cpath class='cls-2' d='M28.65%2c122.4764l96.5822-32.1625L221.8147%2c135.9l96.5821%2c8.688'/%3e %3cpath class='cls-2' d='M28.65%2c122.4764%2c125.2325%2c66.192%2c221.8147%2c135.9l96.5821-3.3729'/%3e %3cpath class='cls-2' d='M28.65%2c122.4764l96.5822-44.2235%2c96.5822%2c67.46%2c96.5821-1.1243'/%3e %3cpath class='cls-2' d='M28.65%2c122.4764l96.5822-62.3149%2c96.5822%2c83.0979%2c96.5821-4.7018'/%3e %3cpath class='cls-2' d='M28.65%2c122.4764l96.5822-62.3149L221.8147%2c135.9l96.5821-15.4339'/%3e %3cpath class='cls-2' d='M28.65%2c122.4764l96.5822-50.2539%2c96.5822%2c68.5838%2c96.5821%2c3.7818'/%3e %3cpath class='cls-1' d='M28.65%2c122.4764l96.5822%2c28.1422%2c96.5822-61.3268%2c96.5821%2c7.0526'/%3e %3cpath class='cls-1' d='M28.65%2c122.4764l96.5822%2c10.0508%2c96.5822-38.3293%2c96.5821%2c2.1465'/%3e %3cpath class='cls-2' d='M28.65%2c118.4561l96.5822-58.2946%2c96.5822%2c80.6448%2c96.5821%2c3.7818'/%3e %3cpath class='cls-2' d='M28.65%2c118.4561l96.5822-58.2946%2c96.5822%2c80.6448%2c96.5821-2.2487'/%3e %3cpath class='cls-2' d='M28.65%2c118.4561%2c125.2325%2c42.07l96.5822%2c96.2831%2c96.5821.2044'/%3e %3cpath class='cls-2' d='M28.65%2c118.4561l96.5822-70.3555%2c96.5822%2c90.2526%2c96.5821-5.826'/%3e %3cpath class='cls-2' d='M28.65%2c118.4561l96.5822-46.2336%2c96.5822%2c61.2246%2c96.5821-6.95'/%3e %3cpath class='cls-2' d='M28.65%2c118.4561%2c125.2325%2c66.192l96.5822%2c72.1612%2c96.5821%2c6.2349'/%3e %3cpath class='cls-2' d='M28.65%2c118.4561%2c125.2325%2c42.07l96.5822%2c86.4708%2c96.5821%2c3.9863'/%3e %3cpath class='cls-2' d='M28.65%2c118.4561%2c125.2325%2c42.07l96.5822%2c93.83%2c96.5821%2c8.688'/%3e %3cpath class='cls-1' d='M28.65%2c118.4561l96.5822%2c2.01%2c96.5822-18.9091%2c96.5821-11.2432'/%3e %3cpath class='cls-2' d='M28.65%2c114.4358l96.5822-54.2743%2c96.5822%2c78.1917%2c96.5821%2c6.2349'/%3e %3cpath class='cls-2' d='M28.65%2c114.4358%2c125.2325%2c66.192l96.5822%2c74.6143%2c96.5821%2c3.7818'/%3e %3cpath class='cls-2' d='M28.65%2c114.4358l96.5822-90.4571%2c96.5822%2c114.3745%2c96.5821%2c12.2654'/%3e %3cpath class='cls-3' d='M28.65%2c114.4358l96.5822-6.0305L221.8147%2c79.48l96.5821-7.257'/%3e %3cpath class='cls-2' d='M28.65%2c110.4154l96.5822-62.3148%2c96.5822%2c90.2526%2c96.5821%2c6.2349'/%3e %3cpath class='cls-2' d='M28.65%2c106.3951%2c125.2325%2c36.04l96.5822%2c97.4074%2c96.5821-.92'/%3e %3cpath class='cls-2' d='M28.65%2c106.3951l96.5822-58.2945%2c96.5822%2c90.2526%2c96.5821%2c6.2349'/%3e %3cpath class='cls-2' d='M28.65%2c106.3951%2c125.2325%2c36.04l96.5822%2c107.22%2c96.5821-10.7322'/%3e %3cpath class='cls-2' d='M28.65%2c106.3951%2c125.2325%2c66.192l96.5822%2c67.2551%2c96.5821%2c11.141'/%3e %3cpath class='cls-2' d='M28.65%2c106.3951%2c125.2325%2c66.192l96.5822%2c72.1612%2c96.5821-5.826'/%3e %3cpath class='cls-3' d='M28.65%2c106.3951l96.5822-16.0812L221.8147%2c64.761l96.5821%2c1.431'/%3e %3cpath class='cls-2' d='M28.65%2c102.3748l96.5822-84.4266%2c96.5822%2c122.8581%2c96.5821%2c3.7818'/%3e %3cpath class='cls-2' d='M28.65%2c102.3748l96.5822-42.2133%2c96.5822%2c83.0979%2c96.5821%2c1.3287'/%3e %3cpath class='cls-3' d='M28.65%2c102.3748l96.5822%2c30.1524%2c96.5822-55.5008%2c96.5821%2c1.2265'/%3e %3cpath class='cls-3' d='M28.65%2c102.3748l96.5822%2c24.1219%2c96.5822-44.5642%2c96.5821%2c8.3814'/%3e %3cpath class='cls-1' d='M28.65%2c102.3748l96.5822%2c24.1219%2c96.5822-42.1111%2c96.5821%2c11.9588'/%3e %3cpath class='cls-3' d='M28.65%2c102.3748l96.5822%2c18.0914%2c96.5822-43.44%2c96.5821%2c1.2265'/%3e %3cpath class='cls-3' d='M28.65%2c102.3748l96.5822%2c12.061%2c96.5822-47.2217%2c96.5821%2c17.0693'/%3e %3cpath class='cls-3' d='M28.65%2c98.3545l96.5822-2.01%2c96.5822-9.5057%2c96.5821-8.5858'/%3e %3cpath class='cls-3' d='M28.65%2c98.3545l96.5822-8.0406L221.8147%2c64.761l96.5821%2c1.431'/%3e %3cpath class='cls-3' d='M28.65%2c98.3545l96.5822%2c22.1117L221.8147%2c79.48l96.5821%2c10.8344'/%3e %3cpath class='cls-3' d='M28.65%2c98.3545l96.5822-8.0406%2c96.5822-15.7406%2c96.5821%2c3.68'/%3e %3cpath class='cls-3' d='M28.65%2c98.3545l96.5822%2c10.0508L221.8147%2c72.12l96.5821%2c6.1326'/%3e %3cpath class='cls-4' d='M28.65%2c98.3545l96.5822%2c4.02%2c96.5822-47.426L318.3968%2c36.04'/%3e %3cpath class='cls-2' d='M28.65%2c94.3342%2c125.2325%2c5.8873l96.5822%2c132.4659%2c96.5821-5.826'/%3e %3cpath class='cls-2' d='M28.65%2c94.3342%2c125.2325%2c42.07l96.5822%2c91.377%2c96.5821%2c5.1105'/%3e %3cpath class='cls-3' d='M28.65%2c94.3342l96.5822%2c8.0406L221.8147%2c64.761l96.5821%2c13.4919'/%3e %3cpath class='cls-1' d='M28.65%2c94.3342l96.5822%2c20.1016%2c96.5822-25.144%2c96.5821%2c7.0526'/%3e %3cpath class='cls-3' d='M28.65%2c94.3342l96.5822-4.02L221.8147%2c72.12l96.5821%2c12.1631'/%3e %3cpath class='cls-3' d='M28.65%2c94.3342l96.5822%2c2.01L221.8147%2c72.12l96.5821%2c6.1326'/%3e %3cpath class='cls-3' d='M28.65%2c94.3342l96.5822%2c8.0406%2c96.5822-27.8015%2c96.5821%2c3.68'/%3e %3cpath class='cls-4' d='M28.65%2c94.3342l96.5822%2c26.132%2c96.5822-67.97L318.3968%2c36.04'/%3e %3cpath class='cls-2' d='M28.65%2c90.3139l96.5822-60.3047%2c96.5822%2c115.7032%2c96.5821-1.1243'/%3e %3cpath class='cls-3' d='M28.65%2c90.3139l96.5822%2c18.0914%2c96.5822-33.832%2c96.5821%2c21.7711'/%3e %3cpath class='cls-3' d='M28.65%2c90.3139l96.5822%2c18.0914L221.8147%2c79.48l96.5821%2c4.8039'/%3e %3cpath class='cls-3' d='M28.65%2c90.3139l96.5822%2c24.1219%2c96.5822-37.4094%2c96.5821%2c7.257'/%3e %3cpath class='cls-4' d='M28.65%2c90.3139l96.5822%2c18.0914%2c96.5822-58.3627L318.3968%2c42.07'/%3e %3cpath class='cls-5' d='M28.65%2c90.3139l96.5822%2c12.0609%2c96.5822-52.3322%2c96.5821-38.1248'/%3e %3cpath class='cls-4' d='M28.65%2c90.3139l96.5822%2c18.0914%2c96.5822-58.3627L318.3968%2c42.07'/%3e %3cpath class='cls-3' d='M28.65%2c86.2936l96.5822%2c4.02L221.8147%2c72.12l96.5821-5.9283'/%3e %3cpath class='cls-4' d='M28.65%2c86.2936l96.5822-8.0407%2c96.5822-20.8511%2c96.5821-9.3012'/%3e %3cpath class='cls-4' d='M28.65%2c86.2936l96.5822%2c4.02%2c96.5822-40.2713%2c96.5821-1.942'/%3e %3cpath class='cls-3' d='M28.65%2c82.2733l96.5822%2c56.2843%2c96.5822-61.5312%2c96.5821%2c19.318'/%3e %3cpath class='cls-3' d='M28.65%2c82.2733l96.5822%2c14.0711L221.8147%2c64.761l96.5821%2c1.431'/%3e %3cpath class='cls-4' d='M28.65%2c82.2733l96.5822%2c26.132%2c96.5822-58.3627%2c96.5821%2c10.1189'/%3e %3cpath class='cls-3' d='M28.65%2c82.2733%2c125.2325%2c66.192l96.5822-1.431%2c96.5821-4.5995'/%3e %3cpath class='cls-4' d='M28.65%2c82.2733l96.5822%2c56.2843%2c96.5822-86.0619L318.3968%2c66.192'/%3e %3cpath class='cls-4' d='M28.65%2c82.2733l96.5822%2c8.0406%2c96.5822-32.9121%2c96.5821-9.3012'/%3e %3cpath class='cls-3' d='M28.65%2c78.2529l96.5822%2c18.0915%2c96.5822-36.4895%2c96.5821%2c12.3676'/%3e %3cpath class='cls-3' d='M28.65%2c78.2529l96.5822%2c24.1219%2c96.5822-25.3484%2c96.5821%2c1.2265'/%3e %3cpath class='cls-3' d='M28.65%2c78.2529l96.5822%2c24.1219%2c96.5822-42.52%2c96.5821%2c24.4285'/%3e %3cpath class='cls-3' d='M28.65%2c78.2529l96.5822%2c12.061L221.8147%2c62.308l96.5821%2c9.9145'/%3e %3cpath class='cls-4' d='M28.65%2c78.2529l96.5822%2c12.061%2c96.5822-35.3651%2c96.5821-6.8482'/%3e %3cpath class='cls-4' d='M28.65%2c78.2529l96.5822%2c36.1829%2c96.5822-76.6586%2c96.5821%2c34.4453'/%3e %3cpath class='cls-3' d='M28.65%2c74.2326l96.5822%2c64.325L221.8147%2c64.761l96.5821%2c1.431'/%3e %3cpath class='cls-3' d='M28.65%2c74.2326l96.5822%2c22.1118%2c96.5822-26.6772%2c96.5821%2c8.5857'/%3e %3cpath class='cls-4' d='M28.65%2c74.2326l96.5822%2c28.1422%2c96.5822-44.973%2c96.5821-9.3012'/%3e %3cpath class='cls-5' d='M28.65%2c74.2326l96.5822-8.0406%2c96.5822-23.5086%2c96.5821-24.7352'/%3e %3cpath class='cls-3' d='M28.65%2c70.2123l96.5822%2c2.01%2c96.5822-12.3676%2c96.5821.3066'/%3e %3cpath class='cls-3' d='M28.65%2c70.2123l96.5822%2c50.2539%2c96.5822-65.5174L318.3968%2c66.192'/%3e %3cpath class='cls-3' d='M28.65%2c70.2123l96.5822%2c62.3149%2c96.5822-65.3131%2c96.5821%2c11.0388'/%3e %3cpath class='cls-6' d='M28.65%2c70.2123l96.5822%2c2.01L221.8147%2c27.965%2c318.3968%2c5.8873'/%3e %3cpath class='cls-4' d='M28.65%2c70.2123l96.5822%2c26.1321%2c96.5822-58.5672%2c96.5821%2c10.3234'/%3e %3cpath class='cls-4' d='M28.65%2c70.2123l96.5822%2c38.193%2c96.5822-53.4565%2c96.5821-6.8482'/%3e %3cpath class='cls-4' d='M28.65%2c70.2123l96.5822%2c32.1625%2c96.5822-52.3322L318.3968%2c66.192'/%3e %3cpath class='cls-5' d='M28.65%2c70.2123l96.5822-4.02%2c96.5822-28.4148%2c96.5821-25.8594'/%3e %3cpath class='cls-4' d='M28.65%2c70.2123l96.5822%2c50.2539%2c96.5822-67.97L318.3968%2c42.07'/%3e %3cpath class='cls-3' d='M28.65%2c66.192l96.5822%2c12.0609L221.8147%2c64.761l96.5821%2c1.431'/%3e %3cpath class='cls-3' d='M28.65%2c66.192l96.5822%2c30.1524%2c96.5822-26.6772%2c96.5821%2c8.5857'/%3e %3cpath class='cls-4' d='M28.65%2c66.192l96.5822%2c42.2133%2c96.5822-63.2688L318.3968%2c42.07'/%3e %3cpath class='cls-5' d='M28.65%2c66.192l96.5822%2c12.0609%2c96.5822-33.1164%2c96.5821-27.1883'/%3e %3cpath class='cls-5' d='M28.65%2c66.192l96.5822%2c36.1828%2c96.5822-64.5976%2c96.5821-7.768'/%3e %3cpath class='cls-5' d='M28.65%2c66.192l96.5822%2c36.1828%2c96.5822-64.5976%2c96.5821-13.7985'/%3e %3cpath class='cls-4' d='M28.65%2c66.192l96.5822%2c18.0914L221.8147%2c40.23l96.5821%2c7.87'/%3e %3cpath class='cls-3' d='M28.65%2c62.1717l96.5822%2c40.2031L221.8147%2c62.308l96.5821%2c3.884'/%3e %3cpath class='cls-5' d='M28.65%2c62.1717l96.5822%2c28.1422%2c96.5822-57.4428%2c96.5821-8.8924'/%3e %3cpath class='cls-4' d='M28.65%2c62.1717l96.5822%2c16.0812%2c96.5822-28.21L318.3968%2c36.04'/%3e %3cpath class='cls-4' d='M28.65%2c62.1717l96.5822%2c28.1422L221.8147%2c40.23l96.5821%2c7.87'/%3e %3cpath class='cls-4' d='M28.65%2c62.1717l96.5822%2c28.1422L221.8147%2c47.59l96.5821-11.55'/%3e %3cpath class='cls-3' d='M28.65%2c58.1514l96.5822%2c38.193L221.8147%2c62.308l96.5821%2c15.9449'/%3e %3cpath class='cls-3' d='M28.65%2c58.1514l96.5822%2c32.1625%2c96.5822-23.1%2c96.5821%2c5.0084'/%3e %3cpath class='cls-3' d='M28.65%2c54.1311l96.5822%2c30.1523%2c96.5822-17.0693%2c96.5821%2c5.0084'/%3e %3cpath class='cls-4' d='M28.65%2c54.1311l96.5822%2c36.1828%2c96.5822-37.8182%2c96.5821%2c1.6354'/%3e %3cpath class='cls-3' d='M28.65%2c54.1311l96.5822%2c30.1523%2c96.5822-24.4285%2c96.5821%2c6.3371'/%3e %3cpath class='cls-5' d='M28.65%2c54.1311l96.5822%2c66.3351%2c96.5822-87.5951%2c96.5821%2c15.23'/%3e %3cpath class='cls-5' d='M28.65%2c54.1311l96.5822%2c18.0914%2c96.5822-36.8983%2c96.5821-5.315'/%3e %3cpath class='cls-5' d='M28.65%2c54.1311l96.5822%2c30.1523%2c96.5822-46.5062%2c96.5821-25.8594'/%3e %3cpath class='cls-6' d='M28.65%2c54.1311l96.5822%2c18.0914%2c96.5822-36.8983L318.3968%2c5.8873'/%3e %3cpath class='cls-5' d='M28.65%2c54.1311l96.5822%2c36.1828L221.8147%2c47.59l96.5821-29.6413'/%3e %3cpath class='cls-3' d='M28.65%2c50.1107l96.5822%2c52.2641%2c96.5822-44.973%2c96.5821%2c14.8207'/%3e %3cpath class='cls-5' d='M28.65%2c50.1107l96.5822%2c40.2032L221.8147%2c40.23l96.5821-10.2211'/%3e %3cpath class='cls-6' d='M28.65%2c50.1107l96.5822%2c28.1422L221.8147%2c30.418l96.5821-12.47'/%3e %3cpath class='cls-3' d='M28.65%2c46.09l96.5822%2c38.193%2c96.5822-29.3346L318.3968%2c66.192'/%3e %3cpath class='cls-5' d='M28.65%2c46.09l96.5822%2c32.1625%2c96.5822-42.9287%2c96.5821-17.376'/%3e %3cpath class='cls-5' d='M28.65%2c46.09l96.5822%2c38.193%2c96.5822-41.6%2c96.5821-12.6742'/%3e %3cpath class='cls-5' d='M28.65%2c46.09l96.5822%2c38.193%2c96.5822-34.2408%2c96.5821-32.0944'/%3e %3cpath class='cls-3' d='M28.65%2c42.07l96.5822%2c36.1828%2c96.5822-18.398%2c96.5821%2c12.3676'/%3e %3cpath class='cls-5' d='M28.65%2c38.05l96.5822%2c52.2641L221.8147%2c30.418l96.5821-.4088'/%3e %3cpath class='cls-6' d='M28.65%2c34.03l96.5822%2c20.1016%2c96.5822-28.6192L318.3968%2c5.8873'/%3e %3cpath class='cls-5' d='M28.65%2c34.03l96.5822%2c44.2234L221.8147%2c27.965l96.5821%2c20.1356'/%3e %3cpath class='cls-4' d='M28.65%2c34.03l96.5822%2c56.2844%2c96.5822-57.4428%2c96.5821%2c27.29'/%3e %3cpath class='cls-5' d='M28.65%2c30.0092l96.5822%2c66.3352%2c96.5822-75.7387%2c96.5821%2c27.4949'/%3e %3cpath class='cls-5' d='M28.65%2c25.9889l96.5822%2c76.3859%2c96.5822-76.8629L318.3968%2c42.07'/%3e %3cpath class='cls-6' d='M28.65%2c17.9482l96.5822%2c72.3657%2c96.5822-77.0674%2c96.5821%2c16.7627'/%3e %3cpath class='cls-6' d='M28.65%2c13.9279%2c125.2325%2c42.07l96.5822-31.2767%2c96.5821%2c13.1853'/%3e %3cpath class='cls-6' d='M28.65%2c13.9279l96.5822%2c100.5079L221.8147%2c5.8873l96.5821%2c12.0609'/%3e %3cpath class='cls-6' d='M28.65%2c13.9279l96.5822%2c88.4469%2c96.5822-91.5814L318.3968%2c36.04'/%3e %3cpath class='cls-6' d='M28.65%2c13.9279l96.5822%2c76.386%2c96.5822-64.802%2c96.5821-7.5637'/%3e %3cpath class='cls-6' d='M28.65%2c5.8873%2c125.2325%2c42.07l96.5822-23.9174L318.3968%2c36.04'/%3e %3cg%3e %3cpath class='cls-7' d='M21.4066%2c151.2216H29.254V6.49H21.4066'/%3e %3cline class='cls-7' x1='28.6503' y1='123.0794' x2='21.4066' y2='123.0794'/%3e %3cline class='cls-7' x1='28.6503' y1='82.8763' x2='21.4066' y2='82.8763'/%3e %3cline class='cls-7' x1='28.6503' y1='42.6732' x2='21.4066' y2='42.6732'/%3e %3cpath class='cls-7' d='M117.9888%2c151.2216h7.8473V6.49'/%3e %3cline class='cls-7' x1='125.2325' y1='151.2216' x2='117.9888' y2='151.2216'/%3e %3cline class='cls-7' x1='125.2325' y1='90.9169' x2='117.9888' y2='90.9169'/%3e %3cline class='cls-7' x1='125.2325' y1='30.6122' x2='117.9888' y2='30.6122'/%3e %3cline class='cls-7' x1='125.2325' y1='60.7646' x2='117.9888' y2='60.7646'/%3e %3cline class='cls-7' x1='125.8361' y1='6.4903' x2='118.5925' y2='6.4903'/%3e %3cline class='cls-7' x1='125.2325' y1='121.0693' x2='117.9888' y2='121.0693'/%3e %3cpath class='cls-7' d='M214.571%2c151.2216h7.8473V6.49H214.571'/%3e %3cline class='cls-7' x1='221.8147' y1='151.2216' x2='214.571' y2='151.2216'/%3e %3cline class='cls-7' x1='221.8147' y1='126.6909' x2='214.571' y2='126.6909'/%3e %3cline class='cls-7' x1='221.8147' y1='102.1602' x2='214.571' y2='102.1602'/%3e %3cline class='cls-7' x1='221.8147' y1='77.6295' x2='214.571' y2='77.6295'/%3e %3cline class='cls-7' x1='221.8147' y1='53.0987' x2='214.571' y2='53.0987'/%3e %3cline class='cls-7' x1='221.8147' y1='28.568' x2='214.571' y2='28.568'/%3e %3cpath class='cls-7' d='M311.1532%2c151.2216h7.8473V6.49h-7.8473'/%3e %3cline class='cls-7' x1='318.3968' y1='133.1302' x2='311.1532' y2='133.1302'/%3e %3cline class='cls-7' x1='318.3968' y1='109.0083' x2='311.1532' y2='109.0083'/%3e %3cline class='cls-7' x1='318.3968' y1='84.8865' x2='311.1532' y2='84.8865'/%3e %3cline class='cls-7' x1='318.3968' y1='60.7646' x2='311.1532' y2='60.7646'/%3e %3cline class='cls-7' x1='318.3968' y1='36.6427' x2='311.1532' y2='36.6427'/%3e %3cline class='cls-7' x1='318.3968' y1='12.5208' x2='311.1532' y2='12.5208'/%3e %3c/g%3e %3cg%3e %3ctext class='cls-8' transform='translate(12.2871 126.9392)'%3e5%3c/text%3e %3ctext class='cls-8' transform='translate(12.2871 86.7351)'%3e6%3c/text%3e %3ctext class='cls-8' transform='translate(12.2866 46.5327)'%3e6%3c/text%3e %3ctext class='cls-8' transform='translate(12.2861 10.3498)'%3e7%3c/text%3e %3ctext class='cls-8' transform='translate(108.8701 155.0818)'%3e2%3c/text%3e %3ctext class='cls-8' transform='translate(108.8701 94.7771)'%3e3%3c/text%3e %3ctext class='cls-8' transform='translate(108.8701 34.4724)'%3e4%3c/text%3e %3ctext class='cls-8' transform='translate(205.4512 155.0818)'%3e1%3c/text%3e %3ctext class='cls-8' transform='translate(205.4512 130.5515)'%3e2%3c/text%3e %3ctext class='cls-8' transform='translate(205.4512 106.0193)'%3e3%3c/text%3e %3ctext class='cls-8' transform='translate(205.4512 81.489)'%3e4%3c/text%3e %3ctext class='cls-8' transform='translate(205.4512 56.9587)'%3e5%3c/text%3e %3ctext class='cls-8' transform='translate(205.4512 32.4272)'%3e5%3c/text%3e %3ctext class='cls-8' transform='translate(205.4512 10.3498)'%3e6%3c/text%3e %3ctext class='cls-8' transform='translate(291.9648 136.989)'%3e0.4%3c/text%3e %3ctext class='cls-8' transform='translate(291.9648 112.8679)'%3e0.8%3c/text%3e %3ctext class='cls-8' transform='translate(291.9648 88.7458)'%3e1.2%3c/text%3e %3ctext class='cls-8' transform='translate(291.9648 64.6242)'%3e1.6%3c/text%3e %3ctext class='cls-8' transform='translate(291.9648 40.5027)'%3e2.0%3c/text%3e %3ctext class='cls-8' transform='translate(291.9648 16.3811)'%3e2.4%3c/text%3e %3c/g%3e %3c/g%3e%3c/svg%3e";

const metadata$k = {
  name: 'Parallel coordinates',
  id: 'rawgraphs.parallelcoordinates',
  thumbnail: img$D,
  icon: img$C,
  categories: ['correlations', 'distributions'],
  description: 'It displays multiple continuous dimensions as axes, and each row in the dataset produces a line connecting its values across the axes.',
  code: 'https://github.com/rawgraphs/rawgraphs-charts/tree/master/src/parallelcoordinates',
  tutorial: 'https://rawgraphs.io/learning/how-to-make-parallel-coordinates/'
};

const dimensions$k = [{
  id: 'dimensions',
  name: 'Dimensions',
  validTypes: ['number', 'date'],
  required: true,
  multiple: true
}, {
  id: 'color',
  name: 'Color',
  validTypes: ['number', 'date', 'string'],
  required: false
}];

const mapData$k = {
  dimensions: 'get',
  color: 'get'
};

/*
Credits:
Inspired by https://observablehq.com/@d3/parallel-coordinates
*/

function render$k(node, data, visualOptions, mapping, originalData, styles) {
  // destructurate visual visualOptions
  const {
    // default options
    width,
    height,
    background,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    // chart
    orientation,
    strokeWidth,
    strokeOpacity,
    // color
    colorScale,
    // legend
    showLegend,
    legendWidth // add below other options defined in visualOptions.js

  } = visualOptions;
  const margin = {
    top: marginTop,
    right: marginRight,
    bottom: marginBottom,
    left: marginLeft
  };
  let chartWidth = width - margin.left - margin.right;
  let chartHeight = height - margin.top - margin.bottom; // select the SVG element

  const svg = select(node); // add background

  svg.append('rect').attr('width', showLegend ? width + legendWidth : width).attr('height', height).attr('x', 0).attr('y', 0).attr('fill', background).attr('id', 'background'); //add viz group

  let viz = svg.append('g').attr('id', 'viz').attr('transform', `translate(${margin.left},${margin.top})`); // create a boolean variable for simplicity

  const horizontal = orientation == 'horizontal';
  const keys = mapping.dimensions.value;
  const axesScales = new Map(Array.from(keys, (key, i) => [key, scaleLinear(extent(data, d => d.dimensions[i]), [0, horizontal ? chartWidth : chartHeight])]));
  const catScales = scalePoint(keys, [0, horizontal ? chartHeight : chartWidth]);
  const line$1 = line();

  if (horizontal) {
    line$1.x((d, i) => axesScales.get(keys[i])(d)).y((d, i) => catScales(keys[i]));
  } else {
    line$1.y((d, i) => axesScales.get(keys[i])(d)).x((d, i) => catScales(keys[i]));
  } //add lines


  viz.append('g').attr('id', 'lines').attr('fill', 'none').selectAll('path').data(data).join('path').attr('d', d => line$1(d.dimensions)).attr('stroke', d => colorScale(d.color)).attr('stroke-width', strokeWidth).attr('stroke-opacity', strokeOpacity); // add axes

  viz.append('g').selectAll('g').data(keys).join('g').attr('transform', d => horizontal ? `translate(0,${catScales(d)})` : `translate(${catScales(d)},0)`).each(function (d) {
    if (horizontal) {
      select(this).call(axisBottom(axesScales.get(d)));
    } else {
      select(this).call(axisLeft(axesScales.get(d)));
    }
  }).call(g => g.append('text').attr('y', -6).attr('text-anchor', 'start').attr('fill', 'currentColor').text(d => d));

  if (showLegend) {
    // svg width is adjusted automatically because of the "container:height" annotation in legendWidth visual option
    const legendLayer = svg.append('g').attr('id', 'legend').attr('transform', `translate(${width},${marginTop})`);
    const chartLegend = legend().legendWidth(legendWidth);

    if (mapping.color.value) {
      chartLegend.addColor(mapping.color.value, colorScale);
    }

    legendLayer.call(chartLegend);
  }
}

const visualOptions$k = {
  marginTop: {
    type: 'number',
    label: 'Margin (top)',
    default: 20,
    group: 'artboard'
  },
  marginRight: {
    type: 'number',
    label: 'Margin (right)',
    default: 20,
    group: 'artboard'
  },
  marginBottom: {
    type: 'number',
    label: 'Margin (bottom)',
    default: 20,
    group: 'artboard'
  },
  marginLeft: {
    type: 'number',
    label: 'Margin (left)',
    default: 20,
    group: 'artboard'
  },
  showLegend: {
    type: 'boolean',
    label: 'Show legend',
    default: false,
    group: 'artboard'
  },
  legendWidth: {
    type: 'number',
    label: 'Legend width',
    default: 200,
    group: 'artboard',
    disabled: {
      showLegend: false
    },
    container: 'width',
    containerCondition: {
      showLegend: true
    }
  },
  orientation: {
    type: 'text',
    label: 'Orientation',
    group: 'chart',
    options: [{
      label: 'Vertical',
      value: 'vertical'
    }, {
      label: 'Horizontal',
      value: 'horizontal'
    }],
    default: 'vertical'
  },
  strokeWidth: {
    type: 'number',
    label: 'Stroke width',
    default: 1,
    group: 'chart'
  },
  strokeOpacity: {
    group: 'chart',
    type: 'number',
    label: 'Lines opacity (0-1)',
    default: 0.5,
    step: 0.1,
    min: 0,
    max: 1
  },
  colorScale: {
    type: 'colorScale',
    label: 'Color scale',
    dimension: 'color',
    default: {
      scaleType: 'ordinal',
      interpolator: 'interpolateSpectral'
    },
    group: 'colors'
  }
};

var parallelcoordinates = {
  metadata: metadata$k,
  dimensions: dimensions$k,
  mapData: mapData$k,
  render: render$k,
  visualOptions: visualOptions$k,
  styles: styles$1
};

var img$E = "data:image/svg+xml,%3csvg id='rawgraphs-icons' xmlns='http://www.w3.org/2000/svg' width='56' height='56' viewBox='0 0 56 56'%3e %3cdefs%3e %3cstyle%3e .cls-1 %7b fill: %2395e5c0%3b %7d .cls-2 %7b fill: %2306c26c%3b %7d %3c/style%3e %3c/defs%3e %3cg id='secundary'%3e %3cpath class='cls-1' d='M29%2c7.0059A20.3962%2c20.3962%2c0%2c0%2c1%2c47.9209%2c20.92L29%2c26.82Z'/%3e %3cpath class='cls-1' d='M30.4805%2c27.4062%2c48.2178%2c21.875a20.556%2c20.556%2c0%2c0%2c1%2c.4384%2c9.36Z'/%3e %3c/g%3e %3cg id='primary'%3e %3cpath class='cls-2' d='M28.5%2c48A20.5%2c20.5%2c0%2c0%2c1%2c28%2c7.0059v20.9l20.4512%2c4.3086A20.5831%2c20.5831%2c0%2c0%2c1%2c28.5%2c48Z'/%3e %3c/g%3e%3c/svg%3e";

var img$F = "data:image/svg+xml,%3csvg id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' width='320' height='160' viewBox='0 0 320 160'%3e %3cdefs%3e %3cstyle%3e .cls-1 %7b fill: %239e0142%3b %7d .cls-1%2c .cls-2%2c .cls-3%2c .cls-4 %7b stroke: white%3b %7d .cls-2 %7b fill: %23fdbe70%3b %7d .cls-3 %7b fill: %23bee5a0%3b %7d .cls-4 %7b fill: %235e4fa2%3b %7d %3c/style%3e %3c/defs%3e %3cg id='viz'%3e %3cg id='pie'%3e %3cpath class='cls-1' d='M40%2c12.15253A27.84746%2c27.84746%2c0%2c0%2c1%2c63.049%2c55.62764L40%2c40Z'/%3e %3cpath class='cls-2' d='M63.049%2c55.62764a27.84753%2c27.84753%2c0%2c0%2c1-6.19647%2c6.54154L40%2c40Z'/%3e %3cpath class='cls-3' d='M56.85257%2c62.16918A27.84747%2c27.84747%2c0%2c0%2c1%2c13.16757%2c32.55L40%2c40Z'/%3e %3cpath class='cls-4' d='M13.16757%2c32.55A27.84747%2c27.84747%2c0%2c0%2c1%2c40%2c12.15253V40Z'/%3e %3c/g%3e %3cg id='pie-2' data-name='pie'%3e %3cpath class='cls-1' d='M120%2c10.51994a29.48006%2c29.48006%2c0%2c0%2c1%2c7.055%2c58.10348L120%2c40Z'/%3e %3cpath class='cls-2' d='M127.055%2c68.62342A29.48007%2c29.48007%2c0%2c0%2c1%2c90.73488%2c36.44657L120%2c40Z'/%3e %3cpath class='cls-3' d='M90.73488%2c36.44657A29.48008%2c29.48008%2c0%2c0%2c1%2c106.29993%2c13.8967L120%2c40Z'/%3e %3cpath class='cls-4' d='M106.29993%2c13.8967A29.48%2c29.48%2c0%2c0%2c1%2c120%2c10.51994V40Z'/%3e %3c/g%3e %3cg id='pie-3' data-name='pie'%3e %3cpath class='cls-1' d='M200%2c10.74759a29.25242%2c29.25242%2c0%2c0%2c1%2c22.61242%2c47.81L200%2c40Z'/%3e %3cpath class='cls-2' d='M222.61242%2c58.55754a29.25243%2c29.25243%2c0%2c0%2c1-48.41075-4.76805L200%2c40Z'/%3e %3cpath class='cls-3' d='M174.20167%2c53.78949a29.25244%2c29.25244%2c0%2c0%2c1%2c22.93109-42.901L200%2c40Z'/%3e %3cpath class='cls-4' d='M197.13276%2c10.88844q1.42931-.14076%2c2.86724-.14085V40Z'/%3e %3c/g%3e %3cg id='pie-4' data-name='pie'%3e %3cpath class='cls-1' d='M280%2c14.93194a25.06805%2c25.06805%2c0%2c0%2c1%2c15.53592%2c5.39466L280%2c40Z'/%3e %3cpath class='cls-2' d='M295.53592%2c20.3266A25.06806%2c25.06806%2c0%2c1%2c1%2c256.607%2c30.99035L280%2c40Z'/%3e %3cpath class='cls-3' d='M256.607%2c30.99035A25.068%2c25.068%2c0%2c0%2c1%2c267.2249%2c18.43141L280%2c40Z'/%3e %3cpath class='cls-4' d='M267.2249%2c18.43141A25.068%2c25.068%2c0%2c0%2c1%2c280%2c14.93194V40Z'/%3e %3c/g%3e %3cg id='pie-5' data-name='pie'%3e %3cpath class='cls-1' d='M40%2c107.33333a12.6667%2c12.6667%2c0%2c0%2c1%2c10.96966%2c6.33334L40%2c120Z'/%3e %3cpath class='cls-2' d='M50.96966%2c113.66667a12.66667%2c12.66667%2c0%2c0%2c1-4.63633%2c17.303L40%2c120Z'/%3e %3cpath class='cls-3' d='M46.33333%2c130.96966a12.66667%2c12.66667%2c0%2c0%2c1-17.303-17.303L40%2c120Z'/%3e %3cpath class='cls-4' d='M29.03034%2c113.66667A12.6667%2c12.6667%2c0%2c0%2c1%2c40%2c107.33333V120Z'/%3e %3c/g%3e %3cg id='pie-6' data-name='pie'%3e %3cpath class='cls-1' d='M120%2c82a38%2c38%2c0%2c0%2c1%2c36.4036%2c48.89852L120%2c120Z'/%3e %3cpath class='cls-2' d='M156.4036%2c130.89852a38%2c38%2c0%2c0%2c1-15.52226%2c20.85L120%2c120Z'/%3e %3cpath class='cls-3' d='M140.88134%2c151.74854a38%2c38%2c0%2c0%2c1-56.58966-44.74531L120%2c120Z'/%3e %3cpath class='cls-4' d='M84.29168%2c107.00323A38%2c38%2c0%2c0%2c1%2c120%2c82v38Z'/%3e %3c/g%3e %3cg id='pie-7' data-name='pie'%3e %3cpath class='cls-1' d='M200%2c94.93194a25.06806%2c25.06806%2c0%2c0%2c1%2c1.67436%2c50.08014L200%2c120Z'/%3e %3cpath class='cls-2' d='M201.67436%2c145.01208a25.06806%2c25.06806%2c0%2c0%2c1-11.46066-48.091L200%2c120Z'/%3e %3cpath class='cls-3' d='M190.2137%2c96.9211a25.068%2c25.068%2c0%2c0%2c1%2c6.44506-1.76549L200%2c120Z'/%3e %3cpath class='cls-4' d='M196.65876%2c95.15561A25.069%2c25.069%2c0%2c0%2c1%2c200%2c94.93194V120Z'/%3e %3c/g%3e %3cg id='pie-8' data-name='pie'%3e %3cpath class='cls-1' d='M280%2c89.40709a30.59291%2c30.59291%2c0%2c0%2c1%2c8.13884%2c60.08334L280%2c120Z'/%3e %3cpath class='cls-2' d='M288.13884%2c149.49043a30.59291%2c30.59291%2c0%2c0%2c1-23.82992-55.75287L280%2c120Z'/%3e %3cpath class='cls-3' d='M264.30892%2c93.73756a30.59275%2c30.59275%2c0%2c0%2c1%2c10.22851-3.83882L280%2c120Z'/%3e %3cpath class='cls-4' d='M274.53743%2c89.89874A30.59179%2c30.59179%2c0%2c0%2c1%2c280%2c89.40709V120Z'/%3e %3c/g%3e %3c/g%3e%3c/svg%3e";

const metadata$l = {
  name: 'Pie chart',
  id: 'rawgraphs.piechart',
  thumbnail: img$F,
  icon: img$E,
  categories: ['proportions'],
  description: 'It allows you to see the proportions between values that make up a whole, by using arcs composing a circle.',
  code: 'https://github.com/rawgraphs/rawgraphs-charts/tree/master/src/piechart',
  tutorial: 'https://rawgraphs.io/learning/how-to-make-a-pie-chart/'
};

const dimensions$l = [{
  id: 'arcs',
  name: 'Arcs',
  validTypes: ['number'],
  required: true,
  multiple: true,
  operation: 'get',
  aggregation: true,
  aggregationDefault: {
    number: 'sum'
  }
}, {
  id: 'series',
  name: 'Series',
  validTypes: ['number', 'date', 'string'],
  required: false,
  operation: 'get'
}];

// export const mapData = {

const mapData$l = function (data, mapping, dataTypes, dimensions) {
  // define aggregators
  // as we are working on a multiple dimension (bars), `getDimensionAggregator` will return an array of aggregator functions
  // the order of aggregators is the same as the value of the mapping
  const arcsAggregators = getDimensionAggregator('arcs', mapping, dataTypes, dimensions); // we will use rollup to populate a flat array of objects
  // that will be passed to the render

  let results = [];
  rollups(data, v => {
    let item = {
      series: v[0][mapping.series.value]
    };
    mapping.arcs.value.forEach((arcName, i) => {
      // getting i-th aggregator
      const aggregator = arcsAggregators[i]; // use it

      item[arcName] = aggregator(v.map(d => d[arcName]));
    });
    results.push(item);
  }, d => d[mapping.series.value] // series grouping
  );
  return results;
};

function colorDomain$2(data, mapping) {
  const domain = mapping.arcs.value;
  return {
    domain,
    type: 'number'
  };
}
function render$l(svgNode, data, visualOptions, mapping, originalData, styles) {
  const {
    // artboard options
    width,
    height,
    background,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    // Series
    columnsNumber,
    showGrid,
    showSeriesLabels,
    sortPiesBy,
    // chart
    showArcValues,
    drawDonut,
    arcTichkness,
    sortArcsBy,
    // legend
    showLegend,
    legendWidth,
    // color
    colorScale
  } = visualOptions; // Margin convention

  const margin = {
    top: marginTop,
    right: marginRight,
    bottom: marginBottom,
    left: marginLeft
  };
  data.forEach(d => {
    // compute the total value for each pie
    d.totalValue = sum(mapping.arcs.value.map(arc => d[arc]));
  }); // arcs sorting functions

  const arcsSortings = {
    totalDescending: function (a, b) {
      return descending(a.value, b.value);
    },
    totalAscending: function (a, b) {
      return ascending(a.value, b.value);
    },
    name: function (a, b) {
      return ascending(a.name, b.name);
    },
    original: function (a, b) {
      return true;
    }
  }; // computet the total value for each dimension mapped as arc

  let arcsSize = mapping.arcs.value.map(arc => ({
    name: arc,
    value: sum(data.map(d => d[arc]))
  })); // sort it, will be used later

  arcsSize.sort(arcsSortings[sortArcsBy]); // pies sorting functions

  const pieSortings = {
    totalDescending: function (a, b) {
      return descending(a.totalValue, b.totalValue);
    },
    totalAscending: function (a, b) {
      return ascending(a.totalValue, b.totalValue);
    },
    name: function (a, b) {
      return ascending(a.series, b.series);
    },
    original: function (a, b) {
      return true;
    }
  };
  data.sort(pieSortings[sortPiesBy]); // select the SVG element

  const svg = select(svgNode).attr('width', showLegend ? width + legendWidth : width).attr('height', height); // add background

  svg.append('rect').attr('width', showLegend ? width + legendWidth : width).attr('height', height).attr('x', 0).attr('y', 0).attr('fill', background).attr('id', 'background');
  const vizLayer = svg.append('g').attr('id', 'viz'); // create the grid
  // set up grid

  const gridding$1 = gridding().size([width, height]).mode('grid').padding(0) // no padding, margins will be applied inside
  .cols(columnsNumber);
  const griddingData = gridding$1(data);
  const series = vizLayer.selectAll('g').data(griddingData).join('g').attr('id', d => d.name).attr('transform', d => 'translate(' + d.x + ',' + d.y + ')'); //get max radius

  const maxRadius = min([griddingData[0].width - margin.right - margin.left, griddingData[0].height - margin.top - margin.bottom]) / 2; //create size scale

  const sizeScale = scaleSqrt().domain([0, max(data, d => d.totalValue)]).range([0, maxRadius]); // add grid

  if (showGrid) {
    svg.append('g').attr('id', 'grid').selectAll('rect').data(griddingData).enter().append('rect').attr('x', d => d.x).attr('y', d => d.y).attr('width', d => d.width).attr('height', d => d.height).attr('fill', 'none').attr('stroke', '#ccc');
  } // do stuff for each pie


  series.each(function (d, seriesIndex) {
    // make a local selection for each serie
    const selection = select(this); // compute each serie width and height

    const seriesWidth = d.width - margin.right - margin.left;
    const seriesHeight = d.height - margin.top - margin.bottom; //create the pie
    //extrtactt arcs values

    let arcs = arcsSize.map(arc => d[arc.name]); // computet angles, using tthte give order and setting sort to null

    let angles = pie().sort(null)(arcs); // compuet biggest radius

    let radius = sizeScale(d.totalValue);
    let arc$1 = arc().innerRadius(drawDonut && sizeScale(d.totalValue) > arcTichkness ? sizeScale(d.totalValue) - arcTichkness : 0).outerRadius(radius);
    let pie$1 = selection.append('g').attr('id', 'pie').attr('transform', 'translate(' + (margin.left + seriesWidth / 2) + ',' + (margin.top + seriesHeight / 2) + ')');
    pie$1.selectAll('path').data(angles).join('path').attr('fill', (d, i) => {
      return colorScale(arcsSize[i].name);
    }).attr('stroke', background).attr('d', e => arc$1.startAngle(e.startAngle).endAngle(e.endAngle)()); // add arcs labels

    if (showArcValues) {
      let pieLabels = pie$1.append('g').attr('id', 'labels').selectAll('g').data(angles).join('g').attr('transform', e => {
        return `translate(${arc$1.startAngle(e.startAngle).endAngle(e.endAngle).centroid(e)})`;
      });
      pieLabels.append('text').text(d => d.data).attr('text-anchor', 'middle').styles(styles.labelSecondary);
    }

    if (showSeriesLabels) {
      selection.append('text').text(d => d.series ? d.series : '').attr('y', margin.top + seriesHeight / 2 - radius - 4).attr('x', margin.left + seriesWidth / 2).styles(styles.seriesLabel).style('text-anchor', 'middle').style('dominant-baseline', 'auto');
    }
  }); // add legend

  if (showLegend) {
    const legendLayer = svg.append('g').attr('id', 'legend').attr('transform', `translate(${width},${marginTop})`);
    const chartLegend = legend().legendWidth(legendWidth);
    chartLegend.addColor('Arcs colors', colorScale);

    if (mapping.series.value) {
      const legendSizeScale = sizeScale.copy();
      legendSizeScale.domain(extent(data, d => d.totalValue)).rangeRound([sizeScale(min(data, d => d.totalValue)), maxRadius]);
      chartLegend.addSize('Area', legendSizeScale, 'circle');
    }

    legendLayer.call(chartLegend);
  }
}

const visualOptions$l = {
  // Artboard
  marginTop: {
    type: 'number',
    label: 'Margin (top)',
    default: 10,
    group: 'artboard'
  },
  marginRight: {
    type: 'number',
    label: 'Margin (right)',
    default: 2,
    group: 'artboard'
  },
  marginBottom: {
    type: 'number',
    label: 'Margin (bottom)',
    default: 2,
    group: 'artboard'
  },
  marginLeft: {
    type: 'number',
    label: 'Margin (left)',
    default: 2,
    group: 'artboard'
  },
  showLegend: {
    type: 'boolean',
    label: 'Show legend',
    default: false,
    group: 'artboard'
  },
  legendWidth: {
    type: 'number',
    label: 'Legend width',
    default: 200,
    group: 'artboard',
    disabled: {
      showLegend: false
    }
  },
  // chart
  drawDonut: {
    type: 'boolean',
    label: 'Draw as donuts',
    default: false,
    group: 'chart'
  },
  arcTichkness: {
    type: 'number',
    label: 'Donut thickness',
    default: 10,
    group: 'chart',
    disabled: {
      drawDonut: false
    }
  },
  sortArcsBy: {
    type: 'text',
    label: 'Sort arcs by',
    group: 'series',
    options: [{
      label: 'Size (descending)',
      value: 'totalDescending'
    }, {
      label: 'Size (ascending)',
      value: 'totalAscending'
    }, {
      label: 'Name',
      value: 'name'
    }, {
      label: 'Original',
      value: 'original'
    }],
    default: 'name'
  },
  // colors
  colorScale: {
    type: 'colorScale',
    label: 'Color scale',
    domain: 'colorDomain',
    default: {
      scaleType: 'ordinal',
      interpolator: 'interpolateSpectral'
    },
    group: 'colors'
  },
  // labels
  showSeriesLabels: {
    type: 'boolean',
    label: 'Show pies titles',
    default: true,
    group: 'labels'
  },
  showArcValues: {
    type: 'boolean',
    label: 'Show values on arcs',
    default: false,
    group: 'labels'
  },
  // series
  sortPiesBy: {
    type: 'text',
    label: 'Sort pies by',
    group: 'series',
    options: [{
      label: 'Size (descending)',
      value: 'totalDescending'
    }, {
      label: 'Size (ascending)',
      value: 'totalAscending'
    }, {
      label: 'Name',
      value: 'name'
    }, {
      label: 'Original',
      value: 'original'
    }],
    default: 'name'
  },
  columnsNumber: {
    type: 'number',
    label: 'Grid columns',
    default: 0,
    group: 'series'
  },
  showGrid: {
    type: 'boolean',
    label: 'Show grid',
    default: false,
    group: 'series'
  }
};

var piechart = {
  metadata: metadata$l,
  dimensions: dimensions$l,
  mapData: mapData$l,
  render: render$l,
  visualOptions: visualOptions$l,
  styles: styles$1,
  colorDomain: colorDomain$2
};

var img$G = "data:image/svg+xml,%3csvg id='rawgraphs-icons' xmlns='http://www.w3.org/2000/svg' width='56' height='56' viewBox='0 0 56 56'%3e %3cdefs%3e %3cstyle%3e .cls-1 %7b fill: %2395e5c0%3b %7d .cls-2 %7b fill: %2306c26c%3b %7d %3c/style%3e %3c/defs%3e %3cg id='secundary'%3e %3cpolygon class='cls-1' points='16.863 25.576 7.179 23.448 14.631 46.387 20.616 37.13 16.863 25.576'/%3e %3cpolygon class='cls-1' points='34.039 25.453 47.459 22.504 28 8.363 28 17.532 34.039 25.453'/%3e %3cpolygon class='cls-1' points='37.474 41.908 40.369 46.387 47.821 23.448 34.42 26.393 37.474 41.908'/%3e %3cpolygon class='cls-1' points='27 17.447 27 8.363 7.541 22.504 17.137 24.613 27 17.447'/%3e %3cpolygon class='cls-1' points='21.379 37.791 15.426 47 39.574 47 36.682 42.525 21.379 37.791'/%3e %3c/g%3e %3cg id='primary'%3e %3cpolygon class='cls-2' points='36.009 39.642 33.443 26.608 28.311 27.736 36.009 39.642'/%3e %3cpolygon class='cls-2' points='17.995 25.825 21.316 36.047 26.689 27.736 17.995 25.825'/%3e %3cpolygon class='cls-2' points='27 18.682 18.444 24.9 27 26.781 27 18.682'/%3e %3cpolygon class='cls-2' points='21.943 36.918 35.835 41.216 27.5 28.323 21.943 36.918'/%3e %3cpolygon class='cls-2' points='28 26.781 32.962 25.69 28 19.182 28 26.781'/%3e %3c/g%3e%3c/svg%3e";

var img$H = "data:image/svg+xml,%3csvg id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' width='320' height='160' viewBox='0 0 320 160'%3e %3cdefs%3e %3cstyle%3e .cls-1%2c .cls-2 %7b fill: none%3b %7d .cls-1 %7b stroke: %23d3d3d3%3b stroke-width: 0.5px%3b %7d .cls-2 %7b stroke: black%3b %7d .cls-3%2c .cls-4%2c .cls-5 %7b isolation: isolate%3b %7d .cls-3%2c .cls-4 %7b font-size: 12px%3b font-family: ArialMT%2c Arial%3b %7d .cls-3 %7b letter-spacing: -0.05518em%3b %7d .cls-5 %7b font-size: 10px%3b font-family: Helvetica%3b %7d .cls-6%2c .cls-7 %7b fill: %2369bda9%3b %7d .cls-10%2c .cls-12%2c .cls-6%2c .cls-8 %7b fill-opacity: 0%3b stroke-width: 2px%3b %7d .cls-6 %7b stroke: %2369bda9%3b %7d .cls-8%2c .cls-9 %7b fill: %239e0142%3b %7d .cls-8 %7b stroke: %239e0142%3b %7d .cls-10%2c .cls-11 %7b fill: %23fedd8d%3b %7d .cls-10 %7b stroke: %23fedd8d%3b %7d .cls-12%2c .cls-13 %7b fill: %235e4fa2%3b %7d .cls-12 %7b stroke: %235e4fa2%3b %7d %3c/style%3e %3c/defs%3e %3cg%3e %3cg id='axes'%3e %3ccircle id='_10' data-name='10' class='cls-1' cx='159.99951' cy='87.59481' r='80'/%3e %3ccircle id='_8' data-name='8' class='cls-1' cx='159.99951' cy='87.59481' r='64'/%3e %3ccircle id='_6' data-name='6' class='cls-1' cx='159.99951' cy='87.59481' r='48'/%3e %3ccircle id='_4' data-name='4' class='cls-1' cx='159.99951' cy='87.59481' r='32'/%3e %3ccircle id='_2' data-name='2' class='cls-1' cx='159.99951' cy='87.59481' r='16'/%3e %3cg%3e %3cline class='cls-2' x1='159.99951' y1='87.59481' x2='159.99951' y2='7.59481'/%3e %3ctext class='cls-3' transform='translate(164.15332 9.54694)'%3eA%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-2' x1='159.99951' y1='87.59481' x2='236.08403' y2='62.87345'/%3e %3ctext class='cls-4' transform='translate(241.59277 63.98328)'%3eB%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-2' x1='159.99951' y1='87.59481' x2='207.02233' y2='152.31617'/%3e %3ctext class='cls-4' transform='translate(211.25854 159.99991)'%3eC%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-2' x1='159.99951' y1='87.59481' x2='112.97669' y2='152.31617'/%3e %3ctext class='cls-4' transform='translate(101.13208 160.09991)'%3eD%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-2' x1='159.99951' y1='87.59481' x2='83.91499' y2='62.87345'/%3e %3ctext class='cls-4' transform='translate(70.40259 63.98328)'%3eE%3c/text%3e %3c/g%3e %3cg id='y_axis' data-name='y axis'%3e %3cpath class='cls-2' d='M153.99951%2c8.09481h6.5v80h-6.5'/%3e %3cg%3e %3cline class='cls-2' x1='159.99951' y1='8.09481' x2='153.99951' y2='8.09481'/%3e %3ctext class='cls-5' transform='translate(139.87646 11.2948)'%3e10%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-2' x1='159.99951' y1='24.09481' x2='153.99951' y2='24.09481'/%3e %3ctext class='cls-5' transform='translate(145.43799 27.2948)'%3e8%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-2' x1='159.99951' y1='40.09481' x2='153.99951' y2='40.09481'/%3e %3ctext class='cls-5' transform='translate(145.43799 43.2948)'%3e6%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-2' x1='159.99951' y1='56.09481' x2='153.99951' y2='56.09481'/%3e %3ctext class='cls-5' transform='translate(145.43799 59.2948)'%3e4%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-2' x1='159.99951' y1='72.09481' x2='153.99951' y2='72.09481'/%3e %3ctext class='cls-5' transform='translate(145.43799 75.2948)'%3e2%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-2' x1='159.99951' y1='88.09481' x2='153.99951' y2='88.09481'/%3e %3ctext class='cls-5' transform='translate(145.43799 91.2948)'%3e0%3c/text%3e %3c/g%3e %3c/g%3e %3c/g%3e %3cg id='radars'%3e %3cg id='_4-2' data-name='4'%3e %3cpath class='cls-6' d='M213.25868%2c70.28986c6.26971%2c19.29618-.82122%2c56.22862-15.64091%2c69.082-15.76947%2c13.67717-63.52448%2c18.39783-79.9388%2c6.47213S91.53251%2c88.34569%2c99.13189%2c67.81772c7.36046-19.88255%2c41.58961-45.10552%2c60.86762-44.22291%2c18.705.85637%2c46.98946%2c27.39887%2c53.25917%2c46.69505'/%3e %3cg id='dots'%3e %3ccircle class='cls-7' cx='159.99951' cy='23.59481' r='2'/%3e %3ccircle class='cls-7' cx='213.25868' cy='70.28986' r='2'/%3e %3ccircle class='cls-7' cx='197.61777' cy='139.3719' r='2'/%3e %3ccircle class='cls-7' cx='117.67897' cy='145.84403' r='2'/%3e %3ccircle class='cls-7' cx='99.13189' cy='67.81772' r='2'/%3e %3c/g%3e %3c/g%3e %3cg id='_0' data-name='0'%3e %3cpath class='cls-8' d='M175.21642%2c82.65054c4.70228%2c14.47213%2c18.807%2c34.17211%2c12.99678%2c43.77709-7.04258%2c11.64228-57.76716%2c21.429-65.83194%2c12.94427-7.69079-8.09128%2c7.84517-41.72836%2c14.7929-59.1935%2c6.06938-15.25715%2c16.46625-41.13379%2c22.82535-40.58359%2c6.2976.54488%2c10.51462%2c28.58359%2c15.21691%2c43.05573'/%3e %3cg id='dots-2' data-name='dots'%3e %3ccircle class='cls-9' cx='159.99951' cy='39.59481' r='2'/%3e %3ccircle class='cls-9' cx='175.21642' cy='82.65054' r='2'/%3e %3ccircle class='cls-9' cx='188.2132' cy='126.42763' r='2'/%3e %3ccircle class='cls-9' cx='122.38126' cy='139.3719' r='2'/%3e %3ccircle class='cls-9' cx='137.17416' cy='80.1784' r='2'/%3e %3c/g%3e %3c/g%3e %3cg id='_2-2' data-name='2'%3e %3cpath class='cls-10' d='M228.47558%2c65.34558c4.86633%2c6.38693-23.04318%2c53.14809-40.26238%2c61.08205-14.53515%2c6.69725-36.50441%2c1.90671-51.7251-6.47214-17.73077-9.76063-48.69983-49.12743-44.96465-54.60991%2c3.7683-5.5311%2c45.65071%2c22.24923%2c68.47606%2c22.24923s63.64841-28.58541%2c68.47607-22.24923'/%3e %3cg id='dots-3' data-name='dots'%3e %3ccircle class='cls-11' cx='159.99951' cy='87.59481' r='2'/%3e %3ccircle class='cls-11' cx='228.47558' cy='65.34558' r='2'/%3e %3ccircle class='cls-11' cx='188.2132' cy='126.42763' r='2'/%3e %3ccircle class='cls-11' cx='136.4881' cy='119.95549' r='2'/%3e %3ccircle class='cls-11' cx='91.52345' cy='65.34558' r='2'/%3e %3c/g%3e %3c/g%3e %3cg id='_5' data-name='5'%3e %3cpath class='cls-12' d='M159.99951%2c87.59481c5.64274%2c17.36656%2c44.27139%2c56.4683%2c42.32054%2c58.24922-1.90646%2c1.7404-34.82076-32.1427-51.7251-45.305-14.87958-11.58571-45.11623-22.77868-43.8546-30.24922%2c1.28479-7.6077%2c45.58707-20.537%2c53.25916-14.69505%2c5.83883%2c4.446-3.76182%2c20.42229%2c0%2c32'/%3e %3cg id='dots-4' data-name='dots'%3e %3ccircle class='cls-13' cx='159.99951' cy='55.59481' r='2'/%3e %3ccircle class='cls-13' cx='159.99951' cy='87.59481' r='2'/%3e %3ccircle class='cls-13' cx='202.32005' cy='145.84403' r='2'/%3e %3ccircle class='cls-13' cx='150.59495' cy='100.53908' r='2'/%3e %3ccircle class='cls-13' cx='106.74035' cy='70.28986' r='2'/%3e %3c/g%3e %3c/g%3e %3c/g%3e %3c/g%3e%3c/svg%3e";

const metadata$m = {
  name: 'Radar Chart',
  id: 'rawgraphs.radarchart',
  thumbnail: img$H,
  icon: img$G,
  categories: ['correlations'],
  description: 'It displays multiple continuous dimensions as axes starting from the same point and by disposing them radially. Each dimension is represented as an axis starting from the center of the cart. The same scale is applied to all the axes.',
  code: 'https://github.com/rawgraphs/rawgraphs-charts/tree/master/src/radarchart',
  tutorial: 'https://rawgraphs.io/learning/how-to-make-a-radar-chart/'
};

const dimensions$m = [{
  id: 'axes',
  name: 'Spokes',
  validTypes: ['number'],
  required: true,
  multiple: true,
  minValues: 3
}, {
  id: 'color',
  name: 'Color',
  operation: 'get',
  validTypes: ['number', 'string', 'date'],
  required: false,
  aggregation: true,
  aggregationDefault: {
    number: 'sum',
    string: 'csvDistinct',
    date: 'csvDistinct'
  }
}, {
  id: 'series',
  name: 'Series',
  validTypes: ['number', 'string', 'date'],
  required: false,
  operation: 'get'
}];

const mapData$m = function (data, mapping, dataTypes, dimensions) {
  // define aggregators
  getDimensionAggregator('color', mapping, dataTypes, dimensions); // we will use rollup to populate a flat array of objects
  // that will be passed to the render

  let results = [];
  let index = 0;
  rollups(data, v => {
    //@TODO: find a better way to assing a unique index to each entry
    return v.map(d => {
      mapping.axes.value.forEach(axisName => {
        let item = {
          name: index,
          // each line will create a radar
          color: d[mapping.color.value],
          series: d[mapping.series.value],
          axes: axisName,
          value: d[axisName]
        };
        results.push(item);
      });
      index++;
      return 'done';
    });
  }, d => d[mapping.series.value] // series grouping
  );
  return results;
};

function render$m(svgNode, data, visualOptions, mapping, originalData, styles) {
  const {
    // artboard options
    width,
    height,
    background,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    showLegend,
    legendWidth,
    // visual model options
    showDots,
    dotsDiameter,
    interpolation,
    innerDiameter,
    fillOpacity,
    //labels
    labelsPadding,
    //series options
    columnsNumber,
    sortSeriesBy,
    showSeriesLabels,
    showGrid,
    // color otpions
    colorScale
  } = visualOptions; // Margin convention

  const margin = {
    top: marginTop,
    right: marginRight,
    bottom: marginBottom,
    left: marginLeft
  }; //check if there are negative values, in case throw error

  data.forEach(d => {
    if (d.value < 0) {
      throw new Error('Values cannot be negative');
    }
  }); // convert string to d3 functions

  const curveType = {
    Linear: curveLinearClosed,
    Basis: curveBasisClosed,
    Cardinal: curveCardinalClosed,
    'Catmull–Rom': curveCatmullRomClosed
  }; // if series is exposed, recreate the nested structure

  const nestedData = rollups(data, v => v, d => d.series, d => d.name).map(d => {
    //calc the total values
    d.totalSize = sum(d[1].map(e => e[1]).flat(), e => e.value);
    return d;
  }); // sort series

  nestedData.sort((a, b) => {
    return {
      valueDescending: descending(a.totalSize, b.totalSize),
      valueAscending: ascending(a.totalSize, b.totalSize),
      name: ascending(a[0], b[0])
    }[sortSeriesBy];
  }); // select the SVG element

  const svg = select(svgNode); // add background

  select(svgNode).append('rect').attr('width', showLegend ? width + legendWidth : width).attr('height', height).attr('x', 0).attr('y', 0).attr('fill', background).attr('id', 'background'); // set up grid

  const gridding$1 = gridding().size([width, height]).mode('grid').padding(0) // no padding, margins will be applied inside
  .cols(mapping.series.value ? columnsNumber : 1);
  const griddingData = gridding$1(nestedData); // create the clip path

  svg.append('clipPath').attr('id', 'serieClipPath').append('rect').attr('x', 0).attr('y', 0).attr('width', griddingData[0].width).attr('height', griddingData[0].height); // create the grid

  const series = svg.selectAll('g').data(griddingData).join('g').attr('id', d => d[0]).attr('transform', d => 'translate(' + d.x + ',' + d.y + ')');
  /*
    CODE FOR ALL THE SERIES
   */

  const axesDomain = mapping.axes.value; // create the radial scale to dispose axes

  const radialScale = scalePoint().domain(axesDomain).range([-Math.PI / 2, Math.PI * 1.5]) // starts from -PI/2 (upper part of circle)
  .padding(0.5) // calculate half padding at beginning and half at end
  .align(0) // put all the apdding at the end
  .round(false);
  const maxValue = max(data, d => d.value);
  const innerRadius = innerDiameter / 2;
  const outerRadius = min([(griddingData[0].width - margin.right - margin.left) / 2, (griddingData[0].height - margin.top - margin.bottom) / 2]);
  const axesScale = scaleLinear().domain([0, maxValue]).nice().rangeRound([innerRadius, outerRadius]);
  const axesGrid = scaleLinear().domain([maxValue, 0]).rangeRound([innerRadius, outerRadius]); // add grid

  if (showGrid) {
    svg.append('g').attr('id', 'grid').selectAll('rect').data(griddingData).enter().append('rect').attr('x', d => d.x).attr('y', d => d.y).attr('width', d => d.width).attr('height', d => d.height).attr('fill', 'none').attr('stroke', '#ccc');
  }
  /*
    CODE FOR EACH SERIE
  */


  series.each(function (d, seriesIndex) {
    // make a local selection for each serie
    const selection = select(this); // apply clipPath

    selection.attr('clip-path', 'url(#serieClipPath)'); // compute each serie width and height


    // use the smallest dimension as diameter
    // get the array containing all the data for each radar chart

    let radarData = d[1]; // create the axis and the grid

    let viz = selection.append('g').attr('id', d[0]).attr('transform', `translate(${outerRadius + margin.left}, ${outerRadius + margin.top})`);
    let axesLayer = viz.append('g').attr('id', 'axes');
    let axisFunction = axisLeft(axesGrid); // add a circle for each tick on the axis

    axesLayer.selectAll('.grid').data(axisFunction.scale().ticks()).enter().append('circle').attr('r', d => axesScale(d)).attr('fill', 'none').attr('stroke', 'LightGray').attr('class', 'grid').attr('id', d => d); // add axes

    let axesGroups = axesLayer.selectAll('g').data(axesDomain).enter().append('g'); // draw a line for each axis

    axesGroups.append('line').attr('x1', d => {
      return Math.cos(radialScale(d)) * innerRadius;
    }).attr('y1', d => {
      return Math.sin(radialScale(d)) * innerRadius;
    }).attr('x2', d => {
      return Math.cos(radialScale(d)) * outerRadius;
    }).attr('y2', d => {
      return Math.sin(radialScale(d)) * outerRadius;
    }).attr('stroke', 'black'); //add a label for each axis

    axesGroups.append('text').attr('text-anchor', 'middle').attr('dy', '0.35em').attr('x', d => {
      return Math.cos(radialScale(d)) * (outerRadius + labelsPadding);
    }).attr('y', d => {
      return Math.sin(radialScale(d)) * (outerRadius + labelsPadding);
    }).text(d => d).attr('font-family', 'Arial, sans-serif').attr('font-size', 12); //draw scale for first axis

    axesLayer.append('g').attr('id', 'y axis').call(axisFunction).attr('transform', `translate(${0}, ${-outerRadius - innerRadius})`); // draw each radar chart

    let plots = viz.append('g').attr('id', 'radars').selectAll('g').data(radarData).enter().append('g').attr('id', d => d[0]);
    let radarLine = lineRadial().curve(curveType[interpolation]).radius(d => axesScale(d.value)).angle(d => radialScale(d.axes) + Math.PI / 2);
    plots.append('path').attr('d', d => radarLine(d[1])).attr('stroke', d => colorScale(d[1][0].color)) //first item of the data list
    .attr('fill', d => colorScale(d[1][0].color)).attr('fill-opacity', fillOpacity);

    if (showDots) {
      plots.append('g').attr('id', 'dots').selectAll('circle').data(d => d[1]).enter().append('circle').attr('cx', d => Math.cos(radialScale(d.axes)) * axesScale(d.value)).attr('cy', d => Math.sin(radialScale(d.axes)) * axesScale(d.value)).attr('r', dotsDiameter / 2).attr('stroke', 'none').attr('fill', d => colorScale(d.color));
    } // add series titles


    if (showSeriesLabels) {
      selection.append('text').attr('x', 5).attr('y', 5).text(d => d[0]).styles(styles.seriesLabel);
    }
  }); // show legends

  if (showLegend) {
    // svg width is adjusted automatically because of the "container:height" annotation in legendWidth visual option
    const legendLayer = select(svgNode).append('g').attr('id', 'legend').attr('transform', `translate(${width},${marginTop})`);
    const chartLegend = legend().legendWidth(legendWidth);

    if (mapping.color.value) {
      chartLegend.addColor(mapping.color.value, colorScale);
    }

    legendLayer.call(chartLegend);
  }
}

const visualOptions$m = {
  marginTop: {
    type: 'number',
    label: 'Margin (top)',
    default: 30,
    group: 'artboard'
  },
  marginRight: {
    type: 'number',
    label: 'Margin (right)',
    default: 20,
    group: 'artboard'
  },
  marginBottom: {
    type: 'number',
    label: 'Margin (bottom)',
    default: 0,
    group: 'artboard'
  },
  marginLeft: {
    type: 'number',
    label: 'Margin (left)',
    default: 20,
    group: 'artboard'
  },
  showDots: {
    type: 'boolean',
    label: 'Show dots on data values',
    default: true,
    group: 'chart'
  },
  dotsDiameter: {
    type: 'number',
    label: 'Dots diameter',
    default: 2,
    group: 'chart',
    disabled: {
      showDots: false
    }
  },
  innerDiameter: {
    type: 'number',
    label: 'Inner diameter',
    default: 0,
    group: 'chart'
  },
  interpolation: {
    type: 'text',
    label: 'Curve type',
    default: 'Catmull–Rom',
    options: ['Basis', 'Cardinal', 'Catmull–Rom', 'Linear'],
    group: 'chart'
  },
  fillOpacity: {
    type: 'number',
    label: 'Fill opacity',
    default: 0.5,
    step: 0.1,
    min: 0,
    max: 1,
    group: 'chart'
  },
  labelsPadding: {
    type: 'number',
    label: 'Axis labels padding',
    default: 10,
    group: 'labels'
  },
  colorScale: {
    type: 'colorScale',
    label: 'Color scale',
    dimension: 'color',
    default: {
      scaleType: 'ordinal',
      interpolator: 'schemeCategory10'
    },
    group: 'colors'
  },
  columnsNumber: {
    type: 'number',
    label: 'Number of columns',
    default: 0,
    group: 'series'
  },
  sortSeriesBy: {
    type: 'text',
    label: 'Sort series by',
    group: 'series',
    options: [{
      label: 'Total value (descending)',
      value: 'valueDescending'
    }, {
      label: 'Total value (ascending)',
      value: 'valueAscending'
    }, {
      label: 'Name',
      value: 'nameAscending'
    }, {
      label: 'Original',
      value: 'none'
    }],
    default: 'valueDescending'
  },
  showSeriesLabels: {
    type: 'boolean',
    label: 'Show series titles',
    default: true,
    group: 'series'
  },
  showGrid: {
    type: 'boolean',
    label: 'Show series grid',
    default: true,
    group: 'series'
  },
  showLegend: {
    type: 'boolean',
    label: 'Show legend',
    default: false,
    group: 'artboard'
  },
  legendWidth: {
    type: 'number',
    label: 'Legend width',
    default: 200,
    group: 'artboard',
    disabled: {
      showLegend: false
    },
    container: 'width',
    containerCondition: {
      showLegend: true
    }
  }
};

var radarchart = {
  metadata: metadata$m,
  dimensions: dimensions$m,
  mapData: mapData$m,
  render: render$m,
  visualOptions: visualOptions$m,
  styles: styles$1
};

var img$I = "data:image/svg+xml,%3csvg id='rawgraphs-icons' xmlns='http://www.w3.org/2000/svg' width='56' height='56' viewBox='0 0 56 56'%3e %3cdefs%3e %3cstyle%3e .cls-1 %7b fill: %2395e5c0%3b %7d .cls-2 %7b fill: %2306c26c%3b %7d %3c/style%3e %3c/defs%3e %3cg id='secundary'%3e %3cpath class='cls-1' d='M45%2c25a90.3265%2c90.3265%2c0%2c0%2c1-18.2163-1.6064A77.3649%2c77.3649%2c0%2c0%2c0%2c11%2c22V8A90.3265%2c90.3265%2c0%2c0%2c1%2c29.2163%2c9.6064%2c77.3649%2c77.3649%2c0%2c0%2c0%2c45%2c11Z'/%3e %3cpath class='cls-1' d='M20%2c34a11.2837%2c11.2837%2c0%2c0%2c1-6.6768-2.1445A3.5143%2c3.5143%2c0%2c0%2c0%2c11%2c31V23a11.2837%2c11.2837%2c0%2c0%2c1%2c6.6768%2c2.1445A3.5143%2c3.5143%2c0%2c0%2c0%2c20%2c26Z'/%3e %3cpath class='cls-1' d='M11%2c40V38a6.3605%2c6.3605%2c0%2c0%2c0%2c3.9556-1.3389A8.3093%2c8.3093%2c0%2c0%2c1%2c20%2c35v2a6.3605%2c6.3605%2c0%2c0%2c0-3.9556%2c1.3389A8.3093%2c8.3093%2c0%2c0%2c1%2c11%2c40Z'/%3e %3cpath class='cls-1' d='M11%2c48V41a46.4412%2c46.4412%2c0%2c0%2c0%2c9.8623-.9414A53.0311%2c53.0311%2c0%2c0%2c1%2c32%2c39v7a46.4412%2c46.4412%2c0%2c0%2c0-9.8623.9414A53.0311%2c53.0311%2c0%2c0%2c1%2c11%2c48Z'/%3e %3cpath class='cls-1' d='M32%2c38a19.419%2c19.419%2c0%2c0%2c1-5.334-.6641A8.857%2c8.857%2c0%2c0%2c0%2c24%2c37V26a19.419%2c19.419%2c0%2c0%2c1%2c5.334.6641A8.857%2c8.857%2c0%2c0%2c0%2c32%2c27Z'/%3e %3cpath class='cls-1' d='M36%2c46V27a9.243%2c9.243%2c0%2c0%2c0%2c2.4922-.2852A27.6609%2c27.6609%2c0%2c0%2c1%2c45%2c26V45a9.243%2c9.243%2c0%2c0%2c0-2.4922.2852A27.6609%2c27.6609%2c0%2c0%2c1%2c36%2c46Z'/%3e %3c/g%3e %3cg id='primary'%3e %3crect class='cls-2' x='8' y='8' width='2' height='23'/%3e %3crect class='cls-2' x='8' y='38' width='2' height='10'/%3e %3crect class='cls-2' x='46' y='11' width='2' height='34'/%3e %3crect class='cls-2' x='21' y='26' width='2' height='11'/%3e %3crect class='cls-2' x='33' y='27' width='2' height='19'/%3e %3c/g%3e%3c/svg%3e";

var img$J = "data:image/svg+xml,%3csvg id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' width='320' height='160' viewBox='0 0 320 160'%3e %3cdefs%3e %3cstyle%3e .cls-1 %7b fill: white%3b %7d .cls-2 %7b fill: %23666%3b %7d .cls-3%2c .cls-4%2c .cls-5%2c .cls-6%2c .cls-7%2c .cls-8 %7b fill: none%3b stroke: %23ccc%3b stroke-opacity: 0.5%3b %7d .cls-3 %7b stroke-width: 67.1111px%3b %7d .cls-4 %7b stroke-width: 41.9444px%3b %7d .cls-5 %7b stroke-width: 16.7778px%3b %7d .cls-6 %7b stroke-width: 25.1667px%3b %7d .cls-7 %7b stroke-width: 58.7222px%3b %7d .cls-8 %7b stroke-width: 83.8889px%3b %7d .cls-10%2c .cls-9 %7b isolation: isolate%3b font-size: 10px%3b font-family: Helvetica%3b %7d .cls-9 %7b letter-spacing: -0.0547em%3b %7d %3c/style%3e %3c/defs%3e %3crect id='background' class='cls-1' width='320' height='160'/%3e %3cg id='viz'%3e %3cg%3e %3crect class='cls-2' x='2' y='2' width='10' height='109.0556'/%3e %3crect class='cls-2' x='308' y='2' width='10' height='151'/%3e %3crect class='cls-2' x='104' y='71.4903' width='10' height='58.7222'/%3e %3crect class='cls-2' x='2' y='116.0556' width='10' height='41.9444'/%3e %3crect class='cls-2' x='206' y='73.7409' width='10' height='83.8889'/%3e %3c/g%3e %3cg%3e %3cpath class='cls-3' d='M12%2c35.5556H308'/%3e %3cpath class='cls-4' d='M12%2c90.0833c46%2c0%2c46%2c2.3792%2c92%2c2.3792'/%3e %3cpath class='cls-5' d='M12%2c124.4444c46%2c0%2c46-2.6208%2c92-2.6208'/%3e %3cpath class='cls-6' d='M12%2c145.4167c97%2c0%2c97-.37%2c194-.37'/%3e %3cpath class='cls-7' d='M114%2c100.8514c46%2c0%2c46%2c2.2506%2c92%2c2.2506'/%3e %3cpath class='cls-8' d='M216%2c115.6853c46%2c0%2c46-4.63%2c92-4.63'/%3e %3c/g%3e %3cg%3e %3ctext class='cls-9' transform='translate(18 60.0278)'%3eA%3c/text%3e %3ctext class='cls-10' transform='translate(295.3301 81)'%3eE%3c/text%3e %3ctext class='cls-10' transform='translate(120 104.3514)'%3eC%3c/text%3e %3ctext class='cls-10' transform='translate(18 140.5278)'%3eB%3c/text%3e %3ctext class='cls-10' transform='translate(192.7783 119.1853)'%3eD%3c/text%3e %3c/g%3e %3c/g%3e%3c/svg%3e";

const metadata$n = {
  name: 'Sankey Diagram',
  id: 'rawgraphs.sankeydiagram',
  thumbnail: img$J,
  icon: img$I,
  categories: ['networks'],
  description: 'It represents flows among nodes of a network. Nodes are represented as rectangles, the height represents their value. Flows are represented with curved lines whose width is proportional to their value.',
  code: 'https://github.com/rawgraphs/rawgraphs-charts/tree/master/src/sankeydiagram',
  tutorial: 'https://rawgraphs.io/learning/how-to-make-a-sankey-diagram/'
};

const dimensions$n = [{
  id: 'source',
  name: 'Source node',
  validTypes: ['number', 'date', 'string'],
  required: true
}, {
  id: 'target',
  name: 'Target node',
  validTypes: ['number', 'date', 'string'],
  required: true
}, {
  id: 'size',
  name: 'Size',
  validTypes: ['number'],
  required: false,
  aggregation: true,
  aggregationDefault: 'sum'
}];

const mapData$n = function (data, mapping, dataTypes, dimensions) {
  const sizeAggregator = getDimensionAggregator('size', mapping, dataTypes, dimensions);
  const results = [];
  rollups(data, v => {
    const item = {
      source: v[0][mapping.source.value],
      target: v[0][mapping.target.value],
      value: mapping.size.value ? sizeAggregator(v.map(d => d[mapping.size.value])) : 1
    };
    results.push(item);
    return item;
  }, d => d[mapping.source.value] + d[mapping.target.value] // crossgrup functions. aggregate links among same source and target
  );
  return results;
};

/*
Credits:
Inspired by https://observablehq.com/@d3/sankey-diagram
*/

function render$n(svgNode, data, visualOptions, mapping, originalData, styles) {
  const {
    width,
    height,
    background,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    nodesWidth,
    //charts
    nodesPadding,
    linksOpacity,
    linksBlendMode,
    circularLinkGap,
    alignment,
    iterations,
    //labels
    showValues,
    // color scale
    colorScale
  } = visualOptions;
  const margin = {
    top: marginTop,
    right: marginRight,
    bottom: marginBottom,
    left: marginLeft
  };
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom; // links are a deep copy of the dataset, to avoid modification of origina data variable

  const links = data.map(d => Object.assign({}, d)); //get nodes from links

  const nodes = Array.from(new Set(links.flatMap(l => [l.source, l.target])), id => ({
    id
  })); // convert option with alignment function names

  const alignments = {
    Left: 'sankeyLeft',
    Right: 'sankeyRight',
    Center: 'sankeyCenter',
    Justify: 'sankeyJustify'
  };
  const sankey = sankeyCircular().nodeId(d => d.id).nodeAlign(d3Sankey[alignments[alignment]]).nodeWidth(nodesWidth).nodePadding(nodesPadding).circularLinkGap(circularLinkGap).extent([[0, 0], [chartWidth, chartHeight]]).iterations(iterations);
  const network = sankey({
    nodes,
    links
  }); // add background

  select(svgNode).append('rect').attr('width', width).attr('height', height).attr('x', 0).attr('y', 0).attr('fill', background).attr('id', 'background');
  const svg = select(svgNode).append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')').attr('id', 'viz');
  svg.append('g').selectAll('rect').data(network.nodes).join('rect').attr('x', d => d.x0).attr('y', d => d.y0).attr('height', d => d.y1 - d.y0).attr('width', d => d.x1 - d.x0).attr('fill', 'black').append('title').text(d => `${d.id}: ${d.value}`);
  const link = svg.append('g').attr('class', 'links').attr('fill', 'none').attr('stroke-opacity', linksOpacity).selectAll('path').data(network.links).enter().append('path').attr('d', d => d.path).style('stroke-width', link => Math.max(1, link.width)).style('mix-blend-mode', linksBlendMode).attr('stroke', d => colorScale(d.source.id));
  link.append('title').text(d => `${d.source.id} → ${d.target.id}: ${d.value}`);
  const nodesLabels = svg.append('g').selectAll('text').data(network.nodes).join('text').attr('x', d => d.x0 < width / 2 ? d.x1 + 4 : d.x0 - 4).attr('y', d => d.y0 + (d.y1 - d.y0) / 2).attr('text-anchor', d => d.x0 < width / 2 ? 'start' : 'end');
  nodesLabels.append('tspan').attr('alignment-baseline', 'middle').text(d => d.id).styles(styles.labelPrimary);

  if (showValues) {
    nodesLabels.append('tspan').attr('alignment-baseline', 'middle').attr('x', d => d.x0 < width / 2 ? d.x1 + 4 : d.x0 - 4).attr('dy', parseFloat(styles.labelPrimary.fontSize) + 2).text(d => d.value).styles(styles.labelSecondary);
    nodesLabels.attr('transform', `translate(0,${-parseFloat(styles.labelSecondary.fontSize) / 2})`);
  }
}

const visualOptions$n = {
  marginTop: {
    type: 'number',
    label: 'Margin (top)',
    default: 10,
    group: 'artboard'
  },
  marginRight: {
    type: 'number',
    label: 'Margin (right)',
    default: 10,
    group: 'artboard'
  },
  marginBottom: {
    type: 'number',
    label: 'Margin (bottom)',
    default: 10,
    group: 'artboard'
  },
  marginLeft: {
    type: 'number',
    label: 'Margin (left)',
    default: 10,
    group: 'artboard'
  },
  nodesWidth: {
    type: 'number',
    label: 'Nodes width',
    default: 5,
    group: 'chart'
  },
  nodesPadding: {
    type: 'number',
    label: 'Min. vertical padding',
    default: 5,
    group: 'chart'
  },
  linksOpacity: {
    type: 'number',
    label: 'Links opacity (0-1)',
    default: 1,
    step: 0.1,
    min: 0,
    max: 1,
    group: 'chart'
  },
  circularLinkGap: {
    type: 'number',
    label: 'Circular links gap',
    default: 2,
    step: 1,
    min: 0,
    group: 'chart'
  },
  linksBlendMode: {
    type: 'text',
    label: 'Links blend mode',
    group: 'chart',
    options: ['normal', 'multiply'],
    default: 'multiply'
  },
  alignment: {
    type: 'text',
    label: 'Nodes alignment',
    group: 'chart',
    options: ['Left', 'Right', 'Center', 'Justify'],
    default: 'Left'
  },
  iterations: {
    type: 'number',
    label: 'Iterations (attempts to solve overlaps)',
    default: 6,
    group: 'chart'
  },
  colorScale: {
    type: 'colorScale',
    label: 'Color scale',
    dimension: 'source',
    default: {
      scaleType: 'ordinal',
      interpolator: 'interpolateSpectral'
    },
    group: 'colors'
  },
  showValues: {
    type: 'boolean',
    label: 'Show nodes values',
    default: false,
    group: 'Labels'
  }
};

var sankeydiagram = {
  metadata: metadata$n,
  dimensions: dimensions$n,
  mapData: mapData$n,
  render: render$n,
  visualOptions: visualOptions$n,
  styles: styles$1
};

var img$K = "data:image/svg+xml,%3csvg id='rawgraphs-icons' xmlns='http://www.w3.org/2000/svg' width='56' height='56' viewBox='0 0 56 56'%3e %3cdefs%3e %3cstyle%3e .cls-1 %7b fill: %2395e5c0%3b %7d .cls-2 %7b fill: %2306c26c%3b %7d %3c/style%3e %3c/defs%3e %3crect class='cls-1' x='8' y='8' width='1' height='40'/%3e %3crect class='cls-1' x='47' y='8' width='1' height='40'/%3e %3cg%3e %3cpath class='cls-2' d='M47.5%2c21A1.5%2c1.5%2c0%2c1%2c0%2c46%2c19.5a1.47578%2c1.47578%2c0%2c0%2c0%2c.01672.16595l-10.73986%2c5.2323L28.6474%2c22.68848%2c46.56372%2c11.66327a1.48885%2c1.48885%2c0%2c1%2c0-.52924-.848L27.41028%2c22.27606%2c9.99713%2c16.47168a1.5103%2c1.5103%2c0%2c1%2c0-.32013.948l16.62152%2c5.54053L9.43628%2c33.33673a1.48885%2c1.48885%2c0%2c1%2c0%2c.52924.848L27.53564%2c23.37256l6.45588%2c2.152L9.55121%2c37.43152A1.49891%2c1.49891%2c0%2c1%2c0%2c10%2c38.5a1.47578%2c1.47578%2c0%2c0%2c0-.01672-.166L35.348%2c25.97668l10.65491%2c3.55164a1.5103%2c1.5103%2c0%2c1%2c0%2c.32013-.948l-9.68964-3.22986%2c9.81543-4.782A1.49419%2c1.49419%2c0%2c0%2c0%2c47.5%2c21Z'/%3e %3cpath class='cls-2' d='M47.5%2c40a1.4975%2c1.4975%2c0%2c0%2c0-1.45349%2c1.14606L9.851%2c44.85883a1.49887%2c1.49887%2c0%2c1%2c0%2c.10248.99511L46.149%2c42.14117A1.498%2c1.498%2c0%2c1%2c0%2c47.5%2c40Z'/%3e %3c/g%3e%3c/svg%3e";

var img$L = "data:image/svg+xml,%3csvg id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' width='320' height='160' viewBox='0 0 320 160'%3e %3cdefs%3e %3cstyle%3e .cls-1%2c .cls-14%2c .cls-3 %7b font-size: 10px%3b font-family: ArialMT%2c Arial%3b %7d .cls-1 %7b letter-spacing: -0.05518em%3b %7d .cls-10%2c .cls-12%2c .cls-2%2c .cls-4%2c .cls-6%2c .cls-8 %7b fill: none%3b %7d .cls-2 %7b stroke: black%3b %7d .cls-4 %7b stroke: %239e0142%3b %7d .cls-5 %7b fill: %239e0142%3b %7d .cls-6 %7b stroke: %23f88e53%3b %7d .cls-7 %7b fill: %23f88e53%3b %7d .cls-8 %7b stroke: %23fbf8b0%3b %7d .cls-9 %7b fill: %23fbf8b0%3b %7d .cls-10 %7b stroke: %2389cfa5%3b %7d .cls-11 %7b fill: %2389cfa5%3b %7d .cls-12 %7b stroke: %235e4fa2%3b %7d .cls-13 %7b fill: %235e4fa2%3b %7d .cls-14 %7b isolation: isolate%3b %7d %3c/style%3e %3c/defs%3e %3cg%3e %3cg%3e %3cg%3e %3ctext class='cls-1' transform='translate(24.94092 11)'%3eA%3c/text%3e %3cline class='cls-2' x1='28' y1='20' x2='28' y2='14'/%3e %3c/g%3e %3cg%3e %3ctext class='cls-3' transform='translate(288.66504 11)'%3eB%3c/text%3e %3cline class='cls-2' x1='292' y1='20' x2='292' y2='14'/%3e %3c/g%3e %3c/g%3e %3cg%3e %3cg%3e %3cline class='cls-4' x1='28' y1='84.79729' x2='292' y2='20'/%3e %3ccircle class='cls-5' cx='28' cy='84.79729' r='2.5'/%3e %3ccircle class='cls-5' cx='292' cy='20' r='2.5'/%3e %3c/g%3e %3cg%3e %3cline class='cls-6' x1='28' y1='102.6937' x2='292' y2='29.87387'/%3e %3ccircle class='cls-7' cx='28' cy='102.6937' r='2.5'/%3e %3ccircle class='cls-7' cx='292' cy='29.87387' r='2.5'/%3e %3c/g%3e %3cg%3e %3cline class='cls-8' x1='28' y1='105.77928' x2='292' y2='52.09009'/%3e %3ccircle class='cls-9' cx='28' cy='105.77928' r='2.5'/%3e %3ccircle class='cls-9' cx='292' cy='52.09009' r='2.5'/%3e %3c/g%3e %3cg%3e %3cline class='cls-10' x1='28' y1='123.05856' x2='292' y2='133.54955'/%3e %3ccircle class='cls-11' cx='28' cy='123.05856' r='2.5'/%3e %3ccircle class='cls-11' cx='292' cy='133.54955' r='2.5'/%3e %3c/g%3e %3cg%3e %3cline class='cls-4' x1='28' y1='133.54955' x2='292' y2='106.39639'/%3e %3ccircle class='cls-5' cx='28' cy='133.54955' r='2.5'/%3e %3ccircle class='cls-5' cx='292' cy='106.39639' r='2.5'/%3e %3c/g%3e %3cg%3e %3cline class='cls-4' x1='28' y1='142.8063' x2='292' y2='109.48198'/%3e %3ccircle class='cls-5' cx='28' cy='142.8063' r='2.5'/%3e %3ccircle class='cls-5' cx='292' cy='109.48198' r='2.5'/%3e %3c/g%3e %3cg%3e %3cline class='cls-12' x1='28' y1='157' x2='292' y2='107.63063'/%3e %3ccircle class='cls-13' cx='28' cy='157' r='2.5'/%3e %3ccircle class='cls-13' cx='292' cy='107.63063' r='2.5'/%3e %3c/g%3e %3cg%3e %3cline class='cls-10' x1='28' y1='157' x2='292' y2='153.2973'/%3e %3ccircle class='cls-11' cx='28' cy='157' r='2.5'/%3e %3ccircle class='cls-11' cx='292' cy='153.2973' r='2.5'/%3e %3c/g%3e %3c/g%3e %3cg%3e %3ctext class='cls-14' transform='translate(2.03711 89.7973)'%3e46.9%3c/text%3e %3ctext class='cls-14' transform='translate(298.5 24.93695)'%3e57.4%3c/text%3e %3ctext class='cls-14' transform='translate(10.37695 104.23651)'%3e44%3c/text%3e %3ctext class='cls-14' transform='translate(298.5 34.93695)'%3e55.8%3c/text%3e %3ctext class='cls-14' transform='translate(2.03711 114.23651)'%3e43.5%3c/text%3e %3ctext class='cls-14' transform='translate(298.5 57.09009)'%3e52.2%3c/text%3e %3ctext class='cls-14' transform='translate(2.03711 127.69647)'%3e40.7%3c/text%3e %3ctext class='cls-14' transform='translate(298.5 138.54956)'%3e39%3c/text%3e %3ctext class='cls-14' transform='translate(10.37695 137.6922)'%3e39%3c/text%3e %3ctext class='cls-14' transform='translate(298.5 102.85431)'%3e43.4%3c/text%3e %3ctext class='cls-14' transform='translate(2.03711 147.6875)'%3e37.5%3c/text%3e %3ctext class='cls-14' transform='translate(298.5 122.82733)'%3e42.9%3c/text%3e %3ctext class='cls-14' transform='translate(298.5 112.82733)'%3e43.2%3c/text%3e %3ctext class='cls-14' transform='translate(2.03711 157.66913)'%3e35.2%3c/text%3e %3ctext class='cls-14' transform='translate(298.5 158.2973)'%3e35.8%3c/text%3e %3c/g%3e %3c/g%3e%3c/svg%3e";

const metadata$o = {
  name: 'Slope chart',
  id: 'rawgraphs.slopechart',
  thumbnail: img$L,
  icon: img$K,
  categories: ['correlations'],
  description: 'It allows the comparison of two continuous dimensions showing them as axes, and using a line to show the relationship.',
  code: 'https://github.com/rawgraphs/rawgraphs-charts/tree/master/src/slopechart',
  tutorial: 'https://rawgraphs.io/learning/how-to-make-a-slope-graph/'
};

const dimensions$o = [{
  id: 'source',
  name: 'Source',
  validTypes: ['number', 'date'],
  required: true
}, {
  id: 'target',
  name: 'Target',
  validTypes: ['number', 'date'],
  required: true
}, {
  id: 'name',
  name: 'Label',
  validTypes: ['number', 'date', 'string'],
  required: false
}, {
  id: 'color',
  name: 'Color',
  validTypes: ['number', 'date', 'string'],
  required: false
}, {
  id: 'series',
  name: 'Series',
  validTypes: ['number', 'string', 'date'],
  required: false
}];

const mapData$o = {
  source: 'get',
  target: 'get',
  name: 'get',
  color: 'get',
  series: 'get'
};

function render$o(svgNode, data, visualOptions, mapping, originalData, styles) {
  const {
    // artboard options
    width,
    height,
    background,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    showLegend,
    legendWidth,
    // chart
    nonOverlap,
    showDots,
    dotsDiameter,
    // series
    columnsNumber,
    showSeriesLabels,
    showGrid,
    // color dimension option, defined in visualOptions.js
    colorScale
  } = visualOptions; // Margin convention

  const margin = {
    top: marginTop,
    right: marginRight,
    bottom: marginBottom,
    left: marginLeft
  };
  const dotsRadius = dotsDiameter / 2; // due to the way rawgraphs core handles empty dimensions
  // check if the value is an array that means "no values"
  // @TODO: fix this in core

  data.forEach(d => {
    d.series = Array.isArray(d.series) ? '' : d.series;
  }); // if series is exposed, recreate the nested structure

  const nestedData = groups(data, d => d.series); // select the SVG element

  const svg = select(svgNode); // add background

  svg.append('rect').attr('width', showLegend ? width + legendWidth : width).attr('height', height).attr('x', 0).attr('y', 0).attr('fill', background).attr('id', 'background'); // add the visualization layer

  const vizLayer = svg.append('g').attr('id', 'viz'); // set up grid

  const gridding$1 = gridding().size([width, height]).mode('grid').padding(0) // no padding, margins will be applied inside
  .cols(columnsNumber);
  const griddingData = gridding$1(nestedData); // create the clip path

  svg.append('clipPath').attr('id', 'serieClipPath').append('rect').attr('x', 0).attr('y', 0).attr('width', griddingData[0].width).attr('height', griddingData[0].height); // draw the grid if asked

  if (showGrid) {
    svg.append('g').attr('id', 'grid').selectAll('rect').data(griddingData).enter().append('rect').attr('x', d => d.x).attr('y', d => d.y).attr('width', d => d.width).attr('height', d => d.height).attr('fill', 'none').attr('stroke', '#ccc');
  } // create the grid


  const series = vizLayer.selectAll('g').data(griddingData).join('g').attr('id', d => d[0]).attr('transform', d => 'translate(' + d.x + ',' + d.y + ')'); // get info on series


  // scales

  let columns = [mapping.source.value, mapping.target.value];
  let xScale = scalePoint().domain(columns).range([margin.left, griddingData[0].width - margin.right]);
  let yGlobalScale = scaleLinear().domain(extent(data.flatMap(d => [d.source, d.target]))).range([griddingData[0].height - margin.bottom, margin.top]);
  /*
      YOU CAN PUT HERE CODE THAT APPLIES TO ALL THE SERIES
    */
  // do stuff for each serie

  series.each(function (d, seriesIndex) {
    // make a local selection for each serie
    const selection = select(this);
    selection.attr('clip-path', 'url(#serieClipPath)'); // add axes ticks

    selection.append('g').attr('text-anchor', 'middle').styles(styles.axisLabel).selectAll('g').data(columns).join('g').attr('transform', (d, i) => `translate(${xScale(d)},${margin.top})`).call(g => g.append('text').attr('y', -9).text(d => d)).call(g => g.append('line').attr('y1', 0).attr('y2', -6).attr('stroke', 'currentColor')); //add lines

    let slopes = selection.append('g').selectAll('g').data(d[1]).join('g').attr('id', (d, i) => d.name);
    slopes.append('line').attr('x1', d => xScale(mapping.source.value)).attr('x2', d => xScale(mapping.target.value)).attr('y1', d => yGlobalScale(d.source)).attr('y2', d => yGlobalScale(d.target)).attr('stroke', d => colorScale(d.color)).attr('fill', 'none');

    if (showDots) {
      slopes.append('circle').attr('cx', d => xScale(mapping.source.value)).attr('cy', d => yGlobalScale(d.source)).attr('r', dotsRadius).attr('fill', d => colorScale(d.color));
      slopes.append('circle').attr('cx', d => xScale(mapping.target.value)).attr('cy', d => yGlobalScale(d.target)).attr('r', dotsRadius).attr('fill', d => colorScale(d.color));
    } // create a single flat dataset containing all the labels


    let labels = d[1].flatMap(d => {
      // return the couple for source and target
      return [{
        label: mapping.name.value != undefined ? d.name + ' ' + d.source : d.source,
        type: 'source',
        originalX: xScale(mapping.source.value) - dotsRadius - 4,
        x: xScale(mapping.source.value),
        y: yGlobalScale(d.source) + parseInt(styles.labelSecondary.fontSize) / 2
      }, {
        label: mapping.name.value != undefined ? d.name + ' ' + d.target : d.target,
        type: 'target',
        originalX: xScale(mapping.target.value) + dotsRadius + 4,
        x: xScale(mapping.target.value),
        y: yGlobalScale(d.target) + parseInt(styles.labelSecondary.fontSize) / 2
      }];
    }); // use forces to avoid overlaps

    forceSimulation(labels).force('y', forceY().y(d => d.y)).force('x', forceX().x(d => d.x).strength(1)).force('collision', forceCollide().radius(nonOverlap)).stop().tick(150); // precalculate positions
    // add labels

    selection.append('g').selectAll('text').data(labels).join('text').text(d => d.label).attr('transform', d => `translate(${d.originalX},${d.y})`).attr('text-anchor', d => d.type == 'source' ? 'end' : 'start').styles(styles.labelSecondary); // add series titles

    if (showSeriesLabels) {
      selection.append('text').attr('x', 5).attr('y', 5).text(d => d[0]).styles(styles.seriesLabel);
    }
  }); // show legends

  if (showLegend) {
    // svg width is adjusted automatically because of the "container:height" annotation in legendWidth visual option
    const legendLayer = select(svgNode).append('g').attr('id', 'legend').attr('transform', `translate(${width},${marginTop})`);
    const chartLegend = legend().legendWidth(legendWidth);

    if (mapping.color.value) {
      chartLegend.addColor(mapping.color.value, colorScale);
    }

    legendLayer.call(chartLegend);
  }
}

const visualOptions$o = {
  // Artboard
  marginTop: {
    type: 'number',
    label: 'Margin (top)',
    default: 40,
    group: 'artboard'
  },
  marginRight: {
    type: 'number',
    label: 'Margin (right)',
    default: 40,
    group: 'artboard'
  },
  marginBottom: {
    type: 'number',
    label: 'Margin (bottom)',
    default: 10,
    group: 'artboard'
  },
  marginLeft: {
    type: 'number',
    label: 'Margin (left)',
    default: 40,
    group: 'artboard'
  },
  showLegend: {
    type: 'boolean',
    label: 'Show legend',
    default: false,
    group: 'artboard'
  },
  legendWidth: {
    type: 'number',
    label: 'Legend width',
    default: 200,
    group: 'artboard',
    disabled: {
      showLegend: false
    },
    container: 'width',
    containerCondition: {
      showLegend: true
    }
  },
  // chart
  nonOverlap: {
    type: 'number',
    label: 'Label repelling force',
    default: 5,
    group: 'chart'
  },
  showDots: {
    type: 'boolean',
    label: 'Show dots',
    default: true,
    group: 'chart'
  },
  dotsDiameter: {
    type: 'number',
    label: 'Dots diameter',
    default: 5,
    group: 'chart',
    disabled: {
      showDots: false
    }
  },
  // series
  columnsNumber: {
    type: 'number',
    label: 'Grid columns',
    default: 0,
    group: 'series'
  },
  showSeriesLabels: {
    type: 'boolean',
    label: 'Show series titles',
    default: true,
    group: 'series'
  },
  showGrid: {
    type: 'boolean',
    label: 'Show grid',
    default: false,
    group: 'series'
  },
  colorScale: {
    type: 'colorScale',
    label: 'Color scale',
    dimension: 'color',
    default: {
      scaleType: 'ordinal',
      interpolator: 'interpolateSpectral'
    },
    group: 'colors'
  }
};

var slopechart = {
  metadata: metadata$o,
  dimensions: dimensions$o,
  mapData: mapData$o,
  render: render$o,
  visualOptions: visualOptions$o,
  styles: styles$1
};

var img$M = "data:image/svg+xml,%3csvg id='rawgraphs-icons' xmlns='http://www.w3.org/2000/svg' width='56' height='56' viewBox='0 0 56 56'%3e %3cdefs%3e %3cstyle%3e .cls-1 %7b fill: %2395e5c0%3b %7d .cls-2 %7b fill: %2306c26c%3b %7d %3c/style%3e %3c/defs%3e %3cg id='secundary'%3e %3cpath class='cls-1' d='M32%2c34c-4%2c0-4%2c3-8%2c3s-4-3-8-3-4-2-8-2v1c4%2c0%2c4%2c3%2c8%2c3s4%2c8%2c8%2c8%2c4-9%2c8-9%2c4%2c5%2c8%2c5%2c4-7%2c8-7V32c-4%2c0-4%2c4-8%2c4S36%2c34%2c32%2c34Z'/%3e %3cpath class='cls-1' d='M32%2c29c-4%2c0-4%2c1-8%2c1s-4-1-8-1H8v2c4%2c0%2c4%2c2%2c8%2c2s4%2c3%2c8%2c3%2c4-3%2c8-3%2c4%2c2%2c8%2c2%2c4-4%2c8-4V29c-4%2c0-4%2c2-8%2c2S36%2c29%2c32%2c29Z'/%3e %3c/g%3e %3cg id='primary'%3e %3cpolygon class='cls-2' points='46.305 46.805 44.865 46.805 46.061 48 7.5 48 7.5 49 46.061 49 44.865 50.195 46.305 50.195 48 48.5 46.305 46.805'/%3e %3cpath class='cls-2' d='M40%2c16c-4%2c0-4%2c5-8%2c5s-4-9-8-9-4%2c8-8%2c8-4%2c3-8%2c3v2c4%2c0%2c4-2%2c8-2s4-3%2c8-3%2c4%2c3%2c8%2c3h8c4%2c0%2c4%2c2%2c8%2c2V23C44%2c23%2c44%2c16%2c40%2c16Z'/%3e %3cpath class='cls-2' d='M32%2c24c-4%2c0-4-3-8-3s-4%2c3-8%2c3-4%2c2-8%2c2v2h8c4%2c0%2c4%2c1%2c8%2c1s4-1%2c8-1%2c4%2c2%2c8%2c2%2c4-2%2c8-2V26c-4%2c0-4-2-8-2Z'/%3e %3c/g%3e%3c/svg%3e";

var img$N = "data:image/svg+xml,%3csvg id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' width='320' height='160' viewBox='0 0 320 160'%3e %3cdefs%3e %3cstyle%3e .cls-1 %7b fill: %2369bda9%3b %7d .cls-2 %7b fill: %239e0142%3b %7d .cls-3 %7b fill: %23f0704a%3b %7d .cls-4 %7b fill: %23fedd8d%3b %7d .cls-5 %7b fill: %23e0f3a1%3b %7d .cls-6 %7b fill: %235e4fa2%3b %7d .cls-7 %7b fill: none%3b stroke: black%3b %7d .cls-8 %7b isolation: isolate%3b font-size: 10px%3b font-family: Helvetica%3b %7d %3c/style%3e %3c/defs%3e %3cg id='viz'%3e %3cg%3e %3cg%3e %3cpath class='cls-1' d='M0%2c81.8476a44.8176%2c44.8176%2c0%2c0%2c1%2c6.952-.7647c2.3176-.0107%2c4.6357.3452%2c6.9519.3117s4.6306-.4563%2c6.952.2238%2c4.65%2c2.4633%2c6.971%2c2.8949%2c4.6354-.4883%2c6.952-1.735%2c4.6354-2.82%2c6.952-3.5848a22.7508%2c22.7508%2c0%2c0%2c1%2c6.9519-.7612%2c20.7412%2c20.7412%2c0%2c0%2c0%2c6.971-1.0168%2c33.4834%2c33.4834%2c0%2c0%2c0%2c6.952-4.0253c2.3165-1.5934%2c4.6354-3.2%2c6.952-4.9575s4.6306-3.6642%2c6.9519-4.4336%2c4.65-.401%2c6.971-.0848%2c4.6355.58%2c6.952.77a27.9579%2c27.9579%2c0%2c0%2c0%2c6.952-.0846c2.3165-.3892%2c4.6307-1.2825%2c6.9519-1.4822a18.96%2c18.96%2c0%2c0%2c1%2c6.9711.9819%2c17.8348%2c17.8348%2c0%2c0%2c1%2c6.9519%2c3.544c2.3166%2c1.9743%2c4.6355%2c5.0413%2c6.952%2c6.9918s4.6307%2c2.7849%2c6.952%2c4.4485a35.5993%2c35.5993%2c0%2c0%2c1%2c6.971%2c7.1607c2.3213%2c3.004%2c4.6354%2c6.5189%2c6.9519%2c9.5321a54.6629%2c54.6629%2c0%2c0%2c0%2c6.952%2c7.5834%2c18.8771%2c18.8771%2c0%2c0%2c0%2c6.952%2c4.3218c2.3213.6579%2c4.65.368%2c6.971%2c1.8429s4.6354%2c4.7143%2c6.952%2c7.5659%2c4.6354%2c5.3154%2c6.9519%2c6.6151a11.5921%2c11.5921%2c0%2c0%2c0%2c6.952%2c1.2444%2c20.2873%2c20.2873%2c0%2c0%2c0%2c6.971-1.7839%2c46.1506%2c46.1506%2c0%2c0%2c0%2c6.952-4.3566c2.3165-1.6472%2c4.6354-3.3075%2c6.9519-3.46s4.6307%2c1.2019%2c6.952%2c1.41%2c4.65-.7319%2c6.971-1.7575%2c4.6355-2.1372%2c6.952-3.4274a25.8593%2c25.8593%2c0%2c0%2c0%2c6.952-5.2888c2.3165-2.53%2c4.6306-6.1212%2c6.9519-8.0687s4.65-2.251%2c6.971-3.2405%2c4.6355-2.6649%2c6.952-3.303%2c4.6354-.2392%2c6.952-.3373%2c4.6306-.6931%2c6.9519-.8874%2c4.65.012%2c6.9711-.2727%2c4.6354-1.06%2c6.9519-1.4624a18.9441%2c18.9441%2c0%2c0%2c1%2c6.952.0263%2c30.6138%2c30.6138%2c0%2c0%2c1%2c6.952%2c2.4854c2.3212%2c1.09%2c4.65%2c2.33%2c6.971%2c3.2826s4.6358%2c1.618%2c6.9519%2c2.5319%2c4.6341%2c2.0761%2c6.952%2c3.2384h0c-2.3179-1.1623-4.6358-2.3246-6.952-3.2384s-4.6306-1.5792-6.9519-2.5319-4.65-2.1928-6.971-3.2826a30.6138%2c30.6138%2c0%2c0%2c0-6.952-2.4854%2c18.9441%2c18.9441%2c0%2c0%2c0-6.952-.0263c-2.3165.4019-4.6306%2c1.1777-6.9519%2c1.4624s-4.65.0783-6.9711.2727-4.6354.7894-6.9519.8874-4.6355-.3009-6.952.3373-4.6307%2c2.3133-6.952%2c3.303-4.65%2c1.2938-6.971%2c3.2469-4.6354%2c5.5552-6.9519%2c8.0843a26.31%2c26.31%2c0%2c0%2c1-6.952%2c5.2947q-3.4747%2c1.9643-6.952%2c3.5017a16.3514%2c16.3514%2c0%2c0%2c1-6.971%2c1.8464c-2.3213-.08-4.6354-1.136-6.952-.7056s-4.6354%2c2.3474-6.9519%2c4.3418-4.6307%2c4.0664-6.952%2c5.7059-4.65%2c2.8467-6.971%2c4.2365-4.6354%2c2.9623-6.952%2c3.3228-4.6354-.4909-6.9519-2.609-4.6307-5.5027-6.952-5.9987-4.65%2c1.8966-6.971%2c2.7741-4.6355.24-6.952.73-4.6354%2c2.1065-6.952.4484-4.6306-6.5912-6.9519-9.0665-4.65-2.4929-6.971-3.9662-4.6355-4.4024-6.952-5.1788-4.6354.6-6.952.1356-4.6306-2.7692-6.9519-3.5277-4.65.0292-6.9711-.1482a14.2982%2c14.2982%2c0%2c0%2c1-6.9519-2.9648c-2.3165-1.6447-4.6355-3.7914-6.952-5.0549a11.3631%2c11.3631%2c0%2c0%2c0-6.952-1.37c-2.3212.2738-4.65%2c1.2014-6.971.8959s-4.6354-1.8441-6.9519-2.821-4.6355-1.3921-6.952-.3153-4.6307%2c3.6454-6.952%2c4.6576-4.65.4677-6.971.7366-4.6354%2c1.3512-6.9519%2c4.5259-4.6355%2c8.4422-6.952%2c9.7021-4.6307-1.4876-6.952-4.2622a50.3391%2c50.3391%2c0%2c0%2c0-6.971-7.3615%2c13.6136%2c13.6136%2c0%2c0%2c0-6.952-2.824%2c33.4483%2c33.4483%2c0%2c0%2c0-6.9519.17c-2.3177.2129-4.6348.4112-6.952.6095Z'/%3e %3cpath class='cls-2' d='M0%2c81.8476a44.8176%2c44.8176%2c0%2c0%2c1%2c6.952-.7647c2.3176-.0107%2c4.6357.3452%2c6.9519.3117s4.6306-.4563%2c6.952.2238%2c4.65%2c2.4633%2c6.971%2c2.8949%2c4.6354-.4882%2c6.952-1.735%2c4.6354-2.82%2c6.952-3.5848a22.8161%2c22.8161%2c0%2c0%2c1%2c6.9519-.7612%2c20.9421%2c20.9421%2c0%2c0%2c0%2c6.971-1.0168%2c32.2254%2c32.2254%2c0%2c0%2c0%2c6.952-4.0253c2.3165-1.6164%2c4.6354-3.2865%2c6.952-5.2206s4.6306-4.1324%2c6.9519-5.685%2c4.65-2.46%2c6.971-4.0844a40.3827%2c40.3827%2c0%2c0%2c0%2c6.952-6.6433c2.3165-2.6761%2c4.6355-5.686%2c6.952-8.5265a39.4057%2c39.4057%2c0%2c0%2c1%2c6.9519-7.15c2.3213-1.6385%2c4.65-2.2447%2c6.9711-3.77s4.6354-3.97%2c6.9519-4.9651%2c4.6355-.54%2c6.952-1.6166%2c4.6307-3.6842%2c6.952-4.9667%2c4.65-1.24%2c6.971-3.6425%2c4.6354-7.2514%2c6.9519-8.9231%2c4.6355-.1666%2c6.952.3245%2c4.6307-.0318%2c6.952.9206%2c4.65%2c3.38%2c6.971%2c3.3915%2c4.6354-2.3939%2c6.952-4.4215%2c4.6354-3.6776%2c6.9519-3.9241%2c4.6307.9106%2c6.952%2c2.304%2c4.65%2c3.023%2c6.971%2c4.654%2c4.6354%2c3.2631%2c6.952%2c5.2154%2c4.6354%2c4.2245%2c6.9519%2c5.178%2c4.6307.5882%2c6.952%2c2.36%2c4.65%2c5.6814%2c6.971%2c8.584%2c4.6355%2c4.7987%2c6.952%2c7.8714%2c4.6354%2c7.3222%2c6.952%2c10.7529a40.4025%2c40.4025%2c0%2c0%2c0%2c6.9519%2c8.0521%2c47.3735%2c47.3735%2c0%2c0%2c0%2c6.971%2c4.812%2c48.715%2c48.715%2c0%2c0%2c0%2c6.952%2c3.6914c2.3165.9122%2c4.6354%2c1.3532%2c6.952%2c2.3406s4.6306%2c2.5214%2c6.9519%2c3.6227a29.2081%2c29.2081%2c0%2c0%2c0%2c6.9711%2c2.2273c2.3213.4573%2c4.6354.7034%2c6.9519%2c1.1018a22.35%2c22.35%2c0%2c0%2c1%2c6.952%2c2.1826c2.3165%2c1.2333%2c4.6307%2c3.1491%2c6.952%2c4.6s4.65%2c2.4382%2c6.971%2c3.8837%2c4.6358%2c3.3494%2c6.9519%2c4.8742A62.973%2c62.973%2c0%2c0%2c0%2c320%2c96.6121v3.6651c-2.3179-1.1623-4.6358-2.3246-6.952-3.2384s-4.6306-1.5792-6.9519-2.5319-4.65-2.1928-6.971-3.2826a30.6138%2c30.6138%2c0%2c0%2c0-6.952-2.4854%2c18.9441%2c18.9441%2c0%2c0%2c0-6.952-.0263c-2.3165.4019-4.6306%2c1.1777-6.9519%2c1.4624s-4.65.0783-6.9711.2727-4.6354.7894-6.9519.8874-4.6355-.3009-6.952.3373-4.6307%2c2.3135-6.952%2c3.303-4.65%2c1.2931-6.971%2c3.2405-4.6354%2c5.5387-6.9519%2c8.0687a25.8593%2c25.8593%2c0%2c0%2c1-6.952%2c5.2888c-2.3165%2c1.29-4.6307%2c2.4018-6.952%2c3.4274s-4.65%2c1.9651-6.971%2c1.7575-4.6354-1.5623-6.952-1.41-4.6354%2c1.8132-6.9519%2c3.46a46.1506%2c46.1506%2c0%2c0%2c1-6.952%2c4.3566%2c20.2873%2c20.2873%2c0%2c0%2c1-6.971%2c1.7839%2c11.5921%2c11.5921%2c0%2c0%2c1-6.952-1.2444c-2.3165-1.3-4.6354-3.7635-6.9519-6.6151s-4.6307-6.0911-6.952-7.5659-4.65-1.185-6.971-1.8429a18.8771%2c18.8771%2c0%2c0%2c1-6.952-4.3218%2c54.6629%2c54.6629%2c0%2c0%2c1-6.952-7.5834c-2.3165-3.0132-4.6306-6.5281-6.9519-9.5321a35.5993%2c35.5993%2c0%2c0%2c0-6.971-7.1607c-2.3213-1.6636-4.6355-2.4979-6.952-4.4485s-4.6354-5.0175-6.952-6.9918a17.8348%2c17.8348%2c0%2c0%2c0-6.9519-3.544%2c18.96%2c18.96%2c0%2c0%2c0-6.9711-.9819c-2.3212.2-4.6354%2c1.093-6.9519%2c1.4822a27.9579%2c27.9579%2c0%2c0%2c1-6.952.0846c-2.3165-.1895-4.6307-.4535-6.952-.77s-4.65-.6846-6.971.0848-4.6354%2c2.6765-6.9519%2c4.4336-4.6355%2c3.3641-6.952%2c4.9575a33.4834%2c33.4834%2c0%2c0%2c1-6.952%2c4.0253%2c20.7412%2c20.7412%2c0%2c0%2c1-6.971%2c1.0168%2c22.7508%2c22.7508%2c0%2c0%2c0-6.9519.7612c-2.3166.7648-4.6355%2c2.3382-6.952%2c3.5848s-4.6307%2c2.1666-6.952%2c1.735-4.65-2.2147-6.971-2.8949-4.6357-.2573-6.952-.2238S9.27%2c81.0722%2c6.952%2c81.0829A44.8176%2c44.8176%2c0%2c0%2c0%2c0%2c81.8476Z'/%3e %3cpath class='cls-3' d='M0%2c81.8476a44.8176%2c44.8176%2c0%2c0%2c1%2c6.952-.7647c2.3176-.0107%2c4.6357.3452%2c6.9519.3117s4.6306-.4563%2c6.952.2238%2c4.65%2c2.4633%2c6.971%2c2.8949%2c4.6354-.4882%2c6.952-1.735%2c4.6354-2.82%2c6.952-3.5848a22.8161%2c22.8161%2c0%2c0%2c1%2c6.9519-.7612%2c20.9421%2c20.9421%2c0%2c0%2c0%2c6.971-1.0168%2c32.2254%2c32.2254%2c0%2c0%2c0%2c6.952-4.0253c2.3165-1.6164%2c4.6354-3.2865%2c6.952-5.2206s4.6306-4.1324%2c6.9519-5.685%2c4.65-2.46%2c6.971-4.0844a40.3827%2c40.3827%2c0%2c0%2c0%2c6.952-6.6433c2.3165-2.6761%2c4.6355-5.686%2c6.952-8.5265a39.4057%2c39.4057%2c0%2c0%2c1%2c6.9519-7.15c2.3213-1.6385%2c4.65-2.2447%2c6.9711-3.77s4.6354-3.97%2c6.9519-4.9651%2c4.6355-.54%2c6.952-1.6166%2c4.6307-3.6842%2c6.952-4.9667%2c4.65-1.24%2c6.971-3.6425%2c4.6354-7.2514%2c6.9519-8.9231%2c4.6355-.1666%2c6.952.3245%2c4.6307-.0318%2c6.952.9206%2c4.65%2c3.38%2c6.971%2c3.3915%2c4.6354-2.3939%2c6.952-4.4215%2c4.6354-3.6774%2c6.9519-3.9241%2c4.6307.91%2c6.952%2c2.304%2c4.65%2c3.0266%2c6.971%2c4.654%2c4.6354%2c3.25%2c6.952%2c5.2154%2c4.6354%2c4.2734%2c6.9519%2c5.178%2c4.6307.4059%2c6.952.88%2c4.65%2c1.9223%2c6.971%2c2.8545%2c4.6355%2c1.3489%2c6.952%2c2.6133a34.4756%2c34.4756%2c0%2c0%2c1%2c6.952%2c5.64c2.3165%2c2.2638%2c4.6306%2c4.6792%2c6.9519%2c6.629a65.3792%2c65.3792%2c0%2c0%2c0%2c6.971%2c4.9281%2c32.6228%2c32.6228%2c0%2c0%2c0%2c6.952%2c3.7628c2.3165.7637%2c4.6354.7865%2c6.952%2c1.5051a53.2377%2c53.2377%2c0%2c0%2c1%2c6.9519%2c3.2619c2.3213%2c1.1291%2c4.65%2c1.9728%2c6.9711%2c3.1434s4.6354%2c2.6682%2c6.9519%2c3.7693%2c4.6354%2c1.806%2c6.952%2c3.76%2c4.6307%2c5.1578%2c6.952%2c7.7314%2c4.65%2c4.517%2c6.971%2c6.8892%2c4.6358%2c5.1729%2c6.9519%2c7.2968A44.6159%2c44.6159%2c0%2c0%2c0%2c320%2c91.5228v5.0893a62.973%2c62.973%2c0%2c0%2c1-6.952-3.8161c-2.3161-1.5248-4.6306-3.4288-6.9519-4.8742s-4.65-2.4323-6.971-3.8837-4.6355-3.3671-6.952-4.6a22.35%2c22.35%2c0%2c0%2c0-6.952-2.1826c-2.3165-.3984-4.6306-.6445-6.9519-1.1018a29.2081%2c29.2081%2c0%2c0%2c1-6.9711-2.2273c-2.3213-1.1013-4.6354-2.6352-6.9519-3.6227s-4.6355-1.4284-6.952-2.3406a48.715%2c48.715%2c0%2c0%2c1-6.952-3.6914%2c47.3735%2c47.3735%2c0%2c0%2c1-6.971-4.812%2c40.4025%2c40.4025%2c0%2c0%2c1-6.9519-8.0521c-2.3166-3.4307-4.6355-7.68-6.952-10.7529s-4.6307-4.9687-6.952-7.8714-4.65-6.812-6.971-8.584-4.6354-1.4067-6.952-2.36-4.6354-3.2258-6.9519-5.178-4.6307-3.5845-6.952-5.2154-4.65-3.2606-6.971-4.654-4.6354-2.55-6.952-2.304-4.6354%2c1.8965-6.9519%2c3.9241-4.6307%2c4.4328-6.952%2c4.4215-4.65-2.4391-6.971-3.3915-4.6355-.4295-6.952-.9206-4.6354-1.9962-6.952-.3245-4.6306%2c6.52-6.9519%2c8.9231-4.65%2c2.36-6.971%2c3.6425-4.6355%2c3.89-6.952%2c4.9667-4.6354.6217-6.952%2c1.6166-4.6306%2c3.44-6.9519%2c4.9651-4.65%2c2.1316-6.9711%2c3.77a39.4057%2c39.4057%2c0%2c0%2c0-6.9519%2c7.15c-2.3165%2c2.84-4.6355%2c5.85-6.952%2c8.5265A40.3827%2c40.3827%2c0%2c0%2c1%2c83.4807%2c58.4c-2.3212%2c1.6247-4.65%2c2.5318-6.971%2c4.0844s-4.6354%2c3.7509-6.9519%2c5.685-4.6355%2c3.6042-6.952%2c5.2206a32.2254%2c32.2254%2c0%2c0%2c1-6.952%2c4.0253%2c20.9421%2c20.9421%2c0%2c0%2c1-6.971%2c1.0168%2c22.8161%2c22.8161%2c0%2c0%2c0-6.9519.7612c-2.3166.7643-4.6355%2c2.338-6.952%2c3.5848s-4.6307%2c2.1667-6.952%2c1.735-4.65-2.2147-6.971-2.8949-4.6357-.2573-6.952-.2238S9.27%2c81.0722%2c6.952%2c81.0829A44.8176%2c44.8176%2c0%2c0%2c0%2c0%2c81.8476Z'/%3e %3cpath class='cls-4' d='M0%2c81.8476a44.8176%2c44.8176%2c0%2c0%2c1%2c6.952-.7647c2.3176-.0107%2c4.6357.3452%2c6.9519.3117s4.6306-.4563%2c6.952.2238%2c4.65%2c2.4633%2c6.971%2c2.8949%2c4.6354-.4882%2c6.952-1.735%2c4.6354-2.82%2c6.952-3.5848a22.8161%2c22.8161%2c0%2c0%2c1%2c6.9519-.7612%2c20.9421%2c20.9421%2c0%2c0%2c0%2c6.971-1.0168%2c32.2213%2c32.2213%2c0%2c0%2c0%2c6.952-4.0253c2.3165-1.6165%2c4.6354-3.2868%2c6.952-5.2206s4.6306-4.131%2c6.9519-5.685S81.16%2c60.02%2c83.4807%2c58.4a39.5227%2c39.5227%2c0%2c0%2c0%2c6.952-6.6433c2.3165-2.6944%2c4.6355-5.7543%2c6.952-8.5265a53.8073%2c53.8073%2c0%2c0%2c1%2c6.9519-7.15c2.3213-1.8932%2c4.65-3.1952%2c6.9711-5.1878s4.6354-4.6758%2c6.9519-5.5555%2c4.6355.0441%2c6.952-.9293%2c4.6307-3.8441%2c6.952-5.3548%2c4.65-1.6616%2c6.971-4.1822%2c4.6354-7.4108%2c6.9519-9.05%2c4.6355-.0269%2c6.952.4979%2c4.6307-.0377%2c6.952.83%2c4.65%2c3.1665%2c6.971%2c2.61%2c4.6354-3.97%2c6.952-6.0948%2c4.6354-2.9635%2c6.9519-2.621%2c4.6307%2c1.8657%2c6.952%2c3.2546%2c4.65%2c2.6434%2c6.971%2c4.2645%2c4.6354%2c3.609%2c6.952%2c5.5846%2c4.6354%2c3.939%2c6.9519%2c4.3151%2c4.6307-.835%2c6.952-.6915%2c4.65%2c1.6417%2c6.971%2c3.0112%2c4.6355%2c2.61%2c6.952%2c3.9644a25.5894%2c25.5894%2c0%2c0%2c1%2c6.952%2c5.4785c2.3165%2c2.6573%2c4.6306%2c6.5045%2c6.9519%2c8.5968s4.65%2c2.43%2c6.971%2c3.59%2c4.6355%2c3.1446%2c6.952%2c4.1258%2c4.6354.96%2c6.952%2c1.7414%2c4.6306%2c2.3671%2c6.9519%2c3.5718%2c4.65%2c2.0289%2c6.9711%2c3.2314%2c4.6354%2c2.7833%2c6.9519%2c3.9167%2c4.6354%2c1.8193%2c6.952%2c3.7731%2c4.6307%2c5.1753%2c6.952%2c7.7854%2c4.65%2c4.6088%2c6.971%2c6.9382%2c4.6358%2c4.99%2c6.9519%2c7.0781A53.9479%2c53.9479%2c0%2c0%2c0%2c320%2c89.6959v1.8269a44.6159%2c44.6159%2c0%2c0%2c1-6.952-5.0182c-2.3161-2.1239-4.6306-4.9247-6.9519-7.2968s-4.65-4.3156-6.971-6.8892-4.6355-5.7772-6.952-7.7314-4.6354-2.6591-6.952-3.76-4.6306-2.5986-6.9519-3.7693-4.65-2.0143-6.9711-3.1434a53.2377%2c53.2377%2c0%2c0%2c0-6.9519-3.2619c-2.3166-.7186-4.6355-.7414-6.952-1.5051a32.6228%2c32.6228%2c0%2c0%2c1-6.952-3.7628%2c65.3792%2c65.3792%2c0%2c0%2c1-6.971-4.9281c-2.3213-1.95-4.6354-4.3652-6.9519-6.629a34.4756%2c34.4756%2c0%2c0%2c0-6.952-5.64c-2.3165-1.2644-4.6307-1.6811-6.952-2.6133s-4.65-2.38-6.971-2.8545-4.6354.0243-6.952-.88-4.6354-3.2127-6.9519-5.178-4.6307-3.588-6.952-5.2154-4.65-3.26-6.971-4.654-4.6354-2.5507-6.952-2.304-4.6354%2c1.8966-6.9519%2c3.9241-4.6307%2c4.4327-6.952%2c4.4215-4.65-2.4391-6.971-3.3915-4.6355-.4295-6.952-.9206-4.6354-1.9962-6.952-.3245-4.6306%2c6.52-6.9519%2c8.9231-4.65%2c2.36-6.971%2c3.6425-4.6355%2c3.89-6.952%2c4.9667-4.6354.6217-6.952%2c1.6166-4.6306%2c3.44-6.9519%2c4.9651-4.65%2c2.1316-6.9711%2c3.77a39.4057%2c39.4057%2c0%2c0%2c0-6.9519%2c7.15c-2.3165%2c2.84-4.6355%2c5.85-6.952%2c8.5265A40.3827%2c40.3827%2c0%2c0%2c1%2c83.4807%2c58.4c-2.3212%2c1.6247-4.65%2c2.5318-6.971%2c4.0844s-4.6354%2c3.7509-6.9519%2c5.685-4.6355%2c3.6042-6.952%2c5.2206a32.2254%2c32.2254%2c0%2c0%2c1-6.952%2c4.0253%2c20.9421%2c20.9421%2c0%2c0%2c1-6.971%2c1.0168%2c22.8161%2c22.8161%2c0%2c0%2c0-6.9519.7612c-2.3166.7643-4.6355%2c2.338-6.952%2c3.5848s-4.6307%2c2.1667-6.952%2c1.735-4.65-2.2147-6.971-2.8949-4.6357-.2573-6.952-.2238S9.27%2c81.0722%2c6.952%2c81.0829A44.8176%2c44.8176%2c0%2c0%2c0%2c0%2c81.8476Z'/%3e %3cpath class='cls-5' d='M0%2c81.8476a44.8176%2c44.8176%2c0%2c0%2c1%2c6.952-.7647c2.3176-.0107%2c4.6357.3452%2c6.9519.3117s4.6306-.4563%2c6.952.2238%2c4.65%2c2.4633%2c6.971%2c2.8949%2c4.6354-.4882%2c6.952-1.735%2c4.6354-2.82%2c6.952-3.5848a22.8161%2c22.8161%2c0%2c0%2c1%2c6.9519-.7612%2c20.9421%2c20.9421%2c0%2c0%2c0%2c6.971-1.0168%2c32.2213%2c32.2213%2c0%2c0%2c0%2c6.952-4.0253c2.3165-1.6165%2c4.6354-3.2868%2c6.952-5.2206s4.6306-4.131%2c6.9519-5.685S81.16%2c60.02%2c83.4807%2c58.4a39.5227%2c39.5227%2c0%2c0%2c0%2c6.952-6.6433c2.3165-2.6944%2c4.6355-5.7543%2c6.952-8.5265a53.8073%2c53.8073%2c0%2c0%2c1%2c6.9519-7.15c2.3213-1.8932%2c4.65-3.1952%2c6.9711-5.1878s4.6354-4.6758%2c6.9519-5.5555%2c4.6355.0441%2c6.952-.9293%2c4.6307-3.8441%2c6.952-5.3548%2c4.65-1.6616%2c6.971-4.1822%2c4.6354-7.4108%2c6.9519-9.05%2c4.6355-.0269%2c6.952.4979%2c4.6307-.0376%2c6.952.83%2c4.65%2c3.1665%2c6.971%2c2.61%2c4.6354-3.9694%2c6.952-6.0948S178.5489.7%2c180.8654%2c1.043s4.6307%2c1.8667%2c6.952%2c3.2546%2c4.65%2c2.64%2c6.971%2c4.2645%2c4.6354%2c3.6233%2c6.952%2c5.5846%2c4.6354%2c3.8859%2c6.9519%2c4.3151%2c4.6307-.6368%2c6.952-.7472a16.0385%2c16.0385%2c0%2c0%2c1%2c6.971%2c1.744%2c77.2661%2c77.2661%2c0%2c0%2c1%2c6.952%2c3.4814%2c25.15%2c25.15%2c0%2c0%2c1%2c6.952%2c5.299c2.3165%2c2.5762%2c4.6306%2c6.3047%2c6.9519%2c8.3083s4.65%2c2.2821%2c6.971%2c3.296%2c4.6355%2c2.7629%2c6.952%2c3.4694%2c4.6354.37%2c6.952.54%2c4.6306.8455%2c6.9519%2c1.1456%2c4.65.2243%2c6.9711.5723%2c4.6354%2c1.12%2c6.9519%2c1.6693a18.6794%2c18.6794%2c0%2c0%2c0%2c6.952.5489%2c26.0028%2c26.0028%2c0%2c0%2c0%2c6.952-2.3781c2.3212-1.0648%2c4.65-2.2095%2c6.971-3.1173s4.6358-1.5788%2c6.9519-2.4088%2c4.6341-1.8192%2c6.952-2.8084v52.62a53.9479%2c53.9479%2c0%2c0%2c1-6.952-5.1225c-2.3161-2.0886-4.6306-4.7487-6.9519-7.0781s-4.65-4.3281-6.971-6.9382-4.6355-5.8317-6.952-7.7854-4.6354-2.64-6.952-3.7731-4.6306-2.7142-6.9519-3.9167-4.65-2.0267-6.9711-3.2314-4.6354-2.79-6.9519-3.5718-4.6355-.76-6.952-1.7414-4.6307-2.9652-6.952-4.1258-4.65-1.498-6.971-3.59-4.6354-5.9395-6.9519-8.5968a25.5894%2c25.5894%2c0%2c0%2c0-6.952-5.4785c-2.3165-1.3541-4.6307-2.5949-6.952-3.9644s-4.65-2.8677-6.971-3.0112-4.6354%2c1.0676-6.952.6915-4.6354-2.34-6.9519-4.3151-4.6307-3.9634-6.952-5.5846-4.65-2.8757-6.971-4.2645-4.6354-2.9121-6.952-3.2546-4.6354.4957-6.9519%2c2.621-4.6307%2c5.5378-6.952%2c6.0948-4.65-1.7416-6.971-2.61-4.6355-.3055-6.952-.83-4.6354-2.1369-6.952-.4979-4.6306%2c6.5294-6.9519%2c9.05-4.65%2c2.6714-6.971%2c4.1822-4.6355%2c4.3814-6.952%2c5.3548-4.6354.05-6.952.9293-4.6306%2c3.5629-6.9519%2c5.5555-4.65%2c3.2946-6.9711%2c5.1878a53.8073%2c53.8073%2c0%2c0%2c0-6.9519%2c7.15c-2.3165%2c2.7722-4.6355%2c5.8321-6.952%2c8.5265A39.5227%2c39.5227%2c0%2c0%2c1%2c83.4807%2c58.4c-2.3212%2c1.62-4.65%2c2.53-6.971%2c4.0844s-4.6354%2c3.7512-6.9519%2c5.685-4.6355%2c3.6041-6.952%2c5.2206a32.2213%2c32.2213%2c0%2c0%2c1-6.952%2c4.0253%2c20.9421%2c20.9421%2c0%2c0%2c1-6.971%2c1.0168%2c22.8161%2c22.8161%2c0%2c0%2c0-6.9519.7612c-2.3166.7643-4.6355%2c2.338-6.952%2c3.5848s-4.6307%2c2.1667-6.952%2c1.735-4.65-2.2147-6.971-2.8949-4.6357-.2573-6.952-.2238S9.27%2c81.0722%2c6.952%2c81.0829A44.8176%2c44.8176%2c0%2c0%2c0%2c0%2c81.8476Z'/%3e %3cpath class='cls-6' d='M0%2c32.5809c2.3172.1983%2c4.6343.3966%2c6.952.6095a33.4483%2c33.4483%2c0%2c0%2c0%2c6.9519.17%2c13.6136%2c13.6136%2c0%2c0%2c0%2c6.952-2.824%2c50.334%2c50.334%2c0%2c0%2c0%2c6.971-7.3615c2.3213-2.7746%2c4.6354-5.5221%2c6.952-4.2622s4.6354%2c6.5273%2c6.952%2c9.7021%2c4.6306%2c4.257%2c6.9519%2c4.5259%2c4.65-.2755%2c6.971.7366%2c4.6355%2c3.5809%2c6.952%2c4.6576%2c4.6354.6616%2c6.952-.3153%2c4.6306-2.5155%2c6.9519-2.821%2c4.65.6221%2c6.971.8959a11.3631%2c11.3631%2c0%2c0%2c0%2c6.952-1.37c2.3165-1.2634%2c4.6355-3.41%2c6.952-5.0548a14.2984%2c14.2984%2c0%2c0%2c1%2c6.9519-2.9649c2.3213-.1774%2c4.65.61%2c6.9711-.1482s4.6354-3.0634%2c6.9519-3.5277%2c4.6355.912%2c6.952.1356%2c4.6307-3.7055%2c6.952-5.1788%2c4.65-1.4908%2c6.971-3.9661%2c4.6354-7.4084%2c6.9519-9.0666%2c4.6355-.0413%2c6.952.4484%2c4.6307-.148%2c6.952.7295%2c4.65%2c3.27%2c6.971%2c2.7741%2c4.6354-3.8807%2c6.952-5.9987%2c4.6354-2.9695%2c6.9519-2.609%2c4.6307%2c1.933%2c6.952%2c3.3228%2c4.65%2c2.5969%2c6.971%2c4.2365%2c4.6354%2c3.7114%2c6.952%2c5.7059%2c4.6354%2c3.9115%2c6.9519%2c4.3419%2c4.6307-.6259%2c6.952-.7057a16.3514%2c16.3514%2c0%2c0%2c1%2c6.971%2c1.8464q3.482%2c1.5444%2c6.952%2c3.5017a26.3126%2c26.3126%2c0%2c0%2c1%2c6.952%2c5.2947c2.3165%2c2.5291%2c4.6306%2c6.1312%2c6.9519%2c8.0843s4.65%2c2.2572%2c6.971%2c3.2469%2c4.6355%2c2.6649%2c6.952%2c3.3031%2c4.6354.2391%2c6.952.3372%2c4.6306.6931%2c6.9519.8874%2c4.65-.012%2c6.9711.2727%2c4.6354%2c1.0606%2c6.9519%2c1.4624a18.9441%2c18.9441%2c0%2c0%2c0%2c6.952-.0263%2c30.6138%2c30.6138%2c0%2c0%2c0%2c6.952-2.4854c2.3212-1.09%2c4.65-2.33%2c6.971-3.2826s4.6358-1.618%2c6.9519-2.5319%2c4.6341-2.0761%2c6.952-3.2384V37.076c-2.3179.9892-4.6358%2c1.9783-6.952%2c2.8084s-4.6306%2c1.5009-6.9519%2c2.4088-4.65%2c2.0525-6.971%2c3.1173a26.0028%2c26.0028%2c0%2c0%2c1-6.952%2c2.3781%2c18.6794%2c18.6794%2c0%2c0%2c1-6.952-.5489c-2.3165-.55-4.6306-1.3213-6.9519-1.6693s-4.65-.2723-6.9711-.5723-4.6354-.9759-6.9519-1.1456-4.6355.1666-6.952-.54-4.6307-2.4556-6.952-3.4694-4.65-1.2925-6.971-3.296-4.6354-5.7321-6.9519-8.3083a25.15%2c25.15%2c0%2c0%2c0-6.952-5.299%2c77.2661%2c77.2661%2c0%2c0%2c0-6.952-3.4814%2c16.0385%2c16.0385%2c0%2c0%2c0-6.971-1.744c-2.3213.11-4.6354%2c1.1764-6.952.7472s-4.6354-2.3537-6.9519-4.3151-4.6307-3.96-6.952-5.5846-4.65-2.8767-6.971-4.2645-4.6354-2.9118-6.952-3.2546-4.6354.4956-6.9519%2c2.621-4.6307%2c5.5378-6.952%2c6.0948-4.65-1.7416-6.971-2.61-4.6355-.3055-6.952-.83-4.6354-2.1369-6.952-.4979-4.6306%2c6.5294-6.9519%2c9.05-4.65%2c2.6714-6.971%2c4.1822-4.6355%2c4.3814-6.952%2c5.3548-4.6354.05-6.952.9293-4.6306%2c3.5629-6.9519%2c5.5555-4.65%2c3.2946-6.9711%2c5.1878a53.8073%2c53.8073%2c0%2c0%2c0-6.9519%2c7.15c-2.3165%2c2.7722-4.6355%2c5.8321-6.952%2c8.5265A39.5227%2c39.5227%2c0%2c0%2c1%2c83.4807%2c58.4c-2.3212%2c1.62-4.65%2c2.53-6.971%2c4.0844s-4.6354%2c3.7512-6.9519%2c5.685-4.6355%2c3.6041-6.952%2c5.2206a32.2213%2c32.2213%2c0%2c0%2c1-6.952%2c4.0253%2c20.9421%2c20.9421%2c0%2c0%2c1-6.971%2c1.0168%2c22.8161%2c22.8161%2c0%2c0%2c0-6.9519.7612c-2.3166.7643-4.6355%2c2.338-6.952%2c3.5848s-4.6307%2c2.1667-6.952%2c1.735-4.65-2.2147-6.971-2.8949-4.6357-.2573-6.952-.2238S9.27%2c81.0722%2c6.952%2c81.0829A44.8176%2c44.8176%2c0%2c0%2c0%2c0%2c81.8476Z'/%3e %3c/g%3e %3cg id='xAxis'%3e %3cpath class='cls-7' d='M.5%2c139.174h320'/%3e %3cg%3e %3cline class='cls-7' x1='14.4039' y1='138.674' x2='14.4039' y2='144.674'/%3e %3ctext class='cls-8' transform='translate(3.281 154.774)'%3e1975%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-7' x1='49.1828' y1='138.674' x2='49.1828' y2='144.674'/%3e %3ctext class='cls-8' transform='translate(38.0598 154.774)'%3e1980%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-7' x1='83.9807' y1='138.674' x2='83.9807' y2='144.674'/%3e %3ctext class='cls-8' transform='translate(72.8577 154.774)'%3e1985%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-7' x1='118.7596' y1='138.674' x2='118.7596' y2='144.674'/%3e %3ctext class='cls-8' transform='translate(107.6365 154.774)'%3e1990%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-7' x1='153.5385' y1='138.674' x2='153.5385' y2='144.674'/%3e %3ctext class='cls-8' transform='translate(142.4155 154.774)'%3e1995%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-7' x1='188.3174' y1='138.674' x2='188.3174' y2='144.674'/%3e %3ctext class='cls-8' transform='translate(177.1943 154.774)'%3e2000%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-7' x1='223.1153' y1='138.674' x2='223.1153' y2='144.674'/%3e %3ctext class='cls-8' transform='translate(211.9922 154.774)'%3e2005%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-7' x1='257.8942' y1='138.674' x2='257.8942' y2='144.674'/%3e %3ctext class='cls-8' transform='translate(246.7712 154.774)'%3e2010%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-7' x1='292.6731' y1='138.674' x2='292.6731' y2='144.674'/%3e %3ctext class='cls-8' transform='translate(281.55 154.774)'%3e2015%3c/text%3e %3c/g%3e %3c/g%3e %3c/g%3e %3c/g%3e%3c/svg%3e";

const metadata$p = {
  name: 'Streamgraph (area chart)',
  id: 'rawgraphs.streamgraph',
  thumbnail: img$N,
  icon: img$M,
  categories: ['time series', 'correlations', 'proportions'],
  description: 'It allows the comparison of multiple categories over a continuous dimension.',
  code: 'https://github.com/rawgraphs/rawgraphs-charts/tree/master/src/streamgraph',
  tutorial: 'https://rawgraphs.io/learning/how-to-make-a-streamgraph/'
};

const dimensions$p = [{
  id: 'x',
  name: 'X Axis',
  operation: 'get',
  validTypes: ['number', 'date'],
  required: true
}, {
  id: 'size',
  name: 'Size',
  operation: 'get',
  validTypes: ['number'],
  aggregation: true,
  aggregationDefault: 'sum'
}, {
  id: 'streams',
  name: 'Streams',
  validTypes: ['number', 'string', 'date'],
  required: false,
  operation: 'get'
}, {
  id: 'series',
  name: 'Series',
  validTypes: ['number', 'string', 'date'],
  required: false,
  operation: 'get'
}];

const mapData$p = function (data, mapping, dataTypes, dimensions) {
  const sizeAggregator = getDimensionAggregator('size', mapping, dataTypes, dimensions);
  let results = [];
  rollups(data, v => rollups(v, vv => {
    const item = {
      x: vv[0][mapping.x.value],
      //get the first one since it's grouped
      size: sizeAggregator(vv.map(d => d[mapping.size.value])),
      // aggregate
      series: vv[0][mapping.series.value],
      //get the first one since it's grouped
      streams: vv[0][mapping.streams.value] //get the first one since it's grouped

    };
    results.push(item);
  }, d => d[mapping.x.value].toString() // sub-group functions. toString() to enable grouping on dates
  ), d => d[mapping.series.value], // series grouping
  d => d[mapping.streams.value] // group functions
  );
  return results;
};

/*
Credits:
Inspired by https://observablehq.com/@d3/streamgraph
*/

function render$p(svgNode, data, visualOptions, mapping, originalData, styles) {
  const {
    // artboard options
    width,
    height,
    background,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    // chart options
    streamsOrder,
    streamsOffset,
    interpolation,
    showYAxis,
    // series options
    columnsNumber,
    useSameScale,
    sortSeriesBy,
    showSeriesLabels,
    repeatAxesLabels,
    showGrid,
    // color options
    colorScale,
    // legend
    showLegend,
    legendWidth,
    // labels
    showLabels,
    labelsType,
    showLabelsOutline
  } = visualOptions;
  const margin = {
    top: marginTop,
    right: marginRight,
    bottom: marginBottom,
    left: marginLeft
  }; //check if there are negative values, in case throw error

  data.forEach(d => {
    if (d.size < 0) {
      throw new Error('Values cannot be negative');
    }
  });
  const streamsDomain = [...new Set(data.map(d => d.streams))]; // create the stack function
  // define the function to retrieve the value
  // inspired by https://observablehq.com/@stevndegwa/stack-chart

  let stack$1 = stack().keys(streamsDomain).value((data, key) => data[1].has(key) ? data[1].get(key).size : 0).order(d3[streamsOrder]).offset(d3[streamsOffset]); // create nest structure

  const nestedData = rollups(data, v => {
    let localStack = Array.from(rollup(v.sort((a, b) => ascending(a.x, b.x)), // check that x axis is properly sorted
    ([e]) => e, e => e.x, e => e.streams));
    return stack$1(localStack);
  }, d => d.series).map(d => ({
    data: d,
    totalSize: sum(d[1].flat(), e => e[1] - e[0]),
    // compute the total size (in pixels) for each stream
    name: d[0]
  })); // series sorting functions

  const seriesSortings = {
    totalDescending: function (a, b) {
      return descending(a.totalSize, b.totalSize);
    },
    totalAscending: function (a, b) {
      return ascending(a.totalSize, b.totalSize);
    },
    name: function (a, b) {
      return ascending(a.name, b.name);
    },
    original: function (a, b) {
      return 1;
    }
  }; // sort series

  nestedData.sort(seriesSortings[sortSeriesBy]); // add background

  select(svgNode).append('rect').attr('width', showLegend ? width + legendWidth : width).attr('height', height).attr('x', 0).attr('y', 0).attr('fill', background).attr('id', 'background'); // set up grid

  const gridding$1 = gridding().size([width, height]).mode('grid').padding(0) // no padding, margins will be applied inside
  .cols(columnsNumber);
  const griddingData = gridding$1(nestedData);
  const svg = select(svgNode).append('g').attr('id', 'viz');
  const series = svg.selectAll('g').data(griddingData).join('g').attr('id', d => d[0]).attr('transform', d => 'translate(' + d.x + ',' + d.y + ')'); // calculate global stacks value

  const stacksValues = nestedData.map(d => d.data[1]).flat(2);
  const globalDomain = [min(stacksValues, d => d[0]), max(stacksValues, d => d[1])]; // x scale

  const xDomain = extent(data, e => e.x);
  const xScale = mapping.x.dataType.type === 'date' ? scaleTime() : scaleLinear();
  xScale.domain(xDomain).range([0, griddingData[0].width - margin.right - margin.left]); // add grid

  if (showGrid) {
    svg.append('g').attr('id', 'grid').selectAll('rect').data(griddingData).enter().append('rect').attr('x', d => d.x).attr('y', d => d.y).attr('width', d => d.width).attr('height', d => d.height).attr('fill', 'none').attr('stroke', '#ccc');
  }
  /*
      YOU CAN PUT HERE CODE THAT APPLIES TO ALL THE SERIES
    */


  series.each(function (d, serieIndex) {
    // make a local selection for each serie
    const selection = select(this).append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')'); // compute each serie width and height

    const serieWidth = d.width - margin.right - margin.left;
    const serieHeight = d.height - margin.top - margin.bottom;
    const stackedData = d.data[1];
    let localDomain = [min(stackedData, d => min(d, d => d[0])), max(stackedData, d => max(d, d => d[1]))];
    const sizeScale = scaleLinear().domain(useSameScale ? globalDomain : localDomain).nice().range([serieHeight, 0]);
    selection.append('g').selectAll('path').data(stackedData).join('path').attr('fill', ({
      key
    }) => {
      return colorScale(key);
    }).attr('d', area().curve(d3[interpolation]).x(d => xScale(d.data[0])).y0(d => sizeScale(d[0])).y1(d => sizeScale(d[1]))).append('title').text(({
      key
    }) => key);
    selection.append('g').attr('id', 'xAxis').attr('transform', 'translate(0,' + serieHeight + ')').call(axisBottom(xScale).tickSizeOuter(0));

    if (showYAxis) {
      selection.append('g').attr('id', 'yAxis') //.attr('transform', 'translate(0,' + serieHeight + ')')
      .call(axisLeft(sizeScale).tickSizeOuter(0));
    }

    if (showSeriesLabels) {
      select(this).append('text').attr('x', 4).attr('y', 4).text(d => d.data[0]).styles(styles.seriesLabel);
    } // add the axes titles


    selection.append('text').styles(styles.axisLabel).attr('y', serieHeight - 4).attr('x', serieWidth).attr('text-anchor', 'end').attr('display', serieIndex == 0 || repeatAxesLabels ? null : 'none').text(mapping.x.value);
    selection.append('text').styles(styles.axisLabel).attr('x', 4).attr('text-anchor', 'start').attr('dominant-baseline', 'hanging').attr('display', serieIndex == 0 || repeatAxesLabels ? null : 'none').text(mapping['size'].value);

    if (showLabels) {
      // if is on path, add paths to defs and then add texts
      if (labelsType == 'On path') {
        let defs = select(svgNode).append('defs');
        defs.selectAll('path').data(stackedData.filter(d => sum(d, e => e[1] - e[0]) > 0)).join('path').attr('id', (d, i) => 'path-' + serieIndex + '-' + i).attr('d', line().curve(d3[interpolation]).x(d => xScale(d.data[0])).y(d => sizeScale((d[0] + d[1]) / 2)));
        let labels = selection.append('g').attr('id', 'labels').selectAll('text').data(stackedData.filter(d => sum(d, e => e[1] - e[0]) > 0)).join('text').attr('dy', '0.5ex').attr('class', 'label').append('textPath').attr('xlink:xlink:href', (d, i) => '#path-' + serieIndex + '-' + i).attr('startOffset', d => {
          // find max value
          const maxIndex$1 = maxIndex(d, e => e[1] - e[0]); // get x position

          d.offset = Math.round(maxIndex$1 / d.length * 100); //clamp offset between 5% and 95%, return it

          return Math.min(95, Math.max(5, d.offset)) + '%';
        }).attr('alignment-baseline', 'middle').attr('text-anchor', d => d.offset > 90 ? 'end' : d.offset < 10 ? 'start' : 'middle').text(d => d.key).styles(styles.labelPrimary);

        if (showLabelsOutline) {
          labels.styles(styles.labelOutline);
        }
      } // if it is on point, find the maximum point


      if (labelsType == 'On point') {
        let labels = selection.append('g').attr('id', 'labels').selectAll('text').data(stackedData.filter(d => sum(d, e => e[1] - e[0]) > 0)).join('text').attr('x', d => {
          // find max value index
          const maxIndex$1 = maxIndex(d, e => e[1] - e[0]);
          d.maxElement = d[maxIndex$1]; // get x position

          return xScale(d.maxElement.data[0]);
        }).attr('y', d => sizeScale((d.maxElement[0] + d.maxElement[1]) / 2)).attr('text-anchor', d => xScale(d.maxElement.data[0]) > serieWidth - 10 ? 'end' : xScale(d.maxElement.data[0]) < 10 ? 'start' : 'middle').attr('alignment-baseline', 'middle').text(d => d.key).styles(styles.labelPrimary);

        if (showLabelsOutline) {
          labels.styles(styles.labelOutline);
        }
      }
    }
  }); // add legend

  if (showLegend) {
    const legendLayer = select(svgNode).append('g').attr('id', 'legend').attr('transform', `translate(${width},${marginTop})`);
    const chartLegend = legend().legendWidth(legendWidth);
    chartLegend.addColor('Colors', colorScale);
    legendLayer.call(chartLegend);
  }
}

const visualOptions$p = {
  marginTop: {
    type: 'number',
    label: 'Margin (top)',
    default: 20,
    group: 'artboard'
  },
  marginRight: {
    type: 'number',
    label: 'Margin (right)',
    default: 10,
    group: 'artboard'
  },
  marginBottom: {
    type: 'number',
    label: 'Margin (bottom)',
    default: 20,
    group: 'artboard'
  },
  marginLeft: {
    type: 'number',
    label: 'Margin (left)',
    default: 10,
    group: 'artboard'
  },
  showLegend: {
    type: 'boolean',
    label: 'Show legend',
    default: false,
    group: 'artboard'
  },
  legendWidth: {
    type: 'number',
    label: 'Legend width',
    default: 200,
    group: 'artboard',
    disabled: {
      showLegend: false
    },
    container: 'width',
    containerCondition: {
      showLegend: true
    }
  },
  streamsOrder: {
    type: 'text',
    label: 'Sort streams by',
    group: 'chart',
    options: [{
      label: 'Earliest',
      value: 'stackOrderAppearance'
    }, {
      label: 'Ascending',
      value: 'stackOrderAscending'
    }, {
      label: 'Descending',
      value: 'stackOrderDescending'
    }, {
      label: 'Inside out',
      value: 'stackOrderInsideOut'
    }, {
      label: 'None',
      value: 'stackOrderNone'
    }, {
      label: 'Reverse',
      value: 'stackOrderReverse'
    }],
    default: 'stackOrderNone'
  },
  interpolation: {
    type: 'text',
    label: 'Curve type',
    default: 'curveBumpX',
    options: [{
      label: 'Basis',
      value: 'curveBasis'
    }, {
      label: 'Bump',
      value: 'curveBumpX'
    }, {
      label: 'Cardinal',
      value: 'curveCardinal'
    }, {
      label: 'Catmull–Rom',
      value: 'curveCatmullRom'
    }, {
      label: 'Linear',
      value: 'curveLinear'
    }, {
      label: 'Monotone X',
      value: 'curveMonotoneX'
    }, {
      label: 'Natural',
      value: 'curveNatural'
    }, {
      label: 'Step',
      value: 'curveStep'
    }, {
      label: 'Step After',
      value: 'curveStepAfter'
    }, {
      label: 'Step Before',
      value: 'curveStepBefore'
    }],
    group: 'chart'
  },
  streamsOffset: {
    type: 'text',
    label: 'Streams vertical alignment',
    group: 'chart',
    options: [{
      label: 'Expand',
      value: 'stackOffsetExpand'
    }, // { label: 'Diverging', value: 'stackOffsetDiverging' },
    {
      label: 'Silhouette',
      value: 'stackOffsetSilhouette'
    }, {
      label: 'Wiggle',
      value: 'stackOffsetWiggle'
    }, {
      label: 'None',
      value: 'stackOffsetNone'
    }],
    default: 'stackOffsetNone'
  },
  showYAxis: {
    type: 'boolean',
    label: 'Show Y axis',
    default: false,
    group: 'chart'
  },
  useSameScale: {
    type: 'boolean',
    label: 'Use same scale',
    default: true,
    group: 'series'
  },
  columnsNumber: {
    type: 'number',
    label: 'Number of columns',
    default: 0,
    group: 'series'
  },
  sortSeriesBy: {
    type: 'text',
    label: 'Sort series by',
    group: 'series',
    options: [{
      label: 'Total value (descending)',
      value: 'totalAscending'
    }, {
      label: 'Total value (ascending)',
      value: 'totalDescending'
    }, {
      label: 'Name',
      value: 'name'
    }, {
      label: 'Original',
      value: 'original'
    }],
    default: 'totalDescending'
  },
  showSeriesLabels: {
    type: 'boolean',
    label: 'Show series titles',
    default: true,
    group: 'series'
  },
  showGrid: {
    type: 'boolean',
    label: 'Show series grid',
    default: false,
    group: 'series'
  },
  colorScale: {
    type: 'colorScale',
    label: 'Color scale',
    dimension: 'streams',
    default: {
      scaleType: 'ordinal',
      interpolator: 'interpolateSpectral'
    },
    group: 'colors'
  },
  showLabels: {
    type: 'boolean',
    label: 'Show streams labels',
    default: true,
    group: 'Labels'
  },
  labelsType: {
    type: 'text',
    label: 'Labels position',
    group: 'Labels',
    options: ['On path', 'On point'],
    default: 'On point',
    disabled: {
      showLabels: false
    }
  },
  showLabelsOutline: {
    type: 'boolean',
    label: 'Show outline',
    default: false,
    group: 'Labels',
    disabled: {
      showLabels: false
    }
  }
};

var streamgraph = {
  metadata: metadata$p,
  dimensions: dimensions$p,
  mapData: mapData$p,
  render: render$p,
  visualOptions: visualOptions$p,
  styles: styles$1
};

var img$O = "data:image/svg+xml,%3csvg id='rawgraphs-icons' xmlns='http://www.w3.org/2000/svg' width='56' height='56' viewBox='0 0 56 56'%3e %3cdefs%3e %3cstyle%3e .cls-1 %7b fill: %2395e5c0%3b %7d .cls-2 %7b fill: %2306c26c%3b %7d %3c/style%3e %3c/defs%3e %3cg id='secundary'%3e %3cpath class='cls-1' d='M21.3809%2c16.8352l-3.3315-6.1467A20.0207%2c20.0207%2c0%2c0%2c0%2c9.2866%2c20.9942L15.96%2c23.1183A13.0486%2c13.0486%2c0%2c0%2c1%2c21.3809%2c16.8352Z'/%3e %3cpath class='cls-1' d='M27%2c15.0507v-7a19.8756%2c19.8756%2c0%2c0%2c0-8.0724%2c2.16l3.3317%2c6.1473A12.9065%2c12.9065%2c0%2c0%2c1%2c27%2c15.0507Z'/%3e %3cpath class='cls-1' d='M36.288%2c9.8245l-2.7429%2c6.4376A13.07%2c13.07%2c0%2c0%2c1%2c39.0645%2c21.2l6.0944-3.4295A20.0446%2c20.0446%2c0%2c0%2c0%2c36.288%2c9.8245Z'/%3e %3cpath class='cls-1' d='M29%2c8.0505v7a12.93%2c12.93%2c0%2c0%2c1%2c3.6276.8141l2.7346-6.4183A19.9179%2c19.9179%2c0%2c0%2c0%2c29%2c8.0505Z'/%3e %3cpath class='cls-1' d='M45.6652%2c18.6337l-6.102%2c3.4337a12.9061%2c12.9061%2c0%2c0%2c1%2c.102%2c11.634l6.052%2c3.56a19.941%2c19.941%2c0%2c0%2c0-.052-18.6275Z'/%3e %3cpath class='cls-1' d='M33.049%2c39.9792A12.915%2c12.915%2c0%2c0%2c1%2c30.87%2c40.67l1.2833%2c6.8863a20.1278%2c20.1278%2c0%2c0%2c0%2c4.1029-1.3548Z'/%3e %3cpath class='cls-1' d='M28%2c41a12.9119%2c12.9119%2c0%2c0%2c1-4.6613-.8786L20.5742%2c46.56a19.8067%2c19.8067%2c0%2c0%2c0%2c10.5965%2c1.1831l-1.2851-6.8956A12.9706%2c12.9706%2c0%2c0%2c1%2c28%2c41Z'/%3e %3cpath class='cls-1' d='M15%2c28a12.9514%2c12.9514%2c0%2c0%2c1%2c.3568-2.9746L8.6812%2c22.9005A19.8792%2c19.8792%2c0%2c0%2c0%2c19.6576%2c46.16l2.7634-6.4355A13.0035%2c13.0035%2c0%2c0%2c1%2c15%2c28Z'/%3e %3cpath class='cls-1' d='M34.8188%2c39.0472l3.2137%2c6.2356a20.08%2c20.08%2c0%2c0%2c0%2c6.6712-6.2971l-6.0495-3.5583A13.0845%2c13.0845%2c0%2c0%2c1%2c34.8188%2c39.0472Z'/%3e %3c/g%3e %3cg id='primary'%3e %3cpath class='cls-2' d='M27%2c22.5956V16.0507a12.0185%2c12.0185%2c0%2c0%2c0-10.0878%2c7.3709l6.24%2c1.9861A5.513%2c5.513%2c0%2c0%2c1%2c27%2c22.5956Z'/%3e %3cpath class='cls-2' d='M33.5%2c28a5.46%2c5.46%2c0%2c0%2c1-.3369%2c1.8768l5.6382%2c3.3164A11.9619%2c11.9619%2c0%2c0%2c0%2c29%2c16.0507v6.5449A5.5059%2c5.5059%2c0%2c0%2c1%2c33.5%2c28Z'/%3e %3cpath class='cls-2' d='M22.5%2c28a5.5033%2c5.5033%2c0%2c0%2c1%2c.0475-.6858L16.31%2c25.3289A11.9871%2c11.9871%2c0%2c0%2c0%2c32.5878%2c39.0844l-3-5.82A5.4953%2c5.4953%2c0%2c0%2c1%2c22.5%2c28Z'/%3e %3cpath class='cls-2' d='M31.3632%2c32.3423%2c34.36%2c38.1572a12.0783%2c12.0783%2c0%2c0%2c0%2c3.428-3.2393L32.1481%2c31.6A5.5383%2c5.5383%2c0%2c0%2c1%2c31.3632%2c32.3423Z'/%3e %3c/g%3e%3c/svg%3e";

var img$P = "data:image/svg+xml,%3csvg id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='320' height='160' viewBox='0 0 320 160'%3e %3cdefs%3e %3cstyle%3e .cls-1 %7b fill: none%3b %7d .cls-2 %7b clip-path: url(%23clip-path)%3b %7d .cls-3 %7b fill: white%3b %7d .cls-4 %7b fill: %23ccc%3b %7d .cls-5 %7b fill: %23a0d9a3%3b %7d .cls-6 %7b fill: %234ba0b1%3b %7d .cls-7 %7b fill: %235e4fa2%3b %7d .cls-8 %7b fill: %239e0142%3b %7d .cls-9 %7b fill: %23e1524a%3b %7d .cls-10 %7b fill: %23fba35e%3b %7d .cls-11 %7b fill: %23fee89a%3b %7d .cls-12 %7b fill: %23ebf7a6%3b %7d .cls-13%2c .cls-14%2c .cls-15%2c .cls-16 %7b isolation: isolate%3b font-size: 10px%3b font-family: Helvetica%3b %7d .cls-13 %7b letter-spacing: -0.0547em%3b %7d .cls-15 %7b letter-spacing: -0.0366em%3b %7d .cls-16 %7b letter-spacing: -0.0176em%3b %7d %3c/style%3e %3cclipPath id='clip-path'%3e %3crect class='cls-1' width='320' height='160'/%3e %3c/clipPath%3e %3c/defs%3e %3cg class='cls-2'%3e %3cg%3e %3crect id='background' class='cls-3' x='60' y='-20' width='200' height='200'/%3e %3cg id='viz'%3e %3cg%3e %3cpath class='cls-4' d='M160.1225%2c32a48%2c48%2c0%2c0%2c1%2c45.1469%2c63.9585l-22.1433-7.87A24.5%2c24.5%2c0%2c0%2c0%2c160.1225%2c55.5Z'/%3e %3cpath class='cls-3' d='M160.1225%2c32a48%2c48%2c0%2c0%2c1%2c45.1469%2c63.9585l-22.1433-7.87A24.5%2c24.5%2c0%2c0%2c0%2c160.1225%2c55.5V32m-1-1.0026V56.4953l.995.005a23.5%2c23.5%2c0%2c0%2c1%2c22.0647%2c31.2586l-.3286.9392.9376.3332%2c22.1433%2c7.87.9447.3357.3333-.9455A49%2c49%2c0%2c0%2c0%2c160.1251%2c31l-1.0026-.0026Z'/%3e %3c/g%3e %3cg%3e %3cpath class='cls-4' d='M205.1874%2c96.19a48%2c48%2c0%2c0%2c1-92.1584-6.3038l23.0087-4.7813A24.5%2c24.5%2c0%2c0%2c0%2c183.0441%2c88.32Z'/%3e %3cpath class='cls-3' d='M136.0377%2c85.1045A24.5%2c24.5%2c0%2c0%2c0%2c183.0441%2c88.32l22.1433%2c7.87a48%2c48%2c0%2c0%2c1-92.1583-6.3038l23.0086-4.7813m.7707-1.1815-.9742.2025-23.0086%2c4.7812-.9816.204.2065.9811a48.9951%2c48.9951%2c0%2c0%2c0%2c94.0783%2c6.4351l.3381-.9438-.9446-.3358-22.1433-7.87-.9376-.3332-.3379.9359a23.3594%2c23.3594%2c0%2c0%2c1-17.2073%2c15.004%2c23.4734%2c23.4734%2c0%2c0%2c1-27.88-18.0881l-.2073-.9732Z'/%3e %3c/g%3e %3cg%3e %3cpath class='cls-4' d='M112.9792%2c89.6459A48%2c48%2c0%2c0%2c1%2c159.8775%2c32V55.5a24.5%2c24.5%2c0%2c0%2c0-23.89%2c29.3644Z'/%3e %3cpath class='cls-3' d='M159.8775%2c32V55.5a24.5%2c24.5%2c0%2c0%2c0-23.89%2c29.3644l-23.0086%2c4.7812A48%2c48%2c0%2c0%2c1%2c159.8775%2c32m1-1.0026L159.8749%2c31A49%2c49%2c0%2c0%2c0%2c112%2c89.8469l.2014.9821.9817-.204%2c23.0085-4.7812.9742-.2025-.1975-.9752A23.5%2c23.5%2c0%2c0%2c1%2c159.8825%2c56.5l.995-.005V30.9976Z'/%3e %3c/g%3e %3cg%3e %3cpath class='cls-5' d='M160.1225%2c7.5a72.5013%2c72.5013%2c0%2c0%2c1%2c28.6492%2c5.9534L179.4092%2c35.008A48.9975%2c48.9975%2c0%2c0%2c0%2c160.1225%2c31Z'/%3e %3cpath class='cls-3' d='M160.1225%2c7.5a72.5013%2c72.5013%2c0%2c0%2c1%2c28.6492%2c5.9534L179.4092%2c35.008A48.9975%2c48.9975%2c0%2c0%2c0%2c160.1225%2c31V7.5m-1-1.0017V31.9977L160.12%2c32a47.7325%2c47.7325%2c0%2c0%2c1%2c18.8931%2c3.926l.916.3951.3974-.9149%2c9.3623-21.5545.3992-.9188-.9195-.3975A73.0859%2c73.0859%2c0%2c0%2c0%2c160.1242%2c6.5l-1.0017-.0017Z'/%3e %3c/g%3e %3cg%3e %3cpath class='cls-6' d='M188.9964%2c13.5511a72.4993%2c72.4993%2c0%2c0%2c1%2c35.3188%2c32.9855L203.45%2c57.3481A49%2c49%2c0%2c0%2c0%2c179.634%2c35.1056Z'/%3e %3cpath class='cls-3' d='M188.9964%2c13.5511a72.4993%2c72.4993%2c0%2c0%2c1%2c35.3188%2c32.9855L203.45%2c57.3481A49%2c49%2c0%2c0%2c0%2c179.634%2c35.1056l9.3624-21.5545m-.5181-1.3172-.3991.9188-9.3625%2c21.5545-.3974.9149.914.4a48.1614%2c48.1614%2c0%2c0%2c1%2c23.33%2c21.7886l.4611.8845.8857-.4589%2c20.8653-10.8115.8894-.4609-.4624-.8886a73.7354%2c73.7354%2c0%2c0%2c0-35.8059-33.44l-.9181-.4006Z'/%3e %3c/g%3e %3cg%3e %3cpath class='cls-7' d='M224.4279%2c46.7541a72.5%2c72.5%2c0%2c0%2c1%2c3.9269%2c57.4092l-22.1431-7.87a49%2c49%2c0%2c0%2c0-2.6491-38.728Z'/%3e %3cpath class='cls-3' d='M224.428%2c46.7541a72.5%2c72.5%2c0%2c0%2c1%2c3.9269%2c57.4092l-22.1432-7.87a49%2c49%2c0%2c0%2c0-2.6491-38.7279L224.428%2c46.7541m.4293-1.3487-.8894.4608L203.1025%2c56.6778l-.8856.4589.4567.8868a48.19%2c48.19%2c0%2c0%2c1%2c2.595%2c37.9376l-.3317.9407.94.3341%2c22.1432%2c7.87.9439.3354.3338-.9444a73.7776%2c73.7776%2c0%2c0%2c0-3.981-58.2011l-.4594-.89Z'/%3e %3c/g%3e %3cg%3e %3cpath class='cls-8' d='M228.2728%2c104.3942a72.5%2c72.5%2c0%2c0%2c1-15.2037%2c25.0013l-17.1746-16.04A49.0008%2c49.0008%2c0%2c0%2c0%2c206.13%2c96.5245Z'/%3e %3cpath class='cls-3' d='M206.13%2c96.5245l22.1432%2c7.87a72.5009%2c72.5009%2c0%2c0%2c1-15.2036%2c25.0013l-17.1747-16.04A49.0008%2c49.0008%2c0%2c0%2c0%2c206.13%2c96.5245m-.605-1.2763-.3364.939a47.7326%2c47.7326%2c0%2c0%2c1-10.0263%2c16.4876l-.679.7307.729.6808%2c17.1747%2c16.04.7321.6837.6824-.7333a73.0843%2c73.0843%2c0%2c0%2c0%2c15.4134-25.3462l.3371-.9432-.9439-.3355-22.1432-7.87-.94-.334Z'/%3e %3c/g%3e %3cg%3e %3cpath class='cls-9' d='M212.9019%2c129.5746a72.5%2c72.5%2c0%2c0%2c1-98.5607%2c6.7417l14.8306-18.2293a49%2c49%2c0%2c0%2c0%2c66.5554-4.5525Z'/%3e %3cpath class='cls-3' d='M195.7272%2c113.5345l17.1747%2c16.04a72.4976%2c72.4976%2c0%2c0%2c1-98.5607%2c6.7417l14.8306-18.2293a48.9982%2c48.9982%2c0%2c0%2c0%2c66.5554-4.5525m-.0464-1.4116-.6827.7273a47.9984%2c47.9984%2c0%2c0%2c1-65.1971%2c4.46l-.7754-.6276-.63.7738-14.8306%2c18.2292-.6322.777.7781.6309a73.4975%2c73.4975%2c0%2c0%2c0%2c99.92-6.8348l.6849-.7309-.732-.6837-17.1747-16.04-.729-.6808Z'/%3e %3c/g%3e %3cg%3e %3cpath class='cls-10' d='M114.1512%2c136.1617a72.5%2c72.5%2c0%2c0%2c1-25.11-41.2912L112.05%2c90.0893a49%2c49%2c0%2c0%2c0%2c16.9318%2c27.8431Z'/%3e %3cpath class='cls-3' d='M112.05%2c90.0892a49%2c49%2c0%2c0%2c0%2c16.9319%2c27.8432l-14.8306%2c18.2293a72.5%2c72.5%2c0%2c0%2c1-25.11-41.2912L112.05%2c90.0892m.7732-1.182-.9766.203L88.838%2c93.8914l-.9808.2038.2055.98a73.7347%2c73.7347%2c0%2c0%2c0%2c25.4561%2c41.8607l.7759.6335.6322-.777%2c14.83-18.2293.63-.7738-.7723-.6314a48.16%2c48.16%2c0%2c0%2c1-16.5862-27.275l-.2054-.9761Z'/%3e %3c/g%3e %3cg%3e %3cpath class='cls-11' d='M88.9916%2c94.6306a72.5%2c72.5%2c0%2c0%2c1%2c11.7075-56.34l19.1989%2c13.552A49%2c49%2c0%2c0%2c0%2c112%2c89.8494Z'/%3e %3cpath class='cls-3' d='M100.6991%2c38.2908l19.1988%2c13.552A49.0006%2c49.0006%2c0%2c0%2c0%2c112%2c89.8494L88.9916%2c94.6306a72.5%2c72.5%2c0%2c0%2c1%2c11.7075-56.34m-.2417-1.3946-.5762.8193A73.7772%2c73.7772%2c0%2c0%2c0%2c88.0121%2c94.8324l.2022.9811.9807-.2038%2c23.0086-4.7813.9766-.2029-.2005-.9771a48.1884%2c48.1884%2c0%2c0%2c1%2c7.7367-37.2309l.5732-.8164-.815-.5752L101.2758%2c37.4738l-.8184-.5776Z'/%3e %3c/g%3e %3cg%3e %3cpath class='cls-12' d='M100.84%2c38.0907A72.5%2c72.5%2c0%2c0%2c1%2c159.8775%2c7.5V31a49%2c49%2c0%2c0%2c0-39.8383%2c20.6425Z'/%3e %3cpath class='cls-3' d='M159.8775%2c7.5V31a49%2c49%2c0%2c0%2c0-39.8383%2c20.6425L100.84%2c38.0907A72.5%2c72.5%2c0%2c0%2c1%2c159.8775%2c7.5m1-1.0017L159.8758%2c6.5a73.625%2c73.625%2c0%2c0%2c0-59.8514%2c31.0125l-.579.8174.8183.5776L119.4626%2c52.46l.8149.5753.5773-.8135A48.0911%2c48.0911%2c0%2c0%2c1%2c159.88%2c32l.9975-.0024V6.4984Z'/%3e %3c/g%3e %3cg%3e %3cpath class='cls-6' d='M198.7572-8.9206a96.996%2c96.996%2c0%2c0%2c1%2c11.5377%2c5.9783l-12.21%2c20.0789a73.49%2c73.49%2c0%2c0%2c0-8.69-4.5027Z'/%3e %3cpath class='cls-3' d='M198.7572-8.9206a96.996%2c96.996%2c0%2c0%2c1%2c11.5377%2c5.9783l-12.21%2c20.0789a73.4973%2c73.4973%2c0%2c0%2c0-8.69-4.5027l9.3624-21.5545m-.5183-1.3168-.3989.9184-9.3625%2c21.5545-.3977.9156.9151.3993a72.7518%2c72.7518%2c0%2c0%2c1%2c8.5716%2c4.4415l.8539.5173.5187-.853%2c12.21-20.0789.52-.8555-.8562-.5191a98.325%2c98.325%2c0%2c0%2c0-11.6567-6.04l-.9178-.4Z'/%3e %3c/g%3e %3cg%3e %3cpath class='cls-7' d='M246.1812%2c35.4825a97.0035%2c97.0035%2c0%2c0%2c1%2c8.765%2c24.6623l-23.0085%2c4.7813a73.5008%2c73.5008%2c0%2c0%2c0-6.6219-18.6321Z'/%3e %3cpath class='cls-3' d='M246.1812%2c35.4825a97.0035%2c97.0035%2c0%2c0%2c1%2c8.765%2c24.6623l-23.0085%2c4.7813a73.5044%2c73.5044%2c0%2c0%2c0-6.6218-18.6321l20.8653-10.8115m.4289-1.3485-.889.4606L224.8558%2c45.4062l-.8864.4592.4578.8872a72.5065%2c72.5065%2c0%2c0%2c1%2c6.5317%2c18.3786l.2048.9771.9774-.2032L255.15%2c61.1239l.98-.2037-.2049-.98A98.0087%2c98.0087%2c0%2c0%2c0%2c247.07%2c35.0236l-.46-.89Z'/%3e %3c/g%3e %3cg%3e %3cpath class='cls-7' d='M254.996%2c60.3847a97.003%2c97.003%2c0%2c0%2c1%2c1.7694%2c12.8736L233.32%2c74.862a73.493%2c73.493%2c0%2c0%2c0-1.3327-9.6961Z'/%3e %3cpath class='cls-3' d='M254.996%2c60.3847a96.9865%2c96.9865%2c0%2c0%2c1%2c1.7694%2c12.8736L233.32%2c74.862a73.493%2c73.493%2c0%2c0%2c0-1.3327-9.6961l23.0085-4.7812m.7768-1.1828-.98.2037L231.784%2c64.1869l-.9774.2031.2015.9778a72.7592%2c72.7592%2c0%2c0%2c1%2c1.3145%2c9.5641l.07.9959.9959-.0682%2c23.4453-1.6036.9989-.0684-.07-.9988a98.321%2c98.321%2c0%2c0%2c0-1.7877-13.0063l-.2025-.9806Z'/%3e %3c/g%3e %3cg%3e %3cpath class='cls-8' d='M251.3582%2c112.5987a97.0007%2c97.0007%2c0%2c0%2c1-5.177%2c11.9188L225.3158%2c113.706a73.4984%2c73.4984%2c0%2c0%2c0%2c3.8993-8.977Z'/%3e %3cpath class='cls-3' d='M229.2151%2c104.729l22.1431%2c7.87a97.0007%2c97.0007%2c0%2c0%2c1-5.177%2c11.9188L225.3159%2c113.706a73.5133%2c73.5133%2c0%2c0%2c0%2c3.8992-8.977m-.6058-1.2765-.3359.94a72.78%2c72.78%2c0%2c0%2c1-3.8462%2c8.8548l-.4578.8872.8864.4592%2c20.8653%2c10.8116.889.4606.46-.89a98.3358%2c98.3358%2c0%2c0%2c0%2c5.23-12.0416l.3365-.943-.9434-.3353-22.1431-7.87-.9407-.3343Z'/%3e %3c/g%3e %3cg%3e %3cpath class='cls-9' d='M230.8074%2c146.2971a97%2c97%2c0%2c0%2c1-32.05%2c22.6235l-9.3624-21.5545a73.4991%2c73.4991%2c0%2c0%2c0%2c24.238-17.109Z'/%3e %3cpath class='cls-3' d='M213.6328%2c130.2571l17.1746%2c16.04a97%2c97%2c0%2c0%2c1-32.05%2c22.6235l-9.3624-21.5545a73.4991%2c73.4991%2c0%2c0%2c0%2c24.238-17.109m-.0471-1.4122-.6826.7284A72.0921%2c72.0921%2c0%2c0%2c1%2c188.9949%2c146.45l-.9151.3993.3977.9156L197.84%2c169.319l.3989.9184.9178-.4a97.4441%2c97.4441%2c0%2c0%2c0%2c32.3807-22.8567l.6843-.7309-.7317-.6834-17.1747-16.04-.73-.6814Z'/%3e %3c/g%3e %3cg%3e %3cpath class='cls-10' d='M98.69%2c155.1666A97%2c97%2c0%2c0%2c1%2c80.8246%2c136.038l19.1988-13.552A73.4985%2c73.4985%2c0%2c0%2c0%2c113.52%2c136.9374Z'/%3e %3cpath class='cls-3' d='M100.0234%2c122.486A73.4985%2c73.4985%2c0%2c0%2c0%2c113.52%2c136.9374L98.69%2c155.1666A97.0033%2c97.0033%2c0%2c0%2c1%2c80.8246%2c136.038l19.1988-13.552m.239-1.3927-.8156.5758L80.248%2c135.2211l-.818.5774.5784.8172a98.0078%2c98.0078%2c0%2c0%2c0%2c18.049%2c19.3258l.7759.6329.6319-.7767%2c14.8306-18.2292.63-.7744-.7733-.6314a72.508%2c72.508%2c0%2c0%2c1-13.3131-14.2547l-.577-.8147Z'/%3e %3c/g%3e %3cg%3e %3cpath class='cls-11' d='M65.004%2c99.6153a97%2c97%2c0%2c0%2c1%2c0-39.2306l23.0085%2c4.7812a73.499%2c73.499%2c0%2c0%2c0%2c0%2c29.6682Z'/%3e %3cpath class='cls-3' d='M65.004%2c60.3847l23.0085%2c4.7812a73.499%2c73.499%2c0%2c0%2c0%2c0%2c29.6682L65.004%2c99.6153a97%2c97%2c0%2c0%2c1%2c0-39.2306m-.7768-1.1828-.2025.9806a97.443%2c97.443%2c0%2c0%2c0%2c0%2c39.635l.2025.9806.98-.2037%2c23.0084-4.7813.9775-.2031-.2015-.9778a72.0924%2c72.0924%2c0%2c0%2c1%2c0-29.2644l.2015-.9778-.9775-.2031L65.2075%2c59.4056l-.98-.2037Z'/%3e %3c/g%3e %3cg%3e %3cpath class='cls-12' d='M121.4675-9.0182A97.0157%2c97.0157%2c0%2c0%2c1%2c133.7118-13.37l6.34%2c22.6286a73.5011%2c73.5011%2c0%2c0%2c0-9.2221%2c3.2776Z'/%3e %3cpath class='cls-3' d='M133.7118-13.37l6.34%2c22.6286a73.5011%2c73.5011%2c0%2c0%2c0-9.2221%2c3.2776L121.4675-9.0182A97.0157%2c97.0157%2c0%2c0%2c1%2c133.7118-13.37m.6928-1.2339-.9638.2714a98.3347%2c98.3347%2c0%2c0%2c0-12.37%2c4.3965l-.9189.3977.3988.9184%2c9.3625%2c21.5545.3977.9157.9163-.3963a72.7684%2c72.7684%2c0%2c0%2c1%2c9.0967-3.2329l.9608-.271-.2692-.9613-6.34-22.6286-.27-.9641Z'/%3e %3c/g%3e %3cg%3e %3cpath class='cls-12' d='M133.9477-13.436A96.9973%2c96.9973%2c0%2c0%2c1%2c159.8775-17V6.5a73.4985%2c73.4985%2c0%2c0%2c0-19.59%2c2.6925Z'/%3e %3cpath class='cls-3' d='M159.8775-17V6.5a73.4985%2c73.4985%2c0%2c0%2c0-19.59%2c2.6925l-6.34-22.6285A96.9933%2c96.9933%2c0%2c0%2c1%2c159.8775-17m1-1.0013L159.8762-18a98.0075%2c98.0075%2c0%2c0%2c0-26.1971%2c3.6007l-.9644.2689.27.9642%2c6.34%2c22.6285.2694.9613.9617-.2677A72.51%2c72.51%2c0%2c0%2c1%2c159.8792%2c7.5l.9983-.0017v-25.5Z'/%3e %3c/g%3e %3c/g%3e %3cg%3e %3ctext class='cls-13' transform='translate(189.315 63.5932) rotate(-35.2174)'%3eA%3c/text%3e %3ctext class='cls-14' transform='translate(160.7473 120.2018) rotate(-86.0871)'%3eB%3c/text%3e %3ctext class='cls-14' transform='translate(126.4549 57.2496) rotate(39.1306)'%3eC%3c/text%3e %3ctext class='cls-14' transform='translate(175.6043 22.1702) rotate(-78.2606)'%3eI%3c/text%3e %3ctext class='cls-15' transform='matrix(0.6826%2c -0.7308%2c 0.7308%2c 0.6826%2c 202.474%2c 39.5994)'%3eL%3c/text%3e %3ctext class='cls-14' transform='translate(217.1808 79.626) rotate(-3.9129)'%3eM%3c/text%3e %3ctext class='cls-14' transform='translate(207.4671 112.9127) rotate(31.3041)'%3eD%3c/text%3e %3ctext class='cls-14' transform='translate(160.4322 138.009) rotate(86.0871)'%3eE%3c/text%3e %3ctext class='cls-14' transform='translate(106.8484 116.44) rotate(-31.3041)'%3eF%3c/text%3e %3ctext class='cls-14' transform='translate(95.4458 70.1712) rotate(11.7394)'%3eG%3c/text%3e %3ctext class='cls-14' transform='matrix(0.4601%2c 0.8879%2c -0.8879%2c 0.4601%2c 127.0505%2c 24.1006)'%3eH%3c/text%3e %3ctext class='cls-14' transform='matrix(0.4601%2c -0.8879%2c 0.8879%2c 0.4601%2c 201.233%2c 8.1878)'%3eF%3c/text%3e %3ctext class='cls-14' transform='translate(238.5645 55.78) rotate(-19.5653)'%3eU%3c/text%3e %3ctext class='cls-14' transform='translate(242.1843 72.2519) rotate(-7.8262)'%3eV%3c/text%3e %3ctext class='cls-14' transform='translate(233.9428 115.915) rotate(23.4782)'%3eN%3c/text%3e %3ctext class='cls-14' transform='translate(204.3448 148.8938) rotate(54.7826)'%3eO%3c/text%3e %3ctext class='cls-16' transform='matrix(0.7308%2c -0.6826%2c 0.6826%2c 0.7308%2c 97.289%2c 143.4203)'%3eP%3c/text%3e %3ctext class='cls-14' transform='translate(70.3608 83.5)'%3eQ%3c/text%3e %3ctext class='cls-14' transform='translate(126.7882 -3.0332) rotate(70.4347)'%3eR%3c/text%3e %3c/g%3e %3c/g%3e %3c/g%3e%3c/svg%3e";

const metadata$q = {
  name: 'Sunburst diagram',
  id: 'rawgraphs.sunburst',
  thumbnail: img$P,
  icon: img$O,
  categories: ['hierarchies', 'proportions'],
  description: 'It displays hierarchically structured data and a related quantitative dimension using concentric circles. The circle in the center represents the root node, with the hierarchies moving outward from the center. The angle of each arc corresponds to the qualitative dimension.',
  code: 'https://github.com/rawgraphs/rawgraphs-charts/tree/master/src/sunburst',
  tutorial: 'https://rawgraphs.io/learning/how-to-make-a-sunburst-diagram/'
};

const dimensions$q = [{
  id: 'hierarchy',
  name: 'Hierarchy',
  validTypes: ['number', 'date', 'string'],
  required: true,
  multiple: true
}, {
  id: 'size',
  name: 'Size',
  validTypes: ['number'],
  required: false,
  aggregation: true,
  aggregationDefault: 'sum'
}, {
  id: 'color',
  name: 'Color',
  validTypes: ['number', 'date', 'string'],
  required: false,
  aggregation: true,
  aggregationDefault: {
    number: 'sum',
    string: 'csvDistinct',
    date: 'csvDistinct'
  }
}, {
  id: 'label',
  name: 'Leaf label',
  validTypes: ['number', 'date', 'string'],
  required: false,
  multiple: true,
  aggregation: true,
  aggregationDefault: {
    number: 'sum',
    string: 'csvDistinct',
    date: 'csvDistinct'
  }
}];

const mapData$q = function (data, mapping, dataTypes, dimensions) {
  const colorAggregator = getDimensionAggregator('color', mapping, dataTypes, dimensions);
  const sizeAggregator = getDimensionAggregator('size', mapping, dataTypes, dimensions);
  const labelAggregators = getDimensionAggregator('label', mapping, dataTypes, dimensions); // add the non-compulsory dimensions.

  if (!('color' in mapping)) mapping.color = {
    value: undefined
  };
  if (!('size' in mapping)) mapping.size = {
    value: undefined
  };
  if (!('label' in mapping)) mapping.label = {
    value: undefined
  };
  const results = [];
  rollups(data, v => {
    const item = {
      hierarchy: new Map(mapping.hierarchy.value.map(d => [d, v[0][d]])),
      //get the first one since it's grouped
      size: mapping.size.value ? sizeAggregator(v.map(d => d[mapping.size.value])) : v.length,
      color: mapping.color.value ? colorAggregator(v.map(d => d[mapping.color.value])) : 'cells color',
      label: mapping.label.value ? mapping.label.value.map((label, i) => {
        return labelAggregators[i](v.map(d => d[label]));
      }) : undefined // create array of strings

    };
    results.push(item);
    return item;
  }, ...mapping.hierarchy.value.map(level => d => d[level]) // create a grouping for each level of the hierarchy
  );
  return results;
};

/*
Credits:
Inspired by https://observablehq.com/@d3/sunburst
*/

function render$q(svgNode, data, visualOptions, mapping, originalData, styles) {
  const {
    // artboard
    width,
    height,
    background,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    // legend
    showLegend,
    legendWidth,
    // chart
    padding,
    // labels
    label1Style,
    label2Style,
    label3Style,
    // colors
    colorScale,
    // labels
    showHierarchyLabels,
    labelHierarchyStyle,
    labelStyles,
    showLabelsOutline,
    autoHideLabels
  } = visualOptions;
  const margin = {
    top: marginTop,
    right: marginRight,
    bottom: marginBottom,
    left: marginLeft
  };
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;
  const radius = chartWidth > chartHeight ? chartHeight / 2 : chartWidth / 2; // create the hierarchical structure

  const nest = rollup(data, v => v[0], ...mapping.hierarchy.value.map(level => d => d.hierarchy.get(level)));
  const hierarchy$1 = hierarchy(nest).sum(d => d[1] instanceof Map ? 0 : d[1].size); // since maps have also a .size porperty, sum only values for leaves, and not for Maps
  //@TODO: find a way to filter hierarchy

  const partition$1 = nest => partition() // copied from example of d3v6, not clear the meaning
  .size([2 * Math.PI, radius])(hierarchy$1);

  const root = partition$1();
  const arc$1 = arc().startAngle(d => d.x0).endAngle(d => d.x1).padAngle(padding / (radius / 2)) // convert padding in radians
  .padRadius(radius / 2).innerRadius(d => d.y0).outerRadius(d => d.y1 - padding);
  const svg = select(svgNode); // add background

  select(svgNode).append('rect').attr('width', showLegend ? width + legendWidth : width).attr('height', height).attr('x', 0).attr('y', 0).attr('fill', background).attr('id', 'background');
  svg.append('g').attr('transform', `translate(${width / 2},${height / 2})`).attr('id', 'viz').selectAll('path').data(root.descendants().filter(d => d.depth)).join('path').attr('fill', function (d) {
    if ('children' in d) {
      // if not leaf, check if leaves has the same value
      const childrenColors = [...new Set(d.leaves().map(l => l.data[1].color))];
      return childrenColors.length == 1 ? colorScale(childrenColors[0]) : '#cccccc';
    } else {
      // otherwise, if it's a leaf use its own color
      return colorScale(d.data[1].color);
    }
  }).attr('display', d => d.data[0] != '' ? '' : 'none').attr('d', arc$1).append('title').text(d => d.data[0]);
  const textGroups = svg.append('g').attr('id', 'labels').attr('transform', `translate(${width / 2},${height / 2})`).attr('text-anchor', 'middle').selectAll('text').data(root.descendants()).join('text').filter(d => showHierarchyLabels ? true : !d.children) // if showHierarchyLabels is false, hide non-leaf nodes
  .filter(d => d.data[0] != '').attr('transform', function (d) {
    const x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
    const y = (d.y0 + d.y1) / 2;
    return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
  });
  textGroups.selectAll('tspan') // if node not a leaf, show just its name.
  .data(d => {
    console.log(d);

    if (d.children) {
      return [{
        string: d.data[0],
        hierarchy: true
      }];
    } else {
      // if labels are mapped, return them
      if (mapping.label.value.length > 0) {
        return d.data[1].label.map(d => ({
          string: d,
          hierarchy: false
        }));
      } else {
        //otherwise, return just leaf name
        return [{
          string: d.data[0],
          hierarchy: true
        }];
      }
    }
  }).join('tspan').attr('x', 0).attr('y', (d, i, n) => (i + 1) * 12 - n.length / 2 * 12 - 2) // @TODO: 12 is the font size. we should expose this
  .text(d => d.string).styles((d, i) => d.hierarchy ? styles[labelHierarchyStyle] : styles[labelStyles[i]]);

  if (showLabelsOutline) {
    // NOTE: Adobe Illustrator does not support paint-order attr
    textGroups.selectAll('text').styles(styles.labelOutline);
  }

  if (autoHideLabels) {
    labelsOcclusion(textGroups, d => d.size);
  }

  if (showLegend) {
    // svg width is adjusted automatically because of the "container:height" annotation in legendWidth visual option
    const legendLayer = select(svgNode).append('g').attr('id', 'legend').attr('transform', `translate(${width},${marginTop})`);
    const chartLegend = legend().legendWidth(legendWidth);

    if (mapping.color.value) {
      chartLegend.addColor(mapping.color.value, colorScale);
    }

    legendLayer.call(chartLegend);
  }
}

const visualOptions$q = {
  marginTop: {
    type: 'number',
    label: 'Margin (top)',
    default: 10,
    group: 'artboard'
  },
  marginRight: {
    type: 'number',
    label: 'Margin (right)',
    default: 10,
    group: 'artboard'
  },
  marginBottom: {
    type: 'number',
    label: 'Margin (bottom)',
    default: 10,
    group: 'artboard'
  },
  marginLeft: {
    type: 'number',
    label: 'Margin (left)',
    default: 10,
    group: 'artboard'
  },
  showLegend: {
    type: 'boolean',
    label: 'Show legend',
    default: false,
    group: 'artboard'
  },
  legendWidth: {
    type: 'number',
    label: 'Legend width',
    default: 200,
    group: 'artboard',
    disabled: {
      showLegend: false
    },
    container: 'width',
    containerCondition: {
      showLegend: true
    }
  },
  padding: {
    type: 'number',
    label: 'Padding',
    default: 2,
    group: 'chart'
  },
  colorScale: {
    type: 'colorScale',
    label: 'Color scale',
    dimension: 'color',
    default: {
      scaleType: 'ordinal',
      interpolator: 'interpolateSpectral'
    },
    group: 'colors'
  },
  showHierarchyLabels: {
    type: 'boolean',
    label: 'Show hierarchy labels',
    default: true,
    group: 'labels'
  },
  labelHierarchyStyle: {
    type: 'text',
    label: 'Hierarchy labels',
    group: 'labels',
    options: [{
      label: 'Primary',
      value: 'labelPrimary'
    }, {
      label: 'Secondary',
      value: 'labelSecondary'
    }, {
      label: 'Italic',
      value: 'labelItalic'
    }],
    default: 'labelItalic',
    disabled: {
      showHierarchyLabels: false
    }
  },
  labelStyles: {
    type: 'text',
    label: 'Label',
    group: 'labels',
    options: [{
      label: 'Primary',
      value: 'labelPrimary'
    }, {
      label: 'Secondary',
      value: 'labelSecondary'
    }, {
      label: 'Italic',
      value: 'labelItalic'
    }],
    default: 'labelPrimary',
    repeatFor: 'label',
    repeatDefault: ['labelPrimary', 'labelSecondary', 'labelItalic']
  },
  showLabelsOutline: {
    type: 'boolean',
    label: 'Show outline',
    default: false,
    group: 'labels'
  },
  autoHideLabels: {
    type: 'boolean',
    label: 'Auto hide labels',
    default: false,
    group: 'labels'
  }
};

var sunburst = {
  metadata: metadata$q,
  dimensions: dimensions$q,
  mapData: mapData$q,
  render: render$q,
  visualOptions: visualOptions$q,
  styles: styles$1
};

var img$Q = "data:image/svg+xml,%3csvg id='rawgraphs-icons' xmlns='http://www.w3.org/2000/svg' width='56' height='56' viewBox='0 0 56 56'%3e %3cdefs%3e %3cstyle%3e .cls-1 %7b fill: %2395e5c0%3b %7d .cls-2 %7b fill: %2306c26c%3b %7d %3c/style%3e %3c/defs%3e %3cg id='secundary'%3e %3crect class='cls-1' x='8' y='30' width='19' height='18'/%3e %3crect class='cls-1' x='35' y='8' width='13' height='4'/%3e %3crect class='cls-1' x='35' y='13' width='13' height='9'/%3e %3crect class='cls-1' x='42' y='42' width='6' height='6'/%3e %3crect class='cls-1' x='29' y='42' width='12' height='6'/%3e %3c/g%3e %3cg id='primary'%3e %3crect class='cls-2' x='8' y='8' width='19' height='21'/%3e %3crect class='cls-2' x='29' y='8' width='5' height='14'/%3e %3crect class='cls-2' x='29' y='24' width='19' height='17'/%3e %3c/g%3e%3c/svg%3e";

var img$R = "data:image/svg+xml,%3csvg id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='320' height='160' viewBox='0 0 320 160'%3e %3cdefs%3e %3cstyle%3e .cls-1 %7b fill: none%3b %7d .cls-2 %7b fill: white%3b %7d .cls-3 %7b fill: %23a0d9a3%3b %7d .cls-4 %7b clip-path: url(%23clip-path)%3b %7d .cls-5%2c .cls-6%2c .cls-9 %7b isolation: isolate%3b %7d .cls-6%2c .cls-9 %7b font-size: 12px%3b font-family: Helvetica%3b %7d .cls-7 %7b fill: %234ba0b1%3b %7d .cls-8 %7b clip-path: url(%23clip-path-2)%3b %7d .cls-9 %7b letter-spacing: -0.0366em%3b %7d .cls-10 %7b fill: %235e4fa2%3b %7d .cls-11 %7b clip-path: url(%23clip-path-3)%3b %7d .cls-12 %7b clip-path: url(%23clip-path-4)%3b %7d .cls-13 %7b clip-path: url(%23clip-path-5)%3b %7d .cls-14 %7b clip-path: url(%23clip-path-6)%3b %7d .cls-15 %7b fill: %239e0142%3b %7d .cls-16 %7b clip-path: url(%23clip-path-7)%3b %7d .cls-17 %7b clip-path: url(%23clip-path-8)%3b %7d .cls-18 %7b fill: %23e1524a%3b %7d .cls-19 %7b clip-path: url(%23clip-path-9)%3b %7d .cls-20 %7b fill: %23fba35e%3b %7d .cls-21 %7b clip-path: url(%23clip-path-10)%3b %7d .cls-22 %7b clip-path: url(%23clip-path-11)%3b %7d .cls-23 %7b clip-path: url(%23clip-path-12)%3b %7d .cls-24 %7b fill: %23fee89a%3b %7d .cls-25 %7b clip-path: url(%23clip-path-13)%3b %7d .cls-26 %7b clip-path: url(%23clip-path-14)%3b %7d .cls-27 %7b fill: %23ebf7a6%3b %7d .cls-28 %7b clip-path: url(%23clip-path-15)%3b %7d .cls-29 %7b clip-path: url(%23clip-path-16)%3b %7d .cls-30 %7b clip-path: url(%23clip-path-17)%3b %7d %3c/style%3e %3cclipPath id='clip-path'%3e %3crect class='cls-1' x='5' y='5' width='38' height='74'/%3e %3c/clipPath%3e %3cclipPath id='clip-path-2'%3e %3crect class='cls-1' x='44' y='5' width='52' height='74'/%3e %3c/clipPath%3e %3cclipPath id='clip-path-3'%3e %3crect class='cls-1' x='5' y='80' width='91' height='31'/%3e %3c/clipPath%3e %3cclipPath id='clip-path-4'%3e %3crect class='cls-1' x='5' y='114' width='20' height='41'/%3e %3c/clipPath%3e %3cclipPath id='clip-path-5'%3e %3crect class='cls-1' x='28' y='114' width='44' height='41'/%3e %3c/clipPath%3e %3cclipPath id='clip-path-6'%3e %3crect class='cls-1' x='75' y='114' width='21' height='41'/%3e %3c/clipPath%3e %3cclipPath id='clip-path-7'%3e %3crect class='cls-1' x='101' y='5' width='6' height='110'/%3e %3c/clipPath%3e %3cclipPath id='clip-path-8'%3e %3crect class='cls-1' x='110' y='5' width='89' height='21'/%3e %3c/clipPath%3e %3cclipPath id='clip-path-9'%3e %3crect class='cls-1' x='110' y='27' width='89' height='88'/%3e %3c/clipPath%3e %3cclipPath id='clip-path-10'%3e %3crect class='cls-1' x='200' y='5' width='26' height='110'/%3e %3c/clipPath%3e %3cclipPath id='clip-path-11'%3e %3crect class='cls-1' x='101' y='118' width='74' height='37'/%3e %3c/clipPath%3e %3cclipPath id='clip-path-12'%3e %3crect class='cls-1' x='178' y='118' width='48' height='37'/%3e %3c/clipPath%3e %3cclipPath id='clip-path-13'%3e %3crect class='cls-1' x='231' y='5' width='84' height='32'/%3e %3c/clipPath%3e %3cclipPath id='clip-path-14'%3e %3crect class='cls-1' x='231' y='40' width='35' height='80'/%3e %3c/clipPath%3e %3cclipPath id='clip-path-15'%3e %3crect class='cls-1' x='267' y='40' width='48' height='80'/%3e %3c/clipPath%3e %3cclipPath id='clip-path-16'%3e %3crect class='cls-1' x='231' y='123' width='26' height='32'/%3e %3c/clipPath%3e %3cclipPath id='clip-path-17'%3e %3crect class='cls-1' x='260' y='123' width='55' height='32'/%3e %3c/clipPath%3e %3c/defs%3e %3crect id='background' class='cls-2' width='320' height='160'/%3e %3crect id='background-2' data-name='background' class='cls-2' width='320' height='160'/%3e %3cg id='viz'%3e %3cg id='leaves'%3e %3cg%3e %3crect id='path0' class='cls-3' x='5' y='5' width='38' height='74'/%3e %3cg class='cls-4'%3e %3cg class='cls-5'%3e %3ctext class='cls-6' transform='translate(8 17)'%3eI%3c/text%3e %3c/g%3e %3c/g%3e %3c/g%3e %3cg%3e %3crect id='path1' class='cls-7' x='44' y='5' width='52' height='74'/%3e %3cg class='cls-8'%3e %3cg class='cls-5'%3e %3ctext class='cls-9' transform='translate(47 17)'%3eL%3c/text%3e %3c/g%3e %3c/g%3e %3c/g%3e %3cg%3e %3crect id='path2' class='cls-10' x='5' y='80' width='91' height='31'/%3e %3cg class='cls-11'%3e %3cg class='cls-5'%3e %3ctext class='cls-6' transform='translate(8 92)'%3eM%3c/text%3e %3c/g%3e %3c/g%3e %3c/g%3e %3cg%3e %3crect id='path3' class='cls-7' x='5' y='114' width='20' height='41'/%3e %3cg class='cls-12'%3e %3cg class='cls-5'%3e %3ctext class='cls-9' transform='translate(8 126)'%3eL%3c/text%3e %3c/g%3e %3c/g%3e %3c/g%3e %3cg%3e %3crect id='path4' class='cls-10' x='28' y='114' width='44' height='41'/%3e %3cg class='cls-13'%3e %3cg class='cls-5'%3e %3ctext class='cls-6' transform='translate(31 126)'%3eM%3c/text%3e %3c/g%3e %3c/g%3e %3c/g%3e %3cg%3e %3crect id='path5' class='cls-10' x='75' y='114' width='21' height='41'/%3e %3cg class='cls-14'%3e %3cg class='cls-5'%3e %3ctext class='cls-6' transform='translate(78 126)'%3eM%3c/text%3e %3c/g%3e %3c/g%3e %3c/g%3e %3cg%3e %3crect id='path6' class='cls-15' x='101' y='5' width='6' height='110'/%3e %3cg class='cls-16'%3e %3cg class='cls-5'%3e %3ctext class='cls-6' transform='translate(104 17)'%3eD%3c/text%3e %3c/g%3e %3c/g%3e %3c/g%3e %3cg%3e %3crect id='path7' class='cls-15' x='110' y='5' width='89' height='21'/%3e %3cg class='cls-17'%3e %3cg class='cls-5'%3e %3ctext class='cls-6' transform='translate(113 17)'%3eD%3c/text%3e %3c/g%3e %3c/g%3e %3c/g%3e %3cg%3e %3crect id='path8' class='cls-18' x='110' y='27' width='89' height='88'/%3e %3cg class='cls-19'%3e %3cg class='cls-5'%3e %3ctext class='cls-6' transform='translate(113 39)'%3eE%3c/text%3e %3c/g%3e %3c/g%3e %3c/g%3e %3cg%3e %3crect id='path9' class='cls-20' x='200' y='5' width='26' height='110'/%3e %3cg class='cls-21'%3e %3cg class='cls-5'%3e %3ctext class='cls-6' transform='translate(203 17)'%3eF%3c/text%3e %3c/g%3e %3c/g%3e %3c/g%3e %3cg%3e %3crect id='path10' class='cls-18' x='101' y='118' width='74' height='37'/%3e %3cg class='cls-22'%3e %3cg class='cls-5'%3e %3ctext class='cls-6' transform='translate(104 130)'%3eE%3c/text%3e %3c/g%3e %3c/g%3e %3c/g%3e %3cg%3e %3crect id='path11' class='cls-20' x='178' y='118' width='48' height='37'/%3e %3cg class='cls-23'%3e %3cg class='cls-5'%3e %3ctext class='cls-6' transform='translate(181 130)'%3eF%3c/text%3e %3c/g%3e %3c/g%3e %3c/g%3e %3cg%3e %3crect id='path12' class='cls-24' x='231' y='5' width='84' height='32'/%3e %3cg class='cls-25'%3e %3cg class='cls-5'%3e %3ctext class='cls-6' transform='translate(234 17)'%3eG%3c/text%3e %3c/g%3e %3c/g%3e %3c/g%3e %3cg%3e %3crect id='path13' class='cls-24' x='231' y='40' width='35' height='80'/%3e %3cg class='cls-26'%3e %3cg class='cls-5'%3e %3ctext class='cls-6' transform='translate(234 52)'%3eG%3c/text%3e %3c/g%3e %3c/g%3e %3c/g%3e %3cg%3e %3crect id='path14' class='cls-27' x='267' y='40' width='48' height='80'/%3e %3cg class='cls-28'%3e %3cg class='cls-5'%3e %3ctext class='cls-6' transform='translate(270 52)'%3eH%3c/text%3e %3c/g%3e %3c/g%3e %3c/g%3e %3cg%3e %3crect id='path15' class='cls-27' x='231' y='123' width='26' height='32'/%3e %3cg class='cls-29'%3e %3cg class='cls-5'%3e %3ctext class='cls-6' transform='translate(234 135)'%3eH%3c/text%3e %3c/g%3e %3c/g%3e %3c/g%3e %3cg%3e %3crect id='path16' class='cls-27' x='260' y='123' width='55' height='32'/%3e %3cg class='cls-30'%3e %3cg class='cls-5'%3e %3ctext class='cls-6' transform='translate(263 135)'%3eH%3c/text%3e %3c/g%3e %3c/g%3e %3c/g%3e %3c/g%3e %3c/g%3e%3c/svg%3e";

const metadata$r = {
  name: 'Treemap',
  id: 'rawgraphs.treemap',
  thumbnail: img$R,
  icon: img$Q,
  categories: ['hierarchies', 'proportions'],
  description: 'It displays hierarchically structured data and a related quantitative dimension. It is composed of an area divided into small rectangles, representing the last level of the tree structure. The rectangles’ size depends on the quantitative dimension.',
  code: 'https://github.com/rawgraphs/rawgraphs-charts/tree/master/src/treemap',
  tutorial: 'https://rawgraphs.io/learning/how-to-make-a-treemap/'
};

const dimensions$r = [{
  id: 'hierarchy',
  name: 'Hierarchy',
  validTypes: ['number', 'date', 'string'],
  required: true,
  multiple: true
}, {
  id: 'size',
  name: 'Size',
  validTypes: ['number'],
  required: false,
  aggregation: true,
  aggregationDefault: 'sum'
}, {
  id: 'color',
  name: 'Color',
  validTypes: ['number', 'date', 'string'],
  required: false,
  aggregation: true,
  aggregationDefault: {
    number: 'sum',
    string: 'csvDistinct',
    date: 'csvDistinct'
  }
}, {
  id: 'label',
  name: 'Label',
  validTypes: ['number', 'date', 'string'],
  required: false,
  multiple: true,
  aggregation: true,
  aggregationDefault: 'csvDistinct'
}];

const mapData$r = function (data, mapping, dataTypes, dimensions) {
  const colorAggregator = getDimensionAggregator('color', mapping, dataTypes, dimensions);
  const sizeAggregator = getDimensionAggregator('size', mapping, dataTypes, dimensions);
  const labelAggregators = getDimensionAggregator('label', mapping, dataTypes, dimensions); // add the non-compulsory dimensions.

  if (!('color' in mapping)) mapping.color = {
    value: undefined
  };
  if (!('size' in mapping)) mapping.size = {
    value: undefined
  };
  if (!('label' in mapping)) mapping.label = {
    value: undefined
  };
  const results = [];
  rollups(data, v => {
    const item = {
      hierarchy: new Map(mapping.hierarchy.value.map(d => [d, v[0][d]])),
      //get the first one since it's grouped
      size: mapping.size.value ? sizeAggregator(v.map(d => d[mapping.size.value])) : v.length,
      color: mapping.color.value ? colorAggregator(v.map(d => d[mapping.color.value])) : 'cells color',
      label: mapping.label.value ? mapping.label.value.map((label, i) => {
        return labelAggregators[i](v.map(d => d[label]));
      }) : undefined // create array of strings

    };
    results.push(item);
    return item;
  }, ...mapping.hierarchy.value.map(level => d => d[level]) // create a grouping for each level of the hierarchy
  );
  return results;
};

/*
Credits:
Inspired by https://observablehq.com/@d3/treemap
*/

function render$r(svgNode, data, visualOptions, mapping, originalData, styles) {
  const {
    // artboard
    width,
    height,
    background,
    // margins
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    // legend
    showLegend,
    legendWidth,
    // colors
    colorScale,
    // chart options
    tiling,
    padding,
    // labels
    showLabelsOutline,
    showHierarchyLabels,
    labelStyles
  } = visualOptions;
  const margin = {
    top: marginTop,
    right: marginRight,
    bottom: marginBottom,
    left: marginLeft
  };
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom; // create the hierarchical structure

  const nest = rollup(data, v => v[0], ...mapping.hierarchy.value.map(level => d => d.hierarchy.get(level)));
  const hierarchy$1 = hierarchy(nest).sum(d => d[1] instanceof Map ? 0 : d[1].size); // since maps have a .size porperty in native javascript, sum only values for leaves, and not for Maps
  //@TODO: understand how to handle empty values

  const treemap = treemap$1().tile(d3[tiling]).size([chartWidth, chartHeight]).padding(padding).round(true);

  if (showHierarchyLabels) {
    treemap.paddingTop(12);
  }

  const root = treemap(hierarchy$1); // add background

  select(svgNode).append('rect').attr('width', showLegend ? width + legendWidth : width).attr('height', height).attr('x', 0).attr('y', 0).attr('fill', background).attr('id', 'background');
  const svg = select(svgNode).append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')').attr('id', 'viz'); // if selected, draw a rectangle for each level in the hierarchy

  if (showHierarchyLabels) {
    const ancestorData = root.descendants().filter(d => d.children);
    const depthScale = scaleLinear().domain([0, root.leaves()[0].depth + 1]);
    const ancestors = svg.append('g').attr('id', 'ancestors').selectAll('rect').data(ancestorData).join('g').attr('transform', d => `translate(${d.x0},${d.y0})`);
    ancestors.append('rect').attr('width', d => d.x1 - d.x0).attr('height', d => d.y1 - d.y0).attr('id', (d, i) => 'path_ancestor' + i).attr('fill', '#ccc').attr('fill-opacity', d => depthScale(d.depth)).attr('stroke', '#ccc').attr('stroke-opacity', d => depthScale(d.depth) + 0.1);

    if (showHierarchyLabels) {
      ancestors.append('clipPath').attr('id', (d, i) => 'clip_ancestor' + i).append('use').attr('xlink:href', (d, i) => '#path_ancestor' + i);
      ancestors.append('text').attr('x', padding).attr('y', 2).attr('clip-path', (d, i) => 'url(#clip_ancestor' + i + ')').attr('font-family', 'Arial, sans-serif').attr('font-size', 8).attr('dominant-baseline', 'text-before-edge').attr('class', 'txt').text(d => {
        return d.depth === 0 && !d.data[0] ? 'Root' : d.data[0];
      });
    }
  }

  const leaves = svg.append('g').attr('id', 'leaves').selectAll('g').data(root.leaves()).join('g').attr('transform', d => `translate(${d.x0},${d.y0})`);
  leaves.append('rect').attr('id', (d, i) => 'path' + i).attr('fill', d => colorScale(d.data[1].color)).attr('width', d => d.x1 - d.x0).attr('height', d => d.y1 - d.y0);
  leaves.append('clipPath').attr('id', (d, i) => 'clip' + i).append('use').attr('xlink:href', (d, i) => '#path' + i);
  const texts = leaves.append('text').attr('clip-path', (d, i) => 'url(#clip' + i + ')').attr('font-family', 'Arial, sans-serif').attr('font-size', 10).attr('dominant-baseline', 'text-before-edge').attr('class', 'txt');
  texts.selectAll('tspan').data((d, i, a) => {
    return Array.isArray(d.data[1].label) ? d.data[1].label : [d.data[1].label];
  }).join('tspan').attr('x', 3).attr('y', (d, i) => i * 1.1 + 0.2 + 'em').text((d, i) => {
    if (d && mapping.label.dataType[i].type === 'date') {
      return timeFormat(dateFormats$1[mapping.label.dataType[i].dateFormat])(d);
    } else {
      return d;
    }
  }).styles((d, i) => styles[labelStyles[i]]);

  if (showLabelsOutline) {
    // NOTE: Adobe Illustrator does not support paint-order attr
    selectAll('.txt').styles(styles.labelOutline);
  }

  if (showLegend) {
    const legendLayer = select(svgNode).append('g').attr('id', 'legend').attr('transform', `translate(${width},${marginTop})`);
    const chartLegend = legend().legendWidth(legendWidth);

    if (mapping.color.value) {
      chartLegend.addColor(mapping.color.value, colorScale);
    }

    legendLayer.call(chartLegend);
  }
}

const visualOptions$r = {
  marginTop: {
    type: 'number',
    label: 'Margin (top)',
    default: 10,
    group: 'artboard'
  },
  marginRight: {
    type: 'number',
    label: 'Margin (right)',
    default: 10,
    group: 'artboard'
  },
  marginBottom: {
    type: 'number',
    label: 'Margin (bottom)',
    default: 10,
    group: 'artboard'
  },
  marginLeft: {
    type: 'number',
    label: 'Margin (left)',
    default: 10,
    group: 'artboard'
  },
  showLegend: {
    type: 'boolean',
    label: 'Show legend',
    default: false,
    group: 'artboard'
  },
  legendWidth: {
    type: 'number',
    label: 'Legend width',
    default: 200,
    group: 'artboard',
    disabled: {
      showLegend: false
    },
    container: 'width',
    containerCondition: {
      showLegend: true
    }
  },
  tiling: {
    type: 'text',
    label: 'Tiling method',
    group: 'chart',
    options: [{
      label: 'Binary',
      value: 'treemapBinary'
    }, {
      label: 'Dice',
      value: 'treemapDice'
    }, {
      label: 'Slice',
      value: 'treemapSlice'
    }, {
      label: 'Slice and dice',
      value: 'treemapSliceDice'
    }, {
      label: 'Squarify',
      value: 'treemapSquarify'
    }],
    default: 'treemapSquarify'
  },
  padding: {
    type: 'number',
    label: 'Padding',
    default: 2,
    group: 'chart'
  },
  colorScale: {
    type: 'colorScale',
    label: 'Color scale',
    dimension: 'color',
    default: {
      scaleType: 'ordinal',
      interpolator: 'interpolateSpectral'
    },
    group: 'colors'
  },
  labelStyles: {
    type: 'text',
    label: 'Label',
    group: 'labels',
    options: [{
      label: 'Primary',
      value: 'labelPrimary'
    }, {
      label: 'Secondary',
      value: 'labelSecondary'
    }, {
      label: 'Italic',
      value: 'labelItalic'
    }],
    default: 'labelPrimary',
    repeatFor: 'label',
    repeatDefault: ['labelPrimary', 'labelSecondary', 'labelItalic']
  },
  showLabelsOutline: {
    type: 'boolean',
    label: 'Show outline',
    default: false,
    group: 'labels'
  },
  showHierarchyLabels: {
    type: 'boolean',
    label: 'Show hierarchy labels',
    default: false,
    group: 'labels'
  }
};

var treemap = {
  metadata: metadata$r,
  dimensions: dimensions$r,
  mapData: mapData$r,
  render: render$r,
  visualOptions: visualOptions$r,
  styles: styles$1
};

var img$S = "data:image/svg+xml,%3csvg id='rawgraphs-icons' xmlns='http://www.w3.org/2000/svg' width='56' height='56' viewBox='0 0 56 56'%3e %3cdefs%3e %3cstyle%3e .cls-1 %7b fill: %2395e5c0%3b %7d .cls-2 %7b fill: %2306c26c%3b %7d %3c/style%3e %3c/defs%3e %3cg id='secundary'%3e %3cpath class='cls-1' d='M19.9971%2c24.5a6.3078%2c6.3078%2c0%2c0%2c0-1.4239-3.6611A7.1479%2c7.1479%2c0%2c0%2c1%2c16.9971%2c16.5v-.4971h-.9942V16.5a7.1479%2c7.1479%2c0%2c0%2c1-1.5761%2c4.3389A6.3078%2c6.3078%2c0%2c0%2c0%2c13.0029%2c24.5a12.4967%2c12.4967%2c0%2c0%2c1-.4853%2c3.38%2c13.5076%2c13.5076%2c0%2c0%2c0-.5147%2c3.62%2c6.3078%2c6.3078%2c0%2c0%2c0%2c1.4239%2c3.6611A7.1479%2c7.1479%2c0%2c0%2c1%2c15.0029%2c39.5a19.2486%2c19.2486%2c0%2c0%2c0%2c.5664%2c4.7246A13.6883%2c13.6883%2c0%2c0%2c1%2c16.0029%2c47.5v.4971h.9942V47.5a13.6883%2c13.6883%2c0%2c0%2c1%2c.4336-3.2754A19.2486%2c19.2486%2c0%2c0%2c0%2c17.9971%2c39.5a7.1479%2c7.1479%2c0%2c0%2c1%2c1.5761-4.3389A6.3078%2c6.3078%2c0%2c0%2c0%2c20.9971%2c31.5a13.5076%2c13.5076%2c0%2c0%2c0-.5147-3.62A12.4967%2c12.4967%2c0%2c0%2c1%2c19.9971%2c24.5Z'/%3e %3cpath class='cls-1' d='M47.3975%2c35.7021a5.179%2c5.179%2c0%2c0%2c1-1.4-3.2021%2c14.5%2c14.5%2c0%2c0%2c0-.458-3.4932%2c18.1508%2c18.1508%2c0%2c0%2c1-.542-4.5068v-.4971h-.9942V24.5a18.1508%2c18.1508%2c0%2c0%2c1-.542%2c4.5068%2c14.5%2c14.5%2c0%2c0%2c0-.458%2c3.4932%2c5.179%2c5.179%2c0%2c0%2c1-1.4%2c3.2021%2c6.038%2c6.038%2c0%2c0%2c0-1.6%2c3.7979c0%2c1.582.9717%2c2.667%2c1.9121%2c3.7158%2c1.0264%2c1.1455%2c2.0879%2c2.3311%2c2.0879%2c4.2842v.4971h.9942V47.5c0-1.9531%2c1.0615-3.1387%2c2.0879-4.2842.94-1.0488%2c1.9121-2.1338%2c1.9121-3.7158A6.038%2c6.038%2c0%2c0%2c0%2c47.3975%2c35.7021Z'/%3e %3c/g%3e %3cg id='primary'%3e %3cpath class='cls-2' d='M34.6436%2c12.6963c-1.793-1.1426-3.6465-2.3252-3.6465-4.1963V8.0029h-.9942V8.5c0%2c1.8711-1.8535%2c3.0537-3.6465%2c4.1963-1.7246%2c1.1006-3.3535%2c2.1387-3.3535%2c3.8037%2c0%2c1.6152%2c1.2188%2c2.7031%2c2.3975%2c3.7549%2c1.2793%2c1.1426%2c2.6025%2c2.3242%2c2.6025%2c4.2451a18.1508%2c18.1508%2c0%2c0%2c1-.542%2c4.5068%2c14.5%2c14.5%2c0%2c0%2c0-.458%2c3.4932%2c6.038%2c6.038%2c0%2c0%2c0%2c1.6%2c3.7979%2c5.179%2c5.179%2c0%2c0%2c1%2c1.4%2c3.2021v.4971h.9942V39.5a5.179%2c5.179%2c0%2c0%2c1%2c1.4-3.2021%2c6.038%2c6.038%2c0%2c0%2c0%2c1.6-3.7979%2c14.5%2c14.5%2c0%2c0%2c0-.458-3.4932%2c18.1508%2c18.1508%2c0%2c0%2c1-.542-4.5068c0-1.9209%2c1.3232-3.1025%2c2.6025-4.2451%2c1.1787-1.0518%2c2.3975-2.14%2c2.3975-3.7549C37.9971%2c14.835%2c36.3682%2c13.7969%2c34.6436%2c12.6963Z'/%3e %3cpolygon class='cls-2' points='9.185 9.685 7.5 8 5.815 9.685 5.815 11.115 7.003 9.927 7.003 48 7.997 48 7.997 9.927 9.185 11.115 9.185 9.685'/%3e %3c/g%3e%3c/svg%3e";

var img$T = "data:image/svg+xml,%3csvg id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' width='320' height='160' viewBox='0 0 320 160'%3e %3cdefs%3e %3cstyle%3e .cls-1 %7b fill: none%3b stroke: black%3b %7d .cls-2 %7b isolation: isolate%3b font-size: 10px%3b font-family: Helvetica%3b %7d .cls-3 %7b fill: %239e0142%3b %7d .cls-4 %7b fill: %23a0d9a3%3b %7d .cls-5 %7b fill: %235e4fa2%3b %7d %3c/style%3e %3c/defs%3e %3cg%3e %3cpath class='cls-1' d='M25.5%2c142.5h295'/%3e %3cline class='cls-1' x1='74.16666' y1='142' x2='74.16666' y2='148'/%3e %3cline class='cls-1' x1='172.5' y1='142' x2='172.5' y2='148'/%3e %3cline class='cls-1' x1='270.83334' y1='142' x2='270.83334' y2='148'/%3e %3c/g%3e %3cg%3e %3cg%3e %3cline class='cls-1' x1='25' y1='142.5' x2='19' y2='142.5'/%3e %3ctext class='cls-2' transform='translate(2.09863 145.7)'%3e4.0%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-1' x1='25' y1='125.375' x2='19' y2='125.375'/%3e %3ctext class='cls-2' transform='translate(2.09863 128.575)'%3e4.5%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-1' x1='25' y1='108.25' x2='19' y2='108.25'/%3e %3ctext class='cls-2' transform='translate(2.09863 111.45)'%3e5.0%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-1' x1='25' y1='91.125' x2='19' y2='91.125'/%3e %3ctext class='cls-2' transform='translate(2.09863 94.325)'%3e5.5%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-1' x1='25' y1='74' x2='19' y2='74'/%3e %3ctext class='cls-2' transform='translate(2.09863 77.2)'%3e6.0%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-1' x1='25' y1='56.875' x2='19' y2='56.875'/%3e %3ctext class='cls-2' transform='translate(2.09863 60.07499)'%3e6.5%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-1' x1='25' y1='39.75' x2='19' y2='39.75'/%3e %3ctext class='cls-2' transform='translate(2.09863 42.95)'%3e7.0%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-1' x1='25' y1='22.625' x2='19' y2='22.625'/%3e %3ctext class='cls-2' transform='translate(2.09863 25.82501)'%3e7.5%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-1' x1='25' y1='5.5' x2='19' y2='5.5'/%3e %3ctext class='cls-2' transform='translate(2.09863 8.70001)'%3e8.0%3c/text%3e %3c/g%3e %3c/g%3e %3cpath class='cls-3' d='M74.16667%2c142a6.71935%2c6.71935%2c0%2c0%2c1%2c.8155-3.425c.70031-1.14166%2c2.04334-2.28332%2c2.93582-3.425a33.06169%2c33.06169%2c0%2c0%2c1%2c2.44651-3.425c1.11211-1.14167%2c2.89438-2.28334%2c4.07753-3.425s1.76718-2.28333%2c2.77271-3.425%2c2.43259-2.28333%2c3.262-3.425%2c1.06126-2.28333%2c2.44652-3.425a38.70607%2c38.70607%2c0%2c0%2c1%2c6.19784-3.425%2c62.1746%2c62.1746%2c0%2c0%2c0%2c6.03473-3.425c1.75174-1.14167%2c3.24613-2.28333%2c2.93582-3.425s-2.42534-2.28333-3.75132-3.425-1.86294-2.28333-3.42512-3.425a42.08544%2c42.08544%2c0%2c0%2c0-6.68714-3.425%2c30.2741%2c30.2741%2c0%2c0%2c1-6.36094-3.425A5.43331%2c5.43331%2c0%2c0%2c1%2c86.073%2c90.625%2c6.50925%2c6.50925%2c0%2c0%2c0%2c84.27893%2c87.2c-1.15353-1.14166-3.09475-2.28333-4.24063-3.425a6.73612%2c6.73612%2c0%2c0%2c1-1.79411-3.425%2c15.2364%2c15.2364%2c0%2c0%2c0-1.14171-3.425c-.59919-1.14167-1.55276-2.28333-2.12031-3.425a8.56248%2c8.56248%2c0%2c0%2c1-.8155-3.425c-.06644-1.14166-.01781-2.28333%2c0-3.425s.00477-2.28333%2c0-3.425-.00128-2.28334%2c0-3.425.00034-2.28334%2c0-3.425-.00009-2.28333%2c0-3.425%2c0-2.28333%2c0-3.425%2c0-2.28334%2c0-3.425V5h0V42.675q0%2c1.71249%2c0%2c3.425t0%2c3.425q0%2c1.71251%2c0%2c3.425.00014%2c1.7125%2c0%2c3.425-.00051%2c1.71249%2c0%2c3.425c.00127%2c1.14166.00477%2c2.28333%2c0%2c3.425s-.01781%2c2.28333%2c0%2c3.425.06644%2c2.28333%2c0%2c3.425a8.56233%2c8.56233%2c0%2c0%2c1-.81551%2c3.425c-.56754%2c1.14167-1.52111%2c2.28333-2.12031%2c3.425a15.2369%2c15.2369%2c0%2c0%2c0-1.14171%2c3.425A6.736%2c6.736%2c0%2c0%2c1%2c68.295%2c83.775c-1.14588%2c1.14166-3.0871%2c2.28333-4.24062%2c3.425a6.50918%2c6.50918%2c0%2c0%2c0-1.79411%2c3.425%2c5.43341%2c5.43341%2c0%2c0%2c1-1.79411%2c3.425%2c30.27461%2c30.27461%2c0%2c0%2c1-6.36094%2c3.425%2c42.085%2c42.085%2c0%2c0%2c0-6.68714%2c3.425c-1.56218%2c1.14166-2.09913%2c2.28333-3.42512%2c3.425s-3.441%2c2.28334-3.75132%2c3.425%2c1.18407%2c2.28333%2c2.93581%2c3.425a62.17484%2c62.17484%2c0%2c0%2c0%2c6.03474%2c3.425%2c38.70651%2c38.70651%2c0%2c0%2c1%2c6.19784%2c3.425c1.38525%2c1.14166%2c1.61708%2c2.28333%2c2.44651%2c3.425s2.25648%2c2.28334%2c3.262%2c3.425%2c1.58957%2c2.28333%2c2.77272%2c3.425%2c2.96542%2c2.28333%2c4.07752%2c3.425a33.06182%2c33.06182%2c0%2c0%2c1%2c2.44652%2c3.425c.89247%2c1.14168%2c2.2355%2c2.28334%2c2.93581%2c3.425A6.71946%2c6.71946%2c0%2c0%2c1%2c74.16667%2c142Z'/%3e %3cpath class='cls-4' d='M172.5%2c142q.00009-1.71249%2c0-3.425-.00017-1.71249%2c0-3.425.0006-1.71249%2c0-3.425c-.00147-1.14167-.00547-2.28334%2c0-3.425s.02042-2.28333%2c0-3.425-.0762-2.28333%2c0-3.425a9.41552%2c9.41552%2c0%2c0%2c1%2c.81551-3.425%2c31.18636%2c31.18636%2c0%2c0%2c1%2c2.12031-3.425c.73521-1.14167%2c1.35164-2.28334%2c1.95721-3.425a14.94819%2c14.94819%2c0%2c0%2c0%2c1.46791-3.425%2c6.26068%2c6.26068%2c0%2c0%2c0-.1631-3.425c-.37126-1.14166-1.05431-2.28333-.97861-3.425s.91015-2.28333%2c2.28342-3.425A34.80929%2c34.80929%2c0%2c0%2c1%2c185.385%2c94.05c2.097-1.14167%2c4.37891-2.28333%2c6.36094-3.425a13.51241%2c13.51241%2c0%2c0%2c0%2c4.40372-3.425%2c2.9951%2c2.9951%2c0%2c0%2c0-.1631-3.425c-.69968-1.14167-1.89606-2.28333-2.60961-3.425a26.54476%2c26.54476%2c0%2c0%2c1-1.46792-3.425%2c22.848%2c22.848%2c0%2c0%2c1-1.631-3.425%2c11.347%2c11.347%2c0%2c0%2c1%2c0-3.425%2c5.42365%2c5.42365%2c0%2c0%2c0-.81551-3.425%2c26.15115%2c26.15115%2c0%2c0%2c0-3.262-3.425%2c7.53107%2c7.53107%2c0%2c0%2c1-2.28341-3.425c-.23052-1.14167.21958-2.28334.1631-3.425a14.58786%2c14.58786%2c0%2c0%2c0-.9786-3.425%2c18.72525%2c18.72525%2c0%2c0%2c1-.65241-3.425%2c10.25033%2c10.25033%2c0%2c0%2c0-.8155-3.425%2c15.30344%2c15.30344%2c0%2c0%2c0-2.60962-3.425%2c26.9162%2c26.9162%2c0%2c0%2c1-2.93582-3.425%2c15.67918%2c15.67918%2c0%2c0%2c1-1.46791-3.425c-.41018-1.14167-.90513-2.28333-1.3048-3.425A14.78438%2c14.78438%2c0%2c0%2c1%2c172.5%2c28.975a27.70546%2c27.70546%2c0%2c0%2c1%2c0-3.425c.02986-1.14167.008-2.28334%2c0-3.425s-.00214-2.28333%2c0-3.425.00058-2.28334%2c0-3.425-.00015-2.28334%2c0-3.425%2c0-2.28334%2c0-3.425%2c0-2.28334%2c0-3.425h0q0%2c1.71249%2c0%2c3.425t0%2c3.425q.00024%2c1.71249%2c0%2c3.425-.00086%2c1.71249%2c0%2c3.425c.00215%2c1.14167.008%2c2.28333%2c0%2c3.425s-.02985%2c2.28333%2c0%2c3.425a27.7035%2c27.7035%2c0%2c0%2c1%2c0%2c3.425%2c14.78486%2c14.78486%2c0%2c0%2c1-.8155%2c3.425c-.39968%2c1.14167-.89462%2c2.28333-1.30481%2c3.425a15.67918%2c15.67918%2c0%2c0%2c1-1.46791%2c3.425%2c26.91608%2c26.91608%2c0%2c0%2c1-2.93581%2c3.425%2c15.30344%2c15.30344%2c0%2c0%2c0-2.60962%2c3.425%2c10.25035%2c10.25035%2c0%2c0%2c0-.81551%2c3.425%2c18.72606%2c18.72606%2c0%2c0%2c1-.6524%2c3.425%2c14.58786%2c14.58786%2c0%2c0%2c0-.9786%2c3.425c-.05649%2c1.14166.39361%2c2.28333.1631%2c3.425a7.531%2c7.531%2c0%2c0%2c1-2.28342%2c3.425%2c26.15181%2c26.15181%2c0%2c0%2c0-3.262%2c3.425%2c5.42357%2c5.42357%2c0%2c0%2c0-.8155%2c3.425%2c11.34732%2c11.34732%2c0%2c0%2c1%2c0%2c3.425%2c22.84812%2c22.84812%2c0%2c0%2c1-1.631%2c3.425%2c26.54467%2c26.54467%2c0%2c0%2c1-1.46791%2c3.425c-.71355%2c1.14167-1.90993%2c2.28333-2.60962%2c3.425a2.99512%2c2.99512%2c0%2c0%2c0-.1631%2c3.425%2c13.51247%2c13.51247%2c0%2c0%2c0%2c4.40373%2c3.425c1.982%2c1.14167%2c4.26394%2c2.28333%2c6.36094%2c3.425a34.80977%2c34.80977%2c0%2c0%2c1%2c5.38233%2c3.425c1.37326%2c1.14167%2c2.20771%2c2.28333%2c2.28341%2c3.425s-.60735%2c2.28333-.9786%2c3.425a6.26058%2c6.26058%2c0%2c0%2c0-.1631%2c3.425%2c14.94814%2c14.94814%2c0%2c0%2c0%2c1.4679%2c3.425c.60558%2c1.14166%2c1.222%2c2.28333%2c1.95721%2c3.425a31.185%2c31.185%2c0%2c0%2c1%2c2.12032%2c3.425%2c9.41529%2c9.41529%2c0%2c0%2c1%2c.8155%2c3.425c.07621%2c1.14168.02042%2c2.28334%2c0%2c3.425s-.00547%2c2.28333%2c0%2c3.425.00147%2c2.28333%2c0%2c3.425-.00039%2c2.28333%2c0%2c3.425.00012%2c2.28334%2c0%2c3.425S172.5%2c140.85834%2c172.5%2c142Z'/%3e %3cpath class='cls-5' d='M270.83334%2c142q.00017-1.71249%2c0-3.425-.00033-1.71249%2c0-3.425c.00076-1.14166.00284-2.28332%2c0-3.425s-.01059-2.28334%2c0-3.425.03951-2.28333%2c0-3.425a20.94874%2c20.94874%2c0%2c0%2c1%2c0-3.425c.14746-1.14166.55032-2.28333.8155-3.425a23.94361%2c23.94361%2c0%2c0%2c0%2c.48931-3.425c.09663-1.14167.16238-2.28334.1631-3.425s-.06363-2.28333-.1631-3.425a25.90856%2c25.90856%2c0%2c0%2c0-.48931-3.425c-.25522-1.14166-.631-2.28333-.8155-3.425a10.86926%2c10.86926%2c0%2c0%2c1%2c0-3.425c.17755-1.14167.52574-2.28334.8155-3.425a9.77528%2c9.77528%2c0%2c0%2c1%2c1.30481-3.425c.7837-1.14167%2c2.11975-2.28333%2c3.09892-3.425a22.866%2c22.866%2c0%2c0%2c0%2c2.28341-3.425c.682-1.14167%2c1.42358-2.28333%2c1.95721-3.425a10.68617%2c10.68617%2c0%2c0%2c0%2c.97861-3.425%2c12.00156%2c12.00156%2c0%2c0%2c1%2c.4893-3.425%2c8.7902%2c8.7902%2c0%2c0%2c1%2c2.93582-3.425c1.47818-1.14166%2c3.4338-2.28333%2c5.21923-3.425s3.40069-2.28333%2c3.75132-3.425-.56335-2.28334-.8155-3.425.15751-2.28334-.65241-3.425-2.83941-2.28333-3.91442-3.425-1.19554-2.28333-1.79411-3.425-1.67518-2.28334-2.28341-3.425-.7481-2.28334-1.46791-3.425-2.01956-2.28334-2.60962-3.425a10.18089%2c10.18089%2c0%2c0%2c1-.6524-3.425c-.182-1.14167-.66556-2.28333-.81551-3.425a18.91093%2c18.91093%2c0%2c0%2c0-.3262-3.425c-.36-1.14167-1.26358-2.28333-1.46791-3.425a7.38743%2c7.38743%2c0%2c0%2c1%2c.65241-3.425%2c31.13085%2c31.13085%2c0%2c0%2c0%2c.8155-3.425%2c22.0582%2c22.0582%2c0%2c0%2c0%2c.48931-3.425%2c6.9892%2c6.9892%2c0%2c0%2c0-.65241-3.425%2c15.01485%2c15.01485%2c0%2c0%2c0-2.60961-3.425c-1.07573-1.14167-2.25043-2.28334-3.42512-3.425h-2.60962c-1.17469%2c1.14166-2.34939%2c2.28333-3.42512%2c3.425a15.01456%2c15.01456%2c0%2c0%2c0-2.60961%2c3.425%2c6.98909%2c6.98909%2c0%2c0%2c0-.65241%2c3.425%2c22.057%2c22.057%2c0%2c0%2c0%2c.4893%2c3.425%2c31.13091%2c31.13091%2c0%2c0%2c0%2c.81551%2c3.425%2c7.38742%2c7.38742%2c0%2c0%2c1%2c.6524%2c3.425c-.20432%2c1.14167-1.10794%2c2.28333-1.46791%2c3.425a18.91093%2c18.91093%2c0%2c0%2c0-.3262%2c3.425c-.14994%2c1.14167-.63353%2c2.28333-.8155%2c3.425a10.18066%2c10.18066%2c0%2c0%2c1-.65241%2c3.425c-.59006%2c1.14166-1.8898%2c2.28333-2.60961%2c3.425s-.85967%2c2.28333-1.46791%2c3.425-1.68485%2c2.28333-2.28341%2c3.425-.7191%2c2.28333-1.79411%2c3.425-3.10451%2c2.28333-3.91443%2c3.425-.40024%2c2.28333-.6524%2c3.425-1.16614%2c2.28333-.81551%2c3.425%2c1.96589%2c2.28333%2c3.75133%2c3.425%2c3.74105%2c2.28333%2c5.21923%2c3.425a8.79024%2c8.79024%2c0%2c0%2c1%2c2.93581%2c3.425%2c12.00193%2c12.00193%2c0%2c0%2c1%2c.48931%2c3.425%2c10.68615%2c10.68615%2c0%2c0%2c0%2c.9786%2c3.425c.53363%2c1.14167%2c1.27526%2c2.28333%2c1.95721%2c3.425a22.86613%2c22.86613%2c0%2c0%2c0%2c2.28342%2c3.425c.97917%2c1.14168%2c2.31522%2c2.28334%2c3.09892%2c3.425a9.77525%2c9.77525%2c0%2c0%2c1%2c1.3048%2c3.425c.28977%2c1.14166.638%2c2.28333.81551%2c3.425a10.86926%2c10.86926%2c0%2c0%2c1%2c0%2c3.425c-.18446%2c1.14166-.56029%2c2.28333-.81551%2c3.425a25.91019%2c25.91019%2c0%2c0%2c0-.4893%2c3.425c-.09947%2c1.14167-.16381%2c2.28333-.1631%2c3.425s.06647%2c2.28333.1631%2c3.425a23.94358%2c23.94358%2c0%2c0%2c0%2c.4893%2c3.425c.26518%2c1.14166.668%2c2.28333.81551%2c3.425a20.94874%2c20.94874%2c0%2c0%2c1%2c0%2c3.425c-.03951%2c1.14167-.01059%2c2.28333%2c0%2c3.425s.00284%2c2.28333%2c0%2c3.425-.00077%2c2.28333%2c0%2c3.425.00022%2c2.28334%2c0%2c3.425S270.83323%2c140.85834%2c270.83334%2c142Z'/%3e %3ctext class='cls-2' transform='translate(71.31506 159.01062)'%3ea%3c/text%3e %3ctext class='cls-2' transform='translate(169.98578 159.01062)'%3eb%3c/text%3e %3ctext class='cls-2' transform='translate(268.65417 159.01062)'%3ec%3c/text%3e %3cline class='cls-1' x1='25' y1='5.5' x2='25.5' y2='142.5'/%3e%3c/svg%3e";

const metadata$s = {
  name: 'Violin plot',
  id: 'rawgraphs.violinplot',
  thumbnail: img$T,
  icon: img$S,
  categories: ['distributions'],
  description: 'It is useful to show the distribution of a numeric dimension. The shape width represents the amount of items with the same value in the dataset.',
  code: 'https://github.com/rawgraphs/rawgraphs-charts/tree/master/src/violinplot',
  tutorial: 'https://rawgraphs.io/learning/how-to-make-a-violin-plot/'
};

const dimensions$s = [{
  id: 'value',
  name: 'Y Axis',
  validTypes: ['number'],
  required: true
}, {
  id: 'group',
  name: 'Groups',
  validTypes: ['number', 'date', 'string'],
  required: false
}, {
  id: 'color',
  name: 'Color',
  operation: 'get',
  validTypes: ['number', 'string', 'date'],
  required: false,
  aggregation: true,
  aggregationDefault: {
    number: 'sum',
    string: 'csvDistinct',
    date: 'csvDistinct'
  }
}];

const mapData$s = function (data, mapping, dataTypes, dimensions) {
  // define aggregators
  // you should provide the dimension name (defined in dimensions.js)
  // and pass mapping, dataTypes, and dimensions.
  const colorAggregator = getDimensionAggregator('color', mapping, dataTypes, dimensions); // add the non-compulsory dimensions.

  if (!('group' in mapping)) mapping.group = {
    value: undefined
  };
  if (!('color' in mapping)) mapping.color = {
    value: undefined
  }; // we will use rollup to populate a flat array of objects
  // that will be passed to the render

  let results = [];
  rollups(data, v => {
    v.forEach(d => {
      const item = {
        group: d[mapping.group.value],
        value: d[mapping.value.value],
        color: colorAggregator(v.map(e => e[mapping.color.value]))
      };
      results.push(item);
    });
    return v;
  }, d => d[mapping.group.value] // groups grouping
  );
  return results;
};

function render$s(svgNode, data, visualOptions, mapping, originalData, styles) {
  const {
    // artboard options
    width,
    height,
    background,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    // charts options
    padding,
    sortGroupsBy,
    binsNumber,
    // how many 'bins' are available
    interpolation,
    showDots,
    dotsDiameter,
    //legend
    showLegend,
    legendWidth,
    // color dimension option, defined in visualOptions.js
    colorScale
  } = visualOptions; // Margin convention

  const margin = {
    top: marginTop,
    right: marginRight,
    bottom: marginBottom,
    left: marginLeft
  };
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom; //get vertical scale

  const yScale = scaleLinear().domain(extent(data, d => d.value)).nice().range([chartHeight, 0]); // prepare the data

  const nestedData = rollups(data, v => ({
    group: v[0].group,
    color: v[0].color,
    bins: bin().domain(yScale.domain()).thresholds(binsNumber)(v.map(e => e.value)),
    totalValue: sum(v, d => d.value)
  }), d => d.group); // sort series

  nestedData.sort((a, b) => {
    return {
      valueDescending: descending(a[1].totalValue, b[1].totalValue),
      valueAscending: ascending(a[1].totalValue, b[1].totalValue),
      name: ascending(a[0], b[0])
    }[sortGroupsBy];
  });
  console.log(nestedData); // add background

  select(svgNode).append('rect').attr('width', showLegend ? width + legendWidth : width).attr('height', height).attr('x', 0).attr('y', 0).attr('fill', background).attr('id', 'background');
  const svg = select(svgNode).append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')').attr('id', 'viz');
  const groupsDomain = nestedData.map(d => d[0]);
  const xScale = scaleBand().range([0, chartWidth]).domain(groupsDomain).padding(padding / (chartWidth / groupsDomain.length)); // convert padding from pixel to percentage @TODO: not working, check
  // get the max value in the bins

  const maxValue = max(nestedData.map(d => d[1].bins.map(e => e.length)).flat(1)); // compute the scale used to draw shapes

  const shapeScale = scaleLinear().range([0, xScale.bandwidth()]).domain([-maxValue, maxValue]); // append scales

  svg.append('g').attr('id', 'y axis').call(axisLeft(yScale)).append('text').attr('x', 4).attr('text-anchor', 'start').attr('dominant-baseline', 'hanging').text(mapping['value'].value).styles(styles.axisLabel);
  svg.append('g').attr('id', 'x axis').attr('transform', 'translate(0,' + chartHeight + ')').call(axisBottom(xScale)).append('text').attr('x', chartWidth).attr('dy', -5).attr('text-anchor', 'end').text(mapping['group'].value).styles(styles.axisLabel);
  let shapes = svg.append('g').attr('id', 'shapes').selectAll('g').data(nestedData).join('g').attr('id', d => d[0]).attr('transform', d => 'translate(' + xScale(d[0]) + ' ,0)').style('fill', d => colorScale(d[1].color));
  shapes.append('path').datum(d => {
    const delta = d[1].bins[0].x1 - d[1].bins[0].x0;
    const completeShape = [...d[1].bins]; // make a copy
    //add a first and last element to be sure to 'close' the path with a 0 value
    //@TODO could be maybe improved, not really nice

    completeShape.unshift([]);
    completeShape[0].x0 = d[1].bins[0].x0 - delta;
    completeShape[0].x1 = d[1].bins[0].x0;
    completeShape.push([]);
    completeShape[completeShape.length - 1].x0 = completeShape[completeShape.length - 2].x0 + delta;
    completeShape[completeShape.length - 1].x1 = completeShape[completeShape.length - 2].x0 + delta * 2;
    return completeShape;
  }) // So now we are working bin per bin
  .style('stroke', 'none').attr('teest', d => {// console.log(d)
  }).attr('d', area().x0(d => shapeScale(-d.length)).x1(d => shapeScale(d.length)).y(d => yScale((d.x0 + d.x1) / 2)).curve(d3[interpolation]));

  if (showDots) {
    shapes.selectAll('circle').data(d => // merge down bins keeping x position
    d[1].bins.map((bin, index) => bin.map(elm => ({
      value: elm,
      index: index,
      length: bin.length,
      x0: bin.x0,
      x1: bin.x1
    }))).flat(1)).join('circle').attr('cy', d => yScale(d.value)).attr('cx', xScale.bandwidth() / 2).attr('r', dotsDiameter / 2).attr('fill', 'black');
  }

  if (showLegend) {
    // svg width is adjusted automatically because of the "container:height" annotation in legendWidth visual option
    const legendLayer = select(svgNode).append('g').attr('id', 'legend').attr('transform', `translate(${width},${marginTop})`);
    const chartLegend = legend().legendWidth(legendWidth);

    if (mapping.color.value) {
      chartLegend.addColor(mapping.color.value, colorScale);
    }

    legendLayer.call(chartLegend);
  }
}

const visualOptions$s = {
  marginTop: {
    type: 'number',
    label: 'Margin (top)',
    default: 10,
    group: 'artboard'
  },
  marginRight: {
    type: 'number',
    label: 'Margin (right)',
    default: 10,
    group: 'artboard'
  },
  marginBottom: {
    type: 'number',
    label: 'Margin (bottom)',
    default: 30,
    group: 'artboard'
  },
  marginLeft: {
    type: 'number',
    label: 'Margin (left)',
    default: 50,
    group: 'artboard'
  },
  padding: {
    type: 'number',
    label: 'Padding',
    default: 10,
    group: 'chart'
  },
  binsNumber: {
    type: 'number',
    label: 'Number of bins',
    default: 10,
    group: 'chart'
  },
  sortGroupsBy: {
    type: 'text',
    label: 'Sort violins by',
    group: 'chart',
    options: [{
      label: 'Total value (descending)',
      value: 'valueDescending'
    }, {
      label: 'Total value (ascending)',
      value: 'valueAscending'
    }, {
      label: 'Name',
      value: 'name'
    }, {
      label: 'Original',
      value: 'none'
    }],
    default: 'valueDescending'
  },
  interpolation: {
    type: 'text',
    label: 'Curve type',
    default: 'curveBumpY',
    options: [{
      label: 'Basis',
      value: 'curveBasis'
    }, {
      label: 'Bump',
      value: 'curveBumpY'
    }, {
      label: 'Cardinal',
      value: 'curveCardinal'
    }, {
      label: 'Catmull–Rom',
      value: 'curveCatmullRom'
    }, {
      label: 'Linear',
      value: 'curveLinear'
    }, {
      label: 'Monotone Y',
      value: 'curveMonotoneY'
    }, {
      label: 'Natural',
      value: 'curveNatural'
    }, {
      label: 'Step',
      value: 'curveStep'
    }, {
      label: 'Step After',
      value: 'curveStepAfter'
    }, {
      label: 'Step Before',
      value: 'curveStepBefore'
    }],
    group: 'chart'
  },
  showDots: {
    type: 'boolean',
    label: 'Show dots on data values',
    default: false,
    group: 'chart'
  },
  dotsDiameter: {
    type: 'number',
    label: 'Dots diameter',
    disabled: {
      showDots: false
    },
    default: 2,
    group: 'chart'
  },
  showLegend: {
    type: 'boolean',
    label: 'Show legend',
    default: false,
    group: 'artboard'
  },
  legendWidth: {
    type: 'number',
    label: 'Legend width',
    default: 200,
    group: 'artboard',
    disabled: {
      showLegend: false
    },
    container: 'width',
    containerCondition: {
      showLegend: true
    }
  },
  colorScale: {
    type: 'colorScale',
    label: 'Color scale',
    dimension: 'color',
    default: {
      scaleType: 'ordinal',
      interpolator: 'schemeCategory10'
    },
    group: 'colors'
  }
};

var violinplot = {
  metadata: metadata$s,
  dimensions: dimensions$s,
  mapData: mapData$s,
  render: render$s,
  visualOptions: visualOptions$s,
  styles: styles$1
};

var img$U = "data:image/svg+xml,%3csvg id='rawgraphs-icons' xmlns='http://www.w3.org/2000/svg' width='56' height='56' viewBox='0 0 56 56'%3e %3cdefs%3e %3cstyle%3e .cls-1 %7b fill: %2395e5c0%3b %7d .cls-2 %7b fill: %2306c26c%3b %7d %3c/style%3e %3c/defs%3e %3cpolygon class='cls-1' points='25.65 29.708 33.838 33.541 35.881 27.129 25.356 21.205 25.476 24.666 25.476 24.666 25.65 29.708'/%3e %3cpolygon class='cls-2' points='34.57 48 37.663 37.539 37.078 37.266 37.078 37.266 34.47 36.045 34.47 36.046 24.745 31.493 22.25 33.081 24.727 48 34.57 48'/%3e %3cpolygon class='cls-1' points='37.927 35.454 48 40.169 48 22.979 36.884 27.273 34.75 33.968 35.318 34.234 35.318 34.234 37.926 35.455 37.927 35.454'/%3e %3cpolygon class='cls-1' points='8 39.776 21.921 30.919 21.921 30.919 23.653 29.817 23.455 24.112 8 22.684 8 39.776'/%3e %3cpolygon class='cls-2' points='21.334 33.664 21.308 33.681 21.307 33.68 8 42.147 8 48 23.713 48 21.334 33.664'/%3e %3cpolygon class='cls-1' points='25.315 20.035 36.52 26.341 48 21.907 48 8 24.899 8 25.315 20.035'/%3e %3cpolygon class='cls-2' points='38.579 37.968 35.612 48 48 48 48 42.378 38.579 37.968'/%3e %3cpolygon class='cls-1' points='23.42 23.104 23.407 22.736 23.407 22.736 22.898 8 8 8 8 21.68 23.42 23.104'/%3e%3c/svg%3e";

var img$V = "data:image/svg+xml,%3csvg id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' width='320' height='160' viewBox='0 0 320 160'%3e %3cdefs%3e %3cstyle%3e .cls-1 %7b fill: white%3b %7d .cls-2 %7b fill: %23a0d9a3%3b %7d .cls-10%2c .cls-11%2c .cls-12%2c .cls-2%2c .cls-3%2c .cls-4%2c .cls-5%2c .cls-6%2c .cls-7%2c .cls-8%2c .cls-9 %7b stroke: white%3b %7d .cls-3 %7b fill: %234ba0b1%3b %7d .cls-4 %7b fill: %235e4fa2%3b %7d .cls-5 %7b fill: %239e0142%3b %7d .cls-6 %7b fill: %23e1524a%3b %7d .cls-7 %7b fill: %23fba35e%3b %7d .cls-8 %7b fill: %23fee89a%3b %7d .cls-9 %7b fill: %23ebf7a6%3b %7d .cls-10%2c .cls-11%2c .cls-12 %7b fill: none%3b %7d .cls-10 %7b stroke-width: 2px%3b %7d .cls-11 %7b stroke-width: 3px%3b %7d .cls-12 %7b stroke-width: 4px%3b %7d .cls-13%2c .cls-14%2c .cls-15 %7b isolation: isolate%3b %7d .cls-14%2c .cls-15 %7b font-size: 10px%3b font-family: Helvetica%3b %7d .cls-15 %7b letter-spacing: -0.03662em%3b %7d %3c/style%3e %3c/defs%3e %3crect id='background' class='cls-1' width='320' height='160'/%3e %3cg id='viz'%3e %3cg id='cells'%3e %3cpath class='cls-2' d='M217.91072%2c0l3.25015%2c46.58606L320%2c20.35637V0Z'/%3e %3cpath id='F' class='cls-3' d='M249.89369%2c86.99118l-4.321-46.88346-24.41181%2c6.47834%2c2.62427%2c37.615Z'/%3e %3cpath class='cls-3' d='M245.57268%2c40.10772l4.321%2c46.88346L320%2c94.48325V20.35637Z'/%3e %3cpath id='U' class='cls-4' d='M229.07338%2c160h49.51979L265.483%2c109.02322l-39.69063%2c3.949Z'/%3e %3cpath id='V' class='cls-4' d='M225.7924%2c112.97219l39.69063-3.949%2c10.362-19.25869L223.78514%2c84.201Z'/%3e %3cpath class='cls-4' d='M275.845%2c89.76453l-10.362%2c19.25869L278.59317%2c160H320V94.48325Z'/%3e %3cpath id='N' class='cls-5' d='M153.07951%2c0l5.271%2c30.11477L218.20277%2c4.186%2c217.91072%2c0Z'/%3e %3cpath class='cls-5' d='M121.29969%2c46.16569l37.0508-16.05092L153.07951%2c0H102.5489L97.10481%2c36.20037Z'/%3e %3cpath id='O' class='cls-6' d='M121.29969%2c46.16569l3.807%2c15.48685L221.84%2c56.31982%2c218.20277%2c4.186Z'/%3e %3cpath class='cls-6' d='M229.07338%2c160%2c221.84%2c56.31982l-96.73333%2c5.33272L149.28221%2c160Z'/%3e %3cpath id='P' class='cls-7' d='M86.77927%2c104.86l48.50615-1.79961L121.29969%2c46.16569%2c97.10481%2c36.20037Z'/%3e %3cpath class='cls-7' d='M78.48689%2c160h70.79532l-13.99679-56.93965L86.77927%2c104.86Z'/%3e %3cpath id='Q' class='cls-8' d='M101.26022%2c0H31.28686L66.53431%2c70.5893%2c90.29607%2c72.906Z'/%3e %3cpath class='cls-8' d='M67.823%2c70.5893%2c32.57554%2c0H0V63.97677Z'/%3e %3cpath class='cls-9' d='M0%2c137.739l66.337-11.16227%2c5.75427-55.57128L0%2c63.97677Z'/%3e %3cpath id='R' class='cls-9' d='M72.09129%2c71.00545%2c66.337%2c126.57673l15.17877%2c13.28263L91.58475%2c72.906Z'/%3e %3cpath id='S' class='cls-9' d='M78.48689%2c160l3.0289-20.14064L66.337%2c126.57673%2c0%2c137.739V160Z'/%3e %3cpath id='I' class='cls-10' d='M221.16087%2c46.58606%2c320%2c20.35637V0H217.91072Z'/%3e %3cpath id='L' class='cls-10' d='M320%2c20.35637%2c221.16087%2c46.58606l2.62427%2c37.615L320%2c94.48325Z'/%3e %3cpath id='M' class='cls-10' d='M320%2c160V94.48325L223.78514%2c84.201%2c229.07338%2c160Z'/%3e %3cpath id='D' class='cls-10' d='M217.91072%2c0H102.5489L97.10481%2c36.20037l24.19488%2c9.96532L218.20277%2c4.186Z'/%3e %3cpath id='E' class='cls-10' d='M218.20277%2c4.186%2c121.29969%2c46.16569%2c149.28221%2c160h79.79117Z'/%3e %3cpath id='F-2' data-name='F' class='cls-10' d='M149.28221%2c160%2c121.29969%2c46.16569%2c97.10481%2c36.20037%2c78.48689%2c160Z'/%3e %3cpath id='G' class='cls-10' d='M0%2c0V63.97677L91.58475%2c72.906%2c102.5489%2c0Z'/%3e %3cpath id='H' class='cls-10' d='M91.58475%2c72.906%2c0%2c63.97677V160H78.48689Z'/%3e %3cpath id='A' class='cls-11' d='M320%2c0H217.91072l11.16266%2c160H320Z'/%3e %3cpath id='B' class='cls-11' d='M102.5489%2c0l-24.062%2c160H229.07338L217.91072%2c0Z'/%3e %3cpath id='C' class='cls-11' d='M78.48689%2c160%2c102.5489%2c0H0V160Z'/%3e %3cpath class='cls-12' d='M0%2c0V160H320V0Z'/%3e %3c/g%3e %3cg id='labels'%3e %3cg class='cls-13'%3e %3ctext class='cls-14' transform='translate(259.50024 20.35635)'%3eI%3c/text%3e %3c/g%3e %3cg class='cls-13'%3e %3ctext class='cls-15' transform='translate(231.99979 69.25293)'%3eL%3c/text%3e %3c/g%3e %3cg class='cls-13'%3e %3ctext class='cls-15' transform='translate(280.76285 63.97699)'%3eL%3c/text%3e %3c/g%3e %3cg class='cls-13'%3e %3ctext class='cls-14' transform='translate(245.84453 139.85962)'%3eM%3c/text%3e %3c/g%3e %3cg class='cls-13'%3e %3ctext class='cls-14' transform='translate(242.52585 103.06012)'%3eM%3c/text%3e %3c/g%3e %3cg class='cls-13'%3e %3ctext class='cls-14' transform='translate(289.59265 131.5304)'%3eM%3c/text%3e %3c/g%3e %3cg class='cls-13'%3e %3ctext class='cls-14' transform='translate(170.00024 15.05737)'%3eD%3c/text%3e %3c/g%3e %3cg class='cls-13'%3e %3ctext class='cls-14' transform='translate(125.10663 23.29276)'%3eD%3c/text%3e %3c/g%3e %3cg class='cls-13'%3e %3ctext class='cls-14' transform='translate(176.81143 46.16534)'%3eE%3c/text%3e %3c/g%3e %3cg class='cls-13'%3e %3ctext class='cls-14' transform='translate(181.91458 107.41504)'%3eE%3c/text%3e %3c/g%3e %3cg class='cls-13'%3e %3ctext class='cls-14' transform='translate(104.93845 80.00031)'%3eF%3c/text%3e %3c/g%3e %3cg class='cls-13'%3e %3ctext class='cls-14' transform='translate(110.49994 134.51129)'%3eF%3c/text%3e %3c/g%3e %3cg class='cls-13'%3e %3ctext class='cls-14' transform='translate(67.82294 30.11441)'%3eG%3c/text%3e %3c/g%3e %3cg class='cls-13'%3e %3ctext class='cls-14' transform='translate(23.29321 42.90967)'%3eG%3c/text%3e %3c/g%3e %3cg class='cls-13'%3e %3ctext class='cls-14' transform='translate(31.28674 100.85803)'%3eH%3c/text%3e %3c/g%3e %3cg class='cls-13'%3e %3ctext class='cls-14' transform='translate(73.28812 104.86041)'%3eH%3c/text%3e %3c/g%3e %3cg class='cls-13'%3e %3ctext class='cls-14' transform='translate(43.99997 149.49066)'%3eH%3c/text%3e %3c/g%3e %3c/g%3e %3c/g%3e%3c/svg%3e";

const metadata$t = {
  name: 'Treemap (Voronoi)',
  id: 'rawgraphs.voronoitreemap',
  thumbnail: img$V,
  icon: img$U,
  categories: ['hierarchies', 'proportions'],
  description: 'It displays hierarchically structured data and a related quantitative dimension. It is composed of an area divided into small cells, representing the last level of the tree structure, computed using the Voronoi tessellation. The cells’ size depends on the quantitative dimension. the dimensions are calculated iteratively, therefore area could be not fully representative of the mapped value.',
  code: 'https://github.com/rawgraphs/rawgraphs-charts/tree/master/src/treemap',
  tutorial: 'https://rawgraphs.io/learning/how-to-make-a-treemap/'
};

const dimensions$t = [{
  id: 'hierarchy',
  name: 'Hierarchy',
  validTypes: ['number', 'date', 'string'],
  required: true,
  multiple: true
}, {
  id: 'size',
  name: 'Size',
  validTypes: ['number'],
  required: false,
  aggregation: true,
  aggregationDefault: 'sum'
}, {
  id: 'color',
  name: 'Color',
  validTypes: ['number', 'date', 'string'],
  required: false,
  aggregation: true,
  aggregationDefault: {
    number: 'sum',
    string: 'csvDistinct',
    date: 'csvDistinct'
  }
}, {
  id: 'label',
  name: 'Label',
  validTypes: ['number', 'date', 'string'],
  required: false,
  multiple: true,
  aggregation: true,
  aggregationDefault: 'csvDistinct'
}];

const mapData$t = function (data, mapping, dataTypes, dimensions) {
  const colorAggregator = getDimensionAggregator('color', mapping, dataTypes, dimensions);
  const sizeAggregator = getDimensionAggregator('size', mapping, dataTypes, dimensions);
  const labelAggregators = getDimensionAggregator('label', mapping, dataTypes, dimensions); // add the non-compulsory dimensions.

  if (!('color' in mapping)) mapping.color = {
    value: undefined
  };
  if (!('size' in mapping)) mapping.size = {
    value: undefined
  };
  if (!('label' in mapping)) mapping.label = {
    value: undefined
  };
  const results = [];
  rollups(data, v => {
    const item = {
      hierarchy: new Map(mapping.hierarchy.value.map(d => [d, v[0][d]])),
      //get the first one since it's grouped
      size: mapping.size.value ? sizeAggregator(v.map(d => d[mapping.size.value])) : v.length,
      color: mapping.color.value ? colorAggregator(v.map(d => d[mapping.color.value])) : 'cells color',
      label: mapping.label.value ? mapping.label.value.map((label, i) => {
        return labelAggregators[i](v.map(d => d[label]));
      }) : undefined // create array of strings

    };
    results.push(item);
    return item;
  }, ...mapping.hierarchy.value.map(level => d => d[level]) // create a grouping for each level of the hierarchy
  );
  return results;
};

/*
Credits:
Inspired by https://observablehq.com/@d3/treemap
*/

function render$t(svgNode, data, visualOptions, mapping, originalData, styles) {
  const {
    // artboard
    width,
    height,
    background,
    // margins
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    // legend
    showLegend,
    legendWidth,
    // colors
    colorScale,
    // chart options
    seed,
    padding,
    clipToPolygon,
    rotation,
    edges,
    isRegular,
    // labels
    showLabelsOutline,
    //showHierarchyLabels,
    labelStyles
  } = visualOptions;
  const margin = {
    top: marginTop,
    right: marginRight,
    bottom: marginBottom,
    left: marginLeft
  };
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom; // create the hierarchical structure

  const nest = rollup(data, v => v[0], ...mapping.hierarchy.value.map(level => d => d.hierarchy.get(level)));
  const hierarchy$1 = hierarchy(nest).sum(d => d[1] instanceof Map ? 0 : d[1].size); // since maps have a .size porperty in native javascript, sum only values for leaves, and not for Maps
  // sets the pseudorandom number generator which is used when randomness is required
  // this will produce repeatible repeatable results

  const random = randomNormal.source(randomLcg(seed))(0, 1);
  let voronoiTreemap$1 = voronoiTreemap().prng(random); // set the minimum weight ratio to zero to get more proportional areas

  voronoiTreemap$1.minWeightRatio(0);

  if (clipToPolygon) {
    // create the points
    let points = range(edges).map(i => {
      const rad = rotation * Math.PI / 180 + i / edges * 2 * Math.PI;
      return [Math.cos(rad), Math.sin(rad)];
    }); //calculatet scales

    let hscale = scaleLinear().domain(extent(points, d => d[0])).range([-chartWidth / 2, chartWidth / 2]);
    let vscale = scaleLinear().domain(extent(points, d => d[1])).range([-chartHeight / 2, chartHeight / 2]); // create the shape

    let clipShape = points.map(d => {
      return isRegular ? chartHeight > chartWidth ? // if user asks for a regular polygon,
      // use the scale of tthe shortest dimension
      [hscale(d[0]), hscale(d[1])] : [vscale(d[0]), vscale(d[1])] : // else use the two separate scales
      [hscale(d[0]), vscale(d[1])];
    }); // use clipping

    voronoiTreemap$1.clip(clipShape);
  } else {
    voronoiTreemap$1.size([chartWidth, chartHeight]);
  } // compute the tesselation


  voronoiTreemap$1(hierarchy$1); // get nodes

  let allNodes = hierarchy$1.descendants().sort((a, b) => ascending(a.height, b.height)); // @TODO understand how to place labels for hierarchical cells
  // below the old code for normal treemaps
  // if (showHierarchyLabels) {
  //   treemap.paddingTop(12)
  // }
  // add background

  select(svgNode).append('rect').attr('width', showLegend ? width + legendWidth : width).attr('height', height).attr('x', 0).attr('y', 0).attr('fill', background).attr('id', 'background');
  const svg = select(svgNode).append('g').attr('id', 'viz') // translate to the center
  .attr('transform', clipToPolygon ? 'translate(' + (margin.left + chartWidth / 2) + ',' + (margin.top + chartHeight / 2) + ')' : 'translate(' + margin.left + ',' + margin.top + ')'); // draw cells

  svg.append('g').attr('id', 'cells').selectAll('path').data(allNodes).enter().append('path') // d.polygon is the computed Voronoï cell encoding the relative weight of underlying original data
  .attr('d', d => line()(d.polygon) + 'z').attr('fill', d => d.height > 0 ? 'none' : colorScale(d.data[1].color)).attr('stroke', background).attr('stroke-width', d => (d.height + 1) * padding).attr('id', d => d.data[0]); // draw labels

  let labels = svg.append('g').attr('id', 'labels').selectAll('text').data(allNodes.filter(d => d.height === 0)).enter().append('text').attr('text-anchor', 'middle').attr('dominant-baseline', 'text-before-edge');
  labels.selectAll('tspan').data((d, i, a) => {
    return Array.isArray(d.data[1].label) ? d.data[1].label : [d.data[1].label];
  }).join('tspan').attr('x', 3).attr('y', (d, i) => i * 1.1 + 0.2 + 'em').text((d, i) => {
    if (d && mapping.label.dataType[i].type === 'date') {
      return timeFormat(dateFormats$1[mapping.label.dataType[i].dateFormat])(d);
    } else {
      return d;
    }
  }).styles((d, i) => styles[labelStyles[i]]); // align labels to the center of polygon

  labels.call(sel => {
    return sel.attr('transform', d => {
      const height = sel.node().getBBox().height;
      return 'translate(' + d.polygon.site.x + ',' + (d.polygon.site.y - height / 2) + ')';
    });
  });

  if (showLabelsOutline) {
    // NOTE: Adobe Illustrator does not support paint-order attr
    labels.styles(styles.labelOutline);
  }

  if (showLegend) {
    const legendLayer = select(svgNode).append('g').attr('id', 'legend').attr('transform', `translate(${width},${marginTop})`);
    const chartLegend = legend().legendWidth(legendWidth);

    if (mapping.color.value) {
      chartLegend.addColor(mapping.color.value, colorScale);
    }

    legendLayer.call(chartLegend);
  }
}

const visualOptions$t = {
  marginTop: {
    type: 'number',
    label: 'Margin (top)',
    default: 10,
    group: 'artboard'
  },
  marginRight: {
    type: 'number',
    label: 'Margin (right)',
    default: 10,
    group: 'artboard'
  },
  marginBottom: {
    type: 'number',
    label: 'Margin (bottom)',
    default: 10,
    group: 'artboard'
  },
  marginLeft: {
    type: 'number',
    label: 'Margin (left)',
    default: 10,
    group: 'artboard'
  },
  showLegend: {
    type: 'boolean',
    label: 'Show legend',
    default: false,
    group: 'artboard'
  },
  legendWidth: {
    type: 'number',
    label: 'Legend width',
    default: 200,
    group: 'artboard',
    disabled: {
      showLegend: false
    },
    container: 'width',
    containerCondition: {
      showLegend: true
    }
  },
  seed: {
    type: 'number',
    label: 'Seed for random computations',
    default: 0,
    // step: 0.1,
    // min: 0,
    // max: 1,
    group: 'chart'
  },
  padding: {
    type: 'number',
    label: 'Padding',
    default: 2,
    group: 'chart'
  },
  clipToPolygon: {
    type: 'boolean',
    label: 'Clip to polygon',
    default: true,
    group: 'chart'
  },
  edges: {
    type: 'number',
    label: 'Polygon edges',
    default: 3,
    min: 3,
    group: 'chart',
    disabled: {
      clipToPolygon: false
    }
  },
  rotation: {
    type: 'number',
    label: 'Polygon rotation',
    default: 0,
    min: 0,
    max: 360,
    group: 'chart',
    disabled: {
      clipToPolygon: false
    }
  },
  isRegular: {
    type: 'boolean',
    label: 'Regular polygon',
    default: true,
    disabled: {
      clipToPolygon: false
    },
    group: 'chart'
  },
  colorScale: {
    type: 'colorScale',
    label: 'Color scale',
    dimension: 'color',
    default: {
      scaleType: 'ordinal',
      interpolator: 'interpolateSpectral'
    },
    group: 'colors'
  },
  labelStyles: {
    type: 'text',
    label: 'Label',
    group: 'labels',
    options: [{
      label: 'Primary',
      value: 'labelPrimary'
    }, {
      label: 'Secondary',
      value: 'labelSecondary'
    }, {
      label: 'Italic',
      value: 'labelItalic'
    }],
    default: 'labelPrimary',
    repeatFor: 'label',
    repeatDefault: ['labelPrimary', 'labelSecondary', 'labelItalic']
  },
  showLabelsOutline: {
    type: 'boolean',
    label: 'Show outline',
    default: false,
    group: 'labels'
  } // showHierarchyLabels: {
  //   type: 'boolean',
  //   label: 'Show hierarchy labels',
  //   default: false,
  //   group: 'labels',
  // },

};

var voronoitreemap = {
  metadata: metadata$t,
  dimensions: dimensions$t,
  mapData: mapData$t,
  render: render$t,
  visualOptions: visualOptions$t,
  styles: styles$1
};

var img$W = "data:image/svg+xml,%3csvg id='rawgraphs-icons' xmlns='http://www.w3.org/2000/svg' width='56' height='56' viewBox='0 0 56 56'%3e %3cdefs%3e %3cstyle%3e .cls-1 %7b fill: %2395e5c0%3b %7d .cls-2 %7b fill: %2306c26c%3b %7d %3c/style%3e %3c/defs%3e %3cg id='secundary'%3e %3cpath class='cls-1' d='M25.25%2c11H11v8.57l8.2656-.5908ZM18%2c14a1%2c1%2c0%2c1%2c1%2c1-1A1%2c1%2c0%2c0%2c1%2c18%2c14Z'/%3e %3cpath class='cls-1' d='M23.5752%2c23.667l-4.2188-3.6914L11%2c20.5732V33.5518L19.5889%2c37.62ZM19%2c26a1%2c1%2c0%2c1%2c1%2c1%2c1A1%2c1%2c0%2c0%2c1%2c19%2c26Z'/%3e %3cpath class='cls-1' d='M33.8789%2c30.4365%2c30.0166%2c24H24.52L20.4717%2c38.1689%2c23.79%2c41.292l9.7657-8.2627ZM26%2c29a1%2c1%2c0%2c1%2c1%2c1-1A1%2c1%2c0%2c0%2c1%2c26%2c29Z'/%3e %3cpath class='cls-1' d='M24.3076%2c42.1641%2c24.7275%2c45H45V38.8223L34.1084%2c33.8711ZM37%2c40a1%2c1%2c0%2c1%2c1-1%2c1A1%2c1%2c0%2c0%2c1%2c37%2c40Z'/%3e %3cpath class='cls-1' d='M34.5693%2c32.9824%2c45%2c37.7236V23L34.8662%2c30.6ZM42%2c30a1%2c1%2c0%2c1%2c1-1%2c1A1%2c1%2c0%2c0%2c1%2c42%2c30Z'/%3e %3c/g%3e %3cg id='primary'%3e %3cpath class='cls-2' d='M19.6221%2c38.7422%2c11%2c34.6582V45H23.7168l-.4131-2.793ZM13%2c44a1%2c1%2c0%2c1%2c1%2c1-1A1%2c1%2c0%2c0%2c1%2c13%2c44Z'/%3e %3cpath class='cls-2' d='M24.33%2c23h5.6308l4.4219-11.0527L33.9834%2c11H26.5l-6.2939%2c8.3906ZM26%2c18a1%2c1%2c0%2c1%2c1-1%2c1A1%2c1%2c0%2c0%2c1%2c26%2c18Z'/%3e %3cpath class='cls-2' d='M30.8564%2c23.4551l3.6836%2c6.14L45%2c21.75V20.125l-9.8555-7.3916ZM36%2c22a1%2c1%2c0%2c1%2c1-1%2c1A1%2c1%2c0%2c0%2c1%2c36%2c22Z'/%3e %3cpath class='cls-2' d='M35.0684%2c11l.2627.624L45%2c18.875V11ZM43%2c14a1%2c1%2c0%2c1%2c1%2c1-1A1%2c1%2c0%2c0%2c1%2c43%2c14Z'/%3e %3cpolygon class='cls-2' points='46.305 46.805 44.865 46.805 46.061 48 8 48 8 9.939 9.195 11.135 9.195 9.695 7.5 8 5.805 9.695 5.805 11.135 7 9.939 7 49 46.061 49 44.865 50.195 46.305 50.195 48 48.5 46.305 46.805'/%3e %3c/g%3e%3c/svg%3e";

var img$X = "data:image/svg+xml,%3csvg id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' width='320' height='160' viewBox='0 0 320 160'%3e %3cdefs%3e %3cstyle%3e .cls-1 %7b fill: white%3b %7d .cls-2 %7b fill: %23e0f3a1%3b %7d .cls-3 %7b fill: %2369bda9%3b %7d .cls-4 %7b fill: %23fedd8d%3b %7d .cls-5 %7b fill: %23f0704a%3b %7d .cls-6 %7b fill: %235e4fa2%3b %7d .cls-7 %7b fill: %239e0142%3b %7d .cls-8 %7b fill: none%3b stroke: black%3b %7d .cls-9 %7b isolation: isolate%3b font-size: 10px%3b font-family: Helvetica%3b %7d %3c/style%3e %3c/defs%3e %3cg%3e %3crect id='background' class='cls-1' width='320' height='160'/%3e %3cg id='visualization'%3e %3cg id='cells'%3e %3cpath class='cls-2' d='M319%2c1V54.4412L267.5993%2c18.1583%2c260.1852%2c1Z'/%3e %3cpath class='cls-3' d='M145.007%2c68.9414l7.4162%2c19.3961L90.7516%2c136.3044%2c81.3991%2c82.74l49.3273-19.731Z'/%3e %3cpath class='cls-2' d='M20%2c144V111.25L79.7192%2c81.39l1.68%2c1.35%2c9.3525%2c53.564L89.2857%2c144Z'/%3e %3cpath class='cls-4' d='M20%2c5.5484l41.8217%2c44.52-.3723%2c5.36L20%2c72.7791Z'/%3e %3cpath class='cls-3' d='M121.6667%2c1l-2.0941%2c43.9749L82.8113%2c27.3294%2c88.49%2c1Z'/%3e %3cpath class='cls-5' d='M285.6471%2c144l1.2734-9.2782L319%2c119.5263V144Z'/%3e %3cpath class='cls-5' d='M130.7264%2c63.0094%2c81.3991%2c82.74l-1.68-1.35-18.27-25.9623.3723-5.36%2c20.99-22.7388%2c36.7613%2c17.6455%2c8.07%2c11.0965Z'/%3e %3cpath class='cls-5' d='M200.2947%2c41.1884%2c251.2%2c1h8.9852l7.4141%2c17.1583-25.0737%2c70.52-17.4634%2c6.5488Z'/%3e %3cpath class='cls-2' d='M89.2857%2c144l1.4659-7.6956%2c61.6716-47.9669%2c46.8611%2c41.5561L198.72%2c144Z'/%3e %3cpath class='cls-6' d='M242.5256%2c88.6779l33.4816%2c7.8472%2c10.9133%2c38.1967L285.6471%2c144H198.72l.5643-14.1064%2c25.7779-34.6669Z'/%3e %3cpath class='cls-6' d='M319%2c74.2019v45.3244l-32.0795%2c15.1955L276.0072%2c96.5251Z'/%3e %3cpath class='cls-5' d='M165.9153%2c1%2c177.82%2c34.4459%2c145.007%2c68.9414l-14.2806-5.932-3.0835-6.938L146%2c1Z'/%3e %3cpath class='cls-3' d='M20%2c72.7791l41.4494-17.351L79.7192%2c81.39%2c20%2c111.25Z'/%3e %3cpath class='cls-6' d='M146%2c1%2c127.6429%2c56.0714l-8.07-11.0965L121.6667%2c1Z'/%3e %3cpath class='cls-4' d='M242.5256%2c88.6779l25.0737-70.52L319%2c54.4412V74.2019L276.0072%2c96.5251Z'/%3e %3cpath class='cls-7' d='M20%2c1H88.49L82.8113%2c27.3294l-20.99%2c22.7388L20%2c5.5484Z'/%3e %3cpath class='cls-4' d='M200.2947%2c41.1884l24.7675%2c54.0383-25.7779%2c34.6669L152.4232%2c88.3375%2c145.007%2c68.9414%2c177.82%2c34.4459Z'/%3e %3cpath class='cls-4' d='M251.2%2c1%2c200.2947%2c41.1884%2c177.82%2c34.4459%2c165.9153%2c1Z'/%3e %3c/g%3e %3cg%3e %3ccircle cx='313' cy='12' r='2'/%3e %3ccircle cx='116' cy='95' r='2'/%3e %3ccircle cx='53' cy='106' r='2'/%3e %3ccircle cx='26' cy='45' r='2'/%3e %3ccircle cx='110' cy='25' r='2'/%3e %3ccircle cx='313' cy='134' r='2'/%3e %3ccircle cx='98' cy='50' r='2'/%3e %3ccircle cx='232' cy='47' r='2'/%3e %3ccircle cx='137' cy='122' r='2'/%3e %3ccircle cx='262' cy='127' r='2'/%3e %3ccircle cx='304' cy='115' r='2'/%3e %3ccircle cx='143' cy='30' r='2'/%3e %3ccircle cx='44' cy='88' r='2'/%3e %3ccircle cx='131' cy='26' r='2'/%3e %3ccircle cx='277' cy='63' r='2'/%3e %3ccircle cx='59' cy='14' r='2'/%3e %3ccircle cx='184' cy='69' r='2'/%3e %3ccircle cx='202' cy='9' r='2'/%3e %3c/g%3e %3cg id='axis'%3e %3cg%3e %3cpath class='cls-8' d='M20.5%2c150v-5.5h299V150'/%3e %3cg%3e %3cline class='cls-8' x1='20.5' y1='144' x2='20.5' y2='150'/%3e %3ctext class='cls-9' transform='translate(17.7192 160.1)'%3e0%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-8' x1='50.5' y1='144' x2='50.5' y2='150'/%3e %3ctext class='cls-9' transform='translate(44.9385 160.1)'%3e10%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-8' x1='80.5' y1='144' x2='80.5' y2='150'/%3e %3ctext class='cls-9' transform='translate(74.9385 160.1)'%3e20%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-8' x1='110.5' y1='144' x2='110.5' y2='150'/%3e %3ctext class='cls-9' transform='translate(104.9385 160.1)'%3e30%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-8' x1='140.5' y1='144' x2='140.5' y2='150'/%3e %3ctext class='cls-9' transform='translate(134.9385 160.1)'%3e40%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-8' x1='170.5' y1='144' x2='170.5' y2='150'/%3e %3ctext class='cls-9' transform='translate(164.9385 160.1)'%3e50%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-8' x1='199.5' y1='144' x2='199.5' y2='150'/%3e %3ctext class='cls-9' transform='translate(193.9385 160.1)'%3e60%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-8' x1='229.5' y1='144' x2='229.5' y2='150'/%3e %3ctext class='cls-9' transform='translate(223.9385 160.1)'%3e70%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-8' x1='259.5' y1='144' x2='259.5' y2='150'/%3e %3ctext class='cls-9' transform='translate(253.9385 160.1)'%3e80%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-8' x1='289.5' y1='144' x2='289.5' y2='150'/%3e %3ctext class='cls-9' transform='translate(283.9385 160.1)'%3e90%3c/text%3e %3c/g%3e %3cline class='cls-8' x1='319.5' y1='144' x2='319.5' y2='150'/%3e %3c/g%3e %3cg%3e %3cpath class='cls-8' d='M14%2c144.5h6.5V1.5H14'/%3e %3cg%3e %3cline class='cls-8' x1='20' y1='144.5' x2='14' y2='144.5'/%3e %3ctext class='cls-9' transform='translate(5.4385 147.7)'%3e0%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-8' x1='20' y1='128.5' x2='14' y2='128.5'/%3e %3ctext class='cls-9' transform='translate(-0.123 131.7)'%3e10%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-8' x1='20' y1='112.5' x2='14' y2='112.5'/%3e %3ctext class='cls-9' transform='translate(-0.123 115.7)'%3e20%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-8' x1='20' y1='96.5' x2='14' y2='96.5'/%3e %3ctext class='cls-9' transform='translate(-0.123 99.7)'%3e30%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-8' x1='20' y1='80.5' x2='14' y2='80.5'/%3e %3ctext class='cls-9' transform='translate(-0.123 83.7)'%3e40%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-8' x1='20' y1='65.5' x2='14' y2='65.5'/%3e %3ctext class='cls-9' transform='translate(-0.123 68.7)'%3e50%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-8' x1='20' y1='49.5' x2='14' y2='49.5'/%3e %3ctext class='cls-9' transform='translate(-0.123 52.7)'%3e60%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-8' x1='20' y1='33.5' x2='14' y2='33.5'/%3e %3ctext class='cls-9' transform='translate(-0.123 36.7)'%3e70%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-8' x1='20' y1='17.5' x2='14' y2='17.5'/%3e %3ctext class='cls-9' transform='translate(-0.123 20.7)'%3e80%3c/text%3e %3c/g%3e %3cline class='cls-8' x1='20' y1='1.5' x2='14' y2='1.5'/%3e %3c/g%3e %3c/g%3e %3c/g%3e %3c/g%3e%3c/svg%3e";

const metadata$u = {
  name: 'Voronoi Diagram',
  id: 'rawgraphs.voronoidiagram',
  thumbnail: img$X,
  icon: img$W,
  categories: ['Correlations'],
  description: 'It creates the minimum area around each point defined by two variables. When applied to a scatterplot, it is useful to show the distance between points.',
  code: 'https://github.com/rawgraphs/rawgraphs-charts/tree/master/src/voronoidiagram',
  tutorial: 'https://rawgraphs.io/learning/how-to-make-a-voronoi-diagram/'
};

const dimensions$u = [{
  id: 'x',
  name: 'X Axis',
  validTypes: ['number', 'date'],
  required: true
}, {
  id: 'y',
  name: 'Y Axis',
  validTypes: ['number', 'date'],
  required: true
}, {
  id: 'color',
  name: 'Color',
  validTypes: ['number', 'date', 'string'],
  required: false
}, {
  id: 'label',
  name: 'Label',
  validTypes: ['number', 'date', 'string'],
  required: false,
  multiple: true
}];

const mapData$u = {
  x: 'get',
  y: 'get',
  color: 'get',
  label: 'get'
};

function render$u(node, data, visualOptions, mapping, originalData, styles) {
  const {
    width,
    height,
    background,
    xOrigin,
    yOrigin,
    showStroke,
    showPoints,
    dotsDiameter,
    showLegend,
    legendWidth,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    colorScale,
    showLabelsOutline,
    autoHideLabels,
    labelStyles
  } = visualOptions;
  const margin = {
    top: marginTop,
    right: marginRight,
    bottom: marginBottom,
    left: marginLeft
  };
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom; // select the SVG element

  const svg = select(node);
  svg.append('rect').attr('width', showLegend ? width + legendWidth : width).attr('height', height).attr('x', 0).attr('y', 0).attr('fill', background).attr('id', 'background'); // scales
  // x scale

  const xDomain = xOrigin ? [0, max(data, d => d.x)] : extent(data, d => d.x);
  const xScale = mapping.x.dataType.type === 'date' ? scaleTime() : scaleLinear();
  xScale.domain(xDomain).rangeRound([0, chartWidth]).nice(); // y scale

  const yDomain = yOrigin ? [0, max(data, d => d.y)] : extent(data, d => d.y);
  const yScale = mapping.y.dataType.type === 'date' ? scaleTime() : scaleLinear();
  yScale.domain(yDomain).rangeRound([chartHeight, 0]).nice(); // axes

  const xAxis = g => {
    return g.attr('transform', `translate(0,${chartHeight})`).call(axisBottom(xScale)).call(g => g.append('text').attr('x', chartWidth).attr('dy', -5).attr('text-anchor', 'end').text(mapping['x'].value).styles(styles.axisLabel));
  };

  const yAxis = g => {
    return g.call(axisLeft(yScale)).call(g => g.append('text').attr('x', 4).attr('text-anchor', 'start').attr('dominant-baseline', 'hanging').text(mapping['y'].value).styles(styles.axisLabel));
  };

  const vizLayer = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')').attr('id', 'visualization');
  let points = data.map(d => [xScale(d.x), yScale(d.y)]);
  const delaunay = Delaunay.from(points);
  const voronoi = delaunay.voronoi([0, 0, chartWidth, chartHeight]);
  vizLayer.append('g').attr('id', 'cells').attr('stroke', showStroke ? '#ccc' : null).selectAll('path').data(points).join('path').attr('fill', (d, i) => colorScale(data[i].color)).attr('d', (d, i) => voronoi.renderCell(i));

  if (showPoints) {
    vizLayer.append('g').selectAll('cicle').data(data).join('circle').attr('cx', d => xScale(d.x)).attr('cy', d => yScale(d.y)).attr('r', dotsDiameter / 2).attr('fill', 'black');
  }

  const axisLayer = vizLayer.append('g').attr('id', 'axis');
  axisLayer.append('g').call(xAxis);
  axisLayer.append('g').call(yAxis);
  const labelsLayer = vizLayer.append('g').attr('id', 'labels');
  labelsLayer.selectAll('g').data(mapping.label.value ? data : []).join('g').attr('transform', d => `translate(${xScale(d.x)},${yScale(d.y)})`).append('text').attr('x', 0).attr('y', 0).attr('test', d => {
    console.log(d);
  }).attr('text-anchor', 'middle').attr('dominant-baseline', 'text-before-edge').selectAll('tspan').data(d => Array.isArray(d.label) ? d.label : [d.label]).join('tspan').attr('x', 0).attr('y', 0).attr('dy', (d, i) => i * 12).text((d, i) => {
    if (d && mapping.label.dataType[i].type === 'date') {
      return timeFormat(dateFormats$1[mapping.label.dataType[i].dateFormat])(d);
    } else {
      return d;
    }
  }).styles((d, i) => styles[labelStyles[i]]);
  labelsLayer.selectAll('text').call(sel => {
    return sel.attr('transform', function (d) {
      const height = sel.node().getBBox().height;
      return `translate(0,${showPoints ? -height - dotsDiameter / 2 - 2 : -height / 2})`;
    });
  });

  if (showLabelsOutline) {
    // NOTE: Adobe Illustrator does not support paint-order attr
    labelsLayer.selectAll('text').styles(styles.labelOutline);
  }

  if (autoHideLabels) {
    labelsOcclusion(labelsLayer.selectAll('text'), d => d.size);
  }

  if (showLegend) {
    const legendLayer = svg.append('g').attr('id', 'legend').attr('transform', `translate(${width},${marginTop})`);
    const chartLegend = legend().legendWidth(legendWidth);

    if (mapping.color.value) {
      chartLegend.addColor(mapping.color.value, colorScale);
    }

    legendLayer.call(chartLegend);
  }
}

const visualOptions$u = {
  marginTop: {
    type: 'number',
    label: 'Margin (top)',
    default: 50,
    group: 'artboard'
  },
  marginRight: {
    type: 'number',
    label: 'Margin (right)',
    default: 50,
    group: 'artboard'
  },
  marginBottom: {
    type: 'number',
    label: 'Margin (bottom)',
    default: 50,
    group: 'artboard'
  },
  marginLeft: {
    type: 'number',
    label: 'Margin (left)',
    default: 50,
    group: 'artboard'
  },
  showLegend: {
    type: 'boolean',
    label: 'Show legend',
    default: false,
    group: 'artboard'
  },
  legendWidth: {
    type: 'number',
    label: 'Legend width',
    default: 200,
    group: 'artboard',
    disabled: {
      showLegend: false
    },
    container: 'width',
    containerCondition: {
      showLegend: true
    }
  },
  xOrigin: {
    type: 'boolean',
    label: 'Set X origin to 0',
    default: false,
    group: 'chart',
    requiredDimensions: ['x', 'y']
  },
  yOrigin: {
    type: 'boolean',
    label: 'Set Y origin to 0',
    default: false,
    group: 'chart',
    requiredDimensions: ['x', 'y']
  },
  showStroke: {
    type: 'boolean',
    label: 'Show stroke',
    default: false,
    group: 'chart',
    requiredDimensions: ['x', 'y']
  },
  showPoints: {
    type: 'boolean',
    label: 'Show dots on data values',
    default: false,
    group: 'chart',
    requiredDimensions: ['x', 'y']
  },
  dotsDiameter: {
    type: 'number',
    label: 'Dots diameter',
    default: 2,
    group: 'chart',
    disabled: {
      showPoints: false
    },
    requiredDimensions: ['x', 'y']
  },
  colorScale: {
    type: 'colorScale',
    label: 'Color scale',
    dimension: 'color',
    default: {
      scaleType: 'ordinal',
      interpolator: 'interpolateSpectral'
    },
    group: 'colors'
  },
  labelStyles: {
    type: 'text',
    label: 'Label',
    group: 'labels',
    options: [{
      label: 'Primary',
      value: 'labelPrimary'
    }, {
      label: 'Secondary',
      value: 'labelSecondary'
    }, {
      label: 'Italic',
      value: 'labelItalic'
    }],
    default: 'labelPrimary',
    repeatFor: 'label',
    repeatDefault: ['labelPrimary', 'labelSecondary', 'labelItalic']
  },
  showLabelsOutline: {
    type: 'boolean',
    label: 'Show outline',
    default: false,
    group: 'labels'
  },
  autoHideLabels: {
    type: 'boolean',
    label: 'Auto hide labels',
    default: false,
    group: 'labels'
  }
};

var voronoidiagram = {
  metadata: metadata$u,
  dimensions: dimensions$u,
  mapData: mapData$u,
  render: render$u,
  visualOptions: visualOptions$u,
  styles: styles$1
};

var img$Y = "data:image/svg+xml,%3c%3fxml version='1.0' encoding='UTF-8'%3f%3e%3csvg id='rawgraphs-icons' xmlns='http://www.w3.org/2000/svg' width='56' height='56' viewBox='0 0 56 56'%3e %3cdefs%3e %3cstyle%3e .cls-1 %7b fill: %2306c26c%3b %7d .cls-2 %7b fill: %2395e5c0%3b %7d %3c/style%3e %3c/defs%3e %3cg%3e %3cpath class='cls-1' d='m28.00553%2c7c10.32326%2c0%2c19.11555%2c7.50312%2c20.73877%2c17.69797l-1.97512.31448c-1.46863-9.22391-9.42355-16.01245-18.76365-16.01245v-2Z'/%3e %3cpath class='cls-1' d='m48.97645%2c26.89525c.20952%2c3.97715-.71624%2c7.93188-2.66927%2c11.40279l-1.74302-.98077c1.76703-3.14035%2c2.60462-6.71844%2c2.41506-10.31681l1.99723-.10521Z'/%3e %3cpath class='cls-1' d='m45.12388%2c40.16397c-3.48971%2c4.91106-8.92058%2c8.08679-14.9119%2c8.71979l-.21014-1.98893c5.42071-.57272%2c10.33437-3.446%2c13.49172-7.88933l1.63032%2c1.15847Z'/%3e %3cpath class='cls-1' d='m28.00553%2c49c-1.98136%2c0-3.95275-.28041-5.85553-.83288l.55767-1.92068c1.72156.49986%2c3.5052.75356%2c5.29786.75356v2Z'/%3e %3cpath class='cls-1' d='m20.06348%2c47.44026c-10.73656-4.38627-15.88448-16.64575-11.49821-27.38231.33019-.80824.71047-1.59509%2c1.13861-2.35599l1.74302.98077c-5.14579%2c9.14508-1.90372%2c20.73012%2c7.24136%2c25.87591.68843.38737%2c1.40035.73143%2c2.13161%2c1.03017l-.75639%2c1.85145Z'/%3e %3cpath class='cls-1' d='m10.88719%2c15.83603c3.48971-4.91106%2c8.92058-8.08679%2c14.9119-8.71979l.21014%2c1.98893c-5.42071.57272-10.33437%2c3.446-13.49172%2c7.88933l-1.63032-1.15847Z'/%3e %3c/g%3e %3cpath class='cls-2' d='m28.45285%2c11.00589c2.91932.07684%2c5.76962.90443%2c8.27615%2c2.40298-5.81564%2c9.72742-5.32071%2c19.1224%2c1.48479%2c28.18494-2.3352%2c1.75362-5.08277%2c2.8761-7.97786%2c3.25924-1.48693-11.23537-2.08129-22.51776-1.78308-33.84717Z'/%3e %3cg%3e %3cpath class='cls-2' d='m23.69659%2c44.44482c1.26184.33063%2c2.55762.51495%2c3.86163.54926.09082-3.44922-.33069-6.17755-1.25012-8.20508-.57513.74304-1.12244%2c1.5213-1.64154%2c2.33411-.10144%2c1.46167-.42255%2c3.23242-.96997%2c5.32172Z'/%3e %3cpath class='cls-2' d='m12.10449%2c34.01294c.44873%2c1.18677%2c1.03394%2c2.31647%2c1.73462%2c3.3739%2c2.13269-1.6015%2c4.27979-3.23712%2c6.4267-4.89252-2.21747-.20166-4.93317.29791-8.16132%2c1.51862Z'/%3e %3c/g%3e %3cpath class='cls-2' d='m14.41174%2c38.20825c1.7536%2c2.33521%2c4.07922%2c4.17926%2c6.75269%2c5.35449%2c1.7832-4.05664%2c4.07684-7.4696%2c6.86615-10.25751-.13708-1.77588-.25958-3.55322-.35291-5.3327-4.37726%2c3.46826-8.79865%2c6.88098-13.26593%2c10.23572Z'/%3e %3cg%3e %3cpath class='cls-2' d='m44.99963%2c27.55267c-2.91333.07666-5.20062.43585-6.88385%2c1.06757%2c1.45764%2c1.10529%2c3.64136%2c2.04999%2c6.53949%2c2.81079.2627-1.27539.37866-2.57666.34436-3.87836Z'/%3e %3cpath class='cls-2' d='m38.91479%2c41.03796c1.00049-.83716%2c1.90125-1.78662%2c2.68457-2.82971-4.68109-3.51526-6.66522-5.8136-5.9671-6.90161-.14398-.17883-.2832-.35889-.41553-.54071-1.37146%2c2.2489-.15698%2c5.66473%2c3.69806%2c10.27203Z'/%3e %3c/g%3e %3cpath class='cls-2' d='m43.0354%2c35.94379c.60956-1.15332%2c1.08435-2.37292%2c1.41498-3.63483-3.81079-.99854-6.43024-2.29694-7.91388-3.88116-.45526.21527-.88684.45825-1.32513.69348%2c1.46008%2c2.56311%2c4.06793%2c4.83728%2c7.82404%2c6.82251Z'/%3e %3cpath class='cls-2' d='m37.48456%2c13.888c-1.87091%2c2.7854-3.0072%2c5.38586-3.44592%2c7.81079%2c2.146-1.74854%2c4.2851-3.50629%2c6.40857-5.28302-.88757-.95319-1.88147-1.80151-2.96265-2.52777Z'/%3e %3cpath class='cls-2' d='m33.82043%2c28.83417c3.19415-1.86877%2c6.82343-3.18896%2c10.89752-3.94806-.53497-2.87097-1.80042-5.55566-3.67444-7.79535-2.31647%2c1.93823-4.64819%2c3.85718-6.99097%2c5.76227-.37781%2c2.01208-.45062%2c4.00385-.23212%2c5.98114Z'/%3e %3cpath class='cls-2' d='m14.41173%2c17.79175c2.74177-3.65107%2c6.83697-6.04575%2c11.36341-6.6448%2c1.48693%2c11.23537-3.16807%2c18.57576-13.96499%2c22.02117-1.38807-4.34981-.96803-9.07514%2c1.16554-13.11191%2c10.0199%2c5.29586%2c10.49858%2c4.54103%2c1.43604-2.26447Z'/%3e%3c/svg%3e";

var img$Z = "data:image/svg+xml,%3c%3fxml version='1.0' encoding='UTF-8'%3f%3e%3csvg xmlns='http://www.w3.org/2000/svg' width='320' height='320' viewBox='0 0 320 320'%3e %3cdefs%3e %3cstyle%3e .cls-1%2c .cls-2 %7b fill: %23f88e53%3b %7d .cls-3%2c .cls-4 %7b fill: %2389cfa5%3b %7d .cls-5%2c .cls-6 %7b fill: %239e0142%3b %7d .cls-7%2c .cls-8 %7b fill: %235e4fa2%3b %7d .cls-8%2c .cls-4%2c .cls-6%2c .cls-2%2c .cls-9 %7b mix-blend-mode: multiply%3b %7d .cls-10%2c .cls-9 %7b fill: %23fee89a%3b stroke: white%3b %7d .cls-11 %7b letter-spacing: -.05518em%3b %7d .cls-11%2c .cls-12 %7b font-family: ArialMT%2c Arial%3b font-size: 10px%3b %7d .cls-11%2c .cls-12%2c .cls-13 %7b isolation: isolate%3b %7d %3c/style%3e %3c/defs%3e %3cg class='cls-13'%3e %3cg id='Layer_1' data-name='Layer 1'%3e %3cg id='chord_diagram' data-name='chord diagram'%3e %3cg%3e %3cg%3e %3cpath class='cls-1' d='m167.34822%2c9.72837c83.20268%2c0%2c150.65178%2c67.4491%2c150.65178%2c150.65178%2c0%2c4.66844-.217%2c9.33437-.6503%2c13.98266l-10.71439-.99876c7.17081-76.92614-49.37705-145.10018-126.30319-152.27099-4.31627-.40235-8.64891-.60385-12.9839-.60385v-10.76084Z'/%3e %3cpath class='cls-10' d='m315.83159%2c185.84867c-11.36672%2c66.26884-65.27119%2c116.98305-132.10948%2c124.29081l-1.16956-10.69708c62.06413-6.78576%2c112.11829-53.87755%2c122.67309-115.4129l10.60595%2c1.81918Z'/%3e %3cpath class='cls-3' d='m172.1651%2c310.95491c-56.7195%2c1.81446-109.64643-28.39816-136.92371-78.16104l9.4362-5.17241c25.3289%2c46.20839%2c74.47533%2c74.26295%2c127.14344%2c72.57811l.34406%2c10.75534Z'/%3e %3cpath class='cls-5' d='m30.06725%2c222.42769C7.37196%2c172.21407%2c13.90265%2c113.61584%2c47.09623%2c69.63095l8.58942%2c6.48209c-30.82261%2c40.84311-36.88682%2c95.25576-15.81261%2c141.88269l-9.80579%2c4.43197Z'/%3e %3cpath class='cls-7' d='m54.42565%2c60.65827c25.93256-29.36538%2c62.28443-47.47377%2c101.34539-50.4844l.82694%2c10.72902c-36.2709%2c2.79558-70.0262%2c19.61052-94.10643%2c46.87837l-8.0659-7.12299Z'/%3e %3c/g%3e %3cpath class='cls-4' d='m89.29639%2c269.92919c-1.22097-.86992-2.42731-1.76019-3.61853-2.67044%2c54.4469-71.2524%2c39.56633-115.82188-44.64172-133.70846l-4.77741-3.31354%2c5.74491-.89398c83.56305%2c20.69159%2c99.3273%2c67.55373%2c47.29275%2c140.58642Z'/%3e %3cpath class='cls-8' d='m96.34373%2c46.13724c1.49148-.92698%2c3.00097-1.82468%2c4.5276-2.69256%2c44.31793%2c77.95698%2c42.06803%2c81.48213-6.74968%2c10.57546l-.86706-5.90403%2c5.08771%2c3.11842c46.00395%2c72.76374%2c45.33776%2c71.06464-1.99856-5.0973Z'/%3e %3cpath class='cls-8' d='m101.77279%2c42.93679c1.63526-.91306%2c3.28942-1.79187%2c4.96138-2.63584%2c40.40937%2c80.05281%2c37.40124%2c156.32692-9.02438%2c228.82234l-5.25134%2c2.99137.7712-5.99417c49.41238-70.49356%2c52.2601-144.88813%2c8.54314-223.18371Z'/%3e %3cpath class='cls-6' d='m37.03351%2c127.04614c.64979-2.54027%2c1.37372-5.06099%2c2.17085-7.55893%2c85.42924%2c27.26196%2c155.57968%2c7.7266%2c210.45135-58.6061l6.42275-1.59509-.74847%2c6.5754c-58.65452%2c63.01249-131.42001%2c83.40739-218.29648%2c61.18472Z'/%3e %3cpath class='cls-4' d='m84.85815%2c266.62736c-2.14056-1.66192-4.2304-3.38816-6.26667-5.17633%2c59.17116-67.38058%2c61.99099-134.78031%2c8.45949-202.19918l-.12478-6.69274%2c6.37948%2c2.02746c49.3617%2c70.52906%2c46.54586%2c141.20932-8.44752%2c212.04079Z'/%3e %3cpath class='cls-9' d='m264.48955%2c253.42123c-1.96426%2c2.05083-3.99297%2c4.03893-6.08309%2c5.96133-60.7055-66.0016-120.14862-130.72749-178.32938-194.17767l-.45195-6.79404%2c6.65032%2c1.46165c54.04851%2c67.0051%2c113.45321%2c131.52134%2c178.2141%2c193.54873Z'/%3e %3cpath class='cls-9' d='m257.64222%2c260.08007c-2.21546%2c2.00645-4.49719%2c3.9385-6.84138%2c5.79293-55.63508-70.32856-103.90877-67.62098-144.82107%2c8.12273l-6.46524%2c2.53808-.96622-6.87806c45.8666-72.8504%2c98.8979-76.04229%2c159.09391-9.57568Z'/%3e %3cpath class='cls-4' d='m77.81664%2c260.7653c-2.69824-2.40651-5.29835-4.92082-7.79401-7.53683%2c64.88372-61.89888%2c121.72911-128.30533%2c170.53615-199.21935l7.45406-1.26864.87507%2c7.51044c-54.35979%2c66.75282-111.38355%2c133.59095-171.07127%2c200.51437Z'/%3e %3cpath class='cls-6' d='m39.52272%2c118.50271c1.309-3.99556%2c2.80462-7.92755%2c4.48193-11.78301%2c82.22905%2c35.77364%2c91.1898%2c25.04461%2c26.88227-32.18708l.2817-8.18738%2c8.17894-.46623c58.66711%2c63.00076%2c45.39217%2c80.54199-39.82483%2c52.62369Z'/%3e %3cpath class='cls-6' d='m44.42107%2c105.7725c1.73528-3.90629%2c3.65577-7.72764%2c5.75493-11.45104%2c78.11481%2c44.03913%2c151.15407%2c92.47773%2c219.11777%2c145.31579l.19413%2c8.26756-8.1997%2c1.07479c-62.62666-59.0663-134.9157-106.802-216.86713-143.2071Z'/%3e %3cpath class='cls-9' d='m249.9869%2c266.51181c-3.80018%2c2.95899-7.75655%2c5.71173-11.85201%2c8.24634-47.19112-76.252-113.63916-118.42725-199.34411-126.52577l-4.4844-7.67518%2c6.52712-6.03449c84.34315%2c17.2383%2c154.06095%2c61.23467%2c209.15341%2c131.98911Z'/%3e %3cpath class='cls-6' d='m50.68761%2c93.4221c2.71443-4.72934%2c5.71394-9.28925%2c8.98192-13.65447%2c71.78579%2c53.74169%2c92.27541%2c120.80544%2c61.46885%2c201.19127l-9.46722%2c1.86775-4.8156-8.36223c40.32845-76.05618%2c21.6058-136.40362-56.16794-181.04232Z'/%3e %3cpath class='cls-2' d='m259.75054%2c62.63104c4.23125%2c3.99981%2c8.19833%2c8.27013%2c11.8762%2c12.78402-69.51902%2c56.6434-114.02699%2c126.89002-133.52393%2c210.73986l-9.65232%2c2.98877-6.38324-7.8329c30.18731-80.62042%2c76.08173-153.51367%2c137.68328-218.67975Z'/%3e %3cpath class='cls-8' d='m107.65963%2c39.83824c5.76711-2.85569%2c11.73172-5.29382%2c17.84787-7.29561%2c27.89381%2c85.22502%2c60.62666%2c89.11002%2c98.19855%2c11.65501l10.87131-.32208%2c5.16101%2c9.57356c-48.26011%2c71.28736-92.28636%2c66.7504-132.07875-13.61088Z'/%3e %3cpath class='cls-9' d='m237.25298%2c275.29927c-7.26655%2c4.42021-14.93597%2c8.14124-22.90522%2c11.11311-31.33303-84.02149-36.16726-167.69028-14.5027-251.00637l13.52183-1.41953%2c9.44379%2c9.78108c-36.97498%2c77.74173-32.16088%2c154.91896%2c14.4423%2c231.53171Z'/%3e %3cpath class='cls-8' d='m126.4921%2c32.22456c9.74377-3.10632%2c19.81002-5.09129%2c30.00362-5.91641%2c7.235%2c89.38134-31.76173%2c140.13487-116.99021%2c152.26059l-6.61731-14.5032%2c5.81295-14.8439c85.76471%2c7.43901%2c115.02836-31.56001%2c87.79095-116.99707Z'/%3e %3cpath class='cls-2' d='m272.27724%2c76.2197c6.60668%2c8.23703%2c12.22047%2c17.22335%2c16.72541%2c26.77334-81.10295%2c38.25807-82.31545%2c74.8564-3.6375%2c109.79499l-2.33797%2c16.23219-13.12676%2c9.83049c-68.36813-52.31371-67.57586-106.52404%2c2.37682-162.63101Z'/%3e %3cpath class='cls-9' d='m213.3769%2c286.77019c-9.97548%2c3.63287-20.34597%2c6.07199-30.89497%2c7.26643-10.08915-89.10431%2c27.2618-126.21663%2c112.05285-111.33697l1.63134%2c16.39777-10.40133%2c12.78125c-78.94439-34.33234-103.07368-9.3685-72.38789%2c74.89151Z'/%3e %3cpath class='cls-2' d='m289.44048%2c103.93053c4.57534%2c9.89579%2c7.93062%2c20.31113%2c9.992%2c31.01679-88.05617%2c16.95522-131.91871-17.61022-131.5876-103.69631l16.31002-4.32728%2c14.72788%2c8.236c-21.02304%2c83.48028%2c9.16286%2c106.40388%2c90.5577%2c68.7708Z'/%3e %3cpath class='cls-4' d='m69.3113%2c252.47708c-7.65094-8.14441-14.2572-17.21047-19.66606-26.98864%2c78.46865-43.40553%2c118.91375-22.08195%2c121.3353%2c63.97071l-16.56817%2c4.80805-15.34121-7.89106c18.85137-83.99733-4.40192-95.29702-69.75986-33.89907Z'/%3e %3cpath class='cls-2' d='m299.6242%2c135.9641c2.21413%2c11.99523%2c2.78636%2c24.23589%2c1.70094%2c36.38537-89.31794-7.97954-173.26794%2c5.60757-251.85%2c40.76132l-11.21783-14.93357%2c1.39189-18.62562c85.13268-12.78096%2c171.791-27.31013%2c259.97499-43.5875Z'/%3e %3cg%3e %3cg id='B'%3e %3ctext class='cls-12' transform='translate(287.61012 55.90339) rotate(-42.33723)'%3e%3ctspan x='0' y='0'%3eB%3c/tspan%3e%3c/text%3e %3c/g%3e %3cg id='C'%3e %3ctext class='cls-12' transform='translate(273.73466 278.95617) rotate(46.74664)'%3e%3ctspan x='0' y='0'%3eC%3c/tspan%3e%3c/text%3e %3c/g%3e %3cg id='D'%3e %3ctext class='cls-12' transform='translate(87.81388 307.30808) rotate(-60.2807)'%3e%3ctspan x='0' y='0'%3eD%3c/tspan%3e%3c/text%3e %3c/g%3e %3cg id='A'%3e %3ctext class='cls-11' transform='translate(.92797 145.62374) rotate(6.35928)'%3e%3ctspan x='0' y='0'%3eA%3c/tspan%3e%3c/text%3e %3c/g%3e %3cg id='E'%3e %3ctext class='cls-12' transform='translate(89.76574 13.08342) rotate(63.52017)'%3e%3ctspan x='0' y='0'%3eE%3c/tspan%3e%3c/text%3e %3c/g%3e %3c/g%3e %3c/g%3e %3c/g%3e %3c/g%3e %3c/g%3e%3c/svg%3e";

/*
Copied and adapted from:
https://github.com/rawgraphs/rawgraphs-charts/blob/master/docs/add-a-new-chart.md
*/

const metadata$v = {
  name: 'Chord Diagram',
  id: 'rawgraphs.chorddiagram',
  thumbnail: img$Z,
  icon: img$Y,
  categories: ['networks'],
  description: 'It shows relationships among nodes. Nodes size represent the sum of incoming and outgoing links. Relationships are drawn as arcs whose width represent their values.',
  //TODO
  code: 'https://github.com/rawgraphs/rawgraphs-charts/tree/master/src/chorddiagram',
  tutorial: 'www.rawgraphs.io/learning/how-to-make-a-chord-diagram'
};

/*
Copied from:
https://github.com/rawgraphs/rawgraphs-charts/tree/master/src/arcdiagram/dimensions.js
*/
const dimensions$v = [{
  id: 'source',
  name: 'Source node',
  validTypes: ['number', 'date', 'string'],
  required: true
}, {
  id: 'target',
  name: 'Target node',
  validTypes: ['number', 'date', 'string'],
  required: true
}, {
  id: 'size',
  name: 'Size',
  validTypes: ['number'],
  required: false,
  aggregation: true,
  aggregationDefault: 'sum'
}];

/*
Copied from:
https://github.com/rawgraphs/rawgraphs-charts/tree/master/src/arcdiagram/mapping.js
*/
const mapData$v = function (data, mapping, dataTypes, dimensions) {
  const sizeAggregator = getDimensionAggregator('size', mapping, dataTypes, dimensions);
  const results = [];
  rollups(data, v => {
    const item = {
      source: v[0][mapping.source.value],
      target: v[0][mapping.target.value],
      value: mapping.size.value ? sizeAggregator(v.map(d => d[mapping.size.value])) : 1
    };
    results.push(item);
    return item;
  }, d => d[mapping.source.value] + d[mapping.target.value] // crossgrup functions. aggregate links among same source and target
  );
  return results;
};

/*
Chord Diagram mainly based on the documents by Mike Bostrock: 
https://observablehq.com/@d3/chord-diagram
https://observablehq.com/@d3/chord-dependency-diagram

And on the document from Yan Holtz:
https://d3-graph-gallery.com/graph/chord_axis_labels.html

Implementation of the Chord Diagram and the Porting to RawGraps2.0 is based on the implementation of the Arc Diagram:
https://github.com/rawgraphs/rawgraphs-charts/tree/master/src/arcdiagram

and on the official instructions for adding a new card;
https://github.com/rawgraphs/rawgraphs-charts/blob/master/docs/add-a-new-chart.md
*/
function render$v(svgNode, data, visualOptions, mapping, originalData, styles) {
  const {
    // artboard
    width,
    height,
    background,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    //chart
    ringWidth,
    chordPadding,
    ribbonPadding,
    chordPaddingSource,
    chordPaddingTarget,
    sortNodesBy,
    sortRibbonsBy,
    chordColors,
    chordOpacity,
    showChordGroupLabels,
    showValues,
    showHeads,
    headRadius
  } = visualOptions; // prepare data for chord diagram
  // following the example at
  // https://observablehq.com/@d3/chord-diagram

  const {
    names,
    matrix
  } = matrixFromData(data);
  const innerWidth = width - marginLeft - marginRight;
  const innerHeight = height - marginTop - marginBottom;
  const diameter = Math.min(innerWidth, innerHeight);
  const radius = diameter / 2;
  const translationX = innerWidth / 2 + marginLeft;
  const translationY = innerHeight / 2 + marginTop;
  select(svgNode).append('rect').attr('width', width).attr('height', height).attr('x', 0).attr('y', 0).attr('fill', background).attr('id', 'background');
  const svg = select(svgNode).append('g').attr('transform', `translate(${translationX},${translationY})`).attr('id', 'chord_diagram');
  const outerRadius = radius;
  const innerRadius = outerRadius - ringWidth;
  const chords = createChords(matrix, innerRadius);
  drawRing(svg, chords, innerRadius, outerRadius);
  drawChords(svg, chords, innerRadius);

  if (showChordGroupLabels) {
    drawGroupLabels(svg, chords, names, outerRadius);
  }

  function matrixFromData(data) {
    let names = Array.from(new Set(data.flatMap(entry => [entry.source, entry.target])));
    const numberOfNodes = names.length;
    const matrix = Array(numberOfNodes);

    for (let row = 0; row < numberOfNodes; row++) {
      matrix[row] = Array(numberOfNodes).fill(0);
    }

    for (let entry of data) {
      const sourceIndex = names.indexOf(entry.source);
      const targetIndex = names.indexOf(entry.target);
      const value = entry.value;
      matrix[sourceIndex][targetIndex] = value;
    }

    return {
      names,
      matrix
    };
  }

  function createChords(matrix, innerRadius) {
    const chords = chordDirected().padAngle(chordPadding / innerRadius).sortGroups((a, b) => {
      switch (sortNodesBy) {
        case 'totalDescending':
          return descending(a, b);

        case 'totalAscending':
          return ascending(a, b);

        case 'none':
          return 0;
      }
    }).sortSubgroups((a, b) => {
      switch (sortRibbonsBy) {
        case 'totalDescending':
          return descending(a, b);

        case 'totalAscending':
          return ascending(a, b);

        case 'none':
          return 0;
      }
    }).sortChords(ascending);
    return chords(matrix);
  }

  function drawRing(svg, chords, innerRadius, outerRadius) {
    const arc$1 = arc().innerRadius(innerRadius).outerRadius(outerRadius);
    svg.append('g').selectAll('g').data(chords.groups).join('g').append('path').attr('fill', d => chordColors(names[d.index])).attr('d', arc$1);
  }

  function drawChords(svg, chords, innerRadius) {
    const ribbon$1 = showHeads ? ribbonArrow().headRadius(headRadius) : ribbon();
    ribbon$1.padAngle(ribbonPadding / innerRadius).sourceRadius(() => innerRadius - chordPaddingSource).targetRadius(() => innerRadius - chordPaddingTarget);
    svg.append('g').attr('fill-opacity', chordOpacity).selectAll('path').data(chords).join('path').attr('fill', d => chordColors(names[d.source.index])).attr('d', ribbon$1);
  }

  function drawGroupLabels(svg, chords, names, radius) {
    // create a new array with info on chords groups and names
    const labelsData = chords.groups.map(d => ({
      value: d.value,
      index: d.index,
      name: names[d.index],
      angle: (d.startAngle + d.endAngle) / 2
    }));
    svg.append('g').selectAll('g').data(labelsData).join('g').attr('id', d => d.name).attr('transform', d => `rotate(${d.angle * 180 / Math.PI - 90}) translate(${radius},0)`).append('text').attr('x', 8).attr('dy', '0.35em').attr('transform', d => d.angle > Math.PI ? 'rotate(180) translate(-16)' : null).attr('text-anchor', d => d.angle > Math.PI ? 'end' : null).styles(styles.labelPrimary).text((d, i) => showValues ? `${d.name} (${d.value})` : d.name);
  }
}

const visualOptions$v = {
  marginTop: {
    type: 'number',
    label: 'Margin (top)',
    default: 50,
    group: 'artboard'
  },
  marginRight: {
    type: 'number',
    label: 'Margin (right)',
    default: 50,
    group: 'artboard'
  },
  marginBottom: {
    type: 'number',
    label: 'Margin (bottom)',
    default: 50,
    group: 'artboard'
  },
  marginLeft: {
    type: 'number',
    label: 'Margin (left)',
    default: 50,
    group: 'artboard'
  },
  ringWidth: {
    type: 'number',
    label: 'Ring width',
    default: 10,
    group: 'chart'
  },
  chordPadding: {
    type: 'number',
    label: 'Groups padding',
    default: 10,
    group: 'chart'
  },
  ribbonPadding: {
    type: 'number',
    label: 'Chords padding',
    default: 1,
    group: 'chart'
  },
  chordPaddingSource: {
    type: 'number',
    label: 'Source inner padding',
    default: 1,
    group: 'chart'
  },
  chordPaddingTarget: {
    type: 'number',
    label: 'Target inner padding',
    default: 5,
    group: 'chart'
  },
  sortNodesBy: {
    type: 'text',
    label: 'Sort groups by',
    group: 'chart',
    options: [{
      label: 'Size (descending)',
      value: 'totalDescending'
    }, {
      label: 'Size (ascending)',
      value: 'totalAscending'
    }, {
      label: 'None',
      value: 'none'
    }],
    default: 'none'
  },
  sortRibbonsBy: {
    type: 'text',
    label: 'Sort chords by',
    group: 'chart',
    options: [{
      label: 'Size (descending)',
      value: 'totalDescending'
    }, {
      label: 'Size (ascending)',
      value: 'totalAscending'
    }, {
      label: 'None',
      value: 'none'
    }],
    default: 'none'
  },
  showHeads: {
    type: 'boolean',
    label: 'Show arrow heads',
    default: true,
    group: 'chart'
  },
  headRadius: {
    disabled: {
      showHeads: false
    },
    type: 'number',
    label: 'Arrows heads radius',
    default: 20,
    group: 'chart'
  },
  chordColors: {
    type: 'colorScale',
    label: 'Chord Colors',
    dimension: 'source',
    default: {
      scaleType: 'ordinal',
      interpolator: 'interpolateSpectral'
    },
    group: 'colors'
  },
  chordOpacity: {
    type: 'number',
    label: 'Chord opacity',
    default: 0.7,
    min: 0.1,
    max: 1,
    step: 0.05,
    group: 'colors'
  },
  showChordGroupLabels: {
    type: 'boolean',
    label: 'Show Chord Group Labels',
    default: true,
    group: 'labels'
  },
  showValues: {
    type: 'boolean',
    label: 'Show nodes values',
    default: true,
    group: 'labels'
  }
};

/*
Copied from:
https://github.com/rawgraphs/rawgraphs-charts/blob/master/docs/add-a-new-chart.md
*/
var chorddiagram = {
  metadata: metadata$v,
  dimensions: dimensions$v,
  mapData: mapData$v,
  render: render$v,
  visualOptions: visualOptions$v,
  styles: styles$1
};

export { alluvialdiagram, arcdiagram, barchart, barchartmultiset, barchartstacked, beeswarm, boxplot, bubblechart, bumpchart, chorddiagram, circlepacking, circularDendrogram, colortest, contourPlot, convexHull, dendrogram, ganttChart, hexagonalBinning, horizongraph, linechart, matrixplot, parallelcoordinates, piechart, radarchart, sankeydiagram, slopechart, streamgraph, sunburst, treemap, violinplot, voronoidiagram, voronoitreemap };
