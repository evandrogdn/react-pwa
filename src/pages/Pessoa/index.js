import React, { useState, useEffect } from "react";
import { MdModeEdit, MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

import Header from "../../components/Header";
import Modal from "../../components/Modal";
import Button from "../../styles/components/button";
import { api } from "../../services/api";

import { Container, Pessoa, ButtonIcon } from "./styles";

export default function Users() {
  const [pessoa, setPessoas] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pessoa, setPessoas] = useState();
  const [id, setId] = useState();
  const [newPessoa, setNewPessoa] = useState();
  const [newEmail, setNewEmail] = useState();
  const [email, setEmail] = useState();
  const idApi = "";
  const type = "";

  async function getUsers() {
    const response = await api.get(`${type}?spreadsheetId=${idApi}`);
    const { results } = response.data;
    if (results) {
      setUsers(results);
    }
  }
  useEffect(() => {
    getUsers();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    await api.post(`${type}?spreadsheetId=${idApi}`, {
      nome: newUser,
      email: newEmail
    });
    toast.success("Pesosa criada com sucesso!");
    getUsers();
    setNewEmail('');
    setNewUser('');
  }

  function removeUser(id) {
    const usersFilter = users.filter(value => {
      return value.rowIndex !== id;
    });
    setUsers(usersFilter);
  }
  function handleDelete(rowIndex) {
    removeUser(rowIndex);
    toast.success("Pessoa removida com sucesso!");
    api.delete(`${type}/${rowIndex}?spreadsheetId=${idApi}`);
  }

  function handleEdit({ rowIndex, nome, email }) {
    setUser(nome);
    setId(rowIndex);
    setEmail(email);
    setIsModalOpen(true);
  }
  async function handleSendEdit(){
    await api.put(`${type}/${id}?spreadsheetId=${idApi}`, {
      nome: user,
      email: email
    });
    toast.success("Pessoa alterada com sucesso!");
    setIsModalOpen(!isModalOpen);
    getUsers();
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
                    <MdModeEdit size={20} onClick={() => handleEdit(user)} />
                  </ButtonIcon>
                  <ButtonIcon>
                    <MdDelete size={20} onClick={() => handleDelete(user.rowIndex)} />
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
                  onChange={e => setUser(e.target.value)}
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