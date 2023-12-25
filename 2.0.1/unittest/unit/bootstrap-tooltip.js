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
    module("bootstrap-tooltip");

    test("deve ser definido no objeto jquery", function ()
    {
        var div = $("<div></div>");

        ok(div.tooltip, 'método popover é definido.');
    });

    test("deve retornar o elemento", function ()
    {
        var div = $("<div></div>");

        ok(div.tooltip() == div, 'document.body devolvido.');
    });

    test("deve expor as configurações padrão", function ()
    {
        ok(!!$.fn.tooltip.defaults, 'padrões são definidos.');
    });

    test("deve remover o atributo title", function ()
    {
        var tooltip = $('<a href="#" rel="tooltip" title="Another tooltip"></a>').tooltip();

        ok(!tooltip.attr('title'), 'tag de título foi removida.');
    });

    test("deve adicionar o atributo data para fazer referência ao título original", function ()
    {
        var tooltip = $('<a href="#" rel="tooltip" title="Outro tooltip"></a>').tooltip();

        equals(tooltip.attr('data-original-title'), 'Outro tooltip', 'título original preservado no atributo de dados.');
    });

    test("deve colocar tooltips relativas à opção de posicionamento", function ()
    {
        $.support.transition = false
        var tooltip = $('<a href="#" rel="tooltip" title="Outro tooltip"></a>')
            .appendTo('#qunit-fixture')
            .tooltip({placement: 'bottom'})
            .tooltip('show');

        ok($(".tooltip").hasClass('fade bottom in'), 'tem classes corretas aplicadas.');
        tooltip.tooltip('hide');
    });

    test("deve sempre permitir entidades HTML", function ()
    {
        $.support.transition = false
        var tooltip = $('<a href="#" rel="tooltip" title="<b>@fat</b>"></a>')
            .appendTo('#qunit-fixture')
            .tooltip('show');

        ok($('.tooltip b').length, 'tag b foi inserido.');
        tooltip.tooltip('hide');
        ok(!$(".tooltip").length, 'tooltip removido.');
    });

    test("deve respeitar classes personalizadas", function ()
    {
        var tooltip = $('<a href="#" rel="tooltip" title="Another tooltip"></a>')
            .appendTo('#qunit-fixture')
            .tooltip({ template: '<div class="tooltip some-class"><div class="tooltip-arrow"/><div class="tooltip-inner"/></div>'})
            .tooltip('show');

        ok($('.tooltip').hasClass('some-class'), 'classe personalizada está presente.');
        tooltip.tooltip('hide');
        ok(!$(".tooltip").length, 'tooltip removido.');
    });
});
