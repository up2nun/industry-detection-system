import React, { FC, useContext, useState } from 'react';
import { Context } from '../../index';
import styles from './Navbar.module.scss';
import NotificationModal from './NotificationModal';
import Tooltip from './Tooltip';

const Navbar: FC = () => {
  const { store } = useContext(Context);
  const [showModal, setShowModal] = useState(false);
  const [showBellTooltip, setShowBellTooltip] = useState(false);
  const [showQuestionTooltip, setShowQuestionTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState<{ top: number; left: number } | null>(null);

  const handleBellIconClick = () => {
    setShowModal(true);
  };

  const handleBellIconMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltipPosition({ top: rect.bottom + 16, left: rect.left - 49});
    setShowBellTooltip(true);
  };

  const handleBellIconMouseLeave = () => {
    setShowBellTooltip(false);
  };

  const handleQuestionMarkMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltipPosition({ top: rect.bottom + 16, left: rect.left - 29});
    setShowQuestionTooltip(true);
  };

  const handleQuestionMarkMouseLeave = () => {
    setShowQuestionTooltip(false);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarLinks}>
        <div className={styles.dashboard}>
          <i className='bx bxs-dashboard'></i>
          <span>Панель управления</span>
        </div>
        <div className={styles.notification} onMouseEnter={handleBellIconMouseEnter} onMouseLeave={handleBellIconMouseLeave} onClick={handleBellIconClick}>
          <i className='bx bx-bell'></i>
        </div>
        <div className={styles.questionMark} onMouseEnter={handleQuestionMarkMouseEnter} onMouseLeave={handleQuestionMarkMouseLeave}>
          <i className='bx bxs-help-circle'></i>
        </div>
        <div className={styles.logout} onClick={() => store.logout()}>
          <i className='bx bx-log-out-circle'></i>
          <span>Выйти</span>
        </div>
      </div>
      {showModal && <NotificationModal onClose={() => setShowModal(false)} />}
      <Tooltip content="Уведомления" isVisible={showBellTooltip} position={tooltipPosition} />
      <Tooltip content="Помощь" isVisible={showQuestionTooltip} position={tooltipPosition} />
    </nav>
  );
};

export default Navbar;
