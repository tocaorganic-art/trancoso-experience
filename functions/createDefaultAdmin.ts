import { createClientFromRequest } from 'npm:@base44/sdk@0.8.4';
import { hash } from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);
  
  try {
    console.log('Iniciando criação de admin...');

    // Deletar admins existentes
    const existing = await base44.asServiceRole.entities.AdminUser.list();
    console.log(`Admins existentes: ${existing.length}`);
    
    for (const admin of existing) {
      await base44.asServiceRole.entities.AdminUser.delete(admin.id);
      console.log(`Admin deletado: ${admin.email}`);
    }

    // Gerar hash
    console.log('Gerando hash da senha...');
    const passwordHash = await hash('TocaAdmin2024!');
    console.log('Hash gerado com sucesso');

    // Criar admin
    const newAdmin = await base44.asServiceRole.entities.AdminUser.create({
      email: 'admin@tocaexperience.com',
      password_hash: passwordHash,
      full_name: 'Administrador Toca',
      role: 'super_admin',
      is_active: true
    });

    console.log('Admin criado:', newAdmin.id);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Admin criado com sucesso!',
        credentials: {
          email: 'admin@tocaexperience.com',
          password: 'TocaAdmin2024!'
        },
        admin_id: newAdmin.id
      }),
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error('ERRO:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: error.toString()
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
});