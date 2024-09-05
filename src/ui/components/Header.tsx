import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import '@/assets/styles/components/_header.scss';
import { useLoading } from '@/shared/context/LoadingContext';

const Header: React.FC = () => {
  const { isLoading } = useLoading();
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isLoading) {
      // Inicia la animación de carga
      setLoadingProgress(0); // Asegúrate de que la barra comience desde 0
      interval = setInterval(() => {
        setLoadingProgress((prev) => Math.min(prev + 1, 100)); // Incrementa el progreso
      }, 100); // Ajusta el intervalo según la duración deseada
    } else {
      // Finaliza la animación y oculta la barra
      setLoadingProgress(100); // Completa la carga
      setTimeout(() => setLoadingProgress(0), 1000); // Espera 1 segundo antes de ocultar la barra
    }

    return () => clearInterval(interval);
  }, [isLoading]);

  return (
    <>
      <header className="header">
        <div className="container">
          <Link to="/" className="header__title">
            PodcastApp
          </Link>
        </div>
        <div
          className={classNames('loading-bar', {
            isLoading: isLoading,
            completed: !isLoading && loadingProgress === 100,
          })}
          style={{ transform: `scaleX(${loadingProgress / 100})` }}
        ></div>
      </header>
    </>
  );
};

export default Header;
