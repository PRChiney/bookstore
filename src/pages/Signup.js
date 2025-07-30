import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

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
    try {
      signup(name, email, password);
      setSuccess(true);
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <Header minimal />
      <div className="container my-5">
        <div className="row shadow p-4 rounded" style={{ backgroundColor: '#fff' }}>
          {/* Left banner/image section */}
          <div className="col-md-6 d-none d-md-flex align-items-center justify-content-center bg-light rounded-start">
            <img
              src="/logo.png"
              alt="signup banner"
              className="img-fluid p-3"
              style={{ maxHeight: '350px' }}
            />
          </div>

          {/* Right form section */}
          <div className="col-md-6 px-4 py-3">
            <h3 className="mb-4 text-primary">Sign Up</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
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

              <button type="submit" className="btn btn-primary w-100">Sign Up</button>

              {success && <div className="text-success mt-3">Signup successful! Redirecting...</div>}

              <p className="text-center mt-3 text-dark">
                Already have an account?{' '}
               <Link to="/login">Sign Up</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;