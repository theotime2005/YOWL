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
    
    sgrong {
        color: red;
    }
    
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

exports.forgot_password = (username, user_token) => {
    const document = `
<!DOCTYPE=html>
<html langue="fr">
    <body>
        <h1>Réinitialisation du mot de passe</h1>
        <p>Bonjour ${username}. Vous avez demandé la réinitialisation de votre mot de passe. Cliquez sur le lien ci-dessous pour procéder à la réinitialisation.</p>
        <a href="http://localhost:5173/reset_password?token=${encodeURIComponent(user_token)}">Rréinitialiser mon mot de passe</a>
        <p>Si vous n'êtes pas à l'origine de cette demande, vous pouvez ignorer ce message.</p>
        <footer>
            <p>Copyright © PETS INC</p>
            <p>Ceci est un message automatique, merci de ne pas y répondre.</p>
</footer>
    </body>
    <style>
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f2f2f2;
}

h1 {
    color: #333;
    text-align: center;
    margin-top: 50px;
}

p {
    color: #555;
    text-align: center;
    margin: 10px 0;
}

a {
    display: block;
    width: 200px;
    margin: 20px auto;
    padding: 10px;
    text-align: center;
    background-color: #007bff;
    color: #fff;
    text-decoration: none;
    border-radius: 5px;
}

a:hover {
    background-color: #0056b3;
}

footer {
    margin-top: 50px;
    background-color: #333;
    color: #fff;
    padding: 20px 0;
    text-align: center;
}
    </style>
</html>
    `;
    return document;
}