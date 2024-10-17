--
-- PostgreSQL database dump
--

-- Dumped from database version 14.11 (Ubuntu 14.11-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.11 (Ubuntu 14.11-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: drizzle; Type: SCHEMA; Schema: -; Owner: nomanbinbasheer
--

CREATE SCHEMA drizzle;


ALTER SCHEMA drizzle OWNER TO nomanbinbasheer;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: __drizzle_migrations; Type: TABLE; Schema: drizzle; Owner: nomanbinbasheer
--

CREATE TABLE drizzle.__drizzle_migrations (
    id integer NOT NULL,
    hash text NOT NULL,
    created_at bigint
);


ALTER TABLE drizzle.__drizzle_migrations OWNER TO nomanbinbasheer;

--
-- Name: __drizzle_migrations_id_seq; Type: SEQUENCE; Schema: drizzle; Owner: nomanbinbasheer
--

CREATE SEQUENCE drizzle.__drizzle_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE drizzle.__drizzle_migrations_id_seq OWNER TO nomanbinbasheer;

--
-- Name: __drizzle_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: drizzle; Owner: nomanbinbasheer
--

ALTER SEQUENCE drizzle.__drizzle_migrations_id_seq OWNED BY drizzle.__drizzle_migrations.id;


--
-- Name: mcq; Type: TABLE; Schema: public; Owner: nomanbinbasheer
--

CREATE TABLE public.mcq (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    "quizId" text,
    statement text,
    options text[],
    "correctOption" text
);


ALTER TABLE public.mcq OWNER TO nomanbinbasheer;

--
-- Name: __drizzle_migrations id; Type: DEFAULT; Schema: drizzle; Owner: nomanbinbasheer
--

ALTER TABLE ONLY drizzle.__drizzle_migrations ALTER COLUMN id SET DEFAULT nextval('drizzle.__drizzle_migrations_id_seq'::regclass);


--
-- Data for Name: __drizzle_migrations; Type: TABLE DATA; Schema: drizzle; Owner: nomanbinbasheer
--

COPY drizzle.__drizzle_migrations (id, hash, created_at) FROM stdin;
1	1b49edeb211089a805620727aee8a450221bad2ea2299696c43e0a7821f2e810	1713352186513
2	3f1ac3d560ea45f814658f50df0a378214d9ea8611efe9c45baae0d45dbf9a7f	1713354728693
\.


--
-- Data for Name: mcq; Type: TABLE DATA; Schema: public; Owner: nomanbinbasheer
--

COPY public.mcq (id, "quizId", statement, options, "correctOption") FROM stdin;
\.


--
-- Name: __drizzle_migrations_id_seq; Type: SEQUENCE SET; Schema: drizzle; Owner: nomanbinbasheer
--

SELECT pg_catalog.setval('drizzle.__drizzle_migrations_id_seq', 2, true);


--
-- Name: __drizzle_migrations __drizzle_migrations_pkey; Type: CONSTRAINT; Schema: drizzle; Owner: nomanbinbasheer
--

ALTER TABLE ONLY drizzle.__drizzle_migrations
    ADD CONSTRAINT __drizzle_migrations_pkey PRIMARY KEY (id);


--
-- Name: mcq mcq_pkey; Type: CONSTRAINT; Schema: public; Owner: nomanbinbasheer
--

ALTER TABLE ONLY public.mcq
    ADD CONSTRAINT mcq_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

