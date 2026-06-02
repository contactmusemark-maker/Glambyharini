import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CalendarClock,
  Check,
  CheckCircle2,
  ChevronRight,
  CreditCard,
  Info,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  User,
  Wallet,
} from "lucide-react";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";

type Step = 1 | 2 | 3 | 4;

type Service = {
  id: string;
  name: string;
  category: "Bridal" | "Engagement" | "Reception" | "Party";
  durationHours: number;
  includes: string;
  price: number;
  image: string;
};

type AddOn = {
  id: string;
  name: string;
  price: number;
};

type Details = {
  name: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
  notes: string;
};

const SERVICES: Service[] = [
  {
    id: "classic-bridal",
    name: "Classic Bridal Makeup",
    category: "Bridal",
    durationHours: 2.5,
    includes: "HD Makeup, Hairstyling, Saree Draping",
    price: 12999,
    image: "/assets/clients/000_client.jpg",
  },
  {
    id: "premium-bridal",
    name: "Premium Bridal Makeup",
    category: "Bridal",
    durationHours: 3,
    includes: "Airbrush Makeup, Hairstyling, Lashes, Draping",
    price: 15999,
    image: "/assets/clients/004_client.jpg",
  },
  {
    id: "luxury-bridal",
    name: "Luxury Bridal Package",
    category: "Bridal",
    durationHours: 4,
    includes: "Premium Airbrush, Hair Extensions, Jewelry Setting, Touch-up Kit",
    price: 22999,
    image: "/assets/clients/009_client.jpg",
  },
  {
    id: "engagement-makeup",
    name: "Engagement Makeup",
    category: "Engagement",
    durationHours: 2,
    includes: "Glam Makeup, Hair Styling",
    price: 8999,
    image: "/assets/clients/001_client.jpg",
  },
  {
    id: "reception-makeup",
    name: "Reception Makeup",
    category: "Reception",
    durationHours: 2.5,
    includes: "HD Glam Makeup, Hairstyling",
    price: 10999,
    image: "/assets/clients/006_client.jpg",
  },
  {
    id: "party-makeup",
    name: "Party Makeup",
    category: "Party",
    durationHours: 1.5,
    includes: "Soft Glam Makeup",
    price: 5999,
    image: "/assets/clients/002_client.jpg",
  },
];

const ADD_ONS: AddOn[] = [
  { id: "lashes", name: "False Lashes", price: 800 },
  { id: "extensions", name: "Hair Extensions", price: 1500 },
  { id: "draping", name: "Saree Draping", price: 1200 },
  { id: "flowers", name: "Flower Hair Accessories", price: 700 },
  { id: "nails", name: "Nail Extensions", price: 2500 },
  { id: "touchup", name: "HD Touch-up Kit", price: 1000 },
  { id: "extra-hairstyle", name: "Extra Hairstyle Change", price: 2000 },
  { id: "dupatta", name: "Bridal Dupatta Setting", price: 500 },
];

const PREMIUM_INCLUDES = [
  "Premium branded makeup products",
  "HD / Airbrush finish",
  "Waterproof & long-stay makeup",
  "Saree draping",
  "Hairstyling",
  "Basic accessories setting",
  "Skin prep & finishing spray",
  "Touch-up support",
];

const CHARGES = [
  { type: "Early Morning Booking", detail: "₹1,500 before 6 AM" },
  { type: "Travel Charges", detail: "Based on location distance" },
  { type: "Outstation Booking", detail: "Travel + Stay charges applicable" },
  { type: "Assistant Requirement", detail: "₹2,000 extra" },
  { type: "Waiting Charges", detail: "₹500 per hour after scheduled time" },
  { type: "Festival / Peak Season Charges", detail: "May vary during wedding season" },
  { type: "Extra Family Makeup", detail: "Starting from ₹3,500" },
];

const CANCELLATION = [
  "Free rescheduling up to 48 hours before appointment",
  "Advance payment is non-refundable",
  "Same-day cancellation charges may apply",
  "Late arrival beyond 30 minutes may affect service timing",
];

const WHATSAPP_PHONE = "917305306497";

const TIME_SLOTS = [
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "01:00 PM",
  "01:30 PM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
  "04:30 PM",
  "05:00 PM",
  "05:30 PM",
  "06:00 PM",
  "06:30 PM",
  "07:00 PM",
  "07:30 PM",
  "08:00 PM",
  "08:30 PM",
];

function formatINR(value: number) {
  return `₹${new Intl.NumberFormat("en-IN").format(value)}`;
}

function getPaymentLabel(method: "upi" | "card" | "netbanking" | "wallet") {
  const labels = {
    upi: "UPI / QR",
    card: "Card",
    netbanking: "Net Banking",
    wallet: "Wallets",
  };

  return labels[method];
}

function StepDot({ done, active }: { done: boolean; active: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex h-8 w-8 items-center justify-center rounded-full border text-sm font-semibold",
        done
          ? "bg-primary border-primary text-primary-foreground"
          : active
            ? "bg-primary/10 border-primary/30 text-primary"
            : "bg-white border-foreground/10 text-foreground/55"
      )}
    >
      {done ? <Check size={16} /> : null}
      {!done ? (active ? <span className="h-2 w-2 rounded-full bg-primary" /> : null) : null}
    </span>
  );
}

function SectionCard({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-foreground/10 bg-white shadow-sm">
      <div className="flex items-center gap-3 px-5 py-4 border-b border-foreground/10">
        <div className="h-9 w-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
          {icon}
        </div>
        <div className="font-serif text-lg text-foreground">{title}</div>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="mb-2 font-mono text-[11px] tracking-widest uppercase text-foreground/55">
        {label} {required ? <span className="text-primary">*</span> : null}
      </div>
      {children}
    </label>
  );
}

const inputClass =
  "min-h-11 w-full rounded-xl border border-foreground/10 bg-white px-4 py-3 text-sm text-foreground placeholder:text-foreground/35 focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary/30 transition";

export default function Booking() {
  const [step, setStep] = useState<Step>(1);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"All" | Service["category"]>("All");
  const [serviceId, setServiceId] = useState<string | null>(null);
  const [addOns, setAddOns] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [details, setDetails] = useState<Details>({
    name: "",
    email: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    notes: "",
  });
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card" | "netbanking" | "wallet">(
    "upi"
  );
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const selectedService = useMemo(
    () => SERVICES.find((s) => s.id === serviceId) ?? null,
    [serviceId]
  );
  const selectedAddOns = useMemo(
    () => ADD_ONS.filter((a) => addOns.includes(a.id)),
    [addOns]
  );

  const addOnTotal = useMemo(
    () => selectedAddOns.reduce((sum, a) => sum + a.price, 0),
    [selectedAddOns]
  );
  const serviceTotal = selectedService?.price ?? 0;
  const subTotal = serviceTotal + addOnTotal;
  const tax = Math.round(subTotal * 0.18);
  const total = subTotal + tax;

  const canContinueFromStep1 = Boolean(selectedService);
  const canContinueFromStep2 = Boolean(selectedService && selectedDate && selectedTime);
  const canContinueFromStep3 =
    Boolean(selectedService && selectedDate && selectedTime) &&
    details.name.trim().length >= 2 &&
    details.email.includes("@") &&
    details.phone.replace(/\D/g, "").length >= 10;

  const filteredServices = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SERVICES.filter((s) => {
      const matchesCategory = category === "All" ? true : s.category === category;
      const matchesQuery =
        q.length === 0 ||
        s.name.toLowerCase().includes(q) ||
        s.includes.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  const goNext = () => setStep((s) => (Math.min(4, s + 1) as Step));
  const goBack = () => setStep((s) => (Math.max(1, s - 1) as Step));

  const resetAfterSuccess = () => {
    setStep(1);
    setQuery("");
    setCategory("All");
    setServiceId(null);
    setAddOns([]);
    setSelectedDate(undefined);
    setSelectedTime(null);
    setDetails({
      name: "",
      email: "",
      phone: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      pincode: "",
      notes: "",
    });
    setPaymentMethod("upi");
  };

  const buildWhatsAppMessage = () => {
    const address = [
      details.addressLine1,
      details.addressLine2,
      details.city,
      details.state,
      details.pincode,
    ]
      .filter(Boolean)
      .join(", ");

    const addOnText = selectedAddOns.length
      ? selectedAddOns.map((a) => `- ${a.name}: ${formatINR(a.price)}`).join("\n")
      : "None";

    return [
      "Hi Harini! I would like to confirm my booking.",
      "",
      "*Booking Details*",
      `Service: ${selectedService?.name ?? "-"}`,
      `Package Includes: ${selectedService?.includes ?? "-"}`,
      `Duration: ${selectedService?.durationHours ?? "-"} Hours`,
      `Date: ${selectedDate ? format(selectedDate, "EEE, dd MMM yyyy") : "-"}`,
      `Time: ${selectedTime ?? "-"}`,
      "",
      "*Customer Details*",
      `Name: ${details.name || "-"}`,
      `Phone: ${details.phone || "-"}`,
      `Email: ${details.email || "-"}`,
      `Address: ${address || "-"}`,
      `Special Requests: ${details.notes || "-"}`,
      "",
      "*Add-ons*",
      addOnText,
      "",
      "*Payment Summary*",
      `Service Charges: ${formatINR(serviceTotal)}`,
      `Add-ons: ${formatINR(addOnTotal)}`,
      `GST (18%): ${formatINR(tax)}`,
      `Total Amount: ${formatINR(total)}`,
      `Preferred Payment: ${getPaymentLabel(paymentMethod)}`,
      "",
      "Please confirm availability and next steps.",
    ].join("\n");
  };

  const onConfirm = async () => {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1100));
    setSubmitting(false);
    setSubmitted(true);
    window.open(
      `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(buildWhatsAppMessage())}`,
      "_blank",
      "noopener,noreferrer"
    );
    setTimeout(() => {
      setSubmitted(false);
      resetAfterSuccess();
    }, 2400);
  };

  return (
    <section
      id="booking"
      className="py-20 md:py-28 bg-secondary/15 relative overflow-hidden scroll-mt-24"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/25 to-transparent pointer-events-none" />

      <div className="container relative z-10">
        <div className="text-center mb-8 md:mb-10">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-mono text-sm tracking-[0.2em] uppercase text-primary"
          >
            Services &amp; Rates
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-5xl font-serif mt-3 text-foreground"
          >
            Book Your Transformation
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-foreground/60 max-w-2xl mx-auto"
          >
            Pick a service, choose your date &amp; time, add details, then review &amp; confirm.
          </motion.p>
        </div>

        {/* Stepper */}
        <div className="max-w-6xl mx-auto">
          <div className="rounded-xl border border-primary/15 bg-white/80 px-3 py-4 shadow-sm backdrop-blur sm:px-5">
            <div className="grid grid-cols-2 items-center gap-3 md:grid-cols-4">
              {(
                [
                  { n: 1 as const, label: "Service", desc: "Choose service" },
                  { n: 2 as const, label: "Date & Time", desc: "Pick date & time" },
                  { n: 3 as const, label: "Details", desc: "Your information" },
                  { n: 4 as const, label: "Confirmation", desc: "Review & confirm" },
                ] as const
              ).map((s, idx) => {
                const done = step > s.n;
                const active = step === s.n;
                return (
                  <button
                    key={s.n}
                    type="button"
                    onClick={() => {
                      if (s.n < step) setStep(s.n);
                    }}
                    className={cn(
                      "text-left group",
                      s.n < step ? "cursor-pointer" : "cursor-default"
                    )}
                    aria-disabled={s.n >= step}
                  >
                    <div className="flex items-center gap-3">
                      <StepDot done={done} active={active} />
                      <div className="min-w-0">
                        <div className={cn("text-xs md:text-sm font-semibold", active ? "text-foreground" : "text-foreground/70")}>
                          <span className="hidden sm:inline">{s.n}. </span>{s.label}
                        </div>
                        <div className="hidden sm:block text-xs text-foreground/55">{s.desc}</div>
                      </div>
                    </div>
                    {idx < 3 ? (
                      <div className="hidden md:block h-[2px] bg-foreground/10 ml-11 mt-3" />
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Layout */}
          <div className="mt-5 grid min-w-0 gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(17rem,340px)] lg:items-stretch lg:min-h-[560px]">
            {/* Main */}
            <div className="min-w-0 space-y-5 lg:h-full lg:min-h-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col overflow-hidden rounded-xl border border-primary/15 bg-white shadow-sm lg:h-full lg:min-h-0"
                >
                  <div className="px-5 md:px-6 py-4 border-b border-foreground/10 bg-white">
                    <div className="text-2xl font-serif text-foreground">
                      {step === 1
                        ? "Select a Service"
                        : step === 2
                          ? "Select Date & Time"
                          : step === 3
                            ? "Your Details"
                            : "Review Your Appointment"}
                    </div>
                    <div className="mt-1 text-sm text-foreground/55">
                      {step === 1
                        ? "Choose the perfect service for your special day. Prices include premium experience."
                        : step === 2
                          ? "Choose your preferred date and time for the appointment."
                          : step === 3
                            ? "Provide your information to continue."
                            : "Please review your appointment details and confirm your booking."}
                    </div>
                  </div>

                  <div
                    data-lenis-prevent
                    tabIndex={0}
                    className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-4 focus:outline-none sm:p-5 md:p-6 lg:[scrollbar-gutter:stable]"
                  >
                    {/* Step 1 */}
                    {step === 1 ? (
                      <div className="space-y-6">
                        <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(10rem,13.75rem)]">
                          <div className="relative">
                            <input
                              value={query}
                              onChange={(e) => setQuery(e.target.value)}
                              placeholder="Search services..."
                              className={inputClass}
                              aria-label="Search services"
                            />
                            <span className="pointer-events-none absolute right-4 top-1/2 hidden -translate-y-1/2 text-sm text-foreground/35 sm:inline">
                              ⌘K
                            </span>
                          </div>
                          <select
                            value={category}
                            onChange={(e) =>
                              setCategory(e.target.value as "All" | Service["category"])
                            }
                            className={inputClass}
                            aria-label="Service category"
                          >
                            <option value="All">All Categories</option>
                            <option value="Bridal">Bridal</option>
                            <option value="Engagement">Engagement</option>
                            <option value="Reception">Reception</option>
                            <option value="Party">Party</option>
                          </select>
                        </div>

                        <div>
                          <div className="flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-foreground/55">
                            <Sparkles size={14} className="text-primary" />
                            Popular Services
                          </div>
                          <div className="mt-4 grid grid-cols-[repeat(auto-fit,minmax(min(100%,13rem),1fr))] gap-4">
                            {filteredServices.slice(0, 3).map((s, i) => {
                              const selected = s.id === serviceId;
                              return (
                                <button
                                  key={s.id}
                                  type="button"
                                  onClick={() => setServiceId(s.id)}
                                  className={cn(
                                    "relative min-h-11 overflow-hidden rounded-2xl border text-left shadow-sm transition",
                                    selected
                                      ? "border-primary/50 ring-2 ring-primary/15"
                                      : "border-foreground/10 hover:border-primary/30"
                                  )}
                                >
                                  <div className="relative h-28 w-full overflow-hidden">
                                    <img
                                      src={s.image}
                                      alt={s.name}
                                      className="absolute inset-0 h-full w-full object-cover"
                                      loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
                                    {i === 0 ? (
                                      <span className="absolute left-3 top-3 rounded-full bg-primary text-primary-foreground px-3 py-1 text-[11px] font-mono tracking-widest uppercase">
                                        Most Popular
                                      </span>
                                    ) : null}
                                    <span
                                      className={cn(
                                        "absolute right-3 top-3 h-7 w-7 rounded-full flex items-center justify-center border",
                                        selected
                                          ? "bg-primary border-primary text-primary-foreground"
                                          : "bg-white/80 border-white/60 text-foreground/60"
                                      )}
                                      aria-hidden="true"
                                    >
                                      <Check size={16} className={selected ? "opacity-100" : "opacity-0"} />
                                    </span>
                                  </div>
                                  <div className="p-4">
                                    <div className="font-serif text-lg text-foreground">{s.name}</div>
                                    <div className="mt-1 text-sm text-foreground/60 line-clamp-2">
                                      {s.includes}
                                    </div>
                                    <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                                      <div className="text-xs text-foreground/55 font-mono tracking-widest uppercase">
                                        {s.durationHours} Hours
                                      </div>
                                      <div className="text-primary font-semibold">
                                        {formatINR(s.price)}
                                      </div>
                                    </div>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        <SectionCard title="All Services" icon={<Info size={18} />}>
                          <div className="space-y-3">
                            {filteredServices.map((s) => {
                              const selected = s.id === serviceId;
                              return (
                                <button
                                  key={s.id}
                                  type="button"
                                  onClick={() => setServiceId(s.id)}
                                  className={cn(
                                    "flex w-full min-w-0 flex-col gap-4 rounded-2xl border p-4 text-left transition sm:flex-row sm:items-center",
                                    selected
                                      ? "border-primary/40 bg-primary/5"
                                      : "border-foreground/10 hover:border-primary/25"
                                  )}
                                >
                                  <img
                                    src={s.image}
                                    alt=""
                                    className="h-16 w-full rounded-xl object-cover sm:h-14 sm:w-14"
                                    loading="lazy"
                                  />
                                  <div className="min-w-0 flex-1">
                                    <div className="font-semibold text-foreground">{s.name}</div>
                                    <div className="text-sm text-foreground/55 line-clamp-1">
                                      {s.includes}
                                    </div>
                                    <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-foreground/55">
                                      <span className="inline-flex items-center gap-1">
                                        <CalendarClock size={14} /> {s.durationHours} Hours
                                      </span>
                                      <span className="inline-flex items-center gap-1">
                                        <Sparkles size={14} /> Full Makeup
                                      </span>
                                    </div>
                                  </div>
                                  <div className="flex w-full shrink-0 items-center justify-between gap-3 text-left sm:block sm:w-auto sm:text-right">
                                    <div className="text-primary font-semibold">{formatINR(s.price)}</div>
                                    <div
                                      className={cn(
                                        "mt-2 h-5 w-5 rounded-full border flex items-center justify-center",
                                        selected
                                          ? "bg-primary border-primary text-primary-foreground"
                                          : "border-foreground/15"
                                      )}
                                    >
                                      {selected ? <Check size={14} /> : null}
                                    </div>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </SectionCard>

                        <SectionCard title="Additional Services (Add-ons)" icon={<Sparkles size={18} />}>
                          <div className="grid sm:grid-cols-2 gap-3">
                            {ADD_ONS.map((a) => {
                              const checked = addOns.includes(a.id);
                              return (
                                <button
                                  key={a.id}
                                  type="button"
                                  onClick={() =>
                                    setAddOns((prev) =>
                                      prev.includes(a.id)
                                        ? prev.filter((x) => x !== a.id)
                                        : [...prev, a.id]
                                    )
                                  }
                                  className={cn(
                                    "rounded-2xl border p-4 text-left flex items-center justify-between gap-3 transition",
                                    checked
                                      ? "border-primary/40 bg-primary/5"
                                      : "border-foreground/10 hover:border-primary/25"
                                  )}
                                >
                                  <div className="min-w-0">
                                    <div className="font-semibold text-foreground">{a.name}</div>
                                    <div className="text-sm text-foreground/55">{formatINR(a.price)}</div>
                                  </div>
                                  <span
                                    className={cn(
                                      "h-6 w-6 rounded-full border flex items-center justify-center",
                                      checked
                                        ? "bg-primary border-primary text-primary-foreground"
                                        : "border-foreground/15 text-transparent"
                                    )}
                                    aria-hidden="true"
                                  >
                                    <Check size={14} />
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        </SectionCard>

                        <details className="rounded-2xl border border-foreground/10 bg-white p-5">
                          <summary className="cursor-pointer list-none flex items-center justify-between gap-3">
                            <div>
                              <div className="font-serif text-lg text-foreground">Services &amp; Rates</div>
                              <div className="mt-1 text-sm text-foreground/60">
                                Full price list for bridal packages, add-ons, and charges.
                              </div>
                            </div>
                            <span className="text-primary font-mono text-xs tracking-[0.2em] uppercase">
                              View
                            </span>
                          </summary>
                          <div className="mt-5 space-y-5">
                            <div className="rounded-2xl border border-foreground/10 overflow-hidden">
                              <div className="px-4 py-3 bg-secondary/20 border-b border-foreground/10 font-semibold text-foreground">
                                Bridal Makeup Packages
                              </div>
                              <div className="responsive-scroll">
                                <table className="min-w-[680px] w-full text-sm">
                                  <thead className="text-foreground/60">
                                    <tr className="border-b border-foreground/10">
                                      <th className="text-left px-4 py-3 font-mono text-[11px] tracking-widest uppercase">
                                        Service
                                      </th>
                                      <th className="text-left px-4 py-3 font-mono text-[11px] tracking-widest uppercase">
                                        Duration
                                      </th>
                                      <th className="text-left px-4 py-3 font-mono text-[11px] tracking-widest uppercase">
                                        Includes
                                      </th>
                                      <th className="text-right px-4 py-3 font-mono text-[11px] tracking-widest uppercase">
                                        Price
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody className="text-foreground/80">
                                    {SERVICES.map((s) => (
                                      <tr key={s.id} className="border-b border-foreground/10 last:border-b-0">
                                        <td className="px-4 py-3 font-semibold text-foreground">{s.name}</td>
                                        <td className="px-4 py-3 text-foreground/70">{s.durationHours} Hours</td>
                                        <td className="px-4 py-3 text-foreground/70">{s.includes}</td>
                                        <td className="px-4 py-3 text-right font-semibold text-primary">
                                          {formatINR(s.price)}
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>

                            <div className="rounded-2xl border border-foreground/10 overflow-hidden">
                              <div className="px-4 py-3 bg-secondary/20 border-b border-foreground/10 font-semibold text-foreground">
                                Additional Services
                              </div>
                              <div className="responsive-scroll">
                                <table className="min-w-[520px] w-full text-sm">
                                  <thead className="text-foreground/60">
                                    <tr className="border-b border-foreground/10">
                                      <th className="text-left px-4 py-3 font-mono text-[11px] tracking-widest uppercase">
                                        Add-on Service
                                      </th>
                                      <th className="text-right px-4 py-3 font-mono text-[11px] tracking-widest uppercase">
                                        Price
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody className="text-foreground/80">
                                    {ADD_ONS.map((a) => (
                                      <tr key={a.id} className="border-b border-foreground/10 last:border-b-0">
                                        <td className="px-4 py-3 font-semibold text-foreground">{a.name}</td>
                                        <td className="px-4 py-3 text-right font-semibold text-primary">
                                          {formatINR(a.price)}
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </details>

                        {/* Rates, charges, policies */}
                        <div className="grid md:grid-cols-2 gap-5">
                          <div className="rounded-2xl border border-foreground/10 bg-white p-5">
                            <div className="font-serif text-lg text-foreground">Included In Premium Package</div>
                            <ul className="mt-4 space-y-2 text-sm text-foreground/70">
                              {PREMIUM_INCLUDES.map((x) => (
                                <li key={x} className="flex gap-3">
                                  <span className="mt-1 h-2 w-2 rounded-full bg-primary/70 shrink-0" />
                                  <span>{x}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="rounded-2xl border border-foreground/10 bg-white p-5">
                            <div className="font-serif text-lg text-foreground">Cancellation Policy</div>
                            <ul className="mt-4 space-y-2 text-sm text-foreground/70">
                              {CANCELLATION.map((x) => (
                                <li key={x} className="flex gap-3">
                                  <span className="mt-1 h-2 w-2 rounded-full bg-primary/70 shrink-0" />
                                  <span>{x}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="rounded-2xl border border-foreground/10 bg-white p-5">
                          <div className="font-serif text-lg text-foreground">Additional Charges</div>
                          <div className="mt-4 grid sm:grid-cols-2 gap-3">
                            {CHARGES.map((c) => (
                              <div key={c.type} className="rounded-2xl border border-foreground/10 p-4 bg-secondary/20">
                                <div className="font-semibold text-foreground">{c.type}</div>
                                <div className="mt-1 text-sm text-foreground/60">{c.detail}</div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex flex-col items-stretch justify-end gap-3 pt-2 sm:flex-row">
                          <button
                            type="button"
                            onClick={() => setStep(2)}
                            disabled={!canContinueFromStep1}
                            className={cn(
                              "inline-flex min-h-11 w-full items-center justify-center gap-3 rounded-xl px-5 py-4 text-center font-mono text-xs uppercase tracking-[0.14em] transition sm:w-auto sm:px-6 sm:text-sm sm:tracking-[0.2em]",
                              canContinueFromStep1
                                ? "bg-primary text-primary-foreground hover:bg-accent"
                                : "bg-foreground/10 text-foreground/40 cursor-not-allowed"
                            )}
                          >
                            Continue to Date &amp; Time <ChevronRight size={18} />
                          </button>
                        </div>
                      </div>
                    ) : null}

                    {/* Step 2 */}
                    {step === 2 ? (
                      <div className="space-y-6">
                        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(14rem,17.5rem)]">
                          <div className="rounded-2xl border border-foreground/10 bg-white">
                            <Calendar
                              mode="single"
                              selected={selectedDate}
                              onSelect={(d) => setSelectedDate(d)}
                              className="booking-calendar w-full p-2 sm:p-4"
                            />
                          </div>
                          <div className="rounded-2xl border border-foreground/10 bg-primary/5 p-5">
                            <div className="font-mono text-[11px] tracking-widest uppercase text-foreground/55">
                              Selected Date
                            </div>
                            <div className="mt-3 font-semibold text-foreground">
                              {selectedDate ? format(selectedDate, "EEE, dd MMM yyyy") : "—"}
                            </div>
                            <div className="mt-5 pt-5 border-t border-foreground/10">
                              <div className="font-mono text-[11px] tracking-widest uppercase text-foreground/55">
                                Time Zone
                              </div>
                              <div className="mt-2 text-sm text-foreground/70">IST (UTC +05:30)</div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <div className="font-semibold text-foreground">Available Time Slots</div>
                          <div className="mt-4 grid grid-cols-[repeat(auto-fit,minmax(min(100%,7.25rem),1fr))] gap-3">
                            {TIME_SLOTS.map((t) => {
                              const selected = t === selectedTime;
                              return (
                                <button
                                  key={t}
                                  type="button"
                                  onClick={() => setSelectedTime(t)}
                                  className={cn(
                                    "min-h-11 rounded-xl border px-3 py-3 text-sm font-semibold transition",
                                    selected
                                      ? "bg-primary border-primary text-primary-foreground"
                                      : "bg-white border-foreground/10 text-foreground hover:border-primary/30"
                                  )}
                                >
                                  {t}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        <div className="flex flex-col gap-4 rounded-2xl border border-foreground/10 bg-primary/5 p-5 sm:flex-row sm:items-center sm:justify-between">
                          <div className="flex min-w-0 items-center gap-3">
                            <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                              <CalendarClock size={18} />
                            </div>
                            <div>
                              <div className="font-semibold text-foreground">
                                Duration: {selectedService?.durationHours ?? "—"} Hours
                              </div>
                              <div className="text-sm text-foreground/60">
                                Your appointment end time is shown after confirmation.
                              </div>
                            </div>
                          </div>
                          <div className="shrink-0 text-sm font-mono uppercase tracking-widest text-foreground/55">
                            Step 2 of 4
                          </div>
                        </div>

                        <div className="flex flex-col-reverse items-stretch justify-between gap-3 pt-2 sm:flex-row sm:items-center">
                          <button
                            type="button"
                            onClick={goBack}
                            className="inline-flex min-h-11 items-center justify-center rounded-xl border border-foreground/15 bg-white px-5 py-4 font-mono text-xs uppercase tracking-[0.14em] transition hover:bg-secondary/20 sm:px-6 sm:text-sm sm:tracking-[0.2em]"
                          >
                            Back
                          </button>
                          <button
                            type="button"
                            onClick={() => setStep(3)}
                            disabled={!canContinueFromStep2}
                            className={cn(
                              "inline-flex min-h-11 items-center justify-center gap-3 rounded-xl px-5 py-4 text-center font-mono text-xs uppercase tracking-[0.14em] transition sm:px-6 sm:text-sm sm:tracking-[0.2em]",
                              canContinueFromStep2
                                ? "bg-primary text-primary-foreground hover:bg-accent"
                                : "bg-foreground/10 text-foreground/40 cursor-not-allowed"
                            )}
                          >
                            Continue to Details <ChevronRight size={18} />
                          </button>
                        </div>
                      </div>
                    ) : null}

                    {/* Step 3 */}
                    {step === 3 ? (
                      <div className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-5">
                          <Field label="Full Name" required>
                            <input
                              className={inputClass}
                              value={details.name}
                              onChange={(e) => setDetails((d) => ({ ...d, name: e.target.value }))}
                              placeholder="Your name"
                            />
                          </Field>
                          <Field label="Email Address" required>
                            <input
                              className={inputClass}
                              value={details.email}
                              onChange={(e) => setDetails((d) => ({ ...d, email: e.target.value }))}
                              placeholder="you@email.com"
                              type="email"
                            />
                          </Field>
                          <Field label="Phone Number" required>
                            <input
                              className={inputClass}
                              value={details.phone}
                              onChange={(e) => setDetails((d) => ({ ...d, phone: e.target.value }))}
                              placeholder="+91 98765 43210"
                              type="tel"
                            />
                          </Field>
                          <Field label="Pincode">
                            <input
                              className={inputClass}
                              value={details.pincode}
                              onChange={(e) => setDetails((d) => ({ ...d, pincode: e.target.value }))}
                              placeholder="600001"
                              inputMode="numeric"
                            />
                          </Field>
                        </div>

                        <div className="grid md:grid-cols-2 gap-5">
                          <Field label="Address Line 1">
                            <input
                              className={inputClass}
                              value={details.addressLine1}
                              onChange={(e) =>
                                setDetails((d) => ({ ...d, addressLine1: e.target.value }))
                              }
                              placeholder="House no, street"
                            />
                          </Field>
                          <Field label="Address Line 2 (Optional)">
                            <input
                              className={inputClass}
                              value={details.addressLine2}
                              onChange={(e) =>
                                setDetails((d) => ({ ...d, addressLine2: e.target.value }))
                              }
                              placeholder="Landmark, area"
                            />
                          </Field>
                          <Field label="City">
                            <input
                              className={inputClass}
                              value={details.city}
                              onChange={(e) => setDetails((d) => ({ ...d, city: e.target.value }))}
                              placeholder="Chennai"
                            />
                          </Field>
                          <Field label="State">
                            <input
                              className={inputClass}
                              value={details.state}
                              onChange={(e) => setDetails((d) => ({ ...d, state: e.target.value }))}
                              placeholder="Tamil Nadu"
                            />
                          </Field>
                        </div>

                        <Field label="Any special requests or notes? (Optional)">
                          <textarea
                            className={cn(inputClass, "min-h-[110px] resize-none")}
                            value={details.notes}
                            onChange={(e) => setDetails((d) => ({ ...d, notes: e.target.value }))}
                            placeholder="Example: I prefer soft tones / sensitive skin / any allergies..."
                          />
                        </Field>

                          <div className="rounded-2xl border border-foreground/10 bg-secondary/20 p-5 flex items-start gap-3">
                          <div className="h-9 w-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                            <ShieldCheck size={18} />
                          </div>
                          <div>
                            <div className="font-semibold text-foreground">We value your privacy</div>
                            <div className="mt-1 text-sm text-foreground/60">
                              Your information is safe with us and will only be used for appointment purposes.
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col-reverse items-stretch justify-between gap-3 pt-2 sm:flex-row sm:items-center">
                          <button
                            type="button"
                            onClick={goBack}
                            className="inline-flex min-h-11 items-center justify-center rounded-xl border border-foreground/15 bg-white px-5 py-4 font-mono text-xs uppercase tracking-[0.14em] transition hover:bg-secondary/20 sm:px-6 sm:text-sm sm:tracking-[0.2em]"
                          >
                            Back
                          </button>
                          <button
                            type="button"
                            onClick={() => setStep(4)}
                            disabled={!canContinueFromStep3}
                            className={cn(
                              "inline-flex min-h-11 items-center justify-center gap-3 rounded-xl px-5 py-4 text-center font-mono text-xs uppercase tracking-[0.14em] transition sm:px-6 sm:text-sm sm:tracking-[0.2em]",
                              canContinueFromStep3
                                ? "bg-primary text-primary-foreground hover:bg-accent"
                                : "bg-foreground/10 text-foreground/40 cursor-not-allowed"
                            )}
                          >
                            Continue to Review <ChevronRight size={18} />
                          </button>
                        </div>
                      </div>
                    ) : null}

                    {/* Step 4 */}
                    {step === 4 ? (
                      <div className="space-y-6">
                        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 flex items-start gap-3">
                          <div className="h-9 w-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                            <CheckCircle2 size={18} />
                          </div>
                          <div>
                            <div className="font-semibold text-foreground">Almost Done!</div>
                            <div className="mt-1 text-sm text-foreground/60">
                              Please review your appointment details and confirm your booking.
                            </div>
                          </div>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-5">
                          <SectionCard title="Service" icon={<Sparkles size={18} />}>
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                              {selectedService ? (
                                <>
                                  <img
                                    src={selectedService.image}
                                    alt=""
                                    className="h-16 w-full rounded-xl object-cover sm:h-14 sm:w-14"
                                  />
                                  <div className="min-w-0 flex-1">
                                    <div className="font-semibold text-foreground">{selectedService.name}</div>
                                    <div className="text-sm text-foreground/55">
                                      {selectedService.includes}
                                    </div>
                                    <div className="mt-2 text-xs text-foreground/55 font-mono tracking-widest uppercase">
                                      {selectedService.durationHours} Hours
                                    </div>
                                  </div>
                                  <div className="shrink-0 text-left sm:text-right">
                                    <div className="text-primary font-semibold">
                                      {formatINR(selectedService.price)}
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => setStep(1)}
                                      className="mt-2 text-xs font-mono tracking-widest uppercase text-primary hover:underline"
                                    >
                                      Edit
                                    </button>
                                  </div>
                                </>
                              ) : (
                                <div className="text-sm text-foreground/60">No service selected.</div>
                              )}
                            </div>
                          </SectionCard>

                          <SectionCard title="Date & Time" icon={<CalendarClock size={18} />}>
                            <div className="flex min-w-0 items-start justify-between gap-4">
                              <div>
                                <div className="text-sm text-foreground/55">Date</div>
                                <div className="mt-1 font-semibold text-foreground">
                                  {selectedDate ? format(selectedDate, "EEE, dd MMM yyyy") : "—"}
                                </div>
                                <div className="mt-4 text-sm text-foreground/55">Time</div>
                                <div className="mt-1 font-semibold text-foreground">{selectedTime ?? "—"}</div>
                              </div>
                              <button
                                type="button"
                                onClick={() => setStep(2)}
                                className="text-xs font-mono tracking-widest uppercase text-primary hover:underline"
                              >
                                Edit
                              </button>
                            </div>
                          </SectionCard>
                        </div>

                        <SectionCard title="Details" icon={<User size={18} />}>
                          <div className="grid md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <div className="text-foreground/55">Name</div>
                              <div className="mt-1 font-semibold text-foreground">{details.name || "—"}</div>
                            </div>
                            <div>
                              <div className="text-foreground/55">Phone</div>
                              <div className="mt-1 font-semibold text-foreground">{details.phone || "—"}</div>
                            </div>
                            <div>
                              <div className="text-foreground/55">Email</div>
                              <div className="mt-1 font-semibold text-foreground">{details.email || "—"}</div>
                            </div>
                            <div>
                              <div className="text-foreground/55">Address</div>
                              <div className="mt-1 font-semibold text-foreground">
                                {[
                                  details.addressLine1,
                                  details.addressLine2,
                                  details.city,
                                  details.state,
                                  details.pincode,
                                ]
                                  .filter(Boolean)
                                  .join(", ") || "—"}
                              </div>
                            </div>
                          </div>
                          {details.notes.trim().length ? (
                            <div className="mt-4 rounded-2xl border border-foreground/10 bg-secondary/20 p-4 text-sm text-foreground/70">
                              <div className="font-semibold text-foreground">Special Requests</div>
                              <div className="mt-1">{details.notes}</div>
                            </div>
                          ) : null}
                          <div className="mt-4 flex items-center justify-end">
                            <button
                              type="button"
                              onClick={() => setStep(3)}
                              className="text-xs font-mono tracking-widest uppercase text-primary hover:underline"
                            >
                              Edit
                            </button>
                          </div>
                        </SectionCard>

                        <SectionCard title="Payment Summary" icon={<CreditCard size={18} />}>
                          <div className="space-y-3 text-sm">
                            <div className="flex items-center justify-between">
                              <span className="text-foreground/60">Service Charges</span>
                              <span className="font-semibold text-foreground">{formatINR(serviceTotal)}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-foreground/60">Add-ons & Extras</span>
                              <span className="font-semibold text-foreground">{formatINR(addOnTotal)}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-foreground/60">Taxes (18% GST)</span>
                              <span className="font-semibold text-foreground">{formatINR(tax)}</span>
                            </div>
                            <div className="pt-3 mt-3 border-t border-foreground/10 flex items-center justify-between">
                              <span className="text-foreground font-semibold">Total Amount</span>
                              <span className="text-primary font-semibold">{formatINR(total)}</span>
                            </div>
                          </div>

                          <div className="mt-6">
                            <div className="font-semibold text-foreground">Select Payment Method</div>
                            <div className="mt-3 grid grid-cols-[repeat(auto-fit,minmax(min(100%,8rem),1fr))] gap-3">
                              {(
                                [
                                  { id: "upi" as const, label: "UPI / QR", icon: <Wallet size={16} /> },
                                  { id: "card" as const, label: "Card", icon: <CreditCard size={16} /> },
                                  { id: "netbanking" as const, label: "Net Banking", icon: <ShieldCheck size={16} /> },
                                  { id: "wallet" as const, label: "Wallets", icon: <Phone size={16} /> },
                                ] as const
                              ).map((m) => {
                                const selected = paymentMethod === m.id;
                                return (
                                  <button
                                    key={m.id}
                                    type="button"
                                    onClick={() => setPaymentMethod(m.id)}
                                    className={cn(
                                      "flex min-h-11 items-center gap-2 rounded-xl border px-3 py-3 text-left transition",
                                      selected
                                        ? "border-primary/40 bg-primary/5"
                                        : "border-foreground/10 bg-white hover:border-primary/25"
                                    )}
                                  >
                                    <span
                                      className={cn(
                                        "h-7 w-7 rounded-lg flex items-center justify-center",
                                        selected
                                          ? "bg-primary text-primary-foreground"
                                          : "bg-secondary/30 text-foreground/70"
                                      )}
                                    >
                                      {m.icon}
                                    </span>
                                    <span className="min-w-0 font-mono text-[11px] uppercase tracking-widest text-foreground/70">
                                      {m.label}
                                    </span>
                                  </button>
                                );
                              })}
                            </div>

                            <div className="mt-4 rounded-2xl border border-foreground/10 bg-secondary/20 p-4 flex items-start gap-3">
                              <div className="h-9 w-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                <ShieldCheck size={18} />
                              </div>
                              <div>
                                <div className="font-semibold text-foreground">Secure &amp; Trusted</div>
                                <div className="mt-1 text-sm text-foreground/60">
                                  Your payment information is encrypted and secure. We never store your card details.
                                </div>
                              </div>
                            </div>
                          </div>
                        </SectionCard>

                        <div className="flex flex-col-reverse items-stretch justify-between gap-3 pt-2 sm:flex-row sm:items-center">
                          <button
                            type="button"
                            onClick={goBack}
                            className="inline-flex min-h-11 items-center justify-center rounded-xl border border-foreground/15 bg-white px-5 py-4 font-mono text-xs uppercase tracking-[0.14em] transition hover:bg-secondary/20 sm:px-6 sm:text-sm sm:tracking-[0.2em]"
                          >
                            Back
                          </button>
                          <button
                            type="button"
                            onClick={onConfirm}
                            disabled={submitting}
                            className={cn(
                              "inline-flex min-h-11 items-center justify-center gap-3 rounded-xl px-5 py-4 text-center font-mono text-xs uppercase tracking-[0.14em] transition sm:px-7 sm:text-sm sm:tracking-[0.2em]",
                              submitting
                                ? "bg-primary/60 text-primary-foreground cursor-wait"
                                : "bg-primary text-primary-foreground hover:bg-accent"
                            )}
                          >
                            {submitting ? "Opening WhatsApp..." : "Send to WhatsApp"}
                          </button>
                        </div>

                        <AnimatePresence>
                          {submitted ? (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 flex items-center gap-3"
                            >
                              <CheckCircle2 className="text-emerald-600" />
                              <div className="font-semibold text-foreground">
                                Booking confirmed! We’ll contact you shortly.
                              </div>
                            </motion.div>
                          ) : null}
                        </AnimatePresence>
                      </div>
                    ) : null}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Sidebar */}
            <aside
              data-lenis-prevent
              tabIndex={0}
              className="min-w-0 space-y-4 overflow-y-auto overscroll-contain focus:outline-none lg:h-full lg:min-h-0 lg:pr-1 lg:[scrollbar-gutter:stable]"
            >
              <div className="rounded-xl border border-primary/15 bg-white shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-foreground/10 font-serif text-lg">
                  Booking Summary
                </div>
                <div className="p-5 space-y-4">
                  <div className="rounded-2xl border border-foreground/10 p-4">
                    <div className="font-mono text-[11px] tracking-widest uppercase text-foreground/55">
                      Your Selection
                    </div>
                    {selectedService ? (
                      <div className="mt-3 flex min-w-0 flex-col gap-3 sm:flex-row sm:items-start">
                        <img
                          src={selectedService.image}
                          alt=""
                          className="h-16 w-full rounded-xl object-cover sm:h-14 sm:w-14"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="font-semibold text-foreground">{selectedService.name}</div>
                          <div className="text-sm text-foreground/55">{selectedService.category} Package</div>
                          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-foreground/55">
                            <span className="inline-flex items-center gap-1">
                              <CalendarClock size={14} /> {selectedService.durationHours} Hours
                            </span>
                            <span className="inline-flex items-center gap-1">
                              <Sparkles size={14} /> Full Makeup
                            </span>
                          </div>
                        </div>
                        <div className="shrink-0 text-left sm:text-right">
                          <div className="text-primary font-semibold">
                            {formatINR(selectedService.price)}
                          </div>
                          {step !== 1 ? (
                            <button
                              type="button"
                              onClick={() => setStep(1)}
                              className="mt-2 text-xs font-mono tracking-widest uppercase text-primary hover:underline"
                            >
                              Change
                            </button>
                          ) : null}
                        </div>
                      </div>
                    ) : (
                      <div className="mt-3 text-sm text-foreground/60">
                        Select a service to get started.
                      </div>
                    )}
                  </div>

                  <div className="rounded-2xl border border-foreground/10 p-4">
                    <div className="font-mono text-[11px] tracking-widest uppercase text-foreground/55">
                      Appointment Details
                    </div>
                    <div className="mt-3 space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-foreground/70">
                        <CalendarClock size={16} className="text-primary" />
                        <span>
                          {selectedDate ? format(selectedDate, "EEE, dd MMM yyyy") : "Select a date"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-foreground/70">
                        <CheckCircle2 size={16} className="text-primary" />
                        <span>{selectedTime ?? "Select a time slot"}</span>
                      </div>
                    </div>
                    {step > 2 ? (
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="mt-3 text-xs font-mono tracking-widest uppercase text-primary hover:underline"
                      >
                        Change
                      </button>
                    ) : null}
                  </div>

                  <div className="rounded-2xl border border-foreground/10 p-4">
                    <div className="font-mono text-[11px] tracking-widest uppercase text-foreground/55">
                      What&apos;s Included
                    </div>
                    <ul className="mt-3 space-y-2 text-sm text-foreground/70">
                      {PREMIUM_INCLUDES.slice(0, 6).map((x) => (
                        <li key={x} className="flex gap-3">
                          <CheckCircle2 size={16} className="text-primary" />
                          <span>{x}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-foreground/10 p-4">
                    <div className="font-mono text-[11px] tracking-widest uppercase text-foreground/55">
                      Why Choose Us?
                    </div>
                    <div className="mt-3 space-y-3 text-sm text-foreground/70">
                      <div className="flex gap-3">
                        <span className="h-9 w-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                          <ShieldCheck size={18} />
                        </span>
                        <div>
                          <div className="font-semibold text-foreground">Experienced Professionals</div>
                          <div className="text-foreground/60">10+ years of bridal expertise</div>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <span className="h-9 w-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                          <Sparkles size={18} />
                        </span>
                        <div>
                          <div className="font-semibold text-foreground">Premium Products</div>
                          <div className="text-foreground/60">Skin-friendly, high quality brands</div>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <span className="h-9 w-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                          <ShieldCheck size={18} />
                        </span>
                        <div>
                          <div className="font-semibold text-foreground">Hygienic &amp; Safe</div>
                          <div className="text-foreground/60">Strict hygiene protocol for your safety</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-foreground/10 p-4 bg-primary/5">
                    <div className="flex items-start gap-3">
                      <span className="h-9 w-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <MapPin size={18} />
                      </span>
                      <div>
                        <div className="font-semibold text-foreground">Need Help?</div>
                        <div className="mt-1 text-sm text-foreground/60">
                          Have questions? We&apos;re here to help.
                        </div>
                        <button
                          type="button"
                          className="mt-3 w-full rounded-xl border border-primary/25 bg-white px-4 py-3 font-mono text-xs tracking-[0.2em] uppercase text-primary hover:bg-primary/5 transition"
                        >
                          Contact Support
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 flex items-start gap-3">
                    <span className="h-9 w-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                      <CheckCircle2 size={18} />
                    </span>
                    <div>
                      <div className="font-semibold text-foreground">Hassle-Free Booking</div>
                      <div className="mt-1 text-sm text-foreground/60">
                        Easy reschedule and cancellation up to 48 hours before your appointment.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
