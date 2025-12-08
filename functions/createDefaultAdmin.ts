import { createClientFromRequest } from 'npm:@base44/sdk@0.8.4';
import * as bcrypt from 'https://deno.land/x/bcrypt@v0.4.1/mod.ts';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    // Deletar todos os admins existentes primeiro
    const existing = await base44.asServiceRole.entities.AdminUser.list();
    for (const admin of existing) {
      await base44.asServiceRole.entities.AdminUser.delete(admin.id);
    }

    console.log('Admins anteriores deletados');

    // Gerar hash da senha corretamente
    const passwordHash = await bcrypt.hash('TocaAdmin2024!');
    
    console.log('Hash gerado para TocaAdmin2024!');

    // Criar novo admin
    const newAdmin = await base44.asServiceRole.entities.AdminUser.create({
      email: 'admin@tocaexperience.com',
      password_hash: passwordHash,
      full_name: 'Administrador Toca',
      role: 'super_admin',
      is_active: true
    });

    console.log('Admin criado:', newAdmin.id);

    return Response.json({
      success: true,
      message: 'Admin padrão criado com sucesso',
      credentials: {
        email: 'admin@tocaexperience.com',
        password: 'TocaAdmin2024!'
      },
      admin: {
        id: newAdmin.id,
        email: newAdmin.email
      }
    });
  } catch (error) {
    console.error('Erro ao criar admin:', error);
    return Response.json({ 
      error: error.message,
      stack: error.stack 
    }, { status: 500 });
  }
});