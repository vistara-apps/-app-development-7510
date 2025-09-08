/**
 * HealthFlow AI Data Models
 * Defines the data structures as specified in the PRD
 */

// Provider Entity
export class Provider {
  constructor(data = {}) {
    this.providerId = data.providerId || this.generateId();
    this.name = data.name || '';
    this.email = data.email || '';
    this.practiceName = data.practiceName || '';
    this.subscriptionTier = data.subscriptionTier || 'basic';
    this.createdAt = data.createdAt || new Date().toISOString();
    this.updatedAt = data.updatedAt || new Date().toISOString();
    
    // Additional fields for production
    this.phone = data.phone || '';
    this.address = data.address || {};
    this.settings = data.settings || this.getDefaultSettings();
    this.isActive = data.isActive !== undefined ? data.isActive : true;
  }

  generateId() {
    return 'provider_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  getDefaultSettings() {
    return {
      notifications: {
        email: true,
        sms: false,
        push: true
      },
      aiSettings: {
        model: 'gpt-4',
        temperature: 0.7,
        maxTokens: 300
      },
      businessHours: {
        monday: { open: '08:00', close: '18:00', closed: false },
        tuesday: { open: '08:00', close: '18:00', closed: false },
        wednesday: { open: '08:00', close: '18:00', closed: false },
        thursday: { open: '08:00', close: '18:00', closed: false },
        friday: { open: '08:00', close: '18:00', closed: false },
        saturday: { open: '09:00', close: '14:00', closed: false },
        sunday: { open: '00:00', close: '00:00', closed: true }
      }
    };
  }

  toJSON() {
    return {
      providerId: this.providerId,
      name: this.name,
      email: this.email,
      practiceName: this.practiceName,
      subscriptionTier: this.subscriptionTier,
      phone: this.phone,
      address: this.address,
      settings: this.settings,
      isActive: this.isActive,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}

// Patient Entity
export class Patient {
  constructor(data = {}) {
    this.patientId = data.patientId || this.generateId();
    this.providerId = data.providerId || '';
    this.name = data.name || '';
    this.email = data.email || '';
    this.phone = data.phone || '';
    this.dob = data.dob || '';
    this.intakeStatus = data.intakeStatus || 'pending'; // pending, completed, expired
    this.appointmentHistory = data.appointmentHistory || [];
    this.createdAt = data.createdAt || new Date().toISOString();
    this.updatedAt = data.updatedAt || new Date().toISOString();
    
    // Additional fields
    this.address = data.address || {};
    this.insurance = data.insurance || {};
    this.emergencyContact = data.emergencyContact || {};
    this.medicalHistory = data.medicalHistory || {};
    this.preferences = data.preferences || this.getDefaultPreferences();
    this.isActive = data.isActive !== undefined ? data.isActive : true;
  }

  generateId() {
    return 'patient_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  getDefaultPreferences() {
    return {
      communicationMethod: 'email', // email, sms, both
      language: 'en',
      reminderTiming: 24 // hours before appointment
    };
  }

  getAge() {
    if (!this.dob) return null;
    const today = new Date();
    const birthDate = new Date(this.dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  toJSON() {
    return {
      patientId: this.patientId,
      providerId: this.providerId,
      name: this.name,
      email: this.email,
      phone: this.phone,
      dob: this.dob,
      intakeStatus: this.intakeStatus,
      appointmentHistory: this.appointmentHistory,
      address: this.address,
      insurance: this.insurance,
      emergencyContact: this.emergencyContact,
      medicalHistory: this.medicalHistory,
      preferences: this.preferences,
      isActive: this.isActive,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}

// Bot Entity
export class Bot {
  constructor(data = {}) {
    this.botId = data.botId || this.generateId();
    this.providerId = data.providerId || '';
    this.name = data.name || 'HealthFlow Assistant';
    this.knowledgeBase = data.knowledgeBase || this.getDefaultKnowledgeBase();
    this.language = data.language || 'en';
    this.responseFormat = data.responseFormat || 'conversational';
    this.createdAt = data.createdAt || new Date().toISOString();
    this.updatedAt = data.updatedAt || new Date().toISOString();
    
    // Additional fields
    this.isActive = data.isActive !== undefined ? data.isActive : true;
    this.personality = data.personality || 'professional';
    this.customPrompts = data.customPrompts || {};
    this.analytics = data.analytics || this.getDefaultAnalytics();
  }

  generateId() {
    return 'bot_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  getDefaultKnowledgeBase() {
    return {
      clinicInfo: {
        name: 'HealthFlow Medical Center',
        address: '123 Medical Center Drive, Suite 200',
        phone: '(555) 123-4567',
        hours: 'Monday-Friday 8:00 AM - 6:00 PM, Saturday 9:00 AM - 2:00 PM'
      },
      services: [
        'General Medicine',
        'Preventive Care',
        'Chronic Disease Management',
        'Health Screenings'
      ],
      insurance: [
        'Blue Cross Blue Shield',
        'Aetna',
        'Cigna',
        'UnitedHealthcare'
      ],
      faqs: [
        {
          question: 'What should I bring to my appointment?',
          answer: 'Please bring a valid ID, your insurance card, and a list of current medications.'
        },
        {
          question: 'How do I schedule an appointment?',
          answer: 'You can call us at (555) 123-4567 or use our online booking system.'
        }
      ]
    };
  }

  getDefaultAnalytics() {
    return {
      totalInteractions: 0,
      averageResponseTime: 0,
      satisfactionRating: 0,
      commonQuestions: [],
      lastUpdated: new Date().toISOString()
    };
  }

  toJSON() {
    return {
      botId: this.botId,
      providerId: this.providerId,
      name: this.name,
      knowledgeBase: this.knowledgeBase,
      language: this.language,
      responseFormat: this.responseFormat,
      isActive: this.isActive,
      personality: this.personality,
      customPrompts: this.customPrompts,
      analytics: this.analytics,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}

// MessageLog Entity
export class MessageLog {
  constructor(data = {}) {
    this.messageId = data.messageId || this.generateId();
    this.providerId = data.providerId || '';
    this.patientId = data.patientId || '';
    this.botId = data.botId || '';
    this.timestamp = data.timestamp || new Date().toISOString();
    this.direction = data.direction || 'incoming'; // incoming, outgoing
    this.content = data.content || '';
    this.type = data.type || 'text'; // text, image, file
    this.metadata = data.metadata || {};
    
    // Additional fields
    this.status = data.status || 'delivered'; // sent, delivered, read, failed
    this.responseTime = data.responseTime || null;
    this.sentiment = data.sentiment || null;
  }

  generateId() {
    return 'msg_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  toJSON() {
    return {
      messageId: this.messageId,
      providerId: this.providerId,
      patientId: this.patientId,
      botId: this.botId,
      timestamp: this.timestamp,
      direction: this.direction,
      content: this.content,
      type: this.type,
      metadata: this.metadata,
      status: this.status,
      responseTime: this.responseTime,
      sentiment: this.sentiment
    };
  }
}

// Note Entity
export class Note {
  constructor(data = {}) {
    this.noteId = data.noteId || this.generateId();
    this.providerId = data.providerId || '';
    this.patientId = data.patientId || '';
    this.rawContent = data.rawContent || '';
    this.summary = data.summary || '';
    this.timestamp = data.timestamp || new Date().toISOString();
    this.createdAt = data.createdAt || new Date().toISOString();
    this.updatedAt = data.updatedAt || new Date().toISOString();
    
    // Additional fields
    this.type = data.type || 'clinical'; // clinical, consultation, follow-up
    this.status = data.status || 'draft'; // draft, final, archived
    this.tags = data.tags || [];
    this.attachments = data.attachments || [];
    this.wordCount = data.wordCount || this.calculateWordCount();
    this.processingTime = data.processingTime || null;
  }

  generateId() {
    return 'note_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  calculateWordCount() {
    return this.rawContent.split(/\s+/).filter(word => word.length > 0).length;
  }

  getSummaryStats() {
    const originalWords = this.calculateWordCount();
    const summaryWords = this.summary.split(/\s+/).filter(word => word.length > 0).length;
    const compressionRatio = originalWords > 0 ? (summaryWords / originalWords * 100).toFixed(1) : 0;
    
    return {
      originalWords,
      summaryWords,
      compressionRatio: `${compressionRatio}%`,
      timeSaved: Math.max(0, Math.floor((originalWords - summaryWords) / 200 * 60)) // Assuming 200 words per minute reading speed
    };
  }

  toJSON() {
    return {
      noteId: this.noteId,
      providerId: this.providerId,
      patientId: this.patientId,
      rawContent: this.rawContent,
      summary: this.summary,
      timestamp: this.timestamp,
      type: this.type,
      status: this.status,
      tags: this.tags,
      attachments: this.attachments,
      wordCount: this.wordCount,
      processingTime: this.processingTime,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}

// Appointment Entity
export class Appointment {
  constructor(data = {}) {
    this.appointmentId = data.appointmentId || this.generateId();
    this.providerId = data.providerId || '';
    this.patientId = data.patientId || '';
    this.dateTime = data.dateTime || '';
    this.status = data.status || 'scheduled'; // scheduled, confirmed, completed, cancelled, no-show
    this.reminderSent = data.reminderSent || false;
    this.createdAt = data.createdAt || new Date().toISOString();
    this.updatedAt = data.updatedAt || new Date().toISOString();
    
    // Additional fields
    this.type = data.type || 'consultation'; // consultation, follow-up, screening
    this.duration = data.duration || 30; // minutes
    this.provider = data.provider || '';
    this.location = data.location || '';
    this.notes = data.notes || '';
    this.reminderHistory = data.reminderHistory || [];
    this.cancellationReason = data.cancellationReason || '';
  }

  generateId() {
    return 'appt_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  isUpcoming() {
    return new Date(this.dateTime) > new Date();
  }

  isPast() {
    return new Date(this.dateTime) < new Date();
  }

  getFormattedDateTime() {
    const date = new Date(this.dateTime);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      dayOfWeek: date.toLocaleDateString('en-US', { weekday: 'long' })
    };
  }

  shouldSendReminder() {
    if (this.reminderSent || this.status !== 'scheduled') return false;
    
    const appointmentTime = new Date(this.dateTime);
    const now = new Date();
    const hoursUntilAppointment = (appointmentTime - now) / (1000 * 60 * 60);
    
    return hoursUntilAppointment <= 24 && hoursUntilAppointment > 0;
  }

  toJSON() {
    return {
      appointmentId: this.appointmentId,
      providerId: this.providerId,
      patientId: this.patientId,
      dateTime: this.dateTime,
      status: this.status,
      reminderSent: this.reminderSent,
      type: this.type,
      duration: this.duration,
      provider: this.provider,
      location: this.location,
      notes: this.notes,
      reminderHistory: this.reminderHistory,
      cancellationReason: this.cancellationReason,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}

// Export all models
export default {
  Provider,
  Patient,
  Bot,
  MessageLog,
  Note,
  Appointment
};
