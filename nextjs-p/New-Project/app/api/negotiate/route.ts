import { NextResponse } from "next/server";

const MIN_PRICE = 35000;
const INITIAL_PRICE = 50000;

export async function POST(req: Request) {
  const { message, currentOffer, round, patience } = await req.json();

  let response = "";
  let newOffer = currentOffer;
  let newPatience = patience;
  let status = "CONTINUE";

  const lowerMsg = message.toLowerCase();
  const priceMatch = message.match(/\d+/g);
  const offeredPrice = priceMatch ? parseInt(priceMatch[0].replace(/,/g, "")) : null;

  // Personality: The Curator
  const reactions = {
    LOWBALL: [
      "That is... an insulting proposal. This is a Chronos Sapphire, not a common trinket.",
      "I believe you have mistaken this boutique for a street market. Such a price is impossible.",
      "My patience is thin. If you cannot respect the craftsmanship, do not waste my time."
    ],
    REASONING_TECH: [
      "Ah, a connoisseur. You noticed the tourbillon. It is indeed a complex mechanism, but that only adds to its rarity.",
      "The sapphire casing is indeed difficult to maintain, but its luster is unmatched. I might consider a slight adjustment for a true collector."
    ],
    REASONING_CONDITION: [
      "The 'invisible' scratch you mention is merely a sign of its history. However, your eye for detail is... commendable.",
      "A flawed masterpiece is still a masterpiece. But I will acknowledge your observation."
    ],
    COUNTER: [
      "I can perhaps come down to {price}. It is a significant gesture on my part.",
      "Very well. For you, let us say {price}. But that is as far as I am willing to go today.",
      "You are persistent. {price}. Take it or leave it."
    ],
    ACCEPT: [
      "It is a deal. The Sapphire is yours. A fine addition to any collection.",
      "You drive a hard bargain. Very well, {price} it is. Follow me to the counting house.",
      "I see I have met my match. The price is acceptable."
    ],
    FAILED: [
      "I have had enough of this. Guards, show this person out.",
      "We are done here. The Chronos Sapphire stays in the vault.",
      "Your lack of respect for the arts is tiresome. Good day."
    ]
  };

  // Logic
  if (offeredPrice) {
    if (offeredPrice < MIN_PRICE - 5000) {
      // Very low
      newPatience -= 25;
      response = reactions.LOWBALL[Math.floor(Math.random() * reactions.LOWBALL.length)];
    } else if (offeredPrice >= MIN_PRICE && offeredPrice < currentOffer) {
      if (offeredPrice >= currentOffer - 2000 || Math.random() > 0.5) {
        // Acceptable or close
        newOffer = offeredPrice;
        response = reactions.ACCEPT[Math.floor(Math.random() * reactions.ACCEPT.length)].replace("{price}", `$${newOffer.toLocaleString()}`);
        status = "DEAL";
      } else {
        // Counter
        newOffer = Math.floor(currentOffer - (currentOffer - offeredPrice) / 2);
        response = reactions.COUNTER[Math.floor(Math.random() * reactions.COUNTER.length)].replace("{price}", `$${newOffer.toLocaleString()}`);
        newPatience -= 5;
      }
    } else if (offeredPrice >= currentOffer) {
      response = "Why would you offer more than the current price? Are you mocking me?";
      newPatience -= 10;
    } else {
      // Too low but within range
      newOffer = Math.floor(currentOffer * 0.98);
      response = reactions.LOWBALL[0] + ` However, I will offer ${newOffer.toLocaleString()} as a final courtesy.`;
      newPatience -= 15;
    }
  } else {
    // Reasoning or Chat
    if (lowerMsg.includes("scratch") || lowerMsg.includes("condition") || lowerMsg.includes("old")) {
      response = reactions.REASONING_CONDITION[Math.floor(Math.random() * reactions.REASONING_CONDITION.length)];
      newOffer = Math.floor(currentOffer * 0.99);
    } else if (lowerMsg.includes("mechanism") || lowerMsg.includes("sapphire") || lowerMsg.includes("luxury")) {
      response = reactions.REASONING_TECH[Math.floor(Math.random() * reactions.REASONING_TECH.length)];
      newOffer = Math.floor(currentOffer * 0.995);
    } else {
      response = "Your words are elegant, but business requires a proposal. What is your offer?";
      newPatience -= 5;
    }
  }

  if (newPatience <= 0) {
    status = "FAILED";
    response = reactions.FAILED[Math.floor(Math.random() * reactions.FAILED.length)];
  }

  return NextResponse.json({
    response,
    newOffer,
    newPatience: Math.max(0, newPatience),
    status
  });
}
