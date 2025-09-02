import express from "express";
import Profile from "../models/profile.model.js";

const router = express.Router();

// Create or Update entire profile
router.post("/", async (req, res) => {
  let profile = await Profile.findOne({});
  if (!profile) profile = new Profile(req.body);
  else Object.assign(profile, req.body);
  await profile.save();
  res.json(profile);
});

// Read profile
router.get("/", async (req, res) => {
  const profile = await Profile.findOne({});
  res.json(profile);
});

// Atomic update profile
router.put("/", async (req, res) => {
  const profile = await Profile.findOneAndUpdate({}, req.body, { new: true, upsert: true });
  res.json(profile);
});

// Delete profile
router.delete("/", async (req, res) => {
  await Profile.deleteMany({});
  res.json({ success: true });
});

// Query projects by skill
router.get("/projects", async (req, res) => {
  const { skill } = req.query;
  const profile = await Profile.findOne({});
  let projects = profile.projects;

  if (skill) {
    const skillRegex = new RegExp(skill, "i");
    projects = projects.filter(
      (p) =>
        skillRegex.test(p.description || "") ||
        profile.skills.some((s) => skillRegex.test(s))
    );
  }

  res.json(projects);
});


// Top skills
router.get("/skills/top", async (req, res) => {
  const profile = await Profile.findOne({});
  res.json((profile.skills || []).slice(0, 3));
});


router.get("/search", async (req, res) => {
  try {
    const { q } = req.query;
    const profile = await Profile.findOne({});
    if (!profile) return res.json([]);

    const searchRegex = new RegExp(q, 'i');
    const projects = profile.projects.filter(p => 
      searchRegex.test(p.title || "") || searchRegex.test(p.description || "")
    );
    const skills = (profile.skills || []).filter(skill => searchRegex.test(skill));

    const result = [...projects, ...skills];
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Health check
router.get("/health", (req, res) => {
  res.status(200).send("OK");
});

export default router;
