--

-- PostgreSQL database dump

--



-- Dumped from database version 17.4

-- Dumped by pg_dump version 17.4

DROP TABLE IF EXISTS browsers CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS cities CASCADE;
DROP TABLE IF EXISTS companies CASCADE;
DROP TABLE IF EXISTS departments CASCADE;
DROP TABLE IF EXISTS qr_codes CASCADE;
DROP TABLE IF EXISTS qr_placements CASCADE;
DROP TABLE IF EXISTS scans CASCADE;
DROP TABLE IF EXISTS session CASCADE;
DROP TABLE IF EXISTS users CASCADE;


DROP SEQUENCE IF EXISTS browsers_id_seq CASCADE;
DROP SEQUENCE IF EXISTS categories_id_seq CASCADE;
DROP SEQUENCE IF EXISTS cities_id_seq CASCADE;
DROP SEQUENCE IF EXISTS companies_id_seq CASCADE;
DROP SEQUENCE IF EXISTS departments_id_seq CASCADE;
DROP SEQUENCE IF EXISTS qr_codes_id_seq CASCADE;
DROP SEQUENCE IF EXISTS qr_displays_id_seq CASCADE;
DROP SEQUENCE IF EXISTS scans_id_seq CASCADE;
DROP SEQUENCE IF EXISTS users_id_seq CASCADE;


SET statement_timeout = 0;

SET lock_timeout = 0;

SET idle_in_transaction_session_timeout = 0;

SET transaction_timeout = 0;

SET client_encoding = 'UTF8';

SET standard_conforming_strings = on;

SELECT pg_catalog.set_config('search_path', '', false);

SET check_function_bodies = false;

SET xmloption = content;

SET client_min_messages = warning;

SET row_security = off;



SET default_tablespace = '';



SET default_table_access_method = heap;



--

-- Name: browsers; Type: TABLE; Schema: public; Owner: postgres

--



CREATE TABLE public.browsers (

    id integer NOT NULL,

    name character varying(50) NOT NULL

);





ALTER TABLE public.browsers OWNER TO postgres;



--

-- Name: browsers_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres

--



CREATE SEQUENCE public.browsers_id_seq

    AS integer

    START WITH 1

    INCREMENT BY 1

    NO MINVALUE

    NO MAXVALUE

    CACHE 1;





ALTER SEQUENCE public.browsers_id_seq OWNER TO postgres;



--

-- Name: browsers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres

--



ALTER SEQUENCE public.browsers_id_seq OWNED BY public.browsers.id;





--

-- Name: categories; Type: TABLE; Schema: public; Owner: postgres

--



CREATE TABLE public.categories (

    id integer NOT NULL,

    name character varying(100) NOT NULL

);





ALTER TABLE public.categories OWNER TO postgres;



--

-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres

--



CREATE SEQUENCE public.categories_id_seq

    AS integer

    START WITH 1

    INCREMENT BY 1

    NO MINVALUE

    NO MAXVALUE

    CACHE 1;





ALTER SEQUENCE public.categories_id_seq OWNER TO postgres;



--

-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres

--



ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;





--

-- Name: cities; Type: TABLE; Schema: public; Owner: postgres

--



CREATE TABLE public.cities (

    id integer NOT NULL,

    name character varying(100) NOT NULL,

    department_id integer

);





ALTER TABLE public.cities OWNER TO postgres;



--

-- Name: cities_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres

--



CREATE SEQUENCE public.cities_id_seq

    AS integer

    START WITH 1

    INCREMENT BY 1

    NO MINVALUE

    NO MAXVALUE

    CACHE 1;





ALTER SEQUENCE public.cities_id_seq OWNER TO postgres;



--

-- Name: cities_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres

--



ALTER SEQUENCE public.cities_id_seq OWNED BY public.cities.id;





--

-- Name: companies; Type: TABLE; Schema: public; Owner: postgres

--



CREATE TABLE public.companies (

    id integer NOT NULL,

    name character varying(100) NOT NULL,

    sector character varying(100),

    address text,

    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP

);





ALTER TABLE public.companies OWNER TO postgres;



--

-- Name: companies_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres

--



CREATE SEQUENCE public.companies_id_seq

    AS integer

    START WITH 1

    INCREMENT BY 1

    NO MINVALUE

    NO MAXVALUE

    CACHE 1;





ALTER SEQUENCE public.companies_id_seq OWNER TO postgres;



--

-- Name: companies_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres

--



ALTER SEQUENCE public.companies_id_seq OWNED BY public.companies.id;





--

-- Name: departments; Type: TABLE; Schema: public; Owner: postgres

--



CREATE TABLE public.departments (

    id integer NOT NULL,

    name character varying(100) NOT NULL

);





ALTER TABLE public.departments OWNER TO postgres;



--

-- Name: departments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres

--



CREATE SEQUENCE public.departments_id_seq

    AS integer

    START WITH 1

    INCREMENT BY 1

    NO MINVALUE

    NO MAXVALUE

    CACHE 1;





ALTER SEQUENCE public.departments_id_seq OWNER TO postgres;



--

-- Name: departments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres

--



ALTER SEQUENCE public.departments_id_seq OWNED BY public.departments.id;





--

-- Name: qr_codes; Type: TABLE; Schema: public; Owner: postgres

--



CREATE TABLE public.qr_codes (

    id integer NOT NULL,

    slug character varying(32) NOT NULL,

    url text NOT NULL,

    display_id integer,

    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,

    category_id integer

);





ALTER TABLE public.qr_codes OWNER TO postgres;



--

-- Name: qr_codes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres

--



CREATE SEQUENCE public.qr_codes_id_seq

    AS integer

    START WITH 1

    INCREMENT BY 1

    NO MINVALUE

    NO MAXVALUE

    CACHE 1;





ALTER SEQUENCE public.qr_codes_id_seq OWNER TO postgres;



--

-- Name: qr_codes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres

--



ALTER SEQUENCE public.qr_codes_id_seq OWNED BY public.qr_codes.id;





--

-- Name: qr_placements; Type: TABLE; Schema: public; Owner: postgres

--



CREATE TABLE public.qr_placements (

    id integer NOT NULL,

    position_description text,

    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,

    latitude double precision,

    longitude double precision,

    adresse text,

    city_id integer

);





ALTER TABLE public.qr_placements OWNER TO postgres;



--

-- Name: qr_displays_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres

--



CREATE SEQUENCE public.qr_displays_id_seq

    AS integer

    START WITH 1

    INCREMENT BY 1

    NO MINVALUE

    NO MAXVALUE

    CACHE 1;





ALTER SEQUENCE public.qr_displays_id_seq OWNER TO postgres;



--

-- Name: qr_displays_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres

--



ALTER SEQUENCE public.qr_displays_id_seq OWNED BY public.qr_placements.id;





--

-- Name: scans; Type: TABLE; Schema: public; Owner: postgres

--



CREATE TABLE public.scans (

    id integer NOT NULL,

    qr_code_id integer,

    "timestamp" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,

    ip character varying(64),

    user_agent text,

    device_type character varying(50),

    browser_id integer,

    created_at timestamp without time zone DEFAULT now()

);





ALTER TABLE public.scans OWNER TO postgres;



--

-- Name: scans_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres

--



CREATE SEQUENCE public.scans_id_seq

    AS integer

    START WITH 1

    INCREMENT BY 1

    NO MINVALUE

    NO MAXVALUE

    CACHE 1;





ALTER SEQUENCE public.scans_id_seq OWNER TO postgres;



--

-- Name: scans_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres

--



ALTER SEQUENCE public.scans_id_seq OWNED BY public.scans.id;





--

-- Name: session; Type: TABLE; Schema: public; Owner: postgres

--



CREATE TABLE public.session (

    sid character varying(255) NOT NULL,

    sess json NOT NULL,

    expire timestamp without time zone NOT NULL

);





ALTER TABLE public.session OWNER TO postgres;



--

-- Name: users; Type: TABLE; Schema: public; Owner: postgres

--



CREATE TABLE public.users (

    id integer NOT NULL,

    first_name character varying(100),

    last_name character varying(100),

    email character varying(150) NOT NULL,

    password text,

    role character varying(50) DEFAULT 'member'::character varying,

    company_id integer,

    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,

    provider character varying(50) DEFAULT 'password-email'::character varying

);



ALTER TABLE users 
ADD COLUMN IF NOT EXISTS provider VARCHAR(50) DEFAULT 'password-email';

ALTER TABLE users 
ADD COLUMN IF NOT EXISTS password TEXT;



ALTER TABLE public.users OWNER TO postgres;



--

-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres

--



CREATE SEQUENCE public.users_id_seq

    AS integer

    START WITH 1

    INCREMENT BY 1

    NO MINVALUE

    NO MAXVALUE

    CACHE 1;





ALTER SEQUENCE public.users_id_seq OWNER TO postgres;



--

-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres

--



ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;





--

-- Name: browsers id; Type: DEFAULT; Schema: public; Owner: postgres

--



ALTER TABLE ONLY public.browsers ALTER COLUMN id SET DEFAULT nextval('public.browsers_id_seq'::regclass);





--

-- Name: categories id; Type: DEFAULT; Schema: public; Owner: postgres

--



ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);





--

-- Name: cities id; Type: DEFAULT; Schema: public; Owner: postgres

--



ALTER TABLE ONLY public.cities ALTER COLUMN id SET DEFAULT nextval('public.cities_id_seq'::regclass);





--

-- Name: companies id; Type: DEFAULT; Schema: public; Owner: postgres

--



ALTER TABLE ONLY public.companies ALTER COLUMN id SET DEFAULT nextval('public.companies_id_seq'::regclass);





--

-- Name: departments id; Type: DEFAULT; Schema: public; Owner: postgres

--



ALTER TABLE ONLY public.departments ALTER COLUMN id SET DEFAULT nextval('public.departments_id_seq'::regclass);





--

-- Name: qr_codes id; Type: DEFAULT; Schema: public; Owner: postgres

--



ALTER TABLE ONLY public.qr_codes ALTER COLUMN id SET DEFAULT nextval('public.qr_codes_id_seq'::regclass);





--

-- Name: qr_placements id; Type: DEFAULT; Schema: public; Owner: postgres

--



ALTER TABLE ONLY public.qr_placements ALTER COLUMN id SET DEFAULT nextval('public.qr_displays_id_seq'::regclass);





--

-- Name: scans id; Type: DEFAULT; Schema: public; Owner: postgres

--



ALTER TABLE ONLY public.scans ALTER COLUMN id SET DEFAULT nextval('public.scans_id_seq'::regclass);





--

-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres

--



ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);





--

-- Data for Name: browsers; Type: TABLE DATA; Schema: public; Owner: postgres

--



COPY public.browsers (id, name) FROM stdin;

1	Safari Mobile

2	Chrome

3	Opera

\.





--

-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres

--



COPY public.categories (id, name) FROM stdin;

1	Restauration

\.





--

-- Data for Name: cities; Type: TABLE DATA; Schema: public; Owner: postgres

--



COPY public.cities (id, name, department_id) FROM stdin;

1	Nice	1

\.





--

-- Data for Name: companies; Type: TABLE DATA; Schema: public; Owner: postgres

--



COPY public.companies (id, name, sector, address, created_at) FROM stdin;

1	Le Gourmet	Restauration	12 Rue des Gourmets, Nice	2025-04-22 20:47:43.624933

\.





--

-- Data for Name: departments; Type: TABLE DATA; Schema: public; Owner: postgres

--



COPY public.departments (id, name) FROM stdin;

1	Provence-Alpes-C├┤te d'Azur

\.





--

-- Data for Name: qr_codes; Type: TABLE DATA; Schema: public; Owner: postgres

--



COPY public.qr_codes (id, slug, url, display_id, created_at, category_id) FROM stdin;

1	aaaaaaaaaa	https://www.freecodecamp.org/certification/TomPayan/back-end-development-and-apis	\N	2025-04-22 08:02:44.529088	\N

2	k,kkkok	https://www.freecodecamp.org/certification/TomPayan/responsive-web-design	\N	2025-04-22 08:05:14.509919	\N

3	bbbb	https://www.freecodecamp.org/certification/TomPayan/back-end-development-and-apis	\N	2025-04-22 09:20:43.277773	\N

4	ccccccccccc	https://www.freecodecamp.org/certification/TomPayan/responsive-web-design	\N	2025-04-22 09:31:35.620685	\N

5	abc123	https://exemple-client.com	1	2025-04-22 20:51:19.448306	1

6	cocacola	https://www.coca-cola.com/fr/fr	1	2025-04-23 09:13:42.497775	1

\.





--

-- Data for Name: qr_placements; Type: TABLE DATA; Schema: public; Owner: postgres

--



COPY public.qr_placements (id, position_description, created_at, latitude, longitude, adresse, city_id) FROM stdin;

1	Entr├뿯½e principale	2025-04-22 20:44:58.668248	\N	\N	\N	\N

2	Ceci est la description de la position	2025-04-23 23:31:29.532508	43.722468	7.114235	4 Place Godeau, Vence, France	1

3	Ceci est la rue description des feurs	2025-04-27 11:03:58.650913	43.697876	7.253099	20 Bis Av. des Fleurs, 06000 Nice, France	1

4	Rue Lenval Ok	2025-05-05 21:47:41.767052	43.6886684	7.240932499999999	Rue Lenval, 06200 Nice, France	1

5	Autre rue Avenue	2025-05-05 21:48:19.777538	43.69072699999999	7.236171	33 Bis Av. Mont-Rabeau, 06200 Nice, France	1

\.





--

-- Data for Name: scans; Type: TABLE DATA; Schema: public; Owner: postgres

--



COPY public.scans (id, qr_code_id, "timestamp", ip, user_agent, device_type, browser_id, created_at) FROM stdin;

4	1	2025-04-22 21:14:10.174783	192.168.1.50	Mozilla/5.0 (iPhone; CPU iPhone OS 16_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.2 Mobile/15E148 Safari/604.1	mobile	1	2025-04-22 21:14:10.174783

5	4	2025-04-22 21:58:25.919272	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36	desktop	2	2025-04-22 21:58:25.919272

6	4	2025-04-22 21:58:26.126916	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36	desktop	2	2025-04-22 21:58:26.126916

7	4	2025-04-23 06:57:09.013623	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36	desktop	2	2025-04-23 06:57:09.013623

8	4	2025-04-23 06:57:09.554258	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36	desktop	2	2025-04-23 06:57:09.554258

9	4	2025-04-23 07:11:40.128339	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36	desktop	2	2025-04-23 07:11:40.128339

10	5	2025-04-23 07:11:41.916717	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36	desktop	2	2025-04-23 07:11:41.916717

11	5	2025-04-23 07:11:42.336358	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36	desktop	2	2025-04-23 07:11:42.336358

12	3	2025-04-23 07:13:56.590829	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36	desktop	2	2025-04-23 07:13:56.590829

13	2	2025-04-23 07:15:09.561742	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36	desktop	2	2025-04-23 07:15:09.561742

14	4	2025-04-23 07:39:17.110447	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36	desktop	2	2025-04-23 07:39:17.110447

15	4	2025-04-23 07:39:17.832412	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36	desktop	2	2025-04-23 07:39:17.832412

16	4	2025-04-23 07:43:06.936377	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36	desktop	2	2025-04-23 07:43:06.936377

17	3	2025-04-23 07:43:09.861429	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36	desktop	2	2025-04-23 07:43:09.861429

18	4	2025-04-23 08:50:26.690072	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36	desktop	2	2025-04-23 08:50:26.690072

19	4	2025-04-23 08:50:48.350542	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36	desktop	2	2025-04-23 08:50:48.350542

20	4	2025-04-23 08:52:11.467155	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36	desktop	2	2025-04-23 08:52:11.467155

21	1	2025-04-23 08:52:14.321834	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36	desktop	2	2025-04-23 08:52:14.321834

22	4	2025-04-23 08:56:22.222269	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36 OPR/117.0.0.0	desktop	3	2025-04-23 08:56:22.222269

23	4	2025-05-07 07:32:03.461576	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36	desktop	2	2025-05-07 07:32:03.461576

\.





--

-- Data for Name: session; Type: TABLE DATA; Schema: public; Owner: postgres

--



COPY public.session (sid, sess, expire) FROM stdin;

RvLqZWiOn3UqFTOyfHJP6T9l2F36H9s0	{"cookie":{"originalMaxAge":86400000,"expires":"2025-05-09T06:08:11.787Z","secure":false,"httpOnly":true,"path":"/","sameSite":"lax"},"views":9,"user":{"id":8,"email":"test@gmail.com"}}	2025-05-09 15:07:28

\.





--

-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres

--



COPY public.users (id, first_name, last_name, email, password, role, company_id, created_at, provider) FROM stdin;

1	Tom	Payan	tom@localspot.fr	hashed_password_placeholder	admin	1	2025-04-22 20:49:19.76597	password-email

6	\N	\N	FSF@gmail.com	$2b$10$eEVbrXQa.vZ9C5Msr0YxM.bz0RU4eogOu2szwAetOFbw2yzWwhiJC	member	\N	2025-05-08 07:34:13.938055	password-email

7	\N	\N	exemple@gmail.com	$2b$10$GiphyRWFGxjeBhdPdT3HV.s4Rq/J137vl7uLWQMHdBEgLlqRJswkW	member	\N	2025-05-08 07:40:09.272636	password-email

8	\N	\N	test@gmail.com	$2b$10$C8dtvNSijBZ34j9SSRSuFe002s2Rym0.PFq3lB3FsFUM8oSZlnQfe	member	\N	2025-05-08 07:41:20.065282	password-email

9	\N	\N	tomtest@gmail.com	$2b$10$sTEwerl97nw0TIejTnYfZOcpfdhyZ0v.2H4QCF.rN.SNIbyai9wem	member	\N	2025-05-08 08:12:26.501359	password-email

10	\N	\N	tomchat@gmail.com	$2b$10$y2F.Cg01CGRGa49zt/l8AeP9tk327r65999jgzfUxDScV5ybhOi72	member	\N	2025-05-08 10:01:51.173949	password-email

11	\N	\N	tomchat2@gmail.com	$2b$10$efIe1JaYPQkWQ1m.EJ0.wuyLjtFuEFTszFabLgOfCRnwlv85SCefe	member	\N	2025-05-08 10:04:06.732231	password-email

14	\N	\N	tombigboss@gmail.com	$2b$10$QRSRoQtIdxPgneul5p/D2ekStxeC.eFZQFrH4J62w6StCi.24nt9y	member	\N	2025-05-10 17:07:08.695414	password-email

16	\N	\N	lechateau@gmail.com	$2b$10$r.pjgoOWw1Ne8FqlPx3UJeTHL/6DbmnAtneGvdw4KZ2W0Bo96fiWa	member	\N	2025-05-10 17:13:27.736425	password-email

18	\N	\N	echo@gmail.com	$2b$10$V/8nkVbBuPFCIjGRg3HDxeDPYmQxQZmNXc/sVh.4x.KEtXtQG/Vqu	member	\N	2025-05-10 17:17:26.635492	password-email

19	\N	\N	ecole@gmail.com	$2b$10$s9T0emPWvdMupsXfmKuq5OnV6Rvu1iOzoxWNQGA5lnr5vnvbDa1K6	member	\N	2025-05-10 17:19:42.654329	password-email

20	\N	\N	riri@gmail.com	$2b$10$.lvaTB9JgL/4V//5o7KljOTRet8nC3WSZb/vCQQl0X4TwoXF0FIae	member	\N	2025-05-10 17:21:22.087422	password-email

25	\N	\N	tompayan1710@gmail.com	\N	member	\N	2025-05-10 17:58:28.652671	google

\.





--

-- Name: browsers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres

--



SELECT pg_catalog.setval('public.browsers_id_seq', 3, true);





--

-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres

--



SELECT pg_catalog.setval('public.categories_id_seq', 1, false);





--

-- Name: cities_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres

--



SELECT pg_catalog.setval('public.cities_id_seq', 1, true);





--

-- Name: companies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres

--



SELECT pg_catalog.setval('public.companies_id_seq', 1, true);





--

-- Name: departments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres

--



SELECT pg_catalog.setval('public.departments_id_seq', 1, true);





--

-- Name: qr_codes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres

--



SELECT pg_catalog.setval('public.qr_codes_id_seq', 6, true);





--

-- Name: qr_displays_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres

--



SELECT pg_catalog.setval('public.qr_displays_id_seq', 5, true);





--

-- Name: scans_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres

--



SELECT pg_catalog.setval('public.scans_id_seq', 23, true);





--

-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres

--



SELECT pg_catalog.setval('public.users_id_seq', 25, true);





--

-- Name: browsers browsers_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres

--



ALTER TABLE ONLY public.browsers

    ADD CONSTRAINT browsers_name_key UNIQUE (name);





--

-- Name: browsers browsers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres

--



ALTER TABLE ONLY public.browsers

    ADD CONSTRAINT browsers_pkey PRIMARY KEY (id);





--

-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres

--



ALTER TABLE ONLY public.categories

    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);





--

-- Name: cities cities_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres

--



ALTER TABLE ONLY public.cities

    ADD CONSTRAINT cities_pkey PRIMARY KEY (id);





--

-- Name: companies companies_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres

--



ALTER TABLE ONLY public.companies

    ADD CONSTRAINT companies_pkey PRIMARY KEY (id);





--

-- Name: departments departments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres

--



ALTER TABLE ONLY public.departments

    ADD CONSTRAINT departments_pkey PRIMARY KEY (id);





--

-- Name: qr_codes qr_codes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres

--



ALTER TABLE ONLY public.qr_codes

    ADD CONSTRAINT qr_codes_pkey PRIMARY KEY (id);





--

-- Name: qr_codes qr_codes_slug_key; Type: CONSTRAINT; Schema: public; Owner: postgres

--



ALTER TABLE ONLY public.qr_codes

    ADD CONSTRAINT qr_codes_slug_key UNIQUE (slug);





--

-- Name: scans scans_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres

--



ALTER TABLE ONLY public.scans

    ADD CONSTRAINT scans_pkey PRIMARY KEY (id);





--

-- Name: session session_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres

--



ALTER TABLE ONLY public.session

    ADD CONSTRAINT session_pkey PRIMARY KEY (sid);





--

-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres

--



ALTER TABLE ONLY public.users

    ADD CONSTRAINT users_email_key UNIQUE (email);





--

-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres

--



ALTER TABLE ONLY public.users

    ADD CONSTRAINT users_pkey PRIMARY KEY (id);





--

-- Name: cities cities_department_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres

--



ALTER TABLE ONLY public.cities

    ADD CONSTRAINT cities_department_id_fkey FOREIGN KEY (department_id) REFERENCES public.departments(id);





--

-- Name: qr_placements fk_city; Type: FK CONSTRAINT; Schema: public; Owner: postgres

--



ALTER TABLE ONLY public.qr_placements

    ADD CONSTRAINT fk_city FOREIGN KEY (city_id) REFERENCES public.cities(id) ON DELETE SET NULL;





--

-- Name: scans fk_scans_browser; Type: FK CONSTRAINT; Schema: public; Owner: postgres

--



ALTER TABLE ONLY public.scans

    ADD CONSTRAINT fk_scans_browser FOREIGN KEY (browser_id) REFERENCES public.browsers(id) ON DELETE SET NULL;





--

-- Name: qr_codes qr_codes_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres

--



ALTER TABLE ONLY public.qr_codes

    ADD CONSTRAINT qr_codes_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id);





--

-- Name: scans scans_qr_code_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres

--



ALTER TABLE ONLY public.scans

    ADD CONSTRAINT scans_qr_code_id_fkey FOREIGN KEY (qr_code_id) REFERENCES public.qr_codes(id) ON DELETE CASCADE;





--

-- Name: users users_company_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres

--



ALTER TABLE ONLY public.users

    ADD CONSTRAINT users_company_id_fkey FOREIGN KEY (company_id) REFERENCES public.companies(id);





--

-- PostgreSQL database dump complete

--



