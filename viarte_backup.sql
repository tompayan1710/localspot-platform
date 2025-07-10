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
    updated_at timestamp without time zone DEFAULT now(),
    latitude double precision,
    longitude double precision,
    city_id integer,
    img text
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
-- Name: offer_cancel_slots; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.offer_cancel_slots (
    id integer NOT NULL,
    slug_offer text,
    date date NOT NULL,
    slots time without time zone[] NOT NULL,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.offer_cancel_slots OWNER TO postgres;

--
-- Name: offer_cancel_slots_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.offer_cancel_slots_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.offer_cancel_slots_id_seq OWNER TO postgres;

--
-- Name: offer_cancel_slots_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.offer_cancel_slots_id_seq OWNED BY public.offer_cancel_slots.id;


--
-- Name: offer_exceptional_slots; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.offer_exceptional_slots (
    id integer NOT NULL,
    slug_offer text,
    date date NOT NULL,
    slots time without time zone[] NOT NULL,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.offer_exceptional_slots OWNER TO postgres;

--
-- Name: offer_exceptional_slots_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.offer_exceptional_slots_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.offer_exceptional_slots_id_seq OWNER TO postgres;

--
-- Name: offer_exceptional_slots_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.offer_exceptional_slots_id_seq OWNED BY public.offer_exceptional_slots.id;


--
-- Name: offer_recurring_slots; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.offer_recurring_slots (
    id integer NOT NULL,
    slug_offer text,
    day_of_week character varying(30) NOT NULL,
    slots time without time zone[] NOT NULL,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.offer_recurring_slots OWNER TO postgres;

--
-- Name: offer_recurring_slots_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.offer_recurring_slots_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.offer_recurring_slots_id_seq OWNER TO postgres;

--
-- Name: offer_recurring_slots_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.offer_recurring_slots_id_seq OWNED BY public.offer_recurring_slots.id;


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
    cancellable boolean DEFAULT false,
    total_capacity integer
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
-- Name: provider_booking_integrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.provider_booking_integrations (
    id integer NOT NULL,
    provider_id integer NOT NULL,
    platform character varying(255) DEFAULT 'google_calendar'::character varying NOT NULL,
    access_token text NOT NULL,
    refresh_token text NOT NULL,
    email character varying(255) NOT NULL,
    calendar_id text
);


ALTER TABLE public.provider_booking_integrations OWNER TO postgres;

--
-- Name: provider_booking_integrations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.provider_booking_integrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.provider_booking_integrations_id_seq OWNER TO postgres;

--
-- Name: provider_booking_integrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.provider_booking_integrations_id_seq OWNED BY public.provider_booking_integrations.id;


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
    user_id integer,
    latitude double precision,
    longitude double precision
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
-- Name: reservation_slots; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reservation_slots (
    id integer NOT NULL,
    provider_id character varying(255) NOT NULL,
    offer_slug character varying(255) NOT NULL,
    date date NOT NULL,
    start_hour character varying(5) NOT NULL,
    end_hour character varying(5) NOT NULL,
    total_reserved integer DEFAULT 0,
    price_per_person numeric(10,2) NOT NULL,
    status character varying(50) DEFAULT 'available'::character varying,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.reservation_slots OWNER TO postgres;

--
-- Name: reservation_slots_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.reservation_slots_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.reservation_slots_id_seq OWNER TO postgres;

--
-- Name: reservation_slots_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.reservation_slots_id_seq OWNED BY public.reservation_slots.id;


--
-- Name: reservations_creneaux_google_calendar; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reservations_creneaux_google_calendar (
    id integer NOT NULL,
    reservation_slots_id integer,
    provider_id integer,
    google_event_id text
);


ALTER TABLE public.reservations_creneaux_google_calendar OWNER TO postgres;

--
-- Name: reservations_creneaux_google_calendar_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.reservations_creneaux_google_calendar_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.reservations_creneaux_google_calendar_id_seq OWNER TO postgres;

--
-- Name: reservations_creneaux_google_calendar_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.reservations_creneaux_google_calendar_id_seq OWNED BY public.reservations_creneaux_google_calendar.id;


--
-- Name: reservations_individuals; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reservations_individuals (
    id integer NOT NULL,
    user_id integer NOT NULL,
    slot_id integer NOT NULL,
    participants jsonb NOT NULL,
    total_participants integer NOT NULL,
    total_price numeric(10,2) NOT NULL,
    payment_status character varying(50) DEFAULT 'unpaid'::character varying,
    reservation_status character varying(50) DEFAULT 'pending'::character varying,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.reservations_individuals OWNER TO postgres;

--
-- Name: reservations_individuals_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.reservations_individuals_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.reservations_individuals_id_seq OWNER TO postgres;

--
-- Name: reservations_individuals_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.reservations_individuals_id_seq OWNED BY public.reservations_individuals.id;


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
    provider_id integer,
    provider character varying(50)
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
-- Name: offer_cancel_slots id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.offer_cancel_slots ALTER COLUMN id SET DEFAULT nextval('public.offer_cancel_slots_id_seq'::regclass);


--
-- Name: offer_exceptional_slots id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.offer_exceptional_slots ALTER COLUMN id SET DEFAULT nextval('public.offer_exceptional_slots_id_seq'::regclass);


--
-- Name: offer_recurring_slots id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.offer_recurring_slots ALTER COLUMN id SET DEFAULT nextval('public.offer_recurring_slots_id_seq'::regclass);


--
-- Name: offers id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.offers ALTER COLUMN id SET DEFAULT nextval('public.offers_id_seq'::regclass);


--
-- Name: provider_booking_integrations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.provider_booking_integrations ALTER COLUMN id SET DEFAULT nextval('public.provider_booking_integrations_id_seq'::regclass);


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
-- Name: reservation_slots id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservation_slots ALTER COLUMN id SET DEFAULT nextval('public.reservation_slots_id_seq'::regclass);


--
-- Name: reservations_creneaux_google_calendar id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservations_creneaux_google_calendar ALTER COLUMN id SET DEFAULT nextval('public.reservations_creneaux_google_calendar_id_seq'::regclass);


--
-- Name: reservations_individuals id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservations_individuals ALTER COLUMN id SET DEFAULT nextval('public.reservations_individuals_id_seq'::regclass);


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
11	Èze	6
12	Deauville	13
13	Marseille	14
14	Antibes Juan les Pins	16
15	Cannes	6
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
13	Calvados
14	Bouches-du-Rhône
15	default
16	15
\.


--
-- Data for Name: hotes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.hotes (id, name, location, type, created_at, updated_at, latitude, longitude, city_id, img) FROM stdin;
2	La Place Hotel	1 Av. 24 Août, 06600 Antibes	Hotel	2025-05-21 11:17:21.124918	2025-05-21 11:17:21.124918	43.580032	7.122513	4	https://cf.bstatic.com/xdata/images/hotel/max1024x768/42921670.jpg?k=e3a4aca8d1c0a56a2a999a67d158fe83f67ff1b7f93182c1ed25ea458dcd8a66&o=&hp=1
3	Studio Eco Haussman	10 avenue des Lilas, 75019 Paris, France	Studio	2025-07-01 20:56:51.456738	2025-07-01 20:56:51.456738	43.7	7.25	2	https://assets.minorhotels.com/image/upload/q_auto,f_auto/media/minor/anantara/images/anantara-plaza-nice/11_gallery_ok/anantara_plaza_nice_hotel_drone_exterior_hotel_hero-crpd-1920x1037.jpg
1	Le Vigangier Futil	12 rue de la Paix, 75002 Paris, France	Hotel	2025-05-21 11:17:21.124918	2025-05-21 11:17:21.124918	\N	\N	\N	\N
\.


--
-- Data for Name: offer_cancel_slots; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.offer_cancel_slots (id, slug_offer, date, slots, created_at) FROM stdin;
60	be82fc03-325c-4453-96b8-2ae7fd028222	2025-07-30	{{09:00:00,12:00:00}}	2025-07-03 14:53:41.448999
61	be82fc03-325c-4453-96b8-2ae7fd028222	2025-07-26	{{09:00:00,12:00:00}}	2025-07-03 14:53:41.450086
63	be82fc03-325c-4453-96b8-2ae7fd028222	2025-07-14	{{12:00:00,13:00:00},{09:00:00,12:00:00}}	2025-07-09 15:13:15.42465
64	be82fc03-325c-4453-96b8-2ae7fd028222	2025-07-28	{{09:00:00,12:00:00},{18:00:00,20:00:00}}	2025-07-09 16:52:15.253112
\.


--
-- Data for Name: offer_exceptional_slots; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.offer_exceptional_slots (id, slug_offer, date, slots, created_at) FROM stdin;
14	be82fc03-325c-4453-96b8-2ae7fd028222	2025-07-24	{{15:30:00,23:00:00}}	2025-07-09 15:10:12.883148
15	be82fc03-325c-4453-96b8-2ae7fd028222	2025-07-31	{{08:00:00,09:00:00},{09:00:00,10:30:00},{10:00:00,11:00:00},{12:30:00,17:15:00}}	2025-07-09 15:10:46.445884
\.


--
-- Data for Name: offer_recurring_slots; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.offer_recurring_slots (id, slug_offer, day_of_week, slots, created_at) FROM stdin;
30	be82fc03-325c-4453-96b8-2ae7fd028222	monday	{{09:00:00,12:00:00},{18:00:00,20:00:00}}	2025-07-03 14:53:41.436273
31	be82fc03-325c-4453-96b8-2ae7fd028222	wednesday	{{18:00:00,20:00:00}}	2025-07-03 14:53:41.442061
32	be82fc03-325c-4453-96b8-2ae7fd028222	saturday	{{01:45:00,04:15:00}}	2025-07-03 14:53:41.443328
\.


--
-- Data for Name: offers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.offers (id, title, description, type, price, image_urls, created_at, updated_at, provider_id, latitude, longitude, city_id, adresse, categories, priceper, duration, qrcode_url, slug, cancellable, total_capacity) FROM stdin;
19	Tour privé en voilier - Baignade et paddle - Cap d'Antibes	Vous profiterez du voilier exclusivement pour vous, en famille ou entre amis. Nous vous ferons découvrir les beautés cachées du Cap d’Antibes, où les plus belles eaux turquoise vous attendent pour la baignade.	Activite	150.00	{https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1751537255707_61efb929594d8b30cba4d79f526844001364976b6e9bec936a9deebe6a9d16e3.avif,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1751537256574_5eb4fa25de905fd2a618f17f7d153c72eab379176f7c61fe430d7681b7955ee2.webp,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1751537257059_384c8532541d482dc0c4c4b775fb7569a6ace5aec7ce32de50406a3bf2e4628f.png,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1751537260004_7f4689fd4793fc3ca058ea13051472abf287fc7a8d5930b50498a328563bde59.webp,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1751537260371_38ab5c434e14ae3290b72ab2c72389a303a909f140e24efd40c8f89701f5fdcd.webp}	2025-07-03 12:12:57.592375	2025-07-03 12:12:57.592375	5	43.586667	7.126944	14	Port Vauban, 06600 Antibes Juan les Pins, France	{"Nature & Aventure","Loisirs & Divertissement","En Famille"}	personne	15 min	https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/qrcodes/1751537260792_2c09a43a-c524-4dbb-bbfa-6b7598ca950b.png	2c09a43a-c524-4dbb-bbfa-6b7598ca950b	t	6
22	Expérience Aquajet au Cap d’Antibes	Nagez comme un dauphin sur le célèbre Cap d'Antibes, de 7 à 77 ans !\nVotre Aquajet 100% sécurisé vous procurera des sensations uniques et inoubliables.\nIl suffit d’être à l’aise dans l’eau	Activite	60.00	{https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1751539922898_caption_1.jpg,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1751539923540_caption.jpg,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1751539923806_caption_5.jpg,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1751539924129_caption_2.jpg,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1751539924578_caption_3.jpg}	2025-07-03 12:52:29.368044	2025-07-03 12:52:29.368044	5	43.5891473	7.123715499999999	4	Port Vauban, Antibes, France	{Nautiques,"Sports & Sensations Fortes"}	personne	15 min	https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/qrcodes/1751539924911_6e7830e6-fd73-4ae1-9419-f47777fa6f95.png	6e7830e6-fd73-4ae1-9419-f47777fa6f95	t	6
20	Survoler la Côte d'Azur en avion privé	Vivez une expérience inoubliable en survolant la splendide Côte d'Azur à bord d’un avion privé. Admirez depuis le ciel les paysages époustouflants de la Méditerranée, les plages dorées, les villages perchés et les montagnes environnantes. 	Activite	500.00	{https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1751539185273_15305892-86c3-4d18-8a4b-2880b2ded338.avif,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1751539186042_be85b758-ee24-43ac-97cd-ad6ed301f31f.avif,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1751539186290_dd4bd889-c77a-4a34-b3a3-cb9f12425ac6.avif,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1751539186666_eb3f00e3-a14c-4737-9772-aa7c2a92f020.avif}	2025-07-03 12:40:52.753928	2025-07-03 12:40:52.753928	5	43.5486286	6.9554298	15	Aéroport de Cannes Mandelieu, 245 Av. Francis Tonner, 06400 Cannes, France	{"Nature & Aventure","Culture & Patrimoine","Sports & Sensations Fortes"}	personne	15 min	https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/qrcodes/1751539186999_be82fc03-325c-4453-96b8-2ae7fd028222.png	be82fc03-325c-4453-96b8-2ae7fd028222	t	6
21	Conduire un cabriolet d'Antibes à Monaco	Profitez de paysages époustouflants à bord d'un cabriolet électrique que vous conduisez et visitez des sites emblématiques.	Activite	75.00	{https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1751539509661_f38c43a6-87fa-43d5-8569-9e5dae0d5cde.avif,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1751539510372_5c6bd7af-a6db-4404-8845-4d5353862748.avif,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1751539510793_0b1a09f6-6a1f-4e86-8c26-5cc01871b51a.avif,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1751539511147_9bdee7b9-0322-4be4-a4b9-3eb442700c44.avif,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1751539511460_737110c7-a7c0-4636-bd9a-bfe3f0b0e47f.avif}	2025-07-03 12:47:08.879574	2025-07-03 12:47:08.879574	5	43.57850560000001	7.1200497	4	7 Bd du Président Wilson, 06600 Antibes, France	{"En Famille","Loisirs & Divertissement","Nature & Aventure","Sports & Sensations Fortes"}	personne	15 min	https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/qrcodes/1751539511879_01bd532b-0eac-4c79-a2a2-bbdb6a98b172.png	01bd532b-0eac-4c79-a2a2-bbdb6a98b172	t	6
23	Explorez les calanques en kayak	Découvrez les calanques sauvages de la Côte Bleue en kayak de mer.	Activite	35.00	{https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1751558949802_229c67d0-80fc-4fa2-8afc-e51cd0a59d9b.avif,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1751558950982_9735be50-2507-4857-b593-b0a02b7ab62b.avif,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1751558951868_aa1aa723-6472-4cf0-a53c-3faf24481322.avif,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1751558952363_daf28703-100d-4b83-aa10-0f44367f8b3e.avif}	2025-07-03 18:11:20.98421	2025-07-03 18:11:20.98421	5	43.7157607	7.351195100000001	11	11 Av. de la Liberté, 06360 Èze, France	{Nautiques,"Loisirs & Divertissement","Nature & Aventure","En Famille"}	personne	15 min	https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/qrcodes/1751558953513_d1eec0ec-f975-4b72-9fd9-b52b1ab964d2.png	d1eec0ec-f975-4b72-9fd9-b52b1ab964d2	t	6
\.


--
-- Data for Name: provider_booking_integrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.provider_booking_integrations (id, provider_id, platform, access_token, refresh_token, email, calendar_id) FROM stdin;
\.


--
-- Data for Name: providers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.providers (id, name, bio, logo_url, tel, email, instagram, facebook, website, type, sizes, moredetails, is_validated) FROM stdin;
2	MonNomOfficial	Ma biographie official	https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/providers-images/logo/1749129298417_TestRename.jpg	+33765594098	lechat@gmail.com	MonInstagram	Monfacebook	monbigsite.fr	Company	3 - 10	Il est vrai que tout parti politique moderne temps inexorablement à l'oligarchie et au désir de haine	f
3	Monbignom	oijfs	https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/providers-images/logo/1749129562611_TestRename.jpg	+33765594020	lebigchat@gmail.com	mlfjsfs		siteweb.fr	Independent	seul		f
1	localspot-db	FLJSOFJSOIFJS	https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/providers-images/logo/1749127966506_images.jpg	+33765594097	tompayan1710@gmail.com	insta	okfoskfosokfoks	SFS.fr	Company	11 - 20	fsfsfsfsfs	t
4	LocalSpot	Ma desctiption	https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/providers-images/logo/1749227206471_images.jpg	+33765594097	tompayan1710@gmail.com	moninsta	fac	siteweb	Company	3 - 10	Mon détail à ajouter	t
5	BigTomRappel	FSIOSJF	https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/providers-images/logo/1751118905743_starIcon.png	+33765594097	tompayan1710@gmail.com	moninsta	fac	monsite.fr	Independent	en équipe	,k	t
\.


--
-- Data for Name: qr_codes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.qr_codes (id, slug, id_hote, adresse, image_url, user_id, latitude, longitude) FROM stdin;
39	2c09a43a-c524-4dbb-bbfa-6b7598ca950b	2	Port Vauban, 06600 Antibes Juan les Pins, France	https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/qrcodes/1751537260792_2c09a43a-c524-4dbb-bbfa-6b7598ca950b.png	32	43.586667	7.126944
40	be82fc03-325c-4453-96b8-2ae7fd028222	2	Aéroport de Cannes Mandelieu, 245 Av. Francis Tonner, 06400 Cannes, France	https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/qrcodes/1751539186999_be82fc03-325c-4453-96b8-2ae7fd028222.png	32	43.5486286	6.9554298
41	01bd532b-0eac-4c79-a2a2-bbdb6a98b172	2	7 Bd du Président Wilson, 06600 Antibes, France	https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/qrcodes/1751539511879_01bd532b-0eac-4c79-a2a2-bbdb6a98b172.png	32	43.57850560000001	7.1200497
42	6e7830e6-fd73-4ae1-9419-f47777fa6f95	2	Port Vauban, Antibes, France	https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/qrcodes/1751539924911_6e7830e6-fd73-4ae1-9419-f47777fa6f95.png	32	43.5891473	7.123715499999999
\.


--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.refresh_tokens (id, user_id, refresh_token, expires_at, created_at) FROM stdin;
85	32	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImVtYWlsIjoidG9tcGF5YW4xNzEwQGdtYWlsLmNvbSIsImlhdCI6MTc1MTMwNzI3NiwiZXhwIjoxNzY2ODU5Mjc2fQ.kL2vvEl3xMYk-t9hfS6xP2niQtuDfDCMi3XLHEcJFNw	2025-12-27 19:14:36.617	2025-06-29 21:31:31.756224
71	32	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImVtYWlsIjoidG9tcGF5YW4xNzEwQGdtYWlsLmNvbSIsImlhdCI6MTc0OTEyNzQ5NSwiZXhwIjoxNzY0Njc5NDk1fQ.CALMlP2vRUuBQ-MHrme2VogcsG7WK2zxzEn8d_LpGb4	2025-12-02 13:44:55.194	2025-05-31 12:51:42.238876
60	32	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImVtYWlsIjoidG9tcGF5YW4xNzEwQGdtYWlsLmNvbSIsImlhdCI6MTc0NzYzNTI4MCwiZXhwIjoxNzYzMTg3MjgwfQ.5axDkDA1wwse950hacV5OFGoXbZB_U0DYTu-GJ9RZU8	2025-11-15 07:14:40.438	2025-05-14 14:37:37.658329
62	32	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImVtYWlsIjoidG9tcGF5YW4xNzEwQGdtYWlsLmNvbSIsImlhdCI6MTc0ODAwNzczMywiZXhwIjoxNzYzNTU5NzMzfQ.2X-hEtlPMfVDstYilbw3N9Qw3FFi9cBULYzfWYn_9Hg	2025-11-19 14:42:13.445	2025-05-23 14:44:39.105683
63	32	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImVtYWlsIjoidG9tcGF5YW4xNzEwQGdtYWlsLmNvbSIsImlhdCI6MTc0ODA3NzUxNSwiZXhwIjoxNzYzNjI5NTE1fQ.BeipdGx7ZA2WTCUnTVImp6SxpYJjlzJJtLkAvyXLZ4E	2025-11-20 10:05:15.203	2025-05-24 11:00:58.263674
93	32	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImVtYWlsIjoidG9tcGF5YW4xNzEwQGdtYWlsLmNvbSIsImlhdCI6MTc1MjEzMTkyNCwiZXhwIjoxNzY3NjgzOTI0fQ.zLkLUpvkm3Lt7wVWJs7zJBOAiNi8JaHfcmUsCnvdIWg	2026-01-06 08:18:44.26	2025-07-03 11:23:09.246481
61	32	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImVtYWlsIjoidG9tcGF5YW4xNzEwQGdtYWlsLmNvbSIsImlhdCI6MTc0ODAwNDIzMiwiZXhwIjoxNzYzNTU2MjMyfQ.8eUW74d-TG3-EsjpHSXhPMJrht0vB2lCaRUEBGqMvA4	2025-11-19 13:43:52.082	2025-05-23 14:29:04.571936
59	32	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImVtYWlsIjoidG9tcGF5YW4xNzEwQGdtYWlsLmNvbSIsImlhdCI6MTc0NzIyMDI2OCwiZXhwIjoxNzYyNzcyMjY4fQ.MBgT8cU7LpNDSWWZEgnglxF7-RdCS6vkf49el7yqTYU	2025-11-10 11:57:48.358	2025-05-14 12:57:48.359308
64	32	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImVtYWlsIjoidG9tcGF5YW4xNzEwQGdtYWlsLmNvbSIsImlhdCI6MTc0ODU4NDMzNiwiZXhwIjoxNzY0MTM2MzM2fQ.HttlpZJ923z9dX8d0rSthcGhtQdU0CwBLNX-AkZXkNA	2025-11-26 06:52:16.407	2025-05-24 19:40:33.351187
70	32	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImVtYWlsIjoidG9tcGF5YW4xNzEwQGdtYWlsLmNvbSIsImlhdCI6MTc0ODY4MTkyNiwiZXhwIjoxNzY0MjMzOTI2fQ.7ffD7dZLmuYhWiMVJ56kr2D8yk6ZXPT1PZBwlmUcAuU	2025-11-27 09:58:46.361	2025-05-31 10:56:51.818549
84	32	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImVtYWlsIjoidG9tcGF5YW4xNzEwQGdtYWlsLmNvbSIsImlhdCI6MTc1MTIyNTE2MiwiZXhwIjoxNzY2Nzc3MTYyfQ.lB46n3tPMKmONKubCeAcpBn76uu8NrjibiHp_kSsMPM	2025-12-26 20:26:02.955	2025-06-29 21:09:05.646374
65	32	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImVtYWlsIjoidG9tcGF5YW4xNzEwQGdtYWlsLmNvbSIsImlhdCI6MTc0ODU4OTgwOSwiZXhwIjoxNzY0MTQxODA5fQ.5JR-4gLef8CkEAVZCifT8WIS61aaaWzTRS6Oe67gGdo	2025-11-26 08:23:29.672	2025-05-30 07:55:31.615536
80	32	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImVtYWlsIjoidG9tcGF5YW4xNzEwQGdtYWlsLmNvbSIsImlhdCI6MTc1MTIxOTE5OSwiZXhwIjoxNzY2NzcxMTk5fQ.mJIXvVgmy_nPV85jyAO7K-JjEPQaUDGd652IaIrgh8c	2025-12-26 18:46:39.394	2025-06-29 16:45:14.381511
\.


--
-- Data for Name: reservation_slots; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reservation_slots (id, provider_id, offer_slug, date, start_hour, end_hour, total_reserved, price_per_person, status, created_at, updated_at) FROM stdin;
15	5	be82fc03-325c-4453-96b8-2ae7fd028222	2025-07-21	09:00	12:00	6	500.00	full	2025-07-10 08:34:23.069271	2025-07-10 08:34:54.325918
16	5	be82fc03-325c-4453-96b8-2ae7fd028222	2025-07-14	18:00	20:00	6	500.00	full	2025-07-10 08:35:30.85721	2025-07-10 08:35:30.85721
17	5	be82fc03-325c-4453-96b8-2ae7fd028222	2025-07-21	18:00	20:00	6	500.00	full	2025-07-10 08:36:07.893438	2025-07-10 08:36:35.075608
18	5	be82fc03-325c-4453-96b8-2ae7fd028222	2025-07-23	18:00	20:00	6	500.00	full	2025-07-10 08:42:59.235806	2025-07-10 08:42:59.235806
19	5	be82fc03-325c-4453-96b8-2ae7fd028222	2025-07-30	18:00	20:00	6	500.00	full	2025-07-10 08:45:04.757455	2025-07-10 08:45:04.757455
20	5	be82fc03-325c-4453-96b8-2ae7fd028222	2025-07-24	15:30	23:00	6	500.00	full	2025-07-10 08:50:50.967871	2025-07-10 08:50:50.967871
21	5	be82fc03-325c-4453-96b8-2ae7fd028222	2025-07-31	12:30	17:15	8	500.00	full	2025-07-10 08:51:47.689815	2025-07-10 08:52:13.461179
22	5	be82fc03-325c-4453-96b8-2ae7fd028222	2025-07-31	10:00	11:00	5	500.00	available	2025-07-10 09:15:19.168673	2025-07-10 09:15:19.168673
23	5	be82fc03-325c-4453-96b8-2ae7fd028222	2025-07-26	01:45	04:15	2	500.00	available	2025-07-10 09:18:39.393154	2025-07-10 09:18:39.393154
\.


--
-- Data for Name: reservations_creneaux_google_calendar; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reservations_creneaux_google_calendar (id, reservation_slots_id, provider_id, google_event_id) FROM stdin;
\.


--
-- Data for Name: reservations_individuals; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reservations_individuals (id, user_id, slot_id, participants, total_participants, total_price, payment_status, reservation_status, created_at, updated_at) FROM stdin;
28	32	15	[{"type": "adulte", "lastName": "Durand", "firstName": "Alice"}, {"type": "réduit", "lastName": "Martin", "firstName": "Bob"}, {"type": "enfant", "lastName": "Petit", "firstName": "Clara"}]	5	2500.00	paid	confirmed	2025-07-10 08:34:23.072957	2025-07-10 08:34:23.072957
29	32	15	[{"type": "adulte", "lastName": "Durand", "firstName": "Alice"}, {"type": "réduit", "lastName": "Martin", "firstName": "Bob"}, {"type": "enfant", "lastName": "Petit", "firstName": "Clara"}]	1	500.00	paid	confirmed	2025-07-10 08:34:54.331603	2025-07-10 08:34:54.331603
30	32	16	[{"type": "adulte", "lastName": "Durand", "firstName": "Alice"}, {"type": "réduit", "lastName": "Martin", "firstName": "Bob"}, {"type": "enfant", "lastName": "Petit", "firstName": "Clara"}]	6	3000.00	paid	confirmed	2025-07-10 08:35:30.869266	2025-07-10 08:35:30.869266
31	32	17	[{"type": "adulte", "lastName": "Durand", "firstName": "Alice"}, {"type": "réduit", "lastName": "Martin", "firstName": "Bob"}, {"type": "enfant", "lastName": "Petit", "firstName": "Clara"}]	4	2000.00	paid	confirmed	2025-07-10 08:36:07.898516	2025-07-10 08:36:07.898516
32	32	17	[{"type": "adulte", "lastName": "Durand", "firstName": "Alice"}, {"type": "réduit", "lastName": "Martin", "firstName": "Bob"}, {"type": "enfant", "lastName": "Petit", "firstName": "Clara"}]	2	1000.00	paid	confirmed	2025-07-10 08:36:35.081326	2025-07-10 08:36:35.081326
33	32	18	[{"type": "adulte", "lastName": "Durand", "firstName": "Alice"}, {"type": "réduit", "lastName": "Martin", "firstName": "Bob"}, {"type": "enfant", "lastName": "Petit", "firstName": "Clara"}]	6	3000.00	paid	confirmed	2025-07-10 08:42:59.238173	2025-07-10 08:42:59.238173
34	32	19	[{"type": "adulte", "lastName": "Durand", "firstName": "Alice"}, {"type": "réduit", "lastName": "Martin", "firstName": "Bob"}, {"type": "enfant", "lastName": "Petit", "firstName": "Clara"}]	6	3000.00	paid	confirmed	2025-07-10 08:45:04.761597	2025-07-10 08:45:04.761597
35	32	20	[{"type": "adulte", "lastName": "Durand", "firstName": "Alice"}, {"type": "réduit", "lastName": "Martin", "firstName": "Bob"}, {"type": "enfant", "lastName": "Petit", "firstName": "Clara"}]	6	3000.00	paid	confirmed	2025-07-10 08:50:50.972323	2025-07-10 08:50:50.972323
36	32	21	[{"type": "adulte", "lastName": "Durand", "firstName": "Alice"}, {"type": "réduit", "lastName": "Martin", "firstName": "Bob"}, {"type": "enfant", "lastName": "Petit", "firstName": "Clara"}]	4	2000.00	paid	confirmed	2025-07-10 08:51:47.694385	2025-07-10 08:51:47.694385
37	32	21	[{"type": "adulte", "lastName": "Durand", "firstName": "Alice"}, {"type": "réduit", "lastName": "Martin", "firstName": "Bob"}, {"type": "enfant", "lastName": "Petit", "firstName": "Clara"}]	4	2000.00	paid	confirmed	2025-07-10 08:52:13.463512	2025-07-10 08:52:13.463512
38	32	22	[{"type": "adulte", "lastName": "Durand", "firstName": "Alice"}, {"type": "réduit", "lastName": "Martin", "firstName": "Bob"}, {"type": "enfant", "lastName": "Petit", "firstName": "Clara"}]	5	2500.00	paid	confirmed	2025-07-10 09:15:19.173118	2025-07-10 09:15:19.173118
39	32	23	[{"type": "adulte", "lastName": "Durand", "firstName": "Alice"}, {"type": "réduit", "lastName": "Martin", "firstName": "Bob"}, {"type": "enfant", "lastName": "Petit", "firstName": "Clara"}]	2	1000.00	paid	confirmed	2025-07-10 09:18:39.40762	2025-07-10 09:18:39.40762
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, first_name, last_name, email, password, role, created_at, provider_id, provider) FROM stdin;
1	Tom	Payan	tom@localspot.fr	hashed_password_placeholder	admin	2025-04-22 20:49:19.76597	\N	\N
6	\N	\N	FSF@gmail.com	$2b$10$eEVbrXQa.vZ9C5Msr0YxM.bz0RU4eogOu2szwAetOFbw2yzWwhiJC	member	2025-05-08 07:34:13.938055	\N	\N
7	\N	\N	exemple@gmail.com	$2b$10$GiphyRWFGxjeBhdPdT3HV.s4Rq/J137vl7uLWQMHdBEgLlqRJswkW	member	2025-05-08 07:40:09.272636	\N	\N
8	\N	\N	test@gmail.com	$2b$10$C8dtvNSijBZ34j9SSRSuFe002s2Rym0.PFq3lB3FsFUM8oSZlnQfe	member	2025-05-08 07:41:20.065282	\N	\N
9	\N	\N	tomtest@gmail.com	$2b$10$sTEwerl97nw0TIejTnYfZOcpfdhyZ0v.2H4QCF.rN.SNIbyai9wem	member	2025-05-08 08:12:26.501359	\N	\N
10	\N	\N	tomchat@gmail.com	$2b$10$y2F.Cg01CGRGa49zt/l8AeP9tk327r65999jgzfUxDScV5ybhOi72	member	2025-05-08 10:01:51.173949	\N	\N
11	\N	\N	tomchat2@gmail.com	$2b$10$efIe1JaYPQkWQ1m.EJ0.wuyLjtFuEFTszFabLgOfCRnwlv85SCefe	member	2025-05-08 10:04:06.732231	\N	\N
14	\N	\N	tombigboss@gmail.com	$2b$10$QRSRoQtIdxPgneul5p/D2ekStxeC.eFZQFrH4J62w6StCi.24nt9y	member	2025-05-10 17:07:08.695414	\N	\N
16	\N	\N	lechateau@gmail.com	$2b$10$r.pjgoOWw1Ne8FqlPx3UJeTHL/6DbmnAtneGvdw4KZ2W0Bo96fiWa	member	2025-05-10 17:13:27.736425	\N	\N
18	\N	\N	echo@gmail.com	$2b$10$V/8nkVbBuPFCIjGRg3HDxeDPYmQxQZmNXc/sVh.4x.KEtXtQG/Vqu	member	2025-05-10 17:17:26.635492	\N	\N
19	\N	\N	ecole@gmail.com	$2b$10$s9T0emPWvdMupsXfmKuq5OnV6Rvu1iOzoxWNQGA5lnr5vnvbDa1K6	member	2025-05-10 17:19:42.654329	\N	\N
26	\N	\N	lolita@gmail.com	$2b$10$YKmtkhg8AI4pDms9makOAOtYJ4gqezoIsxTRaiyEBYmegu9ttZDAi	member	2025-05-11 09:13:38.598332	\N	\N
27	\N	\N	lolo@gmail.com	$2b$10$ScmAqWWPk1JlO9UZ3dJip.CDq7DASk3HYmZhb.h7sh6KBIbvYyr/u	member	2025-05-11 09:18:14.548882	\N	\N
28	\N	\N	lilarilo@gmail.com	$2b$10$cb3HXsqPxACIfqQUg/CMc.NjP123G24K/1yGZQDs68x9tjMbeO6ym	member	2025-05-11 09:42:59.848526	\N	\N
33	\N	\N	lebigtom@gmail.com	$2b$10$2ntO/mTH9Ztao/rOdrr7w.Vqsx7qwLHh4TAurBssYYiXY9gdXYhXK	member	2025-06-13 10:07:27.823409	\N	password-email
32	\N	\N	tompayan1710@gmail.com	\N	member	2025-05-11 17:20:09.47826	5	\N
34	\N	\N	t23590527@gmail.com	\N	member	2025-06-29 21:08:59.068803	\N	google
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

SELECT pg_catalog.setval('public.cities_id_seq', 15, true);


--
-- Name: departments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.departments_id_seq', 16, true);


--
-- Name: hotes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.hotes_id_seq', 3, true);


--
-- Name: offer_cancel_slots_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.offer_cancel_slots_id_seq', 64, true);


--
-- Name: offer_exceptional_slots_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.offer_exceptional_slots_id_seq', 15, true);


--
-- Name: offer_recurring_slots_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.offer_recurring_slots_id_seq', 33, true);


--
-- Name: offers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.offers_id_seq', 23, true);


--
-- Name: provider_booking_integrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.provider_booking_integrations_id_seq', 5, true);


--
-- Name: providers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.providers_id_seq', 5, true);


--
-- Name: qr_codes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.qr_codes_id_seq', 45, true);


--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.refresh_tokens_id_seq', 93, true);


--
-- Name: reservation_slots_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reservation_slots_id_seq', 23, true);


--
-- Name: reservations_creneaux_google_calendar_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reservations_creneaux_google_calendar_id_seq', 16, true);


--
-- Name: reservations_individuals_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reservations_individuals_id_seq', 39, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 34, true);


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
-- Name: offer_cancel_slots offer_cancel_slots_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.offer_cancel_slots
    ADD CONSTRAINT offer_cancel_slots_pkey PRIMARY KEY (id);


--
-- Name: offer_exceptional_slots offer_exceptional_slots_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.offer_exceptional_slots
    ADD CONSTRAINT offer_exceptional_slots_pkey PRIMARY KEY (id);


--
-- Name: offer_recurring_slots offer_recurring_slots_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.offer_recurring_slots
    ADD CONSTRAINT offer_recurring_slots_pkey PRIMARY KEY (id);


--
-- Name: offers offers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.offers
    ADD CONSTRAINT offers_pkey PRIMARY KEY (id);


--
-- Name: provider_booking_integrations provider_booking_integrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.provider_booking_integrations
    ADD CONSTRAINT provider_booking_integrations_pkey PRIMARY KEY (id);


--
-- Name: provider_booking_integrations provider_booking_integrations_provider_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.provider_booking_integrations
    ADD CONSTRAINT provider_booking_integrations_provider_id_key UNIQUE (provider_id);


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
-- Name: reservation_slots reservation_slots_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservation_slots
    ADD CONSTRAINT reservation_slots_pkey PRIMARY KEY (id);


--
-- Name: reservations_creneaux_google_calendar reservations_creneaux_google_calendar_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservations_creneaux_google_calendar
    ADD CONSTRAINT reservations_creneaux_google_calendar_pkey PRIMARY KEY (id);


--
-- Name: reservations_individuals reservations_individuals_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservations_individuals
    ADD CONSTRAINT reservations_individuals_pkey PRIMARY KEY (id);


--
-- Name: offers unique_slug; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.offers
    ADD CONSTRAINT unique_slug UNIQUE (slug);


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
-- Name: hotes hotes_city_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hotes
    ADD CONSTRAINT hotes_city_id_fkey FOREIGN KEY (city_id) REFERENCES public.cities(id);


--
-- Name: offer_cancel_slots offer_cancel_slots_slug_offer_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.offer_cancel_slots
    ADD CONSTRAINT offer_cancel_slots_slug_offer_fkey FOREIGN KEY (slug_offer) REFERENCES public.offers(slug) ON DELETE CASCADE;


--
-- Name: offer_exceptional_slots offer_exceptional_slots_slug_offer_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.offer_exceptional_slots
    ADD CONSTRAINT offer_exceptional_slots_slug_offer_fkey FOREIGN KEY (slug_offer) REFERENCES public.offers(slug) ON DELETE CASCADE;


--
-- Name: offer_recurring_slots offer_recurring_slots_slug_offer_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.offer_recurring_slots
    ADD CONSTRAINT offer_recurring_slots_slug_offer_fkey FOREIGN KEY (slug_offer) REFERENCES public.offers(slug) ON DELETE CASCADE;


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
-- Name: reservations_creneaux_google_calendar reservations_creneaux_google_calendar_provider_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservations_creneaux_google_calendar
    ADD CONSTRAINT reservations_creneaux_google_calendar_provider_id_fkey FOREIGN KEY (provider_id) REFERENCES public.provider_booking_integrations(provider_id) ON DELETE CASCADE;


--
-- Name: reservations_creneaux_google_calendar reservations_creneaux_google_calendar_reservation_slots_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservations_creneaux_google_calendar
    ADD CONSTRAINT reservations_creneaux_google_calendar_reservation_slots_id_fkey FOREIGN KEY (reservation_slots_id) REFERENCES public.reservation_slots(id) ON DELETE CASCADE;


--
-- Name: reservations_individuals reservations_individuals_slot_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservations_individuals
    ADD CONSTRAINT reservations_individuals_slot_id_fkey FOREIGN KEY (slot_id) REFERENCES public.reservation_slots(id) ON DELETE CASCADE;


--
-- Name: users users_provider_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_provider_id_fkey FOREIGN KEY (provider_id) REFERENCES public.providers(id) ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

