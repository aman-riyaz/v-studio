import { useState } from "react";
import { createBooking } from "../api.js";

const initial = { name: "", email: "", phone: "", event: "Wedding", date: "", description: "" };

export default function BookingForm() {
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState({ type: "", msg: "" });
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", msg: "" });
    try {
      await createBooking(form);
      setStatus({ type: "success", msg: "🎉 Booking received! We'll contact you shortly." });
      setForm(initial);
    } catch (err) {
      setStatus({
        type: "error",
        msg: err?.response?.data?.message || "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="grid">
        <label>
          <span>Full Name</span>
          <input name="name" required value={form.name} onChange={onChange} />
        </label>
        <label>
          <span>Email</span>
          <input type="email" name="email" required value={form.email} onChange={onChange} />
        </label>
        <label>
          <span>Phone</span>
          <input name="phone" required value={form.phone} onChange={onChange} />
        </label>
        <label>
          <span>Event Type</span>
          <select name="event" value={form.event} onChange={onChange}>
            <option>Wedding</option>
            <option>Birthday</option>
            <option>Portrait</option>
            <option>Corporate</option>
            <option>Fashion</option>
            <option>Other</option>
          </select>
        </label>
        <label className="full">
          <span>Event Date</span>
          <input type="date" name="date" required value={form.date} onChange={onChange} />
        </label>
        <label className="full">
          <span>Description</span>
          <textarea
            name="description"
            rows="4"
            placeholder="Tell us about your vision..."
            value={form.description}
            onChange={onChange}
          />
        </label>
      </div>
      <button className="btn btn-primary" disabled={loading}>
        {loading ? "Submitting..." : "Submit Booking"}
      </button>
      {status.msg && <p className={`status ${status.type}`}>{status.msg}</p>}
    </form>
  );
}
