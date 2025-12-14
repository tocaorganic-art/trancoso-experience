/* EventCard - Card de evento com glassmorphism premium */

.event-card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
  border-radius: 20px;
  backdrop-filter: blur(16px);
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  min-height: 240px;
}

.event-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.18);
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.25);
}

/* Variantes de cor */
.event-card--reveillon {
  border-left: 4px solid #FBBF24;
}

.event-card--casamento {
  border-left: 4px solid #EC4899;
}

.event-card--corporativo {
  border-left: 4px solid #8B5CF6;
}

.event-card--afrohouse {
  border-left: 4px solid #F97316;
}

.event-card--gastronomia {
  border-left: 4px solid #10B981;
}

/* Card com imagem de fundo */
.event-card--with-image {
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.event-card--with-image .event-title,
.event-card--with-image .event-location,
.event-card--with-image .event-highlight {
  color: #ffffff;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.6);
}

/* Header */
.event-card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 4px;
}

/* Date Box */
.event-date-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  flex-shrink: 0;
}

.event-date-box .day {
  font-size: 26px;
  font-weight: 700;
  line-height: 1;
  color: #ffffff;
  letter-spacing: -0.5px;
}

.event-date-box .month {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.8);
  letter-spacing: 0.5px;
  margin-top: 2px;
}

/* Event Info */
.event-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.event-title {
  font-size: 18px;
  font-weight: 700;
  line-height: 1.3;
  color: #ffffff;
  margin: 0;
}

.event-location {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
  display: flex;
  align-items: center;
  gap: 4px;
}

/* Highlights */
.event-highlights {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 4px;
}

.event-highlight {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.65);
  line-height: 1.4;
}

/* Tags */
.event-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 8px;
}

.event-tag {
  padding: 4px 10px;
  border-radius: 8px;
  font-size: 11px;
  font-weight: 600;
  background: rgba(255, 255, 255, 0.15);
  color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  white-space: nowrap;
}

/* Status Badge */
.event-status-badge {
  margin-top: 8px;
  font-size: 11px;
  font-weight: 600;
  padding: 4px 8px;
  width: fit-content;
}

/* Footer */
.event-card-footer {
  display: flex;
  gap: 8px;
  margin-top: auto;
  padding-top: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.event-buy-button {
  flex: 1;
  background: linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%);
  border: none;
  color: #000000;
  font-weight: 600;
  font-size: 13px;
  padding: 10px 16px;
  border-radius: 10px;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.event-buy-button:hover {
  background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
  transform: scale(1.02);
  box-shadow: 0 4px 12px rgba(251, 191, 36, 0.4);
}

/* Responsividade */
@media (max-width: 640px) {
  .event-card {
    padding: 16px;
    gap: 12px;
    min-height: 200px;
  }

  .event-date-box {
    width: 56px;
    height: 56px;
  }

  .event-date-box .day {
    font-size: 22px;
  }

  .event-date-box .month {
    font-size: 10px;
  }

  .event-title {
    font-size: 16px;
  }

  .event-location {
    font-size: 13px;
  }

  .event-buy-button {
    font-size: 12px;
    padding: 8px 12px;
  }
}