const photos = [
  { src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800", label: "Weddings" },
  { src: "https://images.unsplash.com/photo-1624000423929-8380a821c07d?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", label: "Portraits" },
  { src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800", label: "Events" },
  { src: "https://images.unsplash.com/photo-1529635746090-30311defb7c8?w=800", label: "Birthdays" },
  { src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800", label: "Family" },
  { src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800", label: "Fashion" },
];

export default function Gallery() {
  return (
    <div className="gallery">
      {photos.map((p, i) => (
        <figure key={i} className="gallery-item">
          <img src={p.src} alt={p.label} loading="lazy" />
          <figcaption>{p.label}</figcaption>
        </figure>
      ))}
    </div>
  );
}
