<?php

// Inclui o arquivo class.phpmailer.php localizado na pasta class
require_once("class/class.phpmailer.php");

// Inicia a classe PHPMailer
$mail = new PHPMailer(true);
//$mail->SetLanguage("br", "libs/"); // ajusto a lingua a ser utilizadda

// Define os dados do servidor e tipo de conexão
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
$mail->IsSMTP(); // Define que a mensagem será SMTP

/* Recebe os dados do cliente ajax via POST */
$mensagem = $_POST['mensagem'];
$assunto = $_POST['assunto'];
$nomeRemetente = $_POST['nomeRemetente'];
$emailRemetente = $_POST['emailRemetente'];
$telefoneEmail = $_POST['telefoneEmail'];
$tipoEmailEnum = $_POST['tipoEmailEnum'];

$email = "igrejasgrandeflorianopolis@gmail.com";
$nome = "Igrejas Grande Florianópolis";

try {

     $mail->Host = 'smtp.gmail.com'; // Endereço do servidor SMTP (Autenticação, utilize o host smtp.seudomínio.com.br)
     $mail->SMTPAuth   = true;  // Usar autenticação SMTP (obrigatório para smtp.seudomínio.com.br)
     $mail->Port       = 465; //  Usar 587 porta SMTP
     $mail->SMTPSecure = 'ssl';
     $mail->Username = 'igrejasgrandeflorianopolis@gmail.com'; // Usuário do servidor SMTP (endereço de email)
     $mail->Password = 'informe_sua_senha'; // Senha do servidor SMTP (senha do email usado)
     $mail->SMTPDebug = 1;

     //Define o remetente
     // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
     $mail->SetFrom('igrejasgrandeflorianopolis@gmail.com', 'Igrejas Grande Florianópolis'); //Seu e-mail
     //$mail->AddReplyTo('igrejasgrandeflorianopolis@gmail.com', 'Igrejas Grande Florianópolis'); //Seu e-mail
     $mail->Subject = $assunto;//Assunto do e-mail

     //Define os destinatário(s)
     //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
     $mail->AddAddress($email, $nomeRemetente);
     $mail->AddAddress("hsd.foz@gmail.com", "Henrique");

     // Define os dados técnicos da Mensagem
    // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
    $mail->IsHTML(true); // Define que o e-mail será enviado como HTML
    $mail->CharSet = 'iso-8859-1'; // Charset da mensagem (opcional)

if ($tipoEmailEnum == 1)
 {
   $mensagem = "Pedido de Oração: <br/><br/>" . $mensagem;
 }
  if ($tipoEmailEnum == 2)
  {
    $mensagem = "Contato: <br/><br/>" . $mensagem;
    $mensagem = $mensagem . "<br/>";
    $mensagem = $mensagem . "<br/>--------------------------------------";
    $mensagem = $mensagem . "<br/>Dados do contato:";
    $mensagem = $mensagem . "<br/>";
    $mensagem = $mensagem . "<br/>Nome: " . $nomeRemetente;
    $mensagem = $mensagem . "<br/>E-mail: " . $emailRemetente;
     if ($telefoneEmail != "")
     {
       $mensagem = $mensagem . "<br/>Telefone para contato: " . $telefoneEmail;
     }
   }
   //Campos abaixo são opcionais
   //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
   //$mail->AddCC('destinarario@dominio.com.br', 'Destinatario'); // Copia
   //$mail->AddBCC('destinatario_oculto@dominio.com.br', 'Destinatario2`'); // Cópia Oculta
   //$mail->AddAttachment('images/phpmailer.gif');      // Adicionar um anexo

   //Define o corpo do email
   $mail->MsgHTML($mensagem);

   ////Caso queira colocar o conteudo de um arquivo utilize o método abaixo ao invés da mensagem no corpo do e-mail.
   //$mail->MsgHTML(file_get_contents('arquivo.html'));

   $mail->Send();


   echo "True";
  //caso apresente algum erro é apresentado abaixo com essa exceção.
  }catch (phpmailerException $e) {
    echo $e->errorMessage(); //Mensagem de erro costumizada do PHPMailer
}

?>
