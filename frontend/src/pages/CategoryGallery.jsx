import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

// Curated 15 high quality Unsplash photos for each category
const categoryData = {
  weddings: {
    title: "Weddings",
    description: "Capturing your special day, the timeless vows, and the magical celebration of love.",
    images: [
      { src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1000", caption: "Eternal Vows in Autumn" },
      { src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=1000", caption: "Walking into Forever" },
      { src: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d2VkZGluZ3xlbnwwfHwwfHx8MA%3D%3D", caption: "A Quiet Moment Together" },
      { src: "https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHdlZGRpbmd8ZW58MHx8MHx8fDA%3D", caption: "Sunset Bridal Portrait" },
      { src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&q=80&w=1000", caption: "Rustic Garden Celebration" },
      { src: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&q=80&w=1000", caption: "Golden Hour First Dance" },
      { src: "https://plus.unsplash.com/premium_photo-1673897888993-a1db844c2ca1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8d2VkZGluZ3xlbnwwfHwwfHx8MA%3D%3D", caption: "Details of Elegance" },
      { src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&q=80&w=1000", caption: "Under the Floral Arch" },
      { src: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8d2VkZGluZ3xlbnwwfHwwfHx8MA%3D%3D", caption: "Joyous Exit Under Confetti" },
      { src: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=1000", caption: "Sparkling Rings & Promises" },
      { src: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2VkZGluZ3xlbnwwfHwwfHx8MA%3D%3D", caption: "Bridal Party Fun" },
      { src: "https://images.unsplash.com/photo-1529636798458-92182e662485?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHdlZGRpbmclMjBiYWNrZ3JvdW5kfGVufDB8fDB8fHww", caption: "Laughter in the Meadow" },
      { src: "https://images.unsplash.com/photo-1502635385003-ee1e6a1a742d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHdlZGRpbmclMjBiYWNrZ3JvdW5kfGVufDB8fDB8fHww", caption: "The Grand Entrance" },
      { src: "https://images.unsplash.com/photo-1513278974582-3e1b4a4fa21e?auto=format&fit=crop&q=80&w=1000", caption: "Tears of Happiness" },
      { src: "https://images.unsplash.com/photo-1700140579084-ef7e6c5f54c0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHdlZGRpbmclMjBiYWNrZ3JvdW5kfGVufDB8fDB8fHww", caption: "Warm Twilight Toast" }
    ]
  },
  portraits: {
    title: "Portraits",
    description: "Honest character, elegant lighting, and powerful expressions captured in a frame.",
    images: [
      { src: "https://images.unsplash.com/photo-1624000423929-8380a821c07d?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", caption: "Graceful Natural Light" },
      { src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=1000", caption: "Classic Monochrome Study" },
      { src: "https://images.unsplash.com/photo-1626313668308-361e2d4b882b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHBvdHJhaXRzJTIwYm95JTIwc3Vuc2V0fGVufDB8fDB8fHww", caption: "Vibrant Urban Portrait" },
      { src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1000", caption: "Expressive Headshot" },
      { src: "https://images.unsplash.com/photo-1535890696255-dd5bcd79e6df?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cG90cmFpdHMlMjBhbG9uZXxlbnwwfHwwfHx8MA%3D%3D", caption: "Golden Hour Glow" },
      { src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=1000", caption: "Thoughtful Expression" },
      { src: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=1000", caption: "Soft Studio Lighting" },
      { src: "https://images.unsplash.com/photo-1587297415761-a2e2697a1330?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG90cmFpdHMlMjBib3klMjBzdW5zZXR8ZW58MHx8MHx8fDA%3D", caption: "Intense Gaze Portrait" },
      { src: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=1000", caption: "Corporate Professional Portrait" },
      { src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=1000", caption: "Joyful Candid Smile" },
      { src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=1000", caption: "Rugged Character Portrait" },
      { src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=1000", caption: "Timeless Simplicity" },
      { src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=1000", caption: "Modern Business Headshot" },
      { src: "https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&q=80&w=1000", caption: "Cinematic Mood Portrait" },
      { src: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=1000", caption: "Street Style Close-Up" }
    ]
  },
  events: {
    title: "Events",
    description: "High energy, dynamic lighting, and memorable corporate and private event stories.",
    images: [
      { src: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1000", caption: "Tech Conference Keynote" },
      { src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1000", caption: "Gala Dinner Dance Floor" },
      { src: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=1000", caption: "Vibrant Live Music Festival" },
      { src: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=1000", caption: "Outdoor Festive Gathering" },
      { src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1000", caption: "Summit Interactive Panel" },
      { src: "https://images.unsplash.com/photo-1464047736614-af63643285bf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGV2ZW50c3xlbnwwfHwwfHx8MA%3D%3D", caption: "Chic Networking Lounge" },
      { src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1000", caption: "Grand Ballroom Dinner" },
      { src: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=1000", caption: "Neon Concert Stage Lights" },
      { src: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=1000", caption: "Nightclub VIP DJ Set" },
      { src: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=1000", caption: "Exhibition Opening Ceremony" },
      { src: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&q=80&w=1000", caption: "Intimate Dinner Banquet" },
      { src: "https://images.unsplash.com/photo-1551818255-e6e10975bc17?auto=format&fit=crop&q=80&w=1000", caption: "Dynamic Workshop Session" },
      { src: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&q=80&w=1000", caption: "Corporate Party Toast" },
      { src: "https://images.unsplash.com/photo-1522158637959-30385a09e0da?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGV2ZW50c3xlbnwwfHwwfHx8MA%3D%3D", caption: "Press Conference Coverage" },
      { src: "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&q=80&w=1000", caption: "Festival Crowd Energy" }
    ]
  },
  birthdays: {
    title: "Birthdays",
    description: "Pure laughter, blowing out candles, vibrant balloons, and unforgettable birthday bashes.",
    images: [
      { src: "https://images.unsplash.com/photo-1635349135195-ea08a39fcc5c?auto=format&fit=crop&q=80&w=1000", caption: "Magical Cupcake Candles" },
      { src: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80&w=1000", caption: "Colorful Helium Balloons" },
      { src: "https://images.unsplash.com/photo-1583875762487-5f8f7c718d14?auto=format&fit=crop&q=80&w=1000", caption: "Delightful Confetti Shower" },
      { src: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&q=80&w=1000", caption: "Fun Birthday Party Table" },
      { src: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=1000", caption: "Vibrant Celebration Backdrop" },
      { src: "https://images.unsplash.com/photo-1533294160622-d5fece3e080d?auto=format&fit=crop&q=80&w=1000", caption: "Excited Candle Blowing" },
      { src: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YmlydGhkYXl8ZW58MHx8MHx8fDA%3D", caption: "Abstract Pastel Party Colors" },
      { src: "https://plus.unsplash.com/premium_photo-1663839412026-51a44cfadfb8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmlydGhkYXl8ZW58MHx8MHx8fDA%3D", caption: "Happy Children's Party Fun" },
      { src: "https://images.unsplash.com/photo-1516685018646-549198525c1b?auto=format&fit=crop&q=80&w=1000", caption: "Sparkler Magic Celebration" },
      { src: "https://images.unsplash.com/photo-1577998474517-7eeeed4e448a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YmlydGhkYXl8ZW58MHx8MHx8fDA%3D", caption: "Warm Family Birthday Toast" },
      { src: "https://images.unsplash.com/photo-1513546493312-0066d7de3fd2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJpcnRoZGF5fGVufDB8fDB8fHww", caption: "Elegant Champagne Pour" },
      { src: "https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmlydGhkYXl8ZW58MHx8MHx8fDA%3D", caption: "Confetti Popper Fun" },
      { src: "https://plus.unsplash.com/premium_photo-1663839412165-0d60a57e7a91?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YmlydGhkYXl8ZW58MHx8MHx8fDA%3D", caption: "Custom Double-Decker Cake" },
      { src: "https://images.unsplash.com/photo-1553135422-400ee5852b27?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGJpcnRoZGF5fGVufDB8fDB8fHww", caption: "Brightly Wrapped Gifts" },
      { src: "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGJpcnRoZGF5fGVufDB8fDB8fHww", caption: "Cheer and Friends' Toast" }
    ]
  },
  family: {
    title: "Family",
    description: "Sincere bonds, picnic afternoons, cozy studio portraiture, and intergenerational love.",
    images: [
      { src: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=1000", caption: "Laughter in the Meadow" },
      { src: "https://images.unsplash.com/photo-1542037104857-ffbb0b9155fb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZmFtaWx5fGVufDB8fDB8fHww", caption: "Mother and Son Bond" },
      { src: "https://plus.unsplash.com/premium_photo-1681910241563-a3bd7a4c2ec9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZmFtaWx5fGVufDB8fDB8fHww", caption: "Picnic Blanket Hugs" },
      { src: "https://images.unsplash.com/photo-1609220136736-443140cffec6?auto=format&fit=crop&q=80&w=1000", caption: "Sisters Giggling Together" },
      { src: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&q=80&w=1000", caption: "Forest Trail Family Stroll" },
      { src: "https://images.unsplash.com/photo-1650493175702-3e519e2d5023?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGZhbWlseSUyMGZ1bnxlbnwwfHwwfHx8MA%3D%3D", caption: "Cozy Bedtime Stories" },
      { src: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=1000", caption: "Playful Outdoor Afternoon" },
      { src: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&q=80&w=1000", caption: "Three Generations of Love" },
      { src: "https://images.unsplash.com/photo-1602255680702-c47261041a97?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGZhbWlseXxlbnwwfHwwfHx8MA%3D%3D", caption: "Sharing Warm Hugs" },
      { src: "https://images.unsplash.com/photo-1475503572774-15a45e5d60b9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fGZhbWlseXxlbnwwfHwwfHx8MA%3D%3D", caption: "Sunny Beachfront Walk" },
      { src: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=1000", caption: "Newborn Cradle & Smiles" },
      { src: "https://images.unsplash.com/photo-1510154221590-ff63e90a136f?auto=format&fit=crop&q=80&w=1000", caption: "Mother-Daughter Tender Moment" },
      { src: "https://images.unsplash.com/photo-1615887023516-9b6bcd559e87?auto=format&fit=crop&q=80&w=1000", caption: "Father and Daughter Playtime" },
      { src: "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&q=80&w=1000", caption: "Sunset Lakeside Reflections" },
      { src: "https://images.unsplash.com/photo-1489710437720-ebb67ec84dd2?auto=format&fit=crop&q=80&w=1000", caption: "Pure Childlike Wonder" }
    ]
  },
  fashion: {
    title: "Fashion",
    description: "Avant-garde designs, high contrast editorial shoots, runway aesthetics, and stylistic details.",
    images: [
      { src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=1000", caption: "High Contrast Editorial Look" },
      { src: "https://plus.unsplash.com/premium_photo-1675186049419-d48f4b28fe7c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D", caption: "Retro Velvet Suit Design" },
      { src: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1000", caption: "Summer Silk Editorial" },
      { src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000", caption: "Vibrant Yellow Runway Streetwear" },
      { src: "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?auto=format&fit=crop&q=80&w=1000", caption: "Windblown Wool Coat" },
      { src: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZhc2hpb258ZW58MHx8MHx8fDA%3D", caption: "Floral Haute Couture" },
      { src: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&q=80&w=1000", caption: "Classic Trench Coat Elegance" },
      { src: "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?auto=format&fit=crop&q=80&w=1000", caption: "Chic Accessories Display" },
      { src: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=1000", caption: "Glamorous Urban Fur" },
      { src: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&q=80&w=1000", caption: "Minimalist Casual Chic" },
      { src: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1000", caption: "Tailored Menswear Close-Up" },
      { src: "https://images.unsplash.com/photo-1557777586-f6682739fcf3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGZhc2hpb258ZW58MHx8MHx8fDA%3D", caption: "Modern Bohemian Style" },
      { src: "https://images.unsplash.com/photo-1731505583021-16c3a17339cd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D", caption: "Vivid Sunset Reflection Wear" },
      { src: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&q=80&w=1000", caption: "Edgy Urban Leather Jacket" },
      { src: "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&q=80&w=1000", caption: "Sophisticated Neutral Drapes" }
    ]
  }
};

export default function CategoryGallery() {
  const { category } = useParams();
  const navigate = useNavigate();
  const [activeImageIndex, setActiveImageIndex] = useState(null);

  // Normalize path name
  const catKey = (category || "").toLowerCase();
  const currentCat = categoryData[catKey];

  // If the category does not exist in our data, redirect user home
  useEffect(() => {
    if (!currentCat) {
      navigate("/");
    }
  }, [currentCat, navigate]);

  // Window keypress listener for Lightbox navigation & escape
  useEffect(() => {
    if (activeImageIndex === null || !currentCat) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setActiveImageIndex(null);
      } else if (e.key === "ArrowRight") {
        setActiveImageIndex((prev) => (prev + 1) % currentCat.images.length);
      } else if (e.key === "ArrowLeft") {
        setActiveImageIndex((prev) => (prev - 1 + currentCat.images.length) % currentCat.images.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeImageIndex, currentCat]);

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [catKey]);

  if (!currentCat) return null;

  const handlePrev = (e) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev - 1 + currentCat.images.length) % currentCat.images.length);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev + 1) % currentCat.images.length);
  };

  return (
    <div className="category-gallery-section">
      <div className="category-gallery-header">
        <Link to="/" className="back-link">
          <span>←</span> Back to Main Gallery
        </Link>
        <span className="eyebrow">Portfolio — {currentCat.title}</span>
        <h1 className="category-gallery-title">{currentCat.title} Showcase</h1>
        <p className="category-gallery-desc">{currentCat.description}</p>
      </div>

      <div className="category-grid">
        {currentCat.images.map((img, idx) => (
          <div
            key={idx}
            className="category-photo-card"
            onClick={() => setActiveImageIndex(idx)}
            style={{ animationDelay: `${idx * 0.04}s` }}
          >
            <img src={img.src} alt={img.caption} loading="lazy" />
            <div className="photo-overlay">
              <div className="photo-zoom-icon">⤢</div>
            </div>
          </div>
        ))}
      </div>

      {activeImageIndex !== null && (
        <div className="lightbox" onClick={() => setActiveImageIndex(null)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button
              className="lightbox-btn lightbox-close"
              onClick={() => setActiveImageIndex(null)}
              aria-label="Close Lightbox"
            >
              &times;
            </button>

            {/* Left Prev Arrow */}
            <button
              className="lightbox-btn lightbox-prev"
              onClick={handlePrev}
              aria-label="Previous Image"
            >
              &#10229;
            </button>

            {/* Lightbox Main Image */}
            <img
              src={currentCat.images[activeImageIndex].src}
              alt={currentCat.images[activeImageIndex].caption}
              className="lightbox-img"
            />

            {/* Right Next Arrow */}
            <button
              className="lightbox-btn lightbox-next"
              onClick={handleNext}
              aria-label="Next Image"
            >
              &#10230;
            </button>

            {/* Count & Details Counter */}
            <div className="lightbox-counter">
              <span>{String(activeImageIndex + 1).padStart(2, "0")}</span>
              <span style={{ margin: "0 0.4rem", opacity: 0.5 }}>/</span>
              <span>{String(currentCat.images.length).padStart(2, "0")}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
