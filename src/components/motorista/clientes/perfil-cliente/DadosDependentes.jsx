import React from "react";
import styles from "./DadosDependentes.module.css";
import FotoPerfil from "../../../../utils/functions/FotoPerfil.jsx";
import Imagem from "../../../../utils/assets/perfil/usuario.png"

const DadosDependentes = ({ dependentes }) => {
  const handleImageError = (e) => {
    e.target.src = Imagem;
  } 

  return (
    <div className={styles["dados-dependentes"]}>
      <div className={styles["inicio"]}>
        <p>Dependentes:</p>
      </div>
      <div className={styles["lista-dependentes"]}>
        {dependentes &&
          dependentes.map((dependente) => (
            <div className={styles["opcao-dependente"]}>
              <div className={styles["campo-inicial"]}>
                <img
                  src={FotoPerfil(dependente.foto)}
                  alt=""
                  className={styles["foto"]}
                  onError={handleImageError}
                />
                <div className={styles["infos"]}>
                  <h2 className={styles["nome"]}>{dependente.nome}</h2>
                  <p className={styles["ver-perfil"]}>
                    Clique para ver o perfil
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default DadosDependentes;
