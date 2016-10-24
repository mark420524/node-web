-- ----------------------------
-- 使用说明：
--  1. 采用分库和分表保存，所以会建立多个数据库。
--  2. 创建数据库可以访问的用户和口令。
--  3. 库和表建立后，要在MyCat中进行配置。
--  4. 请使用root账号登录后创建。
-- ----------------------------
create database if not exists blog_db_001 default charset utf8 collate utf8_general_ci;


grant all on blog_db_001.* to blog@'%' identified by '$20%24^7blog';

flush privileges;