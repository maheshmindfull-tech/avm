import { useState } from 'react';
import { submitEnquiry } from '../../services/enquiryService';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    who: 'First-time home buyer',
    msg: '',
  });

  const [status, setStatus] = useState({
    loading: false,
    submitted: false,
    leadId: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, submitted: false, leadId: null });

    try {
      const res = await submitEnquiry(
        {
          fullName: formData.name,
          phone: formData.phone,
          email: formData.email,
          projectType: formData.who,
          notes: formData.msg,
          budget: formData.who,
        },
        { sourcePage: 'Home - Contact Section' }
      );

      setStatus({
        loading: false,
        submitted: true,
        leadId: res?.leadId || null,
      });

      // Clear input fields
      setFormData({
        name: '',
        phone: '',
        email: '',
        who: 'First-time home buyer',
        msg: '',
      });
    } catch {
      // In case of network edge case, still give friendly feedback
      setStatus({
        loading: false,
        submitted: true,
        leadId: null,
      });
    }
  };

  return (
    <section className="navy ct" id="contact">
      <div className="wrap">
        <div>
          <div className="eb">Contact us</div>
          <h2>Your next property starts with the right conversation.</h2>
          <p className="sub">
            Tell us what you are looking for. An AVM advisor will call you within one working day.
          </p>
          <ul>
            <li>+91 98220 00000</li>
            <li>hello@avmhomes.in</li>
            <li>Charholi Budruk &amp; Pune West Advisory Desks, Pune, Maharashtra</li>
          </ul>
          <div className="desk">
            <b>AVM Property Desk</b>
            <span>15 minutes. One-on-one property consultation, at your workplace.</span>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit} id="f">
          <div className="two">
            <label className="form-label">
              Full name
              <input
                className="form-input"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                autoComplete="name"
                placeholder="Your full name"
              />
            </label>
            <label className="form-label">
              Phone
              <input
                className="form-input"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                required
                autoComplete="tel"
                placeholder="10-digit mobile number"
              />
            </label>
          </div>

          <label className="form-label">
            Email
            <input
              className="form-input"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              placeholder="name@example.com"
            />
          </label>

          <label className="form-label">
            I am a
            <select
              className="form-select"
              name="who"
              value={formData.who}
              onChange={handleChange}
            >
              <option>First-time home buyer</option>
              <option>Upgrade buyer</option>
              <option>Investor</option>
              <option>NRI or outstation buyer</option>
              <option>Builder or developer</option>
              <option>Company arranging a Property Desk</option>
            </select>
          </label>

          <label className="form-label">
            Message
            <textarea
              className="form-textarea"
              name="msg"
              value={formData.msg}
              onChange={handleChange}
              placeholder="Tell us your preferred location, configuration, or any questions..."
            />
          </label>

          <button className="btn" type="submit" disabled={status.loading}>
            {status.loading ? 'Submitting...' : 'Book a consultation'}
          </button>

          <div
            className={`ok ${status.submitted ? 'show' : ''}`}
            id="ok"
            role="status"
          >
            Thank you. An AVM advisor will call you within one working day.
            {status.leadId && (
              <span className="block text-xs mt-1 text-[#175239]/80 font-mono">
                Tracking ID: {status.leadId}
              </span>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
