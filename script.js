// ------------------- SAMPLE JOB DATA -------------------
const sampleJobs = [
  { title: "Frontend Developer", company: "Google", location: "Remote", category: "IT" },
  { title: "UI/UX Designer", company: "Figma", location: "Bangalore", category: "Design" },
  { title: "Marketing Executive", company: "Flipkart", location: "Delhi", category: "Marketing" },
  { title: "Data Analyst", company: "TCS", location: "Mumbai", category: "Finance" },
  { title: "HR Manager", company: "Infosys", location: "Pune", category: "HR" },
  { title: "Sales Associate", company: "Amazon", location: "Remote", category: "Sales" },
  { title: "Software Engineer", company: "Microsoft", location: "Hyderabad", category: "IT" },
  { title: "Graphic Designer", company: "Canva", location: "Chennai", category: "Design" },
  { title: "Finance Intern", company: "Deloitte", location: "Delhi", category: "Finance" },
  { title: "Backend Developer", company: "Zomato", location: "Remote", category: "IT" },
  { title: "Social Media Manager", company: "Swiggy", location: "Mumbai", category: "Marketing" },
  { title: "Recruiter", company: "Wipro", location: "Noida", category: "HR" },
  { title: "Business Analyst", company: "Paytm", location: "Bangalore", category: "Finance" },
  { title: "Sales Manager", company: "Ola", location: "Hyderabad", category: "Sales" },
  { title: "Software Tester", company: "Accenture", location: "Pune", category: "IT" },
];

// ------------------- LOCAL STORAGE SETUP -------------------
if (!localStorage.getItem("jobs")) {
  localStorage.setItem("jobs", JSON.stringify(sampleJobs));
}

// ------------------- DISPLAY JOBS -------------------
function displayJobs(jobsToDisplay) {
  const jobList = document.getElementById("jobList");
  if (!jobList) return;

  jobList.innerHTML = "";

  jobsToDisplay.forEach((job, index) => {
    const card = document.createElement("div");
    card.classList.add("job-card");
    card.innerHTML = `
      <h3>${job.title}</h3>
      <p><b>Company:</b> ${job.company}</p>
      <p><b>Location:</b> ${job.location}</p>
      <p><b>Category:</b> ${job.category}</p>
      <button class="apply-btn" onclick="applyJob('${job.title}')">Apply Job</button>
    `;
    jobList.appendChild(card);
  });
}

if (document.getElementById("jobList")) {
  const allJobs = JSON.parse(localStorage.getItem("jobs"));
  displayJobs(allJobs);
}

// ------------------- APPLY JOB -------------------
function applyJob(title) {
  alert(`Applied successfully for ${title}!`);
}

// ------------------- SEARCH JOBS -------------------
function searchJobs() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const allJobs = JSON.parse(localStorage.getItem("jobs"));
  const filtered = allJobs.filter(
    (job) =>
      job.title.toLowerCase().includes(input) ||
      job.company.toLowerCase().includes(input) ||
      job.category.toLowerCase().includes(input)
  );
  displayJobs(filtered);
}

// ------------------- FILTER CATEGORY -------------------
function filterCategory(category) {
  const allJobs = JSON.parse(localStorage.getItem("jobs"));
  const filtered = allJobs.filter((job) => job.category === category);
  displayJobs(filtered);
}

// ------------------- SIGNUP -------------------
function signupUser() {
  const name = document.getElementById("signupName").value;
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  if (!name || !email || !password) {
    alert("Please fill all fields");
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];
  if (users.find((u) => u.email === email)) {
    alert("User already exists");
    return;
  }

  users.push({ name, email, password });
  localStorage.setItem("users", JSON.stringify(users));
  alert("Signup successful! Please login.");
  window.location.href = "login.html";
}

// ------------------- LOGIN -------------------
function loginUser() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find((u) => u.email === email && u.password === password);

  if (user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
    alert("Login successful!");
    window.location.href = "index.html";
  } else {
    alert("Invalid credentials");
  }
}

// ------------------- LOGOUT -------------------
function logoutUser() {
  localStorage.removeItem("currentUser");
  window.location.reload();
}

// ------------------- NAVBAR LOGIN STATE -------------------
const currentUser = JSON.parse(localStorage.getItem("currentUser"));
if (currentUser) {
  document.getElementById("loginBtn").style.display = "none";
  document.getElementById("signupBtn").style.display = "none";
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.style.display = "inline-block";
    logoutBtn.onclick = logoutUser;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("jobForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const company = document.getElementById("company").value.trim();
    const title = document.getElementById("title").value.trim();
    const location = document.getElementById("location").value.trim();
    const category = document.getElementById("category").value;
    const type = document.getElementById("type").value;
    const salary = document.getElementById("salary").value.trim();
    const description = document.getElementById("description").value.trim();
    const messageBox = document.getElementById("message");

    if (!company || !title || !location || !category || !type || !description) {
      showMessage("Please fill all required fields.", "error");
      return;
    }

    const job = {
      company,
      title,
      location,
      category,
      type,
      salary,
      description,
      postedOn: new Date().toLocaleString(),
    };

    const jobs = JSON.parse(localStorage.getItem("hirehub_jobs")) || [];
    jobs.push(job);
    localStorage.setItem("hirehub_jobs", JSON.stringify(jobs));

    form.reset();
    showMessage("Job posted successfully!", "success");
  });

  function showMessage(text, type) {
    const message = document.getElementById("message");
    message.textContent = text;
    message.className = type;
    message.style.display = "block";
    setTimeout(() => (message.style.display = "none"), 3000);
  }
});
