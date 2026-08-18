// Covers the local additions to dateFormats.js and dataset.js, which add
// support for ISO 8601 timestamps with milliseconds and a zone.
import { dateFormats } from "../dateFormats"
import { parseDataset, inferTypes } from "../dataset"

// inferTypes, not getValueType: getValueType skips every date probe unless the
// caller injects a dateParser, which inferTypes supplies.
const inferOne = (value) => inferTypes([{ d: value }]).d

const ISO_LABEL = "YYYY-MM-DDTHH:mm:ss.SSSZ"

describe("ISO 8601 date format", () => {
  it("translates to a d3 pattern that reads the zone", () => {
    // %Z rather than a literal Z: it makes timeParse return the correct
    // instant instead of reading the value as local time.
    expect(String(dateFormats[ISO_LABEL])).toBe("%Y-%m-%dT%H:%M:%S.%L%Z")
  })

  it("is auto-detected", () => {
    expect(inferOne("2026-08-18T11:09:16.705Z")).toEqual({
      type: "date",
      dateFormat: ISO_LABEL,
    })
  })

  it("parses to the exact instant, independent of the local zone", () => {
    const { dataset } = parseDataset([{ d: "2026-08-18T11:09:16.705Z" }])
    expect(dataset[0].d.toISOString()).toBe("2026-08-18T11:09:16.705Z")
  })

  it("accepts a numeric UTC offset", () => {
    const { dataset } = parseDataset([{ d: "2026-08-18T11:09:16.705+02:00" }])
    expect(dataset[0].d.toISOString()).toBe("2026-08-18T09:09:16.705Z")
  })

  it("leaves the pre-existing formats unchanged", () => {
    expect(String(dateFormats["YYYY-MM-DD"])).toBe("%Y-%m-%d")
    expect(String(dateFormats["YYYY-MM-DDTHH:mm:ss"])).toBe("%Y-%m-%dT%H:%M:%S")
    expect(inferOne("2020-05-04")).toEqual({
      type: "date",
      dateFormat: "YYYY-MM-DD",
    })
    expect(inferOne("2020-05-04T10:20:30")).toEqual({
      type: "date",
      dateFormat: "YYYY-MM-DDTHH:mm:ss",
    })
    expect(inferOne("hello")).toBe("string")
  })
})
