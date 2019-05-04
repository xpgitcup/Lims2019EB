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

 Date: 04/05/2019 11:45:58
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
  `query_string` varchar(1024) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `key_string` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `view_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 52 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of query_statementa
-- ----------------------------
INSERT INTO `query_statementa` VALUES (1, 0, NULL, 'operation4DataRootPath', b'0', 'list', '[max, offset]', 'from DataRootPath dataRootPath', 'DataRootPath', 'listDataRootPath');
INSERT INTO `query_statementa` VALUES (2, 0, NULL, 'operation4DataRootPath', b'0', 'count', '[]', 'select count(*) from DataRootPath dataRootPath', 'DataRootPath', NULL);
INSERT INTO `query_statementa` VALUES (3, 1, NULL, 'operation4QueryStatementA', b'0', 'count', '[]', 'select count(*) from QueryStatementA queryStatementA', 'QueryStatementA', NULL);
INSERT INTO `query_statementa` VALUES (4, 3, NULL, 'operation4QueryStatementA', b'0', 'list', '[max, offset]', 'from QueryStatementA queryStatementA\r\norder by controllerName, actionName,keyString', 'QueryStatementA', 'listQueryStatementA');
INSERT INTO `query_statementa` VALUES (5, 1, NULL, 'operation4QueryStatementA', b'0', 'count', '[like]', 'select count(*) from QueryStatementA queryStatementA\r\nwhere queryStatementA.keyString like :like', 'QueryStatementA', NULL);
INSERT INTO `query_statementa` VALUES (6, 2, NULL, 'operation4QueryStatementA', b'0', 'list', '[like, max, offset]', 'from QueryStatementA queryStatementA \r\nwhere queryStatementA.keyString like :like\r\norder by controllerName, actionName,keyString', 'QueryStatementA', 'listQueryStatementA');
INSERT INTO `query_statementa` VALUES (7, 6, NULL, 'operation4QueryStatementA', b'0', 'list', '[max, offset]', 'from QueryStatementA queryStatementA \r\nwhere queryStatementA.queryString=null\r\norder by controllerName, actionName,keyString', 'QueryStatementA待编辑', 'listQueryStatementA');
INSERT INTO `query_statementa` VALUES (8, 2, NULL, 'operation4QueryStatementA', b'0', 'count', '[]', 'select count(*) from QueryStatementA queryStatementA\r\nwhere queryStatementA.queryString=null', 'QueryStatementA待编辑', NULL);
INSERT INTO `query_statementa` VALUES (9, 0, NULL, 'operation4SystemUser', b'0', 'list', '[max, offset]', 'from SystemUser systemUser', 'SystemUser', 'listSystemUser');
INSERT INTO `query_statementa` VALUES (10, 0, NULL, 'operation4SystemUser', b'0', 'count', '[]', 'select count(*) from SystemUser systemUser', 'SystemUser', NULL);
INSERT INTO `query_statementa` VALUES (11, 1, NULL, 'operation4Person', b'0', 'list', '[max, offset]', 'from Major major order by name', '专业', 'listMajor');
INSERT INTO `query_statementa` VALUES (12, 1, NULL, 'operation4Person', b'0', 'count', '[]', 'select count(*) from Major major', '专业', NULL);
INSERT INTO `query_statementa` VALUES (13, 2, NULL, 'operation4Person', b'0', 'list', '[max, offset]', 'from Student student \r\norder by personTitle, supervisor, gradeName,  major, code', '学生', 'listStudent');
INSERT INTO `query_statementa` VALUES (14, 1, NULL, 'operation4Person', b'0', 'count', '[]', 'select count(*)\r\nfrom Student student', '学生', NULL);
INSERT INTO `query_statementa` VALUES (15, 2, NULL, 'operation4Person', b'1', 'count', '[]', 'SELECT Count(DISTINCT person.grade_name) FROM person WHERE person.grade_name IS NOT NULL', '年级', NULL);
INSERT INTO `query_statementa` VALUES (16, 1, NULL, 'operation4Person', b'1', 'list', '[max, offset]', 'SELECT DISTINCT person.grade_name FROM person WHERE person.grade_name IS NOT NULL limit %d,%d', '年级', 'listGradeName');
INSERT INTO `query_statementa` VALUES (17, 1, NULL, 'operation4Thing', b'0', 'list', '[max, offset]', 'from Course course order by name', '教学', 'listCourse');
INSERT INTO `query_statementa` VALUES (18, 1, NULL, 'operation4Thing', b'0', 'count', '[]', 'select count(*) from Course course', '教学', NULL);
INSERT INTO `query_statementa` VALUES (19, 1, NULL, 'operation4Person', b'0', 'list', '[max, offset]', 'from Teacher teacher\r\norder by name', '教师', 'listTeacher');
INSERT INTO `query_statementa` VALUES (20, 2, NULL, 'operation4Person', b'0', 'count', '[]', 'select count(*) \r\nfrom Teacher teacher', '教师', NULL);
INSERT INTO `query_statementa` VALUES (21, 1, NULL, 'home', b'0', 'list', '[max, offset]', 'from SystemStatus systemStatus\r\norder by loginTime desc', '登录-登录前', 'listSystemStatus');
INSERT INTO `query_statementa` VALUES (22, 2, NULL, 'home', b'0', 'count', '[]', 'select count(*) from SystemStatus systemStatus', '登录-登录前', NULL);
INSERT INTO `query_statementa` VALUES (23, 1, NULL, 'operation4Thing', b'0', 'list', '[max, offset]', 'from Project project order by name', '科研', 'listProject');
INSERT INTO `query_statementa` VALUES (24, 1, NULL, 'operation4Thing', b'0', 'count', '[]', 'select count(*) from Project project', '科研', NULL);
INSERT INTO `query_statementa` VALUES (25, 1, NULL, 'home', b'0', 'count', '[startDate]', 'select count(*) from SystemStatus systemStatus\r\nwhere loginTime>:startDate', '近7天登录-登录前', NULL);
INSERT INTO `query_statementa` VALUES (26, 1, NULL, 'home', b'0', 'list', '[max, offset, startDate]', 'from SystemStatus systemStatus where loginTime>:startDate\r\norder by loginTime desc', '近7天登录-登录前', 'listSystemStatus');
INSERT INTO `query_statementa` VALUES (27, 2, NULL, 'home', b'0', 'list', '[max, offset, startDate]', 'from Progress progress where progress.regDate>:startDate\r\norder by regDate desc', '近7天进度-登录前', 'listProgressHome');
INSERT INTO `query_statementa` VALUES (28, 3, NULL, 'home', b'0', 'count', '[startDate]', 'select count(*) from Progress progress\r\nwhere progress.regDate>:startDate', '近7天进度-登录前', NULL);
INSERT INTO `query_statementa` VALUES (29, 2, NULL, 'home', b'0', 'list', '[max, offset]', 'from Progress progress \r\norder by regDate desc', '进度-登录前', 'listProgressHome');
INSERT INTO `query_statementa` VALUES (30, 1, NULL, 'home', b'0', 'count', '[]', 'select count(*) from Progress progress', '进度-登录前', NULL);
INSERT INTO `query_statementa` VALUES (31, 1, NULL, 'operation4Plan', b'0', 'count', '[thingType]', 'select count(*) from Plan plan \r\nwhere plan.thingType.id=cast(:thingType as integer) and plan.upPlan is null', 'Plan', NULL);
INSERT INTO `query_statementa` VALUES (32, 1, NULL, 'operation4Plan', b'0', 'list', '[max, offset, thingType]', 'from Plan plan  \r\nwhere plan.thingType.id=cast(:thingType as integer) and plan.upPlan is null \r\norder by updateDate desc', 'Plan', 'listPlan');
INSERT INTO `query_statementa` VALUES (33, 1, NULL, 'operation4ThingTypeCircle', b'0', 'count', '[]', 'select count(*) from ThingTypeCircle thingTypeCircle', 'ThingTypeCircle', NULL);
INSERT INTO `query_statementa` VALUES (34, 1, NULL, 'operation4ThingTypeCircle', b'0', 'list', '[max, offset]', 'from ThingTypeCircle thingTypeCircle order by thingType', 'ThingTypeCircle', 'listThingTypeCircle');
INSERT INTO `query_statementa` VALUES (39, 0, NULL, 'operation4TeamTeacherProject', b'0', 'count', '[]', NULL, '队员列表', NULL);
INSERT INTO `query_statementa` VALUES (40, 0, NULL, 'operation4TeamTeacherProject', b'0', 'list', '[max, offset]', NULL, '队员列表', NULL);
INSERT INTO `query_statementa` VALUES (44, 0, NULL, 'operation4TeamTeacherProject', b'0', 'list', '[max, myself, offset, thingTypeList]', NULL, '我领导的', NULL);
INSERT INTO `query_statementa` VALUES (45, 1, NULL, 'operation4TeamTeacherProject', b'0', 'list', '[max, offset, thingTypeList]', 'from Thing thing where thing.thingType in :thingTypeList', '可选题目', 'listThing');
INSERT INTO `query_statementa` VALUES (46, 0, NULL, 'operation4TeamTeacherProject', b'0', 'list', '[max, myself, offset, thingTypeList]', NULL, '我参与的', NULL);
INSERT INTO `query_statementa` VALUES (47, 0, NULL, 'operation4TeamTeacherProject', b'0', 'count', '[myself, thingTypeList]', NULL, '我参与的', NULL);
INSERT INTO `query_statementa` VALUES (48, 0, NULL, 'operation4TeamTeacherProject', b'0', 'count', '[myself, thingTypeList]', NULL, '我领导的', NULL);
INSERT INTO `query_statementa` VALUES (49, 1, NULL, 'operation4TeamTeacherProject', b'0', 'count', '[thingTypeList]', 'select count(*) from Thing thing where thing.thingType in :thingTypeList', '可选题目', NULL);
INSERT INTO `query_statementa` VALUES (50, 1, NULL, 'operation4TeamTeacherProject', b'0', 'list', '[currentThing, max, offset, thingTypeList]', 'from Team team where team.thing=:currentThing and team.thing.thingType in :thingTypeList', '相关团队', 'listTeamLeft');
INSERT INTO `query_statementa` VALUES (51, 1, NULL, 'operation4TeamTeacherProject', b'0', 'count', '[currentThing, thingTypeList]', 'select count(*) from Team team where team.thing=:currentThing and team.thing.thingType in :thingTypeList', '相关团队', NULL);

SET FOREIGN_KEY_CHECKS = 1;
