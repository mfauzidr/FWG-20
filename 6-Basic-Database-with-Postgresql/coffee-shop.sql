-- Table Users --
create table if not exists "users" (
"id" serial primary key,
"fullName" varchar(30) not null,
"email" varchar(30) unique not null,
"password" varchar(100) not null,
"address" text,
"picture" text,
"phoneNumber" varchar(15) not null,
"role" varchar(20),
"createdAt" timestamp default now(),
"updatedAt" timestamp
);

-- create --
insert into "users" ("fullName","email","password","address","phoneNumber","role")
values
	('Rizky Ananda', 'rizky.ananda@gmail.com', 'P@ssw0r', 'Jl. Merdeka No. 123, Jakarta', '081234567890', 'admin'),
	('Siti Rahayu', 'siti.rahayu12@gmail.com', 'S1t!P@ss', 'Jl. Jendral Sudirman No. 45, Surabaya', '081345678901', 'staff'),
	('Dewi Pratiwi', 'dewi.pratiwi@gmail.com', 'D3w!P@ss', 'Jl. Diponegoro No. 67, Bandung', '081456789012', 'customer'),
	('Aldi Wijaya', 'aldi.wijaya2@gmail.com', 'A1d!P@ss', 'Jl. Gajah Mada No. 89, Yogyakarta', '081567890123', 'admin'),
	('Putri Kusuma', 'putri.kusuma2@gmail.com', 'P2tr!P@ss', 'Jl. Surya Kencana No. 34, Semarang', '081678901234', 'staff'),
	('Budi Setiawan', 'budi.setiawan2@gmail.com', 'Bud!P@ss', 'Jl. Pahlawan No. 56, Medan', '081789012345', 'customer'),
	('Siti Rahmawati', 'siti.rahmawati@gmail.com', 'S1t!P@ss', 'Jl. Jendral Sudirman No. 34, Makassar', '081789012345', 'staff'),
	('Fauzi Pratama', 'fauzi.pratama@gmail.com', 'F@!z!P@ss', 'Jl. Gajah Mada No. 67, Palembang', '081890123456', 'customer'),
	('Anita Putri', 'anita.putri@gmail.com', 'An!t@P@ss', 'Jl. Diponegoro No. 12, Medan', '081901234567', 'staff'),
	('Yusuf Setiawan', 'yusuf.setiawan@gmail.com', 'Y!s!fP@ss', 'Jl. Jendral Sudirman No. 56, Pontianak', '081012345678', 'customer'),
	('Alya Indah', 'alya.indah@gmail.com', 'A1y@P@ss', 'Jl. Merdeka No. 23, Batam', '081123456789', 'customer'),
	('Budi Santoso', 'budi.santoso@gmail.com', 'Bud!P@ss', 'Jl. Teuku Umar No. 45, Balikpapan', '081234567890', 'customer');
	
-- read --
select * from "users";
select "fullName", "email", "address", "picture", "phoneNumber", "role", "createdAt", "updatedAt" from "users"

-- update --
update "users"
set "role" = 'staff',
	"updatedAt" = NOW()
where "id" = 6;

-- delete --
delete from "users"
where "id" = '6',
	"updatedAt" = NOW()
returning *;

-- table Products --
create table if not exists "products" (
"id" serial primary key,
"name" varchar(30) not null,
"description" text not null,
"basePrice" int not null,
"image" text,
"discount" int,
"isRecommended" bool,
"createdAt" timestamp default now(),
"updatedAt" timestamp
);

-- create --
insert into "products" ("name","description","basePrice","discount","isRecommended")
values
	('Kopi Tubruk', 'kopi khas Jawa', 20000, 0, true),
	('Kopi Latte', 'kopi susu dengan rasa lembut', 25000, 0, true),
	('Kopi Tarik', 'kopi Malaysia', 22000, 0, true),
	('Kopi Hitam', 'kopi hitam tanpa gula', 18000, 0, true),
	('Kopi Toraja', 'kopi Toraja', 28000, 0, true),
	('Kopi Mocha', 'kopi dengan rasa cokelat', 26000, 0, true),
	('Kopi Cappuccino', 'kopi dengan busa susu', 28000, 0, true),
	('Kopi Espresso', 'kopi kuat tanpa gula', 20000, 0, true),
	('Kopi Kopi Kopi', 'kopi dengan rasa kopi kuat', 22000, 0, true),
	('Kopi Kenangan', 'kopi kenangan masa lalu', 26000, 0, true),
	('Kopi Vietnam', 'kopi gayo dari Vietnam', 28000, 0, true),
	('Kopi Rum Raisin', 'kopi dengan rasa rum raisin', 25000, 0, true),
	('Kopi Blue Mountain', 'kopi blue mountain', 26000, 0, true),
	('Kopi Tiramisu', 'kopi dengan rasa tiramisu', 23000, 0, true),
	('Kopi Keju', 'kopi dengan rasa keju', 23000, 0, true),
	('Kopi Aceh Gayo', 'kopi aceh gayo', 27000, 0, true),
	('Kopi Tubruk', 'kopi khas Jawa', 20000, 0, true),
	('Mie Gomak', 'Mie khas Batak', 26000, 0, true),
	('Nasi Rawon', 'nasi rawon', 35000, 0, true),
	('Nasi Goreng', 'nasi goreng dengan telur dan ayam', 35000, 0, true),
	('Mie Ayam', 'Mie ayam dengan daging ayam', 25000, 0, true),
	('Nasi Kuning', 'nasi kuning dengan telur dan ayam', 32000, 0, true),
	('Nasi Rendang', 'nasi rendang', 38000, 0, true),
	('Nasi Ayam Geprek', 'nasi ayam geprek dengan sambal', 35000, 0, true),
	('Nasi Soto', 'nasi soto ayam dengan kuah kaldu', 30000, 0, true),
	('Nasi Kari', 'nasi kari ayam dengan kuah kari', 33000, 0, true),
	('Nasi Pecel', 'nasi pecel dengan sayuran', 32000, 0, true),
	('Nasi Timbel', 'nasi timbel khas Sunda', 33000, 0, true),
	('Nasi Liwet', 'nasi liwet khas Solo', 33000, 0, true),
	('Nasi Uduk', 'nasi uduk khas Betawi', 35000, 0, true);

-- read --
select * from "products";
select "name", "description", "basePrice", "isRecommended", "createdAt", "updatedAt" from "products";

-- update --
update "products"
set "name" = 'Kopi Jawa',
	"updatedAt" = NOW()
where "id" = 1;

update "products"
set "basePrice" =
	case 
		when "id" = 1 then 16000
		when "id" = 2 then 22000
		when "id" = 3 then 15000
	end,
	"updatedAt" = NOW()
where "id" in (1, 2, 3);

-- delete --
delete from "products"
where "id" = 2
returning *;

-- table Product size --
create table if not exists "productSize" (
"id" serial primary key,
"size" varchar(15),
"additionalPrice" numeric(12,2),
"createdAt" timestamp default now(),
"updatedAt" timestamp
);

insert into "productSize" ("size","additionalPrice")
values
	('small',0),
	('medium',5000),
	('large',8000);

-- table Variants --
create table if not exists "productVariant" (
"id" serial primary key,
"name" varchar(30) not null,
"additionalPrice" numeric(12,2),
"createdAt" timestamp default now(),
"updatedAt" timestamp
);

insert into "productVariant" ("name","additionalPrice")
values
	('hot',0),
	('cold',0),
	('pedas 1-5',0),
	('pedas 6-10',2000);

-- table Tags --
create table if not exists "tags" (
"id" serial primary key,
"name" varchar(30) not null,
"createdAt" timestamp default now(),
"updatedAt" timestamp
);

insert into "tags" ("name")
values 
	('Buy 1 Get 1'),
	('Flash sale'),
	('Birthday Package'),
	('Cheap');

-- table Product Tags (Relation) --
create table if not exists "productTags" (
"id" serial primary key,
"productId" int references "products"("id"),
"tagId" int references "tags"("id"),
"createdAt" timestamp default now(),
"updatedAt" timestamp
);
	
insert into "productTags"("productId","tagId")
values
	(1, 4), (2, 4), (3, 2), (4, 1), (5, 4), (6, 3), (7, 4), (8, 4), (9, 3), (10, 3), (11, 4),
	(12, 2), (13, 3), (14, 2), (15, 4), (16, 4), (17, 3), (18, 4), (19, 3), (20, 2), (21, 3),
	(22, 3), (23, 3), (24, 2), (25, 1), (26, 2), (27, 3), (28, 3), (29, 2), (30, 4), (1, 3),
	(2, 3), (3, 3), (4, 4), (5, 1), (6, 3), (7, 1), (8, 2), (9, 1), (10, 1), (11, 2), (12, 3),
	(13, 4), (14, 1), (15, 4), (16, 2), (17, 3), (18, 4), (19, 2), (20, 2), (21, 3), (22, 1),
	(23, 4), (24, 1), (25, 2), (26, 4), (27, 4), (28, 3), (29, 3), (30, 2);

select "p"."name" as "productName", "t"."name" as "tag"
from "products" "p" 
join "productTags" "pt" on "p"."id" = "pt"."productId"
join "tags" "t" on "pt"."tagId" = "t"."id" order by "p"."name";

-- table Product Ratings --
create table if not exists "productRatings" (
"id" serial primary key,
"productId" int references "products"("id"),
"rate" int check (rate >= 0 and rate <= 5),
"reviewMessage" text,
"userId" int references "users"("id"),
"createdAt" timestamp default now(),
"updatedAt" timestamp
);

insert into "productRatings" ("productId", "rate", "reviewMessage", "userId")
values 
	(1, 4, 'Sangat suka dengan rasa kopinya!', 3),
	(2, 5, 'Rasa kopi lembut dan susunya pas!', 6),
	(3, 4, 'Saya suka dengan cita rasanya yang khas.', 10),
	(20, 4, 'Nasi gorengnya enak dan porsi cukup besar.', 11),
	(23, 5, 'Rendangnya empuk dan bumbunya pas.', 3),
	(30, 4, 'Nasi uduknya gurih dan lezat.', 6);

select "p"."name" as "productName", "u"."fullName" as "customerName", "pr"."reviewMessage" as "review"
from "products" "p" 
join "productRatings" "pr" on "p"."id" = "pr"."productId"
join "users" "u" on "pr"."userId" = "u"."id" order by "p"."name";

-- table Categories --
create table if not exists "categories" (
"id" serial primary key,
"name" varchar(30) not null,
"createdAt" timestamp default now(),
"updatedAt" timestamp
);

insert into "categories" ("name")
values
	('Favorite Product'),
	('Coffee'),
	('Non Coffee'),
	('Foods'),
	('Add On');

-- table Product Categories (Relation) --
create table if not exists "productCategories" (
"id" serial primary key,
"productId" int references "products"("id"),
"categoryId" int references "categories"("id"),
"createdAt" timestamp default now(),
"updatedAt" timestamp
);

insert into "productCategories" ("productId","categoryId")
values 
	(1,2), (2,2), (3,2), (4,2), (5,2), (6,2), (7,2), (8,2), (9,2), (10,2), (11,2), (12,2),
	(13,2), (14,2), (15,2), (16,2), (17,2), (18,4), (19,4), (20,4), (21,4), (22,4), (23,4), (24,4),
	(25,4), (26,4), (27,4), (28,4), (29,4), (30,4), (1,1), (10,1), (23,1);

select "p"."name" as "productName", "c"."name" as "category"
from "products" "p" 
join "productCategories" "pc" on "p"."id" = "pc"."productId"
join "categories" "c" on "pc"."categoryId" = "c"."id" order by "p"."name";

-- table Promos --
create table if not exists "promos" (
"id" serial primary key,
"name" varchar(30) not null,
"code" varchar(30) not null,
"description" text,
"percentage" int,
"isExpired" bool null,
"maximumPromo" numeric(12,2) not null,
"minimumAmount" numeric(12,2) not null,
"createdAt" timestamp default now(),
"updatedAt" timestamp
);

-- create --
insert into "promos" ("name", "code", "description", "percentage", "isExpired", "maximumPromo", "minimumAmount")
values
    ('Promo Kopi Gratis', 'FREECOFFEE', 'Dapatkan kopi gratis setiap pembelian 5 kopi.', 100, false, 10000, 25000),
    ('Diskon 20% Kopi Latte', 'LATTE20', 'Diskon 20% untuk kopi latte pilihanmu.', 20, false, 5000, 15000),
    ('Kopi Tarik Hemat', 'TARIK5', 'Dapatkan diskon 5% untuk setiap kopi tarik.', 5, false, 8000, 20000),
    ('Promo Double Espresso', 'DOUBLEESP', 'Dapatkan double espresso dengan harga khusus.', 50, false, 15000, 30000),
    ('Hari Ini Cuma 10K', 'TENKOFF', 'Hari ini semua kopi hanya 10 ribu rupiah.', 100, false, 10000, 20000),
    ('Espresso Gratis', 'FREEESP', 'Beli 2 espresso, dapatkan 1 espresso gratis.', 100, false, 8000, 18000);

-- read --
select * from "promos";
select "code", "description", "percentage", "maximumPromo", "minimumAmount", "createdAt", "updatedAt"
from "promos"

-- update --
update "promos"
set "name" = 'Promo Americano',
	"description" = 'Dapatkan Ice Americano dengan Harga Khusus',
	"updatedAt" = NOW()
where "id" = 4;

-- delete --
delete from "promos"
where "id" = 5
returning *;

-- table Orders --
create table if not exists "orders" (
"id" serial primary key,
"userId" int references "users"("id"),
"orderNumber" varchar(15) unique not null,
"promoId" int references "promos"("id"),
"total" numeric(12,2),
"taxAmount" numeric(12,2),
"status" text,
"deliveryAddress" text,
"fullName" varchar(30) not null,
"email" varchar(30) not null,
"createdAt" timestamp default now(),
"updatedAt" timestamp
);

-- create --

-- order 1 --
insert into "orders" ("userId", "orderNumber", "total", "status", "deliveryAddress", "fullName", "email")
values 
	(1, 'ord1', (select "basePrice" from "products" where "id" = 4), 'on-progress', 'Jl. Merdeka No. 123, Jakarta', 'Rizky Ananda', 'rizky.ananda@gmail.com');

-- order 2-4 --
insert into "orders" ("userId", "orderNumber", "total", "status", "deliveryAddress", "fullName", "email")
values 
    (2, 'ord2', (select "basePrice" from "products" where "id" = 2), 'ready-to-pick', null, 'Siti Rahayu', 'siti.rahayu12@gmail.com'),
    (2, 'ord3', (select "basePrice" from "products" where "id" = 6), 'ready-to-pick', null, 'Siti Rahayu', 'siti.rahayu12@gmail.com'),
    (2, 'ord4', (select "basePrice" from "products" where "id" = 2), 'ready-to-pick', null, 'Siti Rahayu', 'siti.rahayu12@gmail.com');

-- order 5 --   
insert into "orders" ("userId", "orderNumber", "total", "status", "deliveryAddress", "fullName", "email")
values 
	(3, 'ord5', (select SUM("basePrice") from "products" where "id" in (1, 3, 2, 6, 27)), 'delivered', 'Jl. Diponegoro No. 67, Bandung', 'Dewi Pratiwi', 'dewi.pratiwi@gmail.com');

-- order 6 --
insert into "orders" ("userId", "orderNumber", "total", "status", "deliveryAddress", "fullName", "email")
values 
	(4, 'ord6', (select SUM("basePrice") from "products" where "id" in (1, 2, 16, 6, 10)), 'ready-to-pick', null, 'Aldi Wijaya', 'aldi.wijaya2@gmail.com');

-- read --
select * from "orders";
select "orderNumber", "total", "taxAmount", "fullName", "deliveryAddress", "status", "createdAt", "updatedAt" from "orders";

-- update --
update "orders"
set "orderNumber" =
    case
        when "id" = 1 then 'ORDER-001'
        when "id" = 2 then 'ORDER-002'
        when "id" = 3 then 'ORDER-003'
        when "id" = 4 then 'ORDER-004'
        when "id" = 5 then 'ORDER-005'
        when "id" = 6 then 'ORDER-006'
    end,
	"updatedAt" = NOW()
where "id" in (1, 2, 3, 4, 5, 6);

-- delete --
delete from "orders"
where "orderNumber" = 'ORDER-003'
returning *;

-- table order Details --
create table if not exists "orderDetails" (
"id" serial primary key,
"productId" int references "products"("id"),
"productSizeId" int references "productSize"("id"),
"productVariantId" int references "productVariant"("id"),
"quantity" int not null,
"orderId" int references "orders"("id"),
"createdAt" timestamp default now(),
"updatedAt" timestamp
);

insert into "orderDetails" ("productId", "productVariantId", "productSizeId", "quantity", "orderId")
values 
	(4, 1, 1, 1, (select "id" from "orders" where "orderNumber" = 'ORDER-001')),
    (2, 1, 1, 1, (select "id" from "orders" where "orderNumber" = 'ORDER-002')),
    (6, 2, 2, 1, (select "id" from "orders" where "orderNumber" = 'ORDER-003')),
    (3, 2, 3, 1, (select "id" from "orders" where "orderNumber" = 'ORDER-004')),
    (1, 1, 1, 1, (select "id" from "orders" where "orderNumber" = 'ORDER-005')),
    (3, 2, 2, 1, (select "id" from "orders" where "orderNumber" = 'ORDER-005')),
    (19, 3, 3, 1, (select "id" from "orders" where "orderNumber" = 'ORDER-005')),
    (2, 1, 2, 1, (select "id" from "orders" where "orderNumber" = 'ORDER-005')),
    (27, 4, 1, 1, (select "id" from "orders" where "orderNumber" = 'ORDER-005')),
    (17, 1, 1, 1, (select "id" from "orders" where "orderNumber" = 'ORDER-006')),
    (2, 2, 2, 1, (select "id" from "orders" where "orderNumber" = 'ORDER-006')),
    (16, 2, 3, 1, (select "id" from "orders" where "orderNumber" = 'ORDER-006')),
    (6, 1, 2, 1, (select "id" from "orders" where "orderNumber" = 'ORDER-006')),
    (10, 2, 1, 1, (select "id" from "orders" where "orderNumber" = 'ORDER-006'));
   
select * from "orderDetails";
   
select
    "o"."orderNumber",
    "u"."fullName" as "customerName",
    "p"."name" as "productName",
    "ps"."size",
    "pv"."name" as "variant",
    "od"."quantity",
    "p"."basePrice" as "price",
    "ps"."additionalPrice" + "pv"."additionalPrice" as "additional",
    "od"."quantity" * ("p"."basePrice" + "ps"."additionalPrice" + "pv"."additionalPrice") as "totalPurchase",
    "o"."taxAmount",
    "o"."deliveryAddress",
    "o"."status"
from
    "orders" "o"
join "users" "u" on "o"."userId" = "u"."id"
join "orderDetails" "od" on "o"."id" = "od"."orderId"
join "products" "p" on "od"."productId" = "p"."id"
join "productSize" "ps" on "od"."productSizeId" = "ps"."id"
join "productVariant" "pv" on "od"."productVariantId" = "pv"."id";
-- where "o"."id" = 5;

-- search Product by Name --
select "id", "name", "description", "basePrice", "isRecommended", "createdAt", "updatedAt" 
from "products"
where "name" ilike '%tor%';

-- filter product by name, category, promo, and/or price --
select "p"."name" as "productName","c"."name" as "category", "p"."description", "p"."basePrice", "p"."createdAt", "p"."updatedAt" 
from "products" "p" 
join "productCategories" "pc" on "p"."id" = "pc"."productId"
join "categories" "c" on "pc"."categoryId" = "c"."id"
--where "p"."name" ilike '%am%'
--order by "p"."basePrice" asc;
where "c"."name" ilike '%cof%' --by Category Name
and "p"."basePrice" between '20000' and '30000' --range price
--order by "p"."basePrice" asc;
order by "p"."name" desc;

-- Pagination --
select 
    "id",
    "name",
    "image",
    "description", 
    "basePrice",
    "isRecommended"
from "products"
where "name" ilike '%ko%'
order by "id"
limit 10 offset 0;

-- Popular Product (By Ordered Product) --
SELECT 
    "od"."productId",
    COUNT("od"."productId") AS "totalOrders",
    "p"."name" AS "productName",
    "p"."description",
    "p"."basePrice",
    "p"."isRecommended",
    "p"."createdAt",
    "p"."updatedAt"
FROM 
    "orderDetails" "od"
JOIN 
    "products" "p" ON "od"."productId" = "p"."id"
GROUP BY 
    "od"."productId", "p"."name", "p"."description", "p"."basePrice", "p"."isRecommended", "p"."createdAt", "p"."updatedAt"
HAVING 
    COUNT("od"."productId") >= 3 -- Jika jumlah pembelian lebih dari 3 kali
ORDER BY 
    "totalOrders" DESC;
