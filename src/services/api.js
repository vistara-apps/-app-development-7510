/**
 * HealthFlow AI API Service Layer
 * Handles all external API integrations including OpenAI, Twilio, and SendGrid
 */

import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Note: In production, API calls should go through your backend
});

// Rate limiting helper
class RateLimiter {
  constructor(requestsPerMinute = 60) {
    this.requests = [];
    this.limit = requestsPerMinute;
  }

  canMakeRequest() {
    const now = Date.now();
    this.requests = this.requests.filter(time => now - time < 60000); // Keep only requests from last minute
    return this.requests.length < this.limit;
  }

  recordRequest() {
    this.requests.push(Date.now());
  }
}

const rateLimiter = new RateLimiter(
  parseInt(import.meta.env.VITE_RATE_LIMIT_REQUESTS_PER_MINUTE) || 60
);

// OpenAI Service
export const openAIService = {
  /**
   * Generate AI chat response for patient FAQ bot
   */
  async generateChatResponse(message, context = {}) {
    if (!rateLimiter.canMakeRequest()) {
      throw new Error('Rate limit exceeded. Please try again later.');
    }

    try {
      rateLimiter.recordRequest();
      
      const systemPrompt = `You are a helpful medical office assistant AI. You help patients with:
      - Clinic hours and location information
      - Insurance and billing questions
      - Appointment scheduling guidance
      - General medical office procedures
      - Preparation instructions for visits
      
      Practice Information:
      - Hours: Monday-Friday 8:00 AM - 6:00 PM, Saturday 9:00 AM - 2:00 PM
      - Location: 123 Medical Center Drive, Suite 200
      - Phone: (555) 123-4567
      - Accepted Insurance: Most major plans including BCBS, Aetna, Cigna, UnitedHealthcare
      
      Keep responses helpful, professional, and concise. If you cannot answer a medical question, direct them to speak with their healthcare provider.`;

      const response = await openai.chat.completions.create({
        model: import.meta.env.VITE_OPENAI_MODEL || 'gpt-4',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        max_tokens: 300,
        temperature: 0.7,
      });

      return response.choices[0].message.content;
    } catch (error) {
      console.error('OpenAI API Error:', error);
      throw new Error('Failed to generate AI response. Please try again.');
    }
  },

  /**
   * Summarize clinical notes using AI
   */
  async summarizeNotes(noteText, patientContext = {}) {
    if (!rateLimiter.canMakeRequest()) {
      throw new Error('Rate limit exceeded. Please try again later.');
    }

    try {
      rateLimiter.recordRequest();

      const systemPrompt = `You are a medical AI assistant that summarizes clinical notes. Create a concise, structured summary that includes:
      
      1. Chief Complaint
      2. Key Findings
      3. Assessment/Diagnosis
      4. Treatment Plan
      5. Follow-up Instructions
      
      Keep the summary professional, accurate, and focused on actionable information for healthcare providers.`;

      const response = await openai.chat.completions.create({
        model: import.meta.env.VITE_OPENAI_MODEL || 'gpt-4',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Please summarize the following clinical note:\n\n${noteText}` }
        ],
        max_tokens: 500,
        temperature: 0.3,
      });

      return response.choices[0].message.content;
    } catch (error) {
      console.error('OpenAI API Error:', error);
      throw new Error('Failed to summarize notes. Please try again.');
    }
  },

  /**
   * Generate smart intake form questions based on patient data
   */
  async generateIntakeQuestions(patientType, existingData = {}) {
    if (!rateLimiter.canMakeRequest()) {
      throw new Error('Rate limit exceeded. Please try again later.');
    }

    try {
      rateLimiter.recordRequest();

      const systemPrompt = `Generate relevant intake form questions for a ${patientType} patient visit. Return a JSON array of question objects with the following structure:
      {
        "id": "unique_id",
        "question": "Question text",
        "type": "text|select|checkbox|date",
        "required": true/false,
        "options": ["option1", "option2"] // for select type only
      }
      
      Focus on essential medical history, current symptoms, medications, and relevant health information.`;

      const response = await openai.chat.completions.create({
        model: import.meta.env.VITE_OPENAI_MODEL || 'gpt-4',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Generate intake questions for: ${patientType}` }
        ],
        max_tokens: 800,
        temperature: 0.5,
      });

      return JSON.parse(response.choices[0].message.content);
    } catch (error) {
      console.error('OpenAI API Error:', error);
      // Return default questions if AI fails
      return [
        {
          id: 'chief_complaint',
          question: 'What is the main reason for your visit today?',
          type: 'text',
          required: true
        },
        {
          id: 'current_medications',
          question: 'Please list all current medications',
          type: 'text',
          required: false
        },
        {
          id: 'allergies',
          question: 'Do you have any known allergies?',
          type: 'text',
          required: false
        }
      ];
    }
  }
};

// Twilio SMS Service
export const smsService = {
  /**
   * Send appointment reminder via SMS
   * Note: In production, this should be handled by your backend server
   */
  async sendAppointmentReminder(phoneNumber, appointmentDetails) {
    try {
      // This is a mock implementation - in production, you'd call your backend API
      // which would then use Twilio's server-side SDK
      
      const message = `HealthFlow AI Reminder: You have an appointment scheduled for ${appointmentDetails.date} at ${appointmentDetails.time}. Please call (555) 123-4567 if you need to reschedule.`;
      
      console.log('SMS would be sent to:', phoneNumber);
      console.log('Message:', message);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return {
        success: true,
        messageId: `mock_${Date.now()}`,
        message: 'Reminder sent successfully'
      };
    } catch (error) {
      console.error('SMS Service Error:', error);
      throw new Error('Failed to send SMS reminder');
    }
  },

  /**
   * Send follow-up message for missed appointments
   */
  async sendFollowUpMessage(phoneNumber, patientName) {
    try {
      const message = `Hi ${patientName}, we noticed you missed your appointment today. Please call us at (555) 123-4567 to reschedule. Your health is important to us!`;
      
      console.log('Follow-up SMS would be sent to:', phoneNumber);
      console.log('Message:', message);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return {
        success: true,
        messageId: `followup_${Date.now()}`,
        message: 'Follow-up message sent successfully'
      };
    } catch (error) {
      console.error('SMS Service Error:', error);
      throw new Error('Failed to send follow-up message');
    }
  }
};

// Email Service (SendGrid)
export const emailService = {
  /**
   * Send appointment reminder via email
   */
  async sendAppointmentReminderEmail(email, appointmentDetails) {
    try {
      // Mock implementation - in production, this would call your backend API
      const emailContent = {
        to: email,
        subject: 'Appointment Reminder - HealthFlow AI',
        html: `
          <h2>Appointment Reminder</h2>
          <p>Dear ${appointmentDetails.patientName},</p>
          <p>This is a reminder that you have an appointment scheduled:</p>
          <ul>
            <li><strong>Date:</strong> ${appointmentDetails.date}</li>
            <li><strong>Time:</strong> ${appointmentDetails.time}</li>
            <li><strong>Provider:</strong> ${appointmentDetails.provider}</li>
            <li><strong>Location:</strong> 123 Medical Center Drive, Suite 200</li>
          </ul>
          <p>Please arrive 15 minutes early and bring your insurance card and ID.</p>
          <p>If you need to reschedule, please call us at (555) 123-4567.</p>
          <p>Best regards,<br>HealthFlow AI Team</p>
        `
      };
      
      console.log('Email would be sent:', emailContent);
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      return {
        success: true,
        messageId: `email_${Date.now()}`,
        message: 'Email reminder sent successfully'
      };
    } catch (error) {
      console.error('Email Service Error:', error);
      throw new Error('Failed to send email reminder');
    }
  },

  /**
   * Send intake form link to patient
   */
  async sendIntakeFormLink(email, patientName, formLink) {
    try {
      const emailContent = {
        to: email,
        subject: 'Complete Your Patient Intake Form - HealthFlow AI',
        html: `
          <h2>Patient Intake Form</h2>
          <p>Dear ${patientName},</p>
          <p>Please complete your patient intake form before your upcoming appointment:</p>
          <p><a href="${formLink}" style="background-color: #3B82F6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">Complete Intake Form</a></p>
          <p>This will help us provide you with the best possible care during your visit.</p>
          <p>If you have any questions, please call us at (555) 123-4567.</p>
          <p>Best regards,<br>HealthFlow AI Team</p>
        `
      };
      
      console.log('Intake form email would be sent:', emailContent);
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      return {
        success: true,
        messageId: `intake_${Date.now()}`,
        message: 'Intake form link sent successfully'
      };
    } catch (error) {
      console.error('Email Service Error:', error);
      throw new Error('Failed to send intake form link');
    }
  }
};

// Utility functions
export const apiUtils = {
  /**
   * Validate API configuration
   */
  validateConfig() {
    const requiredEnvVars = [
      'VITE_OPENAI_API_KEY',
      'VITE_TWILIO_ACCOUNT_SID',
      'VITE_SENDGRID_API_KEY'
    ];
    
    const missing = requiredEnvVars.filter(envVar => !import.meta.env[envVar]);
    
    if (missing.length > 0) {
      console.warn('Missing environment variables:', missing);
      return false;
    }
    
    return true;
  },

  /**
   * Handle API errors consistently
   */
  handleApiError(error, context = '') {
    console.error(`API Error ${context}:`, error);
    
    if (error.message.includes('rate limit')) {
      return 'Rate limit exceeded. Please try again in a moment.';
    }
    
    if (error.message.includes('network') || error.message.includes('fetch')) {
      return 'Network error. Please check your connection and try again.';
    }
    
    return error.message || 'An unexpected error occurred. Please try again.';
  }
};

export default {
  openAIService,
  smsService,
  emailService,
  apiUtils
};
