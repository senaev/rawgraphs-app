/**
 * The mapped row keys are dictated by the render function and colour scale
 * reused from rawgraphs.barchartstacked, so the dimension ids keep the stock
 * names: `stacks` is X, `size` is the value, `bars` is the stack segment. Here
 * `bars` is a single category column rather than a list of value columns.
 */
export const dimensions = [
  {
    id: 'stacks',
    name: 'X Axis',
    validTypes: ['number', 'string', 'date'],
    required: true,
    operation: 'get',
  },

  {
    id: 'size',
    name: 'Size',
    validTypes: ['number'],
    required: true,
    operation: 'get',
    aggregation: true,
    // Plain string rather than { number: 'sum' }, as the stock bar chart also
    // declares it. The card accepts a column of any type, flagging the invalid
    // ones instead of refusing the drop, and getDefaultDimensionAggregation
    // falls back to the first registered aggregator, count, for any type absent
    // from the object form. Dropping a string or a date here would therefore
    // store count, and since the drop handler appends to the aggregation array
    // while annotateMapping reads its first element, that count would outlive
    // the invalid column. A string applies to every type.
    aggregationDefault: 'sum',
  },

  {
    id: 'bars',
    name: 'Color',
    validTypes: ['number', 'string', 'date'],
    // Optional, so the chart also draws plain single-segment bars. Left empty,
    // every row of a bar lands in one segment painted with the default colour,
    // because the colour scale then sees a dataset of undefined.
    required: false,
    operation: 'get',
  },

  {
    id: 'series',
    name: 'Series',
    validTypes: ['number', 'string', 'date'],
    required: false,
    operation: 'get',
  },
]
