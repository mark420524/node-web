/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50528
Source Host           : 127.0.0.1:3306
Source Database       : programmer_db

Target Server Type    : MYSQL
Target Server Version : 50528
File Encoding         : 65001

Date: 2015-11-26 09:59:04
*/

SET FOREIGN_KEY_CHECKS=0;
-- 使用root创建数据库
create database if not exists programmer_db default charset utf8mb4 collate utf8mb4_general_ci;
-- 创建用户
create user 'programmer'@'%' identified by '$20%24^7programmer';
grant all on programmer_db.* to 'programmer'@'%';

drop table if exists silivall_user_account;

drop table if exists silivall_user_info;

drop table if exists silivall_user_oauth;

create table silivall_user_oauth
(
   id                   int(11) not null  AUTO_INCREMENT comment '授权ID',
   uid                  int(11) not null comment '会员ID，分表列',
   oauth_third_id       varchar(50) not null comment '第三方平台ID',
   openid               varchar(300) not null comment '第三方平台会员唯一ID',
   access_token         varchar(300) comment '令牌',
   token_expires        datetime comment '令牌过期时间',
   create_time          datetime not null comment '创建时间',
   update_time          datetime comment '最后更新时间',
   primary key (id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

alter table silivall_user_oauth comment '会员授权表';



CREATE TABLE silivall_generate_id (
type  varchar(10) NOT NULL  comment '主键类型',
value  int(11) NULL  comment '主键类型 值',
create_time          datetime not null comment '创建时间',
update_time          datetime comment '最后更新时间',
PRIMARY KEY (type)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

alter table silivall_generate_id comment '主键值保存表';


create table silivall_user_account
(
   uid                  int(11) not null AUTO_INCREMENT comment '会员ID，分表列',
   silivall_account     varchar(50) comment '账号，唯一，不验证',
   handset_account      varchar(20) comment '手机账号，唯一，要验证',
   email_account        varchar(100) comment '邮箱账号，唯一，要验证',
   passwd               varchar(100) comment '登录口令，MD5加密存储',
   passwd_strength      char(1) comment '密码强度 1-弱 2-中 3-强',
   handset_act_status   char(1) comment '手机激活状态，0-未激活 1-已激活',
   email_act_status     char(1) comment '邮箱激活状态，0-未激活 1-已激活',
   user_type            char(1) comment '用户类型 1-买家  2-卖家',
   level_id             varchar(39) comment '会员等级ID',
   status               char(1) not null comment '状态 0-未激活 1-正常 2-冻结 3-待审 4-删除',
   reg_source           varchar(10) comment '注册来源',
   create_time          datetime not null comment '注册时间',
   update_time          datetime comment '最后修改时间',
   freeze_reason        varchar(500) comment '冻结原因',
   freeze_time          datetime comment '冻结时间',
   freeze_admin_id      int(11) comment '冻结客服人员ID',
   unfreeze_status      char(1) comment '解冻状态，0-未申请 1-已申请 2-未通过 3-已通过',
   unfreeze_desc        varchar(500) comment '解冻申请描述',
   unfreeze_reason      varchar(500) comment '解冻原因',
   unfreeze_admin_id    int(11) comment '解冻客户人员ID',
   unfreeze_time        datetime comment '解冻时间',
   primary key (uid)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

alter table silivall_user_account comment '会员登录账号表';


create table silivall_hx_token 
(
   id			int(11) not null auto_increment comment 'token 主键',
   access_token		varchar(254) comment '环信token',
   expires_in		datetime comment '环信token过期时间',
   application		varchar(36) comment '当前app的UUID值',
   create_time		datetime not null comment '记录时间',
--   update_time		datetime comment '最后更新时间',
   primary key (id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

alter table silivall_hx_token comment '环信token信息记录表';