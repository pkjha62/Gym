const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Member = require("./models/Member");
const Plan = require("./models/Plan");
const Testimonial = require("./models/Testimonial");
const ContactLead = require("./models/ContactLead");

const app = express();

// --------------- Middleware ---------------
const allowedOrigins = [
  process.env.CLIENT_URL || "http://localhost:5173",
  process.env.ADMIN_URL || "http://localhost:5174",
];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("CORS not allowed for this origin"));
    },
  })
);
app.use(express.json({ limit: "10kb" }));

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);
const adminApiKey = process.env.ADMIN_API_KEY || "";

app.use("/api/admin", (req, res, next) => {
  if (!adminApiKey) {
    // Fallback for local development if key is not set
    return next();
  }

  const incomingKey = req.headers["x-admin-key"];
  if (incomingKey !== adminApiKey) {
    return res.status(401).json({ error: "Unauthorized admin request" });
  }

  return next();
});

// --------------- Database ---------------
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/primefitness";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✓ MongoDB connected"))
  .catch((err) => console.error("✗ MongoDB connection error:", err.message));

// --------------- Routes ---------------

// Health check
app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

// Plans — public
app.get("/api/plans", async (_req, res) => {
  try {
    const plans = await Plan.find({ isActive: true }).sort("price");
    res.json(plans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Testimonials — public (only approved)
app.get("/api/testimonials", async (_req, res) => {
  try {
    const reviews = await Testimonial.find({ approved: true })
      .sort("-createdAt")
      .limit(10);
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Contact form — public
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    const lead = await ContactLead.create({ name, email, phone, message });
    res.status(201).json({ message: "Thank you! We will get back to you soon.", id: lead._id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ----------------------- Admin CRUD: Plans -----------------------
app.get("/api/admin/plans", async (_req, res) => {
  try {
    const plans = await Plan.find().sort("price");
    res.json(plans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/admin/plans", async (req, res) => {
  try {
    const plan = await Plan.create(req.body);
    res.status(201).json(plan);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put("/api/admin/plans/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) return res.status(400).json({ error: "Invalid plan id" });

    const updated = await Plan.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ error: "Plan not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete("/api/admin/plans/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) return res.status(400).json({ error: "Invalid plan id" });

    const deleted = await Plan.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: "Plan not found" });
    res.json({ message: "Plan deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// -------------------- Admin CRUD: Testimonials --------------------
app.get("/api/admin/testimonials", async (_req, res) => {
  try {
    const testimonials = await Testimonial.find().sort("-createdAt");
    res.json(testimonials);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/admin/testimonials", async (req, res) => {
  try {
    const testimonial = await Testimonial.create(req.body);
    res.status(201).json(testimonial);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put("/api/admin/testimonials/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) return res.status(400).json({ error: "Invalid testimonial id" });

    const updated = await Testimonial.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ error: "Testimonial not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete("/api/admin/testimonials/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) return res.status(400).json({ error: "Invalid testimonial id" });

    const deleted = await Testimonial.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: "Testimonial not found" });
    res.json({ message: "Testimonial deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ----------------------- Admin CRUD: Leads ------------------------
app.get("/api/admin/leads", async (_req, res) => {
  try {
    const leads = await ContactLead.find().sort("-createdAt");
    res.json(leads);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/admin/leads/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) return res.status(400).json({ error: "Invalid lead id" });

    const updated = await ContactLead.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ error: "Lead not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete("/api/admin/leads/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) return res.status(400).json({ error: "Invalid lead id" });

    const deleted = await ContactLead.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: "Lead not found" });
    res.json({ message: "Lead deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ----------------------- Admin CRUD: Members ----------------------
app.get("/api/admin/members", async (_req, res) => {
  try {
    const members = await Member.find().populate("activePlan", "name price durationInMonths").sort("-createdAt");
    res.json(members);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/admin/members", async (req, res) => {
  try {
    const member = await Member.create(req.body);
    const safeMember = await Member.findById(member._id).populate("activePlan", "name price durationInMonths");
    res.status(201).json(safeMember);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put("/api/admin/members/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) return res.status(400).json({ error: "Invalid member id" });

    const member = await Member.findById(id).select("+password");
    if (!member) return res.status(404).json({ error: "Member not found" });

    const updatableFields = ["name", "email", "phone", "activePlan", "planExpiry"];
    updatableFields.forEach((field) => {
      if (req.body[field] !== undefined) member[field] = req.body[field];
    });
    if (req.body.password) member.password = req.body.password;

    await member.save();
    const safeMember = await Member.findById(id).populate("activePlan", "name price durationInMonths");
    res.json(safeMember);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete("/api/admin/members/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) return res.status(400).json({ error: "Invalid member id" });

    const deleted = await Member.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: "Member not found" });
    res.json({ message: "Member deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// --------------- Start ---------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✓ Server running on port ${PORT}`));
