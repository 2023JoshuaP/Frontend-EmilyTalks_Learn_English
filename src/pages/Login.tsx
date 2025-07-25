import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthCard from '../components/molecules/AuthCard';
import Input from '../components/atoms/Input';
import Button from '../components/atoms/Button';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
        credentials: 'include'
      });

      if (response.ok) {
        console.log('Login exitoso');
        navigate('/home');
      } else {
        console.error('Error en login', response.status);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
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
          label="Nombre de usuario"
          name="username"
          type="text"
          placeholder="Tu nombre de usuario"
          value={formData.username}
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
