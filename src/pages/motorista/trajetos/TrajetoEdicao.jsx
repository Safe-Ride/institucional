import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../api";
import CardDependenteEdicao from "../../../components/motorista/Trajetos/CardDependenteEdicao";
import NavBarBot from "../../../components/NavBar/NavBarBot";
import NavBarTop from "../../../components/NavBar/NavBarTop";
import styles from "./TrajetoEdicao.module.css";

const TrajetoEdicao = () => {
  const [trajeto, setTrajeto] = useState({});
  const params = useParams();
  const idTrajeto = params["id"];
  const [atualizarTela, setAtualizarTela] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/trajetos/${idTrajeto}`).then((res) => {
      const { data } = res;
      setTrajeto(data);
    });
    setAtualizarTela(false);
  }, [idTrajeto, atualizarTela]);

  return (
    <>
      <NavBarTop titulo={"TRAJETOS"} />
      <div className={styles["container"]}>
        <div className={styles["card"]}>
          <div className={styles["title"]}>
            {trajeto && `TRAJETO SELECIONADO: ${trajeto?.escola?.nome}`}
          </div>
          {trajeto !== null && trajeto?.rotas?.length > 0 ? (
            trajeto.rotas.map((rota, index) => (
              <CardDependenteEdicao
                key={index}
                rotaId={rota.id}
                dependente={rota.dependente}
                enderecoId={rota.endereco.id}
                atualizarTela={setAtualizarTela}
              />
            ))
          ) : (
            <div></div>
          )}
          <div
            className={styles["container"]}
            onClick={() =>
              navigate(`/motorista/trajetos/${trajeto.id}/adicionar-dependente`)
            }
          >
            <h3 className={styles["text"]}>+ Adicionar dependentes</h3>
          </div>
        </div>
      </div>
      <NavBarBot />
    </>
  );
};

export default TrajetoEdicao;

