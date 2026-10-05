# AVM Real Estate — Google Sheets & Apps Script Lead Management Integration

This directory contains the server-side integration script that connects the AVM Real Estate website's enquiry form directly to a Google Sheet.

---

## 🔒 Security & Privacy Architecture

- **Zero Credential Exposure**: No Google Cloud API keys, Service Account JSON secrets, or database credentials are included in the frontend web application.
- **Server-Side Validation**: All incoming submissions are validated on Google's infrastructure before touching the sheet.
- **Honeypot Anti-Spam**: The form contains a hidden `_hp` field invisible to human users. If an automated bot fills it, the script returns a simulated success response and silently discards the entry.
- **No Direct Sheet Access**: Homebuyers and visitors do not have read or write access to the Google Sheet. Submissions go through this Apps Script endpoint running with your execution authorization.

---

## 📋 Step-by-Step Setup Guide

### Step 1: Create the Google Sheet
1. Open [Google Sheets](https://sheets.new) in your web browser.
2. Name the sheet: **`AVM Leads & Enquiries`**.
3. Rename the first tab/sheet at the bottom to: **`Enquiries`**.
   *(Note: If you keep it as `Sheet1`, the script will automatically create the `Enquiries` tab for you upon first submission).*

### Step 2: Open Google Apps Script
1. In your newly created Google Sheet, click **Extensions** in the top menu bar.
2. Click **Apps Script**. A new tab will open with the script editor.
3. Delete any default code inside the editor.
4. Copy the entire contents of [`Code.gs`](./Code.gs) and paste it into the editor.
5. Click the **Save** icon (disk icon) or press `Ctrl + S`.

### Step 3: Deploy as a Web App
1. Click the blue **Deploy** button in the top-right corner.
2. Select **New deployment**.
3. Click the gear icon next to "Select type" and choose **Web app**.
4. Configure the deployment settings:
   - **Description**: `AVM Lead Ingestion Webhook v1`
   - **Execute as**: **`Me (your_email@gmail.com)`**
   - **Who has access**: **`Anyone`** *(Required so the website form can submit data without forcing users to log into Google)*.
5. Click **Deploy**.
6. When prompted, click **Authorize access**, choose your Google account, and proceed through the verification steps.
7. Copy the generated **Web app URL** (it looks like: `https://script.google.com/macros/s/AKfycb.../exec`).

### Step 4: Configure the Website Frontend
1. In the root directory of the AVM project, create a `.env` file (or copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```
2. Open `.env` and set your Web App URL:
   ```env
   VITE_APPS_SCRIPT_URL=https://script.google.com/macros/s/AKfycb.../exec
   ```
3. Restart your development server (`npm run dev`) or build the production bundle (`npm run build`).

---

## 📊 Recorded Fields

Each submitted lead creates a new row with the following 19 columns:

| Column | Field Name | Description |
|---|---|---|
| A | **Timestamp** | Submission date and time (`YYYY-MM-DD HH:mm:ss`) |
| B | **Lead ID** | Unique reference code (e.g. `AVM-20261003-9A2BC`) |
| C | **Full Name** | Buyer's full name |
| D | **Phone Number** | Contact phone number |
| E | **Email** | Email address |
| F | **City** | Current city |
| G | **Preferred Location** | Shortlisted area (e.g., Baner, Wakad, Hinjewadi) |
| H | **Property Type** | Apartment, Villa, Townhouse, Penthouse |
| I | **Configuration** | 1 BHK, 2 BHK, 3 BHK, 4 BHK, etc. |
| J | **Budget Range** | Budget segment |
| K | **Project ID** | Pre-selected project ID (if enquiry from detail page) |
| L | **Project Name** | Pre-selected project name |
| M | **Source Page** | Route where enquiry originated (e.g. `/projects/avm-courtyard`) |
| N | **Lead Source** | Default: `Website` |
| O | **Message** | Additional buyer comments or timing requirements |
| P | **Consent Given** | Confirmation of contact consent |
| Q | **Lead Status** | Default: `New Lead` (can be updated to `Contacted`, `Site Visit Scheduled`, `Closed`) |
| R | **Assigned Partner** | Team member or channel partner assigned to lead |
| S | **Follow-up Notes** | Internal remarks for sales team |

---

## 🧪 Testing the Integration

You can test the deployment using `curl` or PowerShell:

```bash
curl -X POST "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec" \
  -H "Content-Type: text/plain" \
  -d '{"fullName":"Test Buyer","phone":"+919876543210","email":"test@example.com","propertyType":"Apartment","configuration":"3 BHK","preferredLocation":"Baner","budgetRange":"₹1 Cr – ₹2 Cr","message":"Testing integration"}'
```

Expected response:
```json
{
  "success": true,
  "message": "Thank you for your enquiry. Your details have been submitted successfully.",
  "leadId": "AVM-20261003-XXXXX"
}
```
Check your Google Sheet — the row with styled headers should appear immediately!
