/**
 * Helper to determine current opening status according to Australia/Brisbane timezone (AEST, UTC+10)
 */

export interface CaféLiveStatus {
  isOpen: boolean;
  message: string;
  currentDay: string;
  currentTimeString: string;
}

export function getBrisbaneCaféStatus(): CaféLiveStatus {
  try {
    // Format current time into Australia/Brisbane timezone
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('en-AU', {
      timeZone: 'Australia/Brisbane',
      weekday: 'long',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
    });

    const parts = formatter.formatToParts(now);
    const day = parts.find(p => p.type === 'weekday')?.value || 'Monday';
    const hour = parseInt(parts.find(p => p.type === 'hour')?.value || '0', 10);
    const minute = parseInt(parts.find(p => p.type === 'minute')?.value || '0', 10);

    const currentTimeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')} AEST`;

    // Standard hours: 06:00 to 13:00 (1:00 PM) everyday
    const currentMinutes = hour * 60 + minute;
    const openMinutes = 6 * 60; // 06:00 AM
    const closeMinutes = 13 * 60; // 01:00 PM

    const isOpen = currentMinutes >= openMinutes && currentMinutes < closeMinutes;

    let message = '';
    if (isOpen) {
      const minutesLeft = closeMinutes - currentMinutes;
      if (minutesLeft <= 45) {
        message = `Open Now • Closing soon at 1:00 PM (${minutesLeft} mins left)`;
      } else {
        message = `Open Now • Today until 1:00 PM`;
      }
    } else {
      if (currentMinutes < openMinutes) {
        message = `Opening this morning at 6:00 AM`;
      } else {
        message = `Closed for today • Reopening tomorrow at 6:00 AM`;
      }
    }

    return {
      isOpen,
      message,
      currentDay: day,
      currentTimeString,
    };
  } catch {
    return {
      isOpen: false,
      message: 'Trading 6:00 AM – 1:00 PM Daily',
      currentDay: 'Today',
      currentTimeString: 'AEST',
    };
  }
}
