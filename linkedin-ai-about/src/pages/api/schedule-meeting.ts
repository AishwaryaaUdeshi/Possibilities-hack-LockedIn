import { NextApiRequest, NextApiResponse } from 'next';
import { MeetingScheduleData } from '../../types/network';
import { sendCalendarInvites } from '../../lib/email';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { date, time, menteeEmail, mentorEmail, menteeName }: MeetingScheduleData = req.body;

  if (!date || !time || !menteeEmail || !mentorEmail || !menteeName) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Validate the date and time
    const meetingDate = new Date(`${date}T${time}:00`);
    if (isNaN(meetingDate.getTime())) {
      return res.status(400).json({ message: 'Invalid date or time format' });
    }

    // Check if meeting is in the future
    if (meetingDate <= new Date()) {
      return res.status(400).json({ message: 'Meeting must be scheduled for a future date and time' });
    }

    console.log('📅 Scheduling meeting:', {
      date,
      time,
      menteeEmail,
      mentorEmail,
      menteeName
    });

    // Send calendar invites to both parties
    await sendCalendarInvites({
      date,
      time,
      menteeEmail,
      mentorEmail,
      menteeName,
      mentorName: 'Your Mentor' // You can customize this based on your data
    });

    // In a real application, you would also:
    // 1. Store meeting details in database
    // 2. Update availability
    // 3. Send notifications
    
    res.status(200).json({ 
      message: 'Meeting scheduled successfully! Calendar invites have been sent.',
      meetingId: `meeting-${Date.now()}`,
      date,
      time,
      menteeEmail,
      mentorEmail,
      menteeName,
      note: 'Real calendar invites have been sent to both parties'
    });
  } catch (error) {
    console.error('❌ Error scheduling meeting:', error);
    
    // Check if it's an email error
    if (error.code === 'EAUTH' || error.code === 'ECONNECTION') {
      return res.status(500).json({ 
        message: 'Email service error. Please check your email configuration.',
        error: 'Email configuration issue'
      });
    }
    
    res.status(500).json({ 
      message: 'Internal server error while scheduling meeting',
      error: error.message 
    });
  }
} 