// Demo credentials
const DEMO_USERNAME = 'frontdesk1';
const DEMO_PASSWORD = 'password';

const loginSection = document.getElementById('frontdesk-login');
const dashboardSection = document.getElementById('frontdesk-dashboard');
const loginForm = document.getElementById('frontdesk-login-form');
const logoutBtn = document.getElementById('fd-logout');

// Appointment management logic
const appointmentList = document.getElementById('appointment-list');
const manualBookingBtn = document.getElementById('manual-booking');
const bookingForm = document.getElementById('appointment-form');
const bookBtn = document.getElementById('book-appointment');
const cancelBtn = document.getElementById('cancel-booking');

let appointments = [
    {
        id: 1,
        patientName: 'Alice Brown',
        phone: '(555) 111-2222',
        date: '2024-06-16',
        symptoms: 'Fever, cough',
        type: 'Regular Checkup',
        status: 'confirmed'
    },
    {
        id: 2,
        patientName: 'David Lee',
        phone: '(555) 333-4444',
        date: '2024-06-16',
        symptoms: 'Headache',
        type: 'Follow-up',
        status: 'pending'
    },
    {
        id: 3,
        patientName: 'Maria Garcia',
        phone: '(555) 555-6868',
        date: '2024-06-17',
        symptoms: 'Back pain',
        type: 'Consultation',
        status: 'confirmed'
    }
];

function renderAppointmentList() {
    if (!appointmentList) return;
    appointmentList.innerHTML = appointments.map(appointment => `
        <div class="appt-card" style="background:rgba(255,255,255,0.12);border-radius:16px;padding:1.2rem 1.5rem;display:flex;align-items:center;justify-content:space-between;box-shadow:0 2px 8px rgba(0,0,0,0.04);margin-bottom:1rem;">
            <div class="appt-info">
                <div class="appt-name" style="font-size:1.1rem;font-weight:700;color:#fff;">${appointment.patientName}</div>
                <div class="appt-meta" style="color:#e0f7fa;font-size:0.98rem;margin-top:0.2rem;">${appointment.date}<br>${appointment.type} | ${appointment.phone}<br><span style='color:#b2ebf2;'>Symptoms: ${appointment.symptoms || ''}</span></div>
            </div>
            <div class="appt-status ${appointment.status}" style="border-radius:12px;padding:0.3rem 1.1rem;font-size:0.95rem;font-weight:600;margin:0 1rem;text-align:center;${getStatusStyle(appointment.status)}">
                ${capitalize(appointment.status)}
            </div>
            <button class="btn btn-update" style="background:#e0f7fa;color:#0077B6;border:none;border-radius:12px;padding:0.5rem 1.2rem;font-weight:600;font-size:0.98rem;transition:background 0.2s;" onclick="updateAppointmentStatus(${appointment.id})">Update</button>
        </div>
    `).join('');
}

function getStatusStyle(status) {
    if (status === 'confirmed') return 'background:rgba(56,163,165,0.15);color:#80ED99;border:1px solid #80ED99;';
    if (status === 'pending') return 'background:rgba(255,193,7,0.15);color:#ffc107;border:1px solid #ffc107;';
    if (status === 'completed') return 'background:rgba(79,172,254,0.2);color:#4facfe;border:1px solid #4facfe;';
    if (status === 'cancelled') return 'background:rgba(220,53,69,0.2);color:#dc3545;border:1px solid #dc3545;';
    return '';
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

window.updateAppointmentStatus = function(id) {
    const appointment = appointments.find(a => a.id === id);
    if (!appointment) return;
    const statuses = ['pending', 'confirmed', 'completed', 'cancelled'];
    const currentIndex = statuses.indexOf(appointment.status);
    const nextIndex = (currentIndex + 1) % statuses.length;
    appointment.status = statuses[nextIndex];
    renderAppointmentList();
};

function showDashboard() {
    loginSection.style.display = 'none';
    dashboardSection.style.display = 'block';
    renderAppointmentList();
}

function showLogin() {
    loginSection.style.display = 'flex';
    dashboardSection.style.display = 'none';
    loginForm.reset();
}

if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('frontdesk-username').value;
        const password = document.getElementById('frontdesk-password').value;
        if (username === DEMO_USERNAME && password === DEMO_PASSWORD) {
            showDashboard();
        } else {
            // Show error message
            let error = loginForm.querySelector('.error-message');
            if (!error) {
                error = document.createElement('div');
                error.className = 'error-message';
                loginForm.appendChild(error);
            }
            error.textContent = 'Invalid credentials. Try: frontdesk1 / password';
        }
    });
}

if (logoutBtn) {
    logoutBtn.addEventListener('click', function() {
        showLogin();
    });
}

if (manualBookingBtn && bookingForm) {
    manualBookingBtn.addEventListener('click', () => {
        bookingForm.style.display = 'block';
    });
}
if (cancelBtn && bookingForm) {
    cancelBtn.addEventListener('click', () => {
        bookingForm.style.display = 'none';
    });
}
if (bookBtn && bookingForm) {
    bookBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const name = document.getElementById('patient-name').value;
        const phone = document.getElementById('patient-phone').value;
        const date = document.getElementById('appointment-date').value;
        const symptoms = document.getElementById('appointment-symptoms').value;
        const type = document.getElementById('appointment-type').value;
        if (!name || !phone || !date || !type) return;
        appointments.push({
            id: appointments.length + 1,
            patientName: name,
            phone,
            date,
            symptoms,
            type,
            status: 'pending'
        });
        bookingForm.style.display = 'none';
        document.getElementById('patient-name').value = '';
        document.getElementById('patient-phone').value = '';
        document.getElementById('appointment-date').value = '';
        document.getElementById('appointment-symptoms').value = '';
        document.getElementById('appointment-type').value = '';
        renderAppointmentList();
    });
}

// On page load, show login and hide dashboard
showLogin();

// Modal for Create New Account
function showCreateAccountModal() {
    // Remove any existing modal
    const oldModal = document.getElementById('create-account-modal');
    if (oldModal) oldModal.remove();
    // Modal HTML
    const modal = document.createElement('div');
    modal.id = 'create-account-modal';
    modal.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
        background: rgba(0,0,0,0.7); backdrop-filter: blur(10px);
        display: flex; align-items: center; justify-content: center;
        z-index: 10000; animation: fadeIn 0.3s ease;`;
    modal.innerHTML = `
        <div style="background: rgba(255,255,255,0.15); backdrop-filter: blur(30px); border-radius: 25px; padding: 2rem; max-width: 400px; width: 90%; border: 1px solid rgba(255,255,255,0.2); color: white; position: relative;">
            <h3 style="color: white; margin-bottom: 1.5rem; text-align:center;">Create New Account</h3>
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
                    <button type="button" class="btn btn-secondary" id="close-create-modal">Cancel</button>
                </div>
            </form>
        </div>
    `;
    document.body.appendChild(modal);
    // Close modal
    document.getElementById('close-create-modal').onclick = () => modal.remove();
    // Form submit
    document.getElementById('create-account-form').onsubmit = function(e) {
        e.preventDefault();
        const name = document.getElementById('new-name').value;
        const username = document.getElementById('new-username').value;
        const password = document.getElementById('new-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        modal.remove();
        alert('Account created successfully! Please login with your new credentials.');
    };
}

document.addEventListener('DOMContentLoaded', function() {
    // Attach event listener to the Create New Account link (last .forgot-link in the form)
    const links = document.querySelectorAll('#frontdesk-login-form .forgot-link');
    if (links.length > 1) {
        const createLink = links[links.length - 1];
        if (!createLink.hasAttribute('data-modal')) {
            createLink.setAttribute('data-modal', 'true');
            createLink.addEventListener('click', function(e) {
                e.preventDefault();
                showCreateAccountModal();
            });
        }
    }
});
