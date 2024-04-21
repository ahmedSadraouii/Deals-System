import humanizeDuration from 'humanize-duration';
import { DateTime, Interval } from 'luxon';

export function formatAvailability(availabilityEnd: string): string {
  // parse availabilityEnd as ISO date
  const date = DateTime.fromISO(availabilityEnd);
  const diff = Interval.fromDateTimes(DateTime.now(), date);
  return humanizeDuration(diff.toDuration().valueOf(), {
    largest: 1,
    language: 'de',
  });
}
