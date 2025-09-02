import * as Categoria from '../models/CategoriaModel.js';

export const cadastrar = async (req, res) => {
    try {
        const categoria = req.body;

        // Verificar se o corpo da requisição contém os dados necessários
        if (!categoria || Object.keys(categoria).length === 0) {
            return res.status(400).json({
                success: false,
                status: 400,
                message: 'Dados do categoria não fornecidos'
            });
        }
        // Validar os dados do veículo
        if (!categoria.tipo || !categoria.icone || !categoria.data_cadastro || !categoria.data_alteracao) {
            return res.status(400).json({
                success: false,
                status: 400,
                message: 'Dados do categoria incompletos ou inválidos'
            });
        }

        const novoCategoria = await Categoria.cadastrar(categoria);
        res.status(201).json({
            success: true,
            status: 201,
            message: 'Categoria cadastrado com sucesso',
            categoriaId: novoCategoria
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            status: 500,
            message: 'Erro ao cadastrar categoria',
            error: error.message
        });
    }
};

export const consultarPorId = async (req, res) => {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
        return res.status(400).json({ success: false, message: 'ID inválido' });
    }

    try {
        const categoria = await Categoria.consultarPorId(id);
        if (!categoria) {
            return res.status(404).json({ success: false, message: 'Categoria não encontrado' });
        }

        res.status(200).json({ success: true, data: categoria });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Erro ao consultar Categoria', error: error.message });
    }
};

export const consultarTodos = async (req, res) => {
    const search = req.query.search || '';
    try {
        const categorias = await Categoria.consultarTodos(search);
        // Verificar se foram encontrados veículos
        if (categorias.length === 0) {
            return res.status(404).json({
                success: false,
                status: 404,
                message: 'Nenhum categoria encontrado',
                data: []
            });
        }
        res.status(200).json({
            success: true,
            status: 200,
            message: 'Categoria consultados com sucesso',
            data: categorias
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            status: 500,
            message: 'Erro ao consultar categoria',
            error: error.message
        });
    }
};

export const deletarPorId = async (req, res) => {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
        return res.status(400).json({
            success: false,
            status: 400,
            message: 'ID inválido'
        });
    }

    try {
        // chama o método do model/repository
        const sucesso = await Categoria.deletarPorId(id);

        if (!sucesso) {
            return res.status(404).json({
                success: false,
                status: 404,
                message: 'Categoria não encontrado para deletar'
            });
        }

        res.status(200).json({
            success: true,
            status: 200,
            message: 'Categoria deletado com sucesso'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            status: 500,
            message: 'Erro ao deletar categoria',
            error: error.message
        });
    }
};

export const editarPorId = async (req, res) => {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
        return res.status(400).json({
            success: false,
            status: 400,
            message: 'ID inválido'
        });
    }

    const dados = req.body;

    // Validação básica
    if (!dados || Object.keys(dados).length === 0) {
        return res.status(400).json({
            success: false,
            status: 400,
            message: 'Dados para atualização não fornecidos'
        });
    }

    try {
        const sucesso = await Categoria.editarPorId(id, dados);

        if (!sucesso) {
            return res.status(404).json({
                success: false,
                status: 404,
                message: 'Categoria não encontrada para edição'
            });
        }

        res.status(200).json({
            success: true,
            status: 200,
            message: 'Categoria atualizada com sucesso'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            status: 500,
            message: 'Erro ao editar categoria',
            error: error.message
        });
    }
};
