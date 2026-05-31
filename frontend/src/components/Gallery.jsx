import { Link } from "react-router-dom";

const photos = [
  { key: "weddings", src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800", label: "Weddings (₹20,000)" },
  { key: "portraits", src: "https://images.unsplash.com/photo-1624000423929-8380a821c07d?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", label: "Portraits (₹2,000)" },
  { key: "events", src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800", label: "Events (₹10,000)" },
  { key: "birthdays", src: "https://images.unsplash.com/photo-1635349135195-ea08a39fcc5c?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", label: "Birthdays (₹4,000)" },
  { key: "family", src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800", label: "Family (₹3,000)" },
  { key: "fashion", src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800", label: "Fashion (₹5,000)" },
];

export default function Gallery() {
  return (
    <div className="gallery">
      {photos.map((p, i) => (
        <Link to={`/gallery/${p.key}`} key={i} className="gallery-card-link">
          <figure className="gallery-item">
            <img src={p.src} alt={p.label} loading="lazy" />
            <figcaption>
              {p.label}
              <span className="gallery-count">15 Photos</span>
            </figcaption>
            <div className="gallery-item-overlay">
              <span className="view-text">Explore Category →</span>
            </div>
          </figure>
        </Link>
      ))}
    </div>
  );
}
