import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
  name: String,
  email: String,
  education: String,
  skills: [String],
  projects: [
    {
      title: String,
      description: String,
      links: [String]
    }
  ],
 work: [
  {
    company: String,
    role: String,
    start: String,  
    end: String   
  }
],
  links: {
    github: String,
    linkedin: String,
    portfolio: String
  }
});

const Profile = mongoose.model("Profile", ProfileSchema);

export default Profile;