CREATE TABLE usuarios (
id_usuario SERIAL PRIMARY KEY,
nome VARCHAR(100) NOT NULL,
email VARCHAR(150) NOT NULL UNIQUE,
senha VARCHAR(255) NOT NULL,
ativo BOOLEAN DEFAULT TRUE
);
CREATE TABLE categorias (
id_categoria SERIAL PRIMARY KEY,
nome VARCHAR(100) NOT NULL UNIQUE,
descricao VARCHAR(255) NULL,
ativo BOOLEAN DEFAULT TRUE
);
CREATE TABLE produtos (
id_produto SERIAL PRIMARY KEY,
nome VARCHAR(150) NOT NULL,
descricao TEXT,
preco NUMERIC(10,2) NOT NULL CHECK (preco >= 0),
estoque INTEGER DEFAULT 0 CHECK (estoque >= 0),
sob_encomenda BOOLEAN DEFAULT TRUE,
tempo_producao VARCHAR(150) NULL,
material VARCHAR(150) NULL,
categoria_id INTEGER NOT NULL REFERENCES categorias(id_categoria),
destaque BOOLEAN DEFAULT FALSE,
ativo BOOLEAN DEFAULT TRUE
);
CREATE TABLE imagens_produto (
id_imagem SERIAL PRIMARY KEY,
produto_id INTEGER NOT NULL REFERENCES produtos(id_produto),
caminho_imagem VARCHAR(255) NOT NULL,
principal BOOLEAN DEFAULT FALSE
);
