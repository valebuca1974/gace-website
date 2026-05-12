<?php
// Permitir CORS si se necesita
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data || !isset($data['lead_data'])) {
    http_response_code(400);
    echo json_encode(["success" => false, "error" => "Invalid payload"]);
    exit();
}

$lead = $data['lead_data'];
$name = htmlspecialchars(strip_tags($lead['name'] ?? ''));
$email = filter_var($lead['email'] ?? '', FILTER_SANITIZE_EMAIL);
$phone = htmlspecialchars(strip_tags($lead['phone'] ?? ''));
$message = htmlspecialchars(strip_tags($lead['message'] ?? ''));

if (empty($name) || empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["success" => false, "error" => "Missing or invalid name/email"]);
    exit();
}

$to = "direccion@gaceempaques.mx"; // Email de destino principal
$subject = "Nuevo Lead B2B - Web GACE: " . $name;
$from = "direccion@gaceempaques.mx"; // Sender email, debe coincidir con el dominio en IONOS

// Construir el cuerpo del correo en HTML
$htmlBody = "
<html>
<head><title>Nuevo Contacto Web</title></head>
<body style='font-family: Arial, sans-serif; color: #333;'>
    <h2>Nuevo Contacto desde la Web (GACE)</h2>
    <table border='0' cellpadding='5'>
        <tr><td><strong>Nombre:</strong></td><td>{$name}</td></tr>
        <tr><td><strong>Email:</strong></td><td><a href='mailto:{$email}'>{$email}</a></td></tr>
        <tr><td><strong>Teléfono:</strong></td><td>{$phone}</td></tr>
    </table>
    <h3>Mensaje:</h3>
    <p style='background: #f9f9f9; padding: 15px; border-left: 4px solid #f68e21;'>
        " . nl2br($message) . "
    </p>
</body>
</html>
";

$headers  = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= "From: GACE Web <{$from}>" . "\r\n";
$headers .= "Reply-To: {$email}" . "\r\n";

$mailSent = mail($to, $subject, $htmlBody, $headers);

// Correo de auto-respuesta al cliente
$clientSubject = "Hemos recibido tu mensaje - GACE Empaques";
$clientBody = "
<html>
<body style='font-family: Arial, sans-serif;'>
    <p>Hola {$name},</p>
    <p>Hemos recibido tu solicitud de cotización correctamente. Un agente de ventas la está revisando y se pondrá en contacto contigo pronto.</p>
    <p>Si es urgente, puedes enviarnos un WhatsApp al <a href='https://wa.me/525586763800'>55 8676 3800</a>.</p>
    <p>Atentamente,<br>El equipo de GACE Empaques</p>
</body>
</html>
";
$clientHeaders  = "MIME-Version: 1.0" . "\r\n";
$clientHeaders .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$clientHeaders .= "From: GACE Ventas <{$from}>" . "\r\n";
mail($email, $clientSubject, $clientBody, $clientHeaders);

if ($mailSent) {
    http_response_code(200);
    echo json_encode(["success" => true]);
} else {
    http_response_code(500);
    echo json_encode(["success" => false, "error" => "Failed to send email via mail()"]);
}
?>
