"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";

export default function AddSchool() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    setMessage(null);
    try {
      const formData = new FormData();
      for (const key of Object.keys(data)) {
        formData.append(key, data[key]);
      }
      // `image` is a FileList
      if (data.image && data.image.length > 0) formData.set("image", data.image[0]);

      const res = await fetch("/api/addSchool", {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      if (res.ok) {
        setMessage({ type: "success", text: "School added successfully." });
        reset();
      } else {
        setMessage({ type: "error", text: result.error || result.message || "Failed" });
      }
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Add School</h1>
        <a href="/showSchools" className="small">View Schools →</a>
      </div>

      <div className="card form" style={{maxWidth:700}}>
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <label>School Name
            <input {...register("name", { required: true })} placeholder="Ex: St. Mary's High School" />
            {errors.name && <div className="small" style={{color:'#dc2626'}}>Name is required</div>}
          </label>

          <label>Address
            <input {...register("address", { required: true })} placeholder="Street, area, landmark" />
            {errors.address && <div className="small" style={{color:'#dc2626'}}>Address is required</div>}
          </label>

          <label>City
            <input {...register("city", { required: true })} placeholder="City" />
            {errors.city && <div className="small" style={{color:'#dc2626'}}>City is required</div>}
          </label>

          <label>State
            <input {...register("state", { required: true })} placeholder="State" />
            {errors.state && <div className="small" style={{color:'#dc2626'}}>State is required</div>}
          </label>

          <label>Contact Number
            <input type="tel" {...register("contact", { required: true, minLength:7, maxLength:20 })} placeholder="Phone number" />
            {errors.contact && <div className="small" style={{color:'#dc2626'}}>Valid contact required</div>}
          </label>

          <label>Email
            <input type="email" {...register("email_id", { required: true, pattern: /^\S+@\S+$/i })} placeholder="Email address" />
            {errors.email_id && <div className="small" style={{color:'#dc2626'}}>Valid email required</div>}
          </label>

          <label>Image
            <input type="file" accept="image/*" {...register("image", { required: true })} />
            {errors.image && <div className="small" style={{color:'#dc2626'}}>Image is required</div>}
          </label>

          <div style={{marginTop:12}}>
            <button type="submit" className="button" disabled={loading}>{loading ? "Uploading..." : "Submit"}</button>
          </div>
        </form>

        {message && (
          <div style={{marginTop:12}} className={message.type === "success" ? "small" : "small"}>
            {message.text}
          </div>
        )}
      </div>
    </div>
  );
}