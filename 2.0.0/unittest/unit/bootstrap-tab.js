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
    module("bootstrap-tabs");

    /**
     *
     */
    test("deve ser definido no objeto jquery", function ()
    {
        ok($(document.body).tab, 'método tabs é definido.');
    });

    test("deve retornar o elemento", function ()
    {
        ok($(document.body).tab()[0] == document.body, 'document.body devolvido.');
    });

    test("deve ativar o elemento pelo id da tab", function ()
    {
        var tabsHTML =
            '<ul class="tabs">'
            + '<li><a href="#home">Home</a></li>'
            + '<li><a href="#profile">Profile</a></li>'
            + '</ul>';

        $('<ul><li id="home"></li><li id="profile"></li></ul>').appendTo("#qunit-fixture");

        $(tabsHTML).find('li:last a').tab('show');
        equals($("#qunit-fixture").find('.active').attr('id'), "profile");

        $(tabsHTML).find('li:first a').tab('show');
        equals($("#qunit-fixture").find('.active').attr('id'), "home");
    });

    test("deve ativar o elemento pelo id da tab", function ()
    {
        var pillsHTML =
            '<ul class="pills">'
            + '<li><a href="#home">Home</a></li>'
            + '<li><a href="#profile">Profile</a></li>'
            + '</ul>';

        $('<ul><li id="home"></li><li id="profile"></li></ul>').appendTo("#qunit-fixture");

        $(pillsHTML).find('li:last a').tab('show');
        equals($("#qunit-fixture").find('.active').attr('id'), "profile");

        $(pillsHTML).find('li:first a').tab('show');
        equals($("#qunit-fixture").find('.active').attr('id'), "home");
    });
});
