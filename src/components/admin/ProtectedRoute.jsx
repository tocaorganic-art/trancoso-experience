import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function ProtectedRoute({ children }) {
  const [authorized, setAuthorized] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const access = localStorage.getItem('admin_access');
    
    if (access === 'granted') {
      setAuthorized(true);
    } else {
      navigate(createPageUrl('AdminLogin'));
    }
  }, [navigate]);

  return authorized ? children : null;
}