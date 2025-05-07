CREATE TABLE market (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  chain_id ENUM('1', '56'),
  total_supply_cents BIGINT NOT NULL,
  total_borrow_cents BIGINT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO market (name, chain_id, total_supply_cents, total_borrow_cents) VALUES
('Token 01', '1', 10482, 5915),
('Token 02', '1', 20459, 5712),
('Token 27', '56', 22915, 7233);
