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


!function($)
{
    "use strict";

    /**
     * DEFINIÇÃO DE CLASSE DROPDOWN.
     */

    var toggle = '[data-toggle="dropdown"]',
        Dropdown = function (element)
        {
            var $el = $(element).on('click.dropdown.data-api', this.toggle);

            $('html').on('click.dropdown.data-api', function ()
            {
                $el.parent().removeClass('open');
            });
        };

    /**
     *
     */
    Dropdown.prototype = {
        /**
         *
         */
        constructor: Dropdown,

        /**
         *
         */
        toggle: function (e)
        {
            var $this = $(this),
                selector = $this.attr('data-target'),
                $parent,
                isActive;

            if (!selector)
            {
                selector = $this.attr('href');
                selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '');
            }

            $parent = $(selector);
            $parent.length || ($parent = $this.parent());

            isActive = $parent.hasClass('open');
            clearMenus();

            !isActive && $parent.toggleClass('open');

            return false;
        }
    }

    /**
     *
     */
    function clearMenus()
    {
        $(toggle).parent().removeClass('open');
    }

    /**
     * DEFINIÇÃO DO PLUGIN DROPDOWN.
     */
    $.fn.dropdown = function (option)
    {
        return this.each(function ()
        {
            var $this = $(this),
                data = $this.data('dropdown');

            if (!data)
            {
                $this.data('dropdown', (data = new Dropdown(this)));
            }

            if (typeof option == 'string')
            {
                data[option].call($this);
            }
        });
    }

    /**
     *
     */
    $.fn.dropdown.Constructor = Dropdown;

    /**
     * APLICAR AOS ELEMENTOS DROPDOWN PADRÃO.
     */
    $(function ()
    {
        $('html').on('click.dropdown.data-api', clearMenus);
        $('body').on('click.dropdown.data-api', toggle, Dropdown.prototype.toggle);
    });
}(window.jQuery);
