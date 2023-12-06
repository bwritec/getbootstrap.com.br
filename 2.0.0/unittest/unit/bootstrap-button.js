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
    module("bootstrap-buttons");

    /**
     *
     */
    test("deve ser definido no objeto jquery", function ()
    {
        ok($(document.body).button, 'método de guias é definido.');
    });

    test("deve retornar o elemento", function ()
    {
        ok($(document.body).button()[0] == document.body, 'document.body devolvido.');
    });

    test("deve retornar o estado definido para carregar", function ()
    {
        var btn = $('<button class="btn" data-loading-text="fat">mdo</button>');

        equals(btn.html(), 'mdo', 'btn texto é igual a mdo');
        btn.button('loading');
        equals(btn.html(), 'fat', 'btn texto é igual a fat');
        stop();

        setTimeout(function ()
        {
            ok(btn.attr('disabled'), 'btn está desativado.');
            ok(btn.hasClass('disabled'), 'btn tem classe desativada.');
            start();
        }, 0);
    });

    test("deve retornar ao estado de redefinição", function ()
    {
        var btn = $('<button class="btn" data-loading-text="fat">mdo</button>');

        equals(btn.html(), 'mdo', 'btn texto é igual a mdo');
        btn.button('loading');
        equals(btn.html(), 'fat', 'btn texto é igual a fat');
        stop();

        setTimeout(function ()
        {
            ok(btn.attr('disabled'), 'btn está desativado.');
            ok(btn.hasClass('disabled'), 'btn tem classe desativada.');
            start();
            stop();
        }, 0);

        btn.button('reset');
        equals(btn.html(), 'mdo', 'btn text equals mdo');

        setTimeout(function ()
        {
            ok(!btn.attr('disabled'), 'btn não está desativado.');
            ok(!btn.hasClass('disabled'), 'btn não tem classe desativada.');
            start();
        }, 0);
    });

    test("deve alternar ativo", function ()
    {
        var btn = $('<button class="btn" data-loading-text="fat">mdo</button>');

        ok(!btn.hasClass('active'), 'btn não tem classe ativa.');
        btn.button('toggle');
        ok(btn.hasClass('active'), 'btn tem classe ativa.');
    });
});
