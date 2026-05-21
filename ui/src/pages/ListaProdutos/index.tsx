import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

interface Produto {
    _id: string;
    nome: string;
    preco: number;
    descricao: string;
    __v?: number;
}

interface ApiResponse {
    data: Produto[];
}

export default function ListaProdutos() {
    const [produtos, setProdutos] = useState<Produto[]>([]);

    useEffect(() => {
        const carregarProdutos = async () => {
            try {
                const response = await axios.get<ApiResponse>("http://localhost:3000/produto/");
                setProdutos(response.data.data);
            } catch (error) {
                console.error("Erro na requisição com Axios:", error);
            }
        };

        carregarProdutos();
    }, []);

    const excluir = async (id: any) => {
        await axios.delete(`http://localhost:3000/produto/${id}`)
        .then(() => {
            window.location.reload();
        });

    }


    

    return (
        <>
            <div className="container-fluid py-4">
                <h1 className="text-center">Lista Produtos</h1>
                <Link className="btn btn-secondary mb-3" to="/inserir-produto">Inserir Produto</Link>

                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {produtos.map((produto) => (
                        <div className="col" key={produto._id}>
                            <div className="card h-100">
                                <div className="card-body">
                                    <h5 className="card-title text-center">{produto.nome}</h5>
                                    <p className="card-text">Preço: R$ {produto.preco}</p>
                                    <p className="card-text">Descrição: {produto.descricao}</p>
                                    <button className="btn btn-danger" onClick={() => excluir(produto._id)}>Excluir</button>
                                    <Link className="btn btn-warning" to={`/editar-produto/${produto._id}`}>Editar</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}