# Solo Rico - Backend PHP

Este é o backend PHP para o website da Solo Rico Agrociências.

## Estrutura do Projeto

```
api/
├── config/
│   ├── database.php      # Configuração do banco de dados
│   └── config.php        # Configurações gerais e funções utilitárias
├── controllers/
│   ├── ProductController.php
│   ├── BlogController.php
│   ├── ContactController.php
│   ├── JobApplicationController.php
│   └── AdminController.php
├── models/
│   ├── Product.php
│   ├── BlogPost.php
│   ├── ContactMessage.php
│   ├── JobApplication.php
│   └── Admin.php
├── routes/
│   └── api.php           # Definição das rotas
├── .htaccess            # Configuração do Apache
├── .env.example         # Exemplo de variáveis de ambiente
└── index.php            # Ponto de entrada da API
```

## Configuração

### 1. Banco de Dados
1. Crie um banco MySQL chamado `solorico_db`
2. Execute o script `database/schema.sql` para criar as tabelas
3. Configure as credenciais no arquivo `.env`

### 2. Servidor Web
Configure seu servidor web (Apache/Nginx) para apontar para a pasta `api/`

### 3. Variáveis de Ambiente
1. Copie `.env.example` para `.env`
2. Configure as variáveis de acordo com seu ambiente

## Endpoints da API

### Produtos
- `GET /api/products` - Listar todos os produtos
- `GET /api/products/main-lines` - Listar linhas principais
- `GET /api/products/{slug}` - Buscar produto por slug
- `GET /api/products/category/{category}` - Produtos por categoria
- `POST /api/products` - Criar produto
- `PUT /api/products/{id}` - Atualizar produto
- `DELETE /api/products/{id}` - Deletar produto

### Blog
- `GET /api/blog` - Listar posts
- `GET /api/blog/{slug}` - Buscar post por slug
- `GET /api/blog/category/{category}` - Posts por categoria
- `POST /api/blog` - Criar post
- `PUT /api/blog/{id}` - Atualizar post
- `DELETE /api/blog/{id}` - Deletar post

### Contato
- `POST /api/contact` - Enviar mensagem de contato
- `GET /api/contact` - Listar mensagens (admin)

### Trabalhe Conosco
- `POST /api/job-application` - Enviar candidatura
- `GET /api/job-application` - Listar candidaturas (admin)

### Admin
- `POST /api/admin/login` - Login
- `POST /api/admin/logout` - Logout
- `GET /api/admin/users` - Listar usuários
- `POST /api/admin/users` - Criar usuário
- `PUT /api/admin/users/{id}` - Atualizar usuário
- `DELETE /api/admin/users/{id}` - Deletar usuário

## Credenciais Padrão

**Admin:**
- Usuário: `admin`
- Senha: `password`

**Editor:**
- Usuário: `editor`
- Senha: `password`

## Recursos Implementados

- ✅ CRUD completo para produtos
- ✅ CRUD completo para blog
- ✅ Sistema de contato com envio de email
- ✅ Sistema de candidaturas
- ✅ Autenticação de administradores
- ✅ Validação de dados
- ✅ Sanitização de inputs
- ✅ Headers CORS configurados
- ✅ Estrutura de rotas RESTful
- ✅ Tratamento de erros

## Próximos Passos

1. Configurar envio de emails (PHPMailer)
2. Implementar upload de arquivos
3. Adicionar sistema de cache
4. Implementar logs de auditoria
5. Adicionar testes unitários

## Segurança

- Senhas são hasheadas com `password_hash()`
- Inputs são sanitizados
- Prepared statements para prevenir SQL injection
- Validação de dados de entrada
- Headers CORS configurados