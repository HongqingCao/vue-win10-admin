/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 80019
Source Host           : localhost:3306
Source Database       : db_win

Target Server Type    : MYSQL
Target Server Version : 80019
File Encoding         : 65001

Date: 2020-07-19 20:21:11
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for db_auth
-- ----------------------------
DROP TABLE IF EXISTS `db_auth`;
CREATE TABLE `db_auth` (
  `id` int NOT NULL AUTO_INCREMENT,
  `authority_id` varchar(20) DEFAULT NULL,
  `authority_name` varchar(48) DEFAULT NULL COMMENT '权限名称',
  `authority_type` int DEFAULT NULL COMMENT '权限类型: 0：菜单（默认0），1：操作和功能',
  `authority_url` varchar(128) DEFAULT NULL COMMENT '权限标识',
  `authority_sort` int DEFAULT NULL,
  `parent_id` varchar(20) DEFAULT '0',
  `parent_name` varchar(48) DEFAULT NULL,
  `desc` varchar(128) DEFAULT NULL COMMENT '权限描述',
  `create_user` int DEFAULT NULL,
  `update_user` int DEFAULT NULL,
  `delete_user` int DEFAULT NULL,
  `delete_time` datetime DEFAULT NULL,
  `flag` int DEFAULT '1' COMMENT '状态: 0：删除，1：可用(默认为1)',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of db_auth
-- ----------------------------
INSERT INTO `db_auth` VALUES ('1', 'R6zw8Hly', '仪表盘', '0', 'dashboard', '1', '0', '', '仪表盘', null, '1', null, '2020-07-01 16:45:47', '1', '2020-07-01 16:46:57', '2020-07-08 15:18:06');
INSERT INTO `db_auth` VALUES ('2', 'R6AhD4Jw', '平台管理', '0', 'config', '2', '0', null, '平台管理', null, '1', null, '2020-07-01 16:48:51', '1', '2020-07-01 16:48:55', '2020-07-08 15:32:00');
INSERT INTO `db_auth` VALUES ('3', 'R6Cip4M3', '系统设置', '0', 'systemSetting', '3', '0', null, '系统设置', null, null, null, '2020-07-01 16:58:27', '1', '2020-07-01 16:58:31', '2020-07-01 16:58:33');
INSERT INTO `db_auth` VALUES ('4', 'R6Ej09A1', '权限设置', '0', 'authority', '0', 'R6Cip4M3', '系统设置', '权限设置', null, null, null, '2020-07-01 17:00:27', '1', '2020-07-01 17:00:35', '2020-07-07 21:40:15');
INSERT INTO `db_auth` VALUES ('5', 'R6Fjw3Q4', '角色管理', '0', 'role', '1', 'R6Cip4M3', '系统设置', '角色管理', null, null, null, '2020-07-01 17:01:29', '1', '2020-07-01 17:01:35', '2020-07-01 17:01:37');
INSERT INTO `db_auth` VALUES ('6', 'R6FP04jv', '系统日志', '0', 'log', '4', 'R6Cip4M3', '系统设置', '角色管理', null, '1', null, '2020-07-01 17:02:30', '1', '2020-07-01 17:02:36', '2020-07-17 15:56:08');
INSERT INTO `db_auth` VALUES ('7', 'R6IlvZRb', '用户管理', '0', 'user', '2', 'R6Cip4M3', '系统设置', '用户设置', null, '1', null, '2020-07-01 17:46:36', '1', '2020-07-01 17:46:45', '2020-07-10 14:59:20');
INSERT INTO `db_auth` VALUES ('8', 'R6LCSXn8', '权限列表', '1', '/api/auth/getList', '0', 'R6Ej09A1', '权限列表', 'type,0菜单权限，1操作功能', null, null, null, '2020-07-03 15:13:21', '1', '2020-07-03 15:13:28', '2020-07-03 15:13:31');
INSERT INTO `db_auth` VALUES ('9', 'R6NT1Syx', '新增权限', '1', '/api/auth/createAuth', '1', 'R6Ej09A1', '权限设置', '新增权限', null, null, null, '2020-07-03 15:15:39', '1', '2020-07-03 15:15:45', '2020-07-03 15:15:47');
INSERT INTO `db_auth` VALUES ('10', 'R6O8RN67', '删除权限', '1', '/api/auth/deleteAuth', '2', 'R6Ej09A1', '更新权限', '删除权限', null, null, null, '2020-07-03 15:17:10', '1', '2020-07-03 15:17:12', '2020-07-03 15:17:15');
INSERT INTO `db_auth` VALUES ('11', 'R6O8RN6', '更新权限', '1', '/api/auth/updateAuth', '3', 'R6Ej09A1', '更新权限', '更新权限', null, '1', null, '2020-07-03 15:18:45', '1', '2020-07-03 15:18:47', '2020-07-18 22:23:24');
INSERT INTO `db_auth` VALUES ('12', 'R6O8RN1', '测试', '1', 'test', '1', '0', '测试', null, null, null, null, '2020-07-03 15:33:27', '0', '2020-07-03 15:33:30', '2020-07-03 15:33:33');
INSERT INTO `db_auth` VALUES ('13', 'o1A0GCIxG', '系统日志列表', '1', '/api/log/getList', '0', 'R6FP04jv', '', '系统日志列表', '1', null, '1', '2020-07-08 15:37:58', '0', '2020-07-07 17:32:21', '2020-07-08 15:37:58');
INSERT INTO `db_auth` VALUES ('14', 'ZVR1c_mIA', '测试', '0', 'testtess', '5', '0', null, '开的测试', '1', '1', '1', '2020-07-08 15:47:30', '0', '2020-07-07 19:55:35', '2020-07-08 15:47:30');
INSERT INTO `db_auth` VALUES ('15', 'vm1RYcPlo', '首页设置', '0', 'homePage', '2', 'R6Cip4M3', '系统设置', '首页设置', '1', null, '1', '2020-07-15 15:52:27', '0', '2020-07-07 21:37:20', '2020-07-15 15:52:27');
INSERT INTO `db_auth` VALUES ('16', 'nYf2OlmGy', '获取用户列表', '1', '/api/user/getList', '0', 'R6IlvZRb', '管理员设置', '获取用户列表', '1', '1', null, '2020-07-07 21:38:49', '1', '2020-07-07 21:38:49', '2020-07-15 15:53:41');
INSERT INTO `db_auth` VALUES ('17', 'W6bm46M8T', '轮播图', '0', 'slideshow', '4', 'vm1RYcPlo', '首页设置', '轮播图', '1', null, '1', '2020-07-08 15:48:00', '0', '2020-07-08 10:46:05', '2020-07-08 15:48:00');
INSERT INTO `db_auth` VALUES ('18', 'j-1fD9YEl', '背景', '0', 'background', '1', 'R6AhD4Jw', '平台管理', '系统设置', '1', '1', null, '2020-07-08 10:46:23', '1', '2020-07-08 10:46:23', '2020-07-17 14:54:06');
INSERT INTO `db_auth` VALUES ('19', 'zD5_5LJUQ', '人员管理', '0', 'userManage', '4', '0', null, '人员管理', '1', null, null, '2020-07-08 16:02:26', '1', '2020-07-08 16:02:26', '2020-07-08 16:02:26');
INSERT INTO `db_auth` VALUES ('20', 'CVKN01q8r', '人员列表', '0', 'pepoleList', '0', 'zD5_5LJUQ', '人员管理', '人员列表', '1', null, null, '2020-07-08 16:03:23', '1', '2020-07-08 16:03:23', '2020-07-08 16:03:23');
INSERT INTO `db_auth` VALUES ('21', '8dsJ-8Fmq', '人员权限配置', '0', 'pepoleRole', '0', 'zD5_5LJUQ', '人员管理', null, '1', null, null, '2020-07-08 16:04:05', '1', '2020-07-08 16:04:05', '2020-07-08 16:04:05');
INSERT INTO `db_auth` VALUES ('22', 'z3Kl73yJP', '工作台', '0', 'workplace', '1', 'R6zw8Hly', '仪表盘', '工作台', '1', '1', null, '2020-07-08 16:05:16', '1', '2020-07-08 16:05:16', '2020-07-17 14:56:49');
INSERT INTO `db_auth` VALUES ('23', 'YPwdzlvSi', '分析页面', '0', 'analysis', '1', 'R6zw8Hly', '仪表盘', null, '1', '1', null, '2020-07-08 16:05:58', '1', '2020-07-08 16:05:58', '2020-07-17 14:54:26');
INSERT INTO `db_auth` VALUES ('24', 'SMaog6p8a', '开始', '0', 'begin', '2', 'R6AhD4Jw', '平台管理', '开始', '1', '1', null, '2020-07-08 16:06:25', '1', '2020-07-08 16:06:25', '2020-07-17 14:54:10');
INSERT INTO `db_auth` VALUES ('25', '9Ln1Vy_-p', '111444', '0', '11333', '11', 'R6AhD4Jw', '平台管理', '333', '1', '1', '1', '2020-07-09 11:35:23', '0', '2020-07-08 16:06:38', '2020-07-09 11:35:23');
INSERT INTO `db_auth` VALUES ('26', 'Kzhd4u-y3', '333', '0', '33', '33', 'R6AhD4Jw', '平台管理', '333', '1', null, '1', '2020-07-09 11:35:21', '0', '2020-07-08 16:06:46', '2020-07-09 11:35:21');
INSERT INTO `db_auth` VALUES ('27', 'rbk783aI9', '44', '0', '44', '4', 'R6AhD4Jw', '平台管理', '444', '1', null, '1', '2020-07-09 11:35:17', '0', '2020-07-08 16:06:58', '2020-07-09 11:35:17');
INSERT INTO `db_auth` VALUES ('28', 'W4Cs_302x', '44', '0', '55', '55', 'R6AhD4Jw', '平台管理', '55', '1', null, '1', '2020-07-09 11:35:14', '0', '2020-07-08 16:07:06', '2020-07-09 11:35:14');
INSERT INTO `db_auth` VALUES ('29', 'lekneZO0h', '555', '0', '555', '55', 'R6AhD4Jw', '平台管理', '5', '1', null, '1', '2020-07-09 11:35:13', '0', '2020-07-08 16:07:15', '2020-07-09 11:35:13');
INSERT INTO `db_auth` VALUES ('30', 'u7dJFXAng', '获取角色列表', '1', '/api/role/getAll', '1', 'R6Fjw3Q4', '角色管理', '获取角色列表', '1', null, null, '2020-07-15 15:49:31', '1', '2020-07-15 15:49:31', '2020-07-15 15:49:31');
INSERT INTO `db_auth` VALUES ('31', '5V9hBAwry', '删除角色', '1', '/api/role/delete', null, 'R6Fjw3Q4', '角色管理', null, '1', null, null, '2020-07-15 15:50:11', '1', '2020-07-15 15:50:11', '2020-07-15 15:50:11');
INSERT INTO `db_auth` VALUES ('32', 'Xb8IG-aGm', '创建角色', '1', '/api/role/created', null, 'R6Fjw3Q4', '角色管理', null, '1', null, null, '2020-07-15 15:50:32', '1', '2020-07-15 15:50:32', '2020-07-15 15:50:32');
INSERT INTO `db_auth` VALUES ('33', '2X8BvHUTN', '角色设置权限', '1', '/api/role/addAuth', null, 'R6Fjw3Q4', '角色管理', null, '1', null, null, '2020-07-15 15:51:09', '1', '2020-07-15 15:51:09', '2020-07-15 15:51:09');
INSERT INTO `db_auth` VALUES ('34', 'unh2To0Bx', '获取日志', '1', '/api/log/getAll', null, 'R6FP04jv', '系统日志', null, '1', null, null, '2020-07-15 15:51:50', '1', '2020-07-15 15:51:50', '2020-07-15 15:51:50');
INSERT INTO `db_auth` VALUES ('35', 'uqu7Z_TPq', '删除日志', '1', '/api/log/delete', null, 'R6FP04jv', '系统日志', null, '1', null, null, '2020-07-15 15:52:20', '1', '2020-07-15 15:52:20', '2020-07-15 15:52:20');
INSERT INTO `db_auth` VALUES ('36', 'Rz_Ue0mSy', '注册用户', '1', '/api/user/registered', '1', 'R6IlvZRb', '用户管理', null, '1', null, null, '2020-07-15 15:54:15', '1', '2020-07-15 15:54:15', '2020-07-15 15:54:15');
INSERT INTO `db_auth` VALUES ('37', 'NFY0anjdT', '更新用户', '1', '/api/user/update', null, 'R6IlvZRb', '用户管理', null, '1', null, null, '2020-07-15 15:54:43', '1', '2020-07-15 15:54:43', '2020-07-15 15:54:43');
INSERT INTO `db_auth` VALUES ('38', 'pLTJHvegw', '删除用户', '1', '/api/user/delete', null, 'R6IlvZRb', '用户管理', null, '1', null, null, '2020-07-15 15:55:36', '1', '2020-07-15 15:55:36', '2020-07-15 15:55:36');
INSERT INTO `db_auth` VALUES ('39', '56rjUo_2K', '获取全部权限列表', '1', '/api/auth/getAll', null, 'R6Ej09A1', '权限设置', null, '1', null, null, '2020-07-16 17:37:20', '1', '2020-07-16 17:37:20', '2020-07-16 17:37:20');
INSERT INTO `db_auth` VALUES ('40', 'AQ4tjqUVl', 'www', '0', '2222', null, '0', null, null, '1', null, '1', '2020-07-17 14:36:37', '0', '2020-07-16 17:40:39', '2020-07-17 14:36:37');
INSERT INTO `db_auth` VALUES ('41', 'PRAKl_Jbz', '颜色', '0', 'colour', '3', 'R6AhD4Jw', '平台管理', null, '1', '1', null, '2020-07-17 14:28:09', '1', '2020-07-17 14:28:09', '2020-07-17 14:54:15');
INSERT INTO `db_auth` VALUES ('42', 'bOvZ_X83z', '个人设置', '0', 'personal', '5', 'R6AhD4Jw', '平台管理', null, '1', '1', null, '2020-07-17 14:28:37', '1', '2020-07-17 14:28:37', '2020-07-18 22:22:41');
INSERT INTO `db_auth` VALUES ('43', 'hJl97ee5R', '任务栏', '0', 'taskbar', '4', 'R6AhD4Jw', '平台管理', null, '1', null, null, '2020-07-17 15:00:39', '1', '2020-07-17 15:00:39', '2020-07-17 15:00:39');

-- ----------------------------
-- Table structure for db_log
-- ----------------------------
DROP TABLE IF EXISTS `db_log`;
CREATE TABLE `db_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `origin` int DEFAULT NULL COMMENT '日志来源: 0: 手机 1: 官网 2: 管理平台',
  `type` int DEFAULT NULL COMMENT '日志类型: 1.用户登录 2. 用户登出 3. 菜单访问 4.功能操作',
  `title` varchar(128) DEFAULT NULL COMMENT '日志标题',
  `desc` varchar(128) DEFAULT NULL COMMENT '日志描述',
  `ip` varchar(48) DEFAULT NULL COMMENT '日志描述访问IP',
  `create_user` varchar(20) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `create_name` varchar(100) DEFAULT NULL,
  `flag` int DEFAULT '1' COMMENT '状态: 0：删除，1：可用(默认为1)',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of db_log
-- ----------------------------
INSERT INTO `db_log` VALUES ('1', '1', '4', '注册用户', '', '::ffff:10.7.253.134', '1', '2020-07-07 16:20:19', '2020-07-07 16:20:19', null, '1');
INSERT INTO `db_log` VALUES ('2', null, '4', '注册用户', '', '::1', '1', '2020-07-10 10:35:21', '2020-07-10 10:35:21', null, '1');
INSERT INTO `db_log` VALUES ('3', '1', '4', '注册用户', '', '::1', '1', '2020-07-10 10:37:30', '2020-07-15 16:49:53', null, '0');
INSERT INTO `db_log` VALUES ('4', '1', '4', '注册用户', '', '::1', '1', '2020-07-10 15:27:05', '2020-07-10 17:07:34', null, '0');
INSERT INTO `db_log` VALUES ('5', null, '4', '注册用户', '', '::ffff:127.0.0.1', '0FU5D5rg1', '2020-07-15 17:15:03', '2020-07-15 17:15:03', '', '1');
INSERT INTO `db_log` VALUES ('6', null, '4', '注册用户', '', '::ffff:10.7.253.134', '1', '2020-07-15 18:01:21', '2020-07-15 18:01:21', '超级管理员', '1');
INSERT INTO `db_log` VALUES ('7', null, '4', '注册用户', '', '::ffff:10.7.253.134', '1', '2020-07-15 18:04:08', '2020-07-15 18:04:08', '超级管理员', '1');
INSERT INTO `db_log` VALUES ('8', null, '4', '注册用户', '', '::1', '1', '2020-07-15 18:04:22', '2020-07-15 18:04:22', '超级管理员', '1');
INSERT INTO `db_log` VALUES ('9', null, '4', '注册用户', '', '::1', 'ZZ_fn-1Rd', '2020-07-16 11:14:34', '2020-07-18 13:11:16', '管理员', '0');

-- ----------------------------
-- Table structure for db_role
-- ----------------------------
DROP TABLE IF EXISTS `db_role`;
CREATE TABLE `db_role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role_id` varchar(20) DEFAULT NULL COMMENT '权限ID',
  `name` varchar(24) DEFAULT NULL COMMENT '角色名称',
  `desc` varchar(128) DEFAULT NULL COMMENT '角色描述',
  `auth_ids` longtext COMMENT '角色权限id列表',
  `create_user` int DEFAULT NULL,
  `update_user` int DEFAULT NULL,
  `delete_user` int DEFAULT NULL,
  `delete_time` datetime DEFAULT NULL,
  `flag` int DEFAULT '1' COMMENT '状态: 0：删除，1：可用(默认为1)',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `half_checked` longtext COMMENT '半选中角色权限id列表',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of db_role
-- ----------------------------
INSERT INTO `db_role` VALUES ('2', 'Fr4iC6gVO', '超级管理员', '拥有全部权限的角色', 'R6zw8Hly,z3Kl73yJP,YPwdzlvSi,R6AhD4Jw,j-1fD9YEl,SMaog6p8a,PRAKl_Jbz,bOvZ_X83z,hJl97ee5R,R6Cip4M3,R6Ej09A1,R6LCSXn8,R6NT1Syx,R6O8RN67,R6O8RN6,56rjUo_2K,R6Fjw3Q4,u7dJFXAng,5V9hBAwry,Xb8IG-aGm,2X8BvHUTN,R6FP04jv,unh2To0Bx,uqu7Z_TPq,R6IlvZRb,nYf2OlmGy,Rz_Ue0mSy,NFY0anjdT,pLTJHvegw,zD5_5LJUQ,CVKN01q8r,8dsJ-8Fmq', '1', '1', '1', '2020-07-09 11:29:54', '1', '2020-07-09 11:16:16', '2020-07-18 22:19:24', 'R6Cip4M3,R6Fjw3Q4');
INSERT INTO `db_role` VALUES ('3', 'e8Ry49OEC', '管理员', '一般管理员权限1', 'R6zw8Hly,z3Kl73yJP,YPwdzlvSi,R6AhD4Jw,j-1fD9YEl,SMaog6p8a,PRAKl_Jbz,bOvZ_X83z,hJl97ee5R,R6Ej09A1,R6LCSXn8,R6NT1Syx,R6O8RN67,R6O8RN6,56rjUo_2K,R6Fjw3Q4,u7dJFXAng,5V9hBAwry,Xb8IG-aGm,2X8BvHUTN,R6FP04jv,unh2To0Bx,uqu7Z_TPq,zD5_5LJUQ,CVKN01q8r,8dsJ-8Fmq,R6Cip4M3', '1', '1', null, '2020-07-09 11:32:51', '1', '2020-07-09 11:32:51', '2020-07-18 13:13:08', 'R6Cip4M3');
INSERT INTO `db_role` VALUES ('4', '0FU5D5rg1', '前端开发人员', '前端开发人员', 'R6zw8Hly,z3Kl73yJP,YPwdzlvSi,R6AhD4Jw,j-1fD9YEl,SMaog6p8a,PRAKl_Jbz,bOvZ_X83z,hJl97ee5R', '1', '1', null, '2020-07-09 11:33:27', '1', '2020-07-09 11:33:27', '2020-07-18 12:50:48', null);
INSERT INTO `db_role` VALUES ('5', '73lVBH71v', '后端开发人员', '后端开发人员', 'R6LCSXn8,R6O8RN67,R6O8RN6,56rjUo_2K,u7dJFXAng,5V9hBAwry,2X8BvHUTN,R6FP04jv,unh2To0Bx,uqu7Z_TPq,R6IlvZRb,nYf2OlmGy,Rz_Ue0mSy,NFY0anjdT,pLTJHvegw,R6Cip4M3,R6Ej09A1,R6Fjw3Q4', '1', '1', '1', '2020-07-18 22:08:33', '0', '2020-07-09 11:33:44', '2020-07-18 22:08:33', 'R6Cip4M3,R6Ej09A1,R6Fjw3Q4');
INSERT INTO `db_role` VALUES ('6', '75NMnsfuk', '测试人员', '测试xx', 'Rz_Ue0mSy,zD5_5LJUQ,CVKN01q8r,8dsJ-8Fmq,R6Cip4M3,R6IlvZRb', '1', '1', '2', '2020-07-18 13:10:59', '0', '2020-07-09 11:34:49', '2020-07-18 13:10:59', 'R6Cip4M3,R6IlvZRb');
INSERT INTO `db_role` VALUES ('7', 'lJpUs7bz8', 'cece', 'cece', null, '2', null, '1', '2020-07-16 11:16:50', '0', '2020-07-15 16:50:05', '2020-07-16 11:16:50', null);

-- ----------------------------
-- Table structure for db_token
-- ----------------------------
DROP TABLE IF EXISTS `db_token`;
CREATE TABLE `db_token` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(20) DEFAULT NULL,
  `admin_token` varchar(1024) DEFAULT NULL,
  `phone_token` varchar(1024) DEFAULT NULL,
  `user_token` varchar(1024) DEFAULT NULL,
  `admin_addr` varchar(1024) DEFAULT NULL,
  `phone_addr` varchar(1024) DEFAULT NULL,
  `user_addr` varchar(1024) DEFAULT NULL,
  `admin_ip` varchar(1024) DEFAULT NULL,
  `phone_ip` varchar(1024) DEFAULT NULL,
  `user_ip` varchar(1024) DEFAULT NULL,
  `admin_expire_time` datetime DEFAULT NULL,
  `phone_expire_time` datetime DEFAULT NULL,
  `user_expire_time` datetime DEFAULT NULL,
  `flag` int DEFAULT '1' COMMENT '状态: 0：删除，1：可用(默认为1)',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of db_token
-- ----------------------------
INSERT INTO `db_token` VALUES ('7', 'kuDvmHxc1', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcl9pZCI6Imt1RHZtSHhjMSIsInJvbGVfaWQiOiJlOFJ5NDlPRUMiLCJyb2xlX25hbWUiOiLnrqHnkIblkZgiLCJhY2NvdW50IjoiYWRtaW4iLCJuYW1lIjoiYWRtaW4iLCJwYXNzd29yZCI6IjAxOTIwMjNhN2JiZDczMjUwNTE2ZjA2OWRmMThiNTAwIiwidHlwZSI6ImFkbWluIiwic2V4IjoxLCJwaG9uZSI6IjE3NjIxNjUyMDEyIiwic3RhdHVzIjoxLCJjcmVhdGVfdXNlciI6IjNzaTlZTDZFOSIsInVwZGF0ZV91c2VyIjoiWlpfZm4tMVJkIiwiZmxhZyI6MSwiY3JlYXRlZEF0IjoiMjAyMC0wNy0xNVQxMDowNDoyMi4wMDBaIiwidXBkYXRlZEF0IjoiMjAyMC0wNy0xN1QwOToyNDoxNy4wMDBaIiwiYWRtaW5fZXhwaXJlX3RpbWUiOiIyMDIwLTA3LTE4VDA5OjI3OjU1LjYzMVoiLCJpYXQiOjE1OTQ5NzgwNzV9.ICj1Hp2Mz0I0tlZtu2RTqxq_XZ45EVTMwxMOqGwkD7U', null, null, null, null, null, '::1', null, null, '2020-07-18 17:21:12', '2020-07-17 17:21:12', '2020-07-17 17:21:12', '1', '2020-07-17 17:21:12', '2020-07-17 17:27:55');
INSERT INTO `db_token` VALUES ('9', 'ZZ_fn-1Rd', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcl9pZCI6IlpaX2ZuLTFSZCIsInJvbGVfaWQiOiJGcjRpQzZnVk8iLCJyb2xlX25hbWUiOiLotoXnuqfnrqHnkIblkZgiLCJhY2NvdW50Ijoicm9vdCIsIm5hbWUiOiJyb290IiwicGFzc3dvcmQiOiI2M2E5ZjBlYTdiYjk4MDUwNzk2YjY0OWU4NTQ4MTg0NSIsInR5cGUiOiJhZG1pbiIsInNleCI6MiwicGhvbmUiOiIxODc3MDkxOTA4MCIsInN0YXR1cyI6MSwiY3JlYXRlX3VzZXIiOiIwRlU1RDVyZzEiLCJ1cGRhdGVfdXNlciI6IlpaX2ZuLTFSZCIsImZsYWciOjEsImNyZWF0ZWRBdCI6IjIwMjAtMDctMTVUMDk6MTU6MDMuMDAwWiIsInVwZGF0ZWRBdCI6IjIwMjAtMDctMThUMTA6NTQ6NTQuMDAwWiIsImFkbWluX2V4cGlyZV90aW1lIjoiMjAyMC0wNy0yMFQxMDo0Mzo0My41MzJaIiwiaWF0IjoxNTk1MTU1NDIzfQ.AG_PTXsPI5vH4q8anPmPSRR4LLA6-Dv6CCDGY3-Iz0M', null, null, null, null, null, '::1', null, null, '2020-07-20 18:43:43', '2020-07-18 18:25:58', '2020-07-18 18:25:58', '1', '2020-07-18 18:25:58', '2020-07-19 18:43:43');

-- ----------------------------
-- Table structure for db_user
-- ----------------------------
DROP TABLE IF EXISTS `db_user`;
CREATE TABLE `db_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role_id` varchar(20) DEFAULT NULL,
  `account` varchar(100) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `password` varchar(32) DEFAULT NULL,
  `type` int DEFAULT '1' COMMENT '用户类型: 0: 系统注册 1: 管理平台添加 2:导入',
  `sex` int DEFAULT NULL,
  `avatar` varchar(128) DEFAULT NULL COMMENT '头像',
  `phone` varchar(12) DEFAULT NULL,
  `status` int DEFAULT '1' COMMENT '状态: 0：停用，1：启用(默认为1)',
  `create_user` varchar(20) DEFAULT NULL,
  `update_user` varchar(128) DEFAULT NULL,
  `delete_user` varchar(128) DEFAULT NULL,
  `delete_time` datetime DEFAULT NULL,
  `flag` int DEFAULT '1' COMMENT '状态: 0：删除，1：可用(默认为1)',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `role_name` varchar(24) DEFAULT NULL,
  `user_id` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of db_user
-- ----------------------------
INSERT INTO `db_user` VALUES ('1', 'Fr4iC6gVO', 'root', 'root', '63a9f0ea7bb98050796b649e85481845', '1', '2', null, '18770919080', '1', '0FU5D5rg1', 'ZZ_fn-1Rd', null, null, '1', '2020-07-15 17:15:03', '2020-07-18 18:54:54', '超级管理员', 'ZZ_fn-1Rd');
INSERT INTO `db_user` VALUES ('2', 'e8Ry49OEC', 'admin', 'admin', '0192023a7bbd73250516f069df18b500', '1', '1', null, '17621652012', '1', '3si9YL6E9', 'ZZ_fn-1Rd', null, null, '1', '2020-07-15 18:04:22', '2020-07-17 17:24:17', '管理员', 'kuDvmHxc1');
INSERT INTO `db_user` VALUES ('10', '75NMnsfuk', 'test', 'test', 'cc03e747a6afbbcbf8be7668acfebee5', '1', '1', null, '17621652012', '1', 'ZZ_fn-1Rd', 'ZZ_fn-1Rd', '1', '2020-07-16 11:18:14', '0', '2020-07-16 11:14:34', '2020-07-16 11:18:14', '测试人员', 'H5LJihoPx');
