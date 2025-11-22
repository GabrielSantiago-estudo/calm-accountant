CREATE TABLE IF NOT EXISTS psychologists (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    licence_number VARCHAR(50),
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS clients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    psychologist_id INT NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(50),
    session_type VARCHAR(50),
    session_value DECIMAL(10, 2),
    payment_status VARCHAR(50) DEFAULT 'Active',
    notes TEXT,
    active_status BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (psychologist_id) REFERENCES psychologists(id)
);

CREATE TABLE IF NOT EXISTS sessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    client_id INT NOT NULL,
    session_date DATE NOT NULL,
    session_time VARCHAR(10),
    session_status VARCHAR(50) DEFAULT 'Scheduled',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (client_id) REFERENCES clients(id)
);

CREATE TABLE IF NOT EXISTS transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    psychologist_id INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    trans_type ENUM('Receita', 'Despesa') NOT NULL,
    trans_category VARCHAR(100),
    trans_date DATE NOT NULL,
    description TEXT,
    trans_status VARCHAR(50) DEFAULT 'Paid',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (psychologist_id) REFERENCES psychologists(id)
);

-- Índices (Mantidos do seu código original)
CREATE INDEX idx_clients_psychologist ON clients(psychologist_id);
CREATE INDEX idx_sessions_date ON sessions(session_date);
CREATE INDEX idx_transactions_date ON transactions(trans_date, psychologist_id);