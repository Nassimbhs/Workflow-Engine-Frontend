import { RouteInfo } from "./sidebar.metadata";
export const ROUTES: RouteInfo[] = [
  {
    path: "",
    title: "MENUITEMS.MAIN.TEXT",
    moduleName: "",
    iconType: "",
    icon: "",
    class: "",
    groupTitle: true,
    badge: "",
    badgeClass: "",
    role: ["ROLE_USER","ROLE_ADMIN"],
    submenu: [],
  },

  // Admin Modules
  {
    path: "",
    title: "MENUITEMS.HOME.TEXT",
    moduleName: "dashboard",
    iconType: "material-icons-two-tone",
    icon: "home",
    class: "menu-toggle",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["ROLE_ADMIN"],
    submenu: [
      {
        path: "/admin/dashboard/main",
        title: "MENUITEMS.HOME.LIST.DASHBOARD1",
        moduleName: "dashboard",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      },
      {
        path: "/admin/dashboard/dashboard2",
        title: "MENUITEMS.HOME.LIST.DASHBOARD2",
        moduleName: "dashboard",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      },
      {
        path: "/admin/dashboard/doctor-dashboard",
        title: "MENUITEMS.HOME.LIST.DOCTOR-DASHBOARD",
        moduleName: "doctor-dashboard",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      },
      {
        path: "/admin/dashboard/patient-dashboard",
        title: "MENUITEMS.HOME.LIST.PATIENT-DASHBOARD",
        moduleName: "patient-dashboard",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      },
    ],
  },
  {
    path: "",
    title: "Workflows",
    moduleName: "workflow",
    iconType: "material-icons-two-tone",
    icon: "assignment",
    class: "menu-toggle",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["ROLE_ADMIN"],
    submenu: [
      {
        path: "/admin/workflow/viewWorkflow",
        title: "Voir les workflows",
        moduleName: "workflow",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: ["ROLE_ADMIN"],
        submenu: [],
      },
      {
        path: "/admin/workflow/addWorkflow",
        title: "Ajouter un workflow",
        moduleName: "workflow",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: ["ROLE_ADMIN"],
        submenu: [],
      },
    ],
  },
  {
    path: "",
    title: "MENUITEMS.DOCTORS.TEXT",
    moduleName: "doctors",
    iconType: "material-icons-two-tone",
    icon: "supervised_user_circle",
    class: "menu-toggle",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["ROLE_ADMIN"],
    submenu: [
      {
        path: "/admin/doctors/allDoctors",
        title: "MENUITEMS.DOCTORS.LIST.ALL-DOCTOR",
        moduleName: "doctors",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: ["ROLE_ADMIN"],
        submenu: [],
      },
      {
        path: "/admin/doctors/add-doctor",
        title: "MENUITEMS.DOCTORS.LIST.ADD-DOCTOR",
        moduleName: "doctors",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: ["ROLE_ADMIN"],
        submenu: [],
      },
      {
        path: "/admin/doctors/edit-doctor",
        title: "MENUITEMS.DOCTORS.LIST.EDIT-DOCTOR",
        moduleName: "doctors",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: ["ROLE_ADMIN"],
        submenu: [],
      },
      {
        path: "/admin/doctors/doctor-profile",
        title: "MENUITEMS.DOCTORS.LIST.PROFILE",
        moduleName: "doctors",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: ["ROLE_ADMIN"],
        submenu: [],
      },
    ],
  },
  {
    path: "",
    title: "Groupes",
    moduleName: "group",
    iconType: "material-icons-two-tone",
    icon: "people_alt",
    class: "menu-toggle",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["ROLE_ADMIN"],
    submenu: [
      {
        path: "/admin/group/all-group",
        title: "Voir les groupes",
        moduleName: "group",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: ["ROLE_ADMIN"],
        submenu: [],
      },
      {
        path: "/admin/group/add-group",
        title: "ajouter un groupe",
        moduleName: "group",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: ["ROLE_ADMIN"],
        submenu: [],
      },
      {
        path: "/admin/group/edit-group",
        title: "Modifier un groupe",
        moduleName: "group",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: ["ROLE_ADMIN"],
        submenu: [],
      },
      {
        path: "/admin/group/group-profile",
        title: "Afficher les détail d'un groupe",
        moduleName: "group",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: ["ROLE_ADMIN"],
        submenu: [],
      },
    ],
  },
  {
    path: "",
    title: "MENUITEMS.PATIENTS.TEXT",
    moduleName: "patients",
    iconType: "material-icons-two-tone",
    icon: "face",
    class: "menu-toggle",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["ROLE_ADMIN"],
    submenu: [
      {
        path: "/admin/patients/all-patients",
        title: "MENUITEMS.PATIENTS.LIST.ALL-PATIENT",
        moduleName: "patients",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: ["ROLE_ADMIN"],
        submenu: [],
      },
      {
        path: "/admin/patients/add-patient",
        title: "MENUITEMS.PATIENTS.LIST.ADD-PATIENT",
        moduleName: "patients",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: ["ROLE_ADMIN"],
        submenu: [],
      },
      {
        path: "/admin/patients/edit-patient",
        title: "MENUITEMS.PATIENTS.LIST.EDIT-PATIENT",
        moduleName: "patients",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: ["ROLE_ADMIN"],
        submenu: [],
      },
      {
        path: "/admin/patients/patient-profile",
        title: "MENUITEMS.PATIENTS.LIST.PROFILE",
        moduleName: "patients",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: ["ROLE_ADMIN"],
        submenu: [],
      },
    ],
  },
  {
    path: "",
    title: "MENUITEMS.ROOMS.TEXT",
    moduleName: "room",
    iconType: "material-icons-two-tone",
    icon: "hotel",
    class: "menu-toggle",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["ROLE_ADMIN"],
    submenu: [
      {
        path: "/admin/room/all-rooms",
        title: "MENUITEMS.ROOMS.LIST.ALLOTED-ROOMS",
        moduleName: "room",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: ["ROLE_ADMIN"],
        submenu: [],
      },
      {
        path: "/admin/room/add-allotment",
        title: "MENUITEMS.ROOMS.LIST.NEW-ALLOTMENT",
        moduleName: "room",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: ["ROLE_ADMIN"],
        submenu: [],
      },
      {
        path: "/admin/room/edit-allotment",
        title: "MENUITEMS.ROOMS.LIST.EDIT-ALLOTMENT",
        moduleName: "room",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      },
    ],
  },
  {
    path: "",
    title: "MENUITEMS.PAYMENTS.TEXT",
    moduleName: "payment",
    iconType: "material-icons-two-tone",
    icon: "monetization_on",
    class: "menu-toggle",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["Admin"],
    submenu: [
      {
        path: "/admin/payment/all-payment",
        title: "MENUITEMS.PAYMENTS.LIST.ALL-PAYMENTS",
        moduleName: "payment",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      },
      {
        path: "/admin/payment/add-payment",
        title: "MENUITEMS.PAYMENTS.LIST.ADD-PAYMENT",
        moduleName: "payment",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      },
      {
        path: "/admin/payment/invoice",
        title: "MENUITEMS.PAYMENTS.LIST.INVOICE",
        moduleName: "payment",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      },
    ],
  },

  // Doctor Modules
  {
    path: "/doctor/dashboard",
    title: "MENUITEMS.DOCTOR.DASHBOARD",
    moduleName: "dashboard",
    iconType: "material-icons-two-tone",
    icon: "home",
    class: "",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["ROLE_ADMIN","ROLE_USER"],
    submenu: [],
  },
  {
    path: "/doctor/appointments",
    title: "MENUITEMS.DOCTOR.APPOINTMENTS",
    moduleName: "appointments",
    iconType: "material-icons-two-tone",
    icon: "assignment",
    class: "",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["ROLE_ADMIN"],
    submenu: [],
  },
  {
    path: "/doctor/doctors",
    title: "MENUITEMS.DOCTOR.DOCTORS",
    moduleName: "doctors",
    iconType: "material-icons-two-tone",
    icon: "supervised_user_circle",
    class: "",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["Doctor"],
    submenu: [],
  },
  {
    path: "/doctor/patients",
    title: "MENUITEMS.DOCTOR.PATIENTS",
    moduleName: "patients",
    iconType: "material-icons-two-tone",
    icon: "face",
    class: "",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["Doctor"],
    submenu: [],
  },
  {
    path: "/doctor/settings",
    title: "MENUITEMS.DOCTOR.SETTINGS",
    moduleName: "settings",
    iconType: "material-icons-two-tone",
    icon: "settings",
    class: "",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["Doctor"],
    submenu: [],
  },
  {
    path: "/apps/chat",
    title: "MENUITEMS.DOCTOR.CHAT",
    moduleName: "apps",
    iconType: "material-icons-two-tone",
    icon: "chat",
    class: "",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["Doctor"],
    submenu: [],
  },
  // Patient Modules
  {
    path: "/patient/dashboard",
    title: "MENUITEMS.PATIENT.DASHBOARD",
    moduleName: "dashboard",
    iconType: "material-icons-two-tone",
    icon: "home",
    class: "",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["ROLE_ADMIN"],
    submenu: [],
  },
  {
    path: "",
    title: "MENUITEMS.PATIENT.APPOINTMENTS.TEXT",
    moduleName: "appointments",
    iconType: "material-icons-two-tone",
    icon: "assignment",
    class: "menu-toggle",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["ROLE_USER","ROLE_ADMIN"],
    submenu: [
      {
        path: "/patient/appointments/today",
        title: "MENUITEMS.PATIENT.APPOINTMENTS.LIST.TODAY",
        moduleName: "appointments",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      },
      {
        path: "/patient/appointments/upcoming",
        title: "MENUITEMS.PATIENT.APPOINTMENTS.LIST.UPCOMING",
        moduleName: "appointments",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      },
      {
        path: "/patient/appointments/past",
        title: "MENUITEMS.PATIENT.APPOINTMENTS.LIST.PAST",
        moduleName: "appointments",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      },
    ],
  },
  {
    path: "/patient/prescriptions",
    title: "MENUITEMS.PATIENT.PRESCRIPTIONS",
    moduleName: "prescriptions",
    iconType: "material-icons-two-tone",
    icon: "receipt_long",
    class: "",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["ROLE_ADMIN"],
    submenu: [],
  },
  {
    path: "/patient/records",
    title: "MENUITEMS.PATIENT.MEDICAL-RECORD",
    moduleName: "records",
    iconType: "material-icons-two-tone",
    icon: "restore_page",
    class: "",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["ROLE_ADMIN"],
    submenu: [],
  },
  {
    path: "/patient/billing",
    title: "MENUITEMS.PATIENT.BILLING",
    moduleName: "records",
    iconType: "material-icons-two-tone",
    icon: "receipt",
    class: "",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["ROLE_ADMIN"],
    submenu: [],
  },
  {
    path: "/apps/chat",
    title: "MENUITEMS.PATIENT.CHAT",
    moduleName: "apps",
    iconType: "material-icons-two-tone",
    icon: "chat",
    class: "",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["ROLE_ADMIN"],
    submenu: [],
  },
  {
    path: "/patient/settings",
    title: "MENUITEMS.PATIENT.SETTINGS",
    moduleName: "settings",
    iconType: "material-icons-two-tone",
    icon: "settings",
    class: "",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["ROLE_ADMIN"],
    submenu: [],
  },

  // Common Modules

  {
    path: "",
    title: "-- Apps",
    moduleName: "",
    iconType: "",
    icon: "",
    class: "",
    groupTitle: true,
    badge: "",
    badgeClass: "",
    role: ["ROLE_ADMIN"],
    submenu: [],
  },
  {
    path: "calendar",
    title: "Calendar",
    moduleName: "calendar",
    iconType: "material-icons-two-tone",
    icon: "event_note",
    class: "",
    groupTitle: false,
    badge: "New",
    badgeClass: "badge bg-blue sidebar-badge float-end",
    role: ["ROLE_ADMIN"],
    submenu: [],
  },
  {
    path: "task",
    title: "Task",
    moduleName: "task",
    iconType: "material-icons-two-tone",
    icon: "fact_check",
    class: "",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["ROLE_ADMIN"],
    submenu: [],
  },
  {
    path: "contacts",
    title: "Contacts",
    moduleName: "contacts",
    iconType: "material-icons-two-tone",
    icon: "contacts",
    class: "",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["ROLE_ADMIN"],
    submenu: [],
  },
  {
    path: "",
    title: "Email",
    moduleName: "email",
    iconType: "material-icons-two-tone",
    icon: "email",
    class: "menu-toggle",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["ROLE_ADMIN"],
    submenu: [
      {
        path: "/email/inbox",
        title: "Inbox",
        moduleName: "email",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      },
      {
        path: "/email/compose",
        title: "Compose",
        moduleName: "email",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      },
      {
        path: "/email/read-mail",
        title: "Read Email",
        moduleName: "email",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      },
    ],
  },
  {
    path: "",
    title: "More Apps",
    moduleName: "apps",
    iconType: "material-icons-two-tone",
    icon: "stars",
    class: "menu-toggle",
    groupTitle: false,
    badge: "4",
    badgeClass: "badge bg-orange sidebar-badge float-end",
    role: ["ROLE_ADMIN"],
    submenu: [
      {
        path: "/apps/chat",
        title: "Chat",
        moduleName: "apps",
        iconType: "material-icons-two-tone",
        icon: "chat",
        class: "",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      },
      {
        path: "/apps/dragdrop",
        title: "Drag & Drop",
        moduleName: "apps",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      },
      {
        path: "/apps/contact-grid",
        title: "Contact Grid",
        moduleName: "apps",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      },
      {
        path: "/apps/support",
        title: "Support",
        moduleName: "apps",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      },
    ],
  },
  {
    path: "",
    title: "Widgets",
    moduleName: "widget",
    iconType: "material-icons-two-tone",
    icon: "widgets",
    class: "menu-toggle",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["ROLE_ADMIN"],
    submenu: [
      {
        path: "/widget/chart-widget",
        title: "Chart Widget",
        moduleName: "widget",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      },
      {
        path: "/widget/data-widget",
        title: "Data Widget",
        moduleName: "widget",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      },
    ],
  },
  {
    path: "",
    title: "-- Components",
    moduleName: "",
    iconType: "",
    icon: "",
    class: "",
    groupTitle: true,
    badge: "",
    badgeClass: "",
    role: ["ROLE_ADMIN"],
    submenu: [],
  },
  {
    path: "",
    title: "User Interface (UI)",
    moduleName: "ui",
    iconType: "material-icons-two-tone",
    icon: "dvr",
    class: "menu-toggle",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["ROLE_ADMIN"],
    submenu: [
      {
        path: "/ui/alerts",
        title: "Alerts",
        moduleName: "ui",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      },
      {
        path: "/ui/badges",
        title: "Badges",
        moduleName: "ui",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      },
      {
        path: "/ui/chips",
        title: "Chips",
        moduleName: "ui",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      },
      {
        path: "/ui/modal",
        title: "Modal",
        moduleName: "ui",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      },
      {
        path: "/ui/buttons",
        title: "Buttons",
        moduleName: "ui",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      },
      {
        path: "/ui/expansion-panel",
        title: "Expansion Panel",
        moduleName: "ui",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      },
      {
        path: "/ui/bottom-sheet",
        title: "Bottom Sheet",
        moduleName: "ui",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      },
      {
        path: "/ui/dialogs",
        title: "Dialogs",
        moduleName: "ui",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      },
      {
        path: "/ui/cards",
        title: "Cards",
        moduleName: "ui",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      },
      {
        path: "/ui/labels",
        title: "Labels",
        moduleName: "ui",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      },
      {
        path: "/ui/list-group",
        title: "List Group",
        moduleName: "ui",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      },
      {
        path: "/ui/snackbar",
        title: "Snackbar",
        moduleName: "ui",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      },
      {
        path: "/ui/preloaders",
        title: "Preloaders",
        moduleName: "ui",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      },
      {
        path: "/ui/progressbars",
        title: "Progress Bars",
        moduleName: "ui",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      },
      {
        path: "/ui/tabs",
        title: "Tabs",
        moduleName: "ui",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      },
      {
        path: "/ui/typography",
        title: "Typography",
        moduleName: "ui",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      },
      {
        path: "/ui/helper-classes",
        title: "Helper Classes",
        moduleName: "ui",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      },
    ],
  },
  {
    path: "",
    title: "Forms",
    moduleName: "forms",
    iconType: "material-icons-two-tone",
    icon: "subtitles",
    class: "menu-toggle",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["ROLE_ADMIN"],
    submenu: [
      {
        path: "/forms/form-controls",
        title: "Form Controls",
        moduleName: "forms",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      },
      {
        path: "/forms/advance-controls",
        title: "Advanced Controls",
        moduleName: "forms",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      },
      {
        path: "/forms/form-example",
        title: "Form Examples",
        moduleName: "forms",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      },
      {
        path: "/forms/form-validation",
        title: "Form Validation",
        moduleName: "forms",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      },
      {
        path: "/forms/wizard",
        title: "Form Wizard",
        moduleName: "forms",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      },
      {
        path: "/forms/editors",
        title: "Editors",
        moduleName: "forms",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      },
    ],
  },
  {
    path: "",
    title: "Tables",
    moduleName: "tables",
    iconType: "material-icons-two-tone",
    icon: "view_list",
    class: "menu-toggle",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["ROLE_ADMIN"],
    submenu: [
      {
        path: "/tables/basic-tables",
        title: "Basic Tables",
        moduleName: "tables",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      },
      {
        path: "/tables/material-tables",
        title: "Material Tables",
        moduleName: "tables",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      },
      {
        path: "/tables/ngx-datatable",
        title: "ngx-datatable",
        moduleName: "tables",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      },
    ],
  },
  {
    path: "",
    title: "Medias",
    moduleName: "media",
    iconType: "material-icons-two-tone",
    icon: "image_search",
    class: "menu-toggle",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["ROLE_ADMIN"],
    submenu: [
      {
        path: "/media/gallery",
        moduleName: "media",
        title: "Image Gallery",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      },
    ],
  },
  {
    path: "",
    title: "Charts",
    moduleName: "charts",
    iconType: "material-icons-two-tone",
    icon: "insert_chart",
    class: "menu-toggle",
    groupTitle: false,
    badge: "7",
    badgeClass: "badge bg-green sidebar-badge float-end",
    role: ["ROLE_ADMIN"],
    submenu: [
      {
        path: "/charts/echart",
        title: "Echart",
        moduleName: "charts",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      },
      {
        path: "/charts/apex",
        title: "Apex",
        moduleName: "charts",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      },
      {
        path: "/charts/chartjs",
        title: "ChartJS",
        moduleName: "charts",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      },
      {
        path: "/charts/ngx-charts",
        title: "Ngx-Charts",
        moduleName: "charts",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      },
      {
        path: "/charts/gauge",
        title: "Gauge",
        moduleName: "charts",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      },
    ],
  },
  {
    path: "",
    title: "Timeline",
    moduleName: "timeline",
    iconType: "material-icons-two-tone",
    icon: "amp_stories",
    class: "menu-toggle",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["ROLE_ADMIN"],
    submenu: [
      {
        path: "/timeline/timeline1",
        title: "Timeline 1",
        moduleName: "timeline",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      },
      {
        path: "/timeline/timeline2",
        title: "Timeline 2",
        moduleName: "timeline",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      },
    ],
  },
  {
    path: "",
    title: "Icons",
    moduleName: "icons",
    iconType: "material-icons-two-tone",
    icon: "eco",
    class: "menu-toggle",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["ROLE_ADMIN"],
    submenu: [
      {
        path: "/icons/material",
        title: "Material Icons",
        moduleName: "icons",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      },
      {
        path: "/icons/font-awesome",
        title: "Font Awesome",
        moduleName: "icons",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      },
    ],
  },
  {
    path: "",
    title: "Authentication",
    moduleName: "authentication",
    iconType: "material-icons-two-tone",
    icon: "supervised_user_circle",
    class: "menu-toggle",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["ROLE_ADMIN"],
    submenu: [
      {
        path: "/authentication/signin",
        title: "Sign In",
        moduleName: "authentication",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      },
      {
        path: "/authentication/signup",
        title: "Sign Up",
        moduleName: "authentication",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      },
      {
        path: "/authentication/forgot-password",
        title: "Forgot Password",
        moduleName: "authentication",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      },
      {
        path: "/authentication/locked",
        title: "Locked",
        moduleName: "authentication",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      },
      {
        path: "/authentication/page404",
        title: "404 - Not Found",
        moduleName: "authentication",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      },
      {
        path: "/authentication/page500",
        title: "500 - Server Error",
        moduleName: "authentication",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      },
    ],
  },
  {
    path: "",
    title: "Extra Pages",
    moduleName: "extra-pages",
    iconType: "material-icons-two-tone",
    icon: "description",
    class: "menu-toggle",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["ROLE_ADMIN"],
    submenu: [
      {
        path: "/extra-pages/profile",
        title: "Profile",
        moduleName: "extra-pages",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      },
      {
        path: "/extra-pages/pricing",
        title: "Pricing",
        moduleName: "extra-pages",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      },
      {
        path: "/extra-pages/invoice",
        title: "Invoice",
        moduleName: "extra-pages",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      },
      {
        path: "/extra-pages/faqs",
        title: "Faqs",
        moduleName: "extra-pages",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      },
      {
        path: "/extra-pages/blank",
        title: "Blank Page",
        moduleName: "extra-pages",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      },
    ],
  },
  {
    path: "",
    title: "Maps",
    moduleName: "maps",
    iconType: "material-icons-two-tone",
    icon: "map",
    class: "menu-toggle",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["ROLE_ADMIN"],
    submenu: [
      {
        path: "/maps/google",
        title: "Google Map",
        moduleName: "maps",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      },
    ],
  },
  {
    path: "",
    title: "Multi level Menu",
    moduleName: "multilevel",
    iconType: "material-icons-two-tone",
    icon: "slideshow",
    class: "menu-toggle",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["ROLE_ADMIN"],
    submenu: [
      {
        path: "/multilevel/first1",
        title: "First",
        moduleName: "multilevel",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      },
      {
        path: "/",
        title: "Second",
        moduleName: "secondlevel",
        iconType: "",
        icon: "",
        class: "ml-sub-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [
          {
            path: "/multilevel/secondlevel/second1",
            title: "Second 1",
            moduleName: "secondlevel",
            iconType: "",
            icon: "",
            class: "ml-sub-sub-menu",
            groupTitle: false,
            badge: "",
            badgeClass: "",
            role: [""],
            submenu: [],
          },
          {
            path: "/multilevel/secondlevel/second2",
            title: "Second 2",
            moduleName: "secondlevel",
            iconType: "",
            icon: "",
            class: "ml-sub-sub-menu",
            groupTitle: false,
            badge: "",
            badgeClass: "",
            role: [""],
            submenu: [],
          },
        ],
      },
      {
        path: "/multilevel/first3",
        title: "Third",
        moduleName: "multilevel",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      },
    ],
  },
];
