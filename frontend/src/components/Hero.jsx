export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-overlay" />
      <div className="hero-content">
        <span className="eyebrow light">Vision Studio</span>
        <h1>Photography Booking Management System (Capture Every Moment)</h1>
        <p>Book your Session now and make every moment special.</p>
        <div className="hero-cta">
          <a href="#book" className="btn btn-primary">Book a Session</a>
          <a href="#gallery" className="btn btn-ghost">View Gallery</a>
        </div>
      </div>
    </section>
  );
}
