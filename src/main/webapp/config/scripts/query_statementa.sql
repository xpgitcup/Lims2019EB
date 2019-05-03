/*
 Navicat Premium Data Transfer

 Source Server         : sample
 Source Server Type    : MySQL
 Source Server Version : 50725
 Source Host           : localhost:3306
 Source Schema         : lims2019db

 Target Server Type    : MySQL
 Target Server Version : 50725
 File Encoding         : 65001

 Date: 03/05/2019 19:22:22
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for query_statementa
-- ----------------------------
DROP TABLE IF EXISTS `query_statementa`;
CREATE TABLE `query_statementa`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `version` bigint(20) NOT NULL,
  `format_string` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `controller_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `issql` bit(1) NOT NULL,
  `action_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `params_string` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `query_string` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `key_string` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `view_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 56 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of query_statementa
-- ----------------------------
INSERT INTO `query_statementa` VALUES (1, 1, NULL, 'operation4QueryStatementA', b'0', 'count', '[]', 'select count(*) from QueryStatementA queryStatementA', 'QueryStatementA', NULL);
INSERT INTO `query_statementa` VALUES (2, 3, NULL, 'operation4QueryStatementA', b'0', 'list', '[max, offset]', 'from QueryStatementA queryStatementA\r\norder by controllerName, actionName,keyString', 'QueryStatementA', 'listQueryStatementA');
INSERT INTO `query_statementa` VALUES (9, 0, NULL, 'operation4SystemUser', b'0', 'list', '[max, offset]', 'from SystemUser systemUser', 'SystemUser', 'listSystemUser');
INSERT INTO `query_statementa` VALUES (10, 0, NULL, 'operation4SystemUser', b'0', 'count', '[]', 'select count(*) from SystemUser systemUser', 'SystemUser', NULL);
INSERT INTO `query_statementa` VALUES (13, 0, NULL, 'operation4DataRootPath', b'0', 'list', '[max, offset]', 'from DataRootPath dataRootPath', 'DataRootPath', 'listDataRootPath');
INSERT INTO `query_statementa` VALUES (14, 0, NULL, 'operation4DataRootPath', b'0', 'count', '[]', 'select count(*) from DataRootPath dataRootPath', 'DataRootPath', NULL);
INSERT INTO `query_statementa` VALUES (23, 6, NULL, 'operation4QueryStatementA', b'0', 'list', '[max, offset]', 'from QueryStatementA queryStatementA \r\nwhere queryStatementA.queryString=null\r\norder by controllerName, actionName,keyString', 'QueryStatementA待编辑', 'listQueryStatementA');
INSERT INTO `query_statementa` VALUES (24, 2, NULL, 'operation4QueryStatementA', b'0', 'count', '[]', 'select count(*) from QueryStatementA queryStatementA\r\nwhere queryStatementA.queryString=null', 'QueryStatementA待编辑', NULL);
INSERT INTO `query_statementa` VALUES (25, 1, NULL, 'operation4QueryStatementA', b'0', 'count', '[like]', 'select count(*) from QueryStatementA queryStatementA\r\nwhere queryStatementA.keyString like :like', 'QueryStatementA', NULL);
INSERT INTO `query_statementa` VALUES (26, 2, NULL, 'operation4QueryStatementA', b'0', 'list', '[like, max, offset]', 'from QueryStatementA queryStatementA \r\nwhere queryStatementA.keyString like :like\r\norder by controllerName, actionName,keyString', 'QueryStatementA', 'listQueryStatementA');
INSERT INTO `query_statementa` VALUES (27, 1, NULL, 'home', b'0', 'list', '[max, offset]', 'from SystemStatus systemStatus\r\norder by loginTime desc', '登录-登录前', 'listSystemStatus');
INSERT INTO `query_statementa` VALUES (28, 2, NULL, 'home', b'0', 'count', '[]', 'select count(*) from SystemStatus systemStatus', '登录-登录前', NULL);
INSERT INTO `query_statementa` VALUES (35, 2, NULL, 'home', b'0', 'list', '[max, offset]', 'from Progress progress \r\norder by regDate desc', '进度-登录前', 'listProgressHome');
INSERT INTO `query_statementa` VALUES (36, 1, NULL, 'home', b'0', 'count', '[]', 'select count(*) from Progress progress', '进度-登录前', NULL);
INSERT INTO `query_statementa` VALUES (43, 2, NULL, 'home', b'0', 'list', '[max, offset, startDate]', 'from Progress progress where progress.regDate>:startDate\r\norder by regDate desc', '近7天进度-登录前', 'listProgressHome');
INSERT INTO `query_statementa` VALUES (44, 3, NULL, 'home', b'0', 'count', '[startDate]', 'select count(*) from Progress progress\r\nwhere progress.regDate>:startDate', '近7天进度-登录前', NULL);
INSERT INTO `query_statementa` VALUES (45, 1, NULL, 'home', b'0', 'count', '[startDate]', 'select count(*) from SystemStatus systemStatus\r\nwhere loginTime>:startDate', '近7天登录-登录前', NULL);
INSERT INTO `query_statementa` VALUES (46, 1, NULL, 'home', b'0', 'list', '[max, offset, startDate]', 'from SystemStatus systemStatus where loginTime>:startDate\r\norder by loginTime desc', '近7天登录-登录前', 'listSystemStatus');
INSERT INTO `query_statementa` VALUES (48, 1, NULL, 'operation4Person', b'0', 'list', '[max, offset]', 'from Teacher teacher\r\norder by name', '教师', 'listTeacher');
INSERT INTO `query_statementa` VALUES (49, 2, NULL, 'operation4Person', b'0', 'list', '[max, offset]', 'from Student student \r\norder by personTitle, supervisor, gradeName,  major, code', '学生', 'listStudent');
INSERT INTO `query_statementa` VALUES (50, 1, NULL, 'operation4Person', b'0', 'count', '[]', 'select count(*)\r\nfrom Student student', '学生', NULL);
INSERT INTO `query_statementa` VALUES (51, 1, NULL, 'operation4Person', b'0', 'list', '[max, offset]', 'from Major major order by name', '专业', 'listMajor');
INSERT INTO `query_statementa` VALUES (52, 1, NULL, 'operation4Person', b'0', 'count', '[]', 'select count(*) from Major major', '专业', NULL);
INSERT INTO `query_statementa` VALUES (53, 2, NULL, 'operation4Person', b'1', 'count', '[]', 'SELECT Count(DISTINCT person.grade_name) FROM person WHERE person.grade_name IS NOT NULL', '年级', NULL);
INSERT INTO `query_statementa` VALUES (54, 1, NULL, 'operation4Person', b'1', 'list', '[max, offset]', 'SELECT DISTINCT person.grade_name FROM person WHERE person.grade_name IS NOT NULL limit %d,%d', '年级', 'listGradeName');
INSERT INTO `query_statementa` VALUES (55, 2, NULL, 'operation4Person', b'0', 'count', '[]', 'select count(*) \r\nfrom Teacher teacher', '教师', NULL);

SET FOREIGN_KEY_CHECKS = 1;
