import "./ModalProdutoAdmin.css";

import { useEffect, useState } from "react";
import api from "../../services/api";

import {
    FaTimes,
    FaInfoCircle,
    FaImages,
    FaUpload,
    FaTrash,
    FaStar,
    FaRegStar,
    FaSave,
    FaCheckCircle,
    FaTimesCircle,
    FaSpinner
} from "react-icons/fa";

const URL_IMAGENS = "http://localhost:3001/uploads";
const LIMITE_IMAGENS = 4;

function ModalProdutoAdmin({
    aberto,
    fechar,
    produto,
    atualizarLista
}) {

    const formularioInicial = {
        nome: "",
        descricao: "",
        preco: "",
        estoque: 0,
        sob_encomenda: true,
        tempo_producao: "",
        material: "",
        categoria_id: "",
        destaque: false
    };

    const [abaAtiva, setAbaAtiva] = useState("informacoes");

    const [formulario, setFormulario] = useState(formularioInicial);
    const [categorias, setCategorias] = useState([]);

    const [idProdutoAtual, setIdProdutoAtual] = useState(null);

    const [imagensExistentes, setImagensExistentes] = useState([]);
    const [novasImagens, setNovasImagens] = useState([]);

    const [imagemPrincipal, setImagemPrincipal] = useState(null);

    const [salvando, setSalvando] = useState(false);
    const [excluindoImagem, setExcluindoImagem] = useState(null);

    const [toast, setToast] = useState(null);

    useEffect(() => {

        if (!aberto) return;

        carregarCategorias();

        setAbaAtiva("informacoes");
        setToast(null);

        if (produto) {

            const imagensProduto = produto.imagens || [];

            setIdProdutoAtual(produto.id_produto);

            setFormulario({
                nome: produto.nome || "",
                descricao: produto.descricao || "",
                preco: produto.preco || "",
                estoque: produto.estoque ?? 0,
                sob_encomenda: produto.sob_encomenda ?? true,
                tempo_producao: produto.tempo_producao || "",
                material: produto.material || "",
                categoria_id:
                    produto.categoria?.id_categoria ||
                    produto.id_categoria ||
                    "",
                destaque: produto.destaque ?? false
            });

            setImagensExistentes(imagensProduto);
            setNovasImagens([]);

            const principal = imagensProduto.find(
                (imagem) => imagem.principal
            );

            if (principal) {

                setImagemPrincipal({
                    tipo: "existente",
                    id: principal.id_imagem
                });

            } else {

                setImagemPrincipal(null);

            }

        } else {

            setIdProdutoAtual(null);
            setFormulario(formularioInicial);
            setImagensExistentes([]);
            setNovasImagens([]);
            setImagemPrincipal(null);

        }

    }, [aberto, produto]);

    useEffect(() => {

        return () => {

            novasImagens.forEach((imagem) => {
                URL.revokeObjectURL(imagem.preview);
            });

        };

    }, [novasImagens]);

   async function carregarCategorias() {

    try {

        const token = localStorage.getItem("token");

        const resposta = await api.get("/categorias", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        setCategorias(resposta.data || []);

    } catch (erro) {

        console.log(
            "Erro ao carregar categorias:",
            erro.response?.data || erro
        );

        mostrarToast(
            "erro",
            erro.response?.data?.message ||
            "Não foi possível carregar as categorias."
        );

    }

}

    function mostrarToast(tipo, mensagem) {

        setToast({
            tipo,
            mensagem
        });

        setTimeout(() => {
            setToast(null);
        }, 3000);

    }

    function alterarFormulario(evento) {

        const {
            name,
            value,
            type,
            checked
        } = evento.target;

        if (name === "sob_encomenda") {

            setFormulario((anterior) => ({
                ...anterior,
                sob_encomenda: checked,
                tempo_producao: checked
                    ? anterior.tempo_producao
                    : ""
            }));

            return;

        }

        setFormulario((anterior) => ({
            ...anterior,
            [name]: type === "checkbox"
                ? checked
                : value
        }));

    }

    function selecionarImagens(evento) {

        const arquivos = Array.from(evento.target.files);

        evento.target.value = "";

        if (arquivos.length === 0) return;

        const arquivosValidos = arquivos.filter((arquivo) =>
            arquivo.type.startsWith("image/")
        );

        if (arquivosValidos.length !== arquivos.length) {

            mostrarToast(
                "erro",
                "Selecione apenas arquivos de imagem."
            );

            return;

        }

        const quantidadeAtual =
            imagensExistentes.length +
            novasImagens.length;

        const quantidadeDisponivel =
            LIMITE_IMAGENS - quantidadeAtual;

        if (quantidadeDisponivel <= 0) {

            mostrarToast(
                "erro",
                "O produto já possui o máximo de 4 imagens."
            );

            return;

        }

        if (arquivosValidos.length > quantidadeDisponivel) {

            mostrarToast(
                "erro",
                `Você pode adicionar somente mais ${quantidadeDisponivel} imagem(ns).`
            );

            return;

        }

        const imagensPreparadas = arquivosValidos.map(
            (arquivo, indice) => ({
                id: `${Date.now()}-${indice}`,
                arquivo,
                preview: URL.createObjectURL(arquivo)
            })
        );

        setNovasImagens((anteriores) => [
            ...anteriores,
            ...imagensPreparadas
        ]);

        if (!imagemPrincipal) {

            setImagemPrincipal({
                tipo: "nova",
                id: imagensPreparadas[0].id
            });

        }

    }

    function selecionarImagemPrincipal(tipo, id) {

        setImagemPrincipal({
            tipo,
            id
        });

    }

    function removerNovaImagem(id) {

        const imagemRemovida = novasImagens.find(
            (imagem) => imagem.id === id
        );

        if (imagemRemovida) {
            URL.revokeObjectURL(imagemRemovida.preview);
        }

        const imagensRestantes = novasImagens.filter(
            (imagem) => imagem.id !== id
        );

        setNovasImagens(imagensRestantes);

        if (
            imagemPrincipal?.tipo === "nova" &&
            imagemPrincipal?.id === id
        ) {

            if (imagensExistentes.length > 0) {

                const principalExistente =
                    imagensExistentes.find(
                        (imagem) => imagem.principal
                    ) || imagensExistentes[0];

                setImagemPrincipal({
                    tipo: "existente",
                    id: principalExistente.id_imagem
                });

            } else if (imagensRestantes.length > 0) {

                setImagemPrincipal({
                    tipo: "nova",
                    id: imagensRestantes[0].id
                });

            } else {

                setImagemPrincipal(null);

            }

        }

    }

    async function carregarImagensProduto(idProduto) {

        const resposta = await api.get(
            `/produtos/${idProduto}/imagens`
        );

        const imagens = resposta.data || [];

        setImagensExistentes(imagens);

        const principal = imagens.find(
            (imagem) => imagem.principal
        );

        if (principal) {

            setImagemPrincipal({
                tipo: "existente",
                id: principal.id_imagem
            });

        } else {

            setImagemPrincipal(null);

        }

        return imagens;

    }

    async function excluirImagemExistente(imagem) {

        if (imagensExistentes.length === 1) {

            mostrarToast(
                "erro",
                "O produto precisa possuir pelo menos uma imagem."
            );

            return;

        }

        try {

            setExcluindoImagem(imagem.id_imagem);

            const token = localStorage.getItem("token");

            await api.delete(
                `/imagens/${imagem.id_imagem}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            await carregarImagensProduto(idProdutoAtual);

            mostrarToast(
                "sucesso",
                "Imagem excluída com sucesso."
            );

            atualizarLista();

        } catch (erro) {

            mostrarToast(
                "erro",
                erro.response?.data?.message ||
                "Não foi possível excluir a imagem."
            );

        } finally {

            setExcluindoImagem(null);

        }

    }

    function validarFormulario() {

        if (!formulario.nome.trim()) {

            mostrarToast(
                "erro",
                "Informe o nome do produto."
            );

            setAbaAtiva("informacoes");

            return false;

        }

        if (
            formulario.preco === "" ||
            Number(formulario.preco) < 0
        ) {

            mostrarToast(
                "erro",
                "Informe um preço válido."
            );

            setAbaAtiva("informacoes");

            return false;

        }

        if (!formulario.categoria_id) {

            mostrarToast(
                "erro",
                "Selecione uma categoria."
            );

            setAbaAtiva("informacoes");

            return false;

        }

        if (Number(formulario.estoque) < 0) {

            mostrarToast(
                "erro",
                "O estoque não pode ser negativo."
            );

            setAbaAtiva("informacoes");

            return false;

        }

        if (
            formulario.sob_encomenda &&
            !formulario.tempo_producao.trim()
        ) {

            mostrarToast(
                "erro",
                "Informe o tempo de produção."
            );

            setAbaAtiva("informacoes");

            return false;

        }

        const totalImagens =
            imagensExistentes.length +
            novasImagens.length;

        if (totalImagens === 0) {

            mostrarToast(
                "erro",
                "Adicione pelo menos uma imagem ao produto."
            );

            setAbaAtiva("imagens");

            return false;

        }

        if (totalImagens > LIMITE_IMAGENS) {

            mostrarToast(
                "erro",
                "Cada produto pode possuir no máximo 4 imagens."
            );

            setAbaAtiva("imagens");

            return false;

        }

        if (!imagemPrincipal) {

            mostrarToast(
                "erro",
                "Selecione uma imagem como capa do produto."
            );

            setAbaAtiva("imagens");

            return false;

        }

        return true;

    }

    async function enviarNovasImagens(
        idProduto,
        token
    ) {

        if (novasImagens.length === 0) {
            return imagensExistentes;
        }

        let imagensOrdenadas = [...novasImagens];

        if (imagemPrincipal?.tipo === "nova") {

            imagensOrdenadas.sort((imagemA, imagemB) => {

                if (imagemA.id === imagemPrincipal.id) {
                    return -1;
                }

                if (imagemB.id === imagemPrincipal.id) {
                    return 1;
                }

                return 0;

            });

        }

        const formData = new FormData();

        imagensOrdenadas.forEach((imagem) => {
            formData.append("imagens", imagem.arquivo);
        });

        const idsExistentes = imagensExistentes.map(
            (imagem) => imagem.id_imagem
        );

        const resposta = await api.post(
            `/produtos/${idProduto}/imagens`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const todasImagens =
            resposta.data.imagens || [];

        setImagensExistentes(todasImagens);

        novasImagens.forEach((imagem) => {
            URL.revokeObjectURL(imagem.preview);
        });

        setNovasImagens([]);

        if (imagemPrincipal?.tipo === "nova") {

            const novasCadastradas = todasImagens
                .filter(
                    (imagem) =>
                        !idsExistentes.includes(
                            imagem.id_imagem
                        )
                )
                .sort(
                    (imagemA, imagemB) =>
                        imagemA.id_imagem -
                        imagemB.id_imagem
                );

            const imagemNovaPrincipal =
                novasCadastradas[0];

            if (imagemNovaPrincipal) {

                setImagemPrincipal({
                    tipo: "existente",
                    id: imagemNovaPrincipal.id_imagem
                });

                return {
                    imagens: todasImagens,
                    idPrincipal: imagemNovaPrincipal.id_imagem
                };

            }

        }

        return {
            imagens: todasImagens,
            idPrincipal: imagemPrincipal?.id
        };

    }

    async function salvarProduto(evento) {

        evento.preventDefault();

        if (!validarFormulario()) return;

        const token = localStorage.getItem("token");

        if (!token) {

            mostrarToast(
                "erro",
                "Sua sessão expirou. Entre novamente."
            );

            return;

        }

        let produtoCriadoAgora = false;
        let idProduto = idProdutoAtual;

        try {

            setSalvando(true);

            const dadosProduto = {
                nome: formulario.nome.trim(),
                descricao: formulario.descricao.trim(),
                preco: Number(formulario.preco),
                estoque: Number(formulario.estoque),
                sob_encomenda: formulario.sob_encomenda,
                tempo_producao:
                    formulario.sob_encomenda
                        ? formulario.tempo_producao.trim()
                        : null,
                material: formulario.material.trim(),
                categoria_id: Number(
                    formulario.categoria_id
                ),
                destaque: formulario.destaque
            };

            if (idProduto) {

                await api.patch(
                    `/produtos/${idProduto}`,
                    dadosProduto,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

            } else {

                const respostaProduto = await api.post(
                    "/produtos",
                    dadosProduto,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                idProduto =
                    respostaProduto.data.id_produto;

                produtoCriadoAgora = true;

                setIdProdutoAtual(idProduto);

            }

            let idPrincipalFinal =
                imagemPrincipal?.tipo === "existente"
                    ? imagemPrincipal.id
                    : null;

            if (novasImagens.length > 0) {

                const resultadoImagens =
                    await enviarNovasImagens(
                        idProduto,
                        token
                    );

                if (resultadoImagens?.idPrincipal) {

                    idPrincipalFinal =
                        resultadoImagens.idPrincipal;

                }

            }

            if (!idPrincipalFinal) {

                const imagensAtualizadas =
                    await carregarImagensProduto(
                        idProduto
                    );

                const principalAtual =
                    imagensAtualizadas.find(
                        (imagem) => imagem.principal
                    );

                idPrincipalFinal =
                    principalAtual?.id_imagem;

            }

            if (!idPrincipalFinal) {

                throw new Error(
                    "Nenhuma imagem principal foi definida."
                );

            }

            await api.patch(
                `/imagens/${idPrincipalFinal}/principal`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            await carregarImagensProduto(idProduto);

            atualizarLista();

            mostrarToast(
                "sucesso",
                produto
                    ? "Produto atualizado com sucesso."
                    : "Produto cadastrado com sucesso."
            );

            setTimeout(() => {
                fechar();
            }, 1000);

        } catch (erro) {

            if (
                produtoCriadoAgora &&
                idProduto &&
                imagensExistentes.length === 0
            ) {

                try {

                    await api.delete(
                        `/produtos/${idProduto}`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        }
                    );

                    setIdProdutoAtual(null);

                } catch (erroExclusao) {

                    console.error(
                        "Erro ao desfazer cadastro:",
                        erroExclusao
                    );

                }

            }

            mostrarToast(
                "erro",
                erro.response?.data?.message ||
                erro.message ||
                "Não foi possível salvar o produto."
            );

        } finally {

            setSalvando(false);

        }

    }

    if (!aberto) return null;

    const totalImagens =
        imagensExistentes.length +
        novasImagens.length;

    return (

        <div className="overlayModalProdutoAdmin">

            {toast && (

                <div
                    className={`toastProdutoAdmin ${toast.tipo}`}
                >

                    {toast.tipo === "sucesso" ? (
                        <FaCheckCircle />
                    ) : (
                        <FaTimesCircle />
                    )}

                    <span>{toast.mensagem}</span>

                </div>

            )}

            <div className="modalProdutoAdmin">

                <div className="cabecalhoModalProdutoAdmin">

                    <div>

                        <h2>
                            {produto
                                ? "Editar Produto"
                                : "Novo Produto"}
                        </h2>

                        <p>
                            Preencha as informações e adicione
                            as imagens do produto.
                        </p>

                    </div>

                    <button
                        type="button"
                        className="fecharModalProdutoAdmin"
                        onClick={fechar}
                        disabled={salvando}
                        aria-label="Fechar modal"
                    >
                        <FaTimes />
                    </button>

                </div>

                <div className="abasModalProdutoAdmin">

                    <button
                        type="button"
                        className={
                            abaAtiva === "informacoes"
                                ? "abaModalProdutoAdmin ativa"
                                : "abaModalProdutoAdmin"
                        }
                        onClick={() =>
                            setAbaAtiva("informacoes")
                        }
                    >
                        <FaInfoCircle />
                        Informações
                    </button>

                    <button
                        type="button"
                        className={
                            abaAtiva === "imagens"
                                ? "abaModalProdutoAdmin ativa"
                                : "abaModalProdutoAdmin"
                        }
                        onClick={() =>
                            setAbaAtiva("imagens")
                        }
                    >
                        <FaImages />
                        Imagens

                        <span className="contadorImagensProduto">
                            {totalImagens}/{LIMITE_IMAGENS}
                        </span>
                    </button>

                </div>

                <form onSubmit={salvarProduto}>

                    <div className="conteudoModalProdutoAdmin">

                        {abaAtiva === "informacoes" && (

                            <div className="abaInformacoesProduto">

                                <div className="linhaFormularioProduto">

                                    <div className="campoProdutoAdmin">

                                        <label htmlFor="nome">
                                            Nome do produto
                                        </label>

                                        <input
                                            id="nome"
                                            type="text"
                                            name="nome"
                                            value={formulario.nome}
                                            onChange={alterarFormulario}
                                            placeholder="Ex: Urso de Crochê"
                                        />

                                    </div>

                                    <div className="campoProdutoAdmin">

                                        <label htmlFor="preco">
                                            Preço
                                        </label>

                                        <input
                                            id="preco"
                                            type="number"
                                            name="preco"
                                            min="0"
                                            step="0.01"
                                            value={formulario.preco}
                                            onChange={alterarFormulario}
                                            placeholder="0,00"
                                        />

                                    </div>

                                </div>

                                <div className="campoProdutoAdmin">

                                    <label htmlFor="categoria_id">
                                        Categoria
                                    </label>

                                    <select
                                        id="categoria_id"
                                        name="categoria_id"
                                        value={
                                            formulario.categoria_id
                                        }
                                        onChange={alterarFormulario}
                                    >
                                        <option value="">
                                            Selecione uma categoria
                                        </option>

                                        {categorias.map(
                                            (categoria) => (

                                                <option
                                                    key={
                                                        categoria.id_categoria
                                                    }
                                                    value={
                                                        categoria.id_categoria
                                                    }
                                                >
                                                    {categoria.nome}
                                                </option>

                                            )
                                        )}

                                    </select>

                                </div>

                                <div className="campoProdutoAdmin">

                                    <label htmlFor="descricao">
                                        Descrição
                                    </label>

                                    <textarea
                                        id="descricao"
                                        name="descricao"
                                        value={
                                            formulario.descricao
                                        }
                                        onChange={alterarFormulario}
                                        placeholder="Descreva o produto..."
                                        rows="4"
                                    />

                                </div>

                                <div className="linhaFormularioProduto">

                                    <div className="campoProdutoAdmin">

                                        <label htmlFor="estoque">
                                            Estoque
                                        </label>

                                        <input
                                            id="estoque"
                                            type="number"
                                            name="estoque"
                                            min="0"
                                            value={
                                                formulario.estoque
                                            }
                                            onChange={alterarFormulario}
                                        />

                                    </div>

                                    <div className="campoProdutoAdmin">

                                        <label htmlFor="material">
                                            Material
                                        </label>

                                        <input
                                            id="material"
                                            type="text"
                                            name="material"
                                            value={
                                                formulario.material
                                            }
                                            onChange={alterarFormulario}
                                            placeholder="Ex: Fio Amigurumi"
                                        />

                                    </div>

                                </div>

                                <div className="opcoesProdutoAdmin">

                                    <label className="opcaoCheckboxProduto">

                                        <input
                                            type="checkbox"
                                            name="sob_encomenda"
                                            checked={
                                                formulario.sob_encomenda
                                            }
                                            onChange={
                                                alterarFormulario
                                            }
                                        />

                                        <span>
                                            Produto sob encomenda
                                        </span>

                                    </label>

                                    <label className="opcaoCheckboxProduto">

                                        <input
                                            type="checkbox"
                                            name="destaque"
                                            checked={
                                                formulario.destaque
                                            }
                                            onChange={
                                                alterarFormulario
                                            }
                                        />

                                        <span>
                                            Tornar produto em destaque
                                        </span>

                                    </label>

                                </div>

                                {formulario.sob_encomenda && (

                                    <div className="campoProdutoAdmin">

                                        <label htmlFor="tempo_producao">
                                            Tempo de produção
                                        </label>

                                        <input
                                            id="tempo_producao"
                                            type="text"
                                            name="tempo_producao"
                                            value={
                                                formulario.tempo_producao
                                            }
                                            onChange={
                                                alterarFormulario
                                            }
                                            placeholder="Ex: 7 dias"
                                        />

                                    </div>

                                )}

                            </div>

                        )}

                        {abaAtiva === "imagens" && (

                            <div className="abaImagensProduto">

                                <div className="topoImagensProduto">

                                    <div>

                                        <h3>
                                            Imagens do produto
                                        </h3>

                                        <p>
                                            Adicione até 4 imagens e
                                            selecione uma como capa.
                                        </p>

                                    </div>

                                    <label
                                        className={
                                            totalImagens >=
                                            LIMITE_IMAGENS
                                                ? "botaoSelecionarImagem desativado"
                                                : "botaoSelecionarImagem"
                                        }
                                    >
                                        <FaUpload />
                                        Selecionar imagens

                                        <input
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            disabled={
                                                totalImagens >=
                                                LIMITE_IMAGENS
                                            }
                                            onChange={
                                                selecionarImagens
                                            }
                                        />
                                    </label>

                                </div>

                                {totalImagens === 0 ? (

                                    <div className="semImagensProduto">

                                        <FaImages />

                                        <h4>
                                            Nenhuma imagem selecionada
                                        </h4>

                                        <p>
                                            Todo produto precisa ter
                                            pelo menos uma imagem de capa.
                                        </p>

                                    </div>

                                ) : (

                                    <div className="listaImagensProduto">

                                        {imagensExistentes.map(
                                            (imagem) => {

                                                const selecionada =
                                                    imagemPrincipal
                                                        ?.tipo ===
                                                        "existente" &&
                                                    imagemPrincipal
                                                        ?.id ===
                                                        imagem.id_imagem;

                                                return (

                                                    <div
                                                        className={
                                                            selecionada
                                                                ? "cardImagemProduto principal"
                                                                : "cardImagemProduto"
                                                        }
                                                        key={
                                                            imagem.id_imagem
                                                        }
                                                    >

                                                        <img
                                                            src={`${URL_IMAGENS}/${imagem.caminho_imagem}`}
                                                            alt="Produto"
                                                        />

                                                        {selecionada && (

                                                            <span className="seloImagemPrincipal">
                                                                <FaStar />
                                                                Capa
                                                            </span>

                                                        )}

                                                        <div className="acoesImagemProduto">

                                                            <button
                                                                type="button"
                                                                className={
                                                                    selecionada
                                                                        ? "botaoCapaImagem selecionado"
                                                                        : "botaoCapaImagem"
                                                                }
                                                                onClick={() =>
                                                                    selecionarImagemPrincipal(
                                                                        "existente",
                                                                        imagem.id_imagem
                                                                    )
                                                                }
                                                                title="Tornar imagem de capa"
                                                            >
                                                                {selecionada ? (
                                                                    <FaStar />
                                                                ) : (
                                                                    <FaRegStar />
                                                                )}
                                                            </button>

                                                            <button
                                                                type="button"
                                                                className="botaoExcluirImagem"
                                                                onClick={() =>
                                                                    excluirImagemExistente(
                                                                        imagem
                                                                    )
                                                                }
                                                                disabled={
                                                                    excluindoImagem ===
                                                                    imagem.id_imagem
                                                                }
                                                                title="Excluir imagem"
                                                            >
                                                                {excluindoImagem ===
                                                                imagem.id_imagem ? (
                                                                    <FaSpinner className="iconeGirando" />
                                                                ) : (
                                                                    <FaTrash />
                                                                )}
                                                            </button>

                                                        </div>

                                                    </div>

                                                );

                                            }
                                        )}

                                        {novasImagens.map(
                                            (imagem) => {

                                                const selecionada =
                                                    imagemPrincipal
                                                        ?.tipo ===
                                                        "nova" &&
                                                    imagemPrincipal
                                                        ?.id ===
                                                        imagem.id;

                                                return (

                                                    <div
                                                        className={
                                                            selecionada
                                                                ? "cardImagemProduto principal"
                                                                : "cardImagemProduto"
                                                        }
                                                        key={imagem.id}
                                                    >

                                                        <img
                                                            src={
                                                                imagem.preview
                                                            }
                                                            alt="Nova imagem do produto"
                                                        />

                                                        <span className="seloNovaImagem">
                                                            Nova
                                                        </span>

                                                        {selecionada && (

                                                            <span className="seloImagemPrincipal">
                                                                <FaStar />
                                                                Capa
                                                            </span>

                                                        )}

                                                        <div className="acoesImagemProduto">

                                                            <button
                                                                type="button"
                                                                className={
                                                                    selecionada
                                                                        ? "botaoCapaImagem selecionado"
                                                                        : "botaoCapaImagem"
                                                                }
                                                                onClick={() =>
                                                                    selecionarImagemPrincipal(
                                                                        "nova",
                                                                        imagem.id
                                                                    )
                                                                }
                                                                title="Tornar imagem de capa"
                                                            >
                                                                {selecionada ? (
                                                                    <FaStar />
                                                                ) : (
                                                                    <FaRegStar />
                                                                )}
                                                            </button>

                                                            <button
                                                                type="button"
                                                                className="botaoExcluirImagem"
                                                                onClick={() =>
                                                                    removerNovaImagem(
                                                                        imagem.id
                                                                    )
                                                                }
                                                                title="Remover imagem"
                                                            >
                                                                <FaTrash />
                                                            </button>

                                                        </div>

                                                    </div>

                                                );

                                            }
                                        )}

                                    </div>

                                )}

                                <div className="avisoImagemObrigatoria">

                                    <FaInfoCircle />

                                    <span>
                                        É obrigatório possuir pelo menos
                                        uma imagem selecionada como capa.
                                    </span>

                                </div>

                            </div>

                        )}

                    </div>

                    <div className="rodapeModalProdutoAdmin">

                        <button
                            type="button"
                            className="botaoCancelarProduto"
                            onClick={fechar}
                            disabled={salvando}
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            className="botaoSalvarProduto"
                            disabled={salvando}
                        >
                            {salvando ? (
                                <>
                                    <FaSpinner className="iconeGirando" />
                                    Salvando...
                                </>
                            ) : (
                                <>
                                    <FaSave />
                                    Salvar Produto
                                </>
                            )}
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default ModalProdutoAdmin;