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

CREATE DATABASE "SWEN303SHOP" WITH TEMPLATE = template0 ENCODING = 'SQL_ASCII' LC_COLLATE = 'C' LC_CTYPE = 'C';


\connect "SWEN303SHOP"

SET statement_timeout = 0;
SET lock_timeout = 0;--
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

CREATE DATABASE "SWEN303SHOP" WITH TEMPLATE = template0 ENCODING = 'SQL_ASCII' LC_COLLATE = 'C' LC_CTYPE = 'C';


\connect "SWEN303SHOP"

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

CREATE TABLE wishlist (
	sid integer NOT NULL,
	uid integer,
	sid_item integer,
	label character varying(500), 
	photourl character varying(500),
	price numeric(10,2)
);

CREATE SEQUENCE wishlist_sid_seq
	START WITH 1
	INCREMENT BY 1
	NO MINVALUE
	NO MAXVALUE
	CACHE 1;

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
	uid integer,
	label character varying(100),
	price numeric(10,2),
	quantity integer,
	category character varying(100),
	photourl character varying(500), 
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
	type character varying(10),
	photourl character varying(500)
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
	password character varying(50),
	address character varying(200),
	email character varying(100),
	rating integer,
	photo text,
	feedback text
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
-- Name: reviews; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE reviews (
	sid integer,
	uid integer, 
	username character varying(50),
	title character varying(40),
	description character varying(500)
);


ALTER TABLE ONLY wishlist ALTER COLUMN sid SET DEFAULT nextval('wishlist_sid_seq'::regclass);	
	
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

COPY stock (sid, uid, label, price, quantity, category, photourl, description) FROM stdin;
1	1	Camera	12.9000	3	Cameras	http://www.bhphotovideo.com/images/categoryImages/desktop/325x325/21008-Mirrorless-System-Cameras.jpg	Boasting a durable waterproof casing, built-in Wi-Fi and a variety of shooting modes, the Camera is the ultimate shooting companion on your next big holiday.
2	1	Small Flatscreen TV & Video	100.0000	5	TV	http://homeasnika.com/wp-content/uploads/2012/09/small-flat-screen-tv.jpg	Perfect for any bedroom, this Small Flatscreen TV can fit in any small space. Easy set up with built-in HDMI.
3	2	Tablet	549.9900	10	Computers & Tablets	http://www.lg.com/us/images/tablets/md05230845/md05230845-350x350.jpg	Full HD Display | 2.26GHZ Quad-Core CPU | Reader Mode | Dual Window. The sleek, fullsize metallic body is luxurious and lightweight—so you can complement your style, everywhere you go.
4	2	House Phone	99.9900	3	Phones	http://www.hoteltele.com/images/teledex/iphone-a210s.jpg	Suitable for any home, this phone boasts graceful, sculpted curves that accent a comfortable, familiar user interface. Modern, tech-inspired lines surround what’s inside: the most reliable, feature-rich telephone.
5	3	Desktop Computer	1500.0000	1	Computers & Tablets	http://shop2.lifetimecs.com/wp-content/uploads/2016/02/Newest-HP-Flagship-27-Inch-All-in-One-TouchScreen-Desktop-Computer-Intel-Gen-6-i7-6700T-up-to-36-GHz-16GB-RAM-1TB-HDD-27-WLED-IPS-FHD-1080p-Display-AMD-R7-A360-4GB-Graphics-FHD-Webcam-Win-10-0-0.jpg	Embrace the power house of this flagship all-in-one desktop that features latest gen core i7 processor, 27″ FHD touch display, discrete graphic card, FHD webcam and much more!
6	3	3D TV	1049.9900	3	TV & Video	https://www.electronicworldtv.co.uk/global/media/products/resized/534643-42wl863.jpg	Introducing the impressive Full HD 42 inch LED 3D TV for scintillating home entertainment that represents the cutting edge of television technology! The 3D revolution is in full swing and has already seen massive success in cinemas. Now you can also experience 3D images in your living room with a 3D TV.
7	4	Laptop	349.9900	8	Computers & Tablets	http://www.lg.com/us/images/desktops-laptops/md05230726/md05230725-350x350.jpg	Weighs under 1kg (2.2 lbs)|15.6 Inch Full HD IPS Display|Magnesium Alloy Body|USB-C port|6th Generation i5 Intel Core Processor. This is a large screen laptop you can easily take anywhere!
8	5	Portable DVD Player	72.0000	20	TV & Video	http://2.imimg.com/data2/MK/SH/MY-3144743/mitashi-7-portable-dvd-player-model-tfd-7607-500x500.jpg	It is perfect entertainment gadget for traveller’s. In-built battery + Rotating screen makes it perfect gadget for travellers.
9	5	Cellphone	99.9900	3	Phones	http://www.lg.com/us/images/cell-phones/md05230706/md05230706-350x350.jpg	1.2 GHz Quad-Core Processor|1,900 mAh Battery|5 MP Camera with Gesture Shot. Enjoy a premium experience at a price you will love - at the end of the day it’s simply a winning combo.
10	5	Pocket-sized Digital Camera	439.9900	15	Cameras	https://img.kogan.com/2HB8FSi6mUwZ2ALLJ2JSSjCIIdU=/600x400/http://assets.kogan.com/files/product/KHCANPSG7XBLK/KHCANPSG7XBLK-perspective-hires.jpg	Small enough to fit in your pocket, but powerful enough to never disappoint – this camera delivers superb image quality, as well as a range of options to enhance and share your creations.
11	6	Remote Control Mini Drone	46.5000	4	Gaming	http://dronetradr.com/wp-content/uploads/2015/04/mini-drone-for-sale-250x250.jpg	Featuring incredibly stable flight, this 2.4G 4 channel R/C Mini Drone can hover, spin left and right, pitch forward, backward and side to side. 
12	6	Remote Control Water Copter	49.9700	8	Gaming	http://www.box.co.uk/system/productimage.aspx?id=453245&quality=90&maxwidth=500&maxheight=350	Play the ultimate prank with a flying water pistol! Looking like a regular remote control helicopter this ingenious toy carries a secret weapon – a water gun!
13	7	Speakers	300.000	100	Audio	https://img.kogan.com/d2dIb9t5PjXHaIagLtigwFNZ46Y=/600x400/http://assets.kogan.com/files/product/PHI-CSS7235Y/PHI-CSS7235Y-hires.jpg	Enjoy top quality surround sound on your films, TV shows, games and music – anytime and anywhere with this wireless system.
14	7	Vacuum	55.9900	200	Appliances	http://www.vacmag.com/wp-content/uploads/2013/09/bagless.jpg	Effortlessly clean your floors with this powerful vacuum cleaner, featuring 2000W of power and washable, reusable filters.
15	8	Portable Air Conditioner	60.0000	3	Appliances	https://img.kogan.com/70RW1piEDgxacYoAzGWKe89vldI=/600x400/http://assets.kogan.com/files/product/KAPORAIR10GA/KAPORAIR10GA_1.jpg	Ideal for cooling smaller rooms, this compact, portable air conditioner will keep you cool and comfortable all summer long.
16	9	Bread Maker	65.0000	7	Appliances	https://img.kogan.com/ErKexxZfpxoR4ubQY0oRxtODTYk=/600x400/http://assets.kogan.com/files/product/kaprmbrdmka/kaprmbrdmka_1.jpg	Incredibly easy to use, cheaper than constantly buying ready-made bread and better tasting than anything you can imagine, our Premium Stainless Steel Bread Maker will change your relationship with bread forever!
17	10	Retro Turntable 	99.000	10	Audio	https://images-na.ssl-images-amazon.com/images/G/01/electronics/detail-page/PVNTT6UMT_small.jpg	This vintage, 60s style suitcase record player provides a convenient, portable way to play your favourite records, and also gives you the freedom to convert the songs you love to digital format.
18	10	Wired Ear piece	8.5000	10	Audio	http://www.prestigioplaza.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/1/4/141203150014814629.jpg	These quality stylish white earbud headphones are designed to work perfectly with your Apple device. The inline remote lets you play, pause, skip, rewind and control volume.
\.


--
-- Name: stock_sid_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('stock_sid_seq', 18, true);


--
-- Data for Name: transactions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY transactions (tid, sid, uid, type, photourl) FROM stdin;
1	3	1	PURCHASE	http://www.lg.com/us/images/tablets/md05230845/md05230845-350x350.jpg
2	1	9	PURCHASE	http://www.bhphotovideo.com/images/categoryImages/desktop/325x325/21008-Mirrorless-System-Cameras.jpg
3	4	3	PURCHASE	http://www.hoteltele.com/images/teledex/iphone-a210s.jpg
4	5	4	PURCHASE	http://shop2.lifetimecs.com/wp-content/uploads/2016/02/Newest-HP-Flagship-27-Inch-All-in-One-TouchScreen-Desktop-Computer-Intel-Gen-6-i7-6700T-up-to-36-GHz-16GB-RAM-1TB-HDD-27-WLED-IPS-FHD-1080p-Display-AMD-R7-A360-4GB-Graphics-FHD-Webcam-Win-10-0-0.jpg
5	14	1	PURCHASE	http://www.vacmag.com/wp-content/uploads/2013/09/bagless.jpg
6	14	9	PURCHASE	http://www.vacmag.com/wp-content/uploads/2013/09/bagless.jpg
7	14	8	PURCHASE	http://www.vacmag.com/wp-content/uploads/2013/09/bagless.jpg
8	18	7	PURCHASE	http://www.prestigioplaza.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/1/4/141203150014814629.jpg
9	17	7	PURCHASE	https://images-na.ssl-images-amazon.com/images/G/01/electronics/detail-page/PVNTT6UMT_small.jpg
10	18	5	PURCHASE	http://www.prestigioplaza.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/1/4/141203150014814629.jpg
11	11	11	PURCHASE	http://dronetradr.com/wp-content/uploads/2015/04/mini-drone-for-sale-250x250.jpg
12	11	2	PURCHASE	http://dronetradr.com/wp-content/uploads/2015/04/mini-drone-for-sale-250x250.jpg
13	11	10	PURCHASE	http://dronetradr.com/wp-content/uploads/2015/04/mini-drone-for-sale-250x250.jpg
14	11	1	PURCHASE	http://dronetradr.com/wp-content/uploads/2015/04/mini-drone-for-sale-250x250.jpg
15	9	10	PURCHASE	http://www.lg.com/us/images/cell-phones/md05230706/md05230706-350x350.jpg
16	3	10	PURCHASE	http://www.lg.com/us/images/tablets/md05230845/md05230845-350x350.jpg
17	17	6	PURCHASE	https://images-na.ssl-images-amazon.com/images/G/01/electronics/detail-page/PVNTT6UMT_small.jpg
18	13	10	PURCHASE	https://img.kogan.com/d2dIb9t5PjXHaIagLtigwFNZ46Y=/600x400/http://assets.kogan.com/files/product/PHI-CSS7235Y/PHI-CSS7235Y-hires.jpg
\.


--
-- Name: transactions_tid_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('transactions_tid_seq', 18, true);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY users (uid, username, realname, password, address, email, rating, photo, feedback) FROM stdin;
1	admin	Sally Smith	1337	11 Pattie Street	sulkysally@yahoo.com	4	http://img.thesun.co.uk/aidemitlum/archive/00908/woman-280_908421a.jpg	Excellent buyer. A++++++.
2	j0nny	John Diggle	password	22 Fitzherbert Avenue	digglelove@hotmail.com	3	https://pbs.twimg.com/profile_images/661041286942584832/a5SW7Qz5.jpg	Good buyer, prompt payment, valued customer, highly recommended.
3	james	James Green	green	9 Evergreen Royale Subd	greenjames@mailme.com	2	https://lh3.googleusercontent.com/-Pcv8Ya-Jij8/AAAAAAAAAAI/AAAAAAAADPY/D4YsBTDXvZU/photo.jpg	Lovely buyer. A pleasure doing business with. 
4	zoo	Monty Python	dinosaur	3 Rupiah Street	python_guy@gmail.com	1	http://1.bp.blogspot.com/-aeF1Vhzaeck/UQnxO4lKlkI/AAAAAAAAGc0/1ajSxMIqBqc/s1600/SMCARRADINE2.jpg	Terrible buyer! Do not sell anything for this person.
5	qwerty	Zoe Curtis	purple	Taal Avenue, Quezon City	zoeba@live.com	5	http://tubestatic.orf.at/static/images/site/tube/2016025/orf_zoe_artist-neu.5440160.jpg	Good buyer, prompt payment, valued customer, highly recommended.
6	Cambel	Thea Queen	something	213 Curly Subd	queen.thea01@yahoo.com	1	http://www.squamartworkshops.com/stuff/contentmgr/files/0/3673c4f957af7e7e4dfc41623132a2c9/image/_resized/30_360_312_thea_bio_pic_june_2013.jpg	Terrible buyer! Do not sell anything for this person.
7	Waities	Kara Danvers	secure	2 May Street	danvers_kara@hotmail.com	4	https://media2.giphy.com/media/W2OIvtTtKZWHm/200_s.gif	Excellent buyer. A++++++.
8	Cam	Camile Jones	12345	11 Wilford Boulevard	msjones@hotmail.com	5	http://www.udel.edu/udaily/2011/sep/images/jonescamille.jpg	Excellent buyer. A++++++.
9	grod	Cameron Smith	dfgh	62 Hewer Crescent	cameronsmith222@live.com	5	https://auctiondesq.imgstg.com/assets/auctiondesq/lots/images/main/CameronSmith2.jpg	Good buyer, prompt payment, valued customer, highly recommended.
10	flash	Barry Allen	falsh	10 Flash Street	allenbarrygod@mailme.com	3	http://images.mstarsnews.musictimes.com/data/images/full/72932/grant-gustin.jpg?w=600	Good buyer, prompt payment, valued customer, highly recommended.
11	arrow	Oliver Queen	arrow	16 Hells Kitchen	arrow_guy@hotmail.com	2	https://s-media-cache-ak0.pinimg.com/736x/a0/3f/c9/a03fc90ec7a81332322d2723d972ffdc.jpg	Lovely buyer. A pleasure doing business with. 
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
	uid integer,
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
	type character varying(10),
	photourl character varying(200)
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
	password character varying(50),
	address character varying(200),
	email character varying(100),
	rating integer,
	photo text,
	feedback text
);

--
-- Name: reviews; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE reviews (
	sid integer,
	uid integer, 
	username character varying(50),
	title character varying(40),
	description character varying(500)
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

COPY stock (sid, uid, label, price, quantity, category, photourl, description) FROM stdin;
1	1	Camera	12.9000	3	Electronics	http://www.bhphotovideo.com/images/categoryImages/desktop/325x325/21008-Mirrorless-System-Cameras.jpg	Boasting a durable waterproof casing, built-in Wi-Fi and a variety of shooting modes, the Camera is the ultimate shooting companion on your next big holiday.
2	1	Cap	30.0000	1	Clothes	http://cdn.shopify.com/s/files/1/0978/9908/products/hb_darkside_5panelcap_b7987690-e036-406a-a972-a1b434b2122c_large.jpeg?v=1455079401	Keeping it simple, this cap is just what you need this summer. All about quality, comfort and timeless style, this varsity cap has an embroidered detail at the back.
3	2	Bald Eagle	999.9900	10	Animals	http://rlv.zcache.com/eagle_fleece_blanket-r1da8dc7d4f5d4589b9dc8a6edd45bf2d_zkij0_325.jpg?rlvnet=1	The Bald Eagle is an unforgettable animal. Its white head and tail, eight-foot wingspread, piercing eyes, massive hooked beak and powerful talons make it unmistakable among North American birds.
4	2	Kiwi	49999.9900	3	Animals	http://www.namastenewzealand.com/wp-content/uploads/2015/08/Rotorua-Rainbow-Springs-Kiwi-Wildlife-Park-350x350.jpg	A flightless bird, about the size of a domestic chicken. Kiwis lay the largest egg in relation to their body size of any species of bird in the world.
5	3	Snakes and Ladders	1.0000	1	Board Games	http://www.brookstone.com/dis/dw/image/v2/AAYH_PRD/on/demandware.static/-/Sites-itemmaster_Brookstone/default/dw2951e8c7/hi-res/764054p.jpg?sw=325	This is the classic board game in 3-dimensions. Now when you land on a snake, your marble actually goes down tubes and slide for one or more levels. Livens up the game for everyone. The board is a bit of a construction project at first, and will not fit back in the box after it is setup, but it is a lot more interesting than the usual flat board.
6	3	Monopoly	3.0000	1	Board Games	http://www.hasbro.com/common/productimages/en_US/93e901b16d4010148bf09efbf894f9d4/E275A053D56FE1124AA2AC1BEF6330E9.jpg	Travel the globe, without the jetlag! Buy up real estate while you travel the world of MONOPOLY. With millions of dollars at your disposal, use your MONOPOLY bank card to grab houses and hotels on six continents! Be a winner AND see the globe with the world’s most popular board game!
7	4	Holy Grail	0.9900	1	Miscellaneous	http://www.funkleague.com/wp-content/uploads/2015/03/Holy-Grail-300x300.jpg	The Holy Grail is a dish, plate, stone or cup that is part of an important theme of Arthurian literature. According to legend, it has special powers and is designed to provide happiness, eternal youth and food in infinite abundance.
8	5	Meaning of Life	42.0000	20	Miscellaneous	https://scontent.cdninstagram.com/hphotos-xaf1/t51.2885-15/s320x320/e15/11176219_382128701990934_1983521442_n.jpg	Have you ever wondered what the meaning of life is? Well look no further! You can finally get all the answers you have been looking for. This is not available anywhere else, so buy now!
9	5	Cactus	9.9900	3	Plants	http://www.womenofchina.cn/res/womenofchina/1301/i.jpg	From Mexico, it grows slowly to around 2 m high (may take a few hundred years!). Large scented yellow flowers in summer. Indoors only, in bright light.
10	5	Iris	9.9900	15	Plants	http://www.touchofnature.com/Fall%20Pictures/TC%20Dutch%20Iris%20Blue%20Ribbon.png	The word iris is Greek for 'rainbow'. The iris flower meaning are faith, wisdom, peace of mind, friendship and hope. Purple iris is symbolic of wisdom and compliments
11	6	Knives	15.5000	4	Kitchen Appliances	http://www.briscoes.co.nz/productimages/medium/1/19242_44632_40836.jpg	Set of 5 quality kitchen knives complete with a magnetic wall rack for easy accessability. Each knife is made from top quality, strong stainless steel and features riveted handles.
12	6	6Sword	49.9700	8	Miscellaneous	http://www.bilttuff.com/images/Butterfly%20Swords.jpg	Butterfly Swords come in pairs that are cleverly nested together so they appear to be one sword not two. When they are drawn, they can be quickly separated and wielded in both hands to make wickedly effective chops, slashes and thrusts.
13	7	Kryptonite	0.5000	100	Miscellaneous	http://www.fashion-fit.us/ff2016_files/image048.jpg	Kryptonite is a material from the superman fictional universe, specifically the ore form of a radioactive element from Krypton, the home planet of Superman.
14	7	Scarf	5.9900	1000	Clothes	http://www.buyyourties.com/image/cache/byt/2000-SCARFZ/SCARF-Z-4-325x325.jpg	This scarf is the perfect accessory to keep you warm this Winter. It folds up small but keeps you warm on those cold days.
15	8	Table	10.0000	1	Furniture	http://www.camlenantiques.com/images/bist_325cab.jpg	Designed for a smaller space, this table has all of the design and functionality of a larger pedestal table, exuding a more casual style. This table can comfortably sit 2 or 3 persons, or can be used as an accent table in a living room or entrance hallway.
16	9	Small Chair	5.0000	1	Furniture	http://www.brookstone.com/dis/dw/image/v2/AAYH_PRD/on/demandware.static/-/Sites-itemmaster_Brookstone/default/dw828da71f/hi-res/991174p.jpg?sw=325	Small chair with slats. Made from lightweight beech wood. Easy to clean.
17	10	Coffee Beans	4.9900	10	Food and Drinks	http://static.wixstatic.com/media/34793e_7b30181368f54448a16cd8f0ef3abc9a.jpg/v1/fill/w_325,h_325,q_85,usm_0.66_1.00_0.01/34793e_7b30181368f54448a16cd8f0ef3abc9a.jpg	Creamy and smooth with a nutty finish. Preaparation - washed. Sold in 500g packs.
18	10	Muffin	3.5000	10	Food and Drinks	http://static1.squarespace.com/static/544e9769e4b0529748d842f0/t/5463c8f4e4b01221357f7cd3/1415825652388/	Double chocolate chip muffins (4 pieces) filled with a gooey caramel center. Baked with no nuts.
\.


--
-- Name: stock_sid_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('stock_sid_seq', 18, true);


--
-- Data for Name: transactions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY transactions (tid, sid, uid, type, photourl) FROM stdin;
1	3	1	PURCHASE	http://rlv.zcache.com/eagle_fleece_blanket-r1da8dc7d4f5d4589b9dc8a6edd45bf2d_zkij0_325.jpg?rlvnet=1
2	1	9	PURCHASE	http://www.bhphotovideo.com/images/categoryImages/desktop/325x325/21008-Mirrorless-System-Cameras.jpg
3	4	3	PURCHASE	http://www.namastenewzealand.com/wp-content/uploads/2015/08/Rotorua-Rainbow-Springs-Kiwi-Wildlife-Park-350x350.jpg
4	5	4	PURCHASE	http://www.brookstone.com/dis/dw/image/v2/AAYH_PRD/on/demandware.static/-/Sites-itemmaster_Brookstone/default/dw2951e8c7/hi-res/764054p.jpg?sw=325
5	14	1	PURCHASE	http://www.buyyourties.com/image/cache/byt/2000-SCARFZ/SCARF-Z-4-325x325.jpg
6	14	9	PURCHASE	http://www.buyyourties.com/image/cache/byt/2000-SCARFZ/SCARF-Z-4-325x325.jpg
7	14	8	PURCHASE	http://www.buyyourties.com/image/cache/byt/2000-SCARFZ/SCARF-Z-4-325x325.jpg
8	18	7	PURCHASE	http://static1.squarespace.com/static/544e9769e4b0529748d842f0/t/5463c8f4e4b01221357f7cd3/1415825652388/
9	17	7	PURCHASE	http://static.wixstatic.com/media/34793e_7b30181368f54448a16cd8f0ef3abc9a.jpg/v1/fill/w_325,h_325,q_85,usm_0.66_1.00_0.01/34793e_7b30181368f54448a16cd8f0ef3abc9a.jpg
10	18	5	PURCHASE	http://static1.squarespace.com/static/544e9769e4b0529748d842f0/t/5463c8f4e4b01221357f7cd3/1415825652388/
11	11	11	PURCHASE	http://www.briscoes.co.nz/productimages/medium/1/19242_44632_40836.jpg
12	11	2	PURCHASE	http://www.briscoes.co.nz/productimages/medium/1/19242_44632_40836.jpg
13	11	10	PURCHASE	http://www.briscoes.co.nz/productimages/medium/1/19242_44632_40836.jpg
14	11	1	PURCHASE	http://www.briscoes.co.nz/productimages/medium/1/19242_44632_40836.jpg
15	9	10	PURCHASE	http://www.womenofchina.cn/res/womenofchina/1301/i.jpg
16	3	10	PURCHASE	http://rlv.zcache.com/eagle_fleece_blanket-r1da8dc7d4f5d4589b9dc8a6edd45bf2d_zkij0_325.jpg?rlvnet=1
17	17	6	PURCHASE	http://static.wixstatic.com/media/34793e_7b30181368f54448a16cd8f0ef3abc9a.jpg/v1/fill/w_325,h_325,q_85,usm_0.66_1.00_0.01/34793e_7b30181368f54448a16cd8f0ef3abc9a.jpg
18	13	10	PURCHASE	http://www.fashion-fit.us/ff2016_files/image048.jpg
\.


--
-- Name: transactions_tid_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('transactions_tid_seq', 18, true);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY users (uid, username, realname, password, address, email, rating, photo, feedback) FROM stdin;
1	admin	Sally Smith	1337	11 Pattie Street	sulkysally@yahoo.com	4	http://img.thesun.co.uk/aidemitlum/archive/00908/woman-280_908421a.jpg	Excellent buyer. A++++++.
2	j0nny	John Diggle	password	22 Fitzherbert Avenue	digglelove@hotmail.com	3	https://pbs.twimg.com/profile_images/661041286942584832/a5SW7Qz5.jpg	Good buyer, prompt payment, valued customer, highly recommended.
3	james	James Green	green	9 Evergreen Royale Subd	greenjames@mailme.com	2	https://lh3.googleusercontent.com/-Pcv8Ya-Jij8/AAAAAAAAAAI/AAAAAAAADPY/D4YsBTDXvZU/photo.jpg	Lovely buyer. A pleasure doing business with. 
4	zoo	Monty Python	dinosaur	3 Rupiah Street	python_guy@gmail.com	1	http://1.bp.blogspot.com/-aeF1Vhzaeck/UQnxO4lKlkI/AAAAAAAAGc0/1ajSxMIqBqc/s1600/SMCARRADINE2.jpg	Terrible buyer! Do not sell anything for this person.
5	qwerty	Zoe Curtis	purple	Taal Avenue, Quezon City	zoeba@live.com	5	http://tubestatic.orf.at/static/images/site/tube/2016025/orf_zoe_artist-neu.5440160.jpg	Good buyer, prompt payment, valued customer, highly recommended.
6	Cambel	Thea Queen	something	213 Curly Subd	queen.thea01@yahoo.com	1	http://www.squamartworkshops.com/stuff/contentmgr/files/0/3673c4f957af7e7e4dfc41623132a2c9/image/_resized/30_360_312_thea_bio_pic_june_2013.jpg	Terrible buyer! Do not sell anything for this person.
7	Waities	Kara Danvers	secure	2 May Street	danvers_kara@hotmail.com	4	https://media2.giphy.com/media/W2OIvtTtKZWHm/200_s.gif	Excellent buyer. A++++++.
8	Cam	Camile Jones	12345	11 Wilford Boulevard	msjones@hotmail.com	5	http://www.udel.edu/udaily/2011/sep/images/jonescamille.jpg	Excellent buyer. A++++++.
9	grod	Cameron Smith	dfgh	62 Hewer Crescent	cameronsmith222@live.com	5	https://auctiondesq.imgstg.com/assets/auctiondesq/lots/images/main/CameronSmith2.jpg	Good buyer, prompt payment, valued customer, highly recommended.
10	flash	Barry Allen	falsh	10 Flash Street	allenbarrygod@mailme.com	3	http://images.mstarsnews.musictimes.com/data/images/full/72932/grant-gustin.jpg?w=600	Good buyer, prompt payment, valued customer, highly recommended.
11	arrow	Oliver Queen	arrow	16 Hells Kitchen	arrow_guy@hotmail.com	2	https://s-media-cache-ak0.pinimg.com/736x/a0/3f/c9/a03fc90ec7a81332322d2723d972ffdc.jpg	Lovely buyer. A pleasure doing business with. 
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
