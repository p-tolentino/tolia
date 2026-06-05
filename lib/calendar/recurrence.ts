import { RRule, type Options } from "rrule"

const RRULE_PREFIX = "RRULE:"

const DAY_NUMBERS: Record<string, number> = {
  MO: RRule.MO.weekday,
  TU: RRule.TU.weekday,
  WE: RRule.WE.weekday,
  TH: RRule.TH.weekday,
  FR: RRule.FR.weekday,
  SA: RRule.SA.weekday,
  SU: RRule.SU.weekday,
}

const DAY_KEYS: Record<number, string> = {
  [RRule.MO.weekday]: "MO",
  [RRule.TU.weekday]: "TU",
  [RRule.WE.weekday]: "WE",
  [RRule.TH.weekday]: "TH",
  [RRule.FR.weekday]: "FR",
  [RRule.SA.weekday]: "SA",
  [RRule.SU.weekday]: "SU",
}

const FREQ_MAP: Record<string, number> = {
  daily: RRule.DAILY,
  weekly: RRule.WEEKLY,
  biweekly: RRule.WEEKLY,
  monthly: RRule.MONTHLY,
  yearly: RRule.YEARLY,
}

const FREQ_REVERSE: Record<number, string> = {
  [RRule.DAILY]: "daily",
  [RRule.WEEKLY]: "weekly",
  [RRule.MONTHLY]: "monthly",
  [RRule.YEARLY]: "yearly",
}

const SET_POS_MAP: Record<string, number | undefined> = {
  first: 1,
  second: 2,
  third: 3,
  fourth: 4,
  last: -1,
}

const SET_POS_REVERSE: Record<number, string> = {
  1: "first",
  2: "second",
  3: "third",
  4: "fourth",
  [-1]: "last",
}

function stripPrefix(rruleString: string): string {
  return rruleString.replace(RRULE_PREFIX, "")
}

function toRRule(rruleString: string | null | undefined): RRule | null {
  if (!rruleString) return null
  try {
    return RRule.fromString(stripPrefix(rruleString))
  } catch {
    return null
  }
}

export interface RecurrenceFormValues {
  recurrence: string
  recurrenceInterval?: number
  recurrenceByDay?: string[]
  recurrenceByMonthDay?: number | null
  recurrenceBySetPos?: string | null
  recurrenceByDayName?: string | null
  recurrenceByMonth?: number | null
}

export function formValuesToRrule(
  values: RecurrenceFormValues
): string | undefined {
  if (!values.recurrence || values.recurrence === "none") return undefined

  const freq = FREQ_MAP[values.recurrence]
  if (freq === undefined) return undefined

  const options: Partial<Options> = {
    freq,
    interval: values.recurrenceInterval ?? 1,
  }

  if (
    freq === RRule.WEEKLY &&
    values.recurrenceByDay &&
    values.recurrenceByDay.length > 0
  ) {
    const weekdays = values.recurrenceByDay
      .map((d) => DAY_NUMBERS[d])
      .filter((n) => n !== undefined)
    if (weekdays.length > 0) {
      options.byweekday = weekdays
    }
  }

  if (freq === RRule.MONTHLY) {
    if (values.recurrenceBySetPos && values.recurrenceByDayName) {
      const setPos = SET_POS_MAP[values.recurrenceBySetPos]
      const weekdayNum = DAY_NUMBERS[values.recurrenceByDayName]
      if (setPos !== undefined && weekdayNum !== undefined) {
        options.byweekday = weekdayNum
        options.bysetpos = setPos
      }
    } else if (values.recurrenceByMonthDay) {
      options.bymonthday = values.recurrenceByMonthDay
    }
  }

  if (
    freq === RRule.YEARLY &&
    values.recurrenceByMonth &&
    values.recurrenceByMonthDay
  ) {
    options.bymonth = values.recurrenceByMonth
    options.bymonthday = values.recurrenceByMonthDay
  }

  return stripPrefix(new RRule(options).toString())
}

export function rruleToFormValues(
  rruleString: string | null | undefined
): RecurrenceFormValues {
  const defaults: RecurrenceFormValues = {
    recurrence: "none",
    recurrenceInterval: 1,
    recurrenceByDay: [],
    recurrenceByMonthDay: null,
    recurrenceBySetPos: null,
    recurrenceByDayName: null,
    recurrenceByMonth: null,
  }

  const rrule = toRRule(rruleString)
  if (!rrule) return defaults

  const opts = rrule.options
  const freq = opts.freq
  const interval = opts.interval ?? 1

  const recurrence = FREQ_REVERSE[freq]
  if (!recurrence) return defaults

  const result: RecurrenceFormValues = {
    recurrence:
      freq === RRule.WEEKLY && interval === 2 ? "biweekly" : recurrence,
    recurrenceInterval: interval,
    recurrenceByDay: [],
    recurrenceByMonthDay: null,
    recurrenceBySetPos: null,
    recurrenceByDayName: null,
    recurrenceByMonth: null,
  }

  if (freq === RRule.WEEKLY && opts.byweekday && opts.byweekday.length > 0) {
    result.recurrenceByDay = opts.byweekday
      .map((d: number) => DAY_KEYS[d] ?? "")
      .filter(Boolean)
  }

  if (freq === RRule.MONTHLY) {
    if (
      opts.bysetpos &&
      opts.bysetpos.length > 0 &&
      opts.byweekday &&
      opts.byweekday.length > 0
    ) {
      result.recurrenceBySetPos = SET_POS_REVERSE[opts.bysetpos[0]] ?? null
      result.recurrenceByDayName = DAY_KEYS[opts.byweekday[0]] ?? null
    } else if (opts.bymonthday && opts.bymonthday.length > 0) {
      result.recurrenceByMonthDay = opts.bymonthday[0]
    }
  }

  if (freq === RRule.YEARLY) {
    if (opts.bymonth && opts.bymonth.length > 0) {
      result.recurrenceByMonth = opts.bymonth[0]
    }
    if (opts.bymonthday && opts.bymonthday.length > 0) {
      result.recurrenceByMonthDay = opts.bymonthday[0]
    }
  }

  return result
}

export function rruleToDisplayText(
  rruleString: string | null | undefined
): string {
  const rrule = toRRule(rruleString)
  if (!rrule) return ""

  const text = rrule.toText()
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export const WEEKDAYS = [
  { key: "MO", label: "Mon", fullLabel: "Monday" },
  { key: "TU", label: "Tue", fullLabel: "Tuesday" },
  { key: "WE", label: "Wed", fullLabel: "Wednesday" },
  { key: "TH", label: "Thu", fullLabel: "Thursday" },
  { key: "FR", label: "Fri", fullLabel: "Friday" },
  { key: "SA", label: "Sat", fullLabel: "Saturday" },
  { key: "SU", label: "Sun", fullLabel: "Sunday" },
] as const

export const SET_POS_OPTIONS = [
  { value: "first", label: "First" },
  { value: "second", label: "Second" },
  { value: "third", label: "Third" },
  { value: "fourth", label: "Fourth" },
  { value: "last", label: "Last" },
] as const

export const MONTH_NAMES = [
  { value: 1, label: "January" },
  { value: 2, label: "February" },
  { value: 3, label: "March" },
  { value: 4, label: "April" },
  { value: 5, label: "May" },
  { value: 6, label: "June" },
  { value: 7, label: "July" },
  { value: 8, label: "August" },
  { value: 9, label: "September" },
  { value: 10, label: "October" },
  { value: 11, label: "November" },
  { value: 12, label: "December" },
] as const
