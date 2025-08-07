import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Erreur: VITE_SUPABASE_URL et VITE_SUPABASE_SERVICE_ROLE_KEY doivent être définis dans le fichier .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function addAdmin() {
  const name = 'sasaki';
  const email = 'sasakicompagnie@gmail.com';
  const password = 'rayanpetit242';

  console.log(`Tentative de création de l'utilisateur ${email}...`);

  try {
    // 1. Créer l'utilisateur
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: email,
      password: password,
      email_confirm: true,
    });

    if (authError) {
      throw new Error(`Erreur lors de la création de l'utilisateur (auth): ${authError.message}`);
    }

    console.log('Utilisateur créé avec succès dans le système d\'authentification.');
    const userId = authData.user.id;

    // 2. Insérer dans la table publique `users`
    const { error: publicUserError } = await supabase
      .from('users')
      .insert({
        id: userId,
        name: name,
        email: email,
        role: 'admin',
      });

    if (publicUserError) {
      // Si l'insertion échoue, supprimer l'utilisateur pour nettoyer
      await supabase.auth.admin.deleteUser(userId);
      throw new Error(`Erreur lors de l'insertion dans la table publique: ${publicUserError.message}`);
    }

    console.log(`\n🎉 Succès ! L'administrateur '${name}' (${email}) a été ajouté.`);

  } catch (error) {
    console.error('\n❌ Une erreur est survenue:', error.message);
  }
}

addAdmin();