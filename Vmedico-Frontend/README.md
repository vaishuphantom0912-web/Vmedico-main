## 📂 Project Structure

\`\`\`
front-end/
└── vmedico/                     # 🎯 MAIN VUE.JS APPLICATION
    ├── index.html
    ├── package.json
    ├── vite.config.js
    ├── public/
    │   ├── logo.svg
    │   └── vite.svg
    └── src/
        ├── App.vue
        ├── main.js
        ├── style.css
        ├── assets/
        │   └── vue.svg
        ├── components/
        │   ├── Dashboard/          # 🏥 Hospital Dashboard Components
        │   │   ├── OverviewTab.vue
        │   │   ├── PatientsTab.vue
        │   │   ├── StaffTab.vue
        │   │   ├── ReportsTab.vue
        │   │   └── ProfileTab.vue
        │   ├── Layout/             # 🎨 Layout Components
        │   │   └── Layout.vue
        │   ├── Patient/            # 👤 Patient Portal Components
        │   │   ├── PatientPortal.vue
        │   │   ├── AppointmentCard.vue
        │   │   ├── HealthSummary.vue
        │   │   ├── LabReports.vue
        │   │   ├── MedicationReminders.vue
        │   │   └── base/
        │   │       ├── Button.vue
        │   │       └── Card.vue
        │   └── UI/                 # 🎨 Reusable UI Components
        │       ├── FeatureCard.vue
        │       ├── StatCard.vue
        │       ├── AudienceCard.vue
        │       └── StepCard.vue
        ├── pages/                  # 📄 Application Pages
        │   ├── Home/
        │   │   └── Home.vue
        │   ├── About/
        │   │   └── About.vue
        │   ├── Login/
        │   │   └── Login.vue
        │   ├── Register/
        │   │   └── Register.vue
        │   ├── Dashboard/
        │   │   └── HospitalLanding.vue
        │   └── Patient/
        │       └── PatientDashboard.vue
        └── router/
            └── index.js
\`\`\`
