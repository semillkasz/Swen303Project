--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'SQL_ASCII';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- Name: 303; Type: DATABASE; Schema: -; Owner: -
--

CREATE DATABASE "303" WITH TEMPLATE = template0 ENCODING = 'SQL_ASCII' LC_COLLATE = 'C' LC_CTYPE = 'C';


\connect "303"

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'SQL_ASCII';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

-- CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

-- COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

--
-- Name: plpgsql_call_handler(); Type: FUNCTION; Schema: public; Owner: -
--

-- CREATE FUNCTION plpgsql_call_handler() RETURNS language_handler
--     LANGUAGE c
--     AS '$libdir/plpgsql', 'plpgsql_call_handler';


SET default_tablespace = '';

SET default_with_oids = false;

CREATE TABLE cart (
	uid integer, 
	sid integer, 
	label character varying(100), 
	price numeric(10,2)
	-- quantity integer
);

--
-- Name: stock; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE stock (
	sid integer NOT NULL,
	label character varying(100),
	price numeric(10,2),
	quantity integer,
	category character varying(100),
	photourl character varying(200), 
	description character varying(500)
);


--
-- Name: stock_sid_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE stock_sid_seq
	START WITH 1
	INCREMENT BY 1
	NO MINVALUE
	NO MAXVALUE
	CACHE 1;


--
-- Name: stock_sid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE stock_sid_seq OWNED BY stock.sid;


--
-- Name: transactions; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE transactions (
	tid integer NOT NULL,
	sid integer,
	uid integer,
	type character varying(10)
);


--
-- Name: transactions_tid_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE transactions_tid_seq
	START WITH 1
	INCREMENT BY 1
	NO MINVALUE
	NO MAXVALUE
	CACHE 1;


--
-- Name: transactions_tid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE transactions_tid_seq OWNED BY transactions.tid;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE users (
	uid integer NOT NULL,
	username character varying(50),
	realname character varying(100),
	password character varying(50)
);


--
-- Name: users_uid_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE users_uid_seq
	START WITH 1
	INCREMENT BY 1
	NO MINVALUE
	NO MAXVALUE
	CACHE 1;


--
-- Name: users_uid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE users_uid_seq OWNED BY users.uid;


--
-- Name: sid; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY stock ALTER COLUMN sid SET DEFAULT nextval('stock_sid_seq'::regclass);


--
-- Name: tid; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY transactions ALTER COLUMN tid SET DEFAULT nextval('transactions_tid_seq'::regclass);


--
-- Name: uid; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY users ALTER COLUMN uid SET DEFAULT nextval('users_uid_seq'::regclass);


--
-- Data for Name: stock; Type: TABLE DATA; Schema: public; Owner: -
--

COPY stock (sid, label, price, quantity, category, photourl, description) FROM stdin;
1	Camera	12.9000	3	Electronics	http://www.bhphotovideo.com/images/categoryImages/desktop/325x325/21008-Mirrorless-System-Cameras.jpg	Boasting a durable waterproof casing, built-in Wi-Fi and a variety of shooting modes, the Camera is the ultimate shooting companion on your next big holiday.
2	Cap	30.0000	1	Clothes	http://cdn.shopify.com/s/files/1/0978/9908/products/hb_darkside_5panelcap_b7987690-e036-406a-a972-a1b434b2122c_large.jpeg?v=1455079401	Keeping it simple, this cap is just what you need this summer. All about quality, comfort and timeless style, this varsity cap has an embroidered detail at the back.
3	Bald Eagle	999.9900	10	Animals	http://rlv.zcache.com/eagle_fleece_blanket-r1da8dc7d4f5d4589b9dc8a6edd45bf2d_zkij0_325.jpg?rlvnet=1	The Bald Eagle is an unforgettable animal. Its white head and tail, eight-foot wingspread, piercing eyes, massive hooked beak and powerful talons make it unmistakable among North American birds.
4	Kiwi	49999.9900	3	Animals	http://www.namastenewzealand.com/wp-content/uploads/2015/08/Rotorua-Rainbow-Springs-Kiwi-Wildlife-Park-350x350.jpg	A flightless bird, about the size of a domestic chicken. Kiwis lay the largest egg in relation to their body size of any species of bird in the world.
5	Snakes and Ladders	1.0000	1	Board Games	http://www.brookstone.com/dis/dw/image/v2/AAYH_PRD/on/demandware.static/-/Sites-itemmaster_Brookstone/default/dw2951e8c7/hi-res/764054p.jpg?sw=325	This is the classic board game in 3-dimensions. Now when you land on a snake, your marble actually goes down tubes and slide for one or more levels. Livens up the game for everyone. The board is a bit of a construction project at first, and will not fit back in the box after it is setup, but it is a lot more interesting than the usual flat board.
6	Monopoly	3.0000	1	Board Games	http://www.hasbro.com/common/productimages/en_US/93e901b16d4010148bf09efbf894f9d4/E275A053D56FE1124AA2AC1BEF6330E9.jpg	Travel the globe, without the jetlag! Buy up real estate while you travel the world of MONOPOLY. With millions of dollars at your disposal, use your MONOPOLY bank card to grab houses and hotels on six continents! Be a winner AND see the globe with the world’s most popular board game!
7	Holy Grail	0.9900	1	Miscellaneous	http://www.funkleague.com/wp-content/uploads/2015/03/Holy-Grail-300x300.jpg	The Holy Grail is a dish, plate, stone or cup that is part of an important theme of Arthurian literature. According to legend, it has special powers and is designed to provide happiness, eternal youth and food in infinite abundance.
8	Meaning of Life	42.0000	20	Miscellaneous	https://scontent.cdninstagram.com/hphotos-xaf1/t51.2885-15/s320x320/e15/11176219_382128701990934_1983521442_n.jpg	Have you ever wondered what the meaning of life is? Well look no further! You can finally get all the answers you have been looking for. This is not available anywhere else, so buy now!
9	Cactus	9.9900	3	Plants	http://www.womenofchina.cn/res/womenofchina/1301/i.jpg	From Mexico, it grows slowly to around 2 m high (may take a few hundred years!). Large scented yellow flowers in summer. Indoors only, in bright light.
10	Iris	9.9900	15	Plants	http://www.touchofnature.com/Fall%20Pictures/TC%20Dutch%20Iris%20Blue%20Ribbon.png	The word iris is Greek for 'rainbow'. The iris flower meaning are faith, wisdom, peace of mind, friendship and hope. Purple iris is symbolic of wisdom and compliments
11	Knives	15.5000	4	Kitchen Appliances	http://www.briscoes.co.nz/productimages/medium/1/19242_44632_40836.jpg	Set of 5 quality kitchen knives complete with a magnetic wall rack for easy accessability. Each knife is made from top quality, strong stainless steel and features riveted handles.
12	Sword	49.9700	8	Miscellaneous	http://www.bilttuff.com/images/Butterfly%20Swords.jpg	Butterfly Swords come in pairs that are cleverly nested together so they appear to be one sword not two. When they are drawn, they can be quickly separated and wielded in both hands to make wickedly effective chops, slashes and thrusts.
13	Kryptonite	0.5000	100	Miscellaneous	http://www.fashion-fit.us/ff2016_files/image048.jpg	Kryptonite is a material from the superman fictional universe, specifically the ore form of a radioactive element from Krypton, the home planet of Superman.
14	Scarf	5.9900	1000	Clothes	http://www.buyyourties.com/image/cache/byt/2000-SCARFZ/SCARF-Z-4-325x325.jpg	This scarf is the perfect accessory to keep you warm this Winter. It folds up small but keeps you warm on those cold days.
15	Table	10.0000	1	Furniture	http://www.camlenantiques.com/images/bist_325cab.jpg	Designed for a smaller space, this table has all of the design and functionality of a larger pedestal table, exuding a more casual style. This table can comfortably sit 2 or 3 persons, or can be used as an accent table in a living room or entrance hallway.
16	Small Chair	5.0000	1	Furniture	http://www.brookstone.com/dis/dw/image/v2/AAYH_PRD/on/demandware.static/-/Sites-itemmaster_Brookstone/default/dw828da71f/hi-res/991174p.jpg?sw=325	Small chair with slats. Made from lightweight beech wood. Easy to clean.
17	Coffee Beans	4.9900	10	Food and Drinks	http://static.wixstatic.com/media/34793e_7b30181368f54448a16cd8f0ef3abc9a.jpg/v1/fill/w_325,h_325,q_85,usm_0.66_1.00_0.01/34793e_7b30181368f54448a16cd8f0ef3abc9a.jpg	Creamy and smooth with a nutty finish. Preaparation - washed. Sold in 500g packs.
18	Muffin	3.5000	10	Food and Drinks	http://static1.squarespace.com/static/544e9769e4b0529748d842f0/t/5463c8f4e4b01221357f7cd3/1415825652388/	Double chocolate chip muffins (4 pieces) filled with a gooey caramel center. Baked with no nuts.
\.


--
-- Name: stock_sid_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('stock_sid_seq', 18, true);


--
-- Data for Name: transactions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY transactions (tid, sid, uid, type) FROM stdin;
1	3	1	PURCHASE
2	1	10	PURCHASE
3	4	3	PURCHASE
4	5	4	PURCHASE
5	14	1	PURCHASE
6	14	10	PURCHASE
7	14	8	PURCHASE
8	18	7	PURCHASE
9	17	7	PURCHASE
10	18	11	PURCHASE
11	11	11	PURCHASE
12	11	11	PURCHASE
13	11	11	PURCHASE
14	11	11	PURCHASE
15	9	11	PURCHASE
16	3	11	PURCHASE
17	17	11	PURCHASE
18	13	11	PURCHASE
\.


--
-- Name: transactions_tid_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('transactions_tid_seq', 18, true);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY users (uid, username, realname, password) FROM stdin;
1	admin	Sally Smith	1337
2	j0nny	John Diggle	password
3	james	James Green	green
4	zoo	Monty Python	dinosaur
5	qwerty	Zoe Curtis	purple
6	Cambel	Thea Queen	something
7	Waities	Kara Danvers	secure
8	Cam	Camile Jones	12345
9	grod	Cameron Smith	dfgh
10	flash	Barry Allen	falsh
11	arrow	Oliver Queen	arrow
\.


--
-- Name: users_uid_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('users_uid_seq', 11, true);


--
-- Name: public; Type: ACL; Schema: -; Owner: -
--

-- REVOKE ALL ON SCHEMA public FROM PUBLIC;
-- REVOKE ALL ON SCHEMA public FROM pgsql;
-- GRANT ALL ON SCHEMA public TO pgsql;
-- GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

