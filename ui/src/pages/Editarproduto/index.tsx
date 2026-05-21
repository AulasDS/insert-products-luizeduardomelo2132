import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function EditarProduto() {
    // 1. Pega o ID que veio lá da URL (ex: /editar-produto/123)
    const { id } = useParams<{ id: string }>(); 
    const navigate = useNavigate();

    // Estados para guardar o que o usuário está digitando nos campos
    const [nome, setNome] = useState("");
    const [preco, setPreco] = useState<number>(0);
    const [descricao, setDescricao] = useState("");

    // 2. Assim que a tela carrega, busca os dados atuais desse produto para preencher o formulário
    useEffect(() => {
        axios.get(`http://localhost:3000/produto/${id}`)
            .then((response) => {
                // Supondo que sua API retorne o produto dentro de response.data ou response.data.data
                const produto = response.data.data || response.data;
                setNome(produto.nome);
                setPreco(produto.preco);
                setDescricao(produto.descricao);
            })
            .catch((error) => console.error("Erro ao buscar produto:", error));
    }, [id]);

    // O PASSO 3 ACONTECE AQUI: Quando o usuário clica em "Salvar"
    const salvarAlteracoes = async (e: React.FormEvent) => {
        e.preventDefault(); // Impede a página de recarregar sozinha
        
        try {
            // AQUI ESTÁ A LINHA DO PASSO 3:
            // Enviamos o PUT para a API passando o ID na URL e o objeto com os dados atualizados
            await axios.put(`http://localhost:3000/produto/${id}`, {
                nome: nome,
                preco: preco,
                descricao: descricao
            });

            alert("Produto atualizado com sucesso!");
            navigate("/"); // Redireciona de volta para a lista de produtos
        } catch (error) {
            console.error("Erro ao atualizar:", error);
            alert("Erro ao salvar alterações.");
        }
    };

    return (
        <div className="container py-4">
            <h2>Editar Produto</h2>
            <form onSubmit={salvarAlteracoes}>
                <div className="mb-3">
                    <label className="form-label">Nome:</label>
                    <input type="text" className="form-control" value={nome} onChange={(e) => setNome(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Preço:</label>
                    <input type="number" className="form-control" value={preco} onChange={(e) => setPreco(Number(e.target.value))} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Descrição:</label>
                    <textarea className="form-control" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Salvar Alterações</button>
            </form>
        </div>
    );
}