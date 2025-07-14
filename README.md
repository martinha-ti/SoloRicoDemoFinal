# Solo Rico - Website Corporativo

Website corporativo da Solo Rico Agrociências, empresa especializada em soluções para o agronegócio brasileiro.

## 🚀 Tecnologias

- **Frontend**: React 18 + TypeScript + Tailwind CSS
- **Backend**: Express.js + TypeScript
- **Database**: PostgreSQL (Neon Database)
- **Build**: Vite
- **UI**: Radix UI + shadcn/ui
- **Deployment**: Replit Deployments

## 📋 Funcionalidades

### Website Público
- ✅ Página inicial com carrossel de produtos
- ✅ Sistema de blog com categorias
- ✅ Páginas institucionais (Empresa, Para Empresas, Para Você, Comex)
- ✅ Formulário de contato
- ✅ Suporte multilíngue (Português/Inglês)
- ✅ Design responsivo

### Painel Administrativo
- ✅ Sistema de autenticação admin
- ✅ Gerenciamento de produtos
- ✅ Gerenciamento de blog posts
- ✅ Gerenciamento de usuários
- ✅ Dashboard com estatísticas

### Produtos
- ✅ 5 linhas principais de produtos
- ✅ Sub-produtos por linha
- ✅ Páginas individuais de produtos
- ✅ Informações técnicas detalhadas

## 🛠️ Instalação e Desenvolvimento

### Pré-requisitos
- Node.js 18+
- PostgreSQL
- Git

### Configuração Local

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/solorico-website.git
cd solorico-website
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
```bash
cp .env.example .env
# Edite o arquivo .env com suas configurações
```

4. **Configure o banco de dados**
```bash
npm run db:push
```

5. **Inicie o servidor de desenvolvimento**
```bash
npm run dev
```

## 🔧 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Build para produção
- `npm run db:push` - Atualiza o schema do banco
- `npm run db:studio` - Abre o Drizzle Studio

## 📁 Estrutura do Projeto

```
├── client/              # Frontend React
│   ├── src/
│   │   ├── components/  # Componentes reutilizáveis
│   │   ├── pages/       # Páginas da aplicação
│   │   ├── hooks/       # Custom hooks
│   │   ├── lib/         # Utilitários
│   │   └── contexts/    # Contextos React
├── server/              # Backend Express
│   ├── routes.ts        # Rotas da API
│   ├── storage.ts       # Camada de dados
│   └── services/        # Serviços
├── shared/              # Código compartilhado
│   └── schema.ts        # Schema do banco
└── attached_assets/     # Assets estáticos
```

## 🚀 Deploy

### Replit Deployments
1. Faça push para o repositório
2. Configure as variáveis de ambiente no Replit
3. Clique em "Deploy"

### Variáveis de Ambiente Necessárias
- `DATABASE_URL` - URL do PostgreSQL
- `SESSION_SECRET` - Secret para sessões
- `NODE_ENV` - Ambiente (development/production)

## 🔐 Acesso Administrativo

- **URL**: `/admin-login`
- **Usuário**: `admin`
- **Senha**: `admin123`

## 📱 Contato

- **Telefone**: (17) 3231-6000
- **Email**: contato@solorico.com.br
- **Endereço**: São José do Rio Preto - SP

## 📄 Licença

Este projeto é propriedade da Solo Rico Agrociências.

---

Desenvolvido com ❤️ para o agronegócio brasileiro.