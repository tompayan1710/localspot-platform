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
-- Name: comments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.comments (
    id integer NOT NULL,
    user_id integer NOT NULL,
    offer_slug text NOT NULL,
    reservation_id integer NOT NULL,
    rating integer NOT NULL,
    comment text,
    created_at timestamp without time zone DEFAULT now(),
    CONSTRAINT comments_rating_check CHECK (((rating >= 1) AND (rating <= 5)))
);


ALTER TABLE public.comments OWNER TO postgres;

--
-- Name: comments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.comments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.comments_id_seq OWNER TO postgres;

--
-- Name: comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.comments_id_seq OWNED BY public.comments.id;


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
-- Name: favorites; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.favorites (
    id integer NOT NULL,
    user_id integer NOT NULL,
    offer_slug text NOT NULL,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.favorites OWNER TO postgres;

--
-- Name: favorites_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.favorites_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.favorites_id_seq OWNER TO postgres;

--
-- Name: favorites_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.favorites_id_seq OWNED BY public.favorites.id;


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
-- Name: invitation_tokens; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.invitation_tokens (
    id integer NOT NULL,
    invitation_token uuid DEFAULT gen_random_uuid() NOT NULL,
    provider_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    expires_at timestamp without time zone DEFAULT (now() + '1 day'::interval),
    used_at timestamp without time zone,
    is_used boolean DEFAULT false
);


ALTER TABLE public.invitation_tokens OWNER TO postgres;

--
-- Name: invitation_tokens_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.invitation_tokens_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.invitation_tokens_id_seq OWNER TO postgres;

--
-- Name: invitation_tokens_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.invitation_tokens_id_seq OWNED BY public.invitation_tokens.id;


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
    is_validated boolean DEFAULT false,
    stripe_account_id text
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
    total_participants integer NOT NULL,
    total_price numeric(10,2) NOT NULL,
    payment_status character varying(50) DEFAULT 'unpaid'::character varying,
    reservation_status character varying(50) DEFAULT 'pending'::character varying,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now(),
    nb_adult integer,
    nb_reduced integer,
    email text,
    name character varying(100),
    phone character varying(100),
    stripe_payment_intent_id text
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
    email character varying(150) NOT NULL,
    password text,
    role character varying(50) DEFAULT 'member'::character varying,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    provider_id integer,
    provider character varying(50),
    name character varying(100),
    phone character varying(20),
    profil_picture text,
    receive_booking_emails boolean DEFAULT true,
    receive_activity_suggestions boolean DEFAULT true
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
-- Name: withdrawal_methods; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.withdrawal_methods (
    id integer NOT NULL,
    provider_id integer,
    method character varying(50),
    iban character varying(34),
    swift character varying(11),
    first_name character varying(100),
    last_name character varying(100),
    paypal_email character varying(100),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.withdrawal_methods OWNER TO postgres;

--
-- Name: withdrawal_methods_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.withdrawal_methods_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.withdrawal_methods_id_seq OWNER TO postgres;

--
-- Name: withdrawal_methods_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.withdrawal_methods_id_seq OWNED BY public.withdrawal_methods.id;


--
-- Name: withdrawals; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.withdrawals (
    id integer NOT NULL,
    provider_id integer NOT NULL,
    amount numeric(10,2) NOT NULL,
    method text NOT NULL,
    details text,
    status text DEFAULT 'pending'::text,
    created_at timestamp without time zone DEFAULT now(),
    iban text,
    swift text,
    first_name text,
    last_name text,
    paypal_email text
);


ALTER TABLE public.withdrawals OWNER TO postgres;

--
-- Name: withdrawals_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.withdrawals_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.withdrawals_id_seq OWNER TO postgres;

--
-- Name: withdrawals_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.withdrawals_id_seq OWNED BY public.withdrawals.id;


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
-- Name: comments id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments ALTER COLUMN id SET DEFAULT nextval('public.comments_id_seq'::regclass);


--
-- Name: departments id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.departments ALTER COLUMN id SET DEFAULT nextval('public.departments_id_seq'::regclass);


--
-- Name: favorites id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favorites ALTER COLUMN id SET DEFAULT nextval('public.favorites_id_seq'::regclass);


--
-- Name: hotes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hotes ALTER COLUMN id SET DEFAULT nextval('public.hotes_id_seq'::regclass);


--
-- Name: invitation_tokens id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.invitation_tokens ALTER COLUMN id SET DEFAULT nextval('public.invitation_tokens_id_seq'::regclass);


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
-- Name: withdrawal_methods id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.withdrawal_methods ALTER COLUMN id SET DEFAULT nextval('public.withdrawal_methods_id_seq'::regclass);


--
-- Name: withdrawals id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.withdrawals ALTER COLUMN id SET DEFAULT nextval('public.withdrawals_id_seq'::regclass);


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
16	Les Sables-d'Olonne	17
17	Coupvray	12
18	Sainte-Geneviève-des-Bois	18
19	Gaillard	19
\.


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.comments (id, user_id, offer_slug, reservation_id, rating, comment, created_at) FROM stdin;
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
17	Vendee
18	Essonne
19	Haute-Savoie
\.


--
-- Data for Name: favorites; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.favorites (id, user_id, offer_slug, created_at) FROM stdin;
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
-- Data for Name: invitation_tokens; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.invitation_tokens (id, invitation_token, provider_id, created_at, expires_at, used_at, is_used) FROM stdin;
8	14c14dec-7b78-4b04-8c58-978c5564106c	5	2025-08-01 16:20:42.260969	2025-08-03 16:20:42.139	\N	f
10	cb6a5d91-3563-4e56-baa4-928d8dcce953	5	2025-08-01 16:48:19.831147	2025-08-02 16:48:19.831147	\N	f
11	63da90c0-a548-48a7-a394-7fdae72cff1f	5	2025-08-01 20:32:23.936178	2025-08-03 20:32:23.809	\N	f
12	07c49a0e-d7ff-4dd5-8370-b4f333b85081	5	2025-08-02 19:49:06.641214	2025-08-03 19:49:06.641214	2025-08-02 19:50:12.740257	t
\.


--
-- Data for Name: offer_cancel_slots; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.offer_cancel_slots (id, slug_offer, date, slots, created_at) FROM stdin;
60	be82fc03-325c-4453-96b8-2ae7fd028222	2025-07-30	{{09:00:00,12:00:00}}	2025-07-03 14:53:41.448999
61	be82fc03-325c-4453-96b8-2ae7fd028222	2025-07-26	{{09:00:00,12:00:00}}	2025-07-03 14:53:41.450086
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
47	6e7830e6-fd73-4ae1-9419-f47777fa6f95	tuesday	{{13:00:00,14:45:00},{20:30:00,21:45:00},{05:00:00,09:00:00}}	2025-07-22 14:05:11.139858
45	01bd532b-0eac-4c79-a2a2-bbdb6a98b172	wednesday	{{07:00:00,08:00:00}}	2025-07-16 07:46:50.351613
31	be82fc03-325c-4453-96b8-2ae7fd028222	wednesday	{{18:00:00,20:00:00}}	2025-07-03 14:53:41.442061
42	be82fc03-325c-4453-96b8-2ae7fd028222	thursday	{{07:00:00,08:00:00},{08:00:00,09:00:00},{09:00:00,10:00:00}}	2025-07-15 15:50:43.266484
34	be82fc03-325c-4453-96b8-2ae7fd028222	friday	{{07:00:00,08:00:00},{12:30:00,16:00:00},{16:00:00,17:00:00},{18:00:00,23:45:00}}	2025-07-11 13:23:14.249615
32	be82fc03-325c-4453-96b8-2ae7fd028222	saturday	{{01:45:00,04:15:00},{08:15:00,09:15:00}}	2025-07-03 14:53:41.443328
43	be82fc03-325c-4453-96b8-2ae7fd028222	sunday	{{07:00:00,08:00:00},{08:00:00,09:00:00},{09:00:00,10:00:00},{10:00:00,11:00:00}}	2025-07-15 15:50:43.282265
44	d1eec0ec-f975-4b72-9fd9-b52b1ab964d2	tuesday	{{07:00:00,08:00:00},{08:00:00,09:00:00},{12:30:00,14:30:00},{21:30:00,23:30:00}}	2025-07-15 16:33:57.649887
35	d1eec0ec-f975-4b72-9fd9-b52b1ab964d2	friday	{{18:00:00,23:45:00}}	2025-07-11 19:19:58.194224
36	d1eec0ec-f975-4b72-9fd9-b52b1ab964d2	saturday	{{04:00:00,05:45:00},{06:30:00,08:15:00},{08:15:00,09:15:00},{09:15:00,10:15:00}}	2025-07-12 07:49:13.147839
\.


--
-- Data for Name: offers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.offers (id, title, description, type, price, image_urls, created_at, updated_at, provider_id, latitude, longitude, city_id, adresse, categories, priceper, duration, qrcode_url, slug, cancellable, total_capacity) FROM stdin;
19	Tour privé en voilier - Baignade et paddle - Cap d'Antibes	Vous profiterez du voilier exclusivement pour vous, en famille ou entre amis. Nous vous ferons découvrir les beautés cachées du Cap d’Antibes, où les plus belles eaux turquoise vous attendent pour la baignade.	Activite	150.00	{https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1751537255707_61efb929594d8b30cba4d79f526844001364976b6e9bec936a9deebe6a9d16e3.avif,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1751537256574_5eb4fa25de905fd2a618f17f7d153c72eab379176f7c61fe430d7681b7955ee2.webp,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1751537257059_384c8532541d482dc0c4c4b775fb7569a6ace5aec7ce32de50406a3bf2e4628f.png,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1751537260004_7f4689fd4793fc3ca058ea13051472abf287fc7a8d5930b50498a328563bde59.webp,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1751537260371_38ab5c434e14ae3290b72ab2c72389a303a909f140e24efd40c8f89701f5fdcd.webp}	2025-07-03 12:12:57.592375	2025-07-03 12:12:57.592375	5	43.586667	7.126944	14	Port Vauban, 06600 Antibes Juan les Pins, France	{"Nature & Aventure","Loisirs & Divertissement","En Famille"}	personne	15 min	https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/qrcodes/1751537260792_2c09a43a-c524-4dbb-bbfa-6b7598ca950b.png	2c09a43a-c524-4dbb-bbfa-6b7598ca950b	t	4
22	Expérience Aquajet au Cap d’Antibes	Nagez comme un dauphin sur le célèbre Cap d'Antibes, de 7 à 77 ans !\nVotre Aquajet 100% sécurisé vous procurera des sensations uniques et inoubliables.\nIl suffit d’être à l’aise dans l’eau	Activite	60.00	{https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1751539922898_caption_1.jpg,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1751539923540_caption.jpg,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1751539923806_caption_5.jpg,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1751539924129_caption_2.jpg,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1751539924578_caption_3.jpg}	2025-07-03 12:52:29.368044	2025-07-03 12:52:29.368044	5	43.5891473	7.123715499999999	4	Port Vauban, Antibes, France	{Nautiques,"Sports & Sensations Fortes"}	personne	15 min	https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/qrcodes/1751539924911_6e7830e6-fd73-4ae1-9419-f47777fa6f95.png	6e7830e6-fd73-4ae1-9419-f47777fa6f95	t	4
20	Survoler la Côte d'Azur en avion privé	Vivez une expérience inoubliable en survolant la splendide Côte d'Azur à bord d’un avion privé. Admirez depuis le ciel les paysages époustouflants de la Méditerranée, les plages dorées, les villages perchés et les montagnes environnantes. 	Activite	500.00	{https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1751539185273_15305892-86c3-4d18-8a4b-2880b2ded338.avif,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1751539186042_be85b758-ee24-43ac-97cd-ad6ed301f31f.avif,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1751539186290_dd4bd889-c77a-4a34-b3a3-cb9f12425ac6.avif,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1751539186666_eb3f00e3-a14c-4737-9772-aa7c2a92f020.avif}	2025-07-03 12:40:52.753928	2025-07-03 12:40:52.753928	5	43.5486286	6.9554298	15	Aéroport de Cannes Mandelieu, 245 Av. Francis Tonner, 06400 Cannes, France	{"Nature & Aventure","Culture & Patrimoine","Sports & Sensations Fortes"}	personne	15 min	https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/qrcodes/1751539186999_be82fc03-325c-4453-96b8-2ae7fd028222.png	be82fc03-325c-4453-96b8-2ae7fd028222	t	4
21	Conduire un cabriolet d'Antibes à Monaco	Profitez de paysages époustouflants à bord d'un cabriolet électrique que vous conduisez et visitez des sites emblématiques.	Activite	75.00	{https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1751539509661_f38c43a6-87fa-43d5-8569-9e5dae0d5cde.avif,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1751539510372_5c6bd7af-a6db-4404-8845-4d5353862748.avif,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1751539510793_0b1a09f6-6a1f-4e86-8c26-5cc01871b51a.avif,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1751539511147_9bdee7b9-0322-4be4-a4b9-3eb442700c44.avif,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1751539511460_737110c7-a7c0-4636-bd9a-bfe3f0b0e47f.avif}	2025-07-03 12:47:08.879574	2025-07-03 12:47:08.879574	5	43.57850560000001	7.1200497	4	7 Bd du Président Wilson, 06600 Antibes, France	{"En Famille","Loisirs & Divertissement","Nature & Aventure","Sports & Sensations Fortes"}	personne	15 min	https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/qrcodes/1751539511879_01bd532b-0eac-4c79-a2a2-bbdb6a98b172.png	01bd532b-0eac-4c79-a2a2-bbdb6a98b172	t	4
23	Explorez les calanques en kayak	Découvrez les calanques sauvages de la Côte Bleue en kayak de mer.	Activite	35.00	{https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1751558949802_229c67d0-80fc-4fa2-8afc-e51cd0a59d9b.avif,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1751558950982_9735be50-2507-4857-b593-b0a02b7ab62b.avif,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1751558951868_aa1aa723-6472-4cf0-a53c-3faf24481322.avif,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/d1eec0ec-f975-4b72-9fd9-b52b1ab964d2-1753888582810.jpg,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/d1eec0ec-f975-4b72-9fd9-b52b1ab964d2-1753888583585.png,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/d1eec0ec-f975-4b72-9fd9-b52b1ab964d2-1753888638608.jpg,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/d1eec0ec-f975-4b72-9fd9-b52b1ab964d2-1753888654838.jpg}	2025-07-03 18:11:20.98421	2025-07-03 18:11:20.98421	5	43.7157607	7.351195100000001	11	11 Av. de la Liberté, 06360 Èze, France	{Nautiques,"Loisirs & Divertissement","Nature & Aventure","En Famille"}	personne	15 min	https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/qrcodes/1751558953513_d1eec0ec-f975-4b72-9fd9-b52b1ab964d2.png	d1eec0ec-f975-4b72-9fd9-b52b1ab964d2	t	4
\.


--
-- Data for Name: provider_booking_integrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.provider_booking_integrations (id, provider_id, platform, access_token, refresh_token, email, calendar_id) FROM stdin;
\.


--
-- Data for Name: providers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.providers (id, name, bio, logo_url, tel, email, instagram, facebook, website, type, sizes, moredetails, is_validated, stripe_account_id) FROM stdin;
2	MonNomOfficial	Ma biographie official	https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/providers-images/logo/1749129298417_TestRename.jpg	+33765594098	lechat@gmail.com	MonInstagram	Monfacebook	monbigsite.fr	Company	3 - 10	Il est vrai que tout parti politique moderne temps inexorablement à l'oligarchie et au désir de haine	f	\N
3	Monbignom	oijfs	https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/providers-images/logo/1749129562611_TestRename.jpg	+33765594020	lebigchat@gmail.com	mlfjsfs		siteweb.fr	Independent	seul		f	\N
1	localspot-db	FLJSOFJSOIFJS	https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/providers-images/logo/1749127966506_images.jpg	+33765594097	tompayan1710@gmail.com	insta	okfoskfosokfoks	SFS.fr	Company	11 - 20	fsfsfsfsfs	t	\N
4	LocalSpot	Ma desctiption	https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/providers-images/logo/1749227206471_images.jpg	+33765594097	tompayan1710@gmail.com	moninsta	fac	siteweb	Company	3 - 10	Mon détail à ajouter	t	\N
6	PrestataireNoOffers	Je suis un prestataire qui n'as pas d'offre	https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/providers-images/logo/1752309836503_ViarteLogo.png	+33765594097	tompayan1710@gmail.com	moninsta	monfacebo	monsite.fr	Company	3 - 10	Ceci est mon détail à ajouter	t	acct_1Rk1sUGfNWv7XEni
8	Studio Yoga Azur	Un espace détente pour tous les niveaux.	https://knsws...yoga1.jpg	+33611223344	contact@yogaazur.com	yoga_azur	facebook.com/yogaazur	yogaazur.fr	Independent	1 - 3	Cours de yoga en petit groupe face mer.	t	\N
5	BigTomRappel	FSIOSJF	https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/providers-images/logo/1751118905743_starIcon.png	+33765594097	tompayan1710@gmail.com	moninsta	fac	monsite.fr	Independent	en équipe	,k	t	\N
\.


--
-- Data for Name: qr_codes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.qr_codes (id, slug, id_hote, adresse, image_url, user_id, latitude, longitude) FROM stdin;
39	2c09a43a-c524-4dbb-bbfa-6b7598ca950b	2	Port Vauban, 06600 Antibes Juan les Pins, France	https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/qrcodes/1751537260792_2c09a43a-c524-4dbb-bbfa-6b7598ca950b.png	32	43.586667	7.126944
40	be82fc03-325c-4453-96b8-2ae7fd028222	2	Aéroport de Cannes Mandelieu, 245 Av. Francis Tonner, 06400 Cannes, France	https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/qrcodes/1751539186999_be82fc03-325c-4453-96b8-2ae7fd028222.png	32	43.5486286	6.9554298
41	01bd532b-0eac-4c79-a2a2-bbdb6a98b172	2	7 Bd du Président Wilson, 06600 Antibes, France	https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/qrcodes/1751539511879_01bd532b-0eac-4c79-a2a2-bbdb6a98b172.png	32	43.57850560000001	7.1200497
42	6e7830e6-fd73-4ae1-9419-f47777fa6f95	2	Port Vauban, Antibes, France	https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/qrcodes/1751539924911_6e7830e6-fd73-4ae1-9419-f47777fa6f95.png	32	43.5891473	7.123715499999999
56	4a5979a0-6d53-4bec-9846-aec5e8a41d6f	2	Oléron, France	https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/qrcodes/1753273498527_4a5979a0-6d53-4bec-9846-aec5e8a41d6f.png	32	45.953973	-1.2733651
46	c0796f0f-f31c-46d7-9733-d1ce1e0c9e13	2	75006 Paris, France	https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/qrcodes/1752397884233_c0796f0f-f31c-46d7-9733-d1ce1e0c9e13.png	32	48.84661440000001	2.336330900000001
47	aa1d1250-ce49-4488-99d6-18f6ff911376	2	Les Sables-d'Olonne, France	https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/qrcodes/1752400437524_aa1d1250-ce49-4488-99d6-18f6ff911376.png	32	46.5011991	-1.7781025
48	1fbe3db4-af6d-4ed9-b024-35fb5536fe70	2	83990 Saint-Tropez, France	https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/qrcodes/1752405531498_1fbe3db4-af6d-4ed9-b024-35fb5536fe70.png	32	43.2676808	6.640710899999999
49	6b7beaac-e568-4405-ad04-af72de25957a	2	83990 Saint-Tropez, France	https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/qrcodes/1752405611886_6b7beaac-e568-4405-ad04-af72de25957a.png	32	43.2676808	6.640710899999999
50	750219f2-9b70-4ab3-8eb6-a09e1b19b973	2	75006 Paris, France	https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/qrcodes/1752405721893_750219f2-9b70-4ab3-8eb6-a09e1b19b973.png	32	48.84661440000001	2.336330900000001
51	147f15ce-3b5d-4dc2-bf4e-f0775c7fa726	2	Av. Gustave Eiffel, 75007 Paris, France	https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/qrcodes/1752411575166_147f15ce-3b5d-4dc2-bf4e-f0775c7fa726.png	32	48.85837009999999	2.2944813
52	07782d1c-50b9-477e-9114-2a9892c08800	2	Bd de Parc, 77700 Coupvray, France	https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/qrcodes/1752471348026_07782d1c-50b9-477e-9114-2a9892c08800.png	32	48.8673858	2.783593
53	f5936c30-2058-44c0-9373-521ddb9a0e60	2	Antibes Harbor, France	https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/qrcodes/1752668012428_f5936c30-2058-44c0-9373-521ddb9a0e60.png	32	43.58679469999999	7.128582
54	09d3210b-7264-4555-a47a-4d51194df2f9	2	8 Av. du Donjon, 91700 Sainte-Geneviève-des-Bois, France	https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/qrcodes/1752668051264_09d3210b-7264-4555-a47a-4d51194df2f9.png	32	48.6463572	2.327905299999999
55	dcfca511-113b-4501-aaf3-5737a5b2ee3f	2	118-120 Rue de Rivoli, 75001 Paris, France	https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/qrcodes/1753272431022_dcfca511-113b-4501-aaf3-5737a5b2ee3f.png	32	48.8594276	2.3460452
57	77b2f91a-8d54-402a-93af-43e743dd13a5	2	Juan-les-Pins, 06160 Antibes, France	https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/qrcodes/1753273710713_77b2f91a-8d54-402a-93af-43e743dd13a5.png	32	43.5691905	7.1123854
58	7fc5e310-277b-4fc1-bcba-e154dfb972e3	2	58 Rue de la Libération, 74240 Gaillard, France	https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/qrcodes/1753875777159_7fc5e310-277b-4fc1-bcba-e154dfb972e3.png	32	46.1855355	6.2068663
\.


--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.refresh_tokens (id, user_id, refresh_token, expires_at, created_at) FROM stdin;
97	34	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzQsImVtYWlsIjoidDIzNTkwNTI3QGdtYWlsLmNvbSIsImlhdCI6MTc1MjMyNDU1NCwiZXhwIjoxNzY3ODc2NTU0fQ.KAxTknKCMlYyLzRCAyUQOrZpVadzaEhpcZYMeTB-fmo	2026-01-08 13:49:14.011	2025-07-12 10:33:00.775004
85	32	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImVtYWlsIjoidG9tcGF5YW4xNzEwQGdtYWlsLmNvbSIsImlhdCI6MTc1MTMwNzI3NiwiZXhwIjoxNzY2ODU5Mjc2fQ.kL2vvEl3xMYk-t9hfS6xP2niQtuDfDCMi3XLHEcJFNw	2025-12-27 19:14:36.617	2025-06-29 21:31:31.756224
176	32	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImVtYWlsIjoidG9tcGF5YW4xNzEwQGdtYWlsLmNvbSIsImlhdCI6MTc1MzYwODY4NywiZXhwIjoxNzY5MTYwNjg3fQ.0c-3Im8ozcf0U2HA770G-TVdoQQ5qeeO-nf1ZZerbwE	2026-01-23 10:31:27.715	2025-07-27 09:48:34.750107
118	32	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImVtYWlsIjoidG9tcGF5YW4xNzEwQGdtYWlsLmNvbSIsImlhdCI6MTc1MjY4ODM1OCwiZXhwIjoxNzY4MjQwMzU4fQ.wWww_mwnry2tWk8gCmSaYVrcZ7zYxHK6rFtbpCLM6P8	2026-01-12 18:52:38.111	2025-07-16 19:52:26.162945
94	32	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImVtYWlsIjoidG9tcGF5YW4xNzEwQGdtYWlsLmNvbSIsImlhdCI6MTc1MjE2ODU2MSwiZXhwIjoxNzY3NzIwNTYxfQ.KxPB7KAKEE-g3BIflSXvLGSOa3bmeLExIgoOoxiMju4	2026-01-06 18:29:21.08	2025-07-10 11:30:24.918565
178	41	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDEsImVtYWlsIjoidG9tY2hhdDEwQGdtYWlsLmNvbSIsImlhdCI6MTc1MzY5MDMzNCwiZXhwIjoxNzY5MjQyMzM0fQ.XqeDHfWPnEfxfYHBmOnvNMDc5DfBlLYBloWsEckTa0o	2026-01-24 09:12:14.574	2025-07-27 23:22:07.603748
71	32	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImVtYWlsIjoidG9tcGF5YW4xNzEwQGdtYWlsLmNvbSIsImlhdCI6MTc0OTEyNzQ5NSwiZXhwIjoxNzY0Njc5NDk1fQ.CALMlP2vRUuBQ-MHrme2VogcsG7WK2zxzEn8d_LpGb4	2025-12-02 13:44:55.194	2025-05-31 12:51:42.238876
60	32	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImVtYWlsIjoidG9tcGF5YW4xNzEwQGdtYWlsLmNvbSIsImlhdCI6MTc0NzYzNTI4MCwiZXhwIjoxNzYzMTg3MjgwfQ.5axDkDA1wwse950hacV5OFGoXbZB_U0DYTu-GJ9RZU8	2025-11-15 07:14:40.438	2025-05-14 14:37:37.658329
101	32	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImVtYWlsIjoidG9tcGF5YW4xNzEwQGdtYWlsLmNvbSIsImlhdCI6MTc1MjU4ODM3NCwiZXhwIjoxNzY4MTQwMzc0fQ.2ZcrEvEkq5fCBpGUeqMwlmJGz-g_cT1ptEAVdiHPWmA	2026-01-11 15:06:14.85	2025-07-14 17:11:53.996395
62	32	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImVtYWlsIjoidG9tcGF5YW4xNzEwQGdtYWlsLmNvbSIsImlhdCI6MTc0ODAwNzczMywiZXhwIjoxNzYzNTU5NzMzfQ.2X-hEtlPMfVDstYilbw3N9Qw3FFi9cBULYzfWYn_9Hg	2025-11-19 14:42:13.445	2025-05-23 14:44:39.105683
63	32	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImVtYWlsIjoidG9tcGF5YW4xNzEwQGdtYWlsLmNvbSIsImlhdCI6MTc0ODA3NzUxNSwiZXhwIjoxNzYzNjI5NTE1fQ.BeipdGx7ZA2WTCUnTVImp6SxpYJjlzJJtLkAvyXLZ4E	2025-11-20 10:05:15.203	2025-05-24 11:00:58.263674
116	32	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImVtYWlsIjoidG9tcGF5YW4xNzEwQGdtYWlsLmNvbSIsImlhdCI6MTc1MjY4ODA0NCwiZXhwIjoxNzY4MjQwMDQ0fQ.SPW0uIYP-OLWSVc3X0cYeTpYQD6JVvm7KChPW4km65Q	2026-01-12 18:47:24.883	2025-07-16 19:47:24.884917
93	32	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImVtYWlsIjoidG9tcGF5YW4xNzEwQGdtYWlsLmNvbSIsImlhdCI6MTc1MjEzNTU5OCwiZXhwIjoxNzY3Njg3NTk4fQ.62-JwSyYcH7oksIfKEr_SifofhDCu3Tk7wy0RyhLHHE	2026-01-06 09:19:58.035	2025-07-03 11:23:09.246481
61	32	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImVtYWlsIjoidG9tcGF5YW4xNzEwQGdtYWlsLmNvbSIsImlhdCI6MTc0ODAwNDIzMiwiZXhwIjoxNzYzNTU2MjMyfQ.8eUW74d-TG3-EsjpHSXhPMJrht0vB2lCaRUEBGqMvA4	2025-11-19 13:43:52.082	2025-05-23 14:29:04.571936
105	32	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImVtYWlsIjoidG9tcGF5YW4xNzEwQGdtYWlsLmNvbSIsImlhdCI6MTc1MjY4MDg2NywiZXhwIjoxNzY4MjMyODY3fQ.WW-FxmfHWj7iO7VIjqRfuXEwjvzxbejO-qnAs9HTF-E	2026-01-12 16:47:47.257	2025-07-16 17:47:47.258936
59	32	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImVtYWlsIjoidG9tcGF5YW4xNzEwQGdtYWlsLmNvbSIsImlhdCI6MTc0NzIyMDI2OCwiZXhwIjoxNzYyNzcyMjY4fQ.MBgT8cU7LpNDSWWZEgnglxF7-RdCS6vkf49el7yqTYU	2025-11-10 11:57:48.358	2025-05-14 12:57:48.359308
64	32	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImVtYWlsIjoidG9tcGF5YW4xNzEwQGdtYWlsLmNvbSIsImlhdCI6MTc0ODU4NDMzNiwiZXhwIjoxNzY0MTM2MzM2fQ.HttlpZJ923z9dX8d0rSthcGhtQdU0CwBLNX-AkZXkNA	2025-11-26 06:52:16.407	2025-05-24 19:40:33.351187
95	32	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImVtYWlsIjoidG9tcGF5YW4xNzEwQGdtYWlsLmNvbSIsImlhdCI6MTc1MjI1NTU1MiwiZXhwIjoxNzY3ODA3NTUyfQ.tgGKX-zF1p4qqLhBMzLXhpP27TcMfZegj_Ch-8EvSXw	2026-01-07 18:39:12.402	2025-07-11 07:56:01.495585
192	41	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDEsImVtYWlsIjoidG9tY2hhdDEwQGdtYWlsLmNvbSIsImlhdCI6MTc1MzgxODk1NiwiZXhwIjoxNzY5MzcwOTU2fQ.CieQ8CCN_xHrAdO0g070KaxG81QO5fpUOjt_VPuHpXk	2026-01-25 20:55:56.425	2025-07-29 20:24:25.002327
106	32	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImVtYWlsIjoidG9tcGF5YW4xNzEwQGdtYWlsLmNvbSIsImlhdCI6MTc1MjY4MTExNywiZXhwIjoxNzY4MjMzMTE3fQ.xOLhB1teCw3K8orXklzJMG4aTsk8Hu4OtB1t6kvS_nw	2026-01-12 16:51:57.898	2025-07-16 17:51:57.900198
107	32	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImVtYWlsIjoidG9tcGF5YW4xNzEwQGdtYWlsLmNvbSIsImlhdCI6MTc1MjY4MTIyNCwiZXhwIjoxNzY4MjMzMjI0fQ.SLcVjtwJBjM1XSkQdVjDyOYYPNByEc7b8hsCUouVnAg	2026-01-12 16:53:44.125	2025-07-16 17:53:44.130584
70	32	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImVtYWlsIjoidG9tcGF5YW4xNzEwQGdtYWlsLmNvbSIsImlhdCI6MTc0ODY4MTkyNiwiZXhwIjoxNzY0MjMzOTI2fQ.7ffD7dZLmuYhWiMVJ56kr2D8yk6ZXPT1PZBwlmUcAuU	2025-11-27 09:58:46.361	2025-05-31 10:56:51.818549
108	32	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImVtYWlsIjoidG9tcGF5YW4xNzEwQGdtYWlsLmNvbSIsImlhdCI6MTc1MjY4MTI2MCwiZXhwIjoxNzY4MjMzMjYwfQ.siBVdia49ubT1HJ7ieJdZHWY5-oQBNljiMsrX2jpqcg	2026-01-12 16:54:20.764	2025-07-16 17:54:20.77317
109	32	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImVtYWlsIjoidG9tcGF5YW4xNzEwQGdtYWlsLmNvbSIsImlhdCI6MTc1MjY4MjA4NCwiZXhwIjoxNzY4MjM0MDg0fQ.uV8I8s8pKISkDiobZCz_0n_f1tDeROZsXsUxTEcjXxc	2026-01-12 17:08:04.054	2025-07-16 18:08:04.055591
110	32	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImVtYWlsIjoidG9tcGF5YW4xNzEwQGdtYWlsLmNvbSIsImlhdCI6MTc1MjY4MjE4NCwiZXhwIjoxNzY4MjM0MTg0fQ.H5S2r8TbA1vjzow5Nur-rPJ-9NiZaEx5MmAl45gXzMQ	2026-01-12 17:09:44.238	2025-07-16 18:09:44.239957
111	32	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImVtYWlsIjoidG9tcGF5YW4xNzEwQGdtYWlsLmNvbSIsImlhdCI6MTc1MjY4MjIzMSwiZXhwIjoxNzY4MjM0MjMxfQ.fRmHI5BT60IS8EOa46Tehmjwu2Bbg159SK9ei6ScFTg	2026-01-12 17:10:31.017	2025-07-16 18:10:31.02056
84	32	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImVtYWlsIjoidG9tcGF5YW4xNzEwQGdtYWlsLmNvbSIsImlhdCI6MTc1MTIyNTE2MiwiZXhwIjoxNzY2Nzc3MTYyfQ.lB46n3tPMKmONKubCeAcpBn76uu8NrjibiHp_kSsMPM	2025-12-26 20:26:02.955	2025-06-29 21:09:05.646374
65	32	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImVtYWlsIjoidG9tcGF5YW4xNzEwQGdtYWlsLmNvbSIsImlhdCI6MTc0ODU4OTgwOSwiZXhwIjoxNzY0MTQxODA5fQ.5JR-4gLef8CkEAVZCifT8WIS61aaaWzTRS6Oe67gGdo	2025-11-26 08:23:29.672	2025-05-30 07:55:31.615536
112	32	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImVtYWlsIjoidG9tcGF5YW4xNzEwQGdtYWlsLmNvbSIsImlhdCI6MTc1MjY4MjMzMCwiZXhwIjoxNzY4MjM0MzMwfQ.y9NF_2C13m5ED5YFnVORWqNFJ5F5srJBdKHGljADiy0	2026-01-12 17:12:10.735	2025-07-16 18:12:10.736735
117	32	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImVtYWlsIjoidG9tcGF5YW4xNzEwQGdtYWlsLmNvbSIsImlhdCI6MTc1MjY4ODMwNCwiZXhwIjoxNzY4MjQwMzA0fQ.azf0WU0NoijSyPv9rT4TTJPh5ZNLYDroINnuL5QxR9M	2026-01-12 18:51:44.941	2025-07-16 19:51:44.942181
203	42	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDIsImVtYWlsIjoic2FwaWVuc0BnbWFpbC5jb20iLCJpYXQiOjE3NTM5NjkzMDYsImV4cCI6MTc2OTUyMTMwNn0.E8AmTNIbY1s3MSMddySh2PzQrUwt4l6ZAYkUoYSzqi0	2026-01-27 14:41:46.877	2025-07-31 15:41:46.877516
205	42	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDIsImVtYWlsIjoic2FwaWVuc0BnbWFpbC5jb20iLCJpYXQiOjE3NTM5NzM1OTEsImV4cCI6MTc2OTUyNTU5MX0.b94ssHOp3K5mkHVI377iTGecPdOaiG6ghrXuLci9meo	2026-01-27 15:53:11.077	2025-07-31 16:53:11.079687
80	32	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImVtYWlsIjoidG9tcGF5YW4xNzEwQGdtYWlsLmNvbSIsImlhdCI6MTc1MTIxOTE5OSwiZXhwIjoxNzY2NzcxMTk5fQ.mJIXvVgmy_nPV85jyAO7K-JjEPQaUDGd652IaIrgh8c	2025-12-26 18:46:39.394	2025-06-29 16:45:14.381511
127	32	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImVtYWlsIjoidG9tcGF5YW4xNzEwQGdtYWlsLmNvbSIsImlhdCI6MTc1MjY4OTU0NCwiZXhwIjoxNzY4MjQxNTQ0fQ.ld8yW7-ycox-znVUNLmQivsdZI9L3xzH7Y_a-cZ7uRs	2026-01-12 19:12:24.643	2025-07-16 20:12:24.645415
128	32	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImVtYWlsIjoidG9tcGF5YW4xNzEwQGdtYWlsLmNvbSIsImlhdCI6MTc1MjY4OTU5NywiZXhwIjoxNzY4MjQxNTk3fQ.X-yodIdNTPrE6_siGeeOKcT_bnAtTi9604YXIHjJ7RU	2026-01-12 19:13:17.49	2025-07-16 20:13:17.492339
179	32	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImVtYWlsIjoidG9tcGF5YW4xNzEwQGdtYWlsLmNvbSIsImlhdCI6MTc1MzcwNDQ3MCwiZXhwIjoxNzY5MjU2NDcwfQ.MHm6aaa9qlC65FieTCZg2mts8OYn40kxGrYhZ-3vng4	2026-01-24 13:07:50.506	2025-07-28 13:38:18.857989
130	32	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImVtYWlsIjoidG9tcGF5YW4xNzEwQGdtYWlsLmNvbSIsImlhdCI6MTc1MjY4OTY2MCwiZXhwIjoxNzY4MjQxNjYwfQ.YA6fT3KoLmaADAOcpyI1oA8sE19ZmXhIfuWIJHXenB8	2026-01-12 19:14:20.443	2025-07-16 20:14:20.450207
131	32	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImVtYWlsIjoidG9tcGF5YW4xNzEwQGdtYWlsLmNvbSIsImlhdCI6MTc1MjY4OTc0NywiZXhwIjoxNzY4MjQxNzQ3fQ.GtsLR3bpBqUSXqvx3Ei1dMjffOqcpSCWnt3f52A8a4A	2026-01-12 19:15:47.919	2025-07-16 20:15:47.921957
132	32	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImVtYWlsIjoidG9tcGF5YW4xNzEwQGdtYWlsLmNvbSIsImlhdCI6MTc1MjY4OTc1OCwiZXhwIjoxNzY4MjQxNzU4fQ._vLlyrciB2LaC31gpcQ2l6rfq9C7lA_SlmGB6XaytKk	2026-01-12 19:15:58.392	2025-07-16 20:15:58.393736
142	36	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzYsImVtYWlsIjoibGViaWd0b20yQGdtYWlsLmNvbSIsImlhdCI6MTc1MjcyOTk2NSwiZXhwIjoxNzY4MjgxOTY1fQ.UnDoG29GjZtplBL-7H-lWP4BaqRdDoJznvzP5qK6PiU	2026-01-13 06:26:05.598	2025-07-17 07:26:05.599557
143	33	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzMsImVtYWlsIjoibGViaWd0b21AZ21haWwuY29tIiwiaWF0IjoxNzUyNzMwMDk4LCJleHAiOjE3NjgyODIwOTh9.e-Vde2Z_VF1c5EVaL_Anm9VG-NLVah8EoiRIcWMH2QY	2026-01-13 06:28:18.387	2025-07-17 07:28:18.39131
135	32	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImVtYWlsIjoidG9tcGF5YW4xNzEwQGdtYWlsLmNvbSIsImlhdCI6MTc1MjY5NDA0OCwiZXhwIjoxNzY4MjQ2MDQ4fQ.1bcrpxPbCReG4r48rs80K1OSPSx2qd7x2EPyzaoNgMc	2026-01-12 20:27:28.562	2025-07-16 20:19:40.64585
120	32	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImVtYWlsIjoidG9tcGF5YW4xNzEwQGdtYWlsLmNvbSIsImlhdCI6MTc1MjY4ODM1OCwiZXhwIjoxNzY4MjQwMzU4fQ.wWww_mwnry2tWk8gCmSaYVrcZ7zYxHK6rFtbpCLM6P8	2026-01-12 18:52:38.111	2025-07-16 19:52:36.184872
119	32	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImVtYWlsIjoidG9tcGF5YW4xNzEwQGdtYWlsLmNvbSIsImlhdCI6MTc1MjY4ODM1OCwiZXhwIjoxNzY4MjQwMzU4fQ.wWww_mwnry2tWk8gCmSaYVrcZ7zYxHK6rFtbpCLM6P8	2026-01-12 18:52:38.111	2025-07-16 19:52:36.184113
121	32	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImVtYWlsIjoidG9tcGF5YW4xNzEwQGdtYWlsLmNvbSIsImlhdCI6MTc1MjY4ODM1OCwiZXhwIjoxNzY4MjQwMzU4fQ.wWww_mwnry2tWk8gCmSaYVrcZ7zYxHK6rFtbpCLM6P8	2026-01-12 18:52:38.111	2025-07-16 19:52:36.186075
122	32	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImVtYWlsIjoidG9tcGF5YW4xNzEwQGdtYWlsLmNvbSIsImlhdCI6MTc1MjY4ODM1OCwiZXhwIjoxNzY4MjQwMzU4fQ.wWww_mwnry2tWk8gCmSaYVrcZ7zYxHK6rFtbpCLM6P8	2026-01-12 18:52:38.148	2025-07-16 19:52:38.164186
123	32	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImVtYWlsIjoidG9tcGF5YW4xNzEwQGdtYWlsLmNvbSIsImlhdCI6MTc1MjY4ODM1OCwiZXhwIjoxNzY4MjQwMzU4fQ.wWww_mwnry2tWk8gCmSaYVrcZ7zYxHK6rFtbpCLM6P8	2026-01-12 18:52:38.152	2025-07-16 19:52:38.164951
182	41	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDEsImVtYWlsIjoidG9tY2hhdDEwQGdtYWlsLmNvbSIsImlhdCI6MTc1Mzc2ODEwNywiZXhwIjoxNzY5MzIwMTA3fQ.Hs-aQlnJureXXioAZA5hkscz9BDpAN4VN0szUFjSzew	2026-01-25 06:48:27.187	2025-07-29 07:33:09.064236
124	32	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImVtYWlsIjoidG9tcGF5YW4xNzEwQGdtYWlsLmNvbSIsImlhdCI6MTc1MjY4ODk3NSwiZXhwIjoxNzY4MjQwOTc1fQ.NFFcRBiXzyVdEqc_XkWeEe03h93l_iqfCCYoxBH2kIk	2026-01-12 19:02:55.995	2025-07-16 19:54:30.054239
125	32	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImVtYWlsIjoidG9tcGF5YW4xNzEwQGdtYWlsLmNvbSIsImlhdCI6MTc1MjY4OTAzNiwiZXhwIjoxNzY4MjQxMDM2fQ.Ms5TlD8ZC6KdWrtikJi6LjBqvoh9TFBPKsUxL0dvziQ	2026-01-12 19:03:56.365	2025-07-16 20:03:42.902436
175	41	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDEsImVtYWlsIjoidG9tY2hhdDEwQGdtYWlsLmNvbSIsImlhdCI6MTc1MzYwMTU4MSwiZXhwIjoxNzY5MTUzNTgxfQ.zyImhbDPFp0m-CpACYgqevI-R33C7TFv_gHjyYTYqYM	2026-01-23 08:33:01.829	2025-07-25 23:20:59.000163
138	35	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzUsImVtYWlsIjoidG9tdGVzdG1kcEBnbWFpbC5jb20iLCJpYXQiOjE3NTI3Mjk2NTAsImV4cCI6MTc2ODI4MTY1MH0.lii0M3WQNlFz9uWGUNpyMu7LZQAq_LEo7DhBBORcZPk	2026-01-13 06:20:50.385	2025-07-16 23:14:54.329116
139	33	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzMsImVtYWlsIjoibGViaWd0b21AZ21haWwuY29tIiwiaWF0IjoxNzUyNzI5NzY3LCJleHAiOjE3NjgyODE3Njd9.-NIBe9ssqmkPDEFev5z8hSfVlXNErpGrVV_VDf8mNxk	2026-01-13 06:22:47.781	2025-07-17 07:22:47.783109
140	33	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzMsImVtYWlsIjoibGViaWd0b21AZ21haWwuY29tIiwiaWF0IjoxNzUyNzI5Nzk2LCJleHAiOjE3NjgyODE3OTZ9.xKSgAdLjfmDysB6ak9jale155Muyc8Zr6A2fLYu5vZc	2026-01-13 06:23:16.171	2025-07-17 07:23:16.174221
191	41	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDEsImVtYWlsIjoidG9tY2hhdDEwQGdtYWlsLmNvbSIsImlhdCI6MTc1MzgwOTA3NiwiZXhwIjoxNzY5MzYxMDc2fQ.sEwdBlkrpr8i9p8v-P6qndrY6qSiKJLOdv8MGb18RR8	2026-01-25 18:11:16.911	2025-07-29 10:07:20.246893
204	42	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDIsImVtYWlsIjoic2FwaWVuc0BnbWFpbC5jb20iLCJpYXQiOjE3NTM5NzAzMjEsImV4cCI6MTc2OTUyMjMyMX0.Kk8XeV0zm1wX63jSSxBp63DT2qqRfIJSd0VOj0yOtNw	2026-01-27 14:58:41.218	2025-07-31 15:58:41.220196
206	42	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDIsImVtYWlsIjoic2FwaWVuc0BnbWFpbC5jb20iLCJpYXQiOjE3NTM5NzM2NjAsImV4cCI6MTc2OTUyNTY2MH0.vZ1c4yoEOwSLiUZr92oLYXBdzvvgjY8AvRyTeT-ayrY	2026-01-27 15:54:20.783	2025-07-31 16:54:20.785208
156	32	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImVtYWlsIjoidG9tcGF5YW4xNzEwQGdtYWlsLmNvbSIsImlhdCI6MTc1Mjk5NTc2NCwiZXhwIjoxNzY4NTQ3NzY0fQ.aYXVAIGHb0ibvwkUmRtmf8jUKrNWBu2PAyy4Cxuv8zo	2026-01-16 08:16:04.065	2025-07-20 09:16:04.068444
198	32	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImVtYWlsIjoidG9tcGF5YW4xNzEwQGdtYWlsLmNvbSIsImlhdCI6MTc1Mzk0NzYwNiwiZXhwIjoxNzY5NDk5NjA2fQ.EiVFNO9AZDEiIp8RQsMBXwMf16ANMa5xxEAof36zRz8	2026-01-27 08:40:06.272	2025-07-31 07:43:47.129689
202	32	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImVtYWlsIjoidG9tcGF5YW4xNzEwQGdtYWlsLmNvbSIsImlhdCI6MTc1Mzk2OTI1NiwiZXhwIjoxNzY5NTIxMjU2fQ.aDqBDfZw5TU-BC7hdV_6wha8Hyn0PQyaeylPY1jsFHU	2026-01-27 14:40:56.14	2025-07-31 15:16:26.259081
207	42	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDIsImVtYWlsIjoic2FwaWVuc0BnbWFpbC5jb20iLCJpYXQiOjE3NTM5NzM3NzAsImV4cCI6MTc2OTUyNTc3MH0.-dRPDxW6s7hVynY1p_sQ_k8TPypfNfX2pgpKt_OFNqc	2026-01-27 15:56:10.777	2025-07-31 16:56:10.779657
201	32	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImVtYWlsIjoidG9tcGF5YW4xNzEwQGdtYWlsLmNvbSIsImlhdCI6MTc1Mzk2OTI1NiwiZXhwIjoxNzY5NTIxMjU2fQ.aDqBDfZw5TU-BC7hdV_6wha8Hyn0PQyaeylPY1jsFHU	2026-01-27 14:40:56.14	2025-07-31 14:30:22.327419
208	42	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDIsImVtYWlsIjoic2FwaWVuc0BnbWFpbC5jb20iLCJpYXQiOjE3NTM5NzQzMjQsImV4cCI6MTc2OTUyNjMyNH0.kQoCIuI7De3N0fXalJHHQgVino9D7Tvi5IJu0_PbrSM	2026-01-27 16:05:24.096	2025-07-31 17:05:24.097836
209	42	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDIsImVtYWlsIjoic2FwaWVuc0BnbWFpbC5jb20iLCJpYXQiOjE3NTM5NzQ0MTksImV4cCI6MTc2OTUyNjQxOX0.SGlT6Pk2yIqZADAsEixItRVVmNa_LqIYogWaiNi1ut4	2026-01-27 16:06:59.43	2025-07-31 17:06:59.431877
210	42	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDIsImVtYWlsIjoic2FwaWVuc0BnbWFpbC5jb20iLCJpYXQiOjE3NTM5NzQ1NjMsImV4cCI6MTc2OTUyNjU2M30.yFtYiQvKALPqR821we78Cj1rXa2ZLauTaA74EGwbtjE	2026-01-27 16:09:23.463	2025-07-31 17:09:23.470791
162	32	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImVtYWlsIjoidG9tcGF5YW4xNzEwQGdtYWlsLmNvbSIsImlhdCI6MTc1MzI3ODQyNCwiZXhwIjoxNzY4ODMwNDI0fQ.p3YtqYowI4_RR3xEanoauLiN_OEOKjx-nbVVM7-7xW0	2026-01-19 14:47:04.969	2025-07-23 13:57:33.071252
211	42	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDIsImVtYWlsIjoic2FwaWVuc0BnbWFpbC5jb20iLCJpYXQiOjE3NTM5NzQ1NjMsImV4cCI6MTc2OTUyNjU2M30.yFtYiQvKALPqR821we78Cj1rXa2ZLauTaA74EGwbtjE	2026-01-27 16:09:23.562	2025-07-31 17:09:23.56399
212	42	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDIsImVtYWlsIjoic2FwaWVuc0BnbWFpbC5jb20iLCJpYXQiOjE3NTM5NzQ3MzUsImV4cCI6MTc2OTUyNjczNX0.GvW9FMcPRaEbNCFm9aTGx37H3djOqzm0hhky4jmHGww	2026-01-27 16:12:15.753	2025-07-31 17:12:15.755577
213	42	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDIsImVtYWlsIjoic2FwaWVuc0BnbWFpbC5jb20iLCJpYXQiOjE3NTM5NzQ4MjYsImV4cCI6MTc2OTUyNjgyNn0.qG1w0l3ZxKKS5EjCmLoUt8Kk5gjmfTt761iby9FbHbs	2026-01-27 16:13:47.002	2025-07-31 17:13:47.005042
214	42	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDIsImVtYWlsIjoic2FwaWVuc0BnbWFpbC5jb20iLCJpYXQiOjE3NTM5NzY2MzgsImV4cCI6MTc2OTUyODYzOH0.4vL3vqIPz5VmYzhR4V38KSiugh4bjTbEkBCmjl6yBv0	2026-01-27 16:43:58.196	2025-07-31 17:43:58.198182
215	42	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDIsImVtYWlsIjoic2FwaWVuc0BnbWFpbC5jb20iLCJpYXQiOjE3NTM5NzY3NjYsImV4cCI6MTc2OTUyODc2Nn0.SZm-A0-xW0iLjXu-JVYIk0RW6HDAhMMq1pT2AmKW5NE	2026-01-27 16:46:06.957	2025-07-31 17:46:06.959455
216	42	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDIsImVtYWlsIjoic2FwaWVuc0BnbWFpbC5jb20iLCJpYXQiOjE3NTM5NzcwOTksImV4cCI6MTc2OTUyOTA5OX0.qwDOCXv9n-onLuwcY9eq23PiBKAOE9-hasWZW4Veqj4	2026-01-27 16:51:39.396	2025-07-31 17:51:39.398483
217	42	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDIsImVtYWlsIjoic2FwaWVuc0BnbWFpbC5jb20iLCJpYXQiOjE3NTM5ODEzMDMsImV4cCI6MTc2OTUzMzMwM30.sjiW44--SZA3i2FLme964aEBSkPBZjtRraQ8GaIyE-o	2026-01-27 18:01:43.144	2025-07-31 18:02:39.317817
218	42	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDIsImVtYWlsIjoic2FwaWVuc0BnbWFpbC5jb20iLCJpYXQiOjE3NTM5ODEzMjgsImV4cCI6MTc2OTUzMzMyOH0.s7pFpP4NkLnCQ9sNE1wbDs1r_BF0CB2fhzbXlcZmaiI	2026-01-27 18:02:08.592	2025-07-31 19:02:08.649073
219	42	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDIsImVtYWlsIjoic2FwaWVuc0BnbWFpbC5jb20iLCJpYXQiOjE3NTM5ODE0NjUsImV4cCI6MTc2OTUzMzQ2NX0.h6bjWp6LfInKGg1DkZ21onbUsrQxv8FYZYBzW_E483w	2026-01-27 18:04:25.435	2025-07-31 19:04:25.437785
220	42	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDIsImVtYWlsIjoic2FwaWVuc0BnbWFpbC5jb20iLCJpYXQiOjE3NTM5ODE4NjksImV4cCI6MTc2OTUzMzg2OX0.19EG6YuhMHDWvvasNcWbxltlB45gIcntx57ptJn_biI	2026-01-27 18:11:09.604	2025-07-31 19:11:09.605268
221	42	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDIsImVtYWlsIjoic2FwaWVuc0BnbWFpbC5jb20iLCJpYXQiOjE3NTM5ODI1ODIsImV4cCI6MTc2OTUzNDU4Mn0.CMoo83iUznR2NMbPBD0iB1aDxXDydRTUL54VV9oHi_8	2026-01-27 18:23:02.87	2025-07-31 19:23:02.872361
222	42	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDIsImVtYWlsIjoic2FwaWVuc0BnbWFpbC5jb20iLCJpYXQiOjE3NTM5ODMzOTEsImV4cCI6MTc2OTUzNTM5MX0.xa5wYemoe5JGYuuYJIba0KdWedQjH0UndeXdcI9ev7g	2026-01-27 18:36:31.348	2025-07-31 19:36:31.349836
223	42	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDIsImVtYWlsIjoic2FwaWVuc0BnbWFpbC5jb20iLCJpYXQiOjE3NTM5ODM2MjcsImV4cCI6MTc2OTUzNTYyN30.A_pp4f7eXa6xTqHmg9Nx-07DN2wDB8ESk8z3cxa0h4c	2026-01-27 18:40:27.937	2025-07-31 19:40:27.943604
224	42	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDIsImVtYWlsIjoic2FwaWVuc0BnbWFpbC5jb20iLCJpYXQiOjE3NTM5ODM2MzUsImV4cCI6MTc2OTUzNTYzNX0.ggk5sAjtgnOIBc4OFDbdk3NrQv4c3sQNt4ch6BM3I5I	2026-01-27 18:40:35.369	2025-07-31 19:40:35.375446
225	42	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDIsImVtYWlsIjoic2FwaWVuc0BnbWFpbC5jb20iLCJpYXQiOjE3NTM5ODM2MzUsImV4cCI6MTc2OTUzNTYzNX0.ggk5sAjtgnOIBc4OFDbdk3NrQv4c3sQNt4ch6BM3I5I	2026-01-27 18:40:35.52	2025-07-31 19:40:35.525063
226	42	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDIsImVtYWlsIjoic2FwaWVuc0BnbWFpbC5jb20iLCJpYXQiOjE3NTM5ODM2NjYsImV4cCI6MTc2OTUzNTY2Nn0.j1N_PWDp3nbg3OQMT83atwmwYfFHZVq__G1Z0pf_npc	2026-01-27 18:41:06.632	2025-07-31 19:41:06.633483
227	42	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDIsImVtYWlsIjoic2FwaWVuc0BnbWFpbC5jb20iLCJpYXQiOjE3NTM5ODM2NzUsImV4cCI6MTc2OTUzNTY3NX0.lNyIzt91X2sC_bAn9aEE1s5AqiMa7sqKTShdLfbZqrA	2026-01-27 18:41:15.951	2025-07-31 19:41:15.955638
228	42	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDIsImVtYWlsIjoic2FwaWVuc0BnbWFpbC5jb20iLCJpYXQiOjE3NTM5ODU3ODMsImV4cCI6MTc2OTUzNzc4M30.o23nrVldOIhOnXz4Sy_e6_98dg8Vz0S_DjJu2q5Qpb0	2026-01-27 19:16:23.289	2025-07-31 20:16:23.291109
229	42	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDIsImVtYWlsIjoic2FwaWVuc0BnbWFpbC5jb20iLCJpYXQiOjE3NTM5ODc3OTksImV4cCI6MTc2OTUzOTc5OX0.LIx-4ZgP-vVeOZVSYY-eeKyg85Ux8tfA7q-_mTk1zQQ	2026-01-27 19:49:59.112	2025-07-31 20:49:59.11533
230	42	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDIsImVtYWlsIjoic2FwaWVuc0BnbWFpbC5jb20iLCJpYXQiOjE3NTM5ODgwNzcsImV4cCI6MTc2OTU0MDA3N30.fbw5Mz2oMgAFB238KRz8dj1KPIrdaxf_1Lq1ZYR90lk	2026-01-27 19:54:37.349	2025-07-31 20:54:37.352445
231	42	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDIsImVtYWlsIjoic2FwaWVuc0BnbWFpbC5jb20iLCJpYXQiOjE3NTM5ODkwNDIsImV4cCI6MTc2OTU0MTA0Mn0.IsciRnfaRXIOFKCR3QtCpyUSfb90qt5KJmIIVtKrcVs	2026-01-27 20:10:42.552	2025-07-31 21:10:42.554084
232	42	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDIsImVtYWlsIjoic2FwaWVuc0BnbWFpbC5jb20iLCJpYXQiOjE3NTM5ODk0MjgsImV4cCI6MTc2OTU0MTQyOH0.jW-1geLm66cSpWGZei_Ywjl0z1jeEExbjxno1jKTeLg	2026-01-27 20:17:08.048	2025-07-31 21:17:08.049838
233	42	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDIsImVtYWlsIjoic2FwaWVuc0BnbWFpbC5jb20iLCJpYXQiOjE3NTM5OTAxMDUsImV4cCI6MTc2OTU0MjEwNX0.d4bPXjRaAq5kxWDXPYYYRHAtWgTq7iibmytYcbXJorY	2026-01-27 20:28:25.792	2025-07-31 21:28:25.793909
234	42	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDIsImVtYWlsIjoic2FwaWVuc0BnbWFpbC5jb20iLCJpYXQiOjE3NTM5OTAyODksImV4cCI6MTc2OTU0MjI4OX0.I4-Ame7RdGF9OdcMOcMjTibOsh_2Op-XKDJVKJsINXs	2026-01-27 20:31:29.76	2025-07-31 21:31:29.762768
239	42	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDIsImVtYWlsIjoic2FwaWVuc0BnbWFpbC5jb20iLCJpYXQiOjE3NTM5OTEwNjMsImV4cCI6MTc2OTU0MzA2M30.ZXg44wTZt8pxLpEg5SJV1n2RAAH2LaWhch86R0XKHXs	2026-01-27 20:44:23.28	2025-07-31 21:44:23.283575
240	42	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDIsImVtYWlsIjoic2FwaWVuc0BnbWFpbC5jb20iLCJpYXQiOjE3NTQwMjc3NDMsImV4cCI6MTc2OTU3OTc0M30.9Td_Qy-Iu1UdBpSLJCuy_6rD8vnE-YqYe6UxgxMxEqk	2026-01-28 06:55:43.649	2025-07-31 21:46:16.255848
241	42	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDIsImVtYWlsIjoic2FwaWVuc0BnbWFpbC5jb20iLCJpYXQiOjE3NTQwMjgzMzEsImV4cCI6MTc2OTU4MDMzMX0.-8QQcIaxnRStEBFb07FdLMHCHj93HlHcNedYcIUMEcI	2026-01-28 07:05:31.741	2025-08-01 08:05:31.744308
242	42	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDIsImVtYWlsIjoic2FwaWVuc0BnbWFpbC5jb20iLCJpYXQiOjE3NTQwMjg0NDksImV4cCI6MTc2OTU4MDQ0OX0.sPAvN-1viQ5Mv2Qi6sN7dJayhfK9RavfIBZDWXQLfKw	2026-01-28 07:07:29.013	2025-08-01 08:07:29.015998
243	42	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDIsImVtYWlsIjoic2FwaWVuc0BnbWFpbC5jb20iLCJpYXQiOjE3NTQwMjg1MDgsImV4cCI6MTc2OTU4MDUwOH0.mEzW3FEz61fogWlXFZ5SPrCag0m2NTblCDYMFENEzXo	2026-01-28 07:08:28.944	2025-08-01 08:08:28.945892
244	42	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDIsImVtYWlsIjoic2FwaWVuc0BnbWFpbC5jb20iLCJpYXQiOjE3NTQwMjg1NjEsImV4cCI6MTc2OTU4MDU2MX0.2DBzFiskEM0T2KRZTDH0wbJNL_PKoO_bHaQnPqMFzlY	2026-01-28 07:09:21.417	2025-08-01 08:09:21.421437
245	42	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDIsImVtYWlsIjoic2FwaWVuc0BnbWFpbC5jb20iLCJpYXQiOjE3NTQwMjk2MDQsImV4cCI6MTc2OTU4MTYwNH0.HY1qmix44d0UgqXsUA8IMpTxIBPH22Ivver5yWn1R-4	2026-01-28 07:26:44.134	2025-08-01 08:10:18.040097
246	32	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImVtYWlsIjoidG9tcGF5YW4xNzEwQGdtYWlsLmNvbSIsImlhdCI6MTc1NDAyOTk2MiwiZXhwIjoxNzY5NTgxOTYyfQ.NWLu9Ze8aadT1zg9xyjw0Gmb70hX36KKyZMRxlf3_j0	2026-01-28 07:32:42.588	2025-08-01 08:32:42.590644
247	32	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImVtYWlsIjoidG9tcGF5YW4xNzEwQGdtYWlsLmNvbSIsImlhdCI6MTc1NDAzMDQ0OCwiZXhwIjoxNzY5NTgyNDQ4fQ.OWwSMP-sNeDbGEMg9UYnm35C2Tb46Bg_JL8kE1KdfzI	2026-01-28 07:40:48.404	2025-08-01 08:40:48.409048
248	32	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImVtYWlsIjoidG9tcGF5YW4xNzEwQGdtYWlsLmNvbSIsImlhdCI6MTc1NDAzMDU1MywiZXhwIjoxNzY5NTgyNTUzfQ.Vwg78-NqVPZxpaJX5fFqvkS8VmZrDfLxey_AWRCgI6U	2026-01-28 07:42:33.426	2025-08-01 08:42:33.429583
249	32	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImVtYWlsIjoidG9tcGF5YW4xNzEwQGdtYWlsLmNvbSIsImlhdCI6MTc1NDAzMDU3OCwiZXhwIjoxNzY5NTgyNTc4fQ.Ax9xUPZeRMkkJ9LGAh1SrH06NM7yCPlPBCtfrTgBSkY	2026-01-28 07:42:58.434	2025-08-01 08:42:58.441397
296	32	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImVtYWlsIjoidG9tcGF5YW4xNzEwQGdtYWlsLmNvbSIsImlhdCI6MTc1NDU2ODY1MSwiZXhwIjoxNzcwMTIwNjUxfQ.V1yYS-9I46jFGaPr2kRKFuTVxH0jNK7mXsygvnjTbcU	2026-02-03 13:10:51.899	2025-08-03 16:52:00.288237
251	32	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImVtYWlsIjoidG9tcGF5YW4xNzEwQGdtYWlsLmNvbSIsImlhdCI6MTc1NDAzMTYyMywiZXhwIjoxNzY5NTgzNjIzfQ.caEqSbAjCLXPRNLFjdC9L2jIIxPZaXO1qNonRlYwsqQ	2026-01-28 08:00:23.366	2025-08-01 09:00:23.372366
252	32	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImVtYWlsIjoidG9tcGF5YW4xNzEwQGdtYWlsLmNvbSIsImlhdCI6MTc1NDAzMTYzMSwiZXhwIjoxNzY5NTgzNjMxfQ.8BT3e9l9-SFzol_Lq9cRmAh7fyn0-UxwuQI1XnlD9VE	2026-01-28 08:00:31.799	2025-08-01 09:00:31.804243
253	32	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImVtYWlsIjoidG9tcGF5YW4xNzEwQGdtYWlsLmNvbSIsImlhdCI6MTc1NDAzMzA3MSwiZXhwIjoxNzY5NTg1MDcxfQ.P3Wh7tk42zRmBTyigUyAGa4ScNJ3q5paxmml5-qB_tY	2026-01-28 08:24:31.627	2025-08-01 09:22:31.969807
254	32	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImVtYWlsIjoidG9tcGF5YW4xNzEwQGdtYWlsLmNvbSIsImlhdCI6MTc1NDAzMzA3MSwiZXhwIjoxNzY5NTg1MDcxfQ.P3Wh7tk42zRmBTyigUyAGa4ScNJ3q5paxmml5-qB_tY	2026-01-28 08:24:31.644	2025-08-01 09:24:31.648875
297	32	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImVtYWlsIjoidG9tcGF5YW4xNzEwQGdtYWlsLmNvbSIsImlhdCI6MTc1NDY1OTg4MSwiZXhwIjoxNzcwMjExODgxfQ.yTxw9Tx-LI-KD-O3JurX5LSC2ctuTIVLMlSQceqRgQA	2026-02-04 14:31:21.374	2025-08-07 14:36:15.648815
258	32	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImVtYWlsIjoidG9tcGF5YW4xNzEwQGdtYWlsLmNvbSIsImlhdCI6MTc1NDA0NzA3NSwiZXhwIjoxNzY5NTk5MDc1fQ.7Np3UyATMk_1HW6effCPH7DjCjKGBrPunFcMgA9zhoA	2026-01-28 12:17:55.447	2025-08-01 13:17:55.451879
259	42	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDIsImVtYWlsIjoic2FwaWVuc0BnbWFpbC5jb20iLCJpYXQiOjE3NTQwNTA2NDQsImV4cCI6MTc2OTYwMjY0NH0.EnKRg21VONNSkq-mNnmG7cmEUipg_3vC-L22IVEdQNc	2026-01-28 13:17:24.116	2025-08-01 13:19:16.864494
290	32	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImVtYWlsIjoidG9tcGF5YW4xNzEwQGdtYWlsLmNvbSIsImlhdCI6MTc1NDE0NTQzOCwiZXhwIjoxNzY5Njk3NDM4fQ.RSmvj2MnUkEAgGgNYTA55eDSJCtCUirUezVgtfxrric	2026-01-29 15:37:18.991	2025-08-02 16:37:18.999112
281	32	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImVtYWlsIjoidG9tcGF5YW4xNzEwQGdtYWlsLmNvbSIsImlhdCI6MTc1NDE0NDYwMywiZXhwIjoxNzY5Njk2NjAzfQ.YUJkT8JDu0zS3y4O5q0ESQQ6UxENNpN0dGw0hSxqLAs	2026-01-29 15:23:23.447	2025-08-02 16:23:23.457433
282	32	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImVtYWlsIjoidG9tcGF5YW4xNzEwQGdtYWlsLmNvbSIsImlhdCI6MTc1NDE0NDczMywiZXhwIjoxNzY5Njk2NzMzfQ.QboWtWE1sL1rFr6FTiJJFjMXoacR83eypIJmaqidynI	2026-01-29 15:25:33.359	2025-08-02 16:25:33.36303
283	32	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImVtYWlsIjoidG9tcGF5YW4xNzEwQGdtYWlsLmNvbSIsImlhdCI6MTc1NDE0NDgwMiwiZXhwIjoxNzY5Njk2ODAyfQ.zE-GNoVbftewWRXxAiV8LrqbMUET1s_Q9siCIyoiQ64	2026-01-29 15:26:42.944	2025-08-02 16:26:42.94771
285	32	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImVtYWlsIjoidG9tcGF5YW4xNzEwQGdtYWlsLmNvbSIsImlhdCI6MTc1NDE0NDkzOSwiZXhwIjoxNzY5Njk2OTM5fQ.hjko4SZz84pBVbhYCUuuL4QfuSG2DB0BFXuVa896-0s	2026-01-29 15:28:59.628	2025-08-02 16:28:59.63695
286	32	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImVtYWlsIjoidG9tcGF5YW4xNzEwQGdtYWlsLmNvbSIsImlhdCI6MTc1NDE0NDk1OCwiZXhwIjoxNzY5Njk2OTU4fQ.554v4AAm2_E3KNmnmlQRUL31v3s-5y3lldjyXAlfhZA	2026-01-29 15:29:18.129	2025-08-02 16:29:18.139534
292	32	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImVtYWlsIjoidG9tcGF5YW4xNzEwQGdtYWlsLmNvbSIsImlhdCI6MTc1NDE1NjgzMSwiZXhwIjoxNzY5NzA4ODMxfQ.2beBT_3-3n--k0ctw6CnUo04QghVRVXToKUqPl97UqU	2026-01-29 18:47:12.003	2025-08-02 19:47:12.009311
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
26	5	be82fc03-325c-4453-96b8-2ae7fd028222	2025-07-11	07:00	08:00	5	500.00	available	2025-07-11 13:24:14.381453	2025-07-11 13:24:14.381453
27	5	be82fc03-325c-4453-96b8-2ae7fd028222	2025-07-11	12:30	16:00	3	500.00	available	2025-07-11 13:24:39.794938	2025-07-11 13:24:39.794938
28	5	be82fc03-325c-4453-96b8-2ae7fd028222	2025-07-11	16:00	17:00	6	500.00	full	2025-07-11 13:24:59.257189	2025-07-11 13:24:59.257189
29	5	d1eec0ec-f975-4b72-9fd9-b52b1ab964d2	2025-07-11	18:00	23:45	6	35.00	full	2025-07-11 19:20:26.273534	2025-07-11 19:20:26.273534
30	5	be82fc03-325c-4453-96b8-2ae7fd028222	2025-07-11	18:00	23:45	2	500.00	available	2025-07-11 19:37:35.142073	2025-07-11 19:37:35.142073
31	5	d1eec0ec-f975-4b72-9fd9-b52b1ab964d2	2025-07-12	04:00	05:45	3	35.00	available	2025-07-12 08:02:41.11108	2025-07-12 08:02:41.11108
32	5	d1eec0ec-f975-4b72-9fd9-b52b1ab964d2	2025-07-12	06:30	08:15	3	35.00	available	2025-07-12 08:03:02.024069	2025-07-12 08:03:02.024069
33	5	d1eec0ec-f975-4b72-9fd9-b52b1ab964d2	2025-07-12	08:15	09:15	5	35.00	available	2025-07-12 08:03:23.956042	2025-07-12 08:03:23.956042
34	5	d1eec0ec-f975-4b72-9fd9-b52b1ab964d2	2025-07-12	09:15	10:15	6	35.00	full	2025-07-12 08:03:40.961986	2025-07-12 08:03:40.961986
35	5	be82fc03-325c-4453-96b8-2ae7fd028222	2025-07-12	01:45	04:15	3	500.00	available	2025-07-12 08:04:02.404518	2025-07-12 08:04:02.404518
36	5	be82fc03-325c-4453-96b8-2ae7fd028222	2025-07-12	08:15	09:15	5	500.00	available	2025-07-12 08:04:23.695231	2025-07-12 08:04:23.695231
25	5	be82fc03-325c-4453-96b8-2ae7fd028222	2025-07-16	18:00	20:00	6	500.00	full	2025-07-11 10:10:52.726848	2025-07-12 08:48:51.231866
37	5	be82fc03-325c-4453-96b8-2ae7fd028222	2025-07-15	07:00	08:00	5	500.00	available	2025-07-15 15:34:46.875568	2025-07-15 15:34:46.875568
38	5	be82fc03-325c-4453-96b8-2ae7fd028222	2025-07-29	09:00	10:00	3	500.00	available	2025-07-15 15:35:10.026004	2025-07-15 15:35:10.026004
39	5	07782d1c-50b9-477e-9114-2a9892c08800	2025-07-24	07:00	08:00	3	999.00	available	2025-07-17 18:50:06.9017	2025-07-17 18:50:06.9017
40	5	77b2f91a-8d54-402a-93af-43e743dd13a5	2025-07-23	13:00	14:00	3	1599.00	available	2025-07-23 16:31:20.35374	2025-07-23 16:31:20.35374
41	5	be82fc03-325c-4453-96b8-2ae7fd028222	2025-07-25	07:00	08:00	3	500.00	available	2025-07-25 22:50:16.899993	2025-07-25 22:50:16.899993
24	5	be82fc03-325c-4453-96b8-2ae7fd028222	2025-07-31	08:00	09:00	4	500.00	full	2025-07-10 11:30:49.960711	2025-07-25 23:48:06.316447
43	5	01bd532b-0eac-4c79-a2a2-bbdb6a98b172	2025-07-30	07:00	08:00	3	75.00	available	2025-07-26 10:32:12.751639	2025-07-26 10:32:12.751639
45	5	be82fc03-325c-4453-96b8-2ae7fd028222	2025-07-26	08:15	09:15	3	500.00	available	2025-07-26 11:12:23.859596	2025-07-26 11:12:23.859596
46	5	be82fc03-325c-4453-96b8-2ae7fd028222	2025-07-31	07:00	08:00	3	500.00	available	2025-07-26 11:14:46.705031	2025-07-26 11:14:46.705031
47	5	be82fc03-325c-4453-96b8-2ae7fd028222	2025-07-31	09:00	10:00	4	500.00	full	2025-07-26 11:21:30.801781	2025-07-26 11:21:30.801781
44	5	be82fc03-325c-4453-96b8-2ae7fd028222	2025-07-31	09:00	10:30	4	500.00	full	2025-07-26 11:03:30.356815	2025-07-28 10:32:51.208967
48	5	be82fc03-325c-4453-96b8-2ae7fd028222	2025-08-01	07:00	08:00	3	500.00	available	2025-07-28 11:04:18.989902	2025-07-28 11:04:18.989902
49	5	be82fc03-325c-4453-96b8-2ae7fd028222	2025-08-01	16:00	17:00	4	500.00	full	2025-07-28 11:06:10.926491	2025-07-28 11:32:06.440876
50	5	be82fc03-325c-4453-96b8-2ae7fd028222	2025-08-01	12:30	16:00	3	500.00	available	2025-07-28 11:55:18.556358	2025-07-28 11:55:18.556358
51	5	be82fc03-325c-4453-96b8-2ae7fd028222	2025-08-01	18:00	23:45	4	500.00	full	2025-07-28 12:27:31.729157	2025-07-28 12:27:31.729157
52	5	be82fc03-325c-4453-96b8-2ae7fd028222	2025-08-02	01:45	04:15	3	500.00	available	2025-07-28 13:41:59.982783	2025-07-28 13:41:59.982783
53	5	be82fc03-325c-4453-96b8-2ae7fd028222	2025-08-02	08:15	09:15	3	500.00	available	2025-07-28 13:46:51.569148	2025-07-28 13:46:51.569148
54	5	be82fc03-325c-4453-96b8-2ae7fd028222	2025-08-03	07:00	08:00	3	500.00	available	2025-07-28 13:58:21.313012	2025-07-28 13:58:21.313012
55	5	be82fc03-325c-4453-96b8-2ae7fd028222	2025-08-03	08:00	09:00	3	500.00	available	2025-07-28 14:08:44.901557	2025-07-28 14:08:44.901557
56	5	be82fc03-325c-4453-96b8-2ae7fd028222	2025-08-03	09:00	10:00	3	500.00	available	2025-07-28 14:14:37.042267	2025-07-28 14:14:37.042267
57	5	be82fc03-325c-4453-96b8-2ae7fd028222	2025-08-03	10:00	11:00	3	500.00	available	2025-07-28 14:18:56.393992	2025-07-28 14:18:56.393992
58	5	be82fc03-325c-4453-96b8-2ae7fd028222	2025-08-24	07:00	08:00	4	500.00	full	2025-07-28 15:00:37.522716	2025-07-28 15:00:37.522716
59	5	be82fc03-325c-4453-96b8-2ae7fd028222	2025-08-23	01:45	04:15	3	500.00	available	2025-07-28 15:10:46.515333	2025-07-28 15:10:46.515333
60	5	be82fc03-325c-4453-96b8-2ae7fd028222	2025-08-14	07:00	08:00	4	500.00	full	2025-07-28 19:31:29.202247	2025-07-28 19:31:29.202247
61	5	be82fc03-325c-4453-96b8-2ae7fd028222	2025-08-16	01:45	04:15	3	500.00	available	2025-07-28 21:48:00.121492	2025-07-28 21:48:00.121492
62	5	01bd532b-0eac-4c79-a2a2-bbdb6a98b172	2025-08-27	07:00	08:00	4	75.00	full	2025-07-29 07:36:48.025019	2025-07-29 07:36:48.025019
64	5	6e7830e6-fd73-4ae1-9419-f47777fa6f95	2025-07-29	20:30	21:45	3	60.00	available	2025-07-29 07:49:15.304473	2025-07-29 07:49:15.304473
65	5	d1eec0ec-f975-4b72-9fd9-b52b1ab964d2	2025-07-29	07:00	08:00	4	35.00	full	2025-07-29 07:59:52.9328	2025-07-29 07:59:52.9328
63	5	6e7830e6-fd73-4ae1-9419-f47777fa6f95	2025-07-29	05:00	09:00	4	60.00	full	2025-07-29 07:45:30.859108	2025-07-29 10:16:25.264684
66	5	147f15ce-3b5d-4dc2-bf4e-f0775c7fa726	2025-07-29	22:00	22:15	4	199.00	full	2025-07-29 10:19:58.494538	2025-07-29 10:34:53.593569
67	5	77b2f91a-8d54-402a-93af-43e743dd13a5	2025-07-29	07:00	08:00	7	1599.00	available	2025-07-29 10:40:12.734207	2025-07-29 10:40:12.734207
68	5	07782d1c-50b9-477e-9114-2a9892c08800	2025-07-31	07:00	08:00	3	999.00	available	2025-07-29 10:49:15.074714	2025-07-29 10:49:15.074714
69	5	147f15ce-3b5d-4dc2-bf4e-f0775c7fa726	2025-07-29	08:00	09:00	4	199.00	full	2025-07-29 11:01:03.938337	2025-07-29 11:03:02.857764
70	5	147f15ce-3b5d-4dc2-bf4e-f0775c7fa726	2025-07-29	07:00	08:00	4	199.00	full	2025-07-29 11:05:44.985397	2025-07-29 11:05:44.985397
71	5	147f15ce-3b5d-4dc2-bf4e-f0775c7fa726	2025-07-29	14:00	16:00	4	199.00	full	2025-07-29 11:06:47.278974	2025-07-29 11:22:45.780186
73	5	147f15ce-3b5d-4dc2-bf4e-f0775c7fa726	2025-08-05	07:00	08:00	3	199.00	available	2025-07-29 11:26:29.385207	2025-07-29 11:26:29.385207
74	5	147f15ce-3b5d-4dc2-bf4e-f0775c7fa726	2025-08-05	08:00	09:00	3	199.00	available	2025-07-29 11:29:19.047787	2025-07-29 11:29:19.047787
75	5	147f15ce-3b5d-4dc2-bf4e-f0775c7fa726	2025-08-05	22:00	22:15	3	199.00	available	2025-07-29 11:41:30.364102	2025-07-29 11:41:30.364102
76	5	07782d1c-50b9-477e-9114-2a9892c08800	2025-08-14	07:00	08:00	3	999.00	available	2025-07-29 18:49:09.041635	2025-07-29 18:49:09.041635
77	5	be82fc03-325c-4453-96b8-2ae7fd028222	2025-08-06	18:00	20:00	3	500.00	available	2025-07-29 18:54:02.256707	2025-07-29 18:54:02.256707
78	5	01bd532b-0eac-4c79-a2a2-bbdb6a98b172	2025-08-20	07:00	08:00	3	75.00	available	2025-07-29 18:57:35.717959	2025-07-29 18:57:35.717959
79	5	6e7830e6-fd73-4ae1-9419-f47777fa6f95	2025-08-05	13:00	14:45	3	60.00	available	2025-07-29 19:05:25.483479	2025-07-29 19:05:25.483479
80	5	07782d1c-50b9-477e-9114-2a9892c08800	2025-08-07	07:00	08:00	4	999.00	full	2025-07-29 19:06:58.646491	2025-07-29 19:11:15.813649
81	5	01bd532b-0eac-4c79-a2a2-bbdb6a98b172	2025-08-13	07:00	08:00	3	75.00	available	2025-07-29 19:13:18.7518	2025-07-29 19:13:18.7518
82	5	6e7830e6-fd73-4ae1-9419-f47777fa6f95	2025-07-29	13:00	14:45	3	60.00	available	2025-07-29 21:56:36.820063	2025-07-29 21:56:36.820063
72	5	07782d1c-50b9-477e-9114-2a9892c08800	2025-08-21	07:00	08:00	4	999.00	full	2025-07-29 11:13:58.953348	2025-07-29 22:03:21.722451
83	5	6e7830e6-fd73-4ae1-9419-f47777fa6f95	2025-08-05	20:30	21:45	3	60.00	available	2025-08-03 16:29:43.477182	2025-08-03 16:29:43.477182
84	5	6e7830e6-fd73-4ae1-9419-f47777fa6f95	2025-08-12	13:00	14:45	3	60.00	available	2025-08-05 08:15:22.17113	2025-08-05 08:15:22.17113
\.


--
-- Data for Name: reservations_creneaux_google_calendar; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reservations_creneaux_google_calendar (id, reservation_slots_id, provider_id, google_event_id) FROM stdin;
\.


--
-- Data for Name: reservations_individuals; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reservations_individuals (id, user_id, slot_id, total_participants, total_price, payment_status, reservation_status, created_at, updated_at, nb_adult, nb_reduced, email, name, phone, stripe_payment_intent_id) FROM stdin;
61	41	46	3	1500.00	paid	confirmed	2025-07-26 11:14:46.711256	2025-07-26 11:14:46.711256	1	2	tompayan1710@gmail.com	Survoler la Côte d'Azur en avion privé	+33765594097	\N
60	41	43	3	225.00	paid	confirmed	2025-07-26 10:32:12.760143	2025-07-26 10:32:12.760143	3	1	\N	\N	\N	\N
66	32	49	1	500.00	paid	confirmed	2025-07-28 11:32:06.444489	2025-07-28 11:32:06.444489	1	0	tompayan1710@gmail.com	Tom Payan	+33765594097	\N
71	32	54	3	1500.00	paid	confirmed	2025-07-28 13:58:21.316215	2025-07-28 13:58:21.316215	2	1	tompayan1710@gmail.com	PAYAN jean luc	+33765594097	\N
76	43	59	3	1500.00	paid	confirmed	2025-07-28 15:10:46.51707	2025-07-28 15:10:46.51707	2	1	tompayan1710@gmail.com	Bac Pro	+33333333333	\N
81	41	64	3	180.00	paid	confirmed	2025-07-29 07:49:15.307932	2025-07-29 07:49:15.307932	2	1	tompayan1710@gmail.com	Tableau	+33121212121	pi_3Rq6PI2f0HHvMFDt0iJ7Y37N
86	41	67	7	11193.00	paid	confirmed	2025-07-29 10:40:12.740136	2025-07-29 10:40:12.740136	6	1	tompayan1710@gmail.com	Files	+33765594097	pi_3Rq94n2f0HHvMFDt1kwdjm1Z
91	41	71	3	597.00	paid	confirmed	2025-07-29 11:06:47.283546	2025-07-29 11:06:47.283546	2	1	tompayan1710@gmail.com	Page	+33765594097	pi_3Rq9UT2f0HHvMFDt1FfjImLa
96	41	75	3	597.00	paid	confirmed	2025-07-29 11:41:30.366233	2025-07-29 11:41:30.366233	2	1	tompayan1710@gmail.com	Tom Payan	+33765594097	pi_3RqA282f0HHvMFDt1b16JzUV
101	41	80	3	2997.00	paid	confirmed	2025-07-29 19:06:58.654559	2025-07-29 19:06:58.654559	2	1	tompayan1710@gmail.com	Taxerlesriches	+33765594097	pi_3RqGzC2f0HHvMFDt0YMus4Fw
106	60	83	3	180.00	paid	confirmed	2025-08-03 16:29:43.485036	2025-08-03 16:29:43.485036	2	1	tompayan1710@gmail.com	Tom Payan && clara big box	+33765594097	pi_3Rs2ul2f0HHvMFDt0dkkrmtY
62	41	47	4	2000.00	paid	confirmed	2025-07-26 11:21:30.808917	2025-07-26 11:21:30.808917	2	2	tompayan1710@gmail.com	Clara BigBoss	+33765594097	\N
67	32	50	3	1500.00	paid	confirmed	2025-07-28 11:55:18.56468	2025-07-28 11:55:18.56468	2	1	tompayan1710@gmail.com	Tom Payan	+33765594097	\N
72	32	55	3	1500.00	paid	confirmed	2025-07-28 14:08:44.908178	2025-07-28 14:08:44.908178	2	1	tompayan1710@gmail.com	LeClara Jean Luc	+33999999999	\N
77	32	60	4	2000.00	paid	confirmed	2025-07-28 19:31:29.206541	2025-07-28 19:31:29.206541	4	0	tompayan1710@gmail.com	AirUp	+33199999999	pi_3RputK2f0HHvMFDt0fnuTV5U
82	41	65	4	140.00	paid	confirmed	2025-07-29 07:59:52.939111	2025-07-29 07:59:52.939111	3	1	clarascipione1@gmail.com	QRcode	+33434343434	pi_3Rq6Zb2f0HHvMFDt0FEOiJ8K
87	41	68	3	2997.00	paid	confirmed	2025-07-29 10:49:15.077586	2025-07-29 10:49:15.077586	2	1	tompayan1710@gmail.com	clavier	+33765594097	pi_3Rq9DY2f0HHvMFDt0J3WLdOG
28	32	15	5	2500.00	paid	confirmed	2025-07-10 08:34:23.072957	2025-07-10 08:34:23.072957	3	1	\N	\N	\N	\N
29	32	15	1	500.00	paid	confirmed	2025-07-10 08:34:54.331603	2025-07-10 08:34:54.331603	3	1	\N	\N	\N	\N
30	32	16	6	3000.00	paid	confirmed	2025-07-10 08:35:30.869266	2025-07-10 08:35:30.869266	3	1	\N	\N	\N	\N
31	32	17	4	2000.00	paid	confirmed	2025-07-10 08:36:07.898516	2025-07-10 08:36:07.898516	3	1	\N	\N	\N	\N
32	32	17	2	1000.00	paid	confirmed	2025-07-10 08:36:35.081326	2025-07-10 08:36:35.081326	3	1	\N	\N	\N	\N
33	32	18	6	3000.00	paid	confirmed	2025-07-10 08:42:59.238173	2025-07-10 08:42:59.238173	3	1	\N	\N	\N	\N
92	41	72	3	2997.00	paid	confirmed	2025-07-29 11:13:58.958173	2025-07-29 11:13:58.958173	2	1	tompayan1710@gmail.com	Ecriture	+33765594097	pi_3Rq9bT2f0HHvMFDt06dACaRv
97	41	76	3	2997.00	paid	confirmed	2025-07-29 18:49:09.054143	2025-07-29 18:49:09.054143	2	1	tompayan1710@gmail.com	Lacarte Céline	+33765594097	pi_3RqGhr2f0HHvMFDt0dNXZeYg
102	41	80	1	999.00	paid	confirmed	2025-07-29 19:11:15.820233	2025-07-29 19:11:15.820233	1	0	tompayan1710@gmail.com	Iphone	+33765594097	pi_3RqH3N2f0HHvMFDt1qWuWNmY
107	32	84	3	180.00	paid	confirmed	2025-08-05 08:15:22.183646	2025-08-05 08:15:22.183646	2	1	tompayan1710@gmail.com	Payan Tom Manua	+33765594097	pi_3Rse9M2f0HHvMFDt1Vsj2IDH
63	32	44	1	500.00	paid	confirmed	2025-07-28 10:32:51.21376	2025-07-28 10:32:51.21376	1	0	tompayan1710@gmail.com	Tom Payan	+33765594097	\N
68	42	51	4	2000.00	paid	confirmed	2025-07-28 12:27:31.733281	2025-07-28 12:27:31.733281	3	1	tompayan1710@gmail.com	C’est quoi tom	+33765584864	\N
73	32	56	3	1500.00	paid	confirmed	2025-07-28 14:14:37.045485	2025-07-28 14:14:37.045485	2	1	tompayan1710@gmail.com	LacarteClara	+33888888888	\N
78	32	61	3	1500.00	paid	confirmed	2025-07-28 21:48:00.129304	2025-07-28 21:48:00.129304	2	1	tompayan1710@gmail.com	Carnet	+33765594097	pi_3Rpx1R2f0HHvMFDt0NSXOd8z
83	41	63	1	60.00	paid	confirmed	2025-07-29 10:16:25.26801	2025-07-29 10:16:25.26801	1	0	clarascipione1@gmail.com	Souris	+33765594097	pi_3Rq8hf2f0HHvMFDt13EIxxyI
88	41	69	3	597.00	paid	confirmed	2025-07-29 11:01:03.945289	2025-07-29 11:01:03.945289	2	1	tompayan1710@gmail.com	Clés	+33765594097	pi_3Rq9Oz2f0HHvMFDt12cekcl8
93	41	71	1	199.00	paid	confirmed	2025-07-29 11:22:45.786745	2025-07-29 11:22:45.786745	1	0	tompayan1710@gmail.com	Pause	+33765594097	pi_3Rq9jx2f0HHvMFDt1EeFNEyi
98	41	77	3	1500.00	paid	confirmed	2025-07-29 18:54:02.266496	2025-07-29 18:54:02.266496	2	1	tompayan1710@gmail.com	Avion	+33765594097	pi_3RqGmd2f0HHvMFDt1BB7uc7r
103	41	81	3	225.00	paid	confirmed	2025-07-29 19:13:18.759187	2025-07-29 19:13:18.759187	2	1	tompayan1710@gmail.com	Cabriolet	+33765594097	pi_3RqH5N2f0HHvMFDt0LMWnLHB
34	32	19	6	3000.00	paid	confirmed	2025-07-10 08:45:04.761597	2025-07-10 08:45:04.761597	3	1	\N	\N	\N	\N
35	32	20	6	3000.00	paid	confirmed	2025-07-10 08:50:50.972323	2025-07-10 08:50:50.972323	3	1	\N	\N	\N	\N
36	32	21	4	2000.00	paid	confirmed	2025-07-10 08:51:47.694385	2025-07-10 08:51:47.694385	3	1	\N	\N	\N	\N
37	32	21	4	2000.00	paid	confirmed	2025-07-10 08:52:13.463512	2025-07-10 08:52:13.463512	3	1	\N	\N	\N	\N
38	32	22	5	2500.00	paid	confirmed	2025-07-10 09:15:19.173118	2025-07-10 09:15:19.173118	3	1	\N	\N	\N	\N
39	32	23	2	1000.00	paid	confirmed	2025-07-10 09:18:39.40762	2025-07-10 09:18:39.40762	3	1	\N	\N	\N	\N
40	32	24	1	500.00	paid	confirmed	2025-07-10 11:30:49.962962	2025-07-10 11:30:49.962962	3	1	\N	\N	\N	\N
41	32	25	2	1000.00	paid	confirmed	2025-07-11 10:10:52.730855	2025-07-11 10:10:52.730855	3	1	\N	\N	\N	\N
42	32	26	5	2500.00	paid	confirmed	2025-07-11 13:24:14.387202	2025-07-11 13:24:14.387202	3	1	\N	\N	\N	\N
43	32	27	3	1500.00	paid	confirmed	2025-07-11 13:24:39.798575	2025-07-11 13:24:39.798575	3	1	\N	\N	\N	\N
44	32	28	6	3000.00	paid	confirmed	2025-07-11 13:24:59.263823	2025-07-11 13:24:59.263823	3	1	\N	\N	\N	\N
45	32	29	6	210.00	paid	confirmed	2025-07-11 19:20:26.278489	2025-07-11 19:20:26.278489	3	1	\N	\N	\N	\N
64	32	48	3	1500.00	paid	confirmed	2025-07-28 11:04:19.000958	2025-07-28 11:04:19.000958	2	1	tompayan1710@gmail.com	Tom Payan	+33765594097	\N
69	32	52	3	1500.00	paid	confirmed	2025-07-28 13:41:59.985403	2025-07-28 13:41:59.985403	2	1	tompayan1710@gmail.com	BigtomClara	+33765594097	\N
74	32	57	3	1500.00	paid	confirmed	2025-07-28 14:18:56.401283	2025-07-28 14:18:56.401283	2	1	tompayan1710@gmail.com	LECHAT clara	+33777777777	\N
79	41	62	4	300.00	paid	confirmed	2025-07-29 07:36:48.029109	2025-07-29 07:36:48.029109	4	0	tompayan1710@gmail.com	Stabilot	+33676767676	pi_3Rq6DE2f0HHvMFDt13lvkTdK
84	41	66	1	199.00	paid	confirmed	2025-07-29 10:19:58.499942	2025-07-29 10:19:58.499942	1	0	clarascipione1@gmail.com	Montre	+33232323232	pi_3Rq8lA2f0HHvMFDt1vJAz4FG
89	41	69	1	199.00	paid	confirmed	2025-07-29 11:03:02.86171	2025-07-29 11:03:02.86171	1	0	tompayan1710@gmail.com	MarquePage	+33765594097	pi_3Rq9Qs2f0HHvMFDt0KKoOTQD
94	41	73	3	597.00	paid	confirmed	2025-07-29 11:26:29.387086	2025-07-29 11:26:29.387086	2	1	tompayan1710@gmail.com	PageLivres	+33765594097	pi_3Rq9na2f0HHvMFDt1vic8zLu
99	41	78	3	225.00	paid	confirmed	2025-07-29 18:57:35.725524	2025-07-29 18:57:35.725524	2	1	tompayan1710@gmail.com	Pc	+33765594097	pi_3RqGq92f0HHvMFDt0jsPmo57
104	41	82	3	180.00	paid	confirmed	2025-07-29 21:56:36.826965	2025-07-29 21:56:36.826965	2	1	tompayan1710@gmail.com	Aquajet tom	+33765594097	pi_3RqJdK2f0HHvMFDt0e5s787z
46	32	30	2	1000.00	paid	confirmed	2025-07-11 19:37:35.146882	2025-07-11 19:37:35.146882	3	1	\N	\N	\N	\N
47	32	31	3	105.00	paid	confirmed	2025-07-12 08:02:41.11307	2025-07-12 08:02:41.11307	3	1	\N	\N	\N	\N
48	32	32	3	105.00	paid	confirmed	2025-07-12 08:03:02.028147	2025-07-12 08:03:02.028147	3	1	\N	\N	\N	\N
49	32	33	5	175.00	paid	confirmed	2025-07-12 08:03:23.961446	2025-07-12 08:03:23.961446	3	1	\N	\N	\N	\N
50	32	34	6	210.00	paid	confirmed	2025-07-12 08:03:40.966863	2025-07-12 08:03:40.966863	3	1	\N	\N	\N	\N
51	32	35	3	1500.00	paid	confirmed	2025-07-12 08:04:02.408694	2025-07-12 08:04:02.408694	3	1	\N	\N	\N	\N
52	32	36	5	2500.00	paid	confirmed	2025-07-12 08:04:23.696759	2025-07-12 08:04:23.696759	3	1	\N	\N	\N	\N
53	32	25	4	2000.00	paid	confirmed	2025-07-12 08:48:51.236175	2025-07-12 08:48:51.236175	3	1	\N	\N	\N	\N
54	32	37	5	2500.00	paid	confirmed	2025-07-15 15:34:46.881426	2025-07-15 15:34:46.881426	3	1	\N	\N	\N	\N
55	32	38	3	1500.00	paid	confirmed	2025-07-15 15:35:10.03184	2025-07-15 15:35:10.03184	3	1	\N	\N	\N	\N
56	32	39	3	2997.00	paid	confirmed	2025-07-17 18:50:06.913252	2025-07-17 18:50:06.913252	3	1	\N	\N	\N	\N
65	32	49	3	1500.00	paid	confirmed	2025-07-28 11:06:10.934016	2025-07-28 11:06:10.934016	2	1	tompayan1710@gmail.com	Tom Payan	+33765594097	\N
70	32	53	3	1500.00	paid	confirmed	2025-07-28 13:46:51.575581	2025-07-28 13:46:51.575581	2	1	tompayan1710@gmail.com	Lacarte Céline	+33765594097	\N
75	32	58	4	2000.00	paid	confirmed	2025-07-28 15:00:37.526333	2025-07-28 15:00:37.526333	3	1	tompayan1710@gmail.com	Stylot	+33444444444	\N
57	32	40	3	4797.00	paid	confirmed	2025-07-23 16:31:20.363593	2025-07-23 16:31:20.363593	3	1	\N	\N	\N	\N
58	32	41	3	1500.00	paid	confirmed	2025-07-25 22:50:16.91027	2025-07-25 22:50:16.91027	3	1	\N	\N	\N	\N
59	41	24	3	1500.00	paid	confirmed	2025-07-25 23:48:06.321012	2025-07-25 23:48:06.321012	3	1	\N	\N	\N	\N
80	41	63	3	180.00	paid	confirmed	2025-07-29 07:45:30.865783	2025-07-29 07:45:30.865783	2	1	tompayan1710@gmail.com	Barquet	+33898989898	pi_3Rq6Le2f0HHvMFDt1OYrUaZ7
85	41	66	3	597.00	paid	confirmed	2025-07-29 10:34:53.598556	2025-07-29 10:34:53.598556	2	1	tompayan1710@gmail.com	Pochette	+33765594097	pi_3Rq8ze2f0HHvMFDt1Dsx45SK
90	41	70	4	796.00	paid	confirmed	2025-07-29 11:05:44.989784	2025-07-29 11:05:44.989784	2	2	tompayan1710@gmail.com	Combat	+33765594097	pi_3Rq9TS2f0HHvMFDt1xZk6d7j
95	41	74	3	597.00	paid	confirmed	2025-07-29 11:29:19.052571	2025-07-29 11:29:19.052571	2	1	tompayan1710@gmail.com	Ecran	+33765594097	pi_3Rq9qK2f0HHvMFDt0dyJewr8
100	41	79	3	180.00	paid	confirmed	2025-07-29 19:05:25.489678	2025-07-29 19:05:25.489678	2	1	tompayan1710@gmail.com	Empreinte	+33765594097	pi_3RqGxh2f0HHvMFDt1JWeeWWp
105	41	72	1	999.00	paid	confirmed	2025-07-29 22:03:21.729018	2025-07-29 22:03:21.729018	1	0	tompayan1710@gmail.com	Tom Payan	+33765594097	pi_3RqJjt2f0HHvMFDt180NJoAs
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, email, password, role, created_at, provider_id, provider, name, phone, profil_picture, receive_booking_emails, receive_activity_suggestions) FROM stdin;
38	lechatbigtom@gmail.com	$2b$10$2sy4avgaJoAaf3MFQEoLju/5/qaZuvKnifSvRd4vq4HEbdRh/xm86	member	2025-07-17 07:38:31.621378	\N	password-email	\N	\N	\N	t	t
39	testitest@gmail.com	$2b$10$tQnHU4fP1KateVIG/RFIM.XbDnKvjBxRy.p/CzyrWqRL67T6jvDti	member	2025-07-17 07:51:48.268333	\N	password-email	\N	\N	\N	t	t
40	ffisjfijs@gmail.com	$2b$10$jP3oPtnmGozTdndqb2WtuuQfxpY/7M3cuPlnY.qmv8mR6T383zc5.	member	2025-07-17 07:53:30.133655	\N	password-email	\N	\N	\N	t	t
1	tom@localspot.fr	hashed_password_placeholder	admin	2025-04-22 20:49:19.76597	\N	\N	\N	\N	\N	t	t
6	FSF@gmail.com	$2b$10$eEVbrXQa.vZ9C5Msr0YxM.bz0RU4eogOu2szwAetOFbw2yzWwhiJC	member	2025-05-08 07:34:13.938055	\N	\N	\N	\N	\N	t	t
7	exemple@gmail.com	$2b$10$GiphyRWFGxjeBhdPdT3HV.s4Rq/J137vl7uLWQMHdBEgLlqRJswkW	member	2025-05-08 07:40:09.272636	\N	\N	\N	\N	\N	t	t
8	test@gmail.com	$2b$10$C8dtvNSijBZ34j9SSRSuFe002s2Rym0.PFq3lB3FsFUM8oSZlnQfe	member	2025-05-08 07:41:20.065282	\N	\N	\N	\N	\N	t	t
9	tomtest@gmail.com	$2b$10$sTEwerl97nw0TIejTnYfZOcpfdhyZ0v.2H4QCF.rN.SNIbyai9wem	member	2025-05-08 08:12:26.501359	\N	\N	\N	\N	\N	t	t
10	tomchat@gmail.com	$2b$10$y2F.Cg01CGRGa49zt/l8AeP9tk327r65999jgzfUxDScV5ybhOi72	member	2025-05-08 10:01:51.173949	\N	\N	\N	\N	\N	t	t
11	tomchat2@gmail.com	$2b$10$efIe1JaYPQkWQ1m.EJ0.wuyLjtFuEFTszFabLgOfCRnwlv85SCefe	member	2025-05-08 10:04:06.732231	\N	\N	\N	\N	\N	t	t
14	tombigboss@gmail.com	$2b$10$QRSRoQtIdxPgneul5p/D2ekStxeC.eFZQFrH4J62w6StCi.24nt9y	member	2025-05-10 17:07:08.695414	\N	\N	\N	\N	\N	t	t
16	lechateau@gmail.com	$2b$10$r.pjgoOWw1Ne8FqlPx3UJeTHL/6DbmnAtneGvdw4KZ2W0Bo96fiWa	member	2025-05-10 17:13:27.736425	\N	\N	\N	\N	\N	t	t
18	echo@gmail.com	$2b$10$V/8nkVbBuPFCIjGRg3HDxeDPYmQxQZmNXc/sVh.4x.KEtXtQG/Vqu	member	2025-05-10 17:17:26.635492	\N	\N	\N	\N	\N	t	t
19	ecole@gmail.com	$2b$10$s9T0emPWvdMupsXfmKuq5OnV6Rvu1iOzoxWNQGA5lnr5vnvbDa1K6	member	2025-05-10 17:19:42.654329	\N	\N	\N	\N	\N	t	t
26	lolita@gmail.com	$2b$10$YKmtkhg8AI4pDms9makOAOtYJ4gqezoIsxTRaiyEBYmegu9ttZDAi	member	2025-05-11 09:13:38.598332	\N	\N	\N	\N	\N	t	t
27	lolo@gmail.com	$2b$10$ScmAqWWPk1JlO9UZ3dJip.CDq7DASk3HYmZhb.h7sh6KBIbvYyr/u	member	2025-05-11 09:18:14.548882	\N	\N	\N	\N	\N	t	t
28	lilarilo@gmail.com	$2b$10$cb3HXsqPxACIfqQUg/CMc.NjP123G24K/1yGZQDs68x9tjMbeO6ym	member	2025-05-11 09:42:59.848526	\N	\N	\N	\N	\N	t	t
33	lebigtom@gmail.com	$2b$10$2ntO/mTH9Ztao/rOdrr7w.Vqsx7qwLHh4TAurBssYYiXY9gdXYhXK	member	2025-06-13 10:07:27.823409	\N	password-email	\N	\N	\N	t	t
34	t23590527@gmail.com	\N	member	2025-06-29 21:08:59.068803	6	google	\N	\N	\N	t	t
35	tomtestmdp@gmail.com	$2b$10$l6kSTrXpmAFjWZzokwpInODDGxrGrTagP4XIYBf3Vg/Uq5KQMyO8i	member	2025-07-16 23:14:20.301282	\N	password-email	\N	\N	\N	t	t
36	lebigtom2@gmail.com	$2b$10$OXiZ9jGDa0qzJBOsrjdH2eQVL2WgfNAQdFrVUX2QDEr0.WOloxn5G	member	2025-07-17 07:23:50.594806	\N	password-email	\N	\N	\N	t	t
37	lebigtom3@gmail.com	$2b$10$JPBOkjvDUmeB4Y.PiB2Q1.o8WTEs6zAv3JmlYKISNs8Tk8FSZJYx.	member	2025-07-17 07:29:07.522063	\N	password-email	\N	\N	\N	t	t
41	tomchat10@gmail.com	$2b$10$fpnHV0vQqTsmo.d3FBG5yejhd6dLGDR8yvvnFRHaUL6ioyrbz03AW	member	2025-07-20 09:16:29.345317	\N	password-email	Payan Tom Manua234	+33765704097	https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/profil-picture/user_41_1753862811771.jpg	f	f
42	sapiens@gmail.com	$2b$10$UmaAP3yz6I.uEEmGnjn2bueaKSXk03az.xVH8CRM/P40YZhdaytva	member	2025-07-30 10:20:12.208764	\N	password-email	Saplins	+3355555555555	https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/profil-picture/user_42_1753991023778.png	t	t
32	tompayan1710@gmail.com	\N	member	2025-05-11 17:20:09.47826	5	google	Tom Payan	+33121212222	https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/profil-picture/user_32_1753952824665.jpg	t	t
60	t07677974@gmail.com	\N	member	2025-08-02 16:22:03.400219	\N	google	\N	\N	\N	t	t
\.


--
-- Data for Name: withdrawal_methods; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.withdrawal_methods (id, provider_id, method, iban, swift, first_name, last_name, paypal_email, created_at) FROM stdin;
21	5	iban	COORDE	\N	tim	2222	\N	2025-08-08 15:09:29.566883
\.


--
-- Data for Name: withdrawals; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.withdrawals (id, provider_id, amount, method, details, status, created_at, iban, swift, first_name, last_name, paypal_email) FROM stdin;
1	5	300.00	virement bancaire	Retrait vers IBAN FR7630006000011234567890189	completed	2025-08-04 13:30:48.970226	\N	\N	\N	\N	\N
2	5	30000.00	iban	Retrait vers IBAN FR7630006000011234567890189	waiting	2025-08-07 13:28:26.669317	\N	\N	\N	\N	\N
7	5	500.00	iban	Demande de versement par IBAN 	waiting	2025-08-07 15:31:05.056755	CLARACHIANTAVECTEL	\N	PAYAN	Tom	
8	5	500.00	iban	Demande de versement par IBAN 	waiting	2025-08-07 15:36:06.033009	CLARACHIANTAVECTEL	\N	PAYAN	Tom	
9	5	100.00	iban	Demande de versement par IBAN 	waiting	2025-08-07 15:44:25.814183	CLARACHIANTAVECTEL	\N	PAYAN	Tom	
10	5	2222.00	IBAN	Demande de versement par IBAN 	waiting	2025-08-08 15:11:58.614982	COORDE	\N	\N	2222	
11	5	1000.00	IBAN	Demande de versement par IBAN 	waiting	2025-08-08 15:34:25.602443	COORDE	\N	tim	2222	
12	5	999.00	IBAN	Demande de versement par IBAN 	waiting	2025-08-08 15:35:17.94692	COORDE	\N	tim	2222	
13	5	555.58	IBAN	Demande de versement par IBAN 	waiting	2025-08-08 15:36:15.881282	COORDE	\N	tim	2222	
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

SELECT pg_catalog.setval('public.cities_id_seq', 19, true);


--
-- Name: comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.comments_id_seq', 1, false);


--
-- Name: departments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.departments_id_seq', 19, true);


--
-- Name: favorites_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.favorites_id_seq', 1, true);


--
-- Name: hotes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.hotes_id_seq', 3, true);


--
-- Name: invitation_tokens_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.invitation_tokens_id_seq', 12, true);


--
-- Name: offer_cancel_slots_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.offer_cancel_slots_id_seq', 65, true);


--
-- Name: offer_exceptional_slots_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.offer_exceptional_slots_id_seq', 15, true);


--
-- Name: offer_recurring_slots_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.offer_recurring_slots_id_seq', 50, true);


--
-- Name: offers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.offers_id_seq', 35, true);


--
-- Name: provider_booking_integrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.provider_booking_integrations_id_seq', 6, true);


--
-- Name: providers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.providers_id_seq', 8, true);


--
-- Name: qr_codes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.qr_codes_id_seq', 58, true);


--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.refresh_tokens_id_seq', 297, true);


--
-- Name: reservation_slots_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reservation_slots_id_seq', 84, true);


--
-- Name: reservations_creneaux_google_calendar_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reservations_creneaux_google_calendar_id_seq', 19, true);


--
-- Name: reservations_individuals_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reservations_individuals_id_seq', 107, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 60, true);


--
-- Name: withdrawal_methods_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.withdrawal_methods_id_seq', 21, true);


--
-- Name: withdrawals_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.withdrawals_id_seq', 13, true);


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
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);


--
-- Name: comments comments_reservation_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_reservation_id_key UNIQUE (reservation_id);


--
-- Name: departments departments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.departments
    ADD CONSTRAINT departments_pkey PRIMARY KEY (id);


--
-- Name: favorites favorites_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favorites
    ADD CONSTRAINT favorites_pkey PRIMARY KEY (id);


--
-- Name: hotes hotes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hotes
    ADD CONSTRAINT hotes_pkey PRIMARY KEY (id);


--
-- Name: invitation_tokens invitation_tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.invitation_tokens
    ADD CONSTRAINT invitation_tokens_pkey PRIMARY KEY (id);


--
-- Name: invitation_tokens invitation_tokens_token_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.invitation_tokens
    ADD CONSTRAINT invitation_tokens_token_key UNIQUE (invitation_token);


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
-- Name: withdrawal_methods withdrawal_methods_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.withdrawal_methods
    ADD CONSTRAINT withdrawal_methods_pkey PRIMARY KEY (id);


--
-- Name: withdrawals withdrawals_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.withdrawals
    ADD CONSTRAINT withdrawals_pkey PRIMARY KEY (id);


--
-- Name: cities cities_department_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cities
    ADD CONSTRAINT cities_department_id_fkey FOREIGN KEY (department_id) REFERENCES public.departments(id);


--
-- Name: comments comments_offer_slug_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_offer_slug_fkey FOREIGN KEY (offer_slug) REFERENCES public.offers(slug) ON DELETE CASCADE;


--
-- Name: comments comments_reservation_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_reservation_id_fkey FOREIGN KEY (reservation_id) REFERENCES public.reservations_individuals(id) ON DELETE CASCADE;


--
-- Name: comments comments_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: favorites favorites_offer_slug_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favorites
    ADD CONSTRAINT favorites_offer_slug_fkey FOREIGN KEY (offer_slug) REFERENCES public.offers(slug) ON DELETE CASCADE;


--
-- Name: favorites favorites_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favorites
    ADD CONSTRAINT favorites_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: hotes hotes_city_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hotes
    ADD CONSTRAINT hotes_city_id_fkey FOREIGN KEY (city_id) REFERENCES public.cities(id);


--
-- Name: invitation_tokens invitation_tokens_provider_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.invitation_tokens
    ADD CONSTRAINT invitation_tokens_provider_id_fkey FOREIGN KEY (provider_id) REFERENCES public.providers(id) ON DELETE CASCADE;


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
-- Name: withdrawal_methods withdrawal_methods_provider_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.withdrawal_methods
    ADD CONSTRAINT withdrawal_methods_provider_id_fkey FOREIGN KEY (provider_id) REFERENCES public.providers(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

