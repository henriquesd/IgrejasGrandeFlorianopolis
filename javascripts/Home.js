/// <reference path="jquery-1.9.1.min.js" />
/// <reference path="enum.js" />

//$(document).ready(function (evento) {
$(document).ready(function () {

    var nomePagina = $("#nomePagina").val();
    $("#labelMenu").text(nomePagina);

    $("#envioEmailOracaoRealizado").hide();
    $("#erroEnvioEmailOracao").hide();
    $("#envioEmailContatoRealizado").hide();
    $("#erroEnvioEmailContato").hide();
    $("#informePedidoOracao").hide();
    $("#informeNomeContato").hide();
    $("#informeEmailContato").hide();
    $("#informeMensagemContato").hide();
    $("#informarCamposObrigatoriosEmail").hide();
    
    $('.mapaLocalizacao').click(function () {
        $('.mapaLocalizacao iframe').css("pointer-events", "auto");
    });

    $( ".mapaLocalizacao" ).mouseleave(function() {
       $('.mapaLocalizacao iframe').css("pointer-events", "none");
    });
    
    $("#btn_EnviarEmailOracao").click(function () {

        var mensagem = $("#txtMensagemOracao").val();

        if (mensagem != "") {
            $.ajax({
                url: "enviarEmail.php",
                method: "post",
                data: {
                    mensagem: mensagem,
                    assunto: "Pedido de Oracao (WebSite)",
                    nomeRemetente: "Igrejas Grande Florianópolis (WebSite)",
                    emailRemetente: "igrejasgrandeflorianopolis@gmail.com",
                    telefoneEmail: "",
                    tipoEmailEnum: 1
                },
                beforeSend: function (XMLHttpRequest) {
                    $.blockUI({ message: "<h4 class='Aguarde'>Aguarde por favor, seu pedido está sendo enviado...</h4>" });
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    $.unblockUI();

                    $("#erroAoEnviarEmail").show();
                },
                success: function (result) {
                    if (result == "True") {
                        $("#txtMensagemOracao").val("");

                        $.unblockUI();

                        var elem = document.getElementById("envioEmailOracaoRealizado");
                        elem.style.display = "block";

                        $("#envioEmailOracaoRealizado").delay(4000).slideUp(200, function () {
                            elem.style.display = "none";
                        });

                    }
                    else {
                        $.unblockUI();

                        $("#erroEnvioEmailOracao").show();

                        $("#erroEnvioEmailOracao").delay(4000).slideUp(200, function () {
                            $(this).alert('close');
                        });
                    }
                }
            });
        }
        else {

            var elem = document.getElementById("informePedidoOracao");
            elem.style.display = "block";

            $("#informePedidoOracao").delay(4000).slideUp(200, function () {
                elem.style.display = "none";

            });
        }
    });


    $("#btn_EnviarEmailContato").click(function () {
        var mensagemContato = $("#txtMensagemEmailContato").val();
        var assunto = "Contato (WebSite)";
        var nomeRemetente = $("#txtNomeEmail").val();
        var emailRemetente = $("#txtEmail").val();
        var telefoneEmail = $("#txtTelefoneEmail").val();
        var tipoEmail = "contato";

        if ((nomeRemetente != "") &&
            (emailRemetente != "") &&
            (mensagemContato != "")) {

            var filter = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
            if (!filter.test(emailRemetente)) {

                var elem = document.getElementById("emailNaoValido");
                elem.style.display = "block";

                $("#emailNaoValido").delay(4000).slideUp(200, function () {
                    elem.style.display = "none";
                });
            }
            else {

                $.ajax({
                  url: "enviarEmail.php",
                  method: "post",
                    data: {
                        mensagem: mensagemContato,
                        assunto: assunto,
                        nomeRemetente: nomeRemetente,
                        emailRemetente: emailRemetente,
                        telefoneEmail: telefoneEmail,
                        tipoEmailEnum: 2
                    },
                    beforeSend: function (XMLHttpRequest) {
                        $.blockUI({ message: "<h4 class='Aguarde'>Aguarde por favor, seu contato está sendo enviado...</h4>" });
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        $.unblockUI();

                        var elem = document.getElementById("erroEnvioEmailContato");
                        elem.style.display = "block";

                        $("#erroEnvioEmailContato").delay(4000).slideUp(200, function () {
                            elem.style.display = "none";
                        });

                    },
                    success: function (result) {
                        if (result == "True") {

                            $("#txtMensagemEmailContato").val("");
                            $("#txtNomeEmail").val("");
                            $("#txtEmail").val("");
                            $("#txtTelefoneEmail").val("");

                            $.unblockUI();

                            var elem = document.getElementById("envioEmailContatoRealizado");
                            elem.style.display = "block";

                            $("#envioEmailContatoRealizado").delay(4000).slideUp(200, function () {
                                elem.style.display = "none";
                            });
                        }
                        else {
                            $.unblockUI();

                            var elem = document.getElementById("erroEnvioEmailContato");
                            elem.style.display = "block";

                            $("#erroEnvioEmailContato").delay(4000).slideUp(200, function () {
                                elem.style.display = "none";
                            });
                        }
                    }
                });
            }
        }
        else {

            var elem = document.getElementById("informarCamposObrigatoriosEmail");
            elem.style.display = "block";

            $("#informarCamposObrigatoriosEmail").delay(4000).slideUp(200, function () {
                elem.style.display = "none";
            });
        }
    });

});
