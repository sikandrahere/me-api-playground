import React, { useEffect, useState } from "react";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

function App() {
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", education: "", skills: [], projects: [], work: [] });
  const [editing, setEditing] = useState(false);
  const [queryTerm, setQueryTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // Load profile on mount
  useEffect(() => {
    fetch(API)
      .then(res => res.json())
      .then(data => setProfile(data));
  }, []);

  // Prepare editing
  const editProfile = () => {
    setForm(profile || { name: "", email: "", education: "", skills: [], projects: [], work: [] });
    setEditing(true);
  };

  // Handle main field change
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle skill input
  const handleSkillsChange = e => {
    setForm({ ...form, skills: e.target.value.split(",").map(s => s.trim()) });
  };

  // Add/edit/remove project
  const updateProject = (idx, key, value) => {
    const updated = [...(form.projects || [])];
    updated[idx][key] = key === "links" ? value.split(",").map(s => s.trim()) : value;
    setForm({ ...form, projects: updated });
  };
  const addProject = () => setForm({ ...form, projects: [...(form.projects || []), { title: "", description: "", links: [""] }] });
  const removeProject = idx => setForm({ ...form, projects: form.projects.filter((_, i) => i !== idx) });

  // Add/edit/remove work
  const updateWork = (idx, key, value) => {
    const updated = [...(form.work || [])];
    updated[idx][key] = value;
    setForm({ ...form, work: updated });
  };
  const addWork = () => setForm({ ...form, work: [...(form.work || []), { company: "", role: "", start: "", end: "" }] });
  const removeWork = idx => setForm({ ...form, work: form.work.filter((_, i) => i !== idx) });

  // Save (create/update) profile
  const saveProfile = () => {
    fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    })
      .then(res => res.json())
      .then(data => {
        setProfile(data);
        setEditing(false);
      });
  };

  // Delete the whole profile
  const deleteProfile = () => {
    fetch(API, { method: "DELETE" })
      .then(() => {
        setProfile(null);
        setEditing(false);
      });
  };

  // Query projects by skill
  const queryProjects = () => {
    fetch(`${API}/projects?skill=${encodeURIComponent(queryTerm)}`)
      .then(res => res.json())
      .then(setSearchResults);
  };

  // Search (projects, skills)
  const searchProfile = () => {
    fetch(`${API}/search?q=${encodeURIComponent(queryTerm)}`)
      .then(res => res.json())
      .then(setSearchResults);
  };

  // Top 3 skills
  const fetchTopSkills = () => {
    fetch(`${API}/skills/top`)
      .then(res => res.json())
      .then(setSearchResults);
  };

  return (
    <div style={{ margin: 32, fontFamily: "sans-serif" }}>
      <h2>Personal Playground Profile</h2>
      {/* Profile View or Edit */}
      {profile && !editing ? (
        <div>
          <b>Name:</b> {profile.name}<br />
          <b>Email:</b> {profile.email}<br />
          <b>Education:</b> {profile.education}<br />
          <b>Skills:</b> {profile.skills?.join(", ")}<br />
          <b>Projects:</b>
            <ul>
              {profile.projects?.map((p, idx) => (
                <li key={idx}>
                  <b>{p.title}</b>: {p.description}
                  <br />Links: {p.links?.join(", ")}
                </li>
              ))}
            </ul>
          <b>Work:</b>
            <ul>
              {profile.work?.map((w, idx) => (
                <li key={idx}>
                  <b>{w.company}</b> - {w.role} ({w.start} to {w.end})
                </li>
              ))}
            </ul>
          <button onClick={editProfile}>Edit Profile</button>
          <button onClick={deleteProfile}>Delete Profile</button>
        </div>
      ) : (
        <div>
          <h3>{profile ? "Edit Profile" : "Create Profile"}</h3>
          <input name="name" placeholder="Name" value={form?.name || ""} onChange={handleChange} /><br />
          <input name="email" placeholder="Email" value={form?.email || ""} onChange={handleChange} /><br />
          <input name="education" placeholder="Education" value={form?.education || ""} onChange={handleChange} /><br />
          <input name="skills" placeholder="Skills (comma separated)" value={form?.skills?.join(",") || ""} onChange={handleSkillsChange} /><br />
          
          <h4>Projects</h4>
          {form.projects?.map((p, idx) => (
            <div key={idx} style={{ marginBottom: 10 }}>
              <input placeholder="Title" value={p.title || ""} onChange={e => updateProject(idx, "title", e.target.value)} />
              <input placeholder="Description" value={p.description || ""} onChange={e => updateProject(idx, "description", e.target.value)} />
              <input placeholder="Links (comma separated)" value={p.links?.join(",") || ""} onChange={e => updateProject(idx, "links", e.target.value)} />
              <button type="button" onClick={() => removeProject(idx)}>Remove</button>
            </div>
          ))}
          <button type="button" onClick={addProject}>Add Project</button>

          <h4>Work</h4>
          {form.work?.map((w, idx) => (
            <div key={idx} style={{ marginBottom: 10 }}>
              <input placeholder="Company" value={w.company || ""} onChange={e => updateWork(idx, "company", e.target.value)} />
              <input placeholder="Role" value={w.role || ""} onChange={e => updateWork(idx, "role", e.target.value)} />
              <input placeholder="Start" value={w.start || ""} onChange={e => updateWork(idx, "start", e.target.value)} />
              <input placeholder="End" value={w.end || ""} onChange={e => updateWork(idx, "end", e.target.value)} />
              <button type="button" onClick={() => removeWork(idx)}>Remove</button>
            </div>
          ))}
          <button type="button" onClick={addWork}>Add Work</button>

          <br />
          <button onClick={saveProfile}>{profile ? "Update" : "Create"}</button>
          {profile && <button type="button" onClick={() => setEditing(false)}>Cancel</button>}
        </div>
      )}
      <hr />

      <h3>Query or Search Example</h3>
      <input placeholder="Skill or Search Term" value={queryTerm} onChange={e => setQueryTerm(e.target.value)} />
      <button onClick={queryProjects}>Query Projects by Skill</button>
      <button onClick={searchProfile}>Search (projects & skills)</button>
      <button onClick={fetchTopSkills}>Top 3 Skills</button>
      <ul>
        {searchResults.map((res, idx) =>
          typeof res === "string"
            ? <li key={idx}>Skill: {res}</li>
            : <li key={idx}>{res.title || res.company}: {res.description || res.role || res}</li>
        )}
      </ul>
    </div>
  );
}

export default App;
