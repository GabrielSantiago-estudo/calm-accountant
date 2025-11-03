-- Índices para clients
CREATE INDEX IF NOT EXISTS idx_clients_psychologist ON clients(psychologist_id);
CREATE INDEX IF NOT EXISTS idx_clients_status ON clients(payment_status, active_status);

-- Índices para sessions
CREATE INDEX IF NOT EXISTS idx_sessions_date ON sessions(session_date, psychologist_id);
CREATE INDEX IF NOT EXISTS idx_sessions_status ON sessions(session_status);
CREATE INDEX IF NOT EXISTS idx_sessions_client ON sessions(client_id);

-- Índices para transactions
CREATE INDEX IF NOT EXISTS idx_transactions_date ON transactions(trans_date, psychologist_id);
CREATE INDEX IF NOT EXISTS idx_transactions_type ON transactions(trans_type, trans_status);
CREATE INDEX IF NOT EXISTS idx_transactions_category ON transactions(trans_category);

-- Índices para goals
CREATE INDEX IF NOT EXISTS idx_goals_period ON goals(psychologist_id, start_date, end_date);
CREATE INDEX IF NOT EXISTS idx_goals_active ON goals(target_active);