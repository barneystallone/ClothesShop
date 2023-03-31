Create user 'testuser'@'%' IDENTIFIED BY 'user';
GRANT ALL PRIVILEGES ON clothesShop.* TO 'testuser'@'%' ;

drop database if exists  clothesShop;
create database clothesShop;
use clothesShop;

SET NAMES utf8; -- encoding


-- create table 
drop table if exists  category;
create table category (
	id int not null auto_increment ,
    category_name nvarchar(150) default 'default',
    category_slug varchar(40)  unique not null,
    p_category_id int  references category(id) ,
    
    primary key (id)
); 
-- DROP INDEX  idx_slug  ON category;
alter table category add unique idx_slug (category_slug);

-- Procedure getAllCategory
DROP PROCEDURE IF EXISTS proc_getCategories;
delimiter //
CREATE PROCEDURE proc_getCategories()
begin
	
	SELECT json_arrayagg( JSON_OBJECT(
		'id', c.id, 
        'category_name', c.category_name, 
        'category_slug', c.category_slug,
       'sub_category' ,(select  json_arrayagg(
				JSON_OBJECT(
						'id', sc.id, 
						'category_name', sc.category_name, 
						'category_slug', sc.category_slug
				) 
        ) from  category sc where sc.p_category_id = c.id )
        )) 'data'  from  category c where c.p_category_id = 1;
       
end//
delimiter ;

call proc_getCategories();


insert into category values 
(null,'Danh mục','all',0) ,
(null,'Áo','ao',1),
(null,'Áo khoác','ao-khoac',1),
(null,'Quần','quan',1) ,
(null,'Set','set',1),
(null,'Chân váy','chan-vay',1),
(null,'Váy đầm','vay-dam',1),
(null,'Áo Crotop', 'ao-croptop',2),
(null,'Áo dài', 'ao-dai',2),
(null,'Áo Ghile', 'ao-ghile',2),
(null,'Áo Hoodies', 'ao-hoodies',2),
(null,'Áo kiểu', 'ao-kieu',2),
(null,'Áo Polo', 'ao-polo',2),
(null,'Áo sơ mi', 'ao-somi',2),
(null,'Áo thun', 'ao-thun',2),
(null,'Áo Mangto','ao-mangto',3),
(null,'Khoác Cadigan','khoac-cadigan',3),
(null,'Khoác Kaki','khoac-kaki',3),
(null,'Khoác Kiểu','khoac-kieu',3),
(null,'Quần Dài','quan-dai',4),
(null,'Quần Jean','quan-jean',4),
(null,'Quần Kaki','quan-kaki',4),
(null,'Quần Legging','quan-legging',4),
(null,'Quần Short','quan-short',4),
(null,'Quần Tây','quan-tay',4),
(null,'Set Quần','set-quan',5),
(null,'Set Váy','set-vay',5),
(null,'Chân váy Bút Chì','chan-vay-but-chi',6),
(null,'Chân Váy Chữ A','chan-vay-chu-a',6),
(null,'Chân Váy Xếp Ly','chan-vay-xep-ly',6),
(null,'Chân Váy Xòe','chan-vay-xoe',6),
(null,'Váy 2 Dây','vay-2-day',7),
(null,'Váy Babydoll','vay-babydoll',7),
(null,'Váy Chữ A','vay-chu-a',7),
(null,'Váy Dài','vay-dai',7),
(null,'Váy Đuôi Cá','vay-duo-ica',7),
(null,'Váy Polo','vay-polo',7),
(null,'Váy Thiết Kế','vay-thiet-ke',7),
(null,'Váy Yếm','vay-yem',7);




