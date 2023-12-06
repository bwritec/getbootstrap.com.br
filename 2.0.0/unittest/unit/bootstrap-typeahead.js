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
    module("bootstrap-typeahead");

    /**
     *
     */
    test("deve ser definido no objeto jquery", function ()
    {
        ok($(document.body).typeahead, 'método de alerta é definido.');
    });

    /**
     *
     */
    test("deve retornar o elemento", function ()
    {
        ok($(document.body).typeahead()[0] == document.body, 'document.body devolvido.');
    });

    test("deveria ouvir uma entrada", function ()
    {
        var $input = $('<input />');

        $input.typeahead();
        ok($input.data('events').blur, 'tem um evento de desfoque.');
        ok($input.data('events').keypress, 'tem um evento de pressionamento de tecla.');
        ok($input.data('events').keyup, 'tem um evento keyup.');

        if ($.browser.webkit || $.browser.msie || $.browser.mozilla)
        {
            ok($input.data('events').keydown, 'tem um evento keydown.');
        } else
        {
            ok($input.data('events').keydown, 'não tem um evento keydown.');
        }
    });

    test("deveria criar um menu", function ()
    {
        var $input = $('<input />');

        ok($input.typeahead().data('typeahead').$menu, 'tem um menu.');
    });

    test("deveria ouvir o menu", function ()
    {
        var $input = $('<input />'),
            $menu = $input.typeahead().data('typeahead').$menu;

        ok($menu.data('events').mouseover, 'tem um mouseover(pseudo: mouseenter).');
        ok($menu.data('events').click, 'tem um click.');
    });

    test("deve mostrar o menu quando a consulta for inserida", function ()
    {
        var $input = $('<input />').typeahead({
                source: [
                    'aa',
                    'ab',
                    'ac'
                ]
            }), typeahead = $input.data('typeahead');

        $input.val('a');
        typeahead.lookup();

        ok(typeahead.$menu.is(":visible"), 'typeahead é visível.');
        equals(typeahead.$menu.find('li').length, 3, 'tem 3 itens no menu.');
        equals(typeahead.$menu.find('.active').length, 1, 'um item está ativo.');

        typeahead.$menu.remove();
    });

    test("deve ocultar o menu quando a consulta for inserida", function ()
    {
        stop();
        var $input = $('<input />').typeahead({
                source: [
                    'aa',
                    'ab',
                    'ac'
                ]
            }), typeahead = $input.data('typeahead');

        $input.val('a');
        typeahead.lookup();

        ok(typeahead.$menu.is(":visible"), 'typeahead é visível.');
        equals(typeahead.$menu.find('li').length, 3, 'tem 3 itens no menu.');
        equals(typeahead.$menu.find('.active').length, 1, 'um item está ativo.');

        $input.blur();

        setTimeout(function ()
        {
            ok(!typeahead.$menu.is(":visible"), "typeahead não está mais visível.");
            start();
        }, 200);

        typeahead.$menu.remove();
    });

    test("deve definir o próximo item quando a seta para baixo for pressionada", function ()
    {
        var $input = $('<input />').typeahead({
                source: [
                    'aa',
                    'ab',
                    'ac'
                ]
            }), typeahead = $input.data('typeahead');

        $input.val('a');
        typeahead.lookup();

        ok(typeahead.$menu.is(":visible"), 'typeahead é visível.');
        equals(typeahead.$menu.find('li').length, 3, 'tem 3 itens no menu.');
        equals(typeahead.$menu.find('.active').length, 1, 'um item está ativo.');
        ok(typeahead.$menu.find('li').first().hasClass('active'), "o primeiro item está ativo.");

        $input.trigger({
            type: 'keypress',
            keyCode: 40
        });

        ok(typeahead.$menu.find('li').first().next().hasClass('active'), "o segundo item está ativo.");

        $input.trigger({
            type: 'keypress',
            keyCode: 38
        });

        ok(typeahead.$menu.find('li').first().hasClass('active'), "o primeiro item está ativo");

        typeahead.$menu.remove();
    });

    test("deve definir o valor de entrada para o item selecionado", function ()
    {
        var $input = $('<input />').typeahead({
                source: [
                    'aa',
                    'ab',
                    'ac'
                ]
            }), typeahead = $input.data('typeahead');

        $input.val('a');
        typeahead.lookup();

        $(typeahead.$menu.find('li')[2]).mouseover().click();

        equals($input.val(), 'ac', 'o valor de entrada foi definido corretamente.');
        ok(!typeahead.$menu.is(':visible'), 'o menu estava oculto.');

        typeahead.$menu.remove();
    });
});
