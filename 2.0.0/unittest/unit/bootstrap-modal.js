/**
 * Copyright (C) <ano>  Chifrudo <chifrudo@localhost.com.br>
 *
 * Este programa é um software livre: você pode redistribuí-lo e/ou
 * modificá-lo sob os termos da GNU General Public License conforme
 * publicada por a Free Software Foundation, seja a versão 3 da
 * Licença, ou (a seu critério) qualquer versão posterior.
 *
 * Este programa é distribuído na esperança de que seja útil,
 * mas SEM QUALQUER GARANTIA; mesmo sem a garantia implícita de
 * COMERCIABILIDADE ou ADEQUAÇÃO PARA UM FIM ESPECÍFICO. Veja a
 * Licença Pública Geral GNU para mais detalhes.
 *
 * Você deve ter recebido uma cópia da GNU General Public License
 * juntamente com este programa. Caso contrário, consulte
 * <https://www.gnu.org/licenses/>.
 */
$(function ()
{
    /**
     *
     */
    module("bootstrap-modal");

    /**
     *
     */
    test("deve ser definido no objeto jquery", function ()
    {
        var div = $("<div id='modal-test'></div>");

        ok(div.modal, 'método modal é definido.');
    });

    test("deve retornar o elemento", function ()
    {
        var div = $("<div id='modal-test'></div>");

        ok(div.modal() == div, 'document.body devolvido.');
        $('#modal-test').remove();
    });

    test("deve expor var padrões para configurações", function ()
    {
        ok($.fn.modal.defaults, 'objeto padrão exposto.');
    });

    test("deve ser inserido no dom quando o método show for chamado", function ()
    {
        stop();
        $.support.transition = false;

        $("<div id='modal-test'></div>")
            .bind("shown", function ()
            {
                ok($('#modal-test').length, 'modal inserido em dom.');
                $(this).remove();
                start();
            }).modal("show");
    });

    test("deve ocultar modal quando ocultar é chamado", function ()
    {
        stop();
        $.support.transition = false;

        $("<div id='modal-test'></div>")
            .bind("shown", function ()
            {
                ok($('#modal-test').is(":visible"), 'modal visível.');
                ok($('#modal-test').length, 'modal inserido no dom.');
                $(this).modal("hide");
            }).bind("hidden", function()
            {
                ok(!$('#modal-test').is(":visible"), 'modal oculto.');
                $('#modal-test').remove();
                start();
            }).modal("show");
    });

    test("deve alternar quando toggle é chamado", function ()
    {
        stop();
        $.support.transition = false;

        var div = $("<div id='modal-test'></div>");
            div
                .bind("shown", function ()
                {
                    ok($('#modal-test').is(":visible"), 'modal visível.');
                    ok($('#modal-test').length, 'modal inserido no dom.');
                    div.modal("toggle")
                })
                .bind("hidden", function()
                {
                    ok(!$('#modal-test').is(":visible"), 'modal oculto.')
                    div.remove()
                    start()
                })
                .modal("toggle");
    });

    test("deve remover do dom quando clicar [data-dismiss=modal]", function ()
    {
        stop();
        $.support.transition = false;

        var div = $("<div id='modal-test'><span class='close' data-dismiss='modal'></span></div>");
            div
                .bind("shown", function ()
                {
                    ok($('#modal-test').is(":visible"), 'modal visível.');
                    ok($('#modal-test').length, 'modal inserido no dom.');
                    div.find('.close').click();
                })
                .bind("hidden", function()
                {
                    ok(!$('#modal-test').is(":visible"), 'modal oculto.');
                    div.remove();
                    start();
                })
                .modal("toggle");
    });
});
