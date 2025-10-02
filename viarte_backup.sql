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
    reservation_id integer NOT NULL,
    comment text,
    created_at timestamp without time zone DEFAULT now(),
    rating numeric(2,1),
    comment_i18n jsonb,
    offer_slug text
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
-- Name: offer_pricing; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.offer_pricing (
    id integer NOT NULL,
    offer_slug text NOT NULL,
    band_type character varying(100) NOT NULL,
    age_min integer,
    age_max integer,
    price numeric(10,2) NOT NULL,
    currency character varying(10) DEFAULT 'EUR'::character varying NOT NULL,
    counts_toward_capacity boolean DEFAULT true NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT offer_price_bands_check CHECK (((age_min IS NULL) OR (age_max IS NULL) OR (age_min <= age_max)))
);


ALTER TABLE public.offer_pricing OWNER TO postgres;

--
-- Name: offer_price_bands_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.offer_price_bands_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.offer_price_bands_id_seq OWNER TO postgres;

--
-- Name: offer_price_bands_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.offer_price_bands_id_seq OWNED BY public.offer_pricing.id;


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
    slug text,
    cancellable boolean DEFAULT false,
    total_capacity integer,
    title_i18n jsonb DEFAULT '{}'::jsonb NOT NULL,
    description_i18n jsonb DEFAULT '{}'::jsonb NOT NULL,
    departement_id integer,
    offer_pricing_adult integer,
    offer_pricing_child integer,
    offer_pricing_infant integer
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
    image_url text,
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
    status character varying(50) DEFAULT 'available'::character varying,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now(),
    hotel_commission_total numeric(15,2) DEFAULT 0 NOT NULL,
    platform_commission_total numeric(15,2) DEFAULT 0 NOT NULL,
    net_amount_total numeric(15,2) DEFAULT 0 NOT NULL,
    gross_amount_total numeric(15,2) DEFAULT 0 NOT NULL
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
    total_places_used integer NOT NULL,
    payment_status character varying(50) DEFAULT 'unpaid'::character varying,
    reservation_status character varying(50) DEFAULT 'pending'::character varying,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now(),
    email text,
    name character varying(100),
    phone character varying(100),
    stripe_payment_intent_id text,
    hotel_commission numeric(15,2) DEFAULT 0 NOT NULL,
    platform_commission numeric(15,2) DEFAULT 0 NOT NULL,
    net_amount numeric(15,2) DEFAULT 0 NOT NULL,
    gross_amount numeric(15,2) DEFAULT 0 NOT NULL,
    id_hote integer,
    nb_child integer,
    nb_infant integer,
    unit_price_adult numeric(10,2),
    unit_price_child numeric(10,2),
    unit_price_infant numeric(10,2),
    nb_adult integer,
    token_validate text,
    comment_id integer
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
    paypal_email text,
    sent_at timestamp without time zone
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
-- Name: offer_pricing id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.offer_pricing ALTER COLUMN id SET DEFAULT nextval('public.offer_price_bands_id_seq'::regclass);


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
\.


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categories (id, name) FROM stdin;
\.


--
-- Data for Name: cities; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cities (id, name, department_id) FROM stdin;
20	Antibes	20
21	Nice	20
22	Saint-Vallier-de-Thiey	20
23	Monaco	21
24	Cannes	20
25	Saint-Jean-Cap-Ferrat	20
26	Cabris	20
27	Mons	22
28	tahiti	\N
\.


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.comments (id, user_id, reservation_id, comment, created_at, rating, comment_i18n, offer_slug) FROM stdin;
13	64	137	Je teste le nombre d'étoile\n	2025-09-11 16:11:02.830986	5.0	{"en": "I test the number of stars\\n", "fr": "Je teste le nombre d'étoile\\n"}	49eda54a-a544-4fd6-91ce-9bcddcfaa20a
\.


--
-- Data for Name: departments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.departments (id, name) FROM stdin;
20	Alpes-Maritimes
21	default
22	Var
\.


--
-- Data for Name: favorites; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.favorites (id, user_id, offer_slug, created_at) FROM stdin;
2	64	49eda54a-a544-4fd6-91ce-9bcddcfaa20a	2025-08-10 17:08:57.102845
\.


--
-- Data for Name: hotes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.hotes (id, name, location, type, created_at, updated_at, latitude, longitude, city_id, img) FROM stdin;
4	Hôtel Juana	19 Av. Georges Gallice, 06160 Antibes	Hôtel	2025-08-10 16:19:31.942611	2025-08-10 16:19:31.942611	43.567945	7.11491	20	https://cf.bstatic.com/xdata/images/hotel/max1024x768/27032480.jpg?k=b4c35a05b5abef066ba3d5064004b228a47b54b90ca3df4441fbfa820dc5f546&o=
\.


--
-- Data for Name: invitation_tokens; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.invitation_tokens (id, invitation_token, provider_id, created_at, expires_at, used_at, is_used) FROM stdin;
\.


--
-- Data for Name: offer_cancel_slots; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.offer_cancel_slots (id, slug_offer, date, slots, created_at) FROM stdin;
\.


--
-- Data for Name: offer_exceptional_slots; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.offer_exceptional_slots (id, slug_offer, date, slots, created_at) FROM stdin;
\.


--
-- Data for Name: offer_pricing; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.offer_pricing (id, offer_slug, band_type, age_min, age_max, price, currency, counts_toward_capacity, created_at) FROM stdin;
7	49eda54a-a544-4fd6-91ce-9bcddcfaa20a	adult	18	\N	110.00	EUR	t	2025-09-07 16:22:26.242726+02
8	49eda54a-a544-4fd6-91ce-9bcddcfaa20a	child	5	17	80.00	EUR	t	2025-09-07 16:22:26.242726+02
9	49eda54a-a544-4fd6-91ce-9bcddcfaa20a	infant	0	4	0.00	EUR	f	2025-09-07 16:22:26.242726+02
\.


--
-- Data for Name: offer_recurring_slots; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.offer_recurring_slots (id, slug_offer, day_of_week, slots, created_at) FROM stdin;
51	7a9a4e06-f6e9-4f3b-ba91-662f7cb41221	monday	{{07:00:00,09:00:00},{09:30:00,11:30:00}}	2025-08-10 07:48:07.111632
52	7a9a4e06-f6e9-4f3b-ba91-662f7cb41221	tuesday	{{12:30:00,14:30:00},{15:00:00,17:30:00}}	2025-08-10 07:48:07.118569
53	7a9a4e06-f6e9-4f3b-ba91-662f7cb41221	wednesday	{{08:00:00,10:00:00},{10:30:00,12:30:00}}	2025-08-10 07:48:07.120722
54	7a9a4e06-f6e9-4f3b-ba91-662f7cb41221	friday	{{08:00:00,10:00:00},{10:30:00,12:30:00},{13:30:00,15:30:00},{16:00:00,18:00:00}}	2025-08-10 07:48:07.122434
65	df967527-d527-4569-ad3c-29c3fee4d776	monday	{{08:00:00,10:00:00},{10:00:00,12:00:00},{13:00:00,15:00:00},{15:00:00,17:00:00}}	2025-08-10 11:37:49.37892
66	df967527-d527-4569-ad3c-29c3fee4d776	wednesday	{{08:00:00,10:00:00},{10:00:00,12:00:00},{13:00:00,15:00:00},{15:00:00,17:00:00}}	2025-08-10 11:37:49.394392
67	df967527-d527-4569-ad3c-29c3fee4d776	thursday	{{08:00:00,10:00:00},{10:00:00,12:00:00}}	2025-08-10 11:37:49.39854
68	df967527-d527-4569-ad3c-29c3fee4d776	friday	{{12:00:00,14:00:00},{14:00:00,16:00:00},{16:00:00,18:00:00},{18:00:00,19:00:00}}	2025-08-10 11:37:49.401965
69	df967527-d527-4569-ad3c-29c3fee4d776	saturday	{{08:00:00,10:00:00},{10:00:00,12:00:00},{13:00:00,15:00:00},{15:00:00,17:00:00}}	2025-08-10 11:37:49.405108
70	df967527-d527-4569-ad3c-29c3fee4d776	sunday	{{08:00:00,10:00:00},{10:00:00,12:00:00},{13:00:00,15:00:00},{15:00:00,17:00:00}}	2025-08-10 11:38:41.978027
60	74f6b045-22cd-4461-bdab-78cef2b0edf9	monday	{{09:00:00,10:00:00},{10:00:00,11:00:00},{11:00:00,12:00:00},{13:00:00,14:00:00},{14:00:00,15:00:00},{15:00:00,16:00:00}}	2025-08-10 11:30:28.023787
61	74f6b045-22cd-4461-bdab-78cef2b0edf9	tuesday	{{07:00:00,08:00:00},{08:00:00,09:00:00},{09:00:00,10:00:00},{12:00:00,14:00:00},{14:00:00,15:00:00},{15:00:00,16:00:00}}	2025-08-10 11:30:28.029475
62	74f6b045-22cd-4461-bdab-78cef2b0edf9	thursday	{{12:00:00,13:00:00},{13:00:00,14:00:00},{14:00:00,15:00:00},{15:00:00,16:00:00},{16:00:00,17:00:00}}	2025-08-10 11:30:28.03387
63	74f6b045-22cd-4461-bdab-78cef2b0edf9	friday	{{07:00:00,08:00:00},{08:00:00,09:00:00},{09:00:00,10:00:00},{10:00:00,11:00:00},{13:00:00,14:00:00},{14:00:00,15:00:00},{15:00:00,16:00:00}}	2025-08-10 11:30:28.036751
64	74f6b045-22cd-4461-bdab-78cef2b0edf9	saturday	{{07:00:00,08:00:00},{08:00:00,09:00:00},{09:00:00,10:00:00},{10:00:00,11:00:00},{14:00:00,15:00:00},{15:00:00,16:00:00},{16:00:00,17:00:00}}	2025-08-10 11:30:28.040345
71	74f6b045-22cd-4461-bdab-78cef2b0edf9	sunday	{{08:00:00,09:00:00},{09:00:00,10:00:00},{10:00:00,11:00:00},{11:00:00,12:00:00},{13:00:00,14:00:00},{14:00:00,15:00:00},{15:00:00,16:00:00},{16:00:00,17:00:00}}	2025-08-10 11:39:40.359725
55	863fbf94-7e75-4c8e-8d74-654e7d6a7394	monday	{{08:00:00,12:00:00},{13:00:00,17:00:00}}	2025-08-10 08:04:03.155781
56	863fbf94-7e75-4c8e-8d74-654e7d6a7394	tuesday	{{08:00:00,12:00:00},{13:00:00,17:00:00}}	2025-08-10 08:04:03.166232
57	863fbf94-7e75-4c8e-8d74-654e7d6a7394	wednesday	{{08:00:00,12:00:00}}	2025-08-10 08:04:03.169421
58	863fbf94-7e75-4c8e-8d74-654e7d6a7394	thursday	{{08:00:00,12:00:00},{13:00:00,17:00:00}}	2025-08-10 08:04:03.172152
59	863fbf94-7e75-4c8e-8d74-654e7d6a7394	friday	{{13:00:00,17:00:00}}	2025-08-10 08:04:03.174821
72	863fbf94-7e75-4c8e-8d74-654e7d6a7394	sunday	{{08:00:00,12:00:00},{13:00:00,17:00:00}}	2025-08-10 11:40:38.83743
73	9630f266-e89f-4ebf-b5f6-88801cb1f07b	monday	{{10:00:00,12:00:00},{13:00:00,15:00:00},{15:00:00,17:00:00}}	2025-08-10 12:59:41.969939
74	9630f266-e89f-4ebf-b5f6-88801cb1f07b	wednesday	{{15:00:00,17:00:00}}	2025-08-10 12:59:41.97762
75	9630f266-e89f-4ebf-b5f6-88801cb1f07b	thursday	{{08:00:00,10:00:00},{10:00:00,12:00:00},{13:00:00,15:00:00},{15:00:00,17:00:00}}	2025-08-10 12:59:41.981536
76	9630f266-e89f-4ebf-b5f6-88801cb1f07b	friday	{{08:00:00,10:00:00},{10:00:00,12:00:00},{13:00:00,15:00:00},{15:00:00,17:00:00}}	2025-08-10 12:59:41.983268
77	9630f266-e89f-4ebf-b5f6-88801cb1f07b	saturday	{{10:00:00,12:00:00},{13:00:00,15:00:00},{15:00:00,17:00:00}}	2025-08-10 12:59:41.984886
78	9630f266-e89f-4ebf-b5f6-88801cb1f07b	sunday	{{08:00:00,10:00:00},{10:00:00,12:00:00},{13:00:00,15:00:00},{15:00:00,17:00:00}}	2025-08-10 12:59:41.987014
80	5576bba5-c3d4-4ea7-b84f-d375e1d1e74f	tuesday	{{09:00:00,11:00:00},{12:00:00,14:00:00},{14:00:00,16:00:00}}	2025-08-10 13:14:16.320998
82	5576bba5-c3d4-4ea7-b84f-d375e1d1e74f	saturday	{{09:00:00,11:00:00},{11:00:00,13:00:00},{14:00:00,16:00:00}}	2025-08-10 13:14:16.326383
83	5576bba5-c3d4-4ea7-b84f-d375e1d1e74f	sunday	{{12:00:00,14:00:00},{14:00:00,16:00:00}}	2025-08-10 13:14:16.328726
96	2a18b701-7f45-4f76-b054-1717f0607657	monday	{{21:00:00,23:45:00}}	2025-08-10 15:43:44.022807
98	2a18b701-7f45-4f76-b054-1717f0607657	wednesday	{{21:00:00,23:45:00}}	2025-08-10 15:45:04.872348
84	3eda0f49-a01a-497b-b467-85eb149a8f90	monday	{{08:00:00,09:00:00},{09:00:00,10:00:00},{10:00:00,11:00:00},{12:00:00,13:00:00},{13:00:00,14:00:00},{14:00:00,15:00:00},{15:00:00,16:00:00}}	2025-08-10 13:26:57.785736
85	3eda0f49-a01a-497b-b467-85eb149a8f90	tuesday	{{13:00:00,14:00:00},{14:00:00,15:00:00},{15:00:00,16:00:00}}	2025-08-10 13:26:57.789926
86	3eda0f49-a01a-497b-b467-85eb149a8f90	wednesday	{{08:00:00,09:00:00},{09:00:00,10:00:00},{10:00:00,11:00:00},{11:00:00,12:00:00}}	2025-08-10 13:26:57.790919
87	3eda0f49-a01a-497b-b467-85eb149a8f90	friday	{{08:00:00,09:00:00},{09:00:00,10:00:00},{10:00:00,11:00:00},{12:00:00,13:00:00},{13:00:00,14:00:00},{14:00:00,15:00:00},{15:00:00,16:00:00}}	2025-08-10 13:26:57.792315
88	3eda0f49-a01a-497b-b467-85eb149a8f90	saturday	{{13:00:00,14:00:00},{14:00:00,15:00:00},{15:00:00,16:00:00}}	2025-08-10 13:26:57.793503
89	dd02dc00-21ae-4b82-934b-7a8b79f11e75	monday	{{19:00:00,21:00:00}}	2025-08-10 13:40:41.090559
90	dd02dc00-21ae-4b82-934b-7a8b79f11e75	tuesday	{{19:00:00,21:00:00}}	2025-08-10 13:40:41.098133
91	dd02dc00-21ae-4b82-934b-7a8b79f11e75	wednesday	{{19:00:00,21:00:00}}	2025-08-10 13:40:41.099852
92	dd02dc00-21ae-4b82-934b-7a8b79f11e75	thursday	{{19:00:00,21:00:00}}	2025-08-10 13:40:41.101724
93	dd02dc00-21ae-4b82-934b-7a8b79f11e75	friday	{{19:00:00,21:00:00}}	2025-08-10 13:40:41.104532
94	dd02dc00-21ae-4b82-934b-7a8b79f11e75	saturday	{{19:00:00,21:00:00}}	2025-08-10 13:40:41.106664
95	dd02dc00-21ae-4b82-934b-7a8b79f11e75	sunday	{{19:00:00,21:00:00}}	2025-08-10 13:40:41.108018
99	2a18b701-7f45-4f76-b054-1717f0607657	thursday	{{21:00:00,23:45:00}}	2025-08-10 15:45:04.875195
79	5576bba5-c3d4-4ea7-b84f-d375e1d1e74f	monday	{{09:00:00,11:00:00},{12:00:00,14:00:00},{14:00:00,16:00:00}}	2025-08-10 13:14:16.310532
103	996d438f-9637-4533-bae9-c4e84b5e8ef8	monday	{{08:00:00,10:00:00},{10:00:00,12:00:00},{13:00:00,15:00:00},{15:00:00,17:00:00}}	2025-08-10 15:51:16.51022
104	996d438f-9637-4533-bae9-c4e84b5e8ef8	tuesday	{{13:00:00,15:00:00},{15:00:00,17:00:00}}	2025-08-10 15:51:16.517778
105	996d438f-9637-4533-bae9-c4e84b5e8ef8	friday	{{08:00:00,10:00:00},{10:00:00,12:00:00},{13:00:00,15:00:00},{15:00:00,17:00:00}}	2025-08-10 15:51:16.519672
106	996d438f-9637-4533-bae9-c4e84b5e8ef8	saturday	{{15:00:00,17:00:00}}	2025-08-10 15:51:16.520887
107	996d438f-9637-4533-bae9-c4e84b5e8ef8	sunday	{{08:00:00,10:00:00},{10:00:00,12:00:00},{13:00:00,15:00:00},{15:00:00,17:00:00}}	2025-08-10 15:51:16.521854
108	49eda54a-a544-4fd6-91ce-9bcddcfaa20a	monday	{{07:00:00,09:00:00},{09:00:00,11:00:00},{12:00:00,14:00:00},{14:00:00,16:00:00}}	2025-08-10 15:57:08.406188
109	49eda54a-a544-4fd6-91ce-9bcddcfaa20a	tuesday	{{14:00:00,16:00:00}}	2025-08-10 15:57:08.414468
110	49eda54a-a544-4fd6-91ce-9bcddcfaa20a	wednesday	{{14:00:00,16:00:00}}	2025-08-10 15:57:08.416179
111	49eda54a-a544-4fd6-91ce-9bcddcfaa20a	saturday	{{07:00:00,09:00:00},{09:00:00,11:00:00},{11:00:00,13:00:00},{14:00:00,16:00:00}}	2025-08-10 15:57:08.41756
112	49eda54a-a544-4fd6-91ce-9bcddcfaa20a	sunday	{{07:00:00,09:00:00},{09:00:00,11:00:00},{11:00:00,13:00:00},{14:00:00,16:00:00}}	2025-08-10 15:57:08.418715
120	5576bba5-c3d4-4ea7-b84f-d375e1d1e74f	wednesday	{{08:00:00,10:00:00},{10:00:00,12:00:00},{13:00:00,15:00:00},{15:00:00,17:00:00}}	2025-08-10 18:52:33.980695
81	5576bba5-c3d4-4ea7-b84f-d375e1d1e74f	friday	{{09:00:00,11:00:00},{12:00:00,14:00:00},{14:00:00,16:00:00}}	2025-08-10 13:14:16.323905
121	2a18b701-7f45-4f76-b054-1717f0607657	tuesday	{{21:00:00,23:45:00}}	2025-08-10 19:02:36.099772
100	2a18b701-7f45-4f76-b054-1717f0607657	friday	{{21:00:00,23:45:00}}	2025-08-10 15:45:04.87647
101	2a18b701-7f45-4f76-b054-1717f0607657	saturday	{{21:00:00,23:45:00}}	2025-08-10 15:45:04.878525
102	2a18b701-7f45-4f76-b054-1717f0607657	sunday	{{21:00:00,23:45:00}}	2025-08-10 15:45:04.879612
113	707e33f2-9c58-4e44-aea1-a9d83dc6def1	monday	{{10:00:00,14:00:00},{18:00:00,22:00:00}}	2025-08-10 16:04:40.450639
114	707e33f2-9c58-4e44-aea1-a9d83dc6def1	tuesday	{{10:00:00,14:00:00},{14:00:00,18:00:00},{18:00:00,22:00:00}}	2025-08-10 16:04:40.458476
122	707e33f2-9c58-4e44-aea1-a9d83dc6def1	wednesday	{{18:00:00,22:00:00}}	2025-08-10 19:03:20.513675
123	707e33f2-9c58-4e44-aea1-a9d83dc6def1	thursday	{{18:00:00,22:00:00}}	2025-08-10 19:03:20.515879
115	707e33f2-9c58-4e44-aea1-a9d83dc6def1	friday	{{10:00:00,14:00:00},{14:00:00,18:00:00},{18:00:00,22:00:00}}	2025-08-10 16:04:40.460108
116	707e33f2-9c58-4e44-aea1-a9d83dc6def1	saturday	{{18:00:00,22:00:00}}	2025-08-10 16:04:40.461293
119	707e33f2-9c58-4e44-aea1-a9d83dc6def1	sunday	{{14:00:00,18:00:00},{18:00:00,22:00:00}}	2025-08-10 18:49:36.18918
124	7bdf044f-eeae-4348-81aa-3e1db365b5d8	monday	{{12:00:00,12:30:00},{12:30:00,13:00:00},{13:30:00,14:30:00},{15:00:00,15:30:00},{16:00:00,16:30:00}}	2025-08-11 00:43:30.837731
125	7bdf044f-eeae-4348-81aa-3e1db365b5d8	tuesday	{{12:00:00,12:30:00},{13:00:00,13:30:00},{14:00:00,14:30:00},{15:00:00,15:30:00},{16:00:00,16:30:00}}	2025-08-11 00:43:30.850487
126	7bdf044f-eeae-4348-81aa-3e1db365b5d8	wednesday	{{08:00:00,08:30:00},{09:00:00,09:30:00},{10:00:00,10:30:00},{11:00:00,11:30:00},{12:00:00,12:30:00}}	2025-08-11 00:43:30.852987
127	7bdf044f-eeae-4348-81aa-3e1db365b5d8	thursday	{{08:00:00,08:30:00},{09:00:00,09:30:00},{10:00:00,10:30:00},{11:00:00,11:30:00},{12:00:00,12:30:00}}	2025-08-11 00:43:30.863099
128	7bdf044f-eeae-4348-81aa-3e1db365b5d8	friday	{{12:00:00,12:30:00},{13:00:00,13:30:00},{14:00:00,14:30:00},{15:00:00,15:30:00},{16:00:00,16:30:00}}	2025-08-11 00:43:30.86764
129	7bdf044f-eeae-4348-81aa-3e1db365b5d8	saturday	{{12:00:00,12:30:00},{13:00:00,13:30:00},{14:00:00,14:30:00},{15:00:00,15:30:00},{16:00:00,16:30:00}}	2025-08-11 00:43:30.871127
130	7bdf044f-eeae-4348-81aa-3e1db365b5d8	sunday	{{08:00:00,08:30:00},{09:00:00,09:30:00},{10:00:00,10:30:00},{11:00:00,11:30:00},{12:00:00,12:30:00}}	2025-08-11 00:43:30.874173
131	1a8f9da0-2c6f-4c75-b7a3-ff7973d976fb	monday	{{07:00:00,08:00:00}}	2025-08-27 09:51:19.997523
\.


--
-- Data for Name: offers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.offers (id, title, description, type, price, image_urls, created_at, updated_at, provider_id, latitude, longitude, city_id, adresse, categories, priceper, duration, slug, cancellable, total_capacity, title_i18n, description_i18n, departement_id, offer_pricing_adult, offer_pricing_child, offer_pricing_infant) FROM stdin;
41	Vol panoramique au-dessus de la Côte d’Azur	Envolez-vous pour un tour inoubliable en avion et admirez depuis le ciel les plages turquoise, les villes emblématiques et les paysages spectaculaires de la Côte d’Azur.\n	Activite	300.00	{https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1754823817701_15305892-86c3-4d18-8a4b-2880b2ded338.png,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1754823819251_be85b758-ee24-43ac-97cd-ad6ed301f31f.png,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1754823820414_eb3f00e3-a14c-4737-9772-aa7c2a92f020.png,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1754823821199_dd4bd889-c77a-4a34-b3a3-cb9f12425ac6.png}	2025-08-10 13:11:09.012414	2025-08-10 13:11:09.012414	11	43.5471788	6.9540077	24	245 Av. Francis Tonner, 06150 Cannes, France	{"Nature & Aventure","Culture & Patrimoine","En Famille"}	personne	2 h	5576bba5-c3d4-4ea7-b84f-d375e1d1e74f	t	3	{"en": "Panoramic flight over the Côte d'Azur", "fr": "Vol panoramique au-dessus de la Côte d’Azur"}	{"en": "Take to the skies for an unforgettable aerial tour of the Côte d'Azur's turquoise beaches, iconic towns and spectacular scenery.", "fr": "Envolez-vous pour un tour inoubliable en avion et admirez depuis le ciel les plages turquoise, les villes emblématiques et les paysages spectaculaires de la Côte d’Azur.\\n"}	\N	\N	\N	\N
36	Exploration des fonds d’Antibes en scooter sous-marin	Vivez une expérience unique en découvrant la faune et les paysages marins d’Antibes grâce à un scooter sous-marin, dans une eau cristalline.	Activite	30.00	{https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1754804298372_caption_1.jpg,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1754804298979_caption_5.jpg,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1754804299256_caption_2.jpg,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1754804299544_caption_3.jpg,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1754804299750_caption.jpg}	2025-08-10 07:45:00.313317	2025-08-10 07:45:00.313317	11	43.58541750000001	7.1271802	20	Av. de Verdun, 06600 Antibes, France	{Nautiques,"Nature & Aventure","Loisirs & Divertissement"}	personne	2 h	7a9a4e06-f6e9-4f3b-ba91-662f7cb41221	t	5	{"en": "Explore Antibes’ seabed on an underwater scooter", "fr": "Exploration des fonds d’Antibes en scooter sous-marin"}	{"en": "Experience a unique adventure discovering Antibes’ marine life and scenery on an underwater scooter, in crystal-clear water.", "fr": "Vivez une expérience unique en découvrant la faune et les paysages marins d’Antibes grâce à un scooter sous-marin, dans une eau cristalline."}	\N	\N	\N	\N
38	Dégustez l'armagnac d'excellence du Château Arton	Visite guidée et dégustation de la gamme d'armagnacs d'Arton, avec accords gourmands.\n	Activite	25.00	{https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1754818060503_f8b3cca7-7644-428e-86c7-f615a6d4a35b.avif,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1754818061132_ec889024-e9aa-4bc3-a0dc-10325312a109.avif,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1754818061417_a5212400-0cd5-49c0-85ff-b197a5f01222.avif,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1754818061634_dd399d36-09a7-474b-afe0-638cd41fd2f2.avif,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1754818061925_e84f0870-0159-4f1d-866b-28ea71bd1a7d.avif,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1754818062341_599ec26c-f7fb-466a-9b1b-cd105f7fe102.avif}	2025-08-10 11:28:26.937323	2025-08-10 11:28:26.937323	11	43.7014588	6.8438497	22	18 Chem. de la Siagne, 06460 Saint-Vallier-de-Thiey, France	{"Nature & Aventure","Culture & Patrimoine","En Famille"}	personne	1 h	74f6b045-22cd-4461-bdab-78cef2b0edf9	t	10	{"en": "Taste the finest armagnac from Château Arton", "fr": "Dégustez l'armagnac d'excellence du Château Arton"}	{"en": "Guided tour and tasting of Arton's range of armagnacs, with gourmet pairings.", "fr": "Visite guidée et dégustation de la gamme d'armagnacs d'Arton, avec accords gourmands.\\n"}	\N	\N	\N	\N
44	Soirée festive au La Siesta Beach Club	Passez une soirée inoubliable les pieds dans le sable au La Siesta Beach Club, entre dîner gourmand, ambiance dansante et vue imprenable sur la mer.	Activite	45.00	{https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1754833249623_piste-de-danse-a-ciel.jpg,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1754833250410_4-feux-d-artifice-par.jpg,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1754833250781_un-cadre-idyllique-credit.jpg,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1754833251107_champagne-credit-photo.jpg,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1754833251292_l-enseigne-de-1960-credit.jpg,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1754833251528_musique-live-credit-photo.jpg,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1754833251811_pizza-time-by-augusto.jpg,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1754833252014_vue-aerienne-credit-photo.jpg}	2025-08-10 15:43:12.075384	2025-08-10 15:43:12.075384	11	43.60924874992995	7.126164665913026	20	5 Rte du Bord de Mer, 06600 Antibes, France	{"Loisirs & Divertissement"}	personne	2 h	2a18b701-7f45-4f76-b054-1717f0607657	t	20	{"en": "Festive evening at La Siesta Beach Club", "fr": "Soirée festive au La Siesta Beach Club"}	{"en": "Spend an unforgettable evening with your feet in the sand at La Siesta Beach Club, with gourmet dining, dancing and breathtaking sea views.", "fr": "Passez une soirée inoubliable les pieds dans le sable au La Siesta Beach Club, entre dîner gourmand, ambiance dansante et vue imprenable sur la mer."}	\N	\N	\N	\N
39	Explorez les calanques en kayak	Découvrez les calanques sauvages de la Côte Bleue en kayak de mer.	Activite	20.00	{https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1754818409410_229c67d0-80fc-4fa2-8afc-e51cd0a59d9b.png,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1754818413665_aa1aa723-6472-4cf0-a53c-3faf24481322.png,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1754818416426_9735be50-2507-4857-b593-b0a02b7ab62b.png,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1754818420161_daf28703-100d-4b83-aa10-0f44367f8b3e.png}	2025-08-10 11:34:35.291205	2025-08-10 11:34:35.291205	11	43.5891473	7.123715499999999	20	Port Vauban, Antibes, France	{"Nature & Aventure","Loisirs & Divertissement","En Famille",Nautiques}	personne	2 h	df967527-d527-4569-ad3c-29c3fee4d776	t	8	{"en": "Explore the calanques by kayak", "fr": "Explorez les calanques en kayak"}	{"en": "Discover the wild calanques of the Côte Bleue by sea kayak.", "fr": "Découvrez les calanques sauvages de la Côte Bleue en kayak de mer."}	\N	\N	\N	\N
53	Ceci est mon teste de traduction pour de l'anglais	Voici alors ma traduction de ma description de mon annonce	Activite	89.00	{https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1756280982754_wvsrp7fmqj65yhwm8c8g.webp}	2025-08-27 09:51:07.605596	2025-08-27 09:51:07.605596	11	43.69521442846294	7.2745155379062565	21	73 Quai des États-Unis, 06300 Nice, France	{Bien-être,"Loisirs & Divertissement"}	personne	4 h	1a8f9da0-2c6f-4c75-b7a3-ff7973d976fb	t	10	{"en": "This is my translation test for English", "fr": "Ceci est mon teste de traduction pour de l'anglais"}	{"en": "Here is my translation of my ad description", "fr": "Voici alors ma traduction de ma description de mon annonce"}	\N	\N	\N	\N
51	 Saut à l’élastique – Adrénaline et sensations fortes	Vivez une expérience unique de saut à l’élastique, alliant frisson et sécurité, encadrée par une équipe professionnelle pour un souvenir inoubliable.	Activite	110.00	{https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1754865238265_vp6i2bimqluuiev7slen.webp,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1754865239537_wvsrp7fmqj65yhwm8c8g.webp,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1754865240049_obod6xt0qdpj80j19uwc.jpg}	2025-08-11 00:34:45.334468	2025-08-11 00:34:45.334468	11	43.68039258631511	6.7387310186237315	27	414 Chem. des Gauds, 83440 Mons, France	{"Sports & Sensations Fortes","Nature & Aventure"}	personne	30 min	7bdf044f-eeae-4348-81aa-3e1db365b5d8	t	8	{"en": "Bungee jumping - Adrenalin and thrills", "fr": " Saut à l’élastique – Adrénaline et sensations fortes"}	{"en": "Enjoy a unique bungee jumping experience, combining thrills and safety, supervised by a professional team for an unforgettable experience.", "fr": "Vivez une expérience unique de saut à l’élastique, alliant frisson et sécurité, encadrée par une équipe professionnelle pour un souvenir inoubliable."}	\N	\N	\N	\N
37	Conduire un cabriolet d'Antibes à Monaco	Profitez de paysages époustouflants à bord d'un cabriolet électrique que vous conduisez et visitez des sites emblématiques.\n	Activite	60.00	{https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1754805515292_9bdee7b9-0322-4be4-a4b9-3eb442700c44.avif,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1754805516081_737110c7-a7c0-4636-bd9a-bfe3f0b0e47f.avif,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1754805516397_0b1a09f6-6a1f-4e86-8c26-5cc01871b51a.avif,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1754805516727_5c6bd7af-a6db-4404-8845-4d5353862748.avif}	2025-08-10 07:59:21.836325	2025-08-10 07:59:21.836325	11	43.579214	7.1204173	20	7 Bd du Président Wilson, 06160 Antibes, France	{"Loisirs & Divertissement","En Famille","Culture & Patrimoine"}	personne	4 h	863fbf94-7e75-4c8e-8d74-654e7d6a7394	t	7	{"en": "Driving a convertible from Antibes to Monaco", "fr": "Conduire un cabriolet d'Antibes à Monaco"}	{"en": "Enjoy breathtaking scenery aboard an electric convertible that you drive and visit iconic sites.", "fr": "Profitez de paysages époustouflants à bord d'un cabriolet électrique que vous conduisez et visitez des sites emblématiques.\\n"}	\N	\N	\N	\N
40	Visite immersive du Musée Océanographique de Monaco	Plongez au cœur des océans à travers des expositions interactives, aquariums spectaculaires et collections uniques, dans un cadre historique exceptionnel.	Activite	19.00	{https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1754823236615_59398a426569c.avif,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1754823237946_59398a4381422.avif,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1754823237230_59398a45a568d.avif,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1754823235548_628bb04346cdd.avif,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1754823237471_5cfa7d8ad10f6.avif,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1754823238249_d5cee73c3bb40f9340d24358e2c228d17d57cfd7964ae3e929366f6dcc639f33.webp,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1754823238661_d9681be538943003bd56bca7de139e358c461147f447bf73d567848efad4bf6d.webp,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1754823239069_b80d42873cba71e05668e3a710ac86a69e7f46ef5d69550e6c48c6f678074d90.avif}	2025-08-10 12:54:31.140508	2025-08-10 12:54:31.140508	11	43.7387464	7.4190935	23	Pont Sainte-Dévote Gare Sncf Monte Carlo, 98000 Monaco, France	{Nautiques,"En Famille","Culture & Patrimoine"}	personne	2 h	9630f266-e89f-4ebf-b5f6-88801cb1f07b	t	4	{"en": "Immersive tour of Monaco's Oceanographic Museum", "fr": "Visite immersive du Musée Océanographique de Monaco"}	{"en": "Plunge into the heart of the oceans through interactive exhibits, spectacular aquariums and unique collections, in an exceptional historic setting.", "fr": "Plongez au cœur des océans à travers des expositions interactives, aquariums spectaculaires et collections uniques, dans un cadre historique exceptionnel."}	\N	\N	\N	\N
47	Excursion en bateau privé avec coucher de soleil à Saint-Jea	Partez depuis Saint-Jean-Cap-Ferrat pour une croisière intime en bateau privé et savourez un coucher de soleil inoubliable sur les eaux scintillantes de la Méditerranée.	Activite	80.00	{https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1754834373016_93.jpg,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1754834373782_2b.jpg,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1754834374024_d0.jpg,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1754834374319_84.jpg,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1754834374623_b3.jpg,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1754834374855_4e.jpg,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1754834375088_1d.jpg,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1754834375270_22.jpg}	2025-08-10 16:02:02.613422	2025-08-10 16:02:02.613422	11	43.691135113959085	7.334417880682822	25	9 Port de Plaisance, 06230 Saint-Jean-Cap-Ferrat, France	{Nautiques,"Nature & Aventure","Culture & Patrimoine","Loisirs & Divertissement",Bien-être,"En Famille"}	personne	4 h	707e33f2-9c58-4e44-aea1-a9d83dc6def1	t	10	{"en": "Private sunset boat trip to Saint-Jea", "fr": "Excursion en bateau privé avec coucher de soleil à Saint-Jea"}	{"en": "Set sail from Saint-Jean-Cap-Ferrat for an intimate cruise on a private boat and enjoy an unforgettable sunset over the sparkling waters of the Mediterranean.", "fr": "Partez depuis Saint-Jean-Cap-Ferrat pour une croisière intime en bateau privé et savourez un coucher de soleil inoubliable sur les eaux scintillantes de la Méditerranée."}	\N	\N	\N	\N
45	Initiation au tour de potier avec Marguerite	Passez un moment créatif et convivial en façonnant vos propres pièces en argile aux côtés de Marguerite, passionnée et experte en poterie.	Activite	55.00	{https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1754833703888_lzywwaoa6hit4ml5eqnw.webp,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/996d438f-9637-4533-bae9-c4e84b5e8ef8-1754858957095.jpg,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/996d438f-9637-4533-bae9-c4e84b5e8ef8-1754858957853.jpg,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/996d438f-9637-4533-bae9-c4e84b5e8ef8-1754858958143.webp,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/996d438f-9637-4533-bae9-c4e84b5e8ef8-1754858958449.webp,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/996d438f-9637-4533-bae9-c4e84b5e8ef8-1754858958755.webp,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/996d438f-9637-4533-bae9-c4e84b5e8ef8-1754858959063.webp}	2025-08-10 15:49:05.923809	2025-08-10 15:49:05.923809	11	43.692827357347475	7.237479707488261	21	98 Bd Edouard Herriot, 06200 Nice, France	{"Loisirs & Divertissement",Bien-être,"En Famille"}	personne	2 h	996d438f-9637-4533-bae9-c4e84b5e8ef8	t	5	{"en": "Introduction to the potter's wheel with Marguerite", "fr": "Initiation au tour de potier avec Marguerite"}	{"en": "Spend a creative and convivial moment shaping your own clay pieces alongside Marguerite, a passionate pottery expert.", "fr": "Passez un moment créatif et convivial en façonnant vos propres pièces en argile aux côtés de Marguerite, passionnée et experte en poterie."}	\N	\N	\N	\N
43	Tour en bateau au coucher du soleil avec vin et collations	Mettez les voiles pour une superbe excursion en bateau au coucher du soleil le long de la Côte d'Azur. Savourez de délicieux en-cas, du vin et admirez la vue imprenable sur Saint Jean Cap Ferrat et Villefranche alors que le soleil descend sous l'horizon.	Activite	50.00	{https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1754825904545_1cdfe23280ff0788b604a205cbf10be0355f9f89acd0d56a40bc5907a2a7ad1c.avif,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1754825905170_0b955fb64bbdc8920af099386c56022ddb88085618ab168f3fd576e3298a655f.avif,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1754825905379_bad3130dd14b2406.webp,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1754825905568_c43c087da795919a21456de6de121776745b4a05534a0172d63ab014ad431572.avif,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1754825905743_9ec0b8c187a3da2012403efae35ea10ed60aa4a2c977b54ef1b97e31aab18f0b.avif}	2025-08-10 13:39:04.154338	2025-08-10 13:39:04.154338	11	43.696257	7.283544399999999	21	Quai Lunel, 06300 Nice, France	{Nautiques,"Nature & Aventure","En Famille",Bien-être,"Loisirs & Divertissement"}	personne	2 h	dd02dc00-21ae-4b82-934b-7a8b79f11e75	t	12	{"en": "Sunset boat tour with wine and snacks", "fr": "Tour en bateau au coucher du soleil avec vin et collations"}	{"en": "Set sail for a superb sunset boat trip along the Côte d'Azur. Enjoy delicious snacks, wine and breathtaking views of Saint Jean Cap Ferrat and Villefranche as the sun sinks below the horizon.", "fr": "Mettez les voiles pour une superbe excursion en bateau au coucher du soleil le long de la Côte d'Azur. Savourez de délicieux en-cas, du vin et admirez la vue imprenable sur Saint Jean Cap Ferrat et Villefranche alors que le soleil descend sous l'horizon."}	\N	\N	\N	\N
42	Explorez Nice en Segway	Découvrez les trésors cachés de Nice en Segway en seulement une heure.\n	Activite	20.00	{https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1754825010108_7b293cb7-4b23-47c0-8370-dd19c415fa66.avif,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1754825010882_777c2eec-4914-421c-bdc5-138823cfd605.avif,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1754825011497_a8be36cc-5eac-45de-b2d4-d03330d46a88.avif,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1754825012061_d667b4af-4498-4584-9f62-cbc161d494fd.avif,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1754825012400_Sugway.avif,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1754825012764_f37dd540-3685-40c0-bf30-3b922b25c47e.avif}	2025-08-10 13:24:05.292221	2025-08-10 13:24:05.292221	11	43.6937671	7.2549728	21	63 Prom. des Anglais, 06000 Nice, France	{"Culture & Patrimoine","En Famille","Loisirs & Divertissement"}	personne	1 h	3eda0f49-a01a-497b-b467-85eb149a8f90	t	10	{"en": "Explore Nice by Segway", "fr": "Explorez Nice en Segway"}	{"en": "Discover Nice's hidden treasures by Segway in just one hour.", "fr": "Découvrez les trésors cachés de Nice en Segway en seulement une heure.\\n"}	\N	\N	\N	\N
54	tom	desc	Activite	20.00	{https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1754833249623_piste-de-danse-a-ciel.jpg}	2025-08-30 20:19:49.370557	2025-08-30 20:19:49.370557	11	43.45453	7.27343	\N	04 place godeau	{"Loisirs & Divertissement",Bien-être,"En Famille"}	personne	2 h	fsofsfsfs	t	10	{"en": "Festive evening at La Siesta Beach Club", "fr": "Soirée festive au La Siesta Beach Club"}	{"en": "Spend an unforgettable evening with your feet in the sand at La Siesta Beach Club, with gourmet dining, dancing and breathtaking sea views.", "fr": "Passez une soirée inoubliable les pieds dans le sable au La Siesta Beach Club, entre dîner gourmand, ambiance dansante et vue imprenable sur la mer."}	\N	\N	\N	\N
46	Plongée découverte à Nice	 Vivez une expérience unique en découvrant la faune et la flore de la Méditerranée lors d’une plongée accompagnée dans les eaux limpides de Fréjus.	Activite	110.00	{https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1754833991294_acsaltwxe6lr6evbp62e.jpg,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1754833992032_ocgnxdbuvibutqozcst3.webp,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1754833992287_jzzyoxwoexnj80vcklfc.webp,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1754833992536_letbeobnilw0jmlnvu9y.webp,https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/offers/1754833992770_c6ajr1nedw5mbbnwpagw.webp}	2025-08-10 15:55:14.168916	2025-08-10 15:55:14.168916	11	43.69624302178258	7.285883272883837	21	14 Quai des Deux Emmanuels, 06300 Nice, France	{Nautiques,"Nature & Aventure","Sports & Sensations Fortes"}	personne	2 h	49eda54a-a544-4fd6-91ce-9bcddcfaa20a	t	6	{"en": "Discovery diving in Nice", "fr": "Plongée découverte à Nice"}	{"en": "Enjoy a unique experience discovering the flora and fauna of the Mediterranean on a guided dive in the clear waters of Fréjus.", "fr": " Vivez une expérience unique en découvrant la faune et la flore de la Méditerranée lors d’une plongée accompagnée dans les eaux limpides de Fréjus."}	\N	7	8	9
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
11	Azur Aventures	Vivez l’adrénaline avec nos plongées sous-marines et nos tours d’avion panoramiques pour découvrir la Côte d’Azur comme jamais auparavant.	https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/providers-images/logo/1754803001175_DavidPDP.jpg	+33765594097	tompayan1710@gmail.com				Company	1 - 2		t	\N
\.


--
-- Data for Name: qr_codes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.qr_codes (id, slug, id_hote, image_url, user_id) FROM stdin;
83	9630f266-e89f-4ebf-b5f6-88801cb1f07b	4	https://knswskkdaimyrcstijsm.supabase.co/storage/v1/object/public/offers-images/qrcodes/1756389258792_9630f266-e89f-4ebf-b5f6-88801cb1f07b_4.png	64
\.


--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.refresh_tokens (id, user_id, refresh_token, expires_at, created_at) FROM stdin;
309	67	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjcsImVtYWlsIjoidG9tcGF5YW4xNzEwQGdtYWlsLmNvbSIsImlhdCI6MTc1NTAyMjAyOCwiZXhwIjoxNzcwNTc0MDI4fQ.V97nI-W75npNv_TrhRA7SXoB9ShqQKWCz1kZfoSXKzo	2026-02-08 19:07:08.953	2025-08-12 20:07:08.957078
310	67	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjcsImVtYWlsIjoidG9tcGF5YW4xNzEwQGdtYWlsLmNvbSIsImlhdCI6MTc1NTAyMjE2MywiZXhwIjoxNzcwNTc0MTYzfQ.tVh-a1r2Y3hqdadzRdZQ_W6A3Bkgd5xqLE22FpQ1VN8	2026-02-08 19:09:23.772	2025-08-12 20:09:23.77611
301	64	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjQsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsImlhdCI6MTc1NDgyOTc4NywiZXhwIjoxNzcwMzgxNzg3fQ.LArqLNa4j_HdbX4Ik7nC7-xiQ8hAx6cglTXfCFFP8VA	2026-02-06 13:43:07.041	2025-08-10 07:15:59.433322
314	67	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjcsImVtYWlsIjoidG9tcGF5YW4xNzEwQGdtYWlsLmNvbSIsImlhdCI6MTc1NTAyNDY0OSwiZXhwIjoxNzcwNTc2NjQ5fQ.9pfhnXdIMSGFdrdOzjPJCg81NxUnLmJux0YDdUCcIMg	2026-02-08 19:50:49.551	2025-08-12 20:50:49.55277
302	64	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjQsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsImlhdCI6MTc1NDg0MDAyOSwiZXhwIjoxNzcwMzkyMDI5fQ.VEMRYZvYBPPBgeJ_PFp8uabkDrJazf6XoN3XYyjvG3o	2026-02-06 16:33:49.858	2025-08-10 15:06:17.366032
318	64	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjQsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsImlhdCI6MTc1NjI3NzI2NiwiZXhwIjoxNzcxODI5MjY2fQ.JMykhF31OZpvqemYUeqjevB5XSNx7UZ-e8m2Tbbveqs	2026-02-23 07:47:46.377	2025-08-26 21:40:00.402232
303	64	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjQsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsImlhdCI6MTc1NDg1MjExOCwiZXhwIjoxNzcwNDA0MTE4fQ.itgkuLSBvZUxqLwZ2rrapMN8Pz0VXnS6TZpb5V1sHIQ	2026-02-06 19:55:18.384	2025-08-10 18:46:36.427368
332	64	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjQsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsImlhdCI6MTc1NzYxNTEyNCwiZXhwIjoxNzczMTY3MTI0fQ.PwYKmC9z63wfhGNAOD1MomsrhL22I-CnNQyC5d2710w	2026-03-10 19:25:24.237	2025-09-10 21:07:30.695821
304	64	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjQsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsImlhdCI6MTc1NDg5NDE0NiwiZXhwIjoxNzcwNDQ2MTQ2fQ.-YB-cdyWi3J7RmydGWiPBHCpRnEBOdRbu6BB6_8wXe0	2026-02-07 07:35:46.104	2025-08-10 21:30:41.844863
315	67	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjcsImVtYWlsIjoidG9tcGF5YW4xNzEwQGdtYWlsLmNvbSIsImlhdCI6MTc1NjIzMzIxNywiZXhwIjoxNzcxNzg1MjE3fQ.90KcV5MtSCzPZEAFpq8VdoauY9qGP-8T7mjVIVqsWbs	2026-02-22 19:33:37.996	2025-08-26 16:55:11.628422
323	64	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjQsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsImlhdCI6MTc1NjY2MTI4OCwiZXhwIjoxNzcyMjEzMjg4fQ.J8z16Nie7sGaLvXzZ65qU_KJfJ-WFpQqYA7MuXanZ-0	2026-02-27 18:28:08.974	2025-08-28 17:45:41.929799
308	67	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjcsImVtYWlsIjoidG9tcGF5YW4xNzEwQGdtYWlsLmNvbSIsImlhdCI6MTc1NTAyMTk3OSwiZXhwIjoxNzcwNTczOTc5fQ.yID83O4n0N2SvyTWd1e_03D8KOC-8-rZIEcrhgzv7zg	2026-02-08 19:06:19.866	2025-08-12 20:06:19.868036
325	64	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjQsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsImlhdCI6MTc1NzMzNDYxMCwiZXhwIjoxNzcyODg2NjEwfQ._XebyyQey59S6m5Q0nBZee2-uHbXbefehyQN_jYkyAY	2026-03-07 13:30:10.435	2025-09-02 18:31:19.690065
326	64	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjQsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsImlhdCI6MTc1NzMzNDYxMCwiZXhwIjoxNzcyODg2NjEwfQ._XebyyQey59S6m5Q0nBZee2-uHbXbefehyQN_jYkyAY	2026-03-07 13:30:10.435	2025-09-07 16:23:15.919106
319	64	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjQsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsImlhdCI6MTc1NjI5NDk4MSwiZXhwIjoxNzcxODQ2OTgxfQ.6F4BIj9SBqo1tMaEOE3VhftdKhTDVFgTnwkqf9boog4	2026-02-23 12:43:01.317	2025-08-27 09:48:28.49178
320	64	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjQsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsImlhdCI6MTc1NjI5NDk4MSwiZXhwIjoxNzcxODQ2OTgxfQ.6F4BIj9SBqo1tMaEOE3VhftdKhTDVFgTnwkqf9boog4	2026-02-23 12:43:01.317	2025-08-27 10:52:17.160843
321	67	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjcsImVtYWlsIjoidG9tcGF5YW4xNzEwQGdtYWlsLmNvbSIsImlhdCI6MTc1NjM5NTU2MywiZXhwIjoxNzcxOTQ3NTYzfQ.X0uLWcaAlKcxNTW04KfCtyvKn7ZThgnq0Av81-aaC2Y	2026-02-24 16:39:23.238	2025-08-28 17:39:23.245592
327	64	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjQsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsImlhdCI6MTc1NzMzNDYxMCwiZXhwIjoxNzcyODg2NjEwfQ._XebyyQey59S6m5Q0nBZee2-uHbXbefehyQN_jYkyAY	2026-03-07 13:30:10.435	2025-09-07 16:46:32.663787
329	64	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjQsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsImlhdCI6MTc1NzUxODcxNiwiZXhwIjoxNzczMDcwNzE2fQ.SzOM4g65FkgQa3958bgUrk2kszog6eyC517pQTXtS2c	2026-03-09 16:38:36.867	2025-09-10 17:38:36.872926
334	64	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjQsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsImlhdCI6MTc1Nzg0MDU2MSwiZXhwIjoxNzczMzkyNTYxfQ.bR3v6cm8BJuFL1QjnJ4yIFDsPbJr2j_wh2S72untJgQ	2026-03-13 10:02:41.787	2025-09-11 20:35:59.178201
\.


--
-- Data for Name: reservation_slots; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reservation_slots (id, provider_id, offer_slug, date, start_hour, end_hour, total_reserved, status, created_at, updated_at, hotel_commission_total, platform_commission_total, net_amount_total, gross_amount_total) FROM stdin;
112	11	49eda54a-a544-4fd6-91ce-9bcddcfaa20a	2025-09-30	14:00	16:00	6	full	2025-09-07 16:47:19.481236	2025-09-07 16:50:09.478862	39.90	74.10	456.00	570.00
\.


--
-- Data for Name: reservations_creneaux_google_calendar; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reservations_creneaux_google_calendar (id, reservation_slots_id, provider_id, google_event_id) FROM stdin;
\.


--
-- Data for Name: reservations_individuals; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reservations_individuals (id, user_id, slot_id, total_places_used, payment_status, reservation_status, created_at, updated_at, email, name, phone, stripe_payment_intent_id, hotel_commission, platform_commission, net_amount, gross_amount, id_hote, nb_child, nb_infant, unit_price_adult, unit_price_child, unit_price_infant, nb_adult, token_validate, comment_id) FROM stdin;
138	64	112	1	paid	confirmed	2025-09-07 16:50:09.490973	2025-09-07 16:50:09.490973	tompayan1710@gmail.com	Lacarte Céline	+33611111111	pi_3S4jum2f0HHvMFDt1ZEpB3Rs	7.70	14.30	88.00	110.00	4	0	2	110.00	80.00	0.00	1	18298f05-b7f9-4662-85bc-f6eb4e5fceb8	\N
137	64	112	5	paid	confirmed	2025-09-07 16:47:19.486518	2025-09-07 16:47:19.486518	tompayan1710@gmail.com	Tom Payan	+33765594097	pi_3S4js02f0HHvMFDt0F45kjN0	32.20	59.80	368.00	460.00	\N	3	4	110.00	80.00	0.00	2	20c348cf-afa4-4989-ba3c-68bfbac47ca2	13
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, email, password, role, created_at, provider_id, provider, name, phone, profil_picture, receive_booking_emails, receive_activity_suggestions) FROM stdin;
64	test@test.com	$2b$10$3UvizEpeikdO.CLiWr9MhOZBnM.d/cFcKreM7F74pfsX3VksNH..K	member	2025-08-10 07:15:59.274613	11	password-email	\N	\N	\N	t	t
67	tompayan1710@gmail.com	\N	member	2025-08-12 20:06:19.809507	\N	google	\N	\N	\N	t	t
68	test2@test2.com	$2b$10$e3iACZgHNNPkQ2tHBIVnk.2luB6TmB/Xa5/QBza3yfkfF9DZulufO	member	2025-08-12 20:40:08.881656	\N	password-email	\N	\N	\N	t	t
\.


--
-- Data for Name: withdrawal_methods; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.withdrawal_methods (id, provider_id, method, iban, swift, first_name, last_name, paypal_email, created_at) FROM stdin;
28	11	iban	CLARABELLE	FOSFS	Payan	TOM PAYAN	\N	2025-09-13 19:11:16.138595
\.


--
-- Data for Name: withdrawals; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.withdrawals (id, provider_id, amount, method, details, status, created_at, iban, swift, first_name, last_name, paypal_email, sent_at) FROM stdin;
15	11	100.00	IBAN	Demande de versement par IBAN 	waiting	2025-09-14 08:44:35.263075	CLARABELLE	FOSFS	Payan	TOM PAYAN		\N
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

SELECT pg_catalog.setval('public.cities_id_seq', 28, true);


--
-- Name: comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.comments_id_seq', 13, true);


--
-- Name: departments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.departments_id_seq', 22, true);


--
-- Name: favorites_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.favorites_id_seq', 2, true);


--
-- Name: hotes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.hotes_id_seq', 4, true);


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
-- Name: offer_price_bands_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.offer_price_bands_id_seq', 9, true);


--
-- Name: offer_recurring_slots_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.offer_recurring_slots_id_seq', 131, true);


--
-- Name: offers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.offers_id_seq', 54, true);


--
-- Name: provider_booking_integrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.provider_booking_integrations_id_seq', 6, true);


--
-- Name: providers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.providers_id_seq', 11, true);


--
-- Name: qr_codes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.qr_codes_id_seq', 83, true);


--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.refresh_tokens_id_seq', 334, true);


--
-- Name: reservation_slots_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reservation_slots_id_seq', 112, true);


--
-- Name: reservations_creneaux_google_calendar_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reservations_creneaux_google_calendar_id_seq', 19, true);


--
-- Name: reservations_individuals_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reservations_individuals_id_seq', 138, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 68, true);


--
-- Name: withdrawal_methods_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.withdrawal_methods_id_seq', 28, true);


--
-- Name: withdrawals_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.withdrawals_id_seq', 15, true);


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
-- Name: offer_pricing offer_price_bands_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.offer_pricing
    ADD CONSTRAINT offer_price_bands_pkey PRIMARY KEY (id);


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
    ADD CONSTRAINT comments_offer_slug_fkey FOREIGN KEY (offer_slug) REFERENCES public.offers(slug);


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
-- Name: reservations_individuals fk_reservations_hote; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservations_individuals
    ADD CONSTRAINT fk_reservations_hote FOREIGN KEY (id_hote) REFERENCES public.hotes(id);


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
-- Name: offer_pricing offer_price_bands_offer_slug_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.offer_pricing
    ADD CONSTRAINT offer_price_bands_offer_slug_fkey FOREIGN KEY (offer_slug) REFERENCES public.offers(slug) ON DELETE CASCADE;


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
-- Name: offers offers_departement_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.offers
    ADD CONSTRAINT offers_departement_id_fkey FOREIGN KEY (departement_id) REFERENCES public.departments(id) ON DELETE SET NULL;


--
-- Name: offers offers_offer_pricing_adult_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.offers
    ADD CONSTRAINT offers_offer_pricing_adult_fkey FOREIGN KEY (offer_pricing_adult) REFERENCES public.offer_pricing(id) ON DELETE SET NULL;


--
-- Name: offers offers_offer_pricing_child_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.offers
    ADD CONSTRAINT offers_offer_pricing_child_fkey FOREIGN KEY (offer_pricing_child) REFERENCES public.offer_pricing(id) ON DELETE SET NULL;


--
-- Name: offers offers_offer_pricing_infant_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.offers
    ADD CONSTRAINT offers_offer_pricing_infant_fkey FOREIGN KEY (offer_pricing_infant) REFERENCES public.offer_pricing(id) ON DELETE SET NULL;


--
-- Name: offers offers_provider_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.offers
    ADD CONSTRAINT offers_provider_id_fkey FOREIGN KEY (provider_id) REFERENCES public.providers(id);


--
-- Name: qr_codes qr_codes_id_hotesfkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.qr_codes
    ADD CONSTRAINT qr_codes_id_hotesfkey FOREIGN KEY (id_hote) REFERENCES public.hotes(id) ON DELETE SET NULL;


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
-- Name: reservations_individuals reservations_individuals_comment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservations_individuals
    ADD CONSTRAINT reservations_individuals_comment_id_fkey FOREIGN KEY (comment_id) REFERENCES public.comments(id) ON DELETE SET NULL;


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

