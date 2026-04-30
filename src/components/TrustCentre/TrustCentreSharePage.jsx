// import React, { useState, useEffect, useCallback } from "react";
// import { useParams } from "react-router-dom";

// // ─────────────────────────────────────────────────────────────────────────────
// // Constants
// // ─────────────────────────────────────────────────────────────────────────────
// // CORRECT — split into two constants
// const TC_BASE    = `${process.env.REACT_APP_TRUST_CENTRE_URL}/api`;
// const AR_PUBLIC  = `${process.env.REACT_APP_TRUST_CENTRE_URL}/api/access-requests`;

// // ─────────────────────────────────────────────────────────────────────────────
// // Compliance badge colours
// // ─────────────────────────────────────────────────────────────────────────────
// const COMPLIANCE_COLORS = {
//   SOC2:     { bg: "#eff6ff", text: "#1d4ed8", border: "#bfdbfe" },
//   ISO27001: { bg: "#f0fdf4", text: "#15803d", border: "#bbf7d0" },
//   ISO:      { bg: "#f0fdf4", text: "#15803d", border: "#bbf7d0" },
//   HIPAA:    { bg: "#fdf4ff", text: "#7e22ce", border: "#e9d5ff" },
//   GDPR:     { bg: "#fff7ed", text: "#c2410c", border: "#fed7aa" },
//   PCI:      { bg: "#fefce8", text: "#a16207", border: "#fef08a" },
//   DEFAULT:  { bg: "#f8fafc", text: "#475569", border: "#e2e8f0" },
// };

// const getComplianceColor = (label = "") => {
//   const upper = label.toUpperCase();
//   const key = Object.keys(COMPLIANCE_COLORS).find((k) => upper.includes(k));
//   return COMPLIANCE_COLORS[key] || COMPLIANCE_COLORS.DEFAULT;
// };

// // ─────────────────────────────────────────────────────────────────────────────
// // Inline SVG icons (no extra dep)
// // ─────────────────────────────────────────────────────────────────────────────
// const Icon = {
//   Shield:    () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
//   Check:     () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>,
//   Lock:      () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
//   File:      () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>,
//   Globe:     () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
//   External:  () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>,
//   Building:  () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
//   Users:     () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
//   X:         () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
//   KeyRound:  () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3L22 7l-3-3"/></svg>,
//   Sparkle:   () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L9.1 9.1 2 12l7.1 2.9L12 22l2.9-7.1L22 12l-7.1-2.9z"/></svg>,
// };

// // ─────────────────────────────────────────────────────────────────────────────
// // Stat Pill
// // ─────────────────────────────────────────────────────────────────────────────
// const StatPill = ({ icon: IconComp, label, value, gradient }) => (
//   <div style={{
//     display: "flex", alignItems: "center", gap: 10,
//     padding: "10px 16px",
//     background: "rgba(255,255,255,0.1)",
//     backdropFilter: "blur(12px)",
//     border: "1px solid rgba(255,255,255,0.18)",
//     borderRadius: 12,
//   }}>
//     <div style={{
//       width: 34, height: 34, borderRadius: 9,
//       background: gradient,
//       display: "flex", alignItems: "center", justifyContent: "center",
//       flexShrink: 0, color: "white",
//     }}>
//       <IconComp />
//     </div>
//     <div>
//       <div style={{ fontSize: 19, fontWeight: 800, color: "white", lineHeight: 1 }}>{value}</div>
//       <div style={{ fontSize: 10, color: "rgba(255,255,255,0.7)", fontWeight: 600, letterSpacing: "0.04em", marginTop: 2 }}>{label}</div>
//     </div>
//   </div>
// );

// // ─────────────────────────────────────────────────────────────────────────────
// // Section Card
// // ─────────────────────────────────────────────────────────────────────────────
// const SectionCard = ({ title, iconComp, accentColor, children, delay = 0 }) => (
//   <div style={{
//     background: "white",
//     borderRadius: 18,
//     boxShadow: "0 2px 20px rgba(0,0,0,0.06)",
//     border: "1px solid #f0f4f8",
//     overflow: "hidden",
//     animation: `fadeUp 0.5s ease ${delay}s both`,
//   }}>
//     <div style={{
//       display: "flex", alignItems: "center", gap: 10,
//       padding: "14px 20px",
//       borderBottom: "1px solid #f0f4f8",
//       background: "linear-gradient(to right, #fafbfd, #ffffff)",
//     }}>
//       <div style={{
//         width: 34, height: 34, borderRadius: 9,
//         background: accentColor,
//         display: "flex", alignItems: "center",
//         justifyContent: "center", color: "white",
//         flexShrink: 0,
//       }}>
//         <iconComp.type {...iconComp.props} width={16} height={16} />
//       </div>
//       <span style={{ fontWeight: 700, fontSize: 14, color: "#1a2332", letterSpacing: "-0.01em" }}>{title}</span>
//     </div>
//     <div style={{ padding: "18px 20px" }}>{children}</div>
//   </div>
// );

// // ─────────────────────────────────────────────────────────────────────────────
// // Request Access Modal
// // ─────────────────────────────────────────────────────────────────────────────
// function RequestAccessModal({ shareToken, companyName, onClose, onSuccess }) {
//   const [form, setForm] = useState({
//     requesterName: "",
//     requesterEmail: "",
//     requesterCompany: "",
//     message: "",
//   });
//   const [submitting, setSubmitting] = useState(false);
//   const [errors, setErrors]         = useState({});

//   const validate = () => {
//     const e = {};
//     if (!form.requesterName.trim())  e.requesterName  = "Name is required";
//     if (!form.requesterEmail.trim()) e.requesterEmail = "Email is required";
//     else if (!/\S+@\S+\.\S+/.test(form.requesterEmail))
//       e.requesterEmail = "Enter a valid email";
//     return e;
//   };

//   const handleSubmit = async () => {
//     const e = validate();
//     if (Object.keys(e).length) { setErrors(e); return; }
//     setSubmitting(true);
//     try {
//       const res = await fetch(
//         `${AR_PUBLIC}/public?shareToken=${encodeURIComponent(shareToken)}`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             ...form,
//             requesterType: "CUSTOMER_COMPANY",
//           }),
//         }
//       );
//       if (!res.ok) throw new Error("Failed");
//       onSuccess();
//     } catch {
//       setErrors({ submit: "Something went wrong. Please try again." });
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const field = (key, placeholder, type = "text", multiline = false) => (
//     <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
//       {multiline ? (
//         <textarea
//           placeholder={placeholder}
//           value={form[key]}
//           onChange={(e) => { setForm((f) => ({ ...f, [key]: e.target.value })); setErrors((er) => ({ ...er, [key]: undefined })); }}
//           rows={3}
//           style={{
//             padding: "10px 14px", borderRadius: 10, fontSize: 14,
//             border: errors[key] ? "1.5px solid #ef4444" : "1.5px solid #e2e8f0",
//             outline: "none", resize: "vertical", fontFamily: "inherit",
//             background: "#fafbfd", color: "#1a2332", transition: "border 0.2s",
//           }}
//         />
//       ) : (
//         <input
//           type={type}
//           placeholder={placeholder}
//           value={form[key]}
//           onChange={(e) => { setForm((f) => ({ ...f, [key]: e.target.value })); setErrors((er) => ({ ...er, [key]: undefined })); }}
//           style={{
//             padding: "10px 14px", borderRadius: 10, fontSize: 14,
//             border: errors[key] ? "1.5px solid #ef4444" : "1.5px solid #e2e8f0",
//             outline: "none", fontFamily: "inherit",
//             background: "#fafbfd", color: "#1a2332", transition: "border 0.2s",
//           }}
//         />
//       )}
//       {errors[key] && (
//         <span style={{ fontSize: 12, color: "#ef4444", paddingLeft: 2 }}>{errors[key]}</span>
//       )}
//     </div>
//   );

//   return (
//     // Backdrop
//     <div
//       onClick={onClose}
//       style={{
//         position: "fixed", inset: 0, zIndex: 1000,
//         background: "rgba(10,20,40,0.55)",
//         backdropFilter: "blur(6px)",
//         display: "flex", alignItems: "center", justifyContent: "center",
//         padding: 20,
//         animation: "fadeIn 0.2s ease",
//       }}
//     >
//       {/* Modal */}
//       <div
//         onClick={(e) => e.stopPropagation()}
//         style={{
//           background: "white", borderRadius: 20,
//           width: "100%", maxWidth: 460,
//           boxShadow: "0 24px 80px rgba(0,0,0,0.18)",
//           overflow: "hidden",
//           animation: "slideUp 0.3s cubic-bezier(0.34,1.56,0.64,1)",
//         }}
//       >
//         {/* Header */}
//         <div style={{
//           padding: "22px 24px 18px",
//           background: "linear-gradient(135deg, #0f2444 0%, #1a56db 100%)",
//           position: "relative",
//         }}>
//           <button
//             onClick={onClose}
//             style={{
//               position: "absolute", top: 16, right: 16,
//               background: "rgba(255,255,255,0.15)", border: "none",
//               borderRadius: 8, width: 32, height: 32,
//               display: "flex", alignItems: "center", justifyContent: "center",
//               cursor: "pointer", color: "white",
//             }}
//           >
//             <Icon.X />
//           </button>
//           <div style={{
//             width: 44, height: 44, borderRadius: 12,
//             background: "rgba(255,255,255,0.15)",
//             display: "flex", alignItems: "center", justifyContent: "center",
//             marginBottom: 12, color: "white",
//           }}>
//             <Icon.KeyRound />
//           </div>
//           <h2 style={{ margin: 0, color: "white", fontSize: 18, fontWeight: 800, letterSpacing: "-0.02em" }}>
//             Request Policy Access
//           </h2>
//           <p style={{ margin: "6px 0 0", color: "rgba(255,255,255,0.75)", fontSize: 13 }}>
//             Submit your details to request full access to <strong style={{ color: "white" }}>{companyName}</strong>'s policy documents.
//           </p>
//         </div>

//         {/* Body */}
//         <div style={{ padding: "22px 24px", display: "flex", flexDirection: "column", gap: 14 }}>
//           {errors.submit && (
//             <div style={{
//               padding: "10px 14px", borderRadius: 10,
//               background: "#fef2f2", border: "1px solid #fecaca",
//               color: "#dc2626", fontSize: 13,
//             }}>
//               {errors.submit}
//             </div>
//           )}

//           <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
//             {field("requesterName",    "Full name *")}
//             {field("requesterCompany", "Company")}
//           </div>
//           {field("requesterEmail",   "Work email *", "email")}
//           {field("message", "Why do you need access? (optional)", "text", true)}

//           <p style={{ margin: 0, fontSize: 12, color: "#94a3b8", lineHeight: 1.5 }}>
//             Your request will be reviewed by the {companyName} team. No account required.
//           </p>

//           <button
//             onClick={handleSubmit}
//             disabled={submitting}
//             style={{
//               padding: "13px 20px",
//               background: submitting
//                 ? "#93c5fd"
//                 : "linear-gradient(135deg, #1a56db 0%, #0f2444 100%)",
//               color: "white", border: "none", borderRadius: 12,
//               fontWeight: 700, fontSize: 15, cursor: submitting ? "default" : "pointer",
//               letterSpacing: "-0.01em", transition: "opacity 0.2s",
//               display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
//             }}
//           >
//             {submitting ? (
//               <>
//                 <span style={{
//                   width: 16, height: 16, border: "2px solid rgba(255,255,255,0.4)",
//                   borderTop: "2px solid white", borderRadius: "50%",
//                   display: "inline-block", animation: "spin 0.8s linear infinite",
//                 }} />
//                 Submitting…
//               </>
//             ) : "Submit Request"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ─────────────────────────────────────────────────────────────────────────────
// // Success State Modal
// // ─────────────────────────────────────────────────────────────────────────────
// function SuccessModal({ companyName, onClose }) {
//   return (
//     <div
//       onClick={onClose}
//       style={{
//         position: "fixed", inset: 0, zIndex: 1000,
//         background: "rgba(10,20,40,0.55)",
//         backdropFilter: "blur(6px)",
//         display: "flex", alignItems: "center", justifyContent: "center",
//         padding: 20, animation: "fadeIn 0.2s ease",
//       }}
//     >
//       <div
//         onClick={(e) => e.stopPropagation()}
//         style={{
//           background: "white", borderRadius: 20, width: "100%", maxWidth: 400,
//           padding: "36px 32px", textAlign: "center",
//           boxShadow: "0 24px 80px rgba(0,0,0,0.18)",
//           animation: "slideUp 0.3s cubic-bezier(0.34,1.56,0.64,1)",
//         }}
//       >
//         <div style={{
//           width: 64, height: 64, borderRadius: 20,
//           background: "linear-gradient(135deg, #10b981, #059669)",
//           display: "flex", alignItems: "center", justifyContent: "center",
//           margin: "0 auto 16px", fontSize: 28,
//         }}>
//           ✅
//         </div>
//         <h2 style={{ margin: "0 0 8px", fontSize: 20, fontWeight: 800, color: "#1a2332", letterSpacing: "-0.02em" }}>
//           Request Sent!
//         </h2>
//         <p style={{ margin: "0 0 20px", color: "#64748b", fontSize: 14, lineHeight: 1.6 }}>
//           The <strong>{companyName}</strong> team has received your request and will review it shortly.
//           You'll hear back via the email you provided.
//         </p>
//         <button
//           onClick={onClose}
//           style={{
//             padding: "11px 28px", background: "#f1f5f9",
//             border: "none", borderRadius: 10,
//             fontWeight: 600, fontSize: 14, cursor: "pointer", color: "#475569",
//           }}
//         >
//           Close
//         </button>
//       </div>
//     </div>
//   );
// }

// // ─────────────────────────────────────────────────────────────────────────────
// // Main Page
// // ─────────────────────────────────────────────────────────────────────────────
// export default function TrustCentreSharePage({ match }) {
//   const shareToken = match?.params?.shareToken || useParams()?.shareToken;

//   const [tc,          setTc]          = useState(null);
//   const [loading,     setLoading]     = useState(true);
//   const [error,       setError]       = useState(false);
//   const [modalOpen,   setModalOpen]   = useState(false);
//   const [submitted,   setSubmitted]   = useState(false);

//   const load = useCallback(async () => {
//     setLoading(true);
//     setError(false);
//     try {
//       const res = await fetch(`${TC_BASE}/preview/share/${shareToken}`);
//       if (!res.ok) throw new Error("Not found");
//       const data = await res.json();
//       setTc(data);
//     } catch {
//       setError(true);
//     } finally {
//       setLoading(false);
//     }
//   }, [shareToken]);

//   useEffect(() => { load(); }, [load]);

//   // ── Loading ─────────────────────────────────────────────────────────────
//   if (loading) {
//     return (
//       <div style={{
//         minHeight: "100vh",
//         background: "linear-gradient(135deg, #f8fafc 0%, #eef2f7 100%)",
//         display: "flex", flexDirection: "column",
//         alignItems: "center", justifyContent: "center", gap: 16,
//       }}>
//         <div style={{
//           width: 44, height: 44,
//           border: "3px solid #e2e8f0",
//           borderTop: "3px solid #1a56db",
//           borderRadius: "50%",
//           animation: "spin 1s linear infinite",
//         }} />
//         <p style={{ color: "#64748b", fontWeight: 600, fontSize: 15, margin: 0 }}>
//           Loading Trust Centre…
//         </p>
//         <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
//       </div>
//     );
//   }

//   // ── Error / invalid token ───────────────────────────────────────────────
//   if (error || !tc) {
//     return (
//       <div style={{
//         minHeight: "100vh",
//         background: "linear-gradient(135deg, #f8fafc 0%, #eef2f7 100%)",
//         display: "flex", flexDirection: "column",
//         alignItems: "center", justifyContent: "center",
//         gap: 14, padding: 24, textAlign: "center",
//       }}>
//         <div style={{
//           width: 70, height: 70, borderRadius: 20,
//           background: "linear-gradient(135deg, #e2e8f0, #cbd5e1)",
//           display: "flex", alignItems: "center", justifyContent: "center",
//           fontSize: 30,
//         }}>🔒</div>
//         <h2 style={{ margin: 0, color: "#1a2332", fontWeight: 800, fontSize: 22 }}>
//           Link Unavailable
//         </h2>
//         <p style={{ margin: 0, color: "#64748b", maxWidth: 340, fontSize: 14, lineHeight: 1.6 }}>
//           This Trust Centre link is invalid, has expired, or sharing has been disabled by the organisation.
//         </p>
//       </div>
//     );
//   }

//   const logoUrl = `${TC_BASE}/preview/${tc.organization}/logo`;

//   return (
//     <>
//       <style>{`
//         @keyframes spin    { to { transform: rotate(360deg); } }
//         @keyframes fadeIn  { from { opacity: 0; } to { opacity: 1; } }
//         @keyframes fadeUp  { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
//         @keyframes slideUp { from { opacity: 0; transform: translateY(30px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
//         * { box-sizing: border-box; }
//         body { margin: 0; }
//         a { text-decoration: none; }
//       `}</style>

//       <div style={{
//         minHeight: "100vh",
//         background: "linear-gradient(160deg, #f0f4fa 0%, #e8eef7 50%, #f4f7fb 100%)",
//         fontFamily: "'DM Sans', 'Segoe UI', system-ui, sans-serif",
//       }}>

//         {/* ── HERO HEADER ───────────────────────────────────────────────── */}
//         <div style={{
//           background: "linear-gradient(135deg, #0f2444 0%, #1a3a6b 45%, #1a56db 100%)",
//           padding: "36px 24px 32px",
//           position: "relative", overflow: "hidden",
//         }}>
//           {/* Decorative blobs */}
//           {[
//             { top: -60, right: -60, size: 240, opacity: 0.07 },
//             { top: 20,  right: "25%", size: 120, opacity: 0.04 },
//             { bottom: -40, left: "15%", size: 180, opacity: 0.05 },
//           ].map((b, i) => (
//             <div key={i} style={{
//               position: "absolute",
//               top: b.top, bottom: b.bottom,
//               left: b.left, right: b.right,
//               width: b.size, height: b.size,
//               borderRadius: "50%",
//               background: `radial-gradient(circle, rgba(255,255,255,${b.opacity}) 0%, transparent 70%)`,
//               pointerEvents: "none",
//             }} />
//           ))}

//           <div style={{ maxWidth: 1000, margin: "0 auto", position: "relative", zIndex: 1 }}>

//             {/* Shared-by badge */}
//             <div style={{
//               display: "inline-flex", alignItems: "center", gap: 6,
//               padding: "5px 12px", borderRadius: 20,
//               background: "rgba(255,255,255,0.12)",
//               border: "1px solid rgba(255,255,255,0.2)",
//               marginBottom: 20,
//             }}>
//               <Icon.Sparkle style={{ color: "#fbbf24", width: 12, height: 12 }} />
//               <span style={{ color: "rgba(255,255,255,0.85)", fontSize: 12, fontWeight: 600, letterSpacing: "0.04em" }}>
//                 SHARED TRUST CENTRE
//               </span>
//             </div>

//             {/* Company identity row */}
//             <div style={{
//               display: "flex", alignItems: "flex-start",
//               justifyContent: "space-between",
//               flexWrap: "wrap", gap: 16, marginBottom: 24,
//             }}>
//               <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
//                 {/* Logo */}
//                 <div style={{
//                   width: 68, height: 68, borderRadius: 16,
//                   background: "rgba(255,255,255,0.12)",
//                   border: "2px solid rgba(255,255,255,0.22)",
//                   display: "flex", alignItems: "center", justifyContent: "center",
//                   overflow: "hidden", flexShrink: 0,
//                 }}>
//                   <img
//                     src={logoUrl}
//                     alt="logo"
//                     style={{ width: "100%", height: "100%", objectFit: "contain" }}
//                     onError={(e) => {
//                       e.target.style.display = "none";
//                       e.target.parentNode.innerHTML = `<span style="font-size:28px;color:rgba(255,255,255,0.6)">🏢</span>`;
//                     }}
//                   />
//                 </div>
//                 <div>
//                   <h1 style={{
//                     margin: "0 0 4px", color: "white", fontWeight: 900,
//                     fontSize: "clamp(20px, 4vw, 28px)", letterSpacing: "-0.03em", lineHeight: 1.1,
//                   }}>
//                     {tc.companyName || "Trust Centre"}
//                   </h1>
//                   <p style={{ margin: 0, color: "rgba(255,255,255,0.65)", fontSize: 13, fontWeight: 500 }}>
//                     Security & Compliance Overview
//                   </p>
//                   {tc.domain && (
//                     <a href={`https://${tc.domain}`} target="_blank" rel="noreferrer"
//                       style={{
//                         display: "inline-flex", alignItems: "center", gap: 4,
//                         color: "rgba(255,255,255,0.75)", fontSize: 12, marginTop: 4,
//                         fontWeight: 500,
//                       }}>
//                       <Icon.Globe />
//                       {tc.domain}
//                     </a>
//                   )}
//                 </div>
//               </div>

//               {/* Powered by badge */}
//               <div style={{
//                 padding: "8px 14px",
//                 background: "rgba(255,255,255,0.1)",
//                 border: "1px solid rgba(255,255,255,0.18)",
//                 borderRadius: 10, alignSelf: "flex-start",
//               }}>
//                 <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 11, fontWeight: 600, letterSpacing: "0.05em" }}>
//                   POWERED BY CALVANT
//                 </span>
//               </div>
//             </div>

//             {/* Stat pills */}
//             <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
//               {tc.foundedYear && (
//                 <StatPill icon={Icon.Building} label="FOUNDED" value={tc.foundedYear}
//                   gradient="linear-gradient(135deg,#6366f1,#4f46e5)" />
//               )}
//               {tc.compliances?.length > 0 && (
//                 <StatPill icon={Icon.Check} label="CERTIFICATIONS" value={tc.compliances.length}
//                   gradient="linear-gradient(135deg,#10b981,#059669)" />
//               )}
//               {tc.trustedBy?.length > 0 && (
//                 <StatPill icon={Icon.Users} label="TRUSTED BY" value={tc.trustedBy.length}
//                   gradient="linear-gradient(135deg,#f59e0b,#d97706)" />
//               )}
//               {tc.policies?.length > 0 && (
//                 <StatPill icon={Icon.File} label="POLICIES" value={tc.policies.length}
//                   gradient="linear-gradient(135deg,#8b5cf6,#7c3aed)" />
//               )}
//             </div>
//           </div>
//         </div>

//         {/* ── REQUEST ACCESS BANNER ──────────────────────────────────────── */}
//         {tc.policies?.length > 0 && !submitted && (
//           <div style={{
//             background: "linear-gradient(135deg, #1a56db08, #1a56db14)",
//             borderBottom: "1px solid #1a56db22",
//             padding: "14px 24px",
//             animation: "fadeIn 0.6s ease 0.3s both",
//           }}>
//             <div style={{
//               maxWidth: 1000, margin: "0 auto",
//               display: "flex", alignItems: "center",
//               justifyContent: "space-between", flexWrap: "wrap", gap: 12,
//             }}>
//               <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//                 <div style={{
//                   width: 32, height: 32, borderRadius: 8,
//                   background: "linear-gradient(135deg,#1a56db,#0f2444)",
//                   display: "flex", alignItems: "center", justifyContent: "center", color: "white",
//                 }}>
//                   <Icon.Lock />
//                 </div>
//                 <div>
//                   <p style={{ margin: 0, fontWeight: 700, fontSize: 14, color: "#1a2332" }}>
//                     Policy documents require access
//                   </p>
//                   <p style={{ margin: 0, fontSize: 12, color: "#64748b" }}>
//                     Submit a request to download {tc.companyName}'s full policy library
//                   </p>
//                 </div>
//               </div>
//               <button
//                 onClick={() => setModalOpen(true)}
//                 style={{
//                   padding: "10px 22px",
//                   background: "linear-gradient(135deg, #1a56db 0%, #0f2444 100%)",
//                   color: "white", border: "none", borderRadius: 10,
//                   fontWeight: 700, fontSize: 13, cursor: "pointer",
//                   letterSpacing: "-0.01em", whiteSpace: "nowrap",
//                   boxShadow: "0 4px 14px rgba(26,86,219,0.3)",
//                   transition: "transform 0.15s, box-shadow 0.15s",
//                 }}
//                 onMouseEnter={(e) => { e.target.style.transform = "translateY(-1px)"; e.target.style.boxShadow = "0 6px 20px rgba(26,86,219,0.4)"; }}
//                 onMouseLeave={(e) => { e.target.style.transform = "translateY(0)";    e.target.style.boxShadow = "0 4px 14px rgba(26,86,219,0.3)"; }}
//               >
//                 🔑 Request Access
//               </button>
//             </div>
//           </div>
//         )}

//         {/* ── SUBMITTED CONFIRMATION BANNER ─────────────────────────────── */}
//         {submitted && (
//           <div style={{
//             background: "linear-gradient(135deg, #10b98110, #10b98120)",
//             borderBottom: "1px solid #10b98130",
//             padding: "14px 24px",
//             animation: "fadeIn 0.4s ease",
//           }}>
//             <div style={{
//               maxWidth: 1000, margin: "0 auto",
//               display: "flex", alignItems: "center", gap: 10,
//             }}>
//               <span style={{ fontSize: 20 }}>✅</span>
//               <div>
//                 <p style={{ margin: 0, fontWeight: 700, fontSize: 14, color: "#065f46" }}>
//                   Access request submitted successfully
//                 </p>
//                 <p style={{ margin: 0, fontSize: 12, color: "#047857" }}>
//                   The {tc.companyName} team will review your request and get back to you.
//                 </p>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* ── CONTENT GRID ──────────────────────────────────────────────── */}
//         <div style={{
//           maxWidth: 1000, margin: "0 auto",
//           padding: "28px 24px",
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
//           gap: 20,
//         }}>

//           {/* Overview */}
//           {tc.overview && (
//             <SectionCard title="Overview" iconComp={<Icon.Shield />}
//               accentColor="linear-gradient(135deg,#1a56db,#0f2444)" delay={0.05}>
//               <p style={{ margin: "0 0 16px", color: "#475569", fontSize: 14, lineHeight: 1.75, whiteSpace: "pre-wrap" }}>
//                 {tc.overview}
//               </p>
//               <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
//                 {tc.privacyPolicyLink && (
//                   <a href={tc.privacyPolicyLink} target="_blank" rel="noreferrer"
//                     style={{
//                       display: "inline-flex", alignItems: "center", gap: 5,
//                       color: "#1a56db", fontSize: 13, fontWeight: 600,
//                     }}>
//                     <Icon.External /> Privacy Policy
//                   </a>
//                 )}
//                 {tc.tosLink && (
//                   <a href={tc.tosLink} target="_blank" rel="noreferrer"
//                     style={{
//                       display: "inline-flex", alignItems: "center", gap: 5,
//                       color: "#1a56db", fontSize: 13, fontWeight: 600,
//                     }}>
//                     <Icon.External /> Terms of Service
//                   </a>
//                 )}
//               </div>
//             </SectionCard>
//           )}

//           {/* Compliance */}
//           {tc.compliances?.length > 0 && (
//             <SectionCard title="Compliance Certifications" iconComp={<Icon.Check />}
//               accentColor="linear-gradient(135deg,#10b981,#059669)" delay={0.1}>
//               <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
//                 {tc.compliances.map((c) => {
//                   const col = getComplianceColor(c);
//                   return (
//                     <div key={c} style={{
//                       display: "flex", alignItems: "center", gap: 6,
//                       padding: "6px 14px", borderRadius: 20,
//                       background: col.bg, color: col.text,
//                       border: `1px solid ${col.border}`,
//                       fontWeight: 700, fontSize: 12,
//                     }}>
//                       <Icon.Check />
//                       {c}
//                     </div>
//                   );
//                 })}
//               </div>
//             </SectionCard>
//           )}

//           {/* Trusted By */}
//           {tc.trustedBy?.length > 0 && (
//             <SectionCard title="Trusted By" iconComp={<Icon.Users />}
//               accentColor="linear-gradient(135deg,#f59e0b,#d97706)" delay={0.15}>
//               <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
//                 {tc.trustedBy.map((entry) => (
//                   <div key={entry.companyName} style={{
//                     padding: "6px 14px", borderRadius: 20,
//                     background: "#f8fafc", border: "1px solid #e2e8f0",
//                     fontSize: 13, fontWeight: 600, color: "#374151",
//                     display: "flex", alignItems: "center", gap: 6,
//                   }}>
//                     <Icon.Building />
//                     {entry.companyName}
//                   </div>
//                 ))}
//               </div>
//             </SectionCard>
//           )}

//           {/* Policies — locked view */}
//           {tc.policies?.length > 0 && (
//             <SectionCard title="Policy Documents" iconComp={<Icon.File />}
//               accentColor="linear-gradient(135deg,#8b5cf6,#7c3aed)" delay={0.2}>
//               <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
//                 {tc.policies.map((p) => (
//                   <div key={p.name} style={{
//                     display: "flex", alignItems: "center",
//                     justifyContent: "space-between",
//                     padding: "11px 14px", borderRadius: 12,
//                     background: "#faf7ff", border: "1px solid #ede9fe",
//                     gap: 12,
//                   }}>
//                     <div style={{ display: "flex", alignItems: "center", gap: 9, flex: 1, minWidth: 0 }}>
//                       <div style={{ color: "#8b5cf6", flexShrink: 0 }}><Icon.File /></div>
//                       <span style={{
//                         fontWeight: 600, fontSize: 13, color: "#1e293b",
//                         overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
//                       }}>
//                         {p.name}
//                       </span>
//                       {p.contentType && (
//                         <span style={{
//                           fontSize: 10, padding: "2px 7px", borderRadius: 10,
//                           background: "#ede9fe", color: "#7c3aed",
//                           fontWeight: 700, flexShrink: 0, letterSpacing: "0.03em",
//                         }}>
//                           {p.contentType.split("/")[1]?.toUpperCase() || "DOC"}
//                         </span>
//                       )}
//                     </div>

//                     {/* Lock button — request access */}
//                     {submitted ? (
//                       <span style={{
//                         display: "flex", alignItems: "center", gap: 5,
//                         fontSize: 12, color: "#10b981", fontWeight: 600, flexShrink: 0,
//                       }}>
//                         ✅ Requested
//                       </span>
//                     ) : (
//                       <button
//                         onClick={() => setModalOpen(true)}
//                         style={{
//                           display: "flex", alignItems: "center", gap: 5,
//                           padding: "5px 12px", borderRadius: 8,
//                           background: "white",
//                           border: "1.5px solid #d1d5db",
//                           color: "#6b7280", fontSize: 12, fontWeight: 600,
//                           cursor: "pointer", flexShrink: 0,
//                           transition: "all 0.15s",
//                         }}
//                         onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#8b5cf6"; e.currentTarget.style.color = "#8b5cf6"; }}
//                         onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#d1d5db"; e.currentTarget.style.color = "#6b7280"; }}
//                       >
//                         <Icon.Lock /> Request Access
//                       </button>
//                     )}
//                   </div>
//                 ))}
//               </div>

//               {!submitted && (
//                 <div style={{
//                   marginTop: 14, padding: "10px 14px", borderRadius: 10,
//                   background: "#f5f3ff", border: "1px solid #ddd6fe",
//                   display: "flex", alignItems: "center", gap: 8,
//                   fontSize: 12, color: "#6d28d9",
//                 }}>
//                   <Icon.Lock />
//                   Policy downloads require an approved access request.
//                   <button
//                     onClick={() => setModalOpen(true)}
//                     style={{
//                       background: "none", border: "none", padding: 0,
//                       color: "#7c3aed", fontWeight: 700, cursor: "pointer",
//                       fontSize: 12, textDecoration: "underline",
//                     }}
//                   >
//                     Request here →
//                   </button>
//                 </div>
//               )}
//             </SectionCard>
//           )}

//         </div>

//         {/* ── FOOTER ──────────────────────────────────────────────────────── */}
//         <footer style={{
//           borderTop: "1px solid #e2e8f0",
//           background: "white",
//           padding: "16px 24px",
//           textAlign: "center", marginTop: 8,
//         }}>
//           <p style={{ margin: 0, color: "#94a3b8", fontSize: 12, fontWeight: 500 }}>
//             © {new Date().getFullYear()} CalVant · Trust Centre · Public View
//           </p>
//         </footer>
//       </div>

//       {/* ── Modals ─────────────────────────────────────────────────────────── */}
//       {modalOpen && !submitted && (
//         <RequestAccessModal
//           shareToken={shareToken}
//           companyName={tc.companyName || "this organisation"}
//           onClose={() => setModalOpen(false)}
//           onSuccess={() => { setModalOpen(false); setSubmitted(true); }}
//         />
//       )}

//       {submitted && modalOpen && (
//         <SuccessModal
//           companyName={tc.companyName || "the team"}
//           onClose={() => setModalOpen(false)}
//         />
//       )}
//     </>
//   );
// }

import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";

const TC_URL = process.env.REACT_APP_TRUST_CENTRE_URL || "http://localhost:4021";
const TC_BASE = `${TC_URL}/api`;

// ── Helpers ───────────────────────────────────────────────────────────────────
const getComplianceLogoUrl = (organization, name) =>
  `${TC_URL}/api/trust-centre/compliances/${encodeURIComponent(organization)}/${encodeURIComponent(name)}/logo`;

const getTrustedByIconUrl = (organization, companyName) =>
  `${TC_URL}/api/trust-centre/trusted-by/${encodeURIComponent(organization)}/${encodeURIComponent(companyName)}/icon`;

// ── Nav sections ──────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { id: "overview",    label: "Overview",        icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
  { id: "compliance",  label: "Certifications",  icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
  { id: "policies",    label: "Policies",        icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
  { id: "subproc",     label: "Sub-Processors",  icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" },
  { id: "trustedby",   label: "Trusted By",      icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" },
];

// ── SVG Icon ──────────────────────────────────────────────────────────────────
const Svg = ({ d, size = 18, color = "currentColor", strokeWidth = 1.8 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

// ── Request Access Modal ──────────────────────────────────────────────────────
function RequestAccessModal({ shareToken, companyName, onClose, onSuccess }) {
  const [form, setForm] = useState({ requesterName: "", requesterEmail: "", requesterCompany: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.requesterName.trim()) e.requesterName = "Name is required";
    if (!form.requesterEmail.trim()) e.requesterEmail = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.requesterEmail)) e.requesterEmail = "Enter a valid email";
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setSubmitting(true);
    try {
      const res = await fetch(`${TC_BASE}/access-requests/public?shareToken=${encodeURIComponent(shareToken)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, requesterType: "CUSTOMER_COMPANY" }),
      });
      if (!res.ok) throw new Error("Failed");
      onSuccess();
    } catch {
      setErrors({ submit: "Something went wrong. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 1000,
      background: "rgba(8,15,30,0.72)", backdropFilter: "blur(8px)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: "#fff", borderRadius: 16, width: "100%", maxWidth: 480,
        boxShadow: "0 32px 80px rgba(0,0,0,0.22)", overflow: "hidden",
        animation: "modalUp 0.3s cubic-bezier(0.34,1.4,0.64,1)",
      }}>
        {/* Header */}
        <div style={{
          padding: "28px 32px 24px",
          background: "linear-gradient(135deg, #0a1628 0%, #1a3a6b 100%)",
          position: "relative",
        }}>
          <button onClick={onClose} style={{
            position: "absolute", top: 16, right: 16,
            background: "rgba(255,255,255,0.12)", border: "none",
            borderRadius: 8, width: 32, height: 32, cursor: "pointer",
            color: "white", display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Svg d="M6 18L18 6M6 6l12 12" size={16} color="white" />
          </button>
          <div style={{
            width: 48, height: 48, borderRadius: 12,
            background: "rgba(255,255,255,0.12)",
            display: "flex", alignItems: "center", justifyContent: "center",
            marginBottom: 14, color: "white",
          }}>
            <Svg d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" size={22} color="white" />
          </div>
          <h2 style={{ margin: "0 0 6px", color: "white", fontSize: 20, fontWeight: 700, letterSpacing: "-0.03em" }}>
            Request Document Access
          </h2>
          <p style={{ margin: 0, color: "rgba(255,255,255,0.65)", fontSize: 13, lineHeight: 1.5 }}>
            Submit your details to request full access to <strong style={{ color: "rgba(255,255,255,0.9)" }}>{companyName}</strong>'s policy library.
          </p>
        </div>

        {/* Body */}
        <div style={{ padding: "24px 32px 28px", display: "flex", flexDirection: "column", gap: 14 }}>
          {errors.submit && (
            <div style={{ padding: "10px 14px", borderRadius: 8, background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626", fontSize: 13 }}>
              {errors.submit}
            </div>
          )}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {[["requesterName", "Full name *"], ["requesterCompany", "Company"]].map(([key, ph]) => (
              <div key={key} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <input placeholder={ph} value={form[key]}
                  onChange={e => { setForm(f => ({ ...f, [key]: e.target.value })); setErrors(er => ({ ...er, [key]: undefined })); }}
                  style={{
                    padding: "10px 14px", borderRadius: 8, fontSize: 14,
                    border: errors[key] ? "1.5px solid #ef4444" : "1.5px solid #e5e7eb",
                    outline: "none", background: "#fafafa", color: "#111",
                    fontFamily: "inherit",
                  }} />
                {errors[key] && <span style={{ fontSize: 11, color: "#ef4444" }}>{errors[key]}</span>}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <input type="email" placeholder="Work email *" value={form.requesterEmail}
              onChange={e => { setForm(f => ({ ...f, requesterEmail: e.target.value })); setErrors(er => ({ ...er, requesterEmail: undefined })); }}
              style={{
                padding: "10px 14px", borderRadius: 8, fontSize: 14,
                border: errors.requesterEmail ? "1.5px solid #ef4444" : "1.5px solid #e5e7eb",
                outline: "none", background: "#fafafa", color: "#111", fontFamily: "inherit",
              }} />
            {errors.requesterEmail && <span style={{ fontSize: 11, color: "#ef4444" }}>{errors.requesterEmail}</span>}
          </div>
          <textarea placeholder="Why do you need access? (optional)" value={form.message}
            onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
            rows={3}
            style={{
              padding: "10px 14px", borderRadius: 8, fontSize: 14,
              border: "1.5px solid #e5e7eb", outline: "none",
              background: "#fafafa", color: "#111", fontFamily: "inherit",
              resize: "vertical",
            }} />
          <p style={{ margin: 0, fontSize: 12, color: "#9ca3af", lineHeight: 1.5 }}>
            No account required. The {companyName} team will review and respond via email.
          </p>
          <button onClick={handleSubmit} disabled={submitting} style={{
            padding: "13px 20px",
            background: submitting ? "#93c5fd" : "linear-gradient(135deg, #1a3a6b 0%, #1d4ed8 100%)",
            color: "white", border: "none", borderRadius: 10,
            fontWeight: 700, fontSize: 15, cursor: submitting ? "default" : "pointer",
            fontFamily: "inherit", letterSpacing: "-0.01em",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          }}>
            {submitting ? (
              <>
                <span style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,0.4)", borderTop: "2px solid white", borderRadius: "50%", display: "inline-block", animation: "spin 0.8s linear infinite" }} />
                Submitting…
              </>
            ) : "Submit Request →"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function TrustCentreSharePage({ match }) {
  const shareToken = match?.params?.shareToken || useParams()?.shareToken;

  const [tc, setTc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");
  const [modalOpen, setModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch(`${TC_BASE}/preview/share/${shareToken}`);
      if (!res.ok) throw new Error("Not found");
      const data = await res.json();
      setTc(data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [shareToken]);

  useEffect(() => { load(); }, [load]);

  // Scroll spy
  useEffect(() => {
    const handler = () => {
      const sections = NAV_ITEMS.map(n => document.getElementById(n.id)).filter(Boolean);
      const scrollY = window.scrollY + 120;
      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i].offsetTop <= scrollY) {
          setActiveSection(NAV_ITEMS[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, [tc]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) { el.scrollIntoView({ behavior: "smooth", block: "start" }); }
    setMobileNavOpen(false);
  };

  // ── Loading ────────────────────────────────────────────────────────────────
  if (loading) return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16 }}>
      <div style={{ width: 40, height: 40, border: "3px solid #e2e8f0", borderTop: "3px solid #1d4ed8", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
      <p style={{ color: "#64748b", fontWeight: 500, fontSize: 14, margin: 0, fontFamily: "'DM Sans', sans-serif" }}>Loading Trust Centre…</p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  // ── Error ──────────────────────────────────────────────────────────────────
  if (error || !tc) return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 14, padding: 24, textAlign: "center", fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ width: 72, height: 72, borderRadius: 20, background: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32 }}>🔒</div>
      <h2 style={{ margin: 0, color: "#0f172a", fontWeight: 700, fontSize: 22 }}>Link Unavailable</h2>
      <p style={{ margin: 0, color: "#64748b", maxWidth: 340, fontSize: 14, lineHeight: 1.6 }}>
        This Trust Centre link is invalid, has expired, or sharing has been disabled.
      </p>
    </div>
  );

  const logoUrl = `${TC_BASE}/trust-centre/logo/${tc.organization}`;
  const visibleNav = NAV_ITEMS.filter(n => {
    if (n.id === "overview") return !!(tc.overview || tc.privacyPolicyLink || tc.tosLink);
    if (n.id === "compliance") return tc.compliances?.length > 0;
    if (n.id === "policies") return tc.policies?.length > 0;
    if (n.id === "subproc") return tc.subProcessors?.length > 0;
    if (n.id === "trustedby") return tc.trustedBy?.length > 0;
    return false;
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #f8fafc; }
        html { scroll-behavior: smooth; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes modalUp { from { opacity: 0; transform: translateY(24px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
        .nav-item:hover { background: #f1f5f9 !important; color: #1d4ed8 !important; }
        .nav-item.active { background: #eff6ff !important; color: #1d4ed8 !important; border-left: 3px solid #1d4ed8 !important; }
        .policy-row:hover { background: #f8fafc !important; }
        .sp-row:hover { background: #f8fafc !important; }
        .req-btn:hover { background: #1d4ed8 !important; color: white !important; border-color: #1d4ed8 !important; }
        .ext-link:hover { text-decoration: underline !important; }
        a { text-decoration: none; }
      `}</style>

      <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", minHeight: "100vh", background: "#f8fafc", color: "#0f172a" }}>

        {/* ── TOP HEADER BAR ──────────────────────────────────────────────── */}
        <header style={{
          position: "sticky", top: 0, zIndex: 100,
          background: "rgba(255,255,255,0.95)", backdropFilter: "blur(12px)",
          borderBottom: "1px solid #e2e8f0",
          padding: "0 24px", height: 64,
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {/* Logo */}
            <div style={{ width: 36, height: 36, borderRadius: 9, overflow: "hidden", background: "#f1f5f9", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img src={logoUrl} alt="logo" style={{ width: "100%", height: "100%", objectFit: "contain" }}
                onError={e => { e.target.style.display = "none"; e.target.parentNode.innerHTML = `<span style="font-size:18px">🏢</span>`; }} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15, color: "#0f172a", letterSpacing: "-0.02em" }}>
                {tc.companyName || "Trust Centre"}
              </div>
              <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 500, letterSpacing: "0.04em", textTransform: "uppercase" }}>
                Trust Centre
              </div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {/* Powered by */}
            <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 10px", borderRadius: 20, background: "#f8fafc", border: "1px solid #e2e8f0" }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e" }} />
              <span style={{ fontSize: 11, color: "#64748b", fontWeight: 600, letterSpacing: "0.04em" }}>POWERED BY CALVANT</span>
            </div>

            {/* Mobile nav toggle */}
            <button onClick={() => setMobileNavOpen(v => !v)} style={{ display: "none", background: "none", border: "none", cursor: "pointer", color: "#64748b" }}
              className="mobile-nav-toggle">
              <Svg d="M4 6h16M4 12h16M4 18h16" size={20} />
            </button>
          </div>
        </header>

        <div style={{ display: "flex", maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>

          {/* ── LEFT SIDEBAR NAV ───────────────────────────────────────────── */}
          <aside style={{
            width: 240, flexShrink: 0,
            position: "sticky", top: 64, height: "calc(100vh - 64px)",
            overflowY: "auto", paddingTop: 32, paddingBottom: 32,
            paddingRight: 16,
          }}>
            {/* Company card */}
            <div style={{
              padding: "16px", borderRadius: 12,
              background: "white", border: "1px solid #e2e8f0",
              marginBottom: 24,
            }}>
              <div style={{ width: 48, height: 48, borderRadius: 10, overflow: "hidden", background: "#f8fafc", marginBottom: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <img src={logoUrl} alt="logo" style={{ width: "100%", height: "100%", objectFit: "contain" }}
                  onError={e => { e.target.style.display = "none"; e.target.parentNode.innerHTML = `<span style="font-size:24px">🏢</span>`; }} />
              </div>
              <div style={{ fontWeight: 700, fontSize: 14, color: "#0f172a", marginBottom: 2 }}>{tc.companyName}</div>
              {tc.domain && (
                <a href={`https://${tc.domain}`} target="_blank" rel="noreferrer" className="ext-link"
                  style={{ fontSize: 12, color: "#64748b", display: "flex", alignItems: "center", gap: 4 }}>
                  <Svg d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" size={11} color="#94a3b8" />
                  {tc.domain}
                </a>
              )}
              {tc.foundedYear && (
                <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 6 }}>Est. {tc.foundedYear}</div>
              )}
            </div>

            {/* Nav links */}
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6, paddingLeft: 10 }}>
                Contents
              </div>
              {visibleNav.map(item => (
                <button key={item.id}
                  className={`nav-item${activeSection === item.id ? " active" : ""}`}
                  onClick={() => scrollTo(item.id)}
                  style={{
                    display: "flex", alignItems: "center", gap: 10,
                    padding: "9px 10px", borderRadius: 8,
                    background: "transparent", border: "none",
                    borderLeft: "3px solid transparent",
                    cursor: "pointer", textAlign: "left", width: "100%",
                    fontSize: 13, fontWeight: 500,
                    color: activeSection === item.id ? "#1d4ed8" : "#475569",
                    fontFamily: "inherit",
                    transition: "all 0.15s",
                  }}>
                  <Svg d={item.icon} size={15} color={activeSection === item.id ? "#1d4ed8" : "#94a3b8"} />
                  {item.label}
                </button>
              ))}
            </div>

            {/* Stats */}
            <div style={{ marginTop: 24, padding: "14px", borderRadius: 12, background: "#f8fafc", border: "1px solid #f1f5f9" }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>At a Glance</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {tc.compliances?.length > 0 && (
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 12, color: "#64748b" }}>Certifications</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}>{tc.compliances.length}</span>
                  </div>
                )}
                {tc.policies?.length > 0 && (
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 12, color: "#64748b" }}>Policies</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}>{tc.policies.length}</span>
                  </div>
                )}
                {tc.subProcessors?.length > 0 && (
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 12, color: "#64748b" }}>Sub-Processors</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}>{tc.subProcessors.length}</span>
                  </div>
                )}
                {tc.trustedBy?.length > 0 && (
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 12, color: "#64748b" }}>Trusted By</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}>{tc.trustedBy.length}</span>
                  </div>
                )}
              </div>
            </div>
          </aside>

          {/* ── MAIN CONTENT ───────────────────────────────────────────────── */}
          <main style={{ flex: 1, paddingLeft: 40, paddingTop: 32, paddingBottom: 80, minWidth: 0 }}>

            {/* Access request banner */}
            {tc.policies?.length > 0 && !submitted && (
              <div style={{
                marginBottom: 28, padding: "14px 18px",
                background: "linear-gradient(135deg, #eff6ff, #dbeafe)",
                border: "1px solid #bfdbfe", borderRadius: 12,
                display: "flex", alignItems: "center", justifyContent: "space-between",
                flexWrap: "wrap", gap: 12, animation: "fadeUp 0.4s ease both",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 34, height: 34, borderRadius: 8, background: "#1d4ed8", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Svg d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" size={16} color="white" />
                  </div>
                  <div>
                    <p style={{ margin: 0, fontWeight: 600, fontSize: 13, color: "#1e3a5f" }}>Policy documents require access</p>
                    <p style={{ margin: 0, fontSize: 12, color: "#3b82f6" }}>Request access to download {tc.companyName}'s full policy library</p>
                  </div>
                </div>
                <button onClick={() => setModalOpen(true)} className="req-btn" style={{
                  padding: "9px 18px", borderRadius: 8,
                  background: "white", border: "1.5px solid #1d4ed8",
                  color: "#1d4ed8", fontWeight: 600, fontSize: 13,
                  cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s",
                  whiteSpace: "nowrap",
                }}>
                  Request Access →
                </button>
              </div>
            )}

            {submitted && (
              <div style={{
                marginBottom: 28, padding: "14px 18px",
                background: "linear-gradient(135deg, #f0fdf4, #dcfce7)",
                border: "1px solid #bbf7d0", borderRadius: 12,
                display: "flex", alignItems: "center", gap: 12,
                animation: "fadeUp 0.4s ease both",
              }}>
                <span style={{ fontSize: 20 }}>✅</span>
                <div>
                  <p style={{ margin: 0, fontWeight: 600, fontSize: 13, color: "#14532d" }}>Access request submitted</p>
                  <p style={{ margin: 0, fontSize: 12, color: "#16a34a" }}>The {tc.companyName} team will review and get back to you via email.</p>
                </div>
              </div>
            )}

            {/* ── OVERVIEW ────────────────────────────────────────────────── */}
            {(tc.overview || tc.privacyPolicyLink || tc.tosLink) && (
              <section id="overview" style={{ marginBottom: 48, animation: "fadeUp 0.5s ease 0.05s both" }}>
                <SectionHeader icon="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" title="Overview" />
                <div style={{ background: "white", borderRadius: 12, border: "1px solid #e2e8f0", padding: "24px 28px" }}>
                  {tc.overview && (
                    <p style={{ margin: "0 0 20px", color: "#374151", fontSize: 14, lineHeight: 1.8, whiteSpace: "pre-wrap" }}>
                      {tc.overview}
                    </p>
                  )}
                  {(tc.privacyPolicyLink || tc.tosLink) && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 12, paddingTop: tc.overview ? 16 : 0, borderTop: tc.overview ? "1px solid #f1f5f9" : "none" }}>
                      {tc.privacyPolicyLink && (
                        <a href={tc.privacyPolicyLink} target="_blank" rel="noreferrer" className="ext-link"
                          style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "#1d4ed8", fontSize: 13, fontWeight: 500 }}>
                          <Svg d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" size={13} color="#1d4ed8" />
                          Privacy Policy
                        </a>
                      )}
                      {tc.tosLink && (
                        <a href={tc.tosLink} target="_blank" rel="noreferrer" className="ext-link"
                          style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "#1d4ed8", fontSize: 13, fontWeight: 500 }}>
                          <Svg d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" size={13} color="#1d4ed8" />
                          Terms of Service
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* ── COMPLIANCE CERTIFICATIONS ────────────────────────────────── */}
            {tc.compliances?.length > 0 && (
              <section id="compliance" style={{ marginBottom: 48, animation: "fadeUp 0.5s ease 0.1s both" }}>
                <SectionHeader icon="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" title="Compliance Certifications" />
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 14 }}>
                  {tc.compliances.map((c) => {
                    const name = typeof c === "string" ? c : c.name;
                    const hasLogo = typeof c === "object" && c.name;
                    return (
                      <div key={name} style={{
                        background: "white", border: "1px solid #e2e8f0",
                        borderRadius: 12, padding: "20px 16px",
                        display: "flex", flexDirection: "column",
                        alignItems: "center", gap: 12,
                        textAlign: "center",
                        transition: "box-shadow 0.2s",
                      }}
                        onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.08)"}
                        onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
                      >
                        {/* Logo or fallback badge */}
                        <div style={{ width: 56, height: 56, borderRadius: 12, overflow: "hidden", background: "#f8fafc", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          {hasLogo ? (
                            <img
                              src={getComplianceLogoUrl(tc.organization, name)}
                              alt={name}
                              style={{ width: "100%", height: "100%", objectFit: "contain" }}
                              onError={e => {
                                e.target.style.display = "none";
                                e.target.parentNode.innerHTML = `<span style="font-size:22px;font-weight:800;color:#1d4ed8;font-family:DM Sans,sans-serif">${name.substring(0, 3)}</span>`;
                              }}
                            />
                          ) : (
                            <span style={{ fontSize: 14, fontWeight: 800, color: "#1d4ed8", fontFamily: "DM Sans, sans-serif", letterSpacing: "-0.02em" }}>
                              {name.substring(0, 4)}
                            </span>
                          )}
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: 13, color: "#0f172a", marginBottom: 4 }}>{name}</div>
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
                            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e" }} />
                            <span style={{ fontSize: 11, color: "#16a34a", fontWeight: 600 }}>Certified</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* ── POLICIES ────────────────────────────────────────────────── */}
            {tc.policies?.length > 0 && (
              <section id="policies" style={{ marginBottom: 48, animation: "fadeUp 0.5s ease 0.15s both" }}>
                <SectionHeader icon="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" title="Policy Documents" />
                <div style={{ background: "white", borderRadius: 12, border: "1px solid #e2e8f0", overflow: "hidden" }}>
                  {tc.policies.map((p, i) => (
                    <div key={p.name} className="policy-row" style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      padding: "16px 20px", gap: 16,
                      borderBottom: i < tc.policies.length - 1 ? "1px solid #f1f5f9" : "none",
                      background: "white", transition: "background 0.15s",
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1, minWidth: 0 }}>
                        <div style={{ width: 36, height: 36, borderRadius: 8, background: "#f8fafc", border: "1px solid #e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <Svg d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" size={16} color="#64748b" />
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontWeight: 600, fontSize: 14, color: "#0f172a", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.name}</div>
                          {p.contentType && (
                            <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 2, textTransform: "uppercase", fontWeight: 600, letterSpacing: "0.04em" }}>
                              {p.contentType.split("/")[1] || "document"}
                            </div>
                          )}
                        </div>
                      </div>
                      {submitted ? (
                        <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "#16a34a", fontWeight: 600, whiteSpace: "nowrap" }}>
                          ✅ Requested
                        </span>
                      ) : (
                        <button onClick={() => setModalOpen(true)} className="req-btn" style={{
                          display: "flex", alignItems: "center", gap: 6,
                          padding: "7px 14px", borderRadius: 8,
                          background: "white", border: "1.5px solid #e2e8f0",
                          color: "#64748b", fontSize: 12, fontWeight: 600,
                          cursor: "pointer", fontFamily: "inherit",
                          transition: "all 0.15s", whiteSpace: "nowrap", flexShrink: 0,
                        }}>
                          <Svg d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" size={13} />
                          Request Access
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                {!submitted && (
                  <div style={{ marginTop: 10, padding: "10px 14px", borderRadius: 8, background: "#fefce8", border: "1px solid #fef08a", display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#713f12" }}>
                    <Svg d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" size={14} color="#ca8a04" />
                    Policy downloads require an approved access request.
                    <button onClick={() => setModalOpen(true)} style={{ background: "none", border: "none", padding: 0, color: "#92400e", fontWeight: 700, cursor: "pointer", fontSize: 12, textDecoration: "underline", fontFamily: "inherit" }}>
                      Request here →
                    </button>
                  </div>
                )}
              </section>
            )}

            {/* ── SUB-PROCESSORS ──────────────────────────────────────────── */}
            {tc.subProcessors?.length > 0 && (
              <section id="subproc" style={{ marginBottom: 48, animation: "fadeUp 0.5s ease 0.2s both" }}>
                <SectionHeader icon="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" title="Sub-Processors" />
                <div style={{ background: "white", borderRadius: 12, border: "1px solid #e2e8f0", overflow: "hidden" }}>
                  {/* Table header */}
                  <div style={{ display: "grid", gridTemplateColumns: "2fr 2fr 1fr 1fr", padding: "10px 20px", background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                    {["Name", "Purpose", "Location", "Website"].map(h => (
                      <div key={h} style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", letterSpacing: "0.06em", textTransform: "uppercase" }}>{h}</div>
                    ))}
                  </div>
                  {tc.subProcessors.map((sp, i) => (
                    <div key={sp.name} className="sp-row" style={{
                      display: "grid", gridTemplateColumns: "2fr 2fr 1fr 1fr",
                      padding: "14px 20px", gap: 8, alignItems: "center",
                      borderBottom: i < tc.subProcessors.length - 1 ? "1px solid #f1f5f9" : "none",
                      background: "white", transition: "background 0.15s",
                    }}>
                      <div style={{ fontWeight: 600, fontSize: 13, color: "#0f172a" }}>{sp.name}</div>
                      <div style={{ fontSize: 13, color: "#64748b" }}>{sp.purpose || "—"}</div>
                      <div style={{ fontSize: 12, color: "#64748b" }}>{sp.location || "—"}</div>
                      <div>
                        {sp.website ? (
                          <a href={sp.website} target="_blank" rel="noreferrer" className="ext-link"
                            style={{ fontSize: 12, color: "#1d4ed8", display: "flex", alignItems: "center", gap: 4 }}>
                            <Svg d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" size={11} color="#1d4ed8" />
                            Visit
                          </a>
                        ) : "—"}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* ── TRUSTED BY ──────────────────────────────────────────────── */}
            {tc.trustedBy?.length > 0 && (
              <section id="trustedby" style={{ marginBottom: 48, animation: "fadeUp 0.5s ease 0.25s both" }}>
                <SectionHeader icon="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" title="Trusted By" />
                <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                  {tc.trustedBy.map(entry => (
                    <div key={entry.companyName} style={{
                      display: "flex", alignItems: "center", gap: 10,
                      padding: "10px 16px", borderRadius: 10,
                      background: "white", border: "1px solid #e2e8f0",
                      fontSize: 13, fontWeight: 600, color: "#374151",
                    }}>
                      <div style={{ width: 24, height: 24, borderRadius: 6, background: "#f1f5f9", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <img
                          src={getTrustedByIconUrl(tc.organization, entry.companyName)}
                          alt={entry.companyName}
                          style={{ width: "100%", height: "100%", objectFit: "contain" }}
                          onError={e => { e.target.style.display = "none"; e.target.parentNode.innerHTML = `<span style="font-size:12px">🏢</span>`; }}
                        />
                      </div>
                      {entry.companyName}
                    </div>
                  ))}
                </div>
              </section>
            )}

          </main>
        </div>

        {/* ── FOOTER ────────────────────────────────────────────────────────── */}
        <footer style={{ borderTop: "1px solid #e2e8f0", background: "white", padding: "16px 24px", textAlign: "center" }}>
          <p style={{ margin: 0, color: "#94a3b8", fontSize: 12, fontWeight: 500 }}>
            © {new Date().getFullYear()} {tc.companyName} · Trust Centre · Powered by Calvant
          </p>
        </footer>
      </div>

      {/* ── Modals ──────────────────────────────────────────────────────────── */}
      {modalOpen && !submitted && (
        <RequestAccessModal
          shareToken={shareToken}
          companyName={tc.companyName || "this organisation"}
          onClose={() => setModalOpen(false)}
          onSuccess={() => { setModalOpen(false); setSubmitted(true); }}
        />
      )}
    </>
  );
}

// ── Section Header helper ─────────────────────────────────────────────────────
function SectionHeader({ icon, title }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
      <div style={{ width: 32, height: 32, borderRadius: 8, background: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Svg d={icon} size={16} color="#1d4ed8" />
      </div>
      <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: "#0f172a", letterSpacing: "-0.02em" }}>{title}</h2>
    </div>
  );
}