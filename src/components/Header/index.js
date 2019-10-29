import React from "react";
import { Link } from "react-router-dom";
import { Container, Content } from "./styles";

export default function Header() {
  return (
    <Container>
      <Content>
        <nav>
          <Link to="/users">Usuários</Link>
        </nav>
      </Content>
    </Container>
  );
}