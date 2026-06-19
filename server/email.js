const express = require('express');
const sgMail = require('@sendgrid/mail');
const router = express.Router();

if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

router.post('/send', async (req, res) => {
  if (!process.env.SENDGRID_API_KEY) {
    return res.status(503).json({ error: 'SendGrid non configurato: aggiungi SENDGRID_API_KEY' });
  }

  try {
    const { to, subject, html } = req.body;
    
    if (!to || !subject || !html) {
      return res.status(400).json({ error: 'Missing required fields: to, subject, html' });
    }

    const msg = {
      to,
      from: process.env.EMAIL_FROM || 'noreply@skillforgenew.com',
      subject,
      html,
    };

    await sgMail.send(msg);
    res.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('SendGrid error:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;