Deno.serve(async (req) => {
    try {
        const body = await req.json();
        const email = body.email;
        const name = body.name || '';

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return Response.json({ error: 'E-mail inválido' }, { status: 400 });
        }

        const apiKey = Deno.env.get("BREVO_API_KEY");

        if (!apiKey) {
            return Response.json({ error: 'Configuração do Brevo ausente' }, { status: 500 });
        }

        const response = await fetch('https://api.brevo.com/v3/contacts', {
            method: 'POST',
            headers: {
                'api-key': apiKey,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                attributes: {
                    FIRSTNAME: name || '',
                },
                listIds: [2],
                updateEnabled: true
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            // Se o e-mail já está inscrito (duplicate)
            if (data.code === 'duplicate_parameter') {
                return Response.json({ 
                    success: true, 
                    message: 'Este e-mail já está cadastrado na nossa lista!' 
                });
            }
            return Response.json({ error: data.message || 'Erro ao cadastrar' }, { status: response.status });
        }

        return Response.json({ 
            success: true, 
            message: 'Cadastro realizado com sucesso!' 
        });

    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
});