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

/**
 *
 */
!function ($)
{
    $(function()
    {
        /**
         * Desative determinados links em documentos.
         */
        $('section [href^=#]').click(function (e)
        {
            e.preventDefault();
        });

        /**
         * Torne o código bonito.
         */
        window.prettyPrint && prettyPrint();

        /**
         * add-ons.
         */
        $('.add-on :checkbox').on('click', function ()
        {
            var $this = $(this),
                method = $this.attr('checked') ? 'addClass' : 'removeClass';

            $(this).parents('.add-on')[method]('active');
        });

        /**
         * Posicione twipsies estáticos para a página
         * de componentes.
         */
        if ($(".twipsies a").length)
        {
            $(window).on('load resize', function ()
            {
                $(".twipsies a").each(function ()
                {
                    $(this)
                        .tooltip({
                            placement: $(this).attr('title'),
                            trigger: 'manual'
                        }).tooltip('show');
                });
            });
        }

        /**
         * Adicione dicas à régua para scaffolding.
         */
        if ($('#grid-system').length)
        {
            $('#grid-system').tooltip({
                /**
                 *
                 */
                selector: '.show-grid > div',

                /**
                 *
                 */
                title: function ()
                {
                    return $(this).width() + 'px';
                }
            });
        }

        /**
         * Melhorar subnavegação na rolagem.
         */
        var $win = $(window),
            $nav = $('.subnav'),
            navTop = $('.subnav').length && $('.subnav').offset().top - 40,
            isFixed = 0;

        /**
         *
         */
        processScroll();

        /**
         *
         */
        $win.on('scroll', processScroll);

        /**
         *
         */
        function processScroll()
        {
            var i,
                scrollTop = $win.scrollTop();

            if (scrollTop >= navTop && !isFixed)
            {
                isFixed = 1;
                $nav.addClass('subnav-fixed');
            } else if (scrollTop <= navTop && isFixed)
            {
                isFixed = 0;
                $nav.removeClass('subnav-fixed');
            }
        }

        /**
         * Demonstração tooltip.
         */
        $('.tooltip-demo.well').tooltip({
            selector: "a[rel=tooltip]"
        });

        $('.tooltip-test').tooltip();
        $('.popover-test').popover();

        /**
         * Demonstração popover.
         */
        $("a[rel=popover]")
            .popover()
            .click(function(e)
            {
                e.preventDefault();
            });

        /**
         * Demonstração do status do botão.
         */
        $('#fat-btn')
            .click(function ()
            {
                var btn = $(this);
                    btn.button('loading');

                setTimeout(function ()
                {
                    btn.button('reset');
                }, 3000);
            });

        /**
         * Demonstração do carrossel.
         */
        $('#myCarousel').carousel();

        /**
         * Lógica de construção javascript.
         */
        var inputsComponent = $("#components.download input"),
            inputsPlugin = $("#plugins.download input"),
            inputsVariables = $("#variables.download input");

        /**
         * Alternar todos os plugins checkboxes.
         */
        $('#components.download .toggle-all').on('click', function (e)
        {
            e.preventDefault();
            inputsComponent.attr('checked', !inputsComponent.is(':checked'));
        });

        $('#plugins.download .toggle-all').on('click', function (e)
        {
            e.preventDefault();
            inputsPlugin.attr('checked', !inputsPlugin.is(':checked'));
        });

        $('#variables.download .toggle-all').on('click', function (e)
        {
            e.preventDefault();
            inputsVariables.val('');
        });

        /**
         * Solicitação javascript criada.
         */
        $('.download-btn').on('click', function ()
        {
            var css = $("#components.download input:checked")
                .map(function ()
                {
                    return this.value;
                }).toArray(),

                js = $("#plugins.download input:checked")
                    .map(function ()
                    {
                        return this.value;
                    }).toArray(),

                vars = {},
                img = [
                    'glyphicons-halflings.png',
                    'glyphicons-halflings-white.png'
                ];

            /**
             *
             */
            $("#variables.download input")
                .each(function ()
                {
                    $(this).val() && (vars[ $(this).prev().text() ] = $(this).val())
                });

            $.ajax({
                type: 'POST',
                url: 'http://bootstrap.herokuapp.com',
                dataType: 'jsonpi',
                params: {
                    js: js,
                    css: css,
                    vars: vars,
                    img: img
                }
            });
        });
    });

    $.ajaxTransport('jsonpi', function(opts, originalOptions, jqXHR)
    {
        var url = opts.url;

        return {
            /**
             *
             */
            send: function(_, completeCallback)
            {
                var name = 'jQuery_iframe_' + jQuery.now(),
                    iframe,
                    form;

                iframe = $('<iframe>')
                    .attr('name', name)
                    .appendTo('head');

                form = $('<form>')
                    /**
                     * GET ou POST.
                     */
                    .attr('method', opts.type)
                    .attr('action', url)
                    .attr('target', name);

                $.each(opts.params, function(k, v)
                {
                    $('<input>')
                        .attr('type', 'hidden')
                        .attr('name', k)
                        .attr('value', typeof v == 'string' ? v : JSON.stringify(v))
                        .appendTo(form);
                });

                form.appendTo('body').submit();
            }
        }
    });
}(window.jQuery);
