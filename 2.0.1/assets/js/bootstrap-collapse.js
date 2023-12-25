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

    var Collapse = function (element, options)
    {
        this.$element = $(element);
        this.options = $.extend({}, $.fn.collapse.defaults, options);

        if (this.options["parent"])
        {
            this.$parent = $(this.options["parent"]);
        }

        this.options.toggle && this.toggle();
    }

    /**
     *
     */
    Collapse.prototype = {
        /**
         *
         */
        constructor: Collapse,

        /**
         *
         */
        dimension: function ()
        {
            var hasWidth = this.$element.hasClass('width');

            return hasWidth ? 'width' : 'height';
        },

        /**
         *
         */
        show: function ()
        {
            var dimension = this.dimension(),
                scroll = $.camelCase(['scroll', dimension].join('-')),
                actives = this.$parent && this.$parent.find('.in'),
                hasData;

            if (actives && actives.length)
            {
                hasData = actives.data('collapse');
                actives.collapse('hide');
                hasData || actives.data('collapse', null);
            }

            this.$element[dimension](0);
            this.transition('addClass', 'show', 'shown');
            this.$element[dimension](this.$element[0][scroll]);
        },

        /**
         *
         */
        hide: function ()
        {
            var dimension = this.dimension();

            this.reset(this.$element[dimension]());
            this.transition('removeClass', 'hide', 'hidden');
            this.$element[dimension](0);
        },

        /**
         *
         */
        reset: function (size)
        {
            var dimension = this.dimension();

            this.$element
                .removeClass('collapse')
                [dimension](size || 'auto')
                [0].offsetWidth;

            this.$element.addClass('collapse');
        },

        /**
         *
         */
        transition: function (method, startEvent, completeEvent)
        {
            var that = this,
                complete = function ()
                {
                    if (startEvent == 'show')
                    {
                        that.reset();
                    }

                    that.$element.trigger(completeEvent);
                }

            this.$element
                .trigger(startEvent)
                [method]('in');

            $.support.transition && this.$element.hasClass('collapse') ?
                this.$element.one($.support.transition.end, complete) :
                complete();
        },

        /**
         *
         */
        toggle: function ()
        {
            this[this.$element.hasClass('in') ? 'hide' : 'show']();
        }
    }

    /**
     * DEFINIÇÃO DE PLUGIN DOBRÁVEL.
     */

    $.fn.collapse = function (option)
    {
        return this.each(function ()
        {
            var $this = $(this),
                data = $this.data('collapse'),
                options = typeof option == 'object' && option;

            if (!data)
            {
                $this.data('collapse', (data = new Collapse(this, options)));
            }

            if (typeof option == 'string')
            {
                data[option]();
            }
        });
    }

    $.fn.collapse.defaults = {
        toggle: true
    };

    /**
     *
     */
    $.fn.collapse.Constructor = Collapse;

    /**
     * COLLAPSIBLE DATA-API.
     */
    $(function ()
    {
        $('body').on('click.collapse.data-api', '[data-toggle=collapse]', function (e)
        {
            var $this = $(this), href,
                target = $this.attr('data-target') || e.preventDefault() || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, ''),
                option = $(target).data('collapse') ? 'toggle' : $this.data();

            $(target).collapse(option);
        });
    });
}(window.jQuery);
