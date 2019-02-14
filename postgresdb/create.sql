DROP TABLE IF EXISTS gate CASCADE;
DROP TABLE IF EXISTS access_log CASCADE;
DROP TABLE IF EXISTS user_gate CASCADE;
DROP TABLE IF EXISTS users CASCADE;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE "users"
(
    id BIGSERIAL PRIMARY KEY,
    enabled BOOLEAN NOT NULL,
    username varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    is_admin BOOLEAN NOT NULL,
    CONSTRAINT constraint_username UNIQUE (id)
);
CREATE TABLE "gate"
(
    id BIGSERIAL PRIMARY KEY,
    name varchar(255) NOT NULL
);

CREATE TABLE "user_gate"
(
    user_id BIGSERIAL NOT NULL,
    gate_id BIGSERIAL NOT NULL
);

CREATE TABLE "access_log"
(
    id BIGSERIAL PRIMARY KEY,
    id_user bigint,
    in_timestamp timestamp without time zone,
    out_timestamp timestamp without time zone
);