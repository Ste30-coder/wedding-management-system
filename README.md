# 💍 Wedding Guest Platform - RSVP & WhatsApp Automation

A multi-tenant SaaS application designed for high-scale Indian weddings. This platform automates guest management, personalized bulk invitations, and AI-driven RSVP tracking via WhatsApp.

---

## 🚀 Key Features

### 1. **Bulk WhatsApp Campaigns**
*   Launch mass invitations with personalized guest names and event details.
*   Uses **BullMQ** for reliable background message delivery (scaling to thousands of guests).
*   Mock mode available for development without real WhatsApp costs.

### 2. **Intelligent RSVP Automation**
*   **Inbound Classifier**: Automatically understands "Yes", "No", or Malayalam/Hinglish replies.
*   **Headcount Extraction**: Automatically parses message text to update guest counts (e.g., "Coming with 3").
*   **Automated Auto-Replies**: Sends instant "Thank You" or confirmation messages back to guests.

### 3. **Smart Follow-ups (Automated Reminders)**
*   Includes a **Daily Cron Job** that identifies non-responders and sends automated reminders after X days (customizable per wedding).

### 4. **Professional Analytics Dashboard**
*   Real-time status tracking (Confirmed vs. Pending).
*   **7-Day Growth Trends**: Automatically calculates guest count and confirmation rate changes over time.

### 5. **Multi-Tenant Security**
*   **Role-Based Access**: Specialized managers for 'Bride' vs. 'Groom' sides.
*   **Side Isolation**: Managers can only see and edit guests within their assigned wedding side.

---

## 🛠️ Tech Stack
*   **Backend**: NestJS (Node.js)
*   **Database**: PostgreSQL with Prisma ORM
*   **Background Jobs**: Redis & BullMQ
*   **Automation**: NestJS Scheduler (Cron)
*   **Frontend**: Vite + React + Vanilla CSS

---

## ⚡ How to Run (Deployment Ready)

The project is fully containerized using Docker. To start the entire stack:

```bash
# 1. Environment Setup
cp .env.example .env

# 2. Build and Start
docker-compose up --build -d

# 3. Initialize Database
cd backend
npx prisma db push
```

The application will be available at `http://localhost:5173` (Frontend) and `http://localhost:3000` (API).
