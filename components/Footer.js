import React from 'react';
import styles from '../styles/Footer.module.css';

const Footer = () => (
  <footer className={styles.footer}>
    <p>
      Todos os direitos reservados © 2025 | Criado com muito <span style={{color: 'red', fontSize: '1.2em'}}>&#10084;&#65039;</span> por <a href="https://github.com/carlinnn" target="_blank" rel="noopener noreferrer" className={styles.author}>Carlos Manoel de Barros Tavares</a>
    </p>
  </footer>
);

export default Footer;