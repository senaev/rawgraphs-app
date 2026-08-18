import { mapData } from '../mapping'
import { dimensions } from '../dimensions'
import { getDefaultDimensionAggregation } from '../../../rawgraphs-core'

const dataTypes = {
  USAGE_TIMESTAMP: 'string',
  TOTAL_USAGE_QUANTITY: 'number',
  USAGE_TYPE: 'string',
  ROW_DATACENTER: 'string',
}

// The shape annotateMapping produces before core calls mapData: a plain column
// name for a mapped non-multiple dimension, an empty array for an unmapped one.
const entry = (column) => ({ value: column === undefined ? [] : column })

const buildMapping = ({ x, size, color, series } = {}) => ({
  stacks: entry(x),
  size: entry(size),
  bars: entry(color),
  series: entry(series),
})

const rows = [
  {
    USAGE_TIMESTAMP: '2026-08-05T00:00:00',
    TOTAL_USAGE_QUANTITY: 10,
    USAGE_TYPE: 'index',
    ROW_DATACENTER: 'US5',
  },
  {
    USAGE_TIMESTAMP: '2026-08-05T00:00:00',
    TOTAL_USAGE_QUANTITY: 5,
    USAGE_TYPE: 'index',
    ROW_DATACENTER: 'US3',
  },
  {
    USAGE_TIMESTAMP: '2026-08-05T00:00:00',
    TOTAL_USAGE_QUANTITY: 2,
    USAGE_TYPE: 'rehydration',
    ROW_DATACENTER: 'US5',
  },
  {
    USAGE_TIMESTAMP: '2026-08-05T01:00:00',
    TOTAL_USAGE_QUANTITY: 7,
    USAGE_TYPE: 'index',
    ROW_DATACENTER: 'US5',
  },
]

const baseMapping = {
  x: 'USAGE_TIMESTAMP',
  size: 'TOTAL_USAGE_QUANTITY',
  color: 'USAGE_TYPE',
}

describe('barchartstackedlong mapping', () => {
  it('takes a single numeric column, unlike the wide stacked bar chart', () => {
    const size = dimensions.find((d) => d.id === 'size')
    expect(size.multiple).toBeUndefined()
    expect(size.validTypes).toEqual(['number'])
    expect(size.aggregationDefault).toBe('sum')
  })

  it('defaults to sum whatever column type is dropped on Size', () => {
    // The card accepts any column and only flags the invalid ones, and the
    // object form of aggregationDefault falls back to count for a type it does
    // not list. Every type has to resolve to sum, or an invalid drop leaves a
    // count behind that survives into the mapping.
    const size = dimensions.find((d) => d.id === 'size')
    expect(getDefaultDimensionAggregation(size, 'number')).toBe('sum')
    expect(getDefaultDimensionAggregation(size, 'string')).toBe('sum')
    expect(getDefaultDimensionAggregation(size, 'date')).toBe('sum')
  })

  it('splits one bar into a segment per category value', () => {
    const result = mapData(rows, buildMapping(baseMapping), dataTypes, dimensions)

    expect(result).toEqual([
      {
        series: undefined,
        stacks: '2026-08-05T00:00:00',
        bars: 'index',
        size: 15, // 10 + 5, summed across datacenters
      },
      {
        series: undefined,
        stacks: '2026-08-05T00:00:00',
        bars: 'rehydration',
        size: 2,
      },
      {
        series: undefined,
        stacks: '2026-08-05T01:00:00',
        bars: 'index',
        size: 7,
      },
    ])
  })

  it('produces the stack keys render collects with new Set', () => {
    const result = mapData(rows, buildMapping(baseMapping), dataTypes, dimensions)
    const barsDomain = [...new Set(result.map((d) => d.bars))]
    expect(barsDomain).toEqual(['index', 'rehydration'])
  })

  it('honours a non-default aggregation', () => {
    const mapping = buildMapping(baseMapping)
    // annotateMapping unwraps the app's array into a scalar for single dimensions
    mapping.size.config = { aggregation: 'max' }
    const result = mapData(rows, mapping, dataTypes, dimensions)
    const firstBar = result.find(
      (d) => d.stacks === '2026-08-05T00:00:00' && d.bars === 'index'
    )
    expect(firstBar.size).toBe(10) // max of 10 and 5, not their sum
  })

  it('collapses dates in the color column to one key per instant', () => {
    const dated = rows.map((r) => ({
      ...r,
      DAY: new Date(r.USAGE_TIMESTAMP.slice(0, 10)),
    }))
    const result = mapData(
      dated,
      buildMapping({ ...baseMapping, color: 'DAY' }),
      { ...dataTypes, DAY: 'date' },
      dimensions
    )
    const barsDomain = [...new Set(result.map((d) => d.bars))]
    expect(barsDomain).toEqual(['2026-08-05T00:00:00.000Z'])
    expect(typeof result[0].bars).toBe('string')
  })

  it('draws single-segment bars when no color column is chosen', () => {
    const result = mapData(
      rows,
      buildMapping({ ...baseMapping, color: undefined }),
      dataTypes,
      dimensions
    )
    expect(result).toEqual([
      { series: undefined, stacks: '2026-08-05T00:00:00', bars: undefined, size: 17 },
      { series: undefined, stacks: '2026-08-05T01:00:00', bars: undefined, size: 7 },
    ])
  })

  it('keeps series apart', () => {
    const result = mapData(
      rows,
      buildMapping({ ...baseMapping, series: 'ROW_DATACENTER' }),
      dataTypes,
      dimensions
    )
    expect(result.filter((d) => d.series === 'US5').length).toBe(3)
    expect(result.filter((d) => d.series === 'US3')).toEqual([
      { series: 'US3', stacks: '2026-08-05T00:00:00', bars: 'index', size: 5 },
    ])
  })

  it('does not crash on empty cells in the color column', () => {
    const withHoles = [
      ...rows,
      {
        USAGE_TIMESTAMP: '2026-08-05T01:00:00',
        TOTAL_USAGE_QUANTITY: 3,
        USAGE_TYPE: null,
        ROW_DATACENTER: 'US5',
      },
    ]
    const result = mapData(
      withHoles,
      buildMapping(baseMapping),
      dataTypes,
      dimensions
    )
    expect(result).toHaveLength(4)
    expect(result[3]).toEqual({
      series: undefined,
      stacks: '2026-08-05T01:00:00',
      bars: null,
      size: 3,
    })
  })
})
