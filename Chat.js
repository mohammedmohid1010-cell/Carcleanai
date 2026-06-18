// =============================================
// SparkleWash AI Assistant
// Uses Groq API (free) — replace with your key
// =============================================

const GROQ_API_KEY = “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”;

const SYSTEM_PROMPT = `You are the friendly AI assistant for SparkleWash, a professional car cleaning service.

Our services and pricing:

- Express Wash: $25 (Sedan), $35 (SUV/Truck), $45 (Van) — Quick exterior wash, rinse, and dry
- Full Detail: $89 (Sedan), $109 (SUV/Truck), $129 (Van) — Interior vacuum, exterior wash, tire shine, window clean & wax coat
- Interior Only: $65 (Sedan), $80 (SUV/Truck), $95 (Van) — Deep vacuum, upholstery shampoo, dashboard wipe & odor treatment
- Premium Package: $199 (Sedan), $239 (SUV/Truck), $279 (Van) — Full detail + clay bar treatment, ceramic coating & leather conditioning

Business info:

- Address: 123 Clean Street, Auto City, CA 90210
- Phone: (555) 123-4567
- Email: hello@sparklewash.com
- Hours: Monday–Saturday 8am–6pm, Sunday 9am–4pm

Booking: Customers can call us or email to book. Walk-ins welcome during business hours.

Your tone is friendly, helpful, and professional. Keep responses concise (2-4 sentences max).
Always try to help the customer find the right service for their needs.
If asked about something outside car cleaning, politely redirect to what you can help with.`;

// Chat state
let messages = [];
let isLoading = false;

// ===== UI FUNCTIONS =====

function openChat() {
document.getElementById(“chatWindow”).classList.add(“open”);
document.getElementById(“chatBubble”).style.display = “none”;
document.getElementById(“chatInput”).focus();
}

function closeChat() {
document.getElementById(“chatWindow”).classList.remove(“open”);
document.getElementById(“chatBubble”).style.display = “flex”;
}

function handleKey(e) {
if (e.key === “Enter” && !isLoading) sendMessage();
}

function sendSuggestion(text) {
document.getElementById(“chatInput”).value = text;
sendMessage();
document.getElementById(“suggestions”).style.display = “none”;
}

function appendMessage(role, text) {
const container = document.getElementById(“chatMessages”);
const div = document.createElement(“div”);
div.className = `msg ${role}`;
div.innerHTML = `<div class="msg-bubble">${text.replace(/\n/g, "<br/>")}</div>`;
container.appendChild(div);
container.scrollTop = container.scrollHeight;
return div;
}

function showTyping() {
const container = document.getElementById(“chatMessages”);
const div = document.createElement(“div”);
div.className = “msg bot typing-indicator”;
div.id = “typingIndicator”;
div.innerHTML = `<div class="msg-bubble"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div>`;
container.appendChild(div);
container.scrollTop = container.scrollHeight;
}

function hideTyping() {
const indicator = document.getElementById(“typingIndicator”);
if (indicator) indicator.remove();
}

// ===== AI CALL =====

async function callGroq(userMessage) {
messages.push({ role: “user”, content: userMessage });

const response = await fetch(“https://api.groq.com/openai/v1/chat/completions”, {
method: “POST”,
headers: {
“Content-Type”: “application/json”,
“Authorization”: `Bearer ${GROQ_API_KEY}`
},
body: JSON.stringify({
model: “llama3-8b-8192”,
messages: [
{ role: “system”, content: SYSTEM_PROMPT },
…messages
],
max_tokens: 300,
temperature: 0.7
})
});

if (!response.ok) {
throw new Error(`API error: ${response.status}`);
}

const data = await response.json();
const reply = data.choices[0].message.content;
messages.push({ role: “assistant”, content: reply });
return reply;
}

// ===== MAIN SEND =====

async function sendMessage() {
const input = document.getElementById(“chatInput”);
const sendBtn = document.getElementById(“sendBtn”);
const text = input.value.trim();
if (!text || isLoading) return;

// Clear input
input.value = “”;
isLoading = true;
sendBtn.disabled = true;

// Show user message
appendMessage(“user”, text);
showTyping();

try {
const reply = await callGroq(text);
hideTyping();
appendMessage(“bot”, reply);
} catch (err) {
hideTyping();
console.error(err);
// Friendly fallback if API key not set
if (GROQ_API_KEY === “YOUR_GROQ_API_KEY_HERE”) {
appendMessage(“bot”, “⚠️ Please add your Groq API key in <code>chat.js</code> to enable the AI assistant. Get a free key at <a href='https://console.groq.com' target='_blank' style='color:#4d7fff'>console.groq.com</a>”);
} else {
appendMessage(“bot”, “Sorry, I’m having trouble connecting right now. Please call us at (555) 123-4567 or email hello@sparklewash.com for assistance.”);
}
}

isLoading = false;
sendBtn.disabled = false;
input.focus();
}
