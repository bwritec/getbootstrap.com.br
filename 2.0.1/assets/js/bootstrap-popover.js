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
!function($)
{
    "use strict";

    var Popover = function (element, options)
    {
        this.init('popover', element, options);
    }

    /**
     * OBSERVAÇÃO: POPOVER ESTENDE BOOTSTRAP-TOOLTIP.js.
     */
    Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype, {
        /**
         *
         */
        constructor: Popover,

        /**
         *
         */
        setContent: function ()
        {
            var $tip = this.tip(),
                title = this.getTitle(),
                content = this.getContent();

            $tip.find('.popover-title')[ $.type(title) == 'object' ? 'append' : 'html' ](title);
            $tip.find('.popover-content > *')[ $.type(content) == 'object' ? 'append' : 'html' ](content);
            $tip.removeClass('fade top bottom left right in');
        },

        /**
         *
         */
        hasContent: function ()
        {
            return this.getTitle() || this.getContent();
        },

        /**
         *
         */
        getContent: function ()
        {
            var content,
                $e = this.$element,
                o = this.options;

            content = $e.attr('data-content') || (typeof o.content == 'function' ? o.content.call($e[0]) :  o.content);
            content = content.toString().replace(/(^\s*|\s*$)/, "");

            return content;
        },

        /**
         *
         */
        tip: function()
        {
            if (!this.$tip)
            {
                this.$tip = $(this.options.template);
            }

            return this.$tip;
        }
    });

    /**
     * DEFINIÇÃO DO PLUGIN POPOVER.
     */
    $.fn.popover = function (option)
    {
        return this.each(function ()
        {
            var $this = $(this),
                data = $this.data('popover'),
                options = typeof option == 'object' && option;

            if (!data)
            {
                $this.data('popover', (data = new Popover(this, options)));
            }

            if (typeof option == 'string')
            {
                data[option]();
            }
        });
    }

    $.fn.popover.Constructor = Popover
    $.fn.popover.defaults = $.extend({} , $.fn.tooltip.defaults, {
        placement: 'right',
        content: '',
        template: '<div class="popover"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div></div>'
    });
}(window.jQuery);
