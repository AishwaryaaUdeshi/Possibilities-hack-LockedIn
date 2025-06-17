import { NextApiRequest, NextApiResponse } from 'next';
import { MeetingScheduleData } from '../../../types/network';
import { sendCalendarInvites } from '../../lib/email';
import { db } from '../../lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { date, time, menteeEmail, mentorEmail, menteeName, mentorName, timezone }: MeetingScheduleData = req.body;

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

    // Get the actual mentor name from the database
    let actualMentorName = mentorName;
    if (!actualMentorName) {
      try {
        const interactionsRef = collection(db, 'interactions');
        const q = query(
          interactionsRef,
          where('mentorEmail', '==', mentorEmail),
          where('menteeEmail', '==', menteeEmail)
        );
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const data = querySnapshot.docs[0].data();
          actualMentorName = data.mentorProfile?.name || 'Mentor';
        }
      } catch (error) {
        console.log('Could not fetch mentor name, using default');
        actualMentorName = 'Mentor';
      }
    }

    console.log('📅 Scheduling meeting:', {
      date,
      time,
      menteeEmail,
      mentorEmail,
      menteeName,
      mentorName: actualMentorName,
      timezone
    });

    // Send calendar invites to both parties
    await sendCalendarInvites({
      date,
      time,
      menteeEmail,
      mentorEmail,
      menteeName,
      mentorName: actualMentorName,
      timezone: timezone || 'UTC'
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
      mentorName: actualMentorName,
      timezone,
      note: 'Real calendar invites have been sent to both parties'
    });
  } catch (error) {
    console.error('❌ Error scheduling meeting:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
} 