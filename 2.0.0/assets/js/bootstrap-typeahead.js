/**
 * bootstrap-typeahead.js v2.0.0.
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

    var Typeahead = function (element, options)
    {
        this.$element = $(element);
        this.options = $.extend({}, $.fn.typeahead.defaults, options);
        this.matcher = this.options.matcher || this.matcher;
        this.sorter = this.options.sorter || this.sorter;
        this.highlighter = this.options.highlighter || this.highlighter;
        this.$menu = $(this.options.menu).appendTo('body');
        this.source = this.options.source;
        this.shown = false;
        this.listen();
    }

    /**
     *
     */
    Typeahead.prototype = {
        /**
         *
         */
        constructor: Typeahead,

        /**
         *
         */
        select: function ()
        {
            var val = this.$menu.find('.active').attr('data-value');
                this.$element.val(val);

            return this.hide();
        },

        /**
         *
         */
        show: function ()
        {
            var pos = $.extend({}, this.$element.offset(), {
                height: this.$element[0].offsetHeight
            });

            this.$menu.css({
                top: pos.top + pos.height,
                left: pos.left
            });

            this.$menu.show();
            this.shown = true;

            return this;
        },

        /**
         *
         */
        hide: function ()
        {
            this.$menu.hide();
            this.shown = false;

            return this;
        },

        /**
         *
         */
        lookup: function (event)
        {
            var that = this,
                items,
                q;

            this.query = this.$element.val();

            if (!this.query)
            {
                return this.shown ? this.hide() : this;
            }

            items = $.grep(this.source, function (item)
            {
                if (that.matcher(item))
                {
                    return item;
                }
            });

            items = this.sorter(items);
            if (!items.length)
            {
                return this.shown ? this.hide() : this;
            }

            return this.render(items.slice(0, this.options.items)).show();
        },

        /**
         *
         */
        matcher: function (item)
        {
            return ~item.toLowerCase().indexOf(this.query.toLowerCase());
        },

        /**
         *
         */
        sorter: function (items)
        {
            var beginswith = [],
                caseSensitive = [],
                caseInsensitive = [],
                item;

            while (item = items.shift())
            {
                if (!item.toLowerCase().indexOf(this.query.toLowerCase()))
                {
                    beginswith.push(item);
                } else if (~item.indexOf(this.query))
                {
                    caseSensitive.push(item);
                } else
                {
                    caseInsensitive.push(item);
                }
            }

            return beginswith.concat(caseSensitive, caseInsensitive);
        },

        /**
         *
         */
        highlighter: function (item)
        {
            return item.replace(new RegExp('(' + this.query + ')', 'ig'), function ($1, match)
            {
                return '<strong>' + match + '</strong>';
            });
        },

        /**
         *
         */
        render: function (items)
        {
            var that = this

            items = $(items).map(function (i, item)
            {
                i = $(that.options.item).attr('data-value', item);
                i.find('a').html(that.highlighter(item));

                return i[0];
            });

            items.first().addClass('active');
            this.$menu.html(items);

            return this;
        },

        /**
         *
         */
        next: function (event)
        {
            var active = this.$menu.find('.active').removeClass('active'),
                next = active.next();

            if (!next.length)
            {
                next = $(this.$menu.find('li')[0]);
            }

            next.addClass('active');
        },

        /**
         *
         */
        prev: function (event)
        {
            var active = this.$menu.find('.active').removeClass('active'),
                prev = active.prev();

            if (!prev.length)
            {
                prev = this.$menu.find('li').last();
            }

            prev.addClass('active');
        },

        /**
         *
         */
        listen: function ()
        {
            this.$element
                .on('blur', $.proxy(this.blur, this))
                .on('keypress', $.proxy(this.keypress, this))
                .on('keyup', $.proxy(this.keyup, this));

            if ($.browser.webkit || $.browser.msie || $.browser.mozilla)
            {
                this.$element.on('keydown', $.proxy(this.keypress, this));
            }

            this.$menu
                .on('click', $.proxy(this.click, this))
                .on('mouseenter', 'li', $.proxy(this.mouseenter, this));
        },

        /**
         *
         */
        keyup: function (e)
        {
            e.stopPropagation();
            e.preventDefault();

            switch(e.keyCode)
            {
                /**
                 * 40 - down arrow.
                 * 38 - up arrow.
                 */
                case 40:
                case 38:
                    break;

                /**
                 *  9 - tab.
                 * 13 - enter.
                 */
                case 9:
                case 13:
                    if (!this.shown)
                    {
                        return;
                    }

                    this.select();
                    break;

                /**
                 * 27 - escape.
                 */
                case 27:
                    this.hide();
                    break;

                default:
                    this.lookup();
            }
        },

        /**
         *
         */
        keypress: function (e)
        {
            e.stopPropagation();
            if (!this.shown)
            {
                return;
            }

            switch(e.keyCode)
            {
                /**
                 *  9 - tab.
                 * 13 - enter.
                 * 27 - escape.
                 */
                case 9:
                case 13:
                case 27:
                    e.preventDefault();
                    break;

                /**
                 * 38 - up arrow.
                 */
                case 38:
                    e.preventDefault();
                    this.prev();
                    break;

                /**
                 * 40 - down arrow.
                 */
                case 40:
                    e.preventDefault();
                    this.next();
                    break;
            }
        },

        /**
         *
         */
        blur: function (e)
        {
            var that = this;

            e.stopPropagation();
            e.preventDefault();
            setTimeout(function ()
            {
                that.hide();
            }, 150);
        },

        /**
         *
         */
        click: function (e)
        {
            e.stopPropagation();
            e.preventDefault();
            this.select();
        },

        /**
         *
         */
        mouseenter: function (e)
        {
            this.$menu.find('.active').removeClass('active');
            $(e.currentTarget).addClass('active');
        }
    }

    /**
     * TYPEAHEAD PLUGIN DEFINITION.
     */
    $.fn.typeahead = function (option)
    {
        return this.each(function ()
        {
            var $this = $(this),
                data = $this.data('typeahead'),
                options = typeof option == 'object' && option;

            if (!data)
            {
                $this.data('typeahead', (data = new Typeahead(this, options)));
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
    $.fn.typeahead.defaults = {
        source: [],
        items: 8,
        menu: '<ul class="typeahead dropdown-menu"></ul>',
        item: '<li><a href="#"></a></li>'
    };

    /**
     *
     */
    $.fn.typeahead.Constructor = Typeahead;

    /**
     * TYPEAHEAD DATA-API.
     */
    $(function ()
    {
        $('body').on('focus.typeahead.data-api', '[data-provide="typeahead"]', function (e)
        {
            var $this = $(this);

            if ($this.data('typeahead'))
            {
                return;
            }

            e.preventDefault();
            $this.typeahead($this.data());
        });
    });
}(window.jQuery);
