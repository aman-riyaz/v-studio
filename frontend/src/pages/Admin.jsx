import { useEffect, useState } from "react";
import { getBookings, deleteBooking, updateBookingStatus } from "../api.js";

export default function Admin() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      setLoading(true);
      setBookings(await getBookings());
      setError("");
    } catch (err) {
      setError("Failed to load bookings. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const onDelete = async (id) => {
    if (!confirm("Delete this booking?")) return;
    await deleteBooking(id);
    setBookings((b) => b.filter((x) => x._id !== id));
  };

  const onToggle = async (b) => {
    const next = b.status === "pending" ? "confirmed" : "pending";
    const updated = await updateBookingStatus(b._id, next);

    if (next === "confirmed") {
      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            access_key: "d1acfa9b-a815-43e2-8c0e-b7c5a8d3784a",
            name: b.name,
            email: b.email,
            subject: "🎉 Booking Confirmed — Vision Studio",
            from_name: "Vision Studio",
            message: `Dear ${b.name},

We are thrilled to let you know that your event booking with Vision Studio has been accepted and confirmed!

We will Contact you Shortly on your Email or Phone.

Here are your event booking details:
----------------------------------------
👤 Full Name: ${b.name}
📧 Email: ${b.email}
📞 Phone: ${b.phone}
📸 Event Type: ${b.event}
📅 Event Date: ${b.date}
📝 Description: ${b.description || "No description provided."}
----------------------------------------

We look forward to capturing your beautiful moments! If you have any questions, feel free to reply to this email.

Best regards,
Vision Studio Team`
          })
        });

        const result = await response.json();
        if (result.success) {
          console.log(`✅ Booking confirmation email sent successfully via Web3Forms for: ${b.email}`);
        } else {
          console.error("❌ Web3Forms API returned an error:", result.message);
        }
      } catch (error) {
        console.error("❌ Failed to send confirmation email via Web3Forms:", error.message);
      }
    }

    setBookings((all) => all.map((x) => (x._id === b._id ? updated : x)));
  };

  return (
    <main className="section">
      <div className="section-head">
        <span className="eyebrow">Dashboard</span>
        <h2>Admin Panel</h2>
        <p>Manage incoming photography bookings.</p>
      </div>

      {loading && <p className="muted">Loading bookings...</p>}
      {error && <p className="status error">{error}</p>}

      {!loading && !error && (
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Event</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length === 0 && (
                <tr>
                  <td colSpan="7" className="muted center">No bookings yet.</td>
                </tr>
              )}
              {bookings.map((b) => (
                <tr key={b._id}>
                  <td>{b.name}</td>
                  <td>{b.email}</td>
                  <td>{b.phone}</td>
                  <td>{b.event}</td>
                  <td>{b.date}</td>
                  <td>
                    <span className={`badge badge-${b.status}`}>{b.status}</span>
                  </td>
                  <td className="actions">
                    <button className="btn btn-sm" onClick={() => onToggle(b)}>
                      {b.status === "pending" ? "Confirm" : "Revert"}
                    </button>
                    <button className="btn btn-sm btn-danger" onClick={() => onDelete(b._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
