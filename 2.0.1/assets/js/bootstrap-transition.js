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
    $(function ()
    {
        "use strict";

        /**
         * SUPORTE À TRANSIÇÃO CSS.
         */
        $.support.transition = (function ()
        {
            var thisBody = document.body || document.documentElement,
                thisStyle = thisBody.style,
                support = thisStyle.transition !== undefined || thisStyle.WebkitTransition !== undefined || thisStyle.MozTransition !== undefined || thisStyle.MsTransition !== undefined || thisStyle.OTransition !== undefined;

            return support && {
                end: (function ()
                {
                    var transitionEnd = "TransitionEnd";

                    if ($.browser.webkit)
                    {
                        transitionEnd = "webkitTransitionEnd";
                    } else if ($.browser.mozilla)
                    {
                        transitionEnd = "transitionend";
                    } else if ($.browser.opera)
                    {
                        transitionEnd = "oTransitionEnd";
                    }

                    return transitionEnd;
                }())
            };
        })();
    });
}(window.jQuery);
