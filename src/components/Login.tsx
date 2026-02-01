import React, { useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Card } from "primereact/card";
import { FloatLabel } from "primereact/floatlabel";
import { Checkbox } from "primereact/checkbox";
import { login } from "../services/authServices";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const toast = useRef<Toast>(null);
  const navigate = useNavigate();

  const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      toast.current?.show({
        severity: "warn",
        summary: "Missing fields",
        detail: "Username and password are required",
        life: 3000,
      });
      return;
    }

    try {
      setLoading(true);

      const data = await login({ username, password });

      localStorage.setItem("token", data.token);
      if (rememberMe) {
        localStorage.setItem("rememberUser", username);
      }

      toast.current?.show({
        severity: "success",
        summary: "Welcome!",
        detail: "Login successful",
        life: 2000,
      });

      await delay(1500);
      navigate("/products");

    } catch {
      toast.current?.show({
        severity: "error",
        summary: "Login failed",
        detail: "Invalid credentials",
        life: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (

    <div className="login-page-container">
      <Card title="🔐Login" className="card-login" >
        <Toast ref={toast} />

        <form onSubmit={handleSubmit} className="professional-form" >
          {/* Username */}
          <FloatLabel>
            <InputText
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
              className="p-inputtext-lg"
            />
            <label htmlFor="username">Username</label>
          </FloatLabel>

          {/* Password */}
          <FloatLabel>
            <Password
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              toggleMask
              feedback={false}
              disabled={loading}
              className="p-inputtext-lg"
            />
            <label htmlFor="password">Password</label>
          </FloatLabel>

          {/* Remember me */}
          <div className="checkbox-container">
            <Checkbox
              inputId="remember"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.checked!)}
            />
            <label htmlFor="remember">Remember me</label>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            label={loading ? "Logging in..." : "Login"}
            icon="pi pi-sign-in"
            loading={loading}
            className="p-button-success p-button-lg"
          />
        </form>
      </Card>
    </div>

  );
};

export default Login;