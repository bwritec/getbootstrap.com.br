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
     * DEFINIÇÃO DE CLASSE CARROSSEL.
     */
    var Carousel = function (element, options)
    {
        this.$element = $(element);
        this.options = $.extend({}, $.fn.carousel.defaults, options);
        this.options.slide && this.slide(this.options.slide);
    }

    /**
     *
     */
    Carousel.prototype = {
        /**
         *
         */
        cycle: function ()
        {
            this.interval = setInterval($.proxy(this.next, this), this.options.interval);

            return this;
        },

        /**
         *
         */
        to: function (pos)
        {
            var $active = this.$element.find('.active'),
                children = $active.parent().children(),
                activePos = children.index($active),
                that = this;

            if (pos > (children.length - 1) || pos < 0)
            {
                return;
            }

            if (this.sliding)
            {
                return this.$element.one('slid', function ()
                {
                    that.to(pos);
                });
            }

            if (activePos == pos)
            {
                return this.pause().cycle();
            }

            return this.slide(pos > activePos ? 'next' : 'prev', $(children[pos]));
        },

        /**
         *
         */
        pause: function ()
        {
            clearInterval(this.interval);
            this.interval = null;

            return this;
        },

        /**
         *
         */
        next: function ()
        {
            if (this.sliding)
            {
                return;
            }

            return this.slide('next');
        },

        /**
         *
         */
        prev: function ()
        {
            if (this.sliding)
            {
                return;
            }

            return this.slide('prev');
        },

        /**
         *
         */
        slide: function (type, next)
        {
            var $active = this.$element.find('.active'),
                $next = next || $active[type](),
                isCycling = this.interval,
                direction = type == 'next' ? 'left' : 'right',
                fallback  = type == 'next' ? 'first' : 'last',
                that = this;

            if (!$next.length)
            {
                return;
            }

            this.sliding = true;
            isCycling && this.pause();
            $next = $next.length ? $next : this.$element.find('.item')[fallback]();

            if (!$.support.transition && this.$element.hasClass('slide'))
            {
                this.$element.trigger('slide');
                $active.removeClass('active');
                $next.addClass('active');
                this.sliding = false;
                this.$element.trigger('slid');
            } else
            {
                $next.addClass(type);
                $next[0].offsetWidth;
                $active.addClass(direction);
                $next.addClass(direction);

                this.$element.trigger('slide');
                this.$element.one($.support.transition.end, function ()
                {
                    $next.removeClass([type, direction].join(' ')).addClass('active');
                    $active.removeClass(['active', direction].join(' '));
                    that.sliding = false;

                    setTimeout(function ()
                    {
                        that.$element.trigger('slid');
                    }, 0);
                });
            }

            isCycling && this.cycle();

            return this;
        }
    }

    /**
     * DEFINIÇÃO DO PLUGIN DO CARROSSEL.
     */
    $.fn.carousel = function (option)
    {
        return this.each(function ()
        {
            var $this = $(this),
                data = $this.data('carousel'),
                options = typeof option == 'object' && option;

            if (!data)
            {
                $this.data('carousel', (data = new Carousel(this, options)));
            }

            if (typeof option == 'number')
            {
                data.to(option);
            } else if (typeof option == 'string' || (option = options.slide))
            {
                data[option]();
            } else
            {
                data.cycle();
            }
        });
    }

    /**
     *
     */
    $.fn.carousel.defaults = {
        interval: 5000
    };

    /**
     *
     */
    $.fn.carousel.Constructor = Carousel;

    /**
     * CAROUSEL DATA-API.
     */

    $(function ()
    {
        $('body').on('click.carousel.data-api', '[data-slide]', function (e)
        {
            var $this = $(this), href,
                $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')),
                options = !$target.data('modal') && $.extend({}, $target.data(), $this.data());

            $target.carousel(options);
            e.preventDefault();
        });
    });
}(window.jQuery);
