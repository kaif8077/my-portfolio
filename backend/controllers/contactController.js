const Contact = require('../models/Contact');
const sgMail = require('@sendgrid/mail');

// SendGrid setup
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Submit contact form (with email notification)
exports.submitContact = async (req, res) => {
  try {
    const { name, email, subject, message, phone, contactMethod, source } = req.body;

    console.log('📨 Contact form submission:', { name, email, source });

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email and message are required'
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid email address'
      });
    }

    // Create contact object
    const contactData = {
      name,
      email,
      message,
      subject: subject || 'Contact Form Submission',
      source: source || 'home'
    };

    // Add optional fields if provided
    if (phone) contactData.phone = phone;
    if (contactMethod) contactData.contactMethod = contactMethod;

    // 1. Save to database
    const contact = new Contact(contactData);
    const savedContact = await contact.save();
    
    console.log(`✅ ${source === 'contact' ? 'Contact Page' : 'Home Page'} contact saved:`, savedContact._id);

    // 2. Send email notification via SendGrid
    try {
      const emailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #4299e1 0%, #3182ce 100%); color: white; padding: 20px; border-radius: 10px 10px 0 0; }
                .content { background: #f8fafc; padding: 20px; border-radius: 0 0 10px 10px; }
                .info-box { background: white; padding: 15px; border-radius: 8px; margin: 10px 0; border-left: 4px solid #4299e1; }
                .label { font-weight: bold; color: #2d3748; }
                .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #718096; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h2>📬 New Contact Form Submission</h2>
                    <p>From: ${source === 'contact' ? 'Contact Page' : 'Home Page'}</p>
                </div>
                <div class="content">
                    <h3>👤 Contact Information</h3>
                    <div class="info-box">
                        <p><span class="label">Name:</span> ${name}</p>
                        <p><span class="label">Email:</span> <a href="mailto:${email}">${email}</a></p>
                        ${phone ? `<p><span class="label">Phone:</span> <a href="tel:${phone}">${phone}</a></p>` : ''}
                        ${contactMethod ? `<p><span class="label">Preferred Contact:</span> ${contactMethod}</p>` : ''}
                    </div>
                    
                    <h3>📝 Message Details</h3>
                    <div class="info-box">
                        <p><span class="label">Subject:</span> ${subject || 'No Subject'}</p>
                        <p><span class="label">Message:</span></p>
                        <p>${message.replace(/\n/g, '<br>')}</p>
                    </div>
                    
                    <h3>📊 Additional Info</h3>
                    <div class="info-box">
                        <p><span class="label">Submission Time:</span> ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
                        <p><span class="label">Form Source:</span> ${source === 'contact' ? 'Contact Page' : 'Home Page'}</p>
                        <p><span class="label">Contact ID:</span> ${savedContact._id}</p>
                    </div>
                    
                    <div class="footer">
                        <p>This email was sent from your portfolio website contact form.</p>
                        <p>⚠️ Please respond within 24 hours.</p>
                    </div>
                </div>
            </div>
        </body>
        </html>
      `;

      const msg = {
        to: process.env.ADMIN_EMAIL, // Your email
        from: {
          email: process.env.FROM_EMAIL || 'noreply@yourportfolio.com',
          name: 'Portfolio Contact Form'
        },
        subject: `New Contact: ${name} - ${subject || 'Inquiry'}`,
        html: emailHtml,
        replyTo: email // So you can reply directly to the user
      };

      await sgMail.send(msg);
      console.log('📧 Email sent successfully via SendGrid');

    } catch (emailError) {
      console.error('❌ SendGrid email error:', emailError.response?.body || emailError.message);
      // Don't fail the request if email fails, just log it
    }

    // 3. Send response to client
    res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been sent successfully.',
      data: {
        id: savedContact._id,
        source: savedContact.source,
        createdAt: savedContact.createdAt
      }
    });

  } catch (error) {
    console.error('❌ Contact save error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.'
    });
  }
};

// Get all contacts (for admin dashboard) - NO CHANGE
exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find()
      .sort({ createdAt: -1 })
      .select('-__v');

    res.json({
      success: true,
      count: contacts.length,
      data: contacts
    });
  } catch (error) {
    console.error('❌ Get contacts error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching contacts'
    });
  }
};

// Delete contact - NO CHANGE
exports.deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    
    const contact = await Contact.findByIdAndDelete(id);
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.json({
      success: true,
      message: 'Contact deleted successfully'
    });
  } catch (error) {
    console.error('❌ Delete contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting contact'
    });
  }
};