import React, { useState } from 'react';
import './Contact.css';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Plus, Minus } from 'lucide-react';
import API from '../services/api';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    contactMethod: 'email'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });
  const [openFaqIndex, setOpenFaqIndex] = useState(0); // Default: first FAQ open

  const contactInfo = [
    {
      icon: <Mail size={24} />,
      title: 'Email',
      info: 'mohdkaif90275@gmail.com',
      detail: 'Typically reply within 4 hours',
      link: 'mailto:mohdkaif90275@gmail.com'
    },
    {
      icon: <Phone size={24} />,
      title: 'Phone',
      info: '+91 8528576249',
      detail: 'Mon-Fri, 9AM-6PM',
      link: 'tel:+918528576249'
    },
    {
      icon: <MapPin size={24} />,
      title: 'Address',
      info: 'Karanpur',
      detail: 'Moradabad, India',
      link: 'https://www.google.com/maps/place/28%C2%B046%2751.9%22N+78%C2%B041%2711.0%22E/@28.781071,78.6838221,17z/data=!3m1!4b1!4m4!3m3!8m2!3d28.781071!4d78.686397?entry=ttu&g_ep=EgoyMDI2MDEwNy4wIKXMDSoASAFQAw%3D%3D'
    }
  ];

  const faqs = [
    {
      question: "What's your typical response time?",
      answer: "I typically respond to emails within 4-6 hours during business days. For urgent matters, please use the phone number provided."
    },
    {
      question: "Do you offer free consultations?",
      answer: "Yes, I offer a free 30-minute initial consultation for new projects to discuss your requirements and see if we're a good fit."
    },
    {
      question: "What information should I include in my project inquiry?",
      answer: "Please include your project goals, timeline, budget range, and any specific requirements. The more details you provide, the better I can assist you."
    },
    {
      question: "Do you work with international clients?",
      answer: "Absolutely! I work with clients from all around the world. Time zone differences are not an issue with proper scheduling."
    }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleFaq = (index) => {
    // If clicking on already open FAQ, close it, else open the new one
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: '', message: '' });

    if (!formData.name || !formData.email || !formData.message) {
      setSubmitStatus({
        type: 'error',
        message: 'Please fill in all required fields'
      });
      setIsSubmitting(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitStatus({
        type: 'error',
        message: 'Please enter a valid email address'
      });
      setIsSubmitting(false);
      return;
    }

    if (formData.phone && !/^[\d\s\-\+\(\)]{10,15}$/.test(formData.phone.replace(/\s/g, ''))) {
      setSubmitStatus({
        type: 'error',
        message: 'Please enter a valid phone number'
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await API.post('/contact/submit', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject || 'Contact Page Submission',
        message: formData.message,
        contactMethod: formData.contactMethod,
        source: 'contact'
      });

      if (response.data.success) {
        setSubmitStatus({
          type: 'success',
          message: 'Thank you! Your message has been sent successfully. I\'ll get back to you within 24 hours.'
        });

        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          contactMethod: 'email'
        });

        setTimeout(() => {
          setSubmitStatus({ type: '', message: '' });
        }, 8000);
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: error.response?.data?.message || 'Something went wrong. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      
      <section className="about-hero">
        <div className="container">
          <div className="section-header">
            <h1 className="section-title">
              Let's <span className="highlight">Connect & Create</span>
            </h1>
            <p className="section-subtitle">
              Ready to bring your ideas to life? I'm here to help you achieve your goals with creative solutions and expert guidance.
            </p>
          </div>
        </div>
      </section>

      <section className="contact-main">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info-section">
              <div className="info-card">
                <h2>Get In Touch</h2>
                <p className="info-description">
                  Have a project in mind or just want to say hello? Feel free to reach out through any of these channels.
                </p>

                <div className="contact-methods">
                  {contactInfo.map((item, index) => (
                    <a
                      key={index}
                      href={item.link}
                      className="contact-method"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="method-icon">
                        {item.icon}
                      </div>
                      <div className="method-content">
                        <h4>{item.title}</h4>
                        <p className="method-info">{item.info}</p>
                        <p className="method-detail">{item.detail}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              <div className="faq-section">
                <h2>Frequently Asked Questions</h2>
                <div className="faq-list">
                  {faqs.map((faq, index) => (
                    <div key={index} className="faq-item">
                      <div className="faq-question" onClick={() => toggleFaq(index)}>
                        <h4>{faq.question}</h4>
                        <span className="faq-icon">
                          {openFaqIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                        </span>
                      </div>
                      {openFaqIndex === index && (
                        <div className="faq-answer">
                          <p>{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="contact-form-section">
              <div className="form-card">
                <h2>Send a Message</h2>
                <p className="form-description">
                  Fill out the form below and I'll get back to you as soon as possible.
                </p>

                {submitStatus.message && (
                  <div className={`status-message ${submitStatus.type}`}>
                    {submitStatus.type === 'success' ? (
                      <CheckCircle size={20} />
                    ) : (
                      <AlertCircle size={20} />
                    )}
                    <span>{submitStatus.message}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">
                        Full Name <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">
                        Email Address <span className="required">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="phone">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="subject">Subject</label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Project Inquiry"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="contactMethod">
                      Preferred Contact Method
                    </label>
                    <div className="radio-group">
                      <label className="radio-label">
                        <input
                          type="radio"
                          name="contactMethod"
                          value="email"
                          checked={formData.contactMethod === 'email'}
                          onChange={handleChange}
                        />
                        <span>Email</span>
                      </label>
                      <label className="radio-label">
                        <input
                          type="radio"
                          name="contactMethod"
                          value="phone"
                          checked={formData.contactMethod === 'phone'}
                          onChange={handleChange}
                        />
                        <span>Phone</span>
                      </label>
                      <label className="radio-label">
                        <input
                          type="radio"
                          name="contactMethod"
                          value="whatsapp"
                          checked={formData.contactMethod === 'whatsapp'}
                          onChange={handleChange}
                        />
                        <span>WhatsApp</span>
                      </label>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">
                      Message <span className="required">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="6"
                      placeholder="Tell me about your project, timeline, budget, and any specific requirements..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="submit-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner"></span>
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>

              <div className="map-section">
                <h3>Find Me Here</h3>
                <div className="map-container">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3449.334076273251!2d78.6838221!3d28.781071!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390af8142c1d3c77%3A0x2e3a6c5b5b6b5b5b!2sKaranpur%2C%20Moradabad%2C%20Uttar%20Pradesh%20244001!5e0!3m2!1sen!2sin!4v1705065600000!5m2!1sen!2sin"
                    width="100%"
                    height="300"
                    style={{ border: 0, borderRadius: '15px' }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Location Map"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;