# HealthFlow AI

**Streamline Practice, Enhance Patient Care with AI**

HealthFlow AI is an AI-powered platform for healthcare providers to automate patient communication, intake, and note summarization. Built with React, Tailwind CSS, and integrated with OpenAI, Twilio, and SendGrid APIs.

![HealthFlow AI Dashboard](https://via.placeholder.com/800x400/667eea/ffffff?text=HealthFlow+AI+Dashboard)

## 🚀 Features

### 🤖 **Automated FAQ Bot**
- AI chatbot that answers common patient questions
- Customizable knowledge base
- Supports English and Spanish
- Instant 24/7 patient support

### 📅 **Appointment & Re-engagement Reminders**
- Automated SMS and email reminders
- Proactive follow-up for missed appointments
- Reduces no-show rates significantly

### 📝 **AI-Powered Note Summarization**
- Processes clinical notes and consultation recordings
- Generates concise, actionable summaries
- Extracts key information like diagnoses and treatment plans
- Saves clinicians significant documentation time

### 📋 **Automated Patient Intake Forms**
- Smart digital intake forms
- Pre-fills known patient information
- Guided data entry via web interface
- Reduces manual data entry errors

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS
- **AI Integration**: OpenAI GPT-4
- **Communication**: Twilio (SMS), SendGrid (Email)
- **State Management**: React Context + useReducer
- **Icons**: Lucide React
- **Styling**: Tailwind CSS with custom design system

## 📦 Installation

### Prerequisites

- Node.js 18+ and npm/yarn
- OpenAI API key
- Twilio account (for SMS)
- SendGrid account (for email)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/vistara-apps/-app-development-7510.git
   cd -app-development-7510
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```

4. **Configure your `.env` file**
   ```env
   # OpenAI Configuration
   VITE_OPENAI_API_KEY=your_openai_api_key_here
   VITE_OPENAI_MODEL=gpt-4

   # Twilio SMS Configuration
   VITE_TWILIO_ACCOUNT_SID=your_twilio_account_sid
   VITE_TWILIO_AUTH_TOKEN=your_twilio_auth_token
   VITE_TWILIO_PHONE_NUMBER=your_twilio_phone_number

   # SendGrid Email Configuration
   VITE_SENDGRID_API_KEY=your_sendgrid_api_key
   VITE_SENDGRID_FROM_EMAIL=noreply@healthflow-ai.com
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:5173`

## 🔧 Configuration

### API Keys Setup

#### OpenAI API Key
1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create a new API key
3. Add it to your `.env` file as `VITE_OPENAI_API_KEY`

#### Twilio Setup
1. Sign up at [Twilio](https://www.twilio.com/)
2. Get your Account SID and Auth Token from the console
3. Purchase a phone number for SMS
4. Add credentials to your `.env` file

#### SendGrid Setup
1. Sign up at [SendGrid](https://sendgrid.com/)
2. Create an API key with mail send permissions
3. Verify your sender email address
4. Add credentials to your `.env` file

### Rate Limiting
The application includes built-in rate limiting:
- 60 requests per minute by default
- Configurable via `VITE_RATE_LIMIT_REQUESTS_PER_MINUTE`

## 🏗️ Architecture

### Data Models
- **Provider**: Healthcare provider/practice information
- **Patient**: Patient demographics and preferences
- **Bot**: AI chatbot configuration and knowledge base
- **MessageLog**: Chat interaction history
- **Note**: Clinical notes and AI summaries
- **Appointment**: Appointment scheduling and reminders

### State Management
- React Context for global state
- useReducer for complex state updates
- localStorage for data persistence
- Real-time analytics updates

### API Integration
- **OpenAI Service**: AI chat responses and note summarization
- **SMS Service**: Twilio integration for appointment reminders
- **Email Service**: SendGrid integration for notifications
- **Error Handling**: Comprehensive error boundaries and fallbacks

## 🎨 Design System

### Colors
- **Primary**: `hsl(204 70% 53%)` - Blue
- **Accent**: `hsl(159 60% 48%)` - Green
- **Background**: `hsl(210 36% 96%)` - Light gray
- **Surface**: `hsl(255 100% 100%)` - White

### Typography
- **Font**: Inter (Google Fonts)
- **Display**: 5xl, bold, tight leading
- **Heading 1**: 3xl, semibold, tight leading
- **Body**: base, normal, relaxed leading

### Components
- Glass morphism effects with backdrop blur
- Consistent spacing using 8px grid system
- Smooth transitions and hover effects
- Responsive design for all screen sizes

## 📱 Usage

### For Healthcare Providers

1. **Dashboard Overview**
   - View key metrics and analytics
   - Monitor patient interactions
   - Track appointment schedules

2. **AI Chat Configuration**
   - Customize bot responses
   - Update knowledge base
   - Monitor chat interactions

3. **Note Summarization**
   - Upload clinical notes
   - Get AI-generated summaries
   - Review and edit summaries

4. **Patient Management**
   - View patient intake forms
   - Send appointment reminders
   - Track communication history

### For Patients

1. **AI Chat Support**
   - Ask questions about clinic hours
   - Get insurance information
   - Schedule appointments

2. **Digital Intake Forms**
   - Complete forms before visits
   - Update medical information
   - Receive confirmation

## 🔒 Security & Privacy

- **API Key Security**: Environment variables for sensitive data
- **Rate Limiting**: Prevents API abuse
- **Error Boundaries**: Graceful error handling
- **Input Sanitization**: Prevents XSS attacks
- **HIPAA Considerations**: Designed with healthcare privacy in mind

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Docker Deployment
```bash
docker build -t healthflow-ai .
docker run -p 3000:3000 healthflow-ai
```

### Environment Variables for Production
Ensure all environment variables are properly set in your production environment.

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## 📈 Analytics & Monitoring

The application tracks:
- Total patient interactions
- AI response times
- Note processing statistics
- Appointment reminder success rates

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- 📧 Email: support@healthflow-ai.com
- 📞 Phone: (555) 123-4567
- 💬 Chat: Available in the application

## 🗺️ Roadmap

### Phase 1 (Current)
- ✅ AI Chat Bot
- ✅ Note Summarization
- ✅ Patient Intake Forms
- ✅ Appointment Reminders

### Phase 2 (Planned)
- 🔄 Voice-to-text integration
- 🔄 Multi-language support
- 🔄 Advanced analytics dashboard
- 🔄 Integration with EHR systems

### Phase 3 (Future)
- 🔄 Mobile application
- 🔄 Telemedicine integration
- 🔄 Advanced AI diagnostics
- 🔄 Blockchain for data security

## 🙏 Acknowledgments

- OpenAI for GPT-4 API
- Twilio for SMS services
- SendGrid for email services
- React team for the amazing framework
- Tailwind CSS for the utility-first CSS framework

---

**Built with ❤️ for healthcare providers worldwide**
