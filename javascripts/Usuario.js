/// <reference path="jquery-1.9.1.min.js" />

$(function () {

    $("#btnCadastrar").click(function (evento) {
        try {
            var senha = $("#senha").val();
            var senhaConfirmada = $("#senhaConfirmada").val();

        }
        catch (e) {
            $.alert(e.message);
        }
        finally {
            evento.preventDefault();
        }

    });


});