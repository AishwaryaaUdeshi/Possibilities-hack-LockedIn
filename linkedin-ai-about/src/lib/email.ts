import nodemailer from 'nodemailer';

// Create transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

interface CalendarInviteData {
  date: string;
  time: string;
  menteeEmail: string;
  mentorEmail: string;
  menteeName: string;
  mentorName?: string;
}

// Generate iCal calendar event
function generateCalendarEvent(data: CalendarInviteData) {
  const startDate = new Date(`${data.date}T${data.time}:00`);
  const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // 1 hour later
  
  const eventId = `meeting-${Date.now()}@linkedin-clone.com`;
  
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//LinkedIn Clone//Calendar Event//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:REQUEST',
    'BEGIN:VEVENT',
    `UID:${eventId}`,
    `DTSTART:${startDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
    `DTEND:${endDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
    `ORGANIZER;CN=LinkedIn Clone:mailto:${process.env.EMAIL_USER}`,
    `ATTENDEE;ROLE=REQ-PARTICIPANT;PARTSTAT=NEEDS-ACTION;RSVP=TRUE;CN=${data.menteeName}:mailto:${data.menteeEmail}`,
    `ATTENDEE;ROLE=REQ-PARTICIPANT;PARTSTAT=NEEDS-ACTION;RSVP=TRUE;CN=${data.mentorName || 'Mentor'}:mailto:${data.mentorEmail}`,
    `SUMMARY:Mentor-Mentee Meeting: ${data.menteeName} & ${data.mentorName || 'Mentor'}`,
    `DESCRIPTION:Professional development meeting between ${data.menteeName} and ${data.mentorName || 'mentor'}.\\n\\nThis meeting was scheduled through LinkedIn Clone's networking platform.`,
    'CLASS:PUBLIC',
    'PRIORITY:5',
    'TRANSP:OPAQUE',
    'STATUS:CONFIRMED',
    'SEQUENCE:0',
    'BEGIN:VALARM',
    'TRIGGER:-PT15M',
    'ACTION:DISPLAY',
    'DESCRIPTION:Reminder: Mentor-Mentee Meeting',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');
}

// Send calendar invite to mentee
export async function sendCalendarInviteToMentee(data: CalendarInviteData) {
  const calendarEvent = generateCalendarEvent(data);
  
  const mailOptions = {
    from: `"LinkedIn Clone" <${process.env.EMAIL_USER}>`,
    to: data.menteeEmail,
    subject: `Calendar Invite: Meeting with ${data.mentorName || 'Mentor'} on ${data.date}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #0077b5;">📅 Meeting Scheduled!</h2>
        <p>Hi ${data.menteeName},</p>
        <p>Your mentor meeting has been scheduled successfully!</p>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #0077b5;">Meeting Details</h3>
          <p><strong>Date:</strong> ${new Date(data.date).toLocaleDateString()}</p>
          <p><strong>Time:</strong> ${data.time}</p>
          <p><strong>Mentor:</strong> ${data.mentorName || 'Your mentor'}</p>
        </div>
        
        <p>Please add this meeting to your calendar. The calendar invite is attached to this email.</p>
        
        <p style="color: #666; font-size: 14px;">
          This meeting was scheduled through LinkedIn Clone's networking platform.
        </p>
      </div>
    `,
    attachments: [
      {
        filename: 'meeting.ics',
        content: calendarEvent,
        contentType: 'text/calendar; method=REQUEST; charset=UTF-8'
      }
    ]
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    console.log('✅ Calendar invite sent to mentee:', data.menteeEmail);
    return result;
  } catch (error) {
    console.error('❌ Error sending calendar invite to mentee:', error);
    throw error;
  }
}

// Send calendar invite to mentor
export async function sendCalendarInviteToMentor(data: CalendarInviteData) {
  const calendarEvent = generateCalendarEvent(data);
  
  const mailOptions = {
    from: `"LinkedIn Clone" <${process.env.EMAIL_USER}>`,
    to: data.mentorEmail,
    subject: `Calendar Invite: Meeting with ${data.menteeName} on ${data.date}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #0077b5;">📅 New Mentee Meeting</h2>
        <p>Hi ${data.mentorName || 'Mentor'},</p>
        <p>A new mentee meeting has been scheduled with you!</p>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #0077b5;">Meeting Details</h3>
          <p><strong>Date:</strong> ${new Date(data.date).toLocaleDateString()}</p>
          <p><strong>Time:</strong> ${data.time}</p>
          <p><strong>Mentee:</strong> ${data.menteeName}</p>
        </div>
        
        <p>Please add this meeting to your calendar. The calendar invite is attached to this email.</p>
        
        <p style="color: #666; font-size: 14px;">
          This meeting was scheduled through LinkedIn Clone's networking platform.
        </p>
      </div>
    `,
    attachments: [
      {
        filename: 'meeting.ics',
        content: calendarEvent,
        contentType: 'text/calendar; method=REQUEST; charset=UTF-8'
      }
    ]
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    console.log('✅ Calendar invite sent to mentor:', data.mentorEmail);
    return result;
  } catch (error) {
    console.error('❌ Error sending calendar invite to mentor:', error);
    throw error;
  }
}

// Send calendar invites to both parties
export async function sendCalendarInvites(data: CalendarInviteData) {
  try {
    console.log('📧 Sending calendar invites...');
    
    // Send to mentee
    await sendCalendarInviteToMentee(data);
    
    // Send to mentor
    await sendCalendarInviteToMentor(data);
    
    console.log('✅ All calendar invites sent successfully!');
    return { success: true };
  } catch (error) {
    console.error('❌ Error sending calendar invites:', error);
    throw error;
  }
} 