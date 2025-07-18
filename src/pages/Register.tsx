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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      username: formData.nombre,
      email: formData.email,
      password: formData.password,
      roles: ['USER']
    };

    try {
      const response = await fetch('http://localhost:8080/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        console.log('Registro exitoso');
        navigate('/home');
      } else {
        console.error('Error al registrar', response.status);
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
    <AuthCard title="Registrarse">
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Nombre de usuario"
          name="nombre"
          type="text"
          placeholder="Tu nombre de usuario"
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
