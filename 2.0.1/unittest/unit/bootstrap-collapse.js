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
    module("bootstrap-collapse");

    test("deve ser definido no objeto jquery", function ()
    {
        ok($(document.body).collapse, 'o método collapse é definido.');
    });

    test("deve retornar o elemento", function ()
    {
        ok($(document.body).collapse()[0] == document.body, 'document.body devolvido.');
    });

    test("deve mostrar um elemento collapse", function ()
    {
        var el = $('<div class="collapse"></div>').collapse('show');

        ok(el.hasClass('in'), 'tem classe em.');
        ok(/height/.test(el.attr('style')), 'tem altura definida.');
    });

    test("deve ocultar um elemento collapse", function ()
    {
        var el = $('<div class="collapse"></div>').collapse('hide');

        ok(!el.hasClass('in'), 'não tem classe em.');
        ok(/height/.test(el.attr('style')), 'tem altura definida.');
    });
});
