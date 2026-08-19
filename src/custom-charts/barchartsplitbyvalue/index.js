import { barchartstacked } from '../../rawgraphs-charts'
import { dimensions } from './dimensions'
import { mapData } from './mapping'

/**
 * Bar chart whose bars are split by the values of a column.
 *
 * The stock chart, "Bar chart split by columns", reads wide data: its Size
 * dimension takes several numeric columns at once, one segment per column, so
 * the colour categories are the column names. Long ("tidy") data, where one
 * column holds the value and another the category, cannot be expressed that
 * way.
 *
 * This chart takes one X column, one numeric column and one category column,
 * and splits every bar by the values of the category column.
 *
 * Only `dimensions` and `mapData` differ from the stock chart. `render`,
 * `visualOptions` and `styles` are reused verbatim, which works because render
 * reads its stack keys out of the mapped data
 * (`[...new Set(data.map((d) => d.bars))]`) rather than out of the mapping, and
 * because the only visual option bound to a dimension is `colorScale`, bound to
 * `bars`.
 */
export const barchartsplitbyvalue = {
  ...barchartstacked,
  metadata: {
    ...barchartstacked.metadata,
    name: 'Bar chart split by value',
    id: 'rawgraphs.barchartsplitbyvalue',
    description:
      'It displays a quantitative dimension over an ordered dimension, with every bar split by the values of a categorical dimension. Unlike the bar chart split by columns it reads one value column and one category column, instead of several value columns.',
    code:
      'https://github.com/senaev/rawgraphs-app/blob/master/src/custom-charts/barchartsplitbyvalue/index.js',
    tutorial: undefined,
  },
  dimensions,
  mapData,
}

export default barchartsplitbyvalue
