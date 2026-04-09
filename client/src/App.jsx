import { useState } from "react";
import "./App.css";

function App() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    plan: "",
    duration: "",
    payment: "",
    autoRenew: false,
  });

  const [subscriptions, setSubscriptions] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Backend call
    const res = await fetch("/subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    alert(data.message);

    // Add to list (UI)
    setSubscriptions([...subscriptions, form]);

    // Reset form
    setForm({
      name: "",
      email: "",
      plan: "",
      duration: "",
      payment: "",
      autoRenew: false,
    });
  };

  const handleDelete = (index) => {
    const updated = subscriptions.filter((_, i) => i !== index);
    setSubscriptions(updated);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <h2>Subscription 💳</h2>

        <input name="name" placeholder="Enter Name" value={form.name} onChange={handleChange} required />
        <input name="email" placeholder="Enter Email" value={form.email} onChange={handleChange} required />

        <select name="plan" value={form.plan} onChange={handleChange} required>
          <option value="">Select Plan</option>
          <option>Basic</option>
          <option>Premium</option>
          <option>Pro</option>
        </select>

        <select name="duration" value={form.duration} onChange={handleChange} required>
          <option value="">Duration</option>
          <option>1 Month</option>
          <option>6 Months</option>
          <option>1 Year</option>
        </select>

        <select name="payment" value={form.payment} onChange={handleChange} required>
          <option value="">Payment Method</option>
          <option>UPI</option>
          <option>Card</option>
          <option>Net Banking</option>
        </select>

        <label className="checkbox">
          <input type="checkbox" name="autoRenew" checked={form.autoRenew} onChange={handleChange} />
          Auto Renew
        </label>

        <button type="submit">Subscribe</button>
      </form>

      {/* TABLE */}
      <div className="table">
        <h3>Subscriptions</h3>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Plan</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {subscriptions.map((sub, index) => (
              <tr key={index}>
                <td>{sub.name}</td>
                <td>{sub.email}</td>
                <td>{sub.plan}</td>
                <td>
                  <button className="delete" onClick={() => handleDelete(index)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;