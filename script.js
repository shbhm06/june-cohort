let currentUser = null;
let currentView = 'home';
let patients = [
    {
        id: 1,
        name: 'John Smith',
        age: 45,
        phone: '+91 XXXXXXXXXX',
        email: 'john.smith@email.com',
        lastVisit: '2024-06-10',
        diagnosis: 'Hypertension',
        prescription: 'Lisinopril 10mg daily',
        notes: 'Patient reports good compliance with medication. BP well controlled.',
        vitals: { bp: '125/78', hr: '72', temp: '98.6°F', weight: '180 KGS' }
    },
    {
        id: 2,
        name: 'Emily Johnson',
        age: 32,
        phone: '+91 XXXXXXXXXX',
        email: 'emily.johnson@email.com',
        lastVisit: '2024-06-12',
        diagnosis: 'Type 2 Diabetes',
        prescription: 'Metformin 500mg twice daily',
        notes: 'HbA1c improved. Continue current regimen.',
        vitals: { bp: '118/76', hr: '68', temp: '98.4°F', weight: '145 KGS' }
    },
    {
        id: 3,
        name: 'Robert Wilson',
        age: 67,
        phone: '+91 XXXXXXXXXX',
        email: 'robert.wilson@email.com',
        lastVisit: '2024-06-08',
        diagnosis: 'Arthritis',
        prescription: 'Ibuprofen 400mg as needed',
        notes: 'Joint pain manageable with current treatment.',
        vitals: { bp: '135/82', hr: '75', temp: '98.7°F', weight: '195 KGS' }
    }
];

let appointments = [
    {
        id: 1,
        patientName: 'Alice Brown',
        date: '2024-06-16',
        time: '09:00',
        type: 'Regular Checkup',
        phone: '(555) 111-2222',
        status: 'confirmed'
    },
    {
        id: 2,
        patientName: 'David Lee',
        date: '2024-06-16',
        time: '10:30',
        type: 'Follow-up',
        phone: '(555) 333-4444',
        status: 'pending'
    },
    {
        id: 3,
        patientName: 'Maria Garcia',
        date: '2024-06-17',
        time: '14:00',
        type: 'Consultation',
        phone: '(555) 555-6666',
        status: 'confirmed'
    }
];

// User credentials
const users = {
    doctor1: { password: 'password', role: 'doctor', name: 'Dr. Smith' },
    frontdesk1: { password: 'password', role: 'frontdesk', name: 'Sarah Johnson' }
};

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    setupAnimations();
});

function initializeApp() {
    // Add floating elements to hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        for (let i = 0; i < 3; i++) {
            const element = document.createElement('div');
            element.className = 'floating-element';
            hero.appendChild(element);
        }
    }

    // Initialize mobile menu
    setupMobileMenu();
    
    // Add smooth scrolling
    setupSmoothScrolling();
}

function setupEventListeners() {
    // Doctor login form
    const doctorLoginForm = document.getElementById('doctor-login-form');
    if (doctorLoginForm) {
        doctorLoginForm.addEventListener('submit', handleDoctorLogin);
    }

    // Front desk login form
    const frontdeskLoginForm = document.getElementById('frontdesk-login-form');
    if (frontdeskLoginForm) {
        frontdeskLoginForm.addEventListener('submit', handleFrontdeskLogin);
    }

    // Add click handlers for navigation
    document.addEventListener('click', function(e) {
        if (e.target.matches('[onclick]')) {
            e.preventDefault();
            const onclick = e.target.getAttribute('onclick');
            if (onclick.includes('openDoctorPortal')) openDoctorPortal();
            if (onclick.includes('openFrontDesk')) openFrontDesk();
            if (onclick.includes('logout')) logout();
        }
    });

    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (currentView !== 'home') {
                goHome();
            }
        }
    });
}

function setupAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe feature cards and testimonials
    document.querySelectorAll('.feature-card, .testimonial-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(card);
    });
}

function setupMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
            mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
            navLinks.classList.toggle('active');
            mobileMenuBtn.textContent = isExpanded ? '☰' : '✕';
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenuBtn.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                mobileMenuBtn.textContent = '☰';
            }
        });
    }
}

function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Navigation functions
function openDoctorPortal() {
    document.body.classList.add('hide-main-content');
    hideAllSections();
    showSection('doctor-login');
    currentView = 'doctor-login';
    
    // Add entrance animation
    const loginPanel = document.querySelector('#doctor-login .login-panel');
    if (loginPanel) {
        loginPanel.style.transform = 'translateY(30px)';
        loginPanel.style.opacity = '0';
        setTimeout(() => {
            loginPanel.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            loginPanel.style.transform = 'translateY(0)';
            loginPanel.style.opacity = '1';
        }, 100);
    }
}

function openFrontDesk() {
    document.body.classList.add('hide-main-content');
    hideAllSections();
    if (!document.getElementById('frontdesk-login')) {
        createFrontdeskLogin();
    }
    showSection('frontdesk-login');
    currentView = 'frontdesk-login';
}

function goHome() {
    hideAllSections();
    showSection('hero');
    showSection('features');
    showSection('access');
    showSection('testimonials');
    showSection('contact');
    currentView = 'home';
    currentUser = null;
}

function hideAllSections() {
    // First hide everything
    const allSections = ['hero', 'features', 'access-section', 'testimonials', 'footer', 
                        'doctor-login', 'frontdesk-login', 'doctor-dashboard', 'frontdesk-dashboard'];
    allSections.forEach(id => {
        const element = document.getElementById(id) || document.querySelector(`.${id}`);
        if (element) {
            element.style.display = 'none';
        }
    });

    // If we're showing a login or dashboard, ensure main page sections stay hidden
    if (currentView === 'doctor-login' || currentView === 'frontdesk-login' || 
        currentView === 'doctor-dashboard' || currentView === 'frontdesk-dashboard') {
        ['features', 'testimonials', 'footer'].forEach(id => {
            const element = document.getElementById(id) || document.querySelector(`.${id}`);
            if (element) {
                element.style.display = 'none';
            }
        });
    }
}

function showSection(id) {
    const element = document.getElementById(id) || document.querySelector(`.${id}`);
    if (element) {
        if (id === 'doctor-login' || id === 'frontdesk-login' || id === 'doctor-dashboard' || id === 'frontdesk-dashboard') {
            element.style.display = 'flex';
        } else {
            element.style.display = 'block';
        }
    }
}

// Login handlers
function handleDoctorLogin(e) {
    e.preventDefault();
    const username = document.getElementById('doctor-username').value;
    const password = document.getElementById('doctor-password').value;

    if (authenticateUser(username, password, 'doctor')) {
        currentUser = { username, role: 'doctor', name: users[username].name };
        showDoctorDashboard();
    } else {
        showError('Invalid credentials. Try: doctor1 / password');
    }
}

function handleFrontdeskLogin(e) {
    e.preventDefault();
    const username = document.getElementById('frontdesk-username').value;
    const password = document.getElementById('frontdesk-password').value;

    if (authenticateUser(username, password, 'frontdesk')) {
        currentUser = { username, role: 'frontdesk', name: users[username].name };
        showFrontdeskDashboard();
    } else {
        showError('Invalid credentials. Try: frontdesk1 / password');
    }
}

function authenticateUser(username, password, role) {
    const user = users[username];
    return user && user.password === password && user.role === role;
}

function showError(message) {
    // Remove existing error messages
    document.querySelectorAll('.error-message').forEach(el => el.remove());
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    const activeForm = document.querySelector('form:not([style*="display: none"])');
    if (activeForm) {
        activeForm.appendChild(errorDiv);
        
        // Auto-remove error after 5 seconds
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.remove();
            }
        }, 5000);
    }
}

// Dashboard functions
function showDoctorDashboard() {
    hideAllSections();
    if (!document.getElementById('doctor-dashboard')) {
        createDoctorDashboard();
    }
    showSection('doctor-dashboard');
    currentView = 'doctor-dashboard';
    renderPatientList();
}

function showFrontdeskDashboard() {
    hideAllSections();
    if (!document.getElementById('frontdesk-dashboard')) {
        createFrontdeskDashboard();
    }
    showSection('frontdesk-dashboard');
    currentView = 'frontdesk-dashboard';
    renderAppointmentList();
    initializeSpeechRecognition();
}

// Create dynamic sections
function createFrontdeskLogin() {
    const section = document.createElement('section');
    section.id = 'frontdesk-login';
    section.className = 'frontdesk-login';
    section.style.display = 'none';
    section.innerHTML = `
        <div class="login-panel">
            <button class="close-btn" onclick="showHome()" style="position: absolute; top: 20px; right: 20px; background: none; border: none; color: white; font-size: 24px; cursor: pointer;">×</button>
            <div class="icon" aria-label="Reception">🏥</div>
            <h2>Front Desk Login</h2>
            <p style="margin-bottom: 18px;">Welcome to the appointment management system!</p>
            <div class="demo-credentials">
                <strong>Demo:</strong> Username: <code>frontdesk1</code> | Password: <code>password</code>
            </div>
            <form id="frontdesk-login-form">
                <div style="margin-bottom:20px;">
                    <label for="frontdesk-username">Username</label>
                    <input type="text" id="frontdesk-username" name="username" required>
                </div>
                <div style="margin-bottom:10px;">
                    <label for="frontdesk-password">Password</label>
                    <input type="password" id="frontdesk-password" name="password" required>
                </div>
                <button type="submit" class="btn btn-primary" style="width:100%; margin-top:10px;">Sign In</button>
                <div style="margin-top: 15px; text-align: center;">
                    <a href="#" class="forgot-link">Forgot Password?</a>
                    <br>
                    <a href="#" class="forgot-link" onclick="showCreateAccount('frontdesk')">Create New Account</a>
                </div>
            </form>
        </div>
    `;
    document.body.appendChild(section);
    
    // Add event listener for the new form
    const form = section.querySelector('#frontdesk-login-form');
    if (form) {
        form.addEventListener('submit', handleFrontdeskLogin);
    }
}

function createDoctorLogin() {
    const section = document.createElement('section');
    section.id = 'doctor-login';
    section.className = 'doctor-login';
    section.style.display = 'none';
    section.innerHTML = `
        <div class="login-panel">
            <button class="close-btn" onclick="showHome()" style="position: absolute; top: 20px; right: 20px; background: none; border: none; color: white; font-size: 24px; cursor: pointer;">×</button>
            <div class="icon" aria-label="Doctor">👨‍⚕️</div>
            <h2>Doctor Login</h2>
            <p style="margin-bottom: 18px;">Welcome to the doctor's portal!</p>
            <div class="demo-credentials">
                <strong>Demo:</strong> Username: <code>doctor1</code> | Password: <code>password</code>
            </div>
            <form id="doctor-login-form">
                <div style="margin-bottom:20px;">
                    <label for="doctor-username">Username</label>
                    <input type="text" id="doctor-username" name="username" required>
                </div>
                <div style="margin-bottom:10px;">
                    <label for="doctor-password">Password</label>
                    <input type="password" id="doctor-password" name="password" required>
                </div>
                <button type="submit" class="btn btn-primary" style="width:100%; margin-top:10px;">Sign In</button>
                <div style="margin-top: 15px; text-align: center;">
                    <a href="#" class="forgot-link">Forgot Password?</a>
                    <br>
                    <a href="#" class="forgot-link" onclick="showCreateAccount('doctor')">Create New Account</a>
                </div>
            </form>
        </div>
    `;
    document.body.appendChild(section);
    
    // Add event listener for the new form
    const form = section.querySelector('#doctor-login-form');
    if (form) {
        form.addEventListener('submit', handleDoctorLogin);
    }
}

function showCreateAccount(role) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.8); backdrop-filter: blur(10px);
        display: flex; align-items: center; justify-content: center;
        z-index: 10000; animation: fadeIn 0.3s ease;
    `;
    
    modal.innerHTML = `
        <div style="background: var(--glass); padding: 2rem; border-radius: 15px; width: 90%; max-width: 400px;">
            <h3 style="color: white; margin-bottom: 1.5rem;">Create New ${role === 'doctor' ? 'Doctor' : 'Front Desk'} Account</h3>
            <form id="create-account-form">
                <div style="margin-bottom: 1rem;">
                    <label style="display: block; color: white; margin-bottom: 0.5rem;">Full Name</label>
                    <input type="text" id="new-name" required style="width: 100%; padding: 0.5rem; border-radius: 5px; border: 1px solid #ccc;">
                </div>
                <div style="margin-bottom: 1rem;">
                    <label style="display: block; color: white; margin-bottom: 0.5rem;">Username</label>
                    <input type="text" id="new-username" required style="width: 100%; padding: 0.5rem; border-radius: 5px; border: 1px solid #ccc;">
                </div>
                <div style="margin-bottom: 1rem;">
                    <label style="display: block; color: white; margin-bottom: 0.5rem;">Password</label>
                    <input type="password" id="new-password" required style="width: 100%; padding: 0.5rem; border-radius: 5px; border: 1px solid #ccc;">
                </div>
                <div style="margin-bottom: 1.5rem;">
                    <label style="display: block; color: white; margin-bottom: 0.5rem;">Confirm Password</label>
                    <input type="password" id="confirm-password" required style="width: 100%; padding: 0.5rem; border-radius: 5px; border: 1px solid #ccc;">
                </div>
                <div style="text-align: center;">
                    <button type="submit" class="btn btn-primary" style="margin-right: 0.5rem;">Create Account</button>
                    <button type="button" class="btn btn-secondary close-modal">Cancel</button>
                </div>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add event listeners
    const form = modal.querySelector('#create-account-form');
    const closeBtn = modal.querySelector('.close-modal');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('new-name').value;
        const username = document.getElementById('new-username').value;
        const password = document.getElementById('new-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        
        if (password !== confirmPassword) {
            showError('Passwords do not match');
            return;
        }
        
        // Add new user to users object
        users[username] = {
            password: password,
            role: role,
            name: name
        };
        
        modal.remove();
        showSuccessMessage('Account created successfully! Please login with your new credentials.');
    });
    
    closeBtn.addEventListener('click', () => {
        modal.remove();
    });
}

function createDoctorDashboard() {
    const section = document.createElement('section');
    section.id = 'doctor-dashboard';
    section.className = 'doctor-dashboard';
    section.style.display = 'none';
    section.innerHTML = `
        <div class="container">
            <div class="dashboard-panel">
                <div class="dashboard-profile">
                    <div class="avatar">DR</div>
                    <div class="dashboard-profile-info">
                        <h3>${currentUser ? currentUser.name : 'Doctor'}</h3>
                        <p>Medical Professional</p>
                    </div>
                    <div style="margin-left: auto; display: flex; gap: 10px;">
                        <button class="btn btn-secondary" onclick="showDoctorLogin()">Back</button>
                        <button class="btn btn-secondary" onclick="logout()">Logout</button>
                    </div>
                </div>
                
                <div class="dashboard-stats">
                    <div class="stat-card">
                        <strong>${patients.length}</strong>
                        <span>Total Patients</span>
                    </div>
                    <div class="stat-card">
                        <strong>12</strong>
                        <span>Today's Appointments</span>
                    </div>
                    <div class="stat-card">
                        <strong>8</strong>
                        <span>Pending Reports</span>
                    </div>
                    <div class="stat-card">
                        <strong>95%</strong>
                        <span>Satisfaction Rate</span>
                    </div>
                </div>

                <div class="upcoming-appointments">
                    <h4>Today's Schedule</h4>
                    <ul>
                        <li><strong>9:00 AM</strong> - Alice Brown (Regular Checkup)</li>
                        <li><strong>10:30 AM</strong> - David Lee (Follow-up)</li>
                        <li><strong>2:00 PM</strong> - Maria Garcia (Consultation)</li>
                        <li><strong>3:30 PM</strong> - James Wilson (Physical Exam)</li>
                    </ul>
                </div>

                <div class="dashboard-notifications">
                    <h4>Patient Management</h4>
                    <div style="margin-bottom: 1rem;">
                        <input type="text" id="patient-search" placeholder="Search patients..." style="width: 100%; margin-bottom: 1rem;">
                        <button class="btn btn-primary" onclick="addNewPatient()">Add New Patient</button>
                    </div>
                    <div id="patient-list"></div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(section);
    
    // Add search functionality
    const searchInput = section.querySelector('#patient-search');
    if (searchInput) {
        searchInput.addEventListener('input', filterPatients);
    }
}

function createFrontdeskDashboard() {
    const section = document.createElement('section');
    section.id = 'frontdesk-dashboard';
    section.className = 'frontdesk-dashboard';
    section.style.display = 'none';
    section.innerHTML = `
        <div class="container">
            <div class="dashboard-panel">
                <div class="dashboard-profile">
                    <div class="avatar">FD</div>
                    <div class="dashboard-profile-info">
                        <h3>${currentUser ? currentUser.name : 'Front Desk'}</h3>
                        <p>Reception Staff</p>
                    </div>
                    <div style="margin-left: auto; display: flex; gap: 10px;">
                        <button class="btn btn-secondary" onclick="showFrontdeskLogin()">Back</button>
                        <button class="btn btn-secondary" onclick="logout()">Logout</button>
                    </div>
                </div>
                
                <div class="dashboard-stats" style="display: flex; justify-content: center; gap: 20px; margin: 2rem 0;">
                    <div class="stat-card" style="min-width: 200px; text-align: center;">
                        <strong style="font-size: 2rem;">${appointments.length}</strong>
                        <span>Today's Appointments</span>
                    </div>
                    <div class="stat-card" style="min-width: 200px; text-align: center;">
                        <strong style="font-size: 2rem;">5</strong>
                        <span>Waiting Patients</span>
                    </div>
                    <div class="stat-card" style="min-width: 200px; text-align: center;">
                        <strong style="font-size: 2rem;">18</strong>
                        <span>Calls Answered</span>
                    </div>
                </div>

                <div class="dashboard-notifications">
                    <h4>🎤 Voice Appointment Booking</h4>
                    <p style="color: rgba(255, 255, 255, 0.8); margin-bottom: 1rem;">Click the microphone and speak naturally: "Book an appointment for John Smith tomorrow at 2 PM"</p>
                    <div style="text-align: center; margin-bottom: 2rem;">
                        <button id="voice-btn" class="btn btn-primary" style="font-size: 1.2rem; padding: 1rem 2rem;">
                            🎤 Start Voice Booking
                        </button>
                        <div id="voice-status" style="margin-top: 1rem; font-style: italic; color: rgba(255, 255, 255, 0.7);"></div>
                        <div id="voice-transcript" style="margin-top: 1rem; padding: 1rem; background: rgba(255, 255, 255, 0.1); border-radius: 10px; min-height: 50px; display: none;"></div>
                    </div>
                </div>

                <div class="upcoming-appointments">
                    <h4>Appointment Management</h4>
                    <div style="margin-bottom: 1rem;">
                        <button class="btn btn-secondary" onclick="showAppointmentForm()">Manual Booking</button>
                    </div>
                    <div id="appointment-form" style="display: none; background: rgba(255, 255, 255, 0.1); padding: 1.5rem; border-radius: 15px; margin-bottom: 1rem;">
                        <h5 style="color: white; margin-bottom: 1rem;">New Appointment</h5>
                        <input type="text" id="patient-name" placeholder="Patient Name" style="margin-bottom: 0.5rem;">
                        <input type="tel" id="patient-phone" placeholder="Phone Number" style="margin-bottom: 0.5rem;">
                        <input type="date" id="appointment-date" style="margin-bottom: 0.5rem;">
                        <textarea id="patient-symptoms" placeholder="Patient Symptoms" style="width: 100%; padding: 0.5rem; margin-bottom: 0.5rem; border-radius: 5px; border: 1px solid #ccc; min-height: 80px;"></textarea>
                        <select id="appointment-type" style="margin-bottom: 1rem;">
                            <option value="">Select Type</option>
                            <option value="Regular Checkup">Regular Checkup</option>
                            <option value="Follow-up">Follow-up</option>
                            <option value="Consultation">Consultation</option>
                            <option value="Emergency">Emergency</option>
                        </select>
                        <div>
                            <button class="btn btn-primary" onclick="bookAppointment()">Book Appointment</button>
                            <button class="btn btn-secondary" onclick="hideAppointmentForm()" style="margin-left: 0.5rem;">Cancel</button>
                        </div>
                    </div>
                    <div id="appointment-list"></div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(section);
}

// Patient management functions
function renderPatientList() {
    const container = document.getElementById('patient-list');
    if (!container) return;

    container.innerHTML = patients.map(patient => `
        <div class="stat-card" style="text-align: left; margin-bottom: 1rem; cursor: pointer;" onclick="viewPatient(${patient.id})">
            <div style="display: flex; justify-content: between; align-items: center;">
                <div>
                    <strong style="color: white; font-size: 1.1rem;">${patient.name}</strong>
                    <div style="color: rgba(255, 255, 255, 0.7); font-size: 0.9rem; margin-top: 0.25rem;">
                        Age: ${patient.age} | Last Visit: ${patient.lastVisit}
                    </div>
                    <div style="color: rgba(255, 255, 255, 0.6); font-size: 0.85rem;">
                        ${patient.diagnosis}
                    </div>
                </div>
                <div style="color: rgba(79, 172, 254, 1); font-size: 1.5rem;">→</div>
            </div>
        </div>
    `).join('');
}

function filterPatients() {
    const searchTerm = document.getElementById('patient-search').value.toLowerCase();
    const filteredPatients = patients.filter(patient => 
        patient.name.toLowerCase().includes(searchTerm) ||
        patient.diagnosis.toLowerCase().includes(searchTerm)
    );
    
    const container = document.getElementById('patient-list');
    if (container) {
        container.innerHTML = filteredPatients.map(patient => `
            <div class="stat-card" style="text-align: left; margin-bottom: 1rem; cursor: pointer;" onclick="viewPatient(${patient.id})">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <strong style="color: white; font-size: 1.1rem;">${patient.name}</strong>
                        <div style="color: rgba(255, 255, 255, 0.7); font-size: 0.9rem; margin-top: 0.25rem;">
                            Age: ${patient.age} | Last Visit: ${patient.lastVisit}
                        </div>
                        <div style="color: rgba(255, 255, 255, 0.6); font-size: 0.85rem;">
                            ${patient.diagnosis}
                        </div>
                    </div>
                    <div style="color: rgba(79, 172, 254, 1); font-size: 1.5rem;">→</div>
                </div>
            </div>
        `).join('');
    }
}

function viewPatient(patientId) {
    const patient = patients.find(p => p.id === patientId);
    if (!patient) return;

    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.8); backdrop-filter: blur(10px);
        display: flex; align-items: center; justify-content: center;
        z-index: 10000; animation: fadeIn 0.3s ease;
    `;

    modal.innerHTML = `
        <div style="background: rgba(255, 255, 255, 0.15); backdrop-filter: blur(30px);
                    border-radius: 25px; padding: 2rem; max-width: 600px; width: 90%;
                    border: 1px solid rgba(255, 255, 255, 0.2); color: white;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
                <h2 style="margin: 0; font-size: 1.8rem;">${patient.name}</h2>
                <button class="close-modal" style="background: none; border: none; color: white; font-size: 1.5rem; cursor: pointer;">✕</button>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
                <div style="background: rgba(255, 255, 255, 0.1); padding: 1rem; border-radius: 15px;">
                    <strong>Personal Info</strong><br>
                    Age: ${patient.age}<br>
                    Phone: ${patient.phone}<br>
                    Email: ${patient.email}
                </div>
                <div style="background: rgba(255, 255, 255, 0.1); padding: 1rem; border-radius: 15px;">
                    <strong>Vitals</strong><br>
                    BP: ${patient.vitals.bp}<br>
                    HR: ${patient.vitals.hr} bpm<br>
                    Temp: ${patient.vitals.temp}<br>
                    Weight: ${patient.vitals.weight}
                </div>
            </div>
            
            <div style="background: rgba(255, 255, 255, 0.1); padding: 1.5rem; border-radius: 15px; margin-bottom: 1rem;">
                <strong>Current Diagnosis:</strong><br>
                <div style="margin: 0.5rem 0; font-size: 1.1rem;">${patient.diagnosis}</div>
            </div>
            
            <div style="background: rgba(255, 255, 255, 0.1); padding: 1.5rem; border-radius: 15px; margin-bottom: 1rem;">
                <strong>Prescription:</strong><br>
                <div style="margin: 0.5rem 0; font-size: 1.1rem;">${patient.prescription}</div>
            </div>
            
            <div style="background: rgba(255, 255, 255, 0.1); padding: 1.5rem; border-radius: 15px; margin-bottom: 2rem;">
                <strong>Clinical Notes:</strong><br>
                <div style="margin: 0.5rem 0; line-height: 1.5;">${patient.notes}</div>
            </div>
            
            <div style="text-align: center;">
                <button class="btn btn-primary" onclick="updatePrescription(${patient.id})" style="margin-right: 0.5rem;">
                    Update Prescription
                </button>
                <button class="btn btn-secondary" onclick="addNote(${patient.id})">
                    Add Note
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    
    // Close modal on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

function addNewPatient() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.8); backdrop-filter: blur(10px);
        display: flex; align-items: center; justify-content: center;
        z-index: 10000; animation: fadeIn 0.3s ease;
    `;

    modal.innerHTML = `
        <div style="background: rgba(255, 255, 255, 0.15); backdrop-filter: blur(30px);
                    border-radius: 25px; padding: 2rem; max-width: 500px; width: 90%;
                    border: 1px solid rgba(255, 255, 255, 0.2); color: white;">
            <h2 style="margin-bottom: 2rem;">Add New Patient</h2>
            <form id="new-patient-form">
                <input type="text" id="new-name" placeholder="Full Name" required style="margin-bottom: 1rem;">
                <input type="number" id="new-age" placeholder="Age" required style="margin-bottom: 1rem;">
                <input type="tel" id="new-phone" placeholder="Phone Number" required style="margin-bottom: 1rem;">
                <input type="email" id="new-email" placeholder="Email Address" required style="margin-bottom: 1rem;">
                <input type="text" id="new-diagnosis" placeholder="Initial Diagnosis" style="margin-bottom: 1rem;">
                <textarea id="new-notes" placeholder="Initial Notes" rows="3" style="margin-bottom: 2rem;"></textarea>
                <div style="text-align: center;">
                    <button type="submit" class="btn btn-primary" style="margin-right: 0.5rem;">Add Patient</button>
                    <button type="button" class="btn btn-secondary close-modal">Cancel</button>
                </div>
            </form>
        </div>
    `;

    document.body.appendChild(modal);

    const form = modal.querySelector('#new-patient-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const newPatient = {
            id: patients.length + 1,
            name: document.getElementById('new-name').value,
            age: parseInt(document.getElementById('new-age').value),
            phone: document.getElementById('new-phone').value,
            email: document.getElementById('new-email').value,
            lastVisit: new Date().toISOString().split('T')[0],
            diagnosis: document.getElementById('new-diagnosis').value || 'Initial consultation',
            prescription: 'To be determined',
            notes: document.getElementById('new-notes').value || 'New patient added to system.',
            vitals: { bp: '—', hr: '—', temp: '—', weight: '—' }
        };

        patients.push(newPatient);
        renderPatientList();
        modal.remove();
        
        // Show success message
        showSuccessMessage('Patient added successfully!');
    });
}

// Appointment management functions
function renderAppointmentList() {
    const container = document.getElementById('appointment-list');
    if (!container) return;

    container.innerHTML = appointments.map(appointment => `
        <div class="stat-card" style="text-align: left; margin-bottom: 1rem;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <div><strong style="color: white; font-size: 1.1rem;">${appointment.patientName}</strong>
                    <div style="color: rgba(255, 255, 255, 0.7); font-size: 0.9rem; margin-top: 0.25rem;">
                        ${appointment.date}
                    </div>
                    <div style="color: rgba(255, 255, 255, 0.6); font-size: 0.85rem;">
                        ${appointment.type} | ${appointment.phone}
                    </div>
                    ${appointment.symptoms ? `<div style="color: rgba(255, 255, 255, 0.6); font-size: 0.85rem; margin-top: 0.25rem;">
                        Symptoms: ${appointment.symptoms}
                    </div>` : ''}
                </div>
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <span class="status-badge ${appointment.status}" style="padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.8rem;">
                        ${appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                    </span>
                    <button onclick="updateAppointmentStatus(${appointment.id})" style="background: rgba(79, 172, 254, 0.2); border: 1px solid rgba(79, 172, 254, 0.5); color: white; padding: 0.25rem 0.5rem; border-radius: 8px; cursor: pointer;">
                        Update
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function showAppointmentForm() {
    const form = document.getElementById('appointment-form');
    if (form) {
        form.style.display = 'block';
        form.style.animation = 'slideIn 0.3s ease';
    }
}

function hideAppointmentForm() {
    const form = document.getElementById('appointment-form');
    if (form) {
        form.style.display = 'none';
    }
}

function bookAppointment() {
    const name = document.getElementById('patient-name').value;
    const phone = document.getElementById('patient-phone').value;
    const date = document.getElementById('appointment-date').value;
    const symptoms = document.getElementById('patient-symptoms').value;
    const type = document.getElementById('appointment-type').value;

    if (!name || !phone || !date || !type) {
        showError('Please fill in all required fields');
        return;
    }

    const newAppointment = {
        id: appointments.length + 1,
        patientName: name,
        date: date,
        symptoms: symptoms,
        type: type,
        phone: phone,
        status: 'pending'
    };

    appointments.push(newAppointment);
    renderAppointmentList();
    hideAppointmentForm();
    
    // Clear form
    document.getElementById('patient-name').value = '';
    document.getElementById('patient-phone').value = '';
    document.getElementById('appointment-date').value = '';
    document.getElementById('patient-symptoms').value = '';
    document.getElementById('appointment-type').value = '';
    
    showSuccessMessage('Appointment booked successfully!');
}

function updateAppointmentStatus(appointmentId) {
    const appointment = appointments.find(a => a.id === appointmentId);
    if (!appointment) return;

    const statuses = ['pending', 'confirmed', 'completed', 'cancelled'];
    const currentIndex = statuses.indexOf(appointment.status);
    const nextIndex = (currentIndex + 1) % statuses.length;
    
    appointment.status = statuses[nextIndex];
    renderAppointmentList();
    
    showSuccessMessage(`Appointment status updated to ${appointment.status}`);
}

// Voice recognition functionality
function initializeSpeechRecognition() {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        document.getElementById('voice-status').textContent = 'Voice recognition not supported in this browser';
        document.getElementById('voice-btn').disabled = true;
        return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    const voiceBtn = document.getElementById('voice-btn');
    const voiceStatus = document.getElementById('voice-status');
    const voiceTranscript = document.getElementById('voice-transcript');

    voiceBtn.addEventListener('click', () => {
        if (voiceBtn.textContent.includes('Start')) {
            recognition.start();
            voiceBtn.textContent = '🎤 Listening...';
            voiceBtn.style.background = 'linear-gradient(135deg, #ff6b6b, #ff8e8e)';
            voiceStatus.textContent = 'Listening... Speak now!';
            voiceTranscript.style.display = 'block';
        } else {
            recognition.stop();
            voiceBtn.textContent = '🎤 Start Voice Booking';
            voiceBtn.style.background = 'linear-gradient(135deg, #4facfe, #00f2fe)';
            voiceStatus.textContent = '';
        }
    });

    recognition.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
        }
        
        voiceTranscript.textContent = transcript;
        
        if (event.results[event.results.length - 1].isFinal) {
            processVoiceCommand(transcript);
        }
    };

    recognition.onend = () => {
        voiceBtn.textContent = '🎤 Start Voice Booking';
        voiceBtn.style.background = 'linear-gradient(135deg, #4facfe, #00f2fe)';
        voiceStatus.textContent = 'Processing...';
    };

    recognition.onerror = (event) => {
        voiceStatus.textContent = `Error: ${event.error}`;
        voiceBtn.textContent = '🎤 Start Voice Booking';
        voiceBtn.style.background = 'linear-gradient(135deg, #4facfe, #00f2fe)';
    };
}

function processVoiceCommand(transcript) {
    const lowerTranscript = transcript.toLowerCase();
    
    // Extract appointment details using regex and natural language processing
    const nameMatch = lowerTranscript.match(/(?:book|schedule|appointment for|patient)\s+([a-zA-Z\s]+?)(?:\s+(?:on|at|for|tomorrow|today|next))/i);
    const dateMatch = lowerTranscript.match(/(?:on|for)\s+(today|tomorrow|next\s+\w+|\d{1,2}\/\d{1,2}|\w+\s+\d{1,2})/i);
    const timeMatch = lowerTranscript.match(/(?:at|for)\s+(\d{1,2}(?::\d{2})?\s*(?:am|pm|AM|PM)?)/i);
    const typeMatch = lowerTranscript.match(/(?:for|appointment)\s+(checkup|follow-up|consultation|emergency)/i);
    
    let extractedInfo = {
        name: nameMatch ? nameMatch[1].trim() : null,
        date: null,
        time: timeMatch ? normalizeTime(timeMatch[1]) : null,
        type: typeMatch ? capitalizeFirst(typeMatch[1]) : 'Regular Checkup'
    };
    
    // Process date
    if (dateMatch) {
        const dateStr = dateMatch[1].toLowerCase();
        if (dateStr === 'today') {
            extractedInfo.date = new Date().toISOString().split('T')[0];
        } else if (dateStr === 'tomorrow') {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            extractedInfo.date = tomorrow.toISOString().split('T')[0];
        } else {
            // Try to parse other date formats
            extractedInfo.date = parseNaturalDate(dateStr);
        }
    }
    
    // Show confirmation dialog
    showVoiceBookingConfirmation(extractedInfo, transcript);
}

function normalizeTime(timeStr) {
    // Convert spoken time to 24-hour format
    let time = timeStr.replace(/\s/g, '').toLowerCase();
    
    if (!time.includes(':')) {
        if (time.includes('am') || time.includes('pm')) {
            const hour = time.match(/\d+/)[0];
            const period = time.includes('pm') ? 'PM' : 'AM';
            time = `${hour}:00 ${period}`;
        } else {
            time = `${time}:00`;
        }
    }
    
    // Convert to 24-hour format for HTML input
    const [timeOnly, period] = time.split(/\s*(am|pm)/i);
    let [hours, minutes] = timeOnly.split(':').map(num => parseInt(num));
    
    if (period && period.toLowerCase() === 'pm' && hours !== 12) {
        hours += 12;
    } else if (period && period.toLowerCase() === 'am' && hours === 12) {
        hours = 0;
    }
    
    return `${hours.toString().padStart(2, '0')}:${(minutes || 0).toString().padStart(2, '0')}`;
}

function parseNaturalDate(dateStr) {
    // Simple date parsing - can be enhanced further
    const today = new Date();
    
    if (dateStr.includes('next week')) {
        const nextWeek = new Date(today);
        nextWeek.setDate(today.getDate() + 7);
        return nextWeek.toISOString().split('T')[0];
    }
    
    // Default to today if can't parse
    return today.toISOString().split('T')[0];
}

function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function showVoiceBookingConfirmation(info, originalTranscript) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.8); backdrop-filter: blur(10px);
        display: flex; align-items: center; justify-content: center;
        z-index: 10000; animation: fadeIn 0.3s ease;
    `;

    modal.innerHTML = `
        <div style="background: rgba(255, 255, 255, 0.15); backdrop-filter: blur(30px);
                    border-radius: 25px; padding: 2rem; max-width: 500px; width: 90%;
                    border: 1px solid rgba(255, 255, 255, 0.2); color: white;">
            <h2 style="margin-bottom: 1rem; text-align: center;">🎤 Voice Booking Confirmation</h2>
            
            <div style="background: rgba(255, 255, 255, 0.1); padding: 1rem; border-radius: 15px; margin-bottom: 1.5rem;">
                <strong>You said:</strong><br>
                <em style="color: rgba(255, 255, 255, 0.8);">"${originalTranscript}"</em>
            </div>
            
            <div style="background: rgba(255, 255, 255, 0.1); padding: 1.5rem; border-radius: 15px; margin-bottom: 2rem;">
                <h4 style="margin-bottom: 1rem;">Extracted Information:</h4>
                <div style="display: grid; gap: 0.5rem;">
                    <div><strong>Patient Name:</strong> ${info.name || 'Not specified'}</div>
                    <div><strong>Date:</strong> ${info.date || 'Not specified'}</div>
                    <div><strong>Time:</strong> ${info.time || 'Not specified'}</div>
                    <div><strong>Type:</strong> ${info.type}</div>
                </div>
            </div>
            
            <form id="voice-booking-form">
                <input type="text" id="voice-name" placeholder="Patient Name" value="${info.name || ''}" required style="margin-bottom: 0.5rem;">
                <input type="tel" id="voice-phone" placeholder="Phone Number" required style="margin-bottom: 0.5rem;">
                <input type="date" id="voice-date" value="${info.date || ''}" required style="margin-bottom: 0.5rem;">
                <input type="time" id="voice-time" value="${info.time || ''}" required style="margin-bottom: 0.5rem;">
                <select id="voice-type" style="margin-bottom: 1.5rem;">
                    <option value="Regular Checkup" ${info.type === 'Regular Checkup' ? 'selected' : ''}>Regular Checkup</option>
                    <option value="Follow-up" ${info.type === 'Follow-up' ? 'selected' : ''}>Follow-up</option>
                    <option value="Consultation" ${info.type === 'Consultation' ? 'selected' : ''}>Consultation</option>
                    <option value="Emergency" ${info.type === 'Emergency' ? 'selected' : ''}>Emergency</option>
                </select>
                
                <div style="text-align: center;">
                    <button type="submit" class="btn btn-primary" style="margin-right: 0.5rem;">
                        ✅ Confirm Booking
                    </button>
                    <button type="button" class="btn btn-secondary close-modal">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    `;

    document.body.appendChild(modal);

    const form = modal.querySelector('#voice-booking-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const newAppointment = {
            id: appointments.length + 1,
            patientName: document.getElementById('voice-name').value,
            phone: document.getElementById('voice-phone').value,
            date: document.getElementById('voice-date').value,
            time: document.getElementById('voice-time').value,
            type: document.getElementById('voice-type').value,
            status: 'confirmed'
        };

        appointments.push(newAppointment);
        renderAppointmentList();
        modal.remove();
        
        document.getElementById('voice-status').textContent = 'Appointment booked successfully via voice!';
        document.getElementById('voice-transcript').style.display = 'none';
        
        showSuccessMessage('Voice booking completed successfully! 🎉');
    });
}

// Utility functions
function updatePrescription(patientId) {
    const patient = patients.find(p => p.id === patientId);
    if (!patient) return;

    const newPrescription = prompt('Enter new prescription:', patient.prescription);
    if (newPrescription && newPrescription !== patient.prescription) {
        patient.prescription = newPrescription;
        showSuccessMessage('Prescription updated successfully!');
        // Refresh patient view if modal is open
        const modal = document.querySelector('[style*="position: fixed"]');
        if (modal) {
            modal.remove();
            viewPatient(patientId);
        }
    }
}

function addNote(patientId) {
    const patient = patients.find(p => p.id === patientId);
    if (!patient) return;

    const newNote = prompt('Add clinical note:');
    if (newNote) {
        const timestamp = new Date().toLocaleString();
        patient.notes += `\n\n[${timestamp}] ${newNote}`;
        showSuccessMessage('Note added successfully!');
        // Refresh patient view if modal is open
        const modal = document.querySelector('[style*="position: fixed"]');
        if (modal) {
            modal.remove();
            viewPatient(patientId);
        }
    }
}

function showSuccessMessage(message) {
    const successDiv = document.createElement('div');
    successDiv.style.cssText = `
        position: fixed; top: 20px; right: 20px; z-index: 10001;
        background: linear-gradient(135deg, #4facfe, #00f2fe);
        color: white; padding: 1rem 2rem; border-radius: 15px;
        box-shadow: 0 10px 30px rgba(79, 172, 254, 0.3);
        animation: slideInRight 0.5s ease, fadeOut 0.5s ease 2.5s forwards;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
    `;
    successDiv.textContent = message;
    
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        if (successDiv.parentNode) {
            successDiv.remove();
        }
    }, 3000);
}

function logout() {
    currentUser = null;
    currentView = 'home';
    
    // Remove dynamic sections
    const dynamicSections = ['doctor-dashboard', 'frontdesk-dashboard', 'frontdesk-login'];
    dynamicSections.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.remove();
        }
    });
    
    // Clear forms
    const forms = document.querySelectorAll('form');
    forms.forEach(form => form.reset());
    
    // Clear error messages
    document.querySelectorAll('.error-message').forEach(el => el.remove());
    
    goHome();
    showSuccessMessage('Logged out successfully!');
}

// Add CSS keyframes for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes slideIn {
        from { transform: translateY(20px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
    
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    .status-badge.pending {
        background: rgba(255, 193, 7, 0.2);
        color: #ffc107;
        border: 1px solid rgba(255, 193, 7, 0.3);
    }
    
    .status-badge.confirmed {
        background: rgba(40, 167, 69, 0.2);
        color: #28a745;
        border: 1px solid rgba(40, 167, 69, 0.3);
    }
    
    .status-badge.completed {
        background: rgba(79, 172, 254, 0.2);
        color: #4facfe;
        border: 1px solid rgba(79, 172, 254, 0.3);
    }
    
    .status-badge.cancelled {
        background: rgba(220, 53, 69, 0.2);
        color: #dc3545;
        border: 1px solid rgba(220, 53, 69, 0.3);
    }
    
    .error-message {
        background: rgba(220, 53, 69, 0.2);
        color: #dc3545;
        padding: 0.75rem;
        border-radius: 10px;
        margin-top: 1rem;
        border: 1px solid rgba(220, 53, 69, 0.3);
        animation: slideIn 0.3s ease;
    }
`;
document.head.appendChild(style);

// Initialize the application when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

document.addEventListener('click', function(e) {
  if (e.target.classList.contains('close-modal')) {
    const modal = e.target.closest('.modal-overlay');
    if (modal) modal.remove();
  }
});

function showFrontdeskLogin() {
    hideAllSections();
    document.getElementById('frontdesk-login').style.display = 'block';
    currentView = 'frontdesk-login';
}

function showDoctorLogin() {
    hideAllSections();
    document.getElementById('doctor-login').style.display = 'block';
    currentView = 'doctor-login';
}

function showHome() {
    document.body.classList.remove('hide-main-content');
    hideAllSections();
    showSection('hero');
    showSection('features');
    showSection('access-section');
    showSection('testimonials');
    showSection('footer');
    currentView = 'home';
    currentUser = null;
    
    // Reset hero section
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    if (hero && heroContent) {
        hero.style.display = 'flex';
        hero.style.alignItems = 'center';
        hero.style.justifyContent = 'center';
        heroContent.style.textAlign = 'center';
        heroContent.style.margin = '0 auto';
        heroContent.style.width = '100%';
        
        // Force a reflow to ensure styles are applied
        void hero.offsetWidth;
    }
}