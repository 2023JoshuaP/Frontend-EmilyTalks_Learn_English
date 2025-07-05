import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthCard from '../components/molecules/AuthCard';
import Input from '../components/atoms/Input';
import Button from '../components/atoms/Button';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle login
    console.log('Login data:', formData);
    navigate('/home');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <AuthCard title="Iniciar sesión">
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Correo electrónico"
          name="email"
          type="email"
          placeholder="tu@email.com"
          value={formData.email}
          onChange={handleChange}
          required
        />
        
        <Input
          label="Contraseña"
          name="password"
          type="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={handleChange}
          required
        />
        
        <Button type="submit" className="w-full" size="lg">
          Ingresar
        </Button>
      </form>
      
      <div className="text-center">
        <p className="text-muted-foreground">
          ¿No tienes una cuenta?{' '}
          <button
            onClick={() => navigate('/register')}
            className="text-primary hover:underline font-medium"
          >
            Regístrate
          </button>
        </p>
      </div>
    </AuthCard>
  );
};

export default Login;