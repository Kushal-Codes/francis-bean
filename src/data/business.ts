/**
 * FRANCIS BEAN — BUSINESS PROFILE & VERIFIED CONFIGURATION
 * 
 * Central truth for all café metadata, hours, contact points, and verified policies.
 * Referenced by both UI components and the Beanie AI chatbot knowledge engine.
 */

export interface OperatingHours {
  day: string;
  open: string;
  close: string;
  isOpen: boolean;
  notes?: string;
}

export interface BusinessDetails {
  name: string;
  shortName: string;
  tagline: string;
  address: {
    street: string;
    suburb: string;
    state: string;
    postcode: string;
    country: string;
    formatted: string;
    mapsQueryUrl: string;
    embedMapUrl: string;
    landmarkHint: string;
  };
  contact: {
    phoneDisplay: string;
    phoneRaw: string;
    emailHint: string;
  };
  operatingHours: OperatingHours[];
  hoursNotice: string;
  coffeePartner: {
    name: string;
    roaster: string;
    blendName: string;
    tastingNotes: string[];
    description: string;
  };
  diningOptions: {
    dineIn: boolean;
    takeaway: boolean;
    catering: boolean;
    tableBookings: boolean;
    dogFriendly: boolean;
    notes: string;
  };
  socialLinks: {
    instagramUrl: string;
    instagramHandle: string;
    facebookUrl: string;
    communityDirectoryUrl: string;
  };
  deliveryLinks: {
    doorDashUrl: string;
    uberEatsUrl: string;
  };
  disclaimers: {
    liveInventory: string;
    allergenWarning: string;
    demoNotice: string;
  };
}

export const BUSINESS_DATA: BusinessDetails = {
  name: "Francis Bean",
  shortName: "Francis Bean",
  tagline: "Your little coffee stop by the coast.",
  address: {
    street: "3 Mari Street",
    suburb: "Alexandra Headland",
    state: "QLD",
    postcode: "4572",
    country: "Australia",
    formatted: "3 Mari St, Alexandra Headland, QLD 4572",
    mapsQueryUrl: "https://www.google.com/maps/search/?api=1&query=Francis+Bean+3+Mari+St+Alexandra+Headland+QLD",
    embedMapUrl: "https://maps.google.com/maps?q=3%20Mari%20Street%20Alexandra%20Headland%20QLD%204572&t=&z=16&ie=UTF8&iwloc=&output=embed",
    landmarkHint: "Tucked just off Alexandra Parade, two minutes barefoot stroll from the Alex patrolled surf beach.",
  },
  contact: {
    phoneDisplay: "(07) 5479 0079",
    phoneRaw: "+61754790079",
    emailHint: "For general inquiries, please call during trading hours (6:00 am - 1:00 pm).",
  },
  operatingHours: [
    { day: "Monday", open: "06:00", close: "13:00", isOpen: true },
    { day: "Tuesday", open: "06:00", close: "13:00", isOpen: true },
    { day: "Wednesday", open: "06:00", close: "13:00", isOpen: true },
    { day: "Thursday", open: "06:00", close: "13:00", isOpen: true },
    { day: "Friday", open: "06:00", close: "13:00", isOpen: true },
    { day: "Saturday", open: "06:00", close: "13:00", isOpen: true },
    { day: "Sunday", open: "06:00", close: "13:00", isOpen: true },
  ],
  hoursNotice: "Open every day from 6:00 am to 1:00 pm. Public holiday hours may vary — give us a ring on 07 5479 0079 to confirm special holiday trading.",
  coffeePartner: {
    name: "Campos Coffee",
    roaster: "Campos Specialty Coffee Roasters",
    blendName: "Campos Superior Blend",
    tastingNotes: ["Sweet caramel", "Belgian chocolate", "Red berry finish", "Velvety body"],
    description: "Proudly serving Australia's beloved Campos Superior blend, expertly extracted on espresso and batch brew every morning.",
  },
  diningOptions: {
    dineIn: true,
    takeaway: true,
    catering: false,
    tableBookings: false, // Walk-in café model
    dogFriendly: true,
    notes: "Casual walk-ins only (no reservations required). Dogs are warmly welcome at our outdoor beachside tables!",
  },
  socialLinks: {
    instagramUrl: "https://www.instagram.com/_francisbean/",
    instagramHandle: "@_francisbean",
    facebookUrl: "https://www.facebook.com/francisbeancafe/",
    communityDirectoryUrl: "https://www.alexandraheadland.qld.au/sponsors/francis-bean",
  },
  deliveryLinks: {
    doorDashUrl: "https://www.doordash.com/en/store/francis-bean-alexandra-headland-1777160/",
    uberEatsUrl: "https://www.ubereats.com/au/store/francis-bean/06df318f-7988-5c4e-bce1-d70659ea3fdc",
  },
  disclaimers: {
    liveInventory: "This digital demo does not connect to live kitchen inventory. Please confirm current batch availability directly with the team.",
    allergenWarning: "Our kitchen handles gluten, dairy, nuts, eggs, and sesame. If you have an anaphylactic allergy or strict coeliac requirement, please speak directly with our team in-store or by phone before ordering.",
    demoNotice: "Independent website concept. Not affiliated with or endorsed by Francis Bean.",
  },
};
