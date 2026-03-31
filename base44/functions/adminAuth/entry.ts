import { createClientFromRequest } from 'npm:@base44/sdk@0.8.4';
import * as bcrypt from 'https://deno.land/x/bcrypt@v0.4.1/mod.ts';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { action, email, password, token } = await req.json();

    console.log('adminAuth called:', { action, email: email || 'N/A' });

    switch (action) {
      case 'login':
        return await handleLogin(base44, email, password);
      
      case 'verify':
        return await handleVerify(base44, token);
      
      case 'create_default':
        return await createDefaultAdmin(base44);
      
      default:
        return Response.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('Erro em adminAuth:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});

async function handleLogin(base44, email, password) {
  if (!email || !password) {
    return Response.json({ error: 'Email e senha são obrigatórios' }, { status: 400 });
  }

  console.log('Tentando login para:', email);

  // Buscar admin
  const admins = await base44.asServiceRole.entities.AdminUser.filter({ email });
  
  console.log('Admins encontrados:', admins.length);

  if (admins.length === 0) {
    console.log('Nenhum admin encontrado para:', email);
    return Response.json({ error: 'Credenciais inválidas' }, { status: 401 });
  }

  const admin = admins[0];

  console.log('Admin encontrado:', { id: admin.id, email: admin.email, is_active: admin.is_active });

  if (!admin.is_active) {
    console.log('Admin inativo');
    return Response.json({ error: 'Conta desativada' }, { status: 401 });
  }

  // Verificar senha
  console.log('Verificando senha...');
  const isValid = await bcrypt.compare(password, admin.password_hash);
  
  console.log('Senha válida:', isValid);

  if (!isValid) {
    return Response.json({ error: 'Credenciais inválidas' }, { status: 401 });
  }

  // Atualizar último login
  await base44.asServiceRole.entities.AdminUser.update(admin.id, {
    last_login: new Date().toISOString()
  });

  // Gerar token
  const token = btoa(JSON.stringify({
    id: admin.id,
    email: admin.email,
    role: admin.role,
    exp: Date.now() + (24 * 60 * 60 * 1000)
  }));

  console.log('Login bem-sucedido para:', email);

  return Response.json({
    success: true,
    token,
    admin: {
      id: admin.id,
      email: admin.email,
      full_name: admin.full_name,
      role: admin.role
    }
  });
}

async function handleVerify(base44, token) {
  if (!token) {
    return Response.json({ error: 'Token não fornecido' }, { status: 401 });
  }

  try {
    const decoded = JSON.parse(atob(token));
    
    if (decoded.exp < Date.now()) {
      return Response.json({ error: 'Token expirado' }, { status: 401 });
    }

    const admins = await base44.asServiceRole.entities.AdminUser.filter({ 
      id: decoded.id,
      is_active: true 
    });

    if (admins.length === 0) {
      return Response.json({ error: 'Admin não encontrado' }, { status: 401 });
    }

    return Response.json({
      success: true,
      admin: {
        id: decoded.id,
        email: decoded.email,
        role: decoded.role
      }
    });
  } catch (error) {
    return Response.json({ error: 'Token inválido' }, { status: 401 });
  }
}

async function createDefaultAdmin(base44) {
  const existing = await base44.asServiceRole.entities.AdminUser.filter({ 
    email: 'admin@tocaexperience.com' 
  });

  if (existing.length > 0) {
    return Response.json({ 
      message: 'Admin padrão já existe',
      email: 'admin@tocaexperience.com'
    });
  }

  const passwordHash = await bcrypt.hash('TocaAdmin2024!');
  
  await base44.asServiceRole.entities.AdminUser.create({
    email: 'admin@tocaexperience.com',
    password_hash: passwordHash,
    full_name: 'Administrador Toca',
    role: 'super_admin',
    is_active: true
  });

  return Response.json({
    success: true,
    message: 'Admin padrão criado com sucesso',
    credentials: {
      email: 'admin@tocaexperience.com',
      password: 'TocaAdmin2024!'
    }
  });
}