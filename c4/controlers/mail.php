<?php

if(isset($_POST['nombre']) && isset($_POST['para']) && isset($_POST['mensaje']) && isset($_POST['tipo'])){

    $nombre=trim($_POST['nombre']);
    $para=trim($_POST['para']);
    $mensaje=trim($_POST['mensaje']);
    $tipo=trim($_POST['tipo']);

    class Easy_Email{
        private $to ;
        private $from ;
        private $return  ;
        private $subject ;
        private $header ;
        function __construct($from, $to, $subject, $return){
            $this->from     = $from ;
            $this->to       = $to   ;
            $this->subject  = $subject ;        
            $this->return   = $return  ;
        }
        public function simpleMail($message){
            $this->header   = "From: "      .$this->from. "\n" ;
            $this->header  .= "Reply-To: "  .$this->from. "\n" ;
            $this->header  .= "Return-Path: " .$this->return. "\n" ;
            $this->header  .= "X-Mailer: PHP/"  .phpversion(). "\n" ;
            $this->send($message) ;
        }
        public function htmlMail($html, $plainText=''){
            $boundary = md5(uniqid(time()));
            $this->header    = "From: "      .$this->from. "\n" ;
            $this->header   .= "To: "        .$this->to. "\n" ;
            $this->header   .= "Return-Path: " .$this->return. "\n" ;
            $this->header   .= "MIME-Version: 1.0\n" ;
            $this->header   .= "Content-Type: multipart/alternative; boundary=\"".$boundary."\"\n";
            $msgPlainText    = "--" . $boundary . "\n" ;
            $msgPlainText   .= "Content-Type: text/plain; charset=iso-8589-1\n" ;
            $msgPlainText   .= "Content-Transfer-Encoding: 8bit\n" ;
            $msgPlainText   .= "If you are seeing this is because you may need to change your\n" ;
            $msgPlainText   .= "preferred message format from HTML to plain text.\n\n" ;
            if ($plainText == '') {
                $plainText   = strip_tags($html) ; 
            }
            $msgPlainText   .= $plainText . "\n" ;
            $msgHtml     = "--" . $boundary . "\n" ;
            $msgHtml    .= "Content-Type: text/html; charset=iso-8589-1\n" ;
            $msgHtml    .= "Content-Transfer-Encoding: 8bit\n" ;
            $msgHtml    .= $html ;
            $message    = $msgPlainText . $msgHtml ."\n\n" ;
            $this->send($message) ;
        }
        public function simpleAttachment($file, $plainText=''){
            $handle      = fopen($file, 'rb') ;    
            $data        = fread($handle,filesize($file)) ;
            $data        = chunk_split(base64_encode($data))  ;
            $filetype    = mime_content_type($file) ;
            $boundary    = md5(uniqid(time()));
            $this->header    = "From: "      .$this->from. "\n" ;
            $this->header   .= "To: "        .$this->to. "\n" ;
            $this->header   .= "Return-Path: " .$this->return. "\n" ;
            $this->header   .= "MIME-Version: 1.0\n" ;
            $this->header   .= "Content-Type: multipart/mixed; boundary=\"".$boundary."\"";
            $msgPlainText    = "--" . $boundary . "\n" ;
            $msgPlainText   .= "Content-Type: text/plain; charset=iso-8589-1\n" ;
            $msgPlainText   .= "Content-Transfer-Encoding: 8bit\n" ;
            if ($plainText != ''){
                $msgPlainText .= $plainText . "\n" ;
            }
            $attach      = "--" . $boundary ."\n" ;
            $attach     .= "Content-Type: " . $filetype . "; name=\"" . $file . "\"\n" ;
            $attach     .= "Content-Transfer-Encoding: base64 \n" ;
            $attach     .= "Content-Disposition: attachment; filename=\"" .$file. "\"\n\n" ;
            $attach     .= $data   . "\n\n" ;
            $message     = $msgPlainText . $attach ;
            $this->send($message) ;
        }
        public function htmlAttachment($file, $html, $plainText=''){
            $handle      = fopen($file, 'rb') ;    
            $data        = fread($handle,filesize($file)) ;
            $data        = chunk_split(base64_encode($data))  ;
            $filetype    = mime_content_type($file) ;
            $boundary    = md5(uniqid(time()));
            $this->header    = "From: "      .$this->from. "\n" ;
            $this->header   .= "To: "        .$this->to. "\n" ;
            $this->header   .= "Return-Path: " .$this->return. "\n" ;
            $this->header   .= "MIME-Version: 1.0\n" ;
            $this->header   .= "Content-Type: multipart/related; boundary=\"".$boundary."\"\n";
            $msgPlainText    = "--" . $boundary . "\n" ;
            $msgPlainText   .= "Content-Type: text/plain; charset=iso-8589-1\n" ;
            $msgPlainText   .= "Content-Transfer-Encoding: 8bit\n" ;
            $msgPlainText   .= "If you are seeing this is because you may need to change your\n" ;
            $msgPlainText   .= "preferred message format from HTML to plain text.\n\n" ;
            if ($plainText == '') {
                $plainText   = strip_tags($html) ; 
            }
            $msgPlainText   .= $plainText . "\n" ;
            $msgHtml     = "--" . $boundary . "\n" ;
            $msgHtml    .= "Content-Type: text/html; charset=iso-8589-1\n" ;
            $msgHtml    .= "Content-Transfer-Encoding: 8bit\n" ;
            $msgHtml    .= $html ."\n"  ;
            $attach      = "--" . $boundary ."\n" ;
            $attach     .= "Content-Type: " . $filetype . "; name=\"" . $file . "\"\n" ;
            $attach     .= "Content-Transfer-Encoding: base64 \n";
            $attach     .= "Content-Disposition: attachment; filename=\"" .$file. "\"\n\n";
            $attach     .= $data   . "\n\n";
            $message     = "Content-Type: multipart/alternative; boundary=\"".$boundary."\"";
            $message    .= $msgPlainText . $msgHtml.$attach;
            $this->send($message);
        }
        private function send($message){
            return @mail($this->to, $this->subject,$message,$this->header);
        }
    }
    if($nombre!='' && $para!='' && $mensaje!='' && $tipo!=''){
        if($tipo==1){
            $html   = "<h3>".$nombre."</h3><p>".$mensaje."</p>";
            $subject= "Mensaje desde Telmex C4 Dashboard";
            $to     = $para;
            $from   = "Telmex C4 Dashboard <c4dashboard@c4telmex.com>";
            $return = "";
            $mail   = &new Easy_Email($from,$to,$subject,$return);
            $mail->htmlMail($html);
            echo '<p>Tu mensaje se ha enviado correctamente.</p>';
        }
        else echo '<p>No se que debo hacer, no se recibio el tipo de correo.</p>';
    }
    else echo '<p>Dejaste uno de los campos vacios, inténtalo nuevamente.</p>';
}
else echo '<p>No se recibieron los post requeridos.</p>';
?>