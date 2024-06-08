import React, { FC } from 'react';
import styles from './Navbar.module.scss';
import notificationImage from './暂时没有消息.png';

interface NotificationModalProps {
  onClose: () => void;
  style?: React.CSSProperties;
}

const NotificationModal: FC<NotificationModalProps> = ({ onClose, style }) => {
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} style={style} onClick={(e) => e.stopPropagation()}>
        <div className={styles.closeButton} onClick={onClose}>
          <i className='bx bx-x'></i>
        </div>
        <h2>Уведомления</h2>
        <img src={notificationImage} alt="" className={styles.notificationImage} />
        <h3>Тут пока ничего нет</h3>
        <div className={styles.notificationText}>Здесь будут появляться уведомления о событиях и др.</div>
      </div>
    </div>
  );
};

export default NotificationModal;
