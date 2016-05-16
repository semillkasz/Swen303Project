CREATE DATABASE "SWEN303" WITH TEMPLATE = template0 ENCODING = 'SQL_ASCII' LC_COLLATE = 'C' LC_CTYPE = 'C';

\connect "SWEN303"

SET default_tablespace = '';

SET default_with_oids = false;

CREATE TABLE transactions (
    tid integer NOT NULL,
    pid integer,
    uid integer,
    type character varying(10)
);

CREATE TABLE users (
    uid integer NOT NULL,
    username character varying(50),
    realname character varying(100),
    password character varying(50), 
    email character varying(100),
    address character varying(100),
    phoneNumber integer
);

CREATE TABLE product (
	pid integer NOT NULL,
	stock integer,
	label character varying(100),
	price numeric(10,2),
	tags character varying(100),
	photourl character varying(200),
	description character varying(100)
);

CREATE SEQUENCE users_uid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE SEQUENCE transactions_tid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

COPY product (pid, stock, label, price, tags, photoURL, description) FROM stdin;
1	1	Camera	12.9000	electronics	http://www.bhphotovideo.com/images/categoryImages/desktop/325x325/21008-Mirrorless-System-Cameras.jpg	
2	1	Hat	30.0000	clothing	 	 
3	2	Bald Eagle	999.9900			
4	2	Kiwi	49999.9900			
5	3	Snakes and Ladders	1.0000			
6	3	Monopoly	3.0000			
7	4	Holy Grail	0.9900			
8	5	Meaning of Life	42.0000			
9	5	Cactus	9.9900			
10	5	Iris	9.9900			
11	6	Knives	15.5000			
12	6	Sword	49.9700			
13	7	Kryptonite	0.5000			
14	7	S Clothing Patch	5.9900			
15	8	Table	10.0000			
16	9	Small Chair	5.0000			
\.

COPY transactions (tid, pid, uid, type) FROM stdin;
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

COPY users (uid, username, realname, password, email, address, phoneNumber) FROM stdin;
1	j0nny	John Diggle	password	j@email.com	address1	2468102
2	james	James Green	green	jgreen@email.com		1357910
\.
