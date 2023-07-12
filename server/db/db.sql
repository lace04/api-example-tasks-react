CREATE DATABASE IF NOT EXISTS tasksdb;

USE tasksdb;

CREATE TABLE IF NOT EXISTS tasks (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  done BOOLEAN DEFAULT false,
  PRIMARY KEY (id)
);

USE tasksdb;

INSERT INTO tasks (title, description, completed) VALUES
  ('First task', 'First description', true),
  ('Second task', 'Second description', false),
  ('Third task', 'Third description', true);


SELECT * FROM tasks;