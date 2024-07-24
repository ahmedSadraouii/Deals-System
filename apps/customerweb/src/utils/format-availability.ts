import humanizeDuration from 'humanize-duration';
import { DateTime } from 'luxon';

export function formatAvailability(availabilityEnd: string): string {
  // parse availabilityEnd as ISO date
  const date = DateTime.fromISO(availabilityEnd);
  const duration = date.diff(DateTime.now());
  // is diff below 1 day?
  if (duration.as('days') < 1) {
    return duration.toFormat('hh:mm:ss');
  } else {
    return humanizeDuration(duration.valueOf(), {
      largest: 1,
      language: 'de',
    });
  }
}
