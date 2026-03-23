import { useEffect, useMemo, useState } from "react";
import { FaUsers, FaClipboardList, FaCommentDots, FaIdCard } from "react-icons/fa";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";
const ADMIN_API_KEY = import.meta.env.VITE_ADMIN_API_KEY || "";

const tabs = [
  { key: "plans", label: "Plans", icon: FaClipboardList },
  { key: "testimonials", label: "Testimonials", icon: FaCommentDots },
  { key: "leads", label: "Contact Leads", icon: FaUsers },
  { key: "members", label: "Members", icon: FaIdCard },
];

const initialPlan = { name: "", durationInMonths: 1, price: 0, features: "", isActive: true };
const initialTestimonial = { name: "", role: "", text: "", stars: 5, approved: false };
const initialMember = {
  name: "",
  email: "",
  password: "",
  phone: "",
  activePlan: "",
  planExpiry: "",
};

export default function App() {
  const [activeTab, setActiveTab] = useState("plans");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [plans, setPlans] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [leads, setLeads] = useState([]);
  const [members, setMembers] = useState([]);

  const [planForm, setPlanForm] = useState(initialPlan);
  const [testimonialForm, setTestimonialForm] = useState(initialTestimonial);
  const [memberForm, setMemberForm] = useState(initialMember);

  const [editingPlanId, setEditingPlanId] = useState("");
  const [editingTestimonialId, setEditingTestimonialId] = useState("");
  const [editingMemberId, setEditingMemberId] = useState("");

  const planOptions = useMemo(
    () => plans.filter((p) => p.isActive).map((p) => ({ value: p._id, label: `${p.name} (Rs ${p.price})` })),
    [plans]
  );

  async function request(path, options = {}) {
    const response = await fetch(`${API_BASE}${path}`, {
      headers: {
        "Content-Type": "application/json",
        ...(ADMIN_API_KEY ? { "x-admin-key": ADMIN_API_KEY } : {}),
        ...(options.headers || {}),
      },
      ...options,
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(payload.error || "Request failed");
    return payload;
  }

  async function fetchData() {
    setLoading(true);
    setError("");
    try {
      if (activeTab === "plans") {
        setPlans(await request("/api/admin/plans"));
      } else if (activeTab === "testimonials") {
        setTestimonials(await request("/api/admin/testimonials"));
      } else if (activeTab === "leads") {
        setLeads(await request("/api/admin/leads"));
      } else if (activeTab === "members") {
        const [memberRows, planRows] = await Promise.all([
          request("/api/admin/members"),
          request("/api/admin/plans"),
        ]);
        setMembers(memberRows);
        setPlans(planRows);
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  async function submitPlan(e) {
    e.preventDefault();
    const body = {
      ...planForm,
      durationInMonths: Number(planForm.durationInMonths),
      price: Number(planForm.price),
      features: planForm.features
        .split(",")
        .map((f) => f.trim())
        .filter(Boolean),
    };
    try {
      if (editingPlanId) {
        await request(`/api/admin/plans/${editingPlanId}`, { method: "PUT", body: JSON.stringify(body) });
      } else {
        await request("/api/admin/plans", { method: "POST", body: JSON.stringify(body) });
      }
      setPlanForm(initialPlan);
      setEditingPlanId("");
      fetchData();
    } catch (err) {
      setError(err.message || "Could not save plan");
    }
  }

  async function submitTestimonial(e) {
    e.preventDefault();
    const body = { ...testimonialForm, stars: Number(testimonialForm.stars) };
    try {
      if (editingTestimonialId) {
        await request(`/api/admin/testimonials/${editingTestimonialId}`, { method: "PUT", body: JSON.stringify(body) });
      } else {
        await request("/api/admin/testimonials", { method: "POST", body: JSON.stringify(body) });
      }
      setTestimonialForm(initialTestimonial);
      setEditingTestimonialId("");
      fetchData();
    } catch (err) {
      setError(err.message || "Could not save testimonial");
    }
  }

  async function submitMember(e) {
    e.preventDefault();
    const body = {
      ...memberForm,
      activePlan: memberForm.activePlan || null,
      planExpiry: memberForm.planExpiry || null,
    };
    try {
      if (editingMemberId) {
        if (!body.password) delete body.password;
        await request(`/api/admin/members/${editingMemberId}`, { method: "PUT", body: JSON.stringify(body) });
      } else {
        await request("/api/admin/members", { method: "POST", body: JSON.stringify(body) });
      }
      setMemberForm(initialMember);
      setEditingMemberId("");
      fetchData();
    } catch (err) {
      setError(err.message || "Could not save member");
    }
  }

  async function deleteItem(path) {
    if (!window.confirm("Are you sure? This action cannot be undone.")) return;
    try {
      await request(path, { method: "DELETE" });
      fetchData();
    } catch (err) {
      setError(err.message || "Could not delete record");
    }
  }

  async function markLeadResponded(lead) {
    try {
      await request(`/api/admin/leads/${lead._id}`, {
        method: "PUT",
        body: JSON.stringify({ responded: !lead.responded }),
      });
      fetchData();
    } catch (err) {
      setError(err.message || "Could not update lead");
    }
  }

  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900">
      <header className="sticky top-0 z-20 border-b border-zinc-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <div>
            <h1 className="text-xl font-extrabold">
              PrimeFitness <span className="text-emerald-600">Admin Panel</span>
            </h1>
            <p className="text-xs text-zinc-500">External dashboard for CRUD operations</p>
          </div>
          <span className="rounded-md bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">API: {API_BASE}</span>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6">
        <nav className="mb-6 grid grid-cols-2 gap-2 md:grid-cols-4">
          {tabs.map((t) => {
            const Icon = t.icon;
            const active = activeTab === t.key;
            return (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className={`flex items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm font-semibold transition-colors ${
                  active
                    ? "border-emerald-600 bg-emerald-600 text-white"
                    : "border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50"
                }`}
              >
                <Icon className="text-sm" /> {t.label}
              </button>
            );
          })}
        </nav>

        {error && <p className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

        {activeTab === "plans" && (
          <section className="grid gap-6 lg:grid-cols-[420px_1fr]">
            <form onSubmit={submitPlan} className="card p-5 space-y-3">
              <h2 className="text-lg font-bold">{editingPlanId ? "Edit Plan" : "Create Plan"}</h2>
              <input className="field" placeholder="Plan Name" value={planForm.name} onChange={(e) => setPlanForm({ ...planForm, name: e.target.value })} required />
              <div className="grid grid-cols-2 gap-3">
                <input className="field" type="number" min="1" placeholder="Duration (months)" value={planForm.durationInMonths} onChange={(e) => setPlanForm({ ...planForm, durationInMonths: e.target.value })} required />
                <input className="field" type="number" min="0" placeholder="Price" value={planForm.price} onChange={(e) => setPlanForm({ ...planForm, price: e.target.value })} required />
              </div>
              <textarea className="field" rows={4} placeholder="Features (comma separated)" value={planForm.features} onChange={(e) => setPlanForm({ ...planForm, features: e.target.value })} />
              <label className="flex items-center gap-2 text-sm text-zinc-600">
                <input type="checkbox" checked={planForm.isActive} onChange={(e) => setPlanForm({ ...planForm, isActive: e.target.checked })} /> Active
              </label>
              <div className="flex gap-2">
                <button className="btn-primary" type="submit">{editingPlanId ? "Update Plan" : "Create Plan"}</button>
                <button className="btn-secondary" type="button" onClick={() => { setEditingPlanId(""); setPlanForm(initialPlan); }}>Reset</button>
              </div>
            </form>

            <div className="card overflow-auto">
              <table className="w-full text-sm">
                <thead className="bg-zinc-50 text-zinc-600">
                  <tr>
                    <th className="px-4 py-3 text-left">Name</th>
                    <th className="px-4 py-3 text-left">Months</th>
                    <th className="px-4 py-3 text-left">Price</th>
                    <th className="px-4 py-3 text-left">Active</th>
                    <th className="px-4 py-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading && <tr><td className="px-4 py-3" colSpan={5}>Loading...</td></tr>}
                  {!loading && plans.map((p) => (
                    <tr key={p._id} className="border-t border-zinc-100">
                      <td className="px-4 py-3 font-medium">{p.name}</td>
                      <td className="px-4 py-3">{p.durationInMonths}</td>
                      <td className="px-4 py-3">Rs {p.price}</td>
                      <td className="px-4 py-3">{p.isActive ? "Yes" : "No"}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button className="btn-secondary" onClick={() => { setEditingPlanId(p._id); setPlanForm({ name: p.name, durationInMonths: p.durationInMonths, price: p.price, features: (p.features || []).join(", "), isActive: p.isActive }); }}>Edit</button>
                          <button className="btn-danger" onClick={() => deleteItem(`/api/admin/plans/${p._id}`)}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {activeTab === "testimonials" && (
          <section className="grid gap-6 lg:grid-cols-[420px_1fr]">
            <form onSubmit={submitTestimonial} className="card p-5 space-y-3">
              <h2 className="text-lg font-bold">{editingTestimonialId ? "Edit Testimonial" : "Create Testimonial"}</h2>
              <input className="field" placeholder="Name" value={testimonialForm.name} onChange={(e) => setTestimonialForm({ ...testimonialForm, name: e.target.value })} required />
              <input className="field" placeholder="Role" value={testimonialForm.role} onChange={(e) => setTestimonialForm({ ...testimonialForm, role: e.target.value })} />
              <textarea className="field" rows={4} placeholder="Review text" value={testimonialForm.text} onChange={(e) => setTestimonialForm({ ...testimonialForm, text: e.target.value })} required />
              <div className="grid grid-cols-2 gap-3">
                <input className="field" type="number" min="1" max="5" placeholder="Stars" value={testimonialForm.stars} onChange={(e) => setTestimonialForm({ ...testimonialForm, stars: e.target.value })} required />
                <label className="flex items-center gap-2 text-sm text-zinc-600">
                  <input type="checkbox" checked={testimonialForm.approved} onChange={(e) => setTestimonialForm({ ...testimonialForm, approved: e.target.checked })} /> Approved
                </label>
              </div>
              <div className="flex gap-2">
                <button className="btn-primary" type="submit">{editingTestimonialId ? "Update" : "Create"}</button>
                <button className="btn-secondary" type="button" onClick={() => { setEditingTestimonialId(""); setTestimonialForm(initialTestimonial); }}>Reset</button>
              </div>
            </form>

            <div className="grid gap-3">
              {loading && <div className="card p-4 text-sm">Loading...</div>}
              {!loading && testimonials.map((t) => (
                <article key={t._id} className="card p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h3 className="font-semibold">{t.name} <span className="text-xs text-zinc-500">({t.role || "Member"})</span></h3>
                      <p className="text-sm text-zinc-600">{t.text}</p>
                      <p className="mt-1 text-xs text-zinc-500">Stars: {t.stars} | Approved: {t.approved ? "Yes" : "No"}</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="btn-secondary" onClick={() => { setEditingTestimonialId(t._id); setTestimonialForm({ name: t.name, role: t.role || "", text: t.text, stars: t.stars, approved: t.approved }); }}>Edit</button>
                      <button className="btn-danger" onClick={() => deleteItem(`/api/admin/testimonials/${t._id}`)}>Delete</button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {activeTab === "leads" && (
          <section className="card overflow-auto">
            <table className="w-full text-sm">
              <thead className="bg-zinc-50 text-zinc-600">
                <tr>
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-left">Email</th>
                  <th className="px-4 py-3 text-left">Phone</th>
                  <th className="px-4 py-3 text-left">Message</th>
                  <th className="px-4 py-3 text-left">Responded</th>
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading && <tr><td className="px-4 py-3" colSpan={6}>Loading...</td></tr>}
                {!loading && leads.map((l) => (
                  <tr key={l._id} className="border-t border-zinc-100 align-top">
                    <td className="px-4 py-3 font-medium">{l.name}</td>
                    <td className="px-4 py-3">{l.email}</td>
                    <td className="px-4 py-3">{l.phone || "-"}</td>
                    <td className="px-4 py-3 max-w-md">{l.message}</td>
                    <td className="px-4 py-3">{l.responded ? "Yes" : "No"}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button className="btn-secondary" onClick={() => markLeadResponded(l)}>{l.responded ? "Mark Pending" : "Mark Responded"}</button>
                        <button className="btn-danger" onClick={() => deleteItem(`/api/admin/leads/${l._id}`)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {activeTab === "members" && (
          <section className="grid gap-6 lg:grid-cols-[420px_1fr]">
            <form onSubmit={submitMember} className="card p-5 space-y-3">
              <h2 className="text-lg font-bold">{editingMemberId ? "Edit Member" : "Create Member"}</h2>
              <input className="field" placeholder="Full Name" value={memberForm.name} onChange={(e) => setMemberForm({ ...memberForm, name: e.target.value })} required />
              <input className="field" type="email" placeholder="Email" value={memberForm.email} onChange={(e) => setMemberForm({ ...memberForm, email: e.target.value })} required />
              <input className="field" type="password" placeholder={editingMemberId ? "Password (optional to change)" : "Password"} value={memberForm.password} onChange={(e) => setMemberForm({ ...memberForm, password: e.target.value })} required={!editingMemberId} />
              <input className="field" placeholder="Phone" value={memberForm.phone} onChange={(e) => setMemberForm({ ...memberForm, phone: e.target.value })} />
              <select className="field" value={memberForm.activePlan} onChange={(e) => setMemberForm({ ...memberForm, activePlan: e.target.value })}>
                <option value="">No Active Plan</option>
                {planOptions.map((p) => (
                  <option key={p.value} value={p.value}>{p.label}</option>
                ))}
              </select>
              <input className="field" type="date" value={memberForm.planExpiry} onChange={(e) => setMemberForm({ ...memberForm, planExpiry: e.target.value })} />
              <div className="flex gap-2">
                <button className="btn-primary" type="submit">{editingMemberId ? "Update" : "Create"}</button>
                <button className="btn-secondary" type="button" onClick={() => { setEditingMemberId(""); setMemberForm(initialMember); }}>Reset</button>
              </div>
            </form>

            <div className="card overflow-auto">
              <table className="w-full text-sm">
                <thead className="bg-zinc-50 text-zinc-600">
                  <tr>
                    <th className="px-4 py-3 text-left">Name</th>
                    <th className="px-4 py-3 text-left">Email</th>
                    <th className="px-4 py-3 text-left">Phone</th>
                    <th className="px-4 py-3 text-left">Plan</th>
                    <th className="px-4 py-3 text-left">Expiry</th>
                    <th className="px-4 py-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading && <tr><td className="px-4 py-3" colSpan={6}>Loading...</td></tr>}
                  {!loading && members.map((m) => (
                    <tr key={m._id} className="border-t border-zinc-100">
                      <td className="px-4 py-3 font-medium">{m.name}</td>
                      <td className="px-4 py-3">{m.email}</td>
                      <td className="px-4 py-3">{m.phone || "-"}</td>
                      <td className="px-4 py-3">{m.activePlan?.name || "None"}</td>
                      <td className="px-4 py-3">{m.planExpiry ? new Date(m.planExpiry).toLocaleDateString() : "-"}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button
                            className="btn-secondary"
                            onClick={() => {
                              setEditingMemberId(m._id);
                              setMemberForm({
                                name: m.name || "",
                                email: m.email || "",
                                password: "",
                                phone: m.phone || "",
                                activePlan: m.activePlan?._id || "",
                                planExpiry: m.planExpiry ? new Date(m.planExpiry).toISOString().slice(0, 10) : "",
                              });
                            }}
                          >
                            Edit
                          </button>
                          <button className="btn-danger" onClick={() => deleteItem(`/api/admin/members/${m._id}`)}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
