BOOTSTRAP
=========

Bootstrap é o kit de ferramentas para iniciar CSS em
sites, aplicativos e muito mais. Inclui estilos CSS
básicos para tipografia, formulários, botões, tabelas,
réguas, navegação, alertas e muito mais.

Para começar -- checkout https://getbootstrap.com.br/2.0.1/index.html!


Versionamento
-------------

Para transparência e visão sobre nosso ciclo de lançamento, e para
nos esforçarmos para manter a compatibilidade com versões anteriores,
o Bootstrap será mantido sob as diretrizes de Versionamento Semântico
tanto quanto possível.

Os lançamentos serão numerados com o seguinte formato:

`<major>.<minor>.<patch>`

E construído com as seguintes diretrizes:

* Remover a compatibilidade com versões anteriores prejudica o principal.
* Novas adições sem remover a compatibilidade com versões anteriores superam o menor.
* Correções de bugs e alterações diversas prejudicam o patch.

Para mais informações sobre o SemVer, acesse http://semver.org/.


Relatando erros
---------------

Por favor, crie um problema aqui em GitHub ! :P


Desenvolvedores
---------------

Incluímos um makefile com métodos convenientes para trabalhar
com a biblioteca Bootstrap.

+ **build** - `make`
Executa o compilador LESS para reconstruir os arquivos `/less`
e compila as páginas de documentos. Requer lessc e uglify-js.
<a href="http://twitter.github.com/bootstrap/less.html#compiling">Leia mais em nossos documentos &raquo;</a>

+ **watch** - `make watch`
Este é um método conveniente para visualizar apenas arquivos
less e criá-los automaticamente sempre que você os salva.
Requer a gem Watchr.


Authors
-------

**Chifrudo - chifrudo@localhost.com.br**

+ https://getbootstrap.com.br/


Copyright e License
-------------------

Copyright (C) <ano>  Chifrudo <chifrudo@localhost.com.br>

Este programa é um software livre: você pode redistribuí-lo e/ou
modificá-lo sob os termos da GNU General Public License conforme
publicada por a Free Software Foundation, seja a versão 3 da
Licença, ou (a seu critério) qualquer versão posterior.

Este programa é distribuído na esperança de que seja útil,
mas SEM QUALQUER GARANTIA; mesmo sem a garantia implícita de
COMERCIABILIDADE ou ADEQUAÇÃO PARA UM FIM ESPECÍFICO. Veja a
Licença Pública Geral GNU para mais detalhes.

Você deve ter recebido uma cópia da GNU General Public License
juntamente com este programa. Caso contrário, consulte
<https://www.gnu.org/licenses/>.
