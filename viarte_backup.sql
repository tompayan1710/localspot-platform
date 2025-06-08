--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

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
-- Name: hotes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.hotes (
    id integer NOT NULL,
    name character varying(50),
    location text NOT NULL,
    type character varying(50),
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.hotes OWNER TO postgres;

--
-- Name: hotes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.hotes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.hotes_id_seq OWNER TO postgres;

--
-- Name: hotes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.hotes_id_seq OWNED BY public.hotes.id;


--
-- Name: offers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.offers (
    id integer NOT NULL,
    title text,
    description text,
    type character varying(50),
    price numeric(10,2),
    image_urls text[],
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now(),
    provider_id integer,
    latitude double precision,
    longitude double precision,
    city_id integer,
    adresse text,
    categories text[],
    priceper character varying(40),
    duration character varying(30),
    qrcode_url text,
    slug text,
    cancellable boolean DEFAULT false
);


ALTER TABLE public.offers OWNER TO postgres;

--
-- Name: offers_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.offers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.offers_id_seq OWNER TO postgres;

--
-- Name: offers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.offers_id_seq OWNED BY public.offers.id;


--
-- Name: providers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.providers (
    id integer NOT NULL,
    name character varying(70),
    bio character varying(200),
    logo_url text,
    tel character varying(30),
    email character varying(70),
    instagram character varying(70),
    facebook character varying(70),
    website character varying(100),
    type character varying(30),
    sizes character varying(30),
    moredetails text,
    is_validated boolean DEFAULT false
);


ALTER TABLE public.providers OWNER TO postgres;

--
-- Name: providers_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.providers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.providers_id_seq OWNER TO postgres;

--
-- Name: providers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.providers_id_seq OWNED BY public.providers.id;


--
-- Name: qr_codes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.qr_codes (
    id integer NOT NULL,
    slug text,
    id_hote integer,
    adresse text,
    image_url text,
    longitude double precision,
    latitude double precision,
    user_id integer
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
-- Name: refresh_tokens; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.refresh_tokens (
    id integer NOT NULL,
    user_id integer NOT NULL,
    refresh_token text NOT NULL,
    expires_at timestamp without time zone NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.refresh_tokens OWNER TO postgres;

--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.refresh_tokens_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.refresh_tokens_id_seq OWNER TO postgres;

--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.refresh_tokens_id_seq OWNED BY public.refresh_tokens.id;


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
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    provider_id integer
);


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
-- Name: departments id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.departments ALTER COLUMN id SET DEFAULT nextval('public.departments_id_seq'::regclass);


--
-- Name: hotes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hotes ALTER COLUMN id SET DEFAULT nextval('public.hotes_id_seq'::regclass);


--
-- Name: offers id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.offers ALTER COLUMN id SET DEFAULT nextval('public.offers_id_seq'::regclass);


--
-- Name: providers id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.providers ALTER COLUMN id SET DEFAULT nextval('public.providers_id_seq'::regclass);


--
-- Name: qr_codes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.qr_codes ALTER COLUMN id SET DEFAULT nextval('public.qr_codes_id_seq'::regclass);


--
-- Name: refresh_tokens id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.refresh_tokens ALTER COLUMN id SET DEFAULT nextval('public.refresh_tokens_id_seq'::regclass);


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
2	Vence	6
3	Paris	7
4	Antibes	6
5	Lyon	8
6	Jegun	9
7	Fréjus	10
8	Saint-Tropez	10
9	Ussel	11
10	Fontainebleau	12
\.


--
-- Data for Name: departments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.departments (id, name) FROM stdin;
1	Provence-Alpes-Côte d'Azur
6	Alpes-Maritimes
7	Paris
8	Rhône
9	Gers
10	Var
11	Corrèze
12	Seine-et-Marne
\.


--
-- Data for Name: hotes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.hotes (id, name, location, type, created_at, updated_at) FROM stdin;
1	Hôtel Belle Vue	12 rue de la Paix, 75002 Paris, France	Hotel	2025-05-21 11:17:21.124918	2025-05-21 11:17:21.124918
2	Appartement Cosy Montmartre	45 boulevard de Clichy, 75018 Paris, France	Appartement	2025-05-21 11:17:21.124918	2025-05-21 11:17:21.124918
\.


--
-- Data for Name: offers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.offers (id, title, description, type, price, image_urls, created_at, updated_at, provider_id, latitude, longitude, city_id, adresse, categories, priceper, duration, qrcode_url, slug, cancellable) FROM stdin;
2	Mon Atelier Croissant & Pâtisseries Parisiennes	Plongez dans l art de la patisserie française lors de cet atelier situé au cœur du Marais à Paris. Accompagné d’un chef local, apprenez à préparer de vrais croissants, pains au chocolat et autres classiques de la boulangerie.	food	32.00	{https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/temp/1748000186535_Capture_dAcran_2025-04-20_082417.png,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/temp/1748000328132_Capture_dAcran_2025-04-18_125804.png}	2025-05-24 09:51:57.699709	2025-05-24 09:51:57.699709	1	\N	\N	\N	\N	\N	\N	\N	\N	\N	f
3	Initiation au Jet Ski sur la Baie des Anges	Vivez des sensations fortes en Jet Ski sur la magnifique Baie des Anges à Nice. Encadré par un professionnel, cette activité est parfaite pour les amateurs de vitesse et de mer.	activité	59.00	{https://cdn.getyourguide.com/img/tour/e85ab841efe43073cd4a0eb1030022c6d3ba1295f83d050b3e36b56742f9df98.jpeg/98.jpg,https://cdn.getyourguide.com/img/tour/3572895670a1afa9733f3b84dd27067372a96b833fc1cf956027df461e38a850.jpg/145.jpg}	2025-05-24 10:00:34.619928	2025-05-24 10:00:34.619928	1	\N	\N	\N	\N	\N	\N	\N	\N	\N	f
4	Mon titre	ma description	Activite	13.00	{https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/temp/1748524793152_Appartement1.jpg,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/temp/1748524794030_Appartement2.jpg,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/temp/1748524794344_arrowdownicon.png,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/temp/1748524794561_arrowLeft.png}	2025-05-29 15:52:51.331672	2025-05-29 15:52:51.331672	1	\N	\N	\N	\N	{Plongée,"Ski nautique"}	groupe	\N	\N	\N	f
5	lechat	le chatFSF	Activite	300.00	{https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/temp/1748531405860_editicon.png,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/temp/1748531406526_emplacementicon.png}	2025-05-29 17:12:16.485457	2025-05-29 17:12:16.485457	1	\N	\N	\N	\N	{Plongée,Parachute,JetSki}	groupe	\N	\N	\N	f
6	huhu	tumtumtu	Activite	133.00	{https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/temp/1748542809485_trashicon.png,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/temp/1748542810332_ViarteLogoBig.png}	2025-05-29 20:20:38.286103	2025-05-29 20:20:38.286103	1	43.722468	7.114235	2	4 Pl. Godeau, 06140 Vence, France	{Parachute,"Ski nautique",Bouée}	groupe	15 min	\N	\N	f
7	mON OFFRE google	ma description google est très bien car eslle einvites sle cpécetateur à se posser les bonnes question	Activite	15.00	{https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/temp/1748546499991_googleicon.png,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/temp/1748546500213_equipeicon.png}	2025-05-29 21:22:24.208415	2025-05-29 21:22:24.208415	1	48.8580052	2.2999471	3	45 Av. de la Bourdonnais, 75007 Paris, France	{Parachute,"Ski nautique",Bouée}	groupe	15 min	\N	\N	f
8	MYTITLE	MY DESCRIPTION	Activite	1333.00	{https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/temp/1748585827844_Appartement2.jpg,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/temp/1748585828637_arrowdownicon.png}	2025-05-30 08:17:42.590085	2025-05-30 08:17:42.590085	1	48.8580052	2.2999471	3	45 Av. de la Bourdonnais, 75007 Paris, France	{Parachute,Plongée,Bouée}	groupe	30 min	https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/qrcodes/1748585829152_c6dee409-e7cc-49ca-bf84-57bc74551a39.png	c6dee409-e7cc-49ca-bf84-57bc74551a39	f
9	tom	DESCI	Activite	1222.00	{https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/temp/1748589780874_carRedIcon.png,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/temp/1748589782115_carIcon.png}	2025-05-30 09:23:23.968703	2025-05-30 09:23:23.968703	1	48.8616196	2.3217852	3	23 Quai Anatole France, 75007 Paris, France	{Paddle,Bouée,"Ski nautique"}	groupe	2 h	https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/qrcodes/1748589782858_a06f316f-599a-4279-9d64-cd4572c57e5c.png	a06f316f-599a-4279-9d64-cd4572c57e5c	f
10	Préparez une tarte tropézienne avec un chef pâtissière local	Plongez d'abord dans la création du gâteau provençal classique rendu célèbre par Brigitte Bardot.	Activite	80.00	{https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/temp/1748632509215_walkIcon.png,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/temp/1748632510040_gouter.avif,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/temp/1748632510349_Nice.avif}	2025-05-30 21:16:37.286208	2025-05-30 21:16:37.286208	1	43.722468	7.114235	2	4 Pl. Godeau, 06140 Vence, France	{"Ski nautique",Bouée}	personne	2 h	https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/qrcodes/1748632511422_da6d4489-4bff-4f6d-9088-5f24bf4f81ac.png	da6d4489-4bff-4f6d-9088-5f24bf4f81ac	f
11	Mon barman	Ma descrtipont	Activite	45.00	{https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1749137468541_ChatGPT_Image_Jun_3_2025_09_08_13_AM.png}	2025-06-05 17:31:35.224853	2025-06-05 17:31:35.224853	1	43.7573269	0.458815	6	32360 Jegun, France	{Parachute,Plongée,"Ski nautique"}	groupe	1 h	https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/qrcodes/1749137471206_25574157-2d0a-4cab-8df3-96baac79765c.png	25574157-2d0a-4cab-8df3-96baac79765c	t
12	Ma page rouge	ma descritpon	Activite	2000.00	{https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1749227046794_images.jpg,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1749227047330_TestRename.jpg}	2025-06-06 18:25:08.171499	2025-06-06 18:25:08.171499	1	43.2676808	6.640710899999999	8	83990 Saint-Tropez, France	{Parachute,Plongée}	groupe	+ 6 h	https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/qrcodes/1749227049330_dd4fb41a-3fa4-44cf-ac7f-fc30fe58f143.png	dd4fb41a-3fa4-44cf-ac7f-fc30fe58f143	t
14	Title good	Voici ma description	Activite	123.00	{https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1749322195628_ChatGPT_Image_Jun_7_2025_08_41_35_PM.png,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1749322197580_ChatGPT_Image_Jun_7_2025_08_41_32_PM.png}	2025-06-07 20:50:22.173867	2025-06-07 20:50:22.173867	4	48.40467599999999	2.70162	10	77300 Fontainebleau, France	{JetSki,Parachute,Bouée,"Ski nautique"}	personne	15 min	https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/qrcodes/1749322199784_ddd4ada2-8034-41b3-a97d-a46a64bb6e16.png	ddd4ada2-8034-41b3-a97d-a46a64bb6e16	t
\.


--
-- Data for Name: providers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.providers (id, name, bio, logo_url, tel, email, instagram, facebook, website, type, sizes, moredetails, is_validated) FROM stdin;
1	localspot-db	FLJSOFJSOIFJS	https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/providers-images/logo/1749127966506_images.jpg	+33765594097	tompayan1710@gmail.com	insta	okfoskfosokfoks	SFS.fr	Company	11 - 20	fsfsfsfsfs	f
2	MonNomOfficial	Ma biographie official	https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/providers-images/logo/1749129298417_TestRename.jpg	+33765594098	lechat@gmail.com	MonInstagram	Monfacebook	monbigsite.fr	Company	3 - 10	Il est vrai que tout parti politique moderne temps inexorablement à l'oligarchie et au désir de haine	f
3	Monbignom	oijfs	https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/providers-images/logo/1749129562611_TestRename.jpg	+33765594020	lebigchat@gmail.com	mlfjsfs		siteweb.fr	Independent	seul		f
4	LocalSpot	Ma desctiption	https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/providers-images/logo/1749227206471_images.jpg	+33765594097	tompayan1710@gmail.com	moninsta	fac	siteweb	Company	3 - 10	Mon détail à ajouter	t
\.


--
-- Data for Name: qr_codes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.qr_codes (id, slug, id_hote, adresse, image_url, longitude, latitude, user_id) FROM stdin;
1	49902297-1703-4562-93f5-dd33be67a545	1	23 Quai Anatole France, 75007 Paris, France	https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/qrcodes/1748584847413_49902297-1703-4562-93f5-dd33be67a545.png	2.3217852	48.8616196	\N
2	2adca96d-e541-4c7b-816f-7fe59ec38ae4	1	23 Quai Anatole France, 75007 Paris, France	https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/qrcodes/1748585081808_2adca96d-e541-4c7b-816f-7fe59ec38ae4.png	2.3217852	48.8616196	\N
3	4ed74bbd-7928-4e3f-a619-428ed1721db9	1	23 Quai Anatole France, 75007 Paris, France	https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/qrcodes/1748585549600_4ed74bbd-7928-4e3f-a619-428ed1721db9.png	2.3217852	48.8616196	\N
4	5b214a31-ddbe-403b-8426-afd0ddc3fc69	1	56 Av. Victor Hugo, 75016 Paris, France	https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/qrcodes/1748585683513_5b214a31-ddbe-403b-8426-afd0ddc3fc69.png	2.287313800000001	48.87078460000001	\N
5	c6dee409-e7cc-49ca-bf84-57bc74551a39	1	45 Av. de la Bourdonnais, 75007 Paris, France	https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/qrcodes/1748585829152_c6dee409-e7cc-49ca-bf84-57bc74551a39.png	2.2999471	48.8580052	\N
6	a06f316f-599a-4279-9d64-cd4572c57e5c	1	23 Quai Anatole France, 75007 Paris, France	https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/qrcodes/1748589782858_a06f316f-599a-4279-9d64-cd4572c57e5c.png	2.3217852	48.8616196	\N
7	da6d4489-4bff-4f6d-9088-5f24bf4f81ac	1	4 Pl. Godeau, 06140 Vence, France	https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/qrcodes/1748632511422_da6d4489-4bff-4f6d-9088-5f24bf4f81ac.png	7.114235	43.722468	\N
8	708b596b-caf0-48e4-81a7-b131c5427172	1	76190 Yvetot, France	https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/qrcodes/1748680201918_708b596b-caf0-48e4-81a7-b131c5427172.png	0.755212	49.617779	\N
9	97909581-a8c3-4a7f-8d51-b50ab749468f	1	Fafournoux, 63120 Vollore-Montagne, France	https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/qrcodes/1748681333122_97909581-a8c3-4a7f-8d51-b50ab749468f.png	3.683237	45.785748	\N
14	f938bf3d-55c3-4476-ba43-1144c5f92fee	\N	Hyères, France	https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/qrcodes/1749132336533_f938bf3d-55c3-4476-ba43-1144c5f92fee.png	6.1285466	43.1198436	32
15	0a6fb752-02e7-4df3-a1ff-fdb8f571316b	\N	29890 Kerlouan, France	https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/qrcodes/1749132549405_0a6fb752-02e7-4df3-a1ff-fdb8f571316b.png	-4.365641	48.64517799999999	32
16	bf78a6ae-20d6-4fab-bee5-8cb0c252bc65	\N	French Riviera, France	https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/qrcodes/1749132701976_bf78a6ae-20d6-4fab-bee5-8cb0c252bc65.png	6.637857700000001	43.2547731	32
17	5077ae77-3462-4b18-8862-6f3e40c91032	\N	35190 Tinténiac, France	https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/qrcodes/1749136795754_5077ae77-3462-4b18-8862-6f3e40c91032.png	-1.838123	48.32890829999999	32
18	a4c6f1ae-6493-4b1c-ae61-fd3d1a9a3d5f	\N	40150 Hossegor, France	https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/qrcodes/1749136884399_a4c6f1ae-6493-4b1c-ae61-fd3d1a9a3d5f.png	-1.3976871	43.6646192	32
19	1ff80286-f690-480a-b14b-08df50a11667	\N	Juan-les-Pins, 06160 Antibes, France	https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/qrcodes/1749136926350_1ff80286-f690-480a-b14b-08df50a11667.png	7.1123854	43.5691905	32
20	02bb2225-2663-4f2c-8c6a-0c8e05c82517	\N	Jean-Macé, 69007 Lyon, France	https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/qrcodes/1749137317815_02bb2225-2663-4f2c-8c6a-0c8e05c82517.png	4.842692899999999	45.7465373	32
21	25574157-2d0a-4cab-8df3-96baac79765c	\N	32360 Jegun, France	https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/qrcodes/1749137471206_25574157-2d0a-4cab-8df3-96baac79765c.png	0.458815	43.7573269	32
22	6f8c8717-f464-4b1f-8469-3ba5553661f4	\N	Fréjus, France	https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/qrcodes/1749224089399_6f8c8717-f464-4b1f-8469-3ba5553661f4.png	6.7378809	43.4344545	32
23	578989e1-1076-4c28-89ce-58c2e9e11a5f	\N	Juan-les-Pins, 06160 Antibes, France	https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/qrcodes/1749226962237_578989e1-1076-4c28-89ce-58c2e9e11a5f.png	7.1123854	43.5691905	32
24	dd4fb41a-3fa4-44cf-ac7f-fc30fe58f143	\N	83990 Saint-Tropez, France	https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/qrcodes/1749227049330_dd4fb41a-3fa4-44cf-ac7f-fc30fe58f143.png	6.640710899999999	43.2676808	32
25	d094c5e4-46f7-4e96-bb10-8d705530170a	\N	19200 Ussel, France	https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/qrcodes/1749321429632_d094c5e4-46f7-4e96-bb10-8d705530170a.png	2.313835	45.548905	32
26	fb120df5-3b65-44e3-a626-11446732085c	\N	77300 Fontainebleau, France	https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/qrcodes/1749321550576_fb120df5-3b65-44e3-a626-11446732085c.png	2.70162	48.40467599999999	32
27	ddd4ada2-8034-41b3-a97d-a46a64bb6e16	\N	77300 Fontainebleau, France	https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/qrcodes/1749322199784_ddd4ada2-8034-41b3-a97d-a46a64bb6e16.png	2.70162	48.40467599999999	32
\.


--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.refresh_tokens (id, user_id, refresh_token, expires_at, created_at) FROM stdin;
71	32	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImVtYWlsIjoidG9tcGF5YW4xNzEwQGdtYWlsLmNvbSIsImlhdCI6MTc0OTEyNzQ5NSwiZXhwIjoxNzY0Njc5NDk1fQ.CALMlP2vRUuBQ-MHrme2VogcsG7WK2zxzEn8d_LpGb4	2025-12-02 13:44:55.194	2025-05-31 12:51:42.238876
60	32	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImVtYWlsIjoidG9tcGF5YW4xNzEwQGdtYWlsLmNvbSIsImlhdCI6MTc0NzYzNTI4MCwiZXhwIjoxNzYzMTg3MjgwfQ.5axDkDA1wwse950hacV5OFGoXbZB_U0DYTu-GJ9RZU8	2025-11-15 07:14:40.438	2025-05-14 14:37:37.658329
62	32	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImVtYWlsIjoidG9tcGF5YW4xNzEwQGdtYWlsLmNvbSIsImlhdCI6MTc0ODAwNzczMywiZXhwIjoxNzYzNTU5NzMzfQ.2X-hEtlPMfVDstYilbw3N9Qw3FFi9cBULYzfWYn_9Hg	2025-11-19 14:42:13.445	2025-05-23 14:44:39.105683
63	32	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImVtYWlsIjoidG9tcGF5YW4xNzEwQGdtYWlsLmNvbSIsImlhdCI6MTc0ODA3NzUxNSwiZXhwIjoxNzYzNjI5NTE1fQ.BeipdGx7ZA2WTCUnTVImp6SxpYJjlzJJtLkAvyXLZ4E	2025-11-20 10:05:15.203	2025-05-24 11:00:58.263674
61	32	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImVtYWlsIjoidG9tcGF5YW4xNzEwQGdtYWlsLmNvbSIsImlhdCI6MTc0ODAwNDIzMiwiZXhwIjoxNzYzNTU2MjMyfQ.8eUW74d-TG3-EsjpHSXhPMJrht0vB2lCaRUEBGqMvA4	2025-11-19 13:43:52.082	2025-05-23 14:29:04.571936
59	32	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImVtYWlsIjoidG9tcGF5YW4xNzEwQGdtYWlsLmNvbSIsImlhdCI6MTc0NzIyMDI2OCwiZXhwIjoxNzYyNzcyMjY4fQ.MBgT8cU7LpNDSWWZEgnglxF7-RdCS6vkf49el7yqTYU	2025-11-10 11:57:48.358	2025-05-14 12:57:48.359308
64	32	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImVtYWlsIjoidG9tcGF5YW4xNzEwQGdtYWlsLmNvbSIsImlhdCI6MTc0ODU4NDMzNiwiZXhwIjoxNzY0MTM2MzM2fQ.HttlpZJ923z9dX8d0rSthcGhtQdU0CwBLNX-AkZXkNA	2025-11-26 06:52:16.407	2025-05-24 19:40:33.351187
70	32	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImVtYWlsIjoidG9tcGF5YW4xNzEwQGdtYWlsLmNvbSIsImlhdCI6MTc0ODY4MTkyNiwiZXhwIjoxNzY0MjMzOTI2fQ.7ffD7dZLmuYhWiMVJ56kr2D8yk6ZXPT1PZBwlmUcAuU	2025-11-27 09:58:46.361	2025-05-31 10:56:51.818549
65	32	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImVtYWlsIjoidG9tcGF5YW4xNzEwQGdtYWlsLmNvbSIsImlhdCI6MTc0ODU4OTgwOSwiZXhwIjoxNzY0MTQxODA5fQ.5JR-4gLef8CkEAVZCifT8WIS61aaaWzTRS6Oe67gGdo	2025-11-26 08:23:29.672	2025-05-30 07:55:31.615536
76	32	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImVtYWlsIjoidG9tcGF5YW4xNzEwQGdtYWlsLmNvbSIsImlhdCI6MTc0OTM3NTIxMiwiZXhwIjoxNzY0OTI3MjEyfQ.VmXS_vVazRTPdDObd9wwqYDldnGNnYRkLrzxsGzKzFQ	2025-12-05 10:33:32.848	2025-06-07 17:33:23.331419
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, first_name, last_name, email, password, role, created_at, provider_id) FROM stdin;
1	Tom	Payan	tom@localspot.fr	hashed_password_placeholder	admin	2025-04-22 20:49:19.76597	\N
6	\N	\N	FSF@gmail.com	$2b$10$eEVbrXQa.vZ9C5Msr0YxM.bz0RU4eogOu2szwAetOFbw2yzWwhiJC	member	2025-05-08 07:34:13.938055	\N
7	\N	\N	exemple@gmail.com	$2b$10$GiphyRWFGxjeBhdPdT3HV.s4Rq/J137vl7uLWQMHdBEgLlqRJswkW	member	2025-05-08 07:40:09.272636	\N
8	\N	\N	test@gmail.com	$2b$10$C8dtvNSijBZ34j9SSRSuFe002s2Rym0.PFq3lB3FsFUM8oSZlnQfe	member	2025-05-08 07:41:20.065282	\N
9	\N	\N	tomtest@gmail.com	$2b$10$sTEwerl97nw0TIejTnYfZOcpfdhyZ0v.2H4QCF.rN.SNIbyai9wem	member	2025-05-08 08:12:26.501359	\N
10	\N	\N	tomchat@gmail.com	$2b$10$y2F.Cg01CGRGa49zt/l8AeP9tk327r65999jgzfUxDScV5ybhOi72	member	2025-05-08 10:01:51.173949	\N
11	\N	\N	tomchat2@gmail.com	$2b$10$efIe1JaYPQkWQ1m.EJ0.wuyLjtFuEFTszFabLgOfCRnwlv85SCefe	member	2025-05-08 10:04:06.732231	\N
14	\N	\N	tombigboss@gmail.com	$2b$10$QRSRoQtIdxPgneul5p/D2ekStxeC.eFZQFrH4J62w6StCi.24nt9y	member	2025-05-10 17:07:08.695414	\N
16	\N	\N	lechateau@gmail.com	$2b$10$r.pjgoOWw1Ne8FqlPx3UJeTHL/6DbmnAtneGvdw4KZ2W0Bo96fiWa	member	2025-05-10 17:13:27.736425	\N
18	\N	\N	echo@gmail.com	$2b$10$V/8nkVbBuPFCIjGRg3HDxeDPYmQxQZmNXc/sVh.4x.KEtXtQG/Vqu	member	2025-05-10 17:17:26.635492	\N
19	\N	\N	ecole@gmail.com	$2b$10$s9T0emPWvdMupsXfmKuq5OnV6Rvu1iOzoxWNQGA5lnr5vnvbDa1K6	member	2025-05-10 17:19:42.654329	\N
26	\N	\N	lolita@gmail.com	$2b$10$YKmtkhg8AI4pDms9makOAOtYJ4gqezoIsxTRaiyEBYmegu9ttZDAi	member	2025-05-11 09:13:38.598332	\N
27	\N	\N	lolo@gmail.com	$2b$10$ScmAqWWPk1JlO9UZ3dJip.CDq7DASk3HYmZhb.h7sh6KBIbvYyr/u	member	2025-05-11 09:18:14.548882	\N
28	\N	\N	lilarilo@gmail.com	$2b$10$cb3HXsqPxACIfqQUg/CMc.NjP123G24K/1yGZQDs68x9tjMbeO6ym	member	2025-05-11 09:42:59.848526	\N
32	\N	\N	tompayan1710@gmail.com	\N	member	2025-05-11 17:20:09.47826	4
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

SELECT pg_catalog.setval('public.cities_id_seq', 10, true);


--
-- Name: departments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.departments_id_seq', 12, true);


--
-- Name: hotes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.hotes_id_seq', 2, true);


--
-- Name: offers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.offers_id_seq', 14, true);


--
-- Name: providers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.providers_id_seq', 4, true);


--
-- Name: qr_codes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.qr_codes_id_seq', 27, true);


--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.refresh_tokens_id_seq', 76, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 32, true);


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
-- Name: departments departments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.departments
    ADD CONSTRAINT departments_pkey PRIMARY KEY (id);


--
-- Name: hotes hotes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hotes
    ADD CONSTRAINT hotes_pkey PRIMARY KEY (id);


--
-- Name: offers offers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.offers
    ADD CONSTRAINT offers_pkey PRIMARY KEY (id);


--
-- Name: providers providers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.providers
    ADD CONSTRAINT providers_pkey PRIMARY KEY (id);


--
-- Name: qr_codes qr_codes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.qr_codes
    ADD CONSTRAINT qr_codes_pkey PRIMARY KEY (id);


--
-- Name: refresh_tokens refresh_tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.refresh_tokens
    ADD CONSTRAINT refresh_tokens_pkey PRIMARY KEY (id);


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
-- Name: offers offers_city_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.offers
    ADD CONSTRAINT offers_city_id_fkey FOREIGN KEY (city_id) REFERENCES public.cities(id);


--
-- Name: offers offers_provider_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.offers
    ADD CONSTRAINT offers_provider_id_fkey FOREIGN KEY (provider_id) REFERENCES public.providers(id);


--
-- Name: qr_codes qr_codes_id_hote_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.qr_codes
    ADD CONSTRAINT qr_codes_id_hote_fkey FOREIGN KEY (id_hote) REFERENCES public.hotes(id);


--
-- Name: qr_codes qr_codes_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.qr_codes
    ADD CONSTRAINT qr_codes_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: refresh_tokens refresh_tokens_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.refresh_tokens
    ADD CONSTRAINT refresh_tokens_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: users users_provider_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_provider_id_fkey FOREIGN KEY (provider_id) REFERENCES public.providers(id) ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

