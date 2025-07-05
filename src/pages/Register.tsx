import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthCard from '../components/molecules/AuthCard';
import Input from '../components/atoms/Input';
import Button from '../components/atoms/Button';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Registration data:', formData);
    navigate('/home');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <AuthCard title="Registrarse">
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Nombre completo"
          name="nombre"
          type="text"
          placeholder="Tu nombre completo"
          value={formData.nombre}
          onChange={handleChange}
          required
        />
        
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
          Crear cuenta
        </Button>
      </form>
      
      <div className="text-center">
        <p className="text-muted-foreground">
          ¿Ya tienes una cuenta?{' '}
          <button
            onClick={() => navigate('/login')}
            className="text-primary hover:underline font-medium"
          >
            Inicia sesión
          </button>
        </p>
      </div>
    </AuthCard>
  );
};

export default Register;