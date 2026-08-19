// Imported from d3-array, not from d3: the app's d3 is v7, which is ESM only
// and cannot be parsed by CRA's jest, so importing it would make this module
// untestable. d3-array 2.x, pulled in by the vendored core, ships a CJS build.
import { rollups } from 'd3-array'
import { getDimensionAggregator } from '../../rawgraphs-core'

/**
 * The column a dimension is mapped to, or undefined when it is not mapped.
 *
 * annotateMapping in the core unwraps the app's single-element arrays into
 * scalars for non-multiple dimensions, but it represents an unmapped dimension
 * as an empty array, which is truthy. Both shapes are normalised here.
 */
function columnName(mappingEntry) {
  const value = mappingEntry ? mappingEntry.value : undefined
  if (Array.isArray(value)) {
    return value.length ? value[0] : undefined
  }
  return value
}

/**
 * Grouping key. Dates and numbers have to collapse to a primitive, since
 * rollups would otherwise key its map on object identity. An absent column and
 * an empty cell both collapse to a single group.
 */
function groupKey(row, column) {
  if (!column) {
    return ''
  }
  const value = row[column]
  return value === null || value === undefined ? '' : value.toString()
}

/**
 * The value kept in the mapped row as the stack segment. Dates become ISO
 * strings, because render collects the stack keys with `new Set`, which compares
 * Date objects by identity: one Date object per group would turn every bar into
 * its own segment. ISO strings also sort chronologically, which is what the
 * ordinal colour scale does to them.
 */
function stackValue(row, column) {
  if (!column) {
    return undefined
  }
  const value = row[column]
  return value instanceof Date ? value.toISOString() : value
}

export const mapData = function (data, mapping, dataTypes, dimensions) {
  // A single, non-multiple dimension, so this is one aggregator, not an array.
  const sizeAggregator = getDimensionAggregator(
    'size',
    mapping,
    dataTypes,
    dimensions
  )

  const seriesColumn = columnName(mapping.series)
  const stacksColumn = columnName(mapping.stacks)
  const colorColumn = columnName(mapping.bars)
  const sizeColumn = columnName(mapping.size)

  const results = []
  rollups(
    data,
    (v) => {
      results.push({
        series: seriesColumn ? v[0][seriesColumn] : undefined,
        stacks: v[0][stacksColumn],
        bars: stackValue(v[0], colorColumn),
        size: sizeAggregator(v.map((x) => x[sizeColumn])),
      })
    },
    (d) => groupKey(d, seriesColumn),
    (d) => groupKey(d, stacksColumn),
    (d) => groupKey(d, colorColumn)
  )
  return results
}
