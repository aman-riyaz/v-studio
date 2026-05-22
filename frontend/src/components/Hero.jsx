export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-overlay" />
      <div className="hero-content">
        <span className="eyebrow light">Vision Studio</span>
        <h1>Photography that feels like memory.</h1>
        <p>Award-winning storytelling for weddings, portraits, and events.</p>
        <div className="hero-cta">
          <a href="#book" className="btn btn-primary">Book a Session</a>
          <a href="#gallery" className="btn btn-ghost">View Gallery</a>
        </div>
      </div>
    </section>
  );
}
