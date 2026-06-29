INSERT INTO usuarios (nome, email, senha, ativo) VALUES
('Elizabete', 'elizabetecroches@email.com', '1234', true)
DELETE FROM usuarios
WHERE id_usuario = 1;

INSERT INTO categorias (nome, descricao, ativo) VALUES
('Moda e Vestuário', 'Blusas, croppeds, saias e saídas de praia', true),
('Decoração de Interiores', 'Tapetes, caminhos de mesa e capas de almofada', true),
('Amigurumi', 'Bichinhos, bonecas e brinquedos de crochê', true);

INSERT INTO produtos (nome, descricao, preco, estoque, sob_encomenda, tempo_producao, material, categoria_id, destaque, ativo) VALUES
('Cropped Boho Chic', 'Cropped de crochê com amarração nas costas, tamanho M.', 89.90, 3, false, NULL, 'Fio 100% Algodão', 1, true, true),
('Jogo de Tapetes Banheiro', 'Conjunto com 3 peças (pia, vaso e tampa) em ponto relevo.', 180.00, 0, true, '7 dias úteis', 'Barbante Fio 6', 2, false, true),
('Ursinho Amigurumi Teddy', 'Urso de crochê articulado com olhos de segurança e enchimento antialérgico.', 120.00, 1, false, NULL, 'Fio Amigurumi Soft', 3, true, true);

INSERT INTO imagens_produto (produto_id, caminho_imagem, principal) VALUES
(1, 'uploads/produtos/cropped_boho_frente.jpg', true),
(2, 'uploads/produtos/jogo_banheiro_cru.jpg', true),
(3, 'uploads/produtos/ursinho_teddy_lateral.jpg', true);
