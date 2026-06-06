// // src/components/editor/componentRegistry.js

// // ── Default content seeds per component type ─────────────────
// export const DEFAULT_CONTENT = {
//   hero: {
//     heading: "Your Headline Here",
//     subheading: "A compelling subheading that explains what you offer to your visitors.",
//     buttonText: "Get Started",
//     buttonUrl: "#",
//     badge: "New",
//   },
//   text: {
//     heading: "Section Title",
//     body: "Write your content here. This is a text block component — add headings, paragraphs and more to tell your story.",
//   },
//   button: { label: "Click Here", url: "#" },
//   image: { src: "", alt: "Image description" },
//   card_grid: {
//     heading: "Our Features",
//     subheading: "Everything you need to succeed.",
//     cards: [
//       { icon: "⬡", title: "Feature One",   description: "Describe this feature here."  },
//       { icon: "◈", title: "Feature Two",   description: "Another great feature."        },
//       { icon: "◉", title: "Feature Three", description: "One more awesome thing."       },
//     ],
//   },
//   testimonial: {
//     heading: "What our users say",
//     testimonials: [
//       { name: "Alex J.", role: "Founder", quote: "This product changed everything for us." },
//       { name: "Sara K.", role: "Designer", quote: "The most intuitive builder I've used." },
//     ],
//   },
//   faq: {
//     heading: "Frequently Asked Questions",
//     faqs: [
//       { question: "What is Webcraft?",  answer: "A next-generation visual website builder platform." },
//       { question: "Is it free to use?", answer: "Yes! We have a free plan with no credit card required." },
//     ],
//   },
//   divider:     { label: "" },
//   feature: {
//     heading: "Why choose us",
//     subheading: "Everything you need, nothing you don't.",
//     features: [
//       { icon: "⬡", title: "Lightning Fast",  description: "Built for speed from the ground up."  },
//       { icon: "◈", title: "Fully Scalable",  description: "Grows with your business needs."       },
//       { icon: "◉", title: "Always Secure",   description: "Enterprise-grade security baked in."   },
//     ],
//   },
//   pricing: {
//     heading: "Simple Pricing",
//     plans: [
//       { name: "Starter", price: "$0",  description: "Perfect to get started", features: ["3 websites", "Community support"], highlighted: false },
//       { name: "Pro",     price: "$29", description: "For professionals",       features: ["Unlimited websites", "Priority support", "Custom domains"], highlighted: true },
//       { name: "Team",    price: "$89", description: "For agencies",            features: ["Everything in Pro", "5 team seats", "API access"], highlighted: false },
//     ],
//   },
// };

// // ── Component type catalogue (for the picker UI) ─────────────
// export const COMPONENT_TYPES = [
//   { type: "hero",        icon: "⬡", label: "Hero Section",   description: "Large headline + CTA banner"   },
//   { type: "text",        icon: "T",  label: "Text Block",     description: "Heading + body paragraph"      },
//   { type: "button",      icon: "⬕", label: "Button",         description: "Call-to-action button"          },
//   { type: "image",       icon: "◫", label: "Image",          description: "Full-width or inline image"     },
//   { type: "card_grid",   icon: "⊞", label: "Card Grid",      description: "Grid of feature/info cards"    },
//   { type: "testimonial", icon: "❝", label: "Testimonial",    description: "Customer quote block"          },
//   { type: "faq",         icon: "?",  label: "FAQ Section",   description: "Expandable Q&A list"           },
//   { type: "divider",     icon: "—",  label: "Divider",       description: "Visual section separator"      },
//   { type: "feature",     icon: "◈", label: "Feature Section", description: "Icon + text feature rows"     },
//   { type: "pricing",     icon: "$",  label: "Pricing",       description: "Pricing tiers and plans"       },
// ];
// src/components/editor/componentRegistry.jsx
// UPDATED: added navbar to DEFAULT_CONTENT and COMPONENT_TYPES

// ── Default content seeds per component type ─────────────────
export const DEFAULT_CONTENT = {
  hero: {
    heading: "Your Headline Here",
    subheading: "A compelling subheading that explains what you offer to your visitors.",
    buttonText: "Get Started",
    buttonUrl: "#",
    badge: "New",
  },
  text: {
    heading: "Section Title",
    body: "Write your content here. This is a text block component — add headings, paragraphs and more to tell your story.",
  },
  button: { label: "Click Here", url: "#" },
  image:  { src: "", alt: "Image description" },
  card_grid: {
    heading: "Our Features",
    subheading: "Everything you need to succeed.",
    cards: [
      { icon: "⬡", title: "Feature One",   description: "Describe this feature here."  },
      { icon: "◈", title: "Feature Two",   description: "Another great feature."        },
      { icon: "◉", title: "Feature Three", description: "One more awesome thing."       },
    ],
  },
  testimonial: {
    heading: "What our users say",
    testimonials: [
      { name: "Alex J.", role: "Founder",  quote: "This product changed everything for us." },
      { name: "Sara K.", role: "Designer", quote: "The most intuitive builder I've used."   },
    ],
  },
  faq: {
    heading: "Frequently Asked Questions",
    faqs: [
      { question: "What is Webcraft?",  answer: "A next-generation visual website builder platform." },
      { question: "Is it free to use?", answer: "Yes! We have a free plan with no credit card required." },
    ],
  },
  divider: { label: "" },
  feature: {
    heading: "Why choose us",
    subheading: "Everything you need, nothing you don't.",
    features: [
      { icon: "⬡", title: "Lightning Fast",  description: "Built for speed from the ground up."  },
      { icon: "◈", title: "Fully Scalable",  description: "Grows with your business needs."       },
      { icon: "◉", title: "Always Secure",   description: "Enterprise-grade security baked in."   },
    ],
  },
  pricing: {
    heading: "Simple Pricing",
    plans: [
      { name: "Starter", price: "$0",  description: "Perfect to get started", features: ["3 websites", "Community support"],                           highlighted: false },
      { name: "Pro",     price: "$29", description: "For professionals",       features: ["Unlimited websites", "Priority support", "Custom domains"], highlighted: true  },
      { name: "Team",    price: "$89", description: "For agencies",            features: ["Everything in Pro", "5 team seats", "API access"],           highlighted: false },
    ],
  },

  // ✅ NEW — navbar default content
  navbar: {
    siteName:  "My Website",
    logoText:  "M",
    showLogo:  true,
    ctaLabel:  "Get started",
    ctaSlug:   "/contact",
    navItems: [
      { label: "Home",    slug: "/"        },
      { label: "About",   slug: "/about"   },
      { label: "Contact", slug: "/contact" },
    ],
  },
};

// ── Component type catalogue (for the picker UI) ─────────────
export const COMPONENT_TYPES = [
  // ✅ navbar first so it's easy to find at top
  { type: "navbar",      icon: "☰",  label: "Navbar",          description: "Site navigation with 2–5 links" },
  { type: "hero",        icon: "⬡",  label: "Hero Section",    description: "Large headline + CTA banner"    },
  { type: "text",        icon: "T",  label: "Text Block",       description: "Heading + body paragraph"       },
  { type: "button",      icon: "⬕", label: "Button",           description: "Call-to-action button"          },
  { type: "image",       icon: "◫", label: "Image",            description: "Full-width or inline image"     },
  { type: "card_grid",   icon: "⊞", label: "Card Grid",        description: "Grid of feature/info cards"    },
  { type: "testimonial", icon: "❝", label: "Testimonial",      description: "Customer quote block"          },
  { type: "faq",         icon: "?",  label: "FAQ Section",     description: "Expandable Q&A list"           },
  { type: "divider",     icon: "—",  label: "Divider",         description: "Visual section separator"      },
  { type: "feature",     icon: "◈", label: "Feature Section",  description: "Icon + text feature rows"      },
  { type: "pricing",     icon: "$",  label: "Pricing",         description: "Pricing tiers and plans"       },
];