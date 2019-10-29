import React, { useState, useEffect } from "react";
import { MdModeEdit, MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

import Header from "../../components/Header";
import Modal from "../../components/Modal";
import Button from "../../styles/components/button";
import { api } from "../../services/api";

import { Container, Pessoa, ButtonIcon } from "./styles";

export default function Users() {
  const [pessoas, setPessoas] = useState();
  const [pessoa, setPessoa] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [id, setId] = useState();
  const [newPessoa, setNewPessoa] = useState();
  const [newEmail, setNewEmail] = useState();
  const [email, setEmail] = useState();
  const idApi = "136dQL3_-dggsQHFvnwYWuaNbAxpH1tB6j9LJ0WLFcTg";
  const type = "api";

  async function getPessoas() {
    const response = await api.get(`${type}?spreadsheetId=${idApi}`);
    const { results } = response.data;
    if (results) {
      setPessoas(results);
    }
  }
  useEffect(() => {
    getPessoas();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    await api.post(`${type}?spreadsheetId=${idApi}`, {
      nome: newPessoa,
      email: newEmail
    });
    toast.success("Pesosa criada com sucesso!");
    getPessoas();
    setNewEmail('');
    setNewPessoa('');
  }

  function removePessoa(id) {
    const usersFilter = pessoas.filter(value => {
      return value.rowIndex !== id;
    });
    setPessoas(usersFilter);
  }
  function handleDelete(rowIndex) {
    removePessoa(rowIndex);
    toast.success("Pessoa removida com sucesso!");
    api.delete(`${type}/${rowIndex}?spreadsheetId=${idApi}`);
  }

  function handleEdit({ rowIndex, nome, email }) {
    setPessoa(nome);
    setId(rowIndex);
    setEmail(email);
    setIsModalOpen(true);
  }
  async function handleSendEdit(){
    await api.put(`${type}/${id}?spreadsheetId=${idApi}`, {
      nome: pessoa,
      email: email
    });
    toast.success("Pessoa alterada com sucesso!");
    setIsModalOpen(!isModalOpen);
    getPessoas();
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
            value={newPessoa}
            placeholder="example..."
            onChange={e => setNewPessoa(e.target.value)}
          />
          <input
            value={newEmail}
            type="email"
            onChange={e => setNewEmail(e.target.value)}
            placeholder="email@example.com"
          />
          <button onClick={ e => handleSubmit(e)}>Salvar</button>
        </form>
        <ul>
          {pessoas &&
            pessoas.map((pessoa, key) => (
              <Pessoa key={key}>
                <strong>{pessoa.nome}</strong>
                <strong>{pessoa.email}</strong>
                <strong>
                  <ButtonIcon>
                    <MdModeEdit size={20} onClick={() => handleEdit(pessoa)} />
                  </ButtonIcon>
                  <ButtonIcon>
                    <MdDelete size={20} onClick={() => handleDelete(pessoa.rowIndex)} />
                  </ButtonIcon>
                </strong>
              </Pessoa>
            ))}
        </ul>
          {isModalOpen && (
            
            <Modal size="big">
              <h1>Edição Usuário</h1>
              <form>
                <span>Nome</span>
                <input
                  name="user"
                  value={pessoa}
                  onChange={e => setPessoa(e.target.value)}
                />
                <span>Email</span>
                <input
                  name="user"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
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