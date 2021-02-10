import * as Linking from "expo-linking";

export const alphaSort = (a, b) => {
  const nameA = a.agency.toUpperCase();
  const nameB = b.agency.toUpperCase();
  let comparison = 0;
  if (nameA > nameB) {
    comparison = 1;
  } else if (nameA < nameB) {
    comparison = -1;
  }
  return comparison;
};

export const openMaps = (street, city, state, zip) => {
  street = street.split(" ").join("+");
  if (city.split(" ").length > 1) {
    city = city.split(" ").join("%2C");
  }
  let url = `https://www.google.com/maps/search/?api=1&query=${street}%2C${city}%2C${state}%2C${zip}`;
  Linking.openURL(url);
};
export const openPhone = (num) => {
  const url = `tel:${num}`;
  return Linking.openURL(url).catch((error) => console.log(error));
};

export const formatPhoneNum = (n) => {
  return `(${n[0]}${n[1]}${n[2]}) ${n[3]}${n[4]}${n[5]}-${n[6]}${n[7]}${n[8]}${n[9]}`;
};

export const faq = [
  {
    question: "When is it appropriate to dial 9-1-1?",
    answer:
      "911 is reserved for life and death emergencies and in progress crimes. If you are reporting something that does not meet those criteria, a department's 10 digit non-emergency line would be the most appropriate number to call.",
  },
  {
    question: "What information should I be ready to tell the operator?",
    answer: `• The location of the emergency, including the street address, and room/apartment number, if you’re in a large building.\n• The phone number you're calling from.\n• The nature of the emergency.\n• Details about the emergency, such as a physical description of a person who may have committed a crime, a description of any fire that may be burning, or a description of injuries or symptoms being experienced by a person having a medical emergency.`,
  },
  {
    question: "Can't I just text 911 instead?",
    answer:
      "Although most agencies do have text-to-911 capabilities, it should only be used in instances where calling is not possible. If you are putting yourself or others in danger by calling, or if you have a disability that makes calling difficult or impossible, texting is appropriate.",
  },
  {
    question: "Why so many questions?",
    answer:
      "Dispatchers often have strict policies that they need to follow. Questions are often asked in a specific manner or order to provide units in the field with the most useful information for their response.",
  },
  {
    question: "What if I accidentally dial 911?",
    answer:
      "Don't hang up! The dispatcher will have to call you back to confirm that there is no emergency. Misdials cause a huge amount of wasted time in dispatch centers, so staying on the line helps save a step.",
  },
  {
    question: "Can I call 911 to get help in another location?",
    answer:
      "Agencies generally can only transfer 911 calls to neighboring departments. If you need assistance in another county/municipality/state, you're better off looking online for the department's 10 digit number and calling directly.",
  },
  {
    question: "What if I don't speak English?",
    answer:
      "Agencies will generally contract with a translation service that can help interpret a large number of languages.",
  },
  {
    question: "General tips when calling for help.",
    answer:
      "• Do your best to remain as calm as possible. The easier it is for the dispatcher to understand the situation, the faster help can arrive.\n• Listen to the dispatcher and answer their questions as they are asked.\n• Speak clearly and slowly.\n• The most important piece of information is the location of the emergency. Be aware of your surroundings and provide as precise of a location as possible.\n• Never call 911 for information. This takes up a 911 line and a dispatcher's time, which can delay a response to a true emergency.",
  },
];

export const usStates = [
  { abbr: "AL", stateName: "Alabama" },
  { abbr: "AK", stateName: "Alaska" },
  { abbr: "AZ", stateName: "Arizona" },
  { abbr: "AR", stateName: "Arkansas" },
  { abbr: "CA", stateName: "California" },
  { abbr: "CO", stateName: "Colorado" },
  { abbr: "CT", stateName: "Connecticut" },
  { abbr: "DE", stateName: "Delaware" },
  { abbr: "DC", stateName: "Washington, DC" },
  { abbr: "FL", stateName: "Florida" },
  { abbr: "GA", stateName: "Georgia" },
  { abbr: "HI", stateName: "Hawaii" },
  { abbr: "ID", stateName: "Idaho" },
  { abbr: "IL", stateName: "Illinois" },
  { abbr: "IN", stateName: "Indiana" },
  { abbr: "IA", stateName: "Iowa" },
  { abbr: "KS", stateName: "Kansas" },
  { abbr: "KY", stateName: "Kentucky" },
  { abbr: "LA", stateName: "Louisiana" },
  { abbr: "ME", stateName: "Maine" },
  { abbr: "MD", stateName: "Maryland" },
  { abbr: "MA", stateName: "Massachusetts" },
  { abbr: "MI", stateName: "Michigan" },
  { abbr: "MN", stateName: "Minnesota" },
  { abbr: "MS", stateName: "Mississippi" },
  { abbr: "MO", stateName: "Missouri" },
  { abbr: "MT", stateName: "Montana" },
  { abbr: "NE", stateName: "Nebraska" },
  { abbr: "NV", stateName: "Nevada" },
  { abbr: "NH", stateName: "New Hampshire" },
  { abbr: "NJ", stateName: "New Jersey" },
  { abbr: "NM", stateName: "New Mexico" },
  { abbr: "NY", stateName: "New York" },
  { abbr: "NC", stateName: "North Carolina" },
  { abbr: "ND", stateName: "North Dakota" },
  { abbr: "OH", stateName: "Ohio" },
  { abbr: "OK", stateName: "Oklahoma" },
  { abbr: "OR", stateName: "Oregon" },
  { abbr: "PA", stateName: "Pennsylvania" },
  { abbr: "RI", stateName: "Rhode Island" },
  { abbr: "SC", stateName: "South Carolina" },
  { abbr: "SD", stateName: "South Dakota" },
  { abbr: "TN", stateName: "Tennessee" },
  { abbr: "TX", stateName: "Texas" },
  { abbr: "UT", stateName: "Utah" },
  { abbr: "VT", stateName: "Vermont" },
  { abbr: "VA", stateName: "Virginia" },
  { abbr: "WA", stateName: "Washington" },
  { abbr: "WV", stateName: "West Virginia" },
  { abbr: "WI", stateName: "Wisconsin" },
  { abbr: "WY", stateName: "Wyoming" },
];
