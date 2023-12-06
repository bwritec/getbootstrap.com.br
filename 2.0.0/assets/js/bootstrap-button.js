/**
 * bootstrap-button.js v2.0.0.
 *
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
!function($)
{
    "use strict";

    /**
     * BOTÃO DEFINIÇÃO DE CLASSE PÚBLICA.
     */
    var Button = function (element, options)
    {
        this.$element = $(element);
        this.options = $.extend({}, $.fn.button.defaults, options);
    }

    /**
     *
     */
    Button.prototype = {
        /**
         *
         */
        constructor: Button,

        /**
         *
         */
        setState: function (state)
        {
            var d = 'disabled',
                $el = this.$element,
                data = $el.data(),
                val = $el.is('input') ? 'val' : 'html';

            state = state + 'Text';
            data.resetText || $el.data('resetText', $el[val]());

            /**
             *
             */
            $el[val](data[state] || this.options[state]);

            /**
             * Push to event loop para permitir o envio de
             * formulários.
             */
            setTimeout(function ()
            {
                state == 'loadingText' ?
                    $el.addClass(d).attr(d, d) :
                    $el.removeClass(d).removeAttr(d);
            }, 0);
        },

        /**
         *
         */
        toggle: function ()
        {
            var $parent = this.$element.parent('[data-toggle="buttons-radio"]');

            $parent && $parent
                .find('.active')
                .removeClass('active');

            this.$element.toggleClass('active')
        }
    }

    /**
     * DEFINIÇÃO DO PLUGIN DO BOTÃO.
     */
    $.fn.button = function (option)
    {
        return this.each(function ()
        {
            var $this = $(this),
                data = $this.data('button'),
                options = typeof option == 'object' && option;

            if (!data)
            {
                $this.data('button', (data = new Button(this, options)));
            }

            if (option == 'toggle')
            {
                data.toggle();
            } else if (option)
            {
                data.setState(option);
            }
        });
    }

    /**
     *
     */
    $.fn.button.defaults = {
        loadingText: 'loading...'
    };

    /**
     *
     */
    $.fn.button.Constructor = Button;

    /**
     * BUTTON DATA-API.
     */
    $(function ()
    {
        $('body').on('click.button.data-api', '[data-toggle^=button]', function (e)
        {
            $(e.target).button('toggle');
        });
    });
}(window.jQuery);
