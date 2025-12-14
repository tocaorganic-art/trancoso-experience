/* ============================================
   EVENT CARDS - GLASSMORPHISM PREMIUM
   Toca Experience - 2024
   ============================================ */

/* BASE CARD */
.event-card {
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-radius: 22px;
  padding: 28px;
  display: flex;
  gap: 22px;
  border: 1px solid rgba(255, 255, 255, 0.35);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  cursor: pointer;
}

.event-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 38px rgba(0, 0, 0, 0.12);
}

/* DATE BOX */
.event-date-box {
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-radius: 14px;
  padding: 14px 18px;
  text-align: center;
  font-weight: 700;
  border: 1px solid rgba(255, 255, 255, 0.45);
  min-width: 75px;
  align-self: flex-start;
}

.event-date-box .day {
  font-size: 28px;
  line-height: 1;
  color: #111;
}

.event-date-box .month {
  font-size: 12px;
  text-transform: uppercase;
  color: #444;
  margin-top: 4px;
  letter-spacing: 0.5px;
}

/* EVENT INFO */
.event-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.event-title {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 4px;
  color: #111;
  line-height: 1.3;
}

.event-location {
  color: #666;
  font-size: 14px;
  margin-bottom: 12px;
}

/* TAGS */
.event-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.event-tag {
  font-size: 11px;
  background: #111;
  padding: 6px 10px;
  border-radius: 500px;
  color: #fff;
  font-weight: 500;
  letter-spacing: 0.3px;
  white-space: nowrap;
}

/* ============================================
   VARIAÇÕES DE COR
   ============================================ */

/* CASAMENTO - Rosa/Coral */
.event-card--casamento .event-date-box {
  background: rgba(255, 182, 193, 0.3);
  border-color: rgba(255, 182, 193, 0.5);
}

.event-card--casamento .event-date-box .day {
  color: #d63384;
}

.event-card--casamento .event-date-box .month {
  color: #c71f66;
}

/* RÉVEILLON - Dourado */
.event-card--reveillon .event-date-box {
  background: rgba(255, 215, 0, 0.3);
  border-color: rgba(255, 215, 0, 0.5);
}

.event-card--reveillon .event-date-box .day {
  color: #d4a017;
}

.event-card--reveillon .event-date-box .month {
  color: #b8860b;
}

/* CORPORATIVO - Azul profissional */
.event-card--corporativo .event-date-box {
  background: rgba(79, 70, 229, 0.15);
  border-color: rgba(79, 70, 229, 0.3);
}

.event-card--corporativo .event-date-box .day {
  color: #4f46e5;
}

.event-card--corporativo .event-date-box .month {
  color: #3730a3;
}

/* AFRO HOUSE - Preto elegante */
.event-card--afrohouse .event-date-box {
  background: rgba(0, 0, 0, 0.1);
  border-color: rgba(0, 0, 0, 0.2);
}

.event-card--afrohouse .event-date-box .day {
  color: #000;
}

.event-card--afrohouse .event-date-box .month {
  color: #333;
}

/* GASTRONOMIA - Verde folha/Terracota */
.event-card--gastronomia .event-date-box {
  background: rgba(34, 197, 94, 0.15);
  border-color: rgba(34, 197, 94, 0.3);
}

.event-card--gastronomia .event-date-box .day {
  color: #16a34a;
}

.event-card--gastronomia .event-date-box .month {
  color: #15803d;
}

/* ============================================
   RESPONSIVIDADE - MOBILE
   ============================================ */

@media (max-width: 768px) {
  .event-card {
    flex-direction: column;
    padding: 20px;
    gap: 16px;
  }

  .event-date-box {
    width: fit-content;
    padding: 12px 16px;
  }

  .event-title {
    font-size: 18px;
  }

  .event-location {
    font-size: 13px;
  }

  .event-tag {
    font-size: 10px;
    padding: 5px 9px;
  }
}

/* Para telas muito pequenas */
@media (max-width: 480px) {
  .event-card {
    padding: 16px;
  }

  .event-date-box .day {
    font-size: 24px;
  }

  .event-title {
    font-size: 16px;
  }
}