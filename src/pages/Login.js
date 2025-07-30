import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Invalid email format');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    const isSuccess = login(email, password);
    if (isSuccess) {
      navigate('/');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <>
      <Header minimal />
      <div className="container my-5">
        <div className="row shadow p-4 rounded" style={{ backgroundColor: '#fff' }}>
          {/* Left side (image/info) */}
          <div className="col-md-6 d-none d-md-flex align-items-center justify-content-center bg-light rounded-start">
            <img
              src="https://img.freepik.com/free-vector/ecommerce-concept-illustration_114360-823.jpg"
              alt="login banner"
              className="img-fluid p-3"
              style={{ maxHeight: '350px' }}
            />
          </div>

          {/* Right side (form) */}
          <div className="col-md-6 px-4 py-3">
            <h3 className="mb-4 text-primary">Login</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {error && <div className="text-danger mb-3">{error}</div>}

              <button type="submit" className="btn btn-primary w-100">Login</button>

              <p className="text-center text-dark mt-3">
                Don’t have an account?{' '}
                <a href="/signup" className="text-decoration-none text-primary">Sign Up</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;