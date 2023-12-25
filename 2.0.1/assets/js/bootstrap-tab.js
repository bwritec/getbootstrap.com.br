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

    /**
     * TAB CLASS DEFINITION.
     */
    var Tab = function (element)
    {
        this.element = $(element);
    }

    /**
     *
     */
    Tab.prototype = {
        /**
         *
         */
        constructor: Tab,

        /**
         *
         */
        show: function ()
        {
            var $this = this.element,
                $ul = $this.closest('ul:not(.dropdown-menu)'),
                selector = $this.attr('data-target'),
                previous,
                $target;

            if (!selector)
            {
                selector = $this.attr('href');
                selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '');
            }

            if ($this.parent('li').hasClass('active'))
            {
                return;
            }

            /**
             *
             */
            previous = $ul.find('.active a').last()[0];

            /**
             *
             */
            $this.trigger({
                type: 'show',
                relatedTarget: previous
            });

            /**
             *
             */
            $target = $(selector);

            this.activate($this.parent('li'), $ul);
            this.activate($target, $target.parent(), function ()
            {
                $this.trigger({
                    type: 'shown',
                    relatedTarget: previous
                });
            });
        },

        /**
         *
         */
        activate: function (element, container, callback)
        {
            var $active = container.find('> .active'),
                transition = callback && $.support.transition && $active.hasClass('fade');

            function next()
            {
                $active
                    .removeClass('active')
                    .find('> .dropdown-menu > .active')
                    .removeClass('active');

                element.addClass('active');

                if (transition)
                {
                    element[0].offsetWidth;
                    element.addClass('in');
                } else
                {
                    element.removeClass('fade');
                }

                if (element.parent('.dropdown-menu'))
                {
                    element.closest('li.dropdown').addClass('active');
                }

                callback && callback();
            }

            transition ?
                $active.one($.support.transition.end, next) :
                next();

            $active.removeClass('in');
        }
    }

    /**
     * DEFINIÇÃO DO PLUGIN DA TAB.
     */
    $.fn.tab = function (option)
    {
        return this.each(function ()
        {
            var $this = $(this),
                data = $this.data('tab');

            if (!data)
            {
                $this.data('tab', (data = new Tab(this)));
            }

            if (typeof option == 'string')
            {
                data[option]();
            }
        });
    }

    /**
     *
     */
    $.fn.tab.Constructor = Tab;

    /**
     * TAB DATA-API.
     */
    $(function ()
    {
        $('body').on('click.tab.data-api', '[data-toggle="tab"], [data-toggle="pill"]', function (e)
        {
            e.preventDefault();
            $(this).tab('show');
        });
    });
}(window.jQuery);
