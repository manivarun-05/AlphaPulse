import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import './Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegister, setIsRegister] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login, register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (isRegister) {
                await register(email, password);
                setIsRegister(false);
                setError('Account created! Please login.');
            } else {
                await login(email, password);
                navigate('/');
            }
        } catch (err) {
            setError(err.response?.data?.detail || 'An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-glass-card">
                <div className="login-header">
                    <div className="logo-badge">α</div>
                    <h1>AlphaPulse</h1>
                    <p>{isRegister ? 'Join the elite traders' : 'Welcome back, Trader'}</p>
                </div>

                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    <button type="submit" className="login-button" disabled={loading}>
                        {loading ? 'Processing...' : (isRegister ? 'Create Account' : 'Sign In')}
                    </button>
                </form>

                <div className="login-footer">
                    <p>
                        {isRegister ? 'Already have an account?' : "Don't have an account?"}
                        <button onClick={() => setIsRegister(!isRegister)} className="switch-auth">
                            {isRegister ? 'Sign In' : 'Register Now'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
