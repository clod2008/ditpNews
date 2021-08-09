<?php

if (empty($_POST["name"])) {
    exit("Falta el nombre");
}

if (empty($_POST["mail"])) {
    exit("Falta el correo");
}

if (empty($_POST["message"])) {
    exit("Falta el mensaje");
}

$name = $_POST["name"];
$mail = $_POST["mail"];
$message = $_POST["message"];

$mail = filter_var($mail, FILTER_VALIDATE_EMAIL);
if (!$mail) {
    echo "Correo inválido. Intenta con otro correo.";
    exit;
}

$asunto = "Nuevo mensaje de sitio web";

$datos = "De: $name\nCorreo: $mail\nMensaje: $message";
$mensaje = "Has recibido un mensaje desde el formulario de contacto de tu sitio web. Aquí están los detalles:\n$datos";
$destinatario = "claudio@apsis.com.ar"; # aquí la persona que recibirá los mensajes
$encabezados = "Sender: claudio@apsis.com.ar\r\n"; # El remitente, debe ser un correo de tu dominio de servidor
$encabezados .= "From: $name <" . $mail . ">\r\n";
$encabezados .= "Reply-To: $name <$mail>\r\n";
$resultado = mail($destinatario, $asunto, $mensaje, $encabezados);
if ($resultado) {
    echo "<h1>Mensaje enviado, ¡Gracias por contactarme!</h1>";
    echo "<p>Tu mensaje se ha enviado correctamente.</p><h2>Importante</h2><p>Revisa tu bandeja de SPAM, en ocasiones mis respuestas quedan ahí. </p>";
} else {
    echo "Tu mensaje no se ha enviado. Intenta de nuevo.";
}