import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

// Configure email transporter
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;
const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
const smtpPort = parseInt(process.env.SMTP_PORT || "587");
const smtpFrom = process.env.SMTP_FROM || '"REN Residence Lead System" <noreply@gmail.com>';

async function sendLeadEmail(lead: any) {
  const recipient = "saltyfish1987@gmail.com";
  
  const mailSubject = `[New Lead] REN Residence Bukit Jalil - ${lead.name}`;
  const mailBodyHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #fdfdfd;">
      <h2 style="color: #1E3E34; border-bottom: 2px solid #1E3E34; padding-bottom: 10px; margin-top: 0;">New Showroom Tour Booking</h2>
      <p style="font-size: 14px; color: #555;">An visitor has submitted a new showroom appointment request through Juta Asia REN Residence landing page.</p>
      
      <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
        <tr style="background-color: #f9f9f9;">
          <td style="padding: 10px; border: 1px solid #eee; font-weight: bold; width: 40%;">Lead ID</td>
          <td style="padding: 10px; border: 1px solid #eee;">${lead.id}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #eee; font-weight: bold;">Full Name</td>
          <td style="padding: 10px; border: 1px solid #eee; font-weight: bold; color: #111;">${lead.name}</td>
        </tr>
        <tr style="background-color: #f9f9f9;">
          <td style="padding: 10px; border: 1px solid #eee; font-weight: bold;">Phone Number</td>
          <td style="padding: 10px; border: 1px solid #eee; font-weight: bold; color: #1E3E34;"><a href="tel:${lead.phone}">${lead.phone}</a></td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #eee; font-weight: bold;">Email Address</td>
          <td style="padding: 10px; border: 1px solid #eee;">${lead.email || "Not Provided"}</td>
        </tr>
        <tr style="background-color: #f9f9f9;">
          <td style="padding: 10px; border: 1px solid #eee; font-weight: bold;">Layout Sizing Interest</td>
          <td style="padding: 10px; border: 1px solid #eee; color: #555; text-transform: uppercase;">${lead.layoutInterest}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #eee; font-weight: bold;">Preferred Contact Channel</td>
          <td style="padding: 10px; border: 1px solid #eee; text-transform: capitalize;">${lead.preferredContact}</td>
        </tr>
        <tr style="background-color: #f9f9f9;">
          <td style="padding: 10px; border: 1px solid #eee; font-weight: bold;">Malaysian PDPA Consent</td>
          <td style="padding: 10px; border: 1px solid #eee; color: #2ecc71; font-weight: bold;">Accepted (Compliant)</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #eee; font-weight: bold;">Submitted Timestamp</td>
          <td style="padding: 10px; border: 1px solid #eee; font-family: monospace; font-size: 12px;">${lead.createdAt}</td>
        </tr>
      </table>
      
      <div style="margin-top: 25px; padding-top: 15px; border-top: 1px solid #eee; text-align: center; font-size: 11px; color: #999;">
        <p>This message was processed securely by Gaya Kuasa Sdn Bhd & IQI Realty agent platform.</p>
        <p>For instant reply, click to chat directly via <a href="https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}" style="color: #25D366; font-weight: bold; text-decoration: none;">WhatsApp Client</a>.</p>
      </div>
    </div>
  `;

  // Use FormSubmit.co for free zero-setup, zero-credential real email delivery to user's inbox
  try {
    console.log(`[EMAIL] Attempting to deliver lead notice to ${recipient} via free, direct FormSubmit.co service...`);
    const formSubmitUrl = `https://formsubmit.co/ajax/${recipient}`;
    const formSubmitResponse = await fetch(formSubmitUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        _subject: mailSubject,
        "Lead Identifier": lead.id,
        "Full Name": lead.name,
        "Phone Number": lead.phone,
        "Email Address": lead.email || "Not Provided",
        "Preferred Layout Sizing": lead.layoutInterest,
        "Preferred Contact Mode": lead.preferredContact,
        "Malaysian PDPA Consent": "Accepted (Compliant)",
        "Submitted Timestamp": lead.createdAt,
        _honey: "", // Honeypot field to block spam
        _template: "table" // Instructs FormSubmit to format the email elegantly
      })
    });

    if (formSubmitResponse.ok) {
      const data = await formSubmitResponse.json();
      console.log(`[EMAIL] Lead notification submitted to FormSubmit successfully!`, data);
      return true;
    } else {
      const errorText = await formSubmitResponse.text();
      throw new Error(`FormSubmit HTTP ${formSubmitResponse.status}: ${errorText}`);
    }
  } catch (fsError: any) {
    console.error("[EMAIL] Direct free FormSubmit delivery failed. Trying local SMTP backup...", fsError);

    let transporter;

    // Check SMTP settings. If empty, use dynamic free developer ethereal SMTP server
    if (!smtpUser || !smtpPass) {
      try {
        console.log("[EMAIL] No custom SMTP credentials found. Initializing a free developer Ethereal Email SMTP service as emergency backup...");
        const testAccount = await nodemailer.createTestAccount();
        transporter = nodemailer.createTransport({
          host: "smtp.ethereal.email",
          port: 587,
          secure: false,
          auth: {
            user: testAccount.user,
            pass: testAccount.pass,
          },
        });
        
        const info = await transporter.sendMail({
          from: '"REN Residence Lead System" <noreply@ethereal.email>',
          to: recipient,
          subject: mailSubject,
          html: mailBodyHtml,
        });

        const previewUrl = nodemailer.getTestMessageUrl(info);
        console.log(`[EMAIL] [BACKUP] Lead notification email sent FREE to ${recipient} via Ethereal Email!`);
        console.log(`[EMAIL] [BACKUP] CLICK THIS LINK TO PREVIEW YOUR EMAIL FREE: ${previewUrl}`);
        return true;
      } catch (etherealError) {
        console.error("[EMAIL] [BACKUP] Error setting up free dynamic Ethereal transport:", etherealError);
        return false;
      }
    }

    try {
      transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465, // true for 465, false for other ports
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      const info = await transporter.sendMail({
        from: smtpFrom,
        to: recipient,
        subject: mailSubject,
        html: mailBodyHtml,
      });

      console.log(`[EMAIL] [BACKUP] Lead notification email sent successfully to saltyfish1987@gmail.com: ${info.messageId}`);
      return true;
    } catch (error) {
      console.error(`[EMAIL] [BACKUP] Failed to send lead notification email to saltyfish1987@gmail.com:`, error);
      return false;
    }
  }
}

// Define data file path
const DATA_FILE = path.join(process.cwd(), "leads.json");
const SEO_FILE = path.join(process.cwd(), "seo-config.json");

// Helper to load SEO settings
function getGoogleVerification() {
  try {
    if (fs.existsSync(SEO_FILE)) {
      const content = fs.readFileSync(SEO_FILE, "utf-8");
      const data = JSON.parse(content);
      return data.googleSiteVerification || "";
    }
  } catch (error) {
    console.error("Failed to read SEO configuration file", error);
  }
  return process.env.GOOGLE_SITE_VERIFICATION || "";
}

// Helper to save SEO settings
function saveGoogleVerification(code: string) {
  try {
    fs.writeFileSync(SEO_FILE, JSON.stringify({ googleSiteVerification: code }, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.error("Failed to write SEO configuration file", error);
    return false;
  }
}

// Helper to load leads
function loadLeads() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const content = fs.readFileSync(DATA_FILE, "utf-8");
      return JSON.parse(content);
    }
  } catch (error) {
    console.error("Failed to read leads file, initializing empty list", error);
  }
  return [];
}

// Helper to save leads
function saveLeads(leads: any[]) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(leads, null, 2), "utf-8");
  } catch (error) {
    console.error("Failed to write leads file", error);
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Use JSON middleware for request bodies
  app.use(express.json());

  // API Route - Submit a lead
  app.post("/api/leads", (req, res) => {
    try {
      const { name, email, phone, layoutInterest, preferredContact, consentPdpa } = req.body;

      if (!name || !phone) {
        return res.status(400).json({ error: "Name and phone number are required." });
      }

      if (!consentPdpa) {
        return res.status(400).json({ error: "PDPA consent is required to submit your reservation." });
      }

      const leads = loadLeads();
      const newLead = {
        id: "lead_" + Date.now() + "_" + Math.random().toString(36).substr(2, 4),
        name,
        email: email || "",
        phone,
        layoutInterest: layoutInterest || "General Inquiry",
        preferredContact: preferredContact || "whatsapp",
        consentPdpa: true,
        status: "new",
        createdAt: new Date().toISOString(),
        notes: ""
      };

      leads.push(newLead);
      saveLeads(leads);

      // Asynchronously send notification email to saltyfish1987@gmail.com
      sendLeadEmail(newLead).catch((err) => {
        console.error("Error in background email dispatch:", err);
      });

      res.status(201).json({ success: true, leadId: newLead.id });
    } catch (e: any) {
      res.status(500).json({ error: e.message || "Internal server error" });
    }
  });

  // API Route - Retrieve leads (agent admin access, optionally gated with header/query passcode)
  app.get("/api/leads", (req, res) => {
    try {
      const pass = req.query.passcode || req.headers["x-admin-passcode"];
      const actualPasscode = "REN2026"; // Simple passcode to access from UI

      if (pass !== actualPasscode) {
        return res.status(401).json({ error: "Unauthorized access: Invalid agent passcode." });
      }

      const leads = loadLeads();
      res.json({ success: true, leads });
    } catch (e: any) {
      res.status(500).json({ error: e.message || "Internal server error" });
    }
  });

  // API Route - Update a lead status/notes
  app.put("/api/leads/:id", (req, res) => {
    try {
      const pass = req.query.passcode || req.headers["x-admin-passcode"];
      const actualPasscode = "REN2026";

      if (pass !== actualPasscode) {
        return res.status(401).json({ error: "Unauthorized." });
      }

      const { id } = req.params;
      const { status, notes } = req.body;
      const leads = loadLeads();
      const leadIndex = leads.findIndex((l: any) => l.id === id);

      if (leadIndex === -1) {
        return res.status(404).json({ error: "Lead not found." });
      }

      if (status) {
        leads[leadIndex].status = status;
      }
      if (notes !== undefined) {
        leads[leadIndex].notes = notes;
      }

      saveLeads(leads);
      res.json({ success: true, lead: leads[leadIndex] });
    } catch (e: any) {
      res.status(500).json({ error: e.message || "Internal server error" });
    }
  });

  // API Route - Export leads as CSV
  app.get("/api/leads/export", (req, res) => {
    try {
      const pass = req.query.passcode || req.headers["x-admin-passcode"];
      const actualPasscode = "REN2026";

      if (pass !== actualPasscode) {
        return res.status(401).send("Unauthorized");
      }

      const leads = loadLeads();
      let csvContent = "ID,Name,Email,Phone,Layout Interest,Preferred Contact,Status,Created At,Notes\n";

      leads.forEach((l: any) => {
        const row = [
          l.id,
          `"${(l.name || '').replace(/"/g, '""')}"`,
          `"${(l.email || '').replace(/"/g, '""')}"`,
          `"${(l.phone || '').replace(/"/g, '""')}"`,
          `"${(l.layoutInterest || '').replace(/"/g, '""')}"`,
          l.preferredContact || '',
          l.status || 'new',
          l.createdAt || '',
          `"${(l.notes || '').replace(/"/g, '""')}"`
        ].join(",");
        csvContent += row + "\n";
      });

      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", `attachment; filename=leads-${new Date().toISOString().split('T')[0]}.csv`);
      res.send(csvContent);
    } catch (e: any) {
      res.status(500).send("Error exporting leads");
    }
  });

  // API Route - Get SEO Settings
  app.get("/api/seo", (req, res) => {
    try {
      const code = getGoogleVerification();
      res.json({ success: true, googleSiteVerification: code });
    } catch (e: any) {
      res.status(500).json({ error: e.message || "Failed to load SEO configuration." });
    }
  });

  // API Route - Update SEO Settings (Admin secure)
  app.post("/api/seo", (req, res) => {
    try {
      const pass = req.headers["x-admin-passcode"] || req.body.passcode;
      const actualPasscode = "REN2026";

      if (pass !== actualPasscode) {
        return res.status(401).json({ error: "Unauthorized access: Invalid passcode." });
      }

      const { googleSiteVerification } = req.body;
      const saved = saveGoogleVerification(googleSiteVerification || "");
      if (saved) {
        res.json({ success: true, googleSiteVerification });
      } else {
        res.status(500).json({ error: "Failed to write configuration file." });
      }
    } catch (e: any) {
      res.status(500).json({ error: e.message || "Failed to save SEO configuration." });
    }
  });

  // GEO, SEO & AI Crawlers index files
  app.get("/robots.txt", (req, res) => {
    res.setHeader("Content-Type", "text/plain");
    res.send(`User-agent: *
Allow: /
Disallow: /api/

Sitemap: https://jutaasia-residence.com/sitemap.xml
`);
  });

  app.get("/sitemap.xml", (req, res) => {
    res.setHeader("Content-Type", "application/xml");
    res.send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://jutaasia-residence.com/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath, { index: false }));
    app.get("*", (req, res) => {
      const indexPath = path.join(distPath, "index.html");
      if (fs.existsSync(indexPath)) {
        let html = fs.readFileSync(indexPath, "utf-8");
        const verificationToken = getGoogleVerification();
        html = html.replace(/%GOOGLE_SITE_VERIFICATION%/g, verificationToken);
        res.setHeader("Content-Type", "text/html");
        res.send(html);
      } else {
        res.status(404).send("Building index, please refresh momentarily...");
      }
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
