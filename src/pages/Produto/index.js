import React, { useState, useEffect } from "react";
import { MdModeEdit, MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

import Header from "../../components/Header";
import Modal from "../../components/Modal";
import Button from "../../styles/components/button";
import { api } from "../../services/api";

import { Container, Produto, ButtonIcon } from "./styles";

export default function Produtos() {
  const [produtos, setProdutos] = useState();
  const [produto, setProduto] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [id, setId] = useState();
  const [newProduto, setNewProduto] = useState();
  const [newValor, setNewValor] = useState();
  const [valor, setValor] = useState();
  const idApi = "136dQL3_-dggsQHFvnwYWuaNbAxpH1tB6j9LJ0WLFcTg";
  const type = "api";

  async function getProdutos() {
    const response = await api.get(`${type}?spreadsheetId=${idApi}`);
    const { results } = response.data;
    if (results) {
      setProdutos(results);
    }
  }
  useEffect(() => {
    getProdutos();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    await api.post(`${type}?spreadsheetId=${idApi}`, {
      descricao: newProduto,
      valor: newValor
    });
    toast.success("Produto criada com sucesso!");
    getProdutos();
    setNewValor('');
    setNewProduto('');
  }

  function removeProduto(id) {
    const usersFilter = produtos.filter(value => {
      return value.rowIndex !== id;
    });
    setProdutos(usersFilter);
  }
  function handleDelete(rowIndex) {
    removeProduto(rowIndex);
    toast.success("Produto removida com sucesso!");
    api.delete(`${type}/${rowIndex}?spreadsheetId=${idApi}`);
  }

  function handleEdit({ rowIndex, descricao, valor }) {
    setProduto(descricao);
    setId(rowIndex);
    setValor(valor);
    setIsModalOpen(true);
  }
  async function handleSendEdit(){
    await api.put(`${type}/${id}?spreadsheetId=${idApi}`, {
      descricao: produto,
      valor: valor
    });
    toast.success("Produto alterada com sucesso!");
    setIsModalOpen(!isModalOpen);
    getProdutos();
  } 
  function handleModal(){
    setIsModalOpen(!isModalOpen);
  }

  return (
    <>
      <Header />
      <Container>
        <form>
          <input
            value={newProduto}
            placeholder="Descricao..."
            onChange={e => setNewProduto(e.target.value)}
          />
          <input
            value={newValor}
            type="text"
            onChange={e => setNewValor(e.target.value)}
          />
          <button onClick={ e => handleSubmit(e)}>Salvar</button>
        </form>
        <ul>
          {produtos &&
            produtos.map((produto, key) => (
              <Produto key={key}>
                <strong>{produto.descricao}</strong>
                <strong>{produto.valor}</strong>
                <strong>
                  <ButtonIcon>
                    <MdModeEdit size={20} onClick={() => handleEdit(produto)} />
                  </ButtonIcon>
                  <ButtonIcon>
                    <MdDelete size={20} onClick={() => handleDelete(produto.rowIndex)} />
                  </ButtonIcon>
                </strong>
              </Produto>
            ))}
        </ul>
          {isModalOpen && (
            
            <Modal size="big">
              <h1>Edição de Produto</h1>
              <form>
                <span>Descricao</span>
                <input
                  name="descricao"
                  value={produto}
                  onChange={e => setProduto(e.target.value)}
                />
                <span>Valor</span>
                <input
                  name="valor"
                  value={valor}
                  onChange={e => setValor(e.target.value)}
                />
                <Button onClick={handleSendEdit} size="big" type="submit">
                  Salvar
                </Button>
                <Button onClick={handleModal} size="small" color="gray">
                  Cancelar
                </Button>
              </form>
            </Modal>
          )}
      </Container>
    </>
  );
}