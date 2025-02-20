import React, { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../../api";
import Enviar from "../../../../components/conversas/Enviar/Enviar";
import StatusEnviado from "../../../../components/conversas/mensagens/StatusEnviado";
import StatusRecebido from "../../../../components/conversas/mensagens/StatusRecebido";
import NavBarBot from "../../../../components/NavBar/NavBarBot";
import NavBarTop from "../../../../components/NavBar/NavBarTop";
import styles from "./ConversaMotorista.module.css";
const ConversaMotorista = () => {
  const [motorista, setMotorista] = useState({});
  const [mensagens, setMensagens] = useState([]);
  const idUsuario = sessionStorage.getItem("ID_USUARIO");

  const handleSubmit = async () => {
    await loadMensagens();
  };

  const messagesEndRef = useRef(null);

  const params = useParams();
  const conversaId = sessionStorage.getItem("conversaId");

  const loadMensagens = useCallback(async () => {
    try {
      const response = await api.get(
        `/conversas?responsavelId=${idUsuario}&motoristaId=${params.id}`,
        { headers: { Authorization: `Bearer ${sessionStorage.token}` } }
      );
      const data = response.data;
      let mensagens = data.mensagens;
      setMotorista(data.motorista);
      let mensagensFiltradas = mensagens.filter((m) => m.status !== "");
      setMensagens(mensagensFiltradas);
      await marcarMensagensComoLidas(data.mensagens);
      return response.status;
    } catch (error) {
      console.error(error);
    }
  }, []);

  const marcarMensagensComoLidas = async (mensagens) => {
    let mensagensNaoLidas = mensagens.filter(
      (m) => !m.lida && m.tipoUsuario === "MOTORISTA"
    );
    console.log(mensagensNaoLidas);
    mensagensNaoLidas.forEach((m) => {
      api.patch(
        `/mensagens/marcar-lida/${m.id}`,
        {},
        { headers: { Authorization: `Bearer ${sessionStorage.token}` } }
      );
    });
  };

  const atualizarStatus = () => {
    return true;
  };

  useEffect(() => {
    loadMensagens();
  }, [loadMensagens]);

  useEffect(() => {
    scrollToBottom();
  }, [mensagens]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    } else {
      console.warn("messagesEndRef is null");
    }
  };

  return (
    <>
      <NavBarTop titulo={motorista.nome} />
      <div className={styles["conversa"]}>
        {mensagens &&
          mensagens.map((m) => {
            if (m.tipoUsuario === "RESPONSAVEL") {
              return (
                <StatusEnviado
                  mensagem={m}
                  key={m.id}
                  enviada={atualizarStatus}
                ></StatusEnviado>
              );
            } else {
              return <StatusRecebido mensagem={m} key={m.id}></StatusRecebido>;
            }
          })}
        <div ref={messagesEndRef} style={{ paddingTop: "10%" }}></div>
      </div>
      <Enviar submit={handleSubmit} conversaId={conversaId} />
      <NavBarBot />
    </>
  );
};

export default ConversaMotorista;
