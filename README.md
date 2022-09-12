# SISTEMA DRIVENPASS

## Introdução

---

O projeto consiste em um serviço de armazenamento seguro de credenciais:

1. Os tipos de credenciais que podem ser guardados no sistema são:

- credenciais (credentials)
- notas seguras (notes)
- cartões bancários (documents)
- senhas de WiFi (networks)

2. Dentro de uma mesma categoria, exceto senhas de WiFi, um usuário não pode repetir o título de um item, estes precisam ser únicos.
1. Usuários conseguem acessar ou deletar apenas seus itens registrados.

# ROTAS DE SERVIÇO

### CADASTRO

- Para poder usar o serviço é necessário estar cadastrado, para isso, o usuário deve:

1. Enviar uma requisição do tipo `POST` na rota `/signup` informando as credenciais do novo usuário a ser cadastrado no corpo (_body_) da requisição.
2. A requisição de usuário possui três parâmetros:

   > - `email` uma string com o endereço de e-mail do novo usuário.
   > - `password` uma string com a senha do usuário a ser cadastrada.
   > - `repeatPassword` a repetição da senha do usuário:
   >
   > ```
   > {
   >   "email": string,
   >   "password": string,
   >   "repeatPassword": string
   > }
   > ```

### LOGIN

- Para poder usar o serviço é necessário estar cadastrado, para isso, o usuário deve:

1. Enviar uma requisição do tipo `POST` na rota `/signin` informando as credenciais do usuário no corpo (_body_) da requisição.
2. A requisição de usuário possui três parâmetros:
   > - `email` uma string com o endereço de e-mail do novo usuário.
   > - `password` uma string com a senha do usuário a ser cadastrada.
   >
   > ```
   > {
   >   "email": string,
   >   "password": string
   > }
   > ```
3. O retorno da requisição é a chave de autenticação do usuário, um objeto com a string `token`.

### CREDENCIAIS

- Para cadastro de uma nova credencial, o usuário deve:

1. Enviar uma requisição do tipo `POST` na rota `/credentials` informando a chave Bearer `token` no cabeçalho (_header_) da requisição.
2. A requisição de uma nova credencial possui quatro parâmetros:

   > - `url` uma string numérica referente ao endereço aonde a credencial é utilizada.
   > - `title` uma string referente ao identificador da credencial (_nome único_).
   > - `username` uma string referente ao nome de usuário utilizado na `url` fornecida.
   > - `password` a senha do usuário.
   >
   > - Resumidamente, a requisição fica no seguinte formato:
   >
   > ```
   > {
   >   "url": string,
   >   "title": string,
   >   "username": string,
   >   "password": string
   > }
   > ```

- Para buscar uma ou mais credenciais, usuários podem:

1. Enviar uma requisição do tipo `GET` na rota `/credentials` informando a chave `Bearer token` no cabeçalho (_header_) da requisição.
2. O retorno desta requisição é uma lista com todas as credenciais registradas pelo usuário, as senhas das credenciais retornam decriptografadas.
3. Se a requisição receber um campo `id` na forma de `query params`, o retorno desta requisição é apenas o objeto com id correspondente, se o mesmo pertencer ao usuário que fez a requisição.
   > - `id` é uma string numérica

- Para deletar uma credencial, usuários podem:

1. Enviar uma requisição do tipo `DELETE` na rota `/credentials` informando a chave `Bearer token` no cabeçalho (_header_) da requisição.
2. A requisição não possui dados de retorno, mas retorna com código `204` quando bem sucedida.
3. Usuários podem deletar apenas credenciais que pertençam a si próprios, do contrário ocorrerá um erro na requisição.

### NOTAS SEGURAS

- Para cadastro de uma nova nota segura, o usuário deve:

1. Enviar uma requisição do tipo `POST` na rota `/notes` informando a chave Bearer `token` no cabeçalho (_header_) da requisição.
2. A requisição de nova segura possui dois parâmetros:

   > - `title` uma string referente ao identificador da nota segura (_nome único_).
   > - `description` uma string referente ao nome de usuário utilizado na `url` fornecida.
   >
   > - Resumidamente, a requisição fica no seguinte formato:
   >
   > ```
   > {
   >   "title": string,
   >   "description": string
   > }
   > ```

- Para buscar uma ou mais notas seguras, usuários podem:

1. Enviar uma requisição do tipo `GET` na rota `/notes` informando a chave `Bearer token` no cabeçalho (_header_) da requisição.
2. O retorno desta requisição é uma lista com todas as notas seguras registradas pelo usuário.
3. Se a requisição receber um campo `id` na forma de `query params`, o retorno desta requisição é apenas o objeto com id correspondente, se o mesmo pertencer ao usuário que fez a requisição.
   > - `id` é uma string numérica

- Para deletar uma nota segura, usuários podem:

1. Enviar uma requisição do tipo `DELETE` na rota `/notes` informando a chave `Bearer token` no cabeçalho (_header_) da requisição.
2. A requisição não possui dados de retorno, mas retorna com código `204` quando bem sucedida.
3. Usuários podem deletar apenas notas seguras que pertençam a si próprios, do contrário ocorrerá um erro na requisição.

## DOCUMENTOS

- Para cadastro de um novo documento, o usuário deve:

1. Enviar uma requisição do tipo `POST` na rota `/documents` informando a chave Bearer `token` no cabeçalho (_header_) da requisição.
2. A requisição de novo documento possui oito parâmetros:

   > - `title` uma string referente ao identificador da nota segura (_nome único_).
   > - Uma string numérica referente aos 16 dígitos do cartão (ex.: _`1122334455667788`_)
   > - O nome do portador do cartão, conforme o formato:
   >   > - Todas as letras em maiúsculo
   >   > - Primeiro e ultimo nomes com apenas a inicial do nome do meio
   >   > - Ou apenas primeiro em último nomes em caso de não existir um nome do meio.
   > - A data de validade do cartão, no formato `MM/AA`
   > - O código de verificação (_CVV_)
   > - A senha
   > - Um valor Booleano `isVirtual` (`true`/`false`) indicando se o cartão é virtual ou físico.\
   > - O tipo do cartão, se é crédito, débito ou ambos, os valores aceitos são:
   >   > - `credit`
   >   > - `debit`
   >   > - `both`
   > - Resumidamente, a requisição fica no seguinte formato:
   >
   > ```
   > {
   >   "title": string,
   >   "number": string,
   >   "cardholderName": string,
   >   "expirationDate": string,
   >   "CVV": string,
   >   "password": string,
   >   "isVirtual": boolean,
   >   "type": string
   > }
   > ```

- Para buscar um ou mais documentos, usuários podem:

1. Enviar uma requisição do tipo `GET` na rota `/documents` informando a chave `Bearer token` no cabeçalho (_header_) da requisição.
2. O retorno desta requisição é uma lista com todos os documentos registradas pelo usuário, as senhas dos documentos retornam decriptografadas.
3. Se a requisição receber um campo `id` na forma de `query params`, o retorno desta requisição é apenas o objeto com id correspondente, se o mesmo pertencer ao usuário que fez a requisição.
   > - `id` é uma string numérica

- Para deletar um documento, usuários podem:

1. Enviar uma requisição do tipo `DELETE` na rota `/documents` informando a chave `Bearer token` no cabeçalho (_header_) da requisição.
2. A requisição não possui dados de retorno, mas retorna com código `204` quando bem sucedida.
3. Usuários podem deletar apenas documentos que pertençam a si próprios, do contrário ocorrerá um erro na requisição.

## REDES WIFI

- Para cadastro de uma nova rede, o usuário deve:

1. Enviar uma requisição do tipo `POST` na rota `/network` informando a chave Bearer `token` no cabeçalho (_header_) da requisição.
2. A requisição de nova rede possui três parâmetros:

   > - `name` Uma string referente ao nome da rede
   > - `title` uma string referente ao identificador da rede.
   > - `password` uma string referente a senha da rede.

   > - Resumidamente, a requisição fica no seguinte formato:
   >
   > ```
   > {
   >   "name": string,
   >   "title": string,
   >   "password": string
   > }
   > ```

- Para buscar uma ou mais credenciais, usuários podem:

1. Enviar uma requisição do tipo `GET` na rota `/network` informando a chave `Bearer token` no cabeçalho (_header_) da requisição.
2. O retorno desta requisição é uma lista com todas as redes registradas pelo usuário, as senhas das redes retornam decriptografadas.
3. Se a requisição receber um campo `id` na forma de `query params`, o retorno desta requisição é apenas o objeto com id correspondente, se o mesmo pertencer ao usuário que fez a requisição.
   > - `id` é uma string numérica

- Para deletar uma rede, usuários podem:

1. Enviar uma requisição do tipo `DELETE` na rota `/network` informando a chave `Bearer token` no cabeçalho (_header_) da requisição.
2. A requisição não possui dados de retorno, mas retorna com código `204` quando bem sucedida.
3. Usuários podem deletar apenas redes que pertençam a si próprios, do contrário ocorrerá um erro na requisição.
