drop database if exists  clothesShop;
create database clothesShop;
use clothesShop;
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
---




