

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

// Assurez-vous que vos variables d'environnement sont correctement nommées dans votre fichier .env
const supabaseUrl = process.env.VITE_SUPABASE_URL;
// IMPORTANT : Pour cette opération, vous devez utiliser la clé de service (SERVICE_ROLE_KEY)
const supabaseKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Erreur: Assurez-vous que VITE_SUPABASE_URL et VITE_SUPABASE_SERVICE_ROLE_KEY sont définis dans votre fichier .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function addAdmin() {
  const name = 'sasaki';
  const email = 'sasakicompagnie@gmail.com';
  const password = 'rayanpetit242';

  console.log(`Tentative de création de l'utilisateur ${email}...`);

  // 1. Créer l'utilisateur dans le système d'authentification de Supabase
  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email: email,
    password: password,
    email_confirm: true, // Confirme l'email automatiquement
  });

  if (authError) {
    console.error('Erreur lors de la création de l'utilisateur (auth):', authError.message);
    return;
  }

  console.log('Utilisateur créé avec succès dans le système d'authentification.');
  const userId = authData.user.id;

  // 2. Ajouter l'utilisateur dans la table publique `users` avec le rôle admin
  const { error: publicUserError } = await supabase
    .from('users')
    .insert({
      id: userId,       // Doit correspondre à l'ID de l'utilisateur authentifié
      name: name,
      email: email,
      role: 'admin',    // Définir le rôle
    });

  if (publicUserError) {
    console.error('Erreur lors de l'ajout de l'utilisateur dans la table publique:', publicUserError.message);
    // En cas d'échec, supprimer l'utilisateur créé pour éviter les données orphelines
    await supabase.auth.admin.deleteUser(userId);
    console.log('L'utilisateur créé a été nettoyé du système d'authentification.');
    return;
  }

  console.log(`\n🎉 Succès ! L'administrateur '${name}' (${email}) a été ajouté.`);
}

addAdmin();

