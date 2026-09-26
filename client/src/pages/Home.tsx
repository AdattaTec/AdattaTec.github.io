import { useState, useRef, useEffect } from "react";
import {
  ArrowLeftRight, BarChart3, ChevronLeft, ChevronRight, ClipboardCheck, Cloud, Code2, Cpu, DatabaseZap, GraduationCap,
  Headphones, Mail, MapPin, Menu, MessageCircle, MessagesSquare, Phone, Rocket, Settings, X, type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { TechSections } from "@/components/TechSections";
import { Asesoria } from "@/components/Asesoria";
import { Trayectoria } from "@/components/Trayectoria";

/**
 * Design System: Minimalismo Corporativo Moderno
 * - Paleta: Azul Profissional (#003366) + Branco + Cinzas Neutros
 * - Tipografia: Playfair Display (títulos) + Inter (corpo)
 * - Idiomas: Español e English
 * - Componentes: Carrosséis con modales detallados + Sección de clientes
 */

const CONTACT_EMAIL = "adatta@adattati.com";
const CONTACT_PHONE = "+507-6115-2158";
const WHATSAPP_NUMBER = "50761152158";

const whatsappUrl = (text: string) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
const mailtoUrl = (subject: string) => `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`;

type Language = "es" | "en";

interface Product {
  id: number;
  nameEs: string;
  nameEn: string;
  subtitleEs: string;
  subtitleEn: string;
  descriptionEs: string;
  descriptionEn: string;
  featuresEs: string[];
  featuresEn: string[];
  icon: string;
  logo: string;
  image?: string;
}

interface Service {
  icon: LucideIcon;
  nameEs: string;
  nameEn: string;
  scopeEs: string;
  scopeEn: string;
}

// Arte completa do produto (com lista de recursos), exibida no modal de detalhe
const fullImage = (image: string) => image.replace(/\.webp(\?|$)/, "-full.webp$1");

const translations = {
  es: {
    nav: {
      inicial: "Página Inicial",
      productos: "Productos",
      asesoria: "Asesoría",
      servicios: "Servicios",
      sobre: "Sobre",
      trayectoria: "Trayectoria",
      clientes: "Clientes",
      noticias: "Novedades",
      contacto: "Contacto",
    },
    hero: {
      title: "Transformamos desafíos en",
      titleHighlight: "soluciones digitales.",
      subtitle: "Software y consultoría para impulsar el crecimiento de tu negocio.",
      learnMore: "Saber Más",
      contact: "Contacto",
    },
    products: {
      title: "Productos",
      subtitle: "Soluciones de software empresarial",
    },
    services: {
      title: "Servicios",
      subtitle: "Soluciones completas para tu empresa",
    },
    about: {
      title: "Sobre Adatta",
      paragraphs: [
        "ADATTA Tecnología es una empresa con sede en Panamá, especializada en soluciones tecnológicas y servicios para construcción, infraestructura y gestión de proyectos.",
        "Desarrollamos e implementamos soluciones que conectan campo, procesos y gestión, integrando información de costos, presupuesto, recursos humanos, subcontratos, producción, equipos, calidad y documentación.",
        "Nuestra experiencia combina conocimiento de los procesos reales de obra con desarrollo de software, bases de datos, integración de sistemas, Business Intelligence y automatización, transformando datos operacionales en información confiable para Project Controls, toma de decisiones y soporte a Claims.",
        "Trabajamos junto a nuestros clientes para adaptar cada solución a la realidad de sus proyectos, buscando mejorar el control, la trazabilidad y la disponibilidad de la información a lo largo de todo su ciclo de vida.",
      ],
      values: [
        { title: "Calidad", subtitle: "Soluciones orientadas a resultados", text: "Tecnología y servicios adaptados a las necesidades reales de cada proyecto." },
        { title: "Confiabilidad", subtitle: "Información segura y trazable", text: "Datos consistentes y disponibles para respaldar el control y la toma de decisiones." },
        { title: "Profesionalismo", subtitle: "Experiencia de obra + tecnología", text: "Conocimiento multidisciplinario aplicado a construcción, Project Controls y gestión de datos." },
      ],
    },
    mission: {
      title: "Misión",
      paragraphs: [
        "Desarrollar soluciones tecnológicas y prestar servicios especializados que permitan capturar, integrar y transformar los datos de los proyectos en información confiable para la gestión.",
        "Conectamos tecnología y conocimiento de obra para fortalecer el control operacional y gerencial, facilitar la toma de decisiones y preservar la trazabilidad e historia de cada proyecto.",
      ],
    },
    clients: {
      title: "Principales Clientes",
      subtitle: "Empresas que confían en nuestras soluciones",
    },
    contact: {
      title: "Ponte en Contacto",
      intro: "Escríbenos por WhatsApp o correo electrónico y te respondemos a la brevedad.",
      whatsapp: "Hablar por WhatsApp",
      whatsappText: "Hola, quisiera más información sobre las soluciones de Adatta.",
      sendEmail: "Enviar Correo",
      emailSubject: "Contacto desde el sitio web",
      location: "Ubicación",
      phone: "Teléfono",
      learnMore: "Saber Más",
      features: "Características",
      close: "Cerrar",
    },
    footer: {
      about: "Soluciones en software y consultoría para tu negocio.",
      products: "Productos",
      services: "Servicios",
      company: "Empresa",
      rights: "Todos los derechos reservados.",
    },
  },
  en: {
    nav: {
      inicial: "Home",
      productos: "Products",
      asesoria: "Advisory",
      servicios: "Services",
      sobre: "About",
      trayectoria: "Track record",
      clientes: "Clients",
      noticias: "News",
      contacto: "Contact",
    },
    hero: {
      title: "We transform challenges into",
      titleHighlight: "digital solutions.",
      subtitle: "Software and consulting to drive your business growth.",
      learnMore: "Learn More",
      contact: "Contact",
    },
    products: {
      title: "Products",
      subtitle: "Enterprise software solutions",
    },
    services: {
      title: "Services",
      subtitle: "Complete solutions for your business",
    },
    about: {
      title: "About Adatta",
      paragraphs: [
        "ADATTA Tecnología is a Panama-based company specialized in technology solutions and services for construction, infrastructure and project management.",
        "We develop and implement solutions that connect the field, processes and management, integrating information on costs, budget, human resources, subcontracts, production, equipment, quality and documentation.",
        "Our experience combines knowledge of real construction processes with software development, databases, systems integration, Business Intelligence and automation, turning operational data into reliable information for Project Controls, decision-making and Claims support.",
        "We work alongside our clients to adapt each solution to the reality of their projects, improving control, traceability and the availability of information throughout their entire life cycle.",
      ],
      values: [
        { title: "Quality", subtitle: "Results-oriented solutions", text: "Technology and services adapted to the real needs of each project." },
        { title: "Reliability", subtitle: "Secure, traceable information", text: "Consistent, available data to support control and decision-making." },
        { title: "Professionalism", subtitle: "Construction experience + technology", text: "Multidisciplinary knowledge applied to construction, Project Controls and data management." },
      ],
    },
    mission: {
      title: "Mission",
      paragraphs: [
        "To develop technology solutions and provide specialized services that capture, integrate and transform project data into reliable information for management.",
        "We connect technology and construction know-how to strengthen operational and managerial control, support decision-making and preserve the traceability and history of every project.",
      ],
    },
    clients: {
      title: "Main Clients",
      subtitle: "Companies that trust our solutions",
    },
    contact: {
      title: "Get in Touch",
      intro: "Reach us on WhatsApp or by email and we'll get back to you shortly.",
      whatsapp: "Chat on WhatsApp",
      whatsappText: "Hi, I'd like more information about Adatta's solutions.",
      sendEmail: "Send Email",
      emailSubject: "Contact from website",
      location: "Location",
      phone: "Phone",
      learnMore: "Learn More",
      features: "Features",
      close: "Close",
    },
    footer: {
      about: "Software solutions and consulting for your business.",
      products: "Products",
      services: "Services",
      company: "Company",
      rights: "All rights reserved.",
    },
  },
};

const products: Product[] = [
  {
    id: 1,
    nameEs: "Adatta PayRoll",
    nameEn: "Adatta PayRoll",
    subtitleEs: "Sistema de Planilla-Nómina",
    subtitleEn: "Payroll Management System",
    descriptionEs: "Gestión completa de nómina y recursos humanos con administración de personal, vacaciones, ausencias y reportes analíticos.",
    descriptionEn: "Complete payroll and human resources management with personnel administration, vacations, absences, and analytical reports.",
    image: "/images/produtos/payroll.webp?v=2",
    featuresEs: [
      "Administración de personal",
      "Headcount",
      "Confección e impresión de carnés",
      "Administración de Recursos Humanos",
      "Históricos",
      "Vacaciones",
      "Ausencias",
      "Control de Fases",
      "Capacitaciones",
      "Reportes Analíticos y Gerenciales",
      "Configuración de Alertas",
      "Planilla 03",
      "Pre Laborada",
      "Fondo de Enfermedad",
      "Cálculo de ISR con Proyección"
    ],
    featuresEn: [
      "Personnel administration",
      "Headcount",
      "ID badge design and printing",
      "Human Resources management",
      "Historical data",
      "Vacations",
      "Absences",
      "Phase control",
      "Training",
      "Analytical and Management reports",
      "Alert configuration",
      "Planilla 03",
      "Pre-labor",
      "Sick fund",
      "ISR calculation with projection"
    ],
    icon: "💼",
    logo: "👔",
  },
  {
    id: 2,
    nameEs: "Adatta SisGep",
    nameEn: "Adatta SisGep",
    subtitleEs: "Sistema de Gestión de Personas",
    subtitleEn: "Personnel Management System",
    descriptionEs: "Control integral de personal con gestión de datos laborales, control de acceso, asistencia y entrenamientos en tiempo real.",
    descriptionEn: "Comprehensive personnel control with labor data management, access control, attendance, and real-time training.",
    image: "/images/produtos/sisgep.webp?v=2",
    featuresEs: [
      "Datos Personales y Laborales",
      "Control y Organigrama de Encargados & Cuadrillas",
      "Colecta Electrónica de Datos",
      "Entradas",
      "Salidas",
      "Condiciones Especiales",
      "Control de Acceso",
      "Apropiación por centro de costos",
      "Verificación de ID",
      "Status",
      "Entrenamientos",
      "EPP",
      "Cálculo de Horas Regulares, Extras y Equivalentes",
      "Envío automático de Hoja de Tiempo",
      "Configuración de alertas",
      "Reducción de costos con horas extras",
      "Acompañamiento en línea",
      "Cloud Hosting"
    ],
    featuresEn: [
      "Personal and labor data",
      "Company control and organization chart",
      "Electronic data collection",
      "Entries",
      "Exits",
      "Special conditions",
      "Access control",
      "Cost center appropriation",
      "ID verification",
      "Status",
      "Training",
      "PPE",
      "Regular hours calculation, Overtime and equivalents",
      "Automatic timesheet submission",
      "Alert configuration",
      "Overtime cost reduction",
      "Online monitoring",
      "Cloud hosting"
    ],
    icon: "👥",
    logo: "👥",
  },
  {
    id: 3,
    nameEs: "Adatta ACM",
    nameEn: "Adatta ACM",
    subtitleEs: "Control de Maquinaria y Equipos",
    subtitleEn: "Machinery & Equipment Control",
    descriptionEs: "Control de maquinaria y equipos de obra: horas trabajadas, paradas, consumo de combustible y eficiencia operacional en tiempo real.",
    descriptionEn: "Construction machinery and equipment control: worked hours, downtime, fuel consumption and real-time operational efficiency.",
    image: "/images/produtos/acm.webp?v=2",
    featuresEs: [
      "Reducción de costos por medio de monitoreo de las horas de equipos",
      "Controle de productividad de maquinaria",
      "Acompañamiento en tiempo real de las Horas Apropiadas",
      "Apropiación de horas Productivas por Centro de Costes",
      "Apropiación de horas Improductivas",
      "Control de Viajes",
      "Cálculo de Índices como Disponibilidad Mecánica y Eficiencia Operacional",
      "Configuración y recibimiento de alertas personalizados",
      "Integración con Sistemas Corporativos",
      "Suministro de Combustible & Lubricantes"
    ],
    featuresEn: [
      "Cost reduction through equipment hour monitoring",
      "Machinery productivity control",
      "Real-time monitoring of Appropriate Hours",
      "Productive hours appropriation by Cost Center",
      "Unproductive hours appropriation",
      "Trip control",
      "Calculation of Indices such as Mechanical Availability and Operational Efficiency",
      "Configuration and receipt of personalized alerts",
      "Integration with Corporate Systems",
      "Fuel & Lubricants Supply"
    ],
    icon: "📱",
    logo: "📍",
  },
  {
    id: 4,
    nameEs: "Adatta Tools",
    nameEn: "Adatta Tools",
    subtitleEs: "Control de Bodegas",
    subtitleEn: "Warehouse Control",
    descriptionEs: "Control de bodegas, inventario y stock con reducción de costos y hurtos.",
    descriptionEn: "Warehouse control, inventory, and stock with cost and theft reduction.",
    image: "/images/produtos/tools.webp",
    featuresEs: [
      "Reducción de costos, hurtos, extravíos y desperdicios de Materiales",
      "Acompañamiento en línea de Stock de las Bodegas",
      "Acompañamiento en línea de Prestamos de EPP y Herramientas",
      "Control de Devoluciones Pendientes",
      "Despacho de Consumibles",
      "Criticas de entrega de x plazos de EPPs",
      "Consulta de Carnet: Status de EPPs y Herramientas",
      "Configuración y recibimiento de alertas personalizados",
      "Control de Bodegas",
      "Inventario & Stock"
    ],
    featuresEn: [
      "Cost reduction, theft, loss, and material waste",
      "Online Warehouse Stock Monitoring",
      "Online Monitoring of PPE and Tools Loans",
      "Pending Returns Control",
      "Consumables Dispatch",
      "Delivery Deadlines Alerts for PPE",
      "Card Query: PPE and Tools Status",
      "Configuration and receipt of personalized alerts",
      "Warehouse Control",
      "Inventory & Stock"
    ],
    icon: "🏭",
    logo: "🏭",
  },
  {
    id: 5,
    nameEs: "Adatta Daily Reports",
    nameEn: "Adatta Daily Reports",
    subtitleEs: "Reportes Diarios",
    subtitleEn: "Daily Reports",
    descriptionEs: "Consolidación e información de datos en reportes diarios con fotos y archivos adjuntos.",
    descriptionEn: "Consolidation and data information in daily reports with attached photos and files.",
    image: "/images/produtos/daily.webp",
    featuresEs: [
      "Consolidación e Información de datos en los reportes",
      "Equipos",
      "Mano de obra",
      "Plantas de Concreto",
      "Excavaciones",
      "Consumo de Materiales",
      "Permite adjuntar fotos y archivos",
      "Creación y configuración de reportes diarios",
      "Facilidad para lanzamiento de actividades",
      "Acompañamiento en línea y en tiempo real"
    ],
    featuresEn: [
      "Data consolidation and information in reports",
      "Equipment",
      "Labor",
      "Concrete Plants",
      "Excavations",
      "Material Consumption",
      "Allows attaching photos and files",
      "Creation and configuration of daily reports",
      "Easy activity launching",
      "Online and real-time monitoring"
    ],
    icon: "📋",
    logo: "📋",
  },
  {
    id: 6,
    nameEs: "Adatta Tracking",
    nameEn: "Adatta Tracking",
    subtitleEs: "Captura Electrónica & Monitoreo de Producción",
    subtitleEn: "Electronic Capture & Production Monitoring",
    descriptionEs: "Monitoreo de producción en tiempo real con captura electrónica de datos de obras.",
    descriptionEn: "Real-time production monitoring with electronic data capture from construction sites.",
    image: "/images/produtos/tracking.webp",
    featuresEs: [
      "Plantas Mezcladoras de Concreto",
      "Plantas Trituradoras",
      "Plantas de Asfalto",
      "Estación Meteorológica",
      "Balanzas de Camiones",
      "Silos de Cemento",
      "Configuración y envío automático de Reportes",
      "Monitores de producción en tiempo real",
      "Integraciones entre Banco de Datos y Plataformas",
      "Desarrollos de Sistemas y Extracciones"
    ],
    featuresEn: [
      "Concrete Mixing Plants",
      "Crushing Plants",
      "Asphalt Plants",
      "Weather Station",
      "Truck Scales",
      "Cement Silos",
      "Automatic Report Configuration and Sending",
      "Real-time production monitors",
      "Integrations between Database and Platforms",
      "System Development and Data Extraction"
    ],
    icon: "📊",
    logo: "📊",
  },
  {
    id: 7,
    nameEs: "Adatta Contract",
    nameEn: "Adatta Contract",
    subtitleEs: "Gestión de Subcontratos",
    subtitleEn: "Subcontract Management",
    descriptionEs: "Gestión electrónica de subcontratos, órdenes de servicios y valuaciones.",
    descriptionEn: "Electronic management of subcontracts, service orders, and valuations.",
    image: "/images/produtos/contract.webp",
    featuresEs: [
      "Servicios",
      "Empresas",
      "Servicios & Servicios Compuestos",
      "Contratos",
      "Gestión Electrónica de Documentos",
      "Ordenes de Servicios & Adendas",
      "Mediciones",
      "Valuaciones",
      "Evaluación de Empresas",
      "Solvencias",
      "Reajustes de Precios",
      "Programación financiera",
      "Control de transacciones financieras"
    ],
    featuresEn: [
      "Services",
      "Companies",
      "Services & Composite Services",
      "Contracts",
      "Electronic Document Management",
      "Service Orders & Amendments",
      "Measurements",
      "Valuations",
      "Company Evaluation",
      "Solvency",
      "Price Adjustments",
      "Financial Programming",
      "Financial transaction control"
    ],
    icon: "📄",
    logo: "📄",
  },
  {
    id: 8,
    nameEs: "Adatta Cost",
    nameEn: "Adatta Cost",
    subtitleEs: "Gestión de Costos",
    subtitleEn: "Cost Management",
    descriptionEs: "Integración de movimientos para cálculo de costo unitario con análisis de consistencias.",
    descriptionEn: "Integration of movements for unit cost calculation with consistency analysis.",
    image: "/images/produtos/cost.webp",
    featuresEs: [
      "Integración de movimiento para cálculo de costo unitario",
      "Mano de Obra",
      "Materiales",
      "Subcontratos",
      "Financiero",
      "Equipos",
      "Auxiliares",
      "Ingresos",
      "Composiciones de Costos",
      "Producciones",
      "Acompañamiento de Costo x Presupuesto",
      "Análisis de Consistencias",
      "Generación automática de recursos"
    ],
    featuresEn: [
      "Integration of movement for unit cost calculation",
      "Labor",
      "Materials",
      "Subcontracts",
      "Financial",
      "Equipment",
      "Auxiliaries",
      "Income",
      "Cost Compositions",
      "Productions",
      "Cost vs Budget Monitoring",
      "Consistency Analysis",
      "Automatic resource generation"
    ],
    icon: "💰",
    logo: "💰",
  },
  {
    id: 9,
    nameEs: "Adatta Budget",
    nameEn: "Adatta Budget",
    subtitleEs: "Gestión de Presupuestos",
    subtitleEn: "Budget Management",
    descriptionEs: "Gestión de presupuestos con análisis de precios y cronogramas de servicios.",
    descriptionEn: "Budget management with price analysis and service schedules.",
    image: "/images/produtos/budget.webp",
    featuresEs: [
      "Servicios",
      "Recursos",
      "Análisis de precios",
      "Cronogramas de servicios",
      "Cronogramas de recursos",
      "Histogramas",
      "Flujo de Caja",
      "Rutinas de copia",
      "Estudio",
      "Composición",
      "Ajustes de precios",
      "Importación y Exportación MS-Excel",
      "Monedas & Indicadores"
    ],
    featuresEn: [
      "Services",
      "Resources",
      "Price Analysis",
      "Service Schedules",
      "Resource Schedules",
      "Histograms",
      "Cash Flow",
      "Copy Routines",
      "Study",
      "Composition",
      "Price Adjustments",
      "Import and Export MS-Excel",
      "Currencies & Indicators"
    ],
    icon: "📈",
    logo: "📈",
  },
  {
    id: 10,
    nameEs: "Adatta INSP",
    nameEn: "Adatta INSP",
    subtitleEs: "Sistema de Inspección de Calidad",
    subtitleEn: "Quality Inspection System",
    descriptionEs: "Inspección técnica y control de calidad con reportes detallados para asegurar estándares de excelencia.",
    descriptionEn: "Technical inspection and quality control with detailed reports to ensure excellence standards.",
    image: "/images/produtos/insp.webp",
    featuresEs: [
      "Creación de Cuestionarios de Inspección",
      "Registro de Respuestas",
      "Upload de Fotos",
      "Datos Geográficos",
      "Datos Climáticos",
      "Consultas",
      "Reportes"
    ],
    featuresEn: [
      "Creation of Inspection Questionnaires",
      "Response Registration",
      "Photo Upload",
      "Geographic Data",
      "Climate Data",
      "Queries",
      "Reports"
    ],
    icon: "✓",
    logo: "✓",
  },
  {
    id: 11,
    nameEs: "Adatta LAB",
    nameEn: "Adatta LAB",
    subtitleEs: "Software para Gestión de Laboratorios",
    subtitleEn: "Laboratory Management Software",
    descriptionEs: "Software para gestión de laboratorios con registro de ensayos y control de vaciado.",
    descriptionEn: "Laboratory management software with test registration and casting control.",
    image: "/images/produtos/lab.webp",
    featuresEs: [
      "Registros de ensayos de cemento",
      "Registro Propiedades Físicas y Químicas",
      "Registros de ensayos concreto",
      "Control de vaciado",
      "Envío automático de reportes de rotura",
      "Registros de ensayos Suelos",
      "Granulometría",
      "Registro de Límites & Estándares",
      "Galería de Gráficos y Reportes"
    ],
    featuresEn: [
      "Cement test records",
      "Physical and Chemical Properties Registration",
      "Concrete test records",
      "Casting control",
      "Automatic failure report sending",
      "Soil test records",
      "Granulometry",
      "Limits & Standards Registration",
      "Gallery of Graphics and Reports"
    ],
    icon: "🔬",
    logo: "🔬",
  },
  {
    id: 12,
    nameEs: "Adatta Doctor",
    nameEn: "Adatta Doctor",
    subtitleEs: "Software para Gestión de Clínicas",
    subtitleEn: "Clinic Management Software",
    descriptionEs: "Software para gestión de clínicas con registro de historiales médicos y control de citas.",
    descriptionEn: "Clinic management software with medical history registration and appointment control.",
    image: "/images/produtos/doctor.webp",
    featuresEs: [
      "Registro y Historial de atendimientos médicos",
      "Control de status y programación de citas",
      "Configuración y Registro de Anamnesis",
      "Registro de Incapacidades",
      "Configuración de procedimientos Médicos",
      "Registro y Stock de consumo de medicamentos",
      "Administración de seguros y convenios",
      "Emisión de recetas y atestados",
      "Gestión electrónica de documentos",
      "Prontuario médico",
      "Programación de horarios de Atención",
      "Integrado con Base de Datos de Colaboradores",
      "Reportes"
    ],
    featuresEn: [
      "Registration and History of medical care",
      "Status control and appointment scheduling",
      "Configuration and Registration of Anamnesis",
      "Disability Registration",
      "Configuration of Medical Procedures",
      "Registration and Stock of medication consumption",
      "Insurance and agreement administration",
      "Prescription and certificate issuance",
      "Electronic document management",
      "Medical record",
      "Scheduling of Care Hours",
      "Integrated with Employee Database",
      "Reports"
    ],
    icon: "⚕️",
    logo: "⚕️",
  },
];

const services: Service[] = [
  { icon: MessagesSquare, nameEs: "Consultoría, diagnóstico y diseño de soluciones", nameEn: "Solution consulting, assessment and design",
    scopeEs: "Levantamiento de procesos operativos y administrativos, identificación de controles críticos, flujos de información, modelos de datos e indicadores de gestión.",
    scopeEn: "Assessment of operational and administrative processes, identification of critical controls, information flows, data models and management indicators." },
  { icon: Settings, nameEs: "Configuración y customización de soluciones Adatta", nameEn: "Configuration and customization of Adatta solutions",
    scopeEs: "Parametrización y adaptación de productos Adatta a los procesos, reglas de negocio, flujos, reportes, perfiles y necesidades específicas de cada cliente o proyecto.",
    scopeEn: "Parameterization and adaptation of Adatta products to processes, business rules, workflows, reports, profiles and the specific needs of each client or project." },
  { icon: Code2, nameEs: "Desarrollo de soluciones y módulos específicos", nameEn: "Development of solutions and specific modules",
    scopeEs: "Desarrollo de aplicaciones web, desktop y móviles, módulos complementarios, interfaces y automatizaciones para requerimientos específicos no cubiertos por las soluciones estándar.",
    scopeEn: "Development of web, desktop and mobile applications, complementary modules, interfaces and automations for specific requirements not covered by standard solutions." },
  { icon: ArrowLeftRight, nameEs: "Integración de sistemas y datos", nameEn: "Systems and data integration",
    scopeEs: "Integración con ERP, nómina, costos, BI y otras plataformas mediante APIs, servicios web, archivos, ETL y bases de datos.",
    scopeEn: "Integration with ERP, payroll, costs, BI and other platforms through APIs, web services, files, ETL and databases." },
  { icon: Cpu, nameEs: "Integración de dispositivos, IoT y captura automática", nameEn: "Device, IoT and automated data capture integration",
    scopeEs: "Integración con lectores faciales y biométricos, controles de acceso, colectores de datos, sensores de maquinaria, dispositivos IoT, plantas, balanzas y otras fuentes de campo para captura automática, sincronización, monitoreo y trazabilidad.",
    scopeEn: "Integration with facial and biometric readers, access controls, data collectors, machinery sensors, IoT devices, plants, scales and other field sources for automatic capture, synchronization, monitoring and traceability." },
  { icon: DatabaseZap, nameEs: "Migración y calidad de datos", nameEn: "Data migration and quality",
    scopeEs: "Extracción, depuración, homologación, transformación, consolidación y migración de información histórica entre sistemas y proyectos.",
    scopeEn: "Extraction, cleansing, standardization, transformation, consolidation and migration of historical information between systems and projects." },
  { icon: Rocket, nameEs: "Implantación y puesta en marcha", nameEn: "Implementation and go-live",
    scopeEs: "Configuración de ambientes, instalación, parametrización, pruebas, carga inicial, validación con usuarios, puesta en producción y acompañamiento durante el arranque.",
    scopeEn: "Environment configuration, installation, parameterization, testing, initial data load, user validation, and go-live support and accompaniment." },
  { icon: GraduationCap, nameEs: "Capacitación y transferencia de conocimiento", nameEn: "Training and knowledge transfer",
    scopeEs: "Capacitación funcional y técnica para usuarios, administradores y equipos de proyecto, incluyendo cursos especializados de SQL Server y bases de datos.",
    scopeEn: "Functional and technical training for users, administrators and project teams, including specialized courses on SQL Server and databases." },
  { icon: Headphones, nameEs: "Soporte y evolución de soluciones", nameEn: "Solution support and evolution",
    scopeEs: "Soporte funcional y técnico, diagnóstico de incidencias, mantenimiento, actualizaciones, mejoras y evolución continua de las soluciones implantadas.",
    scopeEn: "Functional and technical support, incident diagnosis, maintenance, updates, improvements and continuous evolution of the implemented solutions." },
  { icon: BarChart3, nameEs: "Bases de datos y Business Intelligence", nameEn: "Databases and Business Intelligence",
    scopeEs: "Consultoría SQL Server: modelado, optimización, rendimiento, seguridad, auditoría, respaldos y continuidad; integración de datos, KPI, dashboards y reportes gerenciales.",
    scopeEn: "SQL Server consulting: modeling, optimization, performance, security, auditing, backups and continuity; data integration, KPIs, dashboards and management reports." },
  { icon: ClipboardCheck, nameEs: "Project Controls, Claims y gestión documental", nameEn: "Project Controls, Claims and document management",
    scopeEs: "Integración y análisis de información de costos, producción y avance; consolidación de evidencias, cronologías, trazabilidad, consultas y procesamiento masivo de documentación para soporte a reclamos.",
    scopeEn: "Integration and analysis of cost, production and progress information; consolidation of evidence, chronologies, traceability, queries and large-scale document processing to support claims." },
  { icon: Cloud, nameEs: "Infraestructura y nube", nameEn: "Infrastructure and cloud",
    scopeEs: "Migración, configuración y administración de servidores, bases de datos, aplicaciones e infraestructura en nube.",
    scopeEn: "Migration, configuration and administration of servers, databases, applications and infrastructure in the cloud." },
];

const clients = [
  "Grupo Unidos Por el Canal",
  "Consorcio Línea II del Metro de Panamá",
  "Proyecto Renovación Urbana de Colón",
  "Consorcio Corredor de Playa I",
  "FCC Construction - AMPA",
  "Agregados y Materiales de Panamá SA",
  "Terminal de Cruceros de Panamá",
  "Revitalización de Espacios Públicos de la Ciudad de Panamá",
  "Cinta Costera III",
  "Expansión del Aeropuerto de Tocumen",
  "Sacyr Construction",
  "Consorcio SH - Autopista Rumiñahui - Pasto",
  "Consorcio MAR1",
  "The Saltex Group",
  "Consorcio OIV Tocoma",
  "Metro Los Teques Línea I y Línea II",
  "III Puente Sobre el Río Orinoco",
  "Proyecto El Diluvio Palmar",
  "Puente Nigale",
];

export default function Home() {
  const [language, setLanguage] = useState<Language>("es");
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);
  const [productIndex, setProductIndex] = useState(0);
  const productCarouselRef = useRef<HTMLDivElement>(null);
  const t = translations[language];
  const [menuOpen, setMenuOpen] = useState(false);
  const navLinks: [string, string][] = [
    ["#inicial", t.nav.inicial],
    ["#productos", t.nav.productos],
    ["#asesoria", t.nav.asesoria],
    ["#servicios", t.nav.servicios],
    ["#sobre", t.nav.sobre],
    ["#trayectoria", t.nav.trayectoria],
    ["#clientes", t.nav.clientes],
    ["#noticias", t.nav.noticias],
    ["#contacto", t.nav.contacto],
  ];
  const [itemsPerView, setItemsPerView] = useState(3);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setItemsPerView(mq.matches ? 3 : 1);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Rola até o card de índice "index" (funciona com 1 ou 3 cards visíveis)
  const scrollToCard = (carousel: HTMLDivElement | null, index: number) => {
    const card = carousel?.children[index] as HTMLElement | undefined;
    if (carousel && card) carousel.scrollTo({ left: card.offsetLeft - carousel.offsetLeft, behavior: "smooth" });
  };

  // No celular o carrossel é deslizado com o dedo: mantém os indicadores em sincronia
  const swipingRef = useRef(false);
  const syncIndex = (carousel: HTMLDivElement, setIndex: (i: number) => void) => {
    const first = carousel.children[0] as HTMLElement | undefined;
    if (!first || itemsPerView !== 1) return;
    swipingRef.current = true;
    setIndex(Math.round(carousel.scrollLeft / (first.offsetWidth + 24)));
    requestAnimationFrame(() => (swipingRef.current = false));
  };

  const handleRequestDemo = (itemName: string) => {
    setSelectedProduct(null);
    const text =
      language === "es"
        ? `Hola, tengo interés en una demo de ${itemName}.`
        : `Hi, I'm interested in a demo of ${itemName}.`;
    window.open(whatsappUrl(text), "_blank", "noopener");
  };

  const handleAdvisoryContact = (name: string) => {
    const text =
      language === "es"
        ? `Hola, quisiera agendar una conversación sobre ${name}.`
        : `Hi, I'd like to schedule a conversation about ${name}.`;
    window.open(whatsappUrl(text), "_blank", "noopener");
  };

  const handleProductPrev = () => {
    setProductIndex((prev) =>
      prev === 0 ? Math.max(0, products.length - itemsPerView) : prev - 1
    );
  };

  const handleProductNext = () => {
    setProductIndex((prev) =>
      prev >= products.length - itemsPerView ? 0 : prev + 1
    );
  };



  useEffect(() => {
    if (swipingRef.current) return;
    scrollToCard(productCarouselRef.current, productIndex);
  }, [productIndex, itemsPerView]);


  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-primary text-sm">ADATTA</span>
              <span className="text-xs text-muted-foreground">TECNOLOGÍA</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(([href, label]) => (
              <a key={href} href={href} className="text-sm text-foreground hover:text-primary transition-colors">
                {label}
              </a>
            ))}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setLanguage("es")}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                language === "es"
                  ? "bg-primary text-white"
                  : "bg-secondary text-foreground hover:bg-secondary/80"
              }`}
            >
              ES
            </button>
            <button
              onClick={() => setLanguage("en")}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                language === "en"
                  ? "bg-primary text-white"
                  : "bg-secondary text-foreground hover:bg-secondary/80"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="md:hidden p-1 text-primary"
              aria-label="Menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden border-t border-border bg-white">
            <div className="container py-2 flex flex-col">
              {navLinks.map(([href, label]) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="py-3 text-foreground hover:text-primary border-b border-border last:border-0"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="inicial" className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/hero.webp')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-transparent" />
        
        <div className="container relative py-24 md:py-32">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: "Playfair Display" }}>
              {t.hero.title} <span className="text-accent">{t.hero.titleHighlight}</span>
            </h1>
            <p className="text-lg text-white/90 mb-8">
              {t.hero.subtitle}
            </p>
            <div className="flex gap-4">
              <Button asChild className="bg-accent hover:bg-accent/90 text-white">
                <a href="#productos">{t.hero.learnMore}</a>
              </Button>
              <Button asChild variant="outline" className="border-white text-white hover:bg-white/10 bg-transparent">
                <a href="#contacto">{t.hero.contact}</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Products Carousel */}
      <section id="productos" className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2" style={{ fontFamily: "Playfair Display" }}>
              {t.products.title}
            </h2>
            <p className="text-muted-foreground">{t.products.subtitle}</p>
          </div>

          <div className="relative">
            <div
              ref={productCarouselRef}
              onScroll={(e) => syncIndex(e.currentTarget, setProductIndex)}
              className="flex gap-6 overflow-x-auto md:overflow-x-hidden snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {products.map((product) => (
                <div
                  key={product.id}
                  className="snap-start flex-shrink-0 w-full md:w-[calc((100%-3rem)/3)] bg-card rounded-lg p-6 md:p-8 border border-border hover:shadow-lg transition-shadow duration-300"
                >
                  {product.image && (
                    <button type="button" onClick={() => setSelectedProduct(product)} className="block w-full mb-4 overflow-hidden rounded-lg">
                      <img
                        src={product.image}
                        alt={language === "es" ? product.nameEs : product.nameEn}
                        loading="lazy"
                        className="w-full aspect-[1254/860] object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </button>
                  )}
                  {!product.image && <div className="text-5xl mb-4">{product.icon}</div>}
                  <h3 className="inline-block text-xl font-semibold text-foreground bg-secondary/60 px-2 py-0.5 rounded mb-1">
                    {language === "es" ? product.nameEs : product.nameEn}
                  </h3>
                  <p className="text-sm text-accent mb-4">
                    {language === "es" ? product.subtitleEs : product.subtitleEn}
                  </p>
                  <p className="text-muted-foreground mb-6">
                    {language === "es" ? product.descriptionEs : product.descriptionEn}
                  </p>
                  <Button
                    onClick={() => setSelectedProduct(product)}
                    variant="outline"
                    className="w-full border-primary text-primary hover:bg-primary/10"
                  >
                    {t.contact.learnMore}
                  </Button>
                </div>
              ))}
            </div>

            {/* Carousel Controls */}
            <button
              onClick={handleProductPrev}
              className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 md:-translate-x-20 bg-primary hover:bg-primary/90 text-white rounded-full p-3 transition-colors"
              aria-label="Previous products"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={handleProductNext}
              className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 md:translate-x-20 bg-primary hover:bg-primary/90 text-white rounded-full p-3 transition-colors"
              aria-label="Next products"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: Math.max(1, products.length - itemsPerView + 1) }).map(
              (_, idx) => (
                <button
                  key={idx}
                  onClick={() => setProductIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    idx === productIndex ? "bg-primary" : "bg-border"
                  }`}
                  aria-label={`Go to product slide ${idx + 1}`}
                />
              )
            )}
          </div>
        </div>
      </section>

      <Asesoria language={language} onContact={handleAdvisoryContact} />

      {/* Services */}
      <section id="servicios" className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2" style={{ fontFamily: "Playfair Display" }}>
              {t.services.title}
            </h2>
            <p className="text-muted-foreground">{t.services.subtitle}</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div key={service.nameEs} className="rounded-lg p-5 border border-border hover:shadow-md transition-shadow duration-300 flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{language === "es" ? service.nameEs : service.nameEn}</h3>
                    <p className="text-sm text-muted-foreground">{language === "es" ? service.scopeEs : service.scopeEn}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-12">
            <div className="lg:col-span-3">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6" style={{ fontFamily: "Playfair Display" }}>
                {t.about.title}
              </h2>
              {t.about.paragraphs.map((p) => (
                <p key={p} className="text-foreground mb-4 leading-relaxed">
                  {p}
                </p>
              ))}

              <div className="mt-8 p-6 bg-secondary/30 rounded-lg border border-border">
                <h3 className="text-xl font-semibold text-primary mb-3" style={{ fontFamily: "Playfair Display" }}>
                  {t.mission.title}
                </h3>
                {t.mission.paragraphs.map((p) => (
                  <p key={p} className="text-foreground text-sm leading-relaxed mb-2 last:mb-0">
                    {p}
                  </p>
                ))}
              </div>
            </div>
            <div className="lg:col-span-2">
              <a href="/images/servicios-integrados.webp" target="_blank" rel="noopener noreferrer" className="block lg:sticky lg:top-24">
                <img
                  src="/images/servicios-integrados.webp"
                  alt={language === "es" ? "Servicios integrados para proyectos" : "Integrated project services"}
                  loading="lazy"
                  className="w-full max-w-md mx-auto rounded-lg shadow-lg"
                />
              </a>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {t.about.values.map((v) => (
              <div key={v.title} className="rounded-lg border border-border p-6 border-t-4 border-t-accent">
                <h3 className="text-lg font-semibold text-primary">{v.title}</h3>
                <p className="text-sm font-medium text-accent mb-2">{v.subtitle}</p>
                <p className="text-sm text-muted-foreground">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Trayectoria language={language} />

      {/* Clients Section */}
      <section id="clientes" className="py-16 md:py-24 bg-secondary/30">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2" style={{ fontFamily: "Playfair Display" }}>
              {t.clients.title}
            </h2>
            <p className="text-muted-foreground">{t.clients.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {clients.map((client, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg p-4 border border-border hover:shadow-md transition-shadow duration-300"
              >
                <p className="text-foreground font-medium">{client}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TechSections language={language} />

      {/* Contact Section */}
      <section id="contacto" className="py-16 md:py-24 bg-white">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-12 text-center" style={{ fontFamily: "Playfair Display" }}>
            {t.contact.title}
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact CTA */}
            <div className="bg-secondary/30 rounded-lg p-8 border border-border flex flex-col justify-center gap-6">
              <p className="text-muted-foreground">{t.contact.intro}</p>
              <a href={whatsappUrl(t.contact.whatsappText)} target="_blank" rel="noopener noreferrer">
                <Button className="w-full bg-[#25D366] hover:bg-[#1ebe5b] text-white">
                  <MessageCircle size={18} />
                  {t.contact.whatsapp}
                </Button>
              </a>
              <a href={mailtoUrl(t.contact.emailSubject)}>
                <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                  <Mail size={18} />
                  {t.contact.sendEmail}
                </Button>
              </a>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div className="bg-white rounded-lg p-6 border border-border">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin size={24} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{t.contact.location}</h3>
                    <p className="text-muted-foreground text-sm">
                      Panamá
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 border border-border">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone size={24} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{t.contact.phone}</h3>
                    <a href={whatsappUrl(t.contact.whatsappText)} target="_blank" rel="noopener noreferrer" className="text-muted-foreground text-sm hover:text-primary">
                      {CONTACT_PHONE}
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 border border-border">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail size={24} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Email</h3>
                    <a href={mailtoUrl(t.contact.emailSubject)} className="text-muted-foreground text-sm hover:text-primary">
                      {CONTACT_EMAIL}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white py-8">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <span className="text-primary font-bold">A</span>
                </div>
                <span className="font-bold">ADATTA</span>
              </div>
              <p className="text-white/80 text-sm">
                {t.footer.about}
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t.footer.products}</h4>
              <ul className="space-y-2 text-sm text-white/80">
                <li><a href="#" className="hover:text-white transition-colors">PayRoll</a></li>
                <li><a href="#" className="hover:text-white transition-colors">SisGep</a></li>
                <li><a href="#" className="hover:text-white transition-colors">INSP</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t.footer.services}</h4>
              <ul className="space-y-2 text-sm text-white/80">
                <li><a href="#" className="hover:text-white transition-colors">{language === "es" ? "Desarrollo" : "Development"}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{language === "es" ? "Consultoría" : "Consulting"}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{language === "es" ? "Soporte" : "Support"}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t.footer.company}</h4>
              <ul className="space-y-2 text-sm text-white/80">
                <li><a href="#sobre" className="hover:text-white transition-colors">{t.nav.sobre}</a></li>
                <li><a href="#contacto" className="hover:text-white transition-colors">{t.nav.contacto}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{language === "es" ? "Privacidad" : "Privacy"}</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 pt-8 text-center text-sm text-white/80">
            <p>&copy; 2026 Adatta Tecnología. {t.footer.rights}</p>
          </div>
        </div>
      </footer>

      {/* Product Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-primary text-white p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h3 className="text-2xl font-bold" style={{ fontFamily: "Playfair Display" }}>
                  {language === "es" ? selectedProduct.nameEs : selectedProduct.nameEn}
                </h3>
              </div>
              <button
                onClick={() => setSelectedProduct(null)}
                className="p-1 hover:bg-white/20 rounded transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-6 space-y-6">
              {selectedProduct.image && (
                <a href={fullImage(selectedProduct.image)} target="_blank" rel="noopener noreferrer">
                  <img
                    src={fullImage(selectedProduct.image)}
                    alt={language === "es" ? selectedProduct.nameEs : selectedProduct.nameEn}
                    className="w-full rounded-lg border border-border"
                  />
                </a>
              )}
              <div>
                <p className="text-lg text-foreground mb-4">
                  {language === "es" ? selectedProduct.descriptionEs : selectedProduct.descriptionEn}
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-primary mb-4">{t.contact.features}</h4>
                <ul className="space-y-2">
                  {(language === "es" ? selectedProduct.featuresEs : selectedProduct.featuresEn).map((feature, idx) => (
                    <li key={idx} className="flex gap-3 text-foreground">
                      <span className="text-accent font-bold min-w-fit">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Button
                onClick={() =>
                  handleRequestDemo(language === "es" ? selectedProduct.nameEs : selectedProduct.nameEn)
                }
                className="w-full bg-primary hover:bg-primary/90 text-white"
              >
                {language === "es" ? "Solicitar Demo" : "Request Demo"}
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
