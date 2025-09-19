import React, { useContext, useState } from 'react';
import api from '../../../api/axiosConfig';
import { AuthContext } from '../../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import type { LoginResponse } from '../../../types/api';
import type { UserRole } from '../../../types';
import '../../../styles/forms.css';
import Navbar from '../homePage/Navbar';
import TopBar from '../homePage/TopBar';
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import IconButton from '@mui/material/IconButton';

const Login: React.FC = () => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState<{ type: 'error'; message: string } | null>(null);

  const context = useContext(AuthContext);
  const navigate = useNavigate();

  if (!context) return null;
  const { login } = context;

  const handleLogin = async () => {
    try {
      const isFarmer = /^\d+$/.test(emailOrPhone);
      const endpoint = isFarmer ? 'loginFarmer' : 'login';
      const payload = isFarmer
        ? { farmer_phone: emailOrPhone, farmer_password: password }
        : { user_email: emailOrPhone, user_password: password };
      console.log(api.auth_api.defaults.baseURL);
      
      const res = await api.auth_api.post<LoginResponse>(`/auth/${endpoint}`, payload);
  
      if(isFarmer){
        login({
          role: 'farmer' as UserRole,
          ...(res as any).data.farmer
        });
      } else {
        login({
          role: res.data.user.user_role as UserRole,
          ...(res as any).data.user
        });
      }

        navigate(isFarmer ? '/farmer' : res.data.user.user_role === "admin" ? '/admin' : res.data.user.user_role === "vendor" ? '/vendor' : res.data.user.user_role === "doctor" ? '/doctor' : res.data.user.user_role === "organisation" ? '/organisation' : res.data.user.user_role === "hospital" ? '/hospital' : res.data.user.user_role === "Animal Enthusiasts" ? '/enthusiasts' : res.data.user.user_role === "lab" ? '/lab' : '/register');
      } catch (error) {
    setToast({ type: 'error', message: 'Login failed! Incorrect Email or Password' });
    setTimeout(() => setToast(null), 5000);
  }

  };

  return (
    <>
      {/* <TopBar/> */}
      <Navbar />

      {toast && (
      <div className={`global-toast ${toast.type}`}>
        <span>{toast.message}</span>
        <button
          className="toast-close"
          onClick={() => setToast(null)}
          aria-label="Close"
        >
          ×
        </button>
      </div>
    )}

      <div className="center-page-lr">
        <div className="form-container">
          <h2 className="form-title1">Login</h2>
          <div className="form-group">
            <input 
              className="form-input"
              value={emailOrPhone} 
              onChange={(e) => setEmailOrPhone(e.target.value)} 
              placeholder="Email or Phone" 
            />
          </div>
          <div className="form-group">
            <input 
              className="form-input"
              type={showPassword ? "text" : "password"}
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Password" 
            />
            <IconButton
              type="button"
              className='password-toggle2'
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword((s) => !s)}
              onMouseDown={(e) => e.preventDefault()}
              style={{ position: "relative", right: "-38rem", top: "-2rem", transform: "translateY(-50%)" }}
            >
              {showPassword ? <VisibilityOffOutlinedIcon /> : <RemoveRedEyeOutlinedIcon />}
            </IconButton>
          </div>
          <button className="form-button" onClick={handleLogin}>Login</button>
          <div className="form-footer">
            <p>Don't have an account? <Link to="/register">Register here</Link></p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
