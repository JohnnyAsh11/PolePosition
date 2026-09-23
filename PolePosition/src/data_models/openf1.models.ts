
// Minor datatype for timing gap representations.
export type Gap = number | string | null

// Defines the data used to represent a Formula 1 session.
export interface Session {
  session_key: number;
  meeting_key: number;
  session_name: string;
  session_type: string;
  date_start: string;
  date_end: string;
  circuit_short_name: string;
  country_name: string;
  country_code: string;
  location: string;
  year: number;
  is_cancelled?: boolean;
};

// Defines the data representing a driver's position in a session.
export interface Position {
  date: string;
  driver_number: number;
  position: number;
}

// Defines the data representing an F1 driver.
export interface Driver {
  driver_number: number;
  full_name: string;
  name_acronym: string;
  team_name: string;
  team_colour: string;
}

// Defines the data representing a lap performed by a given driver.
export interface Lap {
  date_start: string | null;
  driver_number: number;
  lap_number: number;
  lap_duration: number | null;
  is_pit_out_lap: boolean;
}

// Defines the intervals between drivers in a session.
//  This is more reprsentative data than just the gap itself.
//  It is also associated with a driver.
export interface Interval {
  date: string;
  driver_number: number;
  gap_to_leader: Gap;
  interval: Gap;
}

// Defines the data representing a driver's result within a session.
export interface Result {
  driver_number: number;
  position: number | null;
  number_of_laps: number;
  duration: number | (number | null)[] | null;
  gap_to_leader: Gap | Gap[];
  dnf: boolean;
  dns: boolean;
  dsq: boolean;
}

// Data representing the weather in a given session. 
export interface Weather {
  date: string;
  air_temperature: number | null;
  track_temperature: number | null;
  humidity: number | null;
  wind_speed: number | null;
  rainfall: number | null;
}

// Defines the data output for a given race control message.
export interface RaceMessage {
  date: string | null;
  category: string;
  flag: string | null;
  message: string;
  lap_number: number | null;
  driver_number: number | null;
}

// Defines a snapshot of a F1 session for display purposes. 
export interface Snapshot {
  drivers: Driver[];
  positions: Position[];
  intervals: Interval[];
  laps: Lap[];
  results: Result[];
  weather: Weather[];
  messages: RaceMessage[];
  warnings: string[];
  fetchedAt: number;
  windowStart: string;
}

// Defines the standings of the drivers in a session. 
export interface Standing {
  driver: Driver;
  position: number | null;
  gap: Gap;
  interval: Gap;
  lap: number | null;
  lapTime: number | null;
  status: string;
  date: string | null;
}