-- Schema do banco de dados MySQL para Solo Rico

CREATE DATABASE IF NOT EXISTS solorico_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE solorico_db;

-- Tabela de produtos
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    category VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    features TEXT,
    benefits JSON,
    usage TEXT,
    composition TEXT,
    technical_specs TEXT,
    image_url VARCHAR(500),
    gallery JSON,
    active BOOLEAN DEFAULT TRUE,
    parent_id INT NULL,
    is_product_line BOOLEAN DEFAULT FALSE,
    line_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_slug (slug),
    INDEX idx_category (category),
    INDEX idx_parent_id (parent_id),
    INDEX idx_is_product_line (is_product_line)
);

-- Tabela de posts do blog
CREATE TABLE IF NOT EXISTS blog_posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    excerpt TEXT NOT NULL,
    content LONGTEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    image_url VARCHAR(500),
    published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_slug (slug),
    INDEX idx_category (category),
    INDEX idx_published_at (published_at)
);

-- Tabela de mensagens de contato
CREATE TABLE IF NOT EXISTS contact_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    subject VARCHAR(255),
    message TEXT NOT NULL,
    product_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_created_at (created_at)
);

-- Tabela de candidaturas
CREATE TABLE IF NOT EXISTS job_applications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    area_of_interest VARCHAR(255) NOT NULL,
    resume_url VARCHAR(500),
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_created_at (created_at)
);

-- Tabela de notificações
CREATE TABLE IF NOT EXISTS notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type ENUM('info', 'success', 'warning', 'error') DEFAULT 'info',
    is_read BOOLEAN DEFAULT FALSE,
    action_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_user_id (user_id),
    INDEX idx_is_read (is_read)
);

-- Tabela de administradores
CREATE TABLE IF NOT EXISTS admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    role ENUM('admin', 'editor', 'viewer') DEFAULT 'editor',
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_username (username)
);

-- Inserir dados de exemplo

-- Produtos principais (linhas de produtos)
INSERT INTO products (name, slug, category, description, features, benefits, usage, composition, technical_specs, image_url, active, is_product_line, line_order) VALUES
('TITANIUM FOLIAR', 'titanium-foliar', 'Fertilizantes', 'Linha completa de fertilizantes foliares com tecnologia avançada para nutrição rápida e eficiente.', 'Absorção rápida, Nutrição foliar, Tecnologia de ponta', '["Nutrição rápida", "Maior eficiência", "Aumento da produtividade"]', 'Aplicar via foliar conforme recomendação técnica', 'Macro e micronutrientes balanceados', 'pH: 5.5-6.5, Densidade: 1.2g/cm³', 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=300&fit=crop', TRUE, TRUE, 1),

('TITANIUM SOLLUS', 'titanium-sollus', 'Fertilizantes', 'Linha especializada em condicionadores e melhoradores de solo com tecnologia inovadora.', 'Melhoria do solo, Condicionamento, Tecnologia avançada', '["Estrutura do solo", "Retenção de água", "Melhor CTC"]', 'Aplicar no solo antes do plantio', 'Condicionadores orgânicos e minerais', 'Granulometria: 0.3-2mm, pH: 6.0-7.0', 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop', TRUE, TRUE, 2),

('PROTECT', 'protect', 'Defensivos', 'Linha completa de produtos para proteção de cultivos com tecnologia de ponta.', 'Proteção eficiente, Tecnologia avançada, Controle específico', '["Proteção das culturas", "Controle de pragas", "Maior segurança"]', 'Aplicar conforme bula e recomendação técnica', 'Ingredientes ativos específicos para cada praga', 'Concentração variável conforme produto', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400&h=300&fit=crop', TRUE, TRUE, 3),

('ADJUVANTES', 'adjuvantes', 'Adjuvantes', 'Linha completa de adjuvantes para potencializar a eficiência dos tratamentos.', 'Potencialização, Eficiência, Tecnologia de aplicação', '["Maior eficiência", "Melhor cobertura", "Redução de deriva"]', 'Adicionar ao tanque conforme recomendação', 'Surfactantes e espalhantes adesivos', 'Concentração: 0.1-0.5% v/v', 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=400&h=300&fit=crop', TRUE, TRUE, 4),

('VIGOR', 'vigor', 'Bioestimulantes', 'Linha de bioestimulantes para promover vigor e resistência das plantas.', 'Bioestimulação, Vigor vegetal, Resistência', '["Maior vigor", "Resistência a estresses", "Melhor desenvolvimento"]', 'Aplicar via solo ou foliar', 'Extratos vegetais e aminoácidos', 'Concentração de aminoácidos: 15%', 'https://images.unsplash.com/photo-1592428122012-32c8ae8ff73e?w=400&h=300&fit=crop', TRUE, TRUE, 5);

-- Posts do blog
INSERT INTO blog_posts (title, slug, excerpt, content, category, image_url, published_at, is_active) VALUES
('Agronegócio Brasileiro: Descubra o que irá Impulsionar o Crescimento em 2024', 'agronegocio-brasileiro-crescimento-2024', 'Análise do cenário atual e as principais forças que vão moldar o futuro do agronegócio brasileiro.', 'O agronegócio brasileiro continua sendo um dos pilares da economia nacional...', 'Agronegócio', 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=250&fit=crop', NOW(), TRUE),

('Tendências da Volatilidade dos Preços das Commodities Agrícolas em 2024', 'volatilidade-precos-commodities-2024', 'Entenda os fatores econômicos e climáticos que impactam os preços das commodities.', 'A volatilidade dos preços das commodities agrícolas é um fenômeno complexo...', 'Mercado', 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400&h=250&fit=crop', NOW(), TRUE),

('Novos Mercados: Abrindo Portas para Pequenos e Médios Produtores Brasileiros', 'novos-mercados-pequenos-medios-produtores', 'Como a Solo Rico está ajudando produtores a alcançar novos mercados com inovação e apoio técnico.', 'O acesso a novos mercados é fundamental para o crescimento sustentável...', 'Inovação', 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=250&fit=crop', NOW(), TRUE);

-- Notificações
INSERT INTO notifications (title, message, type, is_read, action_url) VALUES
('Bem-vindo à Solo Rico!', 'Explore nossos produtos e soluções para aumentar sua produtividade.', 'info', FALSE, '/produtos'),
('Novos Produtos Disponíveis', 'Confira nossa nova linha de adjuvantes para maximizar sua aplicação.', 'success', FALSE, '/para-voce'),
('Dicas de Aplicação', 'Veja nosso blog para dicas sobre como aplicar corretamente nossos produtos.', 'info', FALSE, '/blog');

-- Administradores padrão
INSERT INTO admins (name, role, username, password, is_active) VALUES
('Administrador Principal', 'admin', 'admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', TRUE), -- senha: password
('Editor de Conteúdo', 'editor', 'editor', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', TRUE), -- senha: password
('Visualizador', 'viewer', 'viewer', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', TRUE); -- senha: password