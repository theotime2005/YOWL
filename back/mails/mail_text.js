// This file is only for the mmails documents
// It's use for reduce the files content

const {config} = require("dotenv");
exports.confirmation_subscription = (user_name) => {
    const content = `
    <body>
    <h1>Confirmation</h1>
    <p>Bonjour ${user_name}. Votre compte vous attend. Rejoignez la communauté de <sgrong>PETS</sgrong> et découvrez la vie de nombreux animaux</p>
    <p>A très bientôt sur <strong>PETS</strong>!!!</p>
    <footer>
    <p>Copyright © Pets INC</p>
    </footer>
    </body>
    `;
    const style = `
    <style>
    /* Style de base */
    body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
    }
    
    h1 {
        color: #333;
    }
    
    h2 {
        color: #555;
    }
    
    p {
        color: #666;
    }
    
    strong {
        font-weight: bold;
    }
    
    footer {
        background-color: #f0f0f0;
        padding: 10px 0;
        text-align: center;
    }
    
    /* Style personnalisé */
    sgrong {
        /* Style spécifique pour la balise sgrong (corrigez probablement une faute de frappe dans votre HTML) */
        color: red; /* Par exemple */
    }
    
    /* Vous pouvez ajouter d'autres styles personnalisés selon vos préférences */
    </style>    
    `;
    document_email= `
    <!DOCTYPE html>
    <html langue="fr">
        ${content}
        ${style}
     </html>
     `;
    return document_email
}