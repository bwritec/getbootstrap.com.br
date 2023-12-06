/**
 * bootstrap-scrollspy.js v2.0.0.
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
!function ($)
{
    "use strict";

    /**
     * SCROLLSPY CLASS DEFINITION.
     */
    function ScrollSpy(element, options)
    {
        var process = $.proxy(this.process, this),
            $element = $(element).is('body') ? $(window) : $(element),
            href;

        this.options = $.extend({}, $.fn.scrollspy.defaults, options);
        this.$scrollElement = $element.on('scroll.scroll.data-api', process);
        this.selector = (this.options.target || ((href = $(element).attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) || '') + ' .nav li > a';
        this.$body = $('body').on('click.scroll.data-api', this.selector, process);
        this.refresh();
        this.process();
    }

    /**
     *
     */
    ScrollSpy.prototype = {
        /**
         *
         */
        constructor: ScrollSpy,

        /**
         *
         */
        refresh: function ()
        {
            this.targets = this.$body
                .find(this.selector)
                .map(function ()
                {
                    var href = $(this).attr('href');

                    return /^#\w/.test(href) && $(href).length ? href : null;
                });

            this.offsets = $.map(this.targets, function (id)
            {
                return $(id).position().top;
            });
        },

        /**
         *
         */
        process: function ()
        {
            var scrollTop = this.$scrollElement.scrollTop() + this.options.offset,
                offsets = this.offsets,
                targets = this.targets,
                activeTarget = this.activeTarget,
                i;

            for (i = offsets.length; i--;)
            {
                activeTarget != targets[i] && scrollTop >= offsets[i] && (!offsets[i + 1] || scrollTop <= offsets[i + 1]) && this.activate(targets[i]);
            }
        },

        /**
         *
         */
        activate: function (target)
        {
            var active;

            this.activeTarget = target;
            this.$body
                .find(this.selector).parent('.active')
                .removeClass('active');

            active = this.$body
                .find(this.selector + '[href="' + target + '"]')
                .parent('li')
                .addClass('active');

            if (active.parent('.dropdown-menu'))
            {
                active.closest('li.dropdown').addClass('active');
            }
        }
    }

    /**
     * DEFINIÇÃO DE PLUGIN SCROLLSPY.
     */
    $.fn.scrollspy = function (option)
    {
        return this.each(function ()
        {
            var $this = $(this),
                data = $this.data('scrollspy'),
                options = typeof option == 'object' && option;

            if (!data)
            {
                $this.data('scrollspy', (data = new ScrollSpy(this, options)));
            }

            if (typeof option == 'string')
            {
                data[option]();
            }
        });
    }

    $.fn.scrollspy.Constructor = ScrollSpy;
    $.fn.scrollspy.defaults = {
        offset: 10
    };

    /**
     * SCROLLSPY DATA-API.
     */
    $(function ()
    {
        $('[data-spy="scroll"]').each(function ()
        {
            var $spy = $(this);
                $spy.scrollspy($spy.data());
        });
    });
}(window.jQuery);
