import Hero from "../components/Hero.jsx";
import Gallery from "../components/Gallery.jsx";
import BookingForm from "../components/BookingForm.jsx";

export default function Home() {
  return (
    <main>
      <Hero />
      <section id="gallery" className="section">
        <div className="section-head">
          <span className="eyebrow">Our Work</span>
          <h2>A glimpse through our lens</h2>
          <p>Weddings, portraits, events — Make your every memory special.</p>
        </div>
        <Gallery />
      </section>
      <section id="book" className="section section-alt">
        <div className="section-head">
          <span className="eyebrow">Book a Session</span>
          <h2>Let’s create something that lasts forever</h2>
          <p>Tell us about your event and we'll be in touch within 24 hours.</p>
        </div>
        <BookingForm />
      </section>
    </main>
  );
}
