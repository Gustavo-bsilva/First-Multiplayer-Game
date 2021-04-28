![jogo](https://user-images.githubusercontent.com/57686218/116423145-cb63e300-a816-11eb-9eb0-ad916a69ccf6.gif)

<h1>Meu primeiro jogo multiplyer</h1>
<p>Um jogo multiplayer simples o suficiente para qualquer pessoa aprender conceitos importantes sobre arquitetura e desenvolvimento de software.</p>

<p>Este projeto foi feito apartir de uma playlist do youtuber <a href="https://www.youtube.com/watch?v=0sTfIZvjYJk&list=PLMdYygf53DP5SVQQrkKCVWDS0TwYLVitL">Filipe Deschamps</a>, onde ele ensina os conceitos de encapsulamento de componentes e funções.</p>
<p>Uma das arquiteturas utilizadas é a Observer, que agrupa todos os escutadores de eventos do web-socket, que recebem todos juntos os eventos e comandos, que por sua vez, decidem se fazem algo com o comando.</p>

<h4>Funcionamento do jogo</h4>

<p>O jogo funciona com o client entrando no link em seu browser, que recebe um recebe um socket e é adicionado no jogo, todo jogador fica com a cor amarelo para si mesmo, mas os outros jogadores ficam com a cor preta, a movimentação é feita através das setas do teclado.
  
As frutinhas são o que dão pontos aos jogadores, quando um jogador colide com uma frutinha, essa é retirada do jogo e um ponto é adicionado ao jogador que colidiu com a mesma.</p>

<p>O tamanho do campo do jogo pode ser redefinido apenas passando um novo tamanho</p>
