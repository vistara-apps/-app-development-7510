/**
 * HealthFlow AI Application Context
 * Provides global state management for the application
 */

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Provider, Patient, Bot, MessageLog, Note, Appointment } from '../models';

// Initial state
const initialState = {
  // User/Provider data
  currentProvider: null,
  isAuthenticated: false,
  
  // Application data
  patients: [],
  bots: [],
  messages: [],
  notes: [],
  appointments: [],
  
  // UI state
  loading: false,
  error: null,
  notifications: [],
  
  // Settings
  settings: {
    theme: 'light',
    language: 'en',
    notifications: {
      email: true,
      sms: false,
      push: true
    }
  },
  
  // Analytics
  analytics: {
    totalPatients: 0,
    totalInteractions: 0,
    notesProcessed: 0,
    upcomingAppointments: 0
  }
};

// Action types
export const ActionTypes = {
  // Authentication
  SET_CURRENT_PROVIDER: 'SET_CURRENT_PROVIDER',
  SET_AUTHENTICATED: 'SET_AUTHENTICATED',
  LOGOUT: 'LOGOUT',
  
  // Data management
  SET_PATIENTS: 'SET_PATIENTS',
  ADD_PATIENT: 'ADD_PATIENT',
  UPDATE_PATIENT: 'UPDATE_PATIENT',
  DELETE_PATIENT: 'DELETE_PATIENT',
  
  SET_BOTS: 'SET_BOTS',
  ADD_BOT: 'ADD_BOT',
  UPDATE_BOT: 'UPDATE_BOT',
  DELETE_BOT: 'DELETE_BOT',
  
  SET_MESSAGES: 'SET_MESSAGES',
  ADD_MESSAGE: 'ADD_MESSAGE',
  UPDATE_MESSAGE: 'UPDATE_MESSAGE',
  
  SET_NOTES: 'SET_NOTES',
  ADD_NOTE: 'ADD_NOTE',
  UPDATE_NOTE: 'UPDATE_NOTE',
  DELETE_NOTE: 'DELETE_NOTE',
  
  SET_APPOINTMENTS: 'SET_APPOINTMENTS',
  ADD_APPOINTMENT: 'ADD_APPOINTMENT',
  UPDATE_APPOINTMENT: 'UPDATE_APPOINTMENT',
  DELETE_APPOINTMENT: 'DELETE_APPOINTMENT',
  
  // UI state
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
  ADD_NOTIFICATION: 'ADD_NOTIFICATION',
  REMOVE_NOTIFICATION: 'REMOVE_NOTIFICATION',
  
  // Settings
  UPDATE_SETTINGS: 'UPDATE_SETTINGS',
  
  // Analytics
  UPDATE_ANALYTICS: 'UPDATE_ANALYTICS'
};

// Reducer function
function appReducer(state, action) {
  switch (action.type) {
    case ActionTypes.SET_CURRENT_PROVIDER:
      return {
        ...state,
        currentProvider: action.payload,
        isAuthenticated: !!action.payload
      };
      
    case ActionTypes.SET_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: action.payload
      };
      
    case ActionTypes.LOGOUT:
      return {
        ...initialState,
        settings: state.settings // Preserve settings
      };
      
    case ActionTypes.SET_PATIENTS:
      return {
        ...state,
        patients: action.payload
      };
      
    case ActionTypes.ADD_PATIENT:
      return {
        ...state,
        patients: [...state.patients, action.payload]
      };
      
    case ActionTypes.UPDATE_PATIENT:
      return {
        ...state,
        patients: state.patients.map(patient =>
          patient.patientId === action.payload.patientId ? action.payload : patient
        )
      };
      
    case ActionTypes.DELETE_PATIENT:
      return {
        ...state,
        patients: state.patients.filter(patient => patient.patientId !== action.payload)
      };
      
    case ActionTypes.SET_BOTS:
      return {
        ...state,
        bots: action.payload
      };
      
    case ActionTypes.ADD_BOT:
      return {
        ...state,
        bots: [...state.bots, action.payload]
      };
      
    case ActionTypes.UPDATE_BOT:
      return {
        ...state,
        bots: state.bots.map(bot =>
          bot.botId === action.payload.botId ? action.payload : bot
        )
      };
      
    case ActionTypes.DELETE_BOT:
      return {
        ...state,
        bots: state.bots.filter(bot => bot.botId !== action.payload)
      };
      
    case ActionTypes.SET_MESSAGES:
      return {
        ...state,
        messages: action.payload
      };
      
    case ActionTypes.ADD_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload]
      };
      
    case ActionTypes.UPDATE_MESSAGE:
      return {
        ...state,
        messages: state.messages.map(message =>
          message.messageId === action.payload.messageId ? action.payload : message
        )
      };
      
    case ActionTypes.SET_NOTES:
      return {
        ...state,
        notes: action.payload
      };
      
    case ActionTypes.ADD_NOTE:
      return {
        ...state,
        notes: [...state.notes, action.payload]
      };
      
    case ActionTypes.UPDATE_NOTE:
      return {
        ...state,
        notes: state.notes.map(note =>
          note.noteId === action.payload.noteId ? action.payload : note
        )
      };
      
    case ActionTypes.DELETE_NOTE:
      return {
        ...state,
        notes: state.notes.filter(note => note.noteId !== action.payload)
      };
      
    case ActionTypes.SET_APPOINTMENTS:
      return {
        ...state,
        appointments: action.payload
      };
      
    case ActionTypes.ADD_APPOINTMENT:
      return {
        ...state,
        appointments: [...state.appointments, action.payload]
      };
      
    case ActionTypes.UPDATE_APPOINTMENT:
      return {
        ...state,
        appointments: state.appointments.map(appointment =>
          appointment.appointmentId === action.payload.appointmentId ? action.payload : appointment
        )
      };
      
    case ActionTypes.DELETE_APPOINTMENT:
      return {
        ...state,
        appointments: state.appointments.filter(appointment => appointment.appointmentId !== action.payload)
      };
      
    case ActionTypes.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };
      
    case ActionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
      
    case ActionTypes.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };
      
    case ActionTypes.ADD_NOTIFICATION:
      return {
        ...state,
        notifications: [...state.notifications, {
          id: Date.now(),
          ...action.payload
        }]
      };
      
    case ActionTypes.REMOVE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filter(notification => notification.id !== action.payload)
      };
      
    case ActionTypes.UPDATE_SETTINGS:
      return {
        ...state,
        settings: {
          ...state.settings,
          ...action.payload
        }
      };
      
    case ActionTypes.UPDATE_ANALYTICS:
      return {
        ...state,
        analytics: {
          ...state.analytics,
          ...action.payload
        }
      };
      
    default:
      return state;
  }
}

// Create context
const AppContext = createContext();

// Context provider component
export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  
  // Load data from localStorage on mount
  useEffect(() => {
    loadFromStorage();
  }, []);
  
  // Save to localStorage whenever state changes
  useEffect(() => {
    saveToStorage();
  }, [state.patients, state.bots, state.messages, state.notes, state.appointments, state.settings]);
  
  // Update analytics whenever data changes
  useEffect(() => {
    updateAnalytics();
  }, [state.patients, state.messages, state.notes, state.appointments]);
  
  const loadFromStorage = () => {
    try {
      const savedData = localStorage.getItem('healthflow-data');
      if (savedData) {
        const data = JSON.parse(savedData);
        
        // Load each data type
        if (data.patients) {
          dispatch({ type: ActionTypes.SET_PATIENTS, payload: data.patients.map(p => new Patient(p)) });
        }
        if (data.bots) {
          dispatch({ type: ActionTypes.SET_BOTS, payload: data.bots.map(b => new Bot(b)) });
        }
        if (data.messages) {
          dispatch({ type: ActionTypes.SET_MESSAGES, payload: data.messages.map(m => new MessageLog(m)) });
        }
        if (data.notes) {
          dispatch({ type: ActionTypes.SET_NOTES, payload: data.notes.map(n => new Note(n)) });
        }
        if (data.appointments) {
          dispatch({ type: ActionTypes.SET_APPOINTMENTS, payload: data.appointments.map(a => new Appointment(a)) });
        }
        if (data.settings) {
          dispatch({ type: ActionTypes.UPDATE_SETTINGS, payload: data.settings });
        }
        if (data.currentProvider) {
          dispatch({ type: ActionTypes.SET_CURRENT_PROVIDER, payload: new Provider(data.currentProvider) });
        }
      }
    } catch (error) {
      console.error('Error loading data from storage:', error);
    }
  };
  
  const saveToStorage = () => {
    try {
      const dataToSave = {
        patients: state.patients.map(p => p.toJSON()),
        bots: state.bots.map(b => b.toJSON()),
        messages: state.messages.map(m => m.toJSON()),
        notes: state.notes.map(n => n.toJSON()),
        appointments: state.appointments.map(a => a.toJSON()),
        settings: state.settings,
        currentProvider: state.currentProvider?.toJSON()
      };
      
      localStorage.setItem('healthflow-data', JSON.stringify(dataToSave));
    } catch (error) {
      console.error('Error saving data to storage:', error);
    }
  };
  
  const updateAnalytics = () => {
    const analytics = {
      totalPatients: state.patients.length,
      totalInteractions: state.messages.length,
      notesProcessed: state.notes.filter(note => note.summary).length,
      upcomingAppointments: state.appointments.filter(apt => new Appointment(apt).isUpcoming()).length
    };
    
    dispatch({ type: ActionTypes.UPDATE_ANALYTICS, payload: analytics });
  };
  
  // Action creators
  const actions = {
    // Authentication
    setCurrentProvider: (provider) => {
      dispatch({ type: ActionTypes.SET_CURRENT_PROVIDER, payload: provider });
    },
    
    logout: () => {
      localStorage.removeItem('healthflow-data');
      dispatch({ type: ActionTypes.LOGOUT });
    },
    
    // Patient management
    addPatient: (patientData) => {
      const patient = new Patient(patientData);
      dispatch({ type: ActionTypes.ADD_PATIENT, payload: patient });
      return patient;
    },
    
    updatePatient: (patientData) => {
      const patient = new Patient(patientData);
      dispatch({ type: ActionTypes.UPDATE_PATIENT, payload: patient });
      return patient;
    },
    
    deletePatient: (patientId) => {
      dispatch({ type: ActionTypes.DELETE_PATIENT, payload: patientId });
    },
    
    // Bot management
    addBot: (botData) => {
      const bot = new Bot(botData);
      dispatch({ type: ActionTypes.ADD_BOT, payload: bot });
      return bot;
    },
    
    updateBot: (botData) => {
      const bot = new Bot(botData);
      dispatch({ type: ActionTypes.UPDATE_BOT, payload: bot });
      return bot;
    },
    
    deleteBot: (botId) => {
      dispatch({ type: ActionTypes.DELETE_BOT, payload: botId });
    },
    
    // Message management
    addMessage: (messageData) => {
      const message = new MessageLog(messageData);
      dispatch({ type: ActionTypes.ADD_MESSAGE, payload: message });
      return message;
    },
    
    // Note management
    addNote: (noteData) => {
      const note = new Note(noteData);
      dispatch({ type: ActionTypes.ADD_NOTE, payload: note });
      return note;
    },
    
    updateNote: (noteData) => {
      const note = new Note(noteData);
      dispatch({ type: ActionTypes.UPDATE_NOTE, payload: note });
      return note;
    },
    
    deleteNote: (noteId) => {
      dispatch({ type: ActionTypes.DELETE_NOTE, payload: noteId });
    },
    
    // Appointment management
    addAppointment: (appointmentData) => {
      const appointment = new Appointment(appointmentData);
      dispatch({ type: ActionTypes.ADD_APPOINTMENT, payload: appointment });
      return appointment;
    },
    
    updateAppointment: (appointmentData) => {
      const appointment = new Appointment(appointmentData);
      dispatch({ type: ActionTypes.UPDATE_APPOINTMENT, payload: appointment });
      return appointment;
    },
    
    deleteAppointment: (appointmentId) => {
      dispatch({ type: ActionTypes.DELETE_APPOINTMENT, payload: appointmentId });
    },
    
    // UI state
    setLoading: (loading) => {
      dispatch({ type: ActionTypes.SET_LOADING, payload: loading });
    },
    
    setError: (error) => {
      dispatch({ type: ActionTypes.SET_ERROR, payload: error });
    },
    
    clearError: () => {
      dispatch({ type: ActionTypes.CLEAR_ERROR });
    },
    
    addNotification: (notification) => {
      dispatch({ type: ActionTypes.ADD_NOTIFICATION, payload: notification });
      
      // Auto-remove notification after 5 seconds
      setTimeout(() => {
        actions.removeNotification(notification.id || Date.now());
      }, 5000);
    },
    
    removeNotification: (id) => {
      dispatch({ type: ActionTypes.REMOVE_NOTIFICATION, payload: id });
    },
    
    // Settings
    updateSettings: (settings) => {
      dispatch({ type: ActionTypes.UPDATE_SETTINGS, payload: settings });
    }
  };
  
  const value = {
    state,
    actions,
    dispatch
  };
  
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

// Custom hook to use the context
export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

// Selector hooks for specific data
export function usePatients() {
  const { state } = useApp();
  return state.patients;
}

export function useBots() {
  const { state } = useApp();
  return state.bots;
}

export function useMessages() {
  const { state } = useApp();
  return state.messages;
}

export function useNotes() {
  const { state } = useApp();
  return state.notes;
}

export function useAppointments() {
  const { state } = useApp();
  return state.appointments;
}

export function useCurrentProvider() {
  const { state } = useApp();
  return state.currentProvider;
}

export function useAnalytics() {
  const { state } = useApp();
  return state.analytics;
}

export default AppContext;
