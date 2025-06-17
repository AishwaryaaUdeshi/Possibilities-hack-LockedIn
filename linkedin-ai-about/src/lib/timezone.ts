// Timezone utility functions

// Common timezone mappings for major cities/locations
const LOCATION_TIMEZONE_MAP: { [key: string]: string } = {
  // US Cities
  'San Francisco': 'America/Los_Angeles',
  'Los Angeles': 'America/Los_Angeles',
  'Seattle': 'America/Los_Angeles',
  'New York': 'America/New_York',
  'Boston': 'America/New_York',
  'Chicago': 'America/Chicago',
  'Houston': 'America/Chicago',
  'Denver': 'America/Denver',
  'Phoenix': 'America/Phoenix',
  'Miami': 'America/New_York',
  'Atlanta': 'America/New_York',
  
  // Canadian Cities
  'Toronto': 'America/Toronto',
  'Vancouver': 'America/Vancouver',
  'Montreal': 'America/Toronto',
  'Calgary': 'America/Edmonton',
  
  // European Cities
  'London': 'Europe/London',
  'Paris': 'Europe/Paris',
  'Berlin': 'Europe/Berlin',
  'Amsterdam': 'Europe/Amsterdam',
  'Madrid': 'Europe/Madrid',
  'Rome': 'Europe/Rome',
  'Stockholm': 'Europe/Stockholm',
  'Zurich': 'Europe/Zurich',
  
  // Asian Cities
  'Tokyo': 'Asia/Tokyo',
  'Seoul': 'Asia/Seoul',
  'Beijing': 'Asia/Shanghai',
  'Shanghai': 'Asia/Shanghai',
  'Hong Kong': 'Asia/Hong_Kong',
  'Singapore': 'Asia/Singapore',
  'Bangkok': 'Asia/Bangkok',
  'Mumbai': 'Asia/Kolkata',
  'New Delhi': 'Asia/Kolkata',
  'Dubai': 'Asia/Dubai',
  
  // Australian Cities
  'Sydney': 'Australia/Sydney',
  'Melbourne': 'Australia/Melbourne',
  'Perth': 'Australia/Perth',
  
  // Other Major Cities
  'Mexico City': 'America/Mexico_City',
  'São Paulo': 'America/Sao_Paulo',
  'Buenos Aires': 'America/Argentina/Buenos_Aires',
  'Cape Town': 'Africa/Johannesburg',
  'Lagos': 'Africa/Lagos',
  'Cairo': 'Africa/Cairo',
};

// Company timezone mappings (common tech companies)
const COMPANY_TIMEZONE_MAP: { [key: string]: string } = {
  'Google': 'America/Los_Angeles',
  'Microsoft': 'America/Los_Angeles',
  'Apple': 'America/Los_Angeles',
  'Meta': 'America/Los_Angeles',
  'Facebook': 'America/Los_Angeles',
  'Amazon': 'America/Los_Angeles',
  'Netflix': 'America/Los_Angeles',
  'Twitter': 'America/Los_Angeles',
  'LinkedIn': 'America/Los_Angeles',
  'Salesforce': 'America/Los_Angeles',
  'Adobe': 'America/Los_Angeles',
  'Intel': 'America/Los_Angeles',
  'Oracle': 'America/Los_Angeles',
  'Cisco': 'America/Los_Angeles',
  'IBM': 'America/New_York',
  'Accenture': 'America/New_York',
  'Deloitte': 'America/New_York',
  'PwC': 'America/New_York',
  'EY': 'America/New_York',
  'KPMG': 'America/New_York',
};

/**
 * Detect timezone based on location information
 * @param location - City, state, or country
 * @param company - Company name
 * @returns IANA timezone identifier
 */
export function detectTimezone(location?: string, company?: string): string {
  // First try to match by company
  if (company) {
    const companyTimezone = COMPANY_TIMEZONE_MAP[company];
    if (companyTimezone) {
      return companyTimezone;
    }
  }
  
  // Then try to match by location
  if (location) {
    // Try exact match first
    const exactMatch = LOCATION_TIMEZONE_MAP[location];
    if (exactMatch) {
      return exactMatch;
    }
    
    // Try partial matches
    for (const [city, timezone] of Object.entries(LOCATION_TIMEZONE_MAP)) {
      if (location.toLowerCase().includes(city.toLowerCase())) {
        return timezone;
      }
    }
  }
  
  // Default to UTC if no match found
  return 'UTC';
}

/**
 * Get timezone abbreviation (e.g., PST, EST, GMT)
 * @param timezone - IANA timezone identifier
 * @returns Timezone abbreviation
 */
export function getTimezoneAbbreviation(timezone: string): string {
  const abbreviations: { [key: string]: string } = {
    'America/Los_Angeles': 'PST',
    'America/New_York': 'EST',
    'America/Chicago': 'CST',
    'America/Denver': 'MST',
    'America/Phoenix': 'MST',
    'America/Toronto': 'EST',
    'America/Vancouver': 'PST',
    'Europe/London': 'GMT',
    'Europe/Paris': 'CET',
    'Europe/Berlin': 'CET',
    'Europe/Amsterdam': 'CET',
    'Europe/Madrid': 'CET',
    'Europe/Rome': 'CET',
    'Europe/Stockholm': 'CET',
    'Europe/Zurich': 'CET',
    'Asia/Tokyo': 'JST',
    'Asia/Seoul': 'KST',
    'Asia/Shanghai': 'CST',
    'Asia/Hong_Kong': 'HKT',
    'Asia/Singapore': 'SGT',
    'Asia/Bangkok': 'ICT',
    'Asia/Kolkata': 'IST',
    'Asia/Dubai': 'GST',
    'Australia/Sydney': 'AEST',
    'Australia/Melbourne': 'AEST',
    'Australia/Perth': 'AWST',
  };
  
  return abbreviations[timezone] || timezone.split('/').pop()?.toUpperCase() || 'UTC';
}

/**
 * Format time with timezone
 * @param time - Time in HH:MM format
 * @param timezone - IANA timezone identifier
 * @returns Formatted time with timezone
 */
export function formatTimeWithTimezone(time: string, timezone: string): string {
  const abbreviation = getTimezoneAbbreviation(timezone);
  return `${time} (${abbreviation})`;
}

/**
 * Convert time between timezones
 * @param time - Time in HH:MM format
 * @param fromTimezone - Source timezone
 * @param toTimezone - Target timezone
 * @param date - Date for the time (defaults to today)
 * @returns Converted time in HH:MM format
 */
export function convertTimeBetweenTimezones(
  time: string,
  fromTimezone: string,
  toTimezone: string,
  date: string = new Date().toISOString().split('T')[0]
): string {
  try {
    const dateTimeString = `${date}T${time}:00`;
    const dateObj = new Date(dateTimeString);
    
    // Create a formatter for the source timezone
    const fromFormatter = new Intl.DateTimeFormat('en-US', {
      timeZone: fromTimezone,
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
    
    // Create a formatter for the target timezone
    const toFormatter = new Intl.DateTimeFormat('en-US', {
      timeZone: toTimezone,
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
    
    // Get the time in the target timezone
    const convertedTime = toFormatter.format(dateObj);
    return convertedTime;
  } catch (error) {
    console.error('Error converting timezone:', error);
    return time; // Return original time if conversion fails
  }
} 