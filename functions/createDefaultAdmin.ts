import { createClientFromRequest } from 'npm:@base44/sdk@0.8.4';
import * as bcrypt from 'https://deno.land/x/bcrypt@v0.4.1/mod.ts';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    // Deletar todos os admins existentes
    const existingAdmins = await base44.asServiceRole.entities.AdminUser.list();
    for (const admin of existingAdmins) {
      await base44.asServiceRole.entities.AdminUser.delete(admin.id);
    }

    console.log('Admins antigos deletados');

    // Criar novo admin com hash correto
    const passwordHash = await bcrypt.hash('TocaAdmin2024!');
    
    console.log('Hash gerado:', passwordHash);

    const newAdmin = await base44.asServiceRole.entities.AdminUser.create({
      email: 'admin@tocaexperience.com',
      password_hash: passwordHash,
      full_name: 'Administrador Toca',
      role: 'super_admin',
      is_active: true
    });

    console.log('Admin criado:', newAdmin);

    return Response.json({
      success: true,
      message: 'Admin criado com sucesso',
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
    return Response.json({ error: error.message }, { status: 500 });
  }
});