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
  detailEs: string;
  detailEn: string;
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
      subtitle: "Tecnología conectada con la realidad de la obra",
      paragraphs: [
        "Más que sistemas independientes, nuestras soluciones forman un ecosistema de datos para la construcción.",
        "Desde la captura de información en campo hasta nómina, costos, presupuestos, subcontratos, equipos, producción y calidad, ADATTA conecta procesos y datos para generar información confiable, trazabilidad y mejores decisiones durante todo el ciclo del proyecto.",
      ],
      tagline: "Tecnología + Construcción + Datos",
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
      subtitle: "Technology connected to the reality of the job site",
      paragraphs: [
        "More than standalone systems, our solutions form a data ecosystem for construction.",
        "From field data capture to payroll, costs, budgets, subcontracts, equipment, production and quality, ADATTA connects processes and data to deliver reliable information, traceability and better decisions throughout the entire project lifecycle.",
      ],
      tagline: "Technology + Construction + Data",
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
    subtitleEs: "Sistema de Planilla y Recursos Humanos",
    subtitleEn: "Payroll and Human Resources System",
    descriptionEs: "Gestión integral de nómina y recursos humanos para obras y proyectos.",
    descriptionEn: "Comprehensive payroll and human resources management for construction sites and projects.",
    detailEs: "Gestión de nómina y recursos humanos diseñada para la complejidad y dinámica de la construcción.",
    detailEn: "Payroll and human resources management designed for the complexity and dynamics of construction.",
    image: "/images/produtos/payroll.webp?v=3",
    featuresEs: [
      "Administración de Personal",
      "Headcount",
      "Expediente e Historial Laboral",
      "Confección e Impresión de Carnés",
      "Vacaciones y Ausencias",
      "Capacitaciones",
      "Control por Fases y Centros de Costos",
      "Preplanilla",
      "Planilla 03",
      "Fondo de Enfermedad",
      "Cálculo de ISR con Proyección",
      "Horas Extras y Recargos",
      "Incidencias de Nómina",
      "Liquidaciones y Prestaciones",
      "Reportes Analíticos y Gerenciales",
      "Dashboards",
      "Alertas Configurables"
    ],
    featuresEn: [
      "Personnel Administration",
      "Headcount",
      "Employee File and Work History",
      "ID Badge Design and Printing",
      "Vacations and Absences",
      "Training",
      "Control by Phases and Cost Centers",
      "Pre-Payroll",
      "Planilla 03",
      "Sick Fund",
      "ISR Calculation with Projection",
      "Overtime and Surcharges",
      "Payroll Incidents",
      "Settlements and Benefits",
      "Analytical and Management Reports",
      "Dashboards",
      "Configurable Alerts"
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
    descriptionEs: "Control de asistencia, horas y personal directamente desde la obra.",
    descriptionEn: "Attendance, hours and personnel control directly from the site.",
    detailEs: "Control de jornada, horas extras y condiciones especiales, con flujos de aprobación y generación automática de hojas de tiempo.",
    detailEn: "Control of workdays, overtime and special conditions, with approval workflows and automatic timesheet generation.",
    image: "/images/produtos/sisgep.webp?v=3",
    featuresEs: [
      "Datos Personales y Laborales",
      "Encargados y Cuadrillas",
      "Captura Electrónica de Datos en Campo",
      "Entradas y Salidas",
      "Control de Asistencia",
      "Control de Horas Extras",
      "Condiciones Especiales",
      "Flujos de Aprobación",
      "Apropiación por Centro de Costos",
      "Control de Acceso",
      "Verificación de Identidad",
      "Entrenamientos",
      "EPP",
      "Cálculo de Horas Regulares, Extras y Equivalentes",
      "Generación y Envío Automático de Hojas de Tiempo",
      "Alertas Configurables",
      "Seguimiento en Línea",
      "Integración con Nómina",
      "Cloud Hosting"
    ],
    featuresEn: [
      "Personal and Labor Data",
      "Foremen and Crews",
      "Electronic Field Data Capture",
      "Entries and Exits",
      "Attendance Control",
      "Overtime Control",
      "Special Conditions",
      "Approval Workflows",
      "Cost Center Allocation",
      "Access Control",
      "Identity Verification",
      "Training",
      "PPE",
      "Regular, Overtime and Equivalent Hours Calculation",
      "Automatic Timesheet Generation and Delivery",
      "Configurable Alerts",
      "Online Monitoring",
      "Payroll Integration",
      "Cloud Hosting"
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
    descriptionEs: "Control de maquinaria, utilización y productividad en tiempo real.",
    descriptionEn: "Machinery control, utilization and productivity in real time.",
    detailEs: "Control de horas, productividad, disponibilidad y utilización de los equipos para una gestión más eficiente de la obra.",
    detailEn: "Control of hours, productivity, availability and utilization of equipment for more efficient site management.",
    image: "/images/produtos/acm.webp?v=3",
    featuresEs: [
      "Control de Horas de Equipos",
      "Horas Productivas e Improductivas",
      "Apropiación por Centro de Costos",
      "Productividad de Maquinaria",
      "Control de Viajes",
      "Disponibilidad Mecánica",
      "Eficiencia Operacional",
      "Combustibles y Lubricantes",
      "Seguimiento en Tiempo Real",
      "Alertas Configurables",
      "Indicadores de Gestión",
      "Integración con Sistemas Corporativos"
    ],
    featuresEn: [
      "Equipment Hours Control",
      "Productive and Unproductive Hours",
      "Cost Center Allocation",
      "Machinery Productivity",
      "Trip Control",
      "Mechanical Availability",
      "Operational Efficiency",
      "Fuel and Lubricants",
      "Real-Time Monitoring",
      "Configurable Alerts",
      "Management Indicators",
      "Integration with Corporate Systems"
    ],
    icon: "📱",
    logo: "📍",
  },
  {
    id: 4,
    nameEs: "Adatta Tools",
    nameEn: "Adatta Tools",
    subtitleEs: "Control de Bodegas, Herramientas y EPP",
    subtitleEn: "Warehouse, Tools and PPE Control",
    descriptionEs: "Control de herramientas, EPP, equipos menores y suministros.",
    descriptionEn: "Control of tools, PPE, minor equipment and supplies.",
    detailEs: "Trazabilidad de inventarios, préstamos, consumos y devoluciones en toda la obra.",
    detailEn: "Traceability of inventory, loans, consumption and returns across the entire site.",
    image: "/images/produtos/tools.webp?v=3",
    featuresEs: [
      "Control de Bodegas",
      "Inventario y Stock",
      "Herramientas y Equipos Menores",
      "Control de EPP",
      "Préstamos y Devoluciones",
      "Devoluciones Pendientes",
      "Despacho de Consumibles",
      "Historial por Colaborador",
      "Consulta por Carné",
      "Control de Plazos de Entrega y Reposición",
      "Alertas Configurables",
      "Trazabilidad de Movimientos",
      "Reducción de Pérdidas, Extravíos y Desperdicios"
    ],
    featuresEn: [
      "Warehouse Control",
      "Inventory and Stock",
      "Tools and Minor Equipment",
      "PPE Control",
      "Loans and Returns",
      "Pending Returns",
      "Consumables Dispatch",
      "History by Employee",
      "ID Badge Lookup",
      "Delivery and Replacement Deadline Control",
      "Configurable Alerts",
      "Movement Traceability",
      "Reduction of Losses, Misplacement and Waste"
    ],
    icon: "🏭",
    logo: "🏭",
  },
  {
    id: 5,
    nameEs: "Adatta Daily Reports",
    nameEn: "Adatta Daily Reports",
    subtitleEs: "Reportes Diarios de Obra",
    subtitleEn: "Daily Site Reports",
    descriptionEs: "Registro diario de actividades, avances y recursos directamente desde campo.",
    descriptionEn: "Daily record of activities, progress and resources directly from the field.",
    detailEs: "Centraliza la información diaria de la obra para seguimiento, productividad, trazabilidad y toma de decisiones.",
    detailEn: "Centralizes daily site information for monitoring, productivity, traceability and decision-making.",
    image: "/images/produtos/daily.webp?v=3",
    featuresEs: [
      "Actividades Ejecutadas",
      "Avances y Producción",
      "Mano de Obra",
      "Equipos",
      "Plantas de Concreto",
      "Excavaciones",
      "Consumo de Materiales",
      "Fotografías y Archivos",
      "Configuración de Reportes",
      "Registro desde Campo",
      "Consolidación de Datos",
      "Seguimiento en Línea y en Tiempo Real",
      "Historial de Ejecución"
    ],
    featuresEn: [
      "Executed Activities",
      "Progress and Production",
      "Labor",
      "Equipment",
      "Concrete Plants",
      "Excavations",
      "Material Consumption",
      "Photos and Files",
      "Report Configuration",
      "Field Data Entry",
      "Data Consolidation",
      "Online and Real-Time Monitoring",
      "Execution History"
    ],
    icon: "📋",
    logo: "📋",
  },
  {
    id: 6,
    nameEs: "Adatta Tracking",
    nameEn: "Adatta Tracking",
    subtitleEs: "Captura Electrónica y Monitoreo de Producción",
    subtitleEn: "Electronic Capture & Production Monitoring",
    descriptionEs: "Captura automática y monitoreo en tiempo real de la producción de obra.",
    descriptionEn: "Automatic capture and real-time monitoring of site production.",
    detailEs: "Integra datos de plantas, balanzas, sensores y equipos para transformar la operación en información confiable y disponible en tiempo real.",
    detailEn: "Integrates data from plants, scales, sensors and equipment to turn operations into reliable information available in real time.",
    image: "/images/produtos/tracking.webp?v=3",
    featuresEs: [
      "Plantas de Concreto",
      "Plantas Trituradoras",
      "Plantas de Asfalto",
      "Balanzas de Camiones",
      "Silos de Cemento",
      "Estaciones Meteorológicas",
      "Sensores e IoT",
      "Monitoreo de Producción en Tiempo Real",
      "Captura Automática de Datos",
      "Reportes Automáticos",
      "Integración con Bases de Datos y Sistemas Corporativos",
      "Interfaces y Extracción de Datos"
    ],
    featuresEn: [
      "Concrete Plants",
      "Crushing Plants",
      "Asphalt Plants",
      "Truck Scales",
      "Cement Silos",
      "Weather Stations",
      "Sensors and IoT",
      "Real-Time Production Monitoring",
      "Automatic Data Capture",
      "Automatic Reports",
      "Integration with Databases and Corporate Systems",
      "Interfaces and Data Extraction"
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
    descriptionEs: "Gestión integral de subcontratos, mediciones, valuaciones y proveedores.",
    descriptionEn: "Comprehensive management of subcontracts, measurements, valuations and suppliers.",
    detailEs: "Control del ciclo del subcontrato, desde la contratación hasta la medición, valuación y seguimiento financiero.",
    detailEn: "Control of the full subcontract cycle, from contracting to measurement, valuation and financial follow-up.",
    image: "/images/produtos/contract.webp?v=3",
    featuresEs: [
      "Empresas y Proveedores",
      "Servicios y Servicios Compuestos",
      "Contratos y Adendas",
      "Órdenes de Servicio",
      "Mediciones",
      "Valuaciones",
      "Reajustes de Precios",
      "Solvencias",
      "Evaluación de Empresas",
      "Programación Financiera",
      "Control de Transacciones Financieras",
      "Gestión Electrónica de Documentos",
      "Historial Contractual"
    ],
    featuresEn: [
      "Companies and Suppliers",
      "Services and Composite Services",
      "Contracts and Amendments",
      "Service Orders",
      "Measurements",
      "Valuations",
      "Price Adjustments",
      "Solvency Certificates",
      "Company Evaluation",
      "Financial Scheduling",
      "Financial Transaction Control",
      "Electronic Document Management",
      "Contract History"
    ],
    icon: "📄",
    logo: "📄",
  },
  {
    id: 8,
    nameEs: "Adatta Cost",
    nameEn: "Adatta Cost",
    subtitleEs: "Gestión y Control de Costos",
    subtitleEn: "Cost Management and Control",
    descriptionEs: "Control de costos reales, producción y desempeño económico de la obra.",
    descriptionEn: "Control of actual costs, production and economic performance of the project.",
    detailEs: "Sistema de costeo que consolida los costos y producciones reales de la obra, calcula costos unitarios y permite acompañar su evolución frente al presupuesto.",
    detailEn: "Costing system that consolidates actual site costs and production, calculates unit costs and tracks their evolution against the budget.",
    image: "/images/produtos/cost.webp?v=3",
    featuresEs: [
      "Costos Reales",
      "Producciones Reales",
      "Mano de Obra",
      "Materiales",
      "Equipos",
      "Subcontratos",
      "Financiero",
      "Costos Auxiliares y Otros Recursos",
      "Apropiación por Centro de Costos",
      "Composiciones de Costos",
      "Cálculo de Costos Unitarios Reales",
      "Consolidación de Movimientos de Costos",
      "Real vs. Presupuesto",
      "Análisis de Consistencias",
      "Seguimiento de Desviaciones",
      "Indicadores y Reportes Gerenciales"
    ],
    featuresEn: [
      "Actual Costs",
      "Actual Production",
      "Labor",
      "Materials",
      "Equipment",
      "Subcontracts",
      "Financial",
      "Auxiliary Costs and Other Resources",
      "Cost Center Allocation",
      "Cost Compositions",
      "Actual Unit Cost Calculation",
      "Cost Movement Consolidation",
      "Actual vs. Budget",
      "Consistency Analysis",
      "Variance Tracking",
      "Management Indicators and Reports"
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
    descriptionEs: "Presupuestación y planificación de costos de la obra.",
    descriptionEn: "Budgeting and cost planning for the project.",
    detailEs: "Estructura servicios, recursos, cantidades, precios y composiciones para estimar y planificar los costos del proyecto.",
    detailEn: "Structures services, resources, quantities, prices and compositions to estimate and plan project costs.",
    image: "/images/produtos/budget.webp?v=3",
    featuresEs: [
      "Servicios",
      "Recursos",
      "Análisis de Precios Unitarios",
      "Composiciones de Costos",
      "Cronogramas de Servicios",
      "Cronogramas de Recursos",
      "Histogramas",
      "Flujo de Caja",
      "Estudios y Escenarios",
      "Ajustes de Precios",
      "Monedas e Indicadores",
      "Importación y Exportación con Microsoft Excel",
      "Copia y Versionado de Presupuestos"
    ],
    featuresEn: [
      "Services",
      "Resources",
      "Unit Price Analysis",
      "Cost Compositions",
      "Service Schedules",
      "Resource Schedules",
      "Histograms",
      "Cash Flow",
      "Studies and Scenarios",
      "Price Adjustments",
      "Currencies and Indicators",
      "Import and Export with Microsoft Excel",
      "Budget Copying and Versioning"
    ],
    icon: "📈",
    logo: "📈",
  },
  {
    id: 10,
    nameEs: "Adatta INSP",
    nameEn: "Adatta INSP",
    subtitleEs: "Inspecciones y Control de Calidad",
    subtitleEn: "Inspections and Quality Control",
    descriptionEs: "Inspecciones de calidad directamente desde campo.",
    descriptionEn: "Quality inspections directly from the field.",
    detailEs: "Digitaliza inspecciones, evidencias y resultados para garantizar trazabilidad y control de calidad en obra.",
    detailEn: "Digitizes inspections, evidence and results to ensure traceability and quality control on site.",
    image: "/images/produtos/insp.webp?v=3",
    featuresEs: [
      "Formularios y Cuestionarios de Inspección",
      "Registro de Resultados",
      "Evidencias Fotográficas",
      "Archivos Adjuntos",
      "Datos Geográficos",
      "Datos Climáticos",
      "Inspecciones desde Campo",
      "Consultas",
      "Reportes",
      "Historial y Trazabilidad de Inspecciones"
    ],
    featuresEn: [
      "Inspection Forms and Questionnaires",
      "Results Recording",
      "Photographic Evidence",
      "File Attachments",
      "Geographic Data",
      "Climate Data",
      "Field Inspections",
      "Queries",
      "Reports",
      "Inspection History and Traceability"
    ],
    icon: "✓",
    logo: "✓",
  },
  {
    id: 11,
    nameEs: "Adatta LAB",
    nameEn: "Adatta LAB",
    subtitleEs: "Gestión de Laboratorios y Ensayos",
    subtitleEn: "Laboratory and Testing Management",
    descriptionEs: "Gestión de ensayos, muestras y control de calidad de materiales.",
    descriptionEn: "Management of tests, samples and material quality control.",
    detailEs: "Centraliza los ensayos de laboratorio y el control de calidad de los materiales utilizados en la obra.",
    detailEn: "Centralizes laboratory tests and quality control of the materials used on site.",
    image: "/images/produtos/lab.webp?v=3",
    featuresEs: [
      "Ensayos de Cemento",
      "Propiedades Físicas y Químicas",
      "Ensayos de Concreto",
      "Control de Vaciados",
      "Rotura de Probetas",
      "Envío Automático de Reportes",
      "Ensayos de Suelos",
      "Granulometría",
      "Límites y Estándares",
      "Historial de Resultados",
      "Gráficos e Indicadores",
      "Reportes de Calidad"
    ],
    featuresEn: [
      "Cement Tests",
      "Physical and Chemical Properties",
      "Concrete Tests",
      "Pour Control",
      "Specimen Break Tests",
      "Automatic Report Delivery",
      "Soil Tests",
      "Granulometry",
      "Limits and Standards",
      "Results History",
      "Charts and Indicators",
      "Quality Reports"
    ],
    icon: "🔬",
    logo: "🔬",
  },
  {
    id: 12,
    nameEs: "Adatta Doctor",
    nameEn: "Adatta Doctor",
    subtitleEs: "Salud Ocupacional",
    subtitleEn: "Occupational Health",
    descriptionEs: "Salud ocupacional y gestión médica del personal de obra.",
    descriptionEn: "Occupational health and medical management of site personnel.",
    detailEs: "Centraliza atenciones, incapacidades, medicamentos y antecedentes médicos para una gestión ocupacional integrada.",
    detailEn: "Centralizes medical care, sick leave, medications and medical history for integrated occupational management.",
    image: "/images/produtos/doctor.webp?v=3",
    featuresEs: [
      "Historial de Atenciones Médicas",
      "Expediente Médico",
      "Anamnesis",
      "Incapacidades",
      "Citas y Programación",
      "Procedimientos Médicos",
      "Medicamentos e Inventario",
      "Recetas y Certificados",
      "Seguros y Convenios",
      "Gestión Electrónica de Documentos",
      "Horarios de Atención",
      "Integración con la Base de Colaboradores",
      "Consultas y Reportes"
    ],
    featuresEn: [
      "Medical Care History",
      "Medical Record",
      "Anamnesis",
      "Sick Leave",
      "Appointments and Scheduling",
      "Medical Procedures",
      "Medications and Inventory",
      "Prescriptions and Certificates",
      "Insurance and Agreements",
      "Electronic Document Management",
      "Care Schedules",
      "Integration with Employee Database",
      "Queries and Reports"
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
            <p className="text-xl md:text-2xl font-semibold text-foreground mb-4">{t.products.subtitle}</p>
            <div className="max-w-3xl space-y-3 text-muted-foreground">
              {t.products.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <p className="mt-4 text-sm md:text-base font-semibold tracking-wide text-accent">{t.products.tagline}</p>
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
                  className="flex flex-col snap-start flex-shrink-0 w-full md:w-[calc((100%-3rem)/3)] bg-card rounded-lg p-6 md:p-8 border border-border hover:shadow-lg transition-shadow duration-300"
                >
                  {product.image && (
                    <button type="button" onClick={() => setSelectedProduct(product)} className="block w-full mb-4 shrink-0 overflow-hidden rounded-lg">
                      <img
                        src={product.image}
                        alt={language === "es" ? product.nameEs : product.nameEn}
                        loading="lazy"
                        className="w-full aspect-[4/3] object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </button>
                  )}
                  {!product.image && <div className="text-5xl mb-4">{product.icon}</div>}
                  <h3 className="self-start text-xl font-semibold text-foreground bg-secondary/60 px-2 py-0.5 rounded mb-1">
                    {language === "es" ? product.nameEs : product.nameEn}
                  </h3>
                  <p className="text-sm text-accent mb-4">
                    {language === "es" ? product.subtitleEs : product.subtitleEn}
                  </p>
                  <p className="flex-1 text-muted-foreground mb-6">
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
                  {language === "es" ? selectedProduct.detailEs : selectedProduct.detailEn}
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
