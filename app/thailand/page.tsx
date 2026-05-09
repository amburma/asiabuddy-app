"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThaiLanguage } from './types';
import EmergencyBanner from './components/EmergencyBanner';
import LanguageSelector from './components/LanguageSelector';
import ConciergeChat from './components/ConciergeChat';
import TransportChat from './components/TransportChat';
import FoodChat from './components/FoodChat';
import AccommodationChat from './components/AccommodationChat';
import DestinationExplorer from './components/DestinationExplorer';
import TravelToolbox from './components/TravelToolbox';
import LanguageWelcome from './components/LanguageWelcome';
import { UI_TRANSLATIONS } from './i18n';
import { GENERAL_INFORMATION } from './data/generalInformation';
import { TRANSPORT_DETAILS } from './data/transportDetails';
import { ACCOMMODATION_GUIDE } from './data/accommodationGuide';
import { FOOD_GUIDE_MARKDOWN } from './data/foodGuide';
import { MEDICAL_GUIDE_MARKDOWN } from './data/medicalGuide';
import { NIGHTLIFE_GUIDE_MARKDOWN } from './data/nightlifeGuide';
import { VAT_REFUND_GUIDE } from './data/vatRefundGuide';
import { VISA_GUIDE } from './data/visaGuide';
import { TRAVEL_STYLE_GUIDE } from './data/travelStyleGuide';
import { SHOPPING_GUIDE_MARKDOWN } from './data/shoppingGuide';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { Compass, MessageSquare, Map as MapIcon, ShieldCheck, Languages, Info, X, Bus, ChevronRight, Check, AlertCircle, Receipt, FileCheck, Menu, Grid, MessageCircle, Home, Utensils, Plane, Ticket, Stethoscope, Music, ShoppingBag, Calculator, Gavel } from 'lucide-react';
import TripPlannerChat from './components/TripPlannerChat';
import MedicalChat from './components/MedicalChat';
import NightlifeChat from './components/NightlifeChat';
import ShoppingChat from './components/ShoppingChat';
import BookingChat from './components/BookingChat';
import CurrencyConverter from './components/CurrencyConverter';
import PhrasesChat from './components/PhrasesChat';
import EtiquetteGuide from './components/EtiquetteGuide';
import LawsGuide from './components/LawsGuide';

export default function TestPage() {
  return <h1>Thailand Page is Working!</h1>
}

