// Trust Centre API — points to local trust-centre service on port 4021
const BASE = `${process.env.REACT_APP_TRUST_CENTRE_URL}/api/trust-centre`;
const PREVIEW = `${process.env.REACT_APP_TRUST_CENTRE_URL}/api/preview`;

const getToken = () => localStorage.getItem("token");

const authHeaders = () => ({
  Authorization: `Bearer ${getToken()}`,
});

// ── Metadata ──────────────────────────────────────────────────────────────────

export const getTrustCentre = () =>
  fetch(BASE, { headers: authHeaders() }).then((r) => r.json());

export const upsertTrustCentre = (data) =>
  fetch(BASE, {
    method: "POST",
    headers: { ...authHeaders(), "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((r) => r.json());

// ── Publish / Unpublish ───────────────────────────────────────────────────────

export const publishTrustCentre = () =>
  fetch(`${BASE}/publish`, {
    method: "POST",
    headers: authHeaders(),
  }).then((r) => r.json());

export const unpublishTrustCentre = () =>
  fetch(`${BASE}/unpublish`, {
    method: "POST",
    headers: authHeaders(),
  }).then((r) => r.json());

// ── Logo ──────────────────────────────────────────────────────────────────────

export const uploadLogo = (file) => {
  const form = new FormData();
  form.append("file", file);
  return fetch(`${BASE}/logo`, {
    method: "POST",
    headers: authHeaders(),
    body: form,
  }).then((r) => r.text());
};

export const getLogoUrl = (organization) =>
  `${BASE}/logo/${organization}`;

// ── Trusted By ────────────────────────────────────────────────────────────────

export const addTrustedBy = (companyName, iconFile) => {
  const form = new FormData();
  form.append("companyName", companyName);
  if (iconFile) form.append("icon", iconFile);
  return fetch(`${BASE}/trusted-by`, {
    method: "POST",
    headers: authHeaders(),
    body: form,
  }).then((r) => r.json());
};

export const removeTrustedBy = (companyName) =>
  fetch(`${BASE}/trusted-by?companyName=${encodeURIComponent(companyName)}`, {
    method: "DELETE",
    headers: authHeaders(),
  }).then((r) => r.json());

// ── Policies ──────────────────────────────────────────────────────────────────

export const uploadPolicy = (policyName, file) => {
  const form = new FormData();
  form.append("policyName", policyName);
  form.append("file", file);
  return fetch(`${BASE}/policies`, {
    method: "POST",
    headers: authHeaders(),
    body: form,
  }).then((r) => r.text());
};

export const downloadPolicy = (policyName, organization) => {
  const url = `${BASE}/policies/${encodeURIComponent(policyName)}/download?organization=${encodeURIComponent(organization)}`;
  return fetch(url, { headers: authHeaders() }).then((r) => r.blob());
};

export const removePolicy = (policyName) =>
  fetch(`${BASE}/policies?policyName=${encodeURIComponent(policyName)}`, {
    method: "DELETE",
    headers: authHeaders(),
  }).then((r) => r.text());

// ── Sub-Processors ────────────────────────────────────────────────────────────

export const addSubProcessor = (sp) =>
  fetch(`${BASE}/sub-processors`, {
    method: "POST",
    headers: { ...authHeaders(), "Content-Type": "application/json" },
    body: JSON.stringify(sp),
  }).then((r) => r.json());

export const removeSubProcessor = (name) =>
  fetch(`${BASE}/sub-processors?name=${encodeURIComponent(name)}`, {
    method: "DELETE",
    headers: authHeaders(),
  }).then((r) => r.text());

// ── Custom Domain ─────────────────────────────────────────────────────────────

export const setCustomDomain = (customDomain) =>
  fetch(`${BASE}/custom-domain`, {
    method: "POST",
    headers: { ...authHeaders(), "Content-Type": "application/json" },
    body: JSON.stringify({ customDomain }),
  }).then((r) => r.json());

export const verifyCustomDomain = () =>
  fetch(`${BASE}/custom-domain/verify`, {
    method: "POST",
    headers: authHeaders(),
  }).then((r) => r.json());

export const removeCustomDomain = () =>
  fetch(`${BASE}/custom-domain`, {
    method: "DELETE",
    headers: authHeaders(),
  }).then((r) => r.text());

// ── Internal Preview ──────────────────────────────────────────────────────────

export const getInternalPreview = () =>
  fetch(`${PREVIEW}/internal`, { headers: authHeaders() }).then((r) => r.json());