export interface ConnectRequestData {
  id: string;
  name: string;
  tagline: string;
  email: string;
  mentorEmail: string;
  profilePicture?: string;
  isVerifiedMatch: boolean;
  chatbotSummary?: string;
  availability?: AvailabilityData;
  createdAt: string;
}

export interface AvailabilityData {
  timeSlots: string[];
  timezone: string;
  preferredDays: string[];
}

export interface MeetingScheduleData {
  date: string;
  time: string;
  menteeEmail: string;
  mentorEmail: string;
  menteeName: string;
  mentorName?: string;
  timezone?: string;
}

export interface DatabaseUser {
  id: string;
  name: string;
  email: string;
  tagline: string;
  profilePicture?: string;
  isMentor: boolean;
  availability?: AvailabilityData;
  chatbotSummary?: string;
  verifiedMatches: string[]; // Array of user IDs that are verified matches
} 