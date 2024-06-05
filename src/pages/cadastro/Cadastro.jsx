import Logo from "../../components/Logo/Logo";
import NavBarTop from "../../components/NavBar/NavBarTop";
import styles from "./Cadastro.module.css";

function Cadastro() {
  return (
    <>
      <NavBarTop titulo={"CADASTRO"} />
      <div className={styles["grid-container"]}>
        <div className={styles["form"]}>
          <Logo tamanho={"logo-grande"} />
          <p>Conte-nos um pouco mais sobre você</p>
          <button className={styles["btn-light"]}>Sou Responsável</button>
          <button className={styles["btn-dark"]}>Sou Motorista</button>
        </div>
      </div>
    </>
  );
}

export default Cadastro;
