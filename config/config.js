/* =====================================================================
   CONFIGURATION DU SITE — IA ACADEMY (Formation Google Flow)
   ---------------------------------------------------------------------
   C'est le SEUL fichier à modifier pour changer les liens et les prix.
   Ne touche pas à index.html.

   Règles :
   - Garde les guillemets "..." autour de chaque valeur.
   - Laisse "" (vide) si tu n'as pas encore le lien : le site s'adapte.
   - Numéros WhatsApp : chiffres seulement, avec l'indicatif, sans + ni espace.
   ===================================================================== */

window.SITE_CONFIG = {

  // ----- PAIEMENT -----
  // Lien de paiement Chariow (boutons « Payer maintenant » et « Rejoindre »)
  paiement: "https://chariow.ly/3POWEQJ79O/checkout",

  // ----- PRIX -----
  prix: "2 500 F",          // prix affiché partout
  prixBarre: "4 000 F",     // ancien prix barré
  placesPromo: "50",        // « réservé aux 50 premiers inscrits »

  // ----- VIDÉOS YOUTUBE -----
  // Colle le lien YouTube complet. Vide = « La vidéo arrive très bientôt ».
  youtubeOpportunite: "https://youtube.com/shorts/jmtSbyNYJgA",
  // Image de couverture de la vidéo (laisse "" pour prendre celle de YouTube)
  couvertureVideo: "assets/couverture-video.jpg",
  // Format des vidéos YouTube : "vertical" (TikTok / Short) ou "horizontal"
  formatVideo: "vertical",
  // Vidéo « comment payer ». Vide = la section est cachée.
  youtubeCommentPayer: "https://youtube.com/shorts/jJhKxUR5iMw",
  // Image de couverture de la vidéo « comment payer »
  couvertureVideoPaiement: "assets/couverture-paiement.jpg",

  // ----- CONTACTS -----
  whatsapp1: "2250501436408",
  whatsapp2: "2250709743973",
  telegram: "Bouodigital",   // sans le @

  // ----- RÉSEAUX -----
  tiktokFormateur: "https://www.tiktok.com/@badybuisness2.0"

};
